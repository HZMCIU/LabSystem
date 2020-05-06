import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Icon, Menu, Badge, } from 'antd';
import {UserOutlined} from '@ant-design/icons'
const { SubMenu } = Menu;
const { Header } = Layout;
class HeaderCustom extends Component {
    constructor(props) {
        super(props);
        this.menuClick=this.menuClick.bind(this);
    }
    menuClick(e) {
        console.log(e.key);
        if(e.key==='logout'){
            this.props.history.push('/');
        }
    }
    render() {
        return (
            <Header className="custom-theme header">
                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                    onClick={this.menuClick}
                >
                    <SubMenu
                        title={
                            <span className="avatar">
                                <UserOutlined/>
                                <i className="on bottom b-white" />
                            </span>
                        }
                    >
                        <Menu.ItemGroup title="用户中心">
                            <Menu.Item key="mesg">你好 - {this.props.username}</Menu.Item>
                            <Menu.Item key="logout">
                                <span onClick={this.logout}>退出登录</span>
                            </Menu.Item>
                        </Menu.ItemGroup>
                        <Menu.ItemGroup title="设置中心">
                            <Menu.Item key="setting:3">个人设置</Menu.Item>
                        </Menu.ItemGroup>
                    </SubMenu>
                </Menu>
            </Header>
        )
    }
}

export default withRouter(HeaderCustom);