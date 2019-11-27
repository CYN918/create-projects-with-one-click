<template>
  <div class="margin dealerlist">
    <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" style="font-size: 18px;"></el-page-header>
            <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 18px;">
                <el-breadcrumb-item v-if="this.user.data.sysuserType === 0">总站额度发放管理</el-breadcrumb-item>
                <el-breadcrumb-item v-if="this.user.data.sysuserType === 3">经销商额度发放管理</el-breadcrumb-item>
                <el-breadcrumb-item>详情</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
    </div>
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="150px" size="small">
          <div class="search-wrapper">
            <h4 class="title">额度审核基本信息</h4>
            <div class="search-base">
              <el-row>
                <div class="lines-details">
                    <ul>
                        <li><label><i></i>申请人名称:</label><span>{{ form.applyUserName }}</span></li>
                        <li><label><i></i>申请发放模式:</label><span>{{ form.payMode }}</span></li>
                        <li><label><i></i>申请发放金额:</label><span>{{ form.applyAmount }}</span></li>
                        <li><label><i></i>申请时间:</label><span>{{ form.createTime }}</span></li>
                        <li><label><i></i>申请说明:</label><span>{{ form.applyInstruction }}</span></li>
                        <li><label><i></i>服务商名称:</label><span>{{ form.merchantName }}</span></li>
                        <li><label><i></i>服务商账户ID:</label><span>{{ form.accountId }}</span></li>
                        <li><label><i></i>服务商账户名称:</label><span>{{ form.accountName }}</span></li>
                        <li><label><i></i>服务商账户余额:</label><span>{{ form.balanceAmount }}</span></li>
                        <li><label><i></i>服务商类型:</label><span>{{ form.merchantType }}</span></li>
                        <li><label><i></i>销售员姓名:</label><span>{{ form.adminUserName }}</span></li>
                        <li><label><i></i>状态:</label><span>{{ form.status }}</span></li>
                        <li><label><i></i>充值订单号:</label><span>{{ form.paymentOrderNo }}</span></li>
                        <li><label><i></i>本次充值金额:</label><span>{{ form.paymentAmount }}</span></li>
                        <li><label><i></i>额度限制使用:</label><span>{{ form.confine }}</span></li>
                        <li><label><i></i>额度有效开始时间:</label><span>{{ form.beginTime }}</span></li>
                        <li><label><i></i>额度失效时间/结束时间:</label><span>{{ form.endTime }}</span></li>
                        <li><label><i></i>备注说明:</label><span>{{ form.remark }}</span></li>
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
            <h4 class="title">额度审核信息</h4>
            <div class="search-base">
              <el-row>
                <div class="lines-details">
                    <ul>
                        <li><label><i></i>额度管理人:</label><span>{{ form.quotaManagerName }}</span></li>
                        <li><label><i></i>额度发放人:</label><span>{{ form.quotaExecutorName }}</span></li>
                        <li><label><i></i>审核状态:</label><span>{{ form.auditStatus }}</span></li>
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
            <h4 class="title">额度发放详情</h4>
            <div class="search-base">
              <el-row>
                <div class="lines-details">
                    <ul>
                        <li><label><i></i>发放人:</label><span>{{ form.payUserName }}</span></li>
                        <li><label><i></i>发放说明:</label><span>{{ form.payInstruction }}</span></li>
                        <li><label><i></i>发放时间:</label><span>{{ form.payTime }}</span></li>
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
import { getLinesDetails } from '@/api/creditmanage/index'
export default {
  data() {
    return {
      id: this.$route.query.id,
      user: JSON.parse(window.localStorage.getItem("user")),
      form:{
      }
    };
  },
  created() {
   this.getLinesDetails()
  },
  computed: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    getLinesDetails(){
      var data = {
        id:this.id
      }
      getLinesDetails(data).then( res =>{
         console.log(res)
         this.form = res.data
         // 申请发放模式：1充值发放；2授信发放；
         if( this.form.payMode == 1 ){
           this.form.payMode = '充值发放'
         }else if(this.form.payMode == 2){
           this.form.payMode = '授信发放'
         }
        // 状态（0正常；1已删除；）
        if( this.form.status == 0 ){
           this.form.status = '正常'
         }else if(this.form.status == 1){
           this.form.status = '已删除'
         }
        // 额度限制使用：0不限制时间(默认)；1限制时间；
        if( this.form.confine == 0 ){
           this.form.confine = '不限制时间'
         }else if(this.form.confine == 1){
           this.form.confine = '限制时间'
         }
         // 服务商类型（0总站,平台；1经销商；2客户/项目）
         if( this.form.merchantType == 0 ){
           this.form.merchantType = '总站'
         }else if(this.form.merchantType == 1){
           this.form.merchantType = '经销商'
         }else if( this.form.merchantType == 2 ){
           this.form.merchantType = '客户/项目'
         }
        // 审核状态：0待审核；1审核通过；2审核失败；
        if( this.form.auditStatus == 0 ){
           this.form.auditStatus = '待发放'
         }else if(this.form.auditStatus == 1){
           this.form.auditStatus = '已发放'
         }else if( this.form.auditStatus == 2 ){
           this.form.auditStatus = '发放失败'
         }

      })
    }
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
</style>