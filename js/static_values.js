var SAVEKEY = 'test2';

function convertCSV2Array(csvData) {
	var csvArray = new Array();
	var tempArray = csvData.split("\n");
	for (var i = 0; i < tempArray.length; i++) {
		csvArray[i] = tempArray[i].split(",");
	}
	return csvArray;
}

function convertArray2CSV(array) {
	var csv = '';
	array.forEach(function(member) {
		for (var i = 0; i < member.length; i++) {
			csv += member[i];
			if (i != member.length - 1) {
				csv += ',';
			}
		}
	});
	return csv;
}