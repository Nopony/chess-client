const io = require('socket.io-client');
const fs = require('fs');

let state = fs.readFileSync('1.state').toString();

console.log(state);

const socket = io('http://localhost:3000', () => {

});
socket.emit('play', '', () => {

});

setInterval(() => {
	console.log('Emitting...');
	var swapIdx = Math.floor(Math.random() * 63)
	state = state.split('');
	state[swapIdx] = ''+Math.floor(Math.random() * 3);
	state = state.join('').substr(0, 64);
	socket.emit('new-state', state)
}, 2000)

