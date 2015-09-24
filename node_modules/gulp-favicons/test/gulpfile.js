var gulp = require('gulp'),
    through = require('through2'),
    favicons = require('../');

gulp.task('default', function () {
    gulp.src('logo.png')
        .pipe(favicons({
            settings: { background: '#1d1d1d' , vinylMode: true }
        }, function(code) {
            console.log(code);
        }))
        .pipe(through.obj(function (file, enc, cb) {
            console.log(file.path);
            this.push(file);
            cb();
        }))
        .pipe(gulp.dest('./images'));
});
