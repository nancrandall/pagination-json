var path = require('path');
// get package.json as js object
var packageJson = require('./package.json');
var fs = require('fs');
var webpack = require('webpack');
var WebpackShellPlugin = require('webpack-shell-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
// Library Var name (no white space)
const patternName = 'pagination-pattern'; 
// write version.json file to app dir
fs.writeFileSync('./src/version.json', JSON.stringify(packageJson.version));
// write version to version sass file
var patternVersion = fs.createWriteStream('./src/styles/version-number.scss');
patternVersion.once('open', function(e) {
  patternVersion.write('.pl-');
  patternVersion.write(patternName);
  patternVersion.write('-version:before { content: ');
  patternVersion.write( JSON.stringify(packageJson.version));
  patternVersion.write('};');
  patternVersion.end();
});
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    "main": "./main.js"
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "[name].js",
    library: patternName,
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
      //Font loader
      test: /\.(woff|woff2|ttf|eot)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
     },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    historyApiFallback: true,
    noInfo: true,
    hot: false
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: []
}
if (process.env.NODE_ENV === 'development') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new CopyWebpackPlugin([
      { from: '**/*.html', to: path.join(__dirname, 'dist') },
      { from: '**/version.json', to: path.join(__dirname, 'dist') }
    ]),
    new WebpackShellPlugin({ onBuildStart: ['echo starting in development...'], onBuildEnd: ['npm run sass-watch'] })
  ])
}
if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
	  include: /\.min\.js$/,
      minimize: true,
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new CopyWebpackPlugin([
      { from: '**/*.html', to: path.join(__dirname, 'dist') },
      { from: '**/version.json', to: path.join(__dirname, 'dist') }      
    ]),
    new WebpackShellPlugin({ onBuildStart: ['npm run copy-assets'], onBuildEnd: ['npm run sass'] })
  ])
}
