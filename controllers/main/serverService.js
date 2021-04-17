// 消息队列 Message Queue
const { MessageQueue } = require("./MessageQueue");
var messageQueue = new MessageQueue();

// 引入Id分配者
//有没有绝对路径用

// 更新队列
setInterval(function () {
    //messageQueue.update();
    //console.log("Message Queue Updated");
}, 1000);


// 导入数据
const holidayService = require('../holiday/holidayService')

// 需要回调函数
setInterval(function () {
    var data = holidayService.getHolidays()
    for (var index = 0; index < data.length; index++) {
        messageQueue.addMessage(data[index])
        
    }
}, 1000);

module.exports.getData = function () {
    return messageQueue.getQueue()
}

/** 
// express
const express = require('express');
const app = express();

// allocate each component an Id
// id range from 1 - 100, message from each componenent will be re-calculated an unique id,
// which is UID = (id+1) * 1000 + category_id
const { HashMap } = require('./data structure/HashMap');
var hashTable = new HashMap();

// Initialize all components
{
    let index = 0;
    for (var i in mainfest) {
        // set up component server
        require(mainfest[i].location);
        const { interface } = require(mainfest[i].location);

        // register the component in the hashTable
        hashTable.put(mainfest[i].category, index);
        index++;

        // assign the resigtered URL to that API
        app.get(mainfest[i].url, (req, res) => {
            res.json(interface())
        });

        // request immediately once
        {
            // http connection
            var options = {
                host: '127.0.0.1',
                port: '8888',
                path: mainfest[i].url,
                method: 'GET'
            };

            var req = http.request(options, function (res) {
                res.on("data", function (data) {
                    var compoenetQueue = JSON.parse(data);
                    for (var j in compoenetQueue) {
                        messageQueue.addMessage(compoenetQueue[j], hashTable.get(mainfest[i].category));
                    }
                });
            });
            // write the request parameters
            req.end();
        }
        

        // set up listener
        setInterval(function () {
            // http connection
            var options = {
                host: '127.0.0.1',
                port: '8888',
                path: mainfest[i].url,
                method: 'GET'
            };

            var req = http.request(options, function (res) {
                res.on("data", function (data) {
                    var compoenetQueue = JSON.parse(data);
                    for (var j in compoenetQueue) {
                        messageQueue.addMessage(compoenetQueue[j], hashTable.get(mainfest[i].category));
                    }
                });
            });
            // write the request parameters
            req.end();
        }, mainfest[i].frequency);
    }
}

// clear out-of-date messages


/* The main interface for the API.It would return a list of messages.
 */

/**
app.get('/', (req, res) => {
    //messageQueue[messageCount] = messageCount;
    //messageCount++;
    res.send(messageQueue.getQueue())
})
*/