<template>
    <div class="gathering">
             <el-dialog width="40%" :visible.sync="addVisible" :before-close="createClosing">
                <div class="mbottom">
                    <div class="goods-fitter">
                    <el-form label-width="100px" size="small">
                        <div class="search-wrapper">
                        <h4 class="title">新增收款记录</h4>
                        </div>
                    </el-form>
                    </div>
                </div>
                <div class="mcard0">
                    <div class="mcard">
                        <h4 class="title">新增销售收入记录</h4>
                    <el-form ref="infoForm" :model="form" :rules="rules" label-width="95px" size="small"> 
                        <el-row>
                        <el-col :span="12">
                            <el-form-item label="销售单号：">                       
                                        <span>{{form.saleOrderNo}}</span>                        
                            </el-form-item>
                        </el-col> 
                        <el-col :span="12">
                            <el-form-item label="收款类型：">                       
                                        <el-select v-model="form.payType">
                                                <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                        </el-select>                      
                            </el-form-item> 
                        </el-col>
                        </el-row>
                        <el-row>
                        <el-col :span="12">
                            <el-col :span="22">
                                <el-form-item label="资金账户：" prop="payAcountId">                       
                                        <el-select v-model="form.payAcountId" @change="chooseAcount">
                                                <el-option
                                                    v-for="item in payData"
                                                    :key="item.accId"
                                                    :label="item.accountNickName"
                                                    :value="item.accId">
                                                </el-option>
                                        </el-select>                      
                                </el-form-item>
                            </el-col>
                        </el-col> 
                        <el-col :span="12">
                            <el-col :span="22">
                                <el-form-item label="收款金额：">                        
                                            <el-input v-model="form.payAmount">
                                        </el-input>                        
                                </el-form-item>
                            </el-col>
                        </el-col>
                        </el-row>
                        <el-row>
                        <el-col :span="12">
                            <el-col :span="22">
                                <el-form-item label="摘要：">                       
                                        <el-input v-model="form.payAbstract">
                                        </el-input>                 
                                </el-form-item>
                            </el-col>
                        </el-col> 
                       <el-col :span="12">
                           <el-col :span="22">
                                <el-form-item label="收款时间：" prop="payTime">                       
                                     <el-date-picker
                                        v-model="form.payTime"
                                        type="date"
                                        placeholder="选择日期"
                                        style="width:100%"
                                        valueFormat='yyyy-MM-dd HH:mm:ss'
                                        :picker-options="pickerOptions0">
                                        </el-date-picker>                 
                                </el-form-item>
                           </el-col>
                        </el-col> 
                        </el-row>
                        <el-row>
           
                            <el-form-item label="收款凭证：">                       
                                <el-upload
                                          :action="baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile'"
                                          list-type="picture-card"
                                          :on-preview="handlePictureCardPreview"
                                          :on-remove="handleRemove"
                                          :on-success="handleSuccess"
                                          :on-exceed="handleExceed"
                                          :limit="1">
                                          <i>收款凭证</i>
                                  </el-upload>
                                    <el-dialog :visible.sync="dialogVisible" :modal="true" :append-to-body="true">
                                    <img width="100%" :src="dialogImageUrl" alt="">
                                    <span slot="footer" class="dialog-footer"></span>
                                    </el-dialog>                           
                         </el-form-item>                
                        </el-row>
                    </el-form>
                    
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="danger" @click="createClose()" size="small">关 闭</el-button>
                    <el-button type="primary" @click="createSave()" size="small">提 交</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
import {savePayment} from '@/api/sale/index';
import { throttleTipPop } from "@/utils/functions.js";
export default {
    data(){
        return{
            pickerOptions0: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
            },
             dialogImageUrl: '',
            dialogVisible: false,
            imgArr:[],
            addVisible:false,
            form:{
                payAcountno:'',//资金账户\
                payAcountId:'',//资金账户ID
                payType:'',//收款类型
                payTime:'',//收款时间
                payAmount:'',//收款金额
                payAbstract:"",//摘要
                payVoucher:'',
                saleOrderNo:'',
            },
            options:[
                {value:0,label:'预收定金'},
                {value:1,label:'尾款'},
                {value:2,label:'贷款'}
            ],
            options2:[
                {value:1,label:'百事达'},
                {value:2,label:'华美贵'},
                {value:3,label:'天翼'},
                {value:4,label:'华通'},
      
            ],
            rules: {
                payAcountId: [{ required: true, message: "此项为必填项", trigger: ["blur",'change'] }],
                payTime: [
                { required: true, message: "此项为必填项", trigger: ["blur",'change']  }
                ],
            }
        }
    },
    props:['addVisibles','saveNo',"payData"],
    watch:{
        addVisibles(val){
            this.addVisible = val   
        },
        saveNo(val){
            this.form.saleOrderNo = val;
        },
    },
    methods:{
        createClose() {
        
            this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                    this.showIndex = '';
                    this.addVisible = false;
                    this.$emit("createCloseA", this.addVisible);
                })
                .catch(_ => {});
        },
        createClosing() {
        
                this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                    this.addVisible = false;
                    this.$emit("createClosingA", this.addVisible);
                })
                .catch(_ => {});
        },
        createSave(){

        },
         //上传成功
       handleSuccess(data) {  
          throttleTipPop(this, "success","上传凭证成功！", 2000);  
        let path = data.data.domain+data.data.filePath
        var arrs = []
        this.imgArr.push(path);
        arrs = this.imgArr;
        
        var strs = new Array(); //定义一数组
        strs = arrs.join('##');;
        this.form.payVoucher = strs;
      },
      //预览
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //删除
       handleRemove(file) {
         deleteImg(file.response.data.filePath).then(res=>{           
              
              
        })
         this.deletePath = file.response.data.domain +file.response.data.filePath;
         let arr=[];
         arr = this.form.payVoucher.split('##');
         const index = arr.findIndex(item=> item===this.deletePath);     
         arr.splice(index,1);
         this.form.payVoucher = arr;
         this.form.payVoucher = this.form.payVoucher.join('##');
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制上传一个文件`);
      },
      chooseAcount(data){
          let obj = {};
          obj = this.payData.find((item)=>{
            return item.accId === data;
        });
        this.form.payAcountno = obj.accountNickName;
      },
      //新增收款
      createSave(){
          savePayment(this.form).then(res=>{
              if(res.code===200){
                  throttleTipPop(this, "success","新增收款成功！", 2000);  
                  this.addVisible = false;
                  this.$emit('payment',this.addVisible)
              }
          })
      }
     
    }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.search-wrapper {
    padding: 20px;
    padding-bottom: 10px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    .title {
      margin-left: -20px;
      font-size: 16px;
      color: 3333;
      padding-left: 10px;
      line-height: 1.4;
      border-left: 4px solid $themeColor;
      margin-bottom: 10px;
    }
    .title1{
      margin-left: -20px;
      font-size: 14px;
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
  .mcard0 {
    border: 1px solid #d7e0f1;
    margin-top: 20px;
  }
  /deep/ .el-dialog__headerbtn{
      top:10px;
    }
</style>