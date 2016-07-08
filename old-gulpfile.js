// Include gulp
var gulp = require('gulp');

// Include plugins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync').create();
var ngrok = require('ngrok');
var psi = require('psi');
var sequence = require('run-sequence');
var useref = require('gulp-useref');
var del = require('del');

// Lint Task
gulp.task('lint', function() {
    return gulp.src(['src/js/*.js', 'src/views/js/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
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

// Minify HTML
gulp.task('html', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'))
});

// Minify Images ToDo
gulp.task('images', function() {
    return gulp.src('src/images/*')
        .pipe(imagemin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/images'))
});

// Concatenate ToDo & Minify CSS
gulp.task('css', function() {
    return gulp.src('src/index.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
    /*return gulp.src('src/css/*.css')
        .pipe(cssnano())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'));*/
});

// Cleans dist by deleting all files in dist
gulp.task('clean', function() {
    return del.sync('dist');
});

// Reloads browser when .pipe(browserSync.reload({stream: true})) is run in another task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './src'
        },
    });
    browserSync.init({
        server: {
            baseDir: './dist'
        },
    });
});

// Allows a local server to tunnel to a public address
gulp.task('ngrok-url', function(cb) {  //cb = callback
    return ngrok.connect(3000, function (err, url) {
        site = url;
        console.log('serving your tunnel from: ' + site);
        cb();
    });
});

// A console readout of page speed insights for desktop
gulp.task('psi-desktop', function (cb) {
  return psi(site, {
    nokey: 'true',
    strategy: 'desktop'
  }).then(function (data) {
      console.log('Speed score: ' + data.ruleGroups.SPEED.score);
      //console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
  });
});

// A console readout of page speed insights for mobile
gulp.task('psi-mobile', function (cb) {
  return psi(site, {
    nokey: 'true',
    strategy: 'mobile'
  }).then(function (data) {
      console.log('Speed score: ' + data.ruleGroups.SPEED.score);
      //console.log('Usability score: ' + data.ruleGroups.USABILITY.score);
  });
});

// Sequence to run ngrok, grab ngrok url, and run psi
gulp.task('psi-seq', function (cb) {
  return sequence(
    'ngrok-url',
    'psi-desktop',
    'psi-mobile',
    cb
  );
});

// "$gulp psi" runs page speed insights
gulp.task('psi', ['psi-seq'], function() {
  console.log('Woohoo! Check out your page speed scores!')
  process.exit();
})

// The task run when '$ gulp' is run
gulp.task('default', function() {
  'default', ['lint', 'scripts', 'watch']
});

// Watch Files For Changes and automatically runs the tasks (array in first line runs before everything else)
gulp.task('watch', ['browserSync'], function() {
    gulp.watch('src/js/*.js', ['lint', 'scripts']);
    gulp.watch('src/*.html', browserSync.reload);
    gulp.watch('src/css/*.css', browserSync.reload);
});