import React from 'react'
import { List, Card, Icon } from 'antd';
import ModalFactory from "../ModalFactory";
import { IconFont } from "../IconText";
import DataFrame from "dataframe-js";
import echarts from "echarts";
import { fetchSubmits } from "../../services/spider";

const View=()=>{
    return <div>
        <h1>wood</h1>
    </div>
}
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
class ChartTest extends React.Component {
    getOption(data) {
        return {
            title: {
                top: 30,
                left: 'center',
                text: '2017年某人每天的A题数'
            },
            visualMap: {
                min: 0,
                max: 10,
                type: 'piecewise',
                orient: 'horizontal',
                left: 'center',
                top: 65,
                textStyle: {
                    color: '#000'
                }
            },
            tooltip: {},
            calendar: {
                top: 120,
                cellSize: ['auto', 13],
                yearLabel: {show: false},
                range: '2017'
            },
            series: {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data,
            }
        };
    }
    formatData = obj=>{
        const df = new DataFrame(obj.items, ['run_id', 'result', 'user_id', 'submitted_at'])
            .map(row=>row.set('submitted_at', row.get('submitted_at').substr(0, 10)))
        const count = df.groupBy('submitted_at').aggregate(group=>group.count()).rename('aggregation', 'count')
        console.log(count.toArray())
        return count.toArray()
    }
    fetchData = (chart)=>{
        fetchSubmits(1,135, {filters:{user_id:2, result: ['Accepted', 'OK', 'AC']}, sort_field:'submitted_at', sort_order: 'descend'})
            .then(this.formatData).then(
                data=>chart.setOption(this.getOption(data))
            )
    }
    componentDidMount() {
        var mychart = echarts.init(document.getElementById('chart'))
        this.fetchData(mychart)
    }
    render() {
        return <div id='chart'
                    style={{width:800, height:400}}
                ></div>
    }
}
export default ChartTest;