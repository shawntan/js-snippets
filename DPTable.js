var counter =function(i) {return i;};
var DPTable = function(container_id,height,width,row_desc,col_desc) {
	row_desc = row_desc?row_desc:counter;
	col_desc = col_desc?col_desc:counter;
	var DELAY = 500;
	var event_queue = [],running = false;
	var table_gui = document.createElement("table"), table_body = table_gui;
	var table = new Array(height);

	var header_gui = document.createElement("tr");
	header_gui.appendChild(document.createElement("th"));
	for(var j=0;j<width;j++) {
		var cell = document.createElement("th");
		cell.innerHTML = col_desc(j);
		header_gui.appendChild(cell);
	}
	table_gui.appendChild(header_gui);

	for(var i=0;i<height;i++) {
		var row_gui = document.createElement("tr");
		table_gui.appendChild(row_gui);
		table[i] = [];
		var row_head = document.createElement("td");
		row_head.innerHTML = row_desc(i);
		row_gui.appendChild(row_head);
		for(var j=0;j<width;j++) {
			table[i].push(document.createElement("td"));
			table[i][j].value = 0;
			table[i][j].className = "value";
			row_gui.appendChild(table[i][j]);
		}
	}
	document.getElementById(container_id).appendChild(table_gui);

	function set(i,j,value) {
		table[i][j].value = value;
		add(function() {
			table[i][j].innerHTML = value;
			table[i][j].style.backgroundColor = "#FFFFAA";
			setTimeout(function(){table[i][j].style.backgroundColor = ""},DELAY/2);
		});
	}

	function get(i,j) {
		add(function() {
			table[i][j].style.backgroundColor = "#FFAAAA";
			setTimeout(function(){table[i][j].style.backgroundColor = ""},DELAY/2);
		});
		return table[i][j].value;
	}
	this.mark =  function(i,j,text) {
		add(function() {
			table[i][j].style.backgroundColor = "#FFDDAA";
			if(text) comment.innerHTML = text;
		});
	};

	function add(ani) {event_queue.push(ani);}
	function run() {
		setTimeout(function(){
			event_queue.shift()();
			if(running && event_queue.length>0) run();
		},DELAY);
	};
	var comment = document.createElement("div");
	comment.style['float'] = "right";
	this.$ = function(i,j,value,text){
		if(value!=null) set(i,j,value)
		else return get(i,j);
	};
	var start = function(){
		if(event_queue.length > 0) {
			running = true;
			run();
		}
	};
	var pause = function() {
		running = false;
	}
	var btn_start = document.createElement("button");
	btn_start.type = "button";
	btn_start.innerHTML = "Start";
	btn_start.onclick = function() {
		if(!running) {
			start();
			this.innerHTML = "Pause";
		} else {
			pause();
			this.innerHTML = "Start";
		}
	}
	document.getElementById(container_id).appendChild(btn_start);
	document.getElementById(container_id).appendChild(comment);

}

