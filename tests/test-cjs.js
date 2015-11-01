var log = require('../dist/picolog.umd.js');
if (log && log.INFO) {
  log.level = log.INFO;
  log.info('CommonJS Test OK.');
  process.exit(0);
}
else {
	console.error('CommonJS Test FAILED.');
	process.exit(1);
}