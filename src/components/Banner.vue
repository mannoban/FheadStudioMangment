<template>
  <div class="home_list">
    <ul class="banner_list">
      <router-link to="/article" class="banner_item">文章</router-link>
      <router-link to="/active" class="banner_item">微语</router-link>
      <router-link to="/comment" class="banner_item">留言</router-link>
      <router-link to="/about" class="banner_item">关于</router-link>
      <router-link to="/login" class="banner_item">登录</router-link>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: "Banner",
};
</script>

<style>
/*  默认的选中样式类*/
.router-link-active {
  font-size: 18px;
  color: orange;
  font-weight: bold;
}
.home_list {
  width: 100%;
  height: 50px;
  background-color: #323232;
  position: fixed;
  z-index: 999;
  line-height: 50px;
  padding: 0 auto;
}
.banner_list {
  text-align: center;
}
.banner_item {
  color: #fff;
  font-size: 14px;
  text-decoration: none;
  display: inline-block;
  width: 100px;
  text-align: center;
}
.banner_item:hover {
  color: #58d8cf;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  -o-transition: all 0.5s;
  transition: all 0.5s;
}
.current {
  color: #197b74;
  font-weight: bold;
  text-decoration: none;
}
</style>