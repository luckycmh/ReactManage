import {
    axios
} from '../../axios'
// 登陆接口
const loginUrl = 'api/v1/login';
/**
 *
 * @param {String} username 用户名
 * @param {password} password 密码
 * @param {Number} roleType 角色标识
 */
const login = (telephone, password, userType) => axios.post(loginUrl, {
    telephone,
    password,
    userType
});


export {
    login
}
