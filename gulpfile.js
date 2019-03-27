"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var minify = require("gulp-csso");
var rename = require("gulp-rename");
var imagemin = require('gulp-imagemin');
var htmlmin = require('gulp-htmlmin');
var minifyJS = require('gulp-minify');
var del = require("del");
var server = require("browser-sync").create();

gulp.task("style", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"))
});

gulp.task("htmlmin", function ()  {
  return gulp.src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
});

gulp.task("jsmin", function() {
  return gulp.src("source/**/*.js")
    .pipe(minifyJS())
    .pipe(gulp.dest('build'))
});

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
      ]))
    .pipe(gulp.dest("build/img"))
});

gulp.task("copy", function () {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/css/normalize.css"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("serve", function () {
  server.init({
    server: "build/",
  });

  gulp.watch("source/less/**/*.less", gulp.series("style"));
  gulp.watch("source/*html", gulp.series("htmlmin"));
});

gulp.task("start", gulp.series("style", "serve"));
gulp.task("build", gulp.series("clean", "copy", "htmlmin", "style", "jsmin", "images"));
