import { fetchAccounts, createAccount } from "../services/spider";
import { extractParams } from "../utils/qs";
import { message } from "antd";
export const OJ_MAP = {
  hdu: 'HDU',
  bnu: 'BNU',
  poj: 'POJ',
  vj: 'Hust Vjudge',
  cf: 'Codeforces',
  bc: 'Bestcoder'
};
export default {

  namespace: 'accounts',

  state: {
    list: [],
    per: 10,
    filters: {},
  },

  reducers: {
    saveList(state, {payload}) {
      return {...state, list: payload.items}
    },
    createSuccess(state, {payload:account}) {
      return {
        ...state,
        list: state.list.concat(account)
      }
    },
    remove(state, {payload:id}) {
      const list = state.list.filter(
        e=>e.id!=id
      )
      return { list }
    },
    update(state, {payload}) {
      const list = state.list.map(
        e=>(e.id==payload.id?{...e, ...payload}:e)
      )
      return {list}
    },
    saveParams(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    },
  },

  effects: {
    *fetchList({ payload }, { call, put, select }) {
      const per = yield select(state=>state.accounts.per)
      const params = extractParams(payload)
      yield put({ type:'saveParams', payload:params})
      const response = yield call(fetchAccounts,params.page,per,{
        filters: params.filters
      })
      console.log(response)
      yield put({type:'saveList', payload:response})
    },
    *create({payload}, {put, call}) {
      const response = yield call(createAccount,payload)
      if(response.err_code!==1&&response.account!=null) {
        message.success('添加成功')
        yield put({ type: 'createSuccess', payload: response.account })
      } else {
        const err = response.message? `: ${response.message}`:''
        message.error(`添加失败${err}`)
      }
    }
  },
};