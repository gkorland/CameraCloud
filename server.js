const http = require("http"), 
express = require('express'),
bodyParser = require('body-parser'),
WebSocket = require('ws'),
redis = require('redis'),
redisClient = redis.createClient({password:"foobared"}),
WebSocketServer = WebSocket.Server,
app = express(),
server = http.createServer(app);
port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/image', function (req, res) {
	wss.clients.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(req.body.image);
		}
	});
	res.send('OK');
});


var readStream = function(){
redisClient.xread('Block', 10000000, 'STREAMS', 'camera:0:yolo', '$',  function (err, stream) {
	readStream();
	if(err){
		return console.error(err);	
	}
	var image = stream[0][1][0][1][1];
	wss.clients.forEach(function each(client) {
        	if (client.readyState === WebSocket.OPEN) {
        		client.send(image);
	        }
        });
});
};

readStream();

server.listen(port, () => console.log(`Redis Labs - app listening on port ${port}!`));

const wss = new WebSocketServer({server: server});

wss.on('connection', function (ws) {
	ws.on('message', function (message) {
		console.log('received: %s', message)
	});
});
