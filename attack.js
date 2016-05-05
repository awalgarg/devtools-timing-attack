limit = (navigator.userAgent.indexOf('Firefox') === -1) ? 3 : 7;
iterations = 20;
function run() {
	iterations = +iterations;
	return (
		Array(Number(iterations))
			.fill(0)
			.map(collect)
			.reduce((a,b) => (a+b), 0)
	) / iterations;
}

function collect(_, i) {
	var start = performance.now();
	heavyTask(i);
	var end = performance.now();
	return end - start;
}

function heavyTask(arg) {
	var buffer = [];
	for (var i = 0; i <= arg; i++) {
		var el = document.createElement('script');
		el.textContent = `console.log(${i})`;
		document.head.appendChild(el);
		buffer.push(el);
	}
	for (var i = 0; i <= arg; i++) {
		buffer[i].remove();
	}
}

(function check() {
	if (run() > limit) {
		res.textContent = 'Y U NO CLOSE DEVTOOLS!!';
	} else {
		res.textContent = 'if you open devtools, I would know :)';
	}
	setTimeout(check, 500);
})();
