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
        >{{ descWords(50, article.title.length) }}/50</span
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
          <el-upload
            action="https://jsonplaceholder.typicode.com/posts/"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="coverUploadSuccess"
            limit="1"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
          <el-dialog v-model="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>

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
            >{{ descWords(256, article.abstrct.length) }}/256</span
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
            >{{ descWords(256, article.abstrct.length) }}/256</span
          >
        </div>

        <!-- 文章标签 -->
        <el-form-item
          label="文章标签 : "
          prop="labelType"
          style="margin-left: -6px"
        >
          <el-checkbox-group v-model="article.labelType">
            <el-checkbox label="前端" name="labelType1"></el-checkbox>
            <el-checkbox label="后端" name="labelType2"></el-checkbox>
            <el-checkbox label="网络" name="labelType3"></el-checkbox>
            <el-checkbox label="算法" name="labelType4"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 文章专栏 -->
        <el-form-item
          label="文章专栏 : "
          prop="columnType"
          style="margin-left: -6px"
          class="article_publish_column"
        >
          <el-checkbox-group
            v-model="article.columnType"
            v-for="item in columnList"
            :key="item.id"
          >
            <el-checkbox
              :label="item.ColumnName"
              :name="item.name"
              style="margin-left: 10px"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 发布形式 -->
        <el-form-item
          label="发布形式 : "
          prop="releaseType"
          style="margin-left: -7px"
        >
          <el-radio-group v-model="article.releaseType">
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
        <el-button class="radius" plain type="info" @click="pubishDelay()"
          >定时发布</el-button
        >
        <button class="punlishBtn" @click="publishArticle()">发布文章</button>
      </div>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { reactive, ref, toRefs, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "../../../utils/request";
import { ElMessage } from "element-plus";
import { Plus, ZoomIn, Download, Delete } from "@element-plus/icons-vue";
import type { UploadFile } from "element-plus/es/components/upload/src/upload.type";
import { ArticleForm } from "../../../utils/type";
import { mdToText } from "../../../utils/use";
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
    }

    let data: Data = reactive({
      dialogFormVisible: false, //上传表单
      dialogVisible: false,
      dialogImageUrl: "",
      disabled: false,
      formSize: "120px",
      columnList: [],
      rules: {
        coverType: [{ required: true }],
        releaseType: [{ required: true }],
        labelType: [{ required: true, message: "请选择文章标签" }],
        columnType: [{ required: true, message: "请选择文章专栏" }],
      },
      article: {
        articleId: "",
        userId: "",
        title: "",
        content: "",
        imgFile: [],
        abstrct: "", //摘要
        coverType: "", //单图or无封面
        coverUrl: "", //封面
        labelType: [], //文章标签
        columnType: [], //文章专栏
        releaseType: "", //发布方式
        type: "", //草稿or发布
        publishDelayTime: "", //定时发布
        date: Date.now(), //时间
      },
    });

    onMounted(() => {
      initPublishArticle();
      backShow();
    });

    // 文章回显
    const route = useRoute();
    const backShow = async () => {
      let { articleId } = route.query;
      if (articleId) {
        axios
          .get(
            `http://127.0.0.1:8080/api/article/detail/?articleId=${articleId}`
          )
          .then((res) => {
            data.article = res.data.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    };

    // 剩余字数统计(计算属性需要使用闭包)
    const descWords = computed(() => {
      return function (total: number, txtLength: number): number {
        let remainLength = total - txtLength;
        return remainLength;
      };
    });

    // 获取专栏列表
    const initPublishArticle = () => {
      axios
        .get("http://127.0.0.1:8080/api/article/getColumn")
        .then((res) => {
          let { columnList } = res.data.data;
          data.columnList = columnList;
        })
        .catch((err) => {
          throw err;
        });
    };

    // 上传文章图片
    const handleEditorImgAdd = (pos: number, $file: any) => {
      let formData = new FormData();
      formData.append("image", $file); // formData.getAll("image");
      axios
        .post("http://127.0.0.1:8080/api/article/fileds", formData)
        .then((res) => {
          let url = res.data.avatar;
          let name = $file._name;
          //将返回的url替换到文本原位置![...](0) -> ![...](url)
          let { content } = data.article;
          if (content.includes(name)) {
            let oStr: string = `(${pos})`;
            let nStr: string = `(${url})`;
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
        })
        .catch((err) => {
          throw err;
        });
    };

    // 删除文章图片
    const handleEditorImgDel = (pos: number) => {
      let formData = new FormData();
      formData.append("url", pos[1]);
      console.log(formData.getAll("url"));
    };

    // 上传封面成功
    const coverUploadSuccess = () => {};

    // 文件列表移除文件时的钩子
    const handleRemove = (file: UploadFile, fileList: UploadFile[]) => {
      console.log(file, fileList);
    };

    // 点击文件列表中已上传的文件时的钩子
    const handlePictureCardPreview = (file: UploadFile) => {
      data.dialogImageUrl = file.url!;
      data.dialogVisible = true;
    };

    // 保存草稿
    const saveArticle = () => {
      data.article.type = "draft";
      let articleForm = data.article;
      let { content } = articleForm;
      // console.log(content);
      let test = mdToText(content);
      console.log(test);
      /*  if (!content) {
        ElMessage({
          showClose: true,
          message: "文章内容不能为空.",
        });
      } else {
        axios
          .post("url", articleForm)
          .then((res) => {
            ElMessage({
              showClose: true,
              message: "保存成功",
              type: "success",
            });
          })
          .catch((err) => {
            ElMessage({
              showClose: true,
              message: err,
              type: "error",
            });
          });
      } */
    };

    // 发布文章
    const publishArticle = () => {
      data.article.type = "mainBody";
      let articleForm = data.article;
      let { title, content, labelType, columnType, releaseType } = articleForm;
      if (!title || !content) {
        ElMessage({
          showClose: true,
          message: "标题内容不能为空",
          type: "error",
        });
      } else if (!labelType || !columnType || !releaseType) {
        ElMessage({
          showClose: true,
          message: "请设置文章标签",
          type: "error",
        });
      } else {
        axios
          .post("url", articleForm)
          .then((res) => {
            ElMessage({
              showClose: true,
              message: "发布成功",
              type: "success",
            });
          })
          .catch((err) => {
            ElMessage({
              showClose: true,
              message: err,
              type: "error",
            });
          });
      }
    };

    // 定时发布
    const publishDelay = () => {
      console.log(data.article);
    };

    return {
      ...toRefs(data),
      descWords,
      saveArticle,
      handleEditorImgAdd,
      handleEditorImgDel,
      publishArticle,
      handleRemove,
      handlePictureCardPreview,
      coverUploadSuccess,
      publishDelay,
    };
  },
};
</script>

<style src="./index.css" />