import React, {useEffect, useMemo, useState} from 'react'
import {Form, Select, Input, Button, DatePicker} from "antd";
import {useHistory} from 'react-router-dom'
import moment from 'moment'
import CusBread from "../../../components/bread";
import {addGradeBread} from './data';
import './index.less'
import {courseListNoPage} from '../../../apis/teachCenter/lesson'
import {getTeacher} from '../../../apis/teachCenter'
import {addGrade} from '../../../apis/teachCenter/grade'

const {Option} = Select;
const {TextArea} = Input;
export default function () {
    const history = useHistory();
    // 课程列表
    const [course, setCourse] = useState([]);
    // 教师列表
    const [teacher, setTeacher] = useState([]);
    // 助教列表
    const [helper, setHelper] = useState([]);
    // 新建班级
    const handleFinish = (values) => {
        addGradeApi(values);
    };
    // 取消
    const handleCancel = () => {
        history.push('/admin/teachCenter/grade');
    };


    // 获取课程名称搜索列表
    async function courseListNoPageApi() {
        const {orgId} = JSON.parse(localStorage.getItem('annieUser'));
        const {data: {code, data}} = await courseListNoPage(orgId);
        if (code == 1) {
            setCourse((prev) => [...prev, ...data]);
        }
    };

    // 教师接口
    async function getTeacherApi() {
        const {orgId} = JSON.parse(localStorage.getItem('annieUser'));
        const {data: {code, data}} = await getTeacher(orgId, '2020');
        if (code == 1) {
            setTeacher(data)
        }
    };

    // 助教
    async function getHelperApi() {
        const {orgId} = JSON.parse(localStorage.getItem('annieUser'));
        const {data: {code, data}} = await getTeacher(orgId, '2017');
        if (code == 1) {
            setHelper(data);
        }
    };

    // 保存班级
    async function addGradeApi(values) {
        const {orgId} = JSON.parse(localStorage.getItem('annieUser'));
        const {courseId, className, classHour, openingTime, teacher, staffTaId, explain} = values;
        let staffId = '', teacherName = '';
        if (teacher) {
            const teacherArr = teacher.split("-");
            staffId = teacherArr[0];
            teacherName = teacherArr[1];
        }
        const courseInfo = courseId.split("-");
        const {data: {code, data}} = await addGrade(
            -1,
            orgId,
            courseInfo[0],
            courseInfo[1],
            className,
            classHour,
            courseInfo[2],
            openingTime ? moment(openingTime).format('YYYY-MM-DD') : '',
            staffId,
            teacherName,
            staffTaId,
            explain
        );
        if (code == 1) {
            history.push('/admin/teachCenter/grade');
        }
    };
    useEffect(() => {
        courseListNoPageApi();
        getTeacherApi();
        getHelperApi();
    }, []);
    const layout = {
        labelCol: {span: 4},
        wrapperCol: {span: 20}
    };
    return (
        <div className="add-grade">
            <CusBread bread={useMemo(() => addGradeBread, [])}/>
            <div className="v-box">
                <div className="hd">
                    <h2 className="square">班级基本信息</h2>
                </div>
                <div className="bd">
                    <div className="sub-vbox">
                        <div className="sub-hd">
                            <h2 className="line">基本信息</h2>
                        </div>
                        <div className="sub-bd">
                            <Form
                                style={{width: '480px'}}
                                {...layout}
                                validateTrigger="onSubmit"
                                onFinish={handleFinish}
                            >
                                <Form.Item
                                    label="选择课程"
                                    name="courseId"
                                    rules={[
                                        {
                                            required: true,
                                            message: ' '
                                        }
                                    ]}
                                >
                                    <Select>
                                        {
                                            course.map(item =>
                                                <Option
                                                    key={item.courseId}
                                                    value={`${item.courseId}-${item.classMode}-${item.courseHour}`}
                                                >
                                                    {item.courseName}
                                                </Option>
                                            )
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="班级名称"
                                    name="className"
                                    rules={[
                                        {
                                            required: true,
                                            message: ' '
                                        }
                                    ]}
                                >
                                    <Input autoComplete="off"/>
                                </Form.Item>
                                <Form.Item
                                    label="抵扣课时"
                                    className="cus-label"
                                >
                                    <span style={{lineHeight: '32px'}}>学员抵扣</span>
                                    <Form.Item
                                        name="classHour"
                                        style={{width: '100px', display: 'inline-block', marginBottom: '0'}}
                                        rules={[
                                            {
                                                required: true,
                                                message: ' ',
                                            }
                                        ]}
                                        getValueFromEvent={
                                            (event) =>
                                                event.target.value.replace(/[^\d]/g, '').replace(/^0{1,}/g, '')
                                        }>
                                        <Input autoComplete="off"/>
                                    </Form.Item>
                                    <span style={{lineHeight: '32px'}}>课时</span>
                                </Form.Item>
                                <Form.Item
                                    label="开班日期"
                                    name="openingTime"
                                >
                                    <DatePicker disabledDate={
                                        (current) => current && current < moment().subtract(1, 'days')}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="教师"
                                    name="teacher"
                                    extra="教师和助教可对班级学员记上课和布置作业(需要拥有相关权限)"
                                >
                                    <Select>
                                        {
                                            teacher.map(item =>
                                                <Option key={item.staffId} value={`${item.staffId}-${item.CnName}`}>
                                                    {item.CnName}
                                                </Option>
                                            )
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="助教"
                                    name="staffTaId"
                                >
                                    <Select>
                                        {
                                            helper.map(item =>
                                                <Option key={item.staffId} value={item.staffId}>
                                                    {item.CnName}
                                                </Option>
                                            )
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="备注"
                                    name="explain"
                                >
                                    <TextArea rows={4} resize="none"/>
                                </Form.Item>
                                <Form.Item wrapperCol={{span: 20, offset: 4}}>
                                    <Button className="btn-footer mr-60" onClick={handleCancel}>取消</Button>
                                    <Button className="btn-footer" type="primary" htmlType="submit">确定</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
