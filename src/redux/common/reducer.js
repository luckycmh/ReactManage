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
},user)



