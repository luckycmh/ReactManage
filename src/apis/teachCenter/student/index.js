import {network} from '../../../axios/network'
// table列表url
const tableListUrl = '/api/v1/TeUser/userList';
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

export {
    getTableList
}
