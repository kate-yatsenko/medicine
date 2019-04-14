import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Typography, Icon, Tooltip, Table } from 'antd';
import { toggleEditTableModal, setEditRow, setMedcardData } from 'actions/doctorActions';
import './style.scss';
import { getDoctorMedcardData } from 'api';

const mapStateToProps = ({ doctorState }) => {
  return {
    medcardData: doctorState.medcardData,
    testId: doctorState.testId,
  }
};

const { Paragraph } = Typography;

class TableDoctor extends React.Component {

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

  openEditModal = (record) => {
    const { dispatch } = this.props;
    dispatch(toggleEditTableModal());
    dispatch(setEditRow(record));
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
          className="table"
          rowKey="id"
          expandedRowRender={this.expandedRowRender}
          scroll={{ x: '1300' }}
        />
      </div>
    );
  }
}

export default connect(mapStateToProps)(TableDoctor);
