<template>
  <div class="margin">
    <div class="mbottom">
          <div class="goods-fitter">
            <div class="search-wrapper"> 
              <el-page-header @back="back" content='站内消息详情'></el-page-header>
            </div>
          </div>
      </div>
      <div class="mcard mbottom">
        <div class="title">站内消息详情</div>
           <div class="title_e">
              <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark" style="font-weight: bold;">消息标题：{{messageTitle}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark">发送人：{{senderName}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark">收件人：{{receiverName}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark">消息类别：{{messageCategory}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark">消息业务类型: {{businessType}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark">业务ID:{{businessId}} </div></el-col>
              </el-row>
               <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark">消息链接:{{messageLink}} </div></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark">发送时间：{{sendTime}}</div></el-col>
              </el-row>
           </div>
          </div>

        <div class="mbottom mcard">
                 <div class="title">消息内容详情</div>
                 <div class="title_e">
                      <div class="content_c">
                        {{messageContent}}
                       </div> 
                       <div class="content_b">
                           福原爱员工福利商城
                       </div> 
                       <div class="content_b">
                           <a href="">https://c.fyuanai.com/</a>
                       </div> 
                 </div>
            </div>   
  </div>
</template>

<script>
import { getMessageDetail } from '@/api/notice/index'
export default {
  name: 'Notice',
  data () {
    return {
        messageTitle:'',
        messageCategory:'',
        senderName:'',
        receiverName:'',
        businessType:'',
        businessId:'',
        messageLink:'',
        sendTime:'',
        messageContent:''
    }
  },
  created () {
    this.getMessageDetail()
  },
  methods: {
    // 获取详情
    getMessageDetail() {
      var data = {}
      data.id = this.$route.query.id
      data.update = true
      getMessageDetail(data).then(res => {
          this.messageTitle = res.data.messageTitle
          if(  res.data.messageCategory == 0 ) {
            this.messageCategory = '系统消息'
          }else if(  res.data.messageCategory == 1 ) {
            this.messageCategory = '供应商'
          }else if(  res.data.messageCategory == 2 ) {
            this.messageCategory = '客户'
          }else if(  res.data.messageCategory == 3 ) {
            this.messageCategory = '其他'
          }
          this.senderName =  res.data.senderName
          this.receiverName =  res.data.receiverName

          if( 0 <=  res.data.businessType &&   res.data.businessType <= 99 ) {
            this.businessType = '系统消息相关'
          }else if(  100 <=  res.data.businessType &&   res.data.businessType <= 199  ) {
            this.businessType = '供应商相关'
          }else if(  200 <=  res.data.businessType &&   res.data.businessType <= 299  ) {
            this.businessType = '客户相关'
          }else if(  300 <=  res.data.businessType &&   res.data.businessType <= 399 ) {
            this.businessType = '用户相关'
          }else if(  400 <=  res.data.businessType &&   res.data.businessType <= 499  ) {
            this.businessType = '商品相关'
          }else if(  500 <=  res.data.businessType &&   res.data.businessType <= 599  ) {
            this.businessType = '订单相关'
          }else if(  600 <=  res.data.businessType &&   res.data.businessType <= 699 ) {
            this.businessType = '售后相关'
          }
           
          this.businessId =  res.data.businessId 
          this.messageLink =  res.data.messageLink
          this.sendTime =  res.data.sendTime  
          this.messageContent =  res.data.messageContent  
      })
    },
    back() {
      this.$router.go(-1);
    },

  },
  watch: {
 
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.search-wrapper{
  padding: 20px;
  border: 1px solid #d7e0f1;
  background: #fff;
}
.title_e{
  padding:20px;
  background: #f7faff;
}
.grid-content{
  margin: 8px 0;
  font-size: 14px;
}
.content{
  padding: 10px;
  min-height: 100px;
  border: 1px solid #ddd;
  margin: 20px 0;
}
.content_c{
  font-size:20px;
  font-weight: 600;
  min-height: 200px;
}
.content_b{
  text-align: center;
  color: #4a99fa;
  line-height: 28px;
  font-size: 14px;
}
.attachment{
  border: 1px solid #ddd;
  margin: 20px 0;
}
.attachment_t{
  margin: 0;
  height: 30px;
  line-height: 30px;
  padding-left: 20px;
  font-weight: bold;
  background: #f7faff;
}
.attachment_c{
   padding-left: 20px;
   height: 30px;
   line-height: 30px;
}
.attach{
    padding-left: 20px;
    display: inline-block;
    vertical-align: bottom;
    vertical-align: top;
}
.attach_b{
     display: inline-block;
}
.preview{
   color: #4a99fa;
   line-height: 20px;
}
</style>
