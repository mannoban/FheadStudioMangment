import * as Mock from 'mockjs'

/* 
登录
/api/v1/user/login
post
*/
Mock.mock("http://127.0.0.1:8080/api/v1/user/login", 'post', {
    code: 200,
    status: "ok",
    message: "登录成功",  //提示信息
    data: {
        token: '@id',
        userId: '@id'
    }
})

/* 
注册
/api/v1/user/register 
post
*/
Mock.mock("http://127.0.0.1:8080/api/v1/user/register", 'post', {
    code: 200,
    status: "ok",
    message: "注册成功",  //提示信息
})
