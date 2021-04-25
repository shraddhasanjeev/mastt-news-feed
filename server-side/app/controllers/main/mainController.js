const service = require('./serverService')

module.exports.getData = function (req, res) {
    res.json(service.getData())
    res.end()
}