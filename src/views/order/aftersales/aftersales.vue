<template>
  <div class="margin allorder">
    <div class="divspan">
      <span
        v-for="(value, key) in data"
        :class="currentMenu == key ? 'color_span div_span' : 'div_span'"
        :key="key"
        @click="changeselect(key)"
      >{{ key }}{{key==='异常订单'?'('+total+')':""}}</span>
    </div>
      <component :is="data[currentMenu]" ref="child"/>
  </div>
</template>

<script>
import { aftersalepageb } from "@/api/order/index";
import axios from "axios";
import allsales from './allsales'
import processed from './processed'
import processing from './processing'
import dealwith from './dealwith'
import completed from './completed'
import concel from './concel'
import complaint from './complaint'
import abnormal from './abnormal'

export default {
  data() {
    return {
      abc:'222',
      data: {
        "所有售后": allsales,
        "待处理": processed,
        "处理中": processing,
        "已处理": dealwith,
        "已完成": completed,
        "已取消": concel,
        "异常订单": abnormal,
        "升级客诉": complaint,
      },
      stata:0,
      total:0,
      form: {
      }
    };
  },
  computed:{
    currentMenu() {
      const query = this.$route.query || {};
      return query.orderNmae || "所有售后";
    },
  },
  created() {
    this.aftersalepageb();
  },
  methods: {
    async aftersalepageb(val) {
      if (val) {
        this.form.pageIndex = 1;
      }
      let obj = {
        pageIndex: 1,
        pageSize: 0,
        requestStatus: 5,
      };
      const { data } = await aftersalepageb(obj)
      this.total = data.count;
    },
    _getAllorder() {
      // console.log(this.$refs.child)
      this.$refs.child.aftersalepageb()
    },
    changeselect(val) {
      this.$router.push({
        path: "/order/aftersales",
        query: { orderNmae: val }
      })
    }
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.othertable {
  .el-table--scrollable-x .el-table__body-wrapper {
    overflow-x: hidden;
  }
}
.goods-fitter {
  .vender {
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
    width: 100%;
    // max-width: 240px;
    // margin-right: 5px;
  }
  .el-date-picker {
    max-width: 240px;
    margin-right: 5px;
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
.i-div {
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 6px;
}
.div_span{
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  width:108px;
  height:46px;
  font-size:14px;
  font-family:Microsoft YaHei;
  font-weight:400;
  color:rgba(51,51,51,1);
  cursor: pointer;
}
.color_span{
  background:rgba(255,255,255,1);
  border:1px solid rgba(215,225,241,1);
  position: relative;
  top: 1px;
  border-bottom: none;
}
.divspan{
  display: flex;
}
</style>
