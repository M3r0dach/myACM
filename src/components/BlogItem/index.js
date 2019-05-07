import React from "react";
import { List} from "antd";
import Link from '../Link'
import IconText from '../IconText'
import 'antd/dist/antd.css'
import {BlogDetailRoute} from "../../config"
const Tail = ({author, created_at})=>(
    <div>{author?<span style={{color:'green'}}>{author}</span>:''} 发布于{created_at}</div>
)
const BlogItem = ({blog, onLike})=>{
    const href = `${BlogDetailRoute}/${blog.id}`
    return (
            <div>
                <List.Item
                    style={{marginBottom:30, border: 4, borderColor: 'black', padding:10}}
                    actions={[
                        <IconText type='like'
                            text={blog.like_times}
                            onClick={onLike}/>,
                        <Tail author={blog.user.name}
                            created_at={blog.created_at}/>
                    ]}
                >
                    <List.Item.Meta
                        title={<Link to={href}><h1><b>{blog.title}</b></h1></Link>}
                        description={blog.summary+'...'}
                    />
                </List.Item>
                <hr/>
            </div>
    )
}
export default BlogItem