import request from "../utils/request";
import { API_HOST } from "../config";

const fetchStatistic = (id)=>{
    return request(`${API_HOST}/api/v1/misc/statistic/${id}`)
}
export {fetchStatistic}