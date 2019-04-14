import React from 'react';
import {
  Form, Icon, Input, Button, DatePicker, Select
} from 'antd';
import locale from 'antd/lib/date-picker/locale/uk_UA';
const Option = Select.Option;

class SignUpTab extends React.Component {

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const config = {
      rules: [{ type: 'object', required: true, message: 'Будь ласка введіть вашу дату народження' }],
    };
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item
          label="Пошта"
        >
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Будь ласка введіть вашу пошту!' }],
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>} type="email" placeholder="Пошта"/>
          )}
        </Form.Item>
        <Form.Item
          label="ПІБ"
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Будь ласка введіть ваш ПІБ!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                   placeholder="ПІБ"/>
          )}
        </Form.Item>
        <Form.Item
          label="Пароль"
        >
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Будь ласка введіть ваш пароль!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} type="password"
                   placeholder="Пароль"/>
          )}
        </Form.Item>
        <Form.Item
          label="Підтвердження паролю"
        >
          {getFieldDecorator('passwordConfirm', {
            rules: [{ required: true, message: 'Будь ласка підтвердіть ваш пароль!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} type="password"
                   placeholder="Підтвердження паролю"/>
          )}
        </Form.Item>
        <Form.Item
          label="Телефон"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Будь ласка введіть ваш телефон!' }],
          })(
            <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                   placeholder="Телефон"/>
          )}
        </Form.Item>
        <Form.Item
          label="Дата народження"
        >
          {getFieldDecorator('date-picker', config)(
            <DatePicker style={{ width: '100%' }} locale={locale}/>
          )}
        </Form.Item>
        <Form.Item
          label="Стать"
        >
          {getFieldDecorator('gender', {
            rules: [{ required: true, message: 'Будь ласка оберіть вашу стать!' }],
          })(
            <Select
              placeholder="Стать"
              onChange={this.handleSelectChange}
            >
              <Option value="male">Чоловіча</Option>
              <Option value="female">Жіноча</Option>
            </Select>
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

export default Form.create({ name: 'normal_login' })(SignUpTab);


