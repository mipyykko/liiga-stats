module.exports = function(config) {
  config.set({
    mutator: 'javascript',
    mutate: [
      'src/services/**/*.js'
    ],
    packageManager: 'npm',
    reporters: ['html', 'clear-text', 'progress'],
    testRunner: 'mocha',
    transpilers: ['babel'],
    testFramework: 'mocha',
    coverageAnalysis: 'off',
    babel: {
      optionsFile: '.babelrc'
    },
    mochaOptions: {
      spec: ['test/**/*.test.js'],
      require: [ '@babel/register', '@babel/polyfill']
    }
  })
}
