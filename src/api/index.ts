import axios from '../utils/request';
import base from './base'

const api = {
    /* 
    用户登录
    */
    userLogin(loginForm: Object) {
        return axios.post(base.baseUrl + base.login, loginForm)
    },
    /* 
    用户注册
    */
    userRegister(registerForm: object) {
        return axios.post(base.baseUrl + base.register, registerForm)
    }

}

export default api