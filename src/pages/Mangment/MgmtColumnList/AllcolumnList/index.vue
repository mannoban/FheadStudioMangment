<template>
  <div>
    <ColumnList :columnList="columnList"></ColumnList>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs } from "@vue/reactivity";
import ColumnList from "../ColumnList/index.vue";
import { AllColumnListData } from "../../../../utils/type";
import api from "../../../../api/index";
import useTop from "../../../../Hook/useTop";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
export default {
  name: "AllColumnList",
  components: {
    ColumnList,
  },
  setup() {
    let data: AllColumnListData = reactive({
      columnList: [],
      dragging: null,
    });
    const store = useStore();

    onMounted(async () => {
      await init();
    });

    // 获取所有专栏
    const init = async () => {
      await api.getColumnAll(store.state.userId).then((res) => {
        let { columnList } = res.data.data;
        data.columnList = useTop(columnList);
      });
    };

    return {
      ...toRefs(data),
    };
  },
};
</script>