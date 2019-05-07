import { notification, message } from "antd";
import { fetchToken, saveToken, removeToken, getToken } from "../services/auth";
import { fetchUser, updateUser } from "../services/user";
import JwtDecode from "jwt-decode";
import pathToRegexp from "path-to-regexp";

const emptyUser = {
    nickname: '未登录',
    user_info:{},
    avatar:{}
};


export default {
    namespace: 'users',
    state: {
        currentUser: emptyUser,
        displayUser: emptyUser,
        list: [],
        isLogin: false,
        page: 1,
        per: 15,
        totalCount: 0,
        totalPage: 0
    },
    subscriptions: {
        currentUserSubscriber({ dispatch, history }) {
           history.listen(({pathname})=>{
               const match = pathToRegexp('/*').exec(pathname)
               if(match) {
                   console.log('subscribe currentUser')
                   dispatch({type: 'loadCurrentUser'})
               }
           })
       },
        displayUserSubscriber({dispatch, history}) {
            history.listen(({pathname})=>{
                const match = pathToRegexp('/principle/:id').exec(pathname)
                if(match) {
                    console.log('subscribe displayUser:', match)
                    dispatch({type: 'loadDisplayUser', payload: match[1]})
                }
            })
        }
    },
    effects: {
        *logout({payload}, {call, put}) {
            yield removeToken()
            yield put({ type:'remove' })
        },
        *update({payload}, {put, call}) {
            const response = yield call(updateUser,payload.id, payload.params)
            if(response.err_code!==1&&response.user!=null) {
                message.success('修改成功')
                yield put({ type: 'updateSuccess', payload: response.user })
            } else {
                const err = response.message? response.message:''
                message.error(`修改失败: ${err}`)
            }
        },
        *loadCurrentUser({payload}, {call, put, select}) {
            try {
                console.log('loadCurrentUser')
                const isLogin = yield select(state=>state.users.isLogin)
                if(isLogin) return
                const token = yield call(getToken)
                console.log('load token', token)
                const decoded = JwtDecode(token)
                console.log(decoded)
                if(!decoded) {
                    throw Error('invalid jwt token')
                }
                const response = yield call(fetchUser, decoded.user_id)
                if(response.err_code!==1&&response.user!=null) {
                    yield put({type:'save', payload:response.user})
                }
            }catch (err) {
                console.log(err.message)
            }
        },
        *loadDisplayUser({payload}, {call, put, select}) {
            try {
                console.log('loadDisplayUser')
                var id = payload
                if(payload=='index') {
                    const isLogin = yield select(state=>state.users.isLogin)
                    const token = yield call(getToken)
                    if(!token) {
                        console.log('loadDisplay get Token Failed')
                        return
                    }
                    const decoded = JwtDecode(token)
                    if(!decoded) {
                        throw Error('invalid jwt token')
                    }
                    id = decoded.user_id;
                }
                const response = yield call(fetchUser, id)
                if(response.err_code!==1&&response.user!=null) {
                    yield put({type:'saveDisplay', payload:response.user})
                }
            }catch (err) {
                console.log(err.message)
            }
        },
        *login({payload:{nickname, password}}, {call, put}) {
            try {
                console.log('login')
                const response = yield call(fetchToken, nickname, password)
                console.log(response)
                yield call(saveToken,response)
                notification.success({
                    message:'登录成功',
                    duration:2
                })
                window.location.reload()
            } catch (error) {
                notification.error({
                    message:'登录失败',
                    description:error,
                })
            }
        }
    },
    reducers: {
        save(state, {payload}) {
            return {
                ...state,
                currentUser: payload,
                isLogin: true,
            }
        },
        saveDisplay(state, {payload}) {
            console.log('saveDisplay', payload)
            return {
                ...state,
                displayUser: payload,
                isLogin: true,
            }
        },
        logout(state) {
            return {
                ...state,
                 currentUser: emptyUser,
                 currentItem: null,
                 isLogin: false,
            };
        },
        updateSuccess(state, {payload}) {
            const list = state.list.map(
                e=>(e.id==payload.id?{...e, ...payload}:e)
            )
            return {
                ...state,
                currentUser: payload,
                currentItem: payload,
                list
            }
        },
    }
}