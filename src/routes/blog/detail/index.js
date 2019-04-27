import React from "react";
import BlogHeader from "../../../components/BlogHeader";
import BlogComments from "../../../components/BlogComments";
import marked from "marked";
import { connect } from "dva";
import styles from './index.less'

class BlogDetail extends React.Component{
    render() {
        const {blog} = this.props
        const content = blog.content||''
        var html = marked(content)
        return <div>
            <BlogHeader blog={blog}/>
            <div className={styles['blog-content']}
                dangerouslySetInnerHTML={{__html:html}}/>
            <BlogComments/>
        </div>
    }
}
const stateToProps = ({blogs})=>({blog:blogs.currentItem})
export default connect(stateToProps)(BlogDetail)