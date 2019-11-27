<template>
  <div id="recording">
    <!-- 初始界面 -->
    <div class="margin0" v-if="showSwitch===0">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">录凭证</h4>
            </div>
              
          </el-form>
        </div>
      </div>
      <div class="mcard1">
          <div class="mbottom">
          <el-row >
          <el-col :span="22">
            <el-button  type="primary" size="small" class="btn" @click="newRe()">
              <img class="showImg" src="@/common/images/icon/新增凭证.png" alt="" />新增
            </el-button>
             <el-button type="primary" size="small" class="btn">
              <img class="showImg" src="@/common/images/icon/凭证.png" alt=""/>从模板生成凭证
            </el-button>
            <el-button type="primary" size="small" class="btn">
              <img class="showImg" src="@/common/images/icon/保存凭证.png" alt=""/>保存为模板凭证
            </el-button>
            <el-button type="primary" size="small" class="btn">
              <img class="showImg" src="@/common/images/icon/红字冲销.png" alt=""/>红字冲销
            </el-button>
            
          </el-col>
          <el-col :span="2">   
              <el-button class="btn" size="small" ><img class="showImg1" src="@/common/images/icon/上一个.png" alt=""/></el-button>
              <el-button class="btn" size="small" ><img class="showImg1" src="@/common/images/icon/下一个.png" alt=""/></el-button>
          </el-col>
          </el-row>
          </div>
          <div class="til">
                  <h4 class="titleS">记账凭证</h4>        
          </div>
          <div class="tableTitle">
          <el-form label-width="80px" size="small">
          <el-row >
                  <el-col>
              <el-col :span="4">
                          <el-form-item label="凭证字:">
                      <el-col :span="22">
                          <el-select placeholder="" v-model="value0">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                          </el-select>
                      </el-col>
                          </el-form-item>
              </el-col>
              <el-col :span="4">
                          <el-form-item label="凭证号:">
                      <el-col :span="22">
                          <el-select placeholder="" v-model="value1">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                          </el-select>
                      </el-col>
                          </el-form-item>
              </el-col>
              <el-col :span="6">
                      
                          <el-form-item label="业务日期:" >
                          <el-col :span="22">
                              <el-date-picker
                              v-model="formData.businessDate"
                              type="date"
                              placeholder="选择日期"
                              valueFormat='yyyy-MM-dd HH:mm:ss'
                              style="width:100%">
                              </el-date-picker>
                          </el-col>
                          </el-form-item>
              </el-col>
              <el-col :span="6">
                          <el-form-item label="记账日期:" >
                          <el-col :span="22">
                              <el-date-picker
                              v-model="formData.bookkeepingDate"
                              type="date"
                              placeholder="选择日期"
                              valueFormat='yyyy-MM-dd HH:mm:ss'
                              style="width:100%">
                              </el-date-picker>
                          </el-col>
                          </el-form-item>
              </el-col>
              <el-col :span="4">
                          <el-form-item label="附单据:" >
                          <el-col :span="12">
                          <el-input placeholder="" v-model="value2">
                          
                          </el-input>
                          
                          </el-col>
                            <span style="margin-left:5px;">张</span>
                          
                          </el-form-item>
              </el-col>
                
          </el-col>
          </el-row>
          </el-form>
          </div>

        <el-table   :data="tableData"  border style="width: 100%" height="500">
            
          <el-table-column  width="50" label="序号" type="index" align="center"></el-table-column>
          <el-table-column  prop="name"  label="摘要" align="center">
              
              
          </el-table-column>
          <el-table-column  prop="name"  label="科目" align="center"></el-table-column>
          <el-table-column  prop="name"  label="借方金额" align="center" >
              <el-table-column label="千" align="center"  width="20"></el-table-column>
              <el-table-column label="佰" align="center"  width="20"></el-table-column>
              <el-table-column label="十" align="center"  width="20"></el-table-column>
              <el-table-column label="亿" align="center"  width="20"></el-table-column>
              <el-table-column label="千" align="center"  width="20"></el-table-column>
              <el-table-column label="佰" align="center"  width="20"></el-table-column>
              <el-table-column label="十" align="center"  width="20"></el-table-column>
              <el-table-column label="万" align="center" width="20" ></el-table-column>
              <el-table-column label="千" align="center"  width="20"></el-table-column>
              <el-table-column label="佰" align="center"  width="20"></el-table-column>
              <el-table-column label="十" align="center"  width="20"></el-table-column>
              <el-table-column label="壹" align="center"  width="20"></el-table-column>
              <el-table-column label="角" align="center"  width="20"></el-table-column>
              <el-table-column label="分" align="center"  width="20"></el-table-column>
          </el-table-column>
          <el-table-column  prop="name"  label="贷方金额" align="center">
              <el-table-column label="千" align="center"  width="20"></el-table-column>
              <el-table-column label="佰" align="center"  width="20"></el-table-column>
              <el-table-column label="十" align="center"  width="20"></el-table-column>
              <el-table-column label="亿" align="center"  width="20"></el-table-column>
              <el-table-column label="千" align="center"  width="20"></el-table-column>
              <el-table-column label="佰" align="center"  width="20"></el-table-column>
              <el-table-column label="十" align="center"  width="20"></el-table-column>
              <el-table-column label="万" align="center" width="20"></el-table-column>
              <el-table-column label="千" align="center"  width="20"></el-table-column>
              <el-table-column label="佰" align="center"  width="20"></el-table-column>
              <el-table-column label="十" align="center"  width="20"></el-table-column>
              <el-table-column label="壹" align="center"  width="20"></el-table-column>
              <el-table-column label="角" align="center"  width="20"></el-table-column>
              <el-table-column label="分" align="center"  width="20"></el-table-column>
          </el-table-column>

          
      </el-table>
          <el-form>
            <el-row style="margin-top:40px;">
                  <el-col :span="21">
                    <el-form-item label="制单：">
                        <span>李红</span>
                    </el-form-item>
                  </el-col>
              </el-row>
              <div class="save">
                <div class="saveContent">
                  <el-button size="small" type="primary" class="btn">保存</el-button>
                  <el-button  size="small" class="btn">打印<i class="iconfont icon-lujing12"></i></el-button>
                </div>
              </div>
          </el-form>
      </div>
    </div>
    <!-- 新增页面 -->
    <div class="margin0" v-if="showSwitch===1">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">新增录凭证</h4>
            </div>
              
          </el-form>
        </div>
      </div>
      <div class="mcard1">
          <div class="mbottom">
          <el-row >
          <el-col :span="22">
            <el-button type="primary" size="small" class="btn">
              <img class="showImg" src="@/common/images/icon/新增凭证.png" alt=""/>新增
            </el-button>
             <el-button type="primary" size="small" class="btn">
              <img class="showImg" src="@/common/images/icon/凭证审核.png" alt=""/>审核
            </el-button>
            <el-button type="primary" size="small" class="btn">
              <img class="showImg" src="@/common/images/icon/凭证复制.png" alt=""/>复制
            </el-button>
            <el-button type="primary" size="small" class="btn">
              <img class="showImg" src="@/common/images/icon/凭证删除.png" alt=""/>删除
            </el-button>
            <el-button type="primary" size="small" class="btn">
              <img class="showImg" src="@/common/images/icon/凭证.png" alt=""/>从模板生成凭证
            </el-button>
            <el-button type="primary" size="small" class="btn">
              <img class="showImg" src="@/common/images/icon/保存凭证.png" alt=""/>保存为模板凭证
            </el-button>
            <el-button type="primary" size="small" class="btn">
              <img class="showImg" src="@/common/images/icon/红字冲销.png" alt=""/>红字冲销
            </el-button>
            <el-button type="primary" size="small" class="btn" @click="openFlow">
              <img class="showImg" src="@/common/images/icon/凭证流量.png" alt=""/>流量
            </el-button>
            <el-button type="primary" size="small" class="btn">
              <img class="showImg" src="@/common/images/icon/总账.png" alt=""/>明细账
            </el-button>
            
          </el-col>
          <el-col :span="2">   
              <el-button class="btn" size="small" ><img class="showImg1" src="@/common/images/icon/上一个.png" alt=""/></el-button>
              <el-button class="btn" size="small" ><img class="showImg1" src="@/common/images/icon/下一个.png" alt=""/></el-button>
          </el-col>
          </el-row>
          </div>
          <div class="oprBtn">
              <div class="addBtn">
                 <el-button icon="el-icon-plus" circle size="mini" @click="addRow()"></el-button>
              </div>
              <div class="deleteBtn">
                  <el-button icon="el-icon-minus" circle size="mini" @click="deleteRow()"></el-button>
              </div>
          </div>
      <div id="printMe">  
          <div class="til">
                  <h4 class="titleS">记账凭证</h4>        
          </div>
          <div class="tableTitle">
          <el-form label-width="80px" size="small">
          <el-row >
                  <el-col>
              <el-col :span="4">
                          <el-form-item label="凭证字:" v-model="formData.credentialWord">
                      <el-col :span="22">
                          <el-select placeholder="" v-model="value0">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                          </el-select>
                      </el-col>
                          </el-form-item>
              </el-col>
              <el-col :span="4">
                          <el-form-item label="凭证号:" v-model="formData.credentialNumber">
                      <el-col :span="22">
                          <el-select placeholder="" v-model="value1">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                          </el-select>
                      </el-col>
                          </el-form-item>
              </el-col>
              <el-col :span="6">
                      
                          <el-form-item label="业务日期:" v-model="formData.credentialNumber">
                          <el-col :span="22">
                              <el-date-picker
                              v-model="formData.businessDate"
                              type="date"
                              placeholder="选择日期"
                              valueFormat='yyyy-MM-dd HH:mm:ss'
                              style="width:100%">
                              </el-date-picker>
                          </el-col>
                          </el-form-item>
              </el-col>
              <el-col :span="6">
                          <el-form-item label="记账日期:" v-model="formData.credentialNumber">
                          <el-col :span="22">
                              <el-date-picker
                              v-model="formData.bookkeepingDate"
                              type="date"
                              placeholder="选择日期"
                              valueFormat='yyyy-MM-dd HH:mm:ss'
                              style="width:100%">
                              </el-date-picker>
                          </el-col>
                          </el-form-item>
              </el-col>
              <el-col :span="4">
                          <el-form-item label="附单据:" v-model="formData.credentialNumber">
                          <el-col :span="12">
                          <el-input placeholder="" v-model="value2">
                          
                          </el-input>
                          
                          </el-col>
                            <span style="margin-left:5px;">张</span>
                          
                          </el-form-item>
              </el-col>
                
          </el-col>
          </el-row>
          </el-form>
          </div>
            

          <div class="showTable">
          
            <el-table   :data="tableData"  border style="width: 100%" height="500"
              :row-class-name="tableRowClassName"
                :row-style="selectedHighlight"
                @row-click="AhandleSelectionChange">
                  
                <el-table-column  width="50" label="序号"  align="center">
                      <template slot-scope="scope">
                          
                        <div>{{scope.$index+1}}</div>

                    </template>

                </el-table-column>
                <el-table-column  prop="name"  label="摘要" align="center">
                    <template slot-scope="scope">
                        <el-input type="textarea"
                        :autosize="{ minRows: 1, maxRows: 2}"
                        v-model="scope.row.name">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column  prop="name"  label="科目" align="center">
                      <template slot-scope="scope">
                        <el-input type="textarea"
                        :autosize="{ minRows: 1, maxRows: 2}"
                        v-model="scope.row.date">
                        </el-input>
                    </template>
                </el-table-column>
                <el-table-column  prop="name"  label="借方金额" align="center" >
                    <el-table-column label="千" align="center"  width="20"></el-table-column>
                    <el-table-column label="佰" align="center"  width="20"></el-table-column>
                    <el-table-column label="十" align="center"  width="20"></el-table-column>
                    <el-table-column label="亿" align="center"  width="20"></el-table-column>
                    <el-table-column label="千" align="center"  width="20"></el-table-column>
                    <el-table-column label="佰" align="center"  width="20"></el-table-column>
                    <el-table-column label="十" align="center"  width="20"></el-table-column>
                    <el-table-column label="万" align="center" width="20" ></el-table-column>
                    <el-table-column label="千" align="center"  width="20"></el-table-column>
                    <el-table-column label="佰" align="center"  width="20"></el-table-column>
                    <el-table-column label="十" align="center"  width="20"></el-table-column>
                    <el-table-column label="壹" align="center"  width="20"></el-table-column>
                    <el-table-column label="角" align="center"  width="20"></el-table-column>
                    <el-table-column label="分" align="center"  width="20"></el-table-column>
                </el-table-column>
                <el-table-column  prop="name"  label="贷方金额" align="center">
                    <el-table-column label="千" align="center"  width="20"></el-table-column>
                    <el-table-column label="佰" align="center"  width="20"></el-table-column>
                    <el-table-column label="十" align="center"  width="20"></el-table-column>
                    <el-table-column label="亿" align="center"  width="20"></el-table-column>
                    <el-table-column label="千" align="center"  width="20"></el-table-column>
                    <el-table-column label="佰" align="center"  width="20"></el-table-column>
                    <el-table-column label="十" align="center"  width="20"></el-table-column>
                    <el-table-column label="万" align="center" width="20"></el-table-column>
                    <el-table-column label="千" align="center"  width="20"></el-table-column>
                    <el-table-column label="佰" align="center"  width="20"></el-table-column>
                    <el-table-column label="十" align="center"  width="20"></el-table-column>
                    <el-table-column label="壹" align="center"  width="20"></el-table-column>
                    <el-table-column label="角" align="center"  width="20"></el-table-column>
                    <el-table-column label="分" align="center"  width="20"></el-table-column>
                </el-table-column>
                
            </el-table>
          </div>
          <el-form>
            <el-row style="margin-top:10px;">
                <el-form-item label="核算项目:">
                  <el-col :span="4">
                    <el-col :span="22">
                      <el-input size="small" v-model="formData.projcet1" placeholder="请输入科目"></el-input>
                    </el-col>
                    <el-col :span="2">
                      <span style="margin-left:8px">-</span>
                    </el-col>
                  </el-col>
                  
                  <el-col :span="4">
                    <el-input size="small" v-model="formData.projcet1" placeholder="请输入科目"></el-input>
                  </el-col>
                </el-form-item>
            </el-row>
            <el-row>
                <el-col :span="21" :offset="1">
                  <el-form-item label="制单：">
                      <span>李红</span>
                  </el-form-item>
                </el-col>
                <el-col :span="2">
                  <el-form-item label="审核：">
                      <span>李红</span>
                  </el-form-item>
                </el-col>
            </el-row>
         </el-form>
        </div>
          <div class="save">
                <div class="saveContent">
                  <el-button size="small" type="primary" class="btn">保存</el-button>
                  <el-button  size="small" class="btn" v-print="'#printMe'">打印<i class="iconfont icon-lujing12"></i></el-button>
                </div>
          </div>
     
      </div>
    </div>
    <Flow :flowVisibles="flowVisibles" @createClosingF="createClosing1"></Flow>
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'
import { throttleTipPop } from "@/utils/functions.js";
import Flow from '../components/recording/flow'
export default {
  components: {
    Flow
  },
  data () {
    return {
      getIndex:'',
      value0:'',
      value1:'',
      value2:'',
      showSwitch:0,//隐藏开关
      flowVisibles:false,//流量弹框
      formData:{
        credentialWord:'',//凭证字
        credentialNumber:'',//凭证号
        businessDate:'',//业务日期
        bookkeepingDate:'',//记账日期
      },
      form: {
        current_page:1,
        page_size:10,
        total_count:0,
      },
      tableData:[
          {
          date: '',
          name: '',
          address: ''
        }, {
          date: '',
          name: '',
          address: ''
        }, {
          date: '',
          name: '',
          address: ''
        }, {
          date: '',
          name: '',
          address: ''
        }
      ],
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
  created () {
  },
  computed: {
  },
  methods: {
      newRe(){
        this.showSwitch = 1;
      },
      createClosing1(data){
        this.flowVisibles =data;
      },
      //打开流量弹框
      openFlow(){
        this.flowVisibles = true;
      },
      //增加行
      addRow(){
        this.tableData.push({data:'',name:'',address:''})
        this.getIndex = '';
      },
      //删除当前行
      deleteRow(){
        if(this.getIndex===''){
          throttleTipPop(this, "warning", "请选择要删除的表格", 2000);
        }else{
          this.tableData.splice(this.getIndex,1);
          this.getIndex = '';
        }
        
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
        this.getIndex = row.index;

      },

      handleSizeChange(){

      },
      handleCurrentChange(){

      },
      handleRowClick(rest){
        console.log(...rest);
        
      }
  },
  
}
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
    #recording{
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
      .mcard1 {
          padding: 20px;
          background: #fff;
          border: 1px solid #d7e0f1;
          width:1200px;
          .pg{
              margin:20px 0;
              text-align: right;
          }
          .iconfont {
            margin-top: -2px;
            font-size: 12px;
          }
          .icon-lujing12 {
            padding: 1px 0;
            margin-left: 8px;
            margin-top: -1px;
            display: inline-block;
          }
          .showImg{
              margin-right: 8px;
              margin-top: -2px;
              float: left;
            width: 16px;
          }
            .showImg1{
              margin-top: -2px;
              float: left;
            width: 16px;
            height: 12px;
            width:12px;
          }
          .btn{
            height:32px;

          }
          .btn1{
            position: relative;
            top: -2px;
          }
          .title1{
            margin-left: -20px;
              font-size: 16px;
              font-weight: 400;
              color: 3333;
              padding-left: 10px;
              line-height: 1.4;
              border-left: 4px solid #4C86F4;
              margin-bottom: 10px;
          }
      }
      .el{
          font-size: 16px;
          margin-right:3px;
      }
      .titleS {
          font-size: 30px;
          text-align: center;
          margin-top:20px;
          margin-bottom:40px;
      }
      .el-table .cell{
        padding-left:0 !important;
        padding-right:0 !important;
      }
      .el-table th div {
        padding-left:0 !important;
        padding-right:0 !important;
      }
      .save{
        overflow: hidden;
        .saveContent{
          float: right;
        }
      }
      .showTable{
        width: 98%;
        margin: 0 auto;
      }
      .oprBtn{
        position: absolute;
        left: 25px;
        top: 41.3%;
        .deleteBtn{
          margin-top:8px;
        }
      }
   
     
      
      
    }
</style>
