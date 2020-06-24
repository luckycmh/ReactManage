import {network} from '../../../axios/network'
// 课程列表url不分页
const courseListNoPageUrl = '/api/v1/TeClass/courseList';

/**
 * 课程列表
 * @param {*} orgId
 */
const courseListNoPage = (orgId, classMode) => network.post(courseListNoPageUrl, {
    orgId,
    classMode
});

export {
    courseListNoPage
}
