import { Layout, Menu, Breadcrumb } from 'antd';
import React, { Component } from 'react';
import { withRouter, Route, Link, Switch } from 'react-router-dom';
import { PieChartOutlined } from '@ant-design/icons'
import Experiments from './Experiments';
import HeaderCustom from './HeaderCustom';
import AddExperiment from './AddExperiment';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class TeacherDashboard extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    let { match, history, location } = this.props;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="teacher-dashboard-logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <PieChartOutlined/>
              <span>实验列表</span>
              <Link to={`${match.url}/experiments`} />
            </Menu.Item>
            <Menu.Item key="2">
              <PieChartOutlined/>
              <span>添加实验</span>
              <Link to={`${match.url}/add_experiment`} />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <HeaderCustom username="teacher" />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              {/* <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: '100vh' }}>
              <Switch>
                <Route path={`${match.path}/experiments`}>
                  <Experiments />
                </Route>
                <Route exact path={match.path}>
                  Welcome to Teacher Dashboard.
                </Route>
                <Route path={`${match.path}/add_experiment`}>
                  <AddExperiment />
                </Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Teacher Dashboard ©2020 Created by HZMCIU</Footer>
        </Layout>
      </Layout>
    );
  }
}
export default withRouter(TeacherDashboard);