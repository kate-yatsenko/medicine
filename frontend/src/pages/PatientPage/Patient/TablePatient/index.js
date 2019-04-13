import React from 'react';
import { Table } from 'antd';
import { tableData } from './data.json';
import moment from 'moment';
import { Typography } from 'antd';

const { Paragraph } = Typography;

class TablePatient extends React.Component {


  expandedRowRender = (record) => {
    return (
      <React.Fragment>
          <Paragraph>Опис: {record.description}</Paragraph>
          <Paragraph>Висновки: {record.result}</Paragraph>
      </React.Fragment>
    );
  };

  render() {
    const columns = [
      {
        title: 'Дата',
        dataIndex: 'created',
        align: 'center',
        render: (text, record) => moment(record.created).format('DD-MM-YYYY')
      }, {
        title: 'Лікар',
        dataIndex: 'doctor',
        align: 'center',
      }, {
        title: 'Назва',
        dataIndex: 'title',
        align: 'center',
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

export default TablePatient;
