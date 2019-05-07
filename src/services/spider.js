import request from "../utils/request";
import { API_HOST } from "../config";
import { withParams } from "../utils/qs";



const fetchSubmits = (page, per, params)=>{
    const query = {page, per, ...params}
    return request(
        withParams(API_HOST+'/api/v1/spiders/submits', query)
    )
}
const fetchRankList = (page, per, params)=>{
    const query = {page, per, ...params}
    console.log('fetch ranklist')
    console.log(query)
    return request(withParams(`${API_HOST}/api/v1/spiders/rank_list`,query))
}
const fetchWeekRank = ()=>{
    return request(`${API_HOST}/api/v1/spiders/week_rank`)
}
const fetchAccounts = (page, per, params)=>{
    console.log('fetchAccounts')
    const query = {page, per, ...params}
    return request(withParams(API_HOST+'/api/v1/spiders/accounts', query))
}
const createAccount = (params) => {
    console.log('create account')
    return request(`${API_HOST}/api/v1/spiders/accounts`, {
        method: 'POST', body: JSON.stringify(params),
    }, true)
}
const updateAccount = (id, params) => {
    return request(`${API_HOST}/api/v1/spiders/accounts/${id}`, {
        method: 'PUT', body: JSON.stringify(params),
    }, true)
}
const deleteAccount = id => {
    return request(`${API_HOST}/api/v1/spiders/accounts/${id}`, {
        method: 'DELETE'
    })
}
export {fetchSubmits, fetchRankList, fetchWeekRank, fetchAccounts, createAccount, updateAccount, deleteAccount}