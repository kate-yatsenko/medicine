import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import { Typography, Tooltip } from 'antd';
import { connect } from "react-redux";
import { getDoctorMedcardData } from 'api';
import { setMedcardData, toggleTableLoading, setPage } from 'actions/patientActions';

const { Paragraph } = Typography;

const mapStateToProps = ({ patientState }) => {
  return {
    medcardData: patientState.medcardData,
    testId: patientState.testId,
    loading: patientState.loading,
    total: patientState.total,
    page: patientState.page,
  }
};

class TablePatient extends React.Component {

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
    const { medcardData, total, loading, page } = this.props;

    const columns = [
      {
        title: 'Дата',
        dataIndex: 'created',
        align: 'center',
        render: (text, record) => moment(record.created).format('DD-MM-YYYY')
      }, {
        title: 'Лікар',
        align: 'center',
        render: (text, record) => record.creator.name
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
      }
    ];

    return (
      <div>
        <Table
          columns={columns}
          dataSource={medcardData}
          bordered
          loading={loading}
          onChange={this.tableChange}
          pagination={{
            total: total,
            current: page
          }}
          className="table"
          rowKey="id"
          expandedRowRender={this.expandedRowRender}
          scroll={{ x: '1300' }}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(TablePatient);
