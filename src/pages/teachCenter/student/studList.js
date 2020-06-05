import React, {useEffect, useState} from 'react'
import {Row, Col, Button, Space, Badge, Table} from 'antd';
import {Utils} from "../../../utils/utils";
import CusBread from '../../../components/bread'
import FilterForm from '../../../components/fiterForm'
import {breadList, studData, statusData} from "./data";
import {statusConf} from "./config";
import {getTableList} from '../../../apis/teachCenter/student'

const utils = new Utils()

export default function () {
    // 分页数据
    const [pageInfo, setPageInfo] = useState({
        pageSize: 10,
        total: 0,
        totalPage: 0
    });
    // 表格数据
    const [dataList, SetDataList] = useState([]);
    // 选中的每行key值
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    // 请求的页码
    let current = 1;
    useEffect(() => {
        tableListApi();
    }, []);
    // 初始化表单数据
    const formData = {
        itemArr: [
            {
                type: 'SELECT',
                name: 'searchStud',
                placeholder: '',
                data: studData
            },
            {
                type: 'INPUT',
                name: 'searchText',
                placeholder: ''
            },
            {
                type: 'SELECT',
                name: 'searchStatus',
                placeholder: '',
                data: statusData
            }
        ],
        initialValues: {
            searchStud: '1',
            searchText: '',
            searchStatus: ''
        },
    };
    const search = {
        name: '',
        userName: '',
        courseStatus: ''
    };
    // 搜索表单搜索
    const startSearch = (values) => {
        for (let k in search) {
            search[k] = '';
        }
        values.searchStud === '1' ? search.name = values.searchText : search.userName = values.searchText;
        search.courseStatus = values.searchStatus;
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
        current = pagination.current;
        tableListApi();
    };
    let selectedRows = [];
    // 多选改变
    const onSelectChange = (selectedRowKeys, selectedRows) => {
        setSelectedRowKeys(selectedRowKeys);
        selectedRows = selectedRows;
    };

    // 学员列表api
    async function tableListApi() {
        let {data: {code, data}} = await getTableList(
            current,
            pageInfo.pageSize,
            search.courseStatus,
            search.name,
            search.userName
        );
        if (code === 1) {
            utils.addKey(data.list);
            setPageInfo({
                ...pageInfo,
                total: data.total
            });
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
                            <FilterForm formData={formData} startSearch={startSearch}/>
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
                                    showQuickJumper: true,
                                    showSizeChanger: false,
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
