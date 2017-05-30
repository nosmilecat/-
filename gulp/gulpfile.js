
// //   npm i gulp -g
// //  1.    npm  init 
// //  2.    npm i gulp -S
// //   3.  npm i gulp-concat -D

// var gulp = require('gulp');
// var uglify = require('gulp-uglify'); // 混淆和压缩
// var concat = require('gulp-concat'); // 合并
// var cssnano = require('gulp-cssnano'); //压缩css
// var concatcss = require('gulp-concat-css'); //合并css
// // var htmlmin = require('gulp-htmlmin');  
// var htmlminify = require('gulp-html-minify');  // 压缩html  比上面的那个方便，不用传参
// var useref = require('gulp-useref');  // css  js 文件合并后的引入修改


// gulp.task('js',function(){
// 	gulp.src(['./js/*.js'],{base:'.'})
// 	.pipe(uglify())
// 	.pipe(concat('/js/all.js'))   // dist 下的js下的all.js文件
// 	.pipe(gulp.dest('dist'))
// })

// gulp.task('css',function(){
// 	gulp.src(['./css/*.css'],{base:'.'})
// 	.pipe(cssnano())
// 	.pipe(concatcss('/css/all.css'))
// 	.pipe(gulp.dest('dist'))
// })

// gulp.task('html',function(){
// 	gulp.src('./index.html',{base:'.'})
// // .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true, minifyJS: true })) //压缩html collapseWhitespace为true就是去除空格换行
// 	.pipe(useref())   // 必须在html压缩前处理
// 	.pipe(htmlminify())   //html压缩，需要配置参数
// 	.pipe(gulp.dest('dist'))
// })

// // 多个任务执行方式
// gulp.task('default',['js', 'html', 'css']);

// gulp.task('default', function() {
//     //监视src下的文件如果发生改变，重新执行打包任务,需要执行gulp后更改文件生效
//     gulp.watch('./src/**/*.*', ['js', 'html', 'css']);
// });

//////////////////////////////////////////////////////////////////////////////////////////////////
//声明清除目录的任务
// 存在异步的问题，需要声明依赖并且要有return
var gulp = require('gulp');
//js
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
//css
var cssnano = require('gulp-cssnano');
//html useref
var useref = require('gulp-useref');
//htmlmin
var htmlmin = require('gulp-htmlmin');
//清除目录数据
var clean = require('gulp-clean');
//处理css任务
gulp.task('css', ['js'], function() {
    return gulp.src('./src/css/*.css', { base: './src' })
        .pipe(cssnano())
        .pipe(gulp.dest('dist')) 
});
gulp.task('js', ['html'], function() {
    return gulp.src('./src/js/*.js') 
        .pipe(uglify())
        // .pipe(concat('js/all.js'))
        .pipe(gulp.dest('dist/js'))
});
//
gulp.task('html', ['clean'], function() {
    return gulp.src('./src/index.html', { base: './src' })
        // .pipe(useref())    // 用于更改js的script引入，合并成某一个
        .pipe(htmlmin({ collapseWhitespace: true, minifyCSS: true, minifyJS: true })) 
        .pipe(gulp.dest('dist'))
});
//声明清除目录的任务
gulp.task('clean', function() {
    return gulp.src('./dist')
        .pipe(clean());
})

//默认任务
gulp.task('default', ['css'], function() {
    console.log('default任务执行了');
})
