import React from "react";
import { Breadcrumb} from "antd";
import { connect } from "dva";
import { Link } from "dva/router";
import BlogForm from "Components/form/BlogForm";

class BlogEdit extends React.Component{
  handleSubmit = (payload)=>{
    const id = this.props.blog.id
    if(id) {
      this.props.dispatch({type:'blogs/update', payload: {...payload, id}})
      console.log('修改文章')
    }else {
      this.props.dispatch({type:'blogs/create', payload})
      console.log('创建文章')
    }
    this.props.history.replace('/principle')
  }
  render() {
    return (
      <div style={{background:'white'}}>
        <Breadcrumb style={{marginBottom:30}}>
          <Breadcrumb.Item key='home'><Link to='/principle'>个人主页</Link></Breadcrumb.Item>
          <Breadcrumb.Item key='blog'>发布解题报告</Breadcrumb.Item>
        </Breadcrumb>
        <BlogForm blog={this.props.blog} onSubmit={this.handleSubmit}/>
      </div>
    );
  }
}

const stateToProps=({blogs})=>({blog:blogs.currentItem})
export default connect(stateToProps)(BlogEdit)