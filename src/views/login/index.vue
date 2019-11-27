<template>
  <div class="login-container">
    <div class="topdiv">
      <div class="content">
        <img style="margin-right: 15px;width: 130px;height: 40px"
             :src="platformOpenInfo && platformOpenInfo.logoImage || 'http://img.fyuanai.com/test/2019-11-01/25696298ff3342569176e0468a328e1e-logo.a3e60e6e.png'"
             alt/>
        <span style="width: 0px;height: 40px;  border: 1px solid #ccc;border-right: 0px;margin-right: 15px;"></span>
        <span v-if="platformOpenInfo.platformType===0" class="login-index-logo">总站管理平台</span>
        <span v-if="platformOpenInfo.platformType===1" class="login-index-logo">服务商后台管理</span>
        <span v-if="platformOpenInfo.platformType===2" class="login-index-logo">客户（项目）后台管理</span>
      </div>
      <div class="options">
        <div class="dropdown app">
          <el-dropdown class="app">
            <span class="el-dropdown-link">
              下载手机app
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <img src="../../common/images/supplychaincode2.jpg" alt class="top_tip" />
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- <span class="Dividingline">|</span>
                <div class="dropdown noleft">
                  我的订单
                  <span class="num">(0)</span>
                </div>
                <span class="Dividingline">|</span>
                <div class="dropdown noleft" style="width: 87px;">
                  财务管理
                  <span class="num">(0)</span>
        </div>-->
      </div>
    </div>
    <el-form
      ref="loginForm"
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
      auto-complete="on"
      label-position="left"
    >
      <el-row>
        <el-col :span="24">
          <div class="loginimg" :style="`backgroundImage: url(${backgroundImage})`">
            <div class="logindiv">
              <div class="usersize">
                您好，请登录
                <span class="registered" @click="registered">注册</span>
              </div>
              <el-form-item prop="username">
                <!-- <span class="svg-container">
                                  <svg-icon icon-class="user" />
                </span>-->
                <span class="spanuser">账户</span>
                <el-input
                  v-model="loginForm.username"
                  name="username"
                  type="text"
                  autocomplete="new-password"
                  placeholder="请输入账户"
                />
              </el-form-item>
              <el-form-item prop="password">
                <!-- <span class="svg-container">
                                  <svg-icon icon-class="password" />
                </span>-->
                <span class="spanuser password">密码</span>
                <el-input
                  :type="pwdType"
                  v-model="loginForm.password"
                  name="password"
                  autocomplete="new-password"
                  placeholder="请输入密码"
                  @keyup.enter.native="handleLogin"
                />
              </el-form-item>
              <el-form-item prop="verification">
                <!-- <span class="svg-container">
                                  <svg-icon icon-class="password" />
                </span>-->
                <div class="Verification" v-show="showVerification">
                  <span class="spanuser password">验证码</span>
                  <el-input
                    style="width:80px;margin-left:20px;margin-right:20px;"
                    v-model="loginForm.verification"
                    name="verification"
                    auto-complete="on"
                    placeholder="验证码"
                    @keyup.enter.native="handleLogin"
                  />
                  <img
                    :src="`${this.baseUrl1}/api/open/b/b2b2c/userservice/kaptcha/code_image.jpeg?_=`"
                    @click="event => event.target.src = event.target.src.replace(/_=.*/, `_=${Math.random()}`)"
                    ref="verification"
                    style="height:40px"
                  />
                </div>
              </el-form-item>
              <div>
                <el-checkbox v-model="checked">保存登录信息</el-checkbox>
                <!-- <span class="Forgot">忘记密码</span> -->
              </div>
              <el-form-item style="margin-top: -13px;">
                <el-button
                  :loading="loading"
                  type="primary"
                  style="width:100%;"
                  @click.native.prevent="handleLogin"
                  class="login"
                >登录</el-button>
              </el-form-item>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-form>
    <div class="operation">
      <span>
        <a href="http://bg.test.fyuanai.com">关于福利系统</a>
      </span>
      <span>联系我们</span>
      <span>加入我们</span>
      <span>帮助中心</span>
    </div>
    <div
      class="operation bottomtent"
    >Copyright©2017 www.boshiying.com .AII Reserved. 粤ICP备15039373号-1</div>
  </div>
</template>

<script>
import { isvalidUsername } from "@/utils/validate";
import { getUser, setUser, removeIofo, setToken } from "@/utils/auth";
import { removeToken } from "@/utils/auth";
import { verification, login } from "@/api/login";
import encryption from "@/common/js/encryption";
export default {
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的账户"));
      } else {
        callback();
      }
    };
    var validator = (rule, value, callback) => {
      if(!this.platformOpenInfo.captchaEnable)callback();
      if (value === "") {
        callback(new Error("请输入验证码"));
      } else {
        callback();
      }
    };
    return {
      loginImg:require("@/common/images/login.png"),
      logoImge:require('@/common/images/logo.png'),
      loginForm: {
        username: "",
        password: "",
        verification: "",
        pasword: ""
      },
      platformOpenInfo:{},
      code: "",
      checked: true,
      loginRules: {
        username: [{ required: true, message: "请输入账户", trigger: "blur" }],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, message: "密码不能小于5位", trigger: "blur" }
        ],
        verification: [
          { required: true, validator: validator, trigger: "blur" }
        ]
      },
      loading: false,
      pwdType: "password",
      redirect: undefined
    };
  },
  computed: {
    backgroundImage() {
      const path = this.platformOpenInfo.backgroundImage;
      console.log(path);
      return encodeURI(path) || "http://img.fyuanai.com/test/2019-11-01/25696298ff3342569176e0468a328e1e-logo.a3e60e6e.png";
    },
    showVerification(){
      const captchaEnable = this.platformOpenInfo.captchaEnable;
      return captchaEnable;
    }
  },
  mounted() {
    this.platformOpenInfo = this.$platformOpenInfo;
    var user = getUser();
    if (user) {
      this.loginForm.username = user.username;
      this.loginForm.password = user.password;
    }
    this.$refs.verification.click();
  },
  methods: {
    handleLogin() {
      var that = this;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          // this.loading = TextTrackCueList;
          this.loginForm.pasword = encryption.encrypt(
            this.loginForm.password,
            "_fuyuanai@Maige_"
          );
          this.$store
            .dispatch("Login", this.loginForm)
            .then(res => {
              console.log(res);
              if (res.data.sysuserType !== 1) {
                that.$router.push({ path: "/dashboard" });
              } else {
                if (res.data.correlativeData.auditStatus == 1) {
                  that.$router.push({ path: "/dashboard" });
                } else if (res.data.correlativeData.auditStatus == 0) {
                  that.$router.push({ path: "/setting/my_files" });
                } else {
                  that.$router.push({
                    name: "registered",
                    params: { state: 1 }
                  });
                }
              }
              if (this.checked) {
                // setUser(JSON.stringify(this.loginForm));
              } else {
                removeIofo();
              }
            })
            .catch(() => {
              this.loading = false;
              this.loginForm.verification = "";
              this.$refs.verification.click();
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    registered() {
      this.$router.push({ name: "supplychain" });
    }
  }
};
</script>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.topdiv {
  width: 100%;
  height: 92px;
  display: flex;
  .content {
    width: 29.16%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 13px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    height: 100%;
  }
  .options {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #999999;
    margin-left: 19%;
    .dropdown {
      height: 100%;
      width: 100px;
      margin-left: 35%;
      display: flex;
      align-items: center;
      .el-dropdown {
        display: inline-block;
        position: relative;
        font-size: 14px;
        height: 100%;
        line-height: 38px;
        color: #999999;
      }
    }
    .app {
      padding-left: 12px;
      display: flex;
      align-items: center;
      width: 140px;
    }
    .noleft {
      margin-left: 0;
    }
    .Dividingline {
      margin: 0 30px 0 20px;
    }
    .num {
      color: #3aa9e1;
      margin-left: 9px;
    }
  }
}
.loginimg {
  width: 100%;
  height: 600px;

  background-size: 100% 100%;
  position: relative;
  .logindiv {
    width: 412px;
    height: 462px;
    background: rgba(255, 255, 255, 1);
    opacity: 0.7;
    border-radius: 10px;
    position: relative;
    left: 60%;
    top: 94px;
    padding: 36px 50px 28px 50px;
    .usersize {
      color: #666666;
      font-size: 18px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      margin-bottom: 20px;
      .registered {
        font-size: 14px;
        color: #039fee;
        position: absolute;
        right: 50px;
      }
    }
    .spanuser {
      font-size: 14px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
    }
    .posswoed {
      position: relative;
      top: -14px;
    }
    .Forgot {
      font-size: 14px;
      color: #039fee;
      position: absolute;
      right: 50px;
    }
    .login {
      font-size: 18px;
      margin-top: 41px;
    }
  }
}
.login-container {
  position: fixed;
  height: 100%;
  width: 100%;
  overflow-x: auto;
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    // width: 520px;
    // max-width: 100%;
    // padding: 35px 35px 15px 35px;
    // margin: 38px auto;
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .operation {
    width: 100%;
    height: 20px;
    margin-top: 694px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(102, 102, 102, 1);
    span {
      margin-right: 20px;
    }
  }
  .bottomtent {
    margin-top: 30px;
  }
  .Verification {
    display: flex;
    align-items: center;
  }
}
.el-dropdown {
  line-height: 92px !important;
}

.login-index-logo{
  font-family: MicrosoftYaHei;
  font-weight: 1000;
  font-size: 24px;
  color: #ff4e7c;
  padding-bottom: 5px;
}
</style>
