import { Form, Icon, Input, Button, Checkbox, Radio } from 'antd';
import React, { Component } from 'react';
import axios from '../axios/index';
import { BrowserRouter, Switch, Route, Link, useHistory, withRouter } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import { createBrowserHistory } from 'history';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
const crypto = require('crypto')

class HorizontalLoginForm extends Component {

    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            account: '',
            password: ''
        }
    }
    handleSubmit = e => {
        let password = this.formRef.current.getFieldValue('password');
        let account = this.formRef.current.getFieldValue('account');
        let choose = this.formRef.current.getFieldValue('choose')
        password = crypto.createHash('sha256').update(password).digest('hex');
        const params = new URLSearchParams();
        params.append('account', account);
        params.append('password', password);
        password = crypto.createHash('sha256').update(password).digest('hex');
        console.log(account + "  " + password + " " + choose);
        let url = choose === 1 ? '/user-service/user/teacherLogin' : '/user-service/user/studentLogin';
        axios.post(url, params).then(res => {
            console.log(res)
            if (res.data == 'success') {
                const { history } = this.props;
                if (choose === 1) {
                    history.push("/teacher_dashboard");
                } else if (choose === 2) {
                    history.push("/student_dashboard");
                }
            }
        }).catch(err => {
            console.log("This is Error");
            console.log(err);
        })
    }

    radioOnChange = e => {
        this.setState({
            value: e.target.value,
        })
    }
    render() {
        return (
            <div className="login">
                <div className="login-form">
                    <h4 className="title">登录界面</h4>
                    <Form onFinish={this.handleSubmit} style={{ maxWidth: '300px' }} ref={this.formRef}>
                        <Form.Item name="account" rules={[{ required: true, message: '请输入用户名' }]}>
                            <Input
                                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)', fontSize: 13 }} />}
                                placeholder="用户名"
                            />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
                            <Input
                                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)', fontSize: 13 }} />}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item name="choose" >
                            <Radio.Group onChange={this.radioOnChange}>
                                <Radio value={1}>教师</Radio>
                                <Radio value={2}>学生</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>记住密码</Checkbox>
                            </Form.Item>
                            <a className="login-form-forgot" style={{ float: 'right' }}>
                                忘记密码
                    </a>
                            <Button type="primary" htmlType="submit" className="login-form-button"
                                style={{ width: '100%' }}>
                                登录
                            </Button>
                            <Link to="register">现在注册</Link>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}

const LoginForm = withRouter((HorizontalLoginForm))
export default LoginForm;