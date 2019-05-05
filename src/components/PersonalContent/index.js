import React from 'react'
import { Tabs, Layout } from "antd";
import 'antd/dist/antd.css'
import BlogTable from '../table/BlogTable';
import AccountsTable from '../table/AccountsTable';
import PrizeCardListFactory from '../PrizeCardListFactory';
import { connect } from 'dva';
import Calendar from '../Calendar';
import { NavLink } from 'dva/router';


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
                <Tabs.TabPane key='calendar' tab='统计'>
                    <Calendar/>
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