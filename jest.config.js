/** @type {import('jest').Config} */

const config = {
  verbose: true,
  transform: {
    "^.+\\.jsx?$": "esbuild-jest"
  }
};

module.exports = config;
