import pathToRegexp  from "path-to-regexp";
import { fetchBlogs, fetchBlog } from "../services/article";
import { extractParams } from "../utils/qs";
const emptyBlog = {
    tags: [],
    content: '',
}
export const BlogStatus = {
    RECYCLE: 0,
    DRAFT: 1,
    PUBLISH: 2,
    PIN: 3,
}
export default {
    namespace: 'blogs',
    state: {
        currentItem: emptyBlog,
        list: [],
        per: 10,
    },
    subscriptions: {
        listSubscriber({dispatch, history}) {
            history.listen(({pathname})=>{
                if(pathname==='/blog/index') {
                    const filters = JSON.stringify({
                        article_type: 'Solution',
                        status: [BlogStatus.PUBLISH]
                    })
                    let query = { filters }
                    dispatch({type: 'fetchList', payload:query})
                }
            })
        },
        detailSubscriber({dispatch, history}) {
            history.listen(({pathname})=>{
                const match = pathToRegexp('/blog/detail/:id').exec(pathname)
                if(match) {
                    console.log(match)
                    var id = match[1]
                    dispatch({type: 'fetchItem', payload: id})
                }
            })
        },
        editSubscriber({dispatch, history}) {
            history.listen(({pathname})=>{
                if(pathname==='/principle/blog/create') {
                    dispatch({type: 'saveItem', payload: {}})
                }
                const match = pathToRegexp('/principle/blog/edit/:id').exec(pathname)
                if(match) {
                    console.log(match)
                    var id = match[1]
                    dispatch({type: 'fetchItem', payload: id})
                }
            })
        },
    },
    effects: {
        *fetchList({ payload }, { call, put, select }) {
            const per = yield select(state=>state.blogs.per)
            const params = extractParams(payload)
            yield put({ type:'saveParams', payload:params})
            const response = yield call(fetchBlogs,params.page,per,{
                sort_field: params.sortField,
                sort_order: params.sortOrder,
                filters: params.filters
            })
            console.log(response)
            yield put({type:'saveList', payload:response})
        },
        *fetchItem({ payload:id }, { call, put }) {
            const response = yield call(fetchBlog, id)
            yield put({type:'saveItem', payload:response})
        },
    },
    reducers: {
        saveParams(state, {payload}) {
            return {
                ...state,
                ...payload,
            }
        },
        saveItem(state, {payload}) {
            return {
                ...state,
                currentItem: payload.article||emptyBlog
            }
        },
        saveList(state, {payload}) {
            return {...state, list: payload.items}
        },
        update(state, {payload}) {
            const list = state.list.map(
                e=>(e.id==payload.id?{...e, ...payload}:e)
            )
            return {...state, list}
        },
        add(state, {payload}) {
            const id = 1+state.list.map(c=>c.id).reduce((x,y)=>x>y?x:y)
            var blog = {
                id,
                article_type:'Solution',
                like_times: 0,
                summary: payload.content,
                created_at: new Date().toDateString(),
                updated_at: new Date().toDateString(),
                user:{
                    id:2,
                    name: "admin"
                },
                ...payload,
            }
            return {list: state.list.concat(blog)}
        },
        remove(state, {payload:id}) {
            return {
                list: state.list.filter(blog=>(blog.id!=id))
            }
        }
    }
}