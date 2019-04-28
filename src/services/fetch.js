import { getToken, fetchToken } from "./auth";
import { fetchUsers, fetchUser } from "./user";
import { fetchBlogs } from "./article";
import JwtDecode from "jwt-decode";
import { createAccount } from "./spider";
import { fetchBlog } from "./article";
import { fetchDashBoard, fetchStatistic } from "./misc";
function testToken() {
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE1NTczODcyMTF9.oJgPis9uu9wpq6mJsm3ISW5qRuSAMWYCNHQmn5QOyfo'
  console.log(JwtDecode(token))
}

 var api = '/api/v1/articles?page=1&per=10&sort_field=id&sort_order=descend&filters%5Buser_id%5D=2&filters%5Barticle_type%5D=Solution&filters%5Bstatus%5D%5B%5D=1&filters%5Bstatus%5D%5B%5D=2&filters%5Bstatus%5D%5B%5D=3'

 var url = '/api/v1/articles?page=1&per=10&sort_field=id&sort_order=descend&filter%5Buser_id%5D=2&filter%5Barticle_type%5D=Solution&filter%5Bstatus%5D%5B%5D=1&filter%5Bstatus%5D%5B%5D=2&filter%5Bstatus%5D%5B%5D=3'
    
 const print = e=>{console.log(e)}
 fetchDashBoard().then(print)
 fetchStatistic().then(print)