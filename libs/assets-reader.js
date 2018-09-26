const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const log = require('fancy-log');
const projectFolder = process.cwd();
const defaultOptions = require('./assets-options');
const assetsBuildFiles = require('./assets-build-files');

class AssetsReader {
  constructor (options) {
    this._options = _.merge({}, defaultOptions, options);
  }

  get options () {
    return this._options;
  }

  set options (value) {
    this._options = value;
  }

  get projectDependencies () {
    let packageFile = this.options.packageFile || path.join(projectFolder, 'package.json');
    let pkg = require(packageFile);
    return pkg.dependencies;
  }

  getSourceFolderFor (dependency) {
    return path.join(projectFolder, 'node_modules', dependency);
  }

  findDependency (dependency, resource) {
    let sourceFolder = this.getSourceFolderFor(dependency);
    let buildFiles = this.getBuildFilesFor(dependency, resource);

    for (let i in buildFiles) {
      let buildFile = path.join(sourceFolder, buildFiles[i]);
      if (fs.existsSync(buildFile)) return buildFile;
    }

    return null;
  }

  getBuildFilesFor (dependency, ext) {
    return assetsBuildFiles(dependency, ext);
  }

  get sourceFiles () {
    let sourceFilesList = [];
    for (let dependency in this.projectDependencies) {
      let sourceFolder = this.getSourceFolderFor(dependency);

      if (!fs.existsSync(sourceFolder)) {
        log.warn('Dependency not found. Please try run \'npm i \'');
      }

      for (let resource in this.options.resources) {
        let fileFound = this.findDependency(dependency, resource);

        if (fileFound) {
          sourceFilesList.push(fileFound);
        }
      }
    }
    return sourceFilesList;
  }
}

module.exports = AssetsReader;
