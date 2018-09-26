const gulp = require('gulp');
const assets = require('../../gulp-assets-deps.js');

gulp.task('default', function() {
  return assets.read(
    {
      resources: {
        js: true,
        css: true,
        fonts: true
      }
    }
  ).pipe(assets.copy());
});
