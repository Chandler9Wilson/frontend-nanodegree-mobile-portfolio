var gulp = require('gulp');
var runSequence = require('run-sequence');

gulp.task('build:production', function(callback) {
    runSequence('clean',
        ['optimize-css',
        'optimize-html',
        'optimize-images-views'
        //'optimize-js'
        ],
        callback);       
});