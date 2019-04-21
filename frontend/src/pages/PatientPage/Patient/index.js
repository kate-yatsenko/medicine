import React from 'react';
import TableSearch from "components/TableSearch";
import TablePatient from "./TablePatient";
import { Layout } from 'antd';

const { Content } = Layout;

const Patient = () => {

  return (
    <Content className="page">
      <div className="action-field action-patient">
        <TableSearch placeholder="Пошук по лікарю" type="patient"/>
      </div>
      <TablePatient/>
    </Content>
  );
};

export default Patient;
