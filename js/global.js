var SCORE_SAVEKEY = 'test2';
var HEADER_SAVEKEY = 'header2';

var handsonTable;
var checkboxTable;

function saveLocalStorage_Score(dataArray) {
	localStorage.setItem(SCORE_SAVEKEY, JSON.stringify(dataArray));
}

function loadLocalStorage_Score() {
	return JSON.parse(localStorage.getItem(SCORE_SAVEKEY));
}

function loadLocalStorage_Header() {
	return JSON.parse(localStorage.getItem(HEADER_SAVEKEY));
}

function loadHedersInfo() {
	var defaultData = [ [ '会員番号', true, 'text' ], [ '名前', true, 'text' ],
			[ '英語', false, 'numeric' ], [ '国語', false, 'numeric' ],
			[ '数ⅠA', false, 'numeric' ], [ '数ⅡB', false, 'numeric' ],
			[ '物理', false, 'numeric' ], [ '化学', false, 'numeric' ],
			[ '生物', false, 'numeric' ], [ '日本史', false, 'numeric' ],
			[ '世界史', false, 'numeric' ] ];

	var headerData = loadLocalStorage_Header();
	if (headerData == null) {
		headerData = defaultData;
	}
	return headerData;
}

function removeNullFromArray(array) {
	return array.filter(function(elem) {
		return elem;
	});
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