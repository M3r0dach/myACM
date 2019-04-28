import { fetchStatistic } from "../services/misc";
import { message } from "antd";

export default {
    namespace: 'misc',
    state: {
        article_count: 0,
        like_count: 0,
        accept_count: 0,
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({pathname})=>{
                if(pathname==='/principle/index') {
                    dispatch({type:'fetchMisc'})
                }
            })
       },
    },
    effects: {
        *fetchMisc({ payload }, { call, put }) {
            const response = yield call(fetchStatistic)
            if(response.err_code!==1&&response.data!=null) {
                yield put({ type: 'save', payload:response});
            }else {
                const err = response.message?response.message:''
                message.error(`获取用户信息失败: ${err}`)
            }
        },
    },
    reducers: {
        save(state, {payload}) {
            console.log('misc',payload)
            return {
                article_count: payload.data[0].count,
                like_count: payload.data[1].count,
                accept_count: payload.data[4].count,
            }
        }
    }
}