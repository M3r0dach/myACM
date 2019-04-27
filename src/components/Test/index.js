import React from 'react'
import { List, Card, Icon } from 'antd';
import 'antd/dist/antd.css'
import ModalFactory from "../ModalFactory";
import { IconFont } from "../IconText";

const modal = ()=>{
    return ModalFactory.createLoginModal()
}

const CardList = ()=>{
    var data = []
    for(let i=0; i<20; i++) {
        data.push({title:'Title '+i})
    }
    return <List
        grid={{gutter:32, column: 3}}
        dataSource={data}
        renderItem={item=>(
            <List.Item>
                <Card title={item.title}>Card content</Card>
            </List.Item>
        )}
        pagination={{pageSize:9}}
    />
}
const View = ()=>{
    return <div>
        <IconFont type='icon-female'/>
        <IconFont type='icon-male'/>
    </div>
}
const FetchTest = ()=>{
    fetch('/api/v1/users',{
        method:'GET',
    }).then( response=>{
        response.json().then( data=>{
            console.log('Fetch Test')
            console.log(data)
        })
    }).catch( e=>{
        console.log(e)
    })
    return <h1>FetchTest</h1>
}
export default FetchTest;