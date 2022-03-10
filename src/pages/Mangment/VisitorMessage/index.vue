<template>
  <!-- 用户信息 -->
  <div class="visitor_message">
    <div class="search">
      <input type="text" class="search_input" />
      <i class="search_icon">
        <img src="../../../static/icons/search.svg" alt="" />
      </i>
    </div>
    <el-table :data="visitorData" style="width: 99%" border="true">
      <el-table-column prop="registerDate" label="注册日期" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="nickname" label="用户名" />
      <el-table-column prop="telephone" label="联系方式" />
      <el-table-column prop="role" label="身份" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button
            type="primary"
            size="middle"
            @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="middle"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="currentPage"
      @current-change="getCurrentPage"
      class="pagination block"
    >
    </el-pagination>
  </div>
  <!-- 编辑表单 -->
  <el-dialog v-model="dialogFormVisible">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
    >
      <el-form-item label="注册日期" prop="registerDate">
        <el-input
          v-model="ruleForm.registerDate"
          style="width: 350px"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input
          v-model="ruleForm.email"
          style="width: 350px"
          readonly="readonly"
        ></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="nickname">
        <el-input v-model="ruleForm.nickname" style="width: 350px"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="telephone">
        <el-input v-model="ruleForm.telephone" style="width: 350px"></el-input>
      </el-form-item>
      <el-form-item label="身份" prop="role">
        <el-radio-group v-model="ruleForm.role">
          <el-radio label="manager"></el-radio>
          <el-radio label="employee"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button
          style="display: inline-block"
          type="primary"
          @click="submitEditUserForm()"
        >
          确认</el-button
        >
        <el-button
          style="display: inline-block"
          type="danger"
          @click="dialogFormVisible = false"
          >取消</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts">
import { reactive, onMounted, toRefs } from "vue";
import axios from "../../../utils/request";
import { ElMessage, ElMessageBox } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import { formatTime } from "../../../utils/use";
import api from "../../../api/index";
export default {
  name: "VisitorMessage",
  setup(props) {
    let data = reactive({
      dialogFormVisible: false,
      formLabelWidth: "120px",
      formSize: "120px",
      pageSize: 10, //每页显示多少条
      total: 100, // 总用户条数
      currentPage: 1, //当前页数
      visitorData: [{}], //用户信息
      // 编辑信息
      ruleForm: {
        userId: "",
        registerDate: "",
        email: "",
        telephone: "",
        nickname: "",
        role: "",
      },
      // 编辑栏规则
      rules: {
        registerDate: [{ required: true }],
        nickname: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur",
          },
        ],
        email: [{ required: true }],
        telephone: [{ required: true }],
        role: [
          {
            required: true,
            message: "请选择用户身份",
            trigger: "blur",
          },
        ],
      },
    });

    // 初始化
    onMounted(() => {
      getCurrentPage(data.currentPage);
    });

    //获取游客信息(分页请求) ok
    const getCurrentPage = (currentPage: number) => {
      let form = {
        pages: currentPage,
        onePageSum: 10,
      };
      api.getUserMessage(form).then((res) => {
        let newArr = [];
        let { totalUserNumber, userArr } = res.data.data;
        data.total = totalUserNumber;
        for (let item of userArr) {
          item.registerDate = formatTime(item.registerDate);
          newArr.push(item);
        }
        data.total = totalUserNumber;
        data.visitorData = newArr;
      });
    };

    // 删除游客信息 ok
    const handleDelete = (index: number, row: any) => {
      let userId = row.userId;
      console.log(userId);
      ElMessageBox.confirm("确认删除该用户吗?", "Warning", {
        cancelButtonText: "取消",
        confirmButtonText: "确认",
        type: "warning",
      }).then(async () => {
        await api.delUser(userId).then((res) => {
          ElMessage({
            message: "删除成功",
            type: "success",
          });
        });
        await window.location.reload();
      });
    };

    // 编辑游客信息 ok
    const handleEdit = (e: any, row: any, index: number) => {
      let { email, registerDate, nickname, role, telephone, userId } = row;
      data.dialogFormVisible = true; //打开模态框
      data.ruleForm.email = email;
      data.ruleForm.registerDate = registerDate;
      data.ruleForm.nickname = nickname;
      data.ruleForm.role = role;
      data.ruleForm.telephone = telephone;
      data.ruleForm.userId = userId;
    };

    // 提交修改信息 ok
    const submitEditUserForm = () => {
      let { email, registerDate, nickname, role, telephone, userId } =
        data.ruleForm;
      let form = {
        email,
        registerDate,
        nickname,
        role,
        telephone,
        userId,
      };
      api.editorUser(form).then((res) => {
        data.dialogFormVisible = false;
      });
    };

    // 查询游客信息 ok
    const searchVisitor = () => {};

    return {
      Search,
      ...toRefs(data),
      handleEdit,
      handleDelete,
      formatTime,
      searchVisitor,
      submitEditUserForm,
      getCurrentPage,
    };
  },
};
</script>

<style src="./index.css"/>
