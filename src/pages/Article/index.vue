<template>
  <Banner></Banner>
  <div class="layout">
    <!-- 顶部 -->
    <header class="article_header">
      <h2 class="welcome">Welcome to blog</h2>
      <img
        src="../../static/imgs/wiki_bg.jpg
    "
        alt=""
      />
    </header>
    <!-- 文章展示 -->
    <div class="article_container"></div>
  </div>
</template>

<script lang="ts">
import Banner from "../../components/Banner.vue";
export default {
  name: "Article",
  components: {
    Banner,
  },
};
</script>

<style>
.article_header {
  position: relative;
  text-align: center;
}
.welcome {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
  color: #fff;
  font-size: 30px;
}
.article_header > img {
  width: 100%;
}
</style>

