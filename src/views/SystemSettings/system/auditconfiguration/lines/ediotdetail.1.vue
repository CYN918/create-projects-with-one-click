<template>
  <div class="margin">
    <div class="mcard top_div">
      <div class>
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" :content="text"></el-page-header>
          </div>
        </div>
      </div>
    </div>
    <div class="mcard bor_div">
      <div class="title">额度发放审核设置</div>
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-form-item
            label="经销商账号："
            :prop="'auditRoleList.'+ index +'.roleId'"
            :rules="{ required: false, message: '请选择经销商', trigger: 'change' }"
          >
            <el-select v-model="ruleForm.merchantId" placeholder="请选择" size="medium">
              <el-option
                v-for="item in options"
                :key="item.agencyId"
                :label="item.agencyName"
                :value="item.agencyId"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="额度发放审核：" prop="name">
            <el-radio-group v-model="ruleForm.auditSwitch">
              <el-radio label="Y">需要审核</el-radio>
              <el-radio label="N">不需要审核</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="账号类型：" prop="name">
            <el-checkbox-group v-model="ruleForm.accountIds" @change="ckeokfun">
              <el-checkbox
                v-for="item in checkList"
                :label="item.id"
                :key="item.id"
                :disabled="item.show"
              >{{item.accountName}}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="审核模式：" prop="name">
            <el-radio-group v-model="ruleForm.auditMode">
              <el-radio label="1">顺序审核</el-radio>
              <el-radio label="2">一票审核</el-radio>
              <el-radio label="3">全部审核</el-radio>
            </el-radio-group>
          </el-form-item>
          <div class="line" style="margin-left: 3%;"></div>
          <div>
            <el-row>
              <el-col :span="24">
                <el-col :span="12">
                  <el-form-item label="额度管理人：">
                    <el-select placeholder="请选择" size="medium">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="额度发放人：">
                    <el-select placeholder="请选择" size="medium">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
            <el-form-item label="额度：">
              <el-col class="custom" :span="20">
                <el-radio v-model="radio" label="1">不限</el-radio>
                <el-radio v-model="radio" label="2">自定义</el-radio>
                <el-col :span="3" style="float: none;display: inline-block;">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-col>-
                <el-col :span="3" style="float: none;display: inline-block;">
                  <el-input v-model="input" placeholder="请输入内容"></el-input>
                </el-col>元
                <!-- <el-col :span="8"  style="float: none;display: inline-block;color:red;">
                  您未限定发放的额度，请定期关注您商城额度的使用情况，避免造成额度使用过大给您带来不必要的压力
                </el-col>-->
              </el-col>

              <el-col :span="3" class="dele_d">
                <img src="../../../../../common/images/icon/删除.png" alt class="operation_img" />
                <p>删除此记录</p>
              </el-col>
            </el-form-item>
            <el-row>
              <el-col :span="24">
                <el-col :span="4">
                  <el-form-item label="审核部门：">
                    <el-select placeholder="请选择" size="medium">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="4">
                  <el-form-item label="审核人：">
                    <el-select placeholder="请选择" size="medium">
                      <el-option label="区域一" value="shanghai"></el-option>
                      <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="15">
                  <el-form-item label="审核权限：">
                    <el-col class="custom">
                      <el-radio v-model="radio" label="1">提交审批</el-radio>
                      <el-radio v-model="radio" label="2">初级审批</el-radio>
                      <el-radio v-model="radio" label="1">继续审批</el-radio>
                      <el-radio v-model="radio" label="2">终极审批</el-radio>
                      <span class @click="addRole">
                        <i class="iconfont icon-add"></i>
                        <span class="role1">增加</span>
                      </span>
                      <span class @click="deleteRole(index)" style="margin-left: 10px;top: 0;">
                        <i class="iconfont icon-del"></i>
                        <span class="role1">删除</span>
                      </span>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-col>
            </el-row>
          </div>
          <!-- <div class="line" style="margin-left: 3%;"></div> -->
          <!-- <el-row>
               <el-col :span="24">
                <el-col :span="12">
                      <el-form-item
                          label="额度管理人："
                        >
                          <el-select  placeholder="请选择" size="medium">
                            <el-option label="区域一" value="shanghai"></el-option>
                             <el-option label="区域二" value="beijing"></el-option>
                          </el-select>
                        </el-form-item>
                </el-col>
                <el-col :span="12">
                      <el-form-item
                          label="额度发放人："
                        >
                          <el-select  placeholder="请选择" size="medium">
                            <el-option label="区域一" value="shanghai"></el-option>
                            <el-option label="区域二" value="beijing"></el-option>
                          </el-select>
                        </el-form-item>
                </el-col>
               </el-col>  
          </el-row>-->
          <!-- <el-form-item
              label="额度："
            >
             <el-col class="custom" :span="20">
               <el-radio v-model="radio" label="1" >不限</el-radio>
               <el-radio v-model="radio" label="2" >自定义</el-radio>
               
             </el-col>
              
              <el-col :span="3" class="dele_d">
                  <img src="../../../../../common/images/icon/删除.png" alt class="operation_img" />
                  <p>删除此记录</p>
              </el-col>
          </el-form-item>-->
          <div class="line" style="margin-left: 3%;"></div>
          <el-button type="primary" size="small" @click style="margin-left: 100px;">新 增</el-button>
        </el-form>

        <div class="btn_div">
          <el-button type="danger" size="small" @click="back">关 闭</el-button>
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
import { getAgency } from "@/api/apply/index";
import { accountType } from "@/api/customer/index";

export default {
  name: "SelfSetting",
  data() {
    return {
      text: "",
      checkList: [],
      ruleForm: {
        merchantId: "",
        auditSwitch: "",
        auditMode: "",
        accountIds: [],
        auditRoleList: [{ roleId: "", permission: "" }],
        id: ""
      },
      rules: {},
      options: [],
      index: "",
      radio: "1",
      input: "",
      item: "",
      value: ""
    };
  },
  created() {
    this._getfindbytype();
    this._getRole();
    this._text();
    this.getAgency();
    this.accountType();
  },
  methods: {
    ckeokfun(val) {
      console.log(val);
      if (val.length) {
        val.forEach(item => {
          if (item == 0) {
            this.ruleForm.accountIds = [];
            this.ruleForm.accountIds.push(0);
            this.checkList.forEach(msg => {
              if (msg.id != 0) {
                msg.show = true;
              }
            });
          }
          //  else {
          //   this.checkList.forEach(msg => {
          //     msg.show = false;
          //   });
          // }
        });
      } else {
        this.checkList.forEach(element => {
          element.show = false;
        });
        this.$forceUpdate()
        console.log(this.checkList)
      }
    },
    //账号类型
    async accountType() {
      let obj = {
        pageNum: 1,
        pageSize: 0
      };
      const { data } = await accountType(obj);
      data.list.unshift({
        accountName: "不限",
        id: 0
      });
      this.checkList = data.list;
      this.checkList.forEach(item => {
        item.show = false;
      });
    },
    async getAgency() {
      let obj = {
        current_page: 1,
        page_size: 0
      };
      const { data } = await getAgency(obj);
      this.options = data.list;
    },
    _text() {
      if (this.$route.query.id) {
        this.text = "审核配置>额度发放审核>编辑";
      } else {
        this.text = "审核配置>额度发放审核>新增";
      }
    },
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
        // this.options = res.data.list;
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
.line {
  margin: 40px 0 40px 3% !important;
}
.el-checkbox {
  margin-top: 0 !important;
}
.custom {
}
.dele_d {
  line-height: 20px;
  text-align: center;
  float: none;
  display: inline-block;
  cursor: pointer;
}
.dele_d img.operation_img {
  width: 20px;
  height: 20px;
}
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
