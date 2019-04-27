import { Layout} from "antd";
import { Switch, Route, Redirect} from "dva/router";
import 'antd/dist/antd.css'
import React from "react";
import MyPrizePage from "./me";
import FeedPage from "./feed";
import AchievementPage from "./total";
import NavBar from "../../components/NavBar";
const menu=[
    {key:'me', to:'/achievement/me', title:'我的成就'},
    {key:'feed', to:'/achievement/feed', title:'队员动态'},
    {key:'total', to:'/achievement/total', title:'全部成就'}
]
class AchievementLayout extends React.Component{
    render() {
        return (
            <Layout>
                <Layout.Sider>
                    <NavBar items={menu}/>
                </Layout.Sider>
                <Layout.Content>
                    <Switch>
                        <Route path={`${this.props.match.path}/me`}
                            component={MyPrizePage}/>
                        <Route path={`${this.props.match.path}/feed`}
                            component={FeedPage}/>
                        <Route path={`${this.props.match.path}/total`}
                            component={AchievementPage}/>
                        <Redirect to={`${this.props.match.path}/me`}/>
                    </Switch>
                </Layout.Content>
            </Layout>
        )
    }
}

export default AchievementLayout