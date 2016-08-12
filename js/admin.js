function init() {
	if (!window.FileReader) {
		alert("File API がサポートされていません。");
		return false;
	}
	
	initItemTab();
	initDataTab();
}