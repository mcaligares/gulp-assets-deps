const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const log = require('fancy-log');
const assetsBuildFiles = require('./assets-build-files');

const projectFolder = process.cwd();
const pkg = require(path.join(projectFolder, 'package.json'));

const assetsReader = function(options) {
  let sourceFilesList = [];

  for (dependency in pkg.dependencies) {
    let sourceFolder = _getSourceFolderFor(dependency);

    if (!fs.existsSync(sourceFolder)) {
      log.warn('Dependency not found. Please try run \'npm i \'');
    }

    let fileFound = _findDependency(dependency);

    if (fileFound) {
      sourceFilesList.push(fileFound);
    }
  }

  return gulp.src(sourceFilesList);
};

const _getSourceFolderFor = function(dependency) {
  return path.join(projectFolder, 'node_modules', dependency);
};

const _findDependency = function(dependency) {
  let sourceFolder = _getSourceFolderFor(dependency);
  let buildFiles = _getBuildFilesFor(dependency, 'js');

  for (i in buildFiles) {
    let buildFile = path.join(sourceFolder, buildFiles[i]);
    if (fs.existsSync(buildFile)) return buildFile;
  }

  return null;
}

const _getBuildFilesFor = function(dependency, ext) {
  return assetsBuildFiles(dependency, ext);
}

module.exports = assetsReader;
