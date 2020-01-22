"use strict";

module.exports = function registerBabel() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var babelPresets = opts.babelPresets,
      babelPlugins = opts.babelPlugins,
      only = opts.only,
      ignore = opts.ignore;

  if (process.env.NODE_ENV !== 'test') {
    console.log("baelPlugins i s", JSON.stringify(babelPlugins));

    require("@babel/register")({
      presets: babelPresets,
      plugins: babelPlugins || [],
      only: only,
      ignore: ignore,
      cache: false,
      extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.es6', '.es'],
      babelrc: false
    });
  }
};