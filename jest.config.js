module.exports = {
  'projects': [
    '<rootDir>',
    '<rootDir>/packages/*'
  ],
  'testPathIgnorePatterns': [
    '/node_modules/',
    'dist',
    'output',
    'docs',
    'coverage',
    'tools',
    'typings'
  ],
  'transform': {
    '^.+\\.tsx?$': 'ts-jest'
  },
  'testRegex': '(/tests/.*|\\.(test|spec))\\.tsx?$',
  'testEnvironment': 'jsdom',
  'moduleFileExtensions': [
    'ts',
    'tsx',
    'js',
    'jsx',
    'json',
    'node'
  ],
  'moduleNameMapper': {
    '@lerna-demo/(.*)': '<rootDir>/packages/$1/src'
  },
  'collectCoverage': false
};
