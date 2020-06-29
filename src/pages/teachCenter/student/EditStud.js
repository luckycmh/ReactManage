import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Form, Input, Select, Upload, Radio, DatePicker, Cascader, Button, message, Modal, Table} from "antd";
import {useHistory} from 'react-router-dom'
import moment from 'moment'
import {useQuery} from '../../../utils/tools'
import {Utils} from "../../../utils/utils";

import CusBread from '../../../components/bread'
import {getStud,getPhoneUser, addStud} from '../../../apis/teachCenter/student'
import './index.less'
import {cityJson} from "../../pca-codes";
import {uploadInstance} from "../../../axios/uploadInstance";

const utils = new Utils();

export default function() {
    const query = useQuery();
    const history = useHistory();
    const id = query.get('id');
    const username = query.get('username');
    const breadData = [
        {
            href: `/admin/teachCenter/stud/checkStud?id=${id}&username=${username}`,
            name: '学员详情'
        },
        {
            href: '',
            name: '编辑学员信息'
        }
    ];
    // 表单
    const [form] = Form.useForm();
    // 表单相关字段
    const [formData, setFormData] = useState({});
    // 是否展示弹层
    const [studDia, setStudDia] = useState(false);
    // 表格数据源
    const [data, setData] = useState([]);
    // 校验的手机号
    const [phone,setPhone] = useState('');
    // 记录当前手机号是否被校验过，防止多次同一个手机号校验浪费带宽
    const validRef = useRef(false);
    // 每次校验的状态记录 成功/失败
    const statusRef = useRef('');

    // 弹层表格数据
    const columns = [
        {
            title: '学员号',
            key: 'userName',
            dataIndex: 'userName',
        },
        {
            title: '姓名',
            key: 'name',
            dataIndex: 'name'
        },
        {
            title: '所属馆',
            key: 'OrgName',
            dataIndex: 'OrgName'
        }
    ];
    // 上传图片方法
    const fnUpload = (option) => {
        const {file} = option;
        const fileExtend = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
        const rulefileExtend = '.jpg、.jpeg、.png';
        if (rulefileExtend.indexOf(fileExtend) === -1) {
            message.error('只能上传.jpg、.jpeg、.png格式文件！');
            return false;
        } else {
            // 判断大小
            let isLt100M = file.size / 1024 / 1024 <= 5;
            if (!isLt100M) {
                message.error('图片文件大小不超过5M！');
                return false;
            }
            uploadImg(file);
        }
    };
    function uploadImg(file) {
        const {userId,userName} = JSON.parse(localStorage.getItem('annieUser'));
        const imgObj = {
            timestamp: moment().format('X'),
            classId: '',
            status: 0,
            title: file.name,
            releaseId: userId,
            releaseName: userName,
            isInside: 0,
            cid: 0,
            source: 6
        };
        const formData = utils.fnUploadPara(imgObj, file);
        uploadInstance.post('/Api/v1/ImgSet/imgUploadSub', formData).then(res => {
            let {data, status} = res.data;
            if (status === 0) {
                setFormData((formData) => {
                    return {...formData, headPhoto: data.filePath, headPhotoUrl: data.fileUrl}
                });

            }
        }).catch(err => {
            console.log(err)
        })

    };
    // 删除图片
    const deleteImg = () => {
        setFormData({headPhoto:'',headPhotoUrl:''});
    };
    // 校验手机号
    const validMobile = async(rule, value,callback) => {
        if (!value) return Promise.reject(' ');
        const reg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!reg.test(value)) return Promise.reject('输入的手机号不合法！');
        setPhone(value);
        if (phone !== value) {
            validRef.current = false;
        }
        if (!validRef.current) {
            let {data: {code, data}} = await getPhoneUser(value);
            if (code === 1 && data.length) {
                utils.addKey(data);
                setData(prev => ([...prev,...data]));
                statusRef.current = 'reject';
            } else {
                statusRef.current = 'resolve';
            }
            validRef.current = true;
        }
        if (statusRef.current === 'reject') {
            setStudDia(true);
            return Promise.reject('当前手机号下面有学员，请先进行转馆操作!');
        } else if (statusRef.current === 'resolve') {
            return Promise.resolve();
        }
    };
    // 提交表单
    const handleFinish = (val) => {
        addStudApi(val);
    };
    // 取消
    const handleCancel = () => {
        history.push({
            pathname: '/admin/teachCenter/stud/checkStud',
            search:`?id=${id}&username=${username}`
        })
        // history.push(`/admin/teachCenter/stud/checkStud?id=${id}&username=${username}`);
    };
    // 页面apis
    async function getStudApi() {
        const {data:{code,data}} = await getStud(id);
        if (code == 1) {
            if (data.sex == '男') {
                data.sex = 1;
            } else if (data.sex == '女') {
                data.sex = 2;
            }
            data.birthday = moment(data.birthday,'YYYY-MM-DD');
            data.placeInfo = data.province? [data.province-0,data.city-0,data.county-0] : [];
            form.setFieldsValue(data);
            setFormData({
                headPhotoUrl:data.headPhoto ? utils.controlUrl(data.headPhoto) + data.headPhoto : '',
                headPhoto: data.headPhoto
            });
        }
    };
    // 提交表单
    async function addStudApi(values) {
        let province = '', city = '', county = '';
        if (values.placeInfo.length) {
            province = values.placeInfo[0];
            city = values.placeInfo[1];
            county = values.placeInfo[2];
        }
        if (values.sex) {
            values.sex = values.sex === '1' ? '男': '女';
        }
        const {data: {code, data}} = await addStud(
            id,
            formData.headPhoto,
            values.name,
            values.englishName,
            values.phoneNumber,
            values.sex,
            values.birthday.format('YYYY-MM-DD'),
            values.wechatNumber,
            province,
            city,
            county,
            values.address,
            values.explain);
        if (code == 1) {
            history.push(`/admin/teachCenter/stud/checkStud?id=${id}&username=${username}`);
        }
    };
    useEffect(() => {
        getStudApi();
    },[]);
    const layout = {
        labelCol: {span:4},
        wrapperCol: {span:20}
    };
    const tailLayout = {
        wrapperCol: {offset: 4, span: 20}
    };
    // 已上传图片结构
    const uplodedBox = (
        <div className="uploaded">
            <img className="user-img" src={formData.headPhotoUrl} alt=""/>
            <span className="delete" onClick={deleteImg}></span>
        </div>
    );
    return (
        <div className="add-stud">
            <CusBread bread={useMemo(() => breadData,[])}/>
            <div className="v-box">
                <div className="hd">
                    <h2 className="square">学员基本信息</h2>
                </div>
                <div className="bd">
                    <Form
                        form={form}
                        style={{width:'460px'}}
                        {...layout}
                        onFinish={handleFinish}
                    >
                        <Form.Item
                            label="头像"
                            name="headPhoto"
                            className="upload-item"
                        >
                            {
                                formData.headPhotoUrl?
                                    uplodedBox :
                                    <Upload
                                        showUploadList={false}
                                        customRequest={fnUpload}
                                        fileList={[]}
                                    >
                                        <div>
                                            <div className="user-bg-upload"></div>
                                        </div>
                                    </Upload>
                            }
                        </Form.Item>
                        <Form.Item
                            name="name"
                            label="学员姓名"
                            validateTrigger="onSubmit"
                            rules={[
                                {
                                    required: true,
                                    message: ' '
                                }
                            ]}
                        >
                            <Input autoComplete="off" allowClear/>
                        </Form.Item>
                        <Form.Item
                            name="englishName"
                            label="英文姓名"
                        >
                            <Input autoComplete="off" allowClear/>
                        </Form.Item>
                        <Form.Item
                            name="phoneNumber"
                            label="手机号码"
                            validateTrigger="onBlur"
                            rules={[
                                {
                                    required: true,
                                    validator: validMobile
                                }
                            ]}
                        >
                            <Input autoComplete="off" allowClear/>
                        </Form.Item>
                        <Form.Item
                            name="sex"
                            label="性别"
                        >
                            <Radio.Group>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            name="birthday"
                            label="出生日期"
                        >
                            <DatePicker
                                format="YYYY-MM-DD"
                                disabledDate={(current) => current >= moment().endOf('day')}
                            />
                        </Form.Item>
                        <Form.Item
                            name="wechatNumber"
                            label="微信号"
                        >
                            <Input autoComplete="off" allowClear/>
                        </Form.Item>
                        <Form.Item
                            label="地址"
                            name="placeInfo"
                        >
                            <Cascader
                                options={cityJson}
                                expandTrigger="hover"
                            />
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{offset: 4, span: 20}}
                            name="address"
                        >
                            <Input.TextArea rows={4} placeholder="最多可输入150字符" maxLength="150" resize="none"/>
                        </Form.Item>
                        <Form.Item
                            label="备注"
                            name="explain"
                        >
                            <Input.TextArea rows={4} placeholder="最多可输入150字符" maxLength="150" resize="none"/>
                        </Form.Item>
                        <Form.Item
                            {...tailLayout}
                        >
                            <Button className="btn-footer mr-60" onClick={handleCancel}>取消</Button>
                            <Button className="btn-footer" type="primary" htmlType="submit">确定</Button>
                        </Form.Item>
                    </Form>
                </div>
                <Modal
                    title="学员信息"
                    visible={studDia}
                    onCancel={() => {
                        setStudDia(false)
                    }}
                    footer={null}
                >
                    <Table columns={columns} dataSource={data} pagination={false}></Table>
                </Modal>
            </div>
        </div>
    )
}
