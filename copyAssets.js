var fs = require('fs-extra');
var FS = require('fs');
var path = require('path');

var STYLEGUIDE_ASSETS = path.resolve(__dirname, 'node_modules/styleguide/lib/modern/assets')
const _DIR = {
  ASSETS: path.resolve(__dirname, 'dist/assets'),
  FONTS: path.resolve(__dirname, 'dist/assets/fonts'),
  ICONS: path.resolve(__dirname, 'dist/assets/icons'),
  IMAGES: path.resolve(__dirname, 'dist/assets/images'),
};

fs.ensureDir(path.resolve(__dirname,'dist'), function(err) {
  if(err) return console.error(err);
  console.log('ENSURING:: /dist');
  fs.ensureDir(_DIR.ASSETS, function (err) {
    if(err) return console.error(err);
    console.log('ENSURING:: '+ _DIR.ASSETS);
    fs.ensureDir(_DIR.FONTS, function(err) {
      if(err) return err;
      walkingDir(path.join(STYLEGUIDE_ASSETS, '/fonts'), function(file, stat) {
        var destinationFile = path.join(_DIR.FONTS, path.basename(file));
        console.log(file, ' ::copy to -->',destinationFile);
        fs.copy(file, destinationFile);
      });
    })
    fs.ensureDir(_DIR.IMAGES, function(err) {
      if(err) return err;
      walkingDir(path.join(STYLEGUIDE_ASSETS, '/images'), function(file, stat) {
        var destinationFile = path.join(_DIR.IMAGES, path.basename(file));
        console.log(file, ' ::copy to -->',destinationFile);
        fs.copy(file, destinationFile);
      });
    })
  })
})
var walkingDir = function (dir, callback) {
  FS.readdir(dir, function (err, filenames) {
    if (err) console.error(err);

    filenames.forEach(function (filename) {
      var filepath = path.join(dir, filename);
      FS.stat(filepath, function (err, stats) {
        if (stats.isDirectory()) {
          walkingDir(filepath, callback);
        } else if(stats.isFile()) {
          callback(filepath, stats);
        }
      })
    });
  });
}