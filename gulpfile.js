// const imagemin = require('imagemin');

let gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');
    imagemin = require('gulp-imagemin');

gulp.task('serve', gulp.series(css, function() {
    browsersync.init({
        server: {
            baseDir: "./app/",
            index: 'index.html'
        },
        port: 8080,
        open: true,
        notify: false
    });

    gulp.watch("./resources/scss/**", gulp.series(css));
    gulp.watch("app/*.html").on('change', browsersync.reload);
    gulp.watch("app/img").on('change', browsersync.reload);
}));

function css() {
    return gulp.src("./resources/scss/**/*.scss")
                .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError)) //установить логирование ошибок
                .pipe(autoprefixer(
                    {
                        overrideBrowserslist: ['last 2 versions'],
                        cascade: false,
                        remove: false
                    }
                ))
                .pipe(gulp.dest("app/css"))
                .pipe(browsersync.stream());
};

function minifyImg() {
    return gulp.src('./app/img/**')
                .pipe(imagemin())
                .pipe(gulp.dest('./app/img'))
}


gulp.task('default', gulp.series('serve'));
gulp.task('minify-images', gulp.series(minifyImg));