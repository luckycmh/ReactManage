import * as types from './actionTypes'
import {handleActions} from 'redux-actions'
const user = {};
// user 信息
export const userState = handleActions({
    [types.USER_INFO](state,action){
        console.log(action.payload);
        return {
            ...user,
            ...action.payload
        }
    }
},user);
//高亮导航地址
let activeTab = '';
export const activeTabPath = handleActions({
    [types.CURRENT_TAB_Path](state,{payload}){
        return activeTab = payload;
    }
},activeTab);
//顶部导航
let topNav = [];
export const getTopNav = handleActions({
    [types.TOP_NAV](state,{payload:{type,tab}}) {
        if(type === 'add') {
            topNav = [...topNav, tab];
        } else if(type === 'sub') {
            topNav.forEach(item => {
                if(item.path === tab){
                    item.isShow = false;
                }
            });
        }
        return topNav.filter(item => item.isShow);
    }
},topNav);


