/*
********************************************
 Copyright © 2021 Agora Lab, Inc., all rights reserved.
 AppBuilder and all associated components, source code, APIs, services, and documentation 
 (the “Materials”) are owned by Agora Lab, Inc. and its licensors. The Materials may not be 
 accessed, used, modified, or distributed for any purpose without a license from Agora Lab, Inc.  
 Use without a license or in violation of any license terms and conditions (including use for 
 any purpose competitive to Agora Lab, Inc.’s business) is strictly prohibited. For more 
 information visit https://appbuilder.agora.io. 
*********************************************
*/
const {series, parallel} = require('gulp');
const {spawn} = require('child_process');
const fs = require('fs').promises;
const path = require('path');
const del = require('del');
const args = require('yargs').argv;

const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.renderer.config');

const log = (x) => console.log(x);
const BUILD_PATH = path.join(__dirname, '.electron');

const runCli = (cmd, cb) => {
  const [arg1, ...arg2] = cmd.split(' ');
  const proc = spawn(arg1, arg2, {
    stdio: 'inherit',
    shell: true,
  });
  proc.on('exit', cb);
};

function clean() {
  return del([`${BUILD_PATH}/**/*`]);
}

function renderer(cb) {
  runCli('webpack --config webpack.renderer.config.js', cb);
}

function main(cb) {
  runCli('webpack --config ./webpack.main.config.js', cb);
}

async function packageJson(cb) {
  let package = JSON.parse(
    await fs.readFile(path.join(__dirname, 'package.json')),
  );
  let {
    name,
    version,
    private,
    author,
    description,
    dependencies,
    optionalDependencies,
  } = package;
  let nativeDeps = require('./nativeDeps').default;
  let natives = {};
  let searchDeps = {
    ...dependencies,
    ...optionalDependencies,
  };
  nativeDeps.map((k) => {
    natives[k] = searchDeps[k];
  });

  let newPackage = {
    name,
    version,
    private,
    author,
    description,
    // dependencies: natives,
    // agora_electron: {
    //   electron_version: '5.0.8',
    //   prebuilt: true,
    // },
  };
  await fs.writeFile(
    path.join(BUILD_PATH, 'package.json'),
    JSON.stringify(newPackage, null, 2),
  );
  return;
}

function build(cb) {
  runCli('electron-builder build --config ./electron-builder.js', cb);
}

function electronDevServer(cb) {
  const config = webpack(webpackConfig);
  new WebpackDevServer(config, {
    hot: true,
  }).listen(webpackConfig.devServer.port, 'localhost', (err) => {
    if (err) {
      console.error(err);
    } else {
      cb();
    }
  });
}

function directory(){
  return fs.mkdir(BUILD_PATH, {recursive: true});
}

function mainDev(cb) {
  runCli('webpack --config ./webpack.main.config.js', cb);
}

function start(cb) {
  runCli('electron .', cb);
}

module.exports.build = series(
  clean,
  directory,
  parallel(renderer, main, packageJson),
  build,
);

module.exports.development = series(clean, directory , electronDevServer, mainDev, start);
