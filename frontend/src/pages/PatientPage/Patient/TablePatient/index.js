import React from 'react';
import { Table } from 'antd';
import moment from 'moment';
import { Typography, Tooltip } from 'antd';
import { connect } from "react-redux";
import { getDoctorMedcardData } from 'api';
import { setMedcardData } from 'actions/patientActions';

const { Paragraph } = Typography;

const mapStateToProps = ({ patientState }) => {
  return {
    medcardData: patientState.medcardData,
    testId: patientState.testId,
  }
};

class TablePatient extends React.Component {

  componentDidMount() {
    const { testId, dispatch } = this.props;
    getDoctorMedcardData(testId)
      .then(medcardData => {
        dispatch(setMedcardData(medcardData))
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

  render() {
    const { medcardData } = this.props;

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
          className="table"
          expandedRowRender={this.expandedRowRender}
          scroll={{ x: '1300' }}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(TablePatient);
