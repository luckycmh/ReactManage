/*
 * @author: cmh
 * @Date: 2019-12-09 10:42:36
 * @description: 上传请求
 */
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import moment from 'moment'
import {message, Spin} from 'antd';

let Base64 = require('js-base64').Base64;
let baseURL;
if (window.location.host === 'teacherhomeworkweb.anniekids.com') {
    // 线上环境
    baseURL = 'https://filesystemmanageapi.anniekids.com';
} else {
    // 测试
    baseURL = 'https://testresource.anniekids.com';
}
//显示loading
const showLoading = () => {
    let dom = document.createElement('div')
    dom.setAttribute('id', 'loading')
    document.body.appendChild(dom)
    ReactDOM.render(<Spin tip="加载中..." size="large"/>, dom)
}
//关闭loading
const hideLoading = () => {
    document.body.removeChild(document.getElementById('loading'))
}
let uploadInstance = axios.create({
    baseURL: baseURL,
    timeout: 360000,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});
uploadInstance.interceptors.request.use((config) => {
    showLoading()
    let time = moment().format('X');
    let baseKey = Base64.encode(`7f4567c0ca31f1ceb7ab22fd2ad7eca3${time}`);
    config.headers['baseKey'] = baseKey;

    return config;
});
// 返回状态判断(添加响应拦截器)
uploadInstance.interceptors.response.use(response => {
    hideLoading();
    if (response.data.status === 1010 || response.data.status === -1) {
        message.error(response.data.msg);
    }
    return response
}, error => {
    hideLoading();
    // Do something with response error
    console.warn('axios response error');
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error') { // 请求超时
        message.warning('网络连接异常！')
    }
    return Promise.reject(error)
})

export {
    uploadInstance
}
