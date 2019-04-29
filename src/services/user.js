import request from "../utils/request";
import { API_HOST } from "../config";
import { toFormData } from "../utils/qs";


const fetchUsers = ()=>{
    return request(API_HOST+'/api/v1/users')
}

const fetchUser = id=>{
    return request(API_HOST+`/api/v1/users/${id}`)
}

const updateUser = (id, params)=>{
  return request(`${API_HOST}/api/v1/users/${id}`, {
    method: 'POST', body: toFormData(params),
  });
}

export {fetchUser, fetchUsers, updateUser}