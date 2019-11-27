<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small" :model="form">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="主题名称：">
                    <el-input v-model="form.topicName" placeholder="请输入主题名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="1" class="btn_right">
                  <el-button type="primary" size="small" @click='reqCardList(true)'>查询</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard">
      <el-row class="operate mbottom">
        <el-col :span="21" class="detail">
          <el-button type="primary" size="small" @click="addgifttype">新增</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" border style="width: 100%" stripe>
        <el-table-column type="index" label="序号" align="center" width="200"></el-table-column>
        <el-table-column prop="topicName" label="主题名称" align="center"></el-table-column>
        <el-table-column prop="typeName" label="主题类型" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.topicType === 1">礼品册</span>
            <span v-if="scope.row.topicType === 2">礼品卡</span>
            <span v-if="scope.row.topicType === 3">礼包</span>
            <span v-if="scope.row.topicType === 4">活动</span>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="开始时间" align="center"></el-table-column>
        <el-table-column prop="endTime" label="结束时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center" fixed="right" >
          <template slot-scope="scope">
            <div class="line-div">
              <div class="small-Idiv" @click="editBrand(scope.row.topicId)">
                <div class="i-div">
                  <img src="../../../common/images/icon/编辑.png" alt class="operation_img" />
                </div>
                <span>编辑</span>
              </div>
              <div class="small-Idiv" @click="createNewCard(scope.row)">
                <div class="i-div huishouzhan">
                  <img src="../../../common/images/icon/生成单.png" alt class="operation_img" />
                </div>
                <span>生成</span>
              </div>
              <div class="small-Idiv" @click="checkDetail(scope.row.topicId)">
                <div class="i-div huishouzhan">
                  <img src="../../../common/images/icon/查看详情.png" alt class="operation_img" />
                </div>
                <span>查看</span>
              </div>
              <div class="small-Idiv" @click="exportExcel(scope.row.topicId)">
                <div class="i-div huishouzhan">
                  <img src="@/common/images/icon/导出.png" alt class="operation_img" />
                </div>
                <span>导出</span>
              </div>
              <div class="small-Idiv" @click="deleteBrand(scope.row.topicId)">
                <div class="i-div huishouzhan">
                  <img src="../../../common/images/icon/回收站.png" alt class="operation_img" />
                </div>
                <span>移除</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="form.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>

    <!-- 删除 -->
    <el-dialog title="删除主题" :visible.sync="centerDialogVisible" width="30%">
      <span>是否确认删除该主题</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="centerDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteBrand(false)" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除 -->

    <!-- 生成礼品卡 -->
    <el-dialog title="生成礼品卡" :visible.sync="createCardDialogVisible" width="30%">
      <el-form :model="form1" ref="cardForm" label-width="100px" :rules="rules">
        <el-form-item label="主题名称:">
          <span>{{selectedTopicName}}</span>
        </el-form-item>
        <el-form-item label="生成数量:" prop="quantity" required>
          <el-input type="number" min="0" v-model="form1.quantity" placeholder="请输入生成数量"></el-input>
        </el-form-item>
        <el-form-item label="卡内资金:" prop="allocation" required>
          <el-input type="number" min="0" v-model="form1.allocation" placeholder="请输入卡内资金"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="createCardDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmCreateNewCard" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 生成礼品卡 -->

  </div>
</template>
<script>
import { throttleTipPop } from '@/utils/throttle'
import { reqCardList, topicdelete, createGiftCards } from "@/api/giftvolume/index";

export default {
  data() {
    const checkQuantity = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('生成数量不能为空'));
      }
      setTimeout(() => {
        if (value < 0) {
          callback(new Error('生成数量不能少于1'));
        } else {
          callback();
        }
      }, 100);
    };
    const checkAllocation = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('卡内资金不能为空'));
      }
      setTimeout(() => {
        if (value < 0) {
          callback(new Error('卡内资金不能为负数'));
        } else {
          callback();
        }
      }, 100);
    };
    return {
      createCardDialogVisible: false, // 生成礼品卡弹窗
      selectedTopicName: '', // 选择的主题名称
      total: 0,
      topicId: null,
      options: [
        {typeName:'全部' ,topicType: null},
        {typeName:'礼品册' ,topicType: 1},
        {typeName:'礼品卡' ,topicType: 2},
        {typeName:'礼包' ,topicType: 3},
        {typeName:'活动' ,topicType: 4},
      ],
      tableData: [],
      centerDialogVisible: false,
      form: {
        currentPage: 1,
        size: 10,
        topicType: null,
        topicName: null,
      },
      form1: { // 生成礼品卡数量
        topicId: '',
        quantity: '',
        allocation: '',
      },
      input: "",
      rules: {
        quantity: [{ validator: checkQuantity, trigger: "blur" },],
        allocation: [{ validator: checkAllocation, trigger: "blur" },],
      }
    };
  },
  created() {
    this.reqCardList();
  },
  methods: {
    // 导出Excel
    exportExcel(topicId) {
      const baseURL = process.env.VUE_APP_SERVICE_URL
      const url = baseURL + '/api/open/b/b2b2c/giftservice/card/export_by_topic_id.json?topicId=' + topicId
      window.open(url)
    },
    // 查看详情
    checkDetail(topicId) {
      this.$router.push({
        name: 'gv_detailcard',
        query: {
          topicId,
        }
      })
    },
    // 生成礼品卡弹窗
    createNewCard(row) {
      this.form1.topicId = row.topicId
      this.selectedTopicName = row.topicName
      this.createCardDialogVisible = true
    },
    // 确定生成礼品卡弹窗
    confirmCreateNewCard() {
      this.$refs.cardForm.validate(async (valid) => {
        if (valid) {
          const res = await createGiftCards(this.form1)
          if (res.code === 200) {
            throttleTipPop(this, 'success', '操作成功')
          }
        } else {
          return false;
        }
        this.createCardDialogVisible = false
      });
    },
    async createGiftCards() {
      const res = await createGiftCards()
      console.log(res)
    },
    async deleteBrand(id) {
      if (id) {
        this.topicId = id;
        this.centerDialogVisible = true;
      } else {
        const data = await topicdelete(this.topicId);
        if (data.code == 200) {
          this.$message({
            message: data.message,
            type: "success"
          });
          this.reqCardList();
          this.centerDialogVisible = false;
        }
      }
    },
    // 分页查询所有主题
    async reqCardList() {
      const res = await reqCardList(this.form);
      if (res.code === 200) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      }
    },
    handleSizeChange(val) {
      this.form.size = val;
      this.reqCardList();
    },
    handleCurrentChange(val) {
      this.form.currentPage = val;
      this.reqCardList();
    },
    addgifttype() {
      this.$router.push({ name: "gv_addcard" });
    },
    editBrand(val) {
      this.$router.push({ name: "gv_addcard", query: { id: val } });
    }
  },
};
</script>
<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
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
      color: #333;
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
  display: inline-block;
  text-align: left;
  width: 132px;
  .small-Idiv {
    display: inline-block;
    text-align: center;
    margin: 6px;
  }
}
.fuzhi {
  background: rgba(229, 162, 75, 1);
}
.huishouzhan {
  background: rgba(247, 108, 110, 1);
}
.imgsize {
  width: 100px;
  height: 100px;
}
.mcard {
    border: 1px solid #d7e0f1;
}
</style>
