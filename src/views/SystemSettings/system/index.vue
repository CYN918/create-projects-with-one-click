<template>
  <div>
      <div class="top_div">
        <span v-for="(value, key) in data" :key="key" :class="currentMenu == key?'select_span':''"  @click="changeselect(key)">{{key}}</span>
      </div>
      <div>
          <keep-alive>
              <component :is="data[currentMenu]"></component>
          </keep-alive>
      </div>
  </div>
</template>

<script>
    import auditconfiguration from './auditconfiguration/index' // 审核配置
    import message from './message/index' // 消息配置
    import goods from './goods/index' // 商品配置
    import order from './order/index' // 订单配置
    import pay from './pay/index' // 支付配置
    import interfacea from './interfacea/index' // 界面配置
    import system from './system/index' // 系统配置
    import router from './router/index' // 路由配置
    import orderforbit from './orderforbit/index' // 路由配置

    export default {
    data(){
        return {
            data:{
                '审核配置':auditconfiguration,
                '消息配置':message,
                '商品配置':goods,
                '订单配置':order,
                '支付配置':pay,
                '界面配置':interfacea,
                '系统配置':system,
                '路由配置':router,
                '集采配置':orderforbit,
            }
        }
    },
    methods:{
        changeselect(val) {
            this.$router.push({
                path: "/SystemSettings/system",
                query: { menu: val }
            })
        }
    },
    computed:{
        currentMenu() {
            const query = this.$route.query || {};
            return query.menu || "审核配置";
        }
    },
    created(){
        this.$route.params.type?this.type=this.$route.params.type:''
    },
    components:{
        auditconfiguration,
        message,
        goods,
        order,
        pay,
        interfacea,
        system,
        router,
        orderforbit
    }
}
</script>

<style lang="scss" scoped>
.top_div{
    margin:20px;
    margin-bottom: 0;
    margin-top: 30px;
    span{
        display:inline-block;
        text-align: center;
        line-height: 41px;
        width:143px;
        height: 41px;
        cursor: pointer;
    }
    .select_span{
        background:rgba(255,255,255,1);
        border:1px solid rgba(214,222,239,1);
        position: relative;
        border-bottom: 0;
        top: 2px;
        z-index: 10;
    }
}
</style>
