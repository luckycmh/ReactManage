import {network} from '../../../axios/network'
// table列表url
const tableListUrl = '/api/v1/TeUser/userList';
// 查询手机号下学员列表url
const phoneUserUrl = '/api/v1/TeUser/phoneUserList';
// 添加/编辑学员url
const addStudUrl = '/api/v1/TeUser/userAddSave';
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
/**
 * 添加或者编辑学员
 * @param {*} id
 * @param {*} name
 * @param {*} headPhoto
 * @param {*} EnglishName
 * @param {*} phoneNumber
 * @param {*} parentsName
 * @param {*} parentsPhone
 * @param {*} province
 * @param {*} city
 * @param {*} county
 * @param {*} address
 * @param {*} birthday
 * @param {*} sex
 * @param {*} wechatNumber
 */
const addStud = (id, headPhoto, name, EnglishName, phoneNumber, sex, birthday, wechatNumber, province, city, county, address, explain) => network.post(addStudUrl, {
    id,
    name,
    headPhoto,
    EnglishName,
    phoneNumber,
    province,
    city,
    county,
    address,
    birthday,
    sex,
    wechatNumber,
    explain
});

export {
    getTableList,
    getPhoneUser,
    addStud
}
