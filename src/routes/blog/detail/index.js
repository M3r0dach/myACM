import React from "react";
import BlogHeader from "../../../components/BlogHeader";
import BlogComments from "../../../components/BlogComments";
import marked from "marked";
import Prism from 'prismjs'; 
import 'prismjs/themes/prism-okaidia.css';
import loadLanguages from 'prismjs/components/index';
import { connect } from "dva";
import styles from './index.less'

loadLanguages([
  'cpp',
  'css',
  'javascript',
  'bash',
  'git',
  'ini',
  'java',
  'json',
  'less',
  'markdown',
  'php',
  'php-extras',
  'python',
  'jsx',
  'tsx',
  'scss',
  'sql',
  'vim',
  'yaml',
]);

class BlogDetail extends React.Component{
    render() {
        const {blog} = this.props
        const content = blog.content||''
        var html = marked(content)
        const container = document.createElement('div')
        container.innerHTML = html
        Prism.highlightAllUnder(container)
        return <div style={{
                background:'white',
                padding:10,
                borderRadius: 5,
                width: '80%',
                margin: 'auto'
            }}>
            <BlogHeader blog={blog}/>
            <div className={styles['blog-content']}
                dangerouslySetInnerHTML={{__html:container.innerHTML}}/>
            <BlogComments/>
        </div>
    }
}
const stateToProps = ({blogs})=>({blog:blogs.currentItem})
export default connect(stateToProps)(BlogDetail)