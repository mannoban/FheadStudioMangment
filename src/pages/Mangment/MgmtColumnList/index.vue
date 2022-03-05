<template>
  <div class="column_mangment_container">
    <header class="column_mangment_header">
      <router-link to="/my/mgmtColumnList/all">
        <a class="column_mangment_link all" style="margin-left: 0" href=""
          >全部(6)</a
        >
      </router-link>
      <router-link to="/my/mgmtColumnList/notpass" style="margin-left: 0">
        <a class="column_mangment_link notpass" href="">审核未通过(0)</a>
      </router-link>
      <router-link to="/my/mgmtColumnList/recycleBin" style="margin-left: 0">
        <a class="column_mangment_link recycle_bin" href="">回收站(20)</a>
      </router-link>
      <button class="new_column">新建</button>
    </header>
    <article class="column_mangment_article">
      <router-view></router-view>
    </article>
  </div>
</template>


<script lang="ts">
export default {
  name: "MgmtColumnList",
};
</script>

<style>
.column_mangment_container {
  margin-top: 80px;
  margin-left: 16.5%;
  width: 80%;
  height: 100%;
}
.column_mangment_link {
  color: #555666;
  margin-left: 20px;
}
.column_mangment_link:hover {
  color: #222226;
}
.new_column {
  float: right;
  width: 80px;
  height: 35px;
  background-color: #fc5531;
  color: #fff;
  font-size: 15px;
  font-weight: bolder;
  border-radius: 17.5px;
}
.column_mangment_article {
  margin-top: 20px;
}
</style>