import axios from 'axios'
import qs from 'qs'
import React from 'react';
import ReactDOM from 'react-dom';
import {message, Spin} from 'antd';
// 响应时间
axios.defaults.timeout = 5000;
// 配置请求头
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
let baseURL = 'https://testclassapi.anniekids.com';
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

axios.interceptors.request.use(config => {
    // 才创建loading, 避免重复创建
    if (config.headers.isLoading !== false) {
        showLoading()
    }
    if (config.method === 'post') {
        config.data = qs.stringify(config.data);
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
