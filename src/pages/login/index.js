import React from 'react';
import {Form,Input,Button,Checkbox} from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.less'
const Item = Form.Item;

export default function(){
    const onFinish = (values) => {
        console.log(values);
    }
    return (
        <div className="login">
            <div className="bg"></div>
            <div className="info-box">
                <div className="fl left-bg">
                    <div className="login-logo"></div>
                </div>
                <div className="form-wrap">
                    <h2>安妮花教学管理系统</h2>
                    <Form
                        name="login_form"
                        className="login-form"
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                    >
                        <Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: '请输入用户名'
                                }
                            ]}
                        >
                            <Input prefix={<UserOutlined className="site-form-item-icon" placeholder="请输入用户名"/>}/>
                        </Item>
                        <Item
                            name="password"
                            rules={[{
                                required:true,
                                message: '请输入密码'
                            }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="请输入密码"
                            />
                        </Item>
                        <Item
                            name="remember"
                            valuePropName="checked"
                            style={{textAlign: 'left'}}
                        >
                            <Checkbox>记住密码</Checkbox>
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-btn">
                                登录
                            </Button>
                        </Item>

                    </Form>
                </div>
            </div>
        </div>
    );
};
