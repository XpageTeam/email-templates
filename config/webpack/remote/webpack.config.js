const path = require("path");

module.exports = (env, argv) => {
	return {
		entry: require("../entry/entry.js"),
		output: {
			path: path.resolve(__dirname, "../../../docs"),
			filename: "js/[name].js",
			publicPath: require("../../../accesses/accesses.js").server.templatePath,
			chunkFilename: 'js/[name].js'
			//.[contenthash]
		},
		devtool: 'source-map',
		module: require("../module/module.js")(argv.mode, "remote"),
		resolve: require("../resolve/resolve.js"),
		optimization: require("../optimization/optimization.js"),
		plugins: require("../plugins/plugins.js")(argv.mode)
	}
}