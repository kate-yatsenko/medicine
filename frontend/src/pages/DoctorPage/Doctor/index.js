import React from 'react';
import TableSearch from "components/TableSearch";
import TableDoctor from "./TableDoctor";
import TableModal from "./TableModal";
import AddButton from "./AddButton";
import { Layout } from 'antd';

const { Content } = Layout;

const Doctor = () => {
  return (
    <Content className="page">
      <div className="d-flex justify-content-between">
        <TableSearch placeholder="Пошук пацієнта" type="doctor"/>
        <AddButton/>
      </div>
      <TableDoctor/>
      <TableModal/>
    </Content>
  );
};

export default Doctor;


