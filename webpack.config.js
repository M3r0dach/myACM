//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path')
const _ = require('lodash')

module.exports = function (webpackConfig, env) {

  for (let index in webpackConfig.plugins) {
    let plugin = webpackConfig.plugins[index]


    // 增加多页面
    if (plugin.constructor.name == 'HtmlWebpackPlugin') {
      const newPlugin = _.cloneDeep(plugin)
      newPlugin.options.filename = 'admin.html'
      newPlugin.options.chunks = ['common', 'index']
      newPlugin.options.template = 'src/index.ejs'
      webpackConfig.plugins.splice(index, 0, newPlugin)
      break
    }
  }
  return webpackConfig;
}
