import request from "../utils/request";
import { withParams } from "../utils/qs";
import { API_HOST } from "../config";

const fetchBlogs = (page, per, params={})=>{
    const query = {page, per, ...params}
    return request(withParams(`${API_HOST}/api/v1/articles`, query))
}

const fetchBlog = (id)=>{
    return request(API_HOST+`/api/v1/articles/${id}`, { })
}
const fetchComments = (id)=>{
    return request(API_HOST+`/api/v1/articles/${id}/comments`, { })
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
export {fetchBlogs, fetchBlog, fetchComments, createBlog, updateBlog}
var o = {
    article_type: "Solution",
    content: "happy happy happy fox",
    status: 1,
    tags: ["fox", "good"],
    title: "What about the foxes",
}