<template>
  <div class="margin" style=" width: 1455px;">
    <div class>
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="top_span">
              <span  v-for="(item,index) in activities" :key="index" :class="num==index?'parcel cheked':'parcel'" @click="parcel(index)">包裹{{index+1}}</span>
            </div>
            <div class="search-wrapper">
              <h4 class="title">包裹信息</h4>
              <div
                class="baoguo11"
              >供货方： {{ logisticsdata.supplierName}} 物流信息：{{ activities[num].shippingName}} | {{activities[num].logisticsNo || ''}}</div>
              <div class="block" style="padding-left:6px;margin-top:20px;" v-if="activities[num].logisticsInfos.length">
                <el-timeline>
                  <el-timeline-item
                    v-for="(activity, index) in activities[num].logisticsInfos"
                    :key="index"
                    :icon="activity.icon"
                    :type="activity.type"
                    :color="activity.color"
                    :size="activity.size"
                    :timestamp="activity.time"
                  >
                    <span class="green" v-if=" activities.length-1">{{activity.context}}</span>
                    <span class="greem" v-if=" index != 0">{{activity.context}}</span>
                  </el-timeline-item>
                </el-timeline>
              </div>
              <div
                class="block"
                style="padding-left:6px;margin-top:20px;"
                v-if="!activities[num].logisticsInfos.length"
              >暂无物流信息</div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getByidorder } from "@/api/order/index";

export default {
  props: ["logisticsdata"],
  data() {
    return {
      num:0,
      activities: [
        {
        shippingName:'',
        logisticsInfoList:[]
       }
      ]
    };
  },
  created(){
    this.getByidorder(this.logisticsdata.orderId);
  },
  computed: {},
  methods: {
    parcel(val){
        this.num = val
      },
    async getByidorder(val) {
      const { data } = await getByidorder(val);
      data.length ? (data[0].color = "#4A99FA") : "";
      this.activities = data.logisticsVoList || [];
    }
  },
  watch: {
    logisticsdata(val) {
      console.log(val)
      
    }
  }
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
      padding-left: 20px;
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
.baoguo11 {
  background: #f3f7fc;
  height: 35px;
  width: 100%;
  line-height: 35px;
}
.green {
  color: #4a99fa;
}
.greem {
  color: #bbcadc;
}
.mbottom {
  text-align: left;
}

.parcel {
    cursor: pointer;
    display: inline-block;
    width: 148px;
    height: 43px;
    float: left;
    text-align: center;
    line-height: 43px;
    font-size: 16px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .cheked {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(215, 225, 241, 1);
    border-bottom: none;
    position: relative;
    top: 1px;
  }
  .top_span {
  height: 43px;
}
</style>
