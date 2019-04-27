import { createComment } from "../utils/comments";
import { comments } from "Testdata/comments";
import { fetchComments } from "../services/article";
import pathToRegexp from "path-to-regexp";
export default {
    namespace: 'comments',
    state: {
        list: [] 
    },
    reducers: {
        add(state, {payload}) {
            const {value, user, blogID, target} = payload
            const id = 1+state.list.map(c=>c.id).reduce((x,y)=>x>y?x:y)
            const targetComment = state.filter(c=>c.id==target)[0]
            var comment = createComment(id, value, user, blogID, targetComment)
            console.log(comment)
            return state.concat(comment)
        },
        saveList(state, {payload}) {
            return {...state, list: payload.items}
        },
    },
    effects: {
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