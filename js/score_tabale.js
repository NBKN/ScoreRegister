
var headerTitle = [];
var columsOption = [];

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

function createTable(dataArray) {
	getHedersInfo();
	var gridContainer = document.getElementById('grid');
	handsonTable = new Handsontable(gridContainer, {
		data : dataArray,
		startRows : 10,
		startCols : 10,
		rowHeaders : true,
		colHeaders : true,
		minSpareRows : 1,
		fillHandle : true,
		colHeaders : headerTitle,
		columns : columsOption
	});
}