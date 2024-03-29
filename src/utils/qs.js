
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
    const {current_page=1, per=15, search='', sort_field='id', sort_order='ascend'} = query
    const filters = JSON.parse(query.filters||'{}')
    return {current_page: parseInt(current_page, 10), search, sort_field, sort_order, filters, per}
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