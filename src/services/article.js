import request from "../utils/request";
import { withParams } from "../utils/qs";
import { API_HOST } from "../config";

const fetchBlogs = (page, per, params={})=>{
    const query = {page, per, ...params}
    return request(withParams(`${API_HOST}/api/v1/articles`, query))
}

const fetchBlog = (id)=>{
    return request(API_HOST+`/api/v1/articles/${id}`)
}
const createBlog = (params) => {
    console.log('create blog')
    return request(`${API_HOST}/api/v1/articles`, {
        method: 'POST', body: JSON.stringify(params),
    }, true)
}
const updateBlog = (id, params) => {
    console.log('update blog')
    return request(`${API_HOST}/api/v1/articles/${id}`, {
        method: 'PUT', body: JSON.stringify(params),
    }, true)
}
const likeBlog = (id) =>{
    console.log('like it')
    return request(`${API_HOST}/api/v1/articles/${id}/like`, {
        method: 'PUT'
    })
}
const deleteBlog = id => {
    console.log('delete blog')
    return request(API_HOST+`/api/v1/articles/${id}`, {method: 'DELETE'})
}
const fetchComments = (id)=>{
    return request(API_HOST+`/api/v1/articles/${id}/comments`)
}
const createComment = (id,params)=>{
    console.log('create comment')
    return request(`${API_HOST}/api/v1/articles/${id}/comments`, {
        method: 'POST', body: JSON.stringify(params)
    }, true)
}


export {fetchBlogs, fetchBlog, createBlog, updateBlog, likeBlog, deleteBlog, fetchComments, createComment}