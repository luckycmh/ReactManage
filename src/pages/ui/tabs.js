import React, {useState, useRef, useEffect} from 'react';
import {Card, Tabs, message} from 'antd';
import {AppleOutlined, AndroidOutlined} from '@ant-design/icons';

const {TabPane} = Tabs;

export default function () {
    const newTabIndex = useRef(0);
    const handleChange = (activeKey) => {
        message.info(`你选择了${activeKey}`);
    };
    useEffect(()=>{
        console.log('effect')
    },[])
    const panesData = [
        {title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1'},
        {title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2'},
    ];
    const [panes, setPanes] = useState(panesData);
    const initKey = panes.length ? panes[0].key : '';
    const [activeKey, setActiveKey] = useState(initKey);
    const add = () => {
        const activeKey = `newTab${newTabIndex.current++}`;

        let newPane = {
            title: `New Tab${newTabIndex.current}`,
            content: `New Tab Pane${newTabIndex.current}`,
            key: activeKey
        };
        setPanes(prevState => {
            return [...prevState, newPane]
        });
        setActiveKey(activeKey);
    };
    const remove = targetKey => {
        let lastIndex;
        panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panesNew = panes.filter(pane => pane.key !== targetKey);
        if (panesNew.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                setActiveKey(panesNew[lastIndex].key)
            } else {
                setActiveKey(panesNew[0].key)
            }
        }
        setPanes(panesNew);
    };
    const onEdit = (targetKey, action) => {
        action === 'add' ? add(targetKey) : remove(targetKey)
    };
    return (
        <React.Fragment>
            <Card title="基础标签页" className="card-wrap">
                <Tabs defaultActiveKey="Tab 1" onChange={handleChange}>
                    <TabPane tab="Tab 1" key="Tab 1">
                        Tab 1
                    </TabPane>
                    <TabPane tab="Tab 2" disabled key="Tab 2">
                        Tab 2
                    </TabPane>
                    <TabPane tab="Tab 3" key="Tab 3">
                        Tab 3
                    </TabPane>
                </Tabs>
            </Card>
            <Card title="带图标标签页" className="card-wrap">
                <Tabs defaultActiveKey="iconTab1" onChange={handleChange}>
                    <TabPane
                        tab={
                            <span>
                                <AppleOutlined/>
                                Tab 1
                            </span>
                        }
                        key="iconTab1"
                    >
                        Tab 1
                    </TabPane>
                    <TabPane
                        tab={
                            <span>
                                <AndroidOutlined/>
                                Tab 2
                            </span>
                        }
                        key="iconTab2"
                    >
                        Tab 2
                    </TabPane>
                </Tabs>
            </Card>
            <Card title="动态标签页">
                <Tabs
                    activeKey={activeKey}
                    type="editable-card"
                    onEdit={onEdit}
                >
                    {panes.map(pane => (
                        <TabPane tab={pane.title} key={pane.key}>
                            {pane.content}
                        </TabPane>
                    ))}
                </Tabs>
            </Card>
        </React.Fragment>
    )
}
