'use strict';
var gulp = require('gulp'),
   sass = require('gulp-sass'),
   rename = require('gulp-rename'),
   cssmin = require('gulp-cssmin'),
   cssbeautify = require('gulp-cssbeautify');
gulp.task('bootstrap-sass', function () {
    return gulp.src('node_modules/bootstrap-sass/assets/stylesheets/bootstrap.scss')
         .pipe(sass().on('error', sass.logError))
         .pipe(cssbeautify({
            indent: '  ',
            openbrace: 'separate-line',
            autosemicolon: true
          }))
         .pipe(rename({basename: 'app'}))
         .pipe(gulp.dest('docs/css'))
         .pipe(cssmin())
         .pipe(rename({suffix: '.min'}))
         .pipe(gulp.dest('docs/css'));
});

gulp.task('bootstrap4', function () {
    return gulp.src('node_modules/bootstrap/scss/bootstrap.scss')
         .pipe(sass().on('error', sass.logError))
         .pipe(cssbeautify({
            indent: '  ',
            openbrace: 'separate-line',
            autosemicolon: true
          }))
         .pipe(rename({basename: 'app'}))
         .pipe(gulp.dest('docs/css'))
         .pipe(cssmin())
         .pipe(rename({suffix: '.min'}))
         .pipe(gulp.dest('docs/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('sources/styles/*.scss',['bootstrap-sass']);
    gulp.watch('node_modules/bootstrap-sass/assets/stylesheets/**/*.scss', ['bootstrap-sass']);
   
});
gulp.task('bootstrap4:watch', function () {
    gulp.watch('node_modules/bootstrap/scss/**/*.scss',['bootstrap4']);

   
});