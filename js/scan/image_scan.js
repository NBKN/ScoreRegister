/*
 * クリックして色を取得する座標を固定, もう一度クリックして解除
 */

var canvas, ctx, colors = [], img, display, inputs, picker, holding = false;

var CELL_W = 93;
var CELL_H = 27;

var COL_SIZE = 7;
var ROW_SIZE = 15;

/* どのくらいマークされてたら許容するか */
var CELL_W_PERCENTAGE = CELL_W - 10;
var CELL_H_PERCENTAGE = CELL_H - 10;

function $id(id) {
	return document.getElementById(id);
}

var result_canvas;
var result_ctx;

function init() {
	// 画像
	img = $id('img');
	// 色情報を取得するためのcanvas
	canvas = document.createElement('canvas');
	ctx = canvas.getContext('2d');
	// 解析結果表示用のcanvas
	result_canvas = $id('canvas');
	result_ctx = result_canvas.getContext('2d');

	loadComplete();
}

function loadComplete() {
	canvas.width = img.width;
	canvas.height = img.height;
	result_canvas.width = img.width;
	result_canvas.height = img.height;

	ctx.drawImage(img, 0, 0);

	var w, h, data, n, r, g, b;
	var ans_cnt = 0;

	w = canvas.width;
	h = canvas.height;
	data = ctx.getImageData(0, 0, w, h).data;

	var answer = [];
	/* 答えの配列初期化 */
	for (var y = 0; y < 10; y += 1) {
		answer[y] = 0;
	}

	/* 開始地点を探索 */
	var start_x = 10000;
	var start_y = 10000;
	for (var y = 0; y < h - 1; y++) {
		for (var x = 0; x < w - 1; x++) {
			n = x * 4 + y * w * 4;
			r = data[n];
			g = data[n + 1];
			b = data[n + 2];
			if (r == 0 && g == 0 && b == 0) {
				if (start_x > x) {
					start_x = x;
				}
				if (start_y > y) {
					start_y = y;
				}
			}
		}
	}

	var cell_x_min, cell_y_min, cell_x_max, cell_y_max; // マークされているセルの端っこ
	var row_num = 0; // 行番号
	for (var col = start_y; col < h - CELL_H; col += CELL_H) {
		var cell_num = 0; // セルの番号（回答の番号）
		for (var row = start_x; row <= w - CELL_W; row += CELL_W) {
			cell_num++;
			cell_y_min = col;
			cell_y_max = col + CELL_H;
			var tmp_y_size = 0; // y方向の黒いピクセルカウント用
			for (var y = col; y <= col + CELL_H; y += 1) {
				if (y == col) {
				}
				cell_x_min = row;
				cell_x_max = row + CELL_W;
				var tmp_x_size = 0; // x方向の黒いピクセルカウント用
				for (var x = row; x <= row + CELL_W; x += 1) {
					n = x * 4 + y * w * 4;
					r = data[n];
					g = data[n + 1];
					b = data[n + 2];
					if (r == 0 && g == 0 && b == 0) {
						tmp_x_size++;
					}
				}
				if (tmp_x_size >= CELL_W_PERCENTAGE) {
					tmp_y_size++;
				}
			}
			/* セルが一定以上塗られていたら */
			if (tmp_y_size >= CELL_H_PERCENTAGE) {
				ans_cnt++;
				result_ctx.fillRect(cell_x_min, cell_y_min, cell_x_max
						- cell_x_min, cell_y_max - cell_y_min);
				answer[row_num] = cell_num;
			}
		}
		row_num++;
	}
	console.log(ans_cnt);
	console.log(answer);
}

window.onload = function() {
	// ファイルが選択されたらイベントを実行する
	document
			.getElementById("file")
			.addEventListener(
					"change",
					function() {
						// フォームで選択された全ファイルを取得
						var fileList = this.files;
						// 個数分の画像を表示する
						for (var i = 0, l = fileList.length; l > i; i++) {
							// [FileReader]クラスを起動
							var fileReader = new FileReader();

							// 読み込み後の処理を決めておく
							fileReader.onload = function() {
								// データURIを取得
								var dataUri = this.result;

								// HTMLに書き出し (src属性にデータURIを指定)
								document.getElementById("output").innerHTML += '<img id="img" src="'
										+ dataUri + '" style="float:left">';

							}
							// ファイルをデータURIとして読み込む
							fileReader.readAsDataURL(fileList[i]);
						}
					});
};
