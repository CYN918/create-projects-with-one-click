<template>
    <div id="addPurchasing">
        <el-dialog width="66.9%" :visible.sync="editVisible" :before-close="createClosing">  
      <div id="printTest" >
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
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="出货单号：">
                          <el-col :span="19">
                            <span>CHD201908300001</span>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="销售单号：">
                        <el-col :span="19">
                            <span>SO201908280001 </span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="客户名称：" prop="customerName">
                          <el-col :span="19">
                            <el-input v-model="form.customerName"></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                       <el-form-item label="联系人：" prop="customerContact">
                          <el-col :span="19">
                            <el-input v-model="form.customerContact"></el-input>
                          </el-col>
                        </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-form-item label="手机号码：" prop="phone">
                          <el-col :span="19">
                            <el-input v-model="form.phone"></el-input>
                          </el-col>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="销 售 员：" prop="saleUser">
                          <el-col :span="19">
                            <el-input v-model="form.saleUser"></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                  </el-row>
                  <el-row> 
                    <el-col :span="12">
                      <el-form-item label="收货地址：">
                        <el-col :span="19">
                          <el-input v-model="form.deliveryAddress"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="运输方式：">
                        <el-col :span="19">
                          <el-input v-model="form.transportMode"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                   
                  </el-row>
                  <el-row>
                      <el-col :span="12">
                      <el-form-item label="出货日期：">
                        <el-col :span="19">
                              <el-input v-model="form.shipDate"></el-input> 
                        </el-col>
                        </el-form-item>  
                     </el-col>
                     <el-col :span="12">
                      <el-form-item label="备 注：">
                        <el-col :span="19">
                              <el-input v-model="form.remark"></el-input> 
                        </el-col>
                        </el-form-item>  
                     </el-col>          
                  </el-row>
                  
                </div>
             
              <div class="mbottom">
                    <div class="goods-fitter">
                      <div class="mcard" style="padding-bottom:0;width:100%">
                        <el-table :data="tableData" border  stripe>
                          <el-table-column  label="序号" type="index" align="center" width="50"></el-table-column>
                          <el-table-column prop="customerType" label="商品信息" align="center" width="180">
                                    <div class="txt_left">商品名称：韩国创意立体</div>
                                    <div class="txt_left">货号：</div>
                                    <div class="txt_left">品牌：</div>
                                    <div class="txt_left">型号：</div>
                          </el-table-column>
                          <el-table-column prop="commonContactName" label="规格尺寸" align="center" width="106">
                                          规格尺寸
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="销售数量" align="center" width="80">
                                           47 
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="出货仓" align="center" width="90">
                                          李小小仓库
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="已出货数量" align="center" width="90">
                                          10
                          </el-table-column>
                           <el-table-column prop="commonContactDept" label="未出货数量 " align="center" width="90">
                                          10
                          </el-table-column>
                            <el-table-column prop="commonContactDept" label="本次出货数量 " align="center" width="90">
                                          10
                          </el-table-column>
                          <el-table-column label="单价" align="center" width="77">
                            <template>
                                         100.00
                            </template>
                          </el-table-column>
                          <el-table-column label="合计" align="center"  width="75">
                            <template>
                                      1000.00
                            </template>
                          </el-table-column>
                        </el-table>
                      </div>
                    </div>
                  </div>
                   <div class="total" style="margin-left:80%;">
                        <el-form label-width="130px" size="small">
                            <el-form-item label="本次出货合计：">
                              <el-col :span="24">
                                    <span>100.0000
                                    </span>
                              </el-col>
                            </el-form-item>
                        
                      </el-form>
                      
                   </div>
                   <div class="left" style="margin-left:20px;line-height:60px;">
                          供 应 商：________________
                      </div>
                   <div class="content" style="margin-left:20px;">
                     
                      <span style="margin-right:67px">审 批 人：________________</span>
                      <span style="margin-right:67px">制 单 人：________________</span>
                      <span style="margin-right:67px">送 货 人：________________</span>
                      <span style="margin-right:67px">签 收 人：________________</span>
                   </div>
                   <div class="space" style="height:80px"></div>
                  </div>

                
            </el-form>
          </div>
        </div>
      </div>
       
         
       
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="createClose()" size="small">关 闭</el-button>
          <el-button type="primary"  size="small" v-print="'#printTest'">打印</el-button>
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
                deliveryAddress:'',//收货地址
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
                partyA: [{ required: true, message: "此项为必填项", trigger:["blur","change"] }],
                partyAAddress: [
                { required: true, message: "此项为必填项", trigger:["blur","change"] }
                ],
                partyAContacts: [
                { required: true, message: "此项为必填项", trigger:["blur","change"] }
                ],
                deliveryDate:[
                  { required: true, message: "此项为必填项", trigger:["blur","change"] } 
                ],
                orderAmount:[
                  { required: true, message: "此项为必填项", trigger:["blur","change"] } 
                ]
            }
        }
    },
     created() {
  },
    props:["editVisibles"],
    watch: {
    editVisibles(val) {
      this.editVisible = val;
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
    
 }
</style>