var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache'),
    sass = require('gulp-sass'),
    print = require('gulp-print'),
    browserSync = require('browser-sync'),
    favicons = require('gulp-favicons'),
    del = require('del'),
    jshint = require('gulp-jshint');

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "dist/"
        }
    });
});

gulp.task('bs-reload', function() {
    browserSync.reload();
});

gulp.task('images', function() {
    gulp.src('src/assets/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/assets/'));
});

gulp.task('styles', function() {
    gulp.src(['src/styles/**/*.scss'])
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer('last 2 versions'))
        .pipe(gulp.dest('dist/styles/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        //check for errors
        .pipe(jshint())
        .pipe(jshint.reporter('default'))

    /* concat all js into one main.js file */
    .pipe(concat('main.js'))
        // rename .min
        .pipe(rename({
            suffix: '.min'
        }))
        // uglify
        //  .pipe(uglify())
        //put back in dist folder
        .pipe(gulp.dest('dist/js/'))
        //reload BS
        .pipe(browserSync.reload({
            stream: true
        }))
});

gulp.task('html', function() {
    return gulp.src(['src/*.html'])
        .pipe(gulp.dest('dist/'))
        .pipe(print())
        .pipe(browserSync.reload({
            stream: true
        }))
})

/* Clean the dist folder */
gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('watch', function() {
    gulp.watch("src/styles/**/*.scss", ['styles']);
    gulp.watch("src/js/*.js", ['scripts']);
    gulp.watch("src/*.html", ['html']);
})
gulp.task('default', ['clean', 'styles', 'scripts', 'html', 'images', 'browser-sync', 'watch'], function() {

});
