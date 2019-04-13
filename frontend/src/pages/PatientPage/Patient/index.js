import React from 'react';
import SelectSearch from "./SelectSearch";
import TablePatient from "./TablePatient";
import { Layout } from 'antd';

const { Content } = Layout;

const Patient = () => {

  return (
    <Content className="page">
      <SelectSearch/>
      <TablePatient/>
    </Content>
  );
};

export default Patient;
