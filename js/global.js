var SCORE_SAVEKEY = 'score_save_key';
var HEADER_SAVEKEY = 'header_save_key';

var handsonTable;

function saveLocalStorage_Score(dataArray) {
	localStorage.setItem(SCORE_SAVEKEY, JSON.stringify(dataArray));
}

function loadLocalStorage_Score() {
	return JSON.parse(localStorage.getItem(SCORE_SAVEKEY));
}

function loadLocalStorage_Header() {
	return JSON.parse(localStorage.getItem(HEADER_SAVEKEY));
}

var defaultHeaderData = [ [ '名前', false, 'text' ],
		[ '英語', false, 'numeric' ], [ '現代文', false, 'numeric' ], 
		[ '古典', false, 'numeric' ], [ '漢文', false, 'numeric' ],
		[ '数ⅠA', false, 'numeric' ], [ '数ⅡB', false, 'numeric' ],
		[ '物理基礎', false, 'numeric' ], [ '物理', false, 'numeric' ],
		[ '生物基礎', false, 'numeric' ], [ '生物', false, 'numeric' ], [ '化学基礎', false, 'numeric' ],
		[ '化学', false, 'numeric' ], [ '日本史', false, 'numeric' ],
		[ '世界史', false, 'numeric' ], [ '合計得点', true, 'text' ], [ '得点率(%)', true, 'text' ] ];

var maxScore = [200, 100, 50, 50, 100, 100, 50, 100, 50, 100, 50, 100, 100, 100];

function loadHedersInfo() {
	var headerData = loadLocalStorage_Header();
	if (headerData == null) {
		headerData = defaultHeaderData;
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
		if(tempArray[i] != null && tempArray[i].length > 0) {
			csvArray[i] = tempArray[i].split(',');
		}
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

function floatFormat(number, n) {
	var _pow = Math.pow(10 , n) ;
	return Math.round(number * _pow) / _pow ;
}