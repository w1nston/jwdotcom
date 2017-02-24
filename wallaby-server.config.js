const configFiles = [
  'config/logger.config.js',
];
const miscFiles = [
  'logs/*',
  'src/logger.js',
];

module.exports = () => ({
  files: []
    .concat(configFiles)
    .concat(miscFiles),

  tests: [], // TODO: Tests...

  testFramework: 'jest',

  env: {
    type: 'node',
    runner: 'node',
  },
});
