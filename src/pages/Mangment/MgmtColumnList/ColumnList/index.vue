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
        :key="item.columnId"
        :draggable="true"
        @dragstart="handleDragStart($event, item)"
        @dragover.prevent="handleDragOver($event, item)"
        @dragenter="handleDragEnter($event, item)"
        @dragend="handleDragEnd($event, item)"
      >
        <div class="column_list_left">
          <img :src="item.columnCoverId" alt="" />
          <div style="margin-left: 15px">{{ item.columnName }}</div>
        </div>
        <div class="column_list_edit column_list_right">
          <span @click="manageColumn(item.columnName, index)">管理</span>
          <span @click="editorColumn(item, index)">编辑</span>
          <span v-if="item.top !== true" @click="topColumn(item, index)"
            >置顶</span
          >
          <span style="color: #fc5531" @click="delColumn(item, index)"
            >删除</span
          >
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
  <!-- 编辑框 -->
  <el-dialog
    v-model="dialogVisible"
    title="编辑"
    width="30%"
    :before-close="handleCloseColumnEditor()"
  >
    <el-form-item label="">
      <div class="upload_column_name">请输入专栏名称 :</div>
      <el-input v-model="columnForm.columnName"></el-input>
    </el-form-item>
    <!-- 上传图片 -->
    <div class="upload_column_cover">请上传专栏封面 : (非必选)</div>
    <el-upload
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
    >
      <el-icon><Plus /></el-icon>
    </el-upload>
    <el-dialog v-model="imgDialogVisible">
      <img width="100%" :src="columnForm.columnCoverId" alt="" />
    </el-dialog>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitEditorForm(columnForm)"
          >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs, ref, watch } from "vue";
import { columnMangmentForm, AllColumnListData } from "../../../../utils/type";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import api from "../../../../api/index";
import { ElMessageBox, ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadFile } from "element-plus/es/components/upload/src/upload.type";
export default {
  name: "AllColumnList",
  props: {
    columnList: {
      type: Array,
      required: true,
      default() {
        return [];
      },
    },
  },
  components: { Plus },
  setup(props: any, context) {
    interface Data {
      dragging: any;
      dialogVisible: boolean;
      columnForm: {
        columnName: string;
        columnCoverId: string;
      };
    }
    let data: Data = reactive({
      dragging: false,
      dialogVisible: false,
      imgDialogVisible: false,
      columnForm: {
        columnName: "",
        columnCoverId: "",
      },
    });
    const store = useStore();
    const router = useRouter();

    onMounted(() => {});

    // watch(() => {});

    // 管理专栏
    const manageColumn = (columnName: string) => {
      let columnMangmentForm: columnMangmentForm = {
        userId: store.state.userId,
        columnName,
      };
      api.searchArticle(columnMangmentForm).then((res) => {
        console.log(res);
      });
      router.push({
        query: { columnName: columnName },
        path: "/my/mgmtColumnList/articleList",
      });
    };

    // 编辑专栏
    const editorColumn = (item: any, index: number) => {
      data.dialogVisible = true;
      let { columnName, columnCoverId } = item;
      data.columnForm.columnName = columnName;
      data.columnForm.columnCoverId = columnCoverId;
    };

    // 提交编辑信息
    const submitEditorForm = (columnForm: Data["columnForm"]) => {
      data.dialogVisible = false;
      console.log(columnForm);
      api.editorColumn(columnForm).then((res) => {
        ElMessage({
          type: "success",
          message: "提交成功",
        });
      });
    };

    // 置顶专栏
    const topColumn = (item: any, index: number) => {
      let newColumnId = item.columnId;
      let oldColumnitem = props.columnList[0];
      let { top: oldColumnTop, columnId: oldColumnId } = oldColumnitem;
      if (oldColumnTop === true) {
        let form = {
          top: true,
          newColumnId,
          oldColumnId: oldColumnId,
        };
        api.topColumn(form).then((res) => {});
      } else {
        let form = {
          top: true,
          newColumnId,
        };
        api.topColumn(form).then((res) => {});
      }
    };

    // 删除专栏
    const delColumn = (item: any, index: number) => {
      api.delColumn(store.state.userId, item.columnId).then((res) => {});
    };

    // 关闭修改框
    const handleCloseColumnEditor = () => {};

    // 切换是否公开
    const changeIsPublic = (item: HTMLElement, val: boolean) => {
      console.log(item);
      console.log(val);
    };

    /* 
    拖拽组件实现
    */

    // 当元素被拖动时
    const handleDragStart = (e: any, item: HTMLElement) => {
      data.dragging = item;
    };

    // 当某被拖动的对象在另一对象容器范围内拖动时触发此事件
    const handleDragOver = (e: any) => {
      e.dataTransfer.dropEffect = "move";
    };

    // 当放置被拖元素时(拖拽请求)
    const handleDragEnter = (e: any, item: any) => {
      // e.dataTransfer.effectAllowed = "move";
      // //拖拽元素和本身一样
      // if (item === data.dragging) {
      //   return;
      // }
      // let temp: number;
      // const newItems = [...data.columnList];
      // const src = newItems.indexOf(data.dragging);
      // const dst = newItems.indexOf(item);
      // newItems.splice(dst, 0, ...newItems.splice(src, 1));
      // // 交换索引
      // temp = data.dragging.sortNumber;
      // data.dragging.sortNumber = item.sortNumber;
      // item.sortNumber = temp;
      // // 重新赋值
      // data.columnList = newItems;
    };

    // 完成元素拖动后触发
    const handleDragEnd = (e: any, item: HTMLElement) => {
      //   data.dragging = null;
    };

    return {
      ...toRefs(data),
      manageColumn,
      editorColumn,
      topColumn,
      delColumn,
      changeIsPublic,
      handleDragStart,
      handleDragEnd,
      handleDragOver,
      handleDragEnter,
      handleCloseColumnEditor,
      submitEditorForm,
    };
  },
};
</script>

<style>
.dialog-footer button:first-child {
  margin-right: 10px;
}
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
  margin-left: 510px;
  width: 300px;
  display: flex;
  justify-content: center;
}
.column_list_edit > span {
  margin: 0 10px 0 10px;
  font-size: 13.5px;
  color: #349edf;
}
.column_list_edit > span:hover {
  cursor: pointer;
}
.is_public {
  margin-left: -20px;
}
.article_number {
  margin-left: 115px;
}
.column_list_left {
  width: 220px;
  height: 80px;
  line-height: 40px;
  display: flex;
  align-items: center;
}
.column_list_left > span {
  margin-top: -50px;
}
.upload_column_name {
  margin: 0 0 10px 0;
}
.upload_column_cover {
  margin: 20px 0 20px 0;
}
</style>