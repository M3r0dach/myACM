import React from "react";
import { Form,  Input, Button, Select, } from "antd";
import 'antd/dist/antd.css'
import { connect } from "dva";
import {OJ_MAP} from '../../../config'

const Option = Select.Option
class AccountForm extends  React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const id = this.props.account.id
        if(id) {
          this.props.dispatch({
            type: 'accounts/update',
            payload: {
              ...values,
              id
            }
          })
        } else {
          this.props.dispatch({
            type: 'accounts/create',
            payload: values
          })
        }
        this.props.onSubmit()
      }
    });
  }
  renderSelector() {
    const children = Object.entries(OJ_MAP).map(
      item=>(
        <Option key={item[0]} value={item[0]}>
          {item[1]}
        </Option>
      )
    )
    return  <Select>
              {children}
            </Select>
  }
  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: {span: 24},
        sm: {span: 4},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 20},
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
    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout} >
        <Form.Item label='OJ'>
          {getFieldDecorator('oj_name', {
            rules: [{ required: true, message: '请选择对应OJ!' }],
          })(
            this.renderSelector()
          )}
        </Form.Item>
        <Form.Item label='账号昵称'>
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请填写账号昵称!' }],
          })(
            <Input placeholder='账号昵称'/>
          )}
        </Form.Item>
        <Form.Item label='账号密码'>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请填写账号密码!' }],
          })(
            <Input.Password placeholder='账号密码'/>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const mapPropsToFields=({account})=>{
  return {
    oj_name: Form.createFormField({
      value: account.oj_name
    }),
    nickname: Form.createFormField({
      value: account.nickname
    }),
  }
}
export default connect()(
  Form.create({
     name: 'account_modify' ,
     mapPropsToFields
  })(AccountForm)
)
