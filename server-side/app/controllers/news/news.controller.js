const request = require('request');
const config = require("../../config.json");
var newsSchema = require("../../models/newsSchema");

require("../../models/masttDb").connect()

function fetchNews(req,res){
    var url = "https://newsapi.org/v2/top-headlines?country=" + config.countryCodes.India + "&apiKey=" + config.tokens.newsapi;
    
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            for(let i=0; i< result.totalResults; i++){
                if(result.articles[i] != undefined){
                    let start_date = Date.parse(result.articles[i]["publishedAt"])
                    let end_date = new Date(start_date);
                    console.log(start_date.getDate());
                    end_date.setDate(start_date.getDate() + 1)
                    var newsItem = new newsSchema({
                        title: result.articles[i]["title"],
                        sourceUrl: result.articles[i]["url"],
                        image: result.articles[i]["urlToImage"],
                        content: result.articles[i]["content"], 
                        start_date: start_date,
                        end_date: end_date
                    })
                    newsItem.save()
                }
            }
        }
    })
}

module.exports = {fetchNews};