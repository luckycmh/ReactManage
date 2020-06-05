// 前端写死的数据

// 面包屑数据
const breadList = [
    {
        href: '',
        name: '学员列表'
    }
];
// 学员姓名or编号选择数据
const studData = [
    {
        value: '1',
        text: '学员姓名'
    },
    {
        value: '2',
        text: '学员编号'
    }

];
//学员课程状态搜索数据
const statusData = [
    {
        text: '全部',
        value: ''
    },
    {
        text: '在读',
        value: '1'
    },
    {
        text: '停课',
        value: '2'
    },
    {
        text: '结课',
        value: '3'
    },
    {
        text: '无课',
        value: '0'
    }
]
export {
    breadList,
    studData,
    statusData
}
