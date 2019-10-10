/// <reference types="cypress" />

//const wp = require('@cypress/webpack-preprocessor')

const webpackOptions = {
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: [/node_modules/],
      use: [{
        loader: 'awesome-typescript-loader?configFileName=cypress/tsconfig.json'
      }]
    }]
  }
}

const options = {
  webpackOptions
}

module.exports = (on) => {
  // on('file:preprocessor', wp(options))

  // on('uncaught:exception', (err, runnable) => {
  //   console.log(err);
  //   return err.message.indexOf('Cannot set property \'aborted\' of undefined') === -1
 // });
};
