<template>
  <div class="margin">
    <div class="tabs-header">
      <ul class="clearfix">
        <li @click="tabIndex(0)" :class="currentIndex===0 ? 'active' : ''">商品发票</li>
        <li @click="tabIndex(1)" :class="currentIndex===1 ? 'active' : ''">服务发票</li>
        <li @click="tabIndex(2)" :class="currentIndex===2 ? 'active' : ''">运费发票</li>
      </ul>
    </div>
    <item-one v-if="showOne" @askInvoice="askInvoice" :type="currentIndex"></item-one>
    <item-two v-if="!showOne" :data="form" @back="showOne = true"></item-two>
  </div>
</template>

<script>
import ItemOne from './itemOne'
import ItemTwo from './itemTwo'

export default {
  name: 'FinanceInvoice',
  data () {
    return {
      currentIndex: 0,
      form: {},
      showOne: true
    }
  },
  methods: {
    tabIndex (index) {
      this.currentIndex = index
      this.showOne = true
      this.form = {}
    },
    askInvoice (val) {
      this.showOne = false
      this.form = val
      console.log(this.form)
    }
  },
  components: {
    ItemOne,
    ItemTwo
  }
}
</script>
