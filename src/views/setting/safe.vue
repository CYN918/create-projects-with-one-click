<template>
  <div class="margin mcard">
    <div class="title">安全设置</div>
    <el-form label-width="250px" class="safe-wrapper">
      <el-form-item>
        <div class="avatar">
          <img :src="safe.headImgUrl" width="120" height="120" />
        </div>
        <div class="user">
          <p>登录账号： {{safe.sysuserAccount}}</p>
          <p>个人ID： {{safe.sysuserId}}</p>
          <p>注册时间： {{safe.createTime}}</p>
        </div>
      </el-form-item>

      <!--<el-form-item label="您当前账号安全程度：">-->
        <!--<el-progress-->
          <!--class="progress"-->
          <!--:color="percentageColor"-->
          <!--:stroke-width="18"-->
          <!--:percentage="percentage"-->
          <!--status="text"-->
          <!--:show-text="false"-->
        <!--&gt;</el-progress>-->
        <!--<span class="level">-->
          <!--安全级别:-->
          <!--<span :class="safe.level">{{levelText}}</span>-->
        <!--</span>-->
      <!--</el-form-item>-->
      <el-form-item label="登录密码：">
        <el-row>
          <el-button class="btn-left" type="primary" @click="btnReset">修改密码</el-button>
          <div class="table">
            <p>安全性高的密码可以使账号更安全。建议您定期更换密码,设置一个包含字母,符号或数字中至少两项且长度超过8位的密码。</p>
          </div>
        </el-row>
      </el-form-item>
      <el-form-item label="手机绑定：">
        <el-row>
          <el-col>
            <span class="text">
              您已绑定了手机
              <span class="high">{{safe.phone}}</span>
            </span>
          </el-col>
          <el-col>
            <el-button class="btn-left" type="primary" @click="btnChangePhone">更换</el-button>
            <div class="table">
              <p>(您的手机为安全手机,可以找回密码,但不能用于登录;为保障您账户安全,如果更换手机,3天之内只能操作一次)</p>
            </div>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="删除本企业：">
        <el-row>
          <el-button class="btn-left" type="primary" @click="btnDelete">删除</el-button>
          <div class="table">
            <p>删除前，请您再次确认，删除后，不可恢复，需重新注册</p>
          </div>
        </el-row>
      </el-form-item>
    </el-form>
    <el-dialog title="设置新密码" :visible.sync="dialogPasswordVisible" width="600px">
      <el-form
        ref="formPassword"
        :model="formPassword"
        status-icon
        :rules="rulesPassword"
        label-width="100px"
        class="form-password"
      >
        <el-form-item label="旧密码：" prop="pass">
          <el-input
                  type="password"
                  v-model="formPassword.oldPassword"
                  autocomplete="off"
                  placeholder="8-20位(不能全是数字)"
          ></el-input>
        </el-form-item>
        <el-form-item label="新密码：" prop="pass">
          <el-input
            type="password"
            v-model="formPassword.newPassword"
            autocomplete="off"
            placeholder="8-20位(不能全是数字)"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPass">
          <el-input
            type="password"
            v-model="formPassword.checkPass"
            autocomplete="off"
            placeholder="请再输入一次"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPasswordVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleResetPassword">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="输入新手机号" :visible.sync="dialogPhoneVisible" width="600px">
      <el-form
        :model="formPhone"
        :rules="rulesPhone"
        label-width="100px"
        class="form-password"
        ref="formPhone"
      >
        <el-form-item label="手机号：" prop="phone">
          <el-input type="text" v-model="formPhone.phone" placeholder="输入11位手机号">
            <el-button slot="append" :disabled="disabled" @click="btnSendCode">{{sendCodeText}}</el-button>
          </el-input>
          <div class="tip">(您正在更换新手机号，当前手机号:18602676666)</div>
        </el-form-item>
        <el-form-item label="验证码：" prop="code">
          <el-input type="text" v-model="formPhone.code" placeholder="输入6位验证码"></el-input>
          <div class="tip">(更换手机号后，您需要使用新手机号重新登录)</div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPhoneVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="handleChangePhone('formPhone')"
          :loading="phoneLoading"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog :visible.sync="dialogRemoveVisible" width="600px">
      <el-table :data="checkData" stripe>
        <el-table-column prop="conditions" label="删除条件"></el-table-column>
        <el-table-column label="是否符合" width="100" align="center">
          <template slot-scope="scope">
            <i :class="scope.row.status === '1' ? 'el-icon-success' : 'el-icon-error'"></i>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRemoveVisible = false">取 消</el-button>
        <el-button v-if="verifyCheckData" type="danger" @click="handleEnterpriseDelete">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { phoneReg } from "@/common/js/reg";
import { login  } from '@/api/login'
import encryption from "@/common/js/encryption";
import { getSysuserByid } from "@/api/setting";
import { ediotSysuserById } from "@/api/permissions"


export default {
  name: "SafeSetting",
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        const flag = /^(?=.*?[A-Za-z])(?=.*?[0-9])\S{8,20}$/.test(value);
        if (!flag) {
          callback(new Error("8-20位(不能全是数字)"));
        } else {
          this.$refs.formPassword.validateField("checkPass");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.formPassword.newPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    const validatePhone = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else {
        const flag = phoneReg.test(value);
        if (!flag) {
          callback(new Error("手机格式不正确"));
        } else {
          callback();
        }
      }
    };
    return {
      sysuserId:'',
      formPassword: {
        checkPass: "",
        newPassword: "",
        oldPassword:''
      },
      rulesPassword: {
        newPassword: [{ validator: validatePass, trigger: "blur" }],
        oldPassword: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      },
      safe: {},
      dialogPasswordVisible: false,
      resteLoading: false,
      dialogPhoneVisible: false,
      formPhone: {
        phone: "", // 手机号，
        code: "" // 验证码
      },
      rulesPhone: {
        phone: [{ validator: validatePhone, trigger: "blur" }],
        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }]
      },
      phoneLoading: false,
      countDown: 60,
      disabled: false,
      sendCodeText: "获取验证码",
      dialogRemoveVisible: false,
      checkData: [
        // {
        //   conditions: '订单管理中没有任何数据（商品订单、服务订单）', // 条件
        //   status: '1' // 是否符合条件 1:符合 2：不符合
        // }
      ],
      verifyCheckData: false,
      form: {
        sysuserId: "",
        image_url: "", // 图片
        sysuserName: "", //昵称
        birthday: "" // 生日
      }
    };
  },
  computed: {
    levelText() {
      let text = "";
      if (this.safe.level === "low") {
        text = "低";
      } else if (this.safe.level === "medium") {
        text = "中";
      } else {
        text = "高";
      }
      return text;
    },
    percentageColor() {
      let color = "";
      if (this.safe.level === "low") {
        color = "#f56c6c";
      } else if (this.safe.level === "medium") {
        color = "#E6A23C";
      } else {
        color = "#67C23A";
      }
      return color;
    },
    percentage() {
      let percentage = 0;
      if (this.safe.level === "low") {
        percentage = 30;
      } else if (this.safe.level === "medium") {
        percentage = 60;
      } else {
        percentage = 100;
      }
      return percentage;
    },
    ...mapGetters(["avatar"])
  },
  mounted() {
    this.loadUserInfo();
    const user = JSON.parse(localStorage.getItem("user"));
    this.sysuserId = user.data.sysuserId
  },
  methods: {
    //修改密码
    // async handleEnterprisepass(){
    //   const  pasword = encryption.encrypt(this.pass, "_fuyuanai@Maige_" );
    //   const  user= JSON.parse(localStorage.getItem("user"));
    //   console.log(user)
    //   const userName = user.data.sysuserAccount
    //    const res =await login(userName,pasword)
    //   if(res.code =200){
    //     console.log(pasword)
    //     this.dialogPasswordVisible = true;
    //   }else{
    //     this.$message('与原始密码不一致')
    //   }
    // },
    async loadUserInfo() {
      const user = JSON.parse(localStorage.getItem("user"));
      const { data } = await getSysuserByid(user.data.sysuserId);
      this.safe = data;
    },
    btnReset() {
      this.dialogPasswordVisible = true;
    },
   async  handleResetPassword() {

    let {checkPass,oldPassword,newPassword} = this.formPassword
     if(newPassword!==checkPass){
       return this.$message('两次输入密码不一致')
     }
     const  checkPassWord = encryption.encrypt(checkPass, "_fuyuanai@Maige_" );
     const  oldPasswords = encryption.encrypt(oldPassword, "_fuyuanai@Maige_" );
      const obj={
        oldPassword: oldPasswords,
        password:checkPassWord
      }
      console.log(obj,this.sysuserId)
       const res = await ediotSysuserById(obj,this.sysuserId)
     if(res.code === 200) {
       this.$message({
         type:'success',
         message:'密码修改成功'
       })

     }else{
       this.$message('修改密码失败')
     }
     this.dialogPasswordVisible = false
      // this.$refs.formPassword.validate(valid => {
      //   if (valid) {
      //     this.resteLoading = true;
      //     submitData(this.formPassword.pass).then(res => {
      //       this.dialogPasswordVisible = false;
      //       this.resteLoading = false;
      //       this.$message({
      //         message: "操作成功",
      //         type: "success"
      //       });
      //     });
      //   }
      // });
    },
    btnChangePhone() {
      this.dialogPhoneVisible = true;
    },
    btnSendCode() {
      this.$refs.formPhone.validateField("phone");
      const flag = phoneReg.test(this.formPhone.phone);
      if (flag) {
        getVerificationCode().then(() => {
          this._setTime();
        });
      }
    },
    handleChangePhone(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.phoneLoading = true;
          let data = {};
          data.phone = this.formPhone.phone;
          data.code = this.formPhone.code;
          changePhone(data).then(() => {
            this.formPhone = false;
            this.dialogPhoneVisible = false;
            this.$message({
              message: "手机更换成功，请使用新手机号重新登录",
              type: "success"
            });
            this.$store.dispatch("LogOut").then(() => {
              location.reload(); // 为了重新实例化vue-router对象 避免bug
            });
          });
        } else {
          return false;
        }
      });
    },
    btnDelete() {
      getEnterpriseDeleteCheck().then(res => {
        this.checkData = res.data;
        this.dialogRemoveVisible = true;

        // 验证是否符合删除条件
        this.verifyCheckData = this.checkData.every(item => {
          return item.status === "1";
        });
      });
    },
    handleEnterpriseDelete() {
      this.$confirm("删除后，不可恢复,是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          deleteEnterprise().then(() => {
            this.dialogRemoveVisible = false;
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          });
        })
        .catch(() => {
          this.dialogRemoveVisible = false;
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    _setTime() {
      if (this.countDown === 0) {
        this.disabled = false;
        this.sendCodeText = "获取验证码";
        this.countDown = 60;
        return false;
      } else {
        this.disabled = true;
        this.sendCodeText = `重新发送${this.countDown}`;
        this.countDown--;
      }
      setTimeout(() => {
        this._setTime();
      }, 1000);
    },
    _getSafeInfo() {
      getSafeInfo().then(res => {
        this.safe = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.safe-wrapper {
  .avatar,
  .user {
    display: inline-block;
    vertical-align: top;
  }
  .avatar {
    width: 120px;
    height: 120px;
    margin-left: -120px;
    margin-right: 20px;
    img {
      border-radius: 50%;
    }
  }
  .progress {
    width: 270px;
    display: inline-block;
    margin-right: 20px;
    margin-top: 11px;
    vertical-align: top;
  }
  .low {
    color: #f56c6c;
  }
  .medium {
    color: #e6a23c;
  }
  .high {
    color: #67c23a;
  }
  .btn-left {
    float: left;
    margin-right: 20px;
  }
  .table {
    display: table;
    height: 40px;
    p {
      display: table-cell;
      vertical-align: middle;
      line-height: 20px;
    }
  }
  .text {
    line-height: 40px;
  }
}
.tip {
  color: #b0bfd2;
}
.form-password {
  width: 500px;
}
.el-icon-success {
  color: #67c23a;
}
.el-icon-error {
  color: #f56c6c;
}
</style>
