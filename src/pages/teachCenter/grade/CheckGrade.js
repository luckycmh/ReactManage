import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Card, Button, Divider, Descriptions, Tabs, Badge, Space, Table} from 'antd'
import {useQuery} from "../../../utils/tools";
import {Utils} from "../../../utils/utils";
import CusBread from "../../../components/bread";
import {checkGradeBread} from './data'
import {statusConf} from "../student/config";
import {getGradeInfo, getGradeStud} from '../../../apis/teachCenter/grade'

const {TabPane} = Tabs;
const utils = new Utils();
export default function () {
    const query = useQuery();
    const id = query.get("id");
    // 班级信息
    const [gradeInfo, setGradeInfo] = useState({});
    // 表格数据
    const [data, setData] = useState([]);
    // 班级学员分页信息
    const pageRef = useRef({page: 1, total: 0});
    // 设置多选选中
    // const [selectedRowKeys,setSelectedRowKeys] = useState([]);

    // 切换tab
    const handleTab = (key) => {

    };
    // 学员表格改变
    const handleTableChange = (pagination) => {

    };
    // 多选改变
    const onSelectChange = (selectedRowKeys,selectedRows) => {
    };

    // 班级详情
    async function getGradeInfoApi() {
        const {data: {code, data}} = await getGradeInfo(id);
        if (code == 1) {
            setGradeInfo(prev => ({...prev, ...data}));
        }
    };

    // 班级内学员列表
    async function getGradeStudApi() {
        const {data: {code, data}} = await getGradeStud(id, pageRef.current.page);
        if (code == 1) {
            utils.addKey(data.list);
            pageRef.current.total = data.total;
            setData(data.list);
        }
    };
    useEffect(() => {
        getGradeInfoApi();
        getGradeStudApi();
    }, []);
    const extra = (
        <div>
            <span style={{cursor: 'pointer'}}>开班中</span>
            <Divider type="vertical"/>
            <span style={{color: '#FF8C15', cursor: 'pointer'}}>编辑</span>
        </div>
    );
    const gradeInfoArr = [
        {
            label: '所属课程',
            text: gradeInfo.courseName
        },
        {
            label: '课时',
            text: gradeInfo.courseHour
        },
        {
            label: '开班日期',
            text: gradeInfo.openingTime
        },
        {
            label: '结班日期',
            text: gradeInfo.endTime
        },
        {
            label: '网课开课时间',
            text: gradeInfo.startTime
        },
        {
            label: '班级人数',
            text: gradeInfo.classNumber
        },
        {
            label: '上课时间',
            text: ''
        },
        {
            label: '备注',
            text: gradeInfo.explain
        },
    ];
    // 表格表头定义
    const columns = [
        {
            title: '姓名',
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: '学员编号',
            key: 'username',
            dataIndex: 'username'
        },
        {
            title: '性别',
            key: 'sex',
            dataIndex: 'sex'
        },
        {
            title: '手机号码',
            key: 'phoneNumber',
            dataIndex: 'phoneNumber'
        },
        {
            title: '状态',
            key: 'courseStatus',
            dataIndex: 'courseStatus',
            render: (courseStatus) => {
                courseStatus = courseStatus == null ? '0' : courseStatus;
                return <Badge status={statusConf[courseStatus].type} text={statusConf[courseStatus].text}/>
            }
        },
        {
            title: '操作',
            key: 'opt',
            render: (record) =>
                <Space>
                    <Button type="primary" size="small">调班</Button>
                    <Button type="danger" size="small">解除激活</Button>
                </Space>
        }
    ];
    // 多选
    const rowSelection = {
        onChange: onSelectChange
    };

    return (
        <div className="check-grade">
            <CusBread bread={useMemo(() => checkGradeBread, [])}/>
            <Card title="班级名称" className="top-border mb-20" extra={extra}>
                <Descriptions>
                    {
                        gradeInfoArr.map(item =>
                            item.text &&
                            <Descriptions.Item key={item.label} label={item.label}>
                                {item.text}
                            </Descriptions.Item>
                        )
                    }
                </Descriptions>
            </Card>
            {/*tab切换*/}
            <Tabs defaultActiveKey="stud" onChange={handleTab}>
                <TabPane tab="学员" key="stud">
                    <div className="v-box">
                        <div className="bd">
                            <Table
                                columns={columns}
                                dataSource={data}
                                rowSelection={rowSelection}
                                pagination={{
                                    current: pageRef.current.page,
                                    total: pageRef.current.total,
                                    showQuickJumper: true,
                                    showTotal: total => {
                                        return `共${total}条数据`;
                                    }
                                }}
                                onChange={handleTableChange}
                            />
                        </div>
                    </div>

                </TabPane>
                <TabPane tab="排课" key="arrange">
                    <div className="v-box">
                        <div className="bd">
                            排课
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="上课记录" key="record">
                    <div className="v-box">
                        <div className="bd">
                            上课记录
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="课堂点评" key="comment">
                    <div className="v-box">
                        <div className="bd">
                            课堂点评
                        </div>
                    </div>
                </TabPane>
                <TabPane tab="作业" key="work">
                    <div className="v-box">
                        <div className="bd">
                            作业
                        </div>
                    </div>
                </TabPane>
            </Tabs>
        </div>
    )
}
