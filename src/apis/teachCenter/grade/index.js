import {network} from '../../../axios/network'
// 查询班级列表接口不分页
const classListNoPageUrl = '/api/v1/TeClass/orgClassList';

/**
 * 班级列表不分页数据
 * @param {*} orgId
 */
const classListNoPage = (orgId) => network.post(classListNoPageUrl, {
    orgId
});
export {
    classListNoPage
}
