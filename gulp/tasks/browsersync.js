var gulp = require('gulp');
var config = require('../config').browsersync;
var gutil = require('gulp-util');
var browserSync = require('browser-sync').create();

gutil.log(config);
gulp.task('serve', ['browserify', 'styles', 'html'], function() {
  browserSync.init(config.options);
});


gulp.task('browserSync-reload', function(){
  browserSync.reload();
});
