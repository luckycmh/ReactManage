import React, {useState, useEffect} from 'react';
import {useDispatch} from "react-redux";
import {handleUserInfo} from './redux/common/actions'
export default function (props) {
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();
    useEffect(() => {
        setLoading(false);
    }, []);
    useEffect(() => {
        if (!loading) {
            if (localStorage.getItem('annieUser')) {
                let decodeData = JSON.parse(localStorage.getItem('annieUser'));
                dispatch(handleUserInfo(decodeData))
            }
        }
    },[loading])
    return (
        <div className="App">
            {props.children}
        </div>
    );

};
