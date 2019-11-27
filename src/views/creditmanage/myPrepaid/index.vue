<template>
  <div class="margin">
      <div class="mcard mbottom">
        <div class="title">我的充值</div>
        <div>
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
          <el-table-column label="付款公司"  align="center" prop="bankName"></el-table-column>
          <el-table-column label="付款开户行"  align="center" prop="bankType"></el-table-column>
          <el-table-column  label="付款账号"  align="center"  prop="bankAccount"></el-table-column>
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
                  <div class="small-Idiv" @click="openDetails(scope.row.id)" v-permit="'mypre:view'">
                    <div class="i-div">
                      <img src="../../../common/images/icon/查看详情.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">详情</span>
                  </div>
                  <div class="small-Idiv" @click="uploadBill(scope.row.id)" v-permit="'myprepaid:upload'">
                    <div class="i-div">
                      <img src="../../../common/images/icon/上传.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">上传票据</span>
                  </div>
                </div>
              </template>
           </el-table-column>
          <!--
            <el-table-column label="标题内容" prop="content">
              <template slot-scope="scope">
                <i class="el-icon-bell" v-show="scope.row.status === '1'"></i>
                <span :class="scope.row.status === '2' ? 'readed': ''">{{scope.row.content}}</span>
              </template>
            </el-table-column>
            <el-table-column label="提交时间" width="200" align="center" prop="time"></el-table-column>
            <el-table-column label="类型" width="100" align="center" prop="type"></el-table-column>
          -->
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
import {  getMyPrepaidList , uploadingBill , getMerchantName} from '@/api/creditmanage/index'
import { addActivityType,  deleteActivityType,  reqActivityList,  updateActivityType,  uploadFile   } from '@/api/activity/index'
export default {
  name: 'Notice',
  data () {
    return {
      imgDialog:false,
      imgsrc:'',
      merchantName:'',
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
    getMyPrepaidList() {
      let data = {}
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
    getMerchantName(){
       getMerchantName().then( res =>{
        this.merchantName = res.data.platformType 
       })
    },
    //筛选已读或未读
    filterTag(value, row) {
      console.log(value,row)  
      return row.tag === value;
    },
    // 跳转详情页面
    openDetails(id) {   
        this.$router.push({ name: "myPrepaidDetails" , query: {id: id}});
    },
    handlecreateTime() {
       
    },
    // 搜索
    handelSearchGoods(){
      this.pagination.current_page = 1  
      this.getMyPrepaidList()
    },
    // 重置
    reset() {
       this.pagination.current_page = 1
       this.pagination.page_size = 10
       this.payType = ''
       this.payStatus = ''
       this.paymentOrderNo = ''
       this.createTime = ''
        let data = {}
        data.pageNum = 1
        data.pageSize = 10
        data.payType = ""
        data.payStatus = ""
        data.paymentOrderNo = ""
        data.startTime = ""
        data.endTime = ""
        getMyPrepaidList(data).then(res => {
          var that =this
          that.noticeList = res.data.list
          this.pagination.total_count = res.data.total
        })
    },
    handleSizeChange (val) {
      this.pagination.page_size = val
      this.getMyPrepaidList()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this.getMyPrepaidList()
    },
    // 上传票据
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
     // 放大票据图片
    scalePic(imgsrc){
       console.log(imgsrc)   
       this.imgDialog = true
       this.imgsrc = imgsrc
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
    // 确定新建类型
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
   
  },
  filters:{
     filterA(val) {
    //    let str = val
    //    str = str.replace(/<[^<>]+>/g,'')
    //    return str 
     }
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.line-div{
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
}
.el-icon-message , .el-icon-paperclip{
  font-size:18px;
  cursor: pointer;
  margin: 0 5px;
} 
.header {
  margin: 20px;
}
.el-icon-bell {
  color: $themeColor;
  margin-right: 10px;
}
.readed {
  color: #aaa;
}
.bottom {
  margin: 20px 0;
  .right {
    text-align: right;
  }
}
</style>
