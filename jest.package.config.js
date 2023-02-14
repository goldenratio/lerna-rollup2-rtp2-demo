module.exports = {
  'transform': {
    '^.+\\.tsx?$': 'ts-jest'
  },
  'testEnvironment': 'jsdom',
  'moduleNameMapper': {
    '@lerna-demo/(.*)': '<rootDir>/../../packages/$1/src'
  }
};
