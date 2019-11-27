<template>
  <div class="margin dealerlist">
    <el-form ref="form" :model="form" :rules="rules" label-width="140px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
            <div class="search-wrapper">
            <h4 class="title">邮件账户设置</h4>
            <div class="search-base">
            
            </div>
            </div>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            
            <el-row>
                <el-col :span="6" :offset="4">
                    <el-col :span="24">
                        <el-form-item label="邮箱账号:" prop="mailName">
                        <el-input v-model="form.mailName" placeholder="请填写客户名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="6" :offset="3">
                    <el-col :span="24">
                        <el-form-item label="邮箱显示名称:" prop="mailSn">
                        <el-input v-model="form.mailSn" placeholder="填写邮箱名称"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                
            </el-row>
            <el-row>
                <el-col :span="6" :offset="4">
                    <el-col :span="24">
                        <el-form-item label="SMTP服务器：" prop="SMTPserver">
                        <el-input v-model="form.SMTPserver" placeholder="例如：smtp.qq.com"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="6" :offset="3">
                    <el-col :span="24">
                        <el-form-item label="POP服务器：" prop="POPserver">
                        <el-input v-model="form.POPserver" placeholder="例如：pop.qq.com"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="6" :offset="4">
                    <el-col :span="24">
                        <el-form-item label="用户名：" prop="userName">
                        <el-input v-model="form.userName" placeholder="例如：smtp.qq.com"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
                <el-col :span="6" :offset="3">
                    <el-col :span="24">
                        <el-form-item label="密码：" prop="password" type="password">
                        <el-input v-model="form.password"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="6" :offset="4">
                    <el-col :span="24">
                        <el-form-item label="测试邮箱：" prop="testMail">
                        <el-input v-model="form.testMail"></el-input>
                        </el-form-item>
                    </el-col>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="2" :offset="11">
                    <el-button type="primary" size="small">保 存</el-button>  
                </el-col>                
          </el-row>
          </div>
        </div>
      </div>
 
    </el-form>
  </div>
</template>

<script>
import { getCategory, getStoreList } from "@/api/public";
import { customerDetailByid,addCustomer,editCustomer,exitsCustomer,getindustrySubcategory,getindustryCategory,
getCustomersoure,getintentionLevel,getbusinessType,getCustomerLevel,getprovince,getcity  } from "@/api/customer/index";
export default {
  data() {
    
 
   
    return {
      
      form: {
        mailName: "", //邮箱账号
        mailSn: "",//邮箱名称
        SMTPserver:'',//STMP服务器
        POPserver:'',//POP服务器
        userName:'',//用户名
        password:'',//密码
        testMail:'',//测试邮箱
        },
      rules: {
        mailName: [
          { required: true, message: "请填写邮箱账号", trigger: "blur" }
        ],
        mailSn:[
           { required: true, message: "请填写邮箱名称", trigger: "blur" } 
        ],
        userName:[
            { required: true, message: "请填写用户名", trigger: "blur" } 
        ],
        password:[
            { required: true, message: "请填写密码", trigger: "blur" } 
        ],
      
      }
    };
  },
  created() {
    this.action = this.baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile?'
    if(this.$route.query.id){
            this.state = this.$route.query.state
            this.customerId = this.$route.query.id
            customerDetailByid(this.customerId).then(res => {
             
            })
        }
  },
  mounted(){
      
  },
  methods: {
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
    padding-bottom: 40px;
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
    .el-form-item--medium .el-form-item__content{
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
  .el-upload--picture-card{
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
