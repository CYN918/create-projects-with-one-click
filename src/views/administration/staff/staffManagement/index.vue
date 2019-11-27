<template>
  <div id="staffManagement">
    <div class="margin0">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">员工管理</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="5">
                    <el-col>
                      <el-form-item label="员工姓名：">
                        <el-col :span="22">
                          <el-input v-model="form.employeeName" placeholder="请输入员工名称"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="选择部门：">
                      <el-col :span="22">
                        <el-select v-model="form.organizeId" placeholder="请选择" style="width:100%">
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
                  <el-col :span="5">
                    <el-form-item label="员工类型：">
                      <el-col :span="22">
                        <el-select v-model="form.employeeType" placeholder="请选择" style="width:100%">
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
                  <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small" @click="searchEmployee">搜索</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mcard" style="border: 1px solid #d7e0f1;">
        <el-row class="operate mbottom">
          <el-col :span="21">
            <el-button type="primary" size="small" class="btn" @click="addStaffManageMent">
              <img class="showImg" src="@/common/images/icon/新增凭证.png" alt />新增
            </el-button>
            <el-button type="primary" size="small" class="btn" @click="editStaffManageMent">
              <img class="showImg" src="@/common/images/icon/行政编辑.png" alt />编辑
            </el-button>
            <el-button type="primary" size="small" class="btn" @click="detailStaffManageMent">
              <img class="showImg" src="@/common/images/icon/行政查看.png" alt />查看
            </el-button>
            <el-button type="primary" size="small" class="btn" @click="deleteStaffManageMent">
              <img class="showImg" src="@/common/images/icon/财务删除.png" alt />删除
            </el-button>
            <el-button class="btn" type="primary" size="small" @click="reloadStaffManageMent">
              <img class="showImg" src="@/common/images/icon/刷新财务.png" alt />刷新
            </el-button>
          </el-col>
          <el-col :span="3">
            <el-button class="btn1" size="small">导入</el-button>
            <el-button class="btn1" size="small">导出</el-button>
            <el-button class="btn1" size="small">打印</el-button>
          </el-col>
        </el-row>
        <el-table :data="emList" border 
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="white"
        @selection-change="handleSelectionChange"
        :row-class-name="tableRowClassName"
        :row-style="selectedHighlight"
        @row-dblclick="AhandleSelectionChange">
          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
          <el-table-column label="员工编号" prop="employeeSn" align="center" width="112"></el-table-column>
          <el-table-column label="员工姓名" prop="employeeName" align="center" width="80"></el-table-column>
          <el-table-column label="部门" prop="organize" align="center" width="80"></el-table-column>
          <el-table-column label="职称" prop="position" align="center" width="80"></el-table-column>
          <el-table-column label="性别" prop="sex" align="center" width="50"></el-table-column>
          <el-table-column label="员工类型" prop="employeeType" align="center" width="80"></el-table-column>
          <el-table-column label="入职时间" prop="hireTime" align="center" width="110">
                    <template slot-scope="scope">
                          <div class="txt_left">
                              {{scope.row.hireTime}}
                          </div>
                    </template>
          </el-table-column>
          <el-table-column label="出生年月" prop="name" align="center" width="110">
                    <template slot-scope="scope">
                          <div class="txt_left">
                              {{scope.row.birthday}}
                          </div>
                    </template>
          </el-table-column>
          <el-table-column label="手机" prop="personalTel" align="center" width="120"></el-table-column>
          <el-table-column label="学历" prop="educationalLevel" align="center" width="70"></el-table-column>
          <el-table-column label="毕业院校" prop="graduatedFrom" align="center" width="160"></el-table-column>
          <el-table-column label="是否已婚" prop="maritalStatus" align="center" width="70"></el-table-column>
          <el-table-column label="开户行" prop="bankOpeningName" align="center"></el-table-column>
          <el-table-column label="银行账号" prop="bankAccount" align="center"></el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="130">
            <template slot-scope="scope">
              <div class="line-div">
                <div class="small-Idiv">
                  <div class="i-div">
                    <img src="@/common/images/icon/行政离职.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">离职</span>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.pageNum"
            :page-sizes="[5, 10, 20, 50]"
            :page-size="form.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="form.count"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 新增员工管理 -->
    <Add
      :addVisibles="addVisibles"
      @createCloseA="createCloseA1"
      @createClosingA="createClosingA1"
      @addStaffManageMent1="addStaffManageMent2"
    ></Add>
    <!-- 编辑员工管理 -->
    <Edit
      :editVisibles="editVisibles"
      :employeeData="employeeData"
      @createCloseE="createCloseE1"
      @createClosingE="createClosingE1"
      @editStaffManageMent1="editStaffManageMent2"
    ></Edit>
    <!-- 查看员工管理 -->
    <Detail
      :detailVisibles="detailVisibles"
      :detailData="detailData"
      @createCloseD="createCloseD1"
      @createClosingD="createClosingD1"
      @detailStaffManageMent1="detailStaffManageMent2"
    ></Detail>
    <!-- 删除员工管理 -->
    <el-dialog :visible.sync="deleteVisible" width="20%" title="提示" style="top:20%">
      <div class="mail-fitter" style="padding:20px 0;background:#fff;">
        <div class="search-base">
          <div class="goods-fitter">
            <el-row>
              <div class="tip">
                <img class="tipImg" src="@/common/images/组 180.png" alt />
                <span>温馨提示：一经删除不可恢复记录！</span>
                <br />
                <span>你确定要删除所选内容吗？</span>
              </div>
            </el-row>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteStaff" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {getEmployeePage,initEmployeeInfo,findEmployeeInfo,deleteEmployeeInfo } from "@/api/administration/index";
import Add from "./add";
import Edit from "./edit";
import Detail from "./detail";
export default {
  components: {
    Add,
    Edit,
    Detail
  },
  data() {
    return {
      addVisibles: false, //新增员工管理
      editVisibles: false, //修改员工管理
      detailVisibles: false, //查看员工管理
      deleteVisible: false, //删除员工管理
      emList:[],//员工管理分页
      employeeId:'',//员工ID
      getIndex:'',//选中下标
      employeeData:{},//员工资料
      detailData:{},//查看详情
      form: {
        pageNum: 1,
        pageSize: 10,
        count: 0,
        employeeName:'',//员工姓名
        employeeType:'',//员工类型
        organizeId:'',//部门
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      value: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ]
    };
  },
  created() {
    this._getEmployeePage();
  },
  computed: {},
  methods: {
    //重置数据
    resetData(){
      this.pageNum = 1;
      this.employeeId = "";
      this.getIndex = '';
    },
    //获取员工管理分页
    _getEmployeePage(){
        getEmployeePage(this.form).then(res=>{
              if(res.code===200){
                this.form.count = res.data.count;
                this.emList = res.data.pageList;
              }
        })
    },
    //搜索分页
    searchEmployee(){
      this._getEmployeePage();
        this.pageNum = 1;       
    },
    //新增员工管理窗口返回值
    createCloseA1: function(data) {
      this.addVisibles = data;
    },
    createClosingA1: function(data) {
      this.addVisibles = data;
    },
    addStaffManageMent2(data) {
      this.addVisibles = data;
      this.resetData();
      this._getEmployeePage();
    },
    //修改员工管理窗口返回值
    createCloseE1: function(data) {
      this.editVisibles = data;
    },
    createClosingE1: function(data) {
      this.editVisibles = data;
    },
    editStaffManageMent2(data) {
      this.editVisibles = data;
      this.resetData();
      this._getEmployeePage();
    },
    //查看员工管理窗口返回值
    createCloseD1: function(data) {
      this.detailVisibles = data;
    },
    createClosingD1: function(data) {
      this.detailVisibles = data;
    },
    detailStaffManageMent2(data) {
      this.detailVisibles = data;
    },
    //新增员工管理
    addStaffManageMent() {
      this.addVisibles = true;
    },
    //修改员工管理
    editStaffManageMent() {

      if(this.employeeId){
        initEmployeeInfo(this.employeeId).then(res=>{
          if(res.code===200){
              this.employeeData = res.data;
              this.editVisibles = true;     
          }
        })
      }else{
        this.$message.warning("请选择需要编辑的选项");
      }
      
    },
    //查看员工管理
    detailStaffManageMent() {
       if(this.employeeId){
        findEmployeeInfo(this.employeeId).then(res=>{
          if(res.code===200){
              this.detailData = res.data;
              this.detailVisibles = true;
              
          }
        })
      }else{
        this.$message.warning("请选择需要查看的选项");
      }
    },
    //删除员工管理
    deleteStaffManageMent(){
       if(this.employeeId){
           this.deleteVisible = true;
      }else{
        this.$message.warning("请选择需要删除的选项");
      }
       
    },
    //刷新分页
    reloadStaffManageMent(){
      this._getEmployeePage();
      this.resetData();
    },
    deleteStaff(){
      deleteEmployeeInfo(this.employeeId).then(res=>{
        if(res.code===200){
          this.$message.warning("删除员工信息成功");
          this.deleteVisible =false;
          this.resetData();
          this._getEmployeePage();
        }
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
      this.getIndex = row.index;
      this.employeeId = row.employeeId;

    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.resetData();
      this._getEmployeePage();
    },
    handleCurrentChange(val) {
    this.form.pageNum = val;
      this.resetData();
      this._getEmployeePage();
    },
    handleSelectionChange() {}
  }
};
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
#staffManagement {
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
      max-width: 2400px;
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

    .small-Idiv {
      cursor: pointer;
      margin: 0 auto;
    }
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
  .showImg {
    margin-right: 8px;
    margin-top: -2px;
    float: left;
    width: 16px;
  }
  .showImg1 {
    margin-top: -2px;
    float: left;
    width: 16px;
    width: 12px;
  }
  .btn {
    height: 32px;
  }
  .btn1 {
    position: relative;
    top: -2px;
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
}
</style>
