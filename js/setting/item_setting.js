function initItemTab() {
	createTable();
}

var itemSettingTable;
function createTable() {
	var gridContainer = document.getElementById('item_setting');
	itemSettingTable = new Handsontable(gridContainer, {
		data : loadHedersInfo(),
		colWidths : 200,
		startRows : 10,
		startCols : 10,
		rowHeaders : true,
		colHeaders : true,
		minSpareRows : 1,
		fillHandle : true,
		colHeaders : [ '表示項目', '編集不可', '形式' ],
		columns : [ {
			type : 'text'
		}, {
			type : 'checkbox'
		}, {
			editor : 'select',
			selectOptions : [ 'text', 'numeric' ]
		} ]
	});
}

function saveHeaderData() {
	if (window.confirm('既に入力されている表データとズレてしまいますが\nよろしいですか？')) {
		var headerInfoArray = itemSettingTable.getData();
		var saveData = [];
		headerInfoArray.forEach(function(hedersInfo) {
			if (hedersInfo[0] != null && hedersInfo[0].length > 0) {
				saveData.push(hedersInfo);
			}
		});
		localStorage.setItem(HEADER_SAVEKEY, JSON.stringify(saveData));
	}
}

function resetData() {
	itemSettingTable.loadData(defaultHeaderData);
}