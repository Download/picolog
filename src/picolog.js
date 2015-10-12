var log = {TRACE:1, DEBUG:2, INFO:3, WARN:4, ERROR:5, NONE:9},
	level = query(window.location.search.substring(1), log.WARN),
	fns = (function(){
		var ks = Object.keys(log); 
		return ks.slice(0, ks.length - 1).map(function(x){return x.toLowerCase();});
	})();

Object.defineProperty(log, 'level', {
	get: function(){return level;},
	set: function(lvl) {if (lvl >= 0 && lvl <= 4) {patch(level = lvl);}}
});

patch(level);

function patch(lvl) {
	for (var i=0,name; name=fns[i]; i++) {
		log[name] = i+1 < lvl ? noop : logger(name, lvl);
	}
}

function logger(name, lvl) {
	if (typeof console == 'undefined') {
		return function() {
			if (typeof console != 'undefined') {
				patch(lvl);
				log[name].apply(log, arguments);
			}
		};
	}
	return console[name] ? console[name].bind(console) : console.log ? console.log.bind(console) : noop;
}

function query(qs, def) {
	for (var m; m = /([^&=]+)=?([^&]*)/g.exec(qs); ) {
		if (m[1] == 'log') {return log[m[2].toUpperCase()] || Number(m[2]) || def;} 
	}
	return def;
}

function noop(){}
