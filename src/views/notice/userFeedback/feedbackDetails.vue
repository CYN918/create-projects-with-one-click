<template>
  <div class="margin">
    <div class="mbottom">
          <div class="goods-fitter">
            <div class="search-wrapper"> 
              <el-page-header @back="back" content='用户反馈详情'></el-page-header>
            </div>
          </div>
      </div>
      <div class="mcard mbottom">
        <div class="title">用户反馈详情</div>
           <div class="title_e">
              <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark" style="font-weight: bold;">消息标题：{{feedbackTitle}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><div class="grid-content bg-purple-dark">用户名称：{{userName}}</div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-dark">反馈类型：{{feedbackType}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark">反馈内容：{{feedbackContent}}</div></el-col>
               
              </el-row>
               <el-row>
                <el-col :span="24"><div class="grid-content bg-purple-dark">反馈图片:
                 <span class='pic_d' v-if="feedbackImg.length>=1">
                      <span v-for="val in feedbackImg ">
                        <img  :src='val' />
                      </span>
                </span>
                <span class='pic_d' v-else-if="!feedbackImg">暂无图片</span> </div></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><div class="grid-content bg-purple-dark">联系方式: {{contact}} </div></el-col>
                <el-col :span="12"><div class="grid-content bg-purple-dark">反馈等级: {{feedbackGrade}}</div></el-col>
              </el-row>
               <el-row>
                  <el-col :span="12"><div class="grid-content bg-purple-dark">状态：{{feedbackStatus}}</div></el-col>
                  <el-col :span="12"><div class="grid-content bg-purple-dark">是否显示：{{feedbackDispaly}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><div class="grid-content bg-purple-dark">备注：{{remark}}</div></el-col>
              </el-row>
              <el-row>
                <el-col :span="12"><div class="grid-content bg-purple-dark">创建时间：{{feedbackTime}}</div></el-col>
              </el-row>
           </div>
          </div>
  </div>
</template>

<script>
import { feedbackDetails , feedbackUpdateStatus  } from '@/api/notice/index'
export default {
  name: 'Notice',
  data () {
    return {
        feedbackTitle:'',
        userName:'',
        feedbackType:'',
        feedbackStatus:'',
        feedbackGrade:'',
        feedbackImg:'',
        contact:'',
        feedbackTime:'',
        feedbackDispaly:'',
        feedbackContent:'',
        remark:''
    }
  },
  created () {
    this.feedbackDetails()
    this.feedbackUpdateStatus()
  },
  methods: {
    // 获取详情
    feedbackDetails() {
      var data = {}
      data.feedbackId = this.$route.query.id
      feedbackDetails(data).then(res => {
           console.log( res )
          if( res.code == 200 ){
              this.feedbackTitle = res.data.feedbackTitle
              this.userName = res.data.userName  
              if(  res.data.feedbackType == 0 ) {
                this.feedbackType = '反馈'
              }else if(  res.data.feedbackType == 1 ) {
                this.feedbackType = '回复'
              }
              if(  res.data.feedbackStatus == 0 ) {
                this.feedbackStatus = '未读'
              }else if(  res.data.feedbackStatus == 1 ) {
                this.feedbackStatus = '已读未回复'
              }else if(  res.data.feedbackStatus == 2 ) {
                this.feedbackStatus = '已回复'
              }else if(  res.data.feedbackStatus == 3 ) {
                this.feedbackStatus = '删除'
              }
              this.feedbackGrade = res.data.feedbackGrade  

              if( res.data.feedbackImg == '' ){
                 this.feedbackImg = ''
                  console.log( this.feedbackImg  )
              }else if( res.data.feedbackImg.search(",") != -1 ){
                 this.feedbackImg = []
                 this.feedbackImg =  res.data.feedbackImg.split(",");
                 console.log( this.feedbackImg  )
              }else if( res.data.feedbackImg.search("，") != -1 ){
                  this.feedbackImg = []
                 this.feedbackImg =  res.data.feedbackImg.split("，");
                 console.log( this.feedbackImg  )
              }else{
                  this.feedbackImg = []
                  this.feedbackImg[0] =  res.data.feedbackImg
                  console.log( this.feedbackImg  )
              }
            
              this.contact =  res.data.contact
              this.feedbackTime =  res.data.feedbackTime
               if(  res.data.feedbackDispaly == 0 ) {
                this.feedbackDispaly = '显示'
              }else if(  res.data.feedbackDispaly == 1 ) {
                this.feedbackDispaly = '对用户隐藏'
              }else if(  res.data.feedbackDispaly == 2 ) {
                this.feedbackDispaly = '对商家隐藏'
              }   
              this.feedbackContent =  res.data.feedbackContent
              this.remark =  res.data.remark
          }
      })
    },
    // 修改状态
    feedbackUpdateStatus(){
        if(  this.$route.query.feedbackStatus == 0  ){
          var data = {}
          data.feedbackId = this.$route.query.id
          data.feedbackStatus = 1
          feedbackUpdateStatus(data).then( res =>{
            console.log(res)
          })
        }
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
.pic_d img{
  width: 150px;
  padding: 5px;
  border: 1px solid #ddd;
  height: 150px;
  margin-right: 10px;
}
.search-wrapper{
  padding: 20px;
  border: 1px solid #d7e0f1;
  background: #fff;
}
.pic_d img{
  vertical-align: top;
}
.title_e{
  padding:20px;
  background: #f7faff;
}
.grid-content{
  margin: 10px 0;
  font-size: 15px;
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
