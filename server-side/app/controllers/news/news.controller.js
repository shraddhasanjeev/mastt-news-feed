const fetch = require("node-fetch");
const config = require("../../config.json");
var newsSchema = require("../../models/newsSchema");
const validateToken = require('../security')

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
        if (res.articles[i] != undefined) {
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
                country: countryCode,
                archived: false
            })
            newsItem.save(function(err, obj){
                    if(err){
                        console.log(err);
                        errors.push(err)
                    }
                    else{
                        console.log("Following record saved successfully:");
                        console.log(obj);
                    }
                }).catch(err => {
                // console.log(err);
                // errors.push(err)
            });
        }
    }
    if (errors.length > 0){
        console.log(errors);
    }
    console.log("records saved for "+ countryCode)    
}

function fetchNewsFromThirdParty(){
    var newsUrls = [];
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
    if (validateToken(req.query.token)) {
        const currentDate = new Date();
        var startDate = new Date(currentDate);
        startDate.setDate(currentDate.getDate() - 2)

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
            console.log(res + " archived")
        })
    }
}

module.exports = { fetchNewsFromThirdParty, getNews, archiveNews};