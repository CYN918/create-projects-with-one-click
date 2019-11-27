<template>

 <section class="bgffsd_dr">
            <section class="side-bar">
    <ul class="side-menu w100 dsf_df_rer">
      <li class="item" v-for="(sd,idx) in menuList" @click="hf(sd.path)">
        <a  :class="idx==type?'router-link-active':''">{{sd.title}}</a>
      </li>

    </ul>
    </section>
    </section>

</template>
<script>
export default {
  props: {
    type: {
      type: String
    }
  },
  data () {
    return {
      menuList: [{
        path: '/active/index',
        title: '添加活动'
      }, {
        path: '/active/turnplate_list',
        title: '大转盘'
      }, {
        path: '/active/lst',
        title: '限时优惠'
      }, {
        path: '/active/sign',
        title: '签到有礼'
      }, {
        path: '/active/dispatch_gift',
        title: '礼品派发'
      } ]
    }
  },
  components: {

  },
  methods: {

  },
  mounted () {

  }
}

</script>
<style lang="scss" scoped>
    @import '@/common/scss/variable.scss';
    @import '@/common/scss/base.scss';
    .side-bar {
        .side-menu {
            .item {
                display: flex;
                justify-content: center;
                margin: 10px 0;
                width: 110px;
                padding-left: 4px;
                padding-right: 4px;
                a {
                    width: 88%;
                    color: #3c3c3c;
                    display: flex;
                    align-items: center;
                    line-height: 28px;
                    line-height: 40px;
                    font-size: 14px;
                    &.router-link-active {
                        background: $themeColor;
                        color: #fff;
                        i {
                            color: #fff;
                        }
                    }
                    i {
                        font-size: 20px;
                        margin-right: 10px;
                        color: #555;
                    }
                }
            }
        }
    }

</style>
