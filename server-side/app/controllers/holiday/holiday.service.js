var holidaySchema = require("../../models/holidaySchema");
const request = require('request');
const cheerio = require('cheerio');
const config = require('../../config.json');

var thisYear = new Date().getFullYear()
update()

async function update() {
    let r1 = await checkForUpdate()
    if (r1 == "Valid") {
    } else if (r1 == "Updated") {
        await updateData()
    } else {
        throw new Error("Failed to fetch last update date")
    }

}

function checkForUpdate() {
    return new Promise(function (resolve, reject) {
        thisYear = new Date().getFullYear()
        var fs = require('fs')
        const lastFetch = parseInt(fs.readFileSync('./app/controllers/holiday/lastFetch.dat'))


        if (lastFetch == thisYear) {
            resolve("Valid")
        } else {
            resolve("Updated")
        }
    })
}

function updateData() {
    return new Promise(function (resolve, reject) {

        config.countryHoliday.forEach(country => {
            request(country.link, function (error, response, body) {
                const $ = cheerio.load(body)

                var t = $('html').find('td');
                var t2 = t.nextAll();

                var counter = 0;

                var title;
                var city = country.country;
                var dateString1 = ""
                var dateString2 = ""
                var content = "";
                t2.each(function (i, elem) {
                    counter++;
                    if (counter == 1) {
                        var month
                        switch ($(this).text().substring(0, 3)) {
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
                        var day = parseInt($(this).text().substring(4, 6))
                        if (month == -1) {
                            dateString = "error"
                        } else {
                            dateString1 = new Date(thisYear, month, day).toDateString()
                            dateString2 = new Date(thisYear, month, day + 1).toDateString()
                        }
                    } else if (counter == 2) {
                        title = $(this).text();
                    } else if (counter == 3) {
                        content += $(this).text();
                    }
                    if (counter == 4) {
                        content += (" " + $(this).text());
                        counter = 0;
                        saveToDb(title, city, content, dateString1, dateString2)
                        content = ""
                    }
                });
            })
        })
        var fs = require('fs')
        fs.writeFileSync('./app/controllers/holiday/lastFetch.dat', thisYear.toString())
        resolve("Updated")
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

module.exports.fetchHoliday = function () {
    update()
}


