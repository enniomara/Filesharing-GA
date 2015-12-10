var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');



/*
 |--------------------------------------------------------------------------
 | Concenate vendor stylesheets.
 |--------------------------------------------------------------------------
 */
gulp.task('vendor-styles', function() {
  return gulp.src([
    'bower_components/bootstrap/dist/css/bootstrap.css'
  ]).pipe(concat('vendor.css'))
    .pipe(gulp.dest('dist/styles'));
});


/*
 |--------------------------------------------------------------------------
 | Combine all JS libraries into a single file for fewer HTTP requests.
 |--------------------------------------------------------------------------
 */
gulp.task('vendor', function() {
  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/magnific-popup/dist/jquery.magnific-popup.js',
    'bower_components/toastr/toastr.js'
  ]).pipe(concat('vendor.js'))
    .pipe(uglify({ mangle: false }))
    .pipe(gulp.dest('dist/js'));
});
