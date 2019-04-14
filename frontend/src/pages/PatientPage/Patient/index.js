import React from 'react';
import SelectSearch from "components/SelectSearch";
import TablePatient from "./TablePatient";
import { Layout } from 'antd';

const { Content } = Layout;

const Patient = () => {

  return (
    <Content className="page">
      <SelectSearch placeholder="Оберіть лікаря"/>
      <TablePatient/>
    </Content>
  );
};

export default Patient;
