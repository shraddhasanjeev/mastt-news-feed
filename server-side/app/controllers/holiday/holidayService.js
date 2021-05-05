const { MessageQueue } = require("./MessageQueue");
var messageQueue = new MessageQueue();
var holidaySchema = require("../../models/holidaySchema");

var thisYear = new Date().getFullYear()
duration = (60*60*1000)*24 // 1 day

async function update() {
    let r1 = await checkForUpdate()
    if (r1 == "Valid") {
    } else if (r1 == "Updated") {
        await updateData()
        await extractInfo()
    } else {
        throw new Error("Failed to fetch last update date")
    }
    
}

function checkForUpdate() {
    return new Promise(function (resolve, reject) {
        thisYear = new Date().getFullYear()
        var fs = require('fs')
        const lastFetch = parseInt(fs.readFileSync('./app/controllers/holiday/scripts/lastFetch.dat'))


        if (lastFetch == thisYear) {
            resolve("Valid")
        } else {
            resolve("Updated")
        }
    })
}

function updateData() {
    return new Promise(function (resolve, reject) {
        var fs = require('fs')
        const spawn = require('child_process').spawn;
        const ls = spawn('python', ['./app/controllers/holiday/scripts/holidayFetch.py', 'arg1', 'arg2']);

        ls.stdout.on('data', (data) => {
            fs.writeFileSync('./app/controllers/holiday/scripts/lastFetch.dat', thisYear.toString())
            resolve("Updated")
        });

        ls.stderr.on('data', (data) => {
            reject("Failed to download data" + `${data}`);
        });

        ls.on('close', (code) => {
        });
    })
}

function extractInfo() {
    return new Promise(function (resolve, reject) {
        const spawn = require('child_process').spawn;
        const ls = spawn('python', ['./app/controllers/holiday/scripts/htmlParser.py', 'arg1', 'arg2']);

        ls.stdout.on('data', (data) => {
            retrunedData = `${data}`

            var arr = (retrunedData.substring(
                retrunedData.indexOf('(') + 1,
                retrunedData.lastIndexOf(')')
            )).split('), (')
            try {
                for (var index = 0; index < arr.length; index++) {
                    var temp = arr[index].split(",")
                    var month = -1
                    var day = 0
                    if (temp[2].length == 9) {
                        switch (temp[2].substring(2, 5)) {
                            case "Jan":
                                month = 0
                                break
                            case "Feb":
                                month = 1
                                break
                            case "Mar":
                                month = 2
                                break
                            case "Apr":
                                month = 3
                                break
                            case "May":
                                month = 4
                                break
                            case "Jun":
                                month = 5
                                break
                            case "Jul":
                                month = 6
                                break
                            case "Aug":
                                month = 7
                                break
                            case "Sep":
                                month = 8
                                break
                            case "Oct":
                                month = 9
                                break
                            case "Nov":
                                month = 10
                                break
                            case "Dec":
                                month = 11
                                break
                        }
                        day = parseInt(temp[2].substring(6, 8))
                    }

                    var dateString1 = ""
                    var dateString2 = ""
                    if (month == -1) {
                        dateString = "error"
                    } else {
                        dateString1 = new Date(thisYear, month, day).toDateString()
                        dateString2 = new Date(thisYear, month, day + 1).toDateString()
                    }
                    var title = temp[0].replace(/^(\s|\')+|(\s|\')+$/g, '')
                    var city = temp[1].replace(/\"/g, '').replace(/^(\s|\')+|(\s|\')+$/g, '')
                    var content = temp[3].replace(/\"/g, '').replace("\\xa0", "").replace(/^(\s|\')+|(\s|\')+$/g, '')

                    saveToDb(title, city, content, dateString1, dateString2)
                    resolve("Updated")
                }
            } catch (err) {

            }
            
        });

        ls.stderr.on('data', (data) => {
            reject("Failed to extract data" + ` ${data}`);
        });

        ls.on('close', (code) => {
        });
    })
}

function saveToDb(title, city, content, startDate, endDate) {
    var holidayItem = new holidaySchema({
        title: title,
        city: city,
        content: content,
        start_date: startDate,
        end_date: endDate
    })
    holidayItem.save()
        .catch(err => {
            console.log(err)
            errors.push(err)
        });
}

module.exports.initialize = function () {
    update()

    setInterval(function () {
        update()
    }, duration)
}

module.exports.getHolidays = function () {
    return messageQueue.getQueue();
}
