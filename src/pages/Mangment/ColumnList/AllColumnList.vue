<template>
  <header class="all_column_list_header">
    <span style="margin-left: 0">排序</span>
    <span style="margin-left: 60px">类别</span>
    <span style="margin-left: 750px">操作</span>
    <span style="margin-left: 100px">是否公开</span>
    <span style="margin-left: 90px">文章数</span>
  </header>
  <transition-group tag="div" class="container">
    <ul class="all_column_list">
      <li
        v-for="item in columnList"
        :key="item.id"
        :draggable="true"
        @dragstart="handleDragStart($event, item)"
        @dragover.prevent="handleDragOver($event, item)"
        @dragenter="handleDragEnter($event, item)"
        @dragend="handleDragEnd($event, item)"
      >
        <img :src="item.cover" alt="" />
        <div style="margin-left: 10px">{{ item.title }}</div>
        <div class="column_list_edit">
          <a href="">管理</a>
          <a href="">编辑</a>
          <a href="" v-if="item.sortNumber !== 1">置顶</a>
          <a href="" style="color: #fc5531">删除</a>
        </div>
        <div class="is_public">
          <el-switch
            v-model="item.isPublic"
            @change="changeIsPublic(item, $event)"
          />
        </div>
        <div class="article_number">10</div>
      </li>
    </ul>
  </transition-group>
</template>


<script lang="ts">
import { onMounted, reactive, toRefs } from "vue";
import axios from "../../../utils/request";
import { AllColumnListData } from "../../../utils/type";
export default {
  name: "AllColumnList",

  setup(props) {
    let data: AllColumnListData = reactive({
      columnList: [],
      dragging: null, //标识拖拽元素
    });

    onMounted(() => {
      init();
    });

    const init = () => {
      axios
        .get("http://127.0.0.1:8080/api/columnList/all")
        .then((res) => {
          data.columnList = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // 当元素被拖动时
    const handleDragStart = (e: any, item: HTMLElement) => {
      data.dragging = item;
    };

    // 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
    const handleDragOver = (e: any) => {
      e.dataTransfer.dropEffect = "move";
    };

    // 当放置被拖元素时
    const handleDragEnter = (e: any, item: any) => {
      e.dataTransfer.effectAllowed = "move";
      //拖拽元素和本身一样
      if (item === data.dragging) {
        return;
      }
      let temp: number;
      const newItems = [...data.columnList];
      const src = newItems.indexOf(data.dragging);
      const dst = newItems.indexOf(item);
      newItems.splice(dst, 0, ...newItems.splice(src, 1));
      // 交换索引
      temp = data.dragging.sortNumber;
      data.dragging.sortNumber = item.sortNumber;
      item.sortNumber = temp;
      // 重新赋值
      data.columnList = newItems;
    };

    // 完成元素拖动后触发
    const handleDragEnd = (e: any, item: HTMLElement) => {
      data.dragging = null;
    };

    const changeIsPublic = (item: HTMLElement, val: boolean) => {
      console.log(item);
      console.log(val);
    };

    return {
      ...toRefs(data),
      handleDragStart,
      handleDragEnd,
      handleDragOver,
      handleDragEnter,
      changeIsPublic,
    };
  },
};
</script>

<style>
.all_column_list_header {
  margin: 50px 0 20px 0;
  color: #555666;
}
.all_column_list > li {
  width: 100%;
  height: 95px;
  cursor: move;
  border-top: 0.1px solid rgb(228, 227, 227);
  padding: 10px;
  display: flex;
  align-items: center;
}

.column_list_edit {
  margin-left: 590px;
  width: 300px;
  display: flex;
  justify-content: center;
}
.column_list_edit > a {
  margin: 0 10px 0 10px;
  font-size: 13.5px;
  color: #349edf;
}

.is_public {
  margin-left: -20px;
}
.article_number {
  margin-left: 115px;
}
</style>