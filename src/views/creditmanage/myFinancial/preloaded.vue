<template>
  <div class="margin">
     <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper"> 
            <el-page-header @back="back" content="预充值账户>查看明细"></el-page-header>
          </div>
        </div>
      </div>
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
             <el-form label-width="120px" size="small">
                  <el-row>
             <el-col :span="6">
                  <el-col>
                   <el-form-item label="支付方式：">
                      <el-select v-model="payType" clearable placeholder="请选择支付方式">
                        <el-option label="微信支付" value="wxpay_native"></el-option>
                        <el-option label="支付宝" value="alipay_qr"></el-option>
                        <el-option label="网上银行" value="e-bank"></el-option>
                        <el-option label="公司转账" value="bank_transfer"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-col>
                 <el-col :span="6">
                  <el-col>
                   <el-form-item label="支付状态：">
                      <el-select v-model="payStatus" clearable placeholder="请选择支付状态">
                        <el-option label="待支付" value="0"></el-option>
                        <el-option label="支付中" value="1"></el-option>
                        <el-option label="支付成功" value="2"></el-option>
                        <el-option label="支付失败" value="3"></el-option>
                        <el-option label="取消支付" value="4"></el-option>
                        <el-option label="支付超时" value="5"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="6">
                  <el-col>
                    <el-form-item label="订单号：">
                      <el-col :span="23">
                        <el-input  v-model="paymentOrderNo" placeholder="请输入订单号">
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
              </el-row>
              <el-row>   
                <el-col :span="10" style="width: auto !important;">
                      <el-form-item label="支付时间：">
                        <el-col>
                          <el-date-picker
                            @change="handlecreateTime" 
                            type=daterange
                            valueFormat='yyyy-MM-dd HH:mm:ss'
                            v-model="createTime"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                          </el-date-picker>
                        </el-col>
                      </el-form-item>
                  </el-col>
                <el-col :span="2" style='text-align: center;'>
                        <el-button type="primary" size="small" @click="handelSearchGoods">搜索</el-button>
                </el-col>
                <el-col :span="1" style='text-align: center;'>
                        <el-button type="primary" size="small" @click="reset">重置</el-button>
                </el-col>
              </el-row>       
             </el-form>
            </div>
          </div>
        </el-form>
      </div>
    </div>
   
    <div class="mcard">
         <el-table :data="noticeList" stripe  border>
          <el-table-column  type="index" align="center" width="50"></el-table-column>
          <el-table-column label="服务商"  align="center" prop="">
             <template slot-scope="scope">
                 <div v-if="merchantName ==0">{{scope.row.agencyName}}</div>
                 <div v-else-if="merchantName ==1">{{scope.row.customerName}}</div>
             </template>
          </el-table-column>
          <el-table-column label="充值人"  align="center" prop="userName"></el-table-column>
          <el-table-column label="联系电话"  align="center" prop="telephone"></el-table-column>
          <el-table-column label="充值金额"  align="center" prop="rechargeAmount"></el-table-column>
          <el-table-column label="支付方式"  align="center" prop="payType">
              <template slot-scope="scope">
                <div v-if="scope.row.payType == 'wxpay_native'">微信扫码支付</div>
                <div v-else-if="scope.row.payType == 'alipay_qr'">支付宝扫码支付</div>
                <div v-else-if="scope.row.payType == 'e-bank'">网银支付</div>
                <div v-else-if="scope.row.payType == 'bank_transfer'">公司转账</div>
            </template>
          </el-table-column>
          <el-table-column label="付款开户行"  align="center" prop="bankType"></el-table-column>
          <el-table-column  label="支付账号"  align="center"  prop="bankAccount"></el-table-column>
          <el-table-column label="支付状态" align="center" prop="payStatus">
               <template slot-scope="scope">
                <div v-if="scope.row.payStatus == '0'">待支付</div>
                <div v-else-if="scope.row.payStatus == '1'">支付中</div>
                <div v-else-if="scope.row.payStatus == '2'">支付成功</div>
                <div v-else-if="scope.row.payStatus == '3'">支付失败</div>
                <div v-else-if="scope.row.payStatus == '4'">取消支付</div>
                <div v-else-if="scope.row.payStatus == '5'">支付超时</div>
              </template>
          </el-table-column>
          <el-table-column label="支付时间"  align="center" prop="payTime"></el-table-column>
          <el-table-column label="支付单号"  align="center" prop="paymentOrderNo"></el-table-column>
          <el-table-column label="支付票据" align="center" prop="paymentBill" width="200px">
              <template slot-scope="scope">
                  <div v-if="scope.row.paymentBill">
                     <img  :src="scope.row.paymentBill" @click="scalePic(scope.row.paymentBill)" style="max-width:180px;cursor: pointer;"/>
                  </div>
                  <div v-else >暂无图片</div>
                </template>
          </el-table-column>
          <el-table-column label="收款公司"  align="center" prop="payeeBankName"></el-table-column>
          <el-table-column label="开户行"  align="center" prop="payeeBankType"></el-table-column>
          <el-table-column label="收款账号"  align="center" prop="payeeBankAccount"></el-table-column>
          <el-table-column label="收款金额"  align="center" prop="checkAmount"></el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="150" prop="id">
              <template slot-scope="scope">
                <div class="line-div">
                  <!-- <div class="small-Idiv" @click="openDetails(scope.row.id)">
                    <div class="i-div">
                      <img src="../../../common/images/icon/查看详情.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">详情</span>
                  </div> -->
                  <div class="small-Idiv" @click="uploadBill(scope.row.id)">
                    <div class="i-div">
                      <img src="../../../common/images/icon/上传.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">上传票据</span>
                  </div>
                </div>
              </template>
           </el-table-column>
        </el-table>
        <el-row class="bottom">
          <el-col :span="18" class="right">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagination.current_page"
              :page-size="pagination.page_size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.total_count"
            ></el-pagination>
          </el-col>
        </el-row>
    
    </div>

       <!--上传票据弹框-->
        <el-dialog
          title="上传票据"
          :visible.sync="importDialog"
          width="40%"
          :close-on-click-modal="false"
        >
          <el-form :model="formP"  ref="formName" label-width="100px" >
            <el-form-item label="票据图片：" prop="activityTypeImgUrl">
              <div class="uploadImgWrap">
                <div v-if="formP.activityTypeImgUrl"
                    style="display: inline-block;width: 90%; margin-right: 20px; border-radius:4px">
                  <i class="img_wrap"><img style="width: 100%; height: 100%" :src="formP.activityTypeImgUrl" alt=""></i>
                </div>
                <div style="display: inline-block;" v-if="!editable">
                  <label for="uploadPic"
                        style="margin-bottom:30px;display: inline-block;cursor: pointer; height:32px;line-height: 32px;padding: 0 14px;background:rgba(76,134,244,1);color: #fff;border-radius:3px;">
                    <input ref="file_input1" type="file" @change="uploadPic(1)" accept="image/jpeg, image/png"
                          id="uploadPic" style="position: absolute; top: -10000px">
                    <span v-if="!formP.activityTypeImgUrl">上传图片</span>
                    <span v-else>重新上传</span>
                  </label>
                  <!-- <p style="color: #606266;font-size: 12px; line-height: 2">1、图片尺寸建议：710px*300px</p> -->
                  <p style="color: #606266;font-size: 12px; line-height: 2">1、支持JPG、PNG格式的图片，图片不能大于2M。</p>
                </div>
              </div>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="importDialog = false" size="small">取 消</el-button>
            <el-button type="primary" @click="confirmCreateNewType" size="small">确 定</el-button>
          </span>
        </el-dialog>

         <!--票据图片放大-->
        <el-dialog
          title="票据图片"
          :visible.sync="imgDialog"
          width="40%"
          :close-on-click-modal="false"
        >
          <el-row>
            <el-col :span="24">
              <div class="grid-content bg-purple-dark" style="text-align: center;">
                 <img :src="imgsrc" style="width: 80%;" /> 
              </div>
            </el-col>
          </el-row>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="imgDialog = false" size="small">关 闭</el-button>
          </span>
        </el-dialog>


  </div>
</template>

<script>
// import GoodsFitter from '../goods/goodsFitter'
import { getMyPrepaidList , uploadingBill , getMerchantName} from '@/api/creditmanage/index'
import { addActivityType,  deleteActivityType,  reqActivityList,  updateActivityType,  uploadFile } from '@/api/activity/index'
import axios from 'axios'
export default {
  data () {
    return {
      imgDialog:false,
      imgsrc:'',
      merchantName:'',      // 服务商 
      importDialog :false,  // 上传票据弹框
      formP: {
        activityTypeImgUrl: '',
        activityTypeName: '',
        iconUrl: '',
        remark: '',
        sortOrder: '',
        isCustomerCreate: 1,
        activityTypeId: null,
     },
     editable: false, // 是否可编辑
      payType: '', // 支付方式
      payStatus: '', // 支付状态
      paymentOrderNo :'',  // 充值订单号
      createTime: '',  // 支付时间
      noticeList: [],
      pagination: {
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
      selectNotice: [],
      path:''
    }

  },
  created () {
    this.getMerchantName()
    this.getMyPrepaidList()
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    getMerchantName(){
       getMerchantName().then( res =>{
         this.merchantName = res.data.platformType 
       })
    },
    getMyPrepaidList() {
      var data = {}
      data.pageNum = this.pagination.current_page
      data.pageSize = this.pagination.page_size
      data.payType = this.payType
      data.payStatus = this.payStatus
      data.paymentOrderNo = this.paymentOrderNo
      data.startTime = this.createTime[0]
      data.endTime = this.createTime[1]
      getMyPrepaidList(data).then(res => {
        var that =this
        that.noticeList = res.data.list
        this.pagination.total_count = res.data.total
      })
    },
    //上传票据
     uploadBill (id){
         this.id = id
         this.importDialog = true
         this.formP.activityTypeImgUrl =""
    },
    // 上传图片
    async uploadPic(index) {
      const files = this.$refs[`file_input${index}`].files[0]
      const type = files.type
      const size = files.size
      const mazSize = 2 * 1024 * 1024
      if (type !== 'image/png' && type !== 'image/jpeg') {
        throttleTipPop(this, 'error', '文件格式不正确')
        return
      }
      if (size > mazSize) {
        throttleTipPop(this, 'error', '文件大小不得超过2M')
        return
      }
      const path = await this.uploadFile(files)
      if (index === 1) {
        this.formP.activityTypeImgUrl = path
      } else if (index === 2) {
        this.form.iconUrl = path
      }
      this.$refs[`file_input${index}`].value = '' // 清空上传的文件
    },
    // 上传文件
    async uploadFile(file) {
      const formData = new FormData()
      let path = ''
      formData.append('file', file)
      const res = await uploadFile(formData)
      if (res.code === 200) {
        path = res.data.domain + res.data.filePath
        this.path = path
      }
      return path
    },
    // 确认上传票据
    confirmCreateNewType() {
    // if (this.flag === 0 || this.flag === 1) {
      this.$refs['formName'].validate((valid) => {
        if (valid) {
          var data = {}
          data.id= this.id
          data.paymentBill = this.path
          uploadingBill(data).then( res=>{
             console.log(res)
             this.importDialog = false
             this.getMyPrepaidList()
          })
          // if (this.flag === 0 ) {
          //   this.addActivityType()
          // } else {
          //   this.updataActivityType()
          // }
          // this.dialogVisible = false
        } else {
          return false;
        }
      });
      //  } else {
        //   this.dialogVisible = false
        // }

      },
     // 搜索
    handelSearchGoods(){
      this.pagination.current_page = 1  
      this.getMyPrepaidList()
    },
    // 重置
    reset() {
        let data = {}
        data.pageNum = 1
        data.pageSize = 10
        data.payType = ""
        data.payStatus = ""
        data.paymentOrderNo = this.paymentOrderNo
        data.startTime = ""
        data.endTime = ""
        getMyPrepaidList(data).then(res => {
          var that =this
          that.noticeList = res.data.list
          this.pagination.total_count = res.data.total
        })
    },
    // 放大票据图片
    scalePic(imgsrc){
       console.log(imgsrc)   
       this.imgDialog = true
       this.imgsrc = imgsrc
    },
    handlecreateTime() {

    },
    handleSizeChange(val){
      this.form.page_size = val
      this.getloginlogsList()
    },
    handleCurrentChange(val){
      this.form.current_page = val
      this.getloginlogsList()
    },
  },
  filters:{
  //   TypeName(val){
  //     let arr = [
  //       {auditType:1,name:'上架'},
  //       {auditType:2,name:'下架'},
  //       {auditType:3,name:'调价'},
  //       {auditType:4,name:'信息变更'},
  //       {auditType:5,name:'删除商品'},
  //       {auditType:6,name:'京东改价'},
  //       ]
  //   for(var i = 0 ; i<arr.length; i++){
  //     if(val == arr[i].auditType){
  //       return arr[i].name
  //     }
  //   }
  // }
  },
  components: {
    
  }
}
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
.line-div{
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
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
      }
    }
  }
.line-top {
  margin-top: 30px;
}
.div_img {
  width: 28px;
  height: 28px;
}
.activity {
  cursor: pointer;
  width: 32px;
  height: 32px;
}
.small_top {
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 18px;
}
.model {
  color: #f66c6c !important;
}
.leftbottom {
  color: #4a99fa;
  border-bottom: 1px dashed rgba(215, 220, 231, 1);
  padding-bottom: 8px;
}
.more {
  cursor: pointer;
}
.imgitem {
  display: flex;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
}
.martop {
  margin-top: 10px;
}
}
</style>
