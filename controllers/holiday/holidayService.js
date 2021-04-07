let date = new Date(2019, 5, 11, 5, 23, 59);
var data = [
    {
        "id": 1,
        "title": "New Year Festival",
        "image": "a URL",
        "start_date": new Date(2008, 9, 7),
        "end_date": new Date(2008, 10),
        "catagory": "holiday",
        "summary": "to be added",
    },
    {
        "id": 2,
        "title": "Moon Festival",
        "image": "a URL",
        "start_date": new Date(),
        "end_date": date,
        "catagory": "holiday",
        "summary": "to be added"
    }
]

module.exports.getHolidays = function () {
    return data
}