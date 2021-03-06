import React from 'react';
import {
  Form, Icon, Input, Button, DatePicker, Select
} from 'antd';
import locale from 'antd/lib/date-picker/locale/uk_UA';
import { fillInPersonalData } from 'api';
import { toggleAuthModalVisible, updateUserInfo } from 'actions/authActions';
import { connect } from 'react-redux';

const Option = Select.Option;

const mapStateToProps = ({ authState }) => {
  return {
    token: authState.token,
    userId: authState.userId,
    userName: authState.userName,
    userEmail: authState.userEmail,
  }
};

class SignUpTab extends React.Component {

  handleSubmit = (e) => {
    const { token, userId, dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fillInPersonalData(userId, values, { authorization: token })
          .then(data => {
            dispatch(toggleAuthModalVisible());
            dispatch(updateUserInfo({
              isProfileComplete: true,
              userName: data.name
            }));
            localStorage.setItem('isProfileComplete', 'true');
            localStorage.setItem('userName', data.name);
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { userName, userEmail } = this.props;

    const config = {
      rules: [{ type: 'object', required: true, message: 'Будь ласка введіть вашу дату народження' }],
    };
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item
          label="Пошта"
        >
          {getFieldDecorator('email', {
            initialValue: userEmail ? userEmail : ""
          })(
            <Input prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>} disabled={true} type="email" placeholder="Пошта"/>
          )}
        </Form.Item>
        <Form.Item
          label="ПІБ"
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Будь ласка введіть ваш ПІБ!' }],
            initialValue: userName ? userName : ""
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                   placeholder="ПІБ"/>
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
          label="Адреса"
        >
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'Будь ласка введіть вашу адресу!' }],
          })(
            <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }}/>}
                   placeholder="Адреса"/>
          )}
        </Form.Item>
        <Form.Item
          label="Дата народження"
        >
          {getFieldDecorator('birth', config)(
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
              <Option value="M">Чоловіча</Option>
              <Option value="F">Жіноча</Option>
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
}

export default connect(mapStateToProps)(Form.create({ name: 'normal_login' })(SignUpTab));


