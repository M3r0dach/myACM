import pathToRegexp  from "path-to-regexp";
import { fetchBlogs, fetchBlog, createBlog, updateBlog, deleteBlog, likeBlog } from "Services/article";
import { extractParams } from "Utils/qs";
import { message } from "antd";
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
        *delete({payload}, {call, put}) {
            const response = yield call(deleteBlog, payload)
            if(response.err_code!==1) {
                message.success('删除成功')
                yield put({type: 'remove', payload})
            }else {
                const err = response.message? response.message:''
                message.error(`删除失败: ${err}`)
            }
        },
        *like({payload}, {call, put}) {
            const response = yield call(likeBlog, payload)
            if(response.err_code!==1) {
                yield put({type: 'updateSuccess', payload: response.article})
            }
        },
        *fetchList({ payload }, { call, put, select }) {
            const per = yield select(state=>state.blogs.per)
            const params = extractParams(payload)
            yield put({ type:'saveParams', payload:params})
            const response = yield call(fetchBlogs,params.page,per,{
                sort_field: params.sort_field,
                sort_order: params.sort_order,
                filters: params.filters
            })
            console.log(response)
            yield put({type:'saveList', payload:response})
        },
        *fetchItem({ payload:id }, { call, put }) {
            const response = yield call(fetchBlog, id)
            yield put({type:'saveItem', payload:response})
        },
        *create({payload}, {put, call}) {
            const response = yield call(createBlog,payload)
            if(response.err_code!==1&&response.article!=null) {
                message.success('添加成功')
                yield put({ type: 'createSuccess', payload: response.article })
            } else {
                const err = response.message? response.message:''
                message.error(`添加失败: ${err}`)
            }
        },
        *update({payload}, {put, call}) {
            const response = yield call(updateBlog,payload.id, payload)
            if(response.err_code!==1&&response.article!=null) {
                message.success('修改成功')
                yield put({ type: 'updateSuccess', payload: response.article })
            } else {
                const err = response.message? response.message:''
                message.error(`修改失败: ${err}`)
            }
        }
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
        updateSuccess(state, {payload}) {
            const list = state.list.map(
                e=>(e.id==payload.id?{...e, ...payload}:e)
            )
            return {...state, list}
        },
        createSuccess(state, {payload:account}) {
            return {
                ...state,
                list: state.list.concat(account)
            }
        },
        remove(state, {payload:id}) {
            return {
                list: state.list.filter(blog=>(blog.id!=id))
            }
        }
    }
}