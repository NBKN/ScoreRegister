
var SAVEKEY = 'test2';

function saveData(dataArray) {
	localStorage.setItem(SAVEKEY, JSON.stringify(dataArray));
}

function loadData() {
	return JSON.parse(localStorage.getItem(SAVEKEY));
}

function convertCSV2Array(csvData) {
	var csvArray = new Array();
	var tempArray = csvData.split('\n');
	for (var i = 0; i < tempArray.length; i++) {
		tempArray[i] = tempArray[i].replace(/\n/g, '');
		csvArray[i] = tempArray[i].split(',');
	}
	return csvArray;
}

function convertArray2CSV(array) {
	var csv = '';
	for (var i = 0; i < array.length; i++) {
		if (array[i][0] == null || array[i][0].length <= 0) {
			continue;
		}
		var member = array[i];
		for (var j = 0; j < member.length; j++) {
			if (member[j] == null) {
				member[j] = '';
			} else if (member[j].length > 0) {
				member[j] = member[j].replace(/\r\n?|\n/g, '');
			}
			csv += member[j];
			if (j != member.length - 1) {
				csv += ',';
			} else {
				csv += '\n';
			}
		}
	}
	return csv;
}