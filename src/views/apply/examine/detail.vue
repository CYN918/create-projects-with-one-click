<template>
  <div class="margin dealerlist">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" content="经销商详情表"></el-page-header>
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
                <span>{{form.adminName ?form.adminName :form.adminId }}</span>
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
                  <el-upload
                    class="avatar-uploader"
                    :action="action"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                  >
                    <img v-if="form.businessLicense" :src="form.businessLicense" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="协议合同:" prop>
                  <el-upload
                    class="avatar-uploader"
                    :action="action"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess2"
                  >
                    <img v-if="form.contract" :src="form.contract" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="9">
                <el-form-item label="营业执照有效期:">
                  <span>{{form.licenseTimeStart | timer}} </span> 至
                  <span>{{form.licenseTimeEnd | timer}} </span>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="合同有效期:">
                  <span>{{form.contractTimeStart | timer}} </span> 至
                  <span>{{form.contractTimeEnd | timer}} </span>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="margin">
            <div class="msetting-account-wrapper" style="margin-left: -20px;">
              <div class="tabs-header">
                <ul class="clearfix">
                  <li
                    @click="tabIndex(0)"
                    :class="currentIndex===0 ? 'active' : ''"
                    v-show="this.auditDetail!=''"
                  >当前审核详细</li>
                  <li
                   v-if="auditDetails.length >1"
                    @click="tabIndex(index+1)"
                    :class="currentIndex===index+1 ? 'active' : ''"
                    v-for="(item,index) in this.auditDetails"
                    :key="index"
                  >{{index==0?'首次审核':index+1+'级审核'}}</li>
                </ul>
              </div>
              <div class="tabs-content">
                <div class>
                  <div class="mbottom">
                    <div class="goods-fitter">
                      <el-form label-width="260px" size="small">
                        <div class="search-wrapper">
                          <h4 class="title">审核明细({{ this.auditDetail[indexa] && this.auditDetail[indexa].changeRemark||'' }})  <span style="padding-left: 50px;">发起时间: {{this.auditDetail[indexa].createTime}}</span></h4>
                          <div class="wrapper" v-if="this.auditDetail!=''">
                            <ul class="list">
                              <li
                                class="item"
                                v-for="(item,index) in this.auditDetail[indexa].auditDetailList"
                                :key="index"
                              >
                                <div style="text-align: center;"
                                  class="label word"
                                  :class="{'label_1': item.auditResult==1, 'label_2': item.auditResult==2, 'label_3': item.auditResult == 0}"
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
                                    <i>
                                      <img src="../../../common/images/examine/icon_time.png" alt />
                                    </i>
                                    {{item.auditTime}}
                                  </span>
                                </div>
                                <div class="word_line">
                                  <span class="t1 tt">审核意见：</span>
                                  <span class="t1">{{item.comment}}</span>
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
import AccountNow from "./now";
import AccountFirst from "./first";
import AccountSecond from "./second";
import AccountThird from "./third";
import { getCategory, getStoreList } from "@/api/public";
import {
  creatAgency,
  repeatAgency,
  dealerDetailByid1,
  getAgencyexamine,
  getUserdata
} from "@/api/apply/index";
export default {
  data() {
    var agencyName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入经销商名称"));
      } else {
        if (this.form.agencyName !== "") {
          repeatAgency(this.form.agencyName).then(res => {
            if (res.code === 200) {
              callback();
            } else {
              callback(new Error("该经销商已存在"));
            }
          });
        }
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.checkPass !== "") {
          this.$refs.form.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      indexa: 0,
      currentIndex: 0,
      action: "",
      dialogImageUrl: "",
      dialogVisible: false,
      auditDetail: [], //审核详细内容
      auditDetails: [], //审核详细头部
      form: {
        auditStatus: "",
        auditId: "", //审核ID
        agencyName: "", //名称
        sysuserAccount: "", //账号
        password: "", //用户密码
        commonContactName: "", //联系人-名字
        commonContactTel: "", //联系人-手机号
        commonContactPhone: "", //联系人-电话
        commonContactWechat: "", //联系人-微信
        commonContactEmail: "", //联系人-email
        website: "", //公司网站
        address: "", //公司地址
        leaderContactName: "", //经理-名字
        leaderContactTel: "", //经理-电话
        leaderContactPhone: "", //经理-手机号
        leaderContactWechat: "", //经理-微信
        leaderContactEmail: "", //经理-email
        cashCompany: "", //提现公司名称
        cashBank: "", //提现开户行
        cashAccount: "", //提现账号
        ticketCompany: "", //开票信息-公司名称
        ticketBank: "", //开票信息-开户行
        ticketAccount: "", //开票信息-开户账号
        ticketTax: "", //开票信息-税号
        ticketTel: "", //开票信息-电话
        ticketAddress: "", //开票信息_地址
        businessLicense: "", //营业执照
        contract: "", //协议合同
        licenseTime: "", //营业执照有效期
        adminId:"",
        adminName:'',
      },

      rules: {
        agencyName: [
          { required: true, validator: agencyName, trigger: "blur" }
        ],
        sysuserAccount: [
          { required: true, message: "请填写登录账号", trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
          {
            min: 5,
            max: 16,
            message: "密码长度在 5 到 16 个字符",
            trigger: "blur"
          }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        commonContactName: [
          { required: true, message: "请填写联系人名称", trigger: "blur" }
        ],
        commonContactTel: [
          { required: true, message: "请填写联系电话", trigger: "blur" }
        ],
        commonContactPhone: [
          { required: true, message: "请填写手机号码", trigger: "blur" }
        ],
        commonContactWechat: [
          { required: true, message: "请填写微信号", trigger: "blur" }
        ],
        commonContactEmail: [
          { required: true, message: "请填写邮箱", trigger: "blur" }
        ],
        website: [
          { required: true, message: "请填写公司网址", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请填写公司地址", trigger: "blur" }
        ],
        leaderContactName: [
          { required: true, message: "请填写联系人", trigger: "blur" }
        ],
        leaderContactTel: [
          { required: true, message: "请填写联系电话", trigger: "blur" }
        ],
        leaderContactPhone: [
          { required: true, message: "请填写手机号码", trigger: "blur" }
        ],
        leaderContactWechat: [
          { required: true, message: "请填写微信号", trigger: "blur" }
        ],
        leaderContactEmail: [
          { required: true, message: "请填写邮箱", trigger: "blur" }
        ],
        cashCompany: [
          { required: true, message: "请填写公司名称", trigger: "blur" }
        ],
        cashBank: [
          { required: true, message: "请填写开户银行", trigger: "blur" }
        ],
        cashAccount: [
          { required: true, message: "请填写账号", trigger: "blur" }
        ],
        ticketCompany: [
          { required: true, message: "请填写公司名称", trigger: "blur" }
        ],
        ticketBank: [
          { required: true, message: "请填写开户银行", trigger: "blur" }
        ],
        ticketAccount: [
          { required: true, message: "请填写账号", trigger: "blur" }
        ],
        ticketTax: [{ required: true, message: "请填写税号", trigger: "blur" }],
        ticketTel: [
          { required: true, message: "请填写注册电话", trigger: "blur" }
        ],
        ticketAddress: [
          { required: true, message: "请填写注册地址", trigger: "blur" }
        ]
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
    this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
    console.log(this.$route.query.state);
    if (this.$route.query.id) {
      this.state = this.$route.query.state;
      this.auditId = this.$route.query.id;
      this.auditStatus = this.$route.query.status;
      dealerDetailByid1(this.auditId, this.auditStatus).then(res => {
        let auditData = res.data.list[0];
        this.auditDetails = res.data.list[0].sysuserAuditList;
        this.auditDetail = res.data.list[0].sysuserAuditList;
        this.indexa = auditData.sysuserAuditList.length - 1;
        this.form.agencyName = res.data.list[0].formData.agencyName; //经销商名称
        this.form.adminId = res.data.list[0].formData.adminId; //销售管理员
        getUserdata().then(res => {
          var arr = res.data.list;
          for (var i = 0; i < arr.length; i++) {

            if (this.form.adminId == arr[i].sysuserId) {
              console.log(arr[i])
              this.form.adminName = arr[i].sysuserName;
            }
          }
        });
        this.form.sysuserAccount = res.data.list[0].formData.sysuserAccount; //账号
        this.form.password = res.data.list[0].formData.password; //用户密码
        this.form.commonContactName =
          res.data.list[0].formData.commonContactName; //联系人-名字
        this.form.commonContactTel = res.data.list[0].formData.commonContactTel; //联系人-手机号
        this.form.commonContactPhone =
          res.data.list[0].formData.commonContactPhone; //联系人-电话
        this.form.commonContactWechat =
          res.data.list[0].formData.commonContactWechat; //联系人-微信
        this.form.commonContactEmail =
          res.data.list[0].formData.commonContactEmail; //联系人-email
        this.form.website = res.data.list[0].formData.website; //公司网站
        this.form.address = res.data.list[0].formData.address; //公司地址
        this.form.leaderContactName =
          res.data.list[0].formData.leaderContactName; //经理-名字
        this.form.leaderContactTel = res.data.list[0].formData.leaderContactTel; //经理-电话
        this.form.leaderContactPhone =
          res.data.list[0].formData.leaderContactPhone; //经理-手机号
        this.form.leaderContactWechat =
          res.data.list[0].formData.leaderContactWechat; //经理-微信
        this.form.leaderContactEmail =
          res.data.list[0].formData.leaderContactEmail; //经理-email
        this.form.cashCompany = res.data.list[0].formData.cashCompany; //提现公司名称
        this.form.cashBank = res.data.list[0].formData.cashBank; //提现开户行
        this.form.cashAccount = res.data.list[0].formData.cashAccount; //提现账号
        this.form.ticketCompany = res.data.list[0].formData.ticketCompany; //开票信息-公司名称
        this.form.ticketBank = res.data.list[0].formData.ticketBank; //开票信息-开户行
        this.form.ticketAccount = res.data.list[0].formData.ticketAccount; //开票信息-开户账号
        this.form.ticketTax = res.data.list[0].formData.ticketTax; //开票信息-税号
        this.form.ticketTel = res.data.list[0].formData.ticketTel; //开票信息-电话
        this.form.ticketAddress = res.data.list[0].formData.ticketAddress; //开票信息_地址
        this.form.businessLicense = res.data.list[0].formData.businessLicense; //营业执照
        this.form.contract = res.data.list[0].formData.contract; //协议合同
        this.form.contractTimeStart = res.data.list[0].formData.contractTimeStart; //合同有效期
        this.form.contractTimeEnd = res.data.list[0].formData.contractTimeEnd; //合同有效期
        this.form.licenseTimeStart = res.data.list[0].formData.licenseTimeStart; //营业执照有效期
        this.form.licenseTimeEnd = res.data.list[0].formData.licenseTimeEnd; //营业执照有效期
        this.form.divideMode = res.data.list[0].formData.divideMode; //分成方式 1固定比例2利润比例
        this.form.divideRatio = res.data.list[0].formData.divideRatio; //分成比例(经销商得到的) 如0.5对应2:1，50%
      });
    }
  },
  computed: {},
  methods: {
    tabIndex(index) {
      this.currentIndex = index;
      this.indexa = index;
      if (index == 0) {
        this.indexa = this.auditDetail.length - 1;
      } else {
        this.indexa = index - 1;
      }
    },
    torecord(id) {
      this.currentIndex = 3;
      this.storeManagerId = id;
    },
    toLog(id) {
      this.currentIndex = 2;
      this.storeManagerId = id;
    },
    toRole() {
      this.currentIndex = 1;
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this._creatAgency();
        } else {
          this.$notify({
            type: "warning",
            message: "请填写完整信息"
          });
          return false;
        }
      });
    },
    _creatAgency() {
      creatAgency(this.form).then(res => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this.$router.push({ name: "DealerList" });
        }
      });
    },
    back() {
      this.$router.go(-1);
    },
    handleAvatarSuccess(res, file) {
      this.form.businessLicense = res.data.domain + res.data.filePath;
    },
    handleAvatarSuccess2(res, file) {
      this.form.contract = res.data.domain + res.data.filePath;
    }
  },
  components: {
    AccountNow,
    AccountFirst,
    AccountSecond,
    AccountThird
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
    .el-form-item--medium .el-form-item__content {
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
  .el-upload--picture-card {
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

ul {
  list-style: none;
}
.wrapper {
  margin-left: 30px;
  margin-top: 30px;
}
.noDetails {
  text-align: center;
}
.list {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  .word {
    .el-icon-circle-check {
      color: #fff;
      position: absolute;
      left: 16px;
      bottom: 16px;
    }
    .el-icon-circle-close {
      color: #fff;
      position: absolute;
      left: 16px;
      bottom: 16px;
    }
  }
}
.item {
  position: relative;
  width: 440px;
  height: 300px;
  padding: 50px 33px 0;
  background: rgba(247, 250, 255, 1);
  border: 1px solid rgba(234, 237, 244, 1);
  border-radius: 6px;
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
  border-top: 40px solid #669eff;
  border-right: 40px solid #669eff;
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
  .el-icon-circle-check {
    color: #669eff;
  }
  .el-icon-circle-close {
    color: #ff6671;
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
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(96, 98, 102, 1);
  line-height: 2;
}
.t2 {
  position: absolute;
  top: -18px;
  right: -40px;
  display: inline-block;
  width: 70px;
  transform: rotate(45deg);
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
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
.avantar_failed {
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
