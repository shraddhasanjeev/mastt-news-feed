const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        proxy('/api',{
            target: 'https://mastt-news-feed-server.azurewebsites.net',
            changeOrigin: true,
            pathRewrite: {'^/api': ''}
        }),
        proxy('/weather', {
            target: 'http://api.openweathermap.org/data/2.5/weather',
            changeOrigin: true,
            pathRewrite: {'^/weather': ''}
        })
    )
}

