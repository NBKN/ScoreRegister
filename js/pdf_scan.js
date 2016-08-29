var ctx, colors = [], img, display, inputs, picker, holding = false;
var result_canvas;
var result_ctx;

var start_x = 0;
var start_y = 0;
var end_x = 0;
var end_y = 0;

var CELL_W = 0;
var CELL_H = 0;
var COL_SIZE = 0;
var ROW_SIZE = 0;

var MEMBER_ID_DIG = 6; // 会員番号の桁数

/* どのくらいマークされてたら許容するか */
var CELL_W_PERCENTAGE = CELL_W - 2;
var CELL_H_PERCENTAGE = CELL_H - 5;

var FEASIBLE_PERCENTAGE = 30;

function $id(id) {
	return document.getElementById(id);
}

var width, height, pixels, r, g, b;

var answerMesh;
var resultMesh = [];
var resultCnt = 0;
var debug = false;

function doScan(url, type) {
	PDFJS.getDocument(url).then(function(pdf) {
		return pdf.getPage(1);
	}).then(function(page) {
		var scale = 1.0;
		var viewport = page.getViewport(scale);
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');

		canvas.height = viewport.height;
		canvas.width = viewport.width;

		var renderContext = {
			canvasContext : context,
			viewport : viewport
		};

		if(debug) {
			$id('scaned_data').appendChild(canvas);
		}

		page.render(renderContext).promise.then((e)=> {
			width = canvas.width;
			height = canvas.height;
			pixels = context.getImageData(0, 0, width, height).data;
// scanMemberID();
			if(type == 0) {
				answerMesh = scanMarkSheet();
				answerMesh = modisyMesh(answerMesh);
// findStandardMark(context);
			}

			if(type == 1) {
				var tmpMesh = scanMarkSheet();
				tmpMesh = modisyMesh(tmpMesh);
				resultMesh[resultCnt] = checkAnswer(tmpMesh);
				resultCnt++;
			}
		});
	});
}

/**
 * 正解マークシートの読み取り
 */
function scanMarkSheet() {
	var ans = [];
	for (var x = 0; x < width - 1; x++) {
		ans[x] = [];
		for (var y = 0; y < height - 1; y++) {
			if (isBlackPixel(x, y)) {
				ans[x][y] = 1;
			} else {
				ans[x][y] = 0;
			}
		}
	}

	if(debug) {
		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		canvas.width = ans.length;
		canvas.height = ans[0].length;
		context.fillStyle = 'rgb(255, 0, 0)';
		for (var x = 0; x < canvas.width - 1; x++) {
			for (var y = 0; y < canvas.height - 1; y++) {
				if (ans[x][y] == 1) {
					context.fillRect(x, y, 1, 1);
				}
			}
		}
		$id('scaned_data').appendChild(canvas);
	}
	return ans;
}

function modisyMesh(mesh) {
	var result = [];
	var r_x = 0;
	for (var x = 1; x < mesh.length - 1; x+=2) {
		result[r_x] = [];
		var r_y = 0;
		for (var y = 1; y < mesh[x].length - 1; y+=2) {
			var sum = 0;
			for(var k=-1; k<=1; k++) {
				for(var l=-1; l<=1; l++){
					sum += mesh[x + k][y + l];
				}
			}
			if(sum/9 == 1)
				result[r_x][r_y] = 1;
			else 
				result[r_x][r_y] = 0;
			r_y++;
		}
		r_x++;
	}
	return result;
}

/**
 * 正解マークと回答マークを比較し、正誤を判定
 */
function checkAnswer(inputMesh) {
	var result = [];

	console.log(answerMesh);
	console.log(inputMesh);
	for(var i=0; i<answerMesh.length; i++) {
		result[i] = []
		for(var j=0; j<answerMesh[i].length; j++) {
			if(inputMesh[i][j] == null) {
				continue;
			}
			result[i][j] = inputMesh[i][j] - answerMesh[i][j];
		}
	}
	console.log(result);
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');
	canvas.width = result.length;
	canvas.height = result[0].length;
	context.fillStyle = 'rgb(255, 0, 0)';
	for (var x = 0; x < canvas.width - 1; x++) {
		for (var y = 0; y < canvas.height - 1; y++) {
			if (result[x][y] != 0) {
				context.fillRect(x, y, 1, 1);
			}
		}
	}
	$id('scaned_data').appendChild(canvas);
	return result;
}

function isBlackPixel(x, y) {
	var base = (x + y * width) * 4;
	r = pixels[base + 0];
	g = pixels[base + 1];
	b = pixels[base + 2];
	if (r < 10 && g < 10 && b < 10) {
		return true;
	}
	return false;
}

/**
 * 基準マークを探し、マークのサイズを設定
 */
function findStandardMark(context) {
	/* 開始地点を探索 */
	LOOP: for (var x = 0; x < width - 1; x++) {
		for (var y = 0; y < height - 1; y++) {
			if (!isBlackPixel(x, y)) {
				continue;
			}
			var xx;
			for (xx = x; xx < width - 1; xx++) {
				context.fillStyle = 'rgb(255, 0, 0)';
				context.fillRect(xx, y, 1, 1);
				if (isBlackPixel(xx, y)) {
					CELL_W++;
				} else {
					start_x = xx - CELL_W;
					break;
				}
			}
			var x_flag = false;
			for (var xxx = xx; xxx < width - 1; xxx++) {
				if (isBlackPixel(xxx, y)) {
					x_flag = true;
					context.fillStyle = 'rgb(255, 0, 0)';
					context.fillRect(xxx, y, 1, 1);
				} else if(x_flag) {
					end_x = xxx;
					break;
				}
			}
			for (var yy = y; yy < height - 1; yy++) {
				if (isBlackPixel(x, yy)) {
					context.fillStyle = 'rgb(255, 0, 0)';
					context.fillRect(x, yy, 1, 1);
					CELL_H++;
				} else {
					start_y = yy + CELL_H;
					break;
				}
			}
			break LOOP;
		}
	}
//
// var y_flag = false;
// for (var y = height - 2; y >= 0; y--) {
// context.fillStyle = 'rgb(255, 0, 0)';
// context.fillRect(start_x, y, 1, 1);
// if (isBlackPixel(start_x, y)) {
// end_y = y;
// break;
// }
// }
}

/**
 * 会員番号のマークを読み取り
 */
function scanMemberID() {
	var answer = [];
	var point = [];

	
	/* 答えの配列初期化 */
	for (var y = 0; y < 7; y += 1) {
		answer[y] = -1;
	}
	var color= 0;
	var cell_cnt = 0;

	var cell_num = 0; // セルの番号（回答の番号）

	console.log(CELL_H);

	console.log(start_y);

	console.log(end_y);
	console.log((end_y-start_y)/CELL_H);

	for(var col = start_x; col<= end_x; col++) {

		if(col%CELL_W == 0) {
// cell_num++;
		}
	var row_num = 0; // 行番号

	for (var row = start_y; row <= end_y; row += 1) {

		if(row % CELL_H == 0) {
// row_num++;
		}

// context.fillStyle = 'rgb(' +color +',' + 0+ ', 0)';
// color += 10;
// context.fillRect(col, start_y, 10, 10);

		if (!isBlackPixel(col, row)) {
			continue;
		}
		var tmp_cnt = 0;
		var min_y=0, min_x = 0;
		for (var y = row; y <= row+CELL_H; y += 1) {
			for (var x = col; x <= col+CELL_W; x += 1) {
				if (isBlackPixel(x, y)) {
					if(min_y == 0) {
						min_y = y;
					}
					if(min_x == 0) {
						min_x = x;
					}
					tmp_cnt++;
				}
			}
		}
		if(isMarked(tmp_cnt)) {
			context.fillStyle = 'rgb(0, 255, 0)';
			context.fillRect(min_x, min_y, CELL_W, CELL_H);
			col += CELL_W;
			row += CELL_H;
			answer[cell_num] = row_num;
			point[cell_cnt] = [min_x, min_y];
			cell_cnt++;
		}
	}
}


	for(var i=0; i<cell_cnt; i++) {
		console.log(i  + ' ' + (point[i][1] - start_y)/CELL_H);
	}
	
	
	//
// var cell_x_min, cell_y_min, cell_x_max, cell_y_max; // マークされているセルの端っこ
// var row_num = 0; // 行番号
// for (var row = start_y; row <= start_y+CELL_H*10; row += CELL_H) {
// var cell_num = 0; // セルの番号（回答の番号）
// for (var col = start_x; col <= start_x + CELL_W*MEMBER_ID_DIG; col += CELL_W)
// {
// cell_y_min = row;
// cell_y_max = row + CELL_H;
// cell_x_min = col;
// cell_x_max = col + CELL_W;
// var marked_pixel_cnt = 0; // 黒いピクセルカウント用
// /* セルがマークされているか */
// for (var y = row; y < row + CELL_H; y += 1) {
// for (var x = col; x < col + CELL_W; x += 1) {
// // context.fillStyle = 'rgb(0, 255, 0)';
// // context.fillRect(x, y, 1, 1);
// if (isBlackPixel(x, y)) {
// marked_pixel_cnt++;
// }
// }
// }
// /* セルが一定以上塗られていたら */
// if (isMarked(row_num, cell_num, marked_pixel_cnt)) {
// context.fillRect(cell_x_min, cell_y_min, cell_x_max - cell_x_min, cell_y_max
// - cell_y_min);
// answer[row_num] = cell_num;
// }
// cell_num++;
// }
// row_num++;
// }
}

function isMarked(marked_pixel_cnt) {
// console.log(x + " " + y + " " + marked_pixel_cnt * 100 / (CELL_W*CELL_H));
	return (marked_pixel_cnt * 100 / (CELL_W*CELL_H)) >= FEASIBLE_PERCENTAGE;
}

window.onload = function() {
	var a = [
	         [0, 0, 0],
	         [0, 1, 0],
	         [0, 0, 0]
	         ];
	var b = [
	         [0, 0, 0],
	         [0, 0, 0],
	         [0, 0, 1]
	         ];

	var c = [];
	for(var i=0; i<a.length; i++) {
		c[i] = [];
		for(var j=0; j<a[i].length; j++) {
			c[i][j] = b[i][j] - a[i][j];
		}
	}
	
	document.getElementById("ans_file").onchange = function(event) {
		var file = event.target.files[0];
		var fileReader = new FileReader();
		fileReader.onload = function() {
			var typedarray = new Uint8Array(this.result);
			doScan(typedarray, 0);
		};
		fileReader.readAsArrayBuffer(file);
	}

	document.getElementById("input_files").onchange = function(event) {
	    var files = event.target.files;
		var fileReader = [];
	    for (var i = 0, f; f = files[i]; i++) {
	    	fileReader[i] = new FileReader();
			fileReader[i].onload = function() {
				var typedarray = new Uint8Array(this.result);
				doScan(typedarray, 1);
			};
			fileReader[i].readAsArrayBuffer(f);
	    }
	}
}