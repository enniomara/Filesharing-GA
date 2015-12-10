var gulp = require('gulp');

/*
 |--------------------------------------------------------------------------
 | Concenate vendor stylesheets.
 |--------------------------------------------------------------------------
 */
gulp.task('vendor-styles', function() {
  return gulp.src([
    'bower_components/bootstrap/dist/css/bootstrap.css'
  ]).pipe(concat('vendor.css'))
    .pipe(gulpif(production, uglify({ mangle: false })))
    .pipe(gulp.dest('public/css'));
});
