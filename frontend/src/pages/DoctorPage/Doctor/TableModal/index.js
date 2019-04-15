import React from 'react';
import { connect } from 'react-redux';
import { Modal, Select, Form, Input, Button } from 'antd';
import { toggleTableModal, updateMedcardTable, createMedcardTableItem } from "actions/doctorActions";
import { updateMedcardItem, createMedcardItem, getTypes } from "api";

const Option = Select.Option;
const { TextArea } = Input;

const mapStateToProps = ({ doctorState }) => {
  return {
    showModal: doctorState.showModal,
    editRow: doctorState.editRow,
    testId: doctorState.testId,
    actionType: doctorState.actionType,
  }
};

class TableModal extends React.Component {
  state = {
    types: []
  };

  componentDidMount() {
    getTypes()
      .then(types => {
        this.setState({ types })
      })
  }

  handleSubmit = (e) => {
    const { editRow, testId, dispatch, actionType } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (actionType === 'edit') {
          updateMedcardItem(testId, editRow.id, values)
            .then(resp => {
              dispatch(toggleTableModal());
              dispatch(updateMedcardTable(resp));
            });
        } else {
          createMedcardItem(testId, { ...values, ownerId: 3, creatorId: testId })
            .then(resp => {
              dispatch(toggleTableModal());
              dispatch(createMedcardTableItem(resp));
            });
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { showModal, dispatch, editRow, actionType } = this.props;
    const { types } = this.state;
    return (
      <Modal
        visible={showModal}
        onCancel={() => dispatch(toggleTableModal())}
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
                initialValue: actionType === 'edit' ? editRow.title : ""
              })(
                <Input type="text" placeholder="Назва"/>
              )}
            </Form.Item>
            <Form.Item
              label="Опис"
            >
              {getFieldDecorator('description', {
                rules: [{ required: true, message: 'Будь ласка введіть опис!' }],
                initialValue: actionType === 'edit' ? editRow.description : ""
              })(
                <TextArea type="text" placeholder="Опис" autosize={{ minRows: 2, maxRows: 10 }}/>
              )}
            </Form.Item>
            <Form.Item
              label="Тип"
            >
              {getFieldDecorator('typeId', {
                rules: [{ required: true, message: 'Будь ласка оберіть тип!' }],
                initialValue: actionType === 'edit' ? editRow.type.id : ""
              })(
                <Select
                  showSearch
                  placeholder="Тип"
                  optionFilterProp="children"
                >
                  {types.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                </Select>
              )}
            </Form.Item>
            <Form.Item
              label="Висновки"
            >
              {getFieldDecorator('result', {
                initialValue: actionType === 'edit' ? editRow.result : ""
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

export default connect(mapStateToProps)(Form.create({ name: 'edit_table' })(TableModal));
