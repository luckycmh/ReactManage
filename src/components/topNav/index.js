import React,{useState,useEffect} from "react";
import {useSelector,useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom'
import { Tabs } from 'antd';
import {handleTopNav,handleActivePath} from "../../redux/common/actions";
import './index.less'
const { TabPane } = Tabs;

export default function(){
    //路由
    const history = useHistory();
    // 顶部导航数据
    const tab = useSelector(state => state.getTopNav);
    //高亮地址
    const active = useSelector(state => state.activeTabPath);
    //派发函数
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(tab);
    },[tab]);
    /*删除tab*/
    const handleEdit = (targetKey,action) => {
        dispatch(handleTopNav({type:'sub',tab:targetKey}));
    };
    //点击tab
    const handleChange = (activeKey) => {
        history.push(activeKey);
        dispatch(handleActivePath(activeKey));
    };
    return (
        <React.Fragment>
            {
                tab.length > 0 &&
                <div className="top-tab">
                    <Tabs type="editable-card" hideAdd activeKey={active} onEdit={handleEdit} onChange={handleChange}>
                        {tab.map(pane => (
                            <TabPane tab={pane.title} key={pane.path} closable={true}>
                            </TabPane>
                        ))}
                    </Tabs>
                </div>
            }

        </React.Fragment>
    )
}
