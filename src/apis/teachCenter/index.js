import {network} from '../../axios/network'
// 教师/助教列表接口url
const teacherUrl = '/api/v1/TeClass/teacherList';
/**
 * 助教或者老师列表
 * @param {*} orgId
 * @param {*} positionId
 */
const getTeacher = (orgId, positionId) => network.post(teacherUrl, {
    orgId,
    positionId
});

export {getTeacher}
