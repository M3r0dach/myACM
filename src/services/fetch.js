import { getToken, fetchToken } from "./auth";
import { fetchUsers, fetchUser } from "./user";
import { fetchBlogs } from "./article";
import JwtDecode from "jwt-decode";
import { createAccount, fetchSubmits } from "./spider";
import { fetchBlog } from "./article";
import { fetchDashBoard, fetchStatistic } from "./misc";
import DataFrame from "dataframe-js";
function testToken() {
  const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoyLCJleHAiOjE1NTczODcyMTF9.oJgPis9uu9wpq6mJsm3ISW5qRuSAMWYCNHQmn5QOyfo'
  console.log(JwtDecode(token))
}

 var api = '/api/v1/articles?page=1&per=10&sort_field=id&sort_order=descend&filters%5Buser_id%5D=2&filters%5Barticle_type%5D=Solution&filters%5Bstatus%5D%5B%5D=1&filters%5Bstatus%5D%5B%5D=2&filters%5Bstatus%5D%5B%5D=3'

 var url = '/api/v1/articles?page=1&per=10&sort_field=id&sort_order=descend&filter%5Buser_id%5D=2&filter%5Barticle_type%5D=Solution&filter%5Bstatus%5D%5B%5D=1&filter%5Bstatus%5D%5B%5D=2&filter%5Bstatus%5D%5B%5D=3'
    
 const print = e=>{console.log(e)}
// fetchStatistic().then(print)
const FormatData = obj=>{
  const df = new DataFrame(obj.items, ['run_id', 'result', 'user_id', 'submitted_at'])
    .map(row=>row.set('submitted_at', row.get('submitted_at').substr(0, 10)))
  const count = df.groupBy('submitted_at').aggregate(group=>group.count()).rename('aggregation', 'count')
  console.log(count.toArray())
}
fetchSubmits(1,55, {filters:{user_id:2, result: ['Accepted', 'OK', 'AC']}, sort_field:'submitted_at', sort_order: 'descend'})
    .then(FormatData)