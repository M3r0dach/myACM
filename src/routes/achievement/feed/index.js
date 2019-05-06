import React from 'react'
import { Timeline } from "antd";
import { connect } from 'dva';


const Message = ({item})=>{
    console.log(item)
    return <div style={{width:200}}>
        <span style={{color:'green'}}>{item.completed_at}</span><br/>
        {item.user_name+' '}达成成就
        <div style={{float:'right', textAlign:'right'}}>
            <span style={{color:'red'}}>{item.name}</span>
        </div>
    </div>
}
class FeedPage extends React.Component{
    state = {
        totalPrizes: this.props.totalPrizes,
    }
    componentWillReceiveProps(props) {
        this.setState({
            totalPrizes:props.totalPrizes
        })
    }
    render() {
        const {totalPrizes} = this.state
        const prizes = totalPrizes.filter(
                prize=>prize.completed_at
            )
            .map(
                prize=>({
                    name:prize.achievement.name,
                    completed_at:prize.completed_at.substr(0,10),
                    user_id:prize.user_id,
                    user_name: prize.user.display_name,
                })
            )
        return <Timeline style={{minHeight:700,marginTop:30,marginLeft:50}} >
            {prizes.map(
                prize=><Timeline.Item key={prize.id} >
                    <Message item={prize}/>
                </Timeline.Item>
            )}
        </Timeline>
    }
}
const stateToProps = ({achievements})=>{
    return {totalPrizes:achievements.totalPrizes}
}
export default connect(stateToProps)(FeedPage);