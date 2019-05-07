import { Card, Progress } from "antd";
import 'antd/dist/antd.css'
import React from "react";
import copper from 'Assets/copper.png';
import gold from 'Assets/gold.png';
import plat from 'Assets/plat.png';

const Basic = (title, description, score=1)=>{
    var prizeImg = score<3?copper:(
        score<10?gold:plat
    )
    return  <div style={{textAlign:'center', margin:'auto'}}> 
        <Card
            style={{width:170, background: '#ecf6fd'}}
            cover={<img src={prizeImg} height={150}/>}
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
        prize.completed_at.substr(0,10)+'完成',
        prize.achievement.score,
    )
}

const InProgress = ({prize})=>{
    return Basic(
        prize.achievement.name,
        <Progress status='active'
            percent={parseInt(prize.current*100/prize.total)}
        />,
        prize.achievement.score
    )
}
const Info = ({prize:achievement})=>{
    return Basic(
        achievement.name,
        achievement.conditions.total+' '+achievement.conditions.amount_type,
        achievement.score
    )
}
export {Completed, InProgress, Info};