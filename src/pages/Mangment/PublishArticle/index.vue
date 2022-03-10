<template>
  <div class="article_container mavonEditor">
    <!-- 顶部 -->
    <div class="article_header">
      <input
        type="text"
        placeholder="请输入文章标题"
        class="title_input"
        v-model="article.title"
        maxlength="50"
      />
      <span class="article_title_words"
        >{{ useDescWords(50, article.title.length) }}/50</span
      >
      <el-button color="#626aef" plain @click="saveArticle()"
        >保存草稿</el-button
      >
      <el-button
        color="#626aef"
        style="color: white"
        @click="dialogFormVisible = true"
        >发布文章</el-button
      >
    </div>
    <!-- 富文本编辑器 -->
    <mavon-editor
      v-model="article.content"
      :ishljs="true"
      class="markdown"
      @imgAdd="handleEditorImgAdd"
      @imgDel="handleEditorImgDel"
      @save="saveArticle()"
    />

    <!-- 发布表单 -->
    <el-dialog v-model="dialogFormVisible">
      <h3 style="margin: -20px 0 10px 32px">发布文章</h3>
      <el-form
        ref="ruleFormRef"
        :model="article"
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
        :size="formSize"
      >
        <!-- 封面摘要 -->
        <el-form-item
          label="封面&摘要 : "
          prop="coverType"
          style="margin-left: 5px"
        >
          <el-radio-group v-model="article.coverType">
            <el-radio label="单图"></el-radio>
            <el-radio label="无封面"></el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 单图 -->
        <div
          style="margin: 0 0 10px 33px; position: relative"
          v-show="article.coverType === '单图'"
        >
          <!-- 上传封面 -->
          <el-upload
            action="http://127.0.0.1:8080/api/v1/image/upload"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="coverUploadSuccess"
            limit="1"
            :class="{ uoloadSty: showBtnDealImg, disUoloadSty: noneBtnImg }"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>

          <textarea
            class="article_describe_textarea"
            style="position: absolute"
            name=""
            id=""
            cols="50"
            rows="9"
            placeholder="摘要(选填):如不填写默认摘取正文前256个字符"
            maxlength="256"
            @input="descAbstrct"
            v-model="article.abstrct"
          ></textarea>
          <span class="article_describe_words"
            >{{ useDescWords(256, article.abstrct.length) }}/256</span
          >
        </div>
        <!-- 无封面 -->
        <div
          style="margin: 0 0 10px 33px; position: relative"
          v-show="article.coverType === '无封面'"
        >
          <textarea
            class="article_describe_textarea just_abstract"
            name=""
            id=""
            cols="70"
            rows="9"
            placeholder="摘要(选填):如不填写默认摘取正文前256个字符"
            maxlength="256"
            @input="descAbstrct"
            v-model="article.abstrct"
          ></textarea>
          <span class="article_describe_words" style="left: 470px"
            >{{ useDescWords(256, article.abstrct.length) }}/256</span
          >
        </div>

        <!-- 文章标签 -->
        <el-form-item
          label="文章标签 : "
          prop="label"
          style="margin-left: -6px"
        >
          <el-checkbox-group v-model="article.label">
            <el-checkbox label="前端" name="labelType1"></el-checkbox>
            <el-checkbox label="后端" name="labelType2"></el-checkbox>
            <el-checkbox label="网络" name="labelType3"></el-checkbox>
            <el-checkbox label="算法" name="labelType4"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 文章专栏 -->
        <el-form-item
          label="文章专栏 : "
          prop="column"
          style="margin-left: -6px"
          class="article_publish_column"
        >
          <el-checkbox-group
            v-model="article.column"
            v-for="item in columnList"
            :key="item.columnId"
          >
            <el-checkbox
              :label="item.columnName"
              :name="item.name"
              style="margin-left: 10px"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 发布形式 -->
        <el-form-item
          label="发布形式 : "
          prop="publishMethod"
          style="margin-left: -7px"
        >
          <el-radio-group v-model="article.publishMethod">
            <el-radio label="公开"></el-radio>
            <el-radio label="私密"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>

      <div style="display: flex; justify-content: end">
        <el-button
          class="radius"
          plain
          type="info"
          @click="dialogFormVisible = false"
          >取消</el-button
        >
        <el-button class="radius" plain type="info" @click="saveArticle()"
          >保存草稿</el-button
        >
        <button class="punlishBtn" @click="publishArticle()">发布文章</button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { reactive, ref, toRefs, onMounted } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { Plus, ZoomIn, Download, Delete } from "@element-plus/icons-vue";
import { ArticleForm } from "../../../utils/type";
import api from "../../../api/index";
import useDescWords from "../../../Hook/useDescWords";
import type { UploadFile } from "element-plus/es/components/upload/src/upload.type";
import { useStore } from "vuex";
export default {
  name: "publishArticle",
  components: {
    Plus,
    ZoomIn,
    Download,
    Delete,
  },
  setup() {
    interface Data {
      dialogFormVisible: boolean;
      dialogVisible: boolean;
      dialogImageUrl: string;
      disabled: boolean;
      formSize: string;
      columnList: Array<string>;
      rules: object;
      article: ArticleForm;
      showBtnDealImg: boolean;
      noneBtnImg: boolean;
    }

    let data: Data = reactive({
      showBtnDealImg: true,
      noneBtnImg: false,
      dialogFormVisible: false, //上传表单
      dialogVisible: true,
      dialogImageUrl: "",
      disabled: false,
      formSize: "120px",
      columnList: [],
      //表单规则
      rules: {
        coverType: [{ required: true, message: "请选择封面类型" }],
        publishMethod: [{ required: true, message: "请选择发布方式" }],
        label: [{ required: true, message: "请选择文章标签" }],
        column: [{ required: true, message: "请选择文章专栏" }],
      },
      article: {
        articleId: "121212", //文章Id
        userId: "",
        title: "",
        content: "",
        abstrct: "", //摘要
        coverImgId: "", //封面
        label: [], //文章标签
        column: [], //文章专栏
        publishMethod: "", //发布方式
        alreadyPublish: false, //草稿or发布
        date: Date.now(), //时间
        coverType: "",
      },
    });

    onMounted(() => {
      initPublishArticle();
      backShow();
    });

    // 获取专栏列表 ok
    const store = useStore();
    const initPublishArticle = () => {
      api
        .getColumnAll(store.state.userId)
        .then((res) => {
          let { columnList } = res.data.data;
          data.columnList = columnList;
        })
        .catch((err) => {
          throw err;
        });
    };

    // 发布接口调用
    const publishOrSave = (tips: string) => {
      let { articleId } = data.article;
      articleId === ""
        ? api.publishNewArticle(data.article).then((res) => {
            ElMessage({
              message: tips,
              type: "success",
            });
          })
        : api.publishOldArticle(data.article).then((res) => {
            ElMessage({
              message: tips,
              type: "success",
            });
          });
    };

    // 发布文章 ok
    const publishArticle = () => {
      let { title, content, label, column, publishMethod, articleId } =
        data.article;
      if (!title || !content) {
        ElMessage({
          message: "标题内容不能为空",
          type: "error",
        });
      } else if (!label || !column || !publishMethod) {
        ElMessage({
          message: "请设置文章标签",
          type: "error",
        });
      } else {
        publishOrSave("发布成功");
      }
    };

    // 保存草稿 ok
    const saveArticle = () => {
      let { content, title } = data.article;
      if (!content || !title) {
        ElMessage({
          message: "标题内容不能为空.",
        });
      } else {
        publishOrSave("保存成功");
      }
    };

    // 文章回显 ok
    const route = useRoute();
    const backShow = async () => {
      let { articleId } = route.query;
      if (articleId) {
        api.getArticle(articleId).then((res) => {
          let { coverImgId } = res.data.data;
          if (coverImgId) {
            data.article.coverType = "单图";
            data.article = res.data.data;
          } else {
            data.article.coverType = "无封面";
            data.article = res.data.data;
          }
        });
      }
    };

    // 上传文章图片 ok
    const handleEditorImgAdd = (pos: number, $file: any) => {
      let formData = new FormData();
      formData.append("image", $file);
      // console.log(formData.getAll("image"));
      api.uploadImage(formData).then((res) => {
        let url = res.data.imageId;
        let name = $file._name;
        //将返回的url替换到文本原位置![...](0) -> ![...](url)
        let { content } = data.article;
        if (content.includes(name)) {
          let oStr: string = `(${pos})`;
          console.log(oStr);
          let nStr: string = `(${url})`; //图片链接
          let index: number = content.indexOf(oStr);
          let str: string = content.replace(oStr, "");
          let insertStr = (
            soure: string,
            start: number,
            newStr: string
          ): string => {
            return soure.slice(0, start) + newStr + soure.slice(start);
          };
          data.article.content = insertStr(str, index, nStr);
        }
      });
    };

    // 上传封面成功
    const coverUploadSuccess = (
      response: any,
      file: UploadFile,
      fileList: UploadFile[]
    ) => {
      data.article.coverImgId = file.response;
      data.showBtnDealImg = false;
      data.noneBtnImg = true;
    };

    // 文件列表移除文件时的钩子
    const handleRemove = (file: UploadFile, fileList: UploadFile[]) => {};

    // 点击文件列表中已上传的文件时的钩子
    const handlePictureCardPreview = (file: UploadFile) => {
      data.dialogImageUrl = file.url!;
    };

    return {
      ...toRefs(data),
      useDescWords,
      saveArticle,
      handleEditorImgAdd,
      publishArticle,
      handleRemove,
      handlePictureCardPreview,
      coverUploadSuccess,
    };
  },
};
</script>

<style src="./index.css" />