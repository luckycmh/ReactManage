import React, {useState, useEffect, useLayoutEffect} from 'react';
import {useDispatch} from "react-redux";
import Cookies from 'js-cookie'
import {useHistory,useLocation} from 'react-router-dom'
import {handleUserInfo} from './redux/common/actions'
import "./style/common.less"

export default function (props) {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    // 设置加载状态为false
    useLayoutEffect(() => {
        setLoading(false);
    }, []);
    // 浏览器更新做redux同步更新
    useLayoutEffect(() => {
        if (!loading) {
            if (localStorage.getItem('annieUser') && Cookies.get('ANNIEKIDSUSS')) {
                let decodeData = JSON.parse(localStorage.getItem('annieUser'));
                dispatch(handleUserInfo(decodeData))
            } else {
                history.push('/login');
                localStorage.removeItem('annieUser');
            }
        }
    }, [loading])
    useEffect(() => {
        window.scrollTo(0, 0);
    },[location])
    return (
        <div className="App">
            {props.children}
        </div>
    );

};
