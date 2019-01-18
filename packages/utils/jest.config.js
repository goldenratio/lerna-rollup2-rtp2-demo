module.exports = {
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$",
  "moduleFileExtensions": [
    "js",
    "jsx",
    "json",
    "node"
  ],
  "moduleNameMapper": {
    "@lerna-demo/(.*)": "<rootDir>/../$1/src"
  }
};
