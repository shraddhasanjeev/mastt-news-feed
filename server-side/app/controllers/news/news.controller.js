const fetch = require("node-fetch");
const config = require("../../config.json");
var newsSchema = require("../../models/newsSchema");
const PythonShell = require('python-shell');
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
    console.log("process started:" + JSON.stringify(result));
    var spawn = require('child_process').spawn;
    var filteredNews = []
    var filterNewsData = spawn('python', ['./app/scripts/filterNews.py', JSON.stringify(result)]);
    // var pyshell = new PythonShell('./app/scripts/filterNews.py', { mode: 'json' });
    // pyshell.send(result);
    filterNewsData.stderr.pipe(process.stderr);
    filterNewsData.stdout.on('data', function(data) {
    // pyshell.on('message', function (data) {
        console.log("Python Returned: " + data);
        filteredNews = JSON.parse(data);
        console.log("Filtered News: " + filteredNews);
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
    })      
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
    dateArr.push(getDate(currentDate - (2*oneDayinEpoch)));
    dateArr.push(getDate(currentDate - oneDayinEpoch));
    dateArr.push(getDate(currentDate));
    return dateArr;
}

async function fetchNewsFromThirdParty(){
    var newsUrls = [];
    var startDate = new Date();
    var endDate =  new Date(startDate);
    endDate.setDate(startDate.getDate() - 7);
   
    /* for(var city in config.newsUrls){
        for (var i in config.newsUrls[city]){
            newsUrls.push("https://newsapi.org/v2/everything?q=" + city + "&sortBy=relevancy&from="+ getDate(startDate)+"&to="+ getDate(endDate)+ "&domains="+ config.newsUrls[city][i] + "&pageSize=100&apiKey=" + config.tokens.newsapi)
        }
    } */

    for(var city in config.newsUrls){
        generateDateArray(startDate).forEach(function(date){
            newsUrls.push("https://newsapi.org/v2/everything?q=" + city + "&sortBy=relevancy&from="+ date +"&to="+ date + "&pageSize=100&apiKey=" + config.tokens.newsapi)
        });
    }

    // for(var country in config.countryCodes){
    //     newsUrls.push("https://newsapi.org/v2/top-headlines?country=" + config.countryCodes[country] + "&category=general" + "&apiKey=" + config.tokens.newsapi)
    // }
    console.log(newsUrls)
    allResults = []
    
    await Promise.all(
        newsUrls.map(url => fetch(url)
            .then(r => r.json())
            .then(data => ({ data, url }))
            .then(result => {
                console.log("Inside Promise: " )
                if(result.data["articles"] != null && result.data["articles"] != "")
                    allResults.push(result.data["articles"]);
                })
            // .then(processNewsData(allResults, city))
          .catch(error => ({ error, url }))
        )
    )
    // const cityName = getParameterByName("q",result)
    //console.log("Hello: " + JSON.stringify(allResults));
    processNewsData(allResults, city)
}


function getNews(req,res){
    if (validateToken(req.query.token)) {
        const currentDate = new Date();
        var startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - 2)
        startDate.setHours(0,0,0,0);

        res.header('Access-Control-Allow-Origin', '*');
        // const docquery = newsSchema.find({country: country});
        const docquery = newsSchema.find({ start_date: { $gte: startDate.getTime() } })
            .where('archived').equals(false)
        docquery.exec().then(news => {
            res.json(news);
        }).catch(err => {
            res.status(500).send(err);
        });
    }
}

function archiveNews(req, res) {
    if (validateToken(req.query.token)) {
        res.header('Access-Control-Allow-Origin', '*');
        const id = req.query.id;
        newsSchema.findByIdAndUpdate(id, { "archived": true }, (err, res) => {
        })
    }
}

module.exports = { fetchNewsFromThirdParty, getNews, archiveNews};