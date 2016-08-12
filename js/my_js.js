function exec() {
	initTable();
}

function initTable() {
	var dataArray;
	if (localStorage.getItem(SAVEKEY) != null) {
		dataArray = loadData();
	} else {
		dataArray = origin_dataArray;
	}
	createTable(dataArray);
	initFilter();
}

function save() {
	var arrayData = handsonTable.getData();
	saveData(arrayData);
}