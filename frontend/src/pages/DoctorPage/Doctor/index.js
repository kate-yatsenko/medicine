import React from 'react';
import TableSearch from "components/TableSearch";
import TableDoctor from "./TableDoctor";
import TableModal from "./TableModal";
import AddButton from "./AddButton";
import { Layout } from 'antd';

import './style.scss';

const { Content } = Layout;

const Doctor = () => {
  return (
    <Content className="page">
      <div className="d-flex action-field">
        <TableSearch placeholder="Пошук по пацієнту" type="doctor"/>
        <AddButton/>
      </div>
      <TableDoctor/>
      <TableModal/>
    </Content>
  );
};

export default Doctor;


