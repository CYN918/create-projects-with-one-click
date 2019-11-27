<template>
    <div>
        <div class="top_btn">
            <el-button  type="primary" class="add_brand" @click="back">分组列表</el-button>
        </div>
        <el-form :model="data" ref="form"  :rules="rules" label-width="260px" size="small">
            <el-card class="mbottom" shadow="never">
                <el-form-item label="分组标签名称" prop="">
                    <el-input placeholder='请输入分组标签名称' style='width:400px' v-model='data.label'></el-input>
                </el-form-item>
                <el-form-item label="商城链接" prop="">
                    <el-input placeholder='请输入商城链接' style='width:400px'  v-model='data.mall'></el-input>
                </el-form-item>
                <el-form-item label="分组标识" prop="">
                    <el-input placeholder='请输入分组标识' style='width:400px'  v-model='data.logo'></el-input>用于api接口推送
                </el-form-item>
            </el-card>
             <div class="btn">
                <el-button type="primary" @click="submitForm('form')" size="small" >确定</el-button>
                <el-button type="primary" @click="resetForm" size="small" >重置</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
import {addGroup,editGroup,obtainGroup} from '@/api/product/index'
export default{
     data(){
        return {
            data:{
                label:'',
                mall:'',
                logo:''
            },
            rules:[

            ],
            tableData: {
                currentPage:1,
                sizes:[10, 20, 50, 100],
                size:10,
                total:0,
            },
            input:'',
        }
    },
    methods:{
        back(){
            this.$router.go(-1)
        },
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                if(this.id){
                    editGroup(this.data.label,this.data.mall,this.data.logo,this.id).then((res) => {
                        if(res.code == 200){
                            this.$router.push({name:'ProductGroup'});
                        }
                    })
                }else{
                    addGroup(this.data).then((res) => {
                        if(res.code == 200){
                            this.$router.push({name:'ProductGroup'});
                        }
                    })
                }
            } else {
                return false;
            }
            });
        },
         resetForm(){
            this.data.label = ''
            this.data.mall = ''
            this.data.logo = ''
        },
    },
    created(){
        if(this.$route.params.id){
            this.id = this.$route.params.id
            obtainGroup(this.id).then(res => {
                this.data.label = res.data.tagName
                this.data.mall = res.data.applyUrl
                this.data.logo = res.data.groupCode
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.btn{
    margin-left:30%;
}
</style>