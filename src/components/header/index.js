import React from 'react';
import {Row, Col, Divider } from 'antd';
import utils from "../../utils/utils";
import Axios from '../../axios'
import './index.less'

export default class Header extends React.Component {
    UNSAFE_componentWillMount() {
        this.setState({
            userName: '管理员'
        });
        setInterval(()=>{
            let sysTime = utils.formatDate(new Date().getTime());
            this.setState({
                sysTime
            })
        },1000);
        this.getWeatherApi();
    }

    getWeatherApi = () => {
        Axios.jsonp({
            url: 'http://api.map.baidu.com/telematics/v3/weather?location=beijing&output=json&ak=3p49MVra6urFRGOT9s8UBWr2'
        }).then(res => {
            if (res.status === 'success') {
                let weather = res.results[0].weather_data[0];
                this.setState({
                    weatherPic: weather.dayPictureUrl,
                    weatherText: weather.weather
                })
            }
        })
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
