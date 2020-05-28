import React from 'react';
import { Card, Spin, Space, Alert  } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import './ui.less'
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} />;

export default class Loading extends React.Component{
    state = {
        loading: true
    }
    render() {
        return (
            <React.Fragment>
                <Card title="spin 用法" className="card-wrap">
                    <Space size="middle">
                        <Spin size="small" />
                        <Spin />
                        <Spin size="large" />
                    </Space>
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Alert
                        message="Alert message title"
                        description="Further details about the context of this alert."
                        type="info"
                        style={{marginBottom: '10px'}}
                    />
                    <Spin spinning={this.state.loading}>
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="info"
                            style={{marginBottom: '10px'}}

                        />
                    </Spin>
                    <Spin tip="加载中">
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="info"
                            style={{marginBottom: '10px'}}
                        />
                    </Spin>,
                    <Spin indicator={antIcon}>
                        <Alert
                            message="Alert message title"
                            description="Further details about the context of this alert."
                            type="info"
                            style={{marginBottom: '10px'}}
                        />
                    </Spin>,
                </Card>
            </React.Fragment>
        )
    }
}
