//initial plugins
const gulp = require("gulp");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const plumber = require("gulp-plumber");
const sourcemaps = require("gulp-sourcemaps");

// styles
const styles = () => {
    return gulp.src("./src/less/style.less")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("src/css"))
        .pipe(browsersync.stream());
}

exports.styles = styles;

//server
const server = (done) => {
    browsersync.init({
        server: {
            baseDir: "src"
        },
        cors: true,
        notify: false,
        ui: false,
    });
    done();
}

exports.server = server;

// watcher
const watcher = () => {
    gulp.watch("src/less/**/*.less", gulp.series("styles"));
    gulp.watch("src/*.html").on("change", browsersync.reload);
  }
  
  exports.default = gulp.series(
    styles, server, watcher
  );