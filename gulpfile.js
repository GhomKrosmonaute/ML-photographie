const gulp = require("gulp")
const sass = require("gulp-sass")(require("sass"))
const sourcemaps = require("gulp-sourcemaps")
const esbuild = require("gulp-esbuild")
const rename = require("gulp-rename")
const cp = require("child_process")

function styles() {
  return gulp
    .src("scss/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("public/css"))
}

function watchStyles() {
  return gulp.watch("scss/**/*.scss", styles)
}

function react() {
  return gulp
    .src(["react/**/*.jsx", "react/**/*.tsx"])
    .pipe(
      esbuild({
        jsx: "transform",
        sourcemap: "inline",
        format: "cjs",
      })
    )
    .pipe(
      rename(function (path) {
        // Returns a completely new object, make sure you return all keys needed!
        return {
          dirname: path.dirname,
          basename: path.basename.replace(".js", ""),
          extname: path.dirname.includes("components") ? ".js" : ".jsx",
        }
      })
    )
    .pipe(gulp.dest("views"))
}

function watchReact() {
  return gulp.watch(["react/**/*.jsx", "react/**/*.tsx"], react)
}

function ts() {
  return gulp
    .src("src/**/*.ts")
    .pipe(
      esbuild({
        sourcemap: "inline",
        tsconfig: "./tsconfig.json",
        format: "cjs",
      })
    )
    .pipe(gulp.dest("dist"))
}

function watchTS() {
  return gulp.watch("src/**/*.ts", ts)
}

function serve(cb) {
  setTimeout(() => {
    const spawn = cp.spawn("nodemon dist/main.js --config nodemon.json", {
      shell: true,
      cwd: __dirname,
    })

    spawn.stdout.on("data", (data) => {
      console.log(`${data}`.trim())
    })

    spawn.stderr.on("data", (data) => {
      console.error(`${data}`.trim())
    })

    spawn.on("close", () => cb())
  }, 2000)
}

const startWatchingStyles = gulp.series(styles, watchStyles)
const startWatchingReact = gulp.series(react, watchReact)
const startWatchingTS = gulp.series(ts, watchTS)

exports.styles = styles
exports.react = react
exports.ts = ts
exports.serve = serve

exports.watchStyles = startWatchingStyles
exports.watchReact = startWatchingReact
exports.watchTS = startWatchingTS

exports.build = gulp.parallel(styles, react, ts)

exports.watch = gulp.parallel(
  startWatchingStyles,
  startWatchingReact,
  startWatchingTS,
  serve
)
