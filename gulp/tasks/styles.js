var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var config = require('../config.js').sass;

gulp.task('styles', function() {
  gulp.src(config.src)
    .pipe(sass(config.settings))
    .pipe(gulp.dest(config.dest))
    .pipe(browserSync.stream());
});
