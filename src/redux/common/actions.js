import * as types from './actionTypes'
import {createAction} from 'redux-actions'
// 登陆者信息action
export const handleUserInfo = createAction(types.USER_INFO,payload => payload);
// 高亮导航地址
export const handleActivePath = createAction(types.CURRENT_TAB_Path,payload => payload);
//顶部导航
export const handleTopNav = createAction(types.TOP_NAV,payload => payload);
