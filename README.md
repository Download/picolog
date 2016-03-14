# picolog <sub><sup>v1.0.4</sup></sub>
**Tiny logging helper for use in the browser, Node and Nashorn**

![logo](https://cdn.rawgit.com/download/picolog/1.0.0/picolog.png)

## Yet another logging library?
**No. Picolog is much less than that.**

All Picolog is, is a tiny shim that lets you safely log to the console
without having to worry about environments where no `console` object is
available. It just adds one feature: logging levels.

Because it uses native logging under the hood and it's [48 lines of code](https://cdn.rawgit.com/download/picolog/1.0.4/dist/picolog.umd.js)
weigh in at **just 945 bytes** minified and zipped, it allows you to keep your logging statements
around in your production builds without having to worry about size/performance or polluting the
user's log with too many messages.

## Download
* [picolog.umd.js](https://cdn.rawgit.com/download/picolog/1.0.4/dist/picolog.umd.js) (~2kB, source)
* [picolog.min.js](https://cdn.rawgit.com/download/picolog/1.0.4/dist/picolog.min.js) (~1kB, minified)
* [picolog.min.js.map](https://cdn.rawgit.com/download/picolog/1.0.4/dist/picolog.min.js.map) (~2kB, debug map file)

## Install
If you are using NPM, you can install picolog with this command:
```sh
npm install --save picolog
```
By adding `--save`, we instruct NPM to add a dependency on the latest version of picolog to your package.json file.

## Include on your page
Picolog can be used directly from CDN, from a local script file, or from a module loader.

### CDN
This is by far the easiest method and gives good performance to boost. Use this if you are in doubt.
```xml
<script src="https://cdn.rawgit.com/download/picolog/1.0.4/dist/picolog.min.js"></script>
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
		'picolog': 'https://cdn.rawgit.com/download/picolog/1.0.4/dist/picolog.min'
	}
});
```

### Using Picolog as a console replacement
Sometimes scripts beyond your control are logging to the console and you wish you could influence
their output. In environments where you are allowed to replace the console, picolog can be a solution:

```
// assuming `log` is the picolog object
var orgConsole;
if (typeof console == 'object') {
	orgConsole = console; // hang on to original
	console = log;
	if (console !== log) {
		log.log('Replacing the console is not allowed in this environment');
	}
}
```

### Using Picolog in Nashorn
Since Java 8, the JVM comes with a built-in Javascript interpreter called [Nashorn](http://openjdk.java.net/projects/nashorn/).
Nashorn does not as of yet support any module loaders, but you can load Picolog directly into the interpreter like this:
```java
ScriptEngine engine = new ScriptEngineManager().getEngineByName("nashorn");
// Load picolog from classpath
ClassLoader loader = this.getClass().getClassLoader();
InputStream resource = loader.getResourceAsStream("my/pkg/picolog.min.js")
InputStreamReader picolog = new InputStreamReader(resource, "utf-8");
// Or, load picolog from the file system
FileReader picolog = new FileReader("/file/path/to/picolog.min.js");
// Add it to the script engine
engine.eval(picolog);
```
You can use `ClassLoader.getResourceAsStream` to read the script file from your classpath. This allows you to bundle
the script inside your JAR/WAR and read it directly from there using just the 'package' in which the script resides.
Alternatively, you can use `new FileReader(path)`, where path is a filepath, absolute, or relative to the current
directory.

## Logging methods
Picolog defines 6 logging methods, which correspond with available log levels:
```js
log.error('This logs an ERROR message');
log.warn('This logs a WARN message');
log.info('This logs an INFO message');
log.log('This logs a LOG message');
log.debug('This logs a DEBUG message');
log.trace('This logs a TRACE message');
```
Picolog does **not** mess with your stacktrace or line numbers. Line numbers shown in the console
will be from your code, not from some wrapper function..

## Logging levels
Picolog defines 6 logging levels, which correspond with the available logging methods:
```js
log.ERROR; // 1
log.WARN;  // 2
log.INFO;  // 3
log.LOG;   // 4
log.DEBUG; // 5
log.TRACE; // 6
```
In addition, there is a 7th level that completely disables all logging:
```js
log.NONE;  // 0
```
To get or set the log level, we use the `log.level` property:
```js
if (log.level >= log.INFO) {
	log.info('This message will be logged');
}
log.level = log.WARN;
log.info('This info message will NOT be logged.');
log.warn('This warning message WILL be logged.');
log.level = log.NONE;
log.error('Logging is completely disabled.');
```
By default, the log level is set to `log.WARN` so under normal conditions there will be no logging.

To change the log level on a web page we are looking at we can do two things:
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

When using picolog on Node JS, we can set an environment variable `PICOLOG_LEVEL` and it
will be picked up by picolog when it loads:
```sh
C:\ws\picolog>set PICOLOG_LEVEL=debug

C:\ws\picolog>node tests/test-env.js
Testing picolog. process.env.PICOLOG_LEVEL=debug
 v  `log.level` is set to `log.DEBUG`
 v  All tests OK!
```

## Using picolog as a polyfill
As of version 1.0.0, picolog supports all functions in the [NodeJS Console API](https://nodejs.org/api/console.html),
so you should be able to use it as a polyfill in environments where there is no `console` available (e.g. Nashorn):
```js
// assuming you already made sure there is a `global` object
global.console = log;
console.info('Nashorn can do logging to!');
```

## Performance considerations
The logging methods on the `log` object that correspond to a log level which is higher than the
currently set level, are replaced by no-op methods. As such, you generally don't have to worry
about the performance overhead of leaving the log statements in the production code. There is
one exception to this rule though. If preparing the message itself is a costly operation, you
may want to surround the log code with an `if (log.level >= myLevel)` statement:
```js
if (log.level >= log.INFO) {
	var message = doLotsOfWorkToGenerateLogMessage();
	log.info(message);
}
```

## Copyright
Copyright 2015 by [Stijn de Witt](http://StijnDeWitt.com). Some rights reserved.

## License
Licensed under the [Creative Commons Attribution 4.0 International (CC-BY-4.0)](https://creativecommons.org/licenses/by/4.0/) Open Source license.
