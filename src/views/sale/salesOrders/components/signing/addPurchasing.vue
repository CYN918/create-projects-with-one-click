<template>
    <div id="addPurchasing">
        <el-dialog width="75%" :visible.sync="addVisible" :before-close="createClosing">  
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">生成订货单</h4>
              </div>
            </el-form>
          </div>
        </div>
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form ref="infoForm" :model="detailData1" :rules="rules" label-width="140px" size="small">
              <div class="search-wrapper">
                <div class="mbottom">
                  <h4 class="title1">客户信息</h4>
                </div>
                <div class="search-base">
                  <el-row>
                    <el-col :span="7">
                      <el-col>
                        <el-form-item label="订货单号：">
                          <el-col :span="22">
                            <span>保存后自动生成</span>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="平台名称：">
                        <el-col :span="22">
                            <span>{{detailData1.projectName}} </span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="销售单号：">
                        <el-col :span="22">
                            <span> {{detailData1.saleOrderNo}} </span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="联系人：" prop="customerContacts">
                          <el-col :span="19">
                            <el-input v-model="detailData1.customerContact"></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="交货日期：" prop="deliveryDate" >
                        <el-col :span="19">
                                 <el-date-picker
                                    v-model="detailData1.deliveryDate"
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
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="手机：" prop="mobilePhone ">
                          <el-col :span="19">
                            <el-input v-model="detailData1.phone"></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="收货地址：">
                        <el-col :span="19">
                          <el-input v-model="detailData1.dealAddress"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                        <el-form-item label="备注：">
                          <el-col :span="22">
                            <el-input v-model="detailData1.remark"></el-input>
                          </el-col>
                        </el-form-item>           
                  </el-row>
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <div class="goods-fitter">
          <el-form ref="infoForm" :model="detailData1" :rules="rules" label-width="140px" size="small">
            <div class="search-wrapper">
              <div class="mbottom">
                <h4 class="title1">订单金额</h4>
              </div>
              <div class="search-base">
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="合同总金额：">
                        <el-col :span="19">
                          <el-input v-model="detailData1.totalPrice" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="已订货总金额：">
                      <el-col :span="19">
                      
                          <el-input v-model="detailData1.orderedTotalPrice" readonly></el-input>
                    
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="未订货总金额：">
                        <el-col :span="19">
                          <el-input v-model="detailData1.unOrderedTotalPrice" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="本次订货总金额：" prop="thisOrderTotalPrice">
                      <el-col :span="19">
                        <el-input
                          v-model="detailData1.thisOrderTotalPrice" readonly
                        ></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>      
              </div>
            </div>
          </el-form>

          <div class="mail-fitter" style="margin-top:20px">
            <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
              <div class="mail-wrapper">
                <h4 class="title1">产品清单</h4>
                <div class="search-base">
                  <div class="mbottom">
                    <div class="goods-fitter">
                      <div class="mcard" style="padding-bottom:0">
                        <el-table :data="detailData1.goodsDetailParam" border style="width: 100%" stripe>
                          <el-table-column  label="序号" type="index" align="center" width="50"></el-table-column>
                          <el-table-column prop="customerType" label="商品信息" align="center" width="230">
                                    <template slot-scope="scope">
                                          <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                                          <div class="txt_left" >货号：{{scope.row.goodsSn}}</div>
                                          <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                                          <div class="txt_left">型号：无</div>
                                          <div class="txt_left">SKU：{{scope.row.goodsSkuId}}</div>
                                    </template>
                          </el-table-column>
                          <el-table-column prop="commonContactName" label="规格尺寸" align="center">
                                          <template slot-scope="scope">
                                              {{scope.row.goodsSpecSize}}
                                          </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="总销售数量" align="center">
                                        <template slot-scope="scope">
                                          {{scope.row.goodsCount}}
                                        </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="未订货数量" align="center">
                                        <template slot-scope="scope">
                                         {{scope.row.unorderedGoodsCount}}
                                        </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="已订货数量" align="center">
                                        <template slot-scope="scope">
                                          {{scope.row.orderedGoodsCount}}
                                        </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="本次订货数量" align="center" width="100">
                                        <template slot-scope="scope">
                                          <el-input v-model="scope.row.thisOrderedGoodsCount" size="small" ></el-input>
                                        </template>
                          </el-table-column>
                          <el-table-column label="不含税单价" align="center" >
                          <template slot-scope="scope">    
                                  {{scope.row.notTaxPrice}}
                          </template>
                        </el-table-column>
                        <el-table-column label="税费" align="center">
                          <template slot-scope="scope">    
                                  {{scope.row.tax}}              
                          </template>
                        </el-table-column>
                        <el-table-column label="含税单价" align="center">
                          <template slot-scope="scope">
                                 <el-input v-model="scope.row.goodsPrice" size="small"></el-input>
                           </template>
                      </el-table-column>
                          <el-table-column label="合计" align="center">
                                    <template slot-scope="scope">
                                          <el-input v-model="scope.row.totalPrice" size="small"></el-input>
                                    </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="制作要求" align="center">
                                   <template slot-scope="scope">
                                        {{scope.row.productionRequire}}
                                  </template>
                          </el-table-column>
                        </el-table>
                         <div class="total" style="margin-left:80%;margin-top:20px">
                        <el-form label-width="130px" size="small">
                            <el-form-item label="合计：">
                              <el-col :span="24">
                                <el-input v-model="total1"></el-input>
                              </el-col>
                            </el-form-item>
                        
                      </el-form>
                      </div>
                        <!-- <div class="pagination">
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
          <el-button type="primary" @click="createSave()" size="small">保存</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<script>
import {createOrederForm} from '@/api/sale/index'
import { throttleTipPop } from "@/utils/functions.js";
export default {
    data(){
        return{
            pickerOptions0: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
          },
            addVisible:false,
            pageList:[],
            dataArr: [],
            detailData1:{},
            orderId:"",//销售订单号
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
                saleUser:'',//销售员
                projectName: "", //项目名称
                deliveryDate:'',//交货日期
                mobilePhone:'',//手机
                address:'',//收货地址
                remark:'',//备注
                contractAmount:'',//合同总金额
                totalAmount:'',// 已订货总金额 
                unorderedAmount:'',//未订货总金额
                orderAmount:'',//本次订货总金额
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
                  date: '2016-05-01',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1519 弄'
                }, {
                  date: '2016-05-03',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1516 弄'
                },
                
              ],
                    rules: {
                partyA: [{ required: true, message: "此项为必填项", trigger: ["blur","change"]  }],
                partyAAddress: [
                { required: true, message: "此项为必填项", trigger: ["blur","change"]  }
                ],
                partyAContacts: [
                { required: true, message: "此项为必填项", trigger: ["blur","change"]  }
                ],
                deliveryDate:[
                  { required: true, message: "此项为必填项", trigger: ["blur","change"]  } 
                ],
                thisOrderTotalPrice:[
                  { required: true, message: "此项为必填项", trigger: ["blur","change"] } 
                ]
            }
        }
    },
 
    props:["addVisibles",'page1','detailData2',"closeId"],
    computed: {
        total1(){
          let totals = 0
          let _this = this
          if(_this.detailData1.goodsDetailParam&&_this.detailData1.goodsDetailParam.length>0){
              for(var i = 0;i<_this.detailData1.goodsDetailParam.length;i++){
                if(!isNaN(_this.detailData1.goodsDetailParam[i].totalPrice)){
                  totals+=parseFloat(_this.detailData1.goodsDetailParam[i].totalPrice)
                }else{
                  totals = 0
                }
          }         
          }
            this.detailData1.thisOrderTotalPrice = totals;
            return totals  
      }
    },
    watch: {
        addVisibles(val) {
          this.addVisible = val;
            },
        detailData2(val){
          this.detailData1 = val
        },
        closeId(val){
          this.orderId = val
        },
        //监听数组中值变化
      "detailData1.goodsDetailParam":{
          handler(newVal, oldVal) {
            console.log(newVal);
            
            for(let i=0;i<newVal.length;i++){
              if(Number(newVal[i].thisOrderedGoodsCount)>=0&&Number(newVal[i].goodsPrice)>=0){
                newVal[i].totalPrice = Number(newVal[i].thisOrderedGoodsCount)*Number(newVal[i].goodsPrice)        
              }
              if(newVal[i].thisOrderedGoodsCount>newVal[i].unorderedGoodsCount) {
                  throttleTipPop(this, "error", "本次订货数量不能大于未订货数量", 2000);
                  newVal[i].thisOrderedGoodsCount=newVal[i].unorderedGoodsCount
              }
            }
        },
        deep: true
        }  
    },
     created() {
  },
    methods:{
    //关闭页面
     createClose() {
      
      this.$confirm('您确认要关闭吗？')
                    .then(_ => {
                this.addVisible= false;
                this.$emit("createCloseA", this.addVisible);
            })
            .catch(_ => {});
    },
    createClosing() { 
      this.$confirm('您确认要关闭吗？')
                    .then(_ => {
                this.addVisible = false;
                this.$emit("createClosingA", this.addVisible);
            })
            .catch(_ => {});
    },
    //生成订货单
    createSave(){      
       if(!this.detailData1.deliveryDate){
            throttleTipPop(this, "warning", "请填写带*的填项", 2000);
       }
       else{createOrederForm(this.detailData1).then(res=>{
                if(res.code===200){
                  throttleTipPop(this, "success", "生成订货单", 2000);
                  this.addVisible = false;
                  this.$emit('createOrederForm1',this.addVisible)
                }
                
        })
       }
      
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

      background: #fff;
    }
    .el-input-number.is-controls-right .el-input-number__decrease {
      background: #fff !important;
    }
    .el-input-number.is-controls-right .el-input-number__increase {
      background: #fff !important;
    }
 }
</style>