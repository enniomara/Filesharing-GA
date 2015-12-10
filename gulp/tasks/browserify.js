var babelify = require('babelify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var config = require('../config').browserify;

watchify.args.debug = config.debug;
// config.settings.transform.forEach(function(t){
//   gutil.log(!t.presets);
// })
gutil.log(config.settings.transform)
var bundler = watchify(browserify(config.src, watchify.args));
bundler.transform(babelify, { presets: ['es2015', 'react'] })

gulp.task('browserify', ['browserSync-reload'], function(){
  bundle();
});
bundler.on('update', bundle);


gulp.task('browserify-bundle', function(){

})
function bundle() {
  return bundler.bundle()
  // log errors if they happen
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .pipe(source(config.outputName))
  .pipe(gulp.dest(config.dest));
}
