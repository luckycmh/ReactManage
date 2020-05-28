import React from 'react';
import {Card, Space, Button, message} from 'antd';

export default function() {
    const success = () => {
        message.success('This is a success message');
    };

    const error = () => {
        message.error('This is an error message');
    };

    const warning = () => {
        message.warning('This is a warning message');
    };
    const loading = () => {
        message.loading('Action in progress..', 2);
    };
    return (
        <React.Fragment>
            <Card title="全局Message">
                <Space>
                    <Button onClick={success}>Success</Button>
                    <Button onClick={error}>Error</Button>
                    <Button onClick={warning}>Warning</Button>
                    <Button onClick={loading}>Display a loading indicator</Button>
                </Space>
            </Card>

        </React.Fragment>
    )
}
