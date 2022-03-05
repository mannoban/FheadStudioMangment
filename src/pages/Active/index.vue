<template>
  <div>
    <Banner></Banner>
    <div class="active_bg">
      <img src="../../static/imgs/mien_bg.jpg" alt="" />
    </div>
  </div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import Banner from "../../components/Banner.vue";
export default {
  name: "Active",
  setup() {
    return {};
  },
  components: {
    Banner,
  },
};
</script>

<style src="./index.css"/>
