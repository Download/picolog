var log = require('../dist/picolog.umd.js');

var failed = false;
function test(ok, msg) {
	console[ok ? 'info' : 'error']((ok ? ' √  ' : ' ×  ') + msg);
	failed = failed || !ok;
}

console.log('Testing picolog. process.env.NODE_ENV=' + process.env.NODE_ENV + ', process.env.PICOLOG_LEVEL=' + process.env.PICOLOG_LEVEL);
console.log('');
test(typeof log == 'object', '`log` exists and is an object');
test(log.picolog, '`log` has a property `picolog`');
test(log.picolog.version, '`log.picolog` has a property `version`');
test(log.NONE === 0, '`log` has a property `NONE` which is 0');
test(log.ERROR === 1, '`log` has a property `ERROR` which is 1');
test(log.WARN === 2, '`log` has a property `WARN` which is 2');
test(log.INFO === 3, '`log` has a property `INFO` which is 3');
test(log.LOG === 4, '`log` has a property `LOG` which is 4');
test(log.DEBUG === 5, '`log` has a property `DEBUG` which is 5');
test(log.TRACE === 6, '`log` has a property `TRACE` which is 6');
test(typeof log.error == 'function', '`log.error` is a function');
test(typeof log.warn == 'function', '`log.warn` is a function');
test(typeof log.info == 'function', '`log.info` is a function');
test(typeof log.log == 'function', '`log.log` is a function');
test(typeof log.debug == 'function', '`log.debug` is a function');
test(typeof log.trace == 'function', '`log.trace` is a function');
test(typeof log.assert == 'function', '`log.assert` is a function');
test(typeof log.dir == 'function', '`log.dir` is a function');
test(typeof log.time == 'function', '`log.time` is a function');
test(typeof log.timeEnd == 'function', '`log.timeEnd` is a function');
console.log('');
log.error('Current log level is set to ' + log.level)
log.error('error message');
log.warn('warn message');
log.info('info message');
log.log('log message');
log.debug('debug message');
log.trace('trace message');
log.assert(false, 'Prints this error message, unless log level is set to 0 (NONE) or NODE_ENV is set to \'production\'.');
log.assert(true, 'This should NOT print an error message.');
console.log('');

if (failed) {
	test(false, 'Some tests FAILED.');
	process.exit(1);
}
else {
	test(true, 'All tests OK!');
	process.exit(0);
}
