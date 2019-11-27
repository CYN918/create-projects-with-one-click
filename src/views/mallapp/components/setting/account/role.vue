s<template>
  <div class="role-wrapper">
    <div class="btn-wrapper">
      <el-button type="primary" class="el-icon-plus" @click="addRole">新建角色</el-button>
    </div>
    <el-table
      :data="data">
      <el-table-column
        prop="role_name"
        label="角色名称"/>
      <el-table-column
        prop="num"
        label="包含子账号数"/>
      <el-table-column
        prop="create_time"
        label="创建时间"/>
      <el-table-column
        prop="content"
        label="权限"/>
      <el-table-column
        label="操作"
        align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="btnEditRole(scope.row)">编辑</el-button>
          <el-button type="text" size="small" @click="handleDeleteRole(scope.row)" :style="scope.row.num === 0 ? style : ''">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagenation">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.current_page"
        :page-size="pagination.page_size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="PageCount">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { roleDelete } from '@/api/mallapp/setting/account'
export default {
  name: 'MsettingAccountRole',
  props: {
    data: {
      type: Array,
      default: () => []
    },
    PageCount: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      pagination: {
        current_page: 1,
        page_size: 20
      },
      style: {
        color: '#999',
        cursor: ' not-allowed'
      }
    }
  },
  methods: {
    addRole () {
      this.$router.push({ path: '/msetting/role_dispose/create' })
    },
    handleDeleteRole (data) {
      if (data.num > 0) {
        this.$confirm('删除后，将不可撤销，请谨慎操作', '您确定删除该角色吗？', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          roleDelete(data.role_id).then(() => {
            let pagination = {}
            pagination.page = this.pagination.page_size
            pagination.size = this.pagination.current_page
            this.$emit('seizeChange', pagination)
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
      }
    },
    btnEditRole (data) {
      this.$router.push({ path: `/msetting/role_dispose/${data.role_id}` })
    },
    handleSizeChange (val) {
      let pagination = {}
      pagination.page = val
      pagination.size = this.pagination.current_page
      this.$emit('seizeChange', pagination)
    },
    handleCurrentChange (val) {
      let pagination = {}
      pagination.page = this.pagination.page_size
      pagination.size = val
      this.$emit('currentChange', pagination)
    }
  }
}
</script>

<style lang="scss" scoped>
.role-wrapper {
  .btn-wrapper {
    text-align: right;
    margin-bottom: 20px;
  }
}
</style>
