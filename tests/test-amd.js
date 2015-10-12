require.config({
	baseUrl: '../dist',
	paths: {
		'picolog': './picolog.umd',
	}
});
define(['picolog'], function(log){
	QUnit.test("AMD Module Compliance Test", function( assert ) {
		assert.ok(typeof log == 'object', '`log` is an object');
		assert.ok(typeof log.level == 'number', '`log.level` is a number');
		assert.ok(typeof log.WARN === 'number', '`log.WARN` is a number');
		assert.ok(log.level === log.WARN, '`log.level` === `log.WARN`');
		assert.ok(typeof log.warn == 'function', '`log.warn` is a function');
		log.warn('This warning message SHOULD appear in the console.');
		assert.ok(true, 'Please check that a warning is logged to the console');
		log.info('This info message should NOT appear in the console.');
		assert.ok(true, 'Please check that NO info message is logged to the console');
		log.level = log.INFO;
		assert.ok(log.level === log.INFO, 'Changed log level to INFO');
		log.info('This info message SHOULD appear in the console.');
		assert.ok(true, 'Please check that an info message is logged to the console');
	});
});

