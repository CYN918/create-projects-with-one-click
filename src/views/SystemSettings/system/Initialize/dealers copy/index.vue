<template>
  <div class>
    <div class="mcard">
      <div class="title">经销商审核配置</div>
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="300px"
          class="demo-ruleForm"
        >
          <el-form-item label="经销商创建或入驻时审核：" prop="name">
            <el-radio-group v-model="ruleForm.resource">
              <el-radio label="0">需要审核</el-radio>
              <el-radio label="1">不需要审核</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="审核对象类型：" prop="name">经销商</el-form-item>
          <el-form-item label="审核模式：" prop="name">
            <el-radio-group v-model="ruleForm.abc">
              <el-radio label="0">顺序审核</el-radio>
              <el-radio label="1">一票审核</el-radio>
              <el-radio label="2">全部审核</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="line" style="margin-left: 3%;"></div>
          <div class="btm_div">
            <el-form-item label="审核人：" prop="name">
              <el-select v-model="value" placeholder="请选择" size="medium">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
              <span class="role">审核权限：</span>
              <el-radio-group v-model="ruleForm.people">
                <el-radio label="0">顺序审核</el-radio>
                <el-radio label="1">一票审核</el-radio>
                <el-radio label="2">全部审核</el-radio>
              </el-radio-group>
              <span class="add">
                <i class="iconfont icon-add"></i>
                <span class="role1">增加</span>
              </span>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "SelfSetting",
  data() {
    return {
      ruleForm: {},
      rules: {},
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ]
    };
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.form-wrapper {
  margin-top: 30px;
  width: 600px;
  .avatar-uploader .el-upload {
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
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
}
.margin {
  margin-top: 0 !important;
  padding-left: 0 !important;
  border: 1px solid rgba(214, 222, 239, 1);
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
.btm_div {
  margin-top: 20px;
}
.role {
  color: #606266;
  margin-left: 20px;
}
.role1{
  color: #606266;
  margin-left: 10px;
}
.icon-add{
  margin-left: 40px;
  color:#4C86F4;
}
.add{
  cursor: pointer;
}
</style>
