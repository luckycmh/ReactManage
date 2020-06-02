import axios from 'axios'
import qs from 'qs'
import React from 'react';
import ReactDOM from 'react-dom';
import {message, Spin} from 'antd';
import md5 from 'js-md5';
let Base64 = require('js-base64').Base64;
import Cookies from 'js-cookie'
import {
    Utils
} from '../utils/utils'
const utils = new Utils();
// 响应时间
axios.defaults.timeout = 5000;
// 配置请求头
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
let baseURL;
// 地址待更换
if (window.location.host === 'teacherhomeworkweb.anniekids.com') {
    // 线上
    baseURL = 'https://homeworkapi.anniekids.com';
} else {
    baseURL = 'https://portalapi.anniekids.com';
}
axios.defaults.baseURL = baseURL;
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
// 获取userId
let userId = '';
axios.interceptors.request.use(config => {
    //获取cookie
    let ANNIEKIDSUSS = Cookies.get('ANNIEKIDSUSS');
    ANNIEKIDSUSS ? config.headers['ANNIEKIDSUSS'] = ANNIEKIDSUSS : '';
    userId = localStorage.getItem('annieUser') ? JSON.parse(utils.decrypt(localStorage.getItem('annieUser'))).userId : '';
    // 才创建loading, 避免重复创建
    if (config.headers.isLoading !== false) {
        showLoading()
    }
    if (config.method === 'post') {
        config.data = {
            time: parseInt((new Date()).getTime() / 1000),
            SystemType: 2,
            userId,
            ...config.data
        };
        let filtered = utils.filterParams(config.data);
        let signed = utils.getSign(filtered) + '&annieportalkey=0f977b6090bc11e89de47ef7fbe91ebc';
        config.data.signature = Base64.encode(md5(signed));
        config.data = qs.stringify(config.data);
    }else if (config.method === 'get') {
        config.params = {
            time: parseInt((new Date()).getTime() / 1000),
            SystemType: 2,
            userId,
            ...config.params
        };
        let filtered = utils.filterParams(config.params);
        let signed = utils.getSign(filtered) + '&annieportalkey=0f977b6090bc11e89de47ef7fbe91ebc';
        config.params.signature = Base64.encode(md5(signed));

    }
    return config
}, err => {
    // 判断当前请求是否设置了不显示Loading
    if (err.config.headers.isLoading !== false) {
        hideLoading()
    }
    return Promise.reject(err)
})

// 返回后拦截
axios.interceptors.response.use(res => {
    // 判断当前请求是否设置了不显示Loading
    if (res.config.headers.isLoading !== false) {
        hideLoading()
    }
    return res
}, err => {
    if (err.config.headers.isLoading !== false) {
        hideLoading()
    }
    if (err.message === 'Network Error') {
        message.warning('网络连接异常！')
    }
    if (err.code === 'ECONNABORTED') {
        message.warning('请求超时，请重试')
    }
    return Promise.reject(err)
})
export {axios}
