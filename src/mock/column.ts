import * as Mock from 'mockjs'
/* 
获取所有专栏简要信息(简要)
/api/v1/column/get/all  							
get
*/
Mock.mock('http://127.0.0.1:8080/api/v1/column/get/all', 'get', {
    code: 1,
    message: "seccess",
    data: {
        columnList: [
            {
                columnId: "@id",
                columnName: "mongoDB",
                columnImgId: "@image('80x80', '#50B347', '#FFF', 'Mock.js')",
                totalArticleNumber: "20",
                top: true,
            },
            {
                columnId: "@id",
                columnName: "Vue3",
                columnCoverId: "@image('80x80', '#50B347', '#FFF', 'Mock.js')",
                totalArticleNumber: "20",
                top: true,
            },
            {
                columnId: "@id",
                columnName: "js",
                columnCoverId: "@image('80x80', '#50B347', '#FFF', 'Mock.js')",
                totalArticleNumber: "20",
                top: true,
            },
            {
                columnId: "@id",
                columnName: "css",
                columnCoverId: "@image('80x80', '#50B347', '#FFF', 'Mock.js')",
                totalArticleNumber: "20",
                top: true,
            },
        ],
    }
});