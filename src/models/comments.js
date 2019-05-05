import { fetchComments, createComment } from "../services/article";
import pathToRegexp from "path-to-regexp";
import { message } from "antd";
export default {
    namespace: 'comments',
    state: {
        list: [] 
    },
    reducers: {
        createSuccess(state, {payload}) {
            return {...state, list: [...state.list, payload]}
        },
        saveList(state, {payload}) {
            return {...state, list: payload.items}
        },
    },
    effects: {
        *create({payload}, {call, put, select}) {
            console.log('create comment', payload)
            const response = yield call(createComment,payload.id,payload.params)
            if(response.err_code!==1&&response.comment!=null) {
                message.success('添加成功')
                yield put({ type: 'createSuccess', payload: response.comment })
            } else {
                const err = response.message? response.message:''
                message.error(`添加失败: ${err}`)
            }
        },
        *fetchList({ payload:id }, { call, put }) {
            const response = yield call(fetchComments, id)
            yield put({type:'saveList', payload:response})
        },
    },
    subscriptions: {
        listSubscriber({dispatch, history}) {
            history.listen(({pathname})=>{
                const match = pathToRegexp('/blog/detail/:id').exec(pathname)
                if(match) {
                    var id = match[1]
                    dispatch({type: 'fetchList', payload:id})
                }
            })
        },
    }
}