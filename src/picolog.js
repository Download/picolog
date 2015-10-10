function log() {return con;}

log.level = function log_level(lvl) {
	if ((lvl !== undefined) && (lvl >= 0) && (lvl <= 4) && (lvl !== level)) {
		level = lvl;
		for (i=0; x=methods[i]; i++) {
			con[x] = i >= lvl ? org[x] : nul[x];
		}
	}
	return level;
};

log.DEBUG = 0;
log.INFO = 1;
log.WARN = 2;
log.ERROR = 3;
log.NONE = 4;

var con = (typeof console == 'object') && console.error ? console : {},
	methods = ['log','info','warn','error'],
	query = window.location.search.substring(1),
	search = /([^&=]+)=?([^&]*)/g, 
	nul = {}, org = {}, level, query, match, i, x;

for (i=0; x=methods[i]; i++) {
	nul[x] = function(){};
	org[x] = con[x] || nul[x];
}
x = log.INFO;
while (match = search.exec(query)){
	if (match[1] == 'log') {
		x = log[match[2].toUpperCase()] || Number(match[2]); 
		break;
	} 
}
log.level(x);
