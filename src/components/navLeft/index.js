import React,{useState,useEffect} from 'react';
import {Menu} from 'antd';
import {
    Link
} from "react-router-dom";
import {useSelector} from 'react-redux'
import './navLeft.less'

const {SubMenu} = Menu;

export default function () {
    const [menuTree,setMenuTree] = useState([]);
    
    const {permissionInfo} = useSelector(state => state.userState);
    const renderMenu = (data) => {
        return data.map(item => {
            if (item.son && item.son.length) {
                return (
                    <SubMenu title={item.MenuName} key={item.MenuName}>
                        {renderMenu(item.son)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item title={item.MenuName} key={JSON.stringify(item)}>
                    <Link to={item.WebUrl}>{item.MenuName}</Link>
                </Menu.Item>
            )
        })
    };
    useEffect(() => {
        if (permissionInfo !== undefined) {
            setMenuTree(renderMenu(permissionInfo))
        }
    },[permissionInfo])
    const handleClick = () => {
        console.log('click', e);
    }
    return (
        <div className="menu-box">
            <Menu onClick={handleClick} mode="inline" defaultSelectedKeys="" theme="dark">
                {menuTree}
            </Menu>
        </div>
    )
}
