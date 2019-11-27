<template>
  <div class="margin">
    <el-form ref="form" :model="form" :rules="rules" label-width="260px" size="small">
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
            <h4 class="title">{{text}}商品规格</h4><br/>
            <el-form-item label="商品分类:" prop="catId"  v-if="!specId">
                <treeselect
                  style="width:350px"
                  :options="categoryList"
                  placeholder='请选择商品分类'
                  v-model="form.catId"
                  :disable-branch-nodes="true"
                  :clearable='false'
                  @input="abc"
                  />
            </el-form-item>
            <el-form-item label="商品规格:" prop="specName" >
                <el-input v-model="form.specName" style="width:350px" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="规格备注:" prop=""  v-if="specId">
                <el-input v-model="form.specRemark" style="width:350px" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item label="规格值:" prop="value" v-if="!specId">
              <div class="interbank">
                <div v-for="(item,index) in form.specValues" :key='index'>
                  <span class="model" >{{item}}
                    <span class="delete-specif"  @click="deleitem(index)">
                      <span class="error">×</span>
                    </span>
                  </span>
                </div>
                <el-button  type="primary" @click="form.show = !form.show" size="small"  v-if="!form.show">添加</el-button>
                <el-input v-model="form.content" placeholder="请输入内容" style="width:200px" v-if="form.show"></el-input>
                <el-button  type="primary" @click="sure" size="small"  v-if="form.show" style="margin-left: 10px;">确定</el-button>
                <el-button  type="primary" @click="cancel" size="small"  v-if="form.show">取消</el-button>
              </div>
            </el-form-item>
            <el-form-item >
              <el-button  type="primary" @click="submit" size="small" >确定</el-button>
              <el-button  type="primary" @click="resert" size="small" >重置</el-button>
            </el-form-item>
            </div>
        </div>
    </div>
    </el-form>
    
  </div>
</template>

<script>
import { getTreecatagory , savespecValues , getSpecByid , ediotSpecifications} from "@/api/product/index";
import { throttleTipPop } from "@/utils/throttle";
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
    data () {
      var catid = (rule,value,callback) =>{
        if(this.form.catId){
          callback()
        }else{
          callback(new Error('请输入商品分类'))
        }
      }
    return {
      title_txt:'新增商品规格',
      text:'新增',
      specId:'', //规格id
       form: {
          catId: null, // 分类id
          specName: '', // 规格名称
          specValues: [], // 规格值
          show:false,
          content:'',
          specRemark:'' //规格备注
        },
        categoryList:[],
        rules:{
          catId: [{ required: true, validator: catid, trigger: 'input' }],
          specName: [{ required: true, message: '请输入规格名称', trigger: 'blur' }],
        }
    }
  },
  created(){
     if(this.$route.query.id){
       this.title_txt = '编辑商品规格'
       this.specId = this.$route.query.id
       this._getSpecByid()
     }
  },
  methods: {
    abc(val){
      this.$nextTick(()=>{
        this.$ref.form.validate('catId')
      })
    },
    _getSpecByid(){
      getSpecByid(this.specId).then(res => {
        if(res.code == 200){
          this.form.specName = res.data.specName
          this.form.specRemark = res.data.specRemark
        }
      })
    },
    // 重置
    resert(){
      if(this.specId){
        this._getSpecByid()
      }else{
        this.form.catId = null
        this.form.specName = ""
        this.form.specValues = []
      }
    },
    //规格删除
    deleitem(val){
      this.form.specValues.splice(val,1)
    },
    cancel(){
      this.form.show = false
      this.form.content = ''
    },
    sure(){
      const test = JSON.parse(JSON.stringify(this.form.content))
      if (this.form.specValues.length != 0) {
        let arr = this.form.specValues
        for(let i=0 ; i<arr.length; i ++){
          console.log(this.form.specValues)
          console.log(this.form.content)
          if(arr[i] == this.form.content){
            throttleTipPop(this,'error','请勿添加重复规格值')
            return false
          }
        }
        this.form.specValues.push(test);
      } else {
        this.form.specValues.push(test);
      }
      this.form.show = false
      this.form.content = ''
    },
    submit(){
      this.$refs.form.validate((valid) => {
          if (valid) {
            if(this.specId){
              let obj = {}
              obj.specId = this.specId
              obj.specName = this.form.specName
              obj.specRemark = this.form.specRemark
              ediotSpecifications(obj).then(res => {
                if(res.code == 200 ){
                  this.$message({
                    message: res.message,
                    type: 'success'
                  });
                  this.$router.push({name:'ProductSpecifications'})
                }
              })
            }else{
              let obj = {}
              obj.catId = this.form.catId
              obj.specName = this.form.specName
              obj.specValues = this.form.specValues
              savespecValues(obj).then(res => {
                if(res.code == 200){
                  this.$router.push({name:'ProductSpecifications'})
                  this.$message({
                    message: res.message,
                    type: 'success'
                  });
                }
              })
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    },
    back(){
        this.$router.back(-1);
    },
      //获取商品分类
    _getCatagory(){
      let obj = {}
      obj.type = 'SELECT'
      obj.id = 0
      getTreecatagory(obj).then(res =>{
        this.transleteData(res.data,this.categoryList)
        this.IterationDelateMenuChildren(this.categoryList)
      })
    },
    transleteData(data, arr) {
            data.forEach( (item) => {
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
  },
  mounted(){
    this._getCatagory()
    if(this.$route.query.id){
      this.specId = this.$route.query.id
      this.text = '编辑'
    }
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
  .areadiv{
        display: flex;
        font-size: 14px;
        color: #606266;
        .span_type{
            margin-left: 331px;
            margin-right: 14px;
        }
        .txtarea{
            width: 500px;
        }
    }
.interbank{
  display: flex;
  .model{
    height: 32px;
    padding: 0 18px;
    background:rgba(241,248,255,1);
    border-radius:4px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    font-size:14px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(107,108,112,1);
    border-radius:4px;
    position: relative;
  }
}
.delete-specif{
    width: 0;
    height: 0;
    display: inline-block;
    border: 11px solid;
    border-color: transparent #4a99fa #4a99fa transparent;
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: default;
    .error{
      width: 7px;
      height: 7px;
      position: absolute;
      right: -7px;
      bottom: 5px;
      color: white;
    }
}
</style>
