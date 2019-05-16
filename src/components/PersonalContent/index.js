import React from 'react'
import { Tabs } from "antd";
import BlogTable from '../table/BlogTable';
import AccountsTable from '../table/AccountsTable';
import PrizeCardListFactory from '../PrizeCardListFactory';
import { connect } from 'dva';
import Calendar from '../Calendar';


class PersonalContent extends React.Component{
    render() {
        const {myPrizes, guest} = this.props
        console.log('guest', guest)
        return <div style={{marginTop:30, background:'white'}}>
            <Tabs defaultActiveKey='blogs'>
                <Tabs.TabPane key='blogs' tab='文章'>
                    <BlogTable/>
                </Tabs.TabPane>
                <Tabs.TabPane key='achievements' tab='成就'>
                    {PrizeCardListFactory.createCompleted(myPrizes)}
                </Tabs.TabPane>
                {
                    guest?null:(
                        <Tabs.TabPane key='accounts' tab='账号'>
                            <AccountsTable/>
                        </Tabs.TabPane>
                    )
                }
                <Tabs.TabPane key='calendar' tab='统计'>
                    <Calendar/>
                </Tabs.TabPane>
            </Tabs>
        </div>
    }
}
const stateToProps = ({achievements, users})=>{
    return {
        guest: users.displayUser.id!=users.currentUser.id,
        myPrizes:achievements.myPrizes,
    }
}
export default connect(stateToProps)(PersonalContent)