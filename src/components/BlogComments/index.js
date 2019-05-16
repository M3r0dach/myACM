import React from 'react'
import { Comment, Avatar, List } from "antd";
import Editor from '../Editor';
import {connect} from 'dva'


class BlogComments extends React.Component {
    state={
        commentValue: '',
        replyValue: '',
        currentUser:this.props.currentUser,
        replyTarget:-1,
        currentBlog: this.props.blog
    }
    static getDerivedStateFromProps(nextProps, preState) {
        if(nextProps.blog!=preState.currentBlog) {
            return {
                currentBlog: nextProps.blog,
                currentUser: nextProps.currentUser,
            }
        }
        return null
    }
    onTypingComment = (e, valueKey)=>{
        this.setState({[valueKey]:e.target.value})
    }
    onPostComment = (e, valueKey, target)=>{
        var value = this.state[valueKey]
        var user = this.state.currentUser
        var blogID = this.state.currentBlog.id
        this.setState({
                commentValue: '',
                replyValue: '',
            })
        this.props.dispatch({
            type:'comments/create', 
            payload:{
                id: blogID,
                params: {
                    description: value,
                    parent_id: target==-1?null:target
                }
            }
        })
    }
    renderEditor = ( valueKey, target=-1)=>{
        return <Editor value={this.state[valueKey]}
            onChange={e=>this.onTypingComment(e, valueKey)}
            onSubmit={e=>this.onPostComment(e, valueKey, target)}
        />
    }
    renderSubCommnt = item=>{
        return <Comment style={{color:'gray', border:1}}
                    author={`回复　${item.user_name}`}
                    content={item.description}
                />
    }
    renderComment = item => {
        const handleClick= e => {
            const target = this.state.replyTarget
            this.setState({replyTarget:target==-1?item.id:-1})
            console.log(item.id)
        }
        return <Comment author={item.user_name}
                    avatar={<Avatar src={item.user_avatar}/>}
                    actions={[<a onClick={handleClick}>回复</a>]}
                    content={
                        <div>
                            {item.parent_comment?
                                this.renderSubCommnt(item.parent_comment):null}
                            {item.description}
                            {this.state.replyTarget==item.id?this.renderEditor('replyValue', item.id):null}
                        </div>
                    }
                    datetime={item.created_at}
                />
    }
    render() {
        const comments = this.props.comments
            .sort((x,y)=>x.created_at<=y.created_at?1:-1)
        
        return <div>
            <Comment avatar={<Avatar src={this.state.avator} />}
                content={this.renderEditor('commentValue',-1)}
            />
            {
                comments.length? <List header={`${comments.length} 条评论`}
                    dataSource={comments}
                    renderItem={this.renderComment}
                />:null
            }
        </div>
    }
}
const stateToProps = ({comments, users, blogs})=>{
    console.log('blogs',blogs)
    return {
        comments: comments.list,
        currentUser: users.currentUser,
        blog: blogs.currentItem
    }
}
export default connect(stateToProps)(BlogComments);