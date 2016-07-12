var gulp = require('gulp');
var runSequence = require('run-sequence');
var ngrok = require('ngrok').site;
var debug = require('gulp-debug');

gulp.task('build:production', function(callback) {
    runSequence('clean',
        ['optimize-main',
        'optimize-views',
        'optimize-images'
        ],
        callback);
        //console.log(ngrok);       
});