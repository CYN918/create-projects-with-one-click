<template>
  <div class="margin0">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">核算项目分类总账</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="8">
                  <el-col>
                    <el-form-item label="会计期间：">
                      <el-col :span="23">
                        <el-date-picker
                          v-model="formData.accountingPeriod"
                          type="daterange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          style="width:100%"
                        ></el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="会计科目：">
                      <el-col :span="23">
                        <el-input v-model="formData.accountingTitle" placeholder="请输入科目"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="起始科目：">
                    <el-col :span="24">
                      <el-select v-model="formData.startTitle" placeholder="请选择">
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
                  <el-form-item label="结束科目：">
                    <el-col :span="24">
                      <el-select v-model="formData.endTitle" placeholder="请选择">
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
              </el-row>
              <el-row>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="科目级次：">
                      <el-col :span="8">
                        <el-select v-model="formData.endTitle" placeholder="请选择">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-col>
                      <el-col :span="1" :offset="1">-</el-col>

                      <el-col :span="8">
                        <el-select v-model="formData.endTitle" placeholder="请选择">
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
                <el-col :span="4">
                  <el-form-item label="项目类别：">
                    <el-col :span="23">
                      <el-select v-model="formData.numberDD" placeholder="请选择">
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
                <el-col :span="9">
                  <el-form-item label="项目代码：">
                    <el-col :span="11">
                      <el-select v-model="formData.unitPriceDD" placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        ></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="1">
                      <span>-</span>
                    </el-col>
                    <el-col :span="11">
                      <el-select v-model="formData.unitPriceDD" placeholder="请选择">
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
                <el-col :span="5" :offset="1">
                  <el-button type="primary" size="small">查询</el-button>
                  <el-button type="primary" size="small">重置</el-button>
                </el-col>
              </el-row>
              <el-row style="margin-left:20px">
                <el-checkbox v-model="checked1">显示辅助核算</el-checkbox>
                <el-checkbox v-model="checked2">余额为0不显示</el-checkbox>
                <el-checkbox v-model="checked3">无发生额且余额为0不显示</el-checkbox>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard1">
      <el-row class="operate mbottom">
        <h4 class="title1">核算科目:[客户]:[K0002]-中国银行分行</h4>
          <div style="float:left;">
            <el-button class="btn" type="primary" size="small" ><img class="showImg" src="@/common/images/icon/刷新财务.png" alt=""/>刷新</el-button>
            <el-button class="btn" type="primary" size="small" ><img class="showImg" src="@/common/images/icon/总账.png" alt=""/>总账</el-button>
            <el-button class="btn" type="primary" size="small" ><img class="showImg" src="@/common/images/icon/凭证.png" alt=""/>凭证</el-button>
          </div>
        <div style="float:right;">
            <el-button class="btn" size="small" ><img class="showImg1" src="@/common/images/icon/首项.png" alt=""/></el-button>
            <el-button class="btn" size="small" ><img class="showImg1" src="@/common/images/icon/上一个.png" alt=""/></el-button>
            <el-button class="btn" size="small" ><img class="showImg1" src="@/common/images/icon/下一个.png" alt=""/></el-button>
            <el-button class="btn" size="small" ><img class="showImg1" src="@/common/images/icon/末项.png" alt=""/></el-button>
            <el-button size="small"  >导出<i class="iconfont icon-lujing12"></i></el-button>
            <el-button  size="small" >打印<i class="iconfont icon-lujing12"></i></el-button>
        </div>
    
      </el-row>
      <el-table :data="tableData" border style="width: 100%"  height="500" >
         <el-table-column label="序号"  type="index" width="55" align="center"></el-table-column>
        <el-table-column prop="name" label="项目编码" align="center"></el-table-column>
        <el-table-column prop="name" label="项目名称" align="center"></el-table-column>
        <el-table-column prop="name" label="单位" align="center"></el-table-column>
        <el-table-column prop="name" label="期初余额" align="center">
            <el-table-column prop="name" label="单位" align="center"></el-table-column>
            <el-table-column prop="name" label="单位" align="center"></el-table-column> 
        </el-table-column>
        <el-table-column prop="name" label="本期借方" align="center">
            <el-table-column prop="name" label="单位" align="center"></el-table-column>
            <el-table-column prop="name" label="单位" align="center"></el-table-column>
        </el-table-column>
        <el-table-column prop="name" label="本期贷方" align="center">
            <el-table-column prop="name" label="单位" align="center"></el-table-column>
            <el-table-column prop="name" label="单位" align="center"></el-table-column>
        </el-table-column>
        <el-table-column prop="name" label="本期累计借方" align="center">
            <el-table-column prop="name" label="单位" align="center"></el-table-column>
            <el-table-column prop="name" label="单位" align="center"></el-table-column>
        </el-table-column>

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
  </div>
</template>

<script>
import { getCategory, getStoreList } from "@/api/public";

export default {
  data() {
    return {
      checked1: false,
      checked2: false,
      checked3: false,
      checked4: false,
      checked5: false,
      checked6: false,
      checked7: false,
      checked8: false,
      formData: {
        accountingPeriod: "", //会计期间
        accountingTitle: "", //会计科目
        startTitle: "", //起始科目
        endTitle: "", //科目
        numberDD: "", //数量显示小数数位
        unitPriceDD: "" //单价显示小数数位
      },
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
    handleSizeChange() {},
    handleCurrentChange() {}
  },
  components: {}
};
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
   .iconfont{
        
         margin-top: -2px;
         font-size: 12px;
     }
     .icon-lujing12{
            padding: 1px 0;
            margin-left: 8px;
            margin-top: -1px;
            display: inline-block;
     }
     .showImg{
        margin-right: 8px;
        margin-top: -2px;
        float: left;
       width: 16px;
     }
      .showImg1{
        margin-top: -2px;
        float: left;
       width: 16px;
       height: 12px;
       width:12px;
     }
     .btn{
       height:32px;

     }
     .btn1{
       position: relative;
      top: -2px;
     }
  .title1 {
    margin-left: -20px;
    margin-top: 2px;
    font-size: 16px;
    font-weight: 400;
    color: 3333;
    padding-left: 10px;
    line-height: 1.4;
    border-left: 4px solid #4c86f4;
    margin-bottom: 10px;
  }
}
</style>
