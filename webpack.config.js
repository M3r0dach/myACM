//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (config, { webpack }) => {
  console.log()
  //config.plugins.push(new BundleAnalyzerPlugin())
  config.plugins.push(new InterpolateHtmlPlugin(HtmlWebpackPlugin,{
    "PUBLIC_URL": '/'
  }))
  return config
}