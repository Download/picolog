(function (u, m, d) {
	if (typeof define == 'function') {define('picolog', [], d);}
	else if (typeof exports == 'object') {module.exports = d();} 
	else {u[m] = d();}
}(this, 'log', function() {

var log = {NONE:0, ERROR:1, WARN:2, INFO:3, LOG:4, DEBUG:5, TRACE:6},
	p=typeof process=='object' && process, prod = p && p.env.NODE_ENV === 'production',
	level = typeof window=='object' && qry() || env() || log.WARN,
	names = (function(){
		return Object.keys(log).slice(1, Object.keys(log).length).map(function(x){return x.toLowerCase();});
	})();

Object.defineProperty(log, 'picolog', {configurable:false, enumerable:false, value:{version:'1.0.0'}});

Object.defineProperty(log, 'level', {
	get: function(){return level;},
	set: function(lvl) {if (lvl >= 0 && lvl <= 6) {patch(level = lvl);}}
});

patch(level);

function patch(lvl) {
	for (var i=0,name; name=names[i]; i++) {log[name] = lvl < i+1 ? nop : logger(name, lvl);}
}

function logger(name, lvl) {
	return typeof console == 'object' ? (console[name] ? console[name] : console.log).bind(console) : (
		typeof print == 'function' ? print : function() {
			if (typeof console == 'object') {patch(lvl); log[name].apply(log, arguments);}
		}
	);
}

log.dir = log.time = log.timeEnd = nop;
log.assert = prod ? nop : function(){var a=[].concat.apply([], arguments), ok=a.shift(); if (!ok) {log.error.apply(log, a);}};
function nop(){}
function lvl(n) {return log[n.toUpperCase()] || Number(n);}
function env() {return p && p.env.PICOLOG_LEVEL && lvl(p.env.PICOLOG_LEVEL);}
function qry() {
	var qs = window.location.search.substring(1);
	for (var m; m = qs && /([^&=]+)=?([^&]*)/g.exec(qs); ) {
		if (m[1] == 'log') {return lvl(m[2]);}
	}
}

return log;
}));
