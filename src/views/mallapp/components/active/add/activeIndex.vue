<template>
  <div class="turnplate-wrapper">
    <div class="top-nav">
      <el-button class="info" type="text" size="small" @click="btnToActiveDesc">活动说明</el-button>
      <el-button class="prize" type="text" size="small" @click="btnToMyPrize">我的奖品</el-button>
    </div>
    <div class="turnplate-box" :class="currentIndex === 1 ? 'hover': ''" @click.stop="setCurrentIndex(1)">
      <div
        class="pointer"
        :style="{backgroundImage: `url(${pointerImage})`}"
        :class="currentIndex === 2 ? 'active': ''"
        @click.stop="setCurrentIndex(2)"
      >
        <span class="edit-a" v-show="currentIndex === 2" @click="setCurentEdit(true)">编辑</span>
      </div>
      <div class="boxbg" :style="{backgroundImage: `url(${radiusImage})`}"></div>
      <div class="prize-list">
        <ul class="ulOne">
          <li v-for="item in lineList" :key="item" :style="{transform: `rotate(${item}deg)`}"></li>
        </ul>
      </div>
      <div class="prize-list">
        <div
          class="prize-item"
          v-for="(item, index) in prizeList"
          :key="index"
          :style="{transform: `rotate(${item.deg}deg) translateX(-50%)`}"
        >
          <div class="prize-name">{{item.name}}</div>
          <div class="prize-pic">
            <img :src="item.image">
          </div>
        </div>
      </div>
    </div>
    <div class="free">
      <span v-if="baseSettingForm.join_num.isshow==='2'">已有{{baseSettingForm.join_num.num}}人参与, </span>
      您今天还有{{conditionForm.free_num}}次免费抽奖机会</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  props: {
    pointerImage: {
    }
  },
  data () {
    return {
      radiusImage: require('@/common/images/mall/turnplate_box.png')
    }
  },
  computed: {
    lineList () {
      let ret = []
      let deg = 90
      let init = 0
      let number = this.awardSettingForm.pan_list.length
      if (number <= 3) {
        deg = 360 / 4
        for (let i = 0; i < 4; i++) {
          ret.push(init)
          init = deg + init
        }
      } else if (number >= 4 && number <= 5) {
        deg = 360 / 6
        for (let i = 0; i < 6; i++) {
          ret.push(init)
          init = deg + init
        }
      } else if (number >= 6 && number <= 7) {
        deg = 360 / 8
        for (let i = 0; i < 8; i++) {
          ret.push(init)
          init = deg + init
        }
      }
      return ret
    },
    prizeList () {
      let ret = []
      let length = this.awardSettingForm.pan_list.length
      let thank = {
        image: this.awardSettingForm.thank_join.award_pic,
        name: this.awardSettingForm.thank_join.award_name
      }
      this.awardSettingForm.pan_list.map(item => {
        ret.push({
          name: item.prize_name,
          image: item.prize_image
        })
      })
      switch (length) {
        case 1:
          ret.splice(1, 0, Object.assign({}, thank), Object.assign({}, thank), Object.assign({}, thank))
          break
        case 2:
          ret.splice(1, 0, Object.assign({}, thank))
          ret.splice(3, 0, Object.assign({}, thank))
          break
        case 3:
          ret.splice(3, 0, Object.assign({}, thank))
          break
        case 4:
          ret.splice(2, 0, Object.assign({}, thank))
          ret.splice(5, 0, Object.assign({}, thank))
          break
        case 5:
          ret.splice(5, 0, Object.assign({}, thank))
          break
        case 6:
          ret.splice(3, 0, Object.assign({}, thank))
          ret.splice(7, 0, Object.assign({}, thank))
          break
        case 7:
          ret.splice(7, 0, Object.assign({}, thank))
          break

        default:
          break
      }
      let retLength = ret.length
      let retDeg = 360 / retLength
      let retInit = retDeg / 2
      for (let i = 0; i < retLength; i++) {
        ret[i].deg = retInit + retDeg * i
      }
      return ret
    },
    ...mapGetters(['awardSettingForm', 'baseSettingForm', 'conditionForm', 'currentIndex'])
  },
  methods: {
    btnToActiveDesc () {
      this.$emit('tabToActivDesc')
    },
    btnToMyPrize () {
      this.$emit('tabToMyPrize')
    },
    ...mapMutations({
      setCurrentIndex: 'SET_CURRENTINDEX',
      setCurentEdit: 'SET_CURRENTEDIT'
    })
  }
}
</script>

<style lang='scss' scoped>
.turnplate-wrapper {
  padding: 0 10px;
  .top-nav {
    display: flex;
    justify-content: space-between;
    .info,
    .prize {
      color: #fff;
      font-size: 14px;
    }
  }
  .turnplate-box {
    width: 310px;
    height: 310px;
    position: relative;
    border: 1px dashed hsla(0, 0%, 85%, 0);
    cursor: pointer;
    &:hover {
      border: 1px dashed rgb(217, 217, 217);
    }
    &.hover {
      border: 1px dashed rgb(217, 217, 217);
    }
    .pointer {
      width: 100px;
      height: 100px;
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      z-index: 20;
      background: top no-repeat;
      background-size: 100%;
      -moz-background-size: 100% 100%;
      cursor: pointer;
      border: 1px dashed hsla(0, 0%, 85%, 0);
      &:hover {
        border: 1px dashed rgb(217, 217, 217);
      }
      &.active {
        border: 1px dashed rgb(64, 134, 244);
      }
      .edit-a {
        font-size: 10px;
        color: #fff;
        width: 30px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        background-color: #4386f4;
        cursor: pointer;
        text-decoration: none;
        position: absolute;
        right: 0;
        top: -21px;
      }
    }
    .boxbg {
      width: 100%;
      height: 100%;
      background-position: top;
      background-repeat: no-repeat;
      background-size: 100%;
      -moz-background-size: 100% 100%;
      background-color: #fff;
      border-radius: 50%;
      overflow: hidden;
    }
    .prize-list {
      width: 87%;
      height: 87%;
      border-radius: 50%;
      margin: auto;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      ul {
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        padding: 0;
        li {
          position: absolute;
          top: 0;
          left: 50%;
          width: 0;
          height: 50%;
          transform-origin: 0 100%;
          overflow: hidden;
          box-sizing: border-box;
          border-left: 1px solid #ffd8ae;
        }
      }
      .prize-item {
        position: absolute;
        z-index: 12;
        top: 0;
        left: 50%;
        height: 50%;
        transform: translateX(-50%);
        transform-origin: 0 100%;
        display: -ms-flexbox;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        .prize-name {
          margin-top: 10px;
          font-size: 12px;
          color: #f60;
          max-width: 60px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .prize-pic {
          margin-top: 10px;
          img {
            width: 40px;
          }
        }
      }
    }
  }
  .free {
    color: #fff;
    font-size: 14px;
    position: absolute;
    bottom: 10px;
    width: 100%;
    text-align: center;
  }
}
</style>
