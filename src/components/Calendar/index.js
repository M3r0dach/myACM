import React from 'react'
import DataFrame from "dataframe-js";
import echarts from "echarts/lib/echarts";
import "echarts/lib/chart/heatmap";
import "echarts/lib/component/title"
import "echarts/lib/component/tooltip"
import "echarts/lib/component/visualMap"
import "echarts/lib/component/calendar"
import { connect } from "dva";

class Calendar extends React.Component {
    state = {
        user: null,
        submits: []
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
                    per: 400,
                },
            })
        }
    }
    static getDerivedStateFromProps(nextProps, preState) {
        if(nextProps.user!=preState.user) {
            console.log('next props')
            Calendar.onUpdate(nextProps.user, nextProps.dispatch)
            return {user: nextProps.user}
        }else if(nextProps.submits&&nextProps.submits!=preState.submits){
            return {submits: nextProps.submits}
        }
        return null
    }
    getOption(data=[]) {
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
            tooltip: {
                formatter: function (param) {
                    console.log(param.value)
                    return (`日期：${param.value[0]}<br/>
                            解题：${param.value[1]}`)
                }
            },
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
    componentDidMount() {
        this.mychart = echarts.init(document.getElementById('chart'))
        this.mychart.setOption(this.getOption())
    }
    shouldComponentUpdate(newProps, newState) {
        this.mychart.setOption(
            this.getOption(
                this.formatData(this.state.submits)
            )
        )
        return true
    }
    render() {
        return <div id='chart' style={{
                width: "95%", height: 500,
            }}></div>
    }
}
const stateToProps = ({users,submits, loading})=>{
    return {
        submits: submits.list,
        user: users.displayUser,
        loading:loading.models.submits,
    }
}
export default connect(stateToProps)(Calendar);
