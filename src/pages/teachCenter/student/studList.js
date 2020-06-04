import React,{useState} from 'react'
import { Row, Col, Button, Space,Form,Input,Select,Badge  } from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import CusBread from '../../../components/bread'
import {breadList,searchData} from "./data";
import {statusConf} from "./config";

export default function() {
    // 引用表单
    const [form] = Form.useForm();
    const [pageInfo,setPageInfo] = useState({
        current: 1,
        pageSize: 10,
        total:0,
        totalPage:0
    });
    const [search,setSearch] = useState({
        name: '',
        userName: '',
        courseStatus: ''
    });
    // 搜索表单搜索
    const handleFinish = (values) => {
        console.log(values);
    };
    // 表头
    const columns = [
        {
            title: '学员编号',
            dataIndex: 'username',
            key: 'username'
        },
        {
            title: '姓名',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '性别',
            dataIndex: 'sex',
            key: 'sex'
        },
        {
            title: '手机号码',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber'
        },
        {
            title: '状态',
            dataIndex: 'courseStatus',
            key: 'courseStatus',
            width: 100,
            render: (courseStatus) =>
                <Badge status={statusConf[courseStatus].type} text={statusConf[courseStatus].text}/>
            },
        {
            title: '报读分馆',
            dataIndex: 'OrgName',
            key: 'OrgName'
        },
        {
            title: '操作',
            key: 'opt',
            render: () => <Space>
                <Button type="primary" size="small">查看</Button>
                <Button type="primary" size="small" danger>分班</Button>
            </Space>
        }
    ];



    return (
        <div className="stud-list">
            <CusBread bread={breadList}/>
            <Row>
                <Col span={24}>
                    <div className="top-bar">
                        <ul className="bar-ul">
                            <li className="active">正式学员</li>
                        </ul>
                    </div>
                </Col>
            </Row>
            <div className="v-box mt-20">
                <div className="bd">
                    <Row>
                        <Col span={4} className="ali-left">
                            <Space>
                                <Button type="primary">新建</Button>
                                <Button >批量分班</Button>
                                <Button >导出</Button>
                            </Space>
                        </Col>
                        <Col span={12} offset={8}>
                            <Form
                                form={form}
                                name="filter-form"
                                layout="inline"
                                onFinish={handleFinish}
                                initialValues={{
                                    filterSelect: '学员姓名'
                                }}

                                className="fr"
                            >
                                <Form.Item
                                    name="filterSelect"
                                    style={{width:'140px'}}
                                >
                                   <Select>
                                       <Select.Option value="学员姓名">学员姓名</Select.Option>
                                       <Select.Option value="学员编号">学员编号</Select.Option>
                                   </Select>
                                </Form.Item>
                                <Form.Item
                                    name="filterText"
                                >
                                    <Input
                                        prefix={<SearchOutlined/>}
                                        placeholder="请输入查询"
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        搜索
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                    <Row className="mt-20">
                        <Col span={24}>
                            <ul className="s-query">
                                <li className="wd-300">
                                    <div className="th">
                                        学员状态：
                                    </div>
                                    <div className="td">
                                        <Select defaultValue="">
                                            {
                                                searchData.map(item =>
                                                    <Select.Option
                                                        value={item.value}
                                                        key={item.label}
                                                    >
                                                        {item.label}
                                                    </Select.Option>
                                                )
                                            }

                                        </Select>
                                    </div>
                                </li>
                            </ul>

                        </Col>
                    </Row>
                    <Row className="mt-20">

                    </Row>
                </div>
            </div>

        </div>
    )
}
