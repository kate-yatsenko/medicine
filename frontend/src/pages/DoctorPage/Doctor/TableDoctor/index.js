import React from 'react';
import { tableData } from './data.json';
import { connect } from 'react-redux';
import moment from 'moment';
import { Typography, Icon, Tooltip, Table } from 'antd';
import { toggleEditTableModal, setEditRow } from 'actions/doctorActions';
import './style.scss';

const { Paragraph } = Typography;

class TableDoctor extends React.Component {

  expandedRowRender = (record) => {
    return (
      <React.Fragment>
        <Paragraph>Опис: {record.description}</Paragraph>
        <Paragraph>Висновки: {record.result}</Paragraph>
      </React.Fragment>
    );
  };

  openEditModal = (record) => {
    const { dispatch } = this.props;
    dispatch(toggleEditTableModal());
    dispatch(setEditRow(record));
  };

  render() {
    const columns = [
      {
        title: 'Дата',
        dataIndex: 'created',
        align: 'center',
        render: (text, record) => moment(record.created).format('DD-MM-YYYY')
      }, {
        title: 'Пацієнт',
        dataIndex: 'patient',
        align: 'center',
      }, {
        title: 'Назва',
        dataIndex: 'title',
        align: 'center',
      }, {
        title: 'Дії',
        align: 'center',
        render: (text, record) => (
          <Tooltip placement="top" title="Редагувати">
            <Icon type="edit" onClick={() => this.openEditModal(record)} className="table-edit"/>
          </Tooltip>
        )
      }
    ];

    return (
      <div>
        <Table
          columns={columns}
          dataSource={tableData}
          bordered
          className="table"
          expandedRowRender={this.expandedRowRender}
          scroll={{ x: '1300' }}
        />
      </div>
    );
  }
}

export default connect()(TableDoctor);
