<template>
    <div id="flow">
        <el-dialog :visible.sync="flowVisible" width="52%" title="现金流量项目制定" :before-close="createClosing">
          
          <div class="mail-fitter" style="margin-bottom:20px;">
            <div class="goods-fitter"  style="margin-bottom:20px">
              <el-form label-width="100px" size="small">
                <div class="search-wrapper">
                  <h4 class="title">现金流量项目制定</h4>
                </div>
              </el-form>
            </div>
            <div class="goods-fitter"  style="margin-bottom:20px">
                 <div class="search-wrapper">
                    <div class="subject"> 
                        <div class="cash" :class="switchIndex===1?'active':''" @click="switch1">现金科目</div>
                        <div class="profit" :class="switchIndex===2?'active':''" @click="switch2">损益科目</div>
                    </div>
                 <div class="mbottom">
                    <el-table :data="pageList" border
                  
                            height="160">
                            <el-table-column label="现金流量科目" prop="name" align="center" width="452" ></el-table-column>
                            <el-table-column label="币别" prop="name" align="center" width="60"></el-table-column>
                            <el-table-column label="方向" prop="name" align="center" width="60"></el-table-column>
                            <el-table-column label="本位币金额" prop="name" align="center"></el-table-column>
                    </el-table>
                 </div>
                    <div class="mright">
                            <el-button size="small" type="primary" class="btn3">确 定</el-button>
                            <el-button size="small" type="primary" class="btn3">取 消</el-button>
                            <el-button size="small" type="primary" class="btn3">删 除</el-button>
                            <el-button size="small" type="primary" class="btn3" @click="flowReport">流量报告</el-button>
                    </div>
               </div>
               <div class="search-wrapper" style="margin-top:20px;">
                    <div class="flowTable" v-if="switchIndex===1">
                        <el-table :data="tableData" border
                                height="288">
                                <el-table-column   align="center" width="233" >
                                        <template slot="header" slot-scope="scope">
                                            <div class="header">对方科目分录</div>
                                        </template>
                                        <template slot-scope="scope">
                                            <div class="txtLeft">{{scope.row.name}}</div>
                                            <div  class="txtRight">
                                                <i class="iconfont icon-lujing12"></i>
                                            </div>
                                        </template>
                                </el-table-column>
                                <el-table-column   align="center" width="202">
                                         <template slot="header" slot-scope="scope">
                                            <div class="header">主表项目</div>
                                        </template>
                                        <template slot-scope="scope">
                                            <div class="txtLeft">{{scope.row.name}}</div>
                                            <div  class="txtRight">
                                                <i class="iconfont icon-lujing12"></i>
                                            </div>
                                        </template>
                                </el-table-column>
                                <el-table-column  align="center" width="202">
                                         <template slot="header" slot-scope="scope">
                                            <div class="header">附表项目</div>
                                        </template>
                                        <template slot-scope="scope">
                                            <div class="txtLeft">{{scope.row.name}}</div>
                                            <div  class="txtRight">
                                                <i class="iconfont icon-lujing12"></i>
                                            </div>
                                        </template>
                                </el-table-column>
                                <el-table-column   align="center">
                                         <template slot="header" slot-scope="scope">
                                            <div class="header">本位币</div>
                                        </template>
                                        <template slot-scope="scope">
                                            <div class="txtLeft">{{scope.row.name}}</div>
                                            
                                        </template>
                                </el-table-column>
                                
                        </el-table>
                        <div class="appoint">
                            <el-button type="primary" size="small">批量指定</el-button>
                        </div>
                    </div>
                     <div class="flowTable" v-if="switchIndex===2">
                        <el-table :data="tableData" border
                                height="288">
                                <el-table-column   align="center" width="233" >
                                        <template slot="header" slot-scope="scope">
                                            <div class="header">对方科目分录</div>
                                        </template>
                                        <template slot-scope="scope">
                                            <div class="txtLeft">{{scope.row.name}}</div>
                                            <div  class="txtRight">
                                                <i class="iconfont icon-lujing12"></i>
                                            </div>
                                        </template>
                                </el-table-column>
                                <el-table-column   align="center" width="403">
                                         <template slot="header" slot-scope="scope">
                                            <div class="header">附表项目</div>
                                        </template>
                                        <template slot-scope="scope">
                                            <div class="txtLeft">{{scope.row.name}}</div>
                                            <div  class="txtRight">
                                                <i class="iconfont icon-lujing12"></i>
                                            </div>
                                        </template>
                                </el-table-column>                             
                                <el-table-column   align="center">
                                         <template slot="header" slot-scope="scope">
                                            <div class="header">本位币</div>
                                        </template>
                                        <template slot-scope="scope">
                                            <div class="txtLeft">{{scope.row.name}}</div>
                                            
                                        </template>
                                </el-table-column>
                                
                        </el-table>
                        <div class="appoint">
                            <el-button type="primary" size="small">批量指定</el-button>
                        </div>
                    </div>
               </div>
             

            </div> 
          </div>
          <span slot="footer" class="dialog-footer">
          </span>
        </el-dialog>
        <el-dialog :visible.sync="reportVisible" width="45%" title="流量报告">
             <div class="mail-fitter" >
                 <div class="goods-fitter">
                    <div class="search-wrapper" >
                        <h4 class="title">现金流量科目-现金类</h4>
                        <el-form>
                            <div class="choose">
                                <el-checkbox v-model="checked">指定：</el-checkbox>
                                <el-select placeholder="请输入项目代码" v-model="value1" size="small">
                                            <el-option
                                                v-for="item in options"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                </el-select>
                               
                            </div>
                            <div class="choose">
                                 <el-checkbox v-model="checked1">应用科目预设的主表项目</el-checkbox>
                                <el-checkbox v-model="checked2">应用科目预设的附表项目</el-checkbox>
                            </div>
                            <div class="flowTable">
                                    <el-table :data="tableData" border
                                        height="198"
                                        @selection-change="handleSelectionChange">
                                        <el-table-column
                                        type="selection"
                                        width="50"
                                        align="center">
                                        </el-table-column>
                                        <el-table-column   align="center" >
                                                <template slot="header" slot-scope="scope">
                                                    <div class="header">对方科目</div>
                                                </template>
                                                <template slot-scope="scope">
                                                   <div class="txtCenter"> {{scope.row.name}} </div>
                                                </template>
                                        </el-table-column>
                                    </el-table>
                            </div>
                        </el-form>
                    </div>
                 </div>
             </div>

            <span slot="footer" class="dialog-footer">
                <el-button
                    type="danger"
                    @click="reportVisible = false"
                    size="small"
                >取 消</el-button>
          <el-button type="primary"  size="small">确 定</el-button>
            </span>
        </el-dialog>
    </div>
   
</template>

<script>
import {getSafeStock} from '@/api/storage/index'
export default {
    data(){
        return{
            checked:'',
            checked1:'',
            checked2:'',
            value1:'',
            flowVisible:false,
            reportVisible:false,//流量报告弹框
            switchIndex:1,
            pageList:[],
            form: {
                      pageIndex:1,
                      pageSize:10,
                      count:0,
                      goods:'',//商品信息
                      goodsSn:'',//商品货号
                      warehouse:'',//warehouse
            },
             tableData: [{
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
            }],
              options: [{
                value: '选项1',
                label: '黄金糕'
                }, {
                value: '选项2',
                label: '双皮奶'
                }, {
                value: '选项3',
                label: '蚵仔煎'
                }, {
                value: '选项4',
                label: '龙须面'
                }, {
                value: '选项5',
                label: '北京烤鸭'
                }],
        }
    },
    components:{
    },
    props:["flowVisibles"],
    watch:{
      flowVisibles(val){
        this.flowVisible= val;
      },

    },
    created(){
     
    },
    methods:{
        //切换表
        switch1(){
            this.switchIndex =1;
        },
        switch2(){
            this.switchIndex =2;
        },
        //流量报告弹框
        flowReport(){
            this.reportVisible = true;
        },
         createClosing() {
                this.flowVisible = false;
                this.$emit("createClosingF", this.flowVisible);
                }
 },
    
}
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
  #flow{   
    .el-dialog__body {
        padding: 0 !important;
         background: none !important;
     }
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
        overflow: hidden;
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
         .title1 {
        margin-left: -20px;
        font-size: 16px;
        color: 3333;
        padding-left: 10px;
        line-height: 1.4;
        border-left: 4px solid $themeColor;
        margin-bottom: 10px;
        }
        .choose{
            margin-bottom: 10px;
        }

        .el-checkbox {
            margin-right: 10px !important;
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
    .small-Idiv{
        margin: 0 auto;
    }
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
    .blue{
        color: #4A99FA;
        cursor: pointer;
    }
    .subject{
        overflow: hidden;
        .cash{
            float: left;
            width:101px;
            height:32px;
            background:rgba(240,243,250,1);
            color: #606266;
            line-height: 32px;
            opacity:1;
            border-radius:4px 0px 0px 4px;
            text-align: center;
            cursor: pointer;
        }
        .profit{
            float: left;
            width:101px;
            height:32px;
            background:rgba(240,243,250,1);
            color: #606266;
            line-height: 32px;
            opacity:1;
            border-radius:0px 4px 4px 0px;
            text-align: center;
            cursor: pointer;
        }
        .active{
            background:rgba(76,134,244,1);
            color: #FFFFFF;
        }
    }
    .mbottom{
        margin-top:20px;
        width: 84%;
        float: left;
        .el-table td, .el-table th {
            padding:8px 0 !important;
        }
    }
    .mright{
        float:right;
        width: 16%;
        margin-top:21px;
    }
    
    .btn3{
        margin-left: 23px;
        width:96px;
        height:32px;
        text-align: center;
        margin-bottom:10px;
    }
    .flowTable{
         .el-table td, .el-table th {
            padding:0 0 !important;
        }
        .header{
            height: 25px;
            line-height: 32px;
        }
        .txtLeft{
            width: 82%;
            float: left;
            text-align: left;
            padding: 5px 0;
        }
        .txtRight{
            float: right;
            width: 32px;
            border-left:1px solid #EBEEF5;
            min-height:33px; 
            height:100%;
            background: #f7faff;
            cursor: pointer;
            .iconfont{
                font-size: 12px;
            }
        }
        .txtCenter{
            text-align: center;
            padding: 5px 0;
        }
        .appoint{
            margin-top:10px;
            float: right;
        }
    }
    

  }
</style>