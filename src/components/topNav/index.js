import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useHistory} from 'react-router-dom'
import {Tabs} from 'antd';
import {handleTopNav, handleActivePath} from "../../redux/common/actions";
import './index.less'

const {TabPane} = Tabs;

export default function () {
    //路由
    const history = useHistory();
    // 顶部导航数据
    const tab = useSelector(state => state.getTopNav);
    //高亮地址
    const active = useSelector(state => state.activeTabPath);
    //派发函数
    const dispatch = useDispatch();
    //记录删除的当前index
    const [index, setIndex] = useState(-1);
    useEffect(() => {
        if (index !== -1) {
            if (tab.length) {
                if(index===0) {
                    //从第一个开始删除
                    history.push(tab[index].path);
                } else {
                    //倒序删除，寻找上一个path
                    history.push(tab[index-1].path);
                }

            } else {
                history.push('/admin/main');
            }
            //    重置初始化状态
            setIndex(-1);
        }
    }, [index]);
    /*删除tab*/
    const handleEdit = (targetKey, action) => {
        const index = tab.findIndex(item => item.path === targetKey);
        dispatch(handleTopNav({type: 'sub', tab: targetKey}));
        setIndex(index);
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
