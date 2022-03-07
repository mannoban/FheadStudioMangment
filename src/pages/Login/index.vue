<template>
  <Banner></Banner>
  <div class="login layout">
    <h2 class="coding">It takes time to get good at coding.</h2>
    <h3 class="lifeTime">True mastery of any skill takes a lifetime.</h3>
    <!-- 登录表单 -->
    <div class="login_form" v-show="!isRegister">
      <el-alert
        title="请输入正确的邮箱"
        type="error"
        show-icon
        v-if="alertEmail"
        style="position: absolute"
      >
      </el-alert>
      <el-alert
        title="密码不能为空"
        type="error"
        show-icon
        v-if="alertPsw"
        style="position: absolute"
      >
      </el-alert>
      <h3 class="login_title">登 录 账 号</h3>
      <div class="login_title_message">DengLuZhangHao</div>
      <div class="login_container">
        <form action="" class="userForm">
          <div class="email">
            <label for="email"></label>
            <i class="email_icon"></i>
            <input
              id="email"
              type="text"
              placeholder="请输入邮箱或手机号"
              class="user_input"
              v-model="userForm.userName"
            />
          </div>
          <div class="password">
            <label for="password"> </label>
            <i class="password_icon"></i>
            <input
              id="password"
              type="password"
              placeholder="请输入您的密码"
              class="user_input"
              v-model="userForm.password"
            />
          </div>
          <div class="identify_code">
            <label for="identifyCode"> </label>
            <i class="identifyCode_icon"></i>
            <input
              id="identifyCode"
              type="text"
              placeholder="请输入验证码"
              class="user_input"
              v-model="userForm.identifyCode"
            />
          </div>
          <el-row class="mb-4">
            <el-button
              type="primary"
              class="login_form_button"
              @click="submitLogin()"
              >登录</el-button
            >
            <el-button
              type="primary"
              class="login_form_button"
              @click="isRegister = true"
              >注册</el-button
            >
          </el-row>
        </form>
      </div>
    </div>
    <!-- 注册表单 -->
    <div class="login_form" v-show="isRegister">
      <span
        ><el-icon class="back" @click="isRegister = false"
          ><arrowLeftBold /></el-icon
      ></span>
      <h3 class="login_title">注 册 账 号</h3>
      <div class="login_title_message">ZhuCeZhangHao</div>
      <div class="login_container">
        <form action="" class="userForm">
          <div class="userName">
            <label for="userName"></label>
            <i class="name_icon"> </i>
            <input
              id="userName"
              type="text"
              placeholder="请输入您的昵称"
              class="user_input"
              v-model="registerForm.userName"
            />
          </div>
          <div class="email">
            <label for="email"></label>
            <i class="email_icon" style="top: 92px"></i>
            <input
              id="email"
              type="text"
              placeholder="请输入您的邮箱"
              class="user_input"
              v-model="registerForm.email"
            />
          </div>
          <div class="phone">
            <label for="phone"></label>
            <i class="phone_icon" style="top: 153px"></i>
            <input
              id="phone"
              type="text"
              placeholder="请输入您的手机号"
              class="user_input"
              v-model="registerForm.phone"
            />
          </div>
          <div class="password">
            <label for="password"></label>
            <i class="password_icon" style="top: 215px"></i>
            <input
              id="password"
              type="password"
              placeholder="请输入您的密码"
              class="user_input"
              v-model="registerForm.password"
            />
          </div>
          <el-row class="mb-4">
            <el-button
              style="margin-top: 30px"
              type="primary"
              class="form_button register_immediately"
              @click="submitRegister()"
              >立即注册</el-button
            >
          </el-row>
        </form>
      </div>
    </div>
    <img src="../../static/imgs/login_bg.jpg" alt="" />
  </div>
</template>

<script lang="ts">
import { Edit, ArrowLeftBold } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { ref, reactive, toRefs, defineComponent } from "vue";
import Banner from "../../components/Banner.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import api from "../../api/index";
import regExp from "../../utils/regExp";
import { log } from "console";
export default defineComponent({
  name: "Login",
  components: {
    Banner,
    arrowLeftBold: ArrowLeftBold,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    let state = reactive({
      isRegister: false,
      loginFormRember: false,
      userForm: {
        userName: "",
        password: "",
      },
      registerForm: {
        userName: "",
        email: "",
        password: "",
        identify: "employee",
        phone: "",
      },
    });

    const login = (userForm: object) => {
      api
        .userLogin(userForm)
        .then((res) => {
          let { token, userId } = res.data.data;
          store.dispatch("setToken", token);
          store.dispatch("getUser", userId);
          router.push("/my");
          ElMessage({
            message: "登录成功",
            type: "success",
          });
        })
        .catch((err) => {
          throw err;
        });
    };

    // 登录
    const submitLogin = () => {
      if (regExp.emailReg.test(state.userForm.userName)) {
        let userForm = {
          email: state.userForm.userName,
          password: state.userForm.password,
        };
        login(userForm);
      } else if (regExp.phoneReg.test(state.userForm.userName)) {
        let userForm = {
          telephone: state.userForm.userName,
          password: state.userForm.password,
        };
        login(userForm);
      } else {
        ElMessage({
          message: "请输入正确的邮箱或手机号格式",
          type: "error",
        });
      }
    };

    // 注册账号
    const submitRegister = () => {
      let { email, phone } = state.registerForm;
      if (!regExp.emailReg.test(email)) {
        ElMessage({
          message: "请输入正确的邮箱格式",
          type: "error",
        });
      } else if (!regExp.phoneReg.test(phone)) {
        ElMessage({
          message: "请输入正确的手机号",
          type: "error",
        });
      } else {
        api
          .userRegister(state.registerForm)
          .then((res) => {
            ElMessage({
              showClose: true,
              message: "注册成功",
              type: "success",
            });
            state.isRegister = false;
          })
          .catch((err) => {
            throw err;
          });
      }
    };

    return {
      Edit,
      ...toRefs(state),
      submitLogin,
      submitRegister,
    };
  },
});
</script>

<style src="./index.css"/>


