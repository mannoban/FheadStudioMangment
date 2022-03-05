import axios from 'axios';
import * as qs from 'qs';
import store from '../store/index'
let token = store.state.token;

// 判定开发模式
// if (process.env.NODE_ENV == 'development') {
//     axios.defaults.baseURL = '/api';
// } else if (process.env.NODE_ENV == 'debug') {
//     axios.defaults.baseURL = 'http://v.juhe.cn';
// } else if (process.env.NODE_ENV == 'production') {
//     axios.defaults.baseURL = 'http://v.juhe.cn';
// }

axios.defaults.timeout = 5000; //超时时间
axios.defaults.baseURL = 'http://localhost:5000/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use((request) => {
    request.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };
    request.data = qs.stringify(request.data);
    // 判断token
    if (token) {
        request.headers.Authorization = token;
    }
    return request;
}, (error) => {
    return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
    // 处理响应数据
    if (response.status === 200) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
}, function (error) {
    // 处理响应失败
    return Promise.reject(error);
});

export default axios;