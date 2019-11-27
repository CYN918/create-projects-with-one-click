<template>
  <div class="margin dealerlist">
    <div class="mbottom">
			<div class="goods-fitter">
				<div class="search-wrapper">
            <el-page-header @back="back" content='详情'></el-page-header>
        </div>
			</div>
		</div>
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="150px" size="small">
          <div class="search-wrapper">
            <h4 class="title">详情</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="6">
                  <el-col>
                    <el-form-item label="公司名称：">
                      <el-col :span="22">
                        <div>{{companyName}}</div>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col> 
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="部门：">
                      <el-col :span="23">
                        <div>{{department}}</div>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col> 
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="申请用户：">
                      <el-col :span="23">
                        <div>{{userName}}</div>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col> 
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="手机号码：">
                      <el-col :span="23">
                        <div>{{contactPhone}}</div>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-col>
                    <el-form-item label="申请类型：">
                      <el-col :span="22">
                        <div>{{discountType}}</div>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col> 
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="申请折扣率：">
                      <el-col :span="23">
                        <div>{{discountRate}}</div>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col> 
                <el-col :span="6">
                  <el-col>
                    <el-form-item label="申请原因：">
                      <el-col :span="23">
                        <div>{{remark}}</div>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col> 
                
              </el-row>
              <el-row>
                <el-col :span="6">
                  <el-col>
                    <el-form-item label="申请时间：">
                      <el-col :span="22">
                        <div>{{createTime}}</div>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col> 
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="审核状态：">
                      <el-col :span="23">
                        <div>{{auditPlan}}</div>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col> 
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="审核理由：">
                      <el-col :span="23">
                        <div>{{taskComment}}</div>
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
    <div class="mbottom">
			<div class="goods-fitter">
        
				<div class="search-wrapper" v-if="this.list != null">
            <h4 class="title">申请商品分类</h4>
            <el-table :data="list" border style="width: 100%" stripe>
              <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
              <el-table-column label="一级分类" align="center">
                <template slot-scope="scope">
                  <div>   
                    {{scope.row.catName}}
                  </div>
                </template>
                
              </el-table-column>
              <el-table-column label="二级分类" align="center">
                <template slot-scope="scope">
                  <div>   
                    <li v-for="item in scope.row.children" style="margin: 0px 15px 0px 15px;float: left;">{{item.catName}}</li>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="三级分类" align="center">
                <template slot-scope="scope">
                  <div>   
                    <li v-for="item in scope.row.children" style="margin-let: 15px;"><span v-for="val in item.children" style="display: inline-block;margin: 0px 15px 0px 15px;">{{val.catName}}</span></li>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="discountRate" label="折扣率" align="center"></el-table-column>
              
            </el-table>
            <!-- <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="listQuery.pageIndex"
                :page-sizes="[10, 30, 50, 100]"
                :page-size="listQuery.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div> -->
        </div>

        <div class="search-wrapper" v-else>
          <h4 class="title">申请商品信息</h4>
          <el-table
				:data="tableData"
				stripe
				style="width: 100%"
				border
				ref="elTable"
				class="goods_index"
			>
				<el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
        <el-table-column label="商品图片" align="center">
          <template slot-scope="scope">
            <div class="image" v-if="scope.row.skuInfo" v-for="item in scope.row.skuInfo">
              <img
                :src="item.thumbnailImgUrl"
                width="100"
                height="100"
                alt
              />
            </div>
            <div v-if="!scope.row.skuInfo">暂无图片</div>
          </template>
        </el-table-column>
        
        <el-table-column label="商品信息" align="center">
          <template slot-scope="scope">
            <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
            <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
            <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
            <div class="txt_left">品牌：{{scope.row.brandName}}</div>
            <div class="txt_left">上传方式：{{scope.row.sourceType}}</div>
          </template>
        </el-table-column>
        <el-table-column label="价格信息" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.skuInfo" v-for="item in scope.row.skuInfo">
                <div class="txt_left">
              商城价：{{item.costPrice}}
            </div>
            <div class="txt_left">
              市场价：{{item.costPrice}}
            </div>
            <div class="txt_left">
              税率：{{item.taxRate}}
            </div>
            <div class="txt_left">
              一件代发价：
              <span
                class="blue"
                v-if="item.costPrice != 0"
              >{{item.costPrice}}</span>
              <span v-if="item.costPrice == 0">不支持一件代发</span>
            </div>
            <div class="txt_left">
              运费：{{item.carriagePrice
              !=0?item.carriagePrice:item.carriagePrice==
              ''?'含运费':'含运费'}}
            </div>
            <div class="txt_left">
              京东价：{{item.costPrice}}
            </div>
            <div class="txt_left">
              {{item.shopPrice}}
            </div>
            <div class="txt_left">
              {{item.price}}
            </div>
            <div class="txt_left">
              市场价对比京东折扣率：{{item.costJdRatio}}
            </div>
            <div class="txt_left">
              商城价对比京东折扣率：{{item.shopJdRatio}}
            </div>
            </div>  
          </template>
        </el-table-column>
        <el-table-column label="商品规格" align="center">
          <template slot-scope="scope">
              <div class="txt_left martop" v-if="scope.row.skuInfo" v-for="item in scope.row.skuInfo">  
                <li class="more">{{item.goodsSpecValues}}</li>
              </div>
          </template>
        </el-table-column>
        <el-table-column label="利润统计" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.skuInfo" v-for="item in scope.row.skuInfo">
               <span class="goods_num">{{item.grossProfit}}</span>
            <div
              class="txt_left"
              style="margin-top: 40px;"
            >毛利润率：{{item.grossProfitMargin}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="库存(PCS)" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.skuInfo" v-for="item in scope.row.skuInfo">
               <span class="goods_num">{{item.goodsNumber}}</span>
            <div
              class="txt_left"
              style="margin-top: 40px;"
            >库存预警：{{item.warnNumber}}</div>
            </div>   
          </template>
        </el-table-column>
        <el-table-column label="供应商" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.skuInfo" v-for="item in scope.row.skuInfo">
                <div
              class="txt_left"
              style="font-size:15px"
              >{{item.suppliersName}}</div>
              <div class="txt_left">联系人：{{item.contactName}}</div>
              <div class="txt_left">联系人电话：{{item.contactTelephone}}</div>
              <div class="txt_left">QQ：{{item.contactQq}}</div>
            </div>
            <div class="txt_left">管理员：{{scope.row.adminName}}</div>
            <div class="txt_left">管理员手机/邮箱：{{scope.row.adminPhone+'/'+scope.row.adminPhone}}</div>
          </template>
        </el-table-column>			    
			</el-table>

          <!-- <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="listQuery.pageIndex"
                :page-sizes="[10, 30, 50, 100]"
                :page-size="listQuery.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
              </el-pagination>
            </div> -->
        </div>
			</div>
		</div>
  </div>
</template>

<script>
import { findDiscountAudit } from "@/api/product/index";
export default {
  data() {
    return {
      id: this.$route.query.id,
      list: [],
      tableData: [],
      total: 10,
      listQuery: {
          pageIndex: 1, // 当前页
          pageSize: 10, // 每页展示量
      },
      companyName: '',
      department: '',
      userName: '',
      contactPhone: '',
      discountType: '',
      discountRate: '',
      remark: '',
      createTime: '',
      auditPlan: '',
      taskComment: '',
    };
  },
  created() {
    this.getList();
  },
  computed: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    //获取数据
    getList() {
      const obj = {
        pageIndex: this.listQuery.pageIndex,
        pageSize: this.listQuery.pageSize,
        parentId: this.id
      };
      findDiscountAudit(obj)
      .then(res => {
        if(res.code === 200){
          res.data.list.forEach(element => {
            element.auditTasks.forEach(item => {
              this.taskComment = item.taskComment
            })
            this.list = element.formData.catInfo;
            this.tableData = element.formData.goodsInfos;
            this.companyName = element.formData.companyName;
            this.contactPhone = element.formData.contactPhone;
            this.userName = element.formData.userName;
            this.department = element.formData.department;
            this.discountRate = element.formData.discountRate;
            if(this.list != null){
              this.list.forEach(v => {
                  this.$set(v, 'discountRate', element.formData.discountRate)
                  return v
              })
            } 
            console.log(this.list)
            this.remark = element.formData.remark;
            this.createTime = element.createTime;
            if(element.formData.auditPlan == 0){
              this.auditPlan = '未申请'
            }else if(element.formData.auditPlan == 1){
              this.auditPlan = '待审核'
            }else if(element.formData.auditPlan == 2){
              this.auditPlan = '通过'
            }else if(element.formData.auditPlan == 3){
              this.auditPlan = '未通过'
            }else if(element.formData.auditPlan == 4){
              this.auditPlan = '审核中'
            }
            console.log(element.formData.discountType)
            if(element.formData.discountType == 1){
              this.discountType = '单品折扣'
            }else if(element.formData.discountType == 2){
              this.discountType = '分类折扣'
            }else if(element.formData.discountType == 3){
              this.discountType = '全品折扣'
            }
          });
        }
      })
    },
    //页容量改变
    handleSizeChange(val) {
        this.listQuery.pageSize = val
        this.getList()
    },
    //当前页改变
    handleCurrentChange(val) {
        this.listQuery.pageIndex = val
        this.getList()
    },
    
  },
  components: {

  }
};
</script>

<style scoped>
.goods-fitter .search-wrapper{
    padding: 20px;
    border: 1px solid #d7e0f1;
    background: #fff;
}
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