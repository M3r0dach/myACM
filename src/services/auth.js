import request from "../utils/request";
import { saveObject, takeObject, remove } from "../utils/persistence";
import { API_HOST } from "../config";
const token_key = 'UserToken'
export function saveToken(params) {
    console.log('saveToken')
    console.log(params)
    saveObject(token_key, {
        token: params.token,
        expired_time: Date.now()+params.expired_time*100
    })
}
export function getToken() {
    console.log('token get:')
    const tokenObject = takeObject(token_key)
    console.log(tokenObject)
    return tokenObject&&tokenObject.token
}
export function removeToken(key) {
    remove(token_key)
}

const fetchToken = ()=>{
    console.log('fetch Token')
    var api = '/api/v1/auth/token?nickname=admin&&password=123456'
    return request(API_HOST+api)
}
export {fetchToken}