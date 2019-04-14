import React from 'react';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { toggleTableModal, setEditRow } from "actions/doctorActions";

import './style.scss';

class AddButton extends React.Component {

  openCreateModal = () => {
    const { dispatch } = this.props;
    dispatch(setEditRow({}, 'create'));
    dispatch(toggleTableModal());
  };

  render() {
    return (
      <Button className="add-button" onClick={this.openCreateModal}>Додати запис до медкарти</Button>
    );
  }
}

export default connect()(AddButton);
