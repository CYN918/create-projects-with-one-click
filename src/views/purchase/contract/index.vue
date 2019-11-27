<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">采购合同管理
            </h4>
            <div class="search-base">
              <el-row>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="供应商名称：">
                        <el-col :span="21">
                            <el-input v-model="form.supplier" placeholder="请输入供应商名称"></el-input>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="签单公司：">
                        <el-col :span="21">
                            <el-input v-model="form.company" placeholder="请输入签单公司"></el-input>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="合同号：">
                        <el-col :span="21">
                            <el-input v-model="form.contractNo" placeholder="请输入合同号"></el-input>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="采购单号：">
                        <el-col :span="21">
                            <el-input v-model="form.orderNo" placeholder="请输入采购单号"></el-input>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small"  @click="search()">查询</el-button>
                </el-col>
             </el-row>
            <el-row>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="签订日期：">
                        <el-col :span="21">
                            <el-date-picker
                            type=daterange
                            valueFormat='yyyy-MM-dd HH:mm:ss'
                            v-model="form.signingDate"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
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
  <div class="mcard0">
    <div class="mcard">
      <el-table   :data="page"  border style="width: 100%" 
          :row-class-name="tableRowClassName"
          :row-style="selectedHighlight"
          @row-dblclick="AhandleSelectionChange">
        <el-table-column  width="55" type="index"  label="序号" align="center">
        </el-table-column>
        <el-table-column  prop="name"  label="状态" align="center" width="100 ">
              <template slot-scope="scope">
                    <div  v-html="scope.row.contractStatus" style="text-align:center"></div>
              </template>
        </el-table-column>
        <el-table-column  prop="name"  label="签订日期" align="center" width="110">
                <template slot-scope="scope">
                      {{scope.row.signTime | date}}
              </template>
        </el-table-column>
        <el-table-column  prop="name"  label="业务单号" align="center" width="190">
              <template slot-scope="scope">
                    <div class="txt_left">采购单号：{{scope.row.purchaseOrderNo}}</div>
                     <div class="txt_left">合同单号：{{scope.row.contractNo}}</div>
              </template>
        </el-table-column>
        <el-table-column  prop="name"  label="乙方(客户信息)" align="center" width="210">
              <template slot-scope="scope">
                   <div class="txt_left">客户：{{scope.row.bcompanyName}}</div>
                   <div class="txt_left">联系人：{{scope.row.bcontact}}</div>
                   <div class="txt_left">联系电话：{{scope.row.atel}}</div>
              </template>
        </el-table-column>
        <el-table-column  prop="name"  label="甲方（签约公司）" align="center" width="210">
              <template slot-scope="scope">
                    <div class="txt_left">客户：{{scope.row.acompanyName}}</div>
                   <div class="txt_left">联系人：{{scope.row.acontact}}</div>
                   <div class="txt_left">联系电话：{{scope.row.btel}}</div>
              </template>
        </el-table-column>
        <el-table-column  prop="name"  label="合同金额" align="center">
              <template slot-scope="scope">
                      {{scope.row.contractFactFee}}
              </template>
        </el-table-column>
        <el-table-column  prop="name"  label="供应商收款账号" align="center" width="252">
              <template slot-scope="scope">
                    
                   <div class="txt_left"> 收款帐号：{{scope.row.bankAccount}}</div>
                   <div class="txt_left"> 户名：{{scope.row.bankName}}</div>
                   <div class="txt_left"> 开户行：{{scope.row.bankOpeningName}}</div>
                   <div class="txt_left"> 纳税号：{{scope.row.taxNumber}}</div>
             </template>
        </el-table-column>
        <el-table-column  prop="name"  label="采购员" align="center">
              <template slot-scope="scope">
                    {{scope.row.purchaseName}}
              </template>
        </el-table-column>
        <el-table-column  prop="name"  label="合同扫描件" align="center">
              <template slot-scope="scope">
                    <span v-if="scope.row.contractFile" @click="preview(scope.row)" class="previewImg">
                          查看
                    </span>
                    <span v-if="!scope.row.contractFile">
                          暂无扫描件
                    </span>
              </template>
        </el-table-column>
        <el-table-column label="操作" align="center"  fixed="right" width="110">
          <template slot-scope="scope">
            <div class="line-div">
              <div class="small-Idiv" @click="look(scope.row)"
              v-permit="'puContract:preview'">
                <div class="i-div huishouzhan">
                    <img src="@/common/images/icon/查看详情.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;" >预览</span>
              </div>
            </div>
          </template>
        </el-table-column>
    </el-table>
      <div class="pagination">
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.pageIndex"
            :page-sizes="[5,10,30,50]"
            :page-size="form.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="form.count">
            </el-pagination>
      </div>
    </div>
  </div>

    <div class="margin0" style="margin-top:20px">
            <div class="tabs-header headTitle">
             <ul class="clearfix">
                <li
                  class="sale"
                  @click="tabIndex(0)"
                  :class="currentIndex===0 ? 'active' : ''"
                  v-show="!this.showNo"
                >商品明细</li>
                <li
                  class="sale"
                  @click="tabIndex(0)"
                  :class="currentIndex===0 ? 'active' : ''"
                  v-show="this.showNo"
                >采购合同【{{this.showNo}}】的商品明细</li>
              </ul>
            
      
         
            </div>
            <div class="tabs-content">
              <component :is="mainIndex" :goodsList="goodsList" :count="count" :showId="showId"></component>
              
          </div>
        </div>
       <el-dialog :visible.sync="dialogVisible">
                        <img width="100%" :src="dialogImageUrl" alt="">
                        <span slot="footer" class="dialog-footer"></span>
       </el-dialog>           
  </div>
</template>

<script>
import Goods from "./goods"
import {ContractList,ContractGoodsList} from '@/api/purchase/index'
export default {
  data () {
    return {
      currentIndex:0,
      mainIndex:'Goods',
      dialogVisible:false,
      dialogImageUrl:'',
      value1:'',
      getIndex:'',
      closeNo:'',
      page:[],
      goodsList:'',
      showNo:'',
      showId:'',
      form: {
        pageIndex:1,
        pageSize:10,
        count:0,
        supplier:'',//供应商
        signingDate:'',//签订日期
        company:'',//签单公司
        contractNo:'',//合同号
        startTime:'',
        endTime:'',
        orderNo:'',//采购订单号
      },
      count:0,
      goodsData:{
        pageIndex:1,
        pageSize:10
      },
      tableData:[
          {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }
      ],
    }
  },
  created () {
    this._ContractList();
  },
   watch: {
    "form.signingDate": {
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
  computed: {
  },
  methods: {
      _ContractList(){
        ContractList(this.form).then(res=>{
          this.page = res.data.pageList
          this.form.count = res.data.count;
          
        })
      },
      preview(row){
        console.log(row);
        
        this.dialogImageUrl = row.contractFile
        this.dialogVisible = true;
      },
      look(row){
        this.$router.push({name:'PreviewPo',query:{Id:row.contractId}})
      },
      //选择改变列背景颜色
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
        
        this.getIndex = row.index;
        this.showNo = row.contractNo;
        this.showId = row.contractId;
        let obj={};
        obj.pageSize = this.goodsData.pageSize;
        obj.pageIndex = this.goodsData.pageIndex;
        obj.contractId =row.contractId;
        ContractGoodsList(obj).then(res=>{
            this.goodsList = res.data.pageList;
            this.count = res.data.count;
        })
      },
      search(){
        this.form.pageIndex = 1;
        this._ContractList();
        this.resetData();
      },
      resetData(){
         this.getIndex = '';
          this.count = 0;
          this.showNo = '';
        this.goodsList = [];
      },
      handleSizeChange(val){
          this.form.pageSize = val;
          this.resetData();
          this._ContractList();
          
      },
      handleCurrentChange(val){
          this.form.pageIndex = val;
          this.resetData();
          this._ContractList();
          
      }
  },
  components: {
    Goods
  }
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
    max-width: 240px;
    margin-right: 5px;
  }
  .el-date-picker{
    max-width: 240px;
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
.detail{
    font-size: 14px;
    color: #606266;
}
.small-Idiv{
  width: 32px;
  span{
    margin-top: 3px;
    font-size:12px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(72,73,77,1);
    word-break:keep-all;  
  }
}
.i-div{
  cursor: pointer;
  width:32px;
  height:32px;
  border-radius:6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line-div{
    display: flex;
    justify-content: space-around;

}
.fuzhi{
  background:rgba(229,162,75,1);
}
 .huishouzhan{
   background:rgba(247,108,110,1);
 }
 .previewImg{
   cursor: pointer;
   color:#4A99FA;
 }
 .mcard0{
    border: 1px solid #d7e0f1;
    background: #fff;
 }
 /deep/ .el-dialog__headerbtn{
      top:10px;
    }
</style>
