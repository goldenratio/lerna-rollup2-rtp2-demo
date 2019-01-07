import path from 'path';
import transpile from 'rollup-plugin-buble';
import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import minimist from 'minimist';
import batchPackages from '@lerna/batch-packages';
import filterPackages from '@lerna/filter-packages';
import { getPackages } from '@lerna/project';

/**
 * Get a list of the non-private sorted packages with Lerna v3
 * @see https://github.com/lerna/lerna/issues/1848
 * @return {Promise<Package[]>} List of packages
 */
async function getSortedPackages(scope, ignore)
{
  const packages = await getPackages(__dirname);
  const filtered = filterPackages(
    packages,
    scope,
    ignore,
    false
  );

  return batchPackages(filtered)
    .reduce((arr, batch) => arr.concat(batch), []);
}

async function main()
{
  const plugins = [
    sourcemaps(),
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    transpile(),
  ];

  const compiled = (new Date()).toUTCString().replace(/GMT/g, 'UTC');
  const sourcemap = true;
  const results = [];

  // Support --scope and --ignore globs if passed in via commandline
  const { scope, ignore } = minimist(process.argv.slice(2));
  const packages = await getSortedPackages(scope, ignore);

  packages.forEach((pkg) =>
  {
    // Check for bundle folder
    const external = Object.keys(pkg.dependencies || []);
    const basePath = path.relative(__dirname, pkg.location);
    const input = path.join(basePath, 'src/index.js');
    const { main, module } = pkg.toJSON();
    const freeze = false;

    results.push({
      input,
      output: [
        {
          file: path.join(basePath, main),
          format: 'cjs',
          freeze,
          sourcemap,
        },
        {
          file: path.join(basePath, module),
          format: 'es',
          freeze,
          sourcemap,
        },
      ],
      external,
      plugins,
    });

  });

  return results;
}

export default main();
