const request = require('request');
const config = require("../../config.json");
var newsSchema = require("../../models/newsSchema");

require("../../models/masttDb").connect()

function fetchNews(req,res){
    var url = "https://newsapi.org/v2/top-headlines?country=" + config.countryCodes.India + "&apiKey=" + config.tokens.newsapi;
    var errors = []
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body);
            for(let i=0; i< result.totalResults; i++){
                if(result.articles[i] != undefined){
                    let start_date = new Date(result.articles[i]["publishedAt"])
                    let end_date = new Date(start_date);
                    end_date.setDate(start_date.getDate() + 1)
                    var newsItem = new newsSchema({
                        title: result.articles[i]["title"] || "ss",
                        sourceUrl: result.articles[i]["url"] || "ss",
                        image: result.articles[i]["urlToImage"] || "ss",
                        content: result.articles[i]["content"] || "ss", 
                        start_date: start_date,
                        end_date: end_date
                    })
                    newsItem.save()
                    .catch(err => {
                        //console.log(err)
                        errors.push(err)
                    });
                }
            }
        }
    })
    if (errors.length > 0){
        res.status(500).send(err);
    }
    else
        res.status(200).send("DONE")
}

module.exports = {fetchNews};