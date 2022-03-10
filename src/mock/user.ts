import * as Mock from 'mockjs'
let Random = Mock.Random; //随机对象

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
        userId: '@id',
        role: "manager"
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

/* 
所有用户信息
*/
let userMessage = function () {
    let arr = []
    for (let i = 0; i < 10; i++) {
        let obj = {
            registerDate: Date.now(),
            nickname: "@cname",
            email: "@email",
            telephone: "@phone",
            role: "employee"
        }
        arr.push(obj);
    }
    let data = {
        totalUserNumber: 100,
        userArr: arr
    }
    return data;
}
Mock.mock("http://127.0.0.1:8080/api/v1/manager/common", 'post', {
    code: 200,
    message: "ok",
    data: {
        totalUserNumber: 86,
        'userArr|10': [
            {
                'userId': "@id",
                'registerDate': Date.now(),
                "nickname": "@cname",
                'email': "@email",
                'telephone|1': ['13531544954', '13632250649', '15820292420', '15999905612'],
                'role': 'employee'
            }
        ]
    }
})

Mock.mock("http://127.0.0.1:8080/api/v1/user/my_message", 'get', {
    code: 200,
    status: "ok",
    data: {
        personalMessage: {
            userId: "@id",
            nickname: "@cname",
            headImgId: "@image('80x80', '#50B347', '#FFF', 'Mock.js')",
            sex: "@boolean",
            personalBrief: "@cword(20)",
            birthDate: "@date",
            place: "@county(true)"
        }
    }
})
