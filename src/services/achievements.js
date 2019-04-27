import request from "../utils/request";
import { API_HOST } from "../config";
import { withParams } from "../utils/qs";


const fetchAchieve = ()=>{
    var api = '/api/v1/achievements'
    return request(API_HOST+api, { })
}
const fetchPrize = (page, per, params={})=>{
    const query = {page, per, ...params}
    return request(withParams(`${API_HOST}/api/v1/user_achievements`,query))
}
export {fetchAchieve, fetchPrize}