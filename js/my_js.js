function exec() {
	initTable();
}

function initTable() {
	var dataArray = loadLocalStorage_Score();
	if (dataArray != null) {
		initMyTable(dataArray);
		initMyFilter();
	} else {
		alert('データがありません。\n管理画面から読み込んでください。')
	}
}

function save() {
	var arrayData = handsonTable.getData();
	saveLocalStorage_Score(arrayData);
}