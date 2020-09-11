const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const sync = require("browser-sync").create();
const imagemin = require("gulp-imagemin");
const svgstore = require("gulp-svgstore");
const webp = require("gulp-webp");
const uglify = require('gulp-uglify-es').default;

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("styles.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());
}
exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", { delay: 500 }, gulp.series("styles"));
  gulp.watch("source/*.html", { delay: 500 }, gulp.series("copyHtml"));
  gulp.watch("build/*.html").on("change", sync.reload);
  gulp.watch("source/js/*.js", { delay: 500 }, gulp.series("js"));
  gulp.watch("build/js/*.js").on("change", sync.reload);
}

// Clean

const del = require("del");
const clean = () => {
  return del("build");
};
exports.clean = clean;

// Copy

const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/*.ico"
  ])
    .pipe(gulp.dest("build"));
}; 
exports.copy = copy;

const copyHtml = () => {
  return gulp.src([
    "source/*.html"
  ])
    .pipe(gulp.dest("build"));
};
exports.copyHtml = copyHtml;

const js = () => {
  return gulp.src("source/js/*.js")
    .pipe(gulp.dest("build/js"))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest("build/js"));
};
exports.js = js;

// Images

const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.optipng({ quality: 75, optimizationLevel: 3 }),
      imagemin.mozjpeg({ progressive: true }),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("build/img"));
};
exports.images = images;

// Sprite

const sprite = () => {
  return gulp.src([
    "build/img/**/icon-*.svg",
    "build/img/**/logo-htmlacademy.svg",
    "build/img/**/logo-footer.svg"
  ])
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}
exports.sprite = sprite;

// Webp

const createWebp = () => {
  return gulp.src("build/img/**/*.{png,jpg}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"))
}
exports.webp = createWebp;

// Build

const build = gulp.series(
  clean,
  styles,
  images,
  sprite,
  createWebp,
  copy,
  copyHtml,
  js
);
exports.build = build

exports.default = gulp.series(
  build, server, watcher
);
