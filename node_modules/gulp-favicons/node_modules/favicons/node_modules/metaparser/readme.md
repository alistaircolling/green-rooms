# Metaparser [![Build Status](https://travis-ci.org/haydenbleasel/metaparser.svg?branch=master)](https://travis-ci.org/haydenbleasel/metaparser)

A Cheerio helper library for my Node.js automation modules. Installed through NPM with:

```
npm install metaparser --save-dev
```

Simply require the module and execute it with an optional array of configuration.

- Source: HTML file to write to.
- Add: String, Array or Object of elements to add (literal elements)
- Remove: String, Array or Object of elements to remove (pseudo selectors)
- Callback: Function to execute upon completion (parameters are 'error' and 'html').

Defaults are shown below:

```
var metaparser = require('metaparser');

metaparser({
    source: null,
    add: null,
    remove: null,
    out: null,
    callback: null
});
```

Example usage:

```
metaparser({
    source: 'test/index.html',
    add: '<link rel="author" href="humans.txt" />',
    remove: 'link[rel="author"]',
    out: 'test/index2.html',
    callback: function (error, data) {
        console.log(error, data);
    }
});
```
