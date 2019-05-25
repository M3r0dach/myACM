import { Component } from "react";
import { OJ_MAP } from "Models/accounts";
import { Icon, Table, Modal, Input, Button} from "antd";
import {CodeModal} from "../../ModalFactory";
import { connect } from "dva";
import { withRouter } from "dva/router";


class SubmitList extends Component{
    state = {
        filteredInfo: {},
        sorteredInfo: {}
    }
    getColumnSearchProps = (dataIndex) =>({
      filterDropdown: ({
        setSelectedKeys, selectedKeys, confirm, clearFilters
      })=>(
        <div style={{padding:8}}>
          <Input
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            style={{width:188, marginBottom:8, display:'block'}}
            onChange={e=>{
              setSelectedKeys([e.target.value])
              console.log('selectedKeys')
              console.log(selectedKeys)
            }}
            onPressEnter={()=>this.handleSearch(selectedKeys, confirm)}
          />
          <Button
            type='primary'
            icon='search'
            size='small'
            style={{width:90, marginRight:8}}
            onClick={()=>this.handleSearch(selectedKeys, confirm)}
          >Search</Button>
          <Button
            size='small' style={{width:90}}
            onClick={()=>this.handleReset(clearFilters)}
          >Reset</Button>
        </div>
      ),
      filterIcon: filtered => <Icon type='search' style={{color: filtered?'#1890ff':undefined}}/>,
    })
    handleSearch = (selectedKeys, confirm) => {
      confirm()
    }
    handleReset = (clearFilters) => {
      clearFilters();
    }
    getColumns=(sorteredInfo, filteredInfo)=>{
      let cols = [ {
        title: '用户名',
        dataIndex:'user_name',
        ...this.getColumnSearchProps('user_name')
      }, {
        title: 'Run ID',
        dataIndex: 'run_id',
      }, {
        title: 'OJ',
        dataIndex: 'oj_name',
        filters: Object.keys(OJ_MAP).map(
            oj => ({text:OJ_MAP[oj], value:oj})
        ),
        render: (oj, record)=>(
            <div>
                {OJ_MAP[oj]}<br/>
                {record.orgin_oj?`原${record.orgin_oj}`:null}
            </div>
        )
    },{
        title: <div>题目</div>,
        dataIndex: 'pro_id',
        ...this.getColumnSearchProps('pro_id')
    },{
        title: '语言',
        dataIndex: 'lang',
        render: (value, record) => (
          <CodeModal hint={value} code={record.code}/>
        )
    },{
        title: '结果',
        dataIndex: 'result',
        filters: [
          {text: 'OK', value:'ok'},
          {text: 'AC', value:'ac'},
          {text: 'Accepted', value:'accepted'},
        ],
        render: (value, record)=>{
          var fontColor = value[0]==='A'?'green':value[0]==='W'?'red':'blue'
          return <span style={{color:fontColor}}>{value}</span>
        }
    },{
        title: '运行时间',
        dataIndex: 'run_time',
        render: time=>(time<=0?null:<span>{time} MS</span>)
    },{
        title: '内存',
        dataIndex: 'memory',
    },{
        title: '提交时间',
        dataIndex: 'submitted_at',
        key: 'submitted_at',
        sorter: (a,b)=>{
            console.log(a,b)
            return a.id-b.id
        },
        sort_order: sorteredInfo.field==='submitted_at'&&sorteredInfo.order,
        sortDirections: ['descend', 'ascend'],
    }]
    return cols
}
    handleChange = (pagination,filters, sorter)=>{
        console.log('sorter', sorter)
        let search
        if('user_name' in filters) {
          search = filters['user_name'][0]
          delete filters.user_name
        }
        const params = {
          current_page: pagination.current,
          search,
          filters: JSON.stringify(filters),
          sort_field: sorter.field||'id',
          sort_order: sorter.order||'ascend',
        }
        this.props.history.replace({
          pathname:this.props.history.location.pathname,
          state: params
        })
    }
    render() {
        const {sorteredInfo, filteredInfo} = this.state
        return (
          <div>
            <Table dataSource={this.props.submits}
                rowKey={row=>row.id}
                rowClassName='row'
                size='small'
                loading={this.props.loading}
                columns={this.getColumns(sorteredInfo, filteredInfo)}
                onChange={this.handleChange}
                pagination={this.props.pagination}
            />
          </div>
        )
    }
}

const stateToProps=({submits, loading})=>{
  console.log(submits)
  return {
    loading: loading.models.submits,
    submits:submits.list,
    pagination: {
      current: submits.current_page,
      pageSize: submits.per,
      total: submits.total_count,
      showQuickJumper: true,
      showTotal: total=><span>共有{total}条记录</span>
    }
  }
}
export default withRouter(connect(stateToProps)(SubmitList))