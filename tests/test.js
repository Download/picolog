QUnit.test("picolog", function( assert ) {
	assert.ok(typeof log == 'function', '`log` exists and is a function');
	assert.ok(typeof log.level == 'function', '`log.level` exists and is a function');
	assert.ok(log.DEBUG === 0, '`log.DEBUG` exists and is 0');
	assert.ok(log.INFO === 1, '`log.INFO` exists and is 1');
	assert.ok(log.WARN === 2, '`log.WARN` exists and is 2');
	assert.ok(log.ERROR === 3, '`log.ERROR` exists and is 3');
	assert.ok(log.NONE === 4, '`log.NONE` exists and is 4');
	assert.ok(typeof log().log == 'function', '`log.log` exists and is a function');
	assert.ok(typeof log().info == 'function', '`log.info` exists and is a function');
	assert.ok(typeof log().warn == 'function', '`log.warn` exists and is a function');
	assert.ok(typeof log().error == 'function', '`log.error` exists and is a function');
	assert.ok(typeof console.log == 'function', '`console.log` exists and is a function');
	assert.ok(typeof console.info == 'function', '`console.info` exists and is a function');
	assert.ok(typeof console.warn == 'function', '`console.warn` exists and is a function');
	assert.ok(typeof console.error == 'function', '`console.error` exists and is a function');
	assert.ok(log.level() === log.INFO, 'log level is set to INFO');
//	assert.ok(console.info.messages, '`console.info` has a `messages` property');
//	assert.ok(console.info.messages.length === 0, '`console.info.messages.length` === 0');
	log().info('This is an info message.');
//	assert.ok(console.info.messages.length === 0, 'Logged message is captured by stub.');
});

