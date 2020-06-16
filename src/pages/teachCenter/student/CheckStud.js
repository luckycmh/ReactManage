import React, {useEffect, useMemo, useRef, useState} from 'react'
import {Row, Col, Button, Descriptions, Tabs, Card, Divider, Badge, Table, Pagination} from 'antd'
import {DownOutlined, UpOutlined} from '@ant-design/icons'
import classnames from 'classnames'
import CusBread from '../../../components/bread'
import {useQuery} from '../../../utils/tools'
import {checkStudBread} from './data'
import {statusConf, studInGradeStatus,classMode} from './config'
import {getStud, getStudGradeList} from '../../../apis/teachCenter/student'
import {Utils} from "../../../utils/utils";
import './index.less'

const utils = new Utils();

const {TabPane} = Tabs;

export default function () {
    const query = useQuery();
    const id = query.get('id');
    const username = query.get('username');
    console.log(id, username);
    // 是否展示更多信息
    const [more, setMore] = useState(false);
    // 学员信息
    const [studInfo, setStudInfo] = useState({});
    // 学员加入班级列表
    const [cardList, setCardList] = useState([]);
    // 班级列表分页信息
    const pageInfo = useRef({
        page: 1,
        total: 0
    });
    // 分页改变
    const handlePageChange = (page,pageSize) => {
        pageInfo.current.page = page;
        getStudGradeListApi();
    };

    // 页面初始化
    useEffect(() => {
        getStudInfoApi();
        getStudGradeListApi();
    }, []);

    // 获取学员详情信息api
    async function getStudInfoApi() {
        const {data: {code, data}} = await getStud(id);
        if (code === 1) {
            //    courseStatus headPhoto
            data.courseStatusText = statusConf[data.courseStatus].text;
            data.headPhotoUrl = data.headPhoto ? utils.controlUrl(data.headPhoto) + data.headPhoto : '';
            setStudInfo(data);
        }
    };

    // 获取学员加入的班级列表
    async function getStudGradeListApi() {
        const {data: {code, data}} = await getStudGradeList(pageInfo.current.page, username);
        if (code === 1) {
            pageInfo.current.total = data.total;
            data.list.forEach(item => {
                item.calssArr[0].key = item.calssArr[0].className;
            });
            setCardList(data.list);
        }
    }

    // 更多信息数据
    const studInfoArr = [
        {
            label: '英文名',
            text: studInfo.englishName
        },
        {
            label: '手机号',
            text: studInfo.phoneNumber
        },
        {
            label: '微信号',
            text: studInfo.wechatNumber
        },
        {
            label: '出生日期',
            text: studInfo.birthday
        },
        {
            label: '地址',
            text: studInfo.address
        },
        {
            label: '备注',
            text: studInfo.explain
        }
    ];
    const studInfoHtml = (
        <Descriptions>
            {
                studInfoArr.map(
                    item => item.text &&
                        <Descriptions.Item label={item.label} key={item.label}>{item.text}</Descriptions.Item>
                )
            }
        </Descriptions>
    );

    /**
     * 卡片右侧结构
     * @param status 课程状态
     * @param suspensionTime 停课 结课
     * @param removeTime 移出班级
     * @returns {*}
     */

    const extraHtml = (status,suspensionTime,removeTime) => {
        return (
            <div className="btns-wrap">
                {
                    status == 1 && <Button className="mr-10">停课</Button>
                }
                {
                    status == 2 && <Button className="mr-10">复课</Button>
                }
                {
                    status == 1 && <Button className="mr-10">结课</Button>
                }
                {
                    (status == 1 || status == 0) && <Button className="mr-10">调班</Button>
                }
                {
                    (status == 1 || status == 0) && <Button className="mr-10">移出班级</Button>
                }
                {
                    status == 4 && <Button className="mr-10">恢复班级</Button>
                }
                {
                    status == 2 && <span className="tip">{suspensionTime + '停课'}</span>
                }
                {
                    status == 3 && <span className="tip">{suspensionTime + '手动结课'}</span>
                }
                {
                    status == 4 && <span className="tip">{removeTime + '移出班级'}</span>
                }

            </div>
        );
    }
    // 卡片标题自定义
    const titleHtml = (status,courseName) => {
        return (
            <div className="fl cus-tit">
                <span
                    className={classnames('mr-10',{
                        'type-green':status==2,
                        'type-yellow':status==1,
                        'type-red':status==3
                    })}
                >
                    {
                        classMode[status]
                    }
                </span>
                <span className="type">{courseName}</span>
            </div>
        )
    };
    // card 表格表头
    const columns = [
        {
            title: '班级名称',
            key: 'className',
            dataIndex: 'className',
            width: 400
        },
        {
            title: '状态',
            key: 'openingstatus',
            dataIndex: 'openingstatus',
            render: (openingstatus) => <Badge
                status={studInGradeStatus[openingstatus].type}
                text={studInGradeStatus[openingstatus].text}/>
        },
        {
            title: '激活码',
            key: 'activationCode',
            dataIndex: 'activationCode'
        },
        {
            title: '教师',
            key: 'teacherName',
            dataIndex: 'teacherName'
        },
        {
            title: '已用课时',
            key: 'usedcourseHour',
            dataIndex: 'usedcourseHour'
        }
    ];
    // 卡片内容结构
    const cardHtml = (listArr) => {
        return listArr.map(item =>
                <Card
                    key={item.id}
                    title={titleHtml(item.courseType,item.courseName)}
                    extra={item.calssArr.length ?
                        extraHtml(item.calssArr[0].openingstatus,item.suspensionTime,item.removeTime)
                        : ''
                    }
                    bordered={false}
                    className="custom-card">

                    <Row className="card-cont" gutter={16}>
                        <Col span={4}>
                            <div className="time-info">
                                <Descriptions column={1}>
                                    <Descriptions.Item label="报名时间">{item.createTime}</Descriptions.Item>
                                    <Descriptions.Item label="开班时间">{item.openingTime}</Descriptions.Item>
                                    <Descriptions.Item label="网课课程">
                                        <span>已激活</span>
                                        <Divider type="vertical"/>
                                        <Button type="primary" size="small">解除激活</Button>
                                    </Descriptions.Item>
                                </Descriptions>
                            </div>
                        </Col>
                        <Col span={20}>
                            {
                                item.calssArr.length ?
                                    <Table columns={columns} dataSource={item.calssArr} pagination={false}/> :
                                    <div className="unstart">未开班</div>
                            }

                        </Col>
                    </Row>
                </Card>
        )
    };

    return (
        <div className="check-stud">
            <CusBread bread={useMemo(() => checkStudBread, [])}></CusBread>
            <div className="main-box">
                <Row className="black-bar">
                    <Col span={24}>
                        <div className="fr">
                            <ul className="opt-ul">
                                <li className="mr-10">编辑</li>
                                <li className="active">删除</li>
                            </ul>
                        </div>
                    </Col>
                </Row>
                <div className="stud-info">
                    <img src={studInfo.headPhotoUrl} alt=" " className="photo"/>
                    <div className="top-info mb-10">
                        <span className="mr-10 name">{studInfo.name}</span>
                        <span className="mr-10 gender">({studInfo.sex})</span>
                        <span className="status">{studInfo.courseStatusText}</span>
                    </div>
                    <div className="other-info">
                        <span className="mr-20">学员编号：{studInfo.userName}</span>
                        <span
                            className="more"
                            onClick={
                                () => {
                                    setMore((more) => more = !more)
                                }
                            }> 更多信息
                            {
                                more ? <UpOutlined/> : <DownOutlined/>
                            }
                        </span>
                    </div>
                </div>
                {
                    more && <Row className="more-box mb-20">
                        <Col span={24}>
                            <div className="v-box">
                                <div className="bd">
                                    {
                                        studInfoHtml
                                    }
                                </div>
                            </div>
                        </Col>
                    </Row>
                }
                <Row className="list-cards">
                    <Col span={24}>
                        <Tabs defaultActiveKey="grade">
                            <TabPane tab="班级" key="grade">
                                <div className="mb-20">
                                    <Button type="primary">分班</Button>
                                </div>
                                {
                                    cardHtml(cardList)
                                }
                                <Pagination
                                    defaultCurrent={pageInfo.current.page}
                                    total={pageInfo.current.total}
                                    showTotal={() => `共${pageInfo.current.total}条数据`}
                                    showQuickJumper
                                    onChange={handlePageChange}
                                />
                            </TabPane>
                            <TabPane tab="上课记录" key="record">
                                Content of Tab Pane 2
                            </TabPane>
                            <TabPane tab="操作日志" key="log">
                                Content of Tab Pane 3
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>

            </div>
        </div>
    )
}
