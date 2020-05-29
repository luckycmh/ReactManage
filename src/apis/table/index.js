import {axios} from '../../axios'
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
const getTableList = (page, pageSize, courseStatus, name, userName) => axios.post(tableListUrl, {
    page,
    pageSize,
    courseStatus,
    name,
    userName
});

export {
    getTableList
}
