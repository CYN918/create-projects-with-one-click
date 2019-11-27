<template>
  <div id="editOrder">
    <el-dialog :visible.sync="editVisible" width="70%" :before-close="createClosing">
      <!-- 编辑客户报价单添加商品弹窗 -->
      <div class="mail-fitter">
        <div class="goods-fitter" style="margin-bottom:20px">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">编辑报价单</h4>
            </div>
          </el-form>
        </div>
        <el-form ref="form" :model="editDatas" :rules="rules" label-width="110px" size="small">
          <div class="mail-wrapper">
            <h4 class="title1">客户信息</h4>
            <div class="search-base">
              <el-row class="warp">
                <div class="mbottom">
                  <div class="goods-fitter">
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="客户名称：" prop="customerName">
                          <el-input v-model="editDatas.customerName" placeholder="请填写客户名称">
                            <el-button slot="append" @click="chooseCustomer1()" size="mini">选择</el-button>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="部门：" prop="department">
                          <el-input v-model="editDatas.department" placeholder="请填写部门"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="联系人：" prop="customerContact">
                          <el-input v-model="editDatas.customerContact" placeholder="请填写联系人"></el-input>
                        </el-form-item>
                      </el-col>

                      <el-col :span="6">
                        <el-form-item label="报价单号：" prop="inquiryNo">
                          <span>{{editDatas.offerNo}}</span>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="6">
                        <el-form-item label="手机号码：" prop="phone">
                          <el-input v-model="editDatas.phone" placeholder="请填写手机号码"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="电话号码：" prop="tel">
                          <el-input v-model="editDatas.tel" placeholder="请填写电话号码"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="邮箱：" prop="email">
                          <el-input v-model="editDatas.email" placeholder="请填写邮箱"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="6">
                        <el-form-item label="销售代表：" prop="saleUserName">
                          <el-input v-model="editDatas.inputUserName"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <!-- <el-col :span="6">
                        <el-form-item label="税率：" prop="taxRate">
                          <el-input-number v-model="editDatas.invoiceTaxRate"  controls-position="right"  :min="0" :max="16" style="width:100%;"></el-input-number>
                        </el-form-item>
                      </el-col> -->
                      <el-col :span="6">
                        <el-form-item label="报价期限：" prop="offerEndTime">
                          <el-date-picker
                            v-model="editDatas.offerEndTime"
                            valueFormat="yyyy-MM-dd HH:mm"
                            type="date"
                            style="width:100%"
                            placeholder="选择日期"
                            :picker-options="pickerOptions0"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <!-- <el-col :span="6">
                        <el-form-item label="交货日期：" prop="remark">
                          <el-date-picker
                            v-model="editDatas.dealDate"
                            valueFormat="yyyy-MM-dd HH:mm"
                            type="date"
                            style="width:100%"
                            placeholder="选择日期"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col> -->
                      <el-col :span="6">
                        <el-form-item label="发票类型：" prop="invoiceType">
                          <el-select v-model="editDatas.invoiceType" placeholder="必填项">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                          <el-col :span="12">
                            <el-form-item label="地址：" prop="saleUserName">
                              <el-input v-model="editDatas.dealAddress"></el-input>
                            </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                        
                        <el-col :span="24">
                          <el-form-item label="备注：" prop="saleUserName">
                            <el-input v-model="editDatas.remark"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                   
                  </div>
                </div>
              </el-row>
            </div>
          </div>
          <el-form ref="form" :model="editDatas" :rules="rules" label-width="110px" size="small">
            <div class="mail-wrapper" style="margin-top:20px">
              <h4 class="title1">报价单位</h4>
              <div class="search-base">
                <el-row class="warp">
                  <div class="mbottom">
                    <div class="goods-fitter">
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="报价单位：" prop="offerCompan">
                            <el-input v-model="editDatas.offerCompany">
                              <el-button slot="append" @click="chooseOffer" size="mini">选择</el-button>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="联系人：" prop="offerContact">
                            <el-input v-model="editDatas.offerContact"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="联系电话：" prop="offerTel">
                            <el-input v-model="editDatas.offerTel"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="邮箱：" prop="offerEmail">
                            <el-input v-model="editDatas.offerEmail"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-row>
              </div>
            </div>
          </el-form>
          <div class="mail-wrapper" style="margin-top:20px">
            <div class="mcard">
              <el-form label-width="100px" size="small">
                <el-row class="operate mbottom"></el-row>
              </el-form>
              <el-table
                :data="editDatas.goodsDetailParam"
                stripe
                style="width: 100%;"
                border
                ref="elTable"
                class="goods_index"
                @selection-change="handleSelectionChange"
              >
                <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                <el-table-column label="图样" align="center" width="80">
                  <template slot-scope="scope">
                    <div class="imgBox">
                        <img  :src="scope.row.goodsImgUrl" class="showImg" alt="" v-if="scope.row.goodsImgUrl"/>
                        <img  src="@/common/images/缺省页.jpg" class="showImg" alt="" v-if="!scope.row.goodsImgUrl"/>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="商品信息" align="center" width="280">
                  <template slot-scope="scope">
                    <div class="txt_left">产品名称：{{scope.row.goodsName}}</div>
                    <div class="txt_left">
                      <span style="margin-right:24px;">型</span>
                      号：{{scope.row.modelNumber}}
                    </div>
                    <div class="txt_left">
                      <span style="margin-right:24px;">货</span>
                      号：{{scope.row.goodsSn}}
                    </div>
                    <div class="txt_left">
                      <span style="margin-right:12px;">S</span>
                      <span style="margin-right:11px;">K</span>
                      U：{{scope.row.goodsSkuId}}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="客户预算" align="center" width="110">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.budgetAmount" size="small"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="成本预算" align="center" width="180">
                    <template slot-scope="scope">
                        <el-input style="float:left;width:45%;" v-model="scope.row.minCostBudgetAmount" size="small"></el-input>
                        <span style="float:left">—</span>
                        
                        <el-input style="float:left;width:45%;" v-model="scope.row.maxCostBudgetAmount" size="small"></el-input>
                      </template>
                  </el-table-column>  
                <el-table-column label="数量" align="center">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.goodsCount" size="small"></el-input>
                  </template>
                </el-table-column>
                <el-table-column  align="center" width="100">
                   <template slot="header" >
                          <span class="txt_red">*</span>报价(单价)
                    </template>
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.goodsUnitPrice" size="small"></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="合计" align="center" width="130">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.goodsTotalMoney" size="small" width="110" readonly></el-input>
                  </template>
                </el-table-column>

                <el-table-column label="成本价" align="center" width="150">
                  <template slot-scope="scope"> 
                       <div v-for="(item,index) in scope.row.suppPriceList" :key="index">
                              <div class="txt_left">供应商：{{item.suppName}}</div>
                              <div class="txt_left">报价：{{item.taxPrice}}</div>
                       </div>
                  </template>
                </el-table-column>
                <el-table-column label="网上价格" align="center">
                  <template slot-scope="scope">
                    <div class="txt_left">京东价：{{scope.row.jdPrice}}</div>
                     <div class="txt_left">天猫价：{{scope.row.tmallPrice}}</div>
                  </template>
                </el-table-column>

                <el-table-column label="最低售价" align="center" width="80">
        
                <template slot-scope="scope">{{scope.row.minVolumePrice}}</template>
         
                </el-table-column>
                <el-table-column label="制作要求" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.productRequire" size="small"
                    type="textarea"
                              :autosize="{ minRows: 1, maxRows: 3}"
                             resize=none></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="运输方式" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.transportMode" size="small"
                    type="textarea"
                              :autosize="{ minRows: 1, maxRows: 3}"
                             resize=none></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="配送地址" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input v-model="scope.row.distAddress" size="small"
                    type="textarea"
                              :autosize="{ minRows: 1, maxRows: 3}"
                             resize=none></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="交货日期" align="center" width="200">
                  <template slot-scope="scope">
                    <el-date-picker
                      style="width:100%;"
                      v-model="scope.row.deliveryCycle"
                      type="date"
                      valueFormat='yyyy-MM-dd HH:mm:ss'
                      placeholder="选择日期"
                      size="small"
                      :picker-options="pickerOptions0"
                    ></el-date-picker>
                  </template>
                </el-table-column>
              </el-table>
              <div class="tips">
                <span>服务需求：</span>
                <br />
                <span>1、报价包含需求单中指定地点的运输费用，即生产到运输所有环节费用及发票税金等均包含在报价内；</span>
                <br />
                <span>2、中标方发货后，需将发货清单扫描后，邮件发至需求单位联络人处；并随货提供"加盖印章的发货明细单"给收货人；</span>
                <br />
                <span>3、提供物品需与样品保持一致，如出现问题，则中标方承担因此所发生的一切损失，包含但不限于，更换货品，由此产生的客户投诉、运输费用等等；</span>
                <br />
                <span>4、中标方需对该批货品提供相应售后质量保证并能为该批货品使用者及时更换有质量问题的货品。</span>
                <br />
              </div>
            </div>
          </div>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="createClose" size="small">关 闭</el-button>
        <el-button type="primary" @click="editInquirys()" size="small">保存</el-button>
      </span>
    </el-dialog>
    <!-- 编辑报价单客户选择弹窗 -->
    <el-dialog
        width="60%"
        :visible.sync="customerVisible1"
        :modal="true"
        :append-to-body="false"
      >
        <div class="mail-fitter">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
            <div class="mail-wrapper">
              <div class="search-base">
                <el-row class="warp">
                  <div class="mbottom">
                    <div class="goods-fitter">
                      <h4 class="title1">客户信息</h4>
                      <el-row>
                       <!--  <el-col :span="6">
                          <el-form-item label="客户区分:" prop="differentiation">
                            <el-select v-model="form.differentiation">
                              <el-option label="手工输入" value="0"></el-option>
                              <el-option label="商城会员" value="1"></el-option>
                              <el-option label="全部" value="2"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col> -->
                        <el-col :span="10">
                          <el-form-item label="关键词:" prop="keywords">
                            <el-col :span="18">
                              <el-input
                                v-model="customerDatas.keywords"
                                placeholder="请输入客户名称/联系人/手机号"
                              ></el-input>
                            </el-col>
                            <el-col :span="2" :offset="1">
                              <el-button type="primary" @click="customerSearch()" size="small">查询</el-button>
                            </el-col>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6" :offset="1">
                          <el-button type="primary" size="small" @click="toCustomer">客户管理</el-button>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-row>
              </div>
            </div>

            <div class="mcard0">
              <div class="mcard">
                <el-form label-width="100px" size="small"></el-form>
                <el-table
                  :data="list"
                  border
                  style="width: 100%"
                  stripe
                  @row-dblclick="addCustomer1"
                >
                  <el-table-column prop="customerName" label="客户名称" align="center"></el-table-column>
                  <el-table-column prop="commonContactName" label="联系人" align="center"></el-table-column>
                  <el-table-column prop="commonContactPhone" label="手机号码" align="center"></el-table-column>
                  <el-table-column prop="commonContactTel" label="电话号码" align="center"></el-table-column>
                  <el-table-column prop="commonContactEmail" label="邮箱" align="center"></el-table-column>
                  <el-table-column prop="leaderContactName" label="部门经理" align="center"></el-table-column>
                  <el-table-column prop="leaderContactPhone" label="手机号码" align="center"></el-table-column>
                  <el-table-column prop="companyAddress" label="地址" align="center"></el-table-column>
                </el-table>
                <div class="pagination">
                  <el-pagination
                    @size-change="customerhanHleSizeChange"
                    @current-change="customerHandleCurrentChange"
                    :current-page="customerDatas.pageNum"
                    :page-sizes="[10, 30, 50, 100]"
                    :page-size="customerDatas.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="customerDatas.total_count"
                  ></el-pagination>
                </div>
              </div>
            </div>
          </el-form>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="customerVisible1 =false" size="small">关 闭</el-button>
        </span>
    </el-dialog>
     <!-- 报价单单位选择 -->
      <el-dialog width="60%" :visible.sync="offerVisible1" :modal="true" :append-to-body="false">
        <div class="mail-fitter">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px">
            <div class="mail-wrapper">
              <div class="search-base">
                <el-row class="warp">
                  <div class="mbottom">
                    <div class="goods-fitter">
                      <h4 class="title1">选择签约的主体公司</h4>
                    </div>
                  </div>
                </el-row>
              </div>
            </div>
            <div class="mcard0">
              <div class="mcard">
                <el-form label-width="100px" size="small"></el-form>
                <el-table
                  :data="listData"
                  border
                  style="width: 100%"
                  stripe
                  @row-dblclick="addContract1"
                >
                   <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                  <el-table-column prop="customerName" label="公司名称 " align="center" width="240">
                            <template slot-scope="scope">
                        {{scope.row.sccCompanyName}}
                      </template>
                  </el-table-column>
                  <el-table-column prop="commonContactName" label="联系人" align="center">
                          <template slot-scope="scope">
                        {{scope.row.sccContacts}}
                      </template>
                  </el-table-column>
                  <el-table-column prop="commonContactPhone" label="联系电话 " align="center">
                            <template slot-scope="scope">
                        {{scope.row.sccMobile}}
                      </template>
                  </el-table-column>
                  <el-table-column prop="companyAddress" label="传真 " align="center">
                          <template slot-scope="scope">
                        {{scope.row.sccFax}}
                      </template>
                  </el-table-column>
                  <el-table-column prop="commonContactTel" label="电子邮箱 " align="center">
                       <template slot-scope="scope">
                        {{scope.row.sccEmail}}
                      </template>
                  </el-table-column>
                  <el-table-column prop="commonContactEmail" label="地址 " align="center">
                        <template slot-scope="scope">
                        {{scope.row.sccAddress}}
                      </template>
                  </el-table-column>
                </el-table>
                <div class="pagination">
                  <el-pagination
                    @size-change="conHandleSizeChange"
                    @current-change="conHandleCurrentChange"
                    :current-page="contractData.pageIndex"
                    :page-sizes="[10,20,50,100]"
                    :page-size="contractData.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="contractData.pageCount"
                  ></el-pagination>
                </div>
              </div>
            </div>
          </el-form>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="offerVisible1 =false" size="small">关 闭</el-button>
          <el-button type="primary" @click="offerVisible1 =false" size="small">保存</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import {
  getInquiry,
  getInGoods,
  addInquiry,
  deleteInquiry,
  closeInquiry,
  getInGood,
  findInquiry,
  saleInquirys,
  toSaleInquirys,
  toSaleUser,
  editInquiry,
  editOffer
} from "@/api/sale/index";
import {getContract} from "@/api/setting/index"
import { deleteGoods, getErpGoods } from "@/api/product/index";
import { getAllcustomer } from "@/api/customer";
import { throttleTipPop } from "@/utils/functions.js";
export default {
  data() {
       //校验手机号码
    var checkMobile = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('手机号码不能为空'));
        }
          if(!(/^1[3456789]\d{9}$/.test(value))){  
            callback(new Error('请输入正确的手机号码'));
          } else {
              callback();
            }
          
      };
      //校验邮箱号码
    var checkEmail = (rule,value,callback) =>{
       if((/(^[_\W])|([_\W]$)/.test(value))){
          return callback(new Error('邮箱不能以特殊字符开头或结尾!'));
       }

       if(!/^([-_a-zA-Z0-9\u4e00-\u9fa5\.])+@([-_a-zA-Z0-9])+(\.[a-zA-Z]{2,5}){1,3}$/.test(value)){
         callback(new Error('请输入正确的邮箱号码'));
       }else {
         callback();
       }
    }
    return {
      pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        }, 
      offerVisible1: false, //单位选择弹窗
      editVisible: false, //编辑询价单
      innerVisible1: false, //编辑询价单新增商品弹窗
      customerVisible1: false, //编辑询价单客户选择弹窗
      brandVisible1: false, //编辑询价单新增商品品牌弹窗
      contractDatas:[],
      timer1:"",//计时器
      listData:[],
      form: {
        customerId: "",
        inquirySheet: "", //询价单号
        customerName: "", //客户名称
        salesRepresentatives: "", //销售代表
        contacts: "", //联系人
        department: "", //部门
        phoneNumber: "", //电话号码
        mail: "", //邮箱
        mobilePhone: "", //手机号码
        quotationPeriod: "", //报价期限
        invoiceType: "0", //发票类型
        platformName: "", //平台名称
        taxRate: 10, //税率
        deliveryDate: "", //交货日期
        address: "", //收货地址
        remark: "", //备注
        brand: "", //品牌
        differentiation: "", //客户区分
        keywords: "", //关键词
        saleOrder: "", //销售订单
        toSale: "", //移交给销售员
        inquirySheet: "", //询价单
        closingreason: "", //关闭原因
        arrs: [],
        goods: [],
        current_page: 1,
        page_size: 2,
        total_count: 0
      },
      offerData: {
        taxRate: "", //报价单税率
        dealDate: "", //交货日期
        remark: "", //客户备注
        offerDepartment: "", //报价单位
        offerContact: "", //报价联系人
        offerTel: "", //报价联系电话
        offerEmail: "" //报价邮箱
      },
      formData: {
        current_page: 1,
        page_size: 2,
        total_count: 0
      },
      customerDatas: {
        pageNum: 1,
        pageSize: 10,
        total_count: 0,
        keywords: ""
      },
      contractData:{
        pageSize:10,
        pageIndex:1,
        pageCount:0,
        bizType:0,
      },
      options: [
        {
          value: 0,
          label: "不要发票"
        },
        {
          value: 1,
          label: "增值税专用发票"
        },
        {
          
           value: 2,
          label: "普通发票"
        }
      ],
      inquiryId: [],
      inquiryData: [],
      tableData: [],
      selectData: [],
      selectData1: [],
      goodsData: [],
      customerData: [],
      list: [], //客户列表
      editDatas: {},
      elTable: [],
      rules: {
        customerContact: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        offerEndTime: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
         phone: [{ required: true, validator: checkMobile, trigger: ["blur","change"] }],
        email: [{ required: false, validator: checkEmail, trigger: ["blur","change"] }],
        customerName: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        platformName: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        department: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        offerCompany: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        offerContact: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        offerTel: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        dealDate: [{ required: true, message: "此项为必填项", trigger: "blur" }]
      }
    };
  },
  props: ["editVisibles", "editDatasA"],
  created() {
    /*  this._findInquiry() */
  },
  watch: {
    editVisibles(val) {
      this.editVisible = val;
    },
    editDatasA(val) {
      this.editDatas = val;
    },
  "editDatas.goodsDetailParam":{
        handler(val, oldVal) {
        if(val){
          for(let i=0;i<val.length;i++){
            if(Number(val[i].goodsCount)>=0&&Number(val[i].goodsUnitPrice)>=0){
              val[i].goodsTotalMoney = Number(val[i].goodsCount)*Number(val[i].goodsUnitPrice)        
            } 
           clearTimeout(this.timer1);
            this.timer1 = setTimeout(() => {
              this.getBudget(val);
              this.getBudgetAmount(val);
              this.compareSizes(val);
            },1500)
          }

        }
      },
      deep: true
      } 
  },
  methods: {
       //最小值
    getBudget(val){
        for(let i=0;i<val.length;i++){                       
               if(val[i].minCostBudgetAmount&&val[i].minCostBudgetAmount<(val[i].budgetAmount*0.5)){
                  val[i].minCostBudgetAmount = val[i].budgetAmount*0.5
                  throttleTipPop(this, "warning", "成本预算小值最小为客户预算的50%", 2000); 
                }else if(val[i].minCostBudgetAmount&&val[i].minCostBudgetAmount>(val[i].budgetAmount*0.75)){
                  val[i].minCostBudgetAmount = val[i].budgetAmount*0.75
                  throttleTipPop(this, "warning", "成本预算小值最大为客户预算的75%", 2000); 
                }     
          } 
    },
    //最大值
    getBudgetAmount(val){
        for(let i=0;i<val.length;i++){                       
               if(val[i].maxCostBudgetAmount&&val[i].maxCostBudgetAmount<(val[i].budgetAmount*0.5)){
                  val[i].maxCostBudgetAmount = val[i].budgetAmount*0.5
                  throttleTipPop(this, "warning", "成本预算大值最小为客户预算的50%", 2000); 
                }else if(val[i].maxCostBudgetAmount&&val[i].maxCostBudgetAmount>(val[i].budgetAmount*0.75)){
                  val[i].maxCostBudgetAmount = val[i].budgetAmount*0.75
                  throttleTipPop(this, "warning", "成本预算大值最大为客户预算的75%", 2000); 
                }     
          } 
    },
    //比较大小
    compareSizes(val){
         for(let i=0;i<val.length;i++){  
           if(val[i].maxCostBudgetAmount&&val[i].minCostBudgetAmount>val[i].maxCostBudgetAmount){
             val[i].minCostBudgetAmount = val[i].maxCostBudgetAmount -1;
             this.open1();
           }
          
         }
    },
    open1() {
        const h = this.$createElement;

        this.$notify({
          title: '提示',
          message: '成本预算小值不能大于大值',
        });
      },
    //_编辑生成报价单
    _findInquiry() {},
    //获取ERP商品
    _getGoods() {
      getErpGoods(this.formData).then(res => {
        this.tableData = res.data.pageList;
        console.log(this.tableData);

        this.tableData.forEach(item => {
          item.top = 0;
        });
        this.formData.total_count = res.data.count;
      });
    },
    //获取所有客户信息
    _getAllcustomer() {
      getAllcustomer(this.customerDatas).then(res => {
        this.list = res.data.list;
        this.customerDatas.total_count = res.data.total;
        console.log(this.list);
      });
    },
    //搜索客户
    customerSearch() {
      this._getAllcustomer();
    },
    handleSelectionChange(val) {
      this.elTable = val;
      console.log(this.elTable);
    },
    //编辑报价单
    editInquirys() {
      var arrss = [];
      for (let i = 0; i < this.editDatas.goodsDetailParam.length; i++) {
        let obj = {};
        obj.brandName = this.editDatas.goodsDetailParam[i].brandName;
        obj.budgetAmount = this.editDatas.goodsDetailParam[i].budgetAmount;
         obj.minCostBudgetAmount = this.editDatas.goodsDetailParam[i].minCostBudgetAmount;
        obj.maxCostBudgetAmount = this.editDatas.goodsDetailParam[i].maxCostBudgetAmount;
        obj.deliveryCycle = this.editDatas.goodsDetailParam[i].deliveryCycle;
        obj.distAddress = this.editDatas.goodsDetailParam[i].distAddress;
        obj.goodsColor = this.editDatas.goodsDetailParam[i].goodsColor;
        obj.goodsCount = this.editDatas.goodsDetailParam[i].goodsCount;
        obj.goodsId = this.editDatas.goodsDetailParam[i].goodsId;
        obj.goodsName = this.editDatas.goodsDetailParam[i].goodsName;
        obj.goodsSkuId = this.editDatas.goodsDetailParam[i].goodsSkuId;
        obj.goodsSn = this.editDatas.goodsDetailParam[i].goodsSn;
        obj.goodsSpecSize = this.editDatas.goodsDetailParam[i].goodsSpecSize;
        obj.goodsUnit = /* this.editDatas.goodsDetailParam[i].goodsUnit */1;
        obj.modelNumber = this.editDatas.goodsDetailParam[i].modelNumber;
        obj.productRequire = this.editDatas.goodsDetailParam[i].productRequire;
        obj.goodsImgUrl = this.editDatas.goodsDetailParam[i].goodsImgUrl;
        obj.goodsUnitPrice =this.editDatas.goodsDetailParam[i].goodsUnitPrice
        obj.transportMode = this.editDatas.goodsDetailParam[i].transportMode;
        obj.invoiceTaxRate = this.editDatas.goodsDetailParam[i].invoiceTaxRate;
        obj.goodsTotalMoney = this.editDatas.goodsDetailParam[i].goodsTotalMoney;
        obj.goodsId = this.editDatas.goodsDetailParam[i].goodsId;
        obj.sogdId = this.editDatas.goodsDetailParam[i].sogdId;
        arrss.push(obj);
        this.editDatas["arrss"] = arrss;
      }

      if(this.editDatas.customerName===''||
      this.editDatas.department===''||
      this.editDatas.customerContact===''||
      this.editDatas.phone===""||
      this.editDatas.offerEndTime===null||
      this.editDatas.offerContact===''||
      this.editDatas.offerTel===''){
          throttleTipPop(this, "warning", "请填写带*的填项", 2000);
          
      }else{
          editOffer(this.editDatas).then(res => {
            if (res.code === 200) {
              throttleTipPop(this, "success", "修改报价单成功", 2000);
              this.editVisible = false;
              this.$emit("editInquiry2", this.editVisible);
            } else {
              return false;
            }
          });
      }
    },
    //关闭页面
    createClose() {
      
      this.$confirm('您确认要关闭吗？')
                    .then(_ => {
                this.editVisible = false;
                this.$emit("createClose1", this.editVisible);
            })
            .catch(_ => {});
    },
    createClosing() {
      
      this.$confirm('您确认要关闭吗？')
                    .then(_ => {
                this.editVisible = false;
                this.$emit("createClosing1", this.editVisible);
            })
            .catch(_ => {});
    },
    chooseOffer(){
      this.offerVisible1=true
      this._getContract()
    
    },
    _getContract(){
       getContract(this.contractData).then(res=>{
       this.listData = res.data.pageList
        this.contractData.pageCount = res.data.count 
      })
    },
   //双击添加报价信息
    addContract1(row) {
      let copy = JSON.parse(JSON.stringify(row));
      this.contractDatas.splice(0, 1, copy);
      console.log(this.contractDatas);
      this.editDatas.offerCompany = this.contractDatas[0]&&this.contractDatas[0].sccCompanyName
      this.editDatas.offerContact = this.contractDatas[0]&&this.contractDatas[0].sccContacts
      this.editDatas.offerTel = this.contractDatas[0]&&this.contractDatas[0].sccMobile
      this.editDatas.offerEmail = this.contractDatas[0]&&this.contractDatas[0].sccEmail
       this.offerVisible1 = false;
    },
    addCustomer1(row) {
      var copy = JSON.parse(JSON.stringify(row));
      this.customerData.splice(0, 1, copy);
      console.log(this.customerData);
      this.editDatas.customerName =
        this.customerData[0] && this.customerData[0].customerName;
      this.editDatas.customerId =
        this.customerData[0] && this.customerData[0].customerId;
      this.editDatas.customerContact =
        this.customerData[0] && this.customerData[0].commonContactName;
      this.editDatas.phone =
        this.customerData[0] && this.customerData[0].commonContactPhone;
      this.editDatas.tel =
        this.customerData[0] && this.customerData[0].commonContactTel;
      this.editDatas.dealAddress =
        this.customerData[0] && this.customerData[0].companyAddress;
      this.editDatas.department =
        this.customerData[0] && this.customerData[0].commonContactDept;
      this.editDatas.email =
        this.customerData[0] && this.customerData[0].commonContactEmail;
      this.customerVisible1 = false;
      
    },
    //跳到客户页面
    toCustomer(){
      let routeData = this.$router.resolve({
        name: "Data",
      });
      window.open(routeData.href, '_blank');
    },
   addCustomer2(row){
      
   },
    chooseCustomer1() {
      this.customerVisible1 = true;
      this._getAllcustomer();
    },
    addHandleSizeChange(val) {
      this.formData.page_size = val;
      this._getGoods();
    },
    addHandleCurrentChange(val) {
      this.formData.current_page = val;
      this._getGoods();
    },
    handleCurrentChange() {},
    handleSizeChange() {},
    conHandleCurrentChange(val) {
        this.contractData.pageIndex =val
        this._getContract()
    },
    conHandleSizeChange(val){
        this.contractDatas.pageSize = val
        this._getContract()
    },

    customerhanHleSizeChange(val) {
      this.customerDatas.pageSize = val;
      this._getAllcustomer();
    },
    customerHandleCurrentChange(val) {
      this.customerDatas.pageNum = val;
      this._getAllcustomer();
    },
    handleSelectionChange(val) {
      this.elTable = val;
      console.log(this.elTable);
    }
  }
};
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
#editOrder {
  .imgBox {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    .showImg {
      width: 50px;
      height: 50px;
    }
  }
  .tips {
    font-size: 12px;
    color: #909399;
    line-height: 20px;
    margin-top: 10px;
  }
  .mcard0 {
    border: 1px solid #d7e0f1;
    margin-top: 20px;
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
   /deep/ .el-dialog__headerbtn{
      top:10px;
    }
    /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 12px !important; // 横向滚动条
    height: 12px !important; // 纵向滚动条 必写
   
  }
  // 滚动条的滑块
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
     background: #ddd !important;
    border-radius: 5px !important;
  }
}
</style>