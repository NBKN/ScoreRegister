var saveKey = 'test';

function exec() {
	initTable();
}

function initTable() {
	var dataArray;
	if (localStorage.getItem(saveKey) != null) {
		dataArray = JSON.parse(localStorage.getItem(saveKey));
	} else {
		dataArray = origin_dataArray;
	}
	createTable(dataArray);
	initFilter();
}

function saveData() {
	localStorage.setItem(saveKey, JSON.stringify(handsonTable.getData()));
}

function getCSVFile() {
	var xhr = new XMLHttpRequest();
	xhr.open("get", "data/st_data.csv", true);
	xhr.send(null);
	xhr.onload = function() {
		convertCSV2Array(xhr.responseText);
	};
}

var csvArray = new Array();
function convertCSV2Array(csvData) {
	var tempArray = csvData.split("\n");
	for (var i = 0; i < tempArray.length; i++) {
		csvArray[i] = tempArray[i].split(",");
	}
	initTable(csvArray);
}