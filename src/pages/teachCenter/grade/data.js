// 班级列表面包屑数据
const breadList = [
    {
        href: '',
        name: '班级列表'
    }
];
// 新建班级面包屑数据
const addGradeBread = [
    {
        href: '/admin/teachCenter/grade',
        name:'班级列表'
    },
    {
        href: '',
        name:'新建班级'
    }
];
// 查看班级面包屑数据
const checkGradeBread = [
    {
        href: {
            pathname: '/admin/teachCenter/grade',
            state: {
                page: 'checkGrade'
            }
        },
        name:'班级列表'
    },
    {
        href: '',
        name:'班级详情'
    }
];
// 列表页查询条件数据
const selectData = [
    {
        value: '1',
        text: '班级名称'
    },
    {
        value: '2',
        text: '教师'
    }
];
export {
    breadList,
    addGradeBread,
    checkGradeBread,
    selectData
}
