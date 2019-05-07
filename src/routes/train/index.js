import { Layout, Card} from "antd";
import NavBar from "Components/NavBar";
import RankList from "Components/table/RankList";
import SubmitList from "Components/table/SubmitList";
import WeekRankCard from "Components/WeekRankCard";
import { Switch, Route, Redirect} from "dva/router";

const menu = [
    {key: 1, title:'总排行榜', to:{pathname:'/train/total', state:{name:'Ann'}}},
    {key: 3, title:'提交', to:'/train/submits'},
]
const TrainIndex = (props)=>{
    console.log('train page')
    console.log(props.match)
    const {match} = props
    return <Layout>
        <Layout.Content style={{background:'white', padding:10, width:'60%'}}> 
            <Switch>
                <Route path={`${match.path}/submits`} component={SubmitList}/>
                <Route path={`${match.path}/:option`} component={RankList}/>
                <Redirect to='/train/total'/>
            </Switch>
        </Layout.Content>
        <Layout.Sider style={{padding:10}} theme='light' width={300}>
            <NavBar items={menu} theme='light'/>
            <WeekRankCard/>
        </Layout.Sider>
    </Layout>
}
export default TrainIndex