var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var watchify = require('gulp-watchify');
var babelify = require('babelify');
var path = require('path');
var del = require('del');

var conf = {
  src: 'source',
  dest: 'build/www'
};

function reload() {
  browserSync.reload({ stream: false });
};

gulp.task('clean', (done) => {
  del([conf.dest + '/*'], () => {done();});
});

var watching = false;
gulp.task('enable-watch-mode', () => {
  watching = true;
});
gulp.task('js', watchify((watchify) => {
  return gulp.src(path.join(conf.src, 'app.js'))
    .pipe(watchify({
      watch: watching,
      debug: watching,
      setup: function(b) {
        b.transform(babelify.configure({
          sourceMap: true,
          sourceMapRelative: __dirname + conf.src
        }));
      }
    }))
    .pipe(gulp.dest(conf.dest));
}));
gulp.task('js-watch', reload);

gulp.task('css', () => {
  return gulp.src(path.join(conf.src, 'css/*.css'))
    .pipe(gulp.dest(path.join(conf.dest, 'css')));
});
gulp.task('css-watch', ['css'], reload);

gulp.task('html', () => {
  return gulp.src(path.join(conf.src, '**/*.html'))
    .pipe(gulp.dest(conf.dest));
});
gulp.task('html-watch', ['html'], reload);

gulp.task('img', () => {
  return gulp.src(path.join(conf.src, 'img/*'))
    .pipe(gulp.dest(path.join(conf.dest, 'img')));
});
gulp.task('img-watch', ['img'], reload);

gulp.task('serve', ['js', 'css', 'html', 'img'], () => {
  browserSync.init({
    server: {
      baseDir: conf.dest
    }
  });

  if(watching) {
    gulp.watch(path.join(conf.dest, "app.js"), ['js-watch']);
    gulp.watch(path.join(conf.src, "css/*.css"), ['css-watch']);
    gulp.watch(path.join(conf.src, "**/*.html"), ['html-watch']);
    gulp.watch(path.join(conf.src, "img/*"), ['img-watch']);
  }
});

gulp.task('default', ['enable-watch-mode', 'serve']);
gulp.task('build', ['clean', 'js', 'css', 'html', 'img']);
