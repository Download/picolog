# picolog <sub><sup>v0.6.0</sup></sub>
**Tiny logging helper for use in the browser**

![logo](https://cdn.rawgit.com/download/picolog/0.6.0/picolog.png)

## Yet another logging library?
**No. Picolog is much less than that.**

All Picolog is, is a tiny shim that lets you safely log to the console
without having to worry about environments where no `console` object is
available. It just adds one feature: logging levels. 

Because it uses native logging under the hood and it's [49 lines of code](https://cdn.rawgit.com/download/picolog/0.6.0/dist/picolog.umd.js) 
weigh in at **just 837 bytes** minified and gzipped, it allows you to keep your logging statements 
around in your production builds without having to worry about size/performance or polluting the 
user's log with too many messages.

## Download
* [picolog.umd.js](https://cdn.rawgit.com/download/picolog/0.6.0/dist/picolog.umd.js) (~2kB, source)
* [picolog.min.js](https://cdn.rawgit.com/download/picolog/0.6.0/dist/picolog.min.js) (~1kB, minified)
* [picolog.min.js.map](https://cdn.rawgit.com/download/picolog/0.6.0/dist/picolog.min.js.map) (~2kB, debug map file)

## Install
If you are using NPM, you can install picolog with this command:
```sh
npm install --save picolog
```
By adding `--save`, we instruct NPM to add a dependency on the latest version of picolog to your package.json file.

## Include on your page
`picolog` can be used directly from CDN, from a local script file, or from a module loader.

### CDN
This is by far the easiest method and gives good performance to boost. Use this if you are in doubt.
```xml
<script src="https://cdn.rawgit.com/download/picolog/0.6.0/dist/picolog.min.js"></script>
```

### Local script file
Download picolog.min.js, place it in a folder `lib` on your website and include it like this:
```xml
<script src="lib/picolog.min.js"></script>
```

### Module loaders
Picolog implements the Universal Module Pattern and as such, is available to be consumed
from Node modules as well as via an AMD loader such as RequireJS. 

#### Node 
```js
var log = require('picolog');
log.info('Picolog is loaded');
```

#### AMD
```js
define(['picolog'], function(log){
	log.info('Picolog is loaded');
});
```
To be able to load Picolog from CDN as an AMD module, configure the CDN url like so <small>(note the absence of `.js` in the url)</small>:
```js
require.config({
	paths: {
		'picolog': 'https://cdn.rawgit.com/download/picolog/0.6.0/dist/picolog.min'
	}
});
```

## Logging methods
Picolog defines 5 logging methods, which correspond with available log levels:
```js
log.trace('This logs a TRACE message');
log.debug('This logs a DEBUG message');
log.info('This logs an INFO message');
log.warn('This logs a WARN message');
log.error('This logs an ERROR message');
```
Picolog does **not** mess with your stacktrace or line numbers. Line numbers shown in the console 
will be from your code, not from some wrapper function..

## Logging levels
Picolog defines 5 logging levels, which correspond with the available logging methods:
```js
log.TRACE; // 1
log.DEBUG; // 2
log.INFO; // 3
log.WARN; // 4
log.ERROR; // 5
```
In addition, there is a 6th level that completely disables all logging:
```js
log.NONE; // 9
```
To get or set the log level, we use the `log.level` property:
```js
if (log.level <= log.INFO) {
	log.info('This message will be logged');
}
log.level = log.WARN;
log.info('This info message will NOT be logged.');
log.warn('This warning message WILL be logged.');
log.level = log.NONE;
log.error('Logging is completely disabled.');
```
By default, the log level is set to `log.WARN` so under normal conditions there will be no logging.

To change the log level on the page we are looking at we can do
two things:
 1. Open the console and manually set the log level from there
 2. Add a parameter to the url of the page we want to inspect (browsers only)

When we set the log level in the console, new messages logged
at or above that level will start to appear, but we will not see
the messages that were logged before that moment. To make sure
we see our log messages from the very first moment the page is
loaded, we can set the log level as a querystring parameter
named `log`, like this:

`http://www.example.com/?`**`log=debug`**

Both the uppercase and lowercase names of the log levels work,
as well as their numerical value.

## Performance considerations
The logging methods on the `log` object that correspond to a log level which is lower than the 
currently set level, are replaced by no-op methods. As such, you generally don't have to worry 
about the performance overhead of leaving the log statements in the production code. There is 
one exception to this rule though. If preparing the message itself is a costly operation, you 
may want to surround the log code with an `if (log.level <= myLevel)` statement:
```js
if (log.level <= log.INFO) {
	var message = doLotsOfWorkToGenerateLogMessage();
	log.info(message);
}
```

## Copyright
Copyright 2015 by [Stijn de Witt](http://StijnDeWitt.com). Some rights reserved.

## License
Licensed under the [Creative Commons Attribution 4.0 International (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/) Open Source license.
