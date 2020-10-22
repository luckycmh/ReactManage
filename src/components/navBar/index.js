import React,{memo} from "react";
import {useHistory} from 'react-router-dom'
import classnames from 'classnames'
export default memo(({navList}) => {
    const history = useHistory();
    //处理跳转
    const handleJump = (item) => {
        if(!item.active) {
            history.push(item.path);
        }
    };
    return (
        <div className="top-bar mb-20">
            <ul className="bar-ul">
                {
                    navList.map(
                        item =>
                            <li key={item.name} className={classnames({'active':item.active})} onClick={() => handleJump(item)}>
                                {item.name}
                            </li>
                    )
                }
            </ul>
        </div>
    )
});
