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
	this.mark =  function(i,j) {
		add(function() {table[i][j].style.backgroundColor = "#FFDDAA";});
	};

	function add(ani) {event_queue.push(ani); if (!running) run()}
	function run() {
		running = true;
		setTimeout(function(){
			event_queue.shift()();
			if(event_queue.length>0) run();
			else running = false;
		},DELAY);
	}

	this.$ = function(i,j,value){
		if(value!=null) set(i,j,value)
		else return get(i,j);
	}
}

