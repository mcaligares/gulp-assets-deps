const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const stream = require('stream');
const defaultOptions = require('./assets-options');

class AssetsWritter {
  constructor (options) {
    this._options = _.merge({}, defaultOptions, options);
  }

  get options () {
    return this._options;
  }

  set options (value) {
    this._options = value;
  }

  transform () {
    let _this = this;
    let _stream = new stream.Transform({objectMode: true});
    _stream._transform = function (sourceFile, unused, callback) {
      let destFile = _this.buildDestFilePath(sourceFile.path);
      _this.copyResource(sourceFile.path, destFile)
      callback(null, destFile);
    };

    return _stream;
  }

  buildDestFilePath (sourceFileName) {
    let destFolder = this.destFolder;
    return path.join(destFolder, path.basename(sourceFileName));
  }

  get destFolder () {
    let destFolder = path.resolve(this.options.destFolder)
    if (!fs.existsSync(destFolder)) fs.mkdirSync(destFolder);
    return destFolder;
  }

  copyResource (src, dest) {
    fs.createReadStream(src).pipe(fs.createWriteStream(dest))
  }
}

module.exports = AssetsWritter;
