import React from 'react';
import { Menu } from 'antd';
import {
    Link
} from "react-router-dom";
import './navLeft.less'
import menuList from '../../config/menuConfig'
const { SubMenu } = Menu;
function handleClick(e) {
    console.log('click', e);
}
export default class NavLeft extends React.Component{
    UNSAFE_componentWillMount() {
        const menuTreeNode = this.renderMenu(menuList)
        this.setState({
            menuTreeNode
        })
    }
    renderMenu = (data) => {
        return data.map(item => {
            if (item.children) {
                return (
                    <SubMenu title={item.title} key={item.key}>
                        { this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item title={item.title} key={item.key}>
                    <Link to={item.key}>{item.title}</Link>
                </Menu.Item>
            )
        })
    }
    render() {
        return (
            <div className="menu-box">
                <div className="logo">
                    <img src="/assets/logo-ant.svg" alt=""/>
                    <span className="text-des">iconmoon</span>
                </div>
                    <Menu onClick={handleClick} mode="vertical" theme="dark">
                        {this.state.menuTreeNode}
                    </Menu>
            </div>
        )
    }
}
