const configFiles = [
  'config/logger.config.js',
];
const controllersFiles = [
  'src/controllers/*.js',
  '!src/controllers/__tests__/*.test.js',
];
const middlewareFiles = [
  'src/middleware/*.js',
  '!src/middleware/__tests__/*.test.js',
];
const miscFiles = [
  'logs/*',
  'src/logger.js',
];
const routesFiles = [
  'src/routes/*.js',
  '!src/routes/__tests__/*.test.js',
];

const controllersTests = [
  'src/controllers/__tests__/*.test.js',
];
const middlewareTests = [
  'src/middleware/__tests__/*.test.js',
];
const routesTests = [
  'src/routes/__tests__/*.test.js',
];

module.exports = () => ({
  files: []
    .concat(configFiles)
    .concat(controllersFiles)
    .concat(middlewareFiles)
    .concat(miscFiles)
    .concat(routesFiles),
  tests: []
    .concat(controllersTests)
    .concat(middlewareTests)
    .concat(routesTests),

  testFramework: 'jest',

  env: {
    type: 'node',
    runner: 'node',
  },
});
