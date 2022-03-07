import axios from '../utils/request';
import base from './base'
import { ArticleForm } from '../utils/type'

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
    userRegister(registerForm: Object) {
        return axios.post(base.baseUrl + base.register, registerForm)
    },
    /* 
    发布新文章
    */
    publishNewArticle(articleData: ArticleForm) {
        return axios.post(base.baseUrl + base.publishNewArticle, articleData)
    },
    /* 
    发布旧文章
    */
    publishOldArticle(articleData: ArticleForm) {
        return axios.post(base.baseUrl + base.publishOldArticle + articleData.articleId, articleData)
    },
    /* 
    获取文章详细信息
    */
    getArticle<T>(articleId: T) {
        return axios.get(base.baseUrl + base.getArticle + articleId)
    },

    /* 
    获取所有文章
    */
    getAllArticle() {
        return axios.get(base.baseUrl + base.getAllArticle)
    },
    /* 
    获取专栏简要信息
    */
    getColumnAll() {
        return axios.get(base.baseUrl + base.getColumnAll)
    },
    /* 
    上传图片
    */
    uploadImage(formData: object) {
        return axios.post(base.baseUrl + base.uploadImage)
    },
    /* 
    删除文章
    */
    deleteArticle<T>(articleId: T) {
        return axios.post(base.baseUrl + base.deleteArticle + articleId)
    },
    /*
    置顶文章
    */
    topArticle(topData: object) {
        return axios.post(base.baseUrl + base.topArticle)
    }

    /* 
    搜索文章
    */

}

export default api