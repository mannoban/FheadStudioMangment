<template>
  <div class="column_mangment_container">
    <header class="column_mangment_header">
      <router-link to="/my/mgmtColumnList/all">
        <a class="column_mangment_link all" style="margin-left: 0" href=""
          >全部(6)</a
        >
      </router-link>
      <router-link
        to="/my/mgmtColumnList/notpass"
        style="margin-left: 0"
        class="column_mangment_link notpass"
      >
        <a class="column_mangment_link notpass" href="">审核未通过(0)</a>
      </router-link>
      <router-link to="/my/mgmtColumnList/recycleBin" style="margin-left: 0">
        <a class="column_mangment_link recycle_bin" href="">回收站(20)</a>
      </router-link>
      <button class="new_column" @click="dialogVisible = true">新建</button>
    </header>
    <article class="column_mangment_article">
      <router-view></router-view>
    </article>

    <!-- 新建专栏 -->
    <el-dialog
      v-model="dialogVisible"
      title="新建"
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
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs, ref, watch } from "vue";
import api from "../../../api/index";
import { ElMessageBox, ElMessage } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import type { UploadFile } from "element-plus/es/components/upload/src/upload.type";
export default {
  name: "MgmtColumnList",
  components: {
    Plus,
  },
  setup() {
    let data = reactive({
      dialogVisible: false,
      columnForm: {
        columnName: "",
        columnCoverId: "",
      },
    });

    const handleCloseColumnEditor = () => {};

    const submitEditorForm = (form: object) => {
      // api.addColumn()
    };
    return {
      ...toRefs(data),
      handleCloseColumnEditor,
      submitEditorForm,
    };
  },
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