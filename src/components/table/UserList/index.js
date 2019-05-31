import { Component } from "react";
import { OJ_MAP } from "Models/accounts";
import { Table, Avatar, Tag } from "antd";
import { connect } from "dva";
import { withRouter } from "dva/router";
import UserLink from "Components/UserLink";
import { UserRole, UserStatus } from "Models/users";


const RoleTag = ({role})=>{
  if(role==UserRole.STUDENT) {
    return <Tag color='#108ee9'>学生</Tag>
  }else if(role==UserRole.COACH) {
    return <Tag color='#00ff00'>教练</Tag>
  }else return <Tag color='#ff0000'>管理员</Tag>
}
const StatusTag = ({status})=>{
  if(status==UserStatus.EJECT) {
    return <Tag color='red'>拒绝</Tag>
  } else if(status==UserStatus.APPLY) {
    return <Tag color='blue'>申请中</Tag>
  } else if(status==UserStatus.TRAIN) {
    return <Tag color='green'>训练中</Tag>
  } else {
    return <Tag>已退役</Tag>
  }
}
const getColumns = () => {
  return [{
    title: '头像',
    dataIndex: 'avatar.origin',
    render: (avatar)=> <Avatar shape='circle' size='large' src={avatar}/>
  },{
    title: '姓名',
    dataIndex: 'display_name',
    render: (value, record)=>{
      return <div style={{height:60, width:80, textAlign:'center'}}>
        <h3>{record.display_name}</h3>
        <Tag color='blue'>{record.nickname}</Tag>
      </div>
    }
  },{
    title: '性别',
    dataIndex: 'gender',
    render: (gender)=>gender?'男':'女',
  },{
    title: '身份',
    dataIndex: 'role',
    render: role=><RoleTag role={role}/>
  },{
    title: '状态',
    dataIndex: 'status',
    render(status) {
      return <StatusTag status={status}/>
    }
  },{
    title: '学院',
    dataIndex: 'user_info',
    render: (user_info)=>{
      return <div>
        {user_info.major}{user_info.grade?user_info.grade+'级':null}
      </div>
    }
  },{
    title: '联系方式',
    dataIndex: 'user_info',
    render: (user_info)=>{
      return user_info.email
    }
  },{
    title: '操作',
    dataIndex: 'id',
    render: id=>{
      return <div><span>修改</span>|<span>删除</span></div>
    }
  }]
};

class UserList extends Component{
    handleTableChange = (pagination, filters, sorter)=>{
      console.log('pagination')
      console.log(pagination)
      /*
      const params = {
        current_page: pagination.current
      }
      this.props.history.replace({
          pathname:this.props.history.location.pathname,
          state: params
      })
      */
    }
    render() {
      console.log(this.props.users)
      return <div style={{marginTop:30}}>
          <Table columns={getColumns()}
              dataSource={this.props.users}
              size='small'
              rowClassName='row'
              loading={this.props.loading}
              pagination={this.props.pagination}
              onChange = {this.handleTableChange}
          />
      </div>
    }
}
const stateToProps=({users, loading})=>{
  return {
    loading: loading.models.users,
    users: users.list,
    pagination: {
      current: users.current_page,
      pageSize: users.per,
      total: users.total_count,
      showQuickJumper: true,
      showTotal: total => <span>共有 {total}个用户</span>,
    }
  }
}
export default connect(stateToProps)(UserList)