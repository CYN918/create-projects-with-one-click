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
          label-width="150px"
          class="demo-ruleForm"
        >
          <el-form-item v-if="relation" :label="labelTit" prop="name">{{ ruleForm.merchantName }}</el-form-item>
          <el-form-item label="额度发放时审核：" prop="name">{{ ruleForm.auditSwitch }}</el-form-item>
          <el-form-item label="账号类型：" prop="name"><span v-for="values in accountTypelist" style="margin-right: 10px;">{{values}}</span></el-form-item>
          <el-form-item label="审核模式：" prop="name">{{ ruleForm.auditMode }}</el-form-item>
          
          <div v-for="(item,index) in ruleForm.quotaAuditSettingList" :key="index">
            <div class="line" style="margin-left: 3%;"></div>
            <div :class="index==0?'btm_divtop btm_div':'btm_div'" >
              <el-form-item label="额度管理人：" >{{ item.quotaAdminUserName }}</el-form-item>
              <el-form-item label="额度发放人：" >{{ item.quotaGrantUserName }}</el-form-item>
              <el-form-item label="额度："  >{{ item.amountMin }} -  {{ item.amountMax }}  </el-form-item>
            </div>
            <div v-for="(val,index2) in item.auditRoleList" :key="index2">
                <div  :class="index2==0?'btm_divtop btm_div':'btm_div'" >
                   <el-form-item label="部门："  >{{ val.organizeName }}</el-form-item>
                   <el-form-item label="审核人："  >{{ val.roleName }}</el-form-item>
                   <el-form-item label="审核权限："   >
                      <span v-if="val.permission == 1">提交审批</span>
                      <span v-else-if="val.permission  == 2">初级审批</span>
                      <span v-else-if="val.permission  == 3">继续审批</span>
                      <span v-else-if="val.permission  == 4">终级审批</span>
                   </el-form-item>
                </div>
            </div>
          </div>
       
        </el-form>
        <div class="btn_div">
          <!-- <el-button type="danger" size="small" @click="resert">重 置</el-button> -->
          <el-button type="primary" size="small" @click="back">返 回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { andIssueInfo , getMerchantName } from "@/api/systemsettings/index";
import { accountType  } from "@/api/customer/index";

export default {
  name: "SelfSetting",
  data() {
    return {
     id:'',
     ruleForm:{

     },
     relation:false,
     labelTit:'',
     checkList:[],
     accountTypelist:[]
    };
  },
  created() {
    this.id = this.$route.query.id
    this.accountType()
    this.getMerchantName()
    this.andIssueInfo();
  },
  methods: {
      //账号类型
    async accountType() {
      let obj = {
        pageNum: 1,
        pageSize: 10000
      };
      const { data } = await accountType(obj);
      data.list.unshift({
        accountName: "不限",
        id: 0
      });
      this.checkList = data.list;
    },
    // 判断是什么平台类型
     async getMerchantName(){
      const  { data }  = await getMerchantName()
        if( data.platformType == 0 ){
          // 总站后台(放经销商)
          this.relation = true 
          this.labelTit = "经销商账号："
        }else if( data.platformType == 1 ){
           // 经销商后台（放客户）
           this.relation = true 
           this.labelTit = "客户账号："
        }else if( data.platformType == 2 ){
           // 项目后台（不用选人）
           this.relation = false 
        }
     },
    // 获取详情
    andIssueInfo(){
       var data ={
         id:this.id
       }
       andIssueInfo(data).then( res =>{
          this.ruleForm = res.data
          // 额度发放时审核
          if(  this.ruleForm.auditSwitch == "Y" ){
            this.ruleForm.auditSwitch = "需要审核"
          }else if(this.ruleForm.auditSwitch == "N" ){
            this.ruleForm.auditSwitch = "不需要审核"
          }
          // 账户类型
          this.accountTypelist=[]
          this.checkList.forEach(item => {
            if( this.ruleForm.accountIds ){
             this.ruleForm.accountIds.forEach(val => {
              if( item.id == val ){
                this.accountTypelist.push(item.accountName)
              }
              });
            }
          
          });
         // 审核模式
          if(  this.ruleForm.auditMode == 1 ){
            this.ruleForm.auditMode = "顺序审核"
          }else if(this.ruleForm.auditMode == 2 ){
            this.ruleForm.auditMode = "全票审核"
          }else if(this.ruleForm.auditMode == 3 ){
            this.ruleForm.auditMode = "一票审核"
          }
       })
    },
    submit() {
      this.$router.go(-1);
      // this.$refs.ruleForm.validate(valid => {
      //   if (valid) {
      //     let obj = JSON.parse(JSON.stringify(this.ruleForm));
      //     obj.enable == "0" ? (obj.enable = true) : (obj.enable = false);
      //     ediotfindbytype(obj).then(res => {
      //       if (res.code == 200) {
      //         throttleTipPop(this, "success", "操作成功");
      //       }
      //     });
      //   } else {
      //     return false;
      //   }
      // });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
  .btm_div >>> .el-form-item{
   margin: 0;
   width: 33.33333%;
  }
  .demo-ruleForm >>>  .el-form-item{
    margin: 0;
  }
</style>
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
