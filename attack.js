ff = (navigator.userAgent.indexOf('Firefox') !== -1);
timeLimit = ff ? 5 : 2;
varLimit = ff ? 2 : 3;
iterations = 20;
lastRun = null;
function run() {
	iterations = +iterations;
	took = (
		Array(iterations)
			.fill(0)
			.map(collect)
			.reduce(function(a, b) { return a+b; }, 0)
	) / iterations;
	if (location.search.indexOf('debug') !== -1) {
		debug.appendChild(document.createTextNode(`\n\ntook ${took} ms on average`));
	}
	return took;
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
		el.textContent = 'console.log(' + i + ')';
		document.head.appendChild(el);
		buffer.push(el);
	}
	for (var i = 0; i <= arg; i++) {
		document.head.removeChild(buffer[i]);
	}
}

if (!('fill' in [])) {
	Array.prototype.fill = function(val) {
		for (var i = 0; i < this.length; i++) {
			this[i] = val;
		}
		return this;
	};
}

(function check() {
	var val = run();
	if (val > timeLimit) {
		res.textContent = 'Y U NO CLOSE DEVTOOLS!!';
	} else {
		res.textContent = 'if you open devtools, I would know and this text would change :)';
	}
	setTimeout(check, 500);
})();
