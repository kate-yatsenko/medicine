import React from 'react';
import { Select } from 'antd';
import './style.scss';

const Option = Select.Option;

const SelectSearch = () => {

  return (
    <div className="select-search">
      <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Оберіть лікаря"
        optionFilterProp="children"
      >
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="tom">Tom</Option>
      </Select>
    </div>
  );
};

export default SelectSearch;
