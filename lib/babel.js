"use strict";

module.exports = function getBabelConfig(extractBabelPresets, extractBabelPlugins) {
  return {
    presets: [[require.resolve("@babel/preset-env"), {
      targets: {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }], extractBabelPresets],
    plugins: extractBabelPlugins
  };
};