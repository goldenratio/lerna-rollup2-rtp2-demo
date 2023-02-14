import path from 'path';
import minimist from 'minimist';

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import typescript from 'rollup-plugin-typescript2';

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
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    typescript({
      tsconfigOverride: {
        'exclude': [
          'packages/*/lib/*',
          'packages/*/sandbox/*',
          'packages/*/sandbox-*/*',
          'output/*',
          'preview/*'
        ]
      },
      // transpileOnly
      check: false
    }),
    commonjs(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
      preventAssignment: true
    })
  ];

  const results = [];

  // Support --scope and --ignore globs if passed in via commandline
  const { scope, ignore } = minimist(process.argv.slice(2));
  const packages = await getSortedPackages(scope, ignore);

  packages.forEach((pkg) =>
  {
    // Check for bundle folder
    const external = Object.keys(pkg.dependencies || []);
    const basePath = path.relative(__dirname, pkg.location);
    const input = path.join(basePath, 'src/index.ts');
    const { main, module } = pkg.toJSON();
    const freeze = false;

    results.push({
      input,
      output: [
        {
          file: path.join(basePath, main),
          format: 'cjs',
          freeze,
          sourcemap: true,
        },
        {
          file: path.join(basePath, module),
          format: 'esm',
          freeze,
          sourcemap: true,
        },
      ],
      external,
      plugins,
    });

  });

  return results;
}

export default main();
