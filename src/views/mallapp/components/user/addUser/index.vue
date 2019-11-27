<template>
    <el-dialog
            title="创建用户"
            :visible.sync="dialogVisible"
            width="60%"
            :close-on-click-modal="false"
            :before-close="handeleCancel">
        <div class="muser-add-wrapper">
            <div class="mcard">
                <div class="title">创建用户</div>
                <div class="mcard-content">
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
                        <el-form-item label="头像：" class="upload-img-form">
                                <el-upload
                                class="avatar-uploader"
                                :action="action"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                 accept="image/jpeg, image/png"
                                >
                            <img v-if="ruleForm.imageUrl" :src="ruleForm.imageUrl" class="avatar"  prop="file">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                        </el-form-item>
                        <el-form-item label="登录账号：" prop="accountNumber">
                            <el-input v-model="ruleForm.accountNumber" autocomplete="new-password" type="text"></el-input>
                        </el-form-item>
                        <el-form-item label="密码：" prop="password">
                            <el-input v-model="ruleForm.password" autocomplete="new-password" type="password"></el-input>
                        </el-form-item>
                        <el-form-item label="用户名称：" prop="userName">
                            <el-input v-model="ruleForm.userName"></el-input>
                        </el-form-item>
                        <el-form-item label="真实姓名：" prop="realName">
                            <el-input v-model="ruleForm.realName"></el-input>
                        </el-form-item>
                        <el-form-item label="性别：" prop="gender">
                            <el-radio-group v-model="ruleForm.sex">
                                <el-radio label="1">男</el-radio>
                                <el-radio label="2">女</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="手机号：" prop="telephonNuber">
                            <el-input v-model="ruleForm.telephonNuber"></el-input>
                        </el-form-item>
                        <el-form-item label="QQ号：" prop="QQ">
                            <el-input v-model="ruleForm.QQ"></el-input>
                        </el-form-item>
                        <el-form-item label="生日：" prop="birthday">
                            <el-date-picker
                                    v-model="ruleForm.value1"
                                    type="date"
                                    value-format="yyyy-MM-dd 00:00:00"
                                    placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="联系地址：" prop="adrees">
                            <el-input v-model="ruleForm.adrees"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
    <el-button @click="handeleCancel">取 消</el-button>
    <el-button type="primary" @click="handeleConfirm">确认创建</el-button>
  </span>
    </el-dialog>
</template>

<script>
    import { getUserGroup, addUser,getUserList } from '@/api/mallapp/user/index'
    import { phoneReg } from '@/common/js/reg'
    import encryption from "@/common/js/encryption";
    import { mapState } from 'vuex'
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
                    imageUrl: '',
                    accountNumber:'',
                    password:'',
                    userName:'',
                    realName:'',
                    sex:'1',
                    telephonNuber:'',
                    QQ:'',
                    value1:'',
                    adrees:''
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
            this.cancelData()
        },
        computed:{
            ...mapState({
                dialogVisible:state=>state.user.dialogVisible
            })
        },
        methods: {
            //取消
            handeleCancel(){
                this.$store.commit('SET_ADDUSER',false)
                this.cancelData()
            },
            cancelData(){
                if ( this.$refs['ruleForm'] !== undefined ) {
                    this.$refs['ruleForm'].resetFields();
                }
                this.ruleForm.imageUrl= ''
                this.ruleForm.accountNumber= ''
                this.ruleForm.password= ''
                this.ruleForm.userName= ''
                this.ruleForm.realName= ''
                this.ruleForm.sex= '1'
                this.ruleForm.telephonNuber= ''
                this.ruleForm.QQ= ''
                this.ruleForm.value1= ''
                this.ruleForm.adrees= ''
            },
            //成功之后
            handleAvatarSuccess(res,file){
                this.ruleForm.imageUrl = res.data.domain + res.data.filePath;
            },
            //表单提交
            async  handeleConfirm() {
                var formName = this.ruleForm
                if(formName.accountNumber==''){
                     this.$message({
                        message: '请输入登录账号',
                        type: 'warning'
                    })
                     return
                }
                if(formName.password==''){
                      this.$message({
                        message: '请输入密码',
                        type: 'warning'
                        })
                      return      
                }
                if(formName.password.length<=4){
                      this.$message({
                        message: '密码不能小于5位',
                        type: 'warning'
                        })
                      return      
                }
                if(formName.userName==''){
                    this.$message({
                        message: '请输入用户姓名',
                        type: 'warning'
                    })
                     return       
                }
                const password = encryption.encrypt(formName.password,"_fuyuanai@Maige_")
                let data={
                    password:password,
                    headImgUrl:formName.imageUrl,
                    userName:formName.userName,
                    realName:formName.realName,
                    sex:formName.sex,
                    telephone:formName.telephonNuber,
                    address:formName.adrees,                  // 接口没有
                    userAccount:formName.accountNumber,
                    qq:formName.QQ,
                    birthday:formName.value1,
                }
                const res = await addUser(data)
                if( res ){
                    if(res.code === 200 ) {
                        this.$message({
                            message: res.message,
                            type: 'success'
                        });
                        this.$parent._getUserList()
                        this.$parent.getUserStatistics()
                        this.$parent._getUserGroup()
                        this.$store.commit('SET_ADDUSER',false)
                        this.cancelData()
                    }
                }else{
                      this.$store.commit('SET_ADDUSER',true)
                      formName = []
                }
              
                // this.$router.push({ path: '/muser/list' })

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
