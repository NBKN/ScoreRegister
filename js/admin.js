function init() {
	if (!window.FileReader) {
		alert("File API がサポートされていません。");
		return false;
	}
	initFileLoadBtn();
	initDroppable();
}

/**
 * 表中のデータをcsvで出力
 */
function exportData() {
	var bom = new Uint8Array([ 0xEF, 0xBB, 0xBF ]);
	var dataArray = loadData();
	dataArray = convertArray2CSV(dataArray);
	var blob = new Blob([ bom, dataArray ], {
		"type" : "text/csv"
	});

	if (window.navigator.msSaveBlob) {
		window.navigator.msSaveBlob(blob, "score_data.csv");
		window.navigator.msSaveOrOpenBlob(blob, "score_data.csv");
	} else {
		document.getElementById("download").href = window.URL
				.createObjectURL(blob);
	}
}

function importData(str) {
	var dataArray = convertCSV2Array(str);
	saveData(dataArray);
	alert('データの読み込みに成功しました！');
}

/**
 * ファイル読み込みボタン押した時の動作
 */
function initFileLoadBtn() {
	var importBtn = document.getElementById('import');
	// ダイアログでファイルが選択された時
	importBtn.addEventListener("change", function(evt) {
		var file = evt.target.files;
		var reader = new FileReader();
		reader.readAsText(file[0]);
		reader.onload = function(ev) {
			importData(reader.result);
		}
	}, false);
}

/**
 * ファイルをドロップした時の動作
 */
function initDroppable() {
	var droppable = $("#droppable");
	var cancelEvent = function(event) {
		event.preventDefault();
		event.stopPropagation();
		return false;
	}

	droppable.bind("dragenter", cancelEvent);
	droppable.bind("dragover", cancelEvent);

	var handleDroppedFile = function(event) {
		var file = event.originalEvent.dataTransfer.files[0];
		var fileReader = new FileReader();
		fileReader.onload = function(event) {
			importData(event.target.result);
		}
		fileReader.readAsText(file);
		cancelEvent(event);
		return false;
	}
	droppable.bind("drop", handleDroppedFile);
}
