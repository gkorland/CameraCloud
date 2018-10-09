const http = require("http"), 
express = require('express'),
bodyParser = require('body-parser'),
WebSocket = require('ws'),
WebSocketServer = WebSocket.Server,
app = express(),
server = http.createServer(app);
port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'))

app.post('/image', function (req, res) {
	wss.clients.forEach(function each(client) {
		if (client.readyState === WebSocket.OPEN) {
			client.send(req.body.image);
		}
	});
	res.send('OK');
})

server.listen(port, () => console.log(`Redis Labs - EdgeX Foundry app listening on port ${port}!`));

const wss = new WebSocketServer({server: server});

wss.on('connection', function (ws) {
	ws.on('message', function (message) {
		console.log('received: %s', message)
	});
});