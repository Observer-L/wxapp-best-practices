const gulp = require("gulp");
const $ = require("gulp-load-plugins")();
const del = require("del");
const autoprefixer = require("autoprefixer");
const uglifyjs = require("uglify-es");
const px2rpx = require("postcss-px2rpx");
const composer = require("gulp-uglify/composer");
const minifyJs = composer(uglifyjs, console);
const tsProject = $.typescript.createProject("tsconfig.json");

/* 文件路径 */
const distPath = "./dist";
const wxmlFiles = "src/**/*.wxml";
const lessFiles = ["src/**/!(_)*.less"];
const jsonFiles = "src/**/*.json";
const tsFiles = ["src/**/*.ts"];
const copyPath = ["src/**/!(_)*.*", "!src/**/*.less", "!src/**/*.ts"];

const isProd = process.env.NODE_ENV === "production";

/****************************/
/*****************************
 ***         TASKS         ***
 ****************************/
/****************************/

/**
 * @description 清空非npm构建包dist目录文件
 */
gulp.task("clean", () => {
  return del(distPath);
});

/**
 * @description 复制不包含less和图片的文件
 */
gulp.task("copy", () => {
  return gulp.src(copyPath).pipe(gulp.dest(distPath));
});

/**
 * @description 压缩wxml，生产环境任务
 * @options 去空，去注释，补全标签
 */
gulp.task("minify-wxml", () => {
  const options = {
    collapseWhitespace: true,
    removeComments: true,
    keepClosingSlash: true
  };
  return gulp
    .src(wxmlFiles)
    .pipe($.if(isProd, $.htmlmin(options)))
    .pipe(gulp.dest(distPath));
});

/**
 * @description 压缩json，生产环境任务
 */
gulp.task("minify-json", function () {
  return gulp
    .src(jsonFiles)
    .pipe($.jsonminify2())
    .pipe(gulp.dest(distPath));
});

/**
 * @description 编译less，补全、压缩样式文件
 */
gulp.task("compile-less", () => {
  const postcssOptions = [
    px2rpx({
      screenWidth: 750, // 设计稿屏幕, 默认750
      wxappScreenWidth: 750, // 微信小程序屏幕, 默认750
      remPrecision: 6 // 小数精度, 默认6
    }),
    autoprefixer({
      overrideBrowserslist: ["ios >= 8", "android >= 4.1"]
    })
  ];
  return gulp
    .src(lessFiles)
    .pipe($.plumber())
    .pipe($.if(!isProd, $.sourcemaps.init()))
    .pipe($.less())
    .pipe($.if(isProd, $.cssnano()))
    .pipe($.postcss(postcssOptions))
    .pipe($.if(!isProd, $.sourcemaps.write()))
    .pipe(
      $.rename({
        extname: ".wxss"
      })
    )
    .pipe(gulp.dest(distPath));
});

/**
 * @description 编译、压缩ts
 */
gulp.task("compile-ts", () => {
  const options = {
    compress: {
      drop_console: true,
      drop_debugger: true
    }
  };
  return tsProject
    .src()
    .pipe($.plumber())
    .pipe($.if(!isProd, $.sourcemaps.init()))
    .pipe($.eslint())
    .pipe($.eslint.format())
    .pipe(tsProject())
    .js.pipe($.if(isProd, minifyJs(options)))
    .pipe($.if(!isProd, $.sourcemaps.write()))
    .pipe(gulp.dest(distPath));
});

/**
 * @description 通用编译
 */
gulp.task(
  "compile",
  gulp.series(
    "clean",
    gulp.parallel(
      "compile-ts",
      "compile-less",
      "copy"
    )
  )
);

/**
 * @description 编译、监听
 */
gulp.task(
  "watch",
  gulp.series("compile", function watcher() {
    gulp.watch(tsFiles, gulp.parallel("compile-ts"));
    gulp.watch(lessFiles, gulp.parallel("compile-less"));
    gulp.watch(copyPath, gulp.parallel("copy"));
    $.watch("src/**", e => {
      console.log(`[watch]:${e.path} has ${e.event}`);
    });
  })
);

/**
 * @description 生产环境打包
 */
gulp.task(
  "build",
  gulp.series(
    "compile",
    gulp.parallel("minify-wxml", "minify-json")
  )
);