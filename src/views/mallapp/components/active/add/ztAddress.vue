<template>
  <div>
    <el-form ref="setfourth" label-width="120px" size="small">
      <el-form-item label="自提地点" required>
        <div class="address-wrapper" v-for="(item, index) in ztAddress" :key="index">
          <div class="address-box">
            <div class="name-box">
              <span>联系人: {{item.name}}</span>
              <span>联系方式: {{item.mobile}}</span>
            </div>
            <div class="addr-info-box">
              <span>详细地址: {{item.address}}</span>
            </div>
            <div class="work-time-box">
              <span>工作时间: {{item.time}}</span>
            </div>
          </div>
          <div class="edit-box">
            <el-button type="text" @click="btneEdit(item)">编辑</el-button>
            <el-button type="text" style="margin-left: 0;" @click="btnDdelete(item)">删除</el-button>
          </div>
        </div>
        <el-form-item>
          <el-button type="primary" @click="btnAdd">添加地址</el-button>
          <span style="margin-left: 10px;color:#999;">最多添加50个地址</span>
        </el-form-item>
      </el-form-item>
    </el-form>
    <el-dialog :title="dialogText" :visible.sync="dialogVisible" width="700px">
      <el-form :model="editForm" ref="editForm" :rules="editRules" label-width="120px" size="small">
        <el-form-item label="联系人" prop="name">
          <el-input v-model="editForm.name" placeholder="不超过20个字符"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" prop="mobile">
          <el-input v-model="editForm.mobile" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="详细地址" prop="address">
          <el-input type="textarea" v-model="editForm.address" placeholder="不超过100个字符"></el-input>
        </el-form-item>
         <el-form-item label="工作时间" prop="time">
          <el-input v-model="editForm.time" placeholder="不超过20个字符"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEditAddress">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      dialogVisible: false,
      initEditForm: {
        name: '', // 联系人
        mobile: '', // 联系方式
        address: '', // 详细地址
        time: '' // 工作时间
      },
      editForm: {
        name: '', // 联系人
        mobile: '', // 联系方式
        address: '', // 详细地址
        time: '' // 工作时间
      },
      dialogText: '添加自提地址',
      editRules: {
        name: [{ required: true, message: '请输入联系人', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入联系方式', trigger: 'blur' }],
        address: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
        time: [{ required: true, message: '请输入工作时间', trigger: 'blur' }]
      },
      editFlag: true,
      tabIndex: 0
    }
  },
  created () {
    this.ztAddress.forEach((item, index) => {
      this.ztAddress[index].index = index
    })
    this.tabIndex = this.ztAddress.length - 1
  },
  computed: {
    ...mapGetters(['ztAddress'])
  },
  methods: {
    btnAdd () {
      this.editFlag = true
      this.dialogText = '添加自提地址'
      this.editForm = Object.assign({}, this.initEditForm)
      this.dialogVisible = true
      this.$refs.editForm && this.$refs.editForm.resetFields()
    },
    handleEditAddress () {
      this.$refs.editForm.validate((valid, reject) => {
        if (valid) {
          if (this.editFlag) {
            this.editForm.index = ++this.tabIndex
            this.ztAddress.push(Object.assign({}, this.editForm))
          } else {
            let index = this.ztAddress.findIndex((address, index) => this.editForm.index === address.index)
            this.ztAddress.splice(index, 1, this.editForm)
          }
          this.dialogVisible = false
        } else {
          this.$notify({
            type: 'warning',
            title: '提示',
            message: reject[Object.keys(reject)[0]][0].message
          })
        }
      })
    },
    btneEdit (item) {
      this.editFlag = false
      let index = this.ztAddress.findIndex((address, index) => item.index === address.index)
      if (index > -1) {
        this.editForm = Object.assign({}, this.ztAddress[index])
        this.dialogText = '编辑自提地址'
        this.dialogVisible = true
        this.$refs.editForm && this.$refs.editForm.resetFields()
      }
    },
    btnDdelete (item) {
      let index = this.ztAddress.findIndex((address, index) => item.index === address.index)
      if (index > -1) {
        this.ztAddress.splice(index, 1)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.address-wrapper {
  display: flex;
  margin-bottom: 10px;
  .address-box {
    width: 358px;
    background-color: #f6f6f6;
    margin-right: 10px;
    padding: 10px;
    font-size: 14px;
    color: #3c3c3c;
    line-height: 1.5;
    .name-box {
      span {
        margin-right: 40px;
      }
    }
  }
  .edit-box {
    width: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>
