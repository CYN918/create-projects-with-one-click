<template>
  <div class>
    <div class="mcard">
      <div class="title">额度发放审核</div>
      <div>
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <div class="search-base">
              <el-row>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="审核配置：">
                      <el-col :span="22">
                        <el-select v-model="value" placeholder="请选择">
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
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="经销商名称：">
                      <el-col :span="22">
                        <el-input placeholder="请输入经销商名称"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                  <el-button type="primary" size="small">搜索</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column align="center" type="index" width="60" label="序号"></el-table-column>
          <el-table-column prop="name" align="center" label="经销商编号"></el-table-column>
          <el-table-column prop="address" align="center" label="经销商名称"></el-table-column>
          <el-table-column prop="name" align="center" label="联系人"></el-table-column>
          <el-table-column prop="address" align="center" label="联系电话"></el-table-column>
          <el-table-column prop="name" align="center" label="更新时间"></el-table-column>
          <el-table-column prop="address" align="center" label="审核配置"></el-table-column>
          <el-table-column prop="name" align="center" label="审核模式"></el-table-column>
          <el-table-column prop="address" align="center" label="账号"></el-table-column>
          <el-table-column prop="name" align="center" label="发放额度"></el-table-column>
          <el-table-column prop="address" align="center" label="发放人">
            <template slot-scope="scope">
              <div class="line-div small_top">
                <div class="small-Idiv" @click="ediotMsg(scope.row)">
                  <div class="i-div fuzhi">
                    <img src="../../../../../common/images/icon/编辑.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">编辑</span>
                </div>
                <div class="small-Idiv" @click="detail(scope.row)">
                  <div class="i-div fuzhi">
                    <img src="../../../../../common/images/icon/查看详情.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">详情</span>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="ruleForm.current_page"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="ruleForm.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="ruleForm.total_count"
          ></el-pagination>
        </div>
        <!-- <div class="btn_div">
          <el-button type="danger" size="small" @click="resert">重 置</el-button>
          <el-button type="primary" size="small" @click="submit">确 定</el-button>
        </div>-->
      </div>
    </div>
  </div>
</template>
<script>
import { getfindbytype, ediotfindbytype } from "@/api/systemsettings/index";
import { throttleTipPop } from "@/utils/throttle";
import { getRole } from "@/api/permissions/index";

export default {
  name: "SelfSetting",
  data() {
    return {
      ruleForm: {
        total_count:0,
        current_page:1,
        page_size:10
      },
      rules: {},
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      options: [
        {
          value: "0",
          label: "需要审核"
        },
        {
          value: "1",
          label: "无需审核"
        }
      ]
    };
  },
  created() {},
  methods: {
    handleSizeChange(val){
      this.ruleForm.page_size = val
    },
    handleCurrentChange(val){
      this.ruleForm.current_page = val
    },
    ediotMsg(data){
      this.$router.push({name:'linesediotdetail'})
    },
    detail(data){
      this.$router.push({name:'linesdetail'})
    },
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.form-wrapper {
  margin-top: 30px;
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
}
.margin {
  margin-top: 0 !important;
  padding-left: 0 !important;
  border: 1px solid rgba(214, 222, 239, 1);
}
.select_div {
  .top_btn {
    padding-left: 100px;
    padding-top: 20px;
    position: relative;
    .iconfont {
      color: #66b1ff;
    }
    .icfont_span {
      position: absolute;
      right: 150px;
      cursor: pointer;
    }
  }
  .checkbox_div {
    padding-left: 150px;
  }
  .select_btn {
    margin-left: 25px;
    width: 88px;
    height: 32px;
    background: rgba(76, 134, 244, 1);
    border-radius: 3px;
    text-align: center;
    line-height: 32px;
    font-size: 12px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    position: relative;
    top: 7px;
  }
  .line {
    width: 94%;
    margin: 20px 0;
    height: 1px;
    border: 1px dashed rgba(177, 213, 252, 1);
    margin-bottom: 10px;
  }
  .line_div {
    width: 94%;
    height: 10px;
    margin-top: 30px;
    background: rgba(245, 248, 252, 1);
  }
}
.el-checkbox {
  margin-top: 20px;
}
.icon-biao {
  color: #5dc349;
}
.dilog .el-checkbox {
  width: 50%;
  margin-right: 0;
  padding-left: 30px;
}
.line {
  width: 94%;
  margin: 20px 0;
  margin-bottom: 10px;
  height: 1px;
  border: 1px dashed rgba(177, 213, 252, 1);
}
.btm_divtop {
  margin-top: 20px;
  display: flex;
}
.btm_div {
  display: flex;
}
.role {
  color: #606266;
  margin-left: 20px;
}
.role1 {
  color: #606266;
  margin-left: 10px;
}
.icon-add {
  margin-left: 30px;
  color: #4c86f4;
}
.add {
  cursor: pointer;
  position: relative;
  top: 12px;
}
.icon-del {
  margin-left: 30px;
  color: #4c86f4;
}
.btn_div {
  text-align: center;
  width: 74%;
}
.line-div{
  display: flex;
  justify-content: space-evenly;
}
.i-div {
  width: 34px;
  height: 34px;
}
</style>
