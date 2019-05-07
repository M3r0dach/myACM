import { fetchRankList } from "../services/spider";
import { extractParams } from "../utils/qs";

const rankdata = [
    {
    order: 1,
    user_name: 'Ann',
    solved: 10,
    submitted: 20,
}, {
    order: 2,
    user_name: 'Ken',
    solved: 8,
    submitted: 10,
},
    {
    order: 3,
    user_name: 'John',
    solved: 5,
    submitted: 7,
},
]

export default {

  namespace: 'ranklist',

  state: {
      list: [],
      this_week: rankdata,
      last_week: rankdata,
      current_page: 1,
      per: 15,
      total_count: 0,
      total_pages: 0,
  },

  reducers: {
    saveList(state, {payload}) {
       return {
         ...state,
         ...payload.meta,
         list: payload.items,
         this_week: payload.this_week,
         last_week: payload.last_week,
        };
    },
  },

  effects: {
    *fetchList({ payload }, { call, put, select }) {
      const params = extractParams(payload)
      console.log('ranklist', params)
      const per = yield select(state=>state.ranklist.per)
      const response = yield call(fetchRankList,
        params.current_page, per)
      yield put({type: 'saveList', payload: response})
    },
  },

  subscriptions: {
    totalSubscriber({ dispatch, history }) {
      history.listen(({pathname, state})=>{
        if(pathname==='/train/total') {
          console.log('trigger refresh rank list')
          console.log(state)
          dispatch({type: 'fetchList', payload:state||{}})
        }
      })
    },
}
};