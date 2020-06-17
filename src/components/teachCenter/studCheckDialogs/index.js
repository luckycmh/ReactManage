import React, {memo, useImperativeHandle, forwardRef, useState} from 'react'
import {Modal, Button, Form, Input} from 'antd';
import {changeStudStatus} from "../../../apis/teachCenter/student";
import {classListNoPage} from "../../../apis/teachCenter/grade";

const {TextArea} = Input;


let OperateDialog = ({courseInfo, updateList}, ref) => {
    console.log('子组件', ref)
    // 停课弹窗
    const [stopClass, setStopClass] = useState(false);
    // 复课弹窗
    const [reStart,setReStart] = useState(false);
    // classId,classCode
    const [classInfo, setClassInfo] = useState({classId: '', classCode: ''});
    const [stopForm] = Form.useForm();
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
            setReStart(true);
        }
    }));

    // 停课弹窗提交
    const submitStopClass = () => {
        subCourseStatus();
    };
    // 复课弹窗提交
    const submitReStart = () => {

    };

    async function subCourseStatus() {
        let {detail, type} = courseInfo;
        let {data: {code, data}} = await changeStudStatus(
            detail.id,
            type,
            classInfo.classId,
            classInfo.classCode,
            stopForm.getFieldValue('explain'));
        if (code == 1) {
            setStopClass(false);
            updateList();
        }
    };
    async function noPageClassList() {
        let {data:{code,data}} = await classListNoPage(JSON.parse(localStorage.getItem('annieUser')).orgId);
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
            >
                {
                    Object.keys(courseInfo.detail).length &&
                    <p className="mb-20">
                        原班级剩余{courseInfo.detail.calssArr[0].surpluscourseHour}课时，
                        您可将学员回复至原班级，或者选择新的班级
                    </p>
                }
            </Modal>
        </React.Fragment>
    )

};

OperateDialog = forwardRef(OperateDialog);
export default memo(OperateDialog);
