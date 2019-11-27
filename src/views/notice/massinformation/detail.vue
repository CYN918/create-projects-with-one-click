<template>
  <div class="margin dealerlist">
    <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <el-page-header @back="back" content="短信群发 > 短信详情"></el-page-header>
          </div>
        </div>
    </div>
    <div class="mbottom" style="background: #ffff;">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small" >
            <el-form-item label="短信主题：">
               <span>{{messageTitle}}</span>
            </el-form-item>
            <el-form-item label="短信内容:">
               <span>{{messageContent}}</span>
            </el-form-item>
            <el-form-item label="短信接收人:">
              <div>
                 <ul>
                   <li v-for="(item,index) in receiverUsers" :key="index">{{item.receiverName}}({{item.telephone}})</li>
                 </ul>
               </div>
            </el-form-item>
            <el-form-item label="备注说明：">
                <span>{{remark}}</span>
            </el-form-item>
            
          </el-form>
      </div>
    </div>
      
  </div>
</template>

<script>
import { 
  detailSms,
} from "@/api/customer/index";
export default {
  data() {
    return {
      receiverName: '',
      messageTitle: '',
      messageContent: '',
      remark: '',
      receiverUsers: [],
      id: this.$route.query.id,
    };
  },
  created() {
    this.announcementDetail();
  },
  computed: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    async announcementDetail(){
      const res = await detailSms(this.id);
      if (res.code === 200) {
         this.remark = res.data.remark;
          this.messageTitle = res.data.messageTitle;
          this.messageContent = res.data.messageContent;
          this.receiverName = res.data.receiverName;
          this.receiverUsers = res.data.receiverUsers;
      }
    }
  },
  components: {

  }
};
</script>

<style scoped>
.search-base >>> .el-col-10{
  width: 60%;
}
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
    margin-left: 15%;
    margin-top: 15px;
}
.lines-details > ul > li > label > i{
    font-style: normal;
    color: red;
    position: relative;
    top: 5px;
}
.search-wrapper {
    padding: 20px;
    border: 1px solid #d7e0f1;
    background: #fff;
}
</style>