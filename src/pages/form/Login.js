import React, {useState, useEffect} from 'react';
import {Form, Card, Input, Button, Checkbox} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';

export default function () {
    const [inlineForm] = Form.useForm();
    const [update, setUpdate] = useState();
    useEffect(() => {
        setUpdate({});
    }, []);
    const onFinish = (values) => {
        console.log(values);
    }
    const finishLogin = values => {
        console.log(values);
    }

    const validateMessages = {
        required: "'${name}' 是必选字段",
    };

    return (
        <React.Fragment>
            <Card title="内联表单" className="card-wrap">
                <Form form={inlineForm} layout="inline" onFinish={onFinish}>
                    <Form.Item
                        name="username"
                        rules={[{required: true, message: 'Please input your username!'}]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true, message: 'Please input your password!'}]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item shouldUpdate={true}>
                        {() => (
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={
                                    !inlineForm.isFieldsTouched(true) ||
                                    inlineForm.getFieldsError().filter(({errors}) => errors.length).length
                                }
                            >
                                Log in
                            </Button>
                        )}
                    </Form.Item>
                </Form>
            </Card>
            <Card title="水平表单">
                <Form
                    name="normal_login"
                    initialValues={{remember: true}}
                    onFinish={finishLogin}
                    validateMessages={validateMessages}
                >
                    <Form.Item
                        name="username"
                        rules={[{required: true }]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon"/>}
                            placeholder="Username"
                            autoComplete="off"
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{required: true}]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="Password"
                            autoComplete="off"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="https://www.baidu.com/">
                            Forgot password
                        </a>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </Form.Item>
                </Form>
            </Card>

        </React.Fragment>
    )
}
