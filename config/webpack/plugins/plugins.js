const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = mode => ([

].concat(mode == "development" ? new BundleAnalyzerPlugin() : []))