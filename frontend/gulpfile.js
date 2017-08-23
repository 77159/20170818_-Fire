var gulp = require('gulp');
// 引入组件
var htmlmin = require('gulp-htmlmin'), //html压缩
  imagemin = require('gulp-imagemin'), //图片压缩
  pngcrush = require('imagemin-pngcrush'),
  minifycss = require('gulp-minify-css'), //css压缩
  //jshint = require('gulp-jshint'), //js检测
  uglify = require('gulp-uglify'), //js压缩
  concat = require('gulp-concat'), //文件合并
  rename = require('gulp-rename'), //文件更名
  notify = require('gulp-notify'), //提示信息
  htmlreplace = require('gulp-html-replace'),
  connect = require('gulp-connect'),
  del = require('del');
/**
 * This is intended to be a temporary solution until the release of gulp 4.0 which has support
 * for defining task dependencies in series or in parallel.
 */
var runSequence = require('run-sequence');
// Load plugins
var $ = require('gulp-load-plugins')();
var copyFilesPath = ['data/**/*', 'lib/**/*', 'fonts/**/*', 'resource/**/*', './vidio/**/*'];
var htmlPath = './src/*.html';
var jsPath = './src/js/**/*.js';
var cssPath = './src/css/**/*.css';
/*
=====================================
CLEAN TASK
=====================================

gulp.task('clean', function(cb) {
  del(['dest'], cb);
});*/
gulp.task('clean', function(cb) {
  return del(['dist/**/*'], cb);
});
//copy 不需要打包的服务
gulp.task('copy-src-to-dest', function() {
  gulp.src(copyFilesPath, {
    base: './'
  }).pipe(gulp.dest('dist'));
});
// 压缩html
gulp.task('html', function() {
  return gulp.src('*.html').pipe(htmlreplace({
    'css': ['css/main.min.css'],
    'js': ['js/all.min.js']
  })).pipe(gulp.dest('dist')).pipe(notify({
    message: 'html task ok'
  }));
});
/*
=====================================
Image TASKS (.LESS)
=====================================
*/
// gulp.task('images-opt', function () {
//     gulp.src('image/*.+(jpeg|jpg|png)')
//         .pipe(imagemin({
//             progressive: true,
//             use: [pngquant({quality: '65-80'})]
//         }))
//         .pipe(gulp.dest('dest/image/'));
// });
// 压缩图片
gulp.task('img', function() {
  return gulp.src('image/**/*').pipe(imagemin({
    progressive: true,
    svgoPlugins: [{
      removeViewBox: false
    }],
    use: [pngcrush()]
  })).pipe(gulp.dest('dist/image/'));
  //.pipe(notify({ message: 'img task ok' }));
});
//合并、压缩、重命名css
gulp.task('css', function() {
  return gulp.src('css/*.css').pipe(concat('main.css')).pipe(gulp.dest('dist/css')).pipe(rename({
    suffix: '.min'
  })).pipe(minifycss()).pipe(gulp.dest('dist/css')).pipe(notify({
    message: 'css task ok'
  }));
});
// 检查js
// gulp.task('lint', function() {
//   return gulp.src('js/*.js')
//     .pipe(jshint())
//     .pipe(jshint.reporter('default'))
//     .pipe(notify({
//       message: 'lint task ok'
//     }));
// });
/*
=====================================
合并、压缩js文件
=====================================
*/
gulp.task('js', function() {
  return gulp.src(jsPath).pipe($.babel({
    presets: ['es2015']
  })).pipe(concat('all.js')).pipe(gulp.dest('dist/js')).pipe(rename({
    suffix: '.min'
  })).pipe(uglify()).pipe(gulp.dest('dist/js')).pipe(notify({
    message: 'js task ok'
  }));
});
/*
=====================================
COPY TASK
=====================================
*/
gulp.task('connect', function() {
  connect.server({
    root: 'src',
    port: '9000',
    livereload: true
  });
});

gulp.task('devjs', function() {
  gulp.src(jsPath).pipe($.babel({
    presets: ['es2015']
  })).pipe(connect.reload());
});

gulp.task('devhtml', function() {
  gulp.src(htmlPath).pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(htmlPath, ['devhtml']);
  gulp.watch(jsPath, ['devjs']);
  gulp.watch(cssPath, ['devhtml']);
});

// 默认任务
gulp.task('build', function() {
  runSequence('clean', 'copy-src-to-dest', 'img', 'css', 'js', 'html');
});

// 开发任务
gulp.task('default', ['connect', 'watch']);