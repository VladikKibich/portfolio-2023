const { src, dest, watch, parallel, series } = require('gulp');

const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const browserSync = require('browser-sync').create();
const autoPrefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const webFonts = require('gulp-google-webfonts');

//CSS
function styles() {
  return src('app/sass/*.sass')
    .pipe(sass({
      outputStyle: 'compressed'
    }))
    .pipe(autoPrefixer({
      overrideBrowserslist: ['last 10 version']
    }))
    .pipe(concat('style.min.css'))
    .pipe(dest('app/css'))
    .pipe(browserSync.stream())
}

// JS
function scripts() {
  return src([
    'node_modules/swiper/swiper-bundle.js',
    'app/js/app.js',
  ])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(dest('app/js'))
    .pipe(browserSync.stream())
}

// GOOGLE FONTS
function fonts() {
  return src('font.list')
    .pipe(webFonts({
      fontsDir: 'fonts/',
      cssDir: 'css/',
      cssFilename: 'webfonts.css',
      relativePaths: true
    }))
    .pipe(dest('app/'));
}

function images() {
  return src('app/img/*.*')
    .pipe(dest('app/img/'));
}

// WATCH
function watching() {
  watch(['app/sass/*.sass'], styles)
  watch(['app/js/app.js'], scripts)
  watch(['app/fonts/*.*'], fonts)
  watch(['app/*.html']).on('change', browserSync.reload)
}

// BROWSER-SYNC
function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/"
    }
  });

}

function cleanDist() {
  return src('dist')
    .pipe(clean())
}

//Саздание создание папки "dist"
function buildDist() {
  return src(
    [
      'app/css/style.min.css',
      'app/js/app.min.js',
      'app/fonts/*.*',
      'app/img/**/*.*',
      'app/**/*.html',
    ], { base: 'app' }
  )
    .pipe(dest('dist'))
}

exports.styles = styles;
exports.scripts = scripts;
exports.fonts = fonts;
exports.images = images;
exports.watching = watching;
exports.browsersync = browsersync;

exports.build = series(cleanDist, buildDist);
exports.fonts = series(fonts, watching);
exports.default = parallel(styles, images, scripts, browsersync, watching);