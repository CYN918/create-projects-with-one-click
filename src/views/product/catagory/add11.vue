<template>
    <div>
        <div class="top_btn">
            <el-button  type="primary" class="add_brand" @click="back"  size="small">商品分类</el-button>
        </div>
        <el-form :model="data" ref="ruleForm" :rules="rules" label-width="400px"  size="medium">
            <el-card class="mbottom" shadow="never">
                <el-form-item label="分类名称：" prop="name">
                    <el-input class="" v-model="data.name" style="width:400px;" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="上级分类：" prop="value">
                    <treeselect
                    style="width:350px"
                    :options="options"
                    :value="value"
                    :searchable="false"
                    placeholder='请选择分类'
                    v-model="data.value"
                    @input='vlauechange'
                    />
                </el-form-item>
                <el-form-item prop="buyer" label="采购员：" class="">
                    <el-select v-model="data.buyer" placeholder="请选择">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>   
                </el-form-item>
                <el-form-item label="数量单位：" prop="number">
                    <el-input class="" v-model="data.number" style="width:400px;"  placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="排序：" prop="sorting">
                    <el-input class=""  v-model="data.sorting"  style="width:400px;"  placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="是否显示"   prop="According">
                    <el-radio v-model="data.According" label="0">是</el-radio>
                    <el-radio v-model="data.According" label="1">否</el-radio>
                </el-form-item>
                <el-form-item label="是否显示在导航栏：" prop="navigation">
                    <el-radio v-model="data.navigation" label="0">是</el-radio>
                    <el-radio v-model="data.navigation" label="1">否</el-radio>
                </el-form-item>
                <el-form-item label="设置为首页推荐：" prop="checkList">
                    <el-checkbox-group v-model="data.checkList">
                        <el-checkbox label="精品"></el-checkbox>
                        <el-checkbox label="最新"></el-checkbox>
                        <el-checkbox label="热门"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="授权用户：" prop="user">
                    <el-checkbox-group v-model="data.user">
                        <el-checkbox label="编辑人员"></el-checkbox>
                        <el-checkbox label="商家管理"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="积分类型：" prop="integral">
                    <el-radio v-model="data.integral" label="0">普通积分</el-radio>
                    <el-radio v-model="data.integral" label="1">住房积分</el-radio>
                    <el-radio v-model="data.integral" label="2">饮料积分</el-radio>
                </el-form-item>
                <el-form-item label="筛选属性：" prop="attribute" > 
                    <div v-for="(item,index) in data.attribute" :key="index" style="margin-top:10px">
                        <span  class="cousor" v-if="index == 0" @click="Increase(index)">[ + ]</span>
                        <span  class="cousor" v-if="index != 0" @click="Output(index)">[ - ]</span>
                        <el-select v-model="item.attribute1" placeholder="请选择商品类型" @change="screening">
                            <el-option
                            v-for="item in attribute1"
                            :key="item.goodsTypeId"
                            :label="item.typeName"
                            :value="item.goodsTypeId">
                            </el-option>
                        </el-select>
                        <el-select v-model="item.attribute2" placeholder="请选择筛选属性">
                            <el-option
                            v-for="item in attribute2"
                            :key="item.attrId"
                            :label="item.attrName"
                            :value="item.attrId">
                            </el-option>
                        </el-select> 
                    </div>
                      <span class="note">筛选属性可在前分类页面筛选商品</span>
                </el-form-item>
                <el-form-item label="价格区间个数：" prop="price">
                    <el-input class="" v-model="data.price" style="width:400px;" placeholder="请输入"></el-input>
                    <span class="note">该选项表示该分类下商品最低价与最高价之间的划分的等级个数，填0表示不做分级，最多不能超过10个。</span>
                </el-form-item>
                <el-form-item label="分类的样式表文件：" prop="stylesheet">
                    <el-input class="" v-model="data.stylesheet" style="width:400px;" placeholder="请输入"></el-input>
                    <span class="note">您可以为每一个商品分类指定一个样式表文件。例如文件存放在 themes 目录下则输入：themes/style.css</span>
                </el-form-item>
                <el-form-item label="关键字：" prop="keyword">
                    <el-input class="" v-model="data.keyword" style="width:400px;" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="请选择分类图片：" prop="catImgid" >
                        <el-upload
                        class="avatar-uploader"
                        :action="action"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        >
                        <img v-if="data.catImgUrl" :src="data.catImgUrl " class="avatar imgsize">
                            <el-button  v-if="!data.catImgUrl" size="small" type="info">选择文件</el-button>
                        </el-upload>     
                </el-form-item>
                <el-form-item label="分类描述：" prop="textarea">
                    <el-input
                    style="width:500px;"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="data.textarea">
                    </el-input>
                </el-form-item>
            </el-card>
            <div class="operation">
                <el-button  type="primary" @click="submitForm('ruleForm')">确定</el-button>
                <el-button  type="primary" @click="resetForm">重置</el-button>
            </div>
        </el-form>
    </div>
</template>
<script>
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import { getCatagory , getAlltype , addCatagory , addCatagorygoods ,cataGorygoodsid ,modifyCatagorygoods  } from '@/api/product/index'
export default{
    data(){
        var superior = (rule,value,callback) =>{
            var str =''
            value.forEach(item => {
                str += item.attribute1 + ',' + item.attribute2
            })
            let strone = str.split(',')
            let strtwo = ''
            strone.forEach(item => {
                strtwo += item
            })
            if(strtwo == ''){
                callback(new Error('请选择筛选属性'))
            } else {
                callback()
            }
        }
        return{
            action:'', //图片上传
            data:{
                name:'', //分类名称
                value: null, //上级分类
                buyer:'21', //采购员
                number:'', //数量单位
                sorting: '', //排序
                According:'0', //是否显示
                navigation:'0', //是否显示在导航栏
                checkList: [], //设置为首页推荐
                user:[], //授权用户
                integral:'0', //积分类型
                attribute:[{attribute1:'',attribute2:''}] , //多个筛选属性
                price: '', //价格区间个数
                stylesheet:'', //分类的样式表文件
                catImgUrl:'', //图片url
                catImgid:'', //图片id
                keyword:'', //关键字
                textarea:'', //分类描述
            },
            options: [], //上级分类
            checkList:'',
            id:'',
            label: '热门城市',
            attribute1: [],
            attribute2: [],
            rules: {
                name:[{ required: true, message: '请输入分类名称', trigger: 'blur' }], //分类名称
                // value:[{ required: true,message: '请输入上级分类', trigger: 'input' }], //上级分类
                // buyer:[{ required: true, message: '请选择采购员', trigger: 'blur' }], //采购员
                // number:[{ required: true, message: '请输入数量单位', trigger: 'blur' }], //数量单位
                // sorting:[{ required: true, message: '请输入排序', trigger: 'blur' }], //排序
                // According:[{ required: true, message: '请选择是否显示', trigger: 'change' }], //是否显示
                // navigation:[{ required: true, message: '请选择是否显示在导航栏', trigger: 'change' }], //是否显示在导航栏
                // checkList:[{ required: true, message: '请设置是否为首页推荐', trigger: 'change' }], //设置为首页推荐
                // user:[{ required: true, message: '请选择授权用户', trigger: 'change' }], //授权用户
                // integral:[{ required: true, message: '请选择积分类型', trigger: 'change' }], //积分类型
                // attribute:[{ required: true, validator: superior, trigger: 'change' }] , //多个筛选属性
                // price:[{ required: true, message: '请输入价格区间个数', trigger: 'blur' }], //价格区间个数
                // stylesheet:[{ required: true, message: '请输入分类的样式表文件', trigger: 'blur' }], //分类的样式表文件
                // keyword:[{ required: true, message: '请输入关键字', trigger: 'blur' }], //关键字
                // catImgid:[{ required: true, message: '请选择图片', trigger: 'blur' }], //图片url
                // textarea:[{ required: true, message: '请输入分类描述', trigger: 'blur' }], //分类描述
                },
            }
    },
    methods:{
        //返回上一级路由
        back(){
            this.$router.go(-1)
        },
        //树形下拉款验证
        vlauechange(){
            console.log('测试')
            this.$refs.ruleForm.validateField('value')
        },
        //新增属性
        Increase(index){
            this.data.attribute.push({attribute1:'',attribute2:''})
        },
        //删除属性
        Output(index){
            this.data.attribute.splice(index,1)
        },
        handleAvatarSuccess (res, file) {
            console.log(file)
        this.data.catImgUrl = res.data.domain+res.data.filePath
        this.data.catImgid = file.name
        },
        beforeAvatarUpload (file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
            this.$message.error('上传图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
            this.$message.error('上传图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
        },
        //筛选属性联动
        screening(val){
            addCatagory(val).then(res => {
                this.attribute2 = res.data
            })
        },
         handleRemove(file) {
        console.log(file);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        },
        addnew(){

        },
        remove(){

        },
        resetForm(){

        },
        submitForm(formName){
             this.$refs[formName].validate((valid) => {
                if (valid) {
                    let strAll = ''
                    this.data.attribute.forEach((item,index) => {
                        if(index<this.data.attribute.length-1){
                            strAll += item.attribute1 + ',' + item.attribute2+','
                        }else{
                            strAll += item.attribute1 + ',' + item.attribute2
                        }
                    })
                    strAll.slice(0,strAll.length-1)
                    if(this.id){
                        modifyCatagorygoods(this.data,strAll,this.id).then((res) => {
                            if(res.code == 200){
                                this.$router.push({name:'ProductCatagory'});
                            }
                        })
                    }else{
                        addCatagorygoods(this.data,strAll).then(res => {
                            if(res.code){
                                this.$router.push({name:'ProductCatagory'})
                            }
                        })
                    }
                } else {
                return false;
                }
            });
        },
        addCatagor(){
            let obj = {};
            obj.type = 'SELECT';
            getCatagory(obj).then((res) => {
                let data = res.data
                let obj = {catId:'',catName:'顶级分类'}
                data.unshift(obj)
                data.forEach(item => {
                    item.id = item.catId
                    item.label  = item.catName
                    if(item.children){
                        item.children.forEach(item1 => {
                            item1.id = item1.catId
                            item1.label  = item1.catName
                            if(item1.children){
                                item1.children.forEach(item2 => {
                                    item2.id = item2.catId
                                    item2.label  = item2.catName
                                    if(item2.children){
                                        item2.children.forEach(item3 => {
                                            item3.id = item3.catId
                                            item3.label  = item3.catName
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
                this.options = res.data
            })
        }
    },
    mounted(){
        this.addCatagor();
        getAlltype().then(res => {
            this.attribute1 = res.data
        })
        this.action = this.baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile?'
        if(this.$route.params.id){
            this.id = this.$route.params.id
            cataGorygoodsid(this.id).then(res => {
                let bigArr =[]
                res.data.filterAttrList.forEach(item => {
                    bigArr.push({attribute1:item.goodsTypeId,attribute2:item.attrId})
                })
                res.data.filterAttrList = bigArr
                res.data.filterAttrList.forEach(item => {
                    if(item.attribute2){
                        addCatagory(item.attribute1).then(res => {
                            this.attribute2 = res.data
                        })
                    }
                })
                this.data.name = res.data.catName
                this.data.value = res.data.parentId =='0'?'':res.data.parentId 
                this.data.buyer = res.data.userId
                this.data.number = res.data.measureUnit
                this.data.sorting = res.data.sortOrder
                this.data.According = JSON.stringify(res.data.isShow) 
                this.data.navigation = JSON.stringify(res.data.showInNav) 
                this.data.checkList = res.data.indexRecommend
                this.data.user = res.data.userRank
                this.data.integral = JSON.stringify(res.data.pointsTypes)
                this.data.attribute = res.data.filterAttrList
                this.data.price = res.data.grade
                this.data.stylesheet = res.data.style
                this.data.catImgUrl = res.data.catImgUrl
                this.data.keyword = res.data.keywords
                this.data.textarea = res.data.catDesc
            })
        }
    },
    components:{
        Treeselect
    }
}
</script>
<style lang='scss' scoped>
.operation{
    margin-top: 30px;
    margin-left: 450px;
}
.note{
    display: flex;
    color: #ccc;
}
.cousor{
    cursor:pointer;
}
.imgsize{
    width: 140px;
    height: 140px;
}
</style>