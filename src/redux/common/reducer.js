import * as types from './actionTypes'
import {handleActions} from 'redux-actions'
const user = {};

export const userState = handleActions({
    [types.USER_INFO](state,action){
        console.log(action)
        return {
            ...user,
            ...action.payload
        }
    }
},user)

