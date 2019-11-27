<template>
  <div class="margin">
    <div class="apply-container">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="150px" size="small">
            <div class="search-wrapper">
              <h4 class="title">搜索条件</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="8">
                    <el-col>
                      <el-form-item label="搜索：">
                        <el-col :span="23">
                          <el-input v-model="form.keywords" placeholder="请输入关键字，如公司名称/联系人/联系人电话"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="时间：">
                      <el-col :span="23">
                        <el-date-picker
                          v-model="form.createTimeBegin"
                          type="date"
                          format="yyyy-MM-dd"
                          value-format="yyyy-MM-dd HH:mm:ss"
                          placeholder="请选择时间"
                          @change="_getAgency(true)"
                        ></el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="4" class="btn_right">
                    <el-button type="primary" size="small" @click="_getAgency(true)">查询</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="topbig_div">
        <div
          v-for="(item,index) in applyMenu"
          :key="index"
          :class="currentTabIndex === index ?'top_div add_div':'top_div'"
          @click="tabVender(index,item)"
        >
          <span>
            <img :src="currentTabIndex == index ?item.bigLogo:item.logo" class="app-head-img" />
          </span>
          <span class="app-head-title">{{item.applyName}}</span>
        </div>
      </div>
      <div class="contnt">
        <intergral :applyMenu="applyMenu[num]"></intergral>
        <div class="mcard">
          <el-row>
            <el-table :data="tableData" border style="width: 100%" stripe>
              <el-table-column prop="createTime" label="合作时间" align="center"></el-table-column>
              <el-table-column prop="agencyName" label="经销商名称" align="center"></el-table-column>
              <el-table-column prop="ticketCompany" label="公司名称" align="center"></el-table-column>
              <el-table-column prop="pointsCount" label="积分项目" align="center"></el-table-column>
              <el-table-column prop="welfareCount" label="福利项目" align="center"></el-table-column>
              <el-table-column prop="purchaseCount" label="集采项目" align="center"></el-table-column>
              <el-table-column prop="settledCount" label="入驻平台" align="center"></el-table-column>
              <el-table-column prop="giftCount" label="礼册项目" align="center"></el-table-column>
              <el-table-column prop="rechargedAmount" label="已充值金额" align="center"></el-table-column>
              <el-table-column prop="usedAmount" label="已使用金额" align="center"></el-table-column>
              <el-table-column prop="agencyMoney" label="余额" align="center"></el-table-column>
              <el-table-column prop="adminName" label="管理员" width="180px" align="center"></el-table-column>
              <el-table-column prop="createrName" label="创建人" align="center"></el-table-column>
              <el-table-column label="操作" align="center" fixed="right" width="150">
                <template slot-scope="scope">
                  <div class="line-div">
                    <div class="small-Idiv" @click="detail(scope.row.agencyId,1)" v-permit="'agency:view'">
                      <div class="i-div">
                        <img src="../../../common/images/icon/查看详情.png" alt class="operation_img" />
                      </div>
                      <span style="word-break: keep-all;margin-left: 3px;">详情</span>
                    </div>
                    <div
                      class="small-Idiv"
                      @click="editor(scope.row.agencyId,1)"
                      v-show="form.auditStatus!=1"
                      v-permit="'agency:update'"
                    >
                      <div class="i-div">
                        <img src="../../../common/images/icon/编辑.png" alt class="operation_img" />
                      </div>
                      <span style="word-break: keep-all;margin-left: -4px;">编辑</span>
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
                :page-sizes="[10, 30, 50,100]"
                :page-size="form.page_size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="form.total_count"
              ></el-pagination>
            </div>
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getAgency } from "@/api/apply/index";
import { getAllapply } from "@/api/application/index";
import Intergral from "./integral";
export default {
  name: "Apply",
  data() {
    return {
      num:0,
      form: {
        current_page: 1,
        page_size: 10,
        total_count: 0,
        createTimeBegin: "",
        keywords: "",
        applyId:'',
      },
      applyMenu: [],
      tableData: [],
      currentTabIndex: 0
    };
  },
  mounted() {
    this._getAllapply();
    this._getAgency();
  },
  methods: {
    detail(id, state) {
      this.$router.push({
        name: "Dealerdetail1",
        query: { id: id, state: state }
      });
    },
    project() {
      this.$router.push({ name: "Mallapp" });
    },
    editor(id, state) {
      this.$router.push({
        name: "dealereditor",
        query: { id: id, state: state }
      });
    },
    _getAgency(data,id) {
      if (data) {
        this.form.current_page = 1;
      }
      getAgency(this.form,id).then(res => {
        this.form.total_count = res.data.total;
        this.tableData = res.data.list;
      });
    },
    tabVender(val,item) {
      this.num = val
      this.currentTabIndex = val;
      this.form.applyId = item.applyId
    },
    handleSizeChange(val) {
      this.form.page_size = val;
      this._getAgency();
    },
    handleCurrentChange(val) {
      this.form.current_page = val;
      this._getAgency();
    },
    //查询
    _getAllapply() {
      let params = {
      	'status':'0'
      }
      getAllapply(params).then(res => {
        this.applyMenu = res.data.list;

        this._getAgency('',res.data.list[0].applyId)
      });
    }
  },
  components: {
    Intergral
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.apply-container {
  .app-head {
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    overflow: hidden;
    flex-flow: row;
    .app-head-item {
      width: 22%;
      height: 100px;
      background: #f7faff;
      display: flex;
      align-items: center;
      justify-content: space-around;
      cursor: pointer;
      border-radius: 3px;
      padding: 0 30px;
      font-weight: bold;
      &.head-active {
        height: 150px;
        background: #fff;
        width: 25%;
        .app-head-title {
          font-size: 24px;
        }
      }
      .app-head-title {
        font-size: 16px;
        color: #333;
      }
    }
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
    max-width: 130px;
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

.small-bottom {
  display: flex;
  justify-content: flex-start;
  margin-left: 14px;
  margin-top: 10px;
}
.topbig_div {
  display: flex;
  .top_div {
    cursor: pointer;
    margin-top: 30px;
    width: 18%;
    height: 80px;
    background: rgba(255, 255, 255, 1);
    border-radius: 3px 5px 5px 5px;
    margin-right: 20px;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-evenly;
    span {
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
}
.add_div {
  width: 19% !important;
  height: 120px !important;
  top: -18px;
  border: 1px solid #d6deef;
  border-bottom: none;
  z-index: 10;
  border-bottom-right-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
  span {
    font-size: 20px !important;
    font-family: Microsoft YaHei;
    font-weight: bold !important;
    color: rgba(51, 51, 51, 1) !important;
  }
}
.contnt {
  background: white;
  border: 1px solid #d6deef;
  position: relative;
  top: -19px;
}
.app-head-img{
  width: 90px;
  height: 90px;
}
</style>
