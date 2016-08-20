window.onload = function() {
	createNameArea();
	createIdArea();
	createMarkArea();
};

function createNameArea() {
	var headerItem = "名前";
	headerItem = makeTableRow("th", headerItem);
	rowItem = makeTableRow("td", " ");

	var memberInfo = headerItem + rowItem;
	var tableElement = document.createElement("table");
	tableElement.className = 'name_area';
	tableElement.innerHTML = memberInfo;

	document.getElementById('name_area').appendChild(tableElement);
}

function createIdArea() {
	var headerItem = "会員番号";
	headerItem = makeTableRow('th colspan="7"', headerItem);
	headerItem += makeTableRow('td class="mark_cell"', ' , , , , , , ');
	rowItem = makeTableRow('td class="mark_cell"', "0,1,2,3,4,5,6", 'row');

	var memberInfo = headerItem;
	for (var i=0; i<6; i++) {
		memberInfo += rowItem;
	}
	var tableElement = document.createElement("table");
	tableElement.className = 'mark_sheet';
	tableElement.innerHTML = memberInfo;

	document.getElementById('id_area').appendChild(tableElement);
}

function createMarkArea() {
	var dataArray = [];
	for (var i = 1; i < 10; i++) {
		dataArray.push(i);
	}
	dataArray.push(0);

	var mark_temple = '';
	for (var select_cnt = 0; select_cnt < 10; select_cnt++) {
		mark_temple += '<td class="mark_cell">' + dataArray[select_cnt] + '</td>'
	}

	var q_cnt = 1;
	for (var i = 0; i < 4; i++) {
		var rows = '';
		var markSheet = document.createElement('table');
		markSheet.className = 'mark_sheet';
		markSheet.innerHTML = '<tr><td>問</td><td colspan="10">解答記入欄</td></tr>';
		for (var q = q_cnt; q < q_cnt + 20; q++) {
			rows += '<tr class="row"><td class="mark_cell_index">' + q + '</td>' + mark_temple + '</tr>';
		}
		markSheet.innerHTML += rows;
		document.getElementById('mark_sheet_area').appendChild(markSheet);
		q_cnt += 20;
	}
}

/**
 * 各行を作成するメソッド
 */
function makeTableRow(tag, item, trClass='') {
	var row = "<tr>";
	if(trClass != '') {
		row = '<tr class="' + trClass +  '">';
	}
	var itemArray = item.split(",");
	if (itemArray[1] == '') {
		return null;
	}
	for (var i = 0; i < itemArray.length; i++) {
		row += "<" + tag + ">" + itemArray[i] + "</" + tag + ">";
	}
	row += "</tr>";
	return row;
}

function doPrint() {
	window.print();

}
