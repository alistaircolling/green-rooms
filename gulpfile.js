var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    imageminJpegtran = require('imagemin-jpegtran'),
    cache = require('gulp-cache'),
    sass = require('gulp-sass'),
    print = require('gulp-print'),
    browserSync = require('browser-sync'),
    favicons = require('gulp-favicons'),
    del = require('del'),
    jshint = require('gulp-jshint'),
    runSequence = require('run-sequence');

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
    return gulp.src('src/assets/images/*.jpg')
        .pipe(imageminJpegtran({
            progressive: true
        })())
        .pipe(gulp.dest('dist/assets/images'));
});

gulp.task('fonts', function() {
    return gulp.src('src/assets/fonts/*.otf').pipe(plumber({
        errorHandler: function(error) {
            console.log(error.message);
            this.emit('end');
        }
    }))

    .pipe(gulp.dest('dist/assets/fonts/'));
});

gulp.task('styles', function() {
    return gulp.src(['src/styles/*.scss'])
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
        }));
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
        }));
});

gulp.task('html', function() {
    return gulp.src(['src/*.html'])
        .pipe(gulp.dest('dist/'))
        .pipe(print())
        .pipe(browserSync.reload({
            stream: true
        }));
});

/* Clean the dist folder */
gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('watch', function() {
    gulp.watch("src/styles/*.scss", ['styles']);
    gulp.watch("src/js/*.js", ['scripts']);
    gulp.watch("src/*.html", ['html']);
    gulp.watch("src/assets/images/*.jpg", ['images']);
    gulp.watch("src/assets/fonts/*.otf", ['fonts']);
});

gulp.task('default', function(callback) {
    //wit until clean has finished before running other tasks in paralell
    runSequence('clean', ['styles', 'scripts', 'html', 'images', 'fonts', 'browser-sync', 'watch'],
        callback);
});
