/**
 * copies `lib` files to `output` folder
 */

const path = require('path');

const fs = require('fs-extra');
const copyDir = require('copy-dir');

const { listSubDirs } = require('./utils');

const projectRoot = path.resolve(process.cwd());

const typesFolder = path.resolve(projectRoot, 'output', 'types');
const typesSubFolders = listSubDirs(typesFolder);
const fromDir = path.join('output', 'types');
organizeFolder(typesSubFolders);

copyToLib(typesSubFolders, fromDir, 'dts');

fs.removeSync(path.resolve(projectRoot, 'output'));

/**
 * @param {string} dirList
 */
function organizeFolder(dirList) {
  dirList.forEach(pkg => {
    const srcPath = path.join(pkg, 'src');
    if (fs.pathExistsSync(srcPath)) {
      copyDir.sync(srcPath, pkg, { filter: () => true });
      fs.removeSync(srcPath);
    }
  });
}

/**
 * @param {ReadonlyArray<string>} dirList
 * @param {string} fromDir
 * @param {string} libDestFolder
 */
function copyToLib(dirList, fromDir, libDestFolder) {
  dirList.forEach(pkg => {
    // copy from `output` to `package/*`
    const destFolder = path.join(pkg.replace(fromDir, 'packages'), 'lib', libDestFolder);
    fs.ensureDirSync(destFolder);
    copyDir.sync(pkg, destFolder, { filter: () => true });
  });
}
