import { fetchSubmits } from "../services/spider";

function extractParams(query) {
    const {current_page=1} = query||{}
    return {current_page: parseInt(current_page, 10)}
}

export default {

  namespace: 'submits',

  state: {
      list: [],
      current_page: 1,
      per: 15,
      total_count: 0,
      total_pages: 0,
  },

  reducers: {
    saveList(state, {payload}) {
      console.log(payload)
      return {
        ...state,
        ...payload.meta,
        list: payload.items
      }
    }
  },

  effects: {
    *fetchList({payload}, {call, put, select}) {
      const params = extractParams(payload)
      const per = yield select(state=>state.submits.per)
      const response = yield call(fetchSubmits,
          params.current_page, per)
      yield put({type: 'saveList', payload: response})
    }
  },

  subscriptions: {
    setupSubscriber({dispatch, history}) {
      history.listen(({pathname, state})=>{
        if(pathname==='/train/submits') {
          console.log('trigger refresh submits')
          console.log(state)
          dispatch({type: 'fetchList', payload:state})
        }
      })
    }
  },

};