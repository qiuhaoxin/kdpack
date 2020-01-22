module.exports = function registerBabel(opts = {}) {
    const { babelPresets, babelPlugins, only, ignore } = opts;
    if (process.env.NODE_ENV !== 'test') {
        console.log("baelPlugins i s", JSON.stringify(babelPlugins));
        require("@babel/register")({
            presets: babelPresets,
            plugins: babelPlugins || [],
            only,
            ignore,
            cache: false,
            extensions: ['.js', '.jsx', '.json', '.ts', '.tsx', '.es6', '.es'],
            babelrc: false,
        })
    }
}