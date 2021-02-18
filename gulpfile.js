const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
//sass/scss
const sass = require('gulp-sass');
sass.compiler = require('node-sass');
const del = require('del');
const browserSync = require('browser-sync').create();
//js
var uglify = require('gulp-uglify');
const babel = require('gulp-babel');
var sourcemaps = require('gulp-sourcemaps');
//img min
const imagemin = require('gulp-imagemin');
const imgJpgCompress  = require('imagemin-jpeg-recompress');
const imgPngCompress = require('imagemin-pngquant');
//список наших css в нужном порядке что бы concat их объеденил в 1
const cssFiles = [
    "./node_modules/normalize.css/normalize.css",
    './public_html/src/css/**/reset.css',
    './public_html/src/fonts/stylesheet.css',
    './public_html/src/css/**/style.scss',
];
const jsFiles = [
    './public_html/src/js/**/script.js',
];
function styles(){
    //указываем откуда тащим
    return gulp.src(cssFiles)
            .pipe(sourcemaps.init())
            //объединяем файлы
            .pipe(sass().on('error', sass.logError))
            .pipe(concat('style.css'))
            //префиксы
            .pipe(autoprefixer({
                overrideBrowserslist: [
                    "> 0.2%"
                ],
                cascade: false
            }))
            //минимализируем
            .pipe(cleanCSS({
                level:2
            }))
            .pipe(sourcemaps.write('.'))
            //в место куда тащим
            .pipe(gulp.dest('./public_html/assets/css'))
            .pipe(browserSync.stream());

}
function fonts(){
    return gulp.src('./public_html/src/fonts/**/*')
    .pipe(gulp.dest('./public_html/assets/fonts/'));
}
function scripts(){
    return gulp.src(jsFiles)
    //карта сайта
            .pipe(sourcemaps.init())
    //babel
            .pipe(babel({
                presets: ['@babel/env']
            }))
    //объединение
            .pipe(concat('main.js'))
    //сжатие, анализ и тд
            .pipe(uglify({
                toplevel:true
            }))
    //пишем нашу мапу
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest("./public_html/assets/js"))
            .pipe(browserSync.stream())

}
function watch(){
    browserSync.init({
        // server: {
        //     baseDir: "./"
        // },
        proxy:'gamilon',
        notify: false
    });
    gulp.watch('./public_html/src/css/**/*',styles);
    gulp.watch('./public_html/src/js/**/*.js',scripts);
    gulp.watch('./public_html/src/img/**',minimg);
    // gulp.watch('./public_html/**/*.html').on('change', browserSync.reload);
    gulp.watch('./public_html/**/*.php').on('change', browserSync.reload);
}

function minimg(){
    return gulp.src('./public_html/src/img/**')
            .pipe(imagemin([
                imagemin.gifsicle({interlaced: true}),
                imgJpgCompress({
                    progressive: true,
                    loops: 4,
                    min: 70,
                    max: 80,
                    quality: 'high'
                }),
                imgPngCompress({
                    quality: [0.4, 0.7],
                }),
                imagemin.svgo({plugins: [{removeViewBox: true}]})
            ]))

            .pipe(gulp.dest('./public_html/assets/img/'));
}
function clean() {
    return (
        del([
            './public_html/assets/css/*',
            './public_html/assets/js/*',
            './public_html/assets/img/*'
        ])
    )

}
gulp.task('styles',styles);
gulp.task('fonts', fonts);
gulp.task('scripts',scripts);
gulp.task('watch',watch);
gulp.task('minimg',minimg);
// сперва все удалит потом занового соберет
gulp.task('build', gulp.series(clean, gulp.parallel(fonts,styles,scripts,minimg)));
//запускаем таск build и потом watch
gulp.task('dev', gulp.series('build', 'watch'));