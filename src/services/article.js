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
export {fetchBlogs, fetchBlog, fetchComments}