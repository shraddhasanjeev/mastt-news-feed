const server = require('./serverService')

module.exports.welcomePage = function (req, res) {
    res.send(server.getData())
    res.end()
}