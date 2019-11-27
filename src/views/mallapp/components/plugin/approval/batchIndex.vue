<template>
  <div class="margin">
    <div class="tabs-header">
      <ul class="clearfix">
        <li @click="tabIndex(0)" :class="active(0)">批量导入</li>
        <li @click="tabIndex(1)" :class="active(1)">操作日志</li>
      </ul>
    </div>
    <batch-import v-if="currentIndex === 0"></batch-import>
    <log-list v-if="currentIndex === 1"></log-list>

  </div>
</template>

<script>
import BatchImport from './batchImport'
import LogList from './batchLog'

export default {
  name: 'ApprovalBatch',
  data () {
    return {
      currentIndex: 0
    }
  },
  methods: {
    tabIndex (index) {
      this.currentIndex = index
    },
    active (index) {
      return this.currentIndex === index ? 'active' : ''
    }
  },
  components: {
    BatchImport,
    LogList
  }
}
</script>
