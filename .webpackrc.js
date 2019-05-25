var path = require('path')
module.exports={
    "devtool": "source-map",
    "entry": {
        "index": "./src/index.js",
        "common": "./src/vendor.js",
        "admin": "./src/admin.js"
    },
    "commons": [{
        "name": "common",
        "filename": "common.js"
    }],
    "publicPath": "/",
    "proxy": {
        "/api": {
            "target": "http://acm.duxy.me/",
            "changeOrigin": true
        },
        "/uploads": {
            "target": "http://acm.duxy.me/",
            "changeOrigin": true
        }
    },
    "define": {
        "process.env": {},
        "process.env.NODE_ENV": process.env.NODE_ENV,
        "process.env.API_ENV": process.env.API_ENV,
    },
    "extraBabelPlugins": [
      ["import", { "libraryName": "antd", "style": true }],
      "transform-remove-console"
    ],
    alias: {
        Assets: path.resolve('./src/assets'),
        Components: path.resolve('./src/components'),
        Models: path.resolve('./src/models'),
        Services: path.resolve('./src/services'),
        Utils: path.resolve('./src/utils'),
        Testdata: path.resolve('./src/testdata')
    }
}