

	var size = 800;
	var sqSize = size / 8;
	var sqAmount = 64;
	var sqPadding = 1;
	var innerSqSize = sqSize - 2*sqPadding;
	squaresSrc = [];
	for(var i = 0 ; i< sqAmount; i++)
		squaresSrc.push(i);


	var board = d3.select("#board");
	var squares = board.selectAll(".square")
		.data(squaresSrc)
		.enter().append("rect")
		.attr("class", "square")
		.attr("id", function (d, i) {
			return "sq-" + Math.floor(i/8) + '-' + i%8
		})
		.attr("x", function (d, i) {
			return i%8 * sqSize + sqPadding + "px";
		})
		.attr("y", function (d, i) {
			return Math.floor(i/8) * sqSize + sqPadding + "px";
		})
		.attr("width", innerSqSize + "px")
		.attr("height", innerSqSize + "px")
		.style("fill", function (d, i) {
			return (Math.floor(i/8) + i%8) % 2 ? "pink" : "yellow";
		});


	var pawnsSrc = [];
//	pawnsSrc.push({row: 2, column:2, id: "XDDDDDDD", color: "red"});



	function onNewPositions(positions) {
		console.log(positions);
		pawnsSrc = [];
		d3.selectAll('g').remove();
		positions.toString().split('').forEach(function (pawn, idx) {
			if(pawn !== '0' ) pawnsSrc.push({column: Math.floor(idx / 8), row: idx % 8, id: idx, color: pawn === '1' ? 'red' : 'black'})
		});

		let pawns = board.selectAll(".pawn")
			.data(pawnsSrc)
			.enter().append("g")
			.attr("class", "pawn")
			.attr("id", function (d) {
				return d.id;
			})
			.append("circle")
			.attr("r", innerSqSize/3 + "px")
			.attr("cx", function (d) {
				return d.row * sqSize + sqPadding + innerSqSize/2;
			})
			.attr("cy", function (d) {
				return d.column * sqSize + sqPadding + innerSqSize/2;
			})
			.style("fill", function (d) {
				return d.color;
			});


	}

	var socket = io('http://localhost:3000', (err) => console.log);
	socket.on('connect', function(){
		console.log('Connected');
		socket.emit('spectate')
	});

	socket.on('new-state', onNewPositions);



//	function findChanges(before, after) {
//
//	}


