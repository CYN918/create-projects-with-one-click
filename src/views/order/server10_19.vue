<template>
  <div class="margin">
    <div class="mcard">
      <div class="title">服务订单</div>
      <el-form :model="form" ref="form" :inline="true" size="small">
        <el-form-item label="下单时间：" prop="start_create_time">
          <el-date-picker
            class="width16"
            type="date"
            placeholder="时间开始"
            v-model="form.start_create_time"
          ></el-date-picker>
        </el-form-item>
        <span class="line">-</span>
        <el-form-item prop="end_create_time">
          <el-date-picker
            class="width16"
            type="date"
            placeholder="时间结束"
            v-model="form.end_create_time"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="关键字：" prop="sel_type">
          <el-select class="width16" v-model="form.sel_type" placeholder="搜索类型">
            <el-option label="根据订单编号" value="1"></el-option>
            <el-option label="根据会员编号" value="2"></el-option>
            <el-option label="根据内容" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="width16" prop="keyword">
          <el-input v-model="form.keyword" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('form')" size="small">搜 索</el-button>
          <el-button @click="orderTable" type="primary" plain size="small">订单导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mcard">
      <el-table :data="serverList" stripe border stripe>
        <el-table-column prop="id" label="订单号"/>）
        <el-table-column prop="content" label="服务内容"/>
        <el-table-column prop="price" label="价格（元）" align="center"/>
        <el-table-column prop="create_time" label="创建时间" align="center"/>
        <el-table-column prop="pay_time" label="支付/开通时间" align="center"/>
        <el-table-column prop="status" label="状态" align="center"/>
        <el-table-column label="操作" align="center" width="100px">-</el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pagination.current_page"
          :page-size="pagination.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pagination.total_count"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
    import {getOrderSesrverList} from '@/api/order/index'

    export default {
  name: 'OrderServer',
  data () {
    return {
      form: {
        start_create_time: '', // 时间开始
        end_create_time: '', // 时间结束
        sel_type: '1', // 请选择搜索类型：1 根据订单编号， 2 根据会员编号 3 根据内容
        keyword: '' // 请输入关键字
      },
      serverList: [],
      pagination: {
        current_page: 1,
        page_size: 10,
        total_count: 0
      }
    }
  },
  created () {
    // this._getOrderSesrverList()
  },
  methods: {
    submitForm (formName) {
      this._getOrderSesrverList()
    },
    orderTable () {
      console.log('订单导出')
    },
    handleSizeChange (val) {
      this.pagination.page_size = val
      this._getOrderSesrverList()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this._getOrderSesrverList()
    },
    _getOrderSesrverList () {
      let data = {}
      data.current_page = this.pagination.current_page
      data.page_size = this.pagination.page_size
      data.form = this.form
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getOrderSesrverList(data).then(res => {
        loading.close()
        this.serverList = res.data.list
        this.pagination.total_count = res.data.total_count
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.width16 {
  width: 160px;
}

.line {
  margin-right: 10px;
  line-height: 32px;
}
.mcard {
  margin-bottom: 20px;
  .pagination {
    margin: 20px 0;
    text-align: right;
  }
}
.mcard{
  border: 1px solid #d7e0f1;
}
</style>
