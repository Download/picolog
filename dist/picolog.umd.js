(function (u, m, d) {
	if (typeof define == 'function') {define('picolog', [], d);}
	else if (typeof exports == 'object') {module.exports = d();} 
	else {u[m] = d();}
}(this, 'log', function() {

var log = {TRACE:1, DEBUG:2, INFO:3, WARN:4, ERROR:5, NONE:9},
	level = query(typeof window == 'object' && window.location.search.substring(1), log.WARN),
	fns = (function(){
		return Object.keys(log).slice(0, Object.keys(log).length - 1).map(function(x){return x.toLowerCase();});
	})();

Object.defineProperty(log, 'level', {
	get: function(){return level;},
	set: function(lvl) {if (lvl >= 1 && lvl <= 5 || lvl === 9) {patch(level = lvl);}}
});

patch(level);

function patch(lvl) {
	for (var i=0,name; name=fns[i]; i++) {
		log[name] = i+1 < lvl ? noop : logger(name, lvl);
	}
}

function logger(name, lvl) {
	if (typeof console == 'undefined') {
		if (typeof print != 'undefined') {return print;}
		else {return function() {
			if (typeof console != 'undefined') {
				patch(lvl);
				log[name].apply(log, arguments);
			}
		};}
	}
	return console[name] ? console[name].bind(console) : console.log.bind(console);
}

function query(qs, def) {
	for (var m; m = qs && /([^&=]+)=?([^&]*)/g.exec(qs); ) {
		if (m[1] == 'log') {return log[m[2].toUpperCase()] || Number(m[2]) || def;} 
	}
	return def;
}

function noop(){}

return log;
}));
