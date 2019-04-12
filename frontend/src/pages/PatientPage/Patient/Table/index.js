import React from 'react';
import {Table} from 'antd';
import './style.css';

const TablePatient = (props) => {
    const columns = [{
        title: 'Ім\'я',
        dataIndex: 'name',
    }, {
        title: 'Результати',
        className: 'result',
        dataIndex: 'result',
    }, {
        title: 'Діагноз',
        dataIndex: 'diagnosis',
    }];

    const data = [{
        id: props.id,
        name: props.name,
        result: props.result,
        diagnosis: props.diagnosis,
    }];
    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                bordered
                className="table"

            />
        </div>
    );
};

export default TablePatient;
