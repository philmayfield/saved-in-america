// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var svgSprite = require('gulp-svg-sprite');
var imagemin = require ('gulp-imagemin');
var pngquant = require ('imagemin-pngquant');

svgConfig = {
    mode: {
        view: {         // Activate the «view» mode
            bust: false,
            render: {
                scss: true      // Activate Sass output (with default options)
            }
        },
        symbol: true      // Activate the «symbol» mode
    }
};

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('scss/*.scss')
        .pipe(sass())
        .pipe(rename('main.min.css'))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css'));
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src(['js/vendor/modernizr-2.6.2.min.js', 'js/picturefill.js', 'js/svg4everybody.min.js', 'js/plugins.js', 'js/vendor/jquery.magnific-popup.min.js', 'js/main.js'])
        .pipe(concat('main.js'))
        .pipe(rename('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// Optimize images
gulp.task('imagemin', function() {
    return gulp.src('img/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/img'));
});

// Create SVG sprite
gulp.task('svgsprite', function() {
    return gulp.src('svg/dev/*.svg')
        .pipe(svgSprite(svgConfig))
        .pipe(gulp.dest('dist/svg'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('js/**/*.js', ['scripts']);
    gulp.watch('scss/**/*.scss', ['sass']);
    gulp.watch('svg/**/*.svg', ['svgsprite']);
    gulp.watch('img/*', ['imagemin']);
});

// Default Task
gulp.task('default', ['sass', 'scripts', 'imagemin', 'svgsprite', 'watch']);