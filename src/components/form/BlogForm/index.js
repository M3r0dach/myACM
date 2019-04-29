import React from "react";
import { Form, Input, Button} from "antd";
import "antd/dist/antd.css"
import MarkdownEditor from "../../MarkdownEditor";
import TagInput from "../../TagInput";
import { BlogStatus} from "Models/blogs";

class BlogForm extends React.Component{
  state = {
    status: BlogStatus.PUBLISH//发布的类型
  }
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit({
          status:this.state.status,
          article_type: "Solution",
          ...values
        })
      }
    });
  }
  render() {
    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      }
    }
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 20,
          offset: 4,
        }
      }
    }
    const { getFieldDecorator } = this.props.form;
    return (
        <Form onSubmit={this.handleSubmit} {...formItemLayout}>
          <Form.Item label='标题'>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: '请填写标题' }],
            })( <Input placeholder="标题" />)}
          </Form.Item>
          <Form.Item label='标签'>
            { getFieldDecorator('tags',{
                initialValue: []
              })( <TagInput/>)
            }
          </Form.Item>
          <Form.Item label='正文'>
            {
              getFieldDecorator('content',{
                rules: [{ required: true, message: '内容不能为空' }],
              })( <MarkdownEditor/>)
            }     
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button onClick={()=>this.setState({status: BlogStatus.PUBLISH})}
                type="primary"
                htmlType="submit"
            >
            发布
            </Button>
            <Button onClick={()=>this.setState({status: BlogStatus.DRAFT})}
                htmlType='submit'
                style={{marginLeft:10}}
            >
            存到草稿
            </Button>
          </Form.Item>
        </Form>
    );
  }
}
const mapPropsToFields = props=>{
  return {
    title: Form.createFormField({
      value: props.blog.title
    }),
    tags: Form.createFormField({
      value: props.blog.tags
    }),
    content: Form.createFormField({
      value: props.blog.content
    }),
  }
}
export default Form.create({
    name: 'BlogForm',
    mapPropsToFields
})(BlogForm)
