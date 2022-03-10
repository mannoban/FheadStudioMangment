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
      <el-select v-model="columnName" class="m-3" placeholder="分类专栏">
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
        v-model="searchInput"
        class="w-50 m-2"
        size="middle"
        placeholder="请输入标题关键词"
      ></el-input>
      <button class="search_srticle_button" @click="searchArticle()">
        搜索
      </button>
    </header>
    <!-- 文章列表 -->
    <ul class="article_mangment_list" v-loading="isLoading">
      <li v-for="(item, index) in articleList" :key="item.articleid">
        <div class="list_item_cover left_view">
          <img :src="item.coverImgId" alt="" />
        </div>
        <div class="right_view">
          <div class="list_item_header">
            <a class="article_mangment_title" href="#" title="111">{{
              item.title
            }}</a>
            <span style="float: right; font-size: 14px; color: #999">{{
              formatTime(item.publishTime)
            }}</span>
          </div>
          <div class="list_item_container">
            <span class="original" v-if="item.alreadyPublish == 1">原创</span>
            <span class="draft" v-if="item.alreadyPublish == 0">草稿</span>
          </div>
          <div class="list_item_footer">
            <span class="article_list_footer_date">阅读量</span>
            <span class="circle"></span
            ><span class="article_list_footer_date">{{ item.viewNum }}</span>
            <div class="article_mangment_footer_right">
              <span
                class="article_mangment_footer_edit article_link"
                v-if="item.alreadyPublish == 1"
                @click="lookArticleDate()"
                >查看数据</span
              >
              <span
                class="article_mangment_footer_edit article_link"
                @click="editThisArticle(item, index)"
                >编辑</span
              >
              <span
                class="article_mangment_footer_edit article_link"
                @click="lookThisArticle()"
                >浏览</span
              >
              <span class="article_mangment_footer_edit">
                <el-tooltip content="Bottom Left prompts info" effect="light">
                  <template #content>
                    <div v-if="item.alreadyPublish === 0">
                      <button
                        class="reset_btn"
                        @click="deleteThisArticle(item.articleId, index)"
                      >
                        删除
                      </button>
                    </div>
                    <div v-if="item.alreadyPublish === 1">
                      <button
                        class="reset_btn"
                        @click="setTopArticle(item.articleId, index)"
                      >
                        置顶
                      </button>
                      <br />
                      <button
                        class="reset_btn"
                        @click="deleteThisArticle(item.articleId)"
                      >
                        删除
                      </button>
                    </div>
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
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { onMounted, reactive, toRefs, provide, inject } from "vue";
import { formatTime } from "../../../utils/use";
import { useRouter } from "vue-router";
import {
  MgmtArticleData,
  ColumnArrObj,
  TopData,
  SearchData,
} from "../../../utils/type";
import api from "../../../api/index";
import { ElMessageBox, ElMessage } from "element-plus";
import useTop from "../../../Hook/useTop";
import { useStore } from "vuex";
export default {
  name: "MgmtArticle",
  components: {},
  setup() {
    const date = new Date();
    let thisyear: number = date.getFullYear();
    const store = useStore();
    let data: MgmtArticleData = reactive({
      yearValue: "", //select绑定值
      monthValue: "",
      searchInput: "", // input绑定值
      columnName: "",
      isLoading: false,
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
      oldArticleId: "",
    });

    onMounted(() => {
      init();
    });

    // 文章获取
    const init = () => {
      api.getAllArticle(store.state.userId).then((res) => {
        let { articleList, columnName } = res.data;
        // 专栏初始化
        let columnArr: any = [];
        columnName.forEach((element: string, index: number) => {
          let obj: ColumnArrObj = {
            id: 0,
            label: "",
            value: "",
          };
          obj.id = index;
          obj.label = element;
          obj.value = element;
          columnArr.push(obj);
        });
        data.columnOptions = columnArr;
        data.articleList = useTop(articleList);
      });
    };

    // 编辑文章(movonEditor回显) ok
    const router = useRouter();
    const editThisArticle = (item: any, index: number) => {
      router.push({
        path: "/my/publishArticle",
        query: {
          articleId: item.articleId,
        },
      });
    };

    // 获取原来置顶的文章Id
    const getOldArticleId = () => {
      data.articleList.forEach((item) => {
        item.top === true ? (data.oldArticleId = item.articleId) : "";
      });
    };

    // 置顶文章接口
    const useTopArticleApi = (topData: TopData) => {
      api.topArticle(topData).then((res) => {
        ElMessage({
          type: "success",
          message: "置顶成功",
        });
      });
    };

    // 置顶;
    const setTopArticle = async (articleId: string, index: number) => {
      await getOldArticleId();
      let oldArticleId = data.oldArticleId;
      if (oldArticleId === "") {
        let topData: TopData = {
          newArticleId: articleId,
        };
        useTopArticleApi(topData);
      } else {
        let topData: TopData = {
          oldArticleId,
          newArticleId: articleId,
        };
        useTopArticleApi(topData);
      }
      /*  let oldArticle = data.articleList[0];
      let oldArticleTopNumber: number = oldArticle.top;
      let top: number = oldArticleTopNumber + 1;
      let topData: TopData = {
        articleId,
        top,
      };
      api.topArticle(topData).then((res) => {}); */
    };

    // 删除;
    const deleteThisArticle = (articleId: string) => {
      ElMessageBox.confirm("确认删除该文章吗?", "", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        api.deleteArticle(articleId).then((res) => {
          ElMessage({
            type: "success",
            message: "删除成功",
          });
        });
      });
    };

    // 搜索文章
    const searchArticle = () => {
      data.isLoading = true;
      const userId = store.state.userId;
      const { yearValue, monthValue, columnName, searchInput } = data;
      let searchData: SearchData = {
        userId,
        year: yearValue,
        month: monthValue,
        columnName: columnName,
        titleAbstruct: searchInput,
      };
      api.searchArticle(searchData).then((res) => {
        data.isLoading = false;
        let { articleList } = res.data.data;
        data.articleList = articleList;
      });
    };

    // 查看数据(图表可视化)
    const lookArticleDate = () => {};

    // 浏览(调到前台)
    const lookThisArticle = () => {};

    return {
      ...toRefs(data),
      formatTime,
      editThisArticle,
      lookArticleDate,
      lookThisArticle,
      setTopArticle,
      deleteThisArticle,
      searchArticle,
    };
  },
};
</script>

<style src="./index.css"/>
