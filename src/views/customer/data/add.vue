<template>
  <div class="margin dealerlist">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" :content="content"></el-page-header>
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
                  <el-input v-model="form.customerName" placeholder="请填写客户名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="客户编号:" prop="customerSn">
                  <el-input v-model="form.customerSn" placeholder="保存后自动生成" :disabled="true"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="共享给:" prop="sharedTo">
                  <el-select v-model="form.sharedTo" placeholder="请选择共享对象">
                    <el-option
                      v-for="item in sysuserOptions"
                      :key="item.sysuserId"
                      :label="item.sysuserName"
                      :value="item.sysuserName">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="公司网站:" prop="customerWebsite">
                  <el-input v-model="form.customerWebsite" placeholder="请输入公司网站"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5" v-if="state!=2">
                <el-form-item label="账户:" prop="sysuserAccount">
                  <el-input autocomplete="off" v-model="form.sysuserAccount" :disabled="state==2" placeholder="请填写账号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5" v-if="state!=2">
                <el-form-item label="密码:" prop="password">
                  <el-input autocomplete="off" readonly onfocus="this.removeAttribute('readonly');" onblur="this.setAttribute('readonly',true);"
                    v-model="form.password"
                    :disabled="state==2"
                    placeholder="请填写密码"
                    type="password"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="省份:" prop="province">
                  <el-select v-model="form.province" placeholder="请选择省份" @change="selectCountry">
                    <el-option
                      v-for="item in province_options"
                      :key="item.regionId"
                      :label="item.regionName"
                      :value="item.regionName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="城市:" prop="city">
                  <el-select v-model="form.city" placeholder="请选择城市">
                    <el-option
                      v-for="item in city_options"
                      :key="item.regionId"
                      :label="item.regionName"
                      :value="item.regionName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="行业大类:" prop="industryCategory">
                  <el-select
                    v-model="form.industryCategory"
                    filterable
                    placeholder="请选择行业大类"
                    @change="cateBig">
                    <el-option
                      v-for="item in industryCategory_options"
                      :key="item.id"
                      :label="item.industryName"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="行业小类:" prop="industrySubcategory">
                  <el-select v-model="form.industrySubcategory" filterable  placeholder="请选择行业小类">
                    <el-option
                      v-for="item in industrySubcategory_options"
                      :key="item.id"
                      :label="item.industryName"
                      :value="item.industryName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="公司地址:" prop="companyAddress">
                  <el-input v-model="form.companyAddress" placeholder="请填写公司地址"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="客户类型:" prop="businessType">
                  <el-select v-model="form.businessType" placeholder="请选择客户类型">
                    <el-option
                      v-for="item in businessType_options"
                      :key="item.dictionaryId"
                      :label="item.dictionaryName"
                      :value="item.dictionaryName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="客户等级:" prop="customerLevel">
                  <el-select v-model="form.customerLevel" placeholder="请选择客户等级">
                    <el-option
                      v-for="item in customerLevel_options"
                      :key="item.dictionaryId"
                      :label="item.dictionaryName"
                      :value="item.dictionaryName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="客户意向:" prop="intentionLevel">
                  <el-select v-model="form.intentionLevel" placeholder="请选择客户意向">
                    <el-option
                      v-for="item in intentionLevel_options"
                      :key="item.dictionaryId"
                      :label="item.dictionaryName"
                      :value="item.dictionaryName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="客户来源:" prop="customerSource">
                  <el-select v-model="form.customerSource" placeholder="请选择客户来源">
                    <el-option
                      v-for="item in customer_options"
                      :key="item.dictionaryId"
                      :label="item.dictionaryName"
                      :value="item.dictionaryName"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="联系周期:" prop="customerPeriod">
                  <el-date-picker
                    style="width:100%"
                    v-model="form.customerPeriod"
                    type="date"
                    valueFormat="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="销售管理员:" prop="adminId">
                  <el-select v-model="form.adminId" clearable placeholder="请选择">
                    <el-option
                      v-for="item in userOptions"
                      :key="item.sysuserId"
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
            <h4 class="title">联系人信息</h4>
            <el-row>
              <el-col :span="5">
                <el-form-item label="联系人:" prop="commonContactName">
                  <el-input v-model="form.commonContactName" placeholder="请填写联系人"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="部门:" prop="commonContactDept">
                  <el-input v-model="form.commonContactDept" placeholder="请填写部门名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="手机号码:" prop="commonContactPhone">
                  <el-input v-model="form.commonContactPhone" placeholder="请填写手机号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="办公电话:" prop="commonContactTel">
                  <el-input v-model="form.commonContactTel" placeholder="请填写办公电话" type="number"></el-input>
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
                <el-form-item label="QQ:" prop="commonContactQq">
                  <el-input v-model="form.commonContactQq" placeholder="请填写QQ号码" type="number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="出生年月:" prop="commonContactBirth">
                  <el-date-picker
                    style="width:100%"
                    v-model="form.commonContactBirth"
                    type="date"
                    valueFormat="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期"
                  ></el-date-picker>
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
                  <el-input v-model="form.leaderContactName" placeholder="请填写部门领导名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="手机号码:" prop="leaderContactPhone">
                  <el-input v-model="form.leaderContactPhone" placeholder="请填写手机号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="固定电话:" prop="leaderContactTel">
                  <el-input v-model="form.leaderContactTel" placeholder="请填写固定电话" type="number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="总机号码:" prop="leaderSwitchboard">
                  <el-input v-model="form.leaderSwitchboard" placeholder="请填写总机号码" type="number"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="微信号码:" prop="leaderContactWechat">
                  <el-input v-model="form.leaderContactWechat" placeholder="请填写微信号码"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="邮箱:" prop="leaderContactEmail">
                  <el-input v-model="form.leaderContactEmail" placeholder="请填写邮箱"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="QQ:" prop="leaderContactQq">
                  <el-input v-model="form.leaderContactQq" placeholder="请填写QQ"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="出生年月:" prop="leaderContactBirth">
                  <el-date-picker
                    style="width:100%"
                    v-model="form.leaderContactBirth"
                    type="date"
                    valueFormat="yyyy-MM-dd HH:mm:ss"
                    placeholder="选择日期"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="联系地址:" prop="leaderContactAddress">
                  <el-input v-model="form.leaderContactAddress" placeholder="请填写联系地址"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="家庭住址:" prop="leaderFamilyAddress">
                  <el-input v-model="form.leaderFamilyAddress" placeholder="请填写家庭住址"></el-input>
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
                  <el-input v-model="form.customerUnit" placeholder="请填写公司名称"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="税号:" prop="taxNumber">
                  <el-input v-model="form.taxNumber" placeholder="请填写税号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="注册电话:" prop="customerTel" >
                  <el-input v-model="form.customerTel" placeholder="请填写注册电话"  type="number"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="注册地址:" prop="customerAddress">
                  <el-input v-model="form.customerAddress" placeholder="请填写注册地址"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="5">
                <el-form-item label="开户银行:" prop="bankName">
                  <el-input v-model="form.bankName" placeholder="请填写开户银行"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="银行账号:" prop="bankAccount">
                  <el-input v-model="form.bankAccount" placeholder="请填写银行账号"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="5">
                <el-form-item label="传真号码:" prop="faxNumber">
                  <el-input v-model="form.faxNumber" placeholder="请填写传真号码"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="20">
                <el-form-item label="备注:" prop="remark">
                  <el-input v-model="form.remark" placeholder="请填写备注信息"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div class="btn">
            <el-button type="danger" @click="back" size="small">取消</el-button>
            <el-button type="primary" @click="submitForm('form')" size="small">确定</el-button>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { getCategory, getStoreList } from "@/api/public";
import { getUserPage, toUserList } from "@/api/permissions/index";
import {
  customerDetailByid,
  addCustomer,
  editCustomer,
  exitsCustomer,
  getindustrySubcategory,
  changegetindustrySubcategory,
  getindustryCategory,
  getCustomersoure,
  getintentionLevel,
  getbusinessType,
  getCustomerLevel,
  getprovince,
  getcity,
  queryIndustryList,
  queryIndustryDetail
} from "@/api/customer/index";
import {
  repeatAcount } from "@/api/supplier/index";
import { getUserdata } from "@/api/apply/index";
export default {
  data() {
    var validateaccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        if (this.form.sysuserAccount !== "") {
          if (value.length < 4 || value.length > 20) {
            return callback(new Error("长度在4-20位"));
          }
          const reg = /^[\u4E00-\u9FA5\uf900-\ufa2d\w\-]{4,20}$/;
          console.log(reg.test(value));
          if (!reg.test(value)) {
            return callback(new Error("不能有空格，特殊字符"));
          }
          repeatAcount(this.form.sysuserAccount).then(res => {
            if (res.code === 200) {
              callback();
            } else {
              callback(new Error("该账号已存在"));
            }
          });
        }
      }
    };
    var customerNamefunc = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入客户名称"));
      } else {
        if (value.length < 4 || value.length > 20) {
          return callback(new Error("长度在4-20位"));
        }
        const reg = /^[\u4E00-\u9FA5\uf900-\ufa2d\w\-]{4,20}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          if (this.form.customerName == this.form.oldCustomerName) {
            callback();
          } else {
            exitsCustomer(this.form.customerName).then(res => {
              if (res.code === 200) {
                callback();
              } else {
                callback(new Error("该客户已存在"));
              }
            });
          }
        } else {
          return callback(new Error("不能有空格，特殊字符"));
        }
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入手机号码"));
      } else {
        const reg = /^1[3|4|5|6|7|8|9]\d{9}$/
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      sysuserOptions:[],
      userOptions: [],
      state:'',
      content: "客户资料信息",
      industryCategory_options: [], //行业大类
      industrySubcategory_options: [], //行业小类
      city_options: [], //市
      province_options: [], //省
      customerLevel_options: [], //客户等级
      businessType_options: [], //客户经营类型
      customer_options: [], //客户来源
      intentionLevel_options: [], //客户意向
      customerId: "", //客户Id
      form: {
        oldCustomerName: "", //客户名称
        customerName: "", //客户名称
        customerSn: "", //客户编号
        sharedTo: "", //共享
        customerWebsite: "", //公司网址
        sysuserAccount: "", //账号
        password: "", //密码
        province: "", //省
        city: "", //市
        industryCategory: "", //行业大类
        industrySubcategory: "", //行业小类
        companyAddress: "", //公司地址
        businessType: "", //客户类型
        customerLevel: "", //客户等级
        intentionLevel: "", //客户意向
        customerSource: "", //客户来源
        salesRepresentative: "", //销售代表
        customerPeriod: "", //周期
        commonContactName: "", //联系人
        commonContactDept: "", //部门
        commonContactPhone: "", //联系人手机
        commonContactTel: "", //办公电话
        commonContactWechat: "", //微信
        commonContactEmail: "", //邮箱
        commonContactQq: "", //QQ
        commonContactBirth: "", //生日
        leaderContactName: "", //部门领导名字
        leaderContactPhone: "", //领导手机
        leaderContactTel: "", //固定电话
        leaderSwitchboard: "", //总机号码
        leaderContactWechat: "", //微信
        leaderContactEmail: "", //邮箱
        leaderContactQq: "", //QQ
        leaderContactBirth: "", //生日
        leaderContactAddress: "", //联系地址
        leaderFamilyAddress: "", //家庭地址
        customerUnit: "", //公司名称
        taxNumber: "", //税号
        customerTel: "", //注册电话
        customerAddress: "", //注册地址
        bankName: "", //开户银行
        bankAccount: "", //银行账号
        faxNumber: "", //传真号码
        remark: "", //备注
        adminId: "" //销售管理员
      },
      rules: {
        customerName: [
          { required: true, validator: customerNamefunc, trigger: "blur" }
        ],
        sysuserAccount: [
          { required: true, validator: validateaccount,  trigger: "blur" }
        ],
        password: [
          { required: true, message: "请填写密码", trigger: "blur" },
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' }
        ],
        province: [{ required: true, message: "请选择省份", trigger: "change" }],
        adminId: [{ required: true, message: "请选择销售管理员", trigger: "change" }],
        city: [{ required: true, message: "请选择城市", trigger: "change" }],
        industryCategory: [
          { required: true, message: "请选择行业大类", trigger: "change" }
        ],
        industrySubcategory: [
          { required: true, message: "请选择行业小类", trigger: "change" }
        ],
        companyAddress: [
          { required: true, message: "请填写公司地址", trigger: "blur" }
        ],
        businessType: [
          { required: true, message: "请选择客户类型", trigger: "change" }
        ],
        customerLevel: [
          { required: true, message: "请选择客户等级", trigger: "change" }
        ],
        intentionLevel: [
          { required: true, message: "请选择客户意向", trigger: "change" }
        ],
        customerSource: [
          { required: true, message: "请选择客户来源", trigger: "change" }
        ],
        customerPeriod: [
          { required: true, message: "请选择联系周期", trigger: "change" }
        ],
        salesRepresentative: [
          { required: true, message: "请选择销售代表", trigger: "change" }
        ],
        commonContactName: [
          { required: true, message: "请填写联系人姓名", trigger: "change" }
        ],
        commonContactDept: [
          { required: true, message: "请填写部门", trigger: "change" }
        ],
        commonContactPhone: [
          { required: true, validator: checkPhone, trigger: "change" }
        ],
        commonContactTel: [
          { required: true, message: "请填写办公电话", trigger: "change" }
        ],
        commonContactWechat: [
          { required: true, message: "请填写微信号", trigger: "change" }
        ],
        leaderContactEmail: [
          { required: false, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        commonContactEmail: [
          { required: true, message: "请输入邮箱地址", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        leaderContactName: [
          { required: true, message: "请填写部门领导名称", trigger: "change" }
        ],
        leaderContactPhone: [
          { required: true, validator: checkPhone, trigger: "change" }
        ],
        leaderContactTel: [
          { required: true, message: "请填写固定电话", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
    this._getindustryCategory();
    // this._smallgetindustryCategory();
    this._getprovince();
    this._getCustomerLevel();
    this._getbusinessType();
    this._getintentionLevel();
    this._getCustomersoure();
    this._getUserdata();
    this._getUserPage()
    if (this.$route.query.id) {
      this.state = this.$route.query.state;
      this.customerId = this.$route.query.id;
      this.content = "客户资料信息 > 编辑";
      customerDetailByid(this.customerId).then(res => {
        this.form.oldCustomerName = res.data.customerName; //客户名称
        this.form.customerName = res.data.customerName; //客户名称
        this.form.customerSn = res.data.customerSn; //客户编号
        this.form.sharedTo = res.data.sharedTo; //共享
        this.form.customerWebsite = res.data.customerWebsite; //公司网址
        this.form.sysuserAccount = res.data.sysuserAccount; //账号
        this.form.password = res.data.password; //密码
        this.form.province = res.data.province; //省
        this.form.city = res.data.city; //市
        this.form.adminId = res.data.adminId; //销售管理员
        this.form.industryCategory = res.data.industryCategory; //行业大类
        this.form.industrySubcategory = res.data.industrySubcategory; //行业小类
        this.form.companyAddress = res.data.companyAddress; //公司地址
        this.form.businessType = res.data.businessType; //客户类型
        this.form.customerLevel = res.data.customerLevel; //客户等级
        this.form.intentionLevel = res.data.intentionLevel; //客户意向
        this.form.customerSource = res.data.customerSource; //客户来源
        this.form.salesRepresentative = res.data.salesRepresentative; //销售代表
        this.form.customerPeriod = res.data.customerPeriod; //周期
        this.form.commonContactName = res.data.commonContactName; //联系人
        this.form.commonContactDept = res.data.commonContactDept; //部门
        this.form.commonContactPhone = res.data.commonContactPhone; //联系人手机
        this.form.commonContactTel = res.data.commonContactTel; //办公电话
        this.form.commonContactWechat = res.data.commonContactWechat; //微信
        this.form.commonContactEmail = res.data.commonContactEmail; //邮箱
        this.form.commonContactQq = res.data.commonContactQq; //QQ
        this.form.commonContactBirth = res.data.commonContactBirth; //生日
        this.form.leaderContactName = res.data.leaderContactName; //部门领导名字
        this.form.leaderContactPhone = res.data.leaderContactPhone; //领导手机
        this.form.leaderContactTel = res.data.leaderContactTel; //固定电话
        this.form.leaderSwitchboard = res.data.leaderSwitchboard; //总机号码
        this.form.leaderContactWechat = res.data.leaderContactWechat; //微信
        this.form.leaderContactEmail = res.data.leaderContactEmail; //邮箱
        this.form.leaderContactQq = res.data.leaderContactQq; //QQ
        this.form.leaderContactBirth = res.data.leaderContactBirth; //生日
        this.form.leaderContactAddress = res.data.leaderContactAddress; //联系地址
        this.form.leaderFamilyAddress = res.data.leaderFamilyAddress; //家庭地址
        this.form.customerUnit = res.data.customerUnit; //公司名称
        this.form.taxNumber = res.data.taxNumber; //税号
        this.form.customerTel = res.data.customerTel; //注册电话
        this.form.customerAddress = res.data.customerAddress; //注册地址
        this.form.bankName = res.data.bankName; //开户银行
        this.form.bankAccount = res.data.bankAccount; //银行账号
        this.form.faxNumber = res.data.faxNumber; //税号
        this.form.remark = res.data.remark; //备注
      });
    }
  },
  mounted() {},
  methods: {
    //获取用户
    async _getUserPage(){
      let obj = {}
      obj.current_page = 1
      obj.page_size = 0
      let data = await toUserList(obj)
      this.sysuserOptions = data.data.list
    },
    //获取销售管理员
    _getUserdata() {
      getUserdata().then(res => {
        this.userOptions = res.data.list;
      });
    },
    selectCountry(val) {
      let list = this.province_options || [];
      let parentId = null;
      list.forEach(value => {
        if (value.regionName == val) {
          parentId = value.regionId;
        }
      });
      getcity(parentId).then(res => {
        this.city_options = res.data.list;
      });
      // this.city_options = res.data
    },
    //根据大类查小类
    async cateBig(selVal) {
      console.log(selVal)
      let list = this.industryCategory_options || [];
      let parentId = null;
      list.forEach(value => {
        if (value.id == selVal) {
          parentId = value.id;
        }
      });
      console.log(parentId)
      const { data } = await queryIndustryDetail(parentId);
      this.industrySubcategory_options = data;
    },
    //获取行业大类
    async _getindustryCategory() {
      const { data } = await getindustryCategory(2);
      this.industryCategory_options = data;
    },
    //获取行业小类
    // _smallgetindustryCategory() {
    //   let industryLevel = 3;
    //   getindustryCategory(industryLevel).then(res => {
    //     this.industrySubcategory_options = res.data;
    //   });
    // },
    //获取省
    _getprovince() {
      getprovince().then(res => {
        this.province_options = res.data.list;
      });
    },
    //获取客户等级
    _getCustomerLevel() {
      getCustomerLevel().then(res => {
        this.customerLevel_options = res.data;
      });
    },
    //获取客户经营类型
    _getbusinessType() {
      getbusinessType().then(res => {
        this.businessType_options = res.data;
      });
    },
    //获取客户来源
    _getCustomersoure() {
      getCustomersoure().then(res => {
        this.customer_options = res.data;
      });
    },
    //获取客户意向
    _getintentionLevel() {
      getintentionLevel().then(res => {
        this.intentionLevel_options = res.data;
      });
    },
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this._addCustomer();
        } else {
          this.$notify({
            type: "warning",
            message: "请填写完整信息"
          });
          return false;
        }
      });
    },

    _addCustomer() {
      if (this.customerId) {
        editCustomer(this.form, this.customerId).then(res => {
          if (res.code == 200) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.$router.push({ name: "Data" });
          }
        });
      } else {
        addCustomer(this.form).then(res => {
          if (res.code == 200) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.$router.push({ name: "Data" });
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
