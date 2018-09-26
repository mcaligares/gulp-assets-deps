const fs = require('fs');
const _ = require('lodash');
const { expect } = require('code');
const lab = exports.lab = require('lab').script();

const AssetsReader = require('../../libs/assets-reader')
const defaultOptions = require('../../libs/assets-options')

lab.test('default options object', () => {
  expect(new AssetsReader().options).to.equal(defaultOptions);
});

lab.test('property equals to assigned', () => {
  let options = { resources: { js: false } };
  expect(new AssetsReader(options).options.resources.js).to.be.false();
});

lab.test('package file dependencies', () => {
  let options = { packageFile: '/tmp/package.json' };
  let packageJson = { dependencies: { plugin: "1.0.0" } };

  fs.writeSync(fs.openSync(options.packageFile, 'w'), JSON.stringify(packageJson));
  expect(new AssetsReader(options).projectDependencies).to.equal(packageJson.dependencies);
});
