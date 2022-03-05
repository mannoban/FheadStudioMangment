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
      <el-table-column prop="date" label="注册日期" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="phone" label="联系方式" />
      <el-table-column prop="identify" label="身份" />
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
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username" style="width: 350px"></el-input>
      </el-form-item>
      <el-form-item label="联系方式" prop="phone">
        <el-input v-model="ruleForm.phone" style="width: 350px"></el-input>
      </el-form-item>
      <el-form-item label="身份" prop="identify">
        <el-radio-group v-model="ruleForm.identify">
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
export default {
  name: "VisitorMessage",
  setup(props) {
    let data = reactive({
      dialogFormVisible: false,
      formLabelWidth: "120px",
      visitorData: [{}], //用户信息
      formSize: "120px",
      pageSize: 10,
      total: 100,
      // 编辑信息
      ruleForm: {
        id: "",
        registerDate: "",
        email: "",
        username: "",
        identify: "",
        phone: "",
      },
      // 编辑栏规则
      rules: {
        username: [
          {
            required: true,
            message: "Please input username",
            trigger: "blur",
          },
        ],
        registerDate: [{ required: true }],
        email: [{ required: true }],
        phone: [{ required: true }],
        identify: [
          {
            required: true,
            message: "Please input identify",
            trigger: "blur",
          },
        ],
      },
    });

    // 初始化
    onMounted(() => {
      getUserList();
    });

    //获取游客信息(分页请求)
    const getUserList = () => {
      axios
        .get("api/visitors/all")
        .then((res) => {
          let newArr = [];
          for (let item of res.data) {
            item.date = formatTime(item.date);
            newArr.push(item);
          }
          data.visitorData = newArr;
          data.total = res.data.length;
        })
        .catch((err) => {
          throw err;
        });
    };

    // 删除游客信息
    const handleDelete = (index: number, row: any) => {
      let email = row.email;
      let formData = {
        email,
      };
      ElMessageBox.confirm("确认删除该用户吗?", "Warning", {
        cancelButtonText: "取消",
        confirmButtonText: "确认",
        type: "warning",
      }).then(() => {
        axios
          .post("api/visitors/delete", formData)
          .then((res) => {
            ElMessage({
              showClose: true,
              message: "删除成功",
              type: "success",
            });
            window.location.reload();
          })
          .catch((err) => {
            ElMessage({
              showClose: true,
              message: "删除失败",
              type: "error",
            });
          });
      });
    };

    // 编辑游客信息
    const handleEdit = (e: any, row: any, index: number) => {
      data.dialogFormVisible = true;
      data.ruleForm.email = `${row.email}`;
      data.ruleForm.registerDate = `${row.date}`;
      data.ruleForm.username = row.userName;
      data.ruleForm.identify = row.identify;
      data.ruleForm.phone = row.phone;
      data.ruleForm.id = row._id;
    };

    // 提交修改信息
    const submitEditUserForm = () => {
      const editUserForm = data.ruleForm;
      console.log(editUserForm);
      axios
        .post("url", editUserForm)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    // 查询游客信息
    const searchVisitor = () => {};

    return {
      Search,
      ...toRefs(data),
      handleEdit,
      handleDelete,
      formatTime,
      searchVisitor,
      submitEditUserForm,
    };
  },
};
</script>

<style src="./index.css"/>
