/*eslint no-undef: "error"*/
/*eslint-env node*/

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var runSequence = require('run-sequence');
var del = require('del');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
const babel = require('gulp-babel');

gulp.task('sass', function () {
  return gulp.src('app/scss/styles.scss')
    .pipe(sass())
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('babel', () =>
    gulp.src('app/es6/**/*.js')
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(gulp.dest('app/js'))
);

gulp.task('watch', ['browserSync', 'sass', 'babel'], function () {
  gulp.watch('app/scss/**/*.scss', ['sass']);
  gulp.watch('app/es6/**/*.js', ['babel']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

gulp.task('browserSync', function () {
  browserSync.init({
    server: {
      baseDir: 'app'
    },
  });
});

gulp.task('browserSync:build', function () {
  browserSync.init({
    server: {
      baseDir: 'dist'
    },
  });
});

gulp.task('useref', function () {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function () {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('images', function () {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('clean:dist', function () {
  return del.sync('dist');
});

gulp.task('build', function (callback) {
  runSequence('clean:dist', 
    ['sass', 'babel', 'useref', 'images', 'fonts', 'browserSync:build'],
    callback
  );
});

gulp.task('default', function (callback) {
  runSequence(['sass', 'babel', 'browserSync', 'watch'],
    callback
  );
});