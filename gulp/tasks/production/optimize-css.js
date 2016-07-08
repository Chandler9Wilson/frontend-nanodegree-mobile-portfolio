var gulp = require('gulp');
var useref = require('gulp-useref');
var cssnano = require('gulp-cssnano');

//minify css in views
gulp.task('css-views-min', function() {
    return gulp.src('src/views/css/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dist/views/css'));
});

//minify css in main src folder
gulp.task('optimize-css', ['css-views-min'], function() {
    return gulp.src('src/css/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'));
});

// Concatenate css after minification task finishes
/*gulp.task('optimize-css', ['css-src-min', 'css-views-min', 'optimize-views-css'], function() {
    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});*/