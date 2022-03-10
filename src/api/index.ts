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
    getAllArticle(userId: string) {
        return axios.get(base.baseUrl + base.getAllArticle + userId)
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
    },
    /* 
    搜索文章
    */
    searchArticle(searchData: object) {
        return axios.post(base.baseUrl + base.searchArticle, searchData)
    },
    /* 
    获取专栏简要信息
    */
    getColumnAll(userId: string) {
        return axios.get(base.baseUrl + base.getColumnAll + userId)
    },
    /* 
    删除专栏
    */
    delColumn(userId: any, columnId: any) {
        return axios.delete(base.baseUrl + base.delColumn + userId + columnId)
    },
    /* 
    编辑专栏
    */
    editorColumn(form: object) {
        return axios.post(base.baseUrl + base.editorColumn, form)
    },
    /*
    置顶专栏(交换专栏)
    */
    topColumn(form: object) {
        return axios.post(base.baseUrl + base.topColumn, form)
    },
    /* 
    添加专栏
    */
    addColumn(form: object) {
        return axios.post(base.baseUrl + base.addColumn)
    },
    /* 
    获取用户信息
    */
    getUserMessage(form: object) {
        return axios.post(base.baseUrl + base.getUserMessage, form)
    },
    /* 
    删除用户信息
    */
    delUser(userId: string) {
        return axios.delete(base.baseUrl + base.delUser + userId)
    },
    /* 
    编辑用户信息
    */
    editorUser(form: object) {
        return axios.post(base.baseUrl + base.editorUser, form)
    },
    /* 
    获取个人信息
    */
    getMyMessage() {
        return axios.get(base.baseUrl + base.getMyMessage)
    },
    /*
    编辑个人信息
    */
    editorMyMessage(form: object) {
        return axios.post(base.baseUrl + base.editorUser, form)
    },
    /* 
    退出登录
    */
    logOut(form: object) {
        return axios.post(base.baseUrl + base.logout, form)
    }
}

export default api