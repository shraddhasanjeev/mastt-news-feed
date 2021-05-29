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
    var spawn = require('child_process').spawn;
    var errors = []
    var res = result.data
    var filteredNews = []
    var filterNewsData = spawn('python', ['./app/scripts/filterNews.py', JSON.stringify(result.data)]);
    filterNewsData.stdout.on('data', function(pythonData) {
        console.log(JSON.stringify(pythonData.toString()));
        // filteredNews.push(data);
    })
    const countryCode = getParameterByName("country",result.url)
    // const countryCode = getParameterByName("q",result.url)
    for(let i=0; i< res.totalResults; i++){
        if(res.articles[i] != undefined){
            let start_date = new Date(res.articles[i]["publishedAt"])
            start_date.setHours(0,0,0,0);
            let end_date = new Date(start_date);
            end_date.setDate(start_date.getDate() + 1)
            var newsItem = new newsSchema({
                title: res.articles[i]["title"] ,
                sourceUrl: res.articles[i]["url"],
                image: res.articles[i]["urlToImage"],
                content: res.articles[i]["description"], 
                start_date: start_date,
                end_date: end_date,
                country: countryCode
            })
            newsItem.save().catch(err => {
                errors.push(err)
            });
        }
    }
    console.log(res.totalResults + " records saved for "+ countryCode)    
}

function fetchNewsFromThirdParty(){
    var newsUrls = [];
    //var newsUrls = ["https://newsapi.org/v2/everything?q=sydney&sortBy=relevancy&from=2021-05-14&to=2021-05-19&domains="+ config.newsUrls.sydneyUrls + "&apiKey=" + config.tokens.newsapi];
    for(var country in config.countryCodes){
        newsUrls.push("https://newsapi.org/v2/top-headlines?country=" + config.countryCodes[country] + "&category=general" + "&apiKey=" + config.tokens.newsapi)
    }

    Promise.all(
        newsUrls.map(url => fetch(url)
          .then(r => r.json())
          .then(data => ({ data, url }))
          .then(result => processNewsData(result))
          .catch(error => ({ error, url }))
        )
    )         
    
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