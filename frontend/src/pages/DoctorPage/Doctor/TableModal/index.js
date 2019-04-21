import React from 'react';
import { connect } from 'react-redux';
import { Modal, Select, Form, Input, Button } from 'antd';
import { toggleTableModal, updateMedcardTable, createMedcardTableItem } from "actions/doctorActions";
import { updateMedcardItem, createMedcardItem, getTypes, searchUsers } from "api";

const Option = Select.Option;
const { TextArea } = Input;

const mapStateToProps = ({ doctorState, authState }) => {
  return {
    showModal: doctorState.showModal,
    editRow: doctorState.editRow,
    actionType: doctorState.actionType,
    token: authState.token,
    userId: authState.userId,
  }
};

class TableModal extends React.Component {
  state = {
    types: [],
    patients: [],
  };

  componentDidMount() {
    const { userId, token } = this.props;
    getTypes({ authorization: token })
      .then(types => {
        this.setState({ types })
      });

    searchUsers(userId, { name: "" }, { authorization: token })
      .then(data => {
        this.setState({
          patients: data
        })
      })

  }

  handleSubmit = (e) => {
    const { editRow, userId, dispatch, actionType, token } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if (actionType === 'edit') {
          updateMedcardItem(userId, editRow.id, values, { authorization: token })
            .then(resp => {
              dispatch(toggleTableModal());
              dispatch(updateMedcardTable(resp));
            });
        } else {
          createMedcardItem(userId, { ...values, creatorId: userId }, { authorization: token })
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
    const { types, patients } = this.state;
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
            {actionType === 'create' &&
            <React.Fragment>
              <Form.Item
                label="Пацієнт"
              >
                {getFieldDecorator('ownerId', {
                  rules: [{ required: true, message: 'Будь ласка оберіть пацієнта!' }]
                })(
                  <Select
                    showSearch
                    placeholder="Пацієнт"
                    optionFilterProp="children"
                  >
                    {patients.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                  </Select>
                )}
              </Form.Item>
              <Form.Item
                label="Тип"
              >
                {getFieldDecorator('typeId', {
                  rules: [{ required: true, message: 'Будь ласка оберіть тип!' }]
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
            </React.Fragment>
            }
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
