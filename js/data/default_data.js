
var defaultHeaderDefine = {
	'id' : [ '番号', true, 'text' ],
	'name' : [ '名前', true, 'text' ],
	'type' : [ '文理', true, 'text' ],
	'e' : [ '英語', false, 'numeric' ],
	'j_n' : [ '現文', false, 'numeric' ],
	'j_a' : [ '古典', false, 'numeric' ],
	'j_c' : [ '漢文', false, 'numeric' ],
	'm_1a' : [ '数ⅠA', false, 'numeric' ],
	'm_2b' : [ '数ⅡB', false, 'numeric' ],
	'phy_b' : [ '物_基', false, 'numeric' ],
	'phy' : [ '物理', false, 'numeric' ],
	'bio_b' : [ '生_基', false, 'numeric' ],
	'bio' : [ '生物', false, 'numeric' ],
	'che_b' : [ '化_基', false, 'numeric' ],
	'che' : [ '化学', false, 'numeric' ],
	'his_j' : [ '日本', false, 'numeric' ],
	'his_w' : [ '世界', false, 'numeric' ],
	'ga' : [ '政経', false, 'numeric' ],
	'geo' : [ '地理', false, 'numeric' ],
	'sum' : [ '合計得点', false, 'text' ],
	'per' : [ '得点率(%)', false, 'text' ]
};

/* ヘッダーの何列目からが科目か */
var startSubject = 4;
/* 後ろから何番目目までか */
var endSubject = 3;

/* 各単元の最大得点 科目名は上と対応させる */
var maxScore = {
	'英語' : 200,
	'現文' : 100,
	'古典' : 50,
	'漢文' : 50,
	'数ⅠA' : 100,
	'数ⅡB' : 100,
	'物_基' : 50,
	'物理' : 100,
	'生_基' : 50,
	'生物' : 100,
	'化_基' : 50,
	'化学' : 100,
	'日本' : 100,
	'世界' : 100,
	'政経' : 100,
	'地理' : 100
};