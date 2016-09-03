var headerTitle = [];
var columsOption = [];

function initMyTable(dataArray) {
	createTable(dataArray);
}

/**
 * 表のヘッダー項目を取得
 */
function getHedersInfo() {
	var headersInfoArray = loadHedersInfo();
	/* チェックボックス用のヘッダーとカラムオプションq
	 * を作成 */
	headerTitle.push(' ');
	columsOption.push({
		type : 'checkbox'
	});
	/* 各要素のヘッダーとカラムオプション作成 */
	var index = 0;
	headersInfoArray.forEach(function(hedersInfo) {
		headerTitle.push(hedersInfo[0]);
		var option = {};
		option['readOnly'] = hedersInfo[1];
		option['type'] = hedersInfo[2];
		columsOption.push(option);
		index++;
	});
	headerTitle = removeNullFromArray(headerTitle);
	columsOption = removeNullFromArray(columsOption);
}

/**
 * 入力用の表を作成
 */
function createTable(dataArray) {
	getHedersInfo();
	dataArray.forEach(function(data) {
		data.unshift('true');
	});
	var gridContainer = document.getElementById('grid');
	handsonTable = new Handsontable(gridContainer, {
		data : dataArray,
		startRows : 10,
		startCols : 10,
		colHeaders : true,
		fillHandle : true,
		maxRows : dataArray.length,
		colHeaders : headerTitle,
		columns : columsOption
	});
	/* 編集するたびに保存する */
	handsonTable.updateSettings({
		afterChange : function(changes, source) {
			save();
		}
	});
}

function save() {
	var arrayData = handsonTable.getData();
	arrayData.forEach(function(data) {
		data.shift();
	});
	saveLocalStorage_Score(arrayData);
}

/**
 * チェックボックスを全件チェックor解除
 */
function allCheck(check) {
	for (var i = 0; i < handsonTable.countRows(); i++) {
		handsonTable.setDataAtCell(i, 0, check);
	}
}