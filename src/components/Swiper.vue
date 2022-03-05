<template>
  <div class="swiper_container">
    <ul class="swiper_list">
      <!--
           li由于是绝对定位的关系 所有会重合 后面的会覆盖前面的
           fade其实一个关键的类名 谁身上有fade 谁就会显示
        -->
      <li
        class="swiper_item"
        v-for="(item, index) in list"
        :key="item.id"
        :class="{ fade: index === curIdx }"
      >
        <img :src="item.imgUrl" alt="" class="swiper_img" />
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from "vue";
export default {
  name: "Swiper",
  props: {
    // 轮播列表
    list: {
      type: Array,
      default: () => {},
    },
    // 切换时间
    duration: {
      type: Number,
      default: 3000,
    },
    // 是否自动播放
    autoPlay: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    let curIdx = ref(0);
    let timer = ref(null);

    // 自动播放
    const startTimer = () => {
      if (!props.autoPlay) {
        return;
      }
      timer = setInterval(() => {
        console.log(curIdx);
        curIdx.value++;
        if (curIdx.value === props.list.length) {
          curIdx.value = 0;
        }
      }, props.duration);
    };

    // 移除定时器
    const stopTimer = () => {
      clearInterval(timer);
    };

    onMounted(() => {
      startTimer();
    });

    onUnmounted(() => {
      stopTimer();
    });

    return {
      curIdx,
    };
  },
};
</script>

<style scope>
/* .swiper_container {
} */
.swiper_img {
  width: 100%;
  object-fit: cover;
}
.swiper_container > ul {
  width: 100%;
}
.swiper_list {
  width: 100%;
  position: relative;
}
.swiper_item {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  transition: opacity 2s linear;
}
.fade {
  opacity: 1;
  z-index: 1;
}
</style>