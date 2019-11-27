<template>
  <div class="margin dealerlist">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-button @click="back" type="primary" size="small" icon="el-icon-back">返回</el-button>
            <h4 class="title1">客户资料详情</h4>
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
                  <span>{{form.customerPeriod}}</span>
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
                  <span>{{form.commonContactBirth | timer}}</span>
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
                  <span>{{form.leaderContactBirth | timer}}</span>
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
                  <span>{{form.sharedTo}}</span>
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
import { customerDetailByid, } from "@/api/customer/index";
export default {
  data() {
    return {
      currentIndex: 0,
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
  created() {
    this.action = this.baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile?'
    console.log(this.$route.query.state)
    if(this.$route.query.id){
            this.state = this.$route.query.state
            this.customerId = this.$route.query.id
            customerDetailByid(this.customerId).then(res => {
              this.form.customerName = res.data.customerName //客户名称
              this.form.customerSn = res.data.customerSn //客户编号
              this.form.sharedTo = res.data.sharedTo //共享
              this.form.customerWebsite = res.data.customerWebsite //公司网址
              this.form.sysuserAccount = res.data.sysuserAccount //账号
              this.form.password = res.data.password //密码
              this.form.province = res.data.province //省
              this.form.city = res.data.city //市
              this.form.industryCategory = res.data.industryCategory //行业大类
              this.form.industrySubcategory = res.data.industrySubcategory //行业小类
              this.form.companyAddress = res.data.companyAddress //公司地址
              this.form.businessType = res.data.businessType //客户类型
              this.form.customerLevel = res.data.customerLevel //客户等级
              this.form.intentionLevel = res.data.intentionLevel //客户意向
              this.form.customerSource = res.data.customerSource //客户来源
              this.form.salesRepresentative = res.data.salesRepresentative //销售代表
              this.form.customerPeriod = res.data.customerPeriod //周期
              this.form.commonContactName = res.data.commonContactName //联系人
              this.form.commonContactDept = res.data.commonContactDept //部门
              this.form.commonContactPhone = res.data.commonContactPhone //联系人手机
              this.form. commonContactTel = res.data. commonContactTel //办公电话
              this.form. commonContactWechat = res.data. commonContactWechat //微信
              this.form.commonContactEmail = res.data.commonContactEmail //邮箱
              this.form.commonContactQq = res.data.commonContactQq //QQ
              this.form.commonContactBirth = res.data.commonContactBirth //生日
              this.form.leaderContactName = res.data.leaderContactName //部门领导名字
              this.form.leaderContactPhone = res.data.leaderContactPhone //领导手机
              this.form.leaderContactTel = res.data.leaderContactTel //固定电话
              this.form.leaderSwitchboard = res.data.leaderSwitchboard //总机号码
              this.form.leaderContactWechat = res.data.leaderContactWechat //微信
              this.form.leaderContactEmail = res.data.leaderContactEmail //邮箱
              this.form.leaderContactQq = res.data.leaderContactQq //QQ
              this.form.leaderContactBirth = res.data.leaderContactBirth //生日
              this.form.leaderContactAddress = res.data.leaderContactAddress //联系地址
              this.form.leaderFamilyAddress = res.data.leaderFamilyAddress //家庭地址
              this.form.customerUnit = res.data.customerUnit //公司名称
              this.form.taxNumber = res.data.taxNumber //税号
              this.form.customerTel = res.data.customerTel //注册电话
              this.form.customerAddress = res.data.customerAddress //注册地址
              this.form.bankName = res.data.bankName //开户银行
              this.form.bankAccount = res.data.bankAccount //银行账号
              this.form.faxNumber = res.data.faxNumber //税号
              this.form.remark = res.data.remark //备注
            })
        }
  },
  computed: {},
  filters:{
    timer(val){
      return val.substring(0,10)
    }
  },
  methods: {
    tabIndex (index) {
      this.currentIndex = index
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
  margin-top: 10px;
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
</style>
