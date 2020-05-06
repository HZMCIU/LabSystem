import React, { Component } from 'react'
import { Form, Input, Icon, Button, } from 'antd';
import axios from '../axios/index';
import {LockOutlined,UserOutlined} from '@ant-design/icons'
const crypto = require('crypto');

class HorizontalForm extends Component {

    formRef=React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            value: 1,
            account: '',
            password: '',
            newPassword: '',
            errorMsg: null,
            status: 'success'
        }
    }
    handleSubmit = e => {
        
        let password = this.formRef.current.getFieldValue('password');
        let account = this.formRef.current.getFieldValue('account');
        password = crypto.createHash('sha256').update(password).digest('hex');
        let param = new URLSearchParams();
        param.append('account', account);
        param.append('password', password)
        axios.post('/user-service/user/addStudent',param)
    };

    confirmPassword = (rule, value, callback) => {
        try {
            const { form } = this.props;
            console.log(value);
            if (value && value !== form.getFieldValue('password')) {
                callback('两次密码输入不一致');
            } else {
                callback();
            }
        } catch (err) {
            callback(err);
        }
    }
    render() {
        return (
            <div className="register">
                <div className="register-form">
                    <h4 className="title">用户注册</h4>
                    <Form onFinish={this.handleSubmit} style={{ maxWidth: '300px' }} ref={this.formRef}>
                        <Form.Item name="account">
                            <Input
                                prefix={<UserOutlined  style={{ color: 'rgba(0,0,0,.25)', fontSize: 13 }}/>}
                                placeholder="用户名"
                            />
                        </Form.Item>
                        <Form.Item name="password">
                            <Input.Password
                                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)', fontSize: 13 }}/>}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>
                        <Form.Item name="newPassword">
                            <Input.Password
                                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)', fontSize: 13 }}/>}
                                type="password"
                                placeholder="请再次输入密码"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button"
                                style={{ width: '100%' }}>
                                确认
                             </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        );
    }
}
export default HorizontalForm;