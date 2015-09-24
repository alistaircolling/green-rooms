var metaparser = require('./index.js');
metaparser({
    source: 'test/index.html',
    add: '<link rel="author" href="humans.txt" />',
    remove: 'meta[name="author"]',
    out: 'test/index-metaparser.html',
    callback: function (error, data) {
        console.log(error);
        console.log(data);
    }
});
