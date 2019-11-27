<template>
    <div>
       <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">待询价</h4>
            <div class="search-base">
              <el-row>
               <el-col :span="5">
                    <el-col>
                        <el-form-item label="询价单号：">
                            <el-col :span="23">
                                <el-input v-model="form.oddNumbers" placeholder="请输入询价单号"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="报价状态：">
                            <el-col :span="23">
                               <el-select v-model="form.inquiryStatus" placeholder="请选择">
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
                    <el-form-item label="询价日期：">
                            <el-col :span="21">
                              <el-date-picker
                            v-model="form.createDate"
                            type="daterange"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            style="width:100%"
                            valueFormat='yyyy-MM-dd HH:mm:ss'>
                          </el-date-picker>
                            </el-col>
                        </el-form-item>
                </el-col>
                <el-col :span="2" >
                      <el-button type="primary" size="small" @click='search(true)' >查询</el-button>
                </el-col>
              </el-row>
              <el-row>
                  <el-col :span="5">
                    <el-col>
                        <el-form-item label="商品搜索：">
                            <el-col :span="23">
                                <el-input v-model="form.goodsName" placeholder="请输入商品信息/编码"></el-input>
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
     <div class="mcard" style="border:1px solid #d7e0f1">
      <el-table :data="pageList" border @selection-change="handleSelectionChange" 
      :row-class-name="tableRowClassName"
          :row-style="selectedHighlight"
          @row-dblclick="AhandleSelectionChange">
        <el-table-column label="序号" type="index" align="center" width="55" ></el-table-column>
        <el-table-column label="报价状态" prop="name" align="center" width="120">
                <template slot-scope="scope">
                  <div v-html="scope.row.offerStatusDesc"></div>
                </template>
        </el-table-column>
        <el-table-column label="询价信息" prop="name" align="center" width="230">
                <template slot-scope="scope">
                  <div class="txt_left">询价单号：{{scope.row.inquiryNo}}</div>
                  <div class="txt_left">录入时间：{{scope.row.createTime}}</div>
                </template>
        </el-table-column>
        <el-table-column label="客户信息" prop="name" align="center" width="230" >
                <template slot-scope="scope">
                  {{scope.row.customerName}}
                </template>
        </el-table-column>
        <el-table-column label="发票信息" prop="name" align="center" >
                  <template slot-scope="scope">
                  {{scope.row.invoice}}
                </template>
        </el-table-column>
        <el-table-column label="报价期限" prop="name" align="center" width="180">
                <template slot-scope="scope">
                         <div> {{scope.row.offerEndTime | date}}</div>
                          <div> {{scope.row.closeTimeTip}}</div>
                </template>
        </el-table-column>
        <el-table-column label="销售代表" prop="name" align="center">
                  <template slot-scope="scope">
                          {{scope.row.sale}}
                </template>      
        </el-table-column>
   
        <el-table-column label="指定的采销组" prop="name" align="center" >
                    <template slot-scope="scope">
                          {{scope.row.groupName}}
                </template>       
        </el-table-column>
        <el-table-column label="备注" prop="name" align="center" width="152">
                <template slot-scope="scope">
                          {{scope.row.remark}}
                </template>       
        </el-table-column>
        <el-table-column label="操作" prop="name" align="center" width="130" fixed="right">
               <template slot-scope="scope">
                   <div class="line-div" >
                  <!--  v-if="scope.row.offerStatus==6" -->

                    <div
                      class="small-Idiv"
                      @click="pushSale(scope.row)" 
                      v-permit="'inquiry:offer'"                
                    v-if="scope.row.offerStatus!==8">
                      <div class="i-div">
                        <img src="@/common/images/icon/推送报价.png" alt class="operation_img" />
                      </div>
                      <span style="word-break: keep-all;">推送报价</span>
                    </div>
                   </div>
               </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="this.form.pageIndex"
            :page-sizes="[5,10,30,50]"
            :page-size="this.form.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.form.count">
            </el-pagination>
      </div>
    </div>
        <div class="margin0" style="margin-top:20px">
            <div class="tabs-header headTitle">
              <ul class="clearfix" style="min-width:7%">
                  <li class="sale" @click="tabIndex(0)"  :class="currentIndex===0 ? 'active' : ''" v-show="!this.closeNo">商品明细</li>
                  <li
                    class="sale"
                    @click="tabIndex(0)"
                    :class="currentIndex===0 ? 'active' : ''"
                    v-show="this.closeNo"
                  >询价单【{{this.closeNo}}】的商品明细</li> 
              </ul>
         
      
         
            </div>
            <div class="tabs-content">
              <component :is="mainIndex" :goodsList="goodsList" :closeId="closeId" :count="count" :closeNo="closeNo"></component>
              
          </div>
        </div>
              <!-- 推送报价 -->
      <el-dialog :visible.sync="pushVisible" width="22%" title="推送报价" style="top:20%">
        <div class="mail-fitter">
          <div class="search-base">
            <div class="goods-fitter">
              <el-row>
                <div class="tip">
                  <img class="tipImg" src="@/common/images/icon/确定推送.png" alt />
                  <span>你确定要推送报价吗？</span>
                </div>
              </el-row>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="danger"
            @click="pushVisible = false"
            size="small"
            style="margin-right:33px;"
          >取 消</el-button>
          <el-button type="primary" @click="pushInquirys()" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>   
</template>

<script>
import {getPurchaseInquiry,getPurchaseInquiryGoods,pushOrder} from '@/api/purchase/index'
import { throttleTipPop } from "@/utils/functions.js";
import Goods from "./goods"
export default {
    data(){
        return{
              currentIndex:0,
             mainIndex:'Goods',
             pushVisible:false,
             pageList:[],
             count:0,
             goodsList:'',
             getIndex:'',
             closeId:'',//选中ID
             closeNo:'',//选中编号
             totalCount:'',//
             tableData:[
                  {
                  date: '2016-05-02',
                  name: '王小虎',
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
                }
              ],
            form: {
             pageIndex:1,
              pageSize:10,
              count:0,
              oddNumbers:'',//询价单号单号
              createDate:'',//报价日期
              inquiryStatus:'',//报价状态
              goodsName:'',//商品搜索
              startTime:'',
              endTime:'',
            },
            goodsData:{
               pageIndex:1,
              pageSize:10,
              count:0,
            },
            options:[
              {label:"待报价",
              value:0},
               {label:"报价中",
              value:1},
                {label:"重新报价",
              value:2},
              {label:"待推送报价",
              value:6},
              {label:"已推送报价",
              value:8},

            ]
        }
    },
     watch: {
        "form.createDate": {
          handler(val, old) {
            if(val===null){
                this.form.startTime = '';
            this.form.endTime = '';
            }else{
                this.form.startTime = val[0];
            this.form.endTime = val[1];
            }
            

          },
          deep: true
    }
  },
    components:{
        Goods
    },
    created(){
      this._getPurchaseInquiry();
    },
    methods:{
         tabIndex (index) {
          this.currentIndex = index
          
        },
        pushSale(row){
          this.pushVisible = true;
          this.closeId = row.inquiryId;
          this.closeNo = row.inquiryNo
          console.log(this.closeId);
          
        },
        pushInquirys(){
          pushOrder(this.closeId).then(res=>{
            if(res.code===200){
                 throttleTipPop(this, "success", "推送报价成功", 2000);
                 this._getPurchaseInquiry();
                 this.resetData();
                 this.pushVisible = false;
            }
              
            
          })
        },
        //获取询价单分页
        _getPurchaseInquiry(){
            getPurchaseInquiry(this.form).then(res=>{
                this.pageList = res.data.pageList;
                this.form.count = res.data.count;
                
            })    
        },
         
        selectedHighlight({ row, rowIndex }) {
          if (this.getIndex === rowIndex) {
            return {
              "background-color": "#e4ecfa"
            };
          }
        },

         tableRowClassName({ row, rowIndex }) {
          //把每一行的索引放进row
          row.index = rowIndex;
        },
        //双击选定
        AhandleSelectionChange(row) {
          console.log(row);
          
          this.getIndex = row.index;
          this.closeId = row.inquiryId;
          this.closeNo = row.inquiryNo
          let obj={}
          obj.inquiryId = this.closeId;
          obj.pageIndex = this.goodsData.pageIndex;
          obj.pageSize = this.goodsData.pageSize

         getPurchaseInquiryGoods(obj).then(res=>{
            this.count = res.data.count;
            this.goodsList = res.data.pageList;
            
         })
            
        },
      //搜索分页
      search(){
            this.form.pageIndex = 1;
            this._getPurchaseInquiry();
            this.resetData();
        },
      //重置数据
      resetData(){
            this.closeNo = '';
            this.goodsList = [];
            this.count= 0;
            this.getIndex= '';
      },
       handleSizeChange(val){
          this.form.pageSize =val;
          this.resetData();
          this._getPurchaseInquiry();
      },
      handleCurrentChange(val){
          this.form.pageIndex = val;
          this.resetData();
          this._getPurchaseInquiry();
      },
      handleSelectionChange(){
        
      }
 },
    
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.goods-fitter {
  .vender {
    ul {
      li {
        float: left;
        height: 41px;
        padding: 0 10px;
        line-height: 41px;
        text-align: center;
        border: 1px solid transparent;
        font-size: 16px;
        color: #333;
        cursor: pointer;
        &.active {
          border: 1px solid #d7e0f1;
          border-bottom: 0;
          background-color: #fff;
          position: relative;
          position: relative;
          &:after {
            position: absolute;
            content: "";
            left: 0;
            bottom: -1px;
            height: 1px;
            width: 100%;
            background: #fff;
          }
        }
        .image {
          display: inline-block;
          width: 30px;
          margin-right: 10px;
          font-size: 0;
          line-height: 40px;
          vertical-align: top;
          img {
            width: 100%;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .search-wrapper {
    padding: 20px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    .title {
      margin-left: -20px;
      font-size: 16px;
      font-weight: 400;
      color: 3333;
      padding-left: 10px;
      line-height: 1.4;
      border-left: 4px solid $themeColor;
      margin-bottom: 10px;
    }
    .search-main {
    }
    .search-base {
    }
  }
  .text-space {
    text-align: center;
    color: #606266;
    font-size: 12px;
  }
  .el-select-width {
    max-width: 130px;
    margin-right: 5px;
  }
  .el-input-width {
    display: inline-block;
    max-width: 180px;
  }
  .btn-toggle {
    margin-left: 10px;
    font-size: 14px;
    color: $themeColor;
    cursor: pointer;
  }
}
.goods-list-wrapper {
  margin-top: 20px;
}
.el-transfer-panel__header {
  background: $themeColor;
  color: #fff;
}
.item {
  line-height: 1.5;
  padding: 8px 10px;
  cursor: pointer;
  &:hover {
    color: $themeColor;
  }
  &.active {
    background: #c6e2ff;
    color: #fff;
  }
}
.image {
  cursor: pointer;
}
.item-name {
  cursor: pointer;
  &:hover {
    color: $themeColor;
  }
}
.el-icon-arrow-right {
  margin: 0 20px;
}
.store {
  width: 310px;
}
.red {
  color: $themeSubColor;
}
.transfer-wrapper {
  text-align: center;
}
.panel-wrapper {
  text-align: left;
  margin: 0;
  padding: 6px 0;
  list-style: none;
  height: 246px;
  overflow: auto;
  box-sizing: border-box;
}
.dialog-footer {
  margin-top: 20px;
  text-align: right;
}
.margin1{
  padding-left:40px;
  padding-top:20px;
  box-sizing: border-box;

}
.line-div {
  display: flex;
  justify-content: center;
  align-items: center;
}
.line {
  display: flex;
  justify-content: flex-start;
}
.small_top {
  margin-top: 10px;
}

.i-div {
  cursor: pointer;
}
.head{
  margin-bottom: 20px;
}
.tabs-header li {
  padding:0 28px !important;
}
.tip {
    margin-top: -30px;
    text-align: center;
    line-height: 22px;
    height:100px;
    .tipImg {
      position: relative;
      left: -88px;
      top: 44px;
    }
    span{
      display: block;
      margin-left: 40px;
    }
  
  }
</style>