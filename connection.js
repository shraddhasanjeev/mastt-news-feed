console.log("connect")
var http = require('http');
var options = {
    host: '127.0.0.1',
    port: '8888',
    path: '/holiday',
    method: 'GET'
};

var req = http.request(options, function (incoming_msg) {
	console.log("respones status " + incoming_msg.statusCode);

	// 监听IncomingMessage的data事件，当收到服务器发过来的数据的时候，触发这个事件
	incoming_msg.on("data", function (data) {
		if (incoming_msg.statusCode === 200) {
			console.log(data.toString());
		}
	});

});
// write the request parameters
req.end();