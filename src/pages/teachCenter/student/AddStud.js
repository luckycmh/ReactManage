import React, {useEffect, useMemo, useRef, useState} from 'react'
import {
    Form,
    Upload,
    message,
    Input,
    Radio,
    DatePicker,
    Cascader,
    Button,
    Modal,
    Table
} from 'antd'
import moment from 'moment'
import CusBread from '../../../components/bread'
import {addStudBread} from "./data";
import {uploadInstance} from '../../../axios/uploadInstance'
import {userId, userName} from "../../../consts";
import {Utils} from "../../../utils/utils";
import {cityJson} from '../../pca-codes'
import {getPhoneUser} from '../../../apis/teachCenter/student'
import './index.less'

const utils = new Utils();

export default function () {
    // 表单相关字段
    const [formData, setFormData] = useState({
        headPhoto: '',
        headPhotoUrl: '',
    });
    // 是否展示弹层
    const [studDia, setStudDia] = useState(false);
    // 表格数据源
    const [data, setData] = useState([]);

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
    // 上传前校验
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

    // 上传图片方法
    function uploadImg(file) {
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
    // 删除上传文件
    const deleteImg = () => {
        setFormData((formData) => {
            return {...formData, headPhoto: '', headPhotoUrl: ''}
        });
    };
    // 自定义校验手机号码
    const [phone,setPhone] = useState('');
    // 记录是否已经校验
    const validRef = useRef(false);
    // 记录校验的状态 resolve / reject
    const statusRef = useRef('');
    const validMobile = async (rule, value, callback) => {
        if (!value) {
            return Promise.reject(' ');
        }
        setPhone(phone => phone = value);
        if (phone !== value) {
            validRef.current = false;
        }
        if (!validRef.current) {
            let {data: {code, data}} = await getPhoneUser(value);
            if (code === 1 && data.length) {
                utils.addKey(data);
                setData(prev => prev = data);
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

    const uplodedBox = (
        <div className="uploaded">
            <img className="user-img" src={formData.headPhotoUrl} alt=""/>
            <span className="delete" onClick={deleteImg}></span>
        </div>
    );
    // 表单布局样式
    const layout = {
        labelCol: {span: 4},
        wrapperCol: {span: 20},
    };
    const tailLayout = {
        wrapperCol: {offset: 4, span: 20}
    };
    // 提交表单
    const handleFinish = (values) => {
        console.log(values)
    };

    async function phoneUserApi(phone) {
        let {data: {code, data}} = await getPhoneUser(phone);
        if (code === 1 && data.length) {
            utils.addKey(data);
            setData(data);
            setStudDia(true);
        }
    }

    return (
        <div className="add-stud">
            <CusBread bread={useMemo(() => addStudBread, [])}/>
            <div className="v-box">
                <div className="hd">
                    <h2 className="square">
                        学员基本信息
                    </h2>
                </div>
                <div className="bd">
                    <Form
                        style={{width: '460px'}}
                        {...layout}
                        onFinish={handleFinish}
                    >
                        <Form.Item
                            label="头像"
                            name="headPhoto"
                            className="upload-item"
                        >
                            {
                                formData.headPhoto ?
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
                            label="学员姓名"
                            name="name"
                            validateTrigger="onSubmit"
                            rules={
                                [
                                    {
                                        required: true,
                                        message: ' ',
                                    }
                                ]
                            }
                        >
                            <Input autoComplete="off" allowClear/>
                        </Form.Item>
                        <Form.Item
                            label="英文姓名"
                            name="EnglishName"
                        >
                            <Input autoComplete="off" allowClear/>
                        </Form.Item>
                        <Form.Item
                            label="手机号码"
                            name="phoneNumber"
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
                            label="性别"
                            name="sex"
                        >
                            <Radio.Group>
                                <Radio value={1}>男</Radio>
                                <Radio value={2}>女</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item
                            label="出生日期"
                            name="birthday"
                        >
                            <DatePicker/>
                        </Form.Item>
                        <Form.Item
                            label="微信号"
                            name="wechatNumber"
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
                            <Button className="btn-footer mr-60">取消</Button>
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
