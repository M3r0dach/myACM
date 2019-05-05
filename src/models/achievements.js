import { fetchPrize, fetchAchieve } from "../services/achievements";
import { getToken } from "../services/auth";
import { extractParams } from "../utils/qs";
import jwtDecode from "jwt-decode";
import pathToRegexp from "path-to-regexp";
export default {
    namespace: 'achievements',
    state: {
        achievements: [],
        myPrizes: [],
        totalPrizes: [],
        sort_order: 'ascend',
        sort_field: 'id',
        filters: {},
        per: 12,
    },
    subscriptions: {
        myPrizesSubscriber({ dispatch, history }) {
            history.listen(({pathname})=>{
                if(pathname==='/achievement/me'||
                  pathname==='/principle/index'
                ) {
                    const token = getToken()
                    if(!token) return
                    const decoded = jwtDecode(token)
                    let filters = JSON.stringify({
                        user_id: decoded.user_id
                    })
                    let query = {
                        sort_field: 'updated_at',
                        sort_order: 'descend',
                        filters
                    }
                    dispatch({type: 'saveParams', payload: query})
                    dispatch({type: 'fetchMyPrizes', payload: query})
                }
            })
       },
        userPrizeSubscriber({ dispatch, history }) {
            history.listen(({pathname})=>{
                const match = pathToRegexp('/principle/:id').exec(pathname)
                if(match&&match[1]!='index') {
                    let filters = JSON.stringify({
                        user_id: match[1]
                    })
                    let query = {
                        sort_field: 'updated_at',
                        sort_order: 'descend',
                        filters
                    }
                    dispatch({type: 'saveParams', payload: query})
                    dispatch({type: 'fetchMyPrizes', payload: query})
                }
            })
       },
       totalPrizesSubscriber({ dispatch, history }) {
            history.listen(({pathname})=>{
                if(pathname==='/achievement/feed') {
                    let query = {
                        sort_field: 'updated_at',
                        sort_order: 'descend',
                        filters: '{}',
                    }
                    dispatch({type: 'saveParams', payload: query})
                    dispatch({type: 'fetchTotalPrizes', payload:query})
                }
            })
       },
       achievementsSubscriber({ dispatch, history }) {
            history.listen(({pathname})=>{
                if(pathname==='/achievement/total') {
                    dispatch({type: 'fetchAchievements'})
                }
            })
       },
    },
    effects: {
        *fetchMyPrizes({ payload }, { call, put, select }) {
            const params = extractParams(payload)
            const per = yield select(state=>state.achievements.per)
            const response = yield call(fetchPrize, params.page, per, {
                sort_field:params.sort_field,
                sort_order:params.sort_order,
                filters:params.filters
            })
            yield put({type:'saveMyPrizes', payload:response})
        },
        *fetchTotalPrizes({ payload }, { call, put, select }) {
            const params = extractParams(payload)
            const per = yield select(state=>state.achievements.per)
            const response = yield call(fetchPrize, params.page, per, {
                sort_field:params.sort_field,
                sort_order:params.sort_order,
                filters:params.filters
            })
            yield put({type:'saveTotalPrizes', payload:response})
        },
        *fetchAchievements({ payload }, { call, put }) {
            const response = yield call(fetchAchieve)
            yield put({type:'saveAchievements', payload:response})
        },
    },
    reducers: {
        saveParams(state, {payload}) {
            return {...state, ...payload}
        },
        saveMyPrizes(state, {payload}) {
           return {...state, myPrizes: payload.items}
        },
        saveTotalPrizes(state, {payload}) {
           return {...state, totalPrizes: payload.items}
        },
        saveAchievements(state, {payload}) {
           return {...state, achievements: payload.items}
        },
   }
}