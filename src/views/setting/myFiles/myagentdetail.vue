<template>
  <div class="margin dealerlist">
    <el-form ref="form" :model="form" label-width="140px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" content="经销商信息>详情"></el-page-header>
          </div>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <h4 class="title">经销商信息</h4>
            <br />
            <el-row>
              <el-col :span="5">
                <el-form-item label="经销商名称:" prop="agencyName">
                  <span>{{form.agencyName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="联系人:" prop="commonContactName">
                  <span>{{form.commonContactName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="联系电话:" prop="commonContactTel">
                  <span>{{form.commonContactTel}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="手机号码:" prop="commonContactPhone">
                  <span>{{form.commonContactPhone}}</span>
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
                <el-form-item label="公司网址:" prop="website">
                  <span>{{form.website}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="公司地址:" prop="address">
                  <span>{{form.address}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
                <el-form-item label="销售管理员:" prop="address">
                  <span>{{form.adminName ?form.adminName :form.adminId  }}</span>
                </el-form-item>
            </el-row>
          </div>
        </div>
      </div>

      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <h4 class="title">总经理信息</h4>
            <el-row>
              <el-col :span="5">
                <el-form-item label="联系人:" prop="leaderContactName">
                  <span>{{form.leaderContactName}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="联系电话:" prop="leaderContactTel">
                  <span>{{form.leaderContactTel}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="手机号码:" prop="leaderContactPhone">
                  <span>{{form.leaderContactPhone}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="微信号:" prop="leaderContactWechat">
                  <span>{{form.leaderContactWechat}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="邮箱:" prop="leaderContactEmail">
                  <span>{{form.leaderContactEmail}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <h4 class="title">提现账号</h4>
            <el-row>
              <el-col :span="5">
                <el-form-item label="公司名称:" prop="cashCompany">
                  <span>{{form.cashCompany}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="开户银行:" prop="cashBank">
                  <span>{{form.cashBank}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="账号:" prop="cashAccount">
                  <span>{{form.cashAccount}}</span>
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
                <el-form-item label="公司名称:" prop="ticketCompany">
                  <span>{{form.ticketCompany}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="开户银行:" prop="ticketBank">
                  <span>{{form.ticketBank}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="账号:" prop="ticketAccount">
                  <span>{{form.ticketAccount}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="税号:" prop="ticketTax">
                  <span>{{form.ticketTax}}</span>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="注册电话:" prop="ticketTel">
                  <span>{{form.ticketTel}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="公司地址:" prop="ticketAddress">
                  <span>{{form.ticketAddress}}</span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <h4 class="title">协议合同</h4>
            <el-row>
              <el-col :span="9">
                <el-form-item prop="BL_image_id" label="营业执照:" class>
                    <img v-if="form.businessLicense" :src="form.businessLicense" class="avatar">
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="协议合同:" prop>
                      <img v-if="form.contract" :src="form.contract" class="avatar">
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9">
                <el-form-item label="营业执照有效期:">
                  <span>{{form.licenseTimeStart}}</span>至<span>{{form.licenseTimeEnd}}</span>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="合同有效期:">
                  <span>{{form.contractTimeStart}}</span>至<span>{{form.contractTimeEnd}}</span>
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
    import {dealerDetailByid, getUserdata} from "@/api/apply/index";

    export default {
  data() {
    return {
      action: '',
      dialogImageUrl: "",
      form: {
        agencyName: "", //名称
        sysuserAccount: "",//账号
        password: "",//用户密码
        commonContactName: "", //联系人-名字
        commonContactTel: "", //联系人-手机号
        commonContactPhone: "",//联系人-电话
        commonContactWechat: "",//联系人-微信
        commonContactEmail: "",//联系人-email
        website: "",//公司网站
        address: "",//公司地址
        leaderContactName: "",//经理-名字
        leaderContactTel: "",//经理-电话
        leaderContactPhone: "",//经理-手机号
        leaderContactWechat: "",//经理-微信
        leaderContactEmail: "",//经理-email
        cashCompany: "",//提现公司名称
        cashBank: "",//提现开户行
        cashAccount: "",//提现账号
        ticketCompany: "",//开票信息-公司名称
        ticketBank: "",//开票信息-开户行
        ticketAccount: "",//开票信息-开户账号
        ticketTax: "",//开票信息-税号
        ticketTel: "",//开票信息-电话
        ticketAddress: "",//开票信息_地址
        businessLicense:'',//营业执照
        contract:'',//协议合同
        licenseTime:'', //营业执照有效期
        adminId:"",
        adminName:'',
      },
    };
  },
  filters:{
    systerName(val){
      if(val){
        getUserdata().then(res => {
          var arr = res.data.list
          for(var i= 0; i<arr.length;i++){
            if(val == arr[i].sysuserId){
               a = arr[i].sysuserName
               console.log(a)
            }
          }
        });
      }
    }
  },
  created() {
    // this.getcookie()
    this.action = this.baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile?'
    if(this.$route.query.id){
            this.state = this.$route.query.state
            this.agencyId = this.$route.query.id
            dealerDetailByid(this.agencyId).then(res => {
              this.form.agencyName = res.data.agencyName //经销商名称
              this.form.sysuserAccount = res.data.sysuserAccount //账号
              this.form.password = res.data.password //用户密码
              this.form.commonContactName = res.data.commonContactName //联系人-名字
              this.form.commonContactTel = res.data.commonContactTel //联系人-手机号
              this.form.commonContactPhone = res.data.commonContactPhone //联系人-电话
              this.form.commonContactWechat = res.data.commonContactWechat //联系人-微信
              this.form.commonContactEmail = res.data.commonContactEmail //联系人-email
              this.form.website = res.data.website //公司网站
              this.form.address = res.data.address //公司地址
              this.form.adminId = res.data.adminId; //销售管理员
              getUserdata().then(res => {
                var arr = res.data.list
                for(var i= 0; i<arr.length;i++){
                  if(this.form.adminId == arr[i].sysuserId){
                    this.form.adminName = arr[i].sysuserName
                  }
                }
              });
              this.form.leaderContactName = res.data.leaderContactName //经理-名字
              this.form.leaderContactTel = res.data.leaderContactTel //经理-电话
              this.form.leaderContactPhone = res.data.leaderContactPhone //经理-手机号
              this.form.leaderContactWechat = res.data.leaderContactWechat //经理-微信
              this.form.leaderContactEmail = res.data.leaderContactEmail //经理-email
              this.form.cashCompany = res.data. cashCompany //提现公司名称
              this.form.cashBank = res.data.cashBank //提现开户行
              this.form.cashAccount = res.data.cashAccount //提现账号
              this.form.ticketCompany = res.data.ticketCompany //开票信息-公司名称
              this.form.ticketBank = res.data.ticketBank //开票信息-开户行
              this.form.ticketAccount = res.data.ticketAccount //开票信息-开户账号
              this.form.ticketTax = res.data.ticketTax //开票信息-税号
              this.form.ticketTel = res.data.ticketTel //开票信息-电话
              this.form.ticketAddress = res.data.ticketAddress //开票信息_地址
              this.form.businessLicense = res.data.businessLicense //营业执照
              this.form.contract = res.data.contract //协议合同
              res.data.contractTimeStart = res.data.contractTimeStart.substring(0,10);
              res.data.contractTimeEnd = res.data.contractTimeEnd.substring(0,10);
              res.data.licenseTimeStart = res.data.licenseTimeStart.substring(0,10);
              res.data.licenseTimeEnd = res.data.licenseTimeEnd.substring(0,10);
              this.form.contractTimeStart = res.data.contractTimeStart //合同有效期
              this.form.contractTimeEnd = res.data.contractTimeEnd //合同有效期
              this.form.licenseTimeStart = res.data.licenseTimeStart //营业执照有效期
              this.form.licenseTimeEnd = res.data.licenseTimeEnd //营业执照有效期
              this.form.divideMode = res.data.divideMode //分成方式 1固定比例2利润比例
              this.form.divideRatio = res.data.divideRatio //分成比例(经销商得到的) 如0.5对应2:1，50%
            })
        }
  },
  computed: {},
  methods: {
    // getcookie() {
    //   let {data} = JSON.parse(localStorage.getItem('user'))
    //   dealerDetailByid(data.sysuserId).then(res => {
    //     if (res.code == 200) {
    //       let {data} = res
    //       this.form = JSON.parse(JSON.stringify(data))
    //     }
    //   })
    // },
    back() {
      this.$router.go(-1);
    },
  },
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
