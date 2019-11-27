<template>
  <div id="contract">
    <div class="margin">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">合同公司</h4>
              <div class="search-base">
                  <el-row>
                  <el-col :span="5">
                    <el-col>
                      <el-form-item label="公司名称：">
                        <el-col :span="23">
                          <el-input v-model="tableDatas.sccCompanyName" placeholder="请输入公司名称"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="5">
                    <el-col>
                      <el-form-item label="联系人：">
                        <el-col :span="23">
                          <el-input v-model="tableDatas.sccContacts" placeholder="请输入联系人 "></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="5">
                    <el-col>
                      <el-form-item label="联系电话：">
                        <el-col :span="23">
                          <el-input v-model="tableDatas.sccTelephone" placeholder="请输入联系电话"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="5">
                    <el-col>
                      <el-form-item label="邮箱：">
                        <el-col :span="23">
                          <el-input v-model="tableDatas.sccEmail" placeholder="请输入邮箱"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small" @click="search">搜索</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="margin0">
        <div class="mcard1">
          <div class="mcard">
            <el-row class="operate mbottom">
              <el-col :span="21">
                <!-- <el-button type="primary">仅挑选</el-button> -->
                <el-button type="primary" @click="addVisible=true" size="small">新增</el-button>
              </el-col>
              <el-col :span="3"></el-col>
            </el-row>
            <el-table :data="listData" style="width: 100%;margin-bottom: 20px;" border>
              <el-table-column label="序号" type="index" width="50" align="center"></el-table-column>
              <el-table-column prop="name" label="公司名称" align="center" width="300">
                      <template slot-scope="scope">
                        {{scope.row.sccCompanyName}}
                      </template>
              </el-table-column>
              <el-table-column prop="name" label="联系人" align="center">
                      <template slot-scope="scope">
                        {{scope.row.sccContacts}}
                      </template>
              </el-table-column>
              <el-table-column prop="name" label="手机号码 " align="center">
                    <template slot-scope="scope">
                        {{scope.row.sccMobile}}
                      </template>
              </el-table-column>
              <el-table-column prop="name" label="注册电话" align="center">
                      <template slot-scope="scope">
                        {{scope.row.sccTelephone}}
                      </template>
              </el-table-column>
              <el-table-column prop="name" label="电子邮箱" align="center" width="200">
                        <template slot-scope="scope">
                        {{scope.row.sccEmail}}
                      </template>
              </el-table-column>
              <el-table-column prop="name" label="传真" align="center">
                      <template slot-scope="scope">
                        {{scope.row.sccFax}}
                      </template>
                </el-table-column>          
              <el-table-column prop="name" label="地址" align="center" width="190">
                    <template slot-scope="scope">
                        {{scope.row.sccAddress}}
                      </template>
              </el-table-column>
              <el-table-column label="操作" align="center" fixed="right" width="130">
                <template slot-scope="scope">
                  <div class="line-div">
                    <div
                      class="small-Idiv"
                      style="margin-left: -5px;"
                      @click="editCompany(scope.row)"
                    >
                      <div class="i-div">
                        <img src="@/common/images/icon/编辑.png" alt class="operation_img" />
                      </div>
                      <span style="word-break: keep-all;">编辑</span>
                    </div>
                    <div class="small-Idiv" 
                    style="justify-content: end;margin-left: 12px;"
                    @click="deleteCompany(scope.row)">
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
                :current-page="formData.pageIndex"
                :page-sizes="[10,20,50,100]"
                :page-size="formData.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="formData.pageCount"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  //新增合同公司 -->
    <el-dialog width="50%" :visible.sync="addVisible">
      <div class="mail-fitter">
        <div class="goods-fitter" style="margin-bottom:20px">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">新增合同主体公司</h4>
            </div>
          </el-form>
        </div>
        <el-form ref="form" :model="contractData" :rules="rules" label-width="120px">
          <div class="mail-wrapper">
            <h4 class="title1">公司信息</h4>
            <div class="search-base">
              <el-row class="warp">
                <div class="mbottom">
                  <div class="goods-fitter">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="公司名称：" prop="companyName">
                          <el-input v-model="contractData.companyName"></el-input>
                        </el-form-item>
                      </el-col>
                       <el-col :span="12">
                        <el-form-item label="联系人：" prop="companyContact">
                          <el-input v-model="contractData.companyContact"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="手机号码：" prop="companyPhone">
                          <el-input v-model="contractData.companyPhone"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="注册电话：" prop="registeredTel">
                          <el-input v-model="contractData.registeredTel"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                       <el-col :span="12">
                        <el-form-item label="电子邮箱：" prop="companyEmail">
                          <el-input v-model="contractData.companyEmail"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="传真：" prop="fax">
                          <el-input v-model="contractData.fax"></el-input>
                        </el-form-item>
                      </el-col>
                     
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="地址：" prop="companyAddress">
                          <el-input v-model="contractData.companyAddress"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="addVisible=false" size="small">关 闭</el-button>
        <el-button type="primary" @click="saveContract" size="small">保存</el-button>
      </span>
    </el-dialog>
    <!--  //编辑合同公司 -->
    <el-dialog width="50%" :visible.sync="editVisible">
      <div class="mail-fitter">
        <div class="goods-fitter" style="margin-bottom:20px">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">编辑合同主体公司</h4>
            </div>
          </el-form>
        </div>
        <el-form ref="form" :model="editList" :rules="rules" label-width="120px">
          <div class="mail-wrapper">
            <h4 class="title1">公司信息</h4>
            <div class="search-base">
              <el-row class="warp">
                <div class="mbottom">
                  <div class="goods-fitter">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="公司名称：" prop="sccCompanyName">
                          <el-input v-model="editList.sccCompanyName"></el-input>
                        </el-form-item>
                      </el-col>
                       <el-col :span="12">
                        <el-form-item label="联系人：" prop="companyContact">
                          <el-input v-model="editList.sccContacts"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="手机号码：" prop="companyPhone">
                          <el-input v-model="editList.sccMobile"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="注册电话：" prop="sccTelephone">
                          <el-input v-model="editList.sccTelephone"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                       <el-col :span="12">
                        <el-form-item label="电子邮箱：" prop="companyEmail">
                          <el-input v-model="editList.sccEmail"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="传真：" prop="fax">
                          <el-input v-model="editList.sccFax"></el-input>
                        </el-form-item>
                      </el-col>
                     
                    </el-row>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="地址：" prop="sccAddress">
                          <el-input v-model="editList.sccAddress "></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="editVisible=false" size="small">关 闭</el-button>
        <el-button type="primary" @click="editContract" size="small">保存</el-button>
      </span>
    </el-dialog>
    <el-dialog width="20%" title="提示"  :visible.sync="deleteVisible" style="top:20%"> 
        <div class="mail-fitter">
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
      <span slot="footer" class="dialog-footer" >
        <el-button type="danger" @click="deleteVisible=false" size="small" style="margin-right:33px;"> 关 闭 </el-button>
        <el-button type="primary" @click="deleteContracts" size="small"> 确 定 </el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getCatagory, deleteCatagoryid } from "@/api/product/index";
import {addContract,getContract,findContract,editContract,deleteContract} from '@/api/setting/index'
import { throttleTipPop } from "@/utils/functions.js";
export default {
  data() {
    return {
      deleteVisible:false,
      editVisible: false,
      addVisible: false,
      editDatas: {},
      data: [],
      listData:[],
      editList:{},
      sccId:'',
      tableData: {
        currentPage: 1,
        sizes: [10, 20, 50, 100],
        size: 10,
        total: 0
      },
      contractData: {
        companyName: "", //公司名称
        OpeningBank: "", //开户行
        companyContact: "", //公司联系人
        bankAccount: "", //银行账号
        companyPhone: "", //公司联系电话
        finance: "", //财务人员
        fax: "", //传真
        financePhone: "", //财务电话
        companyEmail: "", //公司邮箱
        taxpayer: "", //纳税人识别号
        companyAddress: "", //公司地址
        registeredTel:'',//注册电话
        bizType:0
      },
      formData:{
        pageSize:10,
        pageIndex:1,
        pageCount:0,
        bizType:0,

      },
      tableDatas: {
        bizType:0,
        pageIndex:1,
        pageSize:10,
        sccCompanyName:'',//公司名称
        sccContacts:'',//联系人
        sccEmail:'',//邮箱
        sccTelephone:'',//联系电话
      },
      input: "",
      forms: {},
      rules:{
        companyName:[{ required: true, message: "此项为必填项", trigger: "blur" }],
        registeredTel:[{ required: true, message: "此项为必填项", trigger: "blur" }],
        companyAddress:[{ required: true, message: "此项为必填项", trigger: "blur" }],
        sccCompanyName:[{ required: true, message: "此项为必填项", trigger: "blur" }],
        sccTelephone:[{ required: true, message: "此项为必填项", trigger: "blur" }],
        sccAddress:[{ required: true, message: "此项为必填项", trigger: "blur" }],
      }
    };
  },
  created(){
    this._getContract();
  },
  methods: {
    //获得分页
    _getContract(){
      getContract(this.formData).then(res=>{
        this.listData = res.data.pageList
        this.formData.pageCount = res.data.count
      })
    },
    //获得编辑内容
    editCompany(row) {
     findContract(row.sccId).then(res=>{
        if(res.code===200){
        this.editList = res.data
        }
      }) 
      this.editVisible = true;
    },
    //删除合同公司信息
    deleteContracts(){
      deleteContract(this.sccId).then(res=>{
        if(res.code===200){
          throttleTipPop(this, "success", "删除合同公司信息成功", 2000);
            this.deleteVisible = false;
            this._getContract()
        }else{
          throttleTipPop(this, "error", "删除合同公司信息失败", 2000);
          return false
        }
      })
    },
    //编辑合同公司信息
    editContract(){
      editContract(this.editList).then(res=>{
        if(res.code===200){
            throttleTipPop(this, "success", "修改合同公司信息成功", 2000);
            this.editVisible = false;
            this._getContract()
        }else{
          throttleTipPop(this, "error", "修改合同公司信息失败", 2000);
          return false
        }
      })
    },

    deleteCompany(row){
      this.sccId = row.sccId
      this.deleteVisible =true;
    },
    handleSizeChange(val) {
        this.formData.pageSize =val
        this._getContract()
    },
    handleCurrentChange(val) {
      this.formData.pageIndex = val
      this._getContract()
    },
    search() {
      getContract(this.tableDatas).then(res=>{
        this.listData = res.data.pageList
        this.formData.pageCount = res.data.count
      })
    },
    //新增合同公司
    saveContract(){
      addContract(this.contractData).then(res=>{
        if (res.code===200) {
            throttleTipPop(this, "success", "新增合同公司成功", 2000);
            this.addVisible = false
            this._getContract()
        }else{
          throttleTipPop(this, "error", "新增合同公司失败", 2000);
          return false
          
          
        }
        
      })
    },
  }
};
</script>
<style lang='scss'>
@import "@/common/scss/variable.scss";
#contract{
.brand {
  position: relative;
  .add_brand {
    position: absolute;
    right: 20px;
  }
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
.el-dialog__footer{
  padding:10px !important;
}
}
</style>