import request from "../utils/request";
import { API_HOST } from "../config";


const fetchUsers = ()=>{
    return request(API_HOST+'/api/v1/users')
}
const fetchUser = id=>{
    return request(API_HOST+`/api/v1/users/${id}`)
}

export {fetchUser, fetchUsers}