var path = require('path')
var fs = require('fs')
const mock = {}
fs.readdirSync('./mock').forEach(
    file=>{
        Object.assign(mock, require('./mock/'+file))
    }
)
console.log(mock)
module.exports=mock

