var log = {NONE:0, ERROR:1, WARN:2, INFO:3, LOG:4, DEBUG:5, TRACE:6},
	p=typeof process=='object' && process, prod = p && p.env.NODE_ENV === 'production',
	k=Object.keys(log), q=qry(), c=con(), env=p && lvl(p.env.PICOLOG_LEVEL),
	level = typeof q == 'number' ? q : (typeof env == 'number' ? env : log.WARN),
	names=k.slice(1, k.length).map(function(x){return x.toLowerCase();});

Object.defineProperty(log, 'picolog', {configurable:false, enumerable:false, value:{version:'1.0.4'}});

Object.defineProperty(log, 'level', {
	get: function(){return level;},
	set: function(lvl) {if (lvl >= 0 && lvl <= 6) {patch(level = lvl);}}
});

patch(level);

function patch(lvl) {
	for (var i=0,name; name=names[i]; i++) {log[name] = lvl < i+1 ? nop : logger(name, lvl);}
}

function logger(name, lvl) {
	return c && bnd(name) || prn() || function(){
		if (c=con()) {patch(lvl); log[name].apply(log, arguments);}
	};
}

log.dir = bnd('dir') || nop; log.time = bnd('time') || nop; log.timeEnd = bnd('timeEnd') || nop;
log.assert = prod ? nop : function(){var a=[].concat.apply([], arguments), ok=a.shift(); if (!ok) {log.error.apply(log, a);}};
function nop(){}
function bnd(n){return c && (c[n]||c.log).bind(c);}
function con(){return typeof console=='object' && console;}
function prn(){return typeof print == 'function' && print;}
function lvl(n){return n && (Number(n)!==Number(n) ? log[n.toUpperCase()] : Number(n));}
function qry(){
	var i, m, qs = typeof window=='object' && window.location.search.substring(1), args = qs && qs.split('&');
	for (i=0; m=args && args[i] && args[i].split('='); i++) {
		if (m[0] == 'log') {return lvl(m[1]);}
	}
}
