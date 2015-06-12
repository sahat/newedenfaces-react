var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var cssmin = require('gulp-cssmin');
var merge = require('merge-stream');
var less = require('gulp-less');
var concat = require('gulp-concat');
var babelify = require('babelify');
var nodemon = require('gulp-nodemon');
var plumber = require('gulp-plumber'); // rremove

var production = process.env.NODE_ENV === 'production';

var dependencies = [
  'react',
  'react-router',
  'underscore'
];

gulp.task('browserify', function() {
  var bundler = browserify('app/main.js', watchify.args);
  bundler.transform(babelify);
  bundler.external(dependencies);

  function rebundle() {
    var start = Date.now();

    return bundler.bundle()
      .on('error', function(err) {
        gutil.log(gutil.colors.red(err.toString()));
      })
      .on('end', function() {
        gutil.log(gutil.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('public/js'));
  }

  if (!production) {
    bundler = watchify(bundler);
    bundler.on('update', rebundle);
  }

  return rebundle();
});

gulp.task('browserify-vendor', function() {
  var bundler = browserify({ require: dependencies });

  return bundler.bundle()
    .pipe(source('bundle-vendor.js'))
    .pipe(gulp.dest('public/js'));
});

gulp.task('styles', function() {
  return gulp.src('app/stylesheets/main.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css'));
});

gulp.task('deploy', ['browserify', 'browserify-vendor', 'styles'], function() {
  var js = gulp.src([
    'public/js/jquery.js',
    'public/js/bootstrap.js',
    'public/js/jquery.magnific-popup.js',
    'public/js/toastr.js',
    'public/js/bundle-vendor.js',
    'public/js/bundle.js'
  ])
    .pipe(uglify({ mangle: false }))
    .pipe(concat('combined.js'))
    .pipe(gulp.dest('./public/js'));

  var css = gulp.src('./public/css/main.css')
    .pipe(cssmin())
    .pipe(gulp.dest('./public/css'));

  return merge(js, css);

});

gulp.task('watch', function() {
  gulp.watch('./app/stylesheets/**/*.less', ['styles']);
  nodemon({ exec: 'babel-node', script: 'server.js', ignore: ['gulpfile.js', 'public/js', 'app', 'node_modules']
  });
});

gulp.task('default', ['styles', 'browserify', 'browserify-vendor', 'watch']);
