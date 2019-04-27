import React from 'react'
import { Tabs } from 'antd';
import { connect } from "dva";
import PrizeCardListFactory from 'Components/PrizeCardListFactory';

const MyPrizePage = props=>{
    const {myPrizes} = props;
    return <Tabs defaultActiveKey='my' >
            <Tabs.TabPane key='my' tab='已完成的成就'>
                {PrizeCardListFactory.createCompleted(myPrizes)}
            </Tabs.TabPane>
            <Tabs.TabPane key='processing' tab='正在进行的成就'>
                {PrizeCardListFactory.createInProgress(myPrizes)}
            </Tabs.TabPane>
        </Tabs>

}
const stateToProps = ({achievements})=>{
    return {
        myPrizes:achievements.myPrizes,
    }
}
export default connect(stateToProps)(MyPrizePage);