import React,{useMemo} from "react";
import {Row,Col,Space,Button}from 'antd'
import CusBread from '../../../components/bread'
import NavBar from '../../../components/navBar'
import FilterForm from '../../../components/fiterForm'
import {readListBread,ListNav} from './data'
import {Utils} from "../../../utils/utils";
const utils = new Utils();
export default function(){
    return (
        <div className="read-list line-read">
            <CusBread bread={useMemo(() => readListBread,[])}/>
            <NavBar navList={useMemo(() => utils.handleNavActive(0,ListNav),[])}/>
            <div className="v-box mt-20">
                <div className="bd">
                    <Row>
                        <Col span={24}>
                            <Space>
                                <Button type="primary">新建</Button>
                            </Space>
                        </Col>
                    </Row>
                    <Row className="mt-20">
                        <Col span={24}>

                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
