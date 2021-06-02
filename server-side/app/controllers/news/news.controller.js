const fetch = require("node-fetch");
const config = require("../../config.json");
var newsSchema = require("../../models/newsSchema");

function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function processNewsData(result){

    const cityName = getParameterByName("q",result.url)
    var spawn = require('child_process').spawn;
    var errors = []
    var res = result.data
    var filteredNews = []
    var filterNewsData = spawn('python', ['./app/scripts/filterNews.py', JSON.stringify(result.data)]);
    filterNewsData.stderr.pipe(process.stderr);
    filterNewsData.stdout.on('data', function(data) {
        filteredNews = JSON.parse(data);
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
                    city: cityName
                })
                newsItem.save(function(err, obj){
                    if(err){
                        console.log(err)
                    }
                    else{
                        console.log("record saved" + obj)
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

function fetchNewsFromThirdParty(){
    var newsUrls = [];
    //var newsUrls = ["https://newsapi.org/v2/everything?q=sydney&sortBy=relevancy&from=2021-05-14&to=2021-05-19&domains="+ config.newsUrls.sydneyUrls + "&apiKey=" + config.tokens.newsapi];
    var startDate = new Date();
    var endDate =  new Date(startDate);
    endDate.setDate(startDate.getDate() - 2)
    for(var city in config.newsUrls){
        // for (var i in config.newsUrls[city]){
            newsUrls.push("https://newsapi.org/v2/everything?q=" + city + "&sortBy=relevancy&from="+ getDate(startDate)+"&to="+ getDate(endDate)+ "&domains="+ config.newsUrls[city] + "&apiKey=" + config.tokens.newsapi)
        // }
    }
    // for(var country in config.countryCodes){
    //     newsUrls.push("https://newsapi.org/v2/top-headlines?country=" + config.countryCodes[country] + "&category=general" + "&apiKey=" + config.tokens.newsapi)
    // }
    // allResults = []
    
    Promise.all(
        newsUrls.map(url => fetch(url)
          .then(r => r.json())
          .then(data => ({ data, url }))
          .then(result => processNewsData(result))
          .catch(error => ({ error, url }))
        )
    )

    //console.log(allResults.length)
    //
    
}


function getNews(req,res){

    const currentDate = new Date();
    var startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - 2)
    startDate.setHours(0,0,0,0);

    res.header('Access-Control-Allow-Origin', '*');
    // const docquery = newsSchema.find({country: country});
    const docquery = newsSchema.find({start_date: {$gte: startDate.getTime()}})
    docquery.exec().then(news => {
      res.json(news);
    }).catch(err => {
      res.status(500).send(err);
    });
}

module.exports = {fetchNewsFromThirdParty, getNews};