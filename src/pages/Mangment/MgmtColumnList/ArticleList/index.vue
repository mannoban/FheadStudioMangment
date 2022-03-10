<template>
  <!-- 文章列表 -->
  <ul class="article_mangment_list_2" v-loading="isLoading">
    <li v-for="(item, index) in articleList" :key="item.articleid">
      <!-- <div class="list_item_cover left_view">
        <img :src="item.coverImgId" alt="" />
      </div> -->
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
                      src="../../../../static/icons/others.svg"
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
</template>

<script lang="ts">
import { onMounted, reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import { ElMessageBox, ElMessage } from "element-plus";
import { formatTime } from "../../../../utils/use";
import { MgmtArticleData, TopData, SearchData } from "../../../../utils/type";
import api from "../../../../api/index";
import useTop from "../../../../Hook/useTop";

export default {
  name: "ArticleList",
  setup() {
    const store = useStore();
    const route = useRoute();
    let data: MgmtArticleData = reactive({
      isLoading: false,
      articleList: [],
      oldArticleId: "",
    });

    onMounted(() => {
      init();
    });

    // 文章获取
    const init = () => {
      const columnName = route.query.columnName;
      const searchForm = {
        userId: store.state.userId,
        columnName,
      };
      api.searchArticle(searchForm).then((res) => {
        let { articleList } = res.data.data;
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

    // 查看数据;
    const lookArticleDate = () => {};

    // 浏览;
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

<style >
.article_mangment_list_2 {
  margin-top: 20px;
}
.list_item_cover {
  width: 100px;
  height: 100px;
  text-align: center;
}
.list_item_cover > img {
  width: 90px;
  height: 90px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.article_mangment_list_2 > li {
  width: 98%;
  border-top: 0.1px dashed rgb(228, 227, 227);
  display: flex;
  padding: 10px 0 10px 0;
  height: 120px;
}
.article_mangment_list:last-child {
  border-bottom: 0.1px dashed rgb(228, 227, 227);
}
.left_view {
  min-width: 120px;
  width: 120px;
  height: 120px;
  position: relative;
}
.right_view {
  flex-grow: 1;
  margin-left: 15px;
  display: flex;
  flex-direction: column;
}
.right_view > div {
  height: 40px;

  line-height: 40px;
}
.list_item_header,
.list_item_container,
.list_item_footer {
  display: block;
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
.article_link:hover {
  color: #1f93db;
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