// main.ts
import { createApp } from 'vue'
import router from './router/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import store from './store/index'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

/* mock数据 */
import './mock/mock.ts'
import './mock/user.ts'
import './mock/article.ts'
import './mock/column.ts'
import './mock/viewNum.ts'
import './mock/memeber.ts'
import './mock/img.ts'

const app = createApp(App)
app.use(router);
app.use(store);
app.use(mavonEditor);
app.use(ElementPlus)
app.mount('#app')