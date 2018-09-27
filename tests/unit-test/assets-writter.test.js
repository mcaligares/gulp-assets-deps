const fs = require('fs');
const _ = require('lodash');
const { expect } = require('code');
const lab = exports.lab = require('lab').script();

const AssetsWritter = require('../../libs/assets-writter')
const defaultOptions = require('../../libs/assets-options')

lab.experiment('assets writter test', () => {

  lab.test('default options object', () => {
    expect(new AssetsWritter().options).to.equal(defaultOptions);
  });

  lab.test('setting options', () => {
    let writter = new AssetsWritter()
    expect(writter.options.destFolder).to.equal(defaultOptions.destFolder);

    writter.options = { destFolder: 'libs' }
    expect(writter.options.destFolder).to.equal('libs');
  });

  lab.test('property equals to assigned', () => {
    let options = { destFolder: 'libs' };
    expect(new AssetsWritter(options).options.destFolder).to.equal('libs')
  });

  lab.test('build dest file path', () => {
    let filename = 'plugin.js';
    let options = { destFolder: 'libs' };
    let filepath = `${process.cwd()}/libs/${filename}`
    expect(new AssetsWritter(options).buildDestFilePath(filename)).to.equal(filepath);
  });

  lab.test('getting dest folder', () => {
    let destFolder = `${process.cwd()}/dest`
    expect(fs.existsSync(destFolder)).to.be.false();

    let writter = new AssetsWritter({ destFolder: destFolder });
    expect(writter.destFolder).to.equal(destFolder);
    expect(fs.existsSync(destFolder)).to.be.true();
    fs.rmdirSync(destFolder)
  });

  lab.test('copy resource from src to dest', () => {
    let src = '/tmp/src.js', dest = '/tmp/dest.js';
    fs.unlinkSync(dest)
    fs.writeSync(fs.openSync(src, 'w'), 'example');

    new AssetsWritter().copyResource(src, dest);

    expect(fs.existsSync(src)).to.be.true();
    expect(fs.existsSync(dest)).to.be.true();
  });

})
