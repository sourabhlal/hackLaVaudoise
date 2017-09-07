var sass = require("gulp-sass");
var gulp = require("gulp");
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var pump = require('pump');


gulp.task('sass', function () {
    return gulp.src('./scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('sass:watch', ['sass'], function () {
    gulp.watch('./scss/*.scss', ['sass']);
});


gulp.task('compress', function (cb) {
    pump([
            gulp.src('javascript/*.js'),
            uglify(),
            gulp.dest('public/js')
        ],
        cb
    );
});


gulp.task('compress:watch', ['compress'], function () {
    gulp.watch('./javascript/*.js', ['compress']);
});

gulp.task('default', ['compress:watch', 'sass:watch']);