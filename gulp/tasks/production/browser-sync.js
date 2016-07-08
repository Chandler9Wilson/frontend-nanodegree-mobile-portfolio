var gulp        = require('gulp');
var browsersync = require('browser-sync');

var production = browsersync.create('production');

gulp.task('browsersync:production', ['build:production'], function() {
    production.init({
        server: {
            baseDir: ['./dist']
        },
        port: 9998
    });
});