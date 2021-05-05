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
    var errors = []
    var res = result.data 
    const countryCode = getParameterByName("country",result.url)
    for(let i=0; i< res.totalResults; i++){
        if(res.articles[i] != undefined){
            let start_date = new Date(res.articles[i]["publishedAt"])
            let end_date = new Date(start_date);
            end_date.setDate(start_date.getDate() + 1)
            var newsItem = new newsSchema({
                title: res.articles[i]["title"] ,
                sourceUrl: res.articles[i]["url"],
                image: res.articles[i]["urlToImage"],
                content: res.articles[i]["content"], 
                start_date: start_date,
                end_date: end_date,
                country: countryCode
            })
            newsItem.save().catch(err => {
                errors.push(err)
            });
        }
    }
    console.log("records saved for "+ countryCode)    
}

function fetchNewsFromThirdParty(){
    var newsUrls = [];
    for(var country in config.countryCodes){
        newsUrls.push("https://newsapi.org/v2/top-headlines?country=" + config.countryCodes[country] + "&apiKey=" + config.tokens.newsapi)
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
    const country = req.query.country;
    const startDate = req.query.startDate;
    const endDate = req.query.endDate;

    console.log(country)
    const docquery = newsSchema.find({country: country});
    docquery.exec().then(news => {
      res.json(news);
    }).catch(err => {
      res.status(500).send(err);
    });
}

module.exports = {fetchNewsFromThirdParty, getNews};