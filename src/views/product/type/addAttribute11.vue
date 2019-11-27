<template>
    <div>
        <div class="top_btn">
            <el-button  type="primary" class="add_brand" @click="back">商品属性</el-button>
        </div>
        <el-form :model="data" ref="ruleForm" :rules="rules" label-width="350px" size="small">
            <el-card class="mbottom" shadow="never">
                <el-form-item label="属性名称" prop="name">
                    <el-input placeholder='请输入属性名称' style='width:400px' v-model='data.name'></el-input>
                </el-form-item>
                <el-form-item label="所属商品类型" prop="type">
                    <el-select v-model="data.type" placeholder="请选择" filterable>
                        <el-option
                        v-for="item in options"
                        :key="item.goodsTypeId"
                        :label="item.typeName"
                        :value="item.goodsTypeId">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="能否进行检索" prop="">
                    <el-radio v-model="data.radio1" label="0">不需要检索</el-radio>
                    <el-radio v-model="data.radio1" label="1">关键字检索</el-radio>
                    <el-radio v-model="data.radio1" label="2">范围检索 </el-radio>
                    <span class="note">不需要该属性成为检索商品条件的情况请选择不需要检索，需要该属性进行关键字检索商品时选择关键字检索，如果该属性检索时希望是指定某个范围时，选择范围检索。</span>
                </el-form-item>
                <el-form-item label="相同属性值的商品是否关联？" prop="">
                    <el-radio v-model="data.radio2" label="0">否</el-radio>
                    <el-radio v-model="data.radio2" label="1">是</el-radio>
                </el-form-item>
                <el-form-item label="属性是否可选" prop="">
                    <el-radio v-model="data.radio3" label="0">唯一属性</el-radio>
                    <el-radio v-model="data.radio3" label="1">单选属性</el-radio>
                    <el-radio v-model="data.radio3" label="2">复选属性</el-radio>
                    <span  class="note">选择"单选/复选属性"时，可以对商品该属性设置多个值，同时还能对不同属性值指定不同的价格加价，用户购买商品时需要选定具体的属性值。选择"唯一属性"时，商品的该属性值只能设置一个值，用户只能查看该值。</span>
                </el-form-item>
                <el-form-item label="该属性值的录入方式" prop="">
                    <el-radio v-model="data.radio4" @change='entry' label="0">手工录入</el-radio>
                    <el-radio v-model="data.radio4" @change='entry' label="1">从下面的列表中选择（请以英文,隔开）</el-radio>
                    <el-radio v-model="data.radio4" @change='entry' label="2">多行文本框</el-radio>
                </el-form-item>
                <el-form-item label="可选值列表" prop="txtarea">
                    <div class='txtarea'>
                        <el-input
                        type="textarea"
                        :rows="5"
                        placeholder=""
                        :disabled="disabled"
                        v-model="data.textarea">
                        </el-input>
                    </div>
                </el-form-item>
            </el-card>
             <div class="btn">
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                <el-button type="primary" @click="resetForm('ruleForm')">重置</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
import { getAlltype,addAttribute,addAttributebyid,addAttributeeditor } from '@/api/product/index'
export default{
     data(){
         var validatetextarea = (rule,value,callback) =>{
             if(!this.disabled && this.data.textarea === ''){
                 callback(new Error('请输入录入方式'))
             }else{
                 callback()
             }
        }
        return {
            data:{
                name:'',
                type:'',
                radio1:'0',
                radio2:'0',
                radio3:'0',
                radio4:'0',
                textarea:''
            },
            type:'',
            id:'',
             options: [],
            rules: {
                name: [ { required: true, message: '请输入属性名称', trigger: 'blur' }, ],
                type: [  { required: true, message: '请输入属性名称', trigger: 'blur' },],
                txtarea: [  { required: true, validator: validatetextarea,  trigger: 'blur' },]
            },
            disabled:true
        }
    },
    methods:{
        submitForm(formName){
            this.$refs[formName].validate((valid) => {
            if (valid) {
                var obj = this.data;
                var arr = obj.textarea
                if(arr.indexOf(',') !== -1){
                    obj.textarea = arr.split(",")
                }
                if(arr.indexOf('，') !== -1){
                    obj.textarea = arr.split("，")
                }
                if(!this.id){
                    if(arr.indexOf(',') == -1 && arr.indexOf('，') == -1 && arr !=''){
                        let newArr = []
                        newArr.push(arr)
                        obj.textarea = newArr
                    }
                }else{
                    if(arr.indexOf(',') == -1 && arr.indexOf('，') == -1 && arr !=''){
                        let newArr = []
                        newArr = arr
                        obj.textarea = newArr
                    }
                }
                
                if(!this.id){
                        addAttribute(obj).then(res => {
                        if(res.code == 200){
                            this.$router.push({  name: 'ProductTypeattribute',params: { id: this.type}  });
                        }
                    })
                }else{
                    addAttributeeditor(obj,this.id).then(res => {
                        if(res.code == 200){
                            this.$router.push({  name: 'ProductTypeattribute',params: { id: this.type}  });
                        }
                    })
                }
            } else {
                return false;      
            }
            });
        },
        resetForm(formName){
             this.$refs[formName].resetFields()
             this.data.radio1 = '0'
             this.data.radio2 = '0'
             this.data.radio3 = '0'
             this.data.radio4 = '0'
             this.data.textarea = ''
        },
        back(){
            this.$router.back(-1)
        },
        entry(val){
            if(val != 1){
                this.disabled =true
                this.data.textarea = ''
            }else{
                this.disabled =false
            }
        }
    },
    created(){
        getAlltype().then(res => {
            this.options = res.data
        })
        this.type = this.$route.params.type
        console.log(this.$route.params.type)
        console.log(this.$route.params.id)
        if(this.$route.params.id){
            this.id = this.$route.params.id
            addAttributebyid(this.id).then(res => {
                this.data.name = res.data.attrName
                this.data.type = res.data.goodsTypeId
                this.data.radio1= JSON.stringify(res.data.attrIndex) 
                this.data.radio2 = JSON.stringify(res.data.isLinked)
                this.data.radio3 = JSON.stringify(res.data.attrType)
                this.data.radio4 =JSON.stringify(res.data.attrInputType)
                if(res.data.attrType != 1){
                    this.disabled = false
                }else{
                    this.data.textarea = res.data.attrValues
                }
            })
        }
    }
}
</script>
<style lang='scss' scoped>
.btn{
    margin-left:30%;
}
.txtarea{
    width: 500px;
}
.note{
    display: flex;
    color: #ccc;
}
</style>