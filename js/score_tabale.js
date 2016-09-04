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
	/*
	 * チェックボックス用のヘッダーとカラムオプションを作成
	 */
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
	/* 編集するたびに実行 */
	handsonTable.updateSettings({
		afterChange : function(changes, source) {
			var rowNum = changes[0][0];
			var colNum = changes[0][1];
			if (colNum != headerIndex['sum'] && colNum != headerIndex['per']
					&& handsonTable.getColHeader(colNum) != '') {
				save();
				calcSum(rowNum);
			}
		}
	});
}

/* 保存 */
function save() {
	var arrayData = handsonTable.getData();
	arrayData.forEach(function(data) {
		data.shift();
	});
	saveLocalStorage_Score(arrayData);
}

/* 合計値と得点率を計算 */
function calcSum(rowNum) {
	var arrayData = handsonTable.getDataAtRow(rowNum);
	var length = handsonTable.countCols();
	var sum = 0, percentage = 0;
	var maxSum = 0;
	for (var i = startSubject; i <= length - endSubject; i++) {
		var subjectName = handsonTable.getColHeader(i);
		if (arrayData[i] != null && arrayData[i] != '') {
			sum += Number(arrayData[i]);
			maxSum += Number(maxScore[subjectName]);
		}
	}
	if (sum == 0) {
		percentage = '';
		sum = '';
	} else {
		percentage = floatFormat((sum / maxSum) * 100, 1);
		sum = sum + '/' + maxSum;
	}
	// 合計
	handsonTable.setDataAtCell(rowNum, headerIndex['sum'], sum);
	// 得点率
	handsonTable.setDataAtCell(rowNum, headerIndex['per'], percentage);
}

/**
 * チェックボックスを全件チェックor解除
 */
function allCheck(check) {
	for (var i = 0; i < handsonTable.countRows(); i++) {
		handsonTable.setDataAtCell(i, 0, check);
	}
}