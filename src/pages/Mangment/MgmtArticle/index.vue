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
    <ul class="article_mangment_list">
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
                class="article_mangment_footer_edit"
                v-if="item.alreadyPublish == 1"
                @click="lookArticleDate()"
                >查看数据</span
              >
              <span
                class="article_mangment_footer_edit"
                @click="editThisArticle(item, index)"
                >编辑</span
              >
              <span
                class="article_mangment_footer_edit"
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
import { MgmtArticleData, ColumnArrObj, TopData } from "../../../utils/type";
import api from "../../../api/index";
import { ElMessageBox, ElMessage } from "element-plus";
import useTop from "../../../Hook/useTop";
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
      oldArticleId: "",
    });

    onMounted(() => {
      init();
    });

    // 文章获取
    const init = () => {
      api.getAllArticle().then((res) => {
        let { articleList, columnName } = res.data;
        // 专栏初始化
        let columnArr: MgmtArticleData["columnOptions"] = [];
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
      console.log(item);
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
        console.log(topData);
      } else {
        let topData: TopData = {
          oldArticleId,
          newArticleId: articleId,
        };
        useTopArticleApi(topData);
        console.log(topData);
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
  margin-top: 20px;
}
.list_item_cover {
  width: 100px;
  height: 100px;
  text-align: center;
}
.list_item_cover > img {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.article_mangment_list > li {
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