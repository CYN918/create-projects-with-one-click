<template>
    <div id="addPurchasing">
        <el-dialog width="77%" :visible.sync="addVisible" :before-close="createClosing">  
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">生成出库单</h4>
              </div>
            </el-form>
          </div>
        </div>
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form ref="infoForm" :model="form" :rules="rules" label-width="140px" size="small">
              <div class="search-wrapper">
                <div class="mbottom">
                  <h4 class="title1">客户信息</h4>
                </div>
                <div class="search-base">
                  <el-row>
                    <el-col :span="8">
                      <el-col>
                        <el-form-item label="出库单号：">
                          <el-col :span="19">
                            <span>保存后自动生成</span>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="销售单号：">
                        <el-col :span="19">
                            <span>{{OrderData.saleOrderNo}}</span>
                        </el-col>
                      </el-form-item>
                    </el-col>

                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-col>
                        <el-form-item label="客户名称：" prop="customerName">
                          <el-col :span="19">
                            <el-input v-model="OrderData.customerName" ></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="8">
                      <el-form-item label="联 系 人：" prop="customerContact" >
                        <el-col :span="19">
                              <el-input v-model="OrderData.contact" ></el-input> 
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                      <el-col>
                        <el-form-item label="手机号码：" prop="phone">
                          <el-col :span="19">
                            <el-input v-model="OrderData.phone" ></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="8">
                      <el-form-item label="销 售 员：" prop="distAddress">
                        <el-col :span="19">
                          <el-input v-model="OrderData.bizUserName" ></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="运输方式：" prop="deliveryBoy">
                        <el-col :span="19">
                          <el-select v-model="OrderData.transportType" style="width:100%;">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="出货日期：" prop="shipmentDate">
                        <el-col :span="19">
                          <el-date-picker
                                    v-model="OrderData.shipmentDate" 
                                    type="date"
                                    valueFormat='yyyy-MM-dd HH:mm:ss' 
                                    style="width:100%;"
                                    placeholder="选择日期"
                                    :picker-options="pickerOptions0"
                                    >
                                  </el-date-picker>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
    
                            <el-form-item label="收货地址：" prop="remark">
                            <el-col :span="23">
                              <el-input v-model="OrderData.shippingAddress" ></el-input>
                            </el-col>
                          </el-form-item>
            

                  </el-row>
                  <el-row>
                          <el-form-item label="备 注：" prop="transportMode">
                            <el-col :span="23">
                                   <el-input v-model="OrderData.remark" ></el-input>
                            </el-col>
                        </el-form-item>
                  </el-row>
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <div class="goods-fitter">
         

          <div class="mail-fitter" style="margin-top:20px">
            <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
              <div class="mail-wrapper">
                <h4 class="title1">产品清单</h4>
                <div class="search-base">
                  <div class="mbottom">
                    <div class="goods-fitter">
                      <div class="mcard" style="padding-bottom:0">
                        <el-table :data="OrderData.details" border style="width: 100%" stripe>
                          <el-table-column  label="序号" type="index" align="center" width="50"></el-table-column>
                          <el-table-column prop="customerType" label="商品信息" align="center" width="190">
                                 <template slot-scope="scope">
                                    <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                                    <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                                    <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                                    <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                                    <div class="txt_left">SKU：{{scope.row.skuId}}</div>
                                 </template>
                          </el-table-column>
                          <el-table-column prop="commonContactName" label="规格尺寸" align="center" width="140">
                                   <template slot-scope="scope">
                                          {{scope.row.specSize}}
                                   </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="销售数量" align="center" >
                                     <template slot-scope="scope">
                                          {{scope.row.goodsCount}}
                                   </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="出货仓" align="center" width="120">
                                     <template slot-scope="scope">
                                          <el-select v-model="scope.row.warehouseId" placeholder="请选择"
                                          size="small">
                                              <el-option
                                                v-for="item in scope.row.situations"
                                                :key="item.warehouseId"
                                                :label="item.warehouseName"
                                                :value="item.warehouseId">
                                              </el-option>
                                          </el-select>
                                     </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="库存数量" align="center">
                                      <template slot-scope="scope">
                                           {{scope.row.balanceCount}}
                                      </template>
                          </el-table-column>
                          
                          <el-table-column prop="commonContactDept" label="已出货数量" align="center" width="100">
                                    <template slot-scope="scope">
                                          {{scope.row.storedQuantity}}
                                   </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="未出货数量" align="center" width="100">
                                    <template slot-scope="scope">
                                          {{scope.row.unstockeQuantity}}
                                   </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="本次出货数量" align="center" width="100">
                                    <template slot-scope="scope">
                                         <el-input v-model=" scope.row.shipmentQuantity" size="small"> </el-input>
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
                          <el-table-column label="合计" align="center"  width="90">
                                  <template slot-scope="scope">
                                           {{scope.row.totalPrice}}
                                   </template>
                          </el-table-column>
                         
                        </el-table>
                    <div class="total" style="margin-left:80%;margin-top:20px">
                        <el-form label-width="130px" size="small">
                            <el-form-item label="总合计：">
                              <el-col :span="24">
                                <el-input v-model="total1"></el-input>
                              </el-col>
                            </el-form-item>
                        
                      </el-form>
                   </div>
                       <!--  <div class="pagination">
                          <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="tableDatas.currentPage"
                            :page-sizes="[10,20,50,100]"
                            :page-size="tableDatas.size"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="tableDatas.total"
                          ></el-pagination>
                        </div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="createClose()" size="small">关 闭</el-button>
          <el-button type="primary" @click="saveOrder()" size="small">保存</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import { throttleTipPop } from "@/utils/functions.js";
import { getErpGoods } from "@/api/product/index";
import {saveOutStorageOrder} from "@/api/sale/index"
export default {
    data(){
        return{
          pickerOptions0: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
            }, 
            value1:'',
            addVisible:false,
            OrderData :'',
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
                customerName:'',//客户
                customerContact:'',//联系人
                projectName: "", //项目名称
                deliveryDate:'',//交货日期
                phone:'',//手机
                distAddress:'',//收货地址
                deliveryDate:'',//送货日期
                remark:'',//备注
                deliveryBoy:'',//送货员
                transportMode:'',//运输方式
            },
            options:[
              {value:1,
              label:'公司'
              },
              {value:2,
              label:'物流'
              },
            ], 
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
      props:["addVisibles","outOrderData"],
    watch: {
    addVisibles(val) {
      this.addVisible = val;
        },
    outOrderData(val){
      this.OrderData = val;
    },
    'OrderData.details':{
      handler(val){
          if(val.length>0){
            for(let i=0;i<val.length;i++){

                if(val[i].shipmentQuantity>val[i].unstockeQuantity){
                  val[i].shipmentQuantity=val[i].unstockeQuantity;
                  throttleTipPop(this, "error", "本次出货数量不能大于未出货数量", 2000);
                }
            }
          }
           if(val.length>0){
            for(var a=0;a<val.length;a++){
              
              val[a].totalPrice = val[a].shipmentQuantity * val[a].goodsPrice;
              
              if(val[a].situations.length>0){
                for(var b=0;b<val[a].situations.length;b++){
                       if(val[a].situations[b].warehouseId==val[a].warehouseId){
                         val[a].balanceCount = val[a].situations[b].balanceCount
                         val[a].warehouseName = val[a].situations[b].warehouseName
                       }
                    }
                  }
              }
           }

      },deep:true
    } ,
    
    },
    computed: {
      total1(){
      let totals = 0
      let _this = this
      if(_this.OrderData.details&&_this.OrderData.details.length>0){
          for(var i = 0;i<_this.OrderData.details.length;i++){
            if(!isNaN(_this.OrderData.details[i].totalPrice)){
              totals+=parseFloat(_this.OrderData.details[i].totalPrice)
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
      
      this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                      this.addVisible= false;
                      this.$emit("createClose1", this.addVisible);
                })
                .catch(_ => {});
    },
    createClosing() {
      
      this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                      this.addVisible = false;
                      this.$emit("createClosing1", this.addVisible);
                })
                .catch(_ => {});
    },
     //生成出货单
    saveOrder(){
      
      saveOutStorageOrder(this.OrderData).then(res=>{
            if(res.code===200){
              throttleTipPop(this, "success", "生成出库单成功", 2000);
              this.addVisible =false;
              this.$emit('saveOutOrder1',this.addVisible)
            }
      })
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
    /deep/ .el-dialog__headerbtn{
      top:10px;
    }

 }
</style>