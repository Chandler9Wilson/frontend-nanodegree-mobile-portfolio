var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('minify-views', function() {
    return gulp.src('src/views/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/views/js/'));
});

gulp.task('optimize-js', ['minify-views'], function() {
    return gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js/'));
});