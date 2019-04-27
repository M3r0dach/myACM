import { Card, Icon, Progress } from "antd";
import 'antd/dist/antd.css'
import React from "react";
import copper from 'Assets/copper.png';

const Basic = (title, description)=>{
    return  <div style={{textAlign:'center', margin:'auto'}}> 
        <Card
            style={{width:170}}
            cover={<img src={copper} height={150}/>}
        >
            <Card.Meta  title={title}
                description={description}
            />
        </Card>
    </div>
}

const Completed = ({prize})=>{
    return Basic(
        prize.achievement.name,
        prize.completed_at.substr(0,10)+'完成'
    )
}

const InProgress = ({prize})=>{
    return Basic(
        prize.achievement.name,
        <Progress status='active'
            percent={parseInt(prize.current*100/prize.total)}
        />
    )
}
const Info = ({prize})=>{
    return Basic(
        prize.name,
        prize.conditions.total+' '+prize.conditions.amount_type
    )
}
export {Completed, InProgress, Info};