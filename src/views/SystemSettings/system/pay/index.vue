<template>
  <div class="margin">
    <div class="mcard">
      <div class="title">支付配置</div>
      <el-table :data="ruleForm.table" border stripe style="width: 100%;margin-top:20px">
        <el-table-column align="center" width="100" type="index" label="编号"></el-table-column>
        <el-table-column align="center" prop="paymentName" label="支付方式"></el-table-column>
        <el-table-column align="center" prop="date" label="启用PC">
          <template slot-scope="scope">{{scope.row.pcEnable?'启用':'不启用'}}</template>
        </el-table-column>
        <el-table-column align="center" prop="tableSuffix" label="启用WAP">
          <template slot-scope="scope">{{scope.row.wapEnable?'启用':'不启用'}}</template>
        </el-table-column>
        <el-table-column align="center" label="启用APP">
          <template slot-scope="scope">{{scope.row.appEnable?'启用':'不启用'}}</template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <div class="line-div small_top" style>
              <div class="small-Idiv" @click="ediotMessage(scope.row)">
                <div class="i-div fuzhi">
                  <img src="../../../../common/images/icon/编辑.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">编辑</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="ruleForm.pageNum"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="ruleForm.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="ruleForm.total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { getpaymentConfig } from "@/api/systemsettings/index";
import { throttleTipPop } from "@/utils/throttle";
export default {
  data() {
    return {
      ruleForm: {
        table: [],
        pageNum: 1,
        pageSize: 10,
        total: 0
      },
      loading: false
    };
  },
  methods: {
    // 查询
    async _getpaymentConfig() {
      let obj = {};
      obj.pageNum = this.ruleForm.pageNum;
      obj.pageSize = this.ruleForm.pageSize;
      let data = await getpaymentConfig(obj);
      this.ruleForm.total = data.data.total;
      this.ruleForm.table = data.data.list;
    },
    ediotMessage(data){
      this.$router.push({name:'paydetail', query:{paymentCode:data.paymentCode}})
    },
    handleSizeChange(val) {
      this.ruleForm.pageSize = val;
      this._getpaymentConfig();
    },
    handleCurrentChange(val) {
      this.ruleForm.pageNum = val;
      this._getpaymentConfig();
    }
  },
  created() {
    this._getpaymentConfig();
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.form-wrapper {
  margin-top: 50px;
  width: 600px;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .input {
    width: 217px;
  }
  .btn-submit {
    margin-top: 20px;
  }
}
.margin {
  margin-top: 0 !important;
  padding-left: 0 !important;
  border: 1px solid rgba(214, 222, 239, 1);
}
.fuzhi {
  margin-bottom: -6px;
}
.tip {
  text-align: center;
  .icon-tip {
    color: #f56c6c;
    margin: 0 20px;
  }
}
</style>
