var gulp = require('gulp');
var del = require('del');

// Cleans dist by deleting all files in dist
gulp.task('clean', function() {
    return del('dist');
});