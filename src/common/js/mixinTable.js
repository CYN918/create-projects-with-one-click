export const tableMix = {
  data () {
    return {
      pagination: {
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
      tableData: [],
      tableSubmitData: {}
    }
  },
  created () {
    // this._getTableData()
  },
  methods: {
    handleSizeChange (val) {
      this.pagination.page_size = val
      this._getTableData()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this._getTableData()
    },
    submitForm () {
      this._getTableData()
    },
    _getTableData () {
      // let loading = this.$loading({
      //   background: 'rgba(255,255,255,0.1)',
      //   text: '加载中，请稍后...'
      // })
      this.tableSubmitData.current_page = this.pagination.current_page
      this.tableSubmitData.page_size = this.pagination.page_size
      this.getTableData().then(res => {
        // loading.close()
        this.tableData = res.data.list
        this.pagination.total_count = res.data.total_count
      })
    }
  }
}
