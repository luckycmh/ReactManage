/*
 * @author: cmh
 * @Date: 2019-11-21 16:45:01
 * @description: 工具文件
 */
import md5 from 'js-md5';
import crypto from 'crypto'

let Base64 = require('js-base64').Base64;


class Utils {
    constructor() {
    }

    formatDate(time) {
        if (!time) return '';
        let date = new Date(time);
        return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' '
            + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    }

    /**
     * 随机数字+字母函数
     * @param {Number} len 传入出多少位的随机数
     */
    getRandomAlphaNum(len) {
        let rdmString = "";
        for (; rdmString.length < len; rdmString += Math.random().toString(36).substr(2)) ;
        return rdmString.substr(0, len);
    }

    /**
     * 去除字符串空格
     * @param {String} str
     */
    removeAllSpace(str) {
        return str.replace(/\s+/g, "");
    }

    /**
     * 生成签名函数
     * @param {*} params
     *
     *
     */
    getSign(params) {
        if (typeof params == "string") {
            return this.paramsStrSort(params);
        } else if (typeof params == "object") {
            let arr = [];
            for (let i in params) {
                arr.push((i + "=" + params[i]));
            }
            return this.paramsStrSort(arr.join(("&")));
        }
    }

    /**
     * 排序
     * @param {*} paramsStr
     */
    paramsStrSort(paramsStr) {
        let urlStr = paramsStr.split("&").sort().join("&");
        return urlStr;
    }
    /**
     * 分割字符串
     * @param {*} para
     */
    splitParam(para) {
        let arr = para.split("&");
        let allArr = [];
        arr.forEach(item => {
            let keyArr = [];
            let index = item.indexOf('=');
            keyArr = [item.substring(0,index), item.substring(index+1,item.length)];
            if (typeof (keyArr[1]) !== 'object') {
                keyArr[0] = keyArr[0].toLocaleLowerCase();
                keyArr[1] = keyArr[1].toLocaleLowerCase();
                allArr.push(keyArr.join("="));
            }
        });
        return allArr.join("&");
    }

    /**
     *
     * @param {Object} uploadData 需要加密的sign参数
     * @param {Object} file 当前file对象
     */
    fnUploadPara(uploadData, file) {
        let sign = Base64.encode(md5(this.getSign(uploadData)));
        uploadData.sign = sign;
        let formData = new FormData();
        formData.append('file', file);
        Object.keys(uploadData).forEach(item => {
            formData.append(item, uploadData[item])
        });
        return formData;

    }

    /**
     *
     * @param {Object} obj 传入的参数对象
     */
    filterParams(obj) {
        let filterObj = {};
        for (let k in obj) {
            if (typeof (obj[k]) !== 'object') {
                filterObj[k.toLocaleLowerCase()] = obj[k];
            }
        }
        return filterObj;
    }

    /**
     * 获取当前高亮导航
     * @param {Object} menus 所有导航
     * @param {String} menuPath 当前路径path
     */
    getParent(menus, menuPath) {
        if (!menus) return
        let menuName = '';
        let menuKey = '';
        for (let child in menus) {
            if (menus[child].son.length > 0) {
                for (let i = 0; i < menus[child].son.length; i++) {
                    if ( menuPath.indexOf(menus[child].son[i].WebUrl) > -1) {
                        menuName = menus[child].MenuName;
                        menuKey = menus[child].son[i].WebUrl;
                    }
                }
                this.getParent(menus[child].son, menuPath);
            } else {
                menuName = menus[child].MenuName;
                menuKey = menus[child].WebUrl;
            }
        }
        return {menuName,menuKey}
    }


    /**
     * 处理路由
     * @param menus
     */
    resetRoutes(menus) {
        menus.forEach(item => {
            if (item.son && item.son.length) {
                this.resetRoutes(item.son);
            } else {
                if (item.WebUrl) {
                    item.WebUrl = '/admin' + item.WebUrl;
                }
            }

        })
    }

    /**
     * 加密
     * @param {*} data
     */
    encrypt(data) {
        let key = 'anniekids2020051';
        let iv = '1221993112812340';
        let cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
        let crypted = cipher.update(data, 'utf8', 'binary');
        crypted += cipher.final('binary');
        crypted = new Buffer(crypted, 'binary').toString('base64');
        return crypted;
    }

    /**
     * 解密aes
     * @param {*} crypted
     */
    decrypt(crypted) {
        let key = 'anniekids2020051';
        let iv = '1221993112812340';
        crypted = new Buffer(crypted, 'base64').toString('binary');
        let decipher = crypto.createDecipheriv('aes-128-cbc', key, iv);
        let decoded = decipher.update(crypted, 'binary', 'utf8');
        decoded += decipher.final('utf8');
        return decoded;
    }

    controlUrl = value => {
        let url = "http://ossfile.anniekids.com";
        if (value.startsWith("/test") || value.startsWith("/reso")) {
            url = "http://mpfile.anniekids.com";
        }
        return url;
    }
    /**
     * 表格增加key值
     * @param list
     * @returns {*}
     */
    addKey = (list) => {
        if (!list.length) return;
        return list.map(item => item.key = item.id)
    }


}

export {
    Utils
}
