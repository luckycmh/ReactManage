import React, {useState, useEffect} from 'react';
import {useLocation} from 'react-router-dom'
import {Menu} from 'antd';
import {
    Link
} from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux'
import {Utils} from "../../utils/utils";
import './navLeft.less'

const {SubMenu} = Menu;
const utils = new Utils()

export default function () {
    //当前路由导航
    const {pathname} = useLocation();
    // 导航按钮栏 状态
    const [menuTreeNode, setMenuTreeNode] = useState([]);
    // 导航按钮 状态redux
    const {permissionInfo} = useSelector(state => state.userState);
    // 高亮按钮 state
    const [lightTab] = useState(pathname);
    const renderMenu = (data) => {
        return data.map((item, index) => {
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
    //初始化菜单
    useEffect(() => {
        if (permissionInfo !== undefined) {
            setMenuTreeNode(renderMenu(permissionInfo));
        }
    }, [permissionInfo]);

    // 导航点击事件
    const handleClick = (e) => {
        console.log('click', e);
    }
    return (
        <div className="menu-box">
            <Menu
                onClick={(e) => {
                    handleClick(e)
                }}
                mode="inline"
                defaultSelectedKeys={[lightTab]}
                // defaultOpenKeys={[defaultOpen]}
                theme="dark">
                {menuTreeNode}
            </Menu>
        </div>
    )
}
