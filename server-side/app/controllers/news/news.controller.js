const fetch = require("node-fetch");
const config = require("../../config.json");
var newsSchema = require("../../models/newsSchema");
let {PythonShell} = require('python-shell')
const validateToken = require('../security')

function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function processNewsData(result, city){
    console.log("process started.");
    // var spawn = require('child_process').spawn;
    // var filterNewsData = spawn('python', ['./app/scripts/filterNews.py', JSON.stringify(result)]);
    var pyshell = new PythonShell('./app/scripts/filterNews.py', { mode: 'json' });
    pyshell.send(JSON.parse(JSON.stringify(result)));
    // filterNewsData.stderr.pipe(process.stderr);
    // filterNewsData.stdout.on('data', function(data) {
    pyshell.on('message', function (filteredNews) {
        console.log("Python Returned: ");
        
        console.log("Filtered News: " + filteredNews);
        console.log(filteredNews);
        for(let i=0; i< filteredNews.length; i++){
            if(filteredNews[i] != undefined){
                let start_date = new Date(filteredNews[i]["publishedAt"])
                start_date.setHours(0,0,0,0);
                let end_date = new Date(start_date);
                end_date.setDate(start_date.getDate() + 1)
                var newsItem = new newsSchema({
                    title: filteredNews[i]["title"] ,
                    sourceUrl: filteredNews[i]["url"],
                    image: filteredNews[i]["urlToImage"],
                    content: filteredNews[i]["description"], 
                    start_date: start_date,
                    end_date: end_date,
                    city: city,
                    archived: false
                })
                console.log("Just before save");
                newsItem.save(function(err, obj){
                    if(err){
                        console.log("Couldn't save records to MongoDB due to: " + err)
                    }
                    else{
                        console.log("Records saved" + obj)
                    }
                });
            }
        }
       
    });
    
    pyshell.end(function (err,code,signal) {
        if (err) throw err;
        console.log('The exit code was: ' + code);
        console.log('The exit signal was: ' + signal);
        console.log('finished');
      }); 
}

function getDate(dateObj){
    dateObj = new Date(dateObj);
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    return year + "-" + month + "-" + day;
}

function generateDateArray(currentDate){
    var dateArr = [];
    var oneDayinEpoch = 86400000;
    dateArr.push(getDate(currentDate - oneDayinEpoch));
    dateArr.push(getDate(currentDate));
    return dateArr;
}

async function fetchNewsFromThirdParty(city){
    var newsUrls = [];
    var startDate = new Date();
    var endDate =  new Date(startDate);
    endDate.setDate(startDate.getDate() - 1);

    // for(var city in config.newsUrls){
        generateDateArray(startDate).forEach(function(date){
            newsUrls.push("https://newsapi.org/v2/everything?language=en&q=" + city + "&sortBy=relevancy&from="+ date +"&to="+ date + "&pageSize=100&apiKey=" + config.tokens.newsapi)
        });
    // }

    console.log(newsUrls)
    newsResults = []
    allResults = [] 

    await Promise.all(
        newsUrls.map(url => fetch(url)
            .then(r => r.json())
            .then(data => ({ data, url }))
            .then(result => {
                console.log("Inside Promise: " )
                if(result.data["articles"] != null && result.data["articles"] != "")
                {
                    newsResults.push(result.data["articles"]);
                }
                })
          .catch(error => ({ error, url }))
        )
    );

    allResults = newsResults[0].concat(newsResults[1]);
    console.log(allResults.length);

    processNewsData(allResults, city)
}


async function getNews(req,res){
    var newsResults = []
    var count = 0
    if (validateToken(req.query.token)) {
        const currentDate = new Date();
        var startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - 2)
        startDate.setHours(0,0,0,0);
        var cityCount = Object.keys(config.intervals.news).length
        res.header('Access-Control-Allow-Origin', '*');
        for (var city in config.intervals.news){
            var docquery = newsSchema.find({ city: city, start_date: { $gte: startDate.getTime() }}, null, {limit: 2})
            .where('archived').equals(false)
            docquery.exec().then(news => {
                count +=1;
                if(news.length > 0){
                    for (var i in news)
                        newsResults.push(news[i])
                }
                if(count == cityCount)
                    res.json(newsResults);
            }).catch(err => {
                res.status(500).send(err);
            });
        }
    } else {
        res.status(401)
        res.end()
    }
}

function archiveNews(req, res) {
    if (validateToken(req.query.token)) {
        res.header('Access-Control-Allow-Origin', '*');
        const id = req.query.id;
        newsSchema.findByIdAndUpdate(id, { "archived": true }, (err) => {
            if (err == undefined) {
                res.status(202)
                res.send("News item Archived successfully")
                res.end()
            } else {
                res.send("Failed to Archive")
                res.end()
            }
        })
    } else {
        res.status(401)
        res.end()
    }
}

module.exports = { fetchNewsFromThirdParty, getNews, archiveNews};