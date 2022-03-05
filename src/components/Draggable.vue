<template>
  <transition-group tag="div" class="drag_container">
    <!-- <ul class="all_drag_list">
      <li
        :draggable="isDrag"
        @dragstart="handleDragStart($event, item)"
        @dragover.prevent="handleDragOver($event, item)"
        @dragenter="handleDragEnter($event, item)"
        @dragend="handleDragEnd($event, item)"
      ></li>
    </ul> -->
  </transition-group>
</template>


<script>
import { reactive, toRefs } from "vue";
export default {
  name: "Draggable",
  props: {
    isDrag: {
      type: Boolean,
      default: true,
    },
    key: {
      type: String || Number,
    },
    onDragStart: {
      type: Function,
    },
    onDragOver: {
      type: Function,
    },
    onDragEnter: {
      type: Function,
    },
    onDragEnd: {
      type: Function,
    },
  },
  setup(props) {
    let data = reactive({
      isDrag: props.isDrag,
    });

    // const handleDragStart = (e, item) => {
    //   data.dragging = item;
    // };
    // const handleDragEnd = (e, item) => {
    //   data.dragging = null;
    // };

    // //首先把div变成可以放置的元素，即重写dragenter/dragover
    // const handleDragOver = (e) => {
    //   e.dataTransfer.dropEffect = "move";
    // };

    // const handleDragEnter = (e, item) => {
    //   e.dataTransfer.effectAllowed = "move";
    //   if (item === data.dragging) {
    //     return;
    //   }
    //   const newItems = [...data.columnList];
    //   console.log(newItems);
    //   const src = newItems.indexOf(data.dragging);
    //   const dst = newItems.indexOf(item);
    //   newItems.splice(dst, 0, ...newItems.splice(src, 1));
    //   data.columnList = newItems;
    // };

    return {
      ...toRefs(data),
      handleDragStart,
      handleDragEnd,
      handleDragOver,
      handleDragEnter,
    };
  },
};
</script>

<style>
.all_drag_list > li {
  width: 100%;
  height: 50px;
  margin-top: 10px;
  cursor: move;
  border-bottom: 0.1px dashed rgb(228, 227, 227);
}
</style>