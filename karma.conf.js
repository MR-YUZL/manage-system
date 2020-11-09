var webpackConfig = require('./vue.config.js')

module.exports = function(config) {
  config.set({
    frameworks: ['mocha'],

    files: ['test/**/*.spec.js'],

    preprocessors: {
      '**/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack: webpackConfig,

    reporters: ['spec'],

    browsers: ['Chrome']
  })
}