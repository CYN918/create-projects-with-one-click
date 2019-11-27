<template>
  <div class="margin dealerlist">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" content="经销商信息 > 编辑"></el-page-header>
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
                  <el-input v-model="form.agencyName" placeholder="请填写经销商名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="联系人:" prop="commonContactName">
                  <el-input v-model="form.commonContactName" placeholder="请填写联系人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="联系电话:" prop="commonContactTel">
                  <el-input v-model="form.commonContactTel" placeholder="请填写联系电话"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="手机号码:" prop="commonContactPhone">
                  <el-input v-model="form.commonContactPhone" placeholder="请填写手机号码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="微信号:" prop="commonContactWechat">
                  <el-input v-model="form.commonContactWechat" placeholder="请填写微信号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="邮箱:" prop="commonContactEmail">
                  <el-input v-model="form.commonContactEmail" placeholder="请填写邮箱"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="公司网址:" prop="website">
                  <el-input v-model="form.website" placeholder="请填写公司网址"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="公司地址:" prop="address">
                  <el-input v-model="form.address" placeholder="请填写公司地址"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="销售管理员:" prop="adminId">
                  <el-select v-model="form.adminId" clearable placeholder="请选择">
                    <el-option
                      v-for="(item,index) in userOptions"
                      :key="index"
                      :label="item.sysuserName"
                      :value="item.sysuserId"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
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
                  <el-input v-model="form.leaderContactName" placeholder="请填写联系人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="联系电话:" prop="leaderContactTel">
                  <el-input v-model="form.leaderContactTel" placeholder="请填写联系电话"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="手机号码:" prop="leaderContactPhone">
                  <el-input v-model="form.leaderContactPhone" placeholder="请填写手机号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="微信号:" prop="leaderContactWechat">
                  <el-input v-model="form.leaderContactWechat" placeholder="请填写微信号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="邮箱:" prop="leaderContactEmail">
                  <el-input v-model="form.leaderContactEmail" placeholder="请填写邮箱"></el-input>
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
                  <el-input v-model="form.cashCompany" placeholder="请填写公司名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="开户银行:" prop="cashBank">
                  <el-input v-model="form.cashBank" placeholder="请填写开户银行"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="账号:" prop="cashAccount">
                  <el-input v-model="form.cashAccount" placeholder="请填写账号"></el-input>
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
                  <el-input v-model="form.ticketCompany" placeholder="请填写公司名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="开户银行:" prop="ticketBank">
                  <el-input v-model="form.ticketBank" placeholder="请填写开户银行"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="账号:" prop="ticketAccount">
                  <el-input v-model="form.ticketAccount" placeholder="请填写账号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="税号:" prop="ticketTax">
                  <el-input v-model="form.ticketTax" placeholder="请填写税号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="注册电话:" prop="ticketTel">
                  <el-input v-model="form.ticketTel" placeholder="请填写注册电话"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="公司地址:" prop="ticketAddress">
                  <el-input v-model="form.ticketAddress" placeholder="请填写公司地址"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>
      </div>

      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <!--<h4 class="title">合作模式：经销商用我公司的名义同客户签订合同</h4>-->
            <!--<p>-->
              <!--分成比例为：甲方（深圳市迈戈实业有限公司）占此合同所产生的纯利润60%；乙方（XXXX公司）占此合同所产生的纯利润40%；纯利润的计算方式为：销售额-采购额-快递费-所产生的税费；-->
            <!--</p>-->
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
                  <el-date-picker
                    v-model="form.licenseTime"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    unlink-panels
                    format="yyyy-MM-dd"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="合同有效期:">
                  <el-date-picker
                    type="daterange"
                    unlink-panels
                    valueFormat="yyyy-MM-dd HH:mm:ss"
                    v-model="form.contractTime"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="btn">
            <el-button type="primary" @click="submitForm" size="small">提交</el-button>
            <el-button type="primary" @click="back" size="small">取消</el-button>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getCategory, getStoreList } from "@/api/public";
import {
  creatAgency,
  repeatAgency,
  editAgency,
  dealerDetailByid,
  getUserdata,
  contractInformation
} from "@/api/apply/index";
export default {
  data() {
    var agencyName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入经销商名称"));
      } else {
        if (this.form.agencyName !== "" && this.agencyId == "") {
          repeatAgency(this.form.agencyName).then(res => {
            if (res.code === 200) {
              callback();
            } else {
              callback(new Error("该经销商已存在"));
            }
          });
        } else {
          callback();
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
    //邮箱正则
    var validateemail = (rule, value, callback) => {
      if (/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱'))
      }
    };
    //手机号码正则
    var validatephone=(rule,value,callback)=>{
      if (/^1[3|4|5|6|7|8|9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的手机号码'))
      }
    }
  //电话正则
    var validatetel=(rule,value,callback)=>{
      if (/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的电话号码'))
      }
    }
  //银行校验规则
    var validabank=(rule,value,callback)=>{
      if (/^[a-zA-Z\u4e00-\u9fa5]+$/.test(value)) {
        callback()
      } else {
        callback(new Error('输入的格式不正确'))
      }
    }
    //银行卡号的正则
    var validabankcard=(rule,value,callback)=>{
      if ( /^([1-9])(\d+)$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的银号卡号'))
      }
    }
    //微信账号校验
    var validaweChat=(rule,value,callback)=>{
      if ( /^([-_a-zA-Z0-9]{5,19})+$/.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的微信账号'))
      }
    }

    return {
      userOptions: [],
      action: "",
      dialogImageUrl: "",
      dialogVisible: false,
      agencyId: "", //经销商Id
      form: {
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
        licenseTime: [], //营业执照有效期
        contractTime: [], //合同执照有效期
        adminId: "" //销售管理员
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
          { required: true, message: "请填写联系电话", trigger: "blur" },
          {
            min: 5,
            max: 16,
            message: "密码长度在 5 到 16 个字符",
            trigger: "blur"
          }
        ],
        commonContactPhone: [
          { required: true, message: "请填写手机号码", trigger: "blur" },
          {required: true, validator: validatephone, trigger: "blur"}
        ],
        commonContactWechat: [
          { required: true, message: "请填写微信号", trigger: "blur" },
          {required: true, validator: validaweChat, trigger: "blur"}
        ],
        commonContactEmail: [
          {required: true,validator: validateemail,trigger: 'blur'},
          { required: true, message: "请填写邮箱", trigger: "blur" },
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
          { required: true, message: "请填写联系电话", trigger: "blur" },
          {required: true, validator: validatetel, trigger: "blur"}
        ],
        leaderContactPhone: [
          { required: true, message: "请填写手机号码", trigger: "blur" },
          {required: true, validator: validatephone, trigger: "blur"}
        ],
        leaderContactWechat: [
          { required: true, message: "请填写微信号", trigger: "blur" },
          {required: true, validator: validaweChat, trigger: "blur"}
        ],
        leaderContactEmail: [
          { required: true, message: "请填写邮箱", trigger: "blur" },
          {required: true,validator: validateemail,trigger: 'blur'}
        ],
        cashCompany: [
          { required: true, message: "请填写公司名称", trigger: "blur" }
        ],
        cashBank: [
          { required: true, message: "请填写开户银行", trigger: "blur" },
          {required: true,validator: validabank,trigger: 'blur'}
        ],
        cashAccount: [
          { required: true, message: "请填写账号", trigger: "blur" },
          {required: true,validator: validabankcard,trigger: 'blur'}
        ],
        ticketCompany: [
          { required: true, message: "请填写公司名称", trigger: "blur" }
        ],
        ticketBank: [
          { required: true, message: "请填写开户银行", trigger: "blur" },
          {required: true,validator: validabank,trigger: 'blur'}
        ],
        ticketAccount: [
          { required: true, message: "请填写账号", trigger: "blur" },
          {required: true,validator: validabankcard,trigger: 'blur'}
        ],
        ticketTax: [{ required: true, message: "请填写税号", trigger: "blur" }],
        ticketTel: [
          { required: true, message: "请填写注册电话", trigger: "blur" },
          {required: true, validator: validatetel, trigger: "blur"}
        ],
        ticketAddress: [
          { required: true, message: "请填写公司地址", trigger: "blur" }
        ],
        adminName: [
          { required: true, message: "请填写销售管理员", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
    this._getUserdata()
    if (this.$route.query.id) {
      this.state = this.$route.query.state;
      this.agencyId = this.$route.query.id;
      dealerDetailByid(this.agencyId).then(res => {
        this.form.adminName = res.data.adminName;
        this.form.agencyName = res.data.agencyName; //经销商名称
        this.form.sysuserAccount = res.data.sysuserAccount; //账号
        this.form.password = res.data.password; //用户密码
        this.form.commonContactName = res.data.commonContactName; //联系人-名字
        this.form.commonContactTel = res.data.commonContactTel; //联系人-手机号
        this.form.commonContactPhone = res.data.commonContactPhone; //联系人-电话
        this.form.commonContactWechat = res.data.commonContactWechat; //联系人-微信
        this.form.commonContactEmail = res.data.commonContactEmail; //联系人-email
        this.form.website = res.data.website; //公司网站
        this.form.address = res.data.address; //公司地址
        this.form.adminId = res.data.adminId; //销售管理员
        this.form.leaderContactName = res.data.leaderContactName; //经理-名字
        this.form.leaderContactTel = res.data.leaderContactTel; //经理-电话
        this.form.leaderContactPhone = res.data.leaderContactPhone; //经理-手机号
        this.form.leaderContactWechat = res.data.leaderContactWechat; //经理-微信
        this.form.leaderContactEmail = res.data.leaderContactEmail; //经理-email
        this.form.cashCompany = res.data.cashCompany; //提现公司名称
        this.form.cashBank = res.data.cashBank; //提现开户行
        this.form.cashAccount = res.data.cashAccount; //提现账号
        this.form.ticketCompany = res.data.ticketCompany; //开票信息-公司名称
        this.form.ticketBank = res.data.ticketBank; //开票信息-开户行
        this.form.ticketAccount = res.data.ticketAccount; //开票信息-开户账号
        this.form.ticketTax = res.data.ticketTax; //开票信息-税号
        this.form.ticketTel = res.data.ticketTel; //开票信息-电话
        this.form.ticketAddress = res.data.ticketAddress; //开票信息_地址
        this.form.businessLicense = res.data.businessLicense; //营业执照
        this.form.contract = res.data.contract; //协议合同
        this.form.licenseTime.push(res.data.licenseTimeStart); //营业执照开始有效期
        this.form.licenseTime.push(res.data.licenseTimeEnd); //营业执照结束有效期
        this.form.contractTime.push(res.data.contractTimeStart); //合同执照开始有效期
        this.form.contractTime.push(res.data.contractTimeEnd); //合同执照结束有效期
        this.form.divideMode = res.data.divideMode; //分成方式 1固定比例2利润比例
        this.form.divideRatio = res.data.divideRatio; //分成比例(经销商得到的) 如0.5对应2:1，50%
      });
    }
  },
  computed: {},
  methods: {

    //获取销售管理员:key
    _getUserdata() {
      getUserdata().then(res => {
        this.userOptions = res.data.list;
      });
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
      if (this.agencyId) {
        editAgency(this.form, this.agencyId).then(res => {
          if (res.code == 200) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.$router.push({ name: "DealerList" });
          }
        });
      } else {
        creatAgency(this.form).then(res => {
          if (res.code == 200) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.$router.push({ name: "DealerList" });
          }
        });
      }
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
  components: {}
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
</style>
