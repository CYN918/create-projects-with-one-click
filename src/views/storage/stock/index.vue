<template>
  <div id="stock">
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">仓库</h4>
            <div class="search-base">
              <el-row>
               <el-col :span="5">
                    <el-col>
                        <el-form-item label="仓库编码：">
                            <el-col :span="21">
                                <el-input v-model="form.warehouseNo" placeholder="请输入仓库编码/仓库名称"></el-input>
                            </el-col>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="仓库名称：">
                            <el-col :span="21">
                                <el-input v-model="form.name"  placeholder="请输入仓库名称"></el-input>
                            </el-col>
                        </el-form-item>
                </el-col>               
                <el-col :span="2" >
                      <el-button type="primary" size="small" @click='search(true)' >查询</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard0">
      <div class="mcard">
        <el-row class="operate mbottom">
            <el-col :span="21">
            <el-button type="primary" size="small" @click="addStore()"
            v-permit="'warehouse:save'">新增</el-button>
          </el-col>
          <el-col :span="3">
          </el-col>
        </el-row>
        <el-table :data="storageList" border @selection-change="handleSelectionChange" stripe>
          <el-table-column  type="index"  label="序号" align="center" width="55"></el-table-column>
          <el-table-column label="仓库编码" prop="name" align="center" width="151">
                      <template slot-scope="scope">
                         {{scope.row.warehouseNo}}
                      </template>
          </el-table-column>  
          <el-table-column label="仓库名称" prop="name" align="center" width="166">
                      <template slot-scope="scope">
                         {{scope.row.name}}
                      </template>
          </el-table-column>
          <el-table-column label="商品类别" prop="name" align="center">
                      <template slot-scope="scope">
                         {{scope.row.goodsType}}
                      </template>  
          </el-table-column>
          <el-table-column label="存放区域" prop="name"  align="center"> 
                     <template slot-scope="scope">
                         {{scope.row.storageArea}}
                      </template>
          </el-table-column>
          <el-table-column label="具体位置" prop="name" align="center">
                     <template slot-scope="scope">
                         {{scope.row.location}}
                      </template>
          </el-table-column>
          <el-table-column label="仓管员" prop="name" align="center">
                      <template slot-scope="scope">
                         {{scope.row.contact}}
                      </template>
          </el-table-column>
          <el-table-column label="手机号码" prop="name" align="center">
                       <template slot-scope="scope">
                         {{scope.row.phone}}
                      </template>
          </el-table-column>
          <el-table-column label="地址" prop="name" align="center">
                      <template slot-scope="scope">
                         {{scope.row.address}}
                      </template>
          </el-table-column>
          <el-table-column label="操作" prop="name" align="center" width="130">
              <template slot-scope="scope">
                  <div class="line small_top">
                    <div
                      class="small-Idiv"
                      @click="editStorage(scope.row)"
                      v-permit="'warehouse:update'">
                      <div class="i-div">
                        <img src="@/common/images/icon/编辑.png" alt class="operation_img" />
                      </div>
                      <span style="word-break: keep-all;">编辑</span>
                    </div>
                    <div
                      class="small-Idiv"
                      @click="deleteStorage(scope.row)"
                      v-permit="'warehouse:delete'">
                      <div class="i-div">
                        <img src="@/common/images/icon/回收站.png" alt class="operation_img" />
                      </div>
                      <span style="word-break: keep-all;">删除</span>
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
      <!-- 删除仓库订单 -->
      <el-dialog :visible.sync="deleteVisible" width="20%" title="提示" style="top:20%">
        <div class="mail-fitter" style="padding:20px 0;background:#fff;">
            <div class="search-base">
                  <div class="goods-fitter">
                    <el-row>
                        <div class="tip">
                          <img class="tipImg" src="@/common/images/组 180.png" alt=""/>
                            <span>温馨提示：一经删除不可恢复记录！</span><br/>
                            <span>你确定要删除所选内容吗？</span>
                        </div>

                    </el-row>
                  </div>  
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="deleteVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteStore()" size="small">确 定</el-button>
        </span>
      </el-dialog>
       <!-- 新增仓库 -->
      <el-dialog width="40%" :visible.sync="addVisible" :before-close="addClosing">
          <div class="mbottom">
            <div class="goods-fitter">
              <el-form label-width="100px" size="small">
                <div class="search-wrapper">
                  <h4 class="title">新增仓库</h4>
                </div>
              </el-form>
            </div>
          </div>
          <div class="mcard0">
            <div class="mcard">
              <h4 class="title">仓库信息</h4>
              <div>
             <el-form ref="infoForm" :model="pageList" :rules="rules" label-width="125px" size="small">
                <el-row>
                <el-col :span="12">
                    <el-form-item label="仓库名称：" prop="name">                           
                               <el-input v-model="pageList.name" placeholder="请输入仓库名称" ></el-input>                       
                    </el-form-item>  
                </el-col>
                <el-col :span="12">
                  <el-form-item label="仓库编码：" prop="warehouseNo">                       
                               <el-input v-model="pageList.warehouseNo" placeholder="保存后自动生成" readonly></el-input>     
                  </el-form-item> 
                  </el-col>
                </el-row> 
                <el-row>
                  <el-col :span="12">
                  <el-form-item label="商品类别：" prop="goodsType">                       
                                <el-input v-model="pageList.goodsType" placeholder="请输入商品类别"></el-input>      
                  </el-form-item> 
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="存放区域：" prop="storageArea">                           
                                <el-input v-model="pageList.storageArea" placeholder="请输入商品存放区域"></el-input>                       
                    </el-form-item>  
                </el-col>
                </el-row> 
                <el-row>
                  <el-col :span="12">
                      <el-form-item label="具体位置：" prop="location">                           
                                 <el-input v-model="pageList.location" placeholder="请输入商品具体位置"></el-input>                       
                      </el-form-item>  
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="仓管员：" prop="contact">                       
                               <el-input v-model="pageList.contact" placeholder="请输入仓库联系人姓名"></el-input>       
                    </el-form-item> 
                    </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                      <el-form-item label="手机号码：" prop="phone">                           
                                 <el-input v-model="pageList.phone" placeholder="请输入仓库联系人手机"></el-input>                       
                      </el-form-item>  
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="办公电话：" >                       
                               <el-input v-model="pageList.tel"></el-input>       
                    </el-form-item> 
                    </el-col>
                </el-row>
                <el-row>
                  <el-col>
                      <el-form-item label="仓库地址：" prop="address">                           
                                 <el-input v-model="pageList.address" placeholder="请输入仓库详细地址"></el-input>                       
                      </el-form-item>  
                  </el-col>

                </el-row>  
              
                
              </el-form>
              </div>
            </div>
          </div>
           
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="addClose" size="small">关 闭</el-button>
            <el-button type="primary" @click="addSave()" size="small">保存</el-button>
          </span>
      </el-dialog>
      <!-- 编辑仓库 -->
      <el-dialog width="40%" :visible.sync="editVisible" :before-close="editClosing">
          <div class="mbottom">
            <div class="goods-fitter">
              <el-form label-width="100px" size="small">
                <div class="search-wrapper">
                  <h4 class="title">编辑仓库</h4>
                </div>
              </el-form>
            </div>
          </div>
          <div class="mcard0">
            <div class="mcard">
              <h4 class="title">仓库信息</h4>
              <div>
              <el-form ref="infoForm" :model="detailData" :rules="rules" label-width="125px" size="small">
                <el-row>
                <el-col :span="12">
                    <el-form-item label="仓库名称：" prop="name">                           
                               <el-input v-model="detailData.name" placeholder="请输入仓库名称" ></el-input>                       
                    </el-form-item>  
                </el-col>
                <el-col :span="12">
                  <el-form-item label="仓库编码：" prop="warehouseNo">                       
                               <el-input v-model="detailData.warehouseNo" placeholder="保存后自动生成"></el-input>     
                  </el-form-item> 
                  </el-col>
                </el-row> 
                <el-row>
                  <el-col :span="12">
                  <el-form-item label="商品类别：" prop="goodsType">                       
                                <el-input v-model="detailData.goodsType" placeholder="请输入商品类别"></el-input>      
                  </el-form-item> 
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="存放区域：" prop="storageArea">                           
                                <el-input v-model="detailData.storageArea" placeholder="请输入商品存放区域"></el-input>                       
                    </el-form-item>  
                </el-col>
                </el-row> 
                <el-row>
                  <el-col :span="12">
                      <el-form-item label="具体位置：" prop="location">                           
                                 <el-input v-model="detailData.location" placeholder="请输入商品具体位置"></el-input>                       
                      </el-form-item>  
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="仓管员：" prop="contact">                       
                               <el-input v-model="detailData.contact" placeholder="请输入仓库联系人姓名"></el-input>       
                    </el-form-item> 
                    </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                      <el-form-item label="手机号码：" prop="phone">                           
                                 <el-input v-model="detailData.phone" placeholder="请输入仓库联系人手机"></el-input>                       
                      </el-form-item>  
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="办公电话：" >                       
                               <el-input v-model="detailData.tel"></el-input>       
                    </el-form-item> 
                    </el-col>
                </el-row>
                <el-row>
                  <el-col>
                      <el-form-item label="仓库地址：" prop="address">                           
                                 <el-input v-model="detailData.address" placeholder="请输入仓库详细地址"></el-input>                       
                      </el-form-item>  
                  </el-col>

                </el-row>  
              
                
              </el-form>
              </div>
            </div>
          </div>
           
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="editClose" size="small">关 闭</el-button>
            <el-button type="primary" @click="editStore()" size="small">保存</el-button>
          </span>
      </el-dialog>
  </div>
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'
import {getStorageList,addStorage,detailStorage,editStorages,deleteStorages} from '@/api/storage';
import { throttleTipPop } from "@/utils/functions.js";
export default {
    data () {
    return {
      deleteVisible:false,//删除弹窗
      addVisible:false,// 新增仓库
      editVisible:false,//编辑仓库
      storageList:[],//仓库分页列表
      detailData:{},//仓库详情
      warehouseId:'',//仓库ID
      pageList:{
        name:'',//仓库名称
        contact:'',//仓管员
        phone:'',//联系电话
        address:'',//仓库地址
        goodsType:'',//商品类别
        storageArea:'',//存放区域
        location:'',//具体位置
        warehouseNo:'',//仓库编号
        tel:'',//办公电话
      },//新增
      form: {
        pageIndex:1,
        pageSize:10,
        count:0,
        warehouseNo:'',//仓库编码
        name:'',//仓库名字
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
          rules: {
                name: [{ required: true, message: "此项为必选项", trigger: ["blur","change"] }],
                contact: [{ required: true, message: "此项为必选项", trigger: ["blur","change"] }],
                phone: [{ required: true, message: "此项为必选项", trigger: ["blur","change"] }],
                address: [{ required: true, message: "此项为必选项", trigger: ["blur","change"] }],
                goodsType: [{ required: true, message: "此项为必选项", trigger: ["blur","change"] }],
                storageArea: [{ required: true, message: "此项为必选项", trigger: ["blur","change"] }],
                location: [{ required: true, message: "此项为必选项", trigger: ["blur","change"] }],
           }
    }
  },
  created () {
    this._getStorageList();
  },
  computed: {
  },
   methods: {
     //关闭新增
     addClose(){
       this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                      this.addVisible = false;
                })
                .catch(_ => {});
     },
     addClosing(){
       this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                      this.addVisible = false;
                })
                .catch(_ => {});

     },
     //关闭编辑
     editClose(){
       this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                      this.editVisible = false;
                })
                .catch(_ => {});
     },
     editClosing(){
       this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                      this.editVisible = false;
                })
                .catch(_ => {});

     },
     //获取仓库列表分页
     _getStorageList(){
       getStorageList(this.form).then(res=>{
          this.storageList = res.data.pageList;
          this.form.count = res.data.count;
       })

     },
     search(){
       this.form.pageIndex =1;
       this._getStorageList();
     },
     //删除弹窗
     deleteStorage(row){
       this.deleteVisible = true;
       this.warehouseId = row.warehouseId;
     },
    deleteStore(){
        deleteStorages(this.warehouseId).then(res=>{
            if(res.code===200){
                throttleTipPop(this, "success","删除仓库成功！", 2000);
                this.deleteVisible = false;
                this._getStorageList();
            }
        })
    },
     //新增窗口
     addStore(){
       
        this.addVisible = true;
     },
     addSave(){

        addStorage(this.pageList).then(res=>{
            if(res.code===200){
                throttleTipPop(this, "success","新增仓库成功！", 2000);
                this.addVisible = false;
                this._getStorageList();
            }
       })
     },     
     editStorage(row){
       detailStorage(row.warehouseId).then(res=>{
          this.detailData = res.data;
       })
        this.editVisible = true;

     },
     editStore(){
        editStorages(this.detailData).then(res=>{
          if(res.code===200){
              throttleTipPop(this, "success","更新仓库成功！", 2000);
                this.editVisible = false;
                this._getStorageList();
          }
        })
     },
    handleCurrentChange(val){
        this.form.pageIndex = val;
        this._getStorageList();
    },
    handleSizeChange(val){
        this.form.pageSize = val;
        this._getStorageList();

    },
    handleSelectionChange(){

    }
  },
  components: {
  }
}
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
  #stock{
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
  .line-div {
        overflow: hidden;
        .small-Idiv{
          float: left;
        }
        .small-Idiv:nth-of-type(2){
          margin-left:10px;
        }
      }
      .line {
        overflow: hidden;
        margin-top:10px;
        .small-Idiv{
          float: left;
          margin-left: 10px;
        }
        .small-Idiv:nth-of-type(2){
          margin-left: 20px;
        }
      }
      .small_top {
        margin-top: 10px;
      }

      .i-div {
        cursor: pointer;
      }
      /deep/ .el-dialog__headerbtn{
        top:10px;
      }
      .mcard0 {
      border: 1px solid #d7e0f1;
      margin-top: 20px;
      }
       .tip{
      margin-top:-30px;
      text-align: center;
      line-height: 22px;
      .tipImg{
        position: relative;
        left: -16px;
        top:28px;
      }                     
    }
  }    
</style>
