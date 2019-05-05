import React from 'react'
import 'antd/dist/antd.css'
import DataFrame from "dataframe-js";
import echarts from "echarts";
import ReactEcharts from "echarts-for-react";
import { connect } from "dva";

class Calendar extends React.Component {
    state = {
        user: null
    }
    static onUpdate(user, dispatch) {
        if(user&&user.id) {
            const filters = JSON.stringify({
                user_id: user.id,
                result: ['Accepted','OK','AC'],
            })
            dispatch({
                type:'submits/fetchList',
                payload: {
                    filters,
                    sort_field: 'submitted_at',
                    sort_order: 'descend',
                    per: 300,
                },
            })
        }
    }
    static getDerivedStateFromProps(nextProps, preState) {
        if(nextProps.user!=preState.user) {
            console.log('next props')
            Calendar.onUpdate(nextProps.user, nextProps.dispatch)
            return {user: nextProps.user}
        }
        return null
    }
    getOption(data) {
        console.log('data', data)
        return {
            title: {
                top: 30,
                left: 'center',
                text: '2019年每天的A题数'
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
                range: '2019'
            },
            series: {
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data,
            }
        };
    }
    formatData = data=>{
        const df = new DataFrame(data, ['run_id', 'result', 'user_id', 'submitted_at'])
            .map(row=>row.set('submitted_at', row.get('submitted_at').substr(0, 10)))
        const count = df.groupBy('submitted_at').aggregate(group=>group.count()).rename('aggregation', 'count')
        console.log(count.toArray())
        return count.toArray()
    }
    render() {
        return <ReactEcharts
                    option={this.getOption(
                        this.formatData(this.props.submits)
                    )}
                    style={{width:"95%", height: 500}}
                />
    }
}
const stateToProps = ({users,submits})=>{
    return {
        submits: submits.list,
        user: users.displayUser,
    }
}
export default connect(stateToProps)(Calendar);
