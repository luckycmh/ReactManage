import {network} from '../../../axios/network'
// 查询班级列表接口不分页
const classListNoPageUrl = '/api/v1/TeClass/orgClassList';
// 调班保存接口
const addTransUrl = '/api/v1/TeClass/studentTransfer';

// 班级列表接口url
const gradeListUrl = '/api/v1/TeClass/classList';

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
/**
 * 获取班级列表数据
 * @param {*} page
 * @param {*} pageSize
 * @param {*} className
 * @param {*} courseId
 * @param {*} teacherName
 * @param {*} starttime
 * @param {*} endtime
 */
const getGradeList = (orgId, page, pageSize, className, courseId, teacherName, starttime, endtime) => network.post(gradeListUrl, {
    orgId,
    page,
    pageSize,
    className,
    courseId,
    teacherName,
    starttime,
    endtime
});
export {
    classListNoPage,
    addTrans,
    getGradeList
}
