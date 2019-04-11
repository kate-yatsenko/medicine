import React from 'react';
import {
  Form, Icon, Input, Button,
} from 'antd';

class LoginTab extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Будь ласка введіть вашу пошту!' }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>} type="email" placeholder="Пошта"/>
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Будь ласка введіть ваш пароль!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} type="password"
                   placeholder="Пароль"/>
          )}
        </Form.Item>
        <Form.Item className="d-flex justify-content-center">
          <Button type="primary" htmlType="submit" className="login-form-button">
            Продовжити
          </Button>
        </Form.Item>
      </Form>
    );
  }
};

export default Form.create({ name: 'normal_login' })(LoginTab);


