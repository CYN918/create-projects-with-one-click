import Vue from 'vue'
import { throttleTipPop } from '@/utils/throttle'

const vm = new Vue()

const activity = {
  state: {
    activityGoodsTypePro: [],  // 活动商品类型商品
    selectedPro: [], // 挑选出的商品
    selectedProToActivity: [], // 添加至活动里的商品
  },

  mutations: {
    // 初始化数据
    initialState(state) {
      state.activityGoodsTypePro = []
      state.selectedPro = []
      state.selectedProToActivity = []
    },
    // 记录当前的活动商品类型Id
    handleActivityGoodsTypePro(state, id) {
      let arr = []
      if (id !== '') {
        arr = state.selectedPro.filter((item) => {
          return item.activityGoodsTypeId === id
        })
        state.activityGoodsTypePro = arr
      } else {
        state.activityGoodsTypePro = state.selectedPro
      }
    },
    // 添加至活动里的商品
    handleSelectedProToActivity(state, data){
      state.selectedProToActivity = state.selectedProToActivity.concat(data)
    },
    // 添加新的商品
    handleSelectedPro(state, data){
      state.selectedPro = state.selectedPro.concat(data)
    },
    // 删除商品
    deleteProFromSelected(state, data) {
      state.selectedPro = state.selectedPro.filter((item) => {
        return item.goodsId !== data.goodsId
      })
      state.activityGoodsTypePro = state.activityGoodsTypePro.filter((item) => {
        return item.goodsId !== data.goodsId
      })
    },
  },

  actions: {
    // 获取挑选的商品，并加入必要的监听信息
    getSelectedPro ({ commit, state }, products) {
      const noRepeatProduct = products.filter((item) => {
        let flag = true
        for(let i = 0; i < state.selectedPro.length; i++) {
          if(state.selectedPro[i] && item.goodsId === state.selectedPro[i].goodsId) {
            flag = false
            break;
          }
        }
        return flag
      })
      noRepeatProduct.forEach((item) => {
        item.skuInfo.forEach((i) => {
          const obj = {
            activityGoodsNumber: '', // 库存
            fyuanaiActivityPrice: '', // 福原爱活动价
            distributorActivityPrice: '', // 经销商结算价
            supplierActivityPrice: '', // 供应商活动价
            platformActivityPrice: '', // 平台活动价
          }
          i.userSerInfo = obj
        })
      })
      commit('handleSelectedPro', noRepeatProduct)
      if(noRepeatProduct.length > 0) {
        commit('handleActivityGoodsTypePro', noRepeatProduct[0].activityGoodsTypeId)
      } else {
        throttleTipPop(vm, 'error', '该商品已被选择')
      }
    },
  }
}

export default activity