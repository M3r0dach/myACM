var path = require('path')
module.exports = {
    alias: {
        Assets: path.resolve('./src/assets'),
        Components: path.resolve('./src/components'),
        Models: path.resolve('./src/models'),
        Services: path.resolve('./src/services'),
        Utils: path.resolve('./src/utils'),
        Testdata: path.resolve('./src/testdata')
    }
}
