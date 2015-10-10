# picolog <sub><sup>v0.2.0</sup></sub>
**Tiny logging helper for use in the browser**

![logo](picolog.png)

## Yet another logging library?
No. Picolog is much less than that. 

All Picolog is, is a tiny shim that lets you safely log to the console
without having to worry about environments where no `console` object is
available. It just adds one feature: logging levels. 

Because it uses native logging under the hood and weighs in at **less than 1 kB** minified
and gzipped, it allows you to keep your logging statements around in your production builds 
without having to worry about size/performance or polluting the user's log with too many messages.

## Download
* [picolog.umd.js](https://cdn.rawgit.com/download/picolog/0.2.0/dist/picolog.umd.js) (~2kB, source)
* [picolog.min.js](https://cdn.rawgit.com/download/picolog/0.2.0/dist/picolog.min.js) (~1kB, minified)
* [picolog.min.js.map](https://cdn.rawgit.com/download/picolog/0.2.0/dist/picolog.min.js.map) (~2kB, debug map file)

## Include on your page
`picolog` can be used directly from CDN, from a local script file, or from a module loader.

### CDN
This is by far the easiest method and gives good performance to boost. Use this if you are in doubt.
```xml
<script src="https://cdn.rawgit.com/download/picolog/0.2.0/dist/picolog.min.js"></script>
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
// here, the log function is available
log().info('Picolog is loaded');
```

#### AMD
```js
define(['picolog'], function(log){
	// here, the log function is available
	log().info('Picolog is loaded');
});
```
To be able to load Picolog from CDN as an AMD module, configure the CDN url like so <small>(note the absence of `.js` in the url)</small>:
```js
require.config({
	paths: {
		'picolog': 'https://cdn.rawgit.com/download/picolog/0.2.0/dist/picolog.min'
	}
});
```

## Logging messages
Picolog defines 4 logging methods, which correspond with available log levels:
```js
log().log('This logs a debug message');
log().info('This logs an info message');
log().warn('This logs a warning message');
log().error('This logs an error message');
```
Notice how we call `log()` as a function. This will return the actual `console` object if it 
exists in this environment, or a no-op object if it does not. The advantage of this is that the
line numbers seen next to each logging statement in the console will be the actual line numbers
of *your* line of code doing the logging and not of some wrapping function inside picolog.

## Logging levels
Picolog defines 4 logging levels, which correspond with the available logging methods:
```js
log.DEBUG; // 0
log.INFO; // 1
log.WARN; // 2
log.ERROR; // 3
```
In addition, there is a fifth level that completely disables all logging:
```js
log.NONE; // 4
```
To get or set the log level, we use the `log.level` function:
```js
if (log.level() <= log.INFO) {
	log().info('This message will be logged');
}
log.level(log.WARN);
log().info('This info message will NOT be logged.');
log().warn('This warning message WILL be logged.');
log.level(log.NONE);
log().error('Logging is completely disabled.');
```
By default, the log level is set to `log.INFO`.

To change the log level on the page we are looking at we can do
two things:
1. Open the console and manually set the log level from there
2. Add a parameter to the url of the page we want to inspect

Method 2 will make sure your set level is in effect right from
the first load of picolog. Method 1 will take effect from the
moment the statement is executed.

To set the different levels from a URL parameter for page
`http://www.example.com/my/page.html`

we would add URL parameters like this:
`http://www.example.com/my/page.html?log=debug`
`http://www.example.com/my/page.html?log=info`
`http://www.example.com/my/page.html?log=warn`
`http://www.example.com/my/page.html?log=error`
`http://www.example.com/my/page.html?log=none`

## Performance considerations
Any logging methods on the console returned by `log()` that correspond to a log level which is 
lower than the currently set level, are replaced by no-op methods. As such, you generally don't
have to worry about the performance overhead of leaving the log statements in the production 
code. There is one exception to this rule though. If preparing the message itself is a costly
operation, you may want to surround the log code with an `if (log.level <= myLevel)` statement:
```js
if (log.level() <= log.INFO) {
	var message = doLotsOfWorkToGenerateLogMessage();
	log().info(message);
}
```

## Copyright
Copyright 2015 by Stijn de Witt. Some rights reserved.

## License
Licensed under the [Creative Commons Attribution 4.0 International (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/) Open Source license.
