'use strict';
import gulp from 'gulp'
import gulpLoadPlugins from 'gulp-load-plugins';
import source from 'vinyl-source-stream';
import babelify from 'babelify';
import browserify from 'browserify';
import watchify from 'watchify';
import imageminJpegtran from 'imagemin-jpegtran';
import imageminPngquant from 'imagemin-pngquant';
const plugins = gulpLoadPlugins({
  rename:{
    'gulp-util': 'util',
    'gulp-if': 'if',
    'gulp-streamify': 'streamify',
    'gulp-autoprefixer': 'autoprefixer',
    'gulp-cssmin': 'cssmin',
    'gulp-less': 'less',
    'gulp-concat': 'concat',
    'gulp-plumber': 'plumber',
    'gulp-uglify': 'uglify',
    'gulp-sourcemaps': 'sourcemaps',
    'gulp-imagemin': 'imagemin',
    'gulp-size': 'size'
  },
  scope: 'devDependencies'
});

const production = process.env.NODE_ENV === 'production';
const dependencies = [
  'alt',
  'react',
  'react-dom',
  'react-router',
  'underscore'
];

/*
 |--------------------------------------------------------------------------
 | Combine all JS libraries into a single file for fewer HTTP requests.
 |--------------------------------------------------------------------------
 */
gulp.task('vendor', () => {
  return gulp.src([
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/magnific-popup/dist/jquery.magnific-popup.js',
    'bower_components/toastr/toastr.js'
  ]).pipe(plugins.concat('vendor.js'))
    .pipe(plugins.if(production, plugins.uglify({ mangle: false })))
    .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Compile third-party dependencies separately for faster performance.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-vendor', () => {
  return browserify()
    .require(dependencies)
    .bundle()
    .pipe(source('vendor.bundle.js'))
    .pipe(plugins.if(production, plugins.streamify(plugins.uglify({ mangle: false }))))
    .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Compile only project files, excluding all third-party dependencies.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify', ['browserify-vendor'], () => {
  return browserify({ entries: 'app/main.js', debug: true })
    .external(dependencies)
    .transform(babelify, { presets: ['es2015', 'react'] })
    .pipe(plugins.streamify(plugins.sourcemaps.init({ loadMaps: true })))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(plugins.if(production, plugins.streamify(plugins.uglify({ mangle: false }))))
    .pipe(plugins.streamify(plugins.sourcemaps.write('.')))
    .pipe(gulp.dest('public/js'));
});

/*
 |--------------------------------------------------------------------------
 | Same as browserify task, but will also watch for changes and re-compile.
 |--------------------------------------------------------------------------
 */
gulp.task('browserify-watch', ['browserify-vendor'], () => {
  let bundler = watchify(browserify({ entries: 'app/main.js', debug: true }, watchify.args));
  bundler.external(dependencies);
  bundler.transform(babelify, { presets: ['es2015', 'react'] })
  bundler.on('update', rebundle);
  return rebundle();

  function rebundle() {
    let start = Date.now();
    return bundler.bundle()
      .on('error', (err) => {
        plugins.util.log(plugins.util.colors.red(err.toString()));
      })
      .on('end', () => {
        plugins.util.log(plugins.util.colors.green('Finished rebundling in', (Date.now() - start) + 'ms.'));
      })
      .pipe(source('bundle.js'))
      .pipe(plugins.streamify(plugins.sourcemaps.init({ loadMaps: true })))
      .pipe(plugins.streamify(plugins.sourcemaps.write('.')))
      .pipe(gulp.dest('public/js/'));
  }
});


/*
  /--------------------------------------------------------------------------
  / JPG and PNG image optimization
  / -------------------------------------------------------------------------
*/

gulp.task('images', () => {
	return gulp.src('./app/img/*')
		.pipe(plugins.imagemin({
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
			use: [imageminJpegtran({progressive: true}),imageminPngquant()]
		}))
		.pipe(gulp.dest('public/img'))
		.pipe(plugins.size({
			title:"Images"
		}));
});

/*
 |--------------------------------------------------------------------------
 | Compile LESS stylesheets.
 |--------------------------------------------------------------------------
 */
gulp.task('styles', () => {
  return gulp.src('app/stylesheets/main.less')
    .pipe(plugins.plumber())
    .pipe(plugins.less())
    .pipe(plugins.autoprefixer())
    .pipe(plugins.if(production, plugins.cssmin()))
    .pipe(gulp.dest('public/css'));
});

gulp.task('watch', () => {
  gulp.watch('app/stylesheets/**/*.less', ['styles']);
});

gulp.task('default', ['styles', 'images','vendor', 'browserify-watch', 'watch']);
gulp.task('build', ['styles', 'images','vendor', 'browserify']);
