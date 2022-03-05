<template>
  <div class="mangment_article">
    <header class="mangment_article_header">
      <!-- 年 -->
      <el-select v-model="yearValue" class="m-2" placeholder="年">
        <el-option
          class="year_option"
          v-for="item in yearOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- 月 -->
      <el-select v-model="monthValue" class="m-2" placeholder="月">
        <el-option
          class="year_option"
          v-for="item in monthOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- 分类专栏 -->
      <el-select v-model="columnList" class="m-3" placeholder="分类专栏">
        <el-option
          class="column_option"
          v-for="item in columnOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- 搜索框 -->
      <el-input
        style="width: 250px"
        v-model="input1"
        class="w-50 m-2"
        size="middle"
        placeholder="请输入关键词"
      ></el-input>
      <button class="search_srticle_button">搜索</button>
    </header>
    <!-- 文章列表 -->
    <ul
      class="article_mangment_list"
      v-for="(item, index) in articleList"
      :key="item.id"
    >
      <li>
        <div class="list_item_header">
          <a class="article_mangment_title" href="#" title="111">{{
            item.title
          }}</a>
          <span style="float: right; font-size: 14px; color: #999">{{
            formatTime(item.date)
          }}</span>
        </div>
        <div class="list_item_container">
          <span class="original" v-if="item.labelType == '原创'">原创</span>
          <span class="draft" v-if="item.labelType == '草稿'">草稿</span>
        </div>
        <div class="list_item_footer">
          <span class="article_list_footer_date"
            >展现量{{ item.showAmount }}</span
          >
          <span class="circle"></span>
          <span class="article_list_footer_date"
            >阅读{{ item.readAmount }}</span
          >
          <span class="circle"></span>
          <span class="article_list_footer_date"
            >评论{{ item.commentAmount }}</span
          >
          <span class="circle"></span>
          <span class="article_list_footer_date"
            >收藏{{ item.collectAmount }}</span
          >
          <div class="article_mangment_footer_right">
            <span
              class="article_mangment_footer_edit"
              v-if="item.labelType == '原创'"
              >查看数据</span
            >
            <span
              class="article_mangment_footer_edit"
              @click="editThisArticle(item, index)"
              >编辑</span
            >
            <span class="article_mangment_footer_edit">浏览</span>
            <span
              class="article_mangment_footer_edit"
              v-if="item.labelType == '原创'"
            >
              <el-tooltip content="Bottom Left prompts info" effect="light">
                <template #content>
                  <button class="reset_btn">置顶</button>
                  <br />
                  <button class="reset_btn">删除</button>
                </template>
                <span style="position: relative">
                  <i>
                    <img
                      src="../../../static/icons/others.svg"
                      alt=""
                      style="position: absolute; top: 2px"
                    />
                  </i>
                </span>
              </el-tooltip>
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs, provide, inject } from "vue";
import { formatTime } from "../../../utils/use";
import axios from "axios";
import { useRouter } from "vue-router";
import { MgmtArticleData } from "../../../utils/type";
export default {
  name: "MgmtArticle",
  components: {},
  setup() {
    const date = new Date();
    let thisyear: number = date.getFullYear();
    let data: MgmtArticleData = reactive({
      yearValue: "", //select绑定值
      monthValue: "",
      columnList: "",
      // options选项
      yearOptions: [
        {
          value: "不限",
          label: "不限",
        },
        {
          value: thisyear,
          label: thisyear,
        },
        {
          value: thisyear - 1,
          label: thisyear - 1,
        },
        {
          value: thisyear - 2,
          label: thisyear - 2,
        },
      ],
      monthOptions: [
        {
          value: "不限",
          label: "不限",
        },
        {
          value: "1月",
          label: "1月",
        },
        {
          value: "2月",
          label: "2月",
        },
        {
          value: "3月",
          label: "3月",
        },
        {
          value: "4月",
          label: "4月",
        },
        {
          value: "5月",
          label: "5月",
        },
        {
          value: "6月",
          label: "6月",
        },
        {
          value: "7月",
          label: "7月",
        },
        {
          value: "8月",
          label: "8月",
        },
        {
          value: "9月",
          label: "9月",
        },
        {
          value: "10月",
          label: "10月",
        },
        {
          value: "11月",
          label: "11月",
        },
        {
          value: "12月",
          label: "12月",
        },
      ],
      columnOptions: [
        {
          id: 1,
          label: "专栏一",
          value: "专栏一",
        },
      ],
      articleList: [],
    });

    onMounted(() => {
      init();
    });

    const init = async () => {
      await axios
        .get("http://127.0.0.1:8080/api/article/all")
        .then((res) => {
          let { article, column } = res.data.data;
          data.articleList = article;
          data.columnOptions = column;
          console.log(data.articleList);
        })
        .catch((err) => {
          throw err;
        });
    };

    // 编辑文章(movonEditor回显)
    const router = useRouter();
    const editThisArticle = (item: any, index: number) => {
      router.push({
        path: "/my/publishArticle",
        query: {
          articleId: item.articleId,
        },
      });
    };

    // 查看数据
    // const lookArticleDate = () => {};

    // 浏览
    // const lookThisArticle = () => {};

    // 置顶
    // const setTopArticle = () => {};

    // 删除
    // const deleteThisArticle = () => {};
    return {
      ...toRefs(data),
      formatTime,
      editThisArticle,
    };
  },
};
</script>

<style >
/* element */

.mangment_article {
  width: 1400px;
  margin-top: 70px;
  margin-left: 210px;
}
.m-2 {
  width: 100px;
  margin-left: 15px;
}
.m-3 {
  width: 250px;
  margin-left: 15px;
}
.year_option {
  width: 100px !important;
}
.column_option {
  width: 250px !important;
}

.el-input__inner::-webkit-input-placeholder {
  color: #606266;
}
.search_srticle_button {
  width: 80px;
  height: 30px;
  border: 1px solid #fc5531;
  color: #fc5531;
  margin-left: 20px;
  border-radius: 5px;
}
.article_mangment_list {
  width: 98%;
  margin-left: 15px;
  margin-top: 30px;
  /* background-color: pink; */
  border-bottom: 0.1px dashed rgb(228, 227, 227);
}
.list_item_header {
  height: 36.8px;
}
.list_item_container {
  height: 18px;
}
.list_item_footer {
  height: 45px;
  line-height: 55px;
}
.circle {
  display: inline-block;
  width: 4px;
  height: 4px;
  background: #555666;
  -moz-border-radius: 4px;
  -webkit-border-radius: 4px;
  border-radius: 4px;
  margin: 0 10px 3.5px 10px;
}
.article_list_footer_date {
  color: #555666;
}
.article_mangment_title {
  font-size: 16px;
  color: #555666;
}
.article_mangment_title:hover {
  color: #fc5531;
}
.original,
.draft {
  width: 32px;
  background-color: #fff5f2;
  color: #fc5531;
  font-size: 13px;
}
.draft {
  color: #999aaa;
}
.article_mangment_footer_right {
  float: right;
  cursor: pointer;
}
.article_mangment_footer_edit {
  margin-right: 30px;
  font-size: 14px;
}
.reset_btn {
  width: 70px;
  height: 30px;
  border-radius: 15px;
  margin-top: 10px;
}
.reset_btn:hover {
  background-color: #fc5531;
  color: #fff;
}
</style>