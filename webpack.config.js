var path = require('path')
module.exports = (webpackConfig, env)=>{
        webpackConfig.output.publicPath = '/frontend/'
        webpackConfig.resolve.alias = {
                Assets: path.resolve('./src/assets'),
                Components: path.resolve('./src/components'),
                Models: path.resolve('./src/models'),
                Services: path.resolve('./src/services'),
                Utils: path.resolve('./src/utils'),
                Testdata: path.resolve('./src/testdata')
            }
        return webpackConfig
    }
