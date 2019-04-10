import React from 'react';
import {Menu, Dropdown, Icon, Button } from 'antd';
import './style.css';

const Index = () => {

    const menu = (
        <Menu>
            <Menu.Item key="0">
                <a href="#">1st menu item</a>
            </Menu.Item>
            <Menu.Item key="1">
                <a href="#">2nd menu item</a>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className='dropDown'>
            <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" href="#">
                    <Button>
                        Actions <Icon type="down"/>
                    </Button>
                </a>
            </Dropdown>
        </div>
    );
};

export default Index;
