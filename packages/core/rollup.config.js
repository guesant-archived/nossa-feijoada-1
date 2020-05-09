import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import banner from 'rollup-plugin-banner';

import pkg from './package.json';

const currentYear = new Date().getUTCFullYear();
const getBanner = () => {
  const copyStartDate = '2020';
  const copyEndDate =
    currentYear !== parseInt(copyStartDate) ? '- present, ' : '';

  const banner = [];
  banner.push(`${pkg.name} v${pkg.version}`);
  banner.push(
    ['(C)', copyStartDate, copyEndDate, pkg.author].filter(Boolean).join(' '),
  );
  banner.push(`${pkg.license} (SEE LICENSE)`);
  banner.push(pkg.homepage);
  return banner.filter(Boolean).join('\n');
};

const config = [
  {
    input: 'src/index.js',
    output: [
      {
        file: 'dist/build.cjs.js',
        format: 'cjs',
      },
      {
        file: 'dist/build.esm.js',
        format: 'esm',
      },
      {
        file: 'dist/build.mjs',
        format: 'esm',
      },
    ],
    plugins: [
      banner(getBanner()),
      resolve(),
      commonjs(),
      json(),
      babel({ babelHelpers: 'bundled' }),
    ],
    external: ['fabric'],
  },
];

export default config;
