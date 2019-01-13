module.exports = {
  "roots": [
    "<rootDir>",
    "<rootDir>/packages"
  ],
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$",
  "moduleFileExtensions": [
    "js",
    "jsx",
    "json",
    "node"
  ],
  "moduleNameMapper": {
    "@lerna-demo/(.*)": "<rootDir>/packages/$1/src"
  }
};
