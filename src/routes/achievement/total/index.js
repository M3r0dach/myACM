import React from 'react'
import { connect } from "dva";
import PrizeCardListFactory from 'Components/PrizeCardListFactory';

const AchievementsPage = props=>{
    const {achievements} = props;
    return <div style={{marginTop: 30}}>
        {PrizeCardListFactory.createTotal(achievements)}
    </div>
}
const stateToProps = ({achievements})=>{
    return {
        achievements: achievements.achievements
    }
}
export default connect(stateToProps)(AchievementsPage);