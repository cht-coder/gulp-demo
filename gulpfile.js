const { src, dest, series, parallel } = require("gulp");
const cleanCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const htmlReplace = require("gulp-html-replace");
const sourceMaps = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const babel = require("gulp-babel");
const purgeCSS = require("gulp-purgecss");
const terser = require("gulp-terser");
const del = require("del");

var paths = {
  css: ["./src/**/*.css", "./src/**/*.scss"],
  js: ["./src/**/*.js"],
  exclude: ["!./node_modules", "!./gulpfile.js"],
  dist: "./dist",
};

var clean = () => del([paths.dist]);

function minifyCSS() {
  return src(["./src/**/*.{css,scss}"])
    .pipe(sourceMaps.init())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(
      purgeCSS({
        content: ["./index.html"],
      })
    )
    .pipe(
      cleanCSS({
        level: 2,
        compatibility: "ie8",
        inline: ["local", "fonts.googleapis.com"],
      })
    )
    .pipe(concat("main.min.css"))
    .pipe(sourceMaps.write("../maps"))
    .pipe(dest(paths.dist + "/css"));
}

function minifyJS() {
  return src(["./src/**/*.js", "!./node_modules", "!gulpfile.js"])
    .pipe(sourceMaps.init())
    .pipe(
      babel({
        presets: ["@babel/preset-env"],
      })
    )
    .pipe(
      terser({
        mangle: true,
        output: {
          quote_style: 1,
        },
      })
    )
    .pipe(concat("main.min.js"))
    .pipe(sourceMaps.write("../maps"))
    .pipe(dest(paths.dist + "/js"));
}

function htmlChanges() {
  return src(["./src/*.html"])
    .pipe(
      htmlReplace({
        js: { src: "./js", tpl: '<script src="%s/main.min.js"></script>' },
        css: { src: "./css", tpl: '<link src="%s/main.min.css" />' },
      })
    )
    .pipe(dest(paths.dist));
}

exports.default = series(clean, parallel(minifyCSS, minifyJS, htmlChanges));
