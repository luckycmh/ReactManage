import React, {useState, useEffect} from 'react'
import {Button,Space,Table} from 'antd'
import {statusConf} from "./config";
import {getTableList} from '../../apis/table'

export default function () {
    const convertClass = (status) => {
        let classStr = '';
        switch (status) {
            case 1:
                classStr = 'dot-green';
                break;
            case 2 :
                classStr = 'dot-red';
                break;
            case 3:
                classStr = 'dot-black';
            default:
                break;
        }
        return classStr
    }
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
                <span className={`dot ${convertClass(courseStatus)}`}>
                    {statusConf[courseStatus]}
                </span>
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
    const [tabList, setTabList] = useState([]);
    const [pageInfo, setPageInfo] = useState({
        current:1,
        pageSize:10,
        total:0,
        totalPage:0
    });
    const [selected,setSelected] = useState({keys:[],rows: []});
    const onSelectChange = (selectedRowKeys,selectedRows) => {
        setSelected({
            keys: selectedRowKeys,
            rows: selectedRows
        });
    }
    /**
     * 获取表格数据
     * @returns {Promise<void>}
     * @constructor
     */
    const TableListApi = async () => {
        let {data:{code,data}} = await getTableList(
            pageInfo.current,
            pageInfo.pageSize,
            '',
            '',
            '');
        if (code === 1){
            data.list.forEach(item => {
                item.key = item.id;
            })
            setTabList(data.list);
            setPageInfo({
                    ...pageInfo,
                    total: data.total,
                    current: data.page
                });
        }
    }
    // 初始化请求数据
    useEffect(() => {
        TableListApi();
    },[pageInfo.current,pageInfo.pageSize]);
    // 选择行数据配置
    const rowSelection = {
        selectedRowKeys: selected.keys,
        onChange: onSelectChange,
    }
    const handleTableChange = (pagination,filters) => {
        let {current,pageSize} = pagination;
        setPageInfo({
            ...pageInfo,
            current,
            pageSize
        });
    }
    return (
        <React.Fragment>
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={tabList}
                pagination={{
                    total: pageInfo.total,
                    current: pageInfo.current,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    pageSizeOptions: ['10', '20', '50'],
                    defaultPageSize: pageInfo.pageSize,
                    showTotal: total => {
                        return `共${total}条`;
                    }
                }}
                onChange={handleTableChange}
            />
        </React.Fragment>
    )
}
