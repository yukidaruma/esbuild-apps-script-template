const { build: runBuild } = require('esbuild');
const dotenv = require('dotenv');
const { parsed: loadedEnvs } = dotenv.config();

const ENTRYPOINT_FUNC_NAME = 'myFunction';

/** @type {string[]} */
const options = process.argv.slice(2);

const debug = options.includes('--debug');
const noMinify = options.includes('--no-minify');
const watch = options.includes('--watch');

console.log('Running esbuild with following options:');
console.table({
  debug,
  noMinify,
  watch,
});

/** @type {import('esbuild').BuildOptions} */
const buildOptions = {
  entryPoints: ['./src/main.ts'],
  bundle: true,
  target: 'es2015', // Lowers target to support ESNext syntax

  banner: { js: `function ${ENTRYPOINT_FUNC_NAME}() {` },
  footer: { js: '}' },

  define: {
    DEBUG: debug,

    // Replace `process.env.FOO` with variables written in `.env` file
    ...Object.fromEntries(
      Object.entries(loadedEnvs ?? {}).map(([key, value]) => [
        `process.env.${key}`,
        JSON.stringify(value),
      ]),
    ),
  },
  outfile: './build/main.js',
  watch: watch,
  minify: !noMinify,
  minifyIdentifiers: false,
  logLevel: 'info',
};

runBuild(buildOptions).catch((error) => {
  console.error(error);
  process.exit(1);
});
