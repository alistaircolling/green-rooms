//TODO make sure that all tasks complete before launching browsersync
var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    prefix = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    imageminJpegtran = require('imagemin-jpegtran'),
    cache = require('gulp-cache'),
    sass = require('gulp-sass'),
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

gulp.task('copy-yml', function() {
    return gulp.src('src/*.yml').pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('dist/'));
});
//TODO - figure out how bower libs are meant to be copied across
gulp.task('copy-bower', function() {
    return gulp.src('bower_components/*/*.js').pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('copy-basscss', function() {
    return gulp.src('src/styles/basscss.min.css').pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('dist/styles/'));
});
gulp.task('copy-svgs', function() {
    return gulp.src('src/assets/images/*.svg').pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('dist/assets/images/'));
});
//Old styles function
gulp.task('styles', function() {
    return gulp.src(['src/styles/main.scss'])
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(prefix('last 2 versions'))
        .pipe(gulp.dest('dist/styles/'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('local-sass', function(){
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/*.js')
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
        .pipe(browserSync.reload({
            stream: true
        }));
});

/* Clean the dist folder */
gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('watch', function() {
    //gulp.watch("src/styles/*.scss", ['sass']);
    gulp.watch("src/styles/**/**/*.scss", ['sass']);
    gulp.watch("src/js/**/*.js", ['scripts']);
    gulp.watch("src/*.html", ['html']);
    gulp.watch("src/assets/images/*.jpg", ['images']);
    gulp.watch("src/assets/images/*.svg", ['copy-svgs']);
    gulp.watch("src/assets/fonts/*.otf", ['fonts']);
});

/////  SASS STUFF //////////////////////////////////////////////////////////////////////////////// 


// This is an object which defines paths for the styles.
// Can add paths for javascript or images for example
// The folder, files to look for and destination are all required for sass
var paths = {

    styles: {
        src: 'src/styles',
        files: 'src/styles/**/*.scss',
        dest: 'dist/styles'
    }

};

// A display error function, to format and make custom errors more uniform
// Could be combined with gulp-util or npm colors for nicer output
var displayError = function(error) {

    // Initial building up of the error
    var errorString = '[' + error.plugin + ']';
    errorString += ' ' + error.message.replace("\n", ''); // Removes new line at the end

    // If the error contains the filename or line number add it to the string
    if (error.fileName)
        errorString += ' in ' + error.fileName;

    if (error.lineNumber)
        errorString += ' on line ' + error.lineNumber;

    // This will output an error like the following:
    // [gulp-sass] error message in file_name on line 1
    console.error(errorString);
};

// Setting up the sass task
gulp.task('sass', function() {
    // Taking the path from the above object
    return gulp.src(paths.styles.files)
        // Sass options - make the output compressed and add the source map
        // Also pull the include path from the paths object
        .pipe(sass({
            outputStyle: 'compressed',
            sourceComments: 'map',
            includePaths: [paths.styles.src]
        }))
        // If there is an error, don't stop compiling but use the custom displayError function
        .on('error', function(err) {
            displayError(err);
        })
        // Pass the compiled sass through the prefixer with defined 
        .pipe(prefix(
            'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'
        ))
        // Funally put the compiled sass into a css file
        .pipe(gulp.dest(paths.styles.dest))

    .pipe(
        browserSync.reload({
            stream: true
        })
    );



});


gulp.task('default', function(callback) {
    //wait until clean has finished before running other tasks in paralell
    runSequence('clean', ['sass', 'scripts', 'html', 'images', 'copy-yml',
            'copy-svgs', 'fonts', 'copy-bower', 'copy-basscss'
        ], 'browser-sync', 'watch',
        callback);
});
