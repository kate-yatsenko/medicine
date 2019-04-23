import React from 'react';
import {
  Form, Icon, Input, Button, DatePicker, Select
} from 'antd';
import locale from 'antd/lib/date-picker/locale/uk_UA';
import { getPersonalData, fillInPersonalData } from 'api';
import { toggleUpdateModalVisible, updateUserInfo, updateProfileData } from 'actions/authActions';
import { connect } from 'react-redux';
import moment from 'moment';

const Option = Select.Option;

const mapStateToProps = ({ authState }) => {
  return {
    token: authState.token,
    userId: authState.userId,
    updateProfileData: authState.updateProfileData,
  }
};

class UpdateProfile extends React.Component {

  componentDidMount() {
    const { token, userId, dispatch } = this.props;
    getPersonalData(userId, { authorization: token })
      .then(data => {
        dispatch(updateProfileData(data));
      })
  }

  handleSubmit = (e) => {
    const { token, userId, dispatch } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        fillInPersonalData(userId, values, { authorization: token })
          .then(data => {
            dispatch(toggleUpdateModalVisible());
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

  componentDidUpdate(prevProps) {
    const { updateProfileData } = this.props;
    if (JSON.stringify(prevProps.updateProfileData) !== JSON.stringify(updateProfileData)) {
      const { name, email, phone, address, gender, birth } = updateProfileData;
      this.props.form.setFieldsValue({
        birth: moment(birth),
        name: name,
        email: email,
        phone: phone,
        address: address,
        gender: gender,
      })
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { updateProfileData } = this.props;
    const { name, email, phone, address, gender, birth } = updateProfileData;

    const config = {
      rules: [{ type: 'object', required: true, message: 'Будь ласка введіть вашу дату народження' }],
      initialValue: moment(birth),
    };
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item
          label="Пошта"
        >
          {getFieldDecorator('email', {
            initialValue: email,
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }}/>}
              disabled={true}
              type="email"
              placeholder="Пошта"
            />
          )}
        </Form.Item>
        <Form.Item
          label="ПІБ"
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Будь ласка введіть ваш ПІБ!' }],
            initialValue: name,
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}
              type="text"
              placeholder="ПІБ"
            />
          )}
        </Form.Item>
        <Form.Item
          label="Телефон"
        >
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Будь ласка введіть ваш телефон!' }],
            initialValue: phone,
          })(
            <Input
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }}/>}
              placeholder="Телефон"
            />
          )}
        </Form.Item>
        <Form.Item
          label="Адреса"
        >
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'Будь ласка введіть вашу адресу!' }],
            initialValue: address,
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
            initialValue: gender,
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

export default connect(mapStateToProps)(Form.create({ name: 'update_profile' })(UpdateProfile));


