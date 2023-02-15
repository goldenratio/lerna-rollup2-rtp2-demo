const path = require('path');

const fs = require('fs-extra');

/**
 * @param {string} dirName
 * @return {Array<string>}
 */
function listSubDirs(dirName) {
  const files = fs.readdirSync(dirName);
  const dirList = [];
  files.forEach((file) => {
    const fullFilePath = dirName + path.sep + file;
    if (fs.statSync(fullFilePath).isDirectory()) {
      dirList.push(fullFilePath);
    }
  });
  return dirList;
}

/**
 * @param {string} source
 * @param {string} searchValue
 * @param {string} replacementValue
 * @param {number} [startCharAt=0]
 * @return {string}
 */
function replaceAll(source, searchValue, replacementValue, startCharAt = 0) {
  const firstPart = source.substr(0, startCharAt);
  const secondPart = source.substr(startCharAt, source.length);
  const replacedPart = secondPart.split(searchValue).join(replacementValue);

  return `${firstPart}${replacedPart}`;
}

/**
 * @param {boolean} value
 * @param {string} assertion
 */
function assertTrue(value, assertion) {
  const valid = typeof value === 'boolean' && value === true;
  if (!valid) {
    throw new Error(assertion);
  }
}

/**
 * @param {string} dirPath
 * @return {boolean}
 */
function dirExits(dirPath) {
  try {
    const dir = fs.statSync(dirPath);
    return dir.isDirectory();
  } catch (e) {
    // empty
  }
  return false;
}

/**
 * https://gist.github.com/kethinov/6658166
 * @param {string} dirName
 * @return {Array<string>}
 */
function listFilesRecursively(dirName) {
  if (!dirExits(dirName)) {
    return [];
  }
  // List all files in a directory in Node.js recursively in a synchronous fashion
  const walkSync = function(dir, filelist) {
    const files = fs.readdirSync(dir);
    // eslint-disable-next-line no-param-reassign
    filelist = filelist || [];
    files.forEach((file) => {
      const fullFilePath = path.join(dir, file);
      if (fs.statSync(fullFilePath).isDirectory()) {
        // eslint-disable-next-line no-param-reassign
        filelist = walkSync(fullFilePath, filelist);
      } else {
        filelist.push(fullFilePath);
      }
    });
    return filelist;
  };

  return walkSync(dirName, []);
}

module.exports = {
  listSubDirs,
  replaceAll,
  assertTrue,
  listFilesRecursively,
  dirExits
};
