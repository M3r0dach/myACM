import React from 'react'
import { Tabs, Layout } from "antd";
import 'antd/dist/antd.css'
import BlogTable from '../BlogTable';
import AccountsTable from '../AccountsTable';
import PrizeCardListFactory from '../PrizeCardListFactory';
import { connect } from 'dva';


class PersonalContent extends React.Component{
    render() {
        const {myPrizes} = this.props
        return <div>
            <Tabs defaultActiveKey='blogs'>
                <Tabs.TabPane key='blogs' tab='文章'>
                    <BlogTable/>
                </Tabs.TabPane>
                <Tabs.TabPane key='achievements' tab='成就'>
                    {PrizeCardListFactory.createCompleted(myPrizes)}
                </Tabs.TabPane>
                <Tabs.TabPane key='accounts' tab='账号'>
                    <AccountsTable/>
                </Tabs.TabPane>
            </Tabs>
        </div>
    }
}
const stateToProps = ({achievements})=>{
    return {
        myPrizes:achievements.myPrizes,
    }
}
export default connect(stateToProps)(PersonalContent)