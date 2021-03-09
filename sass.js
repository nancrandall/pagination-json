var fs = require('fs');
var path = require('path');
var sass = require('node-sass');
var bourbon = require('node-bourbon');
var neat = require('node-neat');

var _PATH = {
  ROOT: path.resolve(__dirname, './'),
  SCSS: path.resolve('./', 'src/styles/main.scss'),
  STATIC_DIR: path.resolve(__dirname, 'static'),
  DIST_DIR: path.resolve(__dirname, 'dist'),
  CSSFILE: path.join(__dirname, 'dist', 'pagination-pattern.css')
}
sass.render({
  file: _PATH.SCSS,
  includePaths: ['node_modules'].concat(bourbon.includePaths, neat.includePaths),
  outFile: _PATH.ROOT
},
function (err, result) {
  if (err) console.error(err);
  console.log(_PATH.SCSS, ' => ');
  fs.writeFile(_PATH.CSSFILE, result.css, function (err, data) { //result.css is weird
    if (err) {
      return console.error(err);
    }
    console.info('writing to file:::: ', _PATH.CSSFILE);
  });
});

// OR
// var result = sass.renderSync({
//   data: scss_content[, options..]
// });
