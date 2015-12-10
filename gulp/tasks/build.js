var gulp = require('gulp');
var config = require('../config').watch;

gulp.task('build', ['vendor', 'vendor-styles', 'browserify', 'styles', 'html', 'browserSync-reload'], function() {
  gulp.src(config.src);
});
