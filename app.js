const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const bodyParser = require('body-parser')

let rows = new Array(8);

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.get('/', function (req, res, next) {
	res.sendFile(__dirname + '/public/index.html')
})

app.post('/', function (req, res, next) {
	if(req.body.start === true) {
		console.log('Start requested');
		}
	for(var i = 0; i<8; i++) {
		if(req.body['row' + i] !== undefined) {
				//console.log(req.body['row' + i]);
				rows.splice(i,1,req.body['row' + i]);
				}
		}
	res.send('ok');
	//console.log(rows);
		
})
app.get('/flush', function (req, res, next) {
	console.log('flushing');
	console.log(rows.join(''));
	io.to('spectators').emit('new-state', rows.join(''));
	rows.length = 0;
	res.send('ok');
})

server.listen(3000, (err) => {
	console.log(err ? err : 'App running on port 3000');
})

let nowPlaying = false;

io.on('connection', function(client) {
	console.log('New connection');
	client.on('spectate', function(data) {
		client.join('spectators')
	});


	client.on('new-state', function (state) {
		console.log('Received new state');
		io.to('spectators').emit('new-state', state);
	})
});

// server.listen(5000);
