<template>
  <div class="margin dealerlist">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" content="客户资料详情"></el-page-header>
          </div>
        </div>
      </div>

      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <h4 class="title">客户信息</h4>
            <br />
            <el-row>
              <el-col :span="5">
                <el-form-item label="客户名称:" prop="customerName">
                  <span>{{form.customerName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="客户编号:" prop="customerSn">
                  <span>{{form.customerSn}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="共享给:" prop="sharedTo">
                  <span>{{form.sharedTo}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="公司网站:" prop="customerWebsite">
                  <span>{{form.customerWebsite}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="省份:" prop="province">
                  <span>{{form.province}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="城市:" prop="city">
                  <span>{{form.city}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="行业大类:" prop="industryCategory">
                  <span>{{form.industryCategory}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="行业小类:" prop="industrySubcategory">
                  <span>{{form.industrySubcategory}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="公司地址:" prop="companyAddress">
                  <span>{{form.companyAddress}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="客户类型:" prop="businessType">
                  <span>{{form.businessType}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="客户等级:" prop="customerLevel">
                  <span>{{form.customerLevel}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="客户意向:" prop="intentionLevel">
                  <span>{{form.intentionLevel}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="客户来源:" prop="customerSource">
                  <span>{{form.customerSource}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="销售代表:" prop="salesRepresentative">
                  <span>{{form.salesRepresentative}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="联系周期:" prop="customerPeriod">
                  <span>{{form.customerPeriod | timer }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <h4 class="title">联系人信息</h4>
            <el-row>
              <el-col :span="5">
                <el-form-item label="联系人:" prop="commonContactName">
                  <span>{{form.commonContactName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="部门:" prop="commonContactDept">
                  <span>{{form.commonContactDept}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="手机号码:" prop="commonContactPhone">
                  <span>{{form.commonContactPhone}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="办公电话:" prop="commonContactTel">
                  <span>{{form.commonContactTel}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
            <el-col :span="5">
                <el-form-item label="微信号:" prop="commonContactWechat">
                  <span>{{form.commonContactWechat}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="邮箱:" prop="commonContactEmail">
                  <span>{{form.commonContactEmail}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="QQ:" prop="commonContactQq">
                 <span>{{form.commonContactQq}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="出生年月:" prop="commonContactBirth">
                  <span>{{form.commonContactBirth | timer }}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <h4 class="title">领导信息</h4>
            <el-row>
              <el-col :span="5">
                <el-form-item label="部门领导:" prop="leaderContactName">
                  <span>{{form.leaderContactName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="手机号码:" prop="leaderContactPhone">
                  <span>{{form.leaderContactPhone}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="固定电话:" prop="leaderContactTel">
                  <span>{{form.leaderContactTel}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="总机号码:" prop="leaderSwitchboard">
                  <span>{{form.leaderSwitchboard}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="微信号码:" prop="leaderContactWechat">
                  <span>{{form.leaderContactWechat}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="邮箱:" prop="leaderContactEmail">
                  <span>{{form.leaderContactEmail}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="QQ:" prop="leaderContactQq">
                  <span>{{form.leaderContactQq}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="出生年月:" prop="leaderContactBirth">
                  <span>{{form.leaderContactBirth | timer  }}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="联系地址:" prop="leaderContactAddress">
                  <span>{{form.leaderContactAddress}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="家庭住址:" prop="leaderFamilyAddress">
                   <span>{{form.leaderFamilyAddress}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <h4 class="title">开票信息</h4>
            <el-row>
              <el-col :span="5">
                <el-form-item label="公司名称:" prop="customerUnit">
                  <span>{{form.customerUnit}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="税号:" prop="taxNumber">
                  <span>{{form.taxNumber}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="注册电话:" prop="customerTel">
                  <span>{{form.customerTel}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="注册地址:" prop="customerAddress">
                  <span>{{form.customerAddress}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="开户银行:" prop="bankName">
                  <span>{{form.bankName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="银行账号:" prop="bankAccount">
                  <span>{{form.bankAccount}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="传真号码:" prop="faxNumber">
                  <span>{{form.faxNumber}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="备注:" prop="remark">
                  <span>{{form.remark}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="margin">
            <div class="msetting-account-wrapper" style="margin-left: -20px;">
              <div class="tabs-header">
                <ul class="clearfix">
                  <li @click="tabIndex(0)" :class="currentIndex===0 ? 'active' : ''"
                      v-show="this.auditDetail!=''">当前审核详细</li>
                  <li @click="tabIndex(index+1)" :class="currentIndex===index+1 ? 'active' : ''" v-if="auditDetails.length >1"
                      v-for="(item,index) in this.auditDetails" :key="index">{{index==0?'首次审核':index+1+'级审核'}}</li>
                </ul>
              </div>
              <div class="tabs-content">
                <div class="">
                  <div class="mbottom">
                    <div class="goods-fitter">
                      <el-form label-width="260px" size="small">
                        <div class="search-wrapper">
                          <h4 class="title">审核明细({{ this.auditDetail[indexa] && this.auditDetail[indexa].changeRemark||'' }})  <span style="padding-left: 50px;">发起时间: {{this.auditDetail[indexa] && this.auditDetail[indexa].createTime}}</span></h4>
                          <div class="wrapper" v-if="this.auditDetail!=''">
                            <ul class="list">
                              <li class="item" v-for="(item,index) in this.auditDetail[indexa].auditDetailList" :key="index">
                                <div style="text-align: center"
                                     :class="{'label word': item.auditResult==1, 'label label_2  word': item.auditResult==2, 'label label_3  word': item.auditResult == 0}"
                                >
                                  <i
                                      :class="item.auditResult==1?'el-icon-circle-check':'el-icon-circle-close'"
                                  ></i>
                                  <span class="t2" v-if="item.auditResult === 1">
                                    已通过
                                  </span>
                                  <span class="t2" v-if="item.auditResult === 2">
                                    未通过
                                  </span>
                                  <span class="t2" v-if="item.auditResult === 0">
                                    待审核
                                  </span>
                                </div>
                                <div class="word_line">
                                  <span class="t1 tt">审核人：</span>
                                  <span class="t1">{{item.sysuserName}}({{item.organizeName||item.roleName||item.sysuserName}})</span>
                                </div>
                                <div class="word_line">
                                  <span class="t1 tt">审核结果：</span>
                                    <span class="t1" v-if="item.auditResult==0">
                                  {{"待审核"}}
                                  </span>
                                    <span class="t1" v-if="item.auditResult==1">
                                    <i :class="'el-icon-circle-check'"></i>
                                    {{"已通过"}}
                                  </span>
                                    <span class="t1" v-if="item.auditResult==2">
                                    <i :class="'el-icon-circle-close'"></i>
                                    {{"未通过"}}
                                  </span>
                                </div>
                                <div class="word_line">
                                  <span class="t1 tt">审核权限：</span>
                                  <span class="t1" v-if="item.permission==1">
                                    {{"提交审核"}}
                                  </span>
                                  <span class="t1" v-if="item.permission==2">
                                    {{"初级审核"}}
                                  </span>
                                  <span class="t1" v-if="item.permission==3">
                                    {{"继续审核"}}
                                  </span>
                                  <span class="t1" v-if="item.permission==4">
                                    {{"终极审核"}}
                                  </span>
                                </div>
                                <div class="word_line">
                                  <span class="t1 tt">审核时间：</span>
                                  <span class="t1">
                                  <i><img src="../../../common/images/examine/icon_time.png" alt=""></i>
                                  {{item.auditTime}}
                                </span>
                                </div>
                                <div class="word_line">
                                  <span class="t1 tt">审核意见：</span>
                                  <span class="t1">
                                  {{item.comment}}
                                </span>
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div class="noDetails" v-if="this.auditDetail==''">暂无审核内容</div>
                        </div>
                      </el-form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="btn">
            <el-button type="primary" @click="back" size="small">返回</el-button>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getCategory, getStoreList } from "@/api/public";
import {getCustomerexamine, customerDetailByid, getindustryCategory } from "@/api/customer/index";
import AccountNow from './now'
import AccountFirst from './first'
import AccountSecond from './second'
import AccountThird from './third'
export default {
  data() {
    return {
      indexa: 0,
      currentIndex: 0,
      auditDetail:[],//审核详细内容
      auditDetails:[],//审核详细头部
      form: {
        customerName: "", //客户名称
        customerSn: "",//客户编号
        sharedTo: "",//共享
        customerWebsite: "", //公司网址
        province: "", //省
        city: "",//市
        industryCategory: "",//行业大类
        industrySubcategory: "",//行业小类
        companyAddress: "",//公司地址
        businessType: "",//客户类型
        customerLevel: "",//客户等级
        intentionLevel: "",//客户意向
        customerSource: "",//客户来源
        salesRepresentative: "",//销售代表
        customerPeriod: "",//周期
        commonContactName: "",//联系人
        commonContactDept: "",//部门
        commonContactPhone: "",//联系人手机
        commonContactTel: "",//办公电话
        commonContactWechat: "",//微信
        commonContactEmail: "",//邮箱
        commonContactQq: "",//QQ
        commonContactBirth: "",//生日
        leaderContactName: "",//部门领导名字
        leaderContactPhone:'',//领导手机
        leaderContactTel:'',//固定电话
        leaderSwitchboard:'', //总机号码
        leaderContactWechat: "",//微信
        leaderContactEmail: "",//邮箱
        leaderContactQq:'',//QQ
        leaderContactBirth:'',//生日
        leaderContactAddress:'', //联系地址
        leaderFamilyAddress:'',//家庭地址
        customerUnit:'', //公司名称
        taxNumber: "",//税号
        customerTel: "",//注册电话
        customerAddress:'',//注册地址
        bankName:'',//开户银行
        bankAccount:'', //银行账号
        faxNumber: "",//传真号码
        remark: "",//备注
        },
      rules: {
        customerName: [
          { required: true, message: "请填写客户名称", trigger: "blur" }
        ],
        province: [
          { required: true, message: "请选择省份", trigger: "blur" }
        ],
        city: [
          { required: true, message: "请选择城市", trigger: "blur" }
        ],
        industryCategory: [
          { required: true, message: "请选择行业大类", trigger: "blur" }
        ],
        industrySubcategory: [
          { required: true, message: "请选择行业小类", trigger: "blur" }
        ],
        companyAddress: [
          { required: true, message: "请填写公司地址", trigger: "blur" }
        ],
        businessType: [
          { required: true, message: "请选择客户类型", trigger: "blur" }
        ],
        customerLevel: [
          { required: true, message: "请选择客户等级", trigger: "blur" }
        ],
        intentionLevel: [
          { required: true, message: "请选择客户意向", trigger: "blur" }
        ],
        customerSource: [
          { required: true, message: "请选择客户来源", trigger: "blur" }
        ],
        customerPeriod: [
          { required: true, message: "请选择联系周期", trigger: "blur" }
        ],
        salesRepresentative: [
          { required: true, message: "请选择销售代表", trigger: "blur" }
        ],
        commonContactName: [
          { required: true, message: "请填写联系人姓名", trigger: "blur" }
        ],
        commonContactDept: [
          { required: true, message: "请填写部门", trigger: "blur" }
        ],
        commonContactPhone: [
          { required: true, message: "请填写联系人手机号", trigger: "blur" }
        ],
        commonContactTel: [
          { required: true, message: "请填写办公电话", trigger: "blur" }
        ],
        commonContactWechat: [
          { required: true, message: "请填写微信号", trigger: "blur" }
        ],
        commonContactEmail: [
          { required: true, message: "请填写邮箱", trigger: "blur" }
        ],
        leaderContactName: [
          { required: true, message: "请填写部门领导名称", trigger: "blur" }
        ],
        leaderContactPhone: [
          { required: true, message: "请填写领导手机号码", trigger: "blur" }
        ],
        leaderContactTel: [
          { required: true, message: "请填写固定电话", trigger: "blur" }
        ],
      }
    };
  },
  filters:{
    timer(val){
      if(val && typeof val == 'string' && val.substring!==undefined){
        return val.substring(0,10)
      }
      return '';
    }
  },
  created() {
    this.action = this.baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile?'
    if(this.$route.query.id){
            this.state = this.$route.query.state
            this.auditId = this.$route.query.id
              const form={
                auditId:this.auditId
              }
              getCustomerexamine(form).then(res => {
                this._getindustryCategory(res.data.list[0].formData.industryCategory)
                let auditData = res.data.list[0];
              this.auditDetails = res.data.list[0].sysuserAuditList
              this.auditDetail = res.data.list[0].sysuserAuditList
              this.indexa = auditData.sysuserAuditList.length - 1;
              res.data = res.data.list[0].formData
              let data = res.data
              this.form = { ...data }
            })
        }
  },
  computed: {},
  methods: {
    //获取行业大类
    async _getindustryCategory(val) {    
      const { data } = await getindustryCategory(2);
      let parentName = null;
      data.forEach((value,index) => {
        if (value.id == val) {
          console.log(parentName)
          parentName = value.industryName;
        }
      });
      this.form.industryCategory =  parentName//行业大类
    },
    tabIndex(index) {
      this.currentIndex = index;
      this.indexa = index;
      if (index == 0) {
        this.indexa = this.auditDetail.length - 1;
      } else {
        this.indexa = index - 1;
      }
    },
    torecord (id) {
      this.currentIndex = 3
      this.storeManagerId = id
    },
    toLog (id) {
      this.currentIndex = 2
      this.storeManagerId = id
    },
    toRole () {
      this.currentIndex = 1
    },

    back() {
      this.$router.go(-1);
    },
    handleAvatarSuccess (res, file) {
      this.form.businessLicense = res.data.domain+res.data.filePath
    },
    handleAvatarSuccess2 (res, file) {
      this.form.contract = res.data.domain+res.data.filePath
    },
  },
  components: {
    AccountNow,
    AccountFirst,
    AccountSecond,
    AccountThird,
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.goods-fitter {
  .vender {
    ul {
      li {
        float: left;
        height: 41px;
        padding: 0 10px;
        line-height: 41px;
        text-align: center;
        border: 1px solid transparent;
        font-size: 16px;
        color: #333;
        cursor: pointer;
        &.active {
          border: 1px solid #d7e0f1;
          border-bottom: 0;
          background-color: #fff;
          position: relative;
          position: relative;
          &:after {
            position: absolute;
            content: "";
            left: 0;
            bottom: -1px;
            height: 1px;
            width: 100%;
            background: #fff;
          }
        }
        .image {
          display: inline-block;
          width: 30px;
          margin-right: 10px;
          font-size: 0;
          line-height: 40px;
          vertical-align: top;
          img {
            width: 100%;
            vertical-align: middle;
          }
        }
      }
    }
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
  .search-wrapper {
    padding: 20px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;

    .title {
      margin-left: -20px;
      font-size: 16px;
      font-weight: 400;
      color: 3333;
      padding-left: 10px;
      line-height: 1.4;
      border-left: 4px solid $themeColor;
      margin-bottom: 10px;
    }
    .search-main {
    }
    .search-base {
    }
  }
  .text-space {
    text-align: center;
    color: #606266;
    font-size: 12px;
  }
  .el-select-width {
    max-width: 130px;
    margin-right: 5px;
  }
  .el-input-width {
    display: inline-block;
    max-width: 180px;
  }
  .btn-toggle {
    margin-left: 10px;
    font-size: 14px;
    color: $themeColor;
    cursor: pointer;
  }
}
.goods-list-wrapper {
  margin-top: 20px;
}
.el-transfer-panel__header {
  background: $themeColor;
  color: #fff;
}
.item {
  line-height: 1.5;
  padding: 8px 10px;
  cursor: pointer;
  &:hover {
    color: $themeColor;
  }
  &.active {
    background: #c6e2ff;
    color: #fff;
  }
}
.image {
  cursor: pointer;
}
.item-name {
  cursor: pointer;
  &:hover {
    color: $themeColor;
  }
}
.el-icon-arrow-right {
  margin: 0 20px;
}
.store {
  width: 310px;
}
.red {
  color: $themeSubColor;
}
.transfer-wrapper {
  text-align: center;
}
.panel-wrapper {
  text-align: left;
  margin: 0;
  padding: 6px 0;
  list-style: none;
  height: 246px;
  overflow: auto;
  box-sizing: border-box;
}
.dialog-footer {
  margin-top: 20px;
  text-align: right;
}
.btn {
  margin-left: 42%;
}
.dealerlist {
    // position: absolute;
    // left: 0;
    // right: 0;
    // top: 91px;
    // bottom: 0;
  .form {
    width: 100%;
    min-width: 400px;
    .el-form-item--medium .el-form-item__content{
      display: flex;
    }
  }
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
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .el-upload--picture-card{
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
}

span,label,i,div {
  line-height: 1;
}
ul {
  list-style: none;
}
.wrapper {
  margin-left: 30px;
  margin-top: 30px;
}
.noDetails{
  text-align: center;
}
.list {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  .word{
    .el-icon-circle-check{
      color:#fff;
      position: absolute;
      left:16px;
      bottom: 16px;
    }
    .el-icon-circle-close{
      color:#fff;
      position: absolute;
      left:16px;
      bottom: 16px;
    }
  }

}
.item {
  position: relative;
  width:440px;
  height:300px;
  padding: 50px 33px 0;
  background:rgba(247,250,255,1);
  border:1px solid rgba(234,237,244,1);
  border-radius:6px;
  box-sizing: border-box;
  margin-bottom: 50px;
  margin-right: 45px;
}
.label {
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-top: 40px solid #669EFF;
  border-right: 40px solid #669EFF;
  border-left: 40px solid transparent;
  border-bottom: 40px solid transparent;
  border-radius: 0 6px 0 0;
}
.label_1 {
  border-top: 40px solid #669eff;
  border-right: 40px solid #669eff;
}
.label_2 {
  border-top: 40px solid #ff6671;
  border-right: 40px solid #ff6671;
}
.label_3 {
  border-top: 40px solid #f1ad49;
  border-right: 40px solid #f1ad49;
}
.word_line {
  display: flex;
  align-items: baseline;
  margin-bottom: 20px;
  .el-icon-circle-check{
    color:#669EFF;
  }
  .el-icon-circle-close{
    color:#FF6671;
  }
}
.tt {
  flex-shrink: 0;
  text-align: right;
  width: 72px;
  margin-right: 6px;
}
.t1 {
  display: inline-block;
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(96,98,102,1);
  line-height: 2;
}
.t2 {
  position: absolute;
  top: -18px;
  right: -40px;
  display: inline-block;
  width: 70px;
  transform: rotate(45deg);
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(255,255,255,1);
}
.label_icon_wrap {
  position: absolute;
  top: -30px;
  right: -30px;
}
.avantar {
  display: inline-block;
  width: 16px;
  height: 18px;
  position: relative;
  top: 2px;
}
.avantar_pass {
  background: url("../../../common/images/examine/avatar_pass.png");
}
.avantar_alert {
  background: url("../../../common/images/examine/avatar_alert.png");
}
.avantar_failed{
  background: url("../../../common/images/examine/avatar_fail.png");
}
.label_icon_wrap {
  display: inline-block;
  width: 14px;
  height: 14px;
}
.label_icon_wrap_pass {
  background: url("../../../common/images/examine/icon_pass.png");
}
.label_icon_wrap_alert {
  background: url("../../../common/images/examine/icon_alert.png");
}
.label_icon_wrap_failed {
  background: url("../../../common/images/examine/icon_fail.png");
}

</style>
