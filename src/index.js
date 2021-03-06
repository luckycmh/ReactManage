import React from 'react';
import ReactDOM from 'react-dom';
import {ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN';
import RouterConfig from './router';
import {Provider} from 'react-redux'
import store from './redux/store'
import './style/reset.css';
import * as serviceWorker from './serviceWorker';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

ReactDOM.render(
    <ConfigProvider locale={zhCN}>
        <Provider store={store}>
            <RouterConfig />
        </Provider>
    </ConfigProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
