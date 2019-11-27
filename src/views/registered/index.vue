<template>
  <div>
    <el-row class="topdiv">
        <el-col :span="7" class="img"><img src="../../common/images/logo.png" alt=""></el-col>
        <el-col :span="9"  class="img"><span @click="main">首页</span></el-col>
        <el-col :span="3"  class="img"><span @click="registered">入驻申请</span></el-col>
    </el-row>
    <div class=" supplier-apply-wrapper" style="background: #f7faff;">
      <div class="mbottom" style="padding: 20px;padding-top: 40px;">
        <el-steps :active="active" align-center>
          <el-step title="信息填写"></el-step>
          <el-step title="提交"></el-step>
          <el-step title="等待审核"></el-step>
        </el-steps>
      </div>
      <div class="goods-fitter">
          <el-form
          :model="personalForm"
          ref="personalForm"
          :rules="personalRules"
          class="form"
          label-width="150px"
          size="medium"
          v-if="active===1"
        >
      <div  style="width:1200px;margin: 0 auto;">
            <div class="search-wrapper">
            <h4 class="title">供应商信息</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="7">
                    <el-form-item label="供应商名称：" prop="supplierName">
                      <el-input v-model="personalForm.supplierName"  placeholder="请填写供应商名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="公司性质：" prop="supplierNature">
                      <el-select v-model="personalForm.supplierNature" placeholder="请选择公司性质">
                        <el-option
                          v-for="item in company_options"
                          :key="item.dictionaryName"
                          :label="item.dictionaryName"
                          :value="item.dictionaryName">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="公司地址：" prop="address">
                      <el-input v-model="personalForm.address"  placeholder="请填写公司地址"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                    <el-form-item label="登录账号" prop="account">
                      <el-input v-model="personalForm.account" autocomplete="new-password" placeholder="请填写登录账号" ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="密码" prop="pass">
                      <el-input v-model="personalForm.pass"  autocomplete="new-password" placeholder="请填写密码" type="password"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                  <el-form-item label="确认密码" prop="checkPass">
                    <el-input v-model="personalForm.checkPass" placeholder="请再次输入密码" type="password"></el-input>
                  </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                    <el-col :span="7">
                        <el-form-item label="公司网址：" prop="compony_url">
                        <el-input v-model="personalForm.compony_url" placeholder="请填写公司网址"></el-input>
                        </el-form-item>
                    </el-col>
                  <el-col :span="7">
                    <el-form-item label="代理品牌：" prop="agency_branch">
                      <el-input v-model="personalForm.agency_branch" placeholder="请填写代理品牌"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="主营商品：" prop="main_product">
                      <el-input v-model="personalForm.main_product" placeholder="请填写主营商品"></el-input>
                    </el-form-item>
                  </el-col>
                  </el-row>
                  <el-row>
                  <el-col :span="7">
                    <el-form-item label="支持一件代发" prop="wholesale">
                      <el-select v-model="personalForm.wholesale">
                        <el-option label="是" value="1"></el-option>
                        <el-option label="否" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="税率：" prop="taxRate">
                      <el-select v-model="personalForm.taxRate">
                        <el-option label="0%" value="0"></el-option>
                        <el-option label="3%" value="3"></el-option>
                        <el-option label="5%" value="5"></el-option>
                        <el-option label="7%" value="7"></el-option>
                        <el-option label="9%" value="9"></el-option>
                        <el-option label="13%" value="13"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="API对接：" prop="api">
                      <el-select v-model="personalForm.api">
                        <el-option label="否" value="0"></el-option>
                        <el-option label="是" value="1"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12" class="multiselect">
                     <el-form-item label="入驻品类：" prop="supplier_name" ref="categoryref">
                       <treeselect
                          :multiple="true"
                          :flat="true"
                          :limit="3"
                          :default-expand-level="1"
                          v-model="personalForm.supplier_name"
                          style="width: 95%;"
                          :options="categoryList"
                          placeholder="请选择入驻品类："
                          :clearable="false"
                          @input="categoryfunc"
                        />
                        <!-- <el-cascader
                          v-model="personalForm.casarr"
                          collapse-tags
                          :options="categoryList"
                          @change="categoryfunc"
                          :show-all-levels="false"
                          :props="{ multiple: true, checkStrictly: true}"
                          clearable
                        ></el-cascader> -->
                      </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="21">
                    <el-form-item label="备注：" prop="note">
                      <el-input v-model="personalForm.remark"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
        </div>
        <div class="goods-fitter mar_top" style="width:1200px;margin: 0 auto;" v-if="active===1">
            <div class="search-wrapper mar_top">
              <h4 class="title">联系人信息</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="7">
                    <el-form-item label="联系人：" prop="contactName">
                      <el-input v-model="personalForm.contactName" placeholder="请填写联系人名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="部门：" prop="department">
                      <el-input v-model="personalForm.department" placeholder="请填写部门名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="手机号码：" prop="mobile">
                      <el-input v-model="personalForm.mobile" placeholder="请填写手机号码"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="7">
                    <el-form-item label="QQ：" prop="qq">
                      <el-input v-model="personalForm.qq" placeholder="请填写QQ号码"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="固定电话：" prop="phone">
                      <el-input v-model="personalForm.phone" placeholder="请填写固定电话"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="邮箱：" prop="email">
                      <el-input v-model="personalForm.email" placeholder="请填写邮箱"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="7">
                    <el-form-item label="出生日期：" prop="birthday">
                      <el-date-picker
                        v-model="personalForm.born"
                        valueFormat='yyyy-MM-dd HH:mm:ss'
                        type="date"
                        placeholder="选择日期">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="微信号：" prop="weixin">
                      <el-input v-model="personalForm.weixin" placeholder="请填写微信号"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="订单处理人手机：" prop="order_mobile">
                      <el-input v-model="personalForm.order_mobile" placeholder="请填写订单处理人手机"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="7">
                    <el-form-item label="订单处理人邮箱：" prop="order_email">
                      <el-input v-model="personalForm.order_email" placeholder="请填写订单处理人邮箱"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="订单处理人微信：" prop="order_wx">
                      <el-input v-model="personalForm.order_wx" placeholder="请填写订单处理人微信"></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
        </div>
        <div class="goods-fitter mar_top" style="width:1200px;margin: 0 auto;" v-if="active===1">
            <div class="search-wrapper mar_top">
              <h4 class="title">资质证件</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="营业执照：" prop="BL_image_id" ref="imgload">
                      <el-upload
                        accept=".jpg,.png,.gif,.JPG,.JPEG,.PBG,.GIF,"
                        class="avatar-uploader"
                        :action="action"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        >
                        <img v-if="personalForm.BL_image_url" :src="personalForm.BL_image_url" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                  </el-col>
                </el-row>
                <el-row class="row_top">
                  <el-form-item label="营业执照有效期：" prop="brand_time">
                    <el-date-picker
                      v-model="personalForm.brand_time"
                      type="daterange"
                      align="right"
                      unlink-panels
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      format="yyyy-MM-dd"
                      value-format="yyyy-MM-dd HH:mm:ss">
                    </el-date-picker>
                  </el-form-item>
                </el-row>
              </div>
            </div>
        </div>
        <div class="el_btn">
            <el-button type="danger"  size="small">取消</el-button>
            <el-button type="primary"  size="small" @click="submitCompany">提交</el-button>
        </div>
        <!-- <div class="image-wrapper" v-if="active===3">
        <img :src="require('@/common/images/apply-success.png')" alt />
        <p>审核成功</p>
        </div>-->
        </el-form>
         <!--step 3-->
         <div v-if="active===3" class="Covered ">
           <div class="image-wrapper"  v-if ="showstate ===1">
            <img :src="require('@/common/images/apply-await.png')" alt />
            <p>审核中</p>
          </div>
          <div class="image-wrapper" v-if =" showstate ===2">
            <img :src="require('@/common/images/apply-noway.png')" alt />
            <p>审核未通过</p>
            <p class="reason">{{meg}}</p>
          </div>
          <div class="image-wrapper" v-if =" showstate ===3">
            <img :src="require('@/common/images/apply-success.png')" alt />
            <p>审核成功</p>
          </div>
         </div>
      </div>
    </div>
  </div>
</template>

<script>
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import { supplierApplyPostin ,repeat, repeatAcount ,whyFailure , getNature} from '@/api/supplier/index'
import { deletePicture } from '@/api/registered/index'
import { throttleTipPop } from '@/utils/throttle'
import { getTreecatagory } from "@/api/product/index";
import encryption from "@/common/js/encryption";

export default {
  data () {
    var checkPhone = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('请输入手机号码'));
        } else {
          const reg = /^1[3|4|5|6|7|8|9]\d{9}$/
          console.log(reg.test(value));
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error('请输入正确的手机号'));
          }
        }
      };
    var validateaccount = (rule,value,callback) =>{
      if(value === ''){
        callback(new Error('请输入账号'))
      } else {
        if (this.personalForm.account !== '') {
          repeatAcount(this.personalForm.account).then(res => {
            if(res.code === 200){
              callback()
            }else{
              callback(new Error('该账号已存在'))
            }
          })
        }
      }
    }
    var companyaccount = (rule,value,callback) =>{
      if (!value) {
        return callback(new Error("请填写"));
      } else {
        if (value.length < 4 || value.length > 20) {
          return callback(new Error("长度在4-20位"));
        }
        const reg = /^[\u4E00-\u9FA5\uf900-\ufa2d\w\-]{4,20}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
	        repeat(value).then(res => {
		        if (res.code === 200) {
			        callback();
		        } else {
			        callback(new Error("该名称已存在"));
		        }
	        });
        } else {
          return callback(new Error("不能有空格，特殊字符"));
        }
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.personalForm.checkPass !== '') {
          this.$refs.personalForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.personalForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      action: '',
      active: 1,
      meg:'',
      dialogVisible:false,
      showstate: 1,
      categoryList: [], // 分类
      arrurl:[], //供应链多选
      categoryArr:[], //品类名称数组
      personalForm: {
        casarr:[],
        supplierName:'', //供应商名称
        supplierNature:'', //公司性质
        address:'', //公司地址
        compony_url:'', //公司网址
        account: '', // 账号
        pass: '', // 密码
        checkPass: '', // 确认密码
        agency_branch: '', // 代理品牌
        main_product:'', //主营商品
        wholesale: '1', // 支持一件代发: '1' 是 ， ‘2’ 否
        taxRate:'13%', //税率
        api:'0', //api对接
        category:'', //入驻品类
        supplier_name:[], //品类名称
        remark:'', //备注
        contactName:'', //联系人
        department:'', //部门
        mobile: '', // 手机
        qq: '', // QQ号
        phone: '', // 固定电话
        email:'', //邮箱
        weixin:'', //微信号
        born:'', //出生日期
        order_mobile: '', // 订单处理人手机
        order_email: '', // 订单处理人邮箱
        order_wx:'', //订单处理人微信
        wx:'',
        BL_image_url: '', // 营业执照图片地址
        BL_image_id: '', // 营业执照图片id
        brand_time: [], // 商标有效期
      },
      personalRules: {
        supplierNature: [{ required: true, message: '请填写公司性质', trigger: 'change' }],
        address: [{ required: true, message: '请填写公司地址', trigger: 'blur' }],
        compony_url: [{ required: true, message: '请填写公司网址', trigger: 'blur' }],
        account: [{ required: true, validator: validateaccount, trigger: 'blur' }],
        pass: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { min: 5, max: 16, message: '密码长度在 5 到 16 个字符', trigger: 'blur' }
        ],
        checkPass: [{ required: true, validator: validatePass2, trigger: 'blur' }],
        mobile: [{ required: true, message: '请填写联系人手机号', trigger: 'blur' }],
        qq: [{ required: true, message: '请填写QQ号码', trigger: 'blur' }],
        wholesale: [{ required: true, message: '请选择是否支持一件代发', trigger: 'blur' }],
        taxRate: [{ required: true, message: '请选择税率', trigger: 'blur' }],
        casarr:[{type: 'array', required: true, message: '请选择入驻品类', trigger: 'blur'  }], //入驻品类
        api: [{ required: true, message: '请填写api对接',trigger: 'blur'  }], // api对接
        agency_branch: [{ required: true, message: '请填写代理品牌',trigger: 'blur'  }], // 代理品牌
        main_product: [{ required: true, message: '请填写主营产品',trigger: 'blur'  }], // 主营产品
        supplier_name: [{type: 'array', required: true, message: '请选择入驻品类',trigger: 'blur'  }], // 品类名称
        contactName:[{ required: true, message: '请输入联系人姓名', trigger: 'blur' }],
        department:[{ required: true, message: '请输入部门名称', trigger: 'blur' }],
        qq:[{ required: true, message: '请填写QQ号', trigger: 'blur' }],
        mobile:[{ required: true, validator: checkPhone , trigger: 'blur' }],
        supplierName: [{ required: true,validator: companyaccount, trigger: 'blur' }],
        address: [{ required: true, message: '请填写公司地址', trigger: 'blur'  }],
         branch: [{ required: true, message: '请填写自营品牌', trigger: 'blur'  }], // 自营品牌
        phone: [{ required: true, message: '请填写固定电话', trigger: 'blur' }],
        email: [
          { required: true, message: '请填写邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
          ],
        BL_image_id: [{ required: true, message: '请上传营业执照', trigger: 'blur'}],
        brand_time: [{ required: true, message: '请填写营业执照有效期', trigger: 'blur'  }],
        order_name: [{ required: true, message: '请填写订单处理人姓名', trigger: 'blur' }],
        order_mobile: [{ required: true, validator: checkPhone , trigger: 'blur' }],
        order_wx: [{ required: true, message: '请填写订单处理人微信', trigger: 'blur' }],
        order_email: [
          { required: true, message: '请填写订单处理人邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
      },
      company_options:[], //公司性质
    }
  },
  mounted(){
    this.action = this.baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile?'
    if( this.$route.params.state == 0){
      this.active = 3
      this.showstate = 1
    }
    if( this.$route.params.state == 1){
      this.active = 3
      this.showstate = 2
      whyFailure().then( res =>{
        this.meg  = this.meg + res.data.remark
      })
    }
    this._getNature()
    this._getCatagory()
  },
  components:{
    Treeselect
  },
  methods: {
    //获取公司性质
    _getNature(){
      getNature().then(res => {
        this.company_options = res.data
      })
    },
    //获取商品分类
    _getCatagory() {
      let obj = {};
      obj.type = "SELECT";
      obj.id = 0;
      getTreecatagory(obj).then(res => {
        res.data.forEach((item)=>{
          if(item.children){
            item.children.forEach((it)=>{
              it.children=null;
            })
          }
        })
        this.transleteData(res.data, this.categoryList);
        this.IterationDelateMenuChildren(this.categoryList);
      });
    },
    transleteData(data, arr) {
      data.forEach(item => {
        const msg = {
          id: item.catId,
          label: item.catName,
          value: item.catId,
          children: item.children ? [] : null,
          isLeaf: item.children ? false : true
        };
        if (item.children && item.children.length > 0) {
          this.transleteData(item.children, msg.children);
        }
        arr.push(msg);
      });
      return arr;
    },
    IterationDelateMenuChildren(arr) {
      if (arr.length) {
        for (let i in arr) {
          if (arr[i].children.length) {
            this.IterationDelateMenuChildren(arr[i].children);
          } else {
            delete arr[i].children;
          }
        }
      }
      return arr;
    },
    back(){
      this.active = 1
    },
    main () {
      this.$router.push({ name: 'login' })
    },
    categoryfunc(val){
      console.log(val)
      // this.personalForm.casarr = val
      this.$refs.categoryref.clearValidate();
      // this.categoryArr = val;
      // this.personalForm.supplier_name = this.categoryArr.join(",")
    },
    //点击打开图片
    open(){
      window.open('img/authorization.d6682f5a.png', '_blank', ' width=900, height=700')
    },
    registered () {
      this.active = 1
      this.$router.push({ name: 'registered' })
    },
    submitPersonal () {
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
          this.active = 2
        } else {
          throttleTipPop(this,'error','请填写完整信息')
          return false
        }
      })
    },
    submitCompany () {
      this.$refs.personalForm.validate((valid) => {
        if (valid) {
              this._supplierApplyPost()
        } else {
          throttleTipPop(this,'error','请填写完整信息')
          return false
        }
      })
    },
    handleAvatarSuccess (res, file) {
      this.$refs.imgload.clearValidate();
      this.personalForm.BL_image_url = res.data.domain+res.data.filePath
      this.personalForm.BL_image_id = res.data.domain
    },
    handleRCSuccess (res, file) {
      this.companyForm.RC_image_url = res.data.domain+res.data.filePath
      this.companyForm.RC_image_id = res.data.domain
    },
    handleBASuccess (res, file) {
      this.companyForm.BA_image_url = res.data.domain+res.data.filePath
      this.companyForm.BA_image_id = res.data.domain
    },
    handleBCSuccess (res, file) {
      this.companyForm.BC_image_url = res.data.domain+res.data.filePath
      this.companyForm.BC_image_id = res.data.domain
    },
    handleBCSuccess1 (res, file) {
      this.arrurl.push({url:res.data.domain+res.data.filePath,id:res.data.domain})
      this.companyForm.BC_image_id = res.data.domain
      var str = ''
      this.arrurl.forEach((item,index)=>{
        if(index == this.arrurl.length-1){
          str += item.url
          return
        }
        str += item.url+','
      })
      this.companyForm.BC_image_url = str
      // this.companyForm.BC_image_id = res.data.file_id
    },
     handleRemove(file, fileList) {
       deletePicture(file.name).then(res => {
       })
    },
    beforeAvatarUpload (file) {
      // const isJPG = file.type === 'image/jpeg'
      // const isLt2M = file.size / 1024 / 1024 < 2

      // if (!isJPG) {
      //   this.$message.error('上传图片只能是 JPG 格式!')
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传图片大小不能超过 2MB!')
      // }
      // return isJPG && isLt2M
    },
    _supplierApplyPost () {
      let data = {}
      data.personalForm = {...this.personalForm};
      data.personalForm.pass = encryption.encrypt(
        data.personalForm.pass,
        "_fuyuanai@Maige_"
      );
      data.personalForm.checkPass = encryption.encrypt(
        data.personalForm.checkPass,
        "_fuyuanai@Maige_"
      );
      // data.personalForm.supplier_name = data.personalForm.casarr.join(',')
      supplierApplyPostin(data).then(res => {
        if(res.code == 200){
          this.active = 3
          this.showstate = 1
          this.$message({
          message: res.message,
          type: 'success'
        });
        }else{
          throttleTipPop(this,'error',res.message)
        }
      })
    }
  },
}
</script>

<style lang='scss' scoped>
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
  .el-date-picker{
    max-width: 240px;
    margin-right: 5px;
  }

.topdiv{
    height: 92px;
    display: flex;
    align-items: center;
    border-bottom:2px solid rgba(83,173,255,1);
    .img{
        text-align: right;
        font-size:18px;
        font-family:MicrosoftYaHei;
        font-weight:400;
        color:rgba(51,51,51,1);
        cursor: pointer;
    }
    span{
      font-weight: bold;
    }
}
.image-wrapper {
  padding: 20px;
  text-align: center;
  img {
    margin-bottom: 20px;
    width: 180px;
    margin-top: 50px;
  }
}
.supplier-apply-wrapper {
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
.mbottom {
  display: flex;
  justify-content: center;
}
.el-steps--horizontal {
  white-space: nowrap;
  width: 70%;
}
.reason{
  margin-top: 20px;
  color: red;
}
.el-upload {
    display: inline-block;
    text-align: center;
    cursor: pointer;
    outline: none;
    border: 1px dashed #d9d9d9 !important;
}
.mar_top{
  margin-top: 20px;
}
.el_btn{
  padding: 20px;
  text-align: center;
  width: 100%;
}
.Covered{
    position: absolute;
    left: 0;
    right: 0;
    top: 208px;
    bottom: 0;
    background: rgb(247, 250, 255);
}
/deep/ .multiselect .el-form-item--medium .el-form-item__content, .el-form-item--medium .el-form-item__label{
  line-height: 16px;
}
/deep/ .vue-treeselect__multi-value-item{
  padding: 4px 0;
}
</style>
