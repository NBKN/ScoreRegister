var SCORE_SAVEKEY = 'score_save_key';
var HEADER_SAVEKEY = 'header_save_key';

var handsonTable;

var defaultHeaderDefine = {
	'id' : [ '番号', true, 'text' ],
	'name' : [ '名前', true, 'text' ],
	'type' : [ '文理', true, 'text' ],
	'e' : [ '英語', false, 'numeric' ],
	'j_n' : [ '現文', false, 'numeric' ],
	'j_a' : [ '古典', false, 'numeric' ],
	'j_c' : [ '漢文', false, 'numeric' ],
	'm_1a' : [ '数ⅠA', false, 'numeric' ],
	'm_2b' : [ '数ⅡB', false, 'numeric' ],
	'phy_b' : [ '物_基', false, 'numeric' ],
	'phy' : [ '物理', false, 'numeric' ],
	'bio_b' : [ '生_基', false, 'numeric' ],
	'bio' : [ '生物', false, 'numeric' ],
	'che_b' : [ '化_基', false, 'numeric' ],
	'che' : [ '化学', false, 'numeric' ],
	'his_j' : [ '日本', false, 'numeric' ],
	'his_w' : [ '世界', false, 'numeric' ],
	'ga' : [ '政経', false, 'numeric' ],
	'geo' : [ '地理', false, 'numeric' ],
	'sum' : [ '合計得点', false, 'text' ],
	'per' : [ '得点率(%)', false, 'text' ]
};

/* ヘッダーの何列目からが科目か */
var startSubject = 4;
/* 後ろから何番目目までか */
var endSubject = 3;

/* 上のデータを整形 */
var defaultHeaderData = (function() {
	var array = [];
	for ( var key in defaultHeaderDefine) {
		var tmp = [];
		for (var i = 0; i < 3; i++) {
			tmp.push(defaultHeaderDefine[key][i]);
		}
		array.push(tmp);
	}
	return array;
}());

/* 各単元の最大得点 科目名は上と対応させる */
var maxScore = {
	'英語' : 200,
	'現文' : 100,
	'古典' : 50,
	'漢文' : 50,
	'数ⅠA' : 100,
	'数ⅡB' : 100,
	'物_基' : 50,
	'物理' : 100,
	'生_基' : 50,
	'生物' : 100,
	'化_基' : 50,
	'化学' : 100,
	'日本' : 100,
	'世界' : 100,
	'政経' : 100,
	'地理' : 100
};

/* ヘッダーのインデックス */
var headerIndex = (function() {
	var array = [];
	for ( var key in defaultHeaderDefine) {
		/* 簡易名、正式名、どちらでも指定できるようにしておく */
		array[key] = getHederIndex(key);
		array[defaultHeaderDefine[key][0]] = getHederIndex(key);
	}
	return array;
}());

function getHederIndex(easyName) {
	for (var i = 0; i < defaultHeaderData.length; i++) {
		if (defaultHeaderData[i][0] == defaultHeaderDefine[easyName][0]) {
			return i+1;
		}
	}
	return -1;
}

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
		if (tempArray[i] != null && tempArray[i].length > 0) {
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
	var _pow = Math.pow(10, n);
	return Math.round(number * _pow) / _pow;
}