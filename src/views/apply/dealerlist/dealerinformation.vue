<template>
  <div class="margin dealerlist">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" content="经销商信息"></el-page-header>
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
                  <el-input v-model="form.agencyName" placeholder="请填写经销商名称" @input="handleChangge($event)"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="登录账号:" prop="sysuserAccount">
                  <el-input v-model="form.sysuserAccount" placeholder="请填写登录账号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="密码:" prop="password">
                  <el-input v-model="form.password" placeholder="请填写密码" type="password"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="确认密码:" prop="checkPass">
                  <el-input v-model="form.checkPass" placeholder="请再次输入密码" type="password"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
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
              <el-col :span="5">
                <el-form-item label="微信号:" prop="commonContactWechat">
                  <el-input v-model="form.commonContactWechat" placeholder="请填写微信号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
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
              <el-col :span="5">
                <el-form-item label="销售管理员:" prop="adminId">
                  <el-select v-model="form.adminId" clearable placeholder="请选择">
                    <el-option
                      v-for="(item,index) in userOptions"
                      :key="item.index"
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
      <!--合作模式-->
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <h4 class="title">合作模式:{{cooperationMethod.cooperationMethod===1?'使用深圳市迈戈实业有限公司的公司资质同客户签订合作协议':'乙方使用自已公司的资质同客户签定合作协议'}}</h4>
            <div>合作模式内容:甲方( {{cooperationMethod.firstParty}} )占此合同所产生的纯利润 {{cooperationMethod.proprietaryFirst}} %;
              乙方( {{cooperationMethod.secondParty}} )占此合同所产生的纯利润 {{cooperationMethod.proprietarySecond}} %,纯利润的计算方式为：销售额-采购额-快递费-所产生的税费；
            </div>
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
              <el-col :span="5">
                <el-button type="primary" size="small" @click="open">
                  查看合同
                  <i class="el-icon-search el-icon--right"></i>
                </el-button>
                <el-button type="primary" size="small" @click="Downloadcontract">
                    下载合同
                    <i class="el-icon-upload el-icon--right"></i>
                  </el-button>

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
            <el-button type="danger" @click="back" size="small">取消</el-button>
            <el-button type="primary" @click="submitForm" size="small">提交</el-button>
          </div>
        </div>
      </div>

    </el-form>
    <contractdlog :picture='picture' @closediog='handleClosefunc'></contractdlog>
  </div>
</template>

<script>
import { getCategory, getStoreList } from "@/api/public";
import { throttleTipPop } from '@/utils/throttle'
import contractdlog from './contractdlog'
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
        if (value.length < 4 || value.length > 20) {
          return callback(new Error("长度在4-20位"));
        }
        const reg = /^[\u4E00-\u9FA5\uf900-\ufa2d\w\-]{4,20}$/;
        if (reg.test(value)) {
          if (this.form.agencyName == this.form.oldAgencyName) {
            callback();
          } else {
            repeatAgency(this.form.agencyName).then(res => {
              if (res.code === 200) {
                callback();
              } else {
                callback(new Error("该经销商已存在"));
              }
            });
          }
        } else {
          return callback(new Error("不能有空格，特殊字符"));
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
      cooperationMethod:'', //合作方式
      userOptions: [],
      picture: false,
      action: "",
      dialogImageUrl: "",
      dialogVisible: false,
      agencyId: "", //经销商Id
      modeImg: [], //大图
      form: {
        oldAgencyName: "", //名称
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
        adminId: "", // 销售管理员
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
        contractTime: [] //合同执照有效期
      },
      timer:null,
      modeFalg: 0, //合作模式下标
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
        adminId: [
          { required: true, message: "请分派销售管理员", trigger: "change" }
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
          { required: true, message: "请填写公司地址", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this._getUserdata();
    this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
    if (this.$route.query.id) {
      this.state = this.$route.query.state;
      this.agencyId = this.$route.query.id;
      dealerDetailByid(this.agencyId).then(res => {
        this.form.oldAgencyName = res.data.agencyName;
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
        console.log(this.form)
      });
    }
  },
  computed: {},
  methods: {
    handleClosefunc(val){
      this.picture = val
    },
    //根据进销商查看合同
    handleChangge($event) {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        this.getUser($event);
      }, 2000)
    },
    async  getUser($event){
      const res = await contractInformation($event)
      if (res.code === 200) {
        this.cooperationMethod = res.data || {}
        console.log(res.data);
        if(!this.form.ticketTax)
          this.form.ticketTax = res.data.secondTiTaxNumber; //开票信息-税号
        if(!this.form.ticketBank)
          this.form.ticketBank = res.data.secondTiBank; //开票信息-开户行
        if(!this.form.ticketTel)
          this.form.ticketTel = res.data.secondTiTelephone; //开票信息-电话
        if(!this.form.ticketCompany)
          this.form.ticketCompany = res.data.secondTiCompanyName; //开票信息-公司名称
        if(!this.form.ticketAddress)
          this.form.ticketAddress = res.data.secondTiBillingAddress; //开票信息_地址
        if(!this.form.leaderContactName)
          this.form.commonContactName = res.data.secondPartyContact; //经理-名字
        if(!this.form.ticketAccount)
          this.form.ticketAccount = res.data.secondTiBankAccout; //开票信息-开户账号
        if(!this.form.address)
          this.form.address = res.data.secondPartyAddress; //公司地址


          // const imgBlob = await request({
          //   url: res.data.electronicContract,
          //   method: 'get',
          // });
          // console.log(imgBlob);
      }
    },
    Downloadcontract(){
      if(this.cooperationMethod.id && this.form.agencyName!= ''){
        window.open(this.cooperationMethod.electronicContract,'_blank')
      }else if(!this.cooperationMethod.id && this.form.agencyName!= ''){
        throttleTipPop(this,'error','未找到此经销商的合同')
      }else{
        throttleTipPop(this,'error','请先输入经销商名称')
      }
    },
    // debounce(handleChangge, delay) {
    //   let timer
    //   return (...args) => {
    //     if (timer) {
    //       clearTimeout(timer)
    //     }
    //     timer = setTimeout(() => {
    //       func.apply(this, args)
    //     }, delay)
    //   }
    // },
    //获取销售管理员
    _getUserdata() {
      getUserdata().then(res => {
        this.userOptions = res.data.list;
      });
    },
    //点击查看合同
    open(url) {
      if(this.cooperationMethod.id && this.form.agencyName!= ''){
        this.$router.push({
            path: '/apply/index/dealerinformation',
            query: {
                id:this.cooperationMethod.id,
                checkDetail: true,
            },
          })
        this.picture = true;
      }else if(!this.cooperationMethod.id && this.form.agencyName!= ''){
        throttleTipPop(this,'error','未找到此经销商的合同')
      }else{
        throttleTipPop(this,'error','请先输入经销商名称')
      }
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
      this.$router.push({
        path:'/apply/index'
      });
    },
    handleAvatarSuccess(res, file) {
      this.form.businessLicense = res.data.domain + res.data.filePath;
    },
    handleAvatarSuccess2(res, file) {
      this.form.contract = res.data.domain + res.data.filePath;
    },
  },
  components: {
    contractdlog,
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
