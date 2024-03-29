import React from 'react'
import { Table, Divider, Button, Popconfirm } from "antd";
import Link from "Components/Link";
import { BlogStatus } from "Models/blogs";
import { connect } from 'dva';
import { withRouter, routerRedux } from "dva/router";

class BlogTable extends React.Component {
    state = {
        user: null
    }
    static onUpdate(user, dispatch) {
        if(user&&user.id) {
            const filters = JSON.stringify({
                user_id:user.id,
                article_type: 'Solution'
            })
            dispatch({
                type:'blogs/fetchList',
                payload: {filters},
            })
        }
    }
    static getDerivedStateFromProps(nextProps, preState) {
        if(nextProps.user!=preState.user) {
            console.log('next props')
            BlogTable.onUpdate(nextProps.user, nextProps.dispatch)
            return {user: nextProps.user}
        }
        return null
    }
    modify = id=>{
        console.log('modify '+id)
        this.props.history.replace('/principle/blog/edit/'+id)
    }
    delete = id=>{
        this.props.dispatch({type:'blogs/delete', payload:id})
    }
    preview = id=>{
        alert('preview '+id)
    }
    publish = id=>{
        alert('preview '+id)
    }
    getColumns = ()=>{
        const columns = [{
                title: '标题',
                dataIndex: 'title',
            },{
                title: '状态',
                dataIndex: 'status',
                render: status=>(status==BlogStatus.DRAFT?'草稿':'发布')
            },{
                title: '作者',
                dataIndex: 'user.name'
            },{
                title: '创建/修改时间',
                dataIndex: 'created_at',
                render: (time, records)=>{
                    return <div>
                        创建: {records.created_at}<br/>
                        更新: {records.updated_at}
                    </div>
                }
            }
        ]
        const extra = [{
                title:'操作',
                dataIndex: 'id',
                render: id=>{
                    return <div>
                        <span onClick={
                            ()=>this.modify(id)
                            }>修改</span>
                        <Divider type='vertical'/>
                        <Popconfirm title='确定要删除吗?'
                            onConfirm={()=>this.delete(id)}
                            okText='Yes' cancelText='No'>
                        删除
                        </Popconfirm>
                        <Divider type='vertical'/>
                        <span onClick={
                            ()=>this.preview(id)
                            }>预览</span>
                        <Divider type='vertical'/>
                        <span onClick={
                            ()=>this.publish(id)
                            }>发布</span>
                    </div>
                }
            }
        ] 
        if(this.props.guest) return columns
        return [...columns,...extra]
    }
    renderButton() {
        if(this.props.guest) return null
        return (
            <Button type='primary'>
                <Link to='/principle/blog/create'>
                    发表文章
                </Link>
            </Button>
        )
    }
    render() {
        return <div>
            {this.renderButton()}
            <Table columns={this.getColumns()}
                dataSource={this.props.blogs}
                size='small'
                rowClassName='row'
                rowKey={row=>row.id}
            />
        </div>
    }
}

const stateToProps = ({blogs, users, loading}) => ({
    blogs: blogs.list,
    user: users.displayUser,
    guest: users.displayUser.id!=users.currentUser.id,
    loading: loading.models.blogs,
})
export default withRouter(connect(stateToProps)(BlogTable))