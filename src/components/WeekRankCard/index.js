import React from 'react'
import { Card, Table } from 'antd';
import { connect } from "dva";

const RankCard = ({list})=>{
    var columns = [{
        title: '#',
        dataIndex: 'order',
        width: '10%',
    },{
        title: '姓名',
        dataIndex: 'user_name',
        width: '30%',
    },{
        title: '通过',
        dataIndex: 'solved',
        width: '30%',
    },{
        title: '提交',
        dataIndex: 'submitted',
        width: '30%',
    }]
    return <Table columns={columns}
                pagination={{pageSize:6}}
                dataSource={list}
            />
}

const tabList = [{
    key: 'this_week',
    tab: '本周',
},{
    key: 'last_week',
    tab: '上周',
}]

class WeekRankCard extends React.Component{
    state = {
        key: 'this_week',
    }
    handleTabChange = (key)=>{
        this.setState({key:key})
    }
    render() {
        return (
            <Card style={{marginTop: 30}}
                title='刷题榜'
                tabList={tabList}
                onTabChange={this.handleTabChange}
                activeTabKey={this.state.key}>
                <RankCard list={this.props[this.state.key]}/>
            </Card>
        )
    }
}

const stateToProps = ({ranklist})=>{
    return {
        this_week: ranklist.this_week,
        last_week: ranklist.last_week,
    }
}

export default connect(stateToProps)(WeekRankCard);