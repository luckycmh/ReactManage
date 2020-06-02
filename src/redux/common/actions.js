import * as types from './actionTypes'
import {createAction} from 'redux-actions'
// 登陆者信息action
export const userInfo = createAction(types.USER_INFO,payload => payload)
