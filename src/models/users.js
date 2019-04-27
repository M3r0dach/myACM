import { notification } from "antd";
import { users} from "../testdata/user";
import { fetchToken, saveToken, removeToken, getToken } from "../services/auth";
import { fetchUser } from "../services/user";
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
        currentItem: null,
        list: users,
        isLogin: false,
        page: 1,
        per: 15,
        totalCount: 0,
        totalPage: 0
    },
    subscriptions: {
       currentUserSubsciber({ dispatch, history }) {
           history.listen(({pathname})=>{
               const match = pathToRegexp('/*').exec(pathname)
               if(match) {
                   console.log('subscribe currentUser')
                   dispatch({type: 'loadCurrentUser'})
               }
           })
       },
    },
    effects: {
        *logout({payload}, {call, put}) {
            yield removeToken()
            yield put({ type:'remove' })
        },
        *loadCurrentUser({payload}, {call, put, select}) {
            try {
                console.log('loadCurrentUser')
                const alreadyUser = yield select(state=>state.users.currentItem)
                console.log(alreadyUser)
                if(alreadyUser!=null) {
                    return
                }
                const token = yield call(getToken)
                const decoded = JwtDecode(token)
                console.log(decoded)
                if(!decoded) {
                    throw Error('invalid jwt token')
                }
                const response = yield call(fetchUser, decoded.user_id)
                yield put({type:'save', payload:response})
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
            console.log('login save')
            console.log(payload)
            return {
                ...state,
                currentUser: payload.user,
                currentItem: payload.user,
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
        modify(state, {payload}) {
            var user = {
                ...state.currentUser,
                nickname: payload.nickname,
                gender: payload.gender,
                description: payload.description,
                user_info: {
                    ...state.currentUser.user_info,
                    email: payload.email,
                    stu_id: payload.stu_id,
                    phone: payload.phone,
                    situation: payload.situation,
                    major: payload.major,
                    grade: payload.grade
                }
            }
            console.log('modified')
            console.log(user)
            return {
                currentUser:user,
                list: state.list.map(e=>(e.id==user.id?user:e))
            }
        }
    }
}