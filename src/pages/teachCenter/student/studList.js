import React, {useEffect, useState} from 'react'
import {Row, Col, Button, Space, Form, Input, Select, Badge, Table} from 'antd';
import {SearchOutlined} from '@ant-design/icons'
import {Utils} from "../../../utils/utils";
import CusBread from '../../../components/bread'
import {breadList, searchData} from "./data";
import {statusConf} from "./config";
import {getTableList} from '../../../apis/teachCenter/student'

const utils = new Utils()

export default function () {
    // 引用表单
    const [form] = Form.useForm();
    // 分页数据
    const [pageInfo, setPageInfo] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
        totalPage: 0
    });
    // 表格数据
    const [dataList, SetDataList] = useState([]);
    // 选中的每行key值
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    useEffect(() => {
        tableListApi();
    },[pageInfo.current])
    const search = {
        name: '',
        userName: '',
        courseStatus: ''
    };
    // 搜索表单搜索
    const handleFinish = (values) => {
        for (let k in search) {
            search[k] = '';
        }
        values.searchType === '1' ? search.name = values.filterText : search.userName = values.filterText;
        search.courseStatus = values.studStatus;
        console.log('search', search)
        tableListApi();
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
    // 表格改变
    const handleTableChange = (pagination) => {
        setPageInfo({...pageInfo,current: pagination.current});
    };
    let selectedRows = [];
    // 多选改变
    const onSelectChange = (selectedRowKeys,selectedRows) => {
        setSelectedRowKeys(selectedRowKeys);
        selectedRows = selectedRows;
    };
    // 学员列表api
    async function tableListApi(){
        let {data: {code, data}} = await getTableList(
            pageInfo.current,
            pageInfo.pageSize,
            search.courseStatus,
            search.name,
            search.userName
        );
        if (code === 1) {
            setPageInfo({
                ...pageInfo,
                total: data.total
            });
            utils.addKey(data.list);
            SetDataList((dataList) => dataList = data.list);
        }
    }

    // 选中行配置
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

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
                        <Col span={24} className="ali-left">
                            <Space>
                                <Button type="primary">新建</Button>
                                <Button>批量分班</Button>
                                <Button>导出</Button>
                            </Space>
                        </Col>
                    </Row>
                    <Row className="mt-20">
                        <Col span={24}>
                            <Form
                                form={form}
                                name="filter-form"
                                layout="inline"
                                onFinish={handleFinish}
                                initialValues={{
                                    searchType: '1',
                                    studStatus: ''
                                }}
                            >
                                <Form.Item
                                    name="searchType"
                                >
                                    <Select>
                                        <Select.Option value="1">学员姓名</Select.Option>
                                        <Select.Option value="2">学员编号</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="filterText"
                                >
                                    <Input
                                        prefix={<SearchOutlined/>}
                                        placeholder="请输入查询"
                                        allowClear
                                        autoComplete="off"
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="studStatus"
                                >
                                    <Select>
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
                            <Table
                                columns={columns}
                                dataSource={dataList}
                                rowSelection={rowSelection}
                                pagination={{
                                    total: pageInfo.total,
                                    current: pageInfo.current,
                                    showQuickJumper: true,
                                    showSizeChanger: false,
                                    defaultPageSize: pageInfo.pageSize,
                                    showTotal: total => {
                                        return `共${total}条数据`;
                                    }
                                }}
                                onChange={handleTableChange}
                            />
                        </Col>
                    </Row>
                </div>
            </div>

        </div>
    )
}
