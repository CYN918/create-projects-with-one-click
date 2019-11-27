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
            <h4 class="title" v-if="this.user.data.sysuserType === 0">总站额度发放管理基本信息详情</h4>
            <h4 class="title" v-if="this.user.data.sysuserType === 3">经销商额度发放管理基本信息详情</h4>
            <div class="search-base">
              <el-row>
                <div class="lines-details">
                    <ul>
                        <li><label><i></i>经销商名称:</label><span>{{ form.agencyName }}</span></li>
                        <li><label><i></i>审核说明:</label><span>{{ form.auditInstruction }}</span></li>
                        <li><label><i></i>审核状态:</label><span>{{ form.auditStatus }}</span></li>  
                        <li><label><i></i>审核时间:</label><span>{{ form.auditTime }}</span></li>
                        <li><label><i></i>审核人:</label><span>{{ form.auditUserName }}</span></li>

                        <li><label><i></i>受益人类型:</label><span>{{ form.beneficiaryType }}</span></li>
                        <li><label><i></i>创建时间:</label><span>{{ form.createTime }}</span></li>
                        <li><label><i></i>创建人名称:</label><span>{{ form.createUserName }}</span></li>  
                        <li><label><i></i>客户名称:</label><span>{{ form.customerName }}</span></li>
                        <li><label><i></i>发放的额度:</label><span>{{ form.payAmount }}</span></li>
                        <li><label><i></i>发放说明:</label><span>{{ form.payInstruction }}</span></li>

                        <li><label><i></i>发放状态:</label><span>{{ form.payStatus }}</span></li>
                        <li><label><i></i>发放时间:</label><span>{{ form.payTime }}</span></li>
                        <li><label><i></i>发放人:</label><span>{{ form.payUserName }}</span></li>  
                        <li><label><i></i>项目名称:</label><span>{{ form.projectName }}</span></li>
                        <li><label><i></i>是否限购商品:</label><span>{{ form.purchaseGoods }}</span></li>
                        <li><label><i></i>额度发放人:</label><span>{{ form.quotaExecutorName }}</span></li>

                        <li><label><i></i>发放的批号:</label><span>{{ form.quotaGrantNo }}</span></li>
                        <li><label><i></i>额度管理人:</label><span>{{ form.quotaManagerName }}</span></li>
                        <li><label><i></i>备注说明:</label><span>{{ form.remark }}</span></li>  
                        <li><label><i></i>状态:</label><span>{{ form.status }}</span></li>
                        <li><label><i></i>更新人名称:</label><span>{{ form.updateUserName }}</span></li>
                        <li><label><i></i>更新时间:</label><span>{{ form.updateTime }}</span></li>

                    </ul>
                </div>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>

     <div class="mbottom"  v-if="personal">
      <div class="goods-fitter">
        <el-form label-width="150px" size="small">
          <div class="search-wrapper">
            <h4 class="title" v-if="this.user.data.sysuserType === 0">发放给个人详情</h4>
            <h4 class="title" v-if="this.user.data.sysuserType === 3">发放给个人详情</h4>
            <div class="search-base">
              <el-row>
                <div class="lines-details">
                     <el-table :data="form.quotaBeneficiaryUserList" stripe  border>
                        <el-table-column  type="index" align="center" width="50"></el-table-column>
                        <el-table-column label="部门编号"  align="center" prop="organizeId"></el-table-column>
                        <el-table-column label="部门名称"  align="center" prop="organizeName"></el-table-column>
                        <el-table-column label="工号"  align="center" prop="userId"></el-table-column>
                        <el-table-column label="姓名" align="center" prop="userName"></el-table-column>
                        <el-table-column label="职位"  align="center" prop="position"></el-table-column>
                        <el-table-column label="账户类型"  align="center" prop="accountName"></el-table-column>
                    </el-table>
                </div>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>

     <div class="mbottom" v-if="ficiary">
      <div class="goods-fitter">
        <el-form label-width="150px" size="small">
          <div class="search-wrapper">
            <h4 class="title" v-if="this.user.data.sysuserType === 0">发放给部门详情</h4>
            <h4 class="title" v-if="this.user.data.sysuserType === 3">发放给部门详情</h4>
            <div class="search-base">
              <el-row>
                <div class="lines-details">
                    <el-table :data="form.quotaBeneficiaryUserList" stripe  border>
                      <el-table-column  type="index" align="center" width="50"></el-table-column>
                      <!-- <el-table-column label="品牌logo"  align="center" prop="">
                        <template>
                        </template>
                      </el-table-column> -->
                      <el-table-column label="账户类型"  align="center" prop="accountName"></el-table-column>
                      <el-table-column label="部门负责人"  align="center" prop="adminUserName"></el-table-column>
                      <el-table-column label="部门"  align="center" prop="organizeName"></el-table-column>
                      <el-table-column label="职位"  align="center" prop="position"></el-table-column>
                      <el-table-column label="部门额度管理人"  align="center" prop="quotaAdminUserName"></el-table-column>
                      <el-table-column label="部门额度发放人"  align="center" prop="quotaGrantUserName"></el-table-column>
                    </el-table>
                </div>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>

     <div class="mbottom" v-if="goods">
      <div class="goods-fitter">
        <el-form label-width="150px" size="small">
          <div class="search-wrapper">
            <h4 class="title" v-if="this.user.data.sysuserType === 0">限购商品详情</h4>
            <h4 class="title" v-if="this.user.data.sysuserType === 3">限购商品详情</h4>
            <div class="search-base">
              <el-row>
                <div class="lines-details">
                     <el-table :data="goodsList" stripe  border>
                      <el-table-column  type="index" align="center" width="50"></el-table-column>
                      <!-- <el-table-column label="品牌logo"  align="center" prop="">
                        <template>
                        </template>
                      </el-table-column> -->
                      <el-table-column label="商品品牌"  align="center" prop="brandName"></el-table-column>
                      <el-table-column label="商品分类"  align="center" prop="catName"></el-table-column>
                      <el-table-column label="商品名"  align="center" prop="goodsName"></el-table-column>
                      <el-table-column label="货号"  align="center" prop="goodsSn"></el-table-column>
                    </el-table>
                     <div class="pagination">
                        <el-pagination
                          @size-change="handleSizeChange3"
                          @current-change="handleCurrentChange3"
                          :current-page="pagination3.current_page"
                          :page-sizes="[10, 30, 50,100]"
                          :page-size="pagination3.page_size"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="pagination3.total_count"
                        ></el-pagination>
                      </div>
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
// import { getCategory, getStoreList } from "@/api/public";
import {  quotaMemberInfo  } from '@/api/creditmanage/index'
export default {
  data() {
    return {
      id: this.$route.query.id,
      user: JSON.parse(window.localStorage.getItem("user")),
      form:{},
      pagination3: {                   // 商品分页
          current_page: 1,
          page_size: 10,
          total_count: 0
      },
      goodsList:[],
      goods:false,
      ficiary:false,
      personal:false
    };
  },
  created() {
    console.log(this.user.data.sysuserType)
    this.quotaMemberInfo()
  },
  computed: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    quotaMemberInfo(){
       var data = {}
       data.id = this.id
       quotaMemberInfo(data).then( res => {
           console.log(res)
           this.form = res.data
           if( res.data.quotaGrantGoodsList.length ){
              this.goods = true
           }else{
              this.goods = false
           }
           if( res.data.quotaBeneficiaryUserList.length && res.data.beneficiaryType == 1 ){
              this.ficiary = true
           }else{
              this.ficiary = false
           }
           if( res.data.quotaBeneficiaryUserList.length && res.data.beneficiaryType == 0 ){
              this.personal = true
           }else{
              this.personal = false
           }
           // 审核状态 
           if( this.form.auditStatus == 0){
             this.form.auditStatus = "待审核"
           }else  if( this.form.auditStatus == 1){
             this.form.auditStatus = "审核通过"
           }else  if( this.form.auditStatus == 2){
             this.form.auditStatus = "审核失败"
           }
           // 受益人类型
           if( this.form.beneficiaryType == 0){
             this.form.beneficiaryType = "发放给个人"
           }else  if( this.form.beneficiaryType == 1){
             this.form.beneficiaryType = "发放给部门"
           }
            // 发放状态
           if( this.form.payStatus == 0){
             this.form.payStatus = "待发放"
           }else  if( this.form.payStatus == 1){
             this.form.payStatus = "已发放"
           }else  if( this.form.payStatus == 2){
             this.form.payStatus = "发放失败"
           }
           // 是否限购商品
           if( this.form.purchaseGoods == 0){
             this.form.purchaseGoods = "不限购"
           }else  if( this.form.purchaseGoods == 1){
             this.form.purchaseGoods = "限购"
           }
          // 状态
           if( this.form.status == 0){
             this.form.status = "正常"
           }else  if( this.form.status == 1){
             this.form.status = "已删除"
           }

           this.goodsList = []
           this.goodsList = res.data.quotaGrantGoodsList
           this.pagination3.total_count =  this.goodsList.length
          // this.tableData3 = goodsTable.slice(0,10)
           this.goodsList = res.data.quotaGrantGoodsList.slice((this.pagination3.current_page-1)*10,this.pagination3.page_size*this.pagination3.current_page)

       })    
    },
    handleSizeChange3 (val) {
      this.pagination3.page_size = val       // 单页显示多少条
      this.quotaMemberInfo()
    },
    handleCurrentChange3 (val) {
      this.pagination3.current_page = val
      this.quotaMemberInfo()
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
.pagination{
  text-align: right;
  margin: 20px;
}
</style>