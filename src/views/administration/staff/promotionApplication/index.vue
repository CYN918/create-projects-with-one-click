<template>
  <div id="promotionApplication">
    <div class="margin0">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">升职申请</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="5">
                    <el-col>
                      <el-form-item label="员工姓名：">
                        <el-col :span="22">
                          <el-input v-model="form.price_min" placeholder="请输入员工名称"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="选择部门：">
                      <el-col :span="22">
                        <el-select v-model="value" placeholder="请选择" style="width:100%">
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
                        <el-select v-model="value" placeholder="请选择" style="width:100%">
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
                    <el-button type="primary" size="small">搜索</el-button>
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
            <el-button type="primary" size="small" class="btn"  @click="addPromotionApplication">
              <img class="showImg" src="@/common/images/icon/新增凭证.png" alt/>新增
            </el-button>
            <el-button type="primary" size="small" class="btn" >
              <img class="showImg" src="@/common/images/icon/行政编辑.png" alt />编辑
            </el-button>
            <el-button type="primary" size="small" class="btn" >
              <img class="showImg" src="@/common/images/icon/行政查看.png" alt />查看
            </el-button>
            <el-button type="primary" size="small" class="btn">
              <img class="showImg" src="@/common/images/icon/财务删除.png" alt />删除
            </el-button>
            <el-button class="btn" type="primary" size="small">
              <img class="showImg" src="@/common/images/icon/刷新财务.png" alt />刷新
            </el-button>
          </el-col>
          <el-col :span="3">
            <el-button class="btn1" size="small">导入</el-button>
            <el-button class="btn1" size="small">导出</el-button>
            <el-button class="btn1" size="small">打印</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData" border @selection-change="handleSelectionChange">
          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
          <el-table-column label="申请编号" prop="name" align="center" width="120"></el-table-column>
          <el-table-column label="申请日期" prop="name" align="center" width="95"></el-table-column>
          <el-table-column label="申请人" prop="name" align="center" width="65"></el-table-column>
          <el-table-column label="部门" prop="name" align="center" width="65"></el-table-column>
          <el-table-column label="入职日期" prop="name" align="center" width="100"></el-table-column>
          <el-table-column label="转正日期" prop="name" align="center" width="100"></el-table-column>
          <el-table-column label="入职时间" prop="name" align="center" width="110"></el-table-column>
          <el-table-column label="出生年月" prop="name" align="center" width="110"></el-table-column>
          <el-table-column label="职称" prop="name" align="center" width="100"></el-table-column>
          <el-table-column label="学历" prop="name" align="center" width="50"></el-table-column>
          <el-table-column label="目前岗位" prop="name" align="center" width="100"></el-table-column>
          <el-table-column label="现任主要工作" prop="name" align="center" width="110"></el-table-column>
          <el-table-column label="现任工作时间" prop="name" align="center" width="110"></el-table-column>
          <el-table-column label="升职岗位" prop="name" align="center" width="80"></el-table-column>
          <el-table-column label="升职原因" prop="name" align="center" width="120"></el-table-column>
          <el-table-column label="升职有效日期" prop="name" align="center" width="110"></el-table-column>
          <el-table-column label="自我鉴定" prop="name" align="center" width="130"></el-table-column>
          <el-table-column label="主管意见" prop="name" align="center" width="120">
                      <template slot-scope="slot">
                          <div class="txt_left">姓名：XXX</div>
                          <div class="txt_left">职位：主管</div>
                          <div class="txt_left">审核意见：同意</div>
                      </template>
          </el-table-column>
          <el-table-column label="人事意见" prop="name" align="center" width="120">
                      <template slot-scope="slot">
                          <div class="txt_left">姓名：XXX</div>
                          <div class="txt_left">职位：人事</div>
                          <div class="txt_left">审核意见：同意</div>
                      </template>
          </el-table-column>
          <el-table-column label="总经理意见" prop="name" align="center" width="120">
                      <template slot-scope="slot">
                          <div class="txt_left">姓名：XXX</div>
                          <div class="txt_left">职位：总经理</div>
                          <div class="txt_left">审核意见：同意</div>
                      </template>
          </el-table-column>
          <el-table-column label="董事长意见" prop="name" align="center" width="120">
                    <template slot-scope="slot">
                        <div class="txt_left">姓名：XXX</div>
                        <div class="txt_left">职位：董事长</div>
                        <div class="txt_left">审核意见：同意</div>
                    </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="130">
            <template slot-scope="scope">
              <div class="line-div">
                <div class="small-Idiv">
                  <div class="i-div">
                    <img src="@/common/images/icon/行政审批.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">审批</span>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
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
    </div>
  
    <!-- 删除升职申请 -->
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
        <el-button type="primary" @click="deleteVisible = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
     <!-- 新增处罚申请 -->
    <Add
      :addVisibles="addVisibles"
      @createCloseA="createCloseA1"
      @createClosingA="createClosingA1"
      @addPromotionApplication1="addPromotionApplication2"
    ></Add>
  </div>
</template>

<script>
import { getCategory, getStoreList } from "@/api/public";
 import Add from "./add";

export default {
  components: {
      Add,
  },
  data() {
    return {
      addVisibles: false, //新增升职申请
      editVisibles: false, //修改升职申请
      detailVisibles: false, //查看升职申请
      deleteVisible: false, //删除升职申请
      form: {
        current_page: 1,
        page_size: 10,
        total_count: 0
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
    //新增升职申请窗口返回值
    createCloseA1: function(data) {
      this.addVisibles = data;
    },
    createClosingA1: function(data) {
      this.addVisibles = data;
    },
    addPromotionApplication2(data) {
      this.addVisibles = data;
    },
    //修改升职申请窗口返回值
    createCloseE1: function(data) {
      this.editVisibles = data;
    },
    createClosingE1: function(data) {
      this.editVisibles = data;
    },
    editPromotionApplication2(data) {
      this.editVisibles = data;
    },
    //查看升职申请窗口返回值
    createCloseD1: function(data) {
      this.detailVisibles = data;
    },
    createClosingD1: function(data) {
      this.detailVisibles = data;
    },
    detailPromotionApplication2(data) {
      this.detailVisibles = data;
    },
    //新增升职申请
    addPromotionApplication() {
      this.addVisibles = true;
    },
    //修改升职申请
    editPromotionApplication() {
      this.editVisibles = true;
    },
    //查看升职申请
    detailPromotionApplication() {
      this.detailVisibles = true;
    },
    //删除升职申请
    deletePromotionApplication(){
        this.deleteVisible = true;
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleSelectionChange() {}
  }
};
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
#promotionApplication {
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
