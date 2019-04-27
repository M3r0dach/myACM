import React from 'react'
import {Avatar, List, Icon} from "antd";
import 'antd/dist/antd.css'
const MetaBlock = ({title, value})=>{
    return <div style={{
                paddingRight:7, marginBottom:5,
                fontSize:12, textAlign:'left'}}>
            <p>{value}</p>
            {title}
        </div>
}
const Title = ({user})=>{
    return <div >
            <b style={{fontSize:21,fontWeight:700}}>
                {user.nickname+' '}
            </b>
            <Icon type={user.gender?'man':'woman'}/>
        </div>

}
const PersonalBar = ({user})=>{
    const meta = [
        {title:'文章', value:user.blog_cnt},
        {title:'积分', value:user.score},
        {title:'点赞数', value:user.like_times},
    ]
    return <div style={{height:120, background:'white'}}>
        <Avatar src={user&&user.avatar.origin}
                shape='circle'
                style={{width:80, height:80, float:'left'}}
            />
        <List style={{paddingLeft:100, width:320}}
                header={<Title user={user}/>}
                grid={{column:4, gutter:1}} 
                dataSource={meta}
                renderItem={
                    (item,idx)=>(
                        <List.Item key={idx}>
                            <MetaBlock title={item.title} value={item.value}/>
                        </List.Item>
                    )
                }>
        </List>
    </div>
}
export default PersonalBar