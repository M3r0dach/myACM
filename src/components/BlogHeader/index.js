import React from 'react'
import { Tag } from "antd";
import "antd/dist/antd.css"
import styles from './index.css'
const BlogHeader=({blog})=>{
    console.log(styles)
    return (
        <div className={styles['blog-header']}>
            <h1>{blog.title}</h1>
            {blog.tags.map((tag,idx)=>
                <Tag key={idx} color="blue">{tag}</Tag>
            )}
            <span className={styles.user}>{blog.user?blog.user.name:''}</span>
            <span className={styles.time}>发布于{blog.created_at}</span>
        </div>
    )
}
export default BlogHeader
