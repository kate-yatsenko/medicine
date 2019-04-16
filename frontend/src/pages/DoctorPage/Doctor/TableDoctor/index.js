import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Typography, Icon, Tooltip, Table } from 'antd';
import { toggleTableModal, setEditRow, setMedcardData, toggleTableLoading, setPage } from 'actions/doctorActions';
import { getDoctorMedcardData } from 'api';

import './style.scss';

const mapStateToProps = ({ doctorState }) => {
  return {
    medcardData: doctorState.medcardData,
    testId: doctorState.testId,
    loading: doctorState.loading,
    total: doctorState.total,
    page: doctorState.page,
  }
};

const { Paragraph } = Typography;

class TableDoctor extends React.Component {

  componentDidMount() {
    const { testId, dispatch, page } = this.props;
    dispatch(toggleTableLoading());
    getDoctorMedcardData(testId, { p: page })
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
    const { testId, dispatch } = this.props;
    const { current } = pagination;
    dispatch(toggleTableLoading());
    getDoctorMedcardData(testId, { p: current })
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
