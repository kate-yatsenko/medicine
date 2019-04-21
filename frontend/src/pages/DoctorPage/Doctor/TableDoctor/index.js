import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Typography, Icon, Tooltip, Table } from 'antd';
import { toggleTableModal, setEditRow, setMedcardData, toggleTableLoading, setPage } from 'actions/doctorActions';
import { getDoctorMedcardData } from 'api';

import './style.scss';

const mapStateToProps = ({ doctorState, authState }) => {
  return {
    medcardData: doctorState.medcardData,
    loading: doctorState.loading,
    total: doctorState.total,
    page: doctorState.page,
    token: authState.token,
    userId: authState.userId,
  }
};

const { Paragraph } = Typography;

class TableDoctor extends React.Component {

  componentDidMount() {
    const { userId, dispatch, page, token } = this.props;
    dispatch(toggleTableLoading());
    getDoctorMedcardData(userId, { p: page }, { authorization: token })
      .then(data => {
        dispatch(toggleTableLoading());
        dispatch(setMedcardData(data.entries, Number(data.total)));
      })
  }

  expandedRowRender = (record) => {
    return (
      <div className="result-block">
        <Paragraph>Опис: {record.description}</Paragraph>
        <Paragraph>Висновки: {record.result}</Paragraph>
      </div>
    );
  };

  openEditModal = (record) => {
    const { dispatch } = this.props;
    dispatch(setEditRow(record, 'edit'));
    dispatch(toggleTableModal());
  };

  tableChange = (pagination) => {
    const { userId, dispatch, token } = this.props;
    const { current } = pagination;
    dispatch(toggleTableLoading());
    getDoctorMedcardData(userId, { p: current }, { authorization: token })
      .then(data => {
        dispatch(toggleTableLoading());
        dispatch(setMedcardData(data.entries, Number(data.total)));
        dispatch(setPage(current));
      })
  };

  render() {
    const { medcardData, loading, total, page } = this.props;

    const columns = [
      {
        title: 'Дата',
        dataIndex: 'created',
        align: 'center',
        render: (text, record) => moment(record.created).format('DD-MM-YYYY')
      }, {
        title: 'Пацієнт',
        align: 'center',
        render: (text, record) => record.owner.name
      }, {
        title: 'Назва',
        dataIndex: 'title',
        align: 'center',
      }, {
        title: 'Тип',
        align: 'center',
        render: (text, record) => (
          <Tooltip placement="top" title={record.type.description}>
            {record.type.name}
          </Tooltip>
        )
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
          dataSource={medcardData}
          bordered
          onChange={this.tableChange}
          pagination={{
            total: total,
            current: page
          }}
          className="table"
          rowKey="id"
          loading={loading}
          expandedRowRender={this.expandedRowRender}
          scroll={{ x: '1300' }}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(TableDoctor);
