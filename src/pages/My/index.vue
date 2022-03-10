<template>
  <!--顶部 -->
  <el-header class="my_header">
    <h2 class="my_title">
      <img src="../../static/icons/blog.svg" alt="" class="blog_icon" />
      mobie实验室后台管理端!
    </h2>
  </el-header>
  <div class="my_system layout">
    <!-- 内容区 -->
    <el-container class="container">
      <!-- 导航栏 -->
      <el-aside width="200px" class="my_banner">
        <el-menu collapse-transition="true">
          <el-menu-item index="0-0" @click="backArticle()"
            ><el-icon><homeFilled /></el-icon>首页</el-menu-item
          >
          <el-sub-menu index="1">
            <template #title>
              <el-icon><management /></el-icon>管理
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click="publishArticle()"
                >发布文章</el-menu-item
              >
              <el-menu-item index="1-2" @click="mgmtArticle()"
                >内容管理</el-menu-item
              >
              <el-menu-item index="1-3" @click="mgmtColumnList()"
                >专栏管理</el-menu-item
              >
              <!-- <el-menu-item index="1-4" @click="mgmtComment()"
                >评论管理</el-menu-item
              > -->
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><histogram /></el-icon>数据
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="articleData()"
                >作品数据</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><avatar /></el-icon>信息
            </template>
            <el-menu-item-group>
              <el-menu-item
                index="3-1"
                @click="visitorMessage()"
                v-if="$store.state.userRole === 'manager'"
                >成员信息</el-menu-item
              >
              <el-menu-item index="3-2" @click="myMessage()"
                >个人管理</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <!-- 展示区 -->
      <router-view></router-view>
    </el-container>
  </div>
</template>
  
<script lang="ts">
import { ref, computed, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  Edit,
  Message,
  Avatar,
  Histogram,
  Management,
  HomeFilled,
} from "@element-plus/icons-vue";
export default {
  name: "My",
  components: {
    edit: Edit,
    message: Message,
    avatar: Avatar,
    histogram: Histogram,
    management: Management,
    homeFilled: HomeFilled,
  },

  setup() {
    const router = useRouter();
    const store = useStore();
    let userRole = ref();

    onMounted(() => {
      // userRole.value = store.userRole;
    });

    const backArticle = () => {
      router.push("/article");
    };

    const publishArticle = () => {
      router.push("/my/publishArticle");
    };

    const mgmtArticle = () => {
      router.push("/my/mgmtArticle");
    };

    const mgmtColumnList = () => {
      router.push("/my/mgmtColumnList");
    };

    const mgmtComment = () => {
      router.push("/my/mgmtComment");
    };

    const articleData = () => {
      router.push("/my/articleData");
    };
    const fansData = () => {
      router.push("/my/fansData");
    };
    const visitorMessage = () => {
      router.push("/my/visitorMessage");
    };

    const myMessage = () => {
      router.push("/my/myMessage");
    };

    return {
      backArticle,
      publishArticle,
      mgmtArticle,
      visitorMessage,
      myMessage,
      mgmtColumnList,
      mgmtComment,
      articleData,
      fansData,
    };
  },
};
</script>

<style>
/* elememt style */
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: var(--el-text-color-primary);
  text-align: center;
  line-height: 160px;
}

.el-header {
  background-color: #b3c0d1;
  color: var(--el-text-color-primary);
  line-height: 60px;
}

.el-aside {
  color: var(--el-text-color-primary);
}

:root {
  --el-color-primary: #409eff;
}

/* 顶部样式 */
.my_header {
  text-align: center;
  position: fixed;
  z-index: 2;
  width: 100%;
  font-size: 12px;
}
.my_title {
  margin-left: 80px;
  text-align: left;
}
.blog_icon {
  display: inline-block;
  position: absolute;
  margin-left: -40px;
  margin-top: 12px;
}

/* 导航栏 */
.my_banner {
  background-color: #fff;
  height: 650px;
  position: fixed;
  z-index: 2;
  margin-top: 60px;
  border-right: 1px solid #e6e6e6;
}
</style>