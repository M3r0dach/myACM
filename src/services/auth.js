import request from "../utils/request";
import { saveObject, takeObject, remove } from "../utils/persistence";
import { API_HOST } from "../config";
import { withParams } from "../utils/qs";
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
    //return 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE1NTc1NDY3OTJ9.orrxoapnzQOChlO6lObaJ1u3-XF07xl6hx978u3WfGY'
    return tokenObject&&tokenObject.token
}
export function removeToken(key) {
    remove(token_key)
}

const fetchToken = (nickname, password)=>{
    console.log('fetch Token')
    var api = '/api/v1/auth/token'
    return request(withParams(API_HOST+api, {nickname, password}))
}
export {fetchToken}