var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var uglify = require('gulp-uglify');
var merge = require('merge-stream');
var less = require('gulp-less');
var reactify = require('reactify');
var watchify = require('watchify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('browser-sync', function() {
  browserSync({
    proxy: 'localhost:3000',
    files: ['public/**/*.{js,css}']
  });
});

gulp.task('less', function () {
  return gulp.src('./app/styles/main.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('browserify', function() {
  var bundler = watchify(browserify('./app/main.js', watchify.args));
  bundler.transform(reactify);
  bundler.on('update', rebundle);
  function rebundle() {
    return plumber()
      .pipe(bundler.bundle())
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./public/js/'))
      .pipe(reload({ stream: true }));
  }
  return rebundle();
});

gulp.task('minify', function() {
  var css = gulp.src('./public/css/main.css')
    .pipe(cssmin())
    .pipe(gulp.dest('./public/css/'));

  var js = gulp.src('./public/js/bundle.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/js/'));

  return merge(css, js);
});

gulp.task('watch', function() {
  gulp.watch('./app/styles/**/*.less', ['less']);
});

gulp.task('default', ['less', 'browserify', 'browser-sync', 'watch']);