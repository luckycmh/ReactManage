import React from 'react';
import {Card, Button, Radio} from 'antd';
import {
    PlusOutlined,
    SearchOutlined,
    EditOutlined,
    DownloadOutlined,
    LeftOutlined,
    RightOutlined
} from '@ant-design/icons';


import './ui.less'

class Buttons extends React.Component {
    state = {
        loading: true,
        size: 'default'
    }
    handleLoading = () => {
        this.setState({
            loading: !this.state.loading
        })
    }
    handleSizeChange = (e) => {
        this.setState({size: e.target.value});
    }

    render() {
        let {size} = this.state;
        return (
            <div className="buttons">
                <Card title="基础按钮" className="card-wrap">
                    <Button type="primary">Primary</Button>
                    <Button>Default</Button>
                    <Button type="danger">danger</Button>
                    <Button type="dashed">Dashed</Button>
                    <Button disabled>disabled</Button>
                </Card>
                <Card title="图形按钮" className="card-wrap">
                    <Button type="primary" icon={<PlusOutlined/>}>添加</Button>
                    <Button type="primary" icon={<EditOutlined/>}>编辑</Button>
                    <Button type="primary" shape="circle" icon={<SearchOutlined/>}></Button>
                    <Button type="primary" icon={<SearchOutlined/>}>搜索</Button>
                    <Button icon={<DownloadOutlined/>}>下载</Button>
                </Card>
                <Card title="加载按钮" className="card-wrap">
                    <Button type="primary" loading={this.state.loading}>确定</Button>
                    <Button type="primary" shape="circle" loading={this.state.loading}> </Button>
                    <Button type="default" shape="circle" loading={this.state.loading}> </Button>
                    <Button type="default" loading={this.state.loading}>点击加载</Button>
                    <Button type="primary" onClick={this.handleLoading}>关闭</Button>
                </Card>
                <Card title="按钮组" className="card-wrap">
                    <Button.Group className="btn-group">
                        <Button type="primary" icon={<LeftOutlined/>}>后退</Button>
                        <Button type="primary" icon={<RightOutlined/>}>前进</Button>
                    </Button.Group>

                </Card>
                <Card title="调整按钮大小" className="card-wrap">
                    <Radio.Group value={size} onChange={this.handleSizeChange}>
                        <Radio value="large">Large</Radio>
                        <Radio value="default">Default</Radio>
                        <Radio value="small">Small</Radio>
                    </Radio.Group>
                    <Button type="primary" size={size}>Primary</Button>
                    <Button size={size}>Default</Button>
                    <Button type="danger" size={size}>danger</Button>
                    <Button type="dashed" size={size}>Dashed</Button>
                    <Button disabled size={size}>disabled</Button>
                </Card>
            </div>
        );
    }
}

export default Buttons;
