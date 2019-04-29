
function type(x) {
    return toString.call(x)
}

const isArray = e=>(type(e)==='[object Array]')
const isObject = e=>(type(e)==='[object Object]')
const esc = encodeURIComponent

function encodeParams(params, prefix='') {
    if(!isArray(params)&&!isObject(params)) {
        return `${esc(prefix)}=${esc(params)}`
    }
    let seps  = []
    const inArray = isArray(params)

    Object.keys(params).forEach( k=>{
        const key = k.trim()
        const value = params[key]
        if(key!==''&&value!=='') {
            let nextKey
            if(inArray) {
                nextKey = prefix+'[]'
            }else {
                nextKey = prefix?`${prefix}[${key}]`:key
            }
            seps.push(encodeParams(value, nextKey))
        }
    })
    return seps.join('&')
}

function withParams(url, params) {
    const query = encodeParams(params)
    let ret=url
    if(query.length>0) {
        ret+='?'+query
    }
    return ret;
}

function extractParams(query) {
    console.log('query')
    console.log(query)
    const {page=1, search='', sortField='id', sortOrder='ascend'} = query
    const filters = JSON.parse(query.filters||'{}')
    return {page: parseInt(page, 10), search, sortField, sortOrder, filters}
}

//构造post表单数据
function toFormData(params) {
    const data = new FormData();
    Object.keys(params).forEach(key=>{
        if(params[key]!=null) {
            data.append(key, params[key])
        }
    })
    return data
}

export {encodeParams, withParams, extractParams, toFormData}