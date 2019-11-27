<template>
    <div id="addPurchasing">
        <el-dialog width="75%" :visible.sync="editVisible" :before-close="createClosing">  
        <div class="mbottom" >
          <div class="goods-fitter"
          >
              
            <el-form ref="infoForm" :model="form" :rules="rules" label-width="140px" size="small" >
              <div class="search-wrapper">
                <div class="search-base">
                    <div class="outTitle">
                      <h1>出库单</h1> 
                    </div>
            <el-row>
                  <el-col :span="8">
                    <el-col>
                      <el-form-item label="出库单号：">
                        <el-col :span="19">
                          <span>{{deliveryData.shipmentBillNo}}</span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="销售单号：">
                      <el-col :span="19">
                        <span>{{deliveryData.saleOrderNo}}</span>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-col>
                      <el-form-item label="客户名称：" prop="customerName">
                        <el-col :span="19">
                          <el-input v-model="deliveryData.customerName" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="联系人：" prop="customerContact">
                      <el-col :span="19">
                        <el-input v-model="deliveryData.contact" readonly></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="手机号码：" prop="phone">
                      <el-col :span="19">
                        <el-input v-model="deliveryData.phone" readonly></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  
                  <el-col :span="8">
                    <el-col>
                      <el-form-item label="销 售 员：" prop="saleUser">
                        <el-col :span="19">
                          <el-input v-model="deliveryData.saleUserName" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                 
                  <el-col :span="8">
                    <el-form-item label="运输方式：">
                      <el-col :span="19">
                        <el-input v-model="deliveryData.transportType" readonly></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="出货日期：">
                      <el-col :span="19">
                        <el-input v-model="deliveryData.shipmentDate" readonly></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                        <el-form-item label="收货地址：">
                          <el-col :span="23">
                            <el-input v-model="deliveryData.shippingAddress" readonly></el-input>
                          </el-col>
                        </el-form-item>        
                </el-row>
                <el-row>
                    <el-form-item label="备 注：">
                      <el-col :span="23">
                        <el-input v-model="deliveryData.remark" readonly></el-input>
                      </el-col>
                    </el-form-item>
          
                </el-row>
              </div>
 
              <div class="mbottom">
                <div class="goods-fitter">
                  <div class="mcard" style="width:1200px;margin:0 auto">
                    <el-table :data="deliveryData.details" border stripe>
                      <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                      <el-table-column prop="customerType" label="商品信息" align="center" width="180">
                          <template slot-scope="scope">
                            <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                            <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                            <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                            <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                          </template>
                      </el-table-column>
                      <el-table-column
                        prop="commonContactName"
                        label="规格尺寸"
                        align="center"
                        width="106"
                      >
                        <template slot-scope="scope">
                              {{scope.row.specSize}}
                        </template>
                      
                      </el-table-column>
                      <el-table-column prop="commonContactDept" label="销售数量" align="center">
                            <template slot-scope="scope">
                              {{scope.row.goodsCount}}
                          </template>

                      </el-table-column>
                      <el-table-column prop="commonContactDept" label="出货仓" align="center">
                           <template slot-scope="scope">
                              {{scope.row.warehouseName}}
                          </template>
                      </el-table-column>
                      <el-table-column prop="commonContactDept" label="已出货数量" align="center">
                            <template slot-scope="scope">
                              {{scope.row.storedQuantity}}
                          </template>
                      </el-table-column>
                      <el-table-column prop="commonContactDept" label="未出货数量 " align="center">
                          <template slot-scope="scope">
                              {{scope.row.unstockeQuantity}}
                          </template>
                      </el-table-column>
                      <el-table-column prop="commonContactDept" label="本次出货数量 " align="center">
                            <template slot-scope="scope">
                              {{scope.row.shipmentQuantity}}
                          </template>
                      </el-table-column>

                      <el-table-column label="不含税单价" align="center" >
                              <template slot-scope="scope">    
                                      {{scope.row.notaxCostPrice}}        
                             </template>
                     </el-table-column>
                      <el-table-column label="税费" align="center">
                             <template slot-scope="scope">    
                                      {{scope.row.taxation}}             
                             </template>
                     </el-table-column>
                      <el-table-column label="含税单价" align="center">
                               <template slot-scope="scope">
                                          {{scope.row.goodsPrice}}
                              </template>
                    </el-table-column>
                     <el-table-column label="合计" align="center" >
                            <template slot-scope="scope">
                              {{scope.row.totalPrice}}
                          </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
                <div class="looks">
                  <div class="total" style="margin-left:81%;">
                    <el-form label-width="130px" size="small">
                      <el-form-item label="本次出货合计：">
                        <el-col :span="24">
                          <span>{{total1}}</span>
                        </el-col>
                      </el-form-item>
                    </el-form>
                  </div>

                  <div
                    class="left"
                    style="margin-left:20px;line-height:60px;"
                  >供 应 商：________________</div>
                  <div class="content" style="margin-left:20px;">
                    <span style="margin-right:67px">审 批 人：________________</span>
                    <span style="margin-right:67px">制 单 人：________________</span>
                    <span style="margin-right:67px">送 货 人：________________</span>
                    <span style="margin-right:67px">签 收 人：________________</span>
                  </div>
                </div>
              </div>
            </div>
            </el-form>

          </div>
        </div>
       
         
       
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="createClose()" size="small">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import { getErpGoods } from "@/api/product/index";
export default {
    data(){
        return{
            editVisible:false,
            deliveryData:'',
            dataArr: [],
             tableDatas: {
                currentPage: 1,
                sizes: [10, 20, 50, 100],
                size: 10,
                total: 0
                },
             form: {
                current_page: 0,
                page_size: 10,
                total_count: 0,
                contractNumber: "", //合同编号
                relevantBusiness: "", //关联业务单号
                customerName:'',//客户名称
                customerContact:'',//联系人
                saleUser:'',//销售员
                projectName: "", //项目名称
                deliveryDate:'',//交货日期
                transportMode:'',//运输方式
                finance:'',//财务人员
                shipDate:'',//出货日期
                phone:'',//手机
                remark:'',//备注
            },
            formData: {
                current_page: 1,
                page_size: 2,
                total_count: 0
            },
            tableData:[
                  {
                  date: '2016-05-02',
                  name: '张小虎',
                  address: '上海市普陀区金沙江路 1518 弄'
                }, {
                  date: '2016-05-04',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1517 弄'
                }, {
                  date: '2016-05-04',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1517 弄'
                },
                {
                  date: '2016-05-04',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1517 弄'
                },{
                  date: '2016-05-04',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1517 弄'
                },{
                  date: '2016-05-04',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1517 弄'
                },{
                  date: '2016-05-04',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1517 弄'
                },
              ],
                    rules: {
                partyA: [{ required: true, message: "此项为必填项", trigger: ["blur","change"] }],
                partyAAddress: [
                { required: true, message: "此项为必填项", trigger: ["blur","change"] }
                ],
                partyAContacts: [
                { required: true, message: "此项为必填项", trigger: ["blur","change"] }
                ],
                deliveryDate:[
                  { required: true, message: "此项为必填项", trigger: ["blur","change"] } 
                ],
                orderAmount:[
                  { required: true, message: "此项为必填项", trigger: ["blur","change"] } 
                ]
            }
        }
    },
     created() {
  },
    props:["editVisibles",'detailData'],
    watch: {
    editVisibles(val) {
      this.editVisible = val;
        },
    detailData(val){
      this.deliveryData = val;
    }
    },
    computed:{
     total1(){
      let totals = 0
      let _this = this
      if(_this.deliveryData.details&&_this.deliveryData.details.length>0){
          for(var i = 0;i<_this.deliveryData.details.length;i++){
            if(_this.deliveryData.details[i].totalPrice){
              totals+=parseFloat(_this.deliveryData.details[i].totalPrice)
            }else{
              totals = 0
            }
      }
        
      }
        return totals
      
    }
  },
    methods:{
    //关闭页面
     createClose() {
      this.editVisible= false;
      this.$emit("createClose1", this.editVisible);
    },
    createClosing() {
      this.editVisible = false;
      this.$emit("createClosing1", this.editVisible);
    },
    address(){

    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleChange() {}
    }
}
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
 #addPurchasing{
     .search-wrapper {
        padding: 20px;
        padding-bottom: 10px;
        border: 1px solid rgb(215, 224, 241);
        background: #fff;
        .title {
          margin-left: -20px;
          font-size: 16px;
          color: 3333;
          padding-left: 10px;
          line-height: 1.4;
          border-left: 4px solid $themeColor;
          margin-bottom: 10px;
        }
        .title1 {
          margin-left: -20px;
          font-size: 16px;
          color: 3333;
          padding-left: 10px;
          line-height: 1.4;
          border-left: 4px solid $themeColor;
          margin-bottom: 10px;
        }
      }
    .mail-fitter {
      .mail-wrapper {
        padding: 20px;
        padding-bottom: 0;
        border: 1px solid rgb(215, 224, 241);
        background: #fff;
        .title1 {
          margin-left: -20px;
          font-size: 16px;
          font-weight: 400;
          color: 3333;
          padding-left: 10px;
          line-height: 1.4;
          border-left: 4px solid $themeColor;
          margin-bottom: 23px;
        }
      }
    }
     .box{
      margin-left: 12px;
      margin-top:10px;
    }
    .outTitle{
      text-align: center;
      font-size: 30px;
      margin-bottom: 40px;
    }
    .total{
      position: relative;
     
    }
     .left{
        font-size:16px;
        color:#606266;
        font-weight:bold;
        margin-left:20px;
      }
    .content{
      width: 100%;
     span{
        font-size:16px;
        color:#606266;
        font-weight:bold;
     }
    }
    .el-input-group__append button.el-button {
      width:50px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
    }
    .el-input-number.is-controls-right .el-input-number__decrease {
      background: #fff !important;
    }
    .el-input-number.is-controls-right .el-input-number__increase {
      background: #fff !important;
    }
    .looks{
      padding-left:80px;
    }
 }
</style>