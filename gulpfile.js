const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("gulp-csso");
const rename = require("gulp-rename");

// Styles

const styles = () => {
  return gulp.src("source/sass/style.scss")
  .pipe(plumber())
  .pipe(sourcemap.init())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(csso())
  .pipe(rename("styles.min.css"))
  .pipe(sourcemap.write("."))
  .pipe(gulp.dest("build/css"))
 }

exports.styles = styles;

// Server

const sync = require("browser-sync").create();

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'source'
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
  gulp.watch("source/*.html").on("change", sync.reload);
}

exports.default = gulp.series(
  styles, server, watcher
);

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
  "source/img/**",
  "source/js/**",
  "source/css/**",
  "source/*.ico",
  "source/*.html"
  ], {
  base: "source"
  })
  .pipe(gulp.dest("build"));
};
exports.copy = copy;

// Images

const imagemin = require("gulp-imagemin");
const images = () => {
 return gulp.src("source/img/**/*.{jpg,png,svg}")
  .pipe(imagemin([
    imagemin.optipng({quality: 75,optimizationLevel: 3}),
    imagemin.mozjpeg({progressive: true}),
    imagemin.svgo()
  ]))
}
exports.images = images;

// Sprite

const svgstore = require("gulp-svgstore");
const sprite = () => {
  return gulp.src([
    "source/img/**/icon-*.svg",
    "source/img/**/logo-htmlacademy.svg",
    "source/img/**/logo-footer.svg"
  ])
  .pipe(svgstore())
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("source/img"))
}
exports.sprite = sprite;

// Webp

const webp = require("gulp-webp");
const createWebp = () => {
 return gulp.src("source/img/**/*.{png,jpg}")
 .pipe(webp({quality: 90}))
 .pipe(gulp.dest("source/img"))
}
exports.webp = createWebp;

// Build

const build = gulp.series(
  clean,
  images,
  sprite,
  createWebp,
  copy,
  styles
 );
 exports.build = build
