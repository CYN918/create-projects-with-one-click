<template>
  <div class="margin payuplod">
    <div class="mcard top_div">
      <div class>
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" content="系统配置>支付配置>编辑"></el-page-header>
          </div>
        </div>
      </div>
    </div>
    <div class="mcard bor_div">
      <div class="title">编辑</div>
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="300px"
          class="demo-ruleForm"
        >
          <el-form-item label="支付方式名称：" prop="name">
            <el-input
              size="medium"
              placeholder="请输入内容"
              v-model="ruleForm.paymentName"
              style="width:600px"
            ></el-input>
          </el-form-item>
          <div v-for="(item,index) in ruleForm.payInfoList" :key="index">
            <el-form-item
              :label="item.name+'：'"
              :prop="'payInfoList.'+ index + '.value'"
              :rules="{ required: true, message: '请请输入内容', trigger: 'blur' }"
            >
              <el-input size="medium" placeholder="请输入内容" v-model="item.value" style="width:600px"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="启用PC：" prop="name">
            <el-radio-group v-model="ruleForm.pcEnable">
              <el-radio :label="true">启用</el-radio>
              <el-radio :label="false">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="启用WAP：" prop="name">
            <el-radio-group v-model="ruleForm.wapEnable">
              <el-radio :label="true">启用</el-radio>
              <el-radio :label="false">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="启用APP：" prop="name">
            <el-radio-group v-model="ruleForm.appEnable">
              <el-radio :label="true">启用</el-radio>
              <el-radio :label="false">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否支持原路返回：" prop="originalRoad">
            <el-radio-group v-model="ruleForm.originalRoad">
              <el-radio :label="true">启用</el-radio>
              <el-radio :label="false">禁用</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="展示图片：" prop="name">
            <div class="upload_div">
              <el-upload
                class="avatar-uploader"
                :action="action"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="ruleForm.icon" :src="ruleForm.icon" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div class="paymentName">{{ruleForm.paymentName}}</div>
              <div class="tip_size">
                <div>1、图片尺寸建议：175px*74px</div>
                <div>2、支持JPG、PNG格式的图片，图片不能大于2M。</div>
              </div>
            </div>
          </el-form-item>
        </el-form>
        <div class="btn_div">
          <el-button type="danger" size="small" @click="resert">重 置</el-button>
          <el-button type="primary" size="small" @click="submit">确 定</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { findbycode, updatebycode } from "@/api/systemsettings/index";
import { throttleTipPop } from "@/utils/throttle";
import encryption from "@/common/js/encryption";

export default {
  name: "SelfSetting",
  data() {
    return {
      action: "",
      paymentCode: "",
      ruleForm: {},
      rules: {},
      options: []
    };
  },
  created() {
    this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
    this.$route.query.paymentCode
      ? (this.paymentCode = this.$route.query.paymentCode)
      : "";
    this.findbycode();
  },
  methods: {
    //重置
    resert() {
      this._getfindbytype();
    },
    submit() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          let obj = this.ruleForm;
          obj.payInfoList.forEach(item => {
            item.value = encryption.encrypt(item.value, "_fuyuanai@Maige_");
          });
          let data = await updatebycode(this.ruleForm);
          if (data.code == 200) {
            throttleTipPop(this, "success", data.message);
            this.$router.push({ name: "system", params: { type: 4 } });
          }
        } else {
          return false;
        }
      });
    },
    async findbycode() {
      let { data } = await findbycode(this.paymentCode);
      data.payInfoList.forEach(item => {
        item.value = encryption.decrypt(item.value, "_fuyuanai@Maige_");
      });
      this.ruleForm = data;
    },
    back() {
      this.$router.push({ name: "system", params: { type: 4 } });
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm.icon = res.data.domain + res.data.filePath;
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isLt2M;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.form-wrapper {
  margin-top: 30px;
  width: 600px;
  .avatar-uploader .el-upload {
    width: 175px;
    height: 74px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 175px;
    height: 74px;
    line-height: 74px;
    text-align: center;
  }
}
.avatar {
  width: 175px;
  height: 74px;
}
.margin {
  //   margin-top: 0 !important;
  //   padding-left: 0 !important;
  //   border: 1px solid rgba(214, 222, 239, 1);
}
.select_div {
  .top_btn {
    padding-left: 100px;
    padding-top: 20px;
    position: relative;
    .iconfont {
      color: #66b1ff;
    }
    .icfont_span {
      position: absolute;
      right: 150px;
      cursor: pointer;
    }
  }
  .checkbox_div {
    padding-left: 150px;
  }
  .select_btn {
    margin-left: 25px;
    width: 88px;
    height: 32px;
    background: rgba(76, 134, 244, 1);
    border-radius: 3px;
    text-align: center;
    line-height: 32px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    position: relative;
    top: 7px;
  }
  .line {
    width: 94%;
    margin: 20px 0;
    height: 1px;
    border: 1px dashed rgba(177, 213, 252, 1);
    margin-bottom: 10px;
  }
  .line_div {
    width: 94%;
    height: 10px;
    margin-top: 30px;
    background: rgba(245, 248, 252, 1);
  }
}
.el-checkbox {
  margin-top: 20px;
}
.icon-biao {
  color: #5dc349;
}
.dilog .el-checkbox {
  width: 50%;
  margin-right: 0;
  padding-left: 30px;
}
.line {
  width: 94%;
  margin: 20px 0;
  margin-bottom: 10px;
  height: 1px;
  border: 1px dashed rgba(177, 213, 252, 1);
}
.btm_divtop {
  margin-top: 20px;
  display: flex;
}
.btm_div {
  display: flex;
}
.role {
  color: #606266;
  margin-left: 20px;
}
.role1 {
  color: #606266;
  margin-left: 10px;
}
.icon-add {
  color: #4c86f4;
}
.add {
  margin-left: 30px;
  cursor: pointer;
  position: relative;
  top: 12px;
}
.icon-del {
  color: #4c86f4;
}
.btn_div {
  text-align: center;
  width: 74%;
}
.search-wrapper1 {
  padding: 20px;
  border: 1px solid rgb(215, 224, 241);
  background: #fff;
  display: flex;
  align-items: center;
  .title1 {
    display: flex;
    margin-left: 40%;
  }
}
.top_div {
  padding-left: 0;
  background: none;
}
.bor_div {
  border: 1px solid rgba(214, 222, 239, 1);
}
.mcard {
  padding-top: 10px;
  padding-right: 0;
}
.tip_size {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(96, 98, 102, 1);
  margin-left: 30px;
}
.upload_div {
  display: flex;
  position: relative;
}
.paymentName {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(96, 98, 102, 1);
  position: absolute;
  bottom: -20px;
  left: 84px;
}
</style>
