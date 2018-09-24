const fs = require('fs');
const path = require('path');
const stream = require('stream');

const assetsWritter = function(options) {

  let distFolder = path.resolve('vendor');

  if (!fs.existsSync(distFolder))
    fs.mkdirSync(distFolder);

  let _stream = new stream.Transform({objectMode: true});

  _stream._transform = function (originalFile, unused, callback) {
    let sourceFile = originalFile.path;
    let filename = path.basename(sourceFile)
    let distFile = path.join(distFolder, filename);

    fs.createReadStream(sourceFile)
        .pipe(fs.createWriteStream(distFile))

    callback(null, distFile);
  };

  return _stream;
};

module.exports = assetsWritter;
