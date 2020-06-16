import React, {useMemo, useState} from 'react'
import {Row, Col, Button, Descriptions, Tabs, Card,Divider,Badge,Table} from 'antd'
import {DownOutlined, UpOutlined} from '@ant-design/icons'
import CusBread from '../../../components/bread'
import {useQuery} from '../../../utils/tools'
import {checkStudBread} from './data'
import {studInGradeStatus} from './config'
import './index.less'

const {TabPane} = Tabs;

export default function () {
    const query = useQuery();
    const id = query.get('id');
    const username = query.get('username');
    console.log(id, username);
    const [more, setMore] = useState(false);
    const [cardList,setCardList] = useState([]);
    // 卡片右侧结构
    const extra = (
        <div className="btns-wrap">
            <Button className="mr-10">停课</Button>
            <Button className="mr-10">结课</Button>
            <Button className="mr-10">调班</Button>
            <Button className="mr-10">移出班级</Button>
        </div>
    );
    // card 表格表头
    const columns = [
        {
            title: '班级名称',
            key: 'className',
            dataIndex: 'className'
        },
        {
            title: '状态',
            key: 'openingstatus',
            dataIndex: 'openingstatus',
            render: (openingstatus) => <Badge
                status={studInGradeStatus[openingstatus]}
                text={studInGradeStatus[openingstatus]}/>
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
            key: 'classHour',
            dataIndex: 'classHour'
        }
    ];
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
                    <img src="/assets/images/error.png" alt="" className="photo"/>
                    <div className="top-info mb-10">
                        <span className="mr-10 name">Mommou</span>
                        <span className="mr-10 gender">(男)</span>
                        <span className="status">无课</span>
                    </div>
                    <div className="other-info">
                        <span className="mr-20">学员编号：100616117</span>
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
                                    <Descriptions title="User Info">
                                        <Descriptions.Item label="英文名">Zhou Maomao</Descriptions.Item>
                                        <Descriptions.Item label="手机号">1810000000</Descriptions.Item>
                                        <Descriptions.Item label="微信号">weixin</Descriptions.Item>
                                        <Descriptions.Item label="出生日期">2020-02-29</Descriptions.Item>
                                        <Descriptions.Item label="地址">
                                            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                                        </Descriptions.Item>
                                        <Descriptions.Item label="备注">
                                            No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                                        </Descriptions.Item>
                                    </Descriptions>
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
                                <Card
                                    title="测试1"
                                    extra={extra}
                                    bordered={false}
                                    className="custom-card mb-20">
                                    <Row className="card-cont" gutter={16}>
                                        <Col span={4}>
                                            <div className="time-info">
                                                <Descriptions column={1}>
                                                    <Descriptions.Item label="报名时间">Cloud Database</Descriptions.Item>
                                                    <Descriptions.Item label="开班时间">Cloud Database</Descriptions.Item>
                                                    <Descriptions.Item label="网课课程">
                                                        <span>已激活</span>
                                                        <Divider type="vertical"/>
                                                        <Button type="primary" size="small">解除激活</Button>
                                                    </Descriptions.Item>
                                                </Descriptions>
                                            </div>
                                        </Col>
                                        <Col span={20}>
                                            <Table columns={columns} dataSource={[]}/>
                                        </Col>
                                    </Row>
                                </Card>
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
