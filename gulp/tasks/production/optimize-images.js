var gulp = require('gulp');
var imagemin = require('gulp-imagemin');

gulp.task('optimize-images-views', function() {
    return gulp.src('src/views/images/*.{jpg,jpeg,png,gif}')
        .pipe(imagemin({
            options: {
                optimizationLevel: 3,
                progessive: true,
                interlaced: true
            }
        }))
        .pipe(gulp.dest('dist/views/images/'));
        //.pipe(debug({title: 'unicorn:'}));
});