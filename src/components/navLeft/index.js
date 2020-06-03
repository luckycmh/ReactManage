import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom'
import {Menu} from 'antd';
import {
    Link
} from "react-router-dom";
import {useSelector} from 'react-redux'
import {Utils} from "../../utils/utils";
import iconFont from "../../utils/iconfont"
import { createFromIconfontCN } from '@ant-design/icons';

import './navLeft.less'

const {SubMenu} = Menu;
const utils = new Utils()

const IconFont = createFromIconfontCN({
    scriptUrl: iconFont,
});
export default function () {
    //当前路由导航
    const {pathname} = useLocation();
    // 导航按钮 状态redux
    const {permissionInfo} = useSelector(state => {
        return state.userState
    });
    const [open,setOpen] = useState(['']);
    // 渲染导航结构
    const renderMenu = (data) => {
        if (!data) return;
        return data.map((item) => {
            if (item.son && item.son.length) {
                return (
                    <SubMenu
                        title={item.MenuName}
                        key={item.MenuName}
                        icon={<IconFont type={item.IcoClass}/>}
                    >
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
    useEffect(() => {
        if(permissionInfo){
            setOpen([utils.getParent(permissionInfo, pathname)]);
        }
    }, [permissionInfo]);

    return (
        <div className="menu-box">
            {
                open[0] && (<Menu
                    mode="inline"
                    defaultSelectedKeys={[pathname]}
                    defaultOpenKeys={open}
                    theme="dark"
                >
                    {
                        renderMenu(permissionInfo)
                    }
                </Menu>)
            }
        </div>
    )
}
