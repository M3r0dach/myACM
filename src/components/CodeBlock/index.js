import React from 'react'
import marked from "marked";
import Prism from 'prismjs'; 
import 'prismjs/themes/prism-okaidia.css';
import loadLanguages from 'prismjs/components/index';

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

class CodeBlock extends React.Component {
    render() {
        const str = '```cpp\n'+this.props.code+'\n```\n'
        console.log(str)
        const html = marked(str,{breaks:true})
        console.log(html)
        const container = document.createElement('div')
        container.innerHTML = html
        console.log(container)
        Prism.highlightAllUnder(container)
        console.log('hi')
        return <div dangerouslySetInnerHTML={{__html:container.innerHTML}}>
        </div>
    }
}
export default CodeBlock