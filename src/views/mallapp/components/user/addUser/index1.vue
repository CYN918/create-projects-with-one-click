<template>
    <div class="muser-add-wrapper">
        <div class="mcard">
            <div class="title">创建用户</div>
            <div class="mcard-content">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
                    <el-form-item class="upload-img-form">
                               <el-upload
                            class="avatar-uploader"
                            :action="action"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar"  prop="file">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    </el-form-item>
                    <el-form-item label="登录账号" prop="accountNumber">
                        <el-input v-model="ruleForm.accountNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="ruleForm.password"></el-input>
                    </el-form-item>
                    <el-form-item label="用户名称" prop="userName">
                        <el-input v-model="ruleForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名" prop="realName">
                        <el-input v-model="ruleForm.realName"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="gender">
                        <el-radio-group v-model="ruleForm.sex">
                            <el-radio label="1">男</el-radio>
                            <el-radio label="2">女</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="手机号" prop="telephonNuber">
                        <el-input v-model="ruleForm.telephonNuber"></el-input>
                    </el-form-item>
                    <el-form-item label="QQ号" prop="QQ">
                        <el-input v-model="ruleForm.QQ"></el-input>
                    </el-form-item>
                    <el-form-item label="生日" prop="birthday">
                        <el-date-picker
                                v-model="ruleForm.value1"
                                type="date"
                                placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="联系地址" prop="adrees">
                        <el-input v-model="ruleForm.adrees"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleForm)">确认创建</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
  import { getUserGroup, addUser } from '@/api/mallapp/user/index'
  import { phoneReg } from '@/common/js/reg'
  import encryption from "@/common/js/encryption";
  export default {
    name: 'MuserAdd',
    data() {
      return {
        label: 1,
        groupList: [],
        action:'',
        ruleForm: {
          // phone: '', // 手机号
          // password: '', // 初始密码
          // amount: 0, // 初始金额
          // // user_tag_id: '' // 所属群组
          userName: "",
          imageUrl: '',
        },
        rules: {
          accountNumber: [
            {required: true, message: '请输入登录账号', trigger: 'blur'},
          ],
          userName: [
            {required: true, message: '请输入用户姓名', trigger: 'blur'},
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'change'}
          ],
          password: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 5, message: "密码不能小于5位", trigger: "blur" }
          ],
        },
      }
    },
      created(){
      this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
    },
    methods: {
      //成功之前
      beforeAvatarUpload(file){
        console.log(file)
      },
      //成功之后
      handleAvatarSuccess(res,file){
        this.ruleForm.imageUrl = res.data.domain + res.data.filePath;;
      },
      //表单提交
      async  submitForm(formName) {
        console.log(formName.value1)
        if(formName.userName===''){
          return  this.$message('请输入用户姓名')
        }
        if(formName.sex===''){
          return  this.$message('请输入用户性别')
        }
        if(formName.password===''){
          return  this.$message('请输入用户')
        }
        if(formName.userAccount===''){
          return  this.$message('请输入账号信息')
        }
        const password = encryption.encrypt(formName.password,"_fuyuanai@Maige_")
        let data={
          password,
          headImgUrl:formName.imageUrl,
          userName:formName.userName,
          realName:formName.realName,
          sex:formName.sex,
          telephone:formName.telephonNuber,
          adrees:formName.adrees,
          userAccount:formName.accountNumber,
          qq:formName.QQ,
          birthday:formName.value1
        }
        const res = await addUser(data)
        this.$router.push({ path: '/muser/list' })

        // this.$refs[formName].validate((valid) => {
        //     if (valid) {
        //         // this._addUser()
        //     } else {
        //         return false
        //     }
        // })
      },
      // _getUserGroup () {
      //   getUserGroup().then(res => {
      //     this.groupList = res.data
      //   })
      // },
      //   _addUser () {
      //     this.loading = true
      //     addUser(this.ruleForm).then(() => {
      //       this.loading = false
      //       this.$refs.ruleForm.resetFields()
      //
      //     })
      //   }
      // }
    }
  }
</script>

<style lang="scss" scoped>
  .muser-add-wrapper {
    margin: 20px;
    .ruleForm {
      width: 600px;
    }
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 150px;
      height: 150px;
      line-height: 150px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
</style>
