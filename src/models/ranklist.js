import { fetchRankList } from "../services/spider";

function extractParams(query) {
    const {current_page=1} = query||{}
    return {current_page: parseInt(current_page, 10)}
}

export default {

  namespace: 'ranklist',

  state: {
      list: [],
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
        };
    },
  },

  effects: {
    *fetchList({ payload }, { call, put, select }) {
      const params = extractParams(payload)
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
          dispatch({type: 'fetchList', payload:state})
        }
      })
    },
}
};