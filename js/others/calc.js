/**
 * 計算式一覧
 */
var standard_score = function(score, allData) {
	var ave = average(allData);
	var sd = standard_deviation(allData);
	var ss = (score - ave) / sd * 10 + 50;
	ss = floatFormat(ss, 1);

	if(isNaN(ss)) {
		return '-';
	}
	return ss;
}

var sum = function(data, fn) {
	if (fn) {
		return sum(data.map(fn));
	} else {
		return data.reduce(function(prev, current, i, data) {
			return prev + current;
		});
	}
};

var average = function(data, fn) {
	var ave = sum(data, fn) / data.length;
	return floatFormat(ave, 1);
};

var median = function(data, fn) {
	var half = (data.length / 2) | 0;
	data.sort(function(a, b) {
		return (parseInt(a) > parseInt(b)) ? 1 : -1;
	});
	if (data.length % 2) {
		return data[half];
	}

	return (data[half - 1] + data[half]) / 2;
};

var variance = function(data, fn) {
	var ave = average(data);

	var varia = 0;
	data.forEach(function(d) {
		varia += Math.pow(d - ave, 2);
	});

	return (varia / data.length);
}

var standard_deviation = function(data, fn) {
	var varia = variance(data);
	return Math.sqrt(varia);
}

function floatFormat(number, n) {
	var _pow = Math.pow(10, n);
	return Math.round(number * _pow) / _pow;
}
