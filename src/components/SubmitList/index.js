import { Component } from "react";
import { OJ_MAP } from "../../models/accounts";
import { Icon, Table, Modal, Input, Button} from "antd";
import CodeBlock from "../CodeBlock";
import { connect } from "dva";
import { withRouter } from "dva/router";
import "../../index.css";

class SubmitList extends Component{
    state = {
        showCode: false,
        activeRecord: {},
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
            onChange={e=>{
              setSelectedKeys([e.target.value])
              console.log('selectedKeys')
              console.log(selectedKeys)
            }}
            onPressEnter={()=>this.handleSearch(selectedKeys, confirm)}
            style={{width:188, marginBottom:8, display:'block'}}
          />
          <Button
            type='primary'
            onClick={()=>this.handleSearch(selectedKeys, confirm)}
            icon='search'
            size='small'
            style={{width:90, marginRight:8}}
          >Search</Button>
          <Button
            onClick={()=>this.handleReset(clearFilters)}
            size='small' style={{width:90}}
          >Reset</Button>
        </div>
      ),
      filterIcon: filtered => <Icon type='search' style={{color: filtered?'#1890ff':undefined}}/>,
      onFilter: (value, record)=>record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    })
    handleSearch = (selectedKeys, confirm) => {
      confirm()
    }
    handleReset = (clearFilters) => {
      clearFilters();
    }
    getColumns=(sorteredInfo, filteredInfo, operation)=>{
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
        filteredValue: filteredInfo.oj_name||[],
        onFilter: (value, record)=>record.oj_name.includes(value),
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
          <span style={{color:'blue'}} onClick={()=>operation.onShowCode(record)}>
            {value}
          </span>
        )
    },{
        title: '结果',
        dataIndex: 'result',
        filters: [
          {text: 'OK', value:'ok'},
          {text: 'AC', value:'ac'},
        ],
        filteredValue: filteredInfo.result||[],
        onFilter: (value, record)=>(record.result.toLowerCase().includes(value)),
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
        sortOrder: sorteredInfo.field==='submitted_at'&&sorteredInfo.order,
        sortDirections: ['descend', 'ascend'],
    }]
    return cols
}
    onShowCode = record =>{
        this.setState({
            showCode:true,
            activeRecord:record
        })
        console.log(this.state)
    }
    handleChange = (pagination,filters, sorter)=>{
        this.setState({filteredInfo:filters,sorteredInfo:sorter})
        const params = {
          current_page: pagination.current
        }
        this.props.history.replace({
          pathname:this.props.history.location.pathname,
          state: params
        })
        //this.setState({sortedInfo:sorter})
    }
    renderCodeModal = ()=>{
      const onClick = ()=>{
        this.setState({showCode:false})
      }
      const code = this.state.activeRecord.code||null
      return <Modal title='查看代码'
              visible={this.state.showCode}
              footer={null} onCancel={onClick}>
        <CodeBlock code={code}/>
      </Modal>
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
                columns={this.getColumns(sorteredInfo, filteredInfo, {onShowCode:this.onShowCode})}
                onChange={this.handleChange}
                pagination={this.props.pagination}
            />
            {this.renderCodeModal()}
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