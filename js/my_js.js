function exec() {
	initTable();
}

function initTable() {
	var dataArray = loadData();
	if (dataArray != null) {
		createTable(dataArray);
		initFilter();
	} else {
		alert('データがありません。\n管理画面から読み込んでください。')
	}
}

function save() {
	var arrayData = handsonTable.getData();
	saveData(arrayData);
}