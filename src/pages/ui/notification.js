import React from 'react';
import {Card, notification, Space, Button} from 'antd';
import {
    RadiusUpleftOutlined,
    RadiusUprightOutlined,
    RadiusBottomleftOutlined,
    RadiusBottomrightOutlined,
} from '@ant-design/icons';
const Context = React.createContext({name: '123'});

export default function(){
        const [api, contextHolder] = notification.useNotification();
        const openNotification = placement => {
            api.info({
                message: `Notification ${placement}`,
                description: <Context.Consumer>{({name}) => `Hello, ${name}!`}</Context.Consumer>,
                placement,
            });
        };
        const openNotificationWithIcon = (type) => {
            notification[type]({
                message: 'Notification Title',
                description:
                    'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
            });
        }
        return (
            <React.Fragment>
                <Card title="通知提醒框" className="card-wrap">
                    <Space>
                        <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
                        <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
                        <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
                        <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
                    </Space>
                </Card>
                <Card title="hooks 获取上下文" className="card-wrap">
                    <Context.Provider value={{name: 'Ant Design123'}}>
                        {contextHolder}
                        <Space>
                            <Button type="primary" onClick={() => openNotification('topLeft')}>
                                <RadiusUpleftOutlined/>
                                topLeft
                            </Button>
                            <Button type="primary" onClick={() => openNotification('topRight')}>
                                <RadiusUprightOutlined/>
                                topRight
                            </Button>
                            <Button type="primary" onClick={() => openNotification('bottomLeft')}>
                                <RadiusBottomleftOutlined/>
                                bottomLeft
                            </Button>
                            <Button type="primary" onClick={() => openNotification('bottomRight')}>
                                <RadiusBottomrightOutlined/>
                                bottomRight
                            </Button>
                        </Space>
                    </Context.Provider>
                </Card>
            </React.Fragment>
        )

}
