QUnit.test("picolog", function( assert ) {
	log.trace('TRACE message');
	log.debug('DEBUG message');
	log.log('LOG message');
	log.info('INFO message');
	log.warn('WARN message');
	log.error('ERROR message');
	assert.ok(true, 'Please check in console whether logged messages is correct.');
});

