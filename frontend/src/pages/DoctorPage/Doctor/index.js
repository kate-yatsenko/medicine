import React from 'react';
import SelectSearch from "components/SelectSearch";
import TableDoctor from "./TableDoctor";
import TableModal from "./TableModal";
import AddButton from "./AddButton";
import { Layout } from 'antd';

const { Content } = Layout;

const Doctor = () => {
  return (
    <Content className="page">
      <div className="d-flex justify-content-between">
        <SelectSearch placeholder="Оберіть пацієнта"/>
        <AddButton/>
      </div>
      <TableDoctor/>
      <TableModal/>
    </Content>
  );
};

export default Doctor;


