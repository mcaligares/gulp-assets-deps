const fs = require('fs');
const _ = require('lodash');
const path = require('path');
const sinon = require('sinon');
const { expect } = require('code');
const lab = exports.lab = require('lab').script();

const AssetsReader = require('../../libs/assets-reader')
const defaultOptions = require('../../libs/assets-options')

lab.experiment('assets reader tests', () => {

  lab.test('default options object', () => {
    expect(new AssetsReader().options).to.equal(defaultOptions);
  });

  lab.test('property equals to assigned', () => {
    let options = { resources: { js: false } };
    expect(new AssetsReader(options).options.resources.js).to.be.false();
  });

  lab.test('setting options', () => {
    let reader = new AssetsReader()
    expect(reader.options.packageFile).to.equal(defaultOptions.packageFile);

    reader.options = { packageFile: 'pkg.json' }
    expect(reader.options.packageFile).to.equal('pkg.json');
  });

  lab.test('package file dependencies', () => {
    let options = { packageFile: '/tmp/package.json' };
    let packageJson = { dependencies: { plugin: "1.0.0" } };

    fs.writeSync(fs.openSync(options.packageFile, 'w'), JSON.stringify(packageJson));
    expect(new AssetsReader(options).projectDependencies).to.equal(packageJson.dependencies);
  });

  lab.test('package file dependencies not found', () => {
    let packageFile = '/tmp/package.json';
    let options = { packageFile: packageFile };
    fs.unlinkSync(packageFile)

    expect(new AssetsReader(options).projectDependencies).to.be.null;
  });

  lab.test('source folder for dependecy', () => {
    let dependencyFolder = path.join(process.cwd(), 'node_modules', 'plugin');

    expect(new AssetsReader().getSourceFolderFor('plugin')).to.equal(dependencyFolder);
  });

  lab.test('find dependency file', () => {
    let reader = new AssetsReader();
    let dependency = path.join('/tmp', 'plugin.js');

    fs.writeSync(fs.openSync(dependency, 'w'), 'example');
    sinon.stub(reader, 'getSourceFolderFor').returns('/tmp');
    sinon.stub(reader, 'getBuildFilesFor').returns(['plugin.js']);
    expect(reader.findDependency('plugin', 'js')).to.equal(dependency);
  })

  lab.test('find not exists dependency file', () => {
    expect(new AssetsReader().findDependency('plugin', 'js')).to.be.null;
  })

});
