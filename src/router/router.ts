import { log } from 'console';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import store from '../store/index';

/* 
展示页面
 */
const article = () => import('../pages/Article/index.vue');
const login = () => import('../pages/Login/index.vue');
const about = () => import('../pages/About/index.vue');
const active = () => import('../pages/Active/index.vue');
const comment = () => import("../pages/Comment/index.vue")
const my = () => import("../pages/My/index.vue");
const notFound = () => import('../pages/404/index.vue')
/* 
后台管理
*/
const PublishArticle = () => import("../pages/Mangment/PublishArticle/index.vue")
const MgmtArticle = () => import("../pages/Mangment/MgmtArticle/index.vue")
const MgmtColumnList = () => import('../pages/Mangment/MgmtColumnList/index.vue');
// const MgmtComment = () => import('../pages/Mangment/MgmtComment/index.vue');
const VisitorMessage = () => import("../pages/Mangment/VisitorMessage/index.vue")
const MyMessage = () => import("../pages/Mangment/MyMessage/index.vue")
const ArticleDate = () => import('../pages/Mangment/ArticleData/index.vue')
/* 
专栏管理
*/
const AllColumnList = () => import('../pages/Mangment/MgmtColumnList/AllcolumnList/index.vue')
const NotPassColumnList = () => import('../pages/Mangment/MgmtColumnList/NotPassColumnList/index.vue');
const RecycleBin = () => import('../pages/Mangment/MgmtColumnList/RecycleBin/index.vue')
const ArticleList = () => import('../pages/Mangment/MgmtColumnList/ArticleList/index.vue')

const routes = [
    { path: '/', redirect: '/article' },
    { path: '/article', meta: { title: "article" }, component: article, },
    { path: '/login', component: login, meta: { title: "login" } },
    { path: '/about', component: about, meta: { title: 'about' } },
    { path: '/active', component: active, meta: { title: 'active' } },
    { path: '/comment', component: comment, meta: { title: 'comment' } },
    { path: "/404", component: notFound, meta: { title: 'notFound' } },
    // 后台管理页面
    {
        path: "/my", component: my, meta: { title: 'my', requireAuth: true }, children: [
            {
                path: '',
                redirect: '/my/publishArticle',
            },
            { path: 'publishArticle', component: PublishArticle },
            { path: 'mgmtArticle', component: MgmtArticle },
            {
                path: 'visitorMessage',
                component: VisitorMessage,
                meta: { permission: true }
            },
            { path: 'myMessage', component: MyMessage },
            { path: "articleData", component: ArticleDate },
            // 专栏管理
            {
                path: "mgmtColumnList", component: MgmtColumnList, children: [
                    {
                        path: "",
                        redirect: '/my/mgmtColumnList/all'
                    },
                    {
                        path: "/my/mgmtColumnList/all",
                        component: AllColumnList
                    },
                    {
                        path: "/my/mgmtColumnList/notpass",
                        component: NotPassColumnList
                    },
                    {
                        path: "/my/mgmtColumnList/recycleBin",
                        component: RecycleBin
                    },
                    {
                        path: "/my/mgmtColumnList/articleList",
                        component: ArticleList
                    }
                ]
            },
            { path: "404", component: notFound, meta: { title: 'notFound' } },
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    linkActiveClass: 'current' //配置样式类
})

router.beforeEach((to, from, next) => {
    const token = store.state.token ? store.state.token : window.sessionStorage.getItem('token');
    const role = store.state.userRole ? store.state.userRole : window.sessionStorage.getItem('userRole')
    // 判断该路由是否需要登录权限
    if (to.meta.requireAuth) {
        if (token) {
            // 判断该路由是否需要管理员权限
            if (to.meta.permission) {
                role === "manager" ? next() : next({ path: '/my/404' })
            } else {
                next()
            }
        } else {
            next({ path: '/login' })
        }
    }
    else {
        next()
    }
})

export default router;