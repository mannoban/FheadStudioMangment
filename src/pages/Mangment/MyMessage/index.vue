<template>
  <div class="message_container">
    <div class="person_messsage">
      <div class="personal">
        <h3 style="display: inline-block">个人信息</h3>
        <img :src="userData.headImgId" alt="" class="personal_head_img" />
        <button class="back_login_btn" @click="backLogin()">退出登录</button>
      </div>
      <ul class="message_list">
        <!-- 昵称 -->
        <li>
          <span class="message_key">用户昵称</span>
          <div
            @mouseenter="nameInput == true ? '' : (nameEdit = true)"
            @mouseleave="nameInput == true ? '' : (nameEdit = false)"
            style="display: inline-block"
          >
            <span class="message_value" v-show="!nameInput">{{
              userData.nameValue
            }}</span>
            <span
              style="color: #409eff; position: relative"
              v-show="nameEdit"
              @click="showNameInput()"
            >
              <i class="edit_icon">
                <img src="../../../static/icons/edit.svg" alt="" />
              </i>
              <span style=" width: 50px left:80px;margin-left:48px">
                编辑
              </span>
            </span>
            <div v-show="nameInput" style="display: inline-block">
              <input
                type="text"
                class="name_input"
                placeholder="请输入昵称"
                v-model="userData.nameValue"
              />
              <button class="submit" @click="submitNameValue()">提交</button>
              <button class="cancle" @click="cancleNameValue()">取消</button>
            </div>
          </div>
        </li>
        <!-- id -->
        <li>
          <span class="message_key">用 户 I D</span>
          <span class="message_value">{{ userData.userId }}</span>
        </li>
        <!-- 性别 -->
        <li>
          <span class="message_key">性 别</span>
          <div
            @mouseenter="sexInput == true ? '' : (sexEdit = true)"
            @mouseleave="sexInput == true ? '' : (sexEdit = false)"
            style="display: inline-block"
          >
            <span class="message_value" v-show="!sexInput">{{
              userData.sexValue
            }}</span>
            <span
              style="color: #409eff; position: relative"
              v-show="sexEdit"
              @click="showSexInput()"
            >
              <i class="edit_icon">
                <img src="../../../static/icons/edit.svg" alt="" />
              </i>
              <span style=" width: 50px left:80px ;margin-left:50px">
                编辑
              </span>
            </span>

            <div v-show="sexInput" style="display: inline-block">
              <div style="display: inline-block; margin-left: 18px">
                <el-radio-group v-model="userData.sexValue">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </div>
              <button class="submit">提交</button>
              <button class="cancle">取消</button>
            </div>
          </div>
        </li>
        <!-- 个人简介 -->
        <li class="person_profile_li">
          <span class="message_key">个人简介</span>
          <div
            @mouseenter="profileInput == true ? '' : (profileEdit = true)"
            @mouseleave="profileInput == true ? '' : (profileEdit = false)"
            style="display: inline-block"
          >
            <span class="message_value" v-show="!profileInput">{{
              userData.personalProfile
            }}</span>
            <span
              style="color: #409eff; position: relative"
              v-show="profileEdit"
              @click="showProfileInput()"
            >
              <i class="edit_icon">
                <img src="../../../static/icons/edit.svg" alt="" />
              </i>
              <span style=" width: 50px left:80px ;margin-left:48px">
                编辑
              </span>
            </span>
          </div>
          <div v-show="profileInput" style="display: inline-block">
            <textarea
              v-model="userData.personalProfile"
              placeholder="你很懒,还没有添加个人简介"
              class="profile_textarea"
              cols="90"
              rows="6"
            ></textarea>
            <button class="submit profile_submit" @click="submitNameValue()">
              提交
            </button>
            <button class="cancle profile_cancle" @click="cancleNameValue()">
              取消
            </button>
          </div>
        </li>
        <!-- 所在地区 -->
        <li :style="{ marginTop: profileInput == true ? '100px' : '12px' }">
          <span class="message_key">所在地区</span>
          <div
            @mouseenter="placeInput == true ? '' : (placeEdit = true)"
            @mouseleave="placeInput == true ? '' : (placeEdit = false)"
            style="display: inline-block"
          >
            <span class="message_value" v-show="!placeInput">{{
              userData.place
            }}</span>
            <span
              style="color: #409eff; position: relative"
              v-show="placeEdit"
              @click="showPlaceInput()"
            >
              <i class="edit_icon">
                <img src="../../../static/icons/edit.svg" alt="" />
              </i>
              <span style=" width: 50px left:80px ;margin-left:48px">
                编辑
              </span>
            </span>

            <div
              v-show="placeInput"
              style="display: inline-block; margin-left: 18px"
            >
              <el-cascader
                v-show="!placeInput"
                size="middle"
                :options="options"
                v-model="userData.place"
                @change="handleChange"
                placeholder="请选择"
              >
              </el-cascader>
              <button class="submit">提交</button>
              <button class="cancle">取消</button>
            </div>
          </div>
        </li>
        <!-- 出生日期 -->
        <li>
          <span class="message_key">出生日期</span>
          <div
            @mouseenter="birthInput == true ? '' : (birthEdit = true)"
            @mouseleave="birthInput == true ? '' : (birthEdit = false)"
            style="display: inline-block"
          >
            <span class="message_value" v-show="!birthInput">{{
              userData.birthDate
            }}</span>

            <span
              style="color: #409eff; position: relative"
              v-show="birthEdit"
              @click="showBirthInput()"
            >
              <i class="edit_icon">
                <img src="../../../static/icons/edit.svg" alt="" />
              </i>
              <span style=" width: 50px left:80px ;margin-left:48px">
                编辑
              </span>
            </span>
            <div
              v-show="birthInput"
              style="display: inline-block; margin-left: 18px"
            >
              <el-date-picker
                v-model="userData.birthDate"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
              <button class="submit">提交</button>
              <button class="cancle">取消</button>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- <div class="edcation_message">
      <div class="person_header personal"><h3>教育信息</h3></div>
    </div> -->
  </div>
</template>

<script>
import { Edit } from "@element-plus/icons-vue";
import { reactive, toRefs, onMounted } from "vue";
import { provinceAndCityData } from "element-china-area-data";
import { useStore } from "vuex";
import { ElMessageBox } from "element-plus";
import api from "../../../api/index";
export default {
  name: "MyMessage",
  components: {
    Edit,
  },
  directives: {},
  setup(props) {
    let state = reactive({
      nameEdit: false, //编辑图标
      nameInput: false, // 编辑框
      sexEdit: false,
      sexInput: false,
      profileEdit: false,
      profileInput: false,
      placeEdit: false,
      placeInput: false,
      birthEdit: false,
      birthInput: false,
      options: provinceAndCityData, //区域
      // 个人信息
      userData: [
        {
          userId: "",
          nameValue: "",
          sexValue: "",
          personalProfile: "",
          place: "",
          birthDate: "",
          selectedOptions: [],
          headImgId: "",
        },
      ],
      // 教育信息
      educationData: [
        {
          schoolName: "",
          major: "",
          adminsionData: "",
          educationBackGroung: "",
        },
      ],
    });

    onMounted(() => {
      init();
    });

    const sexString = (value) => {
      let string;
      value === true ? (string = "女") : (string = "男");
      return string;
    };

    const init = () => {
      api.getMyMessage().then((res) => {
        console.log(res);
        let { personalMessage } = res.data.data;
        let {
          userId,
          nickname,
          headImgId,
          sex,
          personalBrief,
          place,
          birthDate,
        } = personalMessage;
        state.userData.nameValue = nickname;
        state.userData.sexValue = sexString(sex);
        state.userData.userId = userId;
        state.userData.personalProfile = personalBrief;
        state.userData.place = place;
        state.userData.birthDate = birthDate;
        state.userData.headImgId = headImgId;
      });
    };

    // 编辑姓名
    const showNameInput = () => {
      state.nameInput = true;
      state.nameEdit = false;
    };
    const submitNameValue = () => {
      console.log(state.userData);
    };

    // 编辑性别
    const showSexInput = () => {
      state.sexInput = true;
      state.sexEdit = false;
    };
    // 编辑个人简介
    const showProfileInput = () => {
      state.profileEdit = false;
      state.profileInput = true;
    };
    // 编辑所在地区
    const showPlaceInput = () => {
      state.placeEdit = false;
      state.placeInput = true;
    };
    const handleChange = (value) => {
      console.log(value);
    };
    // 编辑出生日期
    const showBirthInput = () => {
      state.birthEdit = false;
      state.birthInput = true;
    };

    // 退出登录(不能直接操作store里的方法)
    const store = useStore();
    const backLogin = () => {
      ElMessageBox.confirm("确认退出登录吗?", "Warning", {
        type: "warning",
        cancelButtonText: "取消",
        confirmButtonText: "确认",
      }).then(() => {
        store.dispatch("outLogin");
        window.location.reload();
      });
    };

    return {
      ...toRefs(state),
      showNameInput,
      submitNameValue,
      showSexInput,
      showProfileInput,
      showPlaceInput,
      showBirthInput,
      handleChange,
      backLogin,
    };
  },
};
</script>

<style>
/* 容器 */
.message_container {
  margin-top: 70px;
  margin-left: 16.5%;
  width: 80%;
  height: 100%;
}
/* 信息框 */
.person_messsage,
.edcation_message {
  display: block;
  width: 100%;
  height: 400px;
  background-color: #fff;
  margin-top: 20px;
  margin-bottom: 20px;
}
.personal {
  position: relative;
  height: 80px;
  line-height: 80px;
  padding-left: 40px;
  border-bottom: 1px solid #ccc;
}
.back_login_btn {
  float: right;
  width: 90px;
  height: 35px;
  border-radius: 5px;
  background-color: #fa451c;
  color: #fff;
}
.message_key {
  color: #555666;
  width: 100px;
  display: inline-block;
}
.message_value {
  margin-left: 20px;
}
/* ul */
.message_list > li {
  width: 100%;
  height: 40px;
  margin-left: 40px;
  margin-top: 12px;
  line-height: 40px;
  font-size: 15px;
}
/* 编辑栏 */
.edit_icon > img {
  position: absolute;
  top: 3.5px;
  left: 30px;
}
.name_input {
  border: 1px solid #ccc;
  outline: none;
  width: 300px;
  height: 34px;
  margin-left: 17px;
  border-radius: 5px;
  text-indent: 1em;
  font-size: 15px;
}
.name_input:focus {
  border: 1px solid #409eff;
}
.submit {
  border: none;
  outline: none;
  border: 1px solid #ccc;
  width: 75px;
  height: 30px;
  background-color: #fc5531;
  color: #fff;
  border-radius: 17px;
  margin-left: 30px;
}
.cancle {
  border: none;
  outline: none;
  border: 1px solid #fc5531;
  width: 75px;
  height: 30px;
  background-color: #fff;
  color: #fc5531;
  border-radius: 17px;
  margin-left: 10px;
}
.profile_textarea {
  position: absolute;
  border: 0.5px solid #ccc;
  outline: 0.5px solid #ccc;
  padding: 10px;
  border-radius: 4px;
  resize: none;
  left: 118px;
  top: -1px;
}

.profile_submit {
  top: 118px;
  left: 600px;
  position: absolute;
}
.profile_cancle {
  position: absolute;
  top: 118px;
  left: 715px;
}
.person_profile_li {
  position: relative;
  display: flex;
  align-items: center;
  height: 120px;
  line-height: 120px;
  display: block;
}

input[readonly] {
  background-color: #fff !important;
}

.personal_head_img {
  width: 60px;
  height: 60px;
  border-radius: 60px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 200px;
}
</style>