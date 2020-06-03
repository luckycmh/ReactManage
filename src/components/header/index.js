import React from 'react';
import {Row, Col, Divider } from 'antd';
import {Utils} from "../../utils/utils";
import './index.less'
const utils = new Utils();

export default class Header extends React.Component {
    UNSAFE_componentWillMount() {
        this.setState({
            userName: '管理员',
            sysTime: ''
        });
        // setInterval(()=>{
        //     let sysTime = utils.formatDate(new Date().getTime());
        //     this.setState({
        //         sysTime
        //     })
        // },1000);
        //this.getWeatherApi();
    }


    render() {
        return (
            <div className="header">
                <Row className="top-part">
                    <Col span={24} className="top-detail">
                        <span>
                            你好，{this.state.userName}
                        </span>
                        <a href="https://www.baidu.com/">退出</a>
                    </Col>
                </Row>
                <Divider style={{margin: '0',borderTopColor:'#ffa940'}}/>
                <Row className="bottom-part">
                    <Col span={4} className="breadcrumb">
                        首页
                    </Col>
                    <Col span={20} className="weather-box">
                        <span className="date">
                            {this.state.sysTime}
                        </span>
                        <span className="weather">
                            <img src={this.state.weatherPic} alt=""/>
                            {this.state.weatherText}
                        </span>
                    </Col>
                </Row>
            </div>
        )
    }
}
