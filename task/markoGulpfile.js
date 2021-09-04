// GLOBAL
// --Includes
const { src } = require('gulp');
const gulp = require('gulp');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

// --Project data
const paths = {
  styles: {
    src: '../assets/scss/main.scss',
    dest: '../assets/css/',
    assetsPath: '../assets/scss/**/*.scss',
    components: '../template-parts/**/*.scss'
  },

  js: {
    global: '../assets/js/partials/global.js',
    utils: '../assets/js/partials/utils.js',
    components: '../template-parts/**/*.js',
    vendor: '../assets/js/vendor/**/*.js',
    dest: '../assets/js',
    partials: '../assets/js/partials/**/*.js',
  }
}

// TASKS
// --Sass
function scss(cb) {
  console.log('starting scss compile');
  return gulp.src(paths.styles.src)
    .pipe(sass())
    .pipe(gulp.dest(paths.styles.dest));

  cb();
}
exports.scss = scss;

// --Copy
function copy(cb) {
  src('routes/*.js')
    .pipe(dest('copies'));
  cb();
}
exports.copy = copy;

// JavaScript
function optjs(cb) {
  return src([paths.js.utils, paths.js.vendor, paths.js.components, paths.js.global])
    .pipe(concat('main.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest(paths.js.dest));
  cb();
}
exports.uglify = uglify;

// --Watch
const watch = () => {
  gulp.watch([paths.styles.assetsPath, paths.styles.components], scss);
  gulp.watch([paths.js.components, paths.js.partials], optjs);

}
exports.default = gulp.series(watch);