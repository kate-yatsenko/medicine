import React from 'react';
import SelectSearch from "components/SelectSearch";
import TableDoctor from "./TableDoctor";
import TableEditModal from "./TableEditModal";
import { Layout } from 'antd';

const { Content } = Layout;

const Doctor = () => {
  return (
    <Content className="page">
      <SelectSearch placeholder="Оберіть пацієнта"/>
      <TableDoctor/>
      <TableEditModal/>
    </Content>
  );
};

export default Doctor;


