    //variables for requiring packages
const   gulp = require('gulp'),
        uglify = require('gulp-uglify'),
        rename = require('gulp-rename'),
        browserSync = require('browser-sync').create(),
        lintCheck = require('gulp-eslint'),
        sass = require('gulp-sass'),
        autoprefixer = require('gulp-autoprefixer'),
        prettyError = require('gulp-prettyerror'),
        babel = require('gulp-babel'),
        cssnano = require('gulp-cssnano');

const   input = './js/bundle.js',
        output = './js';

gulp.task('babel', function() {
    return gulp.src(input)
        .pipe(babel())
        .pipe(gulp.dest(output));
});
    //lint task
gulp.task('lint', function(){
  return gulp.src(['./js/*.js'])
    .pipe(lintCheck())
    .pipe(lintCheck.format())
    .pipe(lintCheck.failAfterError())
});

    //sass task
gulp.task('sass', function() {
    gulp.src('./styles/sass/style.scss')
        .pipe(prettyError())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions']
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(cssnano())
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./build/css'));
});

    //gulp scripts
gulp.task( 'scripts', ['lint'], function(){
  //copy all javascript files into a minimized .js file
  gulp.src('./js/*.js')  // grabs from source folder/js folder/ all files ending in .js
    .pipe(babel( {
        presets: ['es2015']
    }))
    .pipe(uglify()) // call the uglify function to the files
    .pipe(rename({
        extname: '.min.js'
    })) // rename the uglified (minimal-ized) files
    .pipe(gulp.dest('./build/js'));
});

    //gulp says hello to the world
gulp.task('hi', function(){
  console.log('Hello world!')
});

    //gulp watching javascript files in javascript folder
gulp.task('watch', function(){
  gulp.watch('./js/*.js', ['scripts'])
  gulp.watch('./js/*.js', ['babel'])
  gulp.watch('./styles/sass/*.scss', ['sass']);
});

    //synchronize save with reloading browser
gulp.task('browser-sync', function() {
  browserSync.init ({
    server: {
      baseDir: './'
    }
  });
  //gulp.watch('./*html').on('change', browserSync.reload);
  gulp.watch(['build/js/*.js','build/css/*.min.css', 'index.html']).on('change', browserSync.reload);  //watches the build folder for changes to js because, when done, the browser will read minimal-ized files, not your pretty-looking .js file
  //gulp.watch('./styles/*.css').on('change', browserSync.reload);
});

    //run tasks with default function (typing 'gulp' into terminal)
gulp.task('default', ['watch', 'browser-sync']);