import {network} from '../../../axios/network'
// 查询班级列表接口不分页
const classListNoPageUrl = '/api/v1/TeClass/orgClassList';
// 调班保存接口
const addTransUrl = '/api/v1/TeClass/studentTransfer';

/**
 * 班级列表不分页数据
 * @param {*} orgId
 */
const classListNoPage = (orgId) => network.post(classListNoPageUrl, {
    orgId
});
/**
 * 调班保存
 * @param {*} classId 调入的班级id
 * @param {*} classCode 调出班级的classcode
 * @param {*} id 调出列表id
 */
const addTrans = (classId, classCode, id) => network.post(addTransUrl, {
    classId,
    classCode,
    id
});
export {
    classListNoPage,
    addTrans
}
