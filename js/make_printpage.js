
function makePrintSection() {
	var sectionElement = document.createElement("section");
	sectionElement.className = 'print_page';
	sectionElement.innerHTML = '<h1>成績表</h1>';

	sectionElement.appendChild(makeMemberInfo(100, "aaa"));

	var article = document.getElementById("article");
	article.appendChild(sectionElement);
}

function makeMemberInfo(memberId, name) {
	var headerItem = "会員番号,名前";
	headerItem = makeTableHeader(headerItem);
	var memberInfo = headerItem + "<td>" + memberId + "</td><td>" + name + "</td></tr>";

	var tableElement = document.createElement("table");
	tableElement.className = 'member_info';
	tableElement.innerHTML = memberInfo;

	return tableElement;
}

function makeScoreInfo(subjet, score, ave, median) {
	var headerItem = "得点,偏差値,順位,平均,中央値";
	headerItem = makeTableHeader(headerItem);

	var tableElement = document.createElement("table");
	tableElement.className = 'score_info';
	tableElement.innerHTML = scoreInfo;

	return tableElement;
}


function makeTableHeader(headerItem) {
	var header = "<tr>";
	var headerItemArray = headerItem.split(",");
	for (var i = 0; i < headerItemArray.length; i++) {
		header += "<th>" + headerItemArray[i] + "</th>";
	}
	header += "</tr>";
	return header;
}

function make(headerItem) {
	var header = "<tr>";
	var headerItemArray = headerItem.split(",");
	for (var i = 0; i < headerItemArray.length; i++) {
		header += "<th>" + headerItemArray[i] + "</th>";
	}
	header += "</tr>";
	return header;
}
