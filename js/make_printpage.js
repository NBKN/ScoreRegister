
/**
 * プリント用データフォーマット
 * [ "会員番号", "名前", "科目名1, 得点, 偏差値, 順位, 平均点, 中央値", "科目名2... ], ...
 */

function doPrint() {
	/* サンプルデータ */
	var st_dataArray = [
			[ "000", "name0", "英語,100,50,1,40,50", "国語,200,50,2,40,50",
					"数1A,300,50,3,40,50", "数2B,400,50,4,40,50",
					"物理,500,50,5,40,50", "化学,600,50,6,40,50",
					"生物, 700, 50,7,40,50", "日本史,800,50,8,40,50",
					"世界史, 900,50,9,40,50" ],
			[ "001", "name1", "英語,100,50,1,40,50", "国語,200,50,2,40,50" ],
			[ "002", "name2", "英語,100,50,1,40,50", "数1A,300,50,3,40,50",
					"数2B,400,50,4,40,50", "生物, 700, 50,7,40,50" ] ];

	st_dataArray = makePrintData();
	makePrintSection(st_dataArray);
}

/**
 * 各会員の印刷ページを作成
 */
function makePrintSection(st_dataArray) {
	var article = document.getElementById("article");
	st_dataArray.forEach(function(st_data) {
		var sectionElement = document.createElement("section");
		sectionElement.className = 'print_page';
		sectionElement.innerHTML = '<h1 class="print_title">成績表</h1>';

		sectionElement.appendChild(makeMemberInfo(st_data));
		sectionElement.appendChild(makeScoreInfo(st_data));

		article.appendChild(sectionElement);
	});

	window.print();
	setTimeout(function() {
		article.innerHTML = '';
	}, 0);
}

/**
 * 会員情報部テーブル分作成
 */
function makeMemberInfo(st_data) {
	var memberId = st_data[0];
	var name = st_data[1];

	var headerItem = "会員番号,名前";
	headerItem = makeTableRow("th", headerItem);
	var rowItem = memberId + "," + name;
	rowItem = makeTableRow("td", rowItem);

	var memberInfo = headerItem + rowItem;
	var tableElement = document.createElement("table");
	tableElement.className = 'member_info';
	tableElement.innerHTML = memberInfo;

	return tableElement;
}

/**
 * 成績情報テーブル作成
 */
function makeScoreInfo(st_data) {
	var scoreInfo = ",得点,偏差値,順位,平均,中央値";
	scoreInfo = makeTableRow("th", scoreInfo);

	for (var i = 2; i < st_data.length; i++) {
		var rowItem = makeTableRow("td", st_data[i]);
		if (rowItem != null) {
			scoreInfo += rowItem;
		}
	}

	var tableElement = document.createElement("table");
	tableElement.className = 'score_info';
	tableElement.innerHTML = scoreInfo;

	return tableElement;
}

/**
 * 各行を作成するメソッド
 */
function makeTableRow(tag, item) {
	var row = "<tr>";
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

/**
 * 印刷用データ作成
 */
function makePrintData() {
	var cols = handsonTable.countCols();
	var memberSize = handsonTable.getDataAtCol(0).filter(function(elem) {
		return elem;
	}).length;

	var aveArray = [];
	var mediArray = [];
	var scoreArray = [];
	var rankArray = [];

	for (var subjectIndex = 2; subjectIndex < cols; subjectIndex++) {
		var subjectName = handsonTable.getColHeader(subjectIndex);
		scoreArray[subjectName] = handsonTable.getDataAtCol(subjectIndex)
				.filter(function(elem) {
					return elem;
				});

		if (scoreArray[subjectName].length > 0) {
			aveArray[subjectName] = average(scoreArray[subjectName]);
			mediArray[subjectName] = median(scoreArray[subjectName]);
		}
		rankArray[subjectName] = scoreArray[subjectName].sort(function(a, b) {
			if (a > b)
				return -1;
			if (a < b)
				return 1;
			return 0;
		});
	}

	var output = [];
	for (var memberIndex = 0; memberIndex < memberSize; memberIndex++) {
		var mamberData = handsonTable.getDataAtRow(memberIndex);
		output[memberIndex] = [];

		var memberId = mamberData[0];
		output[memberIndex].push(memberId);

		var name = mamberData[1];
		output[memberIndex].push(name);

		for (var subjectIndex = 2; subjectIndex < cols; subjectIndex++) {
			var score = mamberData[subjectIndex];

			if (score != null && score != '') {
				var subjectName = handsonTable.getColHeader(subjectIndex);
				var ss = standard_score(score, scoreArray[subjectName]);
				var rank = getRank(score, rankArray[subjectName],
						mediArray[subjectName])
						+ '/' + rankArray[subjectName].length;
				var scoreData = subjectName + ',' + score + ',' + ss + ','
						+ rank + ',' + aveArray[subjectName] + ','
						+ mediArray[subjectName];
				output[memberIndex].push(scoreData);
			}
		}
	}
	return output;
}

function getRank(score, rankArray, medi) {
	if (score < medi) {
		for (var i = 0; i < rankArray.length; i++) {
			if (score == rankArray[i]) {
				return i + 1;
			}
		}
	} else {
		for (var i = rankArray.length - 1; i >= 0; i--) {
			if (score == rankArray[i]) {
				return i + 1;
			}
		}
	}
	return -1;
}