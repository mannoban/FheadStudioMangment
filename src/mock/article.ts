import * as Mock from 'mockjs'

// 发布文章
/* 
新文章提交 保存文章
/api/v1/article/publish/##   			
post 
*/
Mock.mock('http://127.0.0.1:8080/api/v1/article/publish/##', 'post', {
    code: 200,
    message: "成功",
    status: "ok"
})

/* 
旧文章提交 保存文章
/api/v1/article/publish/121212  			
post 
*/
Mock.mock('http://127.0.0.1:8080/api/v1/article/publish/121212', 'post', {
    code: 200,
    message: "成功",
    status: "ok"
})

/* 
获取所有文章 (简略)
/api/v1/article/get/all     					
get  
*/
Mock.mock("http://127.0.0.1:8080/api/v1/article/get/all", "get", {
    columnName: ["vue", "mongoDB", "JS", "CSS"],   //专栏信息
    articleList: [
        {
            articleId: "001",
            title: "vuex的使用",
            alreadyPublish: 1,
            viewNum: 500,
            publishTime: Date.now(),
            top: false,
            coverImgId: " @image('100x100', '#50B347', '#FFF', 'Mock.js')",
            nickname: "吴小葵",
            abstract: "这是一篇Vuex的使用教程"
        },
        {
            articleId: "002",
            title: "js的闭包",
            alreadyPublish: 0,
            viewNum: 200,
            publishTime: Date.now(),
            top: false,
            coverImgId: " @image('100x100', '#50B347', '#FFF', 'Mock.js')",
            nickname: "静静",
            abstract: "js闭包详解"
        },
        {
            articleId: "003",
            title: "js作用域链",
            alreadyPublish: 1,
            viewNum: 150,
            publishTime: Date.now(),
            top: true,
            coverImgId: " @image('100x100', '#50B347', '#FFF', 'Mock.js')",
            nickname: "莹莹",
            abstract: "js作用域链"
        }
    ]
}
)

/* 
获取文章详细信息
/api/v1/ article/get/{article _id}    				
 get 
返回参数 
*/
Mock.mock("http://127.0.0.1:8080/api/v1/article/get/001", "get", {
    code: 1,
    message: "success",
    data: {
        userId: "002",
        articleId: "qwaax1255",
        title: "vuex使用",
        content: "测试数据\n## 1\n## 1.1\n## 1.1",
        abstrct: "@cword(20)", //摘要
        coverType: "单图", //单图or无封面
        coverImgId: "@image(200*200)", //封面
        label: ["前端", "后端"], //文章标签
        column: ["Vue3"], //文章专栏
        publishMethod: "公开", //发布方式
        alreadyPublish: true, //草稿or发布
        date: Date.now(), //时间
    }
})

Mock.mock("http://127.0.0.1:8080/api/v1/article/get/002", "get", {
    code: 1,
    message: "success",
    data: {
        userId: "002",
        articleId: "qwaax1525",
        title: "闭包使用",
        content: "测试数据2222\n## 1\n## 1.1\n## 1.1",
        abstrct: "@cword(10)", //摘要
        coverType: "单图", //单图or无封面
        coverImgId: "@image(200*200)", //封面
        label: ["前端"], //文章标签
        column: ["js"], //文章专栏
        publishMethod: "公开", //发布方式
        alreadyPublish: true, //草稿or发布
        date: Date.now(), //时间
    }
})

/* 
删除文章
post
*/
Mock.mock("http://127.0.0.1:8080/api/v1/article/delete/001", "post", {
    code: 200,
    status: "ok"
})


/* 
置顶文章
*/
Mock.mock("http://127.0.0.1:8080/api/v1/article/top", "post", {
    code: 200,
    status: "ok"
})