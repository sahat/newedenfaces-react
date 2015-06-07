var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var merge = require('merge-stream');
var less = require('gulp-less');
var concat = require('gulp-concat');
var babelify = require('babelify');

var plumber = require('gulp-plumber'); // rremove
var imagemin = require('gulp-imagemin');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

var production = process.env.NODE_ENV === 'production';

var dependencies = [
  'react',
  'react-router',
  'underscore'
];

gulp.task('vendor', function() {
  gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/toastr/toastr.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/magnific-popup/dist/jquery.magnific-popup.js'
  ])
    .pipe(concat('vendor.js'))
    .pipe(gulpif(production, streamify(uglify())))
    .pipe(gulp.dest('public/js'));
});

gulp.task('browserify-app', function() {
  var bundler = browserify('app/main.js', watchify.args);
  bundler.transform(babelify);
  bundler.external(dependencies);

  var rebundle = function() {
    var start = Date.now();

    return bundler.bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red(err.toString()));
      })
      .on('end', function() {
        gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
      })
      .pipe(source('bundle.js'))
      .pipe(gulpif(production, streamify(uglify())))
      .pipe(gulp.dest('public/js'))
      .pipe(browserSync.reload({ stream: true }));
  };

  if (!production) {
    bundler = watchify(bundler);
    bundler.on('update', rebundle);
  }

  return rebundle();
});

gulp.task('browserify-vendor', function() {
  var bundler = browserify({ require: dependencies });
  bundler.bundle()
    .pipe(source('bundle-vendor.js'))
    .pipe(gulpif(production, streamify(uglify())))
    .pipe(gulp.dest('public/js'));
});

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      port: 3000,
      baseDir: './public/'
    }
  });
});

gulp.task('styles', function() {
  return gulp.src('app/stylesheets/main.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulpif(production, streamify(cssmin())))
    .pipe(gulp.dest('./public/css'));
});

gulp.task('watch', function() {
  gulp.watch('./app/stylesheets/**/*.less', ['styles']);
});

gulp.task('images', function() {
  gulp.src(['public/img/*.jpg', 'public/img/*.png'])
    .pipe(imagemin())
    .pipe(gulp.dest('public/img'));
});

gulp.task('production', ['vendor', 'browserify-app', 'browserify-vendor'], function() {
  gulp.src(['public/js/vendor.js', 'public/js/vendor-bundle.js', 'public/js/bundle.js'])
    .pipe(concat('combined.js'))
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));
});

gulp.task('default', ['styles', 'browserify-app', 'browserify-vendor', 'vendor', 'watch']);
