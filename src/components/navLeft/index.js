import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom'

import {Menu, Badge} from 'antd';
import {
    Link
} from "react-router-dom";
import {useSelector,useDispatch} from 'react-redux'
import {Utils} from "../../utils/utils";
import iconFont from "../../utils/iconfont"
import {createFromIconfontCN} from '@ant-design/icons';
import {handleTopNav} from "../../redux/common/actions";


import './navLeft.less'

const {SubMenu} = Menu;
const utils = new Utils()

const IconFont = createFromIconfontCN({
    scriptUrl: iconFont,
});
export default function () {
    //派发action
    const dispatch = useDispatch();
    //当前路由导航
    const {pathname} = useLocation();
    // 导航按钮 状态redux
    const {permissionInfo} = useSelector(state => {
        return state.userState
    });
    //顶部导航
    const topNav = useSelector(state => state.getTopNav);
    const [menuDef, setMenuDef] = useState({open: [''], key: ['']});
    //点击子导航
    const menuItemClick = (item) => {
        const hasItem = topNav.some(el => el.path == item.WebUrl);
        if(!hasItem) {
            const tab = {
                title: item.MenuName,
                path: item.WebUrl,
                isShow: true
            };
            dispatch(handleTopNav({type:'add', tab}));
        }
    };
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
                <Menu.Item
                    title={item.MenuName}
                    key={item.WebUrl}
                    icon={<IconFont type={item.IcoClass ? item.IcoClass : 'icon-default'}/>}
                    onClick={() => menuItemClick(item)}
                >
                    <Link to={item.WebUrl}>
                        {!item.IcoClass && <Badge status="default"/>}
                        {
                            item.MenuName
                        }
                    </Link>
                </Menu.Item>
            )
        })
    };
    useEffect(() => {
        if (permissionInfo) {
            const {menuName,menuKey} = utils.getParent(permissionInfo, pathname);
            const newState = {
                open: [menuName],
                key: [menuKey]
            };
            setMenuDef((menuDef) => {
                return {...menuDef, ...newState}
            });
        }
    }, [permissionInfo]);

    return (
        <div className="menu-box">
            {
                menuDef.open[0] && menuDef.key[0] && (<Menu
                    mode="inline"
                    defaultSelectedKeys={menuDef.key}
                    defaultOpenKeys={menuDef.open}
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
