import React from 'react';
import './index.less'

export default function() {

    return (
        <div className="entry">
            <div className="v-box">
                <div className="hd">
                    <h2 className="square">运营数据</h2>
                </div>
                <div className="bd">
                    <ul className="card-box">
                        <li>
                            <div className="fl">
                                <img src="/assets/images/main/order-today.png" alt=""/>
                            </div>
                            <div className="text-box">
                                <div className="text circle">今日订单</div>
                                <div className="number circle">20</div>
                            </div>
                        </li>
                        <li>
                            <div className="fl">
                                <img src="/assets/images/main/waiting-order.png" alt=""/>
                            </div>
                            <div className="text-box">
                                <div className="text circle orange">待处理订单</div>
                                <div className="number circle orange">30</div>
                            </div>
                        </li>
                        <li>
                            <div className="fl">
                                <img src="/assets/images/main/visit-today.png" alt=""/>
                            </div>
                            <div className="text-box">
                                <div className="text circle red">今日访问数</div>
                                <div className="number circle red">30</div>
                            </div>
                        </li>
                        <li>
                            <div className="fl">
                                <img src="/assets/images/main/earning-today.png" alt=""/>
                            </div>
                            <div className="text-box">
                                <div className="text circle yellow">今日收入</div>
                                <div className="number circle yellow">30</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="v-box">
                <div className="hd">
                    <h2 className="square">班级数据</h2>
                </div>
                <div className="bd">
                    <ul className="card-box">
                        <li>
                            <div className="fl">
                                <img src="/assets/images/main/recrut-class.png" alt=""/>
                            </div>
                            <div className="text-box">
                                <div className="text circle">招生班级</div>
                                <div className="number circle">20</div>
                            </div>
                        </li>
                        <li>
                            <div className="fl">
                                <img src="/assets/images/main/work-num.png" alt=""/>
                            </div>
                            <div className="text-box">
                                <div className="text circle">布置作业数量</div>
                                <div className="number circle">20</div>
                            </div>
                        </li>
                        <li>
                            <div className="fl">
                                <img src="/assets/images/main/student.png" alt=""/>
                            </div>
                            <div className="text-box">
                                <div className="text circle">学生</div>
                                <div className="number circle">20</div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="v-box">
                <div className="hd">
                    <h2 className="square">常用功能</h2>
                </div>
                <div className="bd">
                    <ul className="tools">
                        <li>
                            <div className="icon-wrap">
                                <span className="iconfont iconxinjiankecheng1"></span>
                            </div>
                            <div className="text">新建课程</div>
                        </li>
                        <li>
                            <div className="icon-wrap">
                                <span className="iconfont iconxinjianxueyuan"></span>
                            </div>
                            <div className="text">新建学员</div>
                        </li>
                        <li>
                            <div className="icon-wrap">
                                <span className="iconfont iconxinjianbanji"></span>
                            </div>
                            <div className="text">新建班级</div>
                        </li>
                        <li>
                            <div className="icon-wrap">
                                <span className="iconfont iconpaike"></span>
                            </div>
                            <div className="text">排课</div>
                        </li>
                        <li>
                            <div className="icon-wrap">
                                <span className="iconfont icondaka"></span>
                            </div>
                            <div className="text">打卡</div>
                        </li>
                        <li>
                            <div className="icon-wrap">
                                <span className="iconfont iconkechengdingdan"></span>
                            </div>
                            <div className="text">课程订单</div>
                        </li>
                        <li>
                            <div className="icon-wrap">
                                <span className="iconfont icondaijinquan"></span>
                            </div>
                            <div className="text">代金券</div>
                        </li>
                        <li>
                            <div className="icon-wrap">
                                <span className="iconfont iconkechenghuodong"></span>
                            </div>
                            <div className="text">课程活动</div>
                        </li>
                        <li>
                            <div className="icon-wrap">
                                <span className="iconfont iconqunfaxiaoxi"></span>
                            </div>
                            <div className="text">群发消息</div>
                        </li>
                        <li>
                            <div className="icon-wrap">
                                <span className="iconfont iconfahuodingdan"></span>
                            </div>
                            <div className="text">发货订单</div>
                        </li>
                        <li>
                            <div className="icon-wrap">
                                <span className="iconfont iconjiaocaiguanli"></span>
                            </div>
                            <div className="text">教材管理</div>
                        </li>
                        <li>
                            <div className="icon-wrap">
                                <span className="iconfont iconchangjianwenti"></span>
                            </div>
                            <div className="text">常见问题</div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
