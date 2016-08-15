var headerTitle = [];
var columsOption = [];

function initMyTable(dataArray) {
	createTable(dataArray);
	createChackBoxTable();
}

/**
 * 表のヘッダー項目を取得
 */
function getHedersInfo() {
	var headersInfoArray = loadHedersInfo();

	headersInfoArray.forEach(function(hedersInfo) {
		headerTitle.push(hedersInfo[0]);
		var option = {};
		option['readOnly'] = hedersInfo[1];
		option['type'] = hedersInfo[2];
		columsOption.push(option);
	});
	headerTitle = removeNullFromArray(headerTitle);
	columsOption = removeNullFromArray(columsOption);
}

/**
 * 入力用の表を作成
 */
function createTable(dataArray) {
	getHedersInfo();
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
	saveLocalStorage_Score(arrayData);
}

/**
 * 印刷チェックボックス用の表を作成
 */
var allChecked = [];
function createChackBoxTable() {
	var rows = handsonTable.countRows();
	for (var i = 0; i < rows; i++) {
		allChecked.push([ true ]);
	}

	var gridContainer = document.getElementById('checkbox_table');
	checkboxTable = new Handsontable(gridContainer, {
		data : allChecked,
		startRows : 10,
		startCols : 10,
		colWidths : 30,
		rowHeigts : handsonTable.getRowHeight(0),
		colHeaders : true,
		fillHandle : false,
		maxRows : rows,
		colHeaders : [ '　　　　' ], // 成績入力表のヘッダーの高さと揃えるために空白を入れておく
		columns : [ {
			type : 'checkbox'
		} ]
	});
}

/**
 * チェックボックスを全件チェックor解除
 */
function allCheck(check) {
	for (var i = 0; i < checkboxTable.countRows(); i++) {
		checkboxTable.setDataAtCell(i, 0, check);
	}
}