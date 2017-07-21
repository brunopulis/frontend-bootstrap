var gulp     	 = require('gulp'),
	sass     	 = require('gulp-ruby-sass') ,
	sassGlob 	 = require('gulp-sass-glob'),
    spritesmith  = require('gulp.spritesmith'),
	cssnano      = require('gulp-cssnano'),
	jshint       = require('gulp-jshint'),
    uglify       = require('gulp-uglify'),
	autoprefixer = require('gulp-autoprefixer'),
    notify   	 = require('gulp-notify') ,
    imagemin     = require('gulp-imagemin'),
    rename       = require('gulp-rename'),
    concat       = require('gulp-concat'),
    notify       = require('gulp-notify'),
    cache        = require('gulp-cache');

var path         = require('path');


gulp.task('sass', function() { 
    return sass('assets/sass/app.scss', { style: 'compressed' }) 
    	.pipe(autoprefixer('last 2 version'))
         .pipe(gulp.dest('./assets/css'))
		.pipe(rename({ suffix: '.min' }))
		.pipe(cssnano())
		.pipe(gulp.dest('./assets/css'))
		.pipe(notify({ message: 'Styles task complete' }));
});


// Scripts
// gulp.task('scripts', function() {
//   return gulp.src('assets/js/**/*.js')
//     .pipe(jshint('.jshintrc'))
//     .pipe(jshint.reporter('default'))
//     .pipe(gulp.dest('assets/js'))
//     .pipe(rename({ suffix: '.min' }))
//     .pipe(concat('main.min.js'))
//     .pipe(uglify())
//     .pipe(gulp.dest('assets/js'))
//     .pipe(notify({ message: 'Scripts task complete' }));
// });

// Images
gulp.task('images', function() {
  return gulp.src('assets/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('assets/images'))
    .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('sprite', function () {
    var spriteData = gulp.src('assets/images/sprites/*.png')
        .pipe(spritesmith({
            /* this whole image path is used in css background declarations */
            imgName: '../img/sprite.png',
            cssName: 'sprite.css'
        }));
    spriteData.img.pipe(gulp.dest('assets/images/'));
    spriteData.css.pipe(gulp.dest('assets/css/'));
});


 gulp.task('watch', function() {
     gulp.watch('assets/sass' + '/**/*.scss', ['sass']); 
 	//gulp.watch('assets/js/**/*.js', ['scripts']);
    gulp.watch(['img/sprites/**/*.png'], ['sprite']);
	gulp.watch('assets/images/**/*.{jpg,png,gif}', ['images']);
});

  gulp.task('default', ['sass']);
