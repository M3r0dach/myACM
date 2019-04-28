import request from "../utils/request";
import { API_HOST } from "../config";


const fetchUsers = ()=>{
    return request(API_HOST+'/api/v1/users')
}

const fetchUser = id=>{
    return request(API_HOST+`/api/v1/users/${id}`)
}

const updateUser = (id, params)=>{
  const data = new FormData();
  Object.keys(params).forEach(key => { data.append(key, params[key]); });
  return request(`${API_HOST}/api/v1/users/${id}`, {
    method: 'POST', body: data,
  });
}

export {fetchUser, fetchUsers, updateUser}