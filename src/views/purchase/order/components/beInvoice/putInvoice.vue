<template>
  <div id="toInvioce">
    <el-dialog width="73%" :visible.sync="addVisible" :before-close="createClosing">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">待收票</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form ref="infoForm" :model="pageData" :rules="rules" label-width="120px" size="small">
            <div class="search-wrapper">
              <div class="mbottom">
                <h4 class="title1">收票公司信息</h4>
              </div>
              <div class="search-base">
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="发票类型：" prop="invoiceType">
                        <el-col :span="19">
                          <el-select v-model="pageData.invoiceType" placeholder="请选择"
                          style="width:100%;">
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="发票抬头：" prop="invoiceRise">
                      <el-col :span="19">
                        <el-select v-model="pageData.invoicePayable" placeholder="请选择"
                        style="width:100%;">
                          <el-option
                              v-for="item in options1"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  
                </el-row>
                <div class="tips">
                    我公司依法开具发票，如你购买的商品按税法规定属于不得从增值税销项税额中抵扣的项目
                    <br />（如集体福利或个人消费等），请选择普通发票
                  </div>

                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="单位名称：" prop="companyName">
                        <el-col :span="19">
                          <el-input v-model="pageData.targetName" placeholder="请输入单位名称"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="纳税人识别号：" prop="taxNum">
                      <el-col :span="19">
                        <el-input v-model="pageData.taxNumber" placeholder="或统一社会信用代码"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="开户银行：" prop="openBank">
                        <el-col :span="19">
                          <el-input v-model="pageData.bankOpeningName"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="银行账户：" prop="bankAccount">
                      <el-col :span="19">
                        <el-input v-model="pageData.bankAccount"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="注册电话：" prop="reTel">
                        <el-col :span="19">
                          <el-input v-model="pageData.tel"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="注册地址：" prop="reAddress">
                      <el-col :span="19">
                        <el-input v-model="pageData.address"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                 <el-row>  
                    <el-col>
                      <el-form-item label="开票内容：" prop="invoiceContent">
                        <el-col :span="22">
                          <el-input v-model="pageData.invoiceContent"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="goods-fitter">
        <el-form ref="infoForm" :model="form" :rules="rules" label-width="120px" size="small">
          <div class="search-wrapper">
            <div class="mbottom">
              <h4 class="title1">发票详情</h4>
            </div>
            <div class="search-base">
              <div class="inner">
                <div class="invoice_title">
                  <i class="star">*</i>
                  <span>开票内容：</span>
                </div>
                <div class="btn" @click="btn1" :class="this.orderIndex===1?'active':''">
                  订单详细
                  <div class="delta" v-if="this.orderIndex===1">
                    <i class="el-icon-check"></i>
                  </div>
                </div>
                <div class="btn" @click="btn2" :class="this.orderIndex===2?'active':''">
                  开票明细
                  <div class="delta" v-if="this.orderIndex===2">
                    <i class="el-icon-check"></i>
                  </div>
                </div>
              </div>
              <div class="goods-fitter" v-if="this.orderIndex===1">
                <div class="mcard" style="padding-bottom:0">
                  <el-table :data="pageData.goodsDetailList1" border style="width: 100%" stripe>
                    <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                    <el-table-column
                      prop="name"
                      label="采购单号"
                      align="center"
                      width="120"
                    >
                      <template slot-scope="scope">
                          {{scope.row.purchaseOrderNo}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactName" label="商品名称" align="center" width="180">
                        <template slot-scope="scope">
                          {{scope.row.goodsName}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="规格型号" align="center">
                          <template slot-scope="scope">
                          {{scope.row.specSize}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="单位" align="center"  width="100">
                        <template slot-scope="scope">
                          {{scope.row.goodsUnit}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="数量" align="center"  width="100">
                      <template slot-scope="scope">
                          {{scope.row.goodsCount}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="不含税单价" align="center"  width="100">
                      <template slot-scope="scope">
                          {{scope.row.notTaxPrice}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="含税单价" align="center"  width="100">
                      <template slot-scope="scope">
                          {{scope.row.goodsPrice}}
                      </template>
                    </el-table-column>
                   <!--  <el-table-column prop="commonContactDept" label="不含税金额" align="center"  width="100">
                        <template slot-scope="scope">
                          无
                      </template>
                    </el-table-column> -->
                    <el-table-column prop="commonContactDept" label="税率" align="center" width="100">
                        <template slot-scope="scope">
                          {{scope.row.taxRate}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="税额" align="center"  width="100">
                        <template slot-scope="scope">
                          {{scope.row.tax}}
                      </template>
                    </el-table-column>
                    <el-table-column label="含税合计" align="center">
                      <template slot-scope="scope">
                          {{scope.row.totalPrice}}
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="100">
                      <template slot-scope="scope">
                        <div class="txt_blue">
                          <span class="operate" @click="add1(scope.row,scope.$index)">添加</span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- <div class="total" style="margin-left:80%;margin-top:20px">
                    <el-form label-width="130px" size="small">
                      <el-form-item label="总合计：">
                        <el-col :span="24">
                             <el-input v-model="total1"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-form>
                  </div> -->
                </div>
              </div>
             <div class="goods-fitter" v-if="this.orderIndex===2">
                <div class="mcard" style="padding-bottom:0">
                  <el-table :data="pageData.goodsDetailList2" border style="width: 100%" stripe>
                    <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>

                    <el-table-column prop="commonContactName" label="商品名称" align="center" width="180">
                        <template slot-scope="scope">
                         <div v-if="showIndex!==scope.$index"> {{scope.row.goodsName}}</div>
                         <el-input 
                          type="textarea"
                          :autosize="{ minRows: 1, maxRows: 5}"
                          placeholder="请输入内容"
                         v-if="showIndex===scope.$index" 
                         v-model="scope.row.goodsName"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="规格型号" align="center">
                          <template slot-scope="scope">
                          {{scope.row.specSize}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="单位" align="center"  width="100">
                        <template slot-scope="scope">
                          {{scope.row.goodsUnit}}
                      </template>
                    </el-table-column>
                    
                    <el-table-column prop="commonContactDept" label="数量" align="center" width="100">
                      <template slot-scope="scope">
                         <div v-if="showIndex!==scope.$index"> {{scope.row.goodsCount}}</div>
                         <el-input v-if="showIndex===scope.$index" v-model="scope.row.goodsCount" size="small"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="不含税单价" align="center" width="100">
                      <template slot-scope="scope">
                          {{scope.row.notTaxPrice}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="含税单价" align="center" width="100">
                        <template slot-scope="scope">
                          {{scope.row.goodsPrice}}
                      </template>
                    </el-table-column>
                  <!--   <el-table-column prop="commonContactDept" label="不含税金额" align="center" width="100">
                        <template slot-scope="scope">
                          无
                      </template>
                    </el-table-column> -->
                    <el-table-column prop="commonContactDept" label="税率" align="center" width="100">
                        <template slot-scope="scope">
                          {{scope.row.taxRate}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="税额" align="center"  width="100">
                        <template slot-scope="scope">
                          {{scope.row.tax}}
                      </template>
                    </el-table-column>
                    <el-table-column label="含税合计" align="center">
                      <template slot-scope="scope">
                          {{scope.row.totalPrice}}
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="130" >
                      <template slot-scope="scope">
                        <div class="txt_blue">
                          <span class="operate" @click="edit(scope.row,scope.$index)">编辑</span>
                          <span class="operate" @click="delete1(scope.row,scope.$index)">删除</span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="total" style="margin-left:80%;margin-top:20px">
                    <el-form label-width="130px" size="small">
                      <el-form-item label="开票合计：">
                        <el-col :span="24">
                             <el-input v-model="total1"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form>

        <!-- <div class="mail-fitter" style="margin-top:20px">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="140px" size="small">
            <div class="search-wrapper">
              <div class="mbottom">
                <h4 class="title1">开票公司信息</h4>
              </div>
              <div class="search-base">
                <el-row>
                  <el-col :span="8">
                    <el-col>
                      <el-form-item label="销售单号：">
                        <el-col :span="19">
                          VT201908260004
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="对应核销客户名称：">
                      <el-col :span="19">
                          平安银行股份有限公司
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="销售单号：">
                      <el-col :span="19">
                          SO201908260004
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="供应商名称：" prop="supplierName">
                        <el-col :span="19">
                          <el-input v-model="form.supplierName"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="开票公司：" prop="invoiceCompany">
                      <el-col :span="19">
                        <el-select  v-model="form.company"  placeholder="请选择" style="width:100%">
                          <el-option 
                                  v-for="(item,index) in companyList"
                                  :key="index"
                                  :label="item.sccCompanyName"
                                  :value="index">
                                </el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="纳税人识别号：" prop="customerTaxNumber">
                        <el-col :span="19">
                          <el-input v-model="form.customerTaxNumber">
                          </el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="开 户 行：" prop="customerOpenBank">
                      <el-col :span="19">
                        <el-input v-model="form.customerOpenBank"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="银行账号：" prop="customerBankAccount">
                        <el-col :span="19">
                          <el-input v-model="form.customerBankAccount"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="注册电话：" prop="customerReTel">
                      <el-col :span="19">
                        <el-input v-model="form.customerReTel"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="开票状态：" prop="invoiceStatus">
                       <el-col :span="19">
                          <el-select v-model="form.invoiceStatus" placeholder="请选择" style="width:100%">
                          <el-option label="深圳市迈戈实业有限公司" value=1></el-option>
                          <el-option label="第二种：全额支付" value=2></el-option>
                        </el-select>
                      </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="开票日期：" prop="invoiceDate">
                        <el-col :span="19">
                            <el-date-picker
                              v-model="form.invoiceDate"
                              type="date"
                              placeholder="选择日期"
                              valueFormat='yyyy-MM-dd HH:mm:ss'
                              style="width:100%">
                            </el-date-picker>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="22">
                    <el-col>
                      <el-form-item label="发票编号：" prop="invoiceNumber">
                          <el-input
                            v-model="form.invoiceNumber">
                          </el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                  <el-row>
                  <el-col :span="24">
                    <el-form-item label="发票凭证：" prop="invoiceVoucher">
                      <el-col :span="22">
                       <el-upload
                          action="https://jsonplaceholder.typicode.com/posts/"
                          list-type="picture-card"
                          :on-preview="handlePictureCardPreview"
                          :on-remove="handleRemove">
                          <i >发票凭证</i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible" :modal="false" :append-to-body="false">
                          <img width="100%" :src="dialogImageUrl" alt="">
                          <span slot="footer" class="dialog-footer">
                            
                          </span>
                      </el-dialog>

                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-col>
                      <el-form-item label="备注：" prop="remark">
                        <el-col :span="22">
                          <el-input
                            type="textarea"
                            :autosize="{ minRows: 5, maxRows: 5}"
                            placeholder="请输入内容"
                            v-model="form.remark">
                          </el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
        <div class="mail-fitter" style="margin-top:20px">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="120px" size="small">
            <div class="search-wrapper">
              <div class="mbottom">
                <h4 class="title1">收票人信息</h4>
              </div>
              <div class="search-base">
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="收票人姓名：" prop="checkTaker">
                        <el-col :span="19">
                          <el-input v-model="form.checkTaker"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="收票人手机：" prop="checkTakerPhone">
                      <el-col :span="19">
                          <el-input v-model="form.checkTakerPhone"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-col>
                      <el-form-item label="所在地区：" prop="location">
                          <el-col :span="4">  
                             <el-select v-model="form.location" placeholder="请选择省">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                          </el-col>
                          <el-col :span="4" :offset="1">
                              <el-select v-model="value" placeholder="请选择市">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                          </el-col>
                          <el-col :span="4" :offset="1">
                              <el-select v-model="value" placeholder="请选择区">
                                <el-option
                                  v-for="item in options"
                                  :key="item.value"
                                  :label="item.label"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                          </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="详细地址：" prop="detailedAddress">
                          <el-col :span="22">
                          <el-input
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 4}"
                            placeholder="详细地址，街道，门牌号等"
                            v-model="form.detailedAddress">
                          </el-input>
                        </el-col>
                    </el-form-item>
                </el-row>
              <div class="inner1">
                <div class="invoice_title1">
                
                  <span>发票须知：</span>
                </div>
                <div class="invoice_content">
                    <span>1.因发货仓库所在地货权归属政策原因，订单可能为您拆分开具多张发票</span><br/>
                    <span>2.单笔订单只支持开具一种类型的发票</span><br/>
                    <span>3. 开票金额为用户实际支付的金额</span>
                </div>
              </div>
              </div>
            </div>
          </el-form>
        </div> -->
        
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="createClose()" size="small">关 闭</el-button>
        <el-button type="primary" @click="saveInvoice()" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getErpGoods } from "@/api/product/index";
import {saveInvoiceInfo} from '@/api/purchase/index'
import { throttleTipPop } from "@/utils/functions.js";

export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      addVisible: false,
      accountVisible: false, //选择收款账户
      partyVisible: false, //选择甲方弹窗
      addressVisible: false, //添加地址弹窗
      dataArr: [],
      orderIndex: 1,
      province:'',//省
      companyList:'',
      pageData:{},
      showIndex:'',
      tableDatas: {
        currentPage: 1,
        sizes: [10, 20, 50, 100],
        size: 10,
        total: 0
      },
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: '',
      form: {
        current_page: 0,
        page_size: 10,
        total_count: 0,
        invoiceType:'',//发票类型
        invoiceRise:'',//发票抬头
        companyName:'',//单位名称
        taxNum:'',//纳税识别号
        openBank:'',//开户行
        bankAccount:'',//银行账户
        reTel:'',//注册电话
        reAddress:'',//注册地址
        invoiceCompany:'',//开票公司
        supplierName:'',//供应商名称
        invoiceDate:'',//开票日期
        customerTaxNumber:'',//客户纳税识别号
        customerOpenBank:'',//客户开户行
        customerReTel:'',//客户注册电话
        invoiceStatus:'',//开票状态
        invoiceVoucher:'',//发票凭证
        invoiceNumber:'',//发票编号
        remark:'',//备注
        checkTaker:'',//收票人姓名
        checkTakerPhone:'',//收票人电话
        location:'',//所在地区
        detailedAddress:'',//详细地址
        company:'',
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "张小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ],
      formData: {
        current_page: 1,
        page_size: 2,
        total_count: 0
      },
       options: [{
          value: 1,
          label: '增值税专用发票'
        }, {
          value: 2,
          label: '普通发票'
        },],
         options1: [{
          value: '0',
          label: '个人'
        }, {
          value: '1',
          label: '单位'
        },],
        options2:[{
             value: 0,
          name: '未开票'
        }, {
          value: 1,
          name: '已开票'
       
        }],
       rules: {
        invoiceType: [{ required: true, message: "此项为必选项", trigger: ["blur","change"] }],
        invoicePayable: [
          { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ],
        targetName: [
          { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ],
        vatBankName: [
          { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ],
       taxNumber: [{ required: true, message: "此项为必选项", trigger: ["blur","change"] }],
       vatBankAccount: [
          { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ],
       vatPhone: [
          { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ],
        vatAddress: [
          { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ],
        content: [
          { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ],
       userName: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        userPhone: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        provinceId: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        cityId: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        areaId: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        address: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ]
      }
    };
  },
  created() {},
   computed: {
      total1(){
      let totals = 0
      let _this = this
      if(_this.pageData.goodsDetailList2&&_this.pageData.goodsDetailList2.length>0){
          for(var i = 0;i<_this.pageData.goodsDetailList2.length;i++){
            if(!isNaN(_this.pageData.goodsDetailList2[i].totalPrice)){
              totals+=parseFloat(_this.pageData.goodsDetailList2[i].totalPrice)
              this.pageData.invoiceAmount  = totals
            }else{
              totals = 0
            }
      }
        
      }
        return totals
      
    }
  },
  props: ["addVisibles","firstLevel",'companyData',"invoiceData"],
  watch: {
    addVisibles(val) {
      this.addVisible = val;
    },
    firstLevel(val){
      this.province = val ;
    },
    companyData(val){
      this.companyList =val;
    },
    invoiceData(val){
      this.pageData = val;
    },
    //监听数组中值变化
    'pageData.goodsDetailList2':{
      handler(newVal, oldVal) {
        for(let i=0;i<newVal.length;i++){
          if(parseFloat(newVal[i].goodsCount)>=0&&parseFloat(newVal[i].goodsPrice)>=0){
            newVal[i].totalPrice = parseFloat(newVal[i].goodsCount)*parseFloat(newVal[i].goodsPrice)        
          }   
        }
    },
    deep: true
    },

  },
  methods: {
    //关闭页面
    createClose() {
     
      this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                       this.addVisible = false;
                       this.$emit("createClose3", this.addVisible);
                })
                .catch(_ => {});
      
    },
    createClosing() {
      
      this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                       this.addVisible = false;
                       this.$emit("createClosing3", this.addVisible);
                })
                .catch(_ => {});
    },
    btn1() {
      this.orderIndex = 1;
    },
    btn2() {
      this.orderIndex = 2;
    },
    //保存带收票信息
    saveInvoice(){
        saveInvoiceInfo(this.pageData).then(res=>{
          if(res.code===200){ 
              throttleTipPop(this, "success", "保存待收票信息成功", 2000);
              this.addVisible = false;
              this.$emit('saveInvoice1',this.addVisible);
          }
        })
    },
     //添加
    add1(row){
      let arr =[];
        if(this.pageData.goodsDetailList2.length>0){
          for(let i=0;i<this.pageData.goodsDetailList2.length;i++){ 
            if(this.pageData.goodsDetailList2[i].goodsSkuId===row.goodsSkuId){
                
                 throttleTipPop(this, "error", "开票明细已经存在相同的订单", 2000);
              return false;     
            }  
        }
         this.pageData.goodsDetailList2.push(row)
      }else{
          this.pageData.goodsDetailList2.push(row)
      }
    },
    delete1(row, index) {
      this.showIndex = '';
      this.pageData.goodsDetailList2.splice(index,1);
      
    },
    //编辑
    edit(row,index){
          this.showIndex = index;
    },
    center1(row, index) {
    },
    address() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    handleChange() {},
     handleRemove(file, fileList) {
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    
  }
};
</script>

<style lang="scss" >
@import "@/common/scss/variable.scss";
#toInvioce {
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
  .tips {
    position: relative;
    left: 120px;
    top: -3px;
    margin-bottom: 10px;
    color: #999999;
  }
  .search-base {
    .inner {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .btn {
        border: 1px solid #d7e0f1;
        width: 94px;
        height: 32px;
        text-align: center;
        border-radius: 4px;
        line-height: 32px;
        cursor: pointer;
        margin-left: 10px;
        margin-right: 20px;
        position: relative;
        overflow: hidden;
        .delta {
          position: absolute;
          right: 0;
          top: 8px;
          width: 0;
          height: 0;
          border: 11px solid transparent;
          border-bottom-color: #4a99fa;
          border-right-color: #4a99fa;
          border-radius: 0 0 1px 0;
          .el-icon-check {
            position: absolute;
            top: -3px;
            left: -3px;
            color: #fff;
          }
        }
      }
      .active {
        border: 1px solid #4a99fa;
      }
      .invoice_title {
        width: 120px;
        text-align: right;
        box-sizing: border-box;
        padding-right: 12px;
        .star {
          margin-right: 5px;
          color: red;
        }
      }
    }
  }
  .txt_blue {
    color: #4a99fa;
    text-align: center;
    .operate {
      cursor: pointer;
    }
    .operate:nth-of-type(1) {
      margin-right: 24px;
      cursor: pointer;
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
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 24px;
    color: #8c939d;
    padding: 20px 50px;
    width: 370px;
    height: 117px;
    line-height: 117px;
    text-align: center;
    font-style: normal;
  }
  .avatar {
    width: 370px;
    height: 117px;
    display: block;
  }
  .el-input--small .el-input__inner {
    height: 32px !important;
    line-height: 32px !important;
  }
  .inner1{
      color:#999;
      display: flex;
      margin-bottom: 10px;
    .invoice_title1{
      margin-left:36px;
      margin-right:14px;
      
    }
    .invoice_content{
        line-height: 24px;
        margin-top: -4px;
    }
  }
  /deep/ .el-dialog__headerbtn{
      top:10px;
    }
}
</style>