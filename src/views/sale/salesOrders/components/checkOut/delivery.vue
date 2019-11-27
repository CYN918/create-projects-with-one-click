<template>
    <div class="delivery">
             <el-dialog width="35%" :visible.sync="deliveryVisible" :before-close="createClosing">
                <div class="mbottom">
                    <div class="goods-fitter">
                    <el-form label-width="100px" size="small">
                        <div class="search-wrapper">
                        <h4 class="title">发货</h4>
                        </div>
                    </el-form>
                    </div>
                </div>
                <div class="mcard0">
                    <div class="mcard">
                        <h4 class="title">发货信息</h4>
                    <el-form ref="infoForm" :model="form" label-width="95px" size="small"> 
                        <el-row>
                        <el-col :span="12">
                            <el-form-item label="出库单号：">                       
                                        <span>{{deliverData.shipmentBillNo}}</span>                        
                            </el-form-item>
                        </el-col> 
                        <el-col :span="12">
                            <el-form-item label="出货单号：">                       
                                        <span> {{deliverData.invoiceBillNo}}</span>                        
                            </el-form-item> 
                        </el-col>
                        </el-row>
                        <el-row>
                        <el-col :span="12">
                            <el-form-item label="客户名称：">                       
                                        <span>{{deliverData.customerName}}</span>                        
                            </el-form-item>
                        </el-col> 
                        <el-col :span="12">
                            <el-form-item label="销售单号：">                        
                                        <span>{{deliverData.saleOrderNo}}</span>                        
                            </el-form-item>
                        </el-col>
                        </el-row>
                        <el-row>
                        <el-col :span="12">
                            <el-form-item label="送货方式：">                       
                                <el-select v-model="deliverData.transportType" placeholder="请选择">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>                           
                            </el-form-item>
                        </el-col> 
                       <el-col :span="12">
                            <el-form-item label="物流公司：">                       
                                <el-select v-model="form.deliveryCompany" placeholder="请选择" filterable>
                                    <el-option
                                    v-for="(item,index) in logisticsList"
                                    :key="index"
                                    :label="item.name"
                                    :value="item.code">
                                    </el-option>
                                </el-select>                           
                            </el-form-item>
                        </el-col> 
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                            <el-form-item label="物流单号：">                       
                                <el-input v-model="form.deliveryNum">
                                  </el-input>                           
                            </el-form-item>
                        </el-col> 
                        </el-row>
                        <el-row>
                            <el-col :span="12">
                                <el-form-item label="附件：">                       
                                   <el-input v-model="form.logisticsNoFileUrl" readonly=""></el-input>                           
                                </el-form-item>
                            </el-col> 
                            <el-col :span="3" :offset="1">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile'"
                                    :show-file-list="false"
                                    ref="avatar1"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload">
                                    上传
                                </el-upload>
                            </el-col>
                            <el-col :span="3" :offset="1">
                            <el-button type="primary" size="small" @click="preview">查看</el-button>
                            </el-col>
                        </el-row>
                        <el-form-item label="备注：" prop="remark">                       
                                <el-input
                                    type="textarea"
                                    :rows="4"
                                    placeholder="请输入内容"
                                    v-model="form.remark">
                                </el-input>
                                    
                                            
                        </el-form-item>  
                        
                    </el-form>
                    
                    </div>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button type="danger" @click="createClose()" size="small">关 闭</el-button>
                    <el-button type="primary" @click="createSave()" size="small">发货</el-button>
                </span>
        </el-dialog>
        <!-- 查看附件 -->
     <el-dialog :visible.sync="dialogVisible" :modal="true" :append-to-body="false">
                                        <img width="100%" :src="form.logisticsNoFileUrl" alt="">
                                        <span slot="footer" class="dialog-footer"></span>
        </el-dialog>
    </div>
</template>

<script>
import {sendDeliverGoods}  from  '@/api/sale/index'
import { throttleTipPop } from "@/utils/functions.js";
export default {
    data(){
        return{
            dialogVisible:false,
            deliverData:'',
            deliveryVisible:false,
            form:{
                deliveryType:'',//送货方式
                deliveryCompany:'',//物流公司
                deliveryNum:"",//物流单号
                logisticsNoFileUrl:'',//附件
                remark:'',//备注
                id:'',//出货单ID
            },
            options:[
                {value:1,label:'公司配送'},
                {value:2,label:'物流配送'}
            ],
            logisticsList:[],
        }
    },
    props:['deliveryVisibles','logisticsData','deliverList','sendId'],
    watch:{
        deliveryVisibles(val){
            this.deliveryVisible = val
        },
        logisticsData(val){
            this.logisticsList =val;
        },
        deliverList(val){
            this.deliverData = val;            
        },
        sendId(val){
            this.form.id = val;
            console.log(this.form.id);
            
        }
    },
    methods:{
        createClose() {
        
            this.$confirm('您确认要关闭吗？')
                            .then(_ => {
                        this.deliveryVisible = false;
                        this.$emit("createCloseD", this.deliveryVisible);
                    })
                    .catch(_ => {});
        },
        createClosing() {
        
            this.$confirm('您确认要关闭吗？')
                            .then(_ => {
                        this.deliveryVisible = false;
                        this.$emit("createClosingD", this.deliveryVisible);
                    })
                    .catch(_ => {});
        },
        //附件上传成功后
        handleAvatarSuccess(file) {
         console.log(this.$refs.avatar1.$el.style.color);
         this.$refs.avatar1.$el.style.color="#fff";
         
         
         this.$message.success('上传设计稿成功！')
        this.form.logisticsNoFileUrl = file.data.domain + file.data.filePath;
      },
     //上传成功之前
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传的文件为图片格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传图片大小不能超过 5MB!');
        }
        return isJPG && isLt2M;
      },
      //预览
      preview(){
          this.dialogVisible = true;
      },
        createSave(){
            console.log(this.form.id);
            let obj ={};
            obj.logisticsCode = this.form.deliveryCompany;
            obj.logisticsNo  =this.form.deliveryNum;
            obj.logisticsNoFileUrl = this.form.logisticsNoFileUrl;
            obj.remark = this.form.remark;
            obj.shipmentBillId = this.form.id ;
            obj.transportType = this.deliverData.transportType;
            sendDeliverGoods(obj).then(res=>{
                if(res.code===200){
                    throttleTipPop(this, "success", "发货成功", 2000);
                    this.deliveryVisible = false;
                    this.$emit('deliveryGoods',this.deliveryVisible)
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
     //上传样式
    /deep/.upload-demo{
      /deep/ .el-upload{
          border: 0 !important;
      }
    }
    .avatar-uploader{
      border: 0;
      background:#4C86F4;
      color: #fff;
      text-align: center;
      border-radius: 3px;
      font-size:12px;
      position: relative;
      top: 1px;
      width: 56px;
      height: 32px;
      line-height: 32px;
      /deep/ .el-upload{
          border: 0 !important;
      }
    }
    //
</style>