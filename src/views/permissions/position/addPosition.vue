<template>
  <div class="margin dealerlist">
    <el-form ref="form" :model="form"  label-width="160px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" :content="content"></el-page-header>
            <!-- <el-button @click="back" type="primary" size="small" icon="el-icon-back">返回</el-button>
            <h4 class="title1">新增账户类型<span v-if="state==2">编辑</span></h4>-->
          </div>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper" :content="content">
            <h4 class="title">{{content}}</h4>
            <br />
             <el-row>
                <el-col :span="24">
                <el-form-item label="职位（岗位）名称：" class="is-required">
                    <el-col :span="24">
                       <el-input v-model="form.positionname" style='width:300px' placeholder='请输入职位名称'></el-input>
                    </el-col>
                </el-form-item>
                </el-col>
             </el-row>
            <el-row>
             <el-col :span="24">
              <el-form-item label="上级:">
                <treeselect
                  style='width:300px'
                  :options="options"
                  search-nested
                  placeholder="请选择上级"
                  v-model="form.parent"
                />
              </el-form-item>
             </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
              <el-form-item label="描述：">
                <el-input type="textarea"   style='width:300px' v-model="form.desc" placeholder='请输入简单描述'></el-input>
              </el-form-item>
                </el-col>
             </el-row>
             <el-form-item>
              <el-button @click="back" >取消</el-button>
              <el-button type="primary" @click="onSubmit">保存</el-button>
            </el-form-item>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import { getParent , addPosition , updatePosition , getPositionInfo } from "@/api/permissions/index";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
   components: {
    Treeselect
  },
   data() {
      return {
         action:'',
         content: "新增职位",
         form: {
             positionname:'',
             parent: null,
             desc:'',
             id:'',
        },
        options:[],         // 上级
        imageUrl: ''
      };
    },

  async created() {
      this.getParent()  // 获取上级
      this.form.id = this.$route.query.id
      if(  this.form.id  ){
        this.getPositionInfo() 
        this.content = '编辑职位'
      }
     
    //   this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
    //   if (this.$route.query.id) {
    //   this.content = "编辑位置";
    
    //   const  res = await  viewAccount( this.id )
    //       if(res.code === 200 ){
    //           this.form={
    //               accountCode:res.data.accountCode,
    //               accountName:res.data.accountName,
    //               accountLogo:res.data.accountLogo,
    //               accountSort:res.data.accountSort,
    //               accountType:res.data.accountType+"",
    //           }
    //       }
    // }

  },
  mounted() {},
  methods: {
    getParent(){
        getParent().then(res => {
          var  arr1 = [];
          arr1 = res.data ;
          this.transleteData1(arr1, this.options);
          this.IterationDelateMenuChildren1(this.options);
        });
    },
     transleteData1(data, arr) {
       data.forEach(item => {
      //  for( var i =0; i< item.length;i++ ){
        const msg = {
          id: item.positionId,
          label: item.positionName,
          value: item.positionId,
          children: item.childNodes ? [] : null,

          isLeaf: item.childNodes ? false : true
        };
     
        if (item.childNodes && item.childNodes.length > 0) {
          this.transleteData1(item.childNodes, msg.children);
        }
        arr.push(msg);
       //   }
        // if (!item.parentId) {
        //   item.parentId = -1;
        //   this.companyName = item.organizeName
        //   item.parentName = "所有部门";
        // }
       
      
      });
   
      return arr;
    },
     IterationDelateMenuChildren1(arr) {
      if (arr.length) {
        for (let i in arr) {
          if (arr[i].children.length) {
            this.IterationDelateMenuChildren1(arr[i].children);
          } else {
            delete arr[i].children;
          }
        }
      }
      return arr;
    },
    // 编辑获取信息
    getPositionInfo(){
       var data = {}
       data.positionId =  this.form.id 
       getPositionInfo(data).then( res => {
           this.form.positionname = res.data.positionName
           this.form.desc = res.data.description
           this.form.parent = res.data.parentId
       })
    },
    // 保存
    async onSubmit() {
        if( !this.form.positionname ){
            this.$message({
              message: '职位（岗位）名称不能为空',
              type: 'warning'
            });
            return 
        }
        const obj={}
        obj.positionName = this.form.positionname
        obj.description = this.form.desc
        obj.parentId = this.form.parent
        obj.positionId = this.form.id
        
        
        if( this.form.id ){
          var res = await  updatePosition(obj)
        }else{
          var res = await  addPosition(obj)
        }
       
        if(res.code === 200 ){
          this.$router.go(-1);
          if(this.form.id){
              this.$message({
                  type:'success',
                  message:'编辑成功'
              })
          }else{
              this.$message({
                  type:'success',
                  message:'新增成功'
              })
          }
        }else{
            if(this.form.id){
                this.$message({
                    type:'warning',
                    message:'编辑失败'
                })
            }else{
                this.$message({
                    type:'warning',
                    message:'新增失败'
                })
            }

        }
    },
    // 返回
    back() {
      this.$router.go(-1);
    }
  },
};
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
  .search-wrapper1 {
    padding: 20px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    display: flex;
    align-items: center;
    .title1 {
      display: flex;
      margin-left: 40%;
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
.btn {
  margin-left: 42%;
  margin-top: 10px;
}
.dealerlist {
  // position: absolute;
  // left: 0;
  // right: 0;
  // top: 91px;
  // bottom: 0;
  .form {
    width: 100%;
    min-width: 400px;
    .el-form-item--medium .el-form-item__content {
      display: flex;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .el-upload--picture-card {
    font-size: 28px;
    color: #8c939d;
    width: 148px;
    height: 148px;
    line-height: 148px;
    text-align: center;
  }
  .avatar {
    width: 148px;
    height: 148px;
    display: block;
  }
}
</style>
