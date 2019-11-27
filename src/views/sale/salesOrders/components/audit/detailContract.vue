<template>
    <div id="detailContract">
      <el-dialog width="72%" :visible.sync="detailVisible" :before-close="createClosing">  
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">查看销售合同</h4>
              </div>
            </el-form>
          </div>
        </div>
        <div class="mbottom">
          <div class="goods-fitter">
            <div class="search-base">
            <el-form ref="infoForm" :model="detailData1" :rules="rules" label-width="150px" size="small">
              <div class="search-wrapper">
                <div class="mbottom">
                  <h4 class="title1">合同信息</h4>
                </div>
                <div class="search-base">
                  <el-row>
                    <el-col :span="7">
                      <el-col>
                        <el-form-item label="合同类型：">
                          <el-col :span="19">
                            <span>销售订单合同</span>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="合同编号：">
                        <el-col :span="21">
                        
                           {{detailData1.contractNo}}
                          
                           
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="关联业务单号：">
                        <el-col :span="21">
                          
                           {{detailData1.businessNo}}
                        
                        
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="甲方：">
                          <el-col :span="19">
                            <el-input v-model="detailData1.acompanyName" readonly>
                            </el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="乙方：">
                        <el-col :span="19">
                          <el-input v-model="detailData1.bcompanyName" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>

                 
                  <el-row>
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="联系人：">
                          <el-col :span="19">
                            <el-input v-model="detailData1.acontact" readonly></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="联系人：">
                        <el-col :span="19">
                          <el-input v-model="detailData1.bcontact" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="联系电话：" >
                          <el-col :span="19">
                            <el-input v-model="detailData1.atel" readonly></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="联系电话：">
                        <el-col :span="19">
                          <el-input v-model="detailData1.btel" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="传真：">
                          <el-col :span="19">
                            <el-input v-model="detailData1.afax" readonly></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="传真：">
                        <el-col :span="19">
                          <el-input v-model="detailData1.bfax" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="邮箱：" >
                          <el-col :span="19">
                            <el-input v-model="detailData1.aemail" readonly></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="邮箱：">
                        <el-col :span="19">
                          <el-input v-model="detailData1.bemail" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                   <el-row>
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="地址：" >
                          <el-col :span="19">
                            <el-input v-model="detailData1.aaddress" readonly></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="地址：">
                        <el-col :span="19">
                          <el-input v-model="detailData1.baddress" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-form>
          </div>
          </div>
        </div>
         <div class="mail-fitter" style="margin-top:20px;margin-bottom:20px;">
            <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
              <div class="mail-wrapper">
                <h4 class="title1">产品清单</h4>
                <div class="search-base">
                  <div class="mbottom">
                    <div class="goods-fitter">
                      <div class="mcard" style="padding-bottom:0">
                        <el-table :data="detailData1.goodsDetailListVo" border style="width: 100%" stripe>
                          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                          <el-table-column prop="customerName" label="图样" align="center" width="100">
                                  <template slot-scope="scope">
                                        <img  :src="scope.row.goodsImgUrl" class="showImg" alt="" v-if="scope.row.goodsImgUrl"/>
                                        <img  src="@/common/images/缺省页.jpg" class="showImg" alt="" v-if="!scope.row.goodsImgUrl"/>
                                  </template>
                          </el-table-column>
                          <el-table-column prop="customerType" label="产品名称" align="center">
                                   <template slot-scope="scope">
                                        {{scope.row.goodsName}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactName" label="型号" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.goodsSn}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="税率" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.taxRate}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="数量" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.goodsCount}}
                                  </template>
                          </el-table-column>
                           <el-table-column prop="commonContactDept" label="不含税单价" align="center">
                                    <template slot-scope="scope">
                                       {{scope.row.notTaxPrice}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="税费" align="center">
                                    <template slot-scope="scope">
                                       {{scope.row.tax}}
                                  </template>
                          </el-table-column>
                            <el-table-column label="含税单价" align="center" width="100">
                                <template slot-scope="scope">
                                            {{scope.row.goodsPrice}}
                                </template>
                            </el-table-column>
                          <el-table-column prop="commonContactDept" label="总价" align="center">
                                <template slot-scope="scope">
                                        {{scope.row.totalPrice}}
                                  </template>
                          </el-table-column>
                          <el-table-column  align="center" label="收货地址" width="130">
                                  <template slot-scope="scope">
                                     <span >{{scope.row.deliveryAddress}}</span>
                                  </template>

                          </el-table-column>
                          <el-table-column label="设计稿" align="center"  width="100">
                                    <template slot-scope="scope">
                                          <span class="blue" @click="preview(scope.row)" v-show="scope.row.fileDesignDraftUrl">查看</span>
                                          <span  v-show="!scope.row.fileDesignDraftUrl">暂无设计稿</span>
                                    </template>                     
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="交货日期" align="center">
                                  <template slot-scope="scope">
                                        {{scope.row.deliveryCycle | dateTime}}
                                  </template>
                          </el-table-column>
                        </el-table>
                        <!-- <div class="pagination">
                          <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="tableDatas.currentPage"
                            :page-sizes="[10,20,50,100]"
                            :page-size="tableDatas.size"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="tableDatas.total"
                          ></el-pagination>
                        </div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-form>
          </div>
        <div class="goods-fitter">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="120px" size="small">
            <div class="search-wrapper">
              <div class="mbottom">
                <h4 class="title1">合同金额</h4>
              </div>
              <div class="search-base">
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="合同金额：">
                        <el-col :span="18">
                          <el-input v-model="detailData1.contractFactFee" readonly></el-input>
                        </el-col>
                        <span style="margin-left:5px;">元</span> 
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="结算方式：">
                      <el-col :span="19">
                        <el-select v-model="detailData1.settlementType" placeholder="请选择" style="width:100%" disabled>
                            
                                <el-popover
                                    placement="left"
                                    title="分期付款"
                                    width="300"
                                    trigger="hover"
                                    close-delay="0"
                                    transition="linear"
                                    content="合同生效后10日内，乙方即支付合同金额的10%即
                                            人民币壹佰圆圆整(小写：人民币【100.0000】元)
                                            作为预付款，剩余款项在甲方完成全部交货后支付">       
                                  
                                <el-option slot="reference" label="第一种：分两期支付" :value=1></el-option>
                                </el-popover>
                                <el-popover
                                    placement="left"
                                    title="一次性支付"
                                    width="300"
                                    trigger="hover"
                                    close-delay="0"
                                    transition="linear"
                                    content="所有货物经乙方验收确认后，乙方30个工作日内 一
                                            次性结清甲方全部货款">       
                                  
                                <el-option slot="reference" label="第二种：一次性支付" :value=2></el-option>
                                </el-popover>
                          </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="定金：">
                        <el-col :span="18">
                          <el-input v-model="detailData1.deposit" readonly></el-input>
                        </el-col>
                        <span style="margin-left:5px;">元</span> 
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="合同生效后：">
                      <el-col :span="16">
                        <el-input
                          v-model="detailData1.payLimitDay" readonly
                        ></el-input>
                      </el-col>
                      <span style="margin-left:5px;">日内支付</span> 
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="收款账户：">
                        <el-col :span="19">
                          <el-input v-model="detailData1.bankAccount" readonly>
                          </el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="户名：">
                      <el-col :span="19">
                        <el-input v-model="detailData1.bankName" readonly></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="开户行：">
                        <el-col :span="19">
                          <el-input v-model="detailData1.bankOpeningName" readonly></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="纳税号：">
                      <el-col :span="19">
                        <el-input v-model="detailData1.taxNumber" readonly></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="22">
                      <el-form-item label="发票项目内容：">
                          <el-input v-model="detailData1.invoiceContent" readonly></el-input>
                      </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>

         
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="createClose()" size="small">关 闭</el-button>
        </span>
      </el-dialog>
      <!-- 上传预览 -->
       <el-dialog :visible.sync="dialogVisible" :modal="true" :append-to-body="false">
                                        <img width="100%" :src="previewImg" alt="">
                                        <span slot="footer" class="dialog-footer"></span>
        </el-dialog>
    </div>
</template>

<script>
import { getErpGoods } from "@/api/product/index";
export default {
    data(){
        return{
            dialogVisible:false,
            previewImg:'',
            detailVisible:false,
             accountVisible: false, //选择收款账户
            partyVisible: false, //选择甲方弹窗
            addressVisible:false,//添加地址弹窗
            dataArr: [],
            detailData1:'',
             tableDatas: {
                currentPage: 1,
                sizes: [10, 20, 50, 100],
                size: 10,
                total: 0
                },
             form: {
                current_page: 0,
                page_size: 10,
                total_count: 0,
                contractNumber: "", //合同编号
                relevantBusiness: "", //关联业务单号
                partyA: "", //甲方
                partyB: "", //乙方
                partyAAddress: "", //甲方地址
                partyBAddress: "", //乙方地址
                partyAContacts: "", //甲方联系人
                partyBContacts: "", //乙方联系人
                partyANumber: "", //甲方联系电话
                partyBNumber: "", //乙方联系电话
                partyAFax: "", //甲方传真
                partyBFax: "", //乙方传真
                partyAMmail: "", //甲方邮箱
                partyBMmail: "", //乙方邮箱
                dateNum: "", //多少日内支付
                contractAmount: "", //合同金额
                settlement: "", //结算方式
                handsel: "", //定金
                paymentAccount: "", //收款账户
                accountName: "", //户名
                openingBank: "", //开户行
                taxNumber: "", //纳税号
                invoiceContent: "", //发票项目内容
                designs: "", //设计稿
                distributionAddress: "", //收货地址
                salesSheet: "", //询价单号
                customerName: "", //客户名称
                salesRepresentatives: "", //销售代表
                contacts: "", //联系人
                department: "", //部门
                phoneNumber: "", //电话号码
                mail: "", //邮箱
                mobilePhone: "", //手机号码
                invoiceType: "", //发票类型
                projectName: "", //项目名称
                address: "", //收货地址
                differentiation: "", //客户区分
                keywords: "" ,//关键词
                definition:'',//单位名称
                addressee:'',//收件人
                deposit:'',//支付定金
                invoiceType:'',//发票类型
            },
            formData: {
                current_page: 1,
                page_size: 2,
                total_count: 0
            },
            tableData: [],
                    rules: {
                partyA: [{ required: true, message: "此项为必选项", trigger:["blur","change"] }],
                
               
            }
        }
    },
     created() {
  },
    props:["detailVisibles","detailData"],
    watch: {
    detailVisibles(val) {
      this.detailVisible = val;
        },
    detailData(val){
      this.detailData1 =val
    }
    },
    methods:{
    //关闭页面
     createClose() {
      this.detailVisible= false;
      this.$emit("createClose3", this.detailVisible);
    },
     //预览
     preview(row){
      if(this.previewImg!==''||this.previewImg!==null){
          this.previewImg = row.fileDesignDraftUrl;
          this.dialogVisible = true;
      }   
    },
    createClosing() {
      this.detailVisible = false;
      this.$emit("createClosing3", this.detailVisible);
    },
    address(){

    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleChange() {}
    }
}
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
 #detailContract{
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
          font-size: 16px;
          color: 3333;
          padding-left: 10px;
          line-height: 1.4;
          border-left: 4px solid $themeColor;
          margin-bottom: 10px;
        }
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

    .el-input-group__append button.el-button {
      width:50px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
    }
    .el-input-number.is-controls-right .el-input-number__decrease {
      background: #fff !important;
    }
    .el-input-number.is-controls-right .el-input-number__increase {
      background: #fff !important;
    }
    .showImg{
      width:80px;
      height: 80px;
    }
    /deep/ .el-dialog__headerbtn{
      top:10px !important;
    }
     .blue{
        cursor: pointer;
        color: #4A99FA;
      }
 }
</style>