// 学员状态
const statusConf = {
    '0': {text: '无课', type: 'default'},
    '1': {text: '在读', type: 'warning'},
    '2': {text: '停课', type: 'error'},
    '3': {text: '结课', type: 'success'}
};
// 学员加入班级的课程状态
const studInGradeStatus = {
    '0': {text: '未开课', type: 'default'},
    '1': {text: '开课中', type: 'error'},
    '2': {text: '停课', type: 'error'},
    '3': {text: '结课', type: 'error'},
    '4': {text: '移出班级', type: 'error'}
};

// 课程类型
const classMode = {
    '1': '线上',
    '2': '双线',
    '3': '面授'
};


export {
    statusConf,
    studInGradeStatus,
    classMode
}
