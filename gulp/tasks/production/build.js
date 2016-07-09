var gulp = require('gulp');
var runSequence = require('run-sequence');
var ngrok = require('ngrok').site

gulp.task('build:production', function(callback) {
    runSequence('clean',
        ['optimize-css',
        'optimize-html',
        'optimize-images',
        'optimize-js'
        ],
        //'psi-mobile',
        //'psi-desktop',
        callback);
        console.log(ngrok);       
});