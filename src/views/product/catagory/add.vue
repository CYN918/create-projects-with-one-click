<template>
  <div class="margin">
    <el-form ref="ruleform" :model="dataArr" :rules="rules" label-width="260px" size="small">
    <div class="mbottom">
      <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" :content="title_txt"></el-page-header>
          </div>
      </div>
    </div>
    <div class="mbottom">
      <div class="goods-fitter">
        <div class="search-wrapper">
            <h4 class="title">商品分类信息</h4><br/>
            <el-form-item label="分类名称：" prop="name">
                    <el-input class="" v-model="dataArr.name" style="width:500px;" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="所属分类：" prop="value">
                    <treeselect
                    style="width:350px"
                    :options="options"
                    :value="dataArr.value"
                    :searchable="false"
                    placeholder='请选择分类'
                    v-model="dataArr.value"
                    @input='vlauechange'
                    />
                </el-form-item>
                <el-form-item prop="buyer" label="采购员：" class="">
                    <el-select v-model="dataArr.buyer" placeholder="请选择">
                        <el-option
                        v-for="item in userArr"
                        :key="item.sysuserId"
                        :label="item.sysuserName"
                        :value="item.sysuserId">
                        </el-option>
                    </el-select>   
                </el-form-item>
                <el-form-item label="数量单位：" prop="number">
                    <el-input class="" v-model="dataArr.number" style="width:500px;"  placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="排序：" prop="sorting">
                    <el-input class=""  v-model="dataArr.sorting"  style="width:500px;"  placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="是否显示:"   prop="According">
                    <el-radio v-model="dataArr.According" label="0">是</el-radio>
                    <el-radio v-model="dataArr.According" label="1">否</el-radio>
                </el-form-item>
                <el-form-item label="是否显示在导航栏：" prop="navigation">
                    <el-radio v-model="dataArr.navigation" label="0">是</el-radio>
                    <el-radio v-model="dataArr.navigation" label="1">否</el-radio>
                </el-form-item>
                <el-form-item label="设置为首页推荐：" prop="checkList">
                    <el-checkbox-group v-model="dataArr.checkList">
                        <el-checkbox label="精品"></el-checkbox>
                        <el-checkbox label="最新"></el-checkbox>
                        <el-checkbox label="热门"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="授权用户：" prop="user">
                    <el-checkbox-group v-model="dataArr.user">
                        <el-checkbox label="编辑人员"></el-checkbox>
                        <el-checkbox label="商家管理"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="积分类型：" prop="integral">
                    <el-radio v-model="dataArr.integral" label="0">普通积分</el-radio>
                    <el-radio v-model="dataArr.integral" label="1">住房积分</el-radio>
                    <el-radio v-model="dataArr.integral" label="2">饮料积分</el-radio>
                </el-form-item>
                <el-form-item label="筛选属性：" prop="attribute" > 
                    <div v-for="(item,index) in dataArr.attribute" :key="index" style="margin-top:10px">
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
                    <el-input class="" v-model="dataArr.price" style="width:500px;" placeholder="请输入"></el-input>
                    <span class="note">该选项表示该分类下商品最低价与最高价之间的划分的等级个数，填0表示不做分级，最多不能超过10个。</span>
                </el-form-item>
                <el-form-item label="分类的样式表文件：" prop="stylesheet">
                    <el-input class="" v-model="dataArr.stylesheet" style="width:500px;" placeholder="请输入"></el-input>
                    <span class="note">您可以为每一个商品分类指定一个样式表文件。例如文件存放在 themes 目录下则输入：themes/style.css</span>
                </el-form-item>
                <el-form-item label="关键字：" prop="keyword">
                    <el-input class="" v-model="dataArr.keyword" style="width:500px;" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="请选择分类图片：" prop="catImgid" >
                        <el-upload
                        class="avatar-uploader"
                        :action="action"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        >
                        <img v-if="dataArr.catImgUrl" :src="dataArr.catImgUrl " class="avatar imgsize">
                            <el-button  v-if="!dataArr.catImgUrl" size="small" type="info">选择文件</el-button>
                        </el-upload>     
                </el-form-item>
                <el-form-item label="分类描述：" prop="textarea">
                    <el-input
                    style="width:500px;"
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="dataArr.textarea">
                    </el-input>
                </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleform')" size="small">确定</el-button>
                <el-button type="primary" @click="resetForm" size="small">重置</el-button>
            </el-form-item>
            </div>
        </div>
    </div>
    </el-form>
  </div>
</template>

<script>
  // import the component
  import Treeselect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import { getCatagory , getAlltype , addCatagory , addCatagorygoods ,cataGorygoodsid ,modifyCatagorygoods , obtainBrand  ,getTreecatagory , getBuyer} from '@/api/product/index'

export default {
    data () {
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
    return {
      title_txt:'新增商品分类',
        action:'', //图片上传
            dataArr:{
                name:'', //分类名称
                value: null, //上级分类
                buyer:'', //采购员
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
            userArr:[], // 采购眼
            checkList:'',
            id:'',
            label: '热门城市',
            attribute1: [],
            attribute2: [],
            rules: {
                name:[{ required: true, message: '请输入分类名称', trigger: 'blur' }], //分类名称
                value:[{ required: true,message: '请输入上级分类', trigger: 'input' }], //上级分类
                buyer:[{ required: true, message: '请选择采购员', trigger: 'blur' }], //采购员
                number:[{ required: true, message: '请输入数量单位', trigger: 'blur' }], //数量单位
                sorting:[{ required: true, message: '请输入排序', trigger: 'blur' }], //排序
                According:[{ required: true, message: '请选择是否显示', trigger: 'change' }], //是否显示
                navigation:[{ required: true, message: '请选择是否显示在导航栏', trigger: 'change' }], //是否显示在导航栏
                checkList:[{ required: true, message: '请设置是否为首页推荐', trigger: 'change' }], //设置为首页推荐
                user:[{ required: true, message: '请选择授权用户', trigger: 'change' }], //授权用户
                integral:[{ required: true, message: '请选择积分类型', trigger: 'change' }], //积分类型
                attribute:[{ required: true, validator: superior, trigger: 'change' }] , //多个筛选属性
                price:[{ required: true, message: '请输入价格区间个数', trigger: 'blur' }], //价格区间个数
                stylesheet:[{ required: true, message: '请输入分类的样式表文件', trigger: 'blur' }], //分类的样式表文件
                keyword:[{ required: true, message: '请输入关键字', trigger: 'blur' }], //关键字
                catImgid:[{ required: true, message: '请选择图片', trigger: 'blur' }], //图片url
                textarea:[{ required: true, message: '请输入分类描述', trigger: 'blur' }], //分类描述
                },
    }
  },
  created () {
        // if(this.$route.query.id){
        //     this.id = this.$route.query.id
        //     obtainBrand(this.id).then(res => {
        //         this.data.url = res.data.webUrl
        //         this.data.name = res.data.brandName
        //         this.data.textarea = res.data.brandDesc
        //         this.data.sort = res.data.sortOrder
        //         this.data.logo = res.data.brandLogo
        //         this.data.banner = res.data.brandBanner
        //         this.data.radio = JSON.stringify(res.data.isShow) 
        //     })
        // }
  },
  mounted(){
      this.addCatagor();
        getAlltype().then(res => {
            this.attribute1 = res.data
        })
        this.action = this.baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile?'
        if(this.$route.query.id){
            this.title_txt = '编辑商品分类'
            this.id = this.$route.query.id
            cataGorygoodsid(this.id).then(res => {
                let bigArr =[]
                res.data.children.forEach(item => {
                    bigArr.push({attribute1:item.goodsTypeId,attribute2:item.attrId})
                })
                res.data.children = bigArr
                res.data.children.forEach(item => {
                    if(item.attribute2){
                        addCatagory(item.attribute1).then(res => {
                            this.attribute2 = res.data
                        })
                    }
                })
                this.dataArr.name = res.data.catName
                this.dataArr.value = res.data.parentId =='0'?'':res.data.parentId 
                this.dataArr.buyer = res.data.userId
                this.dataArr.number = res.data.measureUnit
                this.data.sorting = res.data.sortOrder
                this.dataArr.According = JSON.stringify(res.data.isShow) 
                this.dataArr.navigation = JSON.stringify(res.data.showInNav) 
                this.dataArr.checkList = res.data.indexRecommend
                this.dataArr.user = res.data.userRank
                this.dataArr.integral = JSON.stringify(res.data.pointsTypes)
                this.dataArr.attribute = res.data.children
                this.dataArr.price = res.data.grade
                this.dataArr.stylesheet = res.data.style
                this.dataArr.catImgUrl = res.data.catImgUrl
                this.dataArr.keyword = res.data.keywords
                this.dataArr.textarea = res.data.catDesc
            })
        }
        this._getBuyer()
  },
  methods: {
        //采购员列表
        _getBuyer(){
          let obj = {}
          obj.currentPage = 1
          obj.size = 0
          getBuyer(obj).then(res => {
            this.userArr = res.data.list
          })
        },
        //返回上一级路由
        back(){
          this.$router.push({name:'ProductCatagory'})
        },
        //树形下拉款验证
        vlauechange(){
            console.log('测试')
            // this.$refs.ruleForm.validateField('value')
        },
        //新增属性
        Increase(index){
            this.dataArr.attribute.push({attribute1:'',attribute2:''})
        },
        //删除属性
        Output(index){
            this.dataArr.attribute.splice(index,1)
        },
        handleAvatarSuccess (res, file) {
            console.log(file)
        this.dataArr.catImgUrl = res.data.domain+res.data.filePath
        this.dataArr.catImgid = file.name
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
                    this.dataArr.attribute.forEach((item,index) => {
                        if(index<this.dataArr.attribute.length-1){
                            strAll += item.attribute1 + ',' + item.attribute2+','
                        }else{
                            strAll += item.attribute1 + ',' + item.attribute2
                        }
                    })
                    strAll.slice(0,strAll.length-1)
                    if(this.id){
                        modifyCatagorygoods(this.dataArr,strAll,this.id).then((res) => {
                            if(res.code == 200){
                                this.$router.push({name:'ProductCatagory'});
                            }
                        })
                    }else{
                        addCatagorygoods(this.dataArr,strAll).then(res => {
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
            getTreecatagory(obj).then((res) => {
                this.transleteData(res.data,this.options)
                this.IterationDelateMenuChildren(this.options)
            })
        },
        transleteData(data, arr) {
            data.forEach( (item) => {
                // if(!item.parentId){
                //     item.goodsTypeId = ''
                //     item.typeName = '顶级分类'
                // }
                const msg = {
                    id: item.catId,
                    label: item.catName,
                    value: item.catId,
                    children: item.children ? [] : null,
                    isLeaf: item.children ? false : true
                };
                if (item.children && item.children.length > 0 ) {
                    this.transleteData(item.children, msg.children);
                }
                arr.push(msg);
            });
            return arr;
        },
        IterationDelateMenuChildren(arr){
        if (arr.length) {
            for (let i in arr) {
                if (arr[i].children.length) {
                    this.IterationDelateMenuChildren(arr[i].children)
                } else {
                    delete arr[i].children;
                }
            }
        }
        return arr
        },      
  },
  components: {
      Treeselect
  }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.goods-fitter {
  .vender {
    ul {
      li {
        float: left;
        height: 41px;
        padding: 0 10px;
        line-height: 41px;
        text-align: center;
        border: 1px solid transparent;
        font-size: 16px;
        color: #333;
        cursor: pointer;
        &.active {
          border: 1px solid #d7e0f1;
          border-bottom: 0;
          background-color: #fff;
          position: relative;
          position: relative;
          &:after {
            position: absolute;
            content: "";
            left: 0;
            bottom: -1px;
            height: 1px;
            width: 100%;
            background: #fff;
          }
        }
        .image {
          display: inline-block;
          width: 30px;
          margin-right: 10px;
          font-size: 0;
          line-height: 40px;
          vertical-align: top;
          img {
            width: 100%;
            vertical-align: middle;
          }
        }
      }
    }
  }
  .search-wrapper {
    padding: 20px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    .title {
      margin-left: -20px;
      font-size: 16px;
      font-weight: 400;
      color: 3333;
      padding-left: 10px;
      line-height: 1.4;
      border-left: 4px solid $themeColor;
      margin-bottom: 10px;
    }
    .search-main {
    }
    .search-base {
    }
  }
  .text-space {
    text-align: center;
    color: #606266;
    font-size: 12px;
  }
  .el-select-width {
    max-width: 130px;
    margin-right: 5px;
  }
  .el-input-width {
    display: inline-block;
    max-width: 180px;
  }
  .btn-toggle {
    margin-left: 10px;
    font-size: 14px;
    color: $themeColor;
    cursor: pointer;
  }
}
.goods-list-wrapper {
  margin-top: 20px;
}
.el-transfer-panel__header {
  background: $themeColor;
  color: #fff;
}
.item {
  line-height: 1.5;
  padding: 8px 10px;
  cursor: pointer;
  &:hover {
    color: $themeColor;
  }
  &.active {
    background: #c6e2ff;
    color: #fff;
  }
}
.image {
  cursor: pointer;
}
.item-name {
  cursor: pointer;
  &:hover {
    color: $themeColor;
  }
}
.el-icon-arrow-right {
  margin: 0 20px;
}
.store {
  width: 310px;
}
.red {
  color: $themeSubColor;
}
.transfer-wrapper {
  text-align: center;
}
.panel-wrapper {
  text-align: left;
  margin: 0;
  padding: 6px 0;
  list-style: none;
  height: 246px;
  overflow: auto;
  box-sizing: border-box;
}
.dialog-footer {
  margin-top: 20px;
  text-align: right;
}
.btn{
  margin-left:20px
}
.caiji{
  color:red
}
.gaunjianzi{
  margin-left:20px;
  color:red
}
.danwei{
  margin-left:10px;  
}
.introduce{
  color:#97999F;
  font-size:90%
}
  .search-wrapper1 {
    padding: 20px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    display: flex;
    align-items: center;
    .title1 {
      display: flex;
      margin-left: 20%;
    }
  }
  .note{
    display: flex;
    color: #ccc;
}
</style>
