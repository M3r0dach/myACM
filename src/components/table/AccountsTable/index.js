import React from 'react'
import { Table, Divider, Popconfirm } from "antd";
import ModalFactory from "Components/ModalFactory";
import 'antd/dist/antd.css'
import "../../../index.css";
import { connect } from 'dva';


const AccountModal = ModalFactory.AccountModal

class AccountsTable extends React.Component {
    state = {
        user: null
    }
    static onUpdate(user, dispatch) {
        if(user&&user.id) {
            const filters = JSON.stringify({user_id:user.id})
            dispatch({
                type:'accounts/fetchList',
                payload: {filters},
            })
        }
    }
    static getDerivedStateFromProps(nextProps, preState) {
            console.log('next props')
        if(nextProps.user!=preState.user) {
            console.log('next props')
            AccountsTable.onUpdate(nextProps.user, nextProps.dispatch)
            return {user: nextProps.user}
        }
        return null
    }
    delete = id=>{
        this.props.dispatch({
            type:'accounts/delete',
            payload:id
        })
    }
    getColumns = ()=>{
        const columns = [{
                title: '账号',
                dataIndex: 'nickname',
            },{
                title: '状态',
                dataIndex: 'status',
                render: status=>(status==1?'正常':'更新')
            },{
                title: '关联用户',
                dataIndex: 'user.name'
            },{
                title: '信息',
                dataIndex: 'solved',
                render: (solved, record)=>(
                    <div>
                        Accepted:{record.solved}<br/>
                        Submitted:{record.submitted}
                    </div>
                )
            },{
                title: '更新时间',
                dataIndex: 'updated_at',
            }
        ]
        const extra = [{
                title:'操作',
                dataIndex: 'id',
                render: (id, record)=>{
                    return <div>
                        <AccountModal account={record}/>
                        <Divider type='vertical'/>
                        <Popconfirm title='确定要删除吗?'
                            onConfirm={()=>this.delete(id)}
                            okText='Yes' cancelText='No'>
                        删除
                        </Popconfirm>
                    </div>
                }
            }
        ] 
        return [...columns,...extra]
    }
    render() {
        return <div style={{textAlign:'left'}}>
                <AccountModal hint='添加账号' type='button'/>
                <Table columns={this.getColumns()}
                    rowKey={e=>e.id}
                    dataSource={this.props.accounts}
                    loading={this.props.loading}
                    size='small'
                    rowClassName='row'
                />
        </div>
    }
}
const stateToProps = ({accounts, users, loading})=>({
        accounts: accounts.list,
        user: users.displayUser,
        loading: loading.models.accounts,
    })
export default connect(stateToProps)(AccountsTable)