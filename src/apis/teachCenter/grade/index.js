import {network} from '../../../axios/network'
// 查询班级列表接口不分页
const classListNoPageUrl = '/api/v1/TeClass/orgClassList';
// 调班保存接口
const addTransUrl = '/api/v1/TeClass/studentTransfer';

// 班级列表接口url
const gradeListUrl = '/api/v1/TeClass/classList';
// 新建或者编辑班级保存接口
const addGradeUrl = '/api/v1/TeClass/classSaveAdd';

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
/**
 * 编辑或者新建班级
 * @param {*} id
 * @param {*} orgId
 * @param {*} courseId
 * @param {*} courseType上课形式
 * @param {*} className
 * @param {*} classHour
 * @param {*} courseHour
 * @param {*} openingTime
 * @param {*} endTime
 * @param {*} staffId
 * @param {*} teacherName
 * @param {*} staffTaId
 * @param {*} explain
 */
const addGrade = (id, orgId, courseId, courseType, className, classHour, courseHour, openingTime, staffId, teacherName, staffTaId, explain) => network.post(addGradeUrl, {
    id,
    orgId,
    courseId,
    courseType,
    className,
    classHour,
    courseHour,
    openingTime,
    staffId,
    teacherName,
    staffTaId,
    explain
});
export {
    classListNoPage,
    addTrans,
    getGradeList,
    addGrade
}
