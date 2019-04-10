import React from 'react';
import {Table} from 'antd';
import './style.css';

const TablePatient = (props) => {
    const columns = [{
        title: 'Name',
        dataIndex: 'name',
        render: text => <a href="javascript:;">{text}</a>,
    }, {
        title: 'Cash Assets',
        className: 'column-money',
        dataIndex: 'money',
    }, {
        title: 'Address',
        dataIndex: 'address',
    }];

    const data = [{
        id: props.id,
        name: props.name,
        money: props.money,
        address: props.address,

    }];
    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                className="table"
            />,
        </div>
    );
};

export default TablePatient;
