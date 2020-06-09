import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Row, Col, Button, Space, Badge, Table} from 'antd';
import Axios from 'axios'
import {Utils} from "../../../utils/utils";
import CusBread from '../../../components/bread'
import FilterForm from '../../../components/fiterForm'
import {breadList, studData, statusData} from "./data";
import {statusConf} from "./config";
import {getTableList} from '../../../apis/teachCenter/student'

const utils = new Utils()

export default function () {
    // 终止请求
    const source = useRef(null);
    // 路由api
    const history = useHistory();
    // 分页数据
    const page = useRef(1);
    const total = useRef(0);
    const pageSize = useRef(10);
    const search = useRef({
        name: '',
        userName: '',
        courseStatus: ''
    });
    // 表格数据
    const [dataList, setDataList] = useState([]);
    // 选中的每行key值
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    //判断页面是否为挂载状态
    function getSource() {
        if (source.current == null) {
            const CancelToken = Axios.CancelToken;
            source.current = CancelToken.source();
        }
        return source.current;
    }

    useEffect(() => {
        tableListApi();
    }, []);
    //页面卸载清除异步请求
    useEffect(() => {
        return () => {
            if (source.current != null) source.current.cancel();
        }
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

    // 搜索回调方法
    const startSearch = useCallback((values) => {
        if (values.searchStud === '1') {
            search.current.name = values.searchText;
            search.current.userName = '';
        } else {
            search.current.userName = values.searchText;
            search.current.name = '';
        }
        search.current.courseStatus = values.searchStatus;
        page.current = 1;
        tableListApi();
    }, []);
    // 表头
    const columns = [
        {
            title: '学员编号',
            dataIndex: 'username',
            key: 'username',
            render: (username) => <span style={{color: '#FF8C15',cursor: 'pointer'}}>{username}</span>,
            onCell: (record, rowIndex) => {
                return {
                    onClick: event => {
                        console.log(record);
                        history.push(`/admin/teachCenter/stud/checkStud?id=${record.id}`);
                    },
                }
            }

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
        page.current = pagination.current;
        tableListApi();
    };
    let selectedRows = [];
    // 多选改变
    const onSelectChange = (selectedRowKeys, selectedRows) => {
        setSelectedRowKeys(selectedRowKeys);
        selectedRows = selectedRows;
    };
    // 新建学员
    const addStud = () => {
        history.push('/admin/teachCenter/stud/addStud');
    };

    // 学员列表api
    async function tableListApi() {
        getSource();
        try {
            let {data: {code, data}} = await getTableList(
                page.current,
                pageSize.current,
                search.current.courseStatus,
                search.current.name,
                search.current.userName,
                {
                    cancelToken: source.current.token
                }
            );
            if (code === 1) {
                utils.addKey(data.list);
                total.current = data.total;
                setDataList(data.list);
            }
        } catch (e) {
        }

    }

    // 选中行配置
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };

    return (
        <div className="stud-list">
            <CusBread bread={useMemo(() => breadList, [])}/>
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
                                <Button type="primary" onClick={addStud}>新建</Button>
                                <Button>批量分班</Button>
                                <Button>导出</Button>
                            </Space>
                        </Col>
                    </Row>
                    <Row className="mt-20">
                        <Col span={24}>
                            <FilterForm formData={useMemo(() => formData, [])} startSearch={startSearch}/>
                        </Col>
                    </Row>
                    <Row className="mt-20">
                        <Col span={24}>
                            <Table
                                columns={columns}
                                dataSource={dataList}
                                rowSelection={rowSelection}
                                pagination={{
                                    current: page.current,
                                    total: total.current,
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
