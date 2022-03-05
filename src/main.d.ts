// shims-vue.d.ts
import Vue from 'vue'

declare module 'vue/types/vue' {
    interface Vue {
        // 以下是在main.ts中挂载到Vue.prototype上的变量
        $api: any;
        $mock: any;
        $configs: any;
    }
}

