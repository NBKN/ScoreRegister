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
	var tableElement = document.createElement("table");
	tableElement.className = 'mark_sheet';

	var headerItem = '<tr class="row"><td id="begin_id" class="marked_cell"></td><td colspan="5">会員番号</td><td class="marked_cell"></td></tr>';
	tableElement.innerHTML = headerItem;

	memberInfo = makeTableRow('td class="mark_cell"', ' , , , , , , ',  'row');

	for (var y=0; y<10; y++) {
		var row = '';
		for (var i=0; i<=6; i++) {
			row += y + ',';
		}
		rowItem = makeTableRow('td class="mark_cell"', row.substr(0, row.length-1), 'row');
		memberInfo += rowItem;
	}
	tableElement.innerHTML += memberInfo;
	document.getElementById('id_area').appendChild(tableElement);
//    var rect = document.getElementById('begin_id').getBoundingClientRect();
//    console.log(rect.left + " " + rect.top);
//    console.log(document.getElementById('id_area').getBoundingClientRect().left + " " + document.getElementById('id_area').getBoundingClientRect().top);
//    document.getElementById('check_point').style.left = (rect.left) + 'px';
//    document.getElementById('check_point').style.top = rect.top;
}

function createMarkArea() {
	var dataArray = [];
	for (var i = 1; i < 10; i++) {
		dataArray.push(i);
	}
	dataArray.push(0);

	var mark_temple = '';
	for (var select_cnt = 0; select_cnt < 10; select_cnt++) {
		mark_temple += '<td class="mark_cell">' + dataArray[select_cnt] + '</td>';
	}

	var q_cnt = 1;
	for (var i = 0; i < 4; i++) {
		var rows = '';
		var markSheet = document.createElement('table');
		markSheet.className = 'mark_sheet';
		markSheet.innerHTML = '<tr class="row"><td>問</td><td class="marked_cell"></td><td colspan="8">解答記入欄</td><td class="marked_cell"></td></tr>';
		for (var q = q_cnt; q < q_cnt + 20; q++) {
			rows += '<tr class="row"><td class="mark_cell_index">' + q + '</td>';
			for (var select_cnt = 0; select_cnt < 10; select_cnt++) {
				rows += '<td class="mark_cell" id="' + q + '_' + dataArray[select_cnt] + '">' + dataArray[select_cnt] + '</td>';
			}
			+ '</tr>';
		}
		markSheet.innerHTML += rows;
		document.getElementById('mark_sheet_area').appendChild(markSheet);
		q_cnt += 20;
	}

	var test_data = [1,2,3,4,5,6,7,8,9,0,1,4,5,2,2,6,7,8];
	var index = 1;

	for (var i = 0; i < test_data.length; i++) {
		var id = index + '_' + test_data[i];
		console.log(id);
		document.getElementById(id).className = 'marked_cell';;
		index++;
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
