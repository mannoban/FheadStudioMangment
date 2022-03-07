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
}


const base: Base = {
    baseUrl: "http://127.0.0.1:8080/api/v1",
    login: "/user/login",
    register: "/user/register",
    publishNewArticle: "/article/publish/##",  //发布新文章
    publishOldArticle: "/article/publish/",   //发布旧文章
    getArticle: "/article/get/",             // 获取已存在文章详细信息
    getAllArticle: "/article/get/all", //获取所有文章(简略)
    getColumnAll: "/column/get/all",         // 获取专栏简要信息
    uploadImage: "/image/upload",       //上传图片,
    showImage: "/image/{imageId} ",    //展示图片
    deleteArticle: "/article/delete/",//删除文章
    searchArticle: "/article/search",   //搜索文章
    topArticle: "/article/top"               //文章置顶

}

export default base;