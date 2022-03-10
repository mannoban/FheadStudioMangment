// 接口地址
interface Base {
    baseUrl: string,
    login: string,
    register: string,
    publishNewArticle: string,
    getColumnAll: string,
    getArticle: string
    publishOldArticle: string,
    uploadImage: string,
    showImage: string,
    getAllArticle: string,
    deleteArticle: string,
    searchArticle: string,
    topArticle: string,
    getAllColumn: string,
    getUserMessage: string,
    delUser: string,
    editorUser: string,
    delColumn: string,
    editorColumn: string,
    topColumn: string,
    addColumn: string,
    getMyMessage: string,
    editorMyMessage: string,
    logout: string
}

const base: Base = {
    baseUrl: "http://127.0.0.1:8080/api/v1",
    /* 
    登录
    */
    login: "/user/login",
    register: "/user/register",
    /* 
    文章
    */
    publishNewArticle: "/article/publish/##",    //发布新文章
    publishOldArticle: "/article/publish/",     //发布旧文章
    getArticle: "/article/get/",                // 获取已存在文章详细信息
    getAllArticle: "/article/get/all/",         //获取所有文章(简略)
    getColumnAll: "/column/get/all/",           // 获取专栏简要信息
    uploadImage: "/image/upload",               //上传图片,
    showImage: "/image/{imageId}",             //展示图片
    deleteArticle: "/article/delete/",          //删除文章
    searchArticle: "/article/search",             //搜索文章
    topArticle: "/article/top",                 //文章置顶
    /* 
    专栏
    */
    getAllColumn: "/column/get/all/",              //获取专栏(简略)
    delColumn: "/column/del/",                   //删除专栏
    editorColumn: "/column/editor",                           //编辑专栏
    topColumn: "/column/top",                              //置顶专栏,
    addColumn: "column/add",                            //添加专栏
    /* 
    用户
     */
    getUserMessage: "/manager/common",             //获取所有用户信息
    delUser: "manager/delete_member/",          //删除用户
    editorUser: "manager/editor_member",        //编辑成员信息
    /*
    个人
    */
    getMyMessage: "/user/my_message",      // 获取个人信息
    editorMyMessage: "/user/my_editor",      //编辑个人信息
    logout: "/user/logout"                  // 退出登录
}

export default base;