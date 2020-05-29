import React, {useState, useEffect} from 'react'
import {Button,Space,Table,Card} from 'antd'
import {statusConf} from "./config";
import {getTableList} from '../../apis/table'

export default function () {
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
            render: (courseStatus) => <span>{statusConf[courseStatus]}</span>
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
    const [pageInfo, setPageInfo] = useState({page:1,pageSize:10,total:0,totalPage:0});
    /**
     * 获取表格数据
     * @returns {Promise<void>}
     * @constructor
     */
    const TableListApi = async () => {
        let {data:{code,data}} = await getTableList(1,10,'','','');
        console.log(data);
        if (code === 1){
            data.list.forEach(item => {
                item.key = item.username;
            })
            setTabList(data.list)
        }
    }
    useEffect(() => {
        TableListApi();
    },[]);

    return (
        <React.Fragment>
            <Card>
                <Table columns={columns} dataSource={tabList} />
            </Card>
        </React.Fragment>
    )
}
