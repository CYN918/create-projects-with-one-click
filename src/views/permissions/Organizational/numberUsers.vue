<template>
  <div class="departmentalStaff">
    <div class="header">
      <p class="goback" @click="$router.go(-1)">
        <i class="el-icon-back"></i>
        <span>返回</span>
      </p>
      <p class="text">组织架构</p>
    </div>
    <div class="tableContainer">
      <div class="btn">
        <span>订单明细</span>
        <span>开票明细</span>
        <span>应收账款</span>
        <span>费用额度</span>
        <span>核对账单</span>
        <span @click="batchOperation">批量操作</span>
      </div>
      <div class="table">
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column align="center" type="selection" width="55" />
          <el-table-column align="center" type="index" label="序号" width="50" />
          <!-- <el-table-column prop="data1" align="center" label="层级" width="80" /> -->
          <el-table-column prop="userName" align="center" label="账户名"></el-table-column>
          <el-table-column label="公司名称" align="center">
            <template slot-scope="scope">{{ scope.row.company || "" }}</template>
          </el-table-column>
          <el-table-column prop="organizeName" label="部门" align="center"></el-table-column>
          <!-- <el-table-column align="center" prop="data4" label="部门领导"></el-table-column> -->
          <el-table-column align="center" label="工号">
            <template slot-scope="scope">{{ scope.row.employeeSn || "" }}</template>
          </el-table-column>
          <el-table-column align="center" prop="data6" label="姓名">
            <template slot-scope="scope">{{ scope.row.realName || "" }}</template>
          </el-table-column>
          <el-table-column align="center" prop="data7" label="联系电话">
            <template slot-scope="scope">{{ scope.row.telephone || "" }}</template>
          </el-table-column>
          <el-table-column align="center" prop="data8" label="手机号码">
            <template slot-scope="scope">{{ scope.row.telephone || "" }}</template>
          </el-table-column>
          <el-table-column align="center" prop="data9" label="邮箱">
            <template slot-scope="scope">{{ scope.row.email || "" }}</template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            :current-page="form.current_page"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="form.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="form.total_count"
            @current-change="$event => {form.current_page = $event; loadUserPage();}"
          ></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { searchUser } from "@/api/permissions/index";
export default {
  data() {
    return {
      form: {
        current_page: 1,
        total_count: 0,
        pageSize: 10,
        childIds: []
      },
      dialogVisible: false, //弹框按钮
      desc: "", //删除原因
      radio2: 3, //批量操作的的单选按钮
      value: false, //开关
      tableData: []
    };
  },
  methods: {
    //批量操作
    batchOperation() {
      this.dialogVisible = true;
    },
    //开关
    handleChange(val) {
      console.log(val);
    },
    // 获取所有用户
    async loadUserPage() {
      var form = {};
      form.pageNum = this.form.current_page;
      form.pageSize = this.form.pageSize;
      form.organizeIds = (this.form.childIds || []).join(",");

      await searchUser(form).then(res => {
        this.tableData = res.data.list;
        this.form.total_count = res.data.total;
      });
    }
  },
  mounted() {
    this.form.childIds = (this.$route.query.childIds || "").split(",");
    this.loadUserPage();
  }
};
</script>
<style lang="scss" scoped>
.departmentalStaff {
  width: 1612px;
  margin: 30px auto;
  .header {
    height: 94px;
    padding: 31px 0 31px 20px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    border: 1px solid rgba(234, 237, 244, 1);
    box-sizing: border-box;
    .goback {
      float: left;
      cursor: default;
      width: 68px;
      background: rgba(76, 134, 244, 1);
      border-radius: 3px;
      padding: 7px 0 7px 11px;
      box-sizing: border-box;
      font-size: 12px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
    .text {
      margin-top: 9px;
      margin-left: 43px;
      float: left;
    }
  }
  .tableContainer {
    margin-top: 25px;
    width: 100%;
    background: white;
    overflow: hidden;
    .btn {
      margin-top: 20px;
      span {
        margin-left: 20px;
        cursor: pointer;
        display: inline-block;
        width: 80px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        background: rgba(76, 134, 244, 1);
        font-size: 12px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
    .table {
      margin-top: 30px;
    }
  }
  .caozuo {
    display: flex;
    text-align: right;
    span {
      display: inline-block;
      width: 100px;
      text-align: right;
    }
    input[type="textarea"] {
    }
  }
}
.pagination{
  text-align: right;
  margin-top: 30px;
}
</style>
