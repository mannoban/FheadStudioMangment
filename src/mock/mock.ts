import * as Mock from 'mockjs'




// 获取专栏列表
Mock.mock('http://127.0.0.1:8080/api/article/getColumn', 'get', {
    code: 1,
    message: "seccess",
    data: {
        columnList: [{
            "id": 451226,
            "ColumnName": "Vue3",
            "createTime": "2019-01-01T21:18:02.000+0000",
            "updateTime": "2019-01-01T21:18:07.000+0000",
        },
        {
            "id": 455255,
            "ColumnName": "nodejs",
            "createTime": "2019-01-01T21:18:02.000+0000",
            "updateTime": "2019-01-01T21:18:07.000+0000",
        },
        {
            "id": 487995,
            "ColumnName": "mongoDB",
            "name": "专栏三",
            "createTime": "2019-01-01T21:18:02.000+0000",
            "updateTime": "2019-01-01T21:18:07.000+0000",
        },
        {
            "id": 487986,
            "ColumnName": "数据结构",
            "name": "专栏四",
            "createTime": "2019-01-01T21:18:02.000+0000",
            "updateTime": "2019-01-01T21:18:07.000+0000",
        },
        {
            "id": 488532,
            "ColumnName": "计算机网络",
            "name": "专栏五",
            "createTime": "2019-01-01T21:18:02.000+0000",
            "updateTime": "2019-01-01T21:18:07.000+0000",
        },
        {
            "id": 485542,
            "ColumnName": "组成原理",
            "name": "专栏六",
            "createTime": "2019-01-01T21:18:02.000+0000",
            "updateTime": "2019-01-01T21:18:07.000+0000",
        },
        {
            "id": 488642,
            "ColumnName": "操作系统",
            "name": "专栏七",
            "createTime": "2019-01-01T21:18:02.000+0000",
            "updateTime": "2019-01-01T21:18:07.000+0000",
        },
        {
            "id": 498542,
            "ColumnName": "微机原理",
            "name": "专栏八",
            "createTime": "2019-01-01T21:18:02.000+0000",
            "updateTime": "2019-01-01T21:18:07.000+0000",
        }
        ],
        typeList: [{
            "id": 1,
            "labelName": "前端",
        },
        {
            "id": 2,
            "labelName": "后端",
        },
        {
            "id": 3,
            "labelName": "网络",
        },
        {
            "id": 4,
            "labelName": "算法",
        },
        ]
    }
});

// 上传图片
Mock.mock('http://127.0.0.1:8080/api/article/fileds', 'post', {
    id: '@id',
    name: '@cname',
    date: '@date()',
    avatar: "@image('400x200', '#50B347', '#FFF', 'Mock.js')",
    ip: '@ip()',
    email: '@email',
    url: '@url',
});





// 所有专栏
Mock.mock("http://127.0.0.1:8080/api/columnList/all", "get", {
    code: 1,
    message: "success",
    data: [{
        id: 1,
        sortNumber: 1,
        title: "专栏一",
        isPublic: true,
        date: new Date(),
        cover: "@image('80x80', '#50B347', '#FFF', 'Mock.js')",
    },
    {
        id: 2,
        sortNumber: 2,
        title: "专栏二",
        isPublic: true,
        date: new Date(),
        cover: "@image('80x80', '#50B347', '#FFF', 'Mock.js')",
    },
    {
        id: 3,
        sortNumber: 3,
        title: "专栏三",
        isPublic: true,
        date: new Date(),
        cover: "@image('80x80', '#50B347', '#FFF', 'Mock.js')",
    },
    {
        id: 4,
        sortNumber: 4,
        title: "专栏四",
        isPublic: false,
        date: new Date(),
        cover: "@image('80x80', '#50B347', '#FFF', 'Mock.js')",
    },
    ]
})

// 专栏列表
Mock.mock("http://127.0.0.1:8080/api/columnList/allTitle", "get", {
    code: 1,
    message: "success",
    data: [{
        id: 1,
        value: "专栏一",
        label: "专栏一"
    },
    {
        id: 2,
        value: "专栏二",
        label: "专栏二"
    }, {
        id: 3,
        value: "专栏三",
        label: "专栏三"
    }, {
        id: 4,
        value: "专栏四",
        label: "专栏四"
    }
    ]
})


// 获取个人信息
Mock.mock('http://127.0.0.1:8080/api/user/mine', 'get', {
    name: "@cname",
    id: "@id",
    sex: "@boolean",
    personalProfile: "@cword(20)",
    place: "@county(true)",
    birthday: "@date()"
})