import React from 'react'
import { connect } from "dva";
import PrizeCardListFactory from 'Components/PrizeCardListFactory';

const AchievementsPage = props=>{
    const {achievements} = props;
    return PrizeCardListFactory.createTotal(achievements)
}
const stateToProps = ({achievements})=>{
    return {
        achievements: achievements.achievements
    }
}
export default connect(stateToProps)(AchievementsPage);