import axios from 'axios'
import qs from 'qs'
import React from 'react';
import ReactDOM from 'react-dom';
import {message, Spin} from 'antd';
import md5 from 'js-md5';
import Cookies from 'js-cookie'
import {
    Utils
} from '../utils/utils'
let Base64 = require('js-base64').Base64;

const utils = new Utils();
let baseURL;
// 地址待更换
if (window.location.host === 'teacherhomeworkweb.anniekids.com') {
    // 线上
    baseURL = 'https://homeworkapi.anniekids.com';
} else {
    baseURL = 'https://testclassapi.anniekids.com';
}
//获取cookie
let ANNIEKIDSUSS = Cookies.get('ANNIEKIDSUSS');
const network = axios.create({
    baseURL: baseURL,
    timeout: '60000',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        ANNIEKIDSUSS
    }
});
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

network.interceptors.request.use(config => {
    let {userId,mobile} = localStorage.getItem('annieUser') ? JSON.parse(localStorage.getItem('annieUser')) : '';
    // 才创建loading, 避免重复创建
    if (config.headers.isLoading !== false) {
        showLoading()
    }
    if (config.method === 'post') {
        config.data = {
            time: parseInt((new Date()).getTime() / 1000),
            userId,
            number:mobile,
            ...config.data
        };
        let sort = utils.getSign(config.data); //排序
        let filtered = utils.splitParam(sort); // 转小写
        let signed = filtered + '&annieteachingkey=8ec7a5141975d86854aa474eb0b3e7ff';
        config.data.signature = Base64.encode(md5(signed));
        config.data = qs.stringify(config.data);
    }else if (config.method === 'get') {
        config.params = {
            time: parseInt((new Date()).getTime() / 1000),
            userId,
            number:mobile,
            ...config.params
        };
        let sort = utils.getSign(config.params); //排序
        let filtered = utils.splitParam(sort); // 转小写
        let signed = filtered + '&annieteachingkey=8ec7a5141975d86854aa474eb0b3e7ff';
        config.params.signature = Base64.encode(md5(signed));

    }
    return config
}, err => {
    // hideLoading()
    return Promise.reject(err)
})

// 返回后拦截
network.interceptors.response.use(res => {
    // 判断当前请求是否设置了不显示Loading
    if (res.config.headers.isLoading !== false) {
        hideLoading()
    }
    // 这个根据后台返回的状态码判断token有没有过期，若过期，跳到登录页面
    if (res.data.code === 1013) {
        localStorage.removeItem("annieUser");
        Cookies.remove('ANNIEKIDSUSS');
        window.location.href = '/login';
    } else if (res.data.code === 0) {
        message.error(res.data.msg);
    } else if (res.data.code === 1012) {
        // store.dispatch('common/setError', response.data.msg);
        // this.$router.push({
        //     path: '/error'
        // });
    }
    return res
}, err => {
    hideLoading();
    if (err.message === 'Network Error') {
        message.warning('网络连接异常！')
    }
    if (err.code === 'ECONNABORTED') {
        message.warning('请求超时，请重试')
    }
    return Promise.reject(err)
})
export {network}
