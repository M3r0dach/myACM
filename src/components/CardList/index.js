import React from 'react'
import { List } from "antd";
import { connect } from "dva";

class CardList extends React.Component {
    render() {
        const {dataSource, cardView:CardView, loading} = this.props
        console.log('dataSource:',dataSource)
        return  <List
            loading={loading}
            grid={{gutter:32, column: 3}}
            dataSource={dataSource}
            renderItem={item=>(
                <List.Item key={item.id}>
                    <CardView prize={item}/>
                </List.Item>
            )}
            pagination={{pageSize:9}}
        />
    }
}
const stateToProps = ({loading}) => ({
    loading:loading.models.achievements,
})
export default connect(stateToProps)(CardList)