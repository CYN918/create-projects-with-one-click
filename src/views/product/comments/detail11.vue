<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <div class="">
            <el-button  type="primary" class="add_brand" @click="back"  size="small">用户评论</el-button>
        </div>
      </div>
    </div>
      <div class="comments_div">
        <span class="font_bold">{{form.name}}</span> 于
        <span class="font_bold">{{form.time}}</span> 对 
        <span class="font_bold">{{form.goods}}</span>发表评论
      </div>
      <div  class="comments_tent">
        <span class="tent_span">{{form.content}}</span>
        <div class="details"><span class="font_bold">评论等级：</span>{{form.commentRank}}<span class="font_bold">IP地址：</span>{{form.ipAddress}}</div>
      </div>
      <div class="tent_btn">
        <el-button  type="primary"   size="small">允许显示</el-button>
      </div>
        <el-form ref="form" :model="form" :rules="rules" label-width="260px" size="small">
          <div class="search-wrapper">
            <div class="search-wrapper12">
            <el-form-item label="用户名:" prop="content">
                <el-input v-model="form.name" style='width:200px' :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="Email:" prop="email">
                <el-input v-model="form.email" style='width:200px' :readonly="true"></el-input>
            </el-form-item>
            <el-form-item label="回复内容:" prop="content">
                <el-input
                  type="textarea"
                  style='width:500px'
                  :rows="5"
                  placeholder="请输入内容"
                  v-model="textarea">
                </el-input>
            </el-form-item>
            <el-form-item label="邮件通知:" prop="content">
                <el-radio v-model="form.name" label="1">是</el-radio>
                <el-radio v-model="form.name" label="0">否</el-radio>
            </el-form-item>
            </div>
            <br/>
            <br/>
            <div class="btn">
                <el-button type="primary"  size="small">确定</el-button>
                <el-button type="primary"  size="small">重置</el-button>
                <el-button type="primary"  size="small">重发邮件</el-button>
            </div>
          </div>
        </el-form>
  </div>
</template>

<script>
import {replyComments,checkComments,} from '@/api/product/index'
export default {
    data () {
    return {
        id:'', //用户评论id
        rules: {},
        form: {
          name: '', //用户名称
          goods:'', //商品详情
          time:'',//评论时间
          content:'',//评论内容
          commentRank:'', //评论等级
          ipAddress:'', //评论ip
          email:'', //email
        }
      
    }
  },
  created(){
    console.log(this.$route.params.id)
        if(this.$route.params.id){
            this.id = this.$route.params.id
            checkComments(this.id).then(res => {
                this.form.name = res.data.userName
                this.form.time = res.data.creatTime
                this.form.goods = res.data.goodsId
                this.form.content = res.data.content
                this.form.commentRank = res.data.commentRank
                this.form.ipAddress = res.data.ipAddress
                this.form.userName = res.data.commentRank
                this.form.email = res.data.email
            })
        }
    },
  computed: {
  },
  methods: {
      back(){
          this.$router.go(-1)
      },
  },
  components: {
   
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.comments_div{
  padding-top:50px;
  .font_bold{
    font-weight: bold
  }
}
.comments_tent{
  padding-top: 30px;
  position: relative;
  padding: 30px;
  .details{
    position: absolute;
    right: 50px;
    bottom: 0;
  }
  .tent_span{
    position: absolute;
    left: 20px;
    top: 20px;
  }
}
.tent_btn{
    width: 100%;
    height: 32px;
    text-align: center;
  }
</style>
