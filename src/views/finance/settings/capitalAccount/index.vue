<template>
  <div id="capitalAccount">
    <div class="margin0">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">资金账户</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="5">
                    <el-form-item label="代码：">
                      <el-select v-model="form.accNo" placeholder="请输入代码">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="账户名称：">
                      <el-select v-model="form.accountNickName" placeholder="请输入账户名称">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="公司名称：">
                      <el-select v-model="form.accountCompName" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="创建人：">
                      <el-select v-model="form.updateUserName" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3" :offset="1">
                    <el-button type="primary" size="small">查询</el-button>
                    <el-button type="primary" size="small">重置</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mcard1">
        <el-row class="operate mbottom">
          <el-col :span="20">
            <el-button class="btn" type="primary" size="small">
              <img class="showImg" src="@/common/images/icon/刷新财务.png" alt />刷新
            </el-button>
            <el-button type="primary" size="small" class="btn" @click="addAcount()">
              <img class="showImg" src="@/common/images/icon/新增凭证.png" alt />新增
            </el-button>
            <el-button type="primary" size="small" class="btn" @click="editAcount()">
              <img class="showImg" src="@/common/images/icon/财务编辑.png" alt />修改
            </el-button>
            <el-button type="primary" size="small" class="btn">
              <img class="showImg" src="@/common/images/icon/财务删除.png" alt />删除
            </el-button>
            <el-button type="primary" size="small" class="btn">
              <img class="showImg" src="@/common/images/icon/财务启用.png" alt />启用
            </el-button>
            <el-button type="primary" size="small" class="btn">
              <img class="showImg" src="@/common/images/icon/财务停用.png" alt />停用
            </el-button>
            <el-button type="primary" size="small" class="btn">
              <img class="showImg" src="@/common/images/icon/财务批改.png" alt />批改
            </el-button>
          </el-col>
          <el-col :span="4">
            <el-button class="btn1" size="small">导入</el-button>
            <el-button class="btn1" size="small">
              导出
              <i class="iconfont icon-lujing12"></i>
            </el-button>
            <el-button class="btn1" size="small">
              打印
              <i class="iconfont icon-lujing12"></i>
            </el-button>
          </el-col>
        </el-row>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          height="500"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="40"></el-table-column>
          <el-table-column width="55" type="index" label="序号" align="center"></el-table-column>
          <el-table-column prop="name" label="公司名称" align="center" width="122"></el-table-column>
          <el-table-column prop="name" label="开户行" align="center" width="220"></el-table-column>
          <el-table-column prop="name" label="资金账号" align="center" width="121"></el-table-column>
          <el-table-column prop="name" label="开户行地址" align="center" width="240"></el-table-column>
          <el-table-column prop="name" label="银行接口类型" align="center"></el-table-column>
          <el-table-column prop="name" label="存款类型" align="center"></el-table-column>
          <el-table-column prop="name" label="账户类型" align="center"></el-table-column>
          <el-table-column prop="name" label="使用状态" align="center"></el-table-column>
          <el-table-column prop="name" label="创建时间" align="center"></el-table-column>
          <el-table-column prop="name" label="修改时间" align="center"></el-table-column>
          <el-table-column prop="name" label="修改人" align="center"></el-table-column>
        </el-table>
        <div class="pagination pg">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="form.current_page"
            :page-sizes="[10, 30, 50, 100]"
            :page-size="form.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="form.total_count"
          ></el-pagination>
        </div>
      </div>
      <Add
        :addVisibles="addVisibles"
        @createCloseA="createCloseA1"
        @createClosingA="createClosingA1"
        @addAccount1="addAccount2"
      ></Add>
      <Edit
        :editVisibles="editVisibles"
        @createCloseE="createCloseE1"
        @createClosingE="createClosingE1"
        @editAccount1="editAccount2"
      ></Edit>
    </div>
  </div>
</template>

<script>
import { getCategory, getStoreList } from "@/api/public";
import { findAccountList } from "@/api/finance/index";
import Add from "./add";
import Edit from "./edit";
export default {
  components: {
    Add,
    Edit
  },
  data() {
    return {
      addVisibles: false,
      editVisibles: false, //修改资金账户
      accountList:[],//列表分页内容
      formData: {
        accountingPeriod: "", //会计期间
        accountingTitle: "", //会计科目
        startTitle: "", //起始科目
        endTitle: "" //科目
      },
      form: {
        accNo:'',//编号/代码
        accountCompName:'',//公司名称
        accountNickName:'',//资金账户/别名
        updateUserName:'',//创建人/用户名称
        pageIndex: 1,
        pageSize: 10,
        count: 0
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
  created() {},
  computed: {},
  methods: {
    //获取资金账户
    _findAccountList(){
        findAccountList(this.form).then(res=>{
          this.accountList = res.data.pageList;
          this.form.count = res.data.count;
        })
    },
    //新增资金账户组件回值
    createCloseA1: function(data) {
      this.addVisibles = data;
    },
    createClosingA1: function(data) {
      this.addVisibles = data;
    },
    addAccount2(data) {
      this.addVisibles = data;
    },
    //修改资金账户组件回值
    createCloseE1: function(data) {
      this.editVisibles = data;
    },
    createClosingE1: function(data) {
      this.editVisibles = data;
    },
    editAccount2(data) {
      this.editVisibles = data;
    },
    //新增资金账户
    addAcount() {
      this.addVisibles = true;
    },
    //修改资金账户
    editAcount() {
      this.editVisibles = true;
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleSelectionChange() {}
  }
};
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
#capitalAccount {
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
  .small-Idiv {
    width: 32px;
    span {
      margin-top: 3px;
      font-size: 12px;
      font-family: MicrosoftYaHei;
      font-weight: 400;
      color: rgba(72, 73, 77, 1);
      word-break: keep-all;
    }
  }
  .i-div {
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: center;
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
  .mcard1 {
    padding: 20px;
    background: #fff;
    border: 1px solid #d7e0f1;
    .pg {
      margin: 20px 0;
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
    .showImg {
      margin-right: 8px;
      margin-top: -2px;
      float: left;
      width: 16px;
      height: 16px;
    }
    .showImg1 {
      margin-top: -2px;
      float: left;
      width: 16px;
      height: 12px;
      width: 12px;
    }
    .btn {
      height: 32px;
    }
    .btn1 {
      position: relative;
      top: -2px;
    }
    .title1 {
      margin-left: -20px;
      font-size: 16px;
      font-weight: 400;
      color: 3333;
      padding-left: 10px;
      line-height: 1.4;
      border-left: 4px solid #4c86f4;
      margin-bottom: 10px;
    }
  }
}
</style>
