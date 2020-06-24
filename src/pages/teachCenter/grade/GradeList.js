import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react'
import {Row, Col, Button, Space, Badge,Popover, Table} from 'antd';
import moment from 'moment';
import CusBread from "../../../components/bread";
import FilterForm from "../../../components/fiterForm";
import {breadList, selectData} from './data'
import {courseType} from './config'
import {Utils} from "../../../utils/utils";
import {courseListNoPage} from '../../../apis/teachCenter/lesson'
import {getGradeList} from '../../../apis/teachCenter/grade'
import './index.less'
const utils = new Utils();

export default function () {
    // 搜索课程名称数据
    const [course, setCourse] = useState([
        {
            value: '',
            text: '全部'
        }
    ]);
    // 表格数据源
    const [data,setData] = useState([]);
    // 分页数据
    const pageRef = useRef({page:1,total:0});
    // 搜索条件
    const searchRef = useRef({
        className: '',
        course: '',
        teacherName: '',
        startTime: '',
        endTime: ''
    });
    // 表格改变
    const handleChange = (pagination) => {
        pageRef.current.page = pagination.current;
        getGradeListApi();
    };
    // 页面初始化
    useEffect(() => {
        courseListNoPageApi();
        getGradeListApi();
    }, []);
    // 获取课程名称搜索列表
    async function courseListNoPageApi() {
        const {orgId} = JSON.parse(localStorage.getItem('annieUser'));
        const {data: {code, data}} = await courseListNoPage(orgId);
        if (code == 1) {
            data.forEach(item => {
                item.value = item.courseId;
                item.text = item.courseName;
            });
            setCourse((prev) => [...prev, ...data]);
        }
    }
    // 班级列表api
    async function getGradeListApi() {
        const {orgId} = JSON.parse(localStorage.getItem('annieUser'));
        const {data:{code,data}} = await getGradeList(
            orgId,
            pageRef.current.page,
            10,
            searchRef.current.className,
            searchRef.current.course,
            searchRef.current.teacherName,
            searchRef.current.startTime,
            searchRef.current.endTime);
        if (code == 1) {
            utils.addKey(data.list);
            pageRef.current.total = data.total;
            setData(data.list);
        }
    }
    // 定义搜索数据
    const formData = {
        itemArr: [
            {
                type: 'SELECT',
                name: 'gradeSelect',
                label: '',
                placeholder: '',
                data: selectData
            },
            {
                type: 'INPUT',
                name: 'searchText',
                label: '',
                placeholder: ''
            },
            {
                type: 'RANGEDATEPICKER',
                name: 'date',
                label: '开始时间'
            },
            {
                type: 'SELECT',
                name: 'course',
                label: '课程名称',
                data: course
            }
        ],
        initialValues: {
            gradeSelect: '1',
            courseName: ''
        }
    };
    // 搜索回调函数
    const startSearch = useCallback((values) => {
        pageRef.current.page = 1;
        if (values.gradeSelect == '1') {
            searchRef.current.className=values.searchText;
            searchRef.current.teacherName='';
        } else {
            searchRef.current.className='';
            searchRef.current.teacherName=values.searchText;
        }
        searchRef.current.course = values.course;
        if (values.date) {
            searchRef.current.startTime = moment(values.date[0]).format('YYYY-MM-DD');
            searchRef.current.endTime = moment(values.date[1]).format('YYYY-MM-DD');
        } else {
            searchRef.current.startTime = '';
            searchRef.current.endTime = '';
        }
        getGradeListApi();
    }, []);
    // 操作结构
    const optHtml = (
        <ul className="opt-ul">
            <li>分配学员</li>
            <li>排课</li>
            <li>签到</li>
            <li>结课</li>
            <li>删除</li>
        </ul>
    );
    // 表格数据头
    const columns = [
        {
            title: '班级名称',
            key: 'className',
            dataIndex: 'className'
        },
        {
            title: '人数',
            key: '',
            dataIndex: '',
        },
        {
            title: '课程分类',
            key: 'classMode',
            dataIndex: 'classMode',
            render:(classMode) => courseType[classMode]
        },
        {
            title: '课程',
            key: 'courseName',
            dataIndex: 'courseName'
        },
        {
            title: '教师',
            key: 'teacherName',
            dataIndex: 'teacherName'
        },
        {
            title: '开课时间',
            key: 'openingTime',
            dataIndex: 'openingTime'
        },
        {
            title: '排课状态',
            key: 'isCoursePlan',
            dataIndex: 'isCoursePlan',
            render: (isCoursePlan) => {
                return <Badge
                    status={isCoursePlan == 0 ? 'default' : 'success'}
                    text={isCoursePlan == 0 ? '未排课' : '已排课'}
                />
            }
        },
        {
            title: '操作',
            key: 'opt',
            render: () => {
                return <Popover overlayClassName="opt-pop" placement="bottom" title="" content={optHtml}>
                    <Button type="primary">操作</Button>
                </Popover>
            }
        }
    ]
    return (
        <div className="grade-list">
            <CusBread bread={useMemo(() => breadList, [])}/>
            <Row className="mb-20">
                <Col span={24}>
                    <div className="top-bar">
                        <ul className="bar-ul">
                            <li className="active">招生班级</li>
                            <li>开课班级</li>
                            <li>结课班级</li>
                        </ul>
                    </div>
                </Col>
            </Row>
            <div className="v-box">
                <div className="bd">
                    <Row className="mb-20">
                        <Col span={24}>
                            <Space>
                                <Button type="primary">新建</Button>
                                <Button>导出</Button>
                            </Space>
                        </Col>
                    </Row>
                    <Row className="mb-20">
                        <Col span={24}>
                            <FilterForm
                                formData={useMemo(() => formData, [course])}
                                startSearch={startSearch}
                            />
                        </Col>
                    </Row>
                    {/*数据表格*/}
                    <Row>
                        <Col span={24}>
                            <Table
                                columns={columns}
                                dataSource={data}
                                pagination={{
                                    current: pageRef.current.page,
                                    total: pageRef.current.total,
                                    showQuickJumper: true,
                                    showTotal: total => {
                                        return `共${total}条数据`;
                                    }
                                }}
                                onChange={handleChange}
                            />
                        </Col>
                    </Row>
                </div>
            </div>

        </div>
    )
}
