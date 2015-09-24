/*jslint node:true, nomen:true, unparam:true*/

(function () {

    'use strict';

    var _ = require('underscore'),
        mergeDefaults = require('merge-defaults'),
        through2 = require('through2'),
        fs = require('fs'),
        cheerio = require('cheerio'),
        util = require('gulp-util'),
        path = require('path'),
        favicons = require('favicons');

    module.exports = function (params, htmlCodeCallback) {

        function findInfo(source, callback) {
            fs.readFile(source, function (error, data) {
                var $, info = {};
                $ = cheerio.load(data);
                info.favicon = $('link[rel="favicons"]').attr('href');
                info.url = $('link[rel="canonical"]').attr('href');
                info.title = $('title').text();
                info.description = $('meta[name="description"]').attr('content');
                info.author = $('meta[name="author"]').attr('content');
                return callback(error, info);
            });
        }

        if (params.hasOwnProperty('settings') &&
                params.settings.hasOwnProperty('vinylMode') &&
                params.settings.vinylMode) {

            var options = favicons.getConfig(params);

            return through2.obj(function (file, enc, cb) {

                if (file.isNull()) {
                    cb(null, file);
                } else if (file.isStream()) {
                    cb(new util.PluginError('gulp-favicons',
                            'Streaming not supported'));
                } else {
                    options.data.favicon_generation.master_picture = { type:
                        'inline', content: file.contents.toString('base64') };
                    cb();
                }

            }, function (cb) {

                var that = this;

                favicons.generateFaviconStream(options, function (error, data) {
                    if (error) {
                        that.end();
                        cb(error);
                    }
                    if (htmlCodeCallback) {
                        htmlCodeCallback(data.favicon_generation_result.favicon.html_code);
                    }
                })
                    .on('entry', function (entry) {
                        that.push(new util.File({
                            path: entry.path,
                            contents: entry
                        }));
                    })
                    .on('end', cb);

            });

        }

        return through2.obj(function (file, enc, cb) {

            findInfo(file.path, function (error, info) {

                var options = mergeDefaults(params || {}, {
                    files: {
                        src: info ? (info.favicon ? path.join(path.dirname(file.path), info.favicon) : null) : null,
                        dest: params.dest,
                        html: file.path,
                        iconsPath: null,
                        androidManifest: null,
                        browserConfig: null,
                        firefoxManifest: null,
                        yandexManifest: null
                    },
                    icons: {
                        android: true,
                        appleIcon: true,
                        appleStartup: true,
                        coast: true,
                        favicons: true,
                        firefox: true,
                        opengraph: true,
                        windows: true,
                        yandex: true
                    },
                    settings: {
                        appName: info.title,
                        appDescription: info.description,
                        developer: info.author,
                        developerURL: info ? (info.url ? path.join(info.url, '/') : null) : null,
                        version: 1.0,
                        background: null,
                        index: null,
                        url: info ? (info.url ? path.join(info.url, '/') : null) : null,
                        silhouette: false,
                        logging: false
                    }
                });

                if (file.isNull()) {
                    cb(null, file);
                    return;
                }

                if (file.isStream()) {
                    cb(new util.PluginError('gulp-favicons', 'Streaming not supported'));
                    return;
                }

                options.files.dest = path.join(path.dirname(file.path), options.files.dest);

                favicons(options, function (error, html) {
                    file.contents = new Buffer(_.flatten(html).join(' '));
                    return cb(error, file);
                });

            });

        });

    };

}());
