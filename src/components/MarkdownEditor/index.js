import React, { PureComponent } from 'react';
import cookie from 'cookie';
import SimpleMDEEditor from 'yt-simplemde-editor';
import marked from 'marked';
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

class MarkdownEditor extends React.Component {
  state = {
    value: '',
  }
  static getDerivedStateFromProps(nextProps, preState) {
    const {value} = nextProps;
    if(value!=preState.value) {
      return {value}
    }
    return null
  }

  handleChange = value=>{
    console.log('mde props',this.props)
    this.props.onChange(value)
  }
  renderMarkdown = text => {
    const html = marked(text, { breaks: true });
    if (/language-/.test(html)) {
      console.log('use prism')
      const container = document.createElement('div');
      container.innerHTML = html;
      Prism.highlightAllUnder(container);
      return container.innerHTML;
    }

    return html;
  };

  render () {
    const editorProps = {
      value: this.state.value,
      getMdeInstance: simplemde => {
        this.simplemde = simplemde;
      },
      onChange: this.handleChange,
      options: {
        spellChecker: false,
        forceSync: true,
        autosave: {
          enabled: false,
          delay: 5000,
          uniqueId: 'article_content',
        },
        renderingConfig: {
          // codeSyntaxHighlighting: true,
        },
        previewRender: this.renderMarkdown, // 自定义预览渲染
        tabSize: 4,
        toolbar: [
          'bold',
          'italic',
          'heading',
          '|',
          'quote',
          'code',
          'table',
          'horizontal-rule',
          'unordered-list',
          'ordered-list',
          '|',
          'link',
          'image',
          '|',
          'side-by-side',
          'fullscreen',
          '|',
          {
            name: 'guide',
            action () {
              const win = window.open(
                'https://github.com/riku/Markdown-Syntax-CN/blob/master/syntax.md',
                '_blank',
              );
              if (win) {
                // Browser has allowed it to be opened
                win.focus();
              }
            },
            className: 'fa fa-info-circle',
            title: 'Markdown 语法！',
          },
        ],
      },
      uploadOptions: {
        uploadUrl: '/api/attachment/upload',
        jsonFieldName: 'data.filename',
        extraHeaders: {
          Accept: 'application/x.sheng.v1+json',
          'X-XSRF-TOKEN': cookie.parse(document.cookie)['XSRF-TOKEN'],
        },
      },
    };

    return (
      <div>
        <SimpleMDEEditor {...editorProps} />
      </div>
    )
  }
}

export default MarkdownEditor;