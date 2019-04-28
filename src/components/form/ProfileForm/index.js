import React from "react";
import { Form, Col, Row, Input, Button, Checkbox, Radio, InputNumber} from "antd";
import { connect } from "dva";
import "antd/dist/antd.css"

class ProfileForm extends React.Component{
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of Profile Form: ', values);
        this.props.dispatch({
          type:'users/update',
          payload:{
            params: values,
            id:this.props.user.id
          }
        })
        this.props.onSubmit()
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
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout}>
        <Form.Item label='昵称'>
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请填写昵称' }]
          })(
            <Input placeholder="昵称" />
          )}
        </Form.Item>
        <Form.Item label='邮箱'>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: '请填写邮箱' }]
          })(
            <Input placeholder="邮箱" />
          )}
        </Form.Item>
        <Form.Item label='性别'>
          {getFieldDecorator('gender', {
            rules: [{ required: true}]
          })(
            <Radio.Group>
              <Radio value={true}>男</Radio>
              <Radio value={false}>女</Radio>
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label='学号'>
          {getFieldDecorator('stu_id')(
            <Input placeholder="学号" />
          )}
        </Form.Item>
        <Form.Item label='GitHub'>
          {getFieldDecorator('phone')(
            <Input placeholder="GitHub地址" />
          )}
        </Form.Item>
        <Form.Item label='Blog'>
          {getFieldDecorator('situation')(
            <Input placeholder="博客地址" />
          )}
        </Form.Item>
        <Form.Item label='专业年级'>
          <Row gutter={4}>
            <Col span={14}>
              {getFieldDecorator('major')(
                <Input placeholder="专业" />
              )}
            </Col>
            <Col span={4}>
              {getFieldDecorator('grade')(
                <InputNumber/>
              )}
            </Col>
            <Col span={2} offset={2}>级</Col>
          </Row>
        </Form.Item>
        <Form.Item label='个性签名'>
           {
             getFieldDecorator('description')(
               <Input.TextArea placeholder='描述'/>
             )
           }     
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
          提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
const stateToProps=({users})=>({user:users.currentUser})
const mapPropsToFields=({user})=>{
  return {
    nickname: Form.createFormField({
      value: user.nickname
    }),
    email: Form.createFormField({
      value: user.user_info.email
    }),
    gender: Form.createFormField({
      value: user.gender
    }),
    stu_id: Form.createFormField({
      value: user.user_info.stu_id
    }),
    phone: Form.createFormField({
      value: user.user_info.phone
    }),
    situation: Form.createFormField({
      value: user.user_info.situation
    }),
    major: Form.createFormField({
      value: user.user_info.major
    }),
    grade: Form.createFormField({
      value: user.user_info.grade
    }),
    description: Form.createFormField({
      value: user.description
    }),
  }
}
export default connect(stateToProps)(
  Form.create({
    name: 'ProfileForm',
    mapPropsToFields
  })(ProfileForm)
)
