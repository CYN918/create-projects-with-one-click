<template>
  <div class="role-dispose-wrapper margin">
    <el-form :model="form" :rules="rules" ref="dispose" label-width="100px">
      <div class="mcard">
        <div class="title">名称设置</div>
        <div class="name">
          <el-form-item label="角色名称：" prop="apellation">
            <el-input class="width32" v-model="form.apellation" placeholder="4-20个字符，支持汉字、字母、数字等组合"></el-input>
          </el-form-item>
        </div>
      </div>
      <div class="mcard">
        <div class="title">权限设置</div>
        <div class="tip">默认子账号没有挑选商品权限，且全站点会员价对子账号不可见</div>
        <el-tree
          :data="data2"
          show-checkbox
          node-key="id"
          :default-expanded-keys="[1, 2, 3]"
          :default-checked-keys="[5, 30]"
          :props="defaultProps">
        </el-tree>
        <el-form-item class="btn">
          <el-button type="primary">保 存</el-button>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'RoleDispose',
  data () {
    return {
      roleId: '',
      form: {
        apellation: ''
      },
      rules: {
        apellation: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 4, max: 20, message: '4-20个字符，支持汉字、字母、数字等组合', trigger: 'blur' }
        ]
      },
      data2: [{
        id: 1,
        label: '界面',
        children: [{
          id: 10,
          label: '首页编辑微页面'
        }, {
          id: 11,
          label: '微页面'
        }]
      }, {
        id: 2,
        label: '商品',
        children: [{
          id: 20,
          label: '我的商品'
        }, {
          id: 21,
          label: '上下架商品'
        }]
      }, {
        id: 3,
        label: '插件',
        children: [{
          id: 30,
          label: '积分券'
        }, {
          id: 31,
          label: '发放积分'
        }]
      }, {
        id: 4,
        label: '订单',
        children: [{
          id: 40,
          label: '订单列表'
        }, {
          id: 41,
          label: '订单详情'
        }]
      }, {
        id: 5,
        label: '用户',
        children: [{
          id: 50,
          label: '用户列表'
        }, {
          id: 51,
          label: '用户详情'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created () {
    this.roleId = this.$route.params.id
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'RoleDispose') {
        this.roleId = to.params.id
        console.log(this.roleId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.mcard {
  margin-bottom: 20px;
  .name {
    margin-left: 100px;
  }
  .width32 {
    width: 320px;
  }
  .tip {
    padding: 16px;
    margin-bottom: 20px;
    font-size: 12px;
    background: #DDE9F7;
  }
  .btn {
    margin: 20px;
    text-align: center;
  }
}
</style>
