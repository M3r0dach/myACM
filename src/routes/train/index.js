import { Layout} from "antd";
import NavBar from "Components/NavBar";
import RankList from "Components/table/RankList";
import SubmitList from "Components/table/SubmitList";
import { Switch, Route, Redirect} from "dva/router";

const menu = [
    {key: 1, title:'总排行榜', to:{pathname:'/train/total', state:{name:'Ann'}}},
    {key: 2, title:'月排行榜', to:'/train/month'},
    {key: 3, title:'提交', to:'/train/submits'},
]
const TrainIndex = (props)=>{
    console.log('train page')
    console.log(props.match)
    const {match} = props
    return <Layout>
        <Layout.Sider>
            <NavBar items={menu}/>
        </Layout.Sider>
        <Layout.Content>
            <Switch>
                <Route path={`${match.path}/submits`} component={SubmitList}/>
                <Route path={`${match.path}/:option`} component={RankList}/>
                <Redirect to='/train/total'/>
            </Switch>
        </Layout.Content>
    </Layout>
}
export default TrainIndex