<template>
  <div class="margin dealerlist">
    <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <el-page-header @back="back" content="系统公告 > 公告详情"></el-page-header>
          </div>
        </div>
    </div>
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="150px" size="small">
          <div class="search-wrapper">
            <h4 class="title">新增公告</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="10">
                  <el-col>
                    <el-form-item label="公告标题：">
                      <el-col :span="23">
                        <div>{{contentKeywords}}</div>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col> 
                <el-col :span="10">
                  <el-col>
                    <el-form-item label="公告链接：">
                      <el-col :span="23">
                        <div>{{contentLink}}</div>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col> 
                <el-col :span="10">
                  <el-col>
                    <el-form-item label="公告内容：">
                      <el-col :span="23">
                        <div>{{contentSort}}</div>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col> 
                
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
      
  </div>
</template>

<script>
import { 
  announcementDetail,
} from "@/api/mallapp/announcement/index";
export default {
  data() {
    return {
      contentKeywords: '',
      contentLink: '',
      contentSort: '',
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
      const res = await announcementDetail(this.id);
      if (res.code === 200) {
          // console.log(res.data)
          this.contentKeywords = res.data.title;
          this.contentLink = res.data.jumpUrl;
          this.contentSort = res.data.content;
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
</style>