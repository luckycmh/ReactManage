import React from 'react';
import {useSelector} from "react-redux";
import {Popover} from 'antd';
import {useHistory} from 'react-router-dom'
import {DownOutlined, createFromIconfontCN} from '@ant-design/icons'
import Cookies from "js-cookie";
import iconFont from '../../utils/iconfont'
import {Utils} from "../../utils/utils";
import './index.less'

const utils = new Utils();
const IconFont = createFromIconfontCN(
    {
        scriptUrl: iconFont,
    }
)

export default function () {
    const {userAvatar, nickName} = useSelector(state => state.userState);
    const history = useHistory();
    const {OrgStar,OrgName} = JSON.parse(localStorage.getItem('annieUser'));
    const handleLogOut = () => {
        localStorage.removeItem("annieUser");
        Cookies.remove('ANNIEKIDSUSS');
        history.push('/login');
    }
    const content = (
        <div className="log-box" onClick={handleLogOut}>
            <div className="text fl">
                安全退出
            </div>
            <div className="icon fr">
                <IconFont type="iconlogout"/>
            </div>
        </div>
    )
    return (
        <div className="header">
            <div className="fr logout-div">
                <Popover
                    title=""
                    content={content}
                    trigger="hover"
                    placement="bottom"
                    arrowPointAtCenter={true}
                    autoAdjustOverflow={true}
                    getPopupContainer={() => document.getElementsByClassName("logout-div")[0]}
                >
                    <div className="pop-open">
                        <DownOutlined/>
                    </div>

                </Popover>
            </div>
            <ul className="info-ul fr">
                <li className="name-li">
                    <span className="mr-10">{OrgStar}</span>
                    {OrgName}
                </li>
                <li className="user-li">
                    <img src={userAvatar} alt=""/>
                    {nickName}
                </li>
            </ul>
        </div>
    )
}
