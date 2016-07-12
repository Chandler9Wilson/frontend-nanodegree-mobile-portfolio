var gulp = require('gulp');
var runSequence = require('run-sequence');
var site = '';

gulp.task('publish', function(callback) {
    runSequence('build:production',
        'browsersync:production',
        'ngrok-url',
        'psi-desktop',
        'psi-mobile',
        callback);
});