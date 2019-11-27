<template>
  <div class="margin">
    <div class="goods-fitter">
      <div class="mcard" style="border:1px solid #d7e0f1">
        <div class="header">
          <el-button type="primary" size="small" @click="back">返回</el-button>
          <el-button class="operate" type="primary" size="small" @click="download">下载</el-button>
          <el-button class="operate" type="primary" size="small" @click="print" v-print="'#printTest'">打印</el-button>
          
        </div>

        <div class="look" id="printTest">
          <div class="contractTitle" style="text-align:center;margin-top:49px;margin-bottom:9px">
               <div class="title2" style="text-align:center;margin-bottom:9px">
              <h2
                  style="font-size:40px;
                      font-family:Microsoft YaHei;
                      font-weight:400;
                      line-height:59px;
                      color:rgba(52,62,74,1);
                      opacity:1;"
                >调拨单</h2>
            </div>
            <div class="companyMessage" style="
            margin-left:10px;
                text-align:left">
              <span
                style="font-size:16px;
                display:inline-block;
                font-family:Microsoft YaHei;
                font-weight:400;
                line-height:28px;
                width:400px;
                color:rgba(102,98,97,1);
                margin-right:45px"
              >盘点仓库：李小小仓库</span>
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:400px;
                line-height:28px;
                color:rgba(102,98,97,1);
                margin-right:45px"
              >部门：仓储部</span>
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:300px;
                line-height:28px;
                color:rgba(102,98,97,1);"
              >职位：仓管员</span>
              
              <br />
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:400px;
                line-height:28px;
                color:rgba(102,98,97,1);
                margin-right:45px"
              >盘点人员：许维恩</span>
             
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                width:400px;
                line-height:28px;
                color:rgba(102,98,97,1);
                margin-right:45px"
              >单号：IC20191008002</span>
             
              <span
                style="font-size:16px;
                font-family:Microsoft YaHei;
                font-weight:400;
                display:inline-block;
                min-width:300px;
                line-height:28px;
                color:rgba(102,98,97,1);"
              >盘点日期：2019-09-08 10:15</span>
             
              
            </div> 
          
           
            <div class="content" style="
                margin-top:48px;
                text-align:left">
                <div class="tableA" >
                    <table
                      class="border-table"
                      border="1"
                      cellspacing="0"
                      cellpadding="0"
                      style="width:100%;font-size:16px;
                      font-family:Microsoft YaHei;
                      font-weight:400;
                      line-height:21px;
                      margin:0 auto;"
                    >
                      <tbody>
                        <tr style="height:50px;line-height:50px" >
                          <td width="40" align="center">
                            <span style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">序号</span>
                          </td>
                        
                          <td width="250" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">商品信息</strong>
                          </td>
                          <td width="120" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">规格型号</strong>
                          </td>
                          <td  width="60" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">单位</strong>
                          </td>
                          <td width="120" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">调入仓库</strong>
                          </td>
                          <td  width="130" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">盘点前库存数量</strong>
                          </td>
                          <td  width="130" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">盘点后库存数量</strong>
                          </td>
                          <td  width="90" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">单价</strong>
                          </td>
                          <td  width="130" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">盘点后库存余额</strong>
                          </td>
                          <td  width="90" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">差数</strong>
                          </td>
                           <td  width="90" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">差额</strong>
                          </td>
                           <td  width="121" align="center">
                            <strong style="
                            font-size:16px;
                            font-family:Microsoft YaHei;
                            font-weight:400;
                            line-height:20px;
                            color:rgba(102,98,97,1);">差额原因</strong>
                          </td>
                         
                        </tr>
                        <tr v-for="(item,index) in page.goodsDetailParam" :key="index">
                          <td align="center" style="vertical-align: middle;
                            text-align: center; ">
                            <span>{{index+1}}</span>
                            </td>
                    
                      <td align="left"  valign="middle" >
                        <div class="goods">
                          <div class="txt_left">商品名称：{{item.goodsName}}</div>
                          <div class="txt_left">货号：{{item.goodsSn}}</div>
                          <div class="txt_left">型号：{{item.modelNumber}}</div>
                          <div class="txt_left">品牌：{{item.brandName}}</div>
                          <div class="txt_left">SKU：{{item.goodsSkuId}}</div>
                          
                        </div>
                      </td>
                      <td align="center"
                       style="vertical-align: middle;
                            text-align: center; ">{{item.goodsSpecSize}}</td>
                      <td align="center"
                       style="vertical-align: middle;
                            text-align: center; ">无</td>
                      <td align="center"
                       style="vertical-align: middle;
                            text-align: center; ">
                        <span>{{item.goodsCount}}</span>
                      </td>
                      <td align="center"
                       style="vertical-align: middle;
                            text-align: center; ">
                        <span>{{item.goodsUnit}}</span>
                      </td>
             
                      <td align="center"
                       style="vertical-align: middle;
                            text-align: center; ">
                        <span>{{item.goodsPrice}}</span>
                      </td>
                      <td align="center"
                       style="vertical-align: middle;
                            text-align: center; ">
                        <span>{{item.totalPrice}}</span>
                      </td>
                      
                    </tr>
                      
                      </tbody>
                    </table>
                </div>
            </div>
          <div class="sign" style="text-align:left;margin-top:36px;">
              <span style="font-size:16px;color:#666261;margin-left:10px;">董事长：</span>
              <input type="text"/>
              <span style="font-size:16px;color:#666261">总经理：</span>
              <input type="text"/>
              <span style="font-size:16px;color:#666261">主管：</span>
              <input type="text"/>
              <span style="font-size:16px;color:#666261">入仓仓管员：</span>
              <input type="text"/>
              <span style="font-size:16px;color:#666261">调拨人员：</span>
              <input type="text"/>
          </div>
          
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
import {downPDF} from '@/api/sale/index'
export default {
  name: "CreatePDF",

  data() {
    return{
     page:[],
     orderId: "",//路由传过来的ID
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
    }
  },
  created() {
    this.getParams();
    this._getContract();
  },
  methods: {
    //获取合同ID
    getParams() {
      this.orderId = this.$route.query.id
      console.log(this.orderId);
      
    },
    //预览合同
    _getContract(){
      downPDF(this.orderId).then(res=>{
          this.page = res.data
          
      })
    },
    download(){
        var reader = new FileReader();
        reader.onloadend = function() {
          var dataUrl = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
          console.log(dataUrl);
        };
        reader.readAsDataURL(blob);

    },
    back(){
      this.$router.back();
    },
    print(){

    }
  }
};
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
  .el-date-picker {
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
.detail {
  font-size: 14px;
  color: #606266;
}
.i-div {
  cursor: pointer;
}

.line-div {
  display: flex;
  justify-content: space-around;
}
.fuzhi {
  background: rgba(229, 162, 75, 1);
}
.huishouzhan {
  background: rgba(247, 108, 110, 1);
}
.el-select-width {
  max-width: 300px;
  margin-right: 5px;
}
.el-date-picker {
  max-width: 240px;
  margin-right: 5px;
}
.el-input-width {
  display: inline-block;
  max-width: 180px;
}
.el-select {
  width: 100% !important;
}
//自定义表格样式
.martop {
  margin-top: 10px;
}
.imgitem {
  display: flex;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
    margin-right: 10px;
  }
}

.more {
  cursor: pointer;
}
.mores {
  padding-top: 110px;
  box-sizing: border-box;
}
.blue {
  color: #4a99fa !important;
  cursor: pointer;
}
.goods_num {
  color: #f66c6c !important;
  font-size: 16px;
  margin-right: 5px;
}
.leftbottom {
  color: #4a99fa;
  border-bottom: 1px dashed rgba(215, 220, 231, 1);
  padding-bottom: 8px;
}
.line {
  display: flex;
  justify-content: flex-start;
}
.small_top {
  margin-top: 10px;
}
.mcard1 {
  border: 1px solid #d7e0f1;
  margin-top: 20px;
}
.pushTip {
  padding-left: 98px;
  padding-right: 70px;
  .star {
    color: red;
  }
}
.txt_red {
  color: #f66c6c;
}

.el-input-group__append button.el-button {
  width: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.tip {
  margin-top: -30px;
  text-align: center;
  line-height: 22px;
  .tipImg {
    position: relative;
    left: -16px;
    top: 28px;
  }
}
.look {
  width: 1200px;
  margin: 0 auto;
}
.header {
  width: 1320px;
  margin: 0 auto;
  border-bottom: 1px solid #999999;
  padding-bottom: 7px;
  overflow: hidden;
  .operate {
    float: right;
  }
  .operate:nth-of-type(1) {
    margin-right: 40px;
    margin-left: 12px;
  }

}
  .tableA {
  table {
    width: 1200px;
    border-color: #aaaaaa;
    border-collapse: collapse;
    margin: 0 auto;
    tr td {
      border: 1px solid #aaaaaa;
    }
  }
}
.sign{
  input{
    outline: none;
    border-bottom: 1px solid #333333;
    width: 116px;
    color: #666261;
    margin-right: 64px;
  }
  input:nth-of-type(5){
    margin-right: 0;
  }
 
}

</style>