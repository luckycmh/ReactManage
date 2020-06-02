import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {userInfo} from './redux/common/actions'
import {Utils} from "./utils/utils";
const utils = new Utils()
export default function (props) {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    useEffect(() => {
        setLoading(false);
    }, []);
    useEffect(() => {
        if (!loading) {
            if (localStorage.getItem('annieUser')) {
                let decodeData = JSON.parse(utils.decrypt(localStorage.getItem('annieUser')));
                dispatch(userInfo(decodeData))
            }
        }
    },[loading])
    return (
        <div className="App">
            {props.children}
        </div>
    );

};
