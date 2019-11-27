<template>
  <div>
    <div class="top_div">
      <span
        v-for="(value, key) in data"
        :class="currentMenu == key ? 'select_span' : ''"
        :key="key"
        @click="changeselect(key)"
      >{{ key }}</span>
    </div>
    <div>
      <keep-alive>
        <component :is="data[currentMenu]" />
      </keep-alive>
    </div>
  </div>
</template>

<script>
import Initialize from "./Initialize/index"; // 数据库配置
import synchronization from "./synchronization/index"; // 数据同步配置
import configuration from "./configuration/index"; // 数据同步配置
import tablefield from "./tablefield/index"; // 表字段配置
import synchronous from "./synchronous/index"; // 表同步配置
import tabledata from "./tabledata/index"; // 表数据配置
import auditconfiguration from "./auditconfiguration/index"; // 审核配置
import system from "./system/index"; // 系统配置
import order from './order/index'  // 订单配置
import message from './message/index'  // 消息配置
import interfacea from './interfacea/index'  // 界面配置
import goods from './goods/index'  // 商品配置
export default {
  data() {
    return {
      data: {
        "数据库配置": Initialize,
        "数据同步配置": synchronization,
        "菜单配置": configuration,
        "表字段配置": tablefield,
        "表同步配置": synchronous,
        "表数据配置": tabledata,
        "审核配置": auditconfiguration,
        "系统配置": system,
        '消息配置':message,
        '商品配置':goods,
        '订单配置':order,
        '界面配置':interfacea,
      }
    };
  },
  computed: {
    currentMenu() {
      const query = this.$route.query || {};
      return query.menu || "数据库配置";
    }
  },
  methods: {
    changeselect(val) {
      this.$router.push({
        path: "/SystemSettings/project",
        query: { menu: val }
      })
    }
  },
  components: {
    Initialize,
    synchronization,
    configuration,
    tablefield,
    tabledata,
    auditconfiguration,
    synchronous
  }
};
</script>

<style lang="scss" scoped>
.top_div {
  margin: 20px;
  margin-bottom: 0;
  margin-top: 30px;
  span {
    display: inline-block;
    text-align: center;
    line-height: 41px;
    width: 143px;
    height: 41px;
    cursor: pointer;
  }
  .select_span {
    background: rgba(255, 255, 255, 1);
    border: 1px solid rgba(214, 222, 239, 1);
    position: relative;
    border-bottom: 0;
    top: 2px;
    z-index: 10;
  }
}
</style>
