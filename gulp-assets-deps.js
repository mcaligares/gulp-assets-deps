const gulp = require('gulp');

const assets = {};

const AssetsReader = require('./libs/assets-reader');
const AssetsWritter = require('./libs/assets-writter');

assets.read = function (options) {
  let assetsReader = new AssetsReader(options);
  return gulp.src(assetsReader.sourceFiles);
}

assets.copy = function (options) {
  let assetsWritter = new AssetsWritter(options);
  return assetsWritter.transform();
}

module.exports = assets;
