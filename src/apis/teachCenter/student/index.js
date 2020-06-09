import {network} from '../../../axios/network'
// table列表url
const tableListUrl = '/api/v1/TeUser/userList';
// 查询手机号下学员列表url
const phoneUserUrl = '/api/v1/TeUser/phoneUserList';
/**
 * 获取table列表接口
 * @param {*} page
 * @param {*} pageSize
 * @param {*} courseStatus
 * @param {*} name
 * @param {*} userName
 */
const getTableList = (page, pageSize, courseStatus, name, userName,{cancelToken}) => network.post(tableListUrl, {
    page,
    pageSize,
    courseStatus,
    name,
    userName
},{cancelToken});
/**
 * 获取手机号下学员列表
 * @param {*} phone
 */
const getPhoneUser = (phone) => network.post(phoneUserUrl, {
    phone
});

export {
    getTableList,
    getPhoneUser
}
