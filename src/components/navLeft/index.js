import React from 'react';
import {useLocation} from 'react-router-dom'
import {Menu} from 'antd';
import {
    Link
} from "react-router-dom";
import {useSelector} from 'react-redux'
import {Utils} from "../../utils/utils";
import './navLeft.less'

const {SubMenu} = Menu;
const utils = new Utils()

export default function () {
    //当前路由导航
    const {pathname} = useLocation();
    // 导航按钮 状态redux
    const {permissionInfo} = useSelector(state => state.userState);
    // 渲染导航结构
    const renderMenu = (data) => {
        if (!data) return;
        return data.map((item) => {
            if (item.son && item.son.length) {
                return (
                    <SubMenu
                        title={item.MenuName}
                        key={item.MenuName}>
                        {renderMenu(item.son)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item title={item.MenuName} key={item.WebUrl}>
                    <Link to={item.WebUrl}>{item.MenuName}</Link>
                </Menu.Item>
            )
        })
    };
    const para = JSON.parse(localStorage.getItem('annieUser'));
    const open = para ?  [utils.getParent(para.permissionInfo,pathname)] : [''];

    return (
        <div className="menu-box">
            <Menu
                mode="inline"
                defaultSelectedKeys={[pathname]}
                defaultOpenKeys={open}
                theme="dark">
                {
                    renderMenu(permissionInfo)
                }
            </Menu>
        </div>
    )
}
