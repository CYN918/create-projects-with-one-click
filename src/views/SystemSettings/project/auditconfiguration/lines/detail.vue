<template>
  <div class="margin">
    <div class="mcard top_div">
      <div class>
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" content="审核配置>额度发放审核>详情"></el-page-header>
          </div>
        </div>
      </div>
    </div>
    <div class="mcard bor_div">
      <div class="title">额度发放审核详情</div>
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="300px"
          class="demo-ruleForm"
        >
          <el-form-item label="经销商账号：" prop="name">广东南粤集团广州分公司(假数据))</el-form-item>
          <el-form-item label="额度发放时审核：" prop="name">需要审核</el-form-item>
          <el-form-item label="账号类型：" prop="name">集采福利、办公用品</el-form-item>
          <el-form-item label="审核模式：" prop="name">顺序审核</el-form-item>
          
          <div v-for="(item,index) in ruleForm.auditRoleList" :key="index">
            <div class="line" style="margin-left: 3%;"></div>
            <div
              :class="index==0?'btm_divtop btm_div':'btm_div'"
            >
              <el-form-item
                label="额度管理人："
                :prop="'auditRoleList.'+ index +'.roleId'"
                :rules="{ required: true, message: '请选择审核人', trigger: 'change' }"
              >张三</el-form-item>
              <el-form-item
                label="额度发放人："
                :prop="'auditRoleList.'+ index +'.permission'"
                label-width="150px"
                :rules="{ required: true, message: '请选择审核权限', trigger: 'change' }"
              >李四</el-form-item>
              
            </div>
            <el-form-item
                label="额度："
                :prop="'auditRoleList.'+ index +'.permission'"
                label-width="300px"
                :rules="{ required: true, message: '请选择审核权限', trigger: 'change' }"
              >1-10000 元</el-form-item>
              <div
              :class="index==0?'btm_divtop btm_div':'btm_div'"
            >
              <el-form-item
                label="审核人："
                :prop="'auditRoleList.'+ index +'.roleId'"
                :rules="{ required: true, message: '请选择审核人', trigger: 'change' }"
              >张三</el-form-item>
              <el-form-item
                label="审核权限："
                :prop="'auditRoleList.'+ index +'.permission'"
                label-width="150px"
                :rules="{ required: true, message: '请选择审核权限', trigger: 'change' }"
              >决策</el-form-item>
              
            </div>
          </div>
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
import { getfindbytype, ediotfindbytype } from "@/api/systemsettings/index";
import { throttleTipPop } from "@/utils/throttle";
import { getRole } from "@/api/permissions/index";

export default {
  name: "SelfSetting",
  data() {
    return {
      ruleForm: {
        enable: "",
        auditMode: "",
        auditRoleList: [{ roleId: "", permission: "" }],
        id: ""
      },
      rules: {},
      options: []
    };
  },
  created() {
    this._getfindbytype();
    this._getRole();
  },
  methods: {
    //重置
    resert() {
      this._getfindbytype();
    },
    submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let obj = JSON.parse(JSON.stringify(this.ruleForm));
          obj.enable == "0" ? (obj.enable = true) : (obj.enable = false);
          ediotfindbytype(obj).then(res => {
            if (res.code == 200) {
              throttleTipPop(this, "success", "操作成功");
            }
          });
        } else {
          return false;
        }
      });
    },
    //增加审核
    addRole() {
      this.ruleForm.auditRoleList.push({
        permission: "",
        roleId: "",
        roleName: "",
        sortOrder: 0,
        remark: ""
      });
    },
    //删除审核
    deleteRole(val) {
      this.ruleForm.auditRoleList.splice(val, 1);
    },
    _getfindbytype() {
      // 获取审核信息
      getfindbytype(2).then(res => {
        this.ruleForm.enable = res.data.enable ? "0" : "1";
        this.ruleForm.id = res.data.id;
        this.ruleForm.auditMode = JSON.stringify(res.data.auditMode);
        res.data.auditRoleList.forEach(item => {
          item.permission = JSON.stringify(item.permission);
        });
        this.ruleForm.auditRoleList = res.data.auditRoleList;
      });
    },
    _getRole() {
      let obj = {};
      obj.currentPage = 1;
      obj.size = 0;
      getRole(obj).then(res => {
        this.options = res.data.list;
      });
    },
    back() {
      this.$router.go(-1);
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
</style>
