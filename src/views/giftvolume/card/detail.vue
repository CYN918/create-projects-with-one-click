<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <div class="search-wrapper1">
          <el-page-header @back="back" :content="title_txt"></el-page-header>
        </div>
      </div>
    </div>
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small" :model="form">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="6">
                  <el-form-item label="卡号：">
                    <el-input v-model="form.cardSn" placeholder="请输入卡号"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="绑定状态：">
                    <el-select v-model="form.isBind" placeholder="请选择主题类型" >
                      <el-option
                        v-for="item in options"
                        :key="item.bindId"
                        :label="item.bindName"
                        :value="item.bindId"
                      ></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="1" class="btn_right">
                  <el-button type="primary" size="small" @click='reqGiftCardListById(true)'>查询</el-button>
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
          <el-button type="primary" size="small" @click="batchOpening">批量编辑</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" border style="width: 100%" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center"></el-table-column>
        <el-table-column prop="cardSn" label="卡号" align="center" width="200"></el-table-column>
        <el-table-column prop="password" label="卡密" align="center"></el-table-column>
        <el-table-column prop="allocation" label="面值" align="center"></el-table-column>
        <el-table-column prop="currentBalance" label="余额" align="center"></el-table-column>
        <el-table-column label="绑定状态" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.isBind">已绑定</div>
            <div v-else>未绑定</div>
          </template>
        </el-table-column>
        <el-table-column label="开通状态" align="center">
          <template slot-scope="scope">
            <el-switch
              @change="switchChange(scope.row.openingState, scope.row.cardId)"
              v-model="scope.row.openingState"
              active-color="#8CC5FF">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" >
          <template slot-scope="scope">
            <div class="line-div">
              <div class="small-Idiv" @click="editGiftCard(scope.row)">
                <div class="i-div">
                  <img src="../../../common/images/icon/编辑.png" alt class="operation_img" />
                </div>
                <span>编辑</span>
              </div>
              <div class="small-Idiv" @click="deleteBrand(scope.row.cardId)">
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
          :current-page="form.pageNum"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>

    <!-- 删除 -->
    <el-dialog title="删除礼品卡" :visible.sync="centerDialogVisible" width="30%">
      <span>是否确认删除该礼品卡</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="centerDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteBrand(false)" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除 -->

    <!-- 编辑礼品卡 -->
    <el-dialog title="编辑礼品卡" :visible.sync="editCardDialogVisible" width="30%">
      <el-form :model="form1" ref="cardForm" label-width="100px" :rules="rules">
        <el-form-item label="礼品卡号:">
          <span>{{selectedCardSn}}</span>
        </el-form-item>
        <el-form-item label="密码:" prop="password" required>
          <el-input v-model="form1.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item label="状态:" prop="status" id="status">
          <el-switch
            v-model="form1.openingState"
            active-color="#8CC5FF">
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="editCardDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmEditGiftCard" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑礼品卡 -->

    <!-- 批量编辑 -->
    <el-dialog title="批量编辑" :visible.sync="editCardDialogVisible2" width="30%">
      <el-form :model="form1" ref="cardForm" label-width="100px" :rules="rules">
        <el-form-item label="状态:" prop="status">
          <el-switch
            v-model="openingState"
            active-color="#8CC5FF">
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="editCardDialogVisible2 = false" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmBatchOpening" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 批量编辑 -->

  </div>
</template>
<script>
import { modifyOpeningState, cardDelete, reqGiftCardListById, updateGiftCardListById } from "@/api/giftvolume/index";
import { throttleTipPop } from '@/utils/throttle'

export default {
  data() {
    return {
      editCardDialogVisible2: false, // 批量编辑弹窗
      openingState: false, // 肇庆
      rows: [], // 所有选择的行
      title_txt: '礼品卡列表',
      value: false, // 开通状态
      editCardDialogVisible: false, // 生成礼品卡弹窗
      selectedCardSn: '', // 选择的礼品卡号
      total: 0,
      cardId: '', // 要操作的礼品卡Id
      options: [
        {bindName:'全部' ,bindId: null},
        {bindName:'已经绑定' ,bindId: 1},
        {bindName:'未绑定' ,bindId: 0},
      ],
      tableData: [],
      centerDialogVisible: false,
      form: {
        pageNum: 1,
        pageSize: 10,
        topicId: '',
        cardSn: null,
        topicName: null,
        isBind: null
      },
      form1: { // 编辑礼品卡
        topicId: '',
        cardId: '',
        password: '',
        openingState: false,
      },
      input: "",
      rules: {
        password: [{ required: true, message: '请输入卡密', trigger: 'blur' },
          { min: 6, max: 18, message: '长度在 6 到 18个字符', trigger: 'blur' }],
      }
    };
  },
  created() {
    this.form.topicId = this.$route.query.topicId
    this.form1.topicId = this.$route.query.topicId
    this.reqGiftCardListById();
  },
  methods: {
    // 按钮切换
    async switchChange(openingState, cardId) {
      const obj = {}
      obj.cardIds = cardId
      obj.openingState = openingState
      const res = await modifyOpeningState(obj)
      if (res.code === 200) {
        throttleTipPop(this, 'success', '编辑成功')
        this.reqGiftCardListById()
      }
    },
    // 选择发生变化
    handleSelectionChange(rows) {
      this.rows = rows
    },
    batchOpening() {
      if (this.rows.length <= 0) {
        throttleTipPop(this, 'error', '请选择要编辑的礼品卡')
        return
      }
      this.editCardDialogVisible2 = true
    },
    async confirmBatchOpening() {
      const obj = {}
      let cardIds = []
      this.rows.forEach((item) => {
        cardIds.push(item.cardId)
      })
      obj.cardIds = cardIds.join(',')
      obj.openingState = this.openingState
      const res = await modifyOpeningState(obj)
      if (res.code === 200) {
        throttleTipPop(this, 'success', '编辑成功')
        this.reqGiftCardListById()
      }
      this.editCardDialogVisible2 = false
    },
    // 返回
    back() {
      this.$router.go(-1);
    },
    // 编辑礼品卡
    editGiftCard(row) {
      this.editCardDialogVisible = true
      this.selectedCardSn = row.cardSn
      this.form1.cardId = row.cardId
      this.form1.password = row.password
      this.form1.openingState = row.openingState
    },
    // 确定编辑礼品卡
    confirmEditGiftCard() {
      this.$refs.cardForm.validate(async (valid) => {
        if (valid) {
          const res = await updateGiftCardListById(this.form1)
          if (res.code === 200) {
            throttleTipPop(this, 'success', '编辑成功')
            this.reqGiftCardListById()
          }
          this.editCardDialogVisible = false
        } else {
          return false;
        }
      });
    },
    async deleteBrand(id) {
      if (id) {
        this.cardId = id;
        this.centerDialogVisible = true;
      } else {
        const data = await cardDelete(this.cardId);
        if (data.code == 200) {
          this.$message({
            message: data.message,
            type: "success"
          });
          this.reqGiftCardListById();
          this.centerDialogVisible = false;
        }
      }
    },
    // 分页查询所有主题
    async reqGiftCardListById() {
      const res = await reqGiftCardListById(this.form);
      console.log(res)
      if (res.code === 200) {
        this.tableData = res.data.list;
        this.total = res.data.total;
      }
    },
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.reqGiftCardListById();
    },
    handleCurrentChange(val) {
      this.form.pageNum = val;
      this.reqGiftCardListById();
    },
    addgifttype() {
      this.$router.push({ name: "addtheme" });
    },
    editBrand(val) {
      this.$router.push({ name: "addtheme", query: { id: val } });
    }
  },
};
</script>
<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
/deep/ #status .el-input__inner {
  height: 32px;
  line-height: 32px;
  width: 72%;
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
.search-wrapper1 {
  padding: 20px;
  border: 1px solid rgb(215, 224, 241);
  background: #fff;
  display: flex;
  align-items: center;
  .title1 {
    display: flex;
    margin-left: 20%;
  }
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
  width: 88px;
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
