// Include gulp
var gulp = require('gulp');

// Include plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var browserSync = require('browser-sync').create();

// Lint Task
gulp.task('lint', function() {
    return gulp.src('js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['src/js/**/*.js', 'src/views/js/**/*.js'])
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

//Minify CSS, and Images

//reloads browser when .pipe(browserSync.reload({stream: true})) is run in another task
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
  })
})

//the task run when '$ gulp' is run
gulp.task('default', function() {
  'default', ['lint', 'scripts', 'watch']
});

// Watch Files For Changes and automatically runs the tasks (array in first line runs before everything else)
gulp.task('watch', ['browserSync'] function() {
    gulp.watch('src/js/*.js', ['lint', 'scripts']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/css/*.css', browserSync.reload);
});