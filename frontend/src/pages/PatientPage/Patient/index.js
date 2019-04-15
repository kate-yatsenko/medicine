import React from 'react';
import TableSearch from "components/TableSearch";
import TablePatient from "./TablePatient";
import { Layout } from 'antd';

const { Content } = Layout;

const Patient = () => {

  return (
    <Content className="page">
      <TableSearch placeholder="Пошук лікаря" type="patient"/>
      <TablePatient/>
    </Content>
  );
};

export default Patient;
