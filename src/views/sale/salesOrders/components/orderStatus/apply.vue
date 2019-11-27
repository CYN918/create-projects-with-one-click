<template>
 <div id="applied">
  <el-dialog width="60%" :visible.sync="contractVisible"
 :before-close="closing">
 <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">售后申请</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">   
            <el-row>
            <el-col :span="21">
                <ul class="clearfix">
            <!-- 待生成合同pendingContract -->
                    <li class ="link" @click="tabIndex0(0)"  :class="currentIndex0===0 ? 'active' : ''">第一次客诉</li>
                
                </ul>
            </el-col>
            <el-col :span="3">
                <el-button type="primary" >添加客诉</el-button>
            </el-col>
            </el-row>
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="120px">
            <div class="search-wrapper">
            
              <div class="search-base">
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="售后要求：">
                        <el-col :span="23">
                          <el-input v-model="form.serviceRequire">
                           
                          </el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="提出时间：">
                      <el-col :span="23">
                            <el-date-picker
                            v-model="form.advanceTime"
                            type="date"
                            valueFormat='yyyy-MM-dd HH:mm:ss'
                            placeholder="选择日期"
                            style="width:100%">
                            </el-date-picker>

                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="退货：" prop="reGoods">
                        <el-col :span="23">
                          <el-input v-model="form.reGoods">
                           
                          </el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="处理截止时间：" prop="deadline">
                      <el-col :span="23">
                         <el-date-picker
                            v-model="form.deadline"
                            type="date"
                            valueFormat='yyyy-MM-dd HH:mm:ss'
                            placeholder="选择日期"
                            style="width:100%">
                            </el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="赔偿金额：" prop="indemnity">
                        <el-col :span="23">
                          <el-input v-model="form.indemnity"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="处理要求：">
                      <el-col :span="23">
                        <el-select v-model="form.proDemand" placeholder="请选择"
                        style="width:100%">
                            <el-option
                            label="仓库先收到退回商品马上补寄"
                            value="1">
                            </el-option>
                             <el-option
                            label="先快递一个新的给客户,在继续跟进退货"
                            value="2">
                            </el-option>
                             <el-option
                            label="仓库收到退件退给供应商补寄到仓库后在补寄给客户"
                            value="3">
                            </el-option>
                             <el-option
                            label="直接退回供应商并扣除此商品货款"
                            value="4">
                            </el-option>
                             <el-option
                            label="直接退回供应商后由供应商补寄"
                            value="5">
                            </el-option>
                              <el-option
                            label="让供应商先补寄后，再退回不良商品"
                            value="6">
                            </el-option>
                              <el-option
                            label="申请财务付款"
                            value="7">
                            </el-option>

                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="快递费：" prop="expressFee">
                        <el-col :span="23">
                          <el-select v-model="form.expressFee" placeholder="请选择"
                          style="width:100%">
                            <el-option
                            label="客服承担快递费，并以支付"
                            value="1">
                            </el-option>
                             <el-option
                            label="客服承担快递费，未支付"
                            value="2">
                            </el-option>
                             <el-option
                            label="公司承担快递费"
                            value="3">
                            </el-option>
                             <el-option
                            label="供应商承担快递费"
                            value="4">
                            </el-option>
                             <el-option
                            label="快递公司承担快递费"
                            value="5">
                            </el-option>
                         

                        </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row>

                    <el-col>
                      <el-form-item label="故障描述：" prop="faDescription">
                        <el-col :span="23">
                          <el-input v-model="form.faDescription"
                           type="textarea"
                            :autosize="{ minRows: 2, maxRows: 4}">
                            </el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
 
                </el-row>
                <el-row>
                  <el-col :span="21">
                    <el-col>
                      <el-form-item label="上传附件：" prop="attachment">                  
                        <div class="market_out">
                           <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                            </el-upload>
                            <el-dialog :visible.sync="dialogVisible">
                            <img width="100%" :src="dialogImageUrl" alt="">
                            </el-dialog>
                        </div>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
             
                <el-row>
                    <el-col :span="12">
                    <el-col>
                      <el-form-item label="推送处理人：" prop="pushHandler">
                        <el-col :span="6">
                          <el-input v-model="form.purchase" placeholder="采购：xxx"></el-input>
                        </el-col>
                        <el-col :span="16" :offset="1">
                          <el-input v-model="form.supplier" placeholder="供应商：xxx"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                   <el-col :span="12">
                    <el-col>
                      <el-form-item label="推送提醒：" prop="attachment">
                        <el-col :span="12">
                          <el-input v-model="form.service" placeholder="服务商：xxx"></el-input>
                        </el-col>
                        <el-col :span="10" :offset="1">
                          <el-input v-model="form.customer" placeholder="客户：xxx"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-col>
                        <el-form-item label="客服人员：" prop="attachment">
                            <el-col :span="23">
                            <el-input v-model="form.callCentere" placeholder="黄某某"></el-input>
                            </el-col>
                            
                        </el-form-item>
                        </el-col>
                    </el-col>
                     <el-col :span="12">
                        <el-col>
                        <el-form-item label="客服提交人员：" prop="attachment">
                            <el-col :span="23">
                            <el-input v-model="form.cssPersonnel" placeholder="黄某某"></el-input>
                            </el-col>
                            
                        </el-form-item>
                        </el-col>
                    </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="applyClose" size="small">关 闭</el-button>
        <el-button type="primary" @click="applySave" size="small">保存</el-button>
      </span>
    </el-dialog>
 </div>
</template>

<script>
export default {
    data(){
      return{
        dialog:[],
        dialogImageUrl: '',
        dialogVisible: false,
        currentIndex0:0,
        contractVisible:false,
        form:{
         serviceRequire:'',//售后要求
         advanceTime:'',//提出时间
         reGoods:'',//退货
         deadline:'',//处理截止时间
         indemnity:'',//赔偿金额
         proDemand:'',//处理要求
         expressFee:'',//快递费
         faDescription:'',//故障描述
         attachment:'',//上传附件
         purchase:'',//采购
         supplier:'',//供应商
         service:'',//服务商
         customer:'',//客户
         callCenter:'',//客服人员
         cssPersonnel:'',//客服提交人员
                 },
        fileList: [],
        tableData:[],
        rules:{
        companyName: [
            {required: true, message: '此项为必选项', trigger: 'blur'}
          ],
         idNumber: [
            {required: true, message: '此项为必选项', trigger: 'blur'}
          ],
         reAddress: [
            {required: true, message: '此项为必选项', trigger: 'blur'}
          ],
         openingBank: [
            {required: true, message: '此项为必选项', trigger: 'blur'}
          ],
         bankAccount: [
            {required: true, message: '此项为必选项', trigger: 'blur'}
          ],
        }
      }
    },
    props:['app'],
    watch:{
        app(val){
     
            this.contractVisible = val
          }

    },
    methods:{
      applyClose(){
        this.contractVisible =false
        this.$emit('close',this.contractVisible)
      },
      closing(){
        this.contractVisible =false
        this.$emit('beClose',this.contractVisible)
      },
      applySave(){
       
        
      },
      handlePictureCardPreview(file){
        
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
        
      },
     handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      upLoad(){
          console.log(this.fileList);
          
      },
        handleSizeChange(){

      },
      handleCurrentChange(){

      },
      handleSelectionChange(){
        
      },
      handleChange(){

      }
    }
}
</script>


<style lang="scss" >
@import "@/common/scss/variable.scss";
#applied{
    .goods-fitter {
        .clearfix {
                .link {
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
        }
        }
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
        .title1 {
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
    //
    .line-div {
    display: flex;
    justify-content: space-around;
    margin-left: 8px;
    }
    .line {
    display: flex;
    justify-content: flex-start;
    }
    .small_top {
    margin-top: 10px;
    }

    .i-div {
    cursor: pointer;
    }
    .margin1 {
    padding-left: 40px;
    padding-top: 20px;
    box-sizing: border-box;
    }
    .mail-fitter {
    .mail-wrapper {
        padding: 20px;
        padding-bottom: 0;
        border: 1px solid rgb(215, 224, 241);
        background: #fff;
        .title1 {
        margin-left: -20px;
        font-size: 16px;
        font-weight: 400;
        color: 3333;
        padding-left: 10px;
        line-height: 1.4;
        border-left: 4px solid $themeColor;
        margin-bottom: 23px;
        }
    }
    }
    .box{
    margin-left: 12px;
    margin-top:10px;
    }
    .link{
        padding:0 10px;
        text-align: center;
    }

    .center{
    margin-left: 30px;
    }
    .showImg{
        float:left; 
        width:61px;
        height:61px;
        border: 1px solid #D7E0F1;
        margin-right:10px;
        border-radius: 6px;
        img{
            width:100%;
            height:100%;
        }
    }
    //修改elementUI样式
    .market_out{
        
        .el-upload-list--picture-card .el-upload-list__item {
            overflow: hidden;
            background-color: #fff;
            border: 1px solid #c0ccda;
            border-radius: 6px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            width: 61px !important;
            height: 61px !important;  
            margin: 0 8px 8px 0;
            display: inline-block;
                }
    .el-upload {
        display: inline-block;
        text-align: center;
        cursor: pointer;
        outline: none;
        position: relative !important;
        width: 61px !important;
        height: 61px !important;
        }
    .el-upload--picture-card i {
        font-size: 16px;
        color: #8c939d;
        position: absolute !important;
        top:50% !important;
        left:50% !important;
        margin-left:-8px !important;
        margin-top:-8px !important;
    }
    }
}
</style>
