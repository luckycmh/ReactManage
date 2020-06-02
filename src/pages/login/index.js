import React, {useState,useEffect,useLayoutEffect} from 'react';
import { useDispatch } from 'react-redux';
import {Form, Input, Button, Checkbox} from "antd";
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import {login} from '../../apis/common'
import {Utils} from "../../utils/utils";
import {userInfo} from '../../redux/common/actions'
import './index.less'

const utils = new Utils();

const Item = Form.Item;

export default function () {
    const [telephone,setTelephone] = useState('');
    const [password,setPassword] = useState('');
    const history = useHistory();
    const dispatch = useDispatch();
    const loginApi = async () => {
        let {data:{code,data}} = await login(telephone,password,0);
        if (code === 1) {
            let decodeData = JSON.parse(utils.decrypt(data));
            let cookInfo = decodeData.data;
            Cookies.set(cookInfo.name, cookInfo.val, { expires: 1 });
            localStorage.setItem('annieUser', data);
            dispatch(userInfo(decodeData));
            history.push('/');
        }

    }
    useEffect(() => {
        if (telephone && password) {
            loginApi();
        }
    },[telephone,password])
    useLayoutEffect(() => {
        if (localStorage.getItem('annieUser') && Cookies.get('ANNIEKIDSUSS')) {
            history.push('/');
        }
    }, [])
    const onFinish = (values) => {
        setTelephone(values.username);
        setPassword(values.password);
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
                        initialValues={{remember: false}}
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
                                required: true,
                                message: '请输入密码'
                            }]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon"/>}
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
