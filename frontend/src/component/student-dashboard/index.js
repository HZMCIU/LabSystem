import { Layout, Menu, Breadcrumb, Typography } from 'antd';
import React, { Component } from 'react';
import { withRouter, Link, useRouteMatch, Route, Switch } from 'react-router-dom';
import Chart from './Chart';
import HeaderCustom from './HeaderCustom';
import {PieChartOutlined} from '@ant-design/icons';
import Experiments from './Experiments';
import AlgoDevelop from './AlgoDevelop';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Title } = Typography;

class Dashboard extends Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  render() {

    let { history, match, location } = this.props;
    let { url, path } = match;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <div className="student-dashboard-logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <PieChartOutlined/>
              <span>实验</span>
              <Link to={`${url}/develop`} />
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <HeaderCustom username="hzmciu"/>
          <Content style={{ margin: '16px 16px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: '90vh' }}>
              <Switch>
                <Route exact path={`${path}/develop`}>
                <Experiments/>
                </Route>
                <Route exact path={path}>
                  <Experiments/>
                </Route>
              </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>StudentDashboard ©2020 Created by HZMCIU</Footer>
        </Layout>
      </Layout>
    );
  }
}
const StudentDashboard = withRouter(Dashboard)
export default StudentDashboard;