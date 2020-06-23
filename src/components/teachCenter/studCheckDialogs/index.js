import React, {memo, useImperativeHandle, forwardRef, useState, useRef} from 'react'
import {Modal, Select, Form, Input} from 'antd';
import {changeStudStatus, getStudGradeIds, removeStud} from "../../../apis/teachCenter/student";
import {classListNoPage, addTrans} from "../../../apis/teachCenter/grade";

const {TextArea} = Input;
const {Option} = Select;


let OperateDialog = ({courseInfo, username, updateList}, ref) => {
    const {detail} = courseInfo;
    // 停课弹窗
    const [stopClass, setStopClass] = useState(false);
    // 复课弹窗
    const [reStart, setReStart] = useState(false);
    // 结课弹窗
    const [end, setEnd] = useState(false);
    // 调班弹窗
    const [transit, setTransit] = useState(false);
    // 班级列表数据
    const [lists, setLists] = useState([]);
    // 调班记录调入的班级id
    let comeGradeId = '';
    // classId班级id,classCode班级code   id 当前点击listId
    const {classId, classCode, id} = detail;
    const classInfo = {
        classId,
        classCode
    };
    const [stopForm] = Form.useForm();
    const [transForm] = Form.useForm();
    // 参数ref为目标元素ref的引用
    useImperativeHandle(ref, () => ({
        //    暴露给父元素的方法
        //    1.打开停课弹窗
        openStopClass: () => {
            stopForm.resetFields();
            setStopClass(true);
        },
        //    2.打开复课弹窗
        openReStart: () => {
            noPageClassList();
        },
        //    3.打开结课弹窗
        openEnd: () => {
            setEnd(true);
        },
        //    4.调班弹窗
        openTransit: () => {
            getStudGradeIdsApi();
        },
        //    5.移出班级
        operateInOrOut: () => {
            removeStudApi();
        }
    }));

    // 停课弹窗提交
    const submitStopClass = () => {
        subCourseStatus();
    };
    // 改变选择复课班级
    const selectChange = (val, type) => {
        if (type) {
            comeGradeId = val;
        } else {
            const arr = val.split('-');
            classInfo.classId = arr[0];
            classInfo.classCode = arr[1];
        }

    };
    // 复课弹窗提交
    const submitReStart = () => {
        subCourseStatus();
    };
    // 结课弹窗提交
    const submitEnd = () => {
        subCourseStatus();
    };
    // 调班弹窗提交
    const submitTransit = () => {
        addTransApi();
    };

    // 停课复课结课提交接口
    async function subCourseStatus() {
        let {detail, type} = courseInfo;
        let explain = type == '2' ? stopForm.getFieldValue('explain') : '';
        if (type == '2' || type == '3') {
            classInfo.classId = '';
            classInfo.classCode = '';
        }
        let {data: {code}} = await changeStudStatus(
            detail.id,
            type,
            classInfo.classId,
            classInfo.classCode,
            explain);
        if (code == 1) {
            if (type == '2') {
                setStopClass(false);
            } else if (type == '1') {
                setReStart(false);
            } else if (type == '3') {
                setEnd(false);
            }

            updateList();
        }
    };

    // 获取班级列表接口
    async function noPageClassList(disabledData) {
        let {type} = courseInfo;
        let {data: {code, data}} = await classListNoPage(JSON.parse(localStorage.getItem('annieUser')).orgId);
        if (code == 1) {
            if (type == '1') {
                //复课
                setReStart(true);
            } else if (type == '') {
                //    调班
                disabledData.forEach(item => {
                    data.forEach(subItem => {
                        if (item.classId == subItem.id) {
                            subItem.disabled = true;
                        } else {
                            if (!subItem.disabled) {
                                subItem.disabled = false;
                            }
                        }
                    });
                });
                transForm.resetFields();
                setTransit(true);
            }
            setLists(data);

        }
    };

    // 获取学员已加入班级的id
    async function getStudGradeIdsApi() {
        let {data: {code, data}} = await getStudGradeIds(username);
        if (code == 1) {
            noPageClassList(data)
        }
    };

    // 调班提交
    async function addTransApi() {
        let {data: {code}} = await addTrans(comeGradeId, classInfo.classCode, id);
        if (code == 1) {
            setTransit(false);
            updateList();
        }
    };
    // 移入或者移出班级接口
    async function removeStudApi() {
        const {type} = courseInfo;
        const status = type == 'out' ? '1' : '0';
        let {data:{code}} = await removeStud(id,status);
        if (code == 1) {
            updateList();
        }
    }

    return (
        <React.Fragment>
            {/*停课弹层结构*/}
            <Modal
                title="停课"
                visible={stopClass}
                onOk={submitStopClass}
                onCancel={() => setStopClass(false)}
            >
                <p className="mb-20">是否确定停课？停课后将不能对学员记上课,不扣课时</p>
                <Form form={stopForm}>
                    <Form.Item
                        name="explain"
                        label="备注"
                    >
                        <TextArea rows={4} placeholder="50字以内" maxLength="50" resize="none"/>
                    </Form.Item>
                </Form>
            </Modal>
            {/*复课弹层*/}
            <Modal
                title="复课"
                visible={reStart}
                onOk={submitReStart}
                onCancel={() => setReStart(false)}
                wrapClassName="restart-dia"
            >
                {
                    Object.keys(courseInfo.detail).length &&
                    <p className="mb-20">
                        原班级剩余{courseInfo.detail.calssArr[0].surpluscourseHour}课时，
                        您可将学员回复至原班级，或者选择新的班级
                    </p>

                }
                <Select
                    showSearch
                    defaultValue={`${classInfo.classId}-${classInfo.classCode}`}
                    optionFilterProp="children"
                    onChange={selectChange}
                    filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                >
                    {
                        lists.map(item =>
                            <Option value={`${item.id}-${item.classCode}`} key={item.id}>{item.className}</Option>
                        )
                    }
                </Select>
            </Modal>
            {/* 结课弹层 */}
            <Modal
                title="结课"
                visible={end}
                onOk={submitEnd}
                onCancel={() => setEnd(false)}
            >
                {
                    Object.keys(courseInfo.detail).length &&
                    <p>
                        您确定为报读的【{courseInfo.detail.calssArr[0].className}】结课？
                        <span style={{color: 'red'}}>此操作不可恢复！</span>
                    </p>
                }

            </Modal>
            {/*调班*/}
            <Modal
                title="调班"
                visible={transit}
                onOk={submitTransit}
                onCancel={() => setTransit(false)}
                wrapClassName="adjust-dia"
            >
                {
                    Object.keys(courseInfo.detail).length &&
                    <p className="mb-20">转出班级: {courseInfo.detail.calssArr[0].className}</p>
                }
                <Form form={transForm}>
                    <Form.Item
                        name="tranSelect"
                        label="转入班级"
                    >
                        <Select

                            showSearch
                            optionFilterProp="children"
                            onChange={(val) => selectChange(val, 'adjust')}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                lists.map(item =>
                                    <Option value={item.id} key={item.id}
                                            disabled={item.disabled}>{item.className}</Option>
                                )
                            }
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </React.Fragment>
    )

};

OperateDialog = forwardRef(OperateDialog);
export default memo(OperateDialog);
