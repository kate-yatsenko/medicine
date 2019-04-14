import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { toggleEditTableModal } from "actions/doctorActions";
import {
  Form, Input, Button
} from 'antd';

const { TextArea } = Input;

const mapStateToProps = ({ doctorState }) => {
  return {
    showEditModal: doctorState.showEditModal,
    editRow: doctorState.editRow,
  }
};

class TableEditModal extends React.Component {

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
    const { showEditModal, dispatch, editRow } = this.props;
    return (
      <Modal
        visible={showEditModal}
        onCancel={() => dispatch(toggleEditTableModal())}
        footer={null}
        title="Редагування запису"
      >
        {editRow &&
        <div className="edit-form">
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item
              label="Назва"
            >
              {getFieldDecorator('title', {
                rules: [{ required: true, message: 'Будь ласка введіть назву!' }],
                initialValue: editRow.title
              })(
                <Input type="text" placeholder="Назва"/>
              )}
            </Form.Item>
            <Form.Item
              label="Опис"
            >
              {getFieldDecorator('description', {
                rules: [{ required: true, message: 'Будь ласка введіть опис!' }],
                initialValue: editRow.description
              })(
                <TextArea type="text" placeholder="Опис" autosize={{ minRows: 2, maxRows: 10 }}/>
              )}
            </Form.Item>
            <Form.Item
              label="Висновки"
            >
              {getFieldDecorator('result', {
                initialValue: editRow.result
              })(
              <TextArea type="text" placeholder="Результат" autosize={{ minRows: 2, maxRows: 10 }}/>
              )}
            </Form.Item>
            <Form.Item className="d-flex justify-content-center">
              <Button type="primary" htmlType="submit" className="login-form-button">
                Продовжити
              </Button>
            </Form.Item>
          </Form>
        </div>
        }
      </Modal>
    )
  }
}

export default connect(mapStateToProps)(Form.create({ name: 'edit_table' })(TableEditModal));
