<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="5">
                  <el-form-item label="员工：">
                    <el-col :span="23">
                      <el-input v-model="form.price_min" placeholder="请输入员工编号或姓名">
                      </el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="状态：">
                      <el-col :span="23">
                            <el-select
                                class="el-select-width"
                                v-model="form.search_type"
                                placeholder="请选择"
                            >
                                <el-option label="按商品名称" value="1"></el-option>
                                <el-option label="按货号搜索" value="2"></el-option>
                            </el-select>
                        </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small">搜索</el-button>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="月份：">
                        <el-col :span="23">
                            <el-date-picker
                                v-model="value2"
                                type="month"
                                placeholder="选择月">
                            </el-date-picker>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="2" class="btn_right">
                  <el-button type="primary" size="small" >生成工资发放表</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard">
      <el-row class="operate mbottom">
        <el-col :span="3">
        </el-col>
      </el-row>
      <el-table :data="tableData" border @selection-change="handleSelectionChange" stripe>
        <el-table-column type="序号" align="center" prop="name" width="55"/>
        <el-table-column label="员工编号" prop="name" align="center"></el-table-column>
        <el-table-column label="员工姓名" prop="name" align="center"></el-table-column>
        <el-table-column label="基本工资" prop="name" align="center"></el-table-column>
        <el-table-column label="岗位工资" prop="name"  align="center"> </el-table-column>
        <el-table-column label="提成" prop="name" align="center"></el-table-column>
        <el-table-column label="房补" prop="name" align="center"></el-table-column>
        <el-table-column label="车补" prop="name" align="center"></el-table-column>
        <el-table-column label="通信补贴" prop="name" align="center"></el-table-column>
        <el-table-column label="全勤奖" prop="name" align="center"></el-table-column>
        <el-table-column label="保密工资" prop="name" align="center"></el-table-column>
        <el-table-column label="社保" prop="name" align="center"></el-table-column>
        <el-table-column label="公积金" prop="name" align="center"></el-table-column>
        <el-table-column label="个人所得税" prop="name" align="center"></el-table-column>
        <el-table-column label="汇总" prop="name" align="center"></el-table-column>
        <el-table-column label="状态" prop="name" align="center"></el-table-column>
        <el-table-column label="操作" align="center"  fixed="right" width="150">
          <template slot-scope="scope">
            <div class="line-div">
              <div class="small-Idiv">
                <div class="i-div ">
                    <img src="../../../common/images/icon/编辑.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;">编辑</span>
              </div>
              <div class="small-Idiv">
                <div class="i-div ">
                    <img src="../../../common/images/icon/查看详情.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;">查看</span>
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
          :current-page="pagination.current_page"
          :page-size="pagination.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total_count"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'
import { tableMix } from '@/common/js/mixinTable'
import { getGoodsList, editTurnDown } from '@/api/supplier/index'
import { addToMyStore } from '@/api/market/index'
import EditPrice from '@/components/goodsEditPrice/index'

export default {
  mixins: [tableMix],
  data () {
    return {
      value2:'',
      form: {
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
      currentAppId: 1,
      storeList: [{
        state: '1', // 状态： 1 已上线， 2 未上线
        store_id: '1001433', // 站点id
        store_name: '招商银行礼遇商城' // 站点名称
      }],
      currentStoreId: '',
      dialogVisible: false,
      pickArea: true,
      dialogInfoVisible: false,
      turndownText: '批量驳回',
      dialogTurndownVisible: false,
      remark: ''
    }
  },
  created () {
    // this._getCategory()
    // this.initForm = Object.assign({}, this.form)
    // this._getStoreList(this.currentAppId)
  },
  computed: {
    active () {
      return this.form.third_party === 0 ? 'active' : ''
    },
    toggleSearchText () {
      return this.searchMain ? '基础搜索' : '高级搜索'
    }
  },
  methods: {
    getTableData () {
      // this.tableSubmitData.form = this.form
      // this.tableSubmitData.srot = this.sortValue
      // return getGoodsList(this.tableSubmitData)
    },
    handleSortChange () {
      this._getTableData()
    },
    toggleSearch () {
      this.searchMain = !this.searchMain
    },
    handelResetCondition () {
      this.form = Object.assign({}, this.initForm)
    },
    handleSelectCategoryQuery (val) {
      this.form.cat_id = val[val.length - 1]
    },
    handleSelectionChange (data) {
      let ret = []
      data.map(item => {
        ret.push(item.sku)
      })
      this.selectGoods = ret
      console.log(this.selectGoods)
    },
    handleBatchSelect () {
      this.pickArea = true
      if (this.selectGoods.length > 0) {
        this.dialogSelectVisible = true
      } else {
        this.$message({
          message: '您还未选择商品',
          type: 'warning'
        })
      }
    },
    handleSelectClick (good) {
      this.pickArea = false
      this.dialogSelectVisible = true
      this.selectGood = good.sku
    },
    tabApp (id) {
      if (this.currentAppId === id) {
        return
      }
      this.currentAppId = id
      this.currentStoreId = ''
      this._getStoreList(id)
    },
    selectStore (id) {
      this.currentStoreId = id
    },
    btnToPricePrimary () {
      if (this.currentStoreId === '') {
        this.$message({
          message: '请选择一个站点',
          type: 'warning'
        })
      } else {
        this.dialogSelectVisible = false
        this.dialogVisible = true
      }
    },
    handleCancle () {
      this.dialogVisible = false
      this.dialogSelectVisible = true
    },
    handleAddToStore (val) {
      let data = {}
      data.store_id = this.currentStoreId
      if (this.pickArea) { // 批量选择
        // val.pick_mode === '1' 已勾选的商品 '2' 前十页商品
        if (val.pick_mode === '1') {
          data.form_edit_price = val
          data.goods_id = this.selectGoods.join(',')
          this._addToMyStore(data)
        } else {
          data.form_edit_price = val
          data.form = this.form
          this._addToMyStore(data)
        }
      } else { // 单个挑选
        data.form_edit_price = val
        data.form_edit_price.pick_mode = '1'
        data.goods_id = this.selectGood
        this._addToMyStore(data)
      }
    },
    // 批量驳回
    btnBatchTurndown () {
      if (this.selectGoods.length > 0) {
        this.turndownText = '批量驳回'
        this.dialogTurndownVisible = true
        this.selectGood = this.selectGoods.join(',')
      } else {
        this.$message({
          message: '您还未选择商品',
          type: 'warning'
        })
      }
    },
    btnTurndown (item) {
      this.turndownText = '单个驳回'
      this.dialogTurndownVisible = true
      this.selectGood = item.sku
    },
    handleTurndown () {
      let data = {}
      data.goods_id = this.selectGood
      if (!this.remark) {
        this.$message({
          type: 'warning',
          message: '请填写驳回原因，200字以内（必填）'
        })
        return
      }
      data.remark = this.remark
      this._editTurnDown(data)
    },
    _getCategory () {
      getCategory().then(res => {
        this.categoryList = res.data
      })
    },
    _getStoreList (id) {
      // let loading = this.$loading({
      //   background: 'rgba(255,255,255,0.1)',
      //   text: '加载中，请稍后...'
      // })
      // getStoreList(id).then(res => {
      //   loading.close()
      //   this.storeList = res.data
      // })
    },
    _addToMyStore (data) {
      // let loading = this.$loading({
      //   background: 'rgba(255,255,255,0.1)',
      //   text: '加载中，请稍后...'
      // })
      // addToMyStore(data).then(() => {
      //   this.dialogVisible = false
      //   loading.close()
      //   this.$message({
      //     message: '改价成功',
      //     type: 'success'
      //   })
      // })
    },
    _editTurnDown (data) {
      editTurnDown(data).then(() => {
        this.dialogTurndownVisible = false
        this.remark = ''
        this._getTableData()
      })
    }
  },
  components: {
    EditPrice
  }
}
</script>

<style lang="scss" scoped>
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
.i-div{
  cursor: pointer;
  width:32px;
  height:32px;
  border-radius:6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line-div{
    display: flex;
    justify-content: space-around;

}
</style>
