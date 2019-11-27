<template>
  <div>
    <div class="mcard mbottom">
      <div class="title">搜索条件</div>
      <el-form :model="form" ref="form" :inline="true" size="small">
        <el-form-item>
          <el-select v-model="form.store_type">
            <el-option label="站点类型" value></el-option>
            <el-option
              v-for="item in application"
              :label="item.name"
              :value="item.id"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="form.status">
            <el-option label="全部状态" value></el-option>
            <el-option label="已上线" value="1"></el-option>
            <el-option label="未上线" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.keyword" placeholder="请输入关键字"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="mcard mbottom">
      <div
        class="tip"
      >说明：博士鹰积分的短信发送包含：1、通过“分发积分”插件给用户分发积分时的短信通知；2、商城用户注册获取验证码；3、商城用户忘记密码获取验证码。您可设置每个站点使用不同短信签名进行发送短信</div>
      <el-table :data="list" stripe>
        <el-table-column label="站点名称" prop="name" align="center"></el-table-column>
        <el-table-column label="创建时间" prop="create_time" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template
            slot-scope="scope"
          >{{scope.row.status === '1' ? '已上线' : scope.row.status === '2' ?'未上线' : '-'}}</template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="btnSelect(scope.row)">修改签名</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.current_page"
        :page-size="pagination.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pagination.total_count"
      ></el-pagination>
    </div>
    <el-dialog title="签名配置" :visible.sync="dialogVisible" width="700px">
      <el-alert title="您可从已申请通过的短信签名中，选择一个作为短信发送的签名" type="success" :closable="false"></el-alert>
      <div class="select-wrapper">
        <el-select v-model="editSignId" class="select">
          <el-option v-for="item in messageSignList" :label="item.sign_name" :value="item.sign_id" :key="item.sign_id"></el-option>
        </el-select>
        <div class="other">还没有个性短信签名？ <el-button type="text" @click="routerToAdd">立即申请</el-button></div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editItem" :loading="loading">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { application } from '@/api/config'
import { getMessageStoreList, getMessageSignList, editMessageSign } from '@/api/finance/message'

export default {
  name: 'MessageStore',
  data () {
    return {
      application,
      form: {
        store_type: '', // 站点类型
        status: '', // 状态: "" 全部状态， 1.已上线， 2.未上线
        keyword: '' // 关键字
      },
      list: [
        // {
        //   name: '', // 站点名称
        //   create_time: '', // 创建时间
        //   sign_name: '', // 签名配置
        //   sign_id: '', // 签名id
        //   status: '', // 全部状态， 1.已上线， 2.未上线
        //   store_id: '' // 站点id
        // }
      ],
      pagination: {
        current_page: 1,
        page_size: 20,
        total_count: 0
      },
      dialogVisible: false,
      messageSignList: [],
      editSignId: '',
      editStoreId: '',
      loading: false
    }
  },
  created () {
    // this._getMessageStoreList()
    // this._getMessageSignList()
  },
  methods: {
    submitForm () {
      this._getMessageStoreList()
    },
    handleSizeChange (val) {
      this.pagination.page_size = val
      this._getMessageStoreList()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this._getMessageStoreList()
    },
    btnSelect (item) {
      this.dialogVisible = true
      this.editStoreId = item.storeId
      this.editSignId = item.sign_id
    },
    editItem () {
      let data = {}
      data.store_id = this.editStoreId
      data.sign_id = this.editSignId
      this.loading = true
      editMessageSign(data).then(() => {
        this.dialogVisible = false
        this.loading = false
        this._getMessageStoreList()
      })
    },
    routerToAdd () {
      this.$router.push({ path: '/finance/message/add' })
    },
    _getMessageStoreList () {
      let data = {}
      data.current_page = this.pagination.current_page
      data.page_size = this.pagination.page_size
      data.form = this.form

      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getMessageStoreList(data).then(res => {
        loading.close()
        this.list = res.data.list
        this.pagination.total_count = res.data.total_count
      })
    },
    _getMessageSignList () {
      let loading = this.$loading({
        background: 'rgba(255,255,255,0.1)',
        text: '加载中，请稍后...'
      })
      getMessageSignList().then(res => {
        loading.close()
        this.messageSignList = res.data.list
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.tip {
  margin-bottom: 20px;
  font-size: 14px;
}
.select-wrapper {
  margin: 20px;
  text-align: center;
  .select {
    width:500px;
  }
}
</style>
