var headerTitle = [];
var columsOption = [];

function initTable() {
	createTable(dataArray);
	createChackBoxTable();
} 

/**
 * 入力用の表を作成
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
 * 印刷チェックボックス用の表を作成
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
}

function createChackBoxTable() {
	var rows = handsonTable.countRows();
	var data = [];
	for (var i = 0; i < rows; i++) {
		var tmp = [ true ];
		data.push(tmp);
	}

	var gridContainer = document.getElementById('checkbox_table');
	var checkboxTable = new Handsontable(gridContainer, {
		data : data,
		startRows : 10,
		startCols : 10,
		colHeaders : true,
		fillHandle : false,
		maxRows : rows,
		colHeaders : [ '印刷する' ],
		columns : [ {
			type : 'checkbox',
			checkedTemplate : 'yes',
			uncheckedTemplate : 'no'
		} ]
	});
}