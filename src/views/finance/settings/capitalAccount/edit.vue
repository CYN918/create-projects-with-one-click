<template>
    <div class="gathering">
             <el-dialog width="40%" :visible.sync="editVisible" :before-close="createClosing">
                <div class="mbottom">
                    <div class="goods-fitter">
                    <el-form label-width="100px" size="small">
                        <div class="search-wrapper">
                        <h4 class="title">修改资金账户</h4>
                        </div>
                    </el-form>
                    </div>
                </div>
                <div class="mcard0">
                    <div class="mcard">
                    <el-form ref="infoForm" :model="form" :rules="rules" label-width="110px" size="small"> 
                  
                        <el-row>
                            <el-col :span="12">
                                <el-col :span="22">
                                    <el-form-item label="代码：" prop="payAcountId">                       
                                            <el-input v-model="form.code" placeholder="请输入代码"></el-input>                
                                    </el-form-item>
                                </el-col>
                            </el-col> 
                            <el-col :span="12">
                                <el-col :span="22">
                                    <el-form-item label="公司名称：">                        
                                                <el-input v-model="form.payAmount" placeholder="请输入公司名称">
                                            </el-input>                        
                                    </el-form-item>
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-col :span="22">
                                    <el-form-item label="开户行：" prop="payAcountId">                       
                                            <el-input v-model="form.payAmount" placeholder="请输入开户行"></el-input>                
                                    </el-form-item>
                                </el-col>
                            </el-col> 
                            <el-col :span="12">
                                <el-col :span="22">
                                    <el-form-item label="银行接口类型：">                        
                                           <el-select v-model="value" placeholder="请选择银行接口类型">
                                                <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                                </el-select>                      
                                    </el-form-item>
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-col :span="22">
                                    <el-form-item label="资金账号：">                       
                                            <el-input v-model="form.payAbstract" placeholder="请输入资金账号">
                                            </el-input>                 
                                    </el-form-item>
                                </el-col>
                            </el-col> 
                            <el-col :span="12">
                                <el-col :span="22">
                                    <el-form-item label="存款类型：">                        
                                           <el-select v-model="value" placeholder="请选择存款类型">
                                                <el-option
                                                    v-for="item in options"
                                                    :key="item.value"
                                                    :label="item.label"
                                                    :value="item.value">
                                                </el-option>
                                                </el-select>                      
                                    </el-form-item>
                                </el-col>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="23">
                                <el-form-item label="开户行地址：">                                           
                                        <el-input v-model="form.payAbstract" placeholder="请输入开户行地址">
                                        </el-input>                                    
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-form-item label="使用状态："> 
                              <el-radio-group v-model="radio">
                                <el-radio :label="3">启用</el-radio>
                                <el-radio :label="6">停用</el-radio>
                              </el-radio-group>  
                            </el-form-item>
                        </el-row>
                        <el-row>
                            <el-form-item label="账户类型："> 
                              <el-radio-group v-model="radio2">
                                <el-radio :label="3">对公账号</el-radio>
                                <el-radio :label="6">个人账号</el-radio>
                              </el-radio-group>  
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
             dialogImageUrl: '',
            dialogVisible: false,
            imgArr:[],
            editVisible:false,
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
            radio:'',//互斥单选框
            radio2:'',
            value:'',
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
    props:['editVisibles','saveNo',"payData"],
    watch:{
        editVisibles(val){
            this.editVisible = val   
        },
        saveNo(val){
            this.form.saleOrderNo = val;
        },
    },
    methods:{
        createClose() {
                this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                    this.editVisible = false;
                    this.$emit("createCloseE", this.editVisible);
                })
                .catch(_ => {});
        },
        createClosing() {
                 this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                    this.editVisible = false;
                    this.$emit("createClosingE", this.editVisible);
                })
                .catch(_ => {});
                
        },
        createSave(){

        },
       
    
      //新增收款
      createSave(){
          savePayment(this.form).then(res=>{
              if(res.code===200){
                  throttleTipPop(this, "success","新增收款成功！", 2000);  
                  this.editVisible = false;
                  this.$emit('editAccount1',this.editVisible)
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