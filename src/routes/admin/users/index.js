import { Layout, Card} from "antd";
import NavBar from "Components/NavBar";
import UserList from "Components/table/UserList";
import FreshManList from "Components/table/FreshManList";
import { Switch, Route, Redirect} from "dva/router";

const menu = [
    {key: 1, title:'训练队员', to:'/users/list'},
    {key: 2, title:'新生申请', to:'/users/freshman'},
]
const UserAdmin = (props)=>{
    const {match} = props
    return <Layout>
        <Layout.Sider style={{padding:10}} theme='light' >
            <NavBar items={menu} theme='light'/>
        </Layout.Sider>
        <Layout.Content style={{background:'white', padding:10}}> 
            <Switch>
                <Route path={`${match.path}/list`} component={UserList}/>
                <Route path={`${match.path}/freshman`} component={FreshManList}/>
                <Redirect to='/users/list'/>
            </Switch>
        </Layout.Content>
    </Layout>
}
export default UserAdmin