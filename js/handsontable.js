var handsonTable;

function createTable(dataArray) {
	var gridContainer = document.getElementById('grid');
	table = new Handsontable(gridContainer, {
		data : dataArray,
		startRows : 10,
		startCols : 10,
		rowHeaders : true,
		colHeaders : true,
		minSpareRows : 1,
		fillHandle : true,
		colHeaders : [ '会員番号', '名前', '英語', '国語', '数ⅠA', '数ⅡB', '物理', '化学',
				'生物', '日本史', '世界史' ],
		columns : [ {
			"readOnly" : true
		}, {
			"readOnly" : true
		}, {
			"readOnly" : false,
			type : 'numeric'
		}, {
			"readOnly" : false,
			type : 'numeric'
		}, {
			"readOnly" : false,
			type : 'numeric'
		}, {
			"readOnly" : false,
			type : 'numeric'
		}, {
			"readOnly" : false,
			type : 'numeric'
		}, {
			"readOnly" : false,
			type : 'numeric'
		}, {
			"readOnly" : false,
			type : 'numeric'
		}, {
			"readOnly" : false,
			type : 'numeric'
		}, {
			"readOnly" : false,
			type : 'numeric'
		} ]
	});
}