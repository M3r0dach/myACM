import request from "../utils/request";
import { API_HOST } from "../config";

const fetchStatistic = ()=>{
    return request(`${API_HOST}/api/v1/misc/statistic`)
}
/*
const fetchDashBoard = ()=>{
    return request(`${API_HOST}/api/v1/misc/dashboard`)
}
*/
export {fetchStatistic}