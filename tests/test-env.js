var log = require('../dist/picolog.umd.js');

var failed = false;
function test(ok, msg) {
	console[ok ? 'info' : 'error']((ok ? ' √  ' : ' ×  ') + msg);
	failed = failed || !ok;
}

console.info('Testing picolog. process.env.PICOLOG_LEVEL=' + process.env.PICOLOG_LEVEL);
test(log.level === log.DEBUG, '`log.level` is set to `log.DEBUG`');

if (failed) {
	test(failed, 'Some tests FAILED.');
	process.exit(1);
}
else {
	test(!failed, 'All tests OK!');
	process.exit(0);
}
