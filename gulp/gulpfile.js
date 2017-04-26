
//   npm i gulp -g
//  1.    npm  init 
//  2.    npm i gulp -S
//   3.  npm i gulp-concat -D

var gulp = require('gulp');
var uglify = require('gulp-uglify'); // 混淆和压缩
var concat = require('gulp-concat'); // 合并
var cssnano = require('gulp-cssnano'); //压缩css
var concatcss = require('gulp-concat-css'); //合并css
// var htmlmin = require('gulp-htmlmin');  
var htmlminify = require('gulp-html-minify');  // 压缩html  比上面的那个方便，不用传参
var useref = require('gulp-useref');  // css  js 文件合并后的引入修改


gulp.task('js',function(){
	gulp.src(['./js/*.js'],{base:'.'})
	// .pipe(uglify())
	.pipe(concat('/js/all.js'))   // dist 下的js下的all.js文件
	.pipe(gulp.dest('dist'))
})

gulp.task('css',function(){
	gulp.src(['./css/*.css'],{base:'.'})
	.pipe(cssnano())
	.pipe(concatcss('/css/all.css'))
	.pipe(gulp.dest('dist'))
})

gulp.task('html',function(){
	gulp.src('./index.html',{base:'.'})
// .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true, minifyJS: true })) //压缩html collapseWhitespace为true就是去除空格换行
	.pipe(useref())   // 必须在html压缩前处理
	.pipe(htmlminify())   //html压缩，需要配置参数
	.pipe(gulp.dest('dist'))
})

// 多个任务执行方式
gulp.task('default',['js','css','html']);