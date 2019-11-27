<template>
  <div class="margin dealerlist toupDetail">
    <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" style="font-size: 18px;"></el-page-header>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px;">
                <el-breadcrumb-item>充值管理</el-breadcrumb-item>
                <el-breadcrumb-item>详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
    </div>
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="150px" size="small">
          <div class="search-wrapper">
            <h4 class="title">基本信息</h4>
            <div class="search-base">
              <el-row>
                <div class="lines-details">
                    <ul>
                        <li><label><i></i>服务商:</label><span>{{ merchantName }}</span></li>
                        <li><label><i></i>充值人:</label><span>{{ userName }}</span></li>
                        <li><label><i></i>联系电话:</label><span>{{ telephone }}</span></li>
                        <li><label><i></i>充值金额:</label><span>{{ rechargeAmount }}(元)</span></li>
                        <li><label><i></i>支付方式:</label><span>{{ payType }}</span></li>
                        <li><label><i></i>付款开户行:</label><span>{{ bankType  }}</span></li>
                        <li><label><i></i>支付账号:</label><span>{{ bankAccount }}</span></li>
                        <li><label><i></i>支付状态:</label><span>{{ payStatus  }}</span></li>
                        <li><label><i></i>支付时间:</label><span>{{ payTime }}</span></li>
                        <li><label><i></i>支付单号:</label><span>{{ paymentOrderNo }}</span></li>
                        <li><label><i></i>支付票据:</label><span> 
                             <template>
                                <span v-if="paymentBill"><img  :src="paymentBill"   style="max-width:120px;vertical-align: middle;"/></span>
                                <span v-else>暂无图片</span>
                            </template></span></li>
                        <li><label><i></i>收款公司:</label><span>{{ payeeBankName }}</span></li>
                        <li><label><i></i>开户行:</label><span>{{ payeeBankType }}</span></li>
                        <li><label><i></i>收款账号:</label><span>{{ payeeBankAccount }}</span></li>
                        <li><label><i></i>收款金额:</label><span>{{ checkAmount }}(元)</span></li>
                    </ul>
                </div>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
     <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="150px" size="small">
          <div class="search-wrapper">
            <h4 class="title">核对充值信息</h4>
            <div class="search-base">
              <el-row>
                <div class="lines-details">
                    <ul>
                        <li><label><i></i>核对状态:</label><span>{{ checkStatus }}</span></li>
                        <li><label><i></i>核对金额:</label><span>{{ checkAmount }}(元)</span></li>
                        <li><label><i></i>核对说明:</label><span>{{ checkInstruction }}</span></li>
                    </ul>
                </div>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>  
     <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="150px" size="small">
          <div class="search-wrapper">
            <h4 class="title">额度申请信息</h4>
            <div class="search-base">
              <el-row>
                <div class="lines-details">
                    <ul>
                       <li><label><i></i>发放状态:</label><span>{{ grantStatus }}</span></li>
                       
                    </ul>
                </div>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>  
  </div>
</template>

<script>
import { topUpDetails } from  '@/api/creditmanage/index'
export default {
  data() {
    return {
      id: this.$route.query.id,
      user: JSON.parse(window.localStorage.getItem("user")),
      merchantName : '',
      userName: '',
      telephone : '',
      rechargeAmount : '',
      payType : '',
      bankType : '',
      bankAccount : '',
      payStatus : '',
      payTime : '',
      paymentOrderNo : '',
      paymentBill : '',
      payeeBankName : '',
      payeeBankType : '',
      payeeBankAccount : '',
      checkAmount : '',
      checkStatus : '',
      grantStatus : '',
      checkInstruction :''
    };
  },
  created() {
    console.log(this.user.data.sysuserType)
    this.topUpDetails()
  },
  computed: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    // 详情
   topUpDetails(){
       topUpDetails({id:this.id}).then(res =>{
          console.log(res) 
          this.merchantName = res.data.merchantName
          this.userName = res.data.userName
          this.telephone = res.data.telephone
          this.rechargeAmount  = res.data.rechargeAmount
        
          if( res.data.payType == 'wxpay_native'){
            this.payType  = '微信扫码支付'
          }else  if( res.data.payType == 'alipay_qr'){
            this.payType  = '支付宝扫码支付'
          }else  if( res.data.payType == 'e-bank'){
            this.payType  = '网银支付'
          }else  if( res.data.payType == 'bank_transfer'){
            this.payType  = '公司转账'
          }

          this.bankType = res.data.bankType
          this.bankAccount  = res.data.bankAccount

          if( res.data.payStatus == '0'){
            this.payStatus  = '待支付'
          }else  if( res.data.payStatus == '1'){
            this.payStatus  = '支付中'
          }else  if( res.data.payStatus == '2'){
            this.payStatus  = '支付成功'
          }else  if( res.data.payStatus == '3'){
            this.payStatus  = '支付失败'
          }else  if( res.data.payStatus == '4'){
            this.payStatus  = '取消支付'
          }else  if( res.data.payStatus == '5'){
            this.payStatus  = '支付超时'
          }

          this.payTime  = res.data.payTime
          this.paymentOrderNo  = res.data.paymentOrderNo

          if( res.data.paymentBill ){
             this.paymentBill =  res.data.paymentBill 
          }else{
             this.paymentBill = ''
          }

          this.payeeBankName  = res.data.payeeBankName
          this.payeeBankType  = res.data.payeeBankType
          this.payeeBankAccount  = res.data.payeeBankAccount
          this.checkAmount  = res.data.checkAmount
         
          if( res.data.checkStatus == '0'){
            this.checkStatus  = '待核对'
          }else  if( res.data.checkStatus == '1'){
            this.checkStatus  = '通过'
          }else  if( res.data.checkStatus == '2'){
            this.checkStatus  = '不通过'
          }
        
          if( res.data.grantStatus == '0'){
            this.grantStatus  = '待申请'
          }else  if( res.data.grantStatus == '1'){
            this.grantStatus  = '审核中'
          }else  if( res.data.grantStatus == '2'){
            this.grantStatus  = '审核不通过'
          }else  if( res.data.grantStatus == '3'){
            this.grantStatus  = '待发放/审核通过'
          }else  if( res.data.grantStatus == '4'){
            this.grantStatus  = '已发放'
          }else  if( res.data.grantStatus == '5'){
            this.grantStatus  = '发放失败'
          }

          this.checkInstruction = res.data.checkInstruction
       })
   },   
  },
  components: {

  }
};
</script>

<style scoped>
.search-wrapper1 >>> .el-page-header{
    float: left;
}
.search-wrapper1 >>> .el-breadcrumb{
    padding-top: 4px;
}
.goods-fitter .search-wrapper{
    padding: 20px;
    border: 1px solid #d7e0f1;
    background: #fff;
}
.goods-fitter .search-wrapper .title {
    margin-left: -20px;
    font-size: 16px;
    font-weight: 400;
    color: 3333;
    padding-left: 10px;
    line-height: 1.4;
    border-left: 4px solid #4C86F4;
    margin-bottom: 10px;
}
.lines-details > ul > li{
    display: inline-block;
    width: 33.33333%;
    line-height: 40px;
}
.lines-details > ul > li > label > i{
    font-style: normal;
    color: red;
    position: relative;
    top: 5px;
}
.search-wrapper1{
    padding: 20px;
    border: 1px solid #d7e0f1;
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.toupDetail ul li label{
  margin-right: 10px;
}
</style>