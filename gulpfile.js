const gulp = require('gulp');
const babel = require('gulp-babel');
const minify = require('gulp-minify');
const concat = require('gulp-concat');

gulp.task('compress', () => {
  return gulp.src('./dist/package-texturizer.js')
    .pipe(minify({
        ext:{
            min:'.min.js'
        }
    }))
    .pipe(gulp.dest('./dist'))
});

gulp.task('compile', () => {
  return gulp.src('./src/**/*.js')
    .pipe(babel({
      presets: ["@babel/env"],
      plugins: [
        "@babel/plugin-transform-arrow-functions",
        ["@babel/plugin-transform-template-literals", {
          loose: true,
          spec: true
        }]
      ]
    }))
    .pipe(concat('package-texturizer.js'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('watch', () => {
  gulp.watch(['./src/**/*'], gulp.series('compile', 'compress'));
});

gulp.task('default', gulp.series('watch'));