import React, {useMemo, useState} from 'react'
import {Form, Upload, message, Input} from 'antd'
import moment from 'moment'
import CusBread from '../../../components/bread'
import {addStudBread} from "./data";
import {uploadInstance} from '../../../axios/uploadInstance'
import {userId, userName} from "../../../consts";
import {Utils} from "../../../utils/utils";
import './index.less'

const utils = new Utils();

export default function () {
    const [formData, setFormData] = useState({
        headPhoto: '',
        headPhotoUrl: ''
    });

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
    const validMobile = (rule,value,callback) => {
        console.log(rule)
        if (!value ) {
            return Promise.reject('值不能为空');
        }
        return Promise.resolve('456');
    }

    const uplodedBox = (
        <div className="uploaded">
            <img className="user-img" src={formData.headPhotoUrl} alt=""/>
            <span className="delete" onClick={deleteImg}></span>
        </div>
    )
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
                            <Input autoComplete="off"/>
                        </Form.Item>
                        <Form.Item
                            label="英文姓名"
                            name="EnglishName"
                        >
                            <Input autoComplete="off"/>
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
                            <Input autoComplete="off"/>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    )
}
