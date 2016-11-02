/**
 * Created by decipher on 2.11.16.
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var pump = require('pump');
var csso = require('gulp-csso');
var rename = require("gulp-rename");

gulp.task('compress', function (cb) {
    pump([
            gulp.src('./src/*.js'),
            uglify(),
            rename({ suffix: '.min' }),
            gulp.dest('dist')
        ],
        cb
    );
});

gulp.task('css', function () {
    return gulp.src('./src/*.css')
        .pipe(csso())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('default', ['compress', 'css']);
