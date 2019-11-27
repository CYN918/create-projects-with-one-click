<template>
  <div id="inquirys">
    <div class="margin0">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">询价单</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="5">
                    <el-col>
                      <el-form-item label="询价单号：">
                        <el-col :span="21">
                          <el-input v-model="forms.enquiryNumber" placeholder="请输入询价单号"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="5">
                    <el-col>
                      <el-form-item label="客户：">
                        <el-col :span="21">
                          <el-input v-model="forms.customerName" placeholder="请输入客户名称/联系人姓名"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="5">
                    <el-col>
                      <el-form-item label="发票类型：">
                        <el-col :span="21">
                          <el-select
                            class="el-select-width"
                            v-model="forms.invoiceType"
                            placeholder="请选择"
                          >
                            <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="5">
                    <el-col>
                      <el-form-item label="状态：">
                        <el-col :span="21">
                          <el-select class="el-select-width" v-model="forms.type" placeholder="请选择">
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
                  </el-col>
                  <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small" @click="inSearch()">查询</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="5">

                    <el-form-item label="产品搜索：">
                       <el-col :span="21">
                          <el-input v-model="forms.productSearch" placeholder="请输入商品信息/编码"></el-input>
                       </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="新增日期：">
                      <el-col :span="22">
                        <el-date-picker
                          type="daterange"
                          valueFormat="yyyy-MM-dd HH:mm:ss"
                          v-model="forms.createTime"
                          range-separator="-"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                        ></el-date-picker>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mcard" style="border:1px solid #d7e0f1">
        <el-row class="operate mbottom">
          <el-col :span="21">
            <!-- <el-button type="primary">仅挑选</el-button> -->
            <el-button type="primary" size="small" @click="addInquirySheet()" v-permit="'xj:add'">新增</el-button>
            <el-button type="primary" size="small" @click="closeInquirySheet()" v-permit="'xj:close'">关闭询价</el-button>
          </el-col>
          <el-col :span="3"></el-col>
        </el-row>
        <el-table
          :data="inquiryData"
         
          border
          style="width: 100%"
          :row-class-name="tableRowClassName"
          :row-style="selectedHighlight"
          @row-dblclick="AhandleSelectionChange"
        >
          <el-table-column prop="name" label="序号" align="center" width="50" type="index"></el-table-column>
          <el-table-column prop="name" label="询价状态" align="center">
            <template slot-scope="scope">
              <div v-html="scope.row.inquiryStatus"></div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="询价信息" align="center" width="200">
            <template slot-scope="scope">
              <div class="txt_left">询价单号：{{scope.row.inquiryNo}}</div>
              <div class="txt_left">录入时间：{{scope.row.createTime}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="客户信息" align="center" width="200">
            <template slot-scope="scope">
              <div class="txt_left">
                客户名称：{{scope.row.customerName}}</div>
              <div class="txt_left"><span style="margin-right:7px">联</span><span style="margin-right:7px">系</span>人：{{scope.row.customerContact}}</div>
              <div class="txt_left"><span style="margin-right:28px">手</span>机：{{scope.row.phone}}</div>
              <div class="txt_left"><span style="margin-right:28px">邮</span>箱：{{scope.row.email}}</div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="发票信息" align="center">
            <template slot-scope="scope">
              <div v-if="scope.row.invoiceType===0">{{scope.row.invoiceType | invoice}}</div>
              <div v-if="scope.row.invoiceType!==0">{{scope.row.invoiceType | invoice}}</div>
           <!--    <div v-if="scope.row.invoiceType!==0">税率：{{scope.row.invoiceTaxRate}}</div> -->
            </template>
          </el-table-column>
          <el-table-column prop="name" label="报价期限" align="center">
            <template slot-scope="scope">{{scope.row.offerEndTime | date}}</template>
          </el-table-column>

          <el-table-column prop="name" label="销售代表" align="center">
            <template slot-scope="scope">{{scope.row.saleUserName}}</template>
          </el-table-column>
          <el-table-column prop="name" label="指定的采销组" align="center">
            <template slot-scope="scope">{{scope.row.groupName}}</template>
          </el-table-column>
          <el-table-column prop="name" label="备注" align="center">
            <template slot-scope="scope">
                <div class="txt_left">
                  备注：{{scope.row.remark}}
                </div>
                <div class="txt_left" v-show="scope.row.closeMsg">
                  关闭原因：{{scope.row.closeMsg}}
                </div>
              </template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="150">
            <template slot-scope="scope">
              <div class="line-div">
                <div class="small-Idiv" @click="pushSale(scope.row)"
                v-permit="'xj:push'">
                  <div class="i-div">
                    <img src="@/common/images/icon/推送询价.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">推送询价</span>
                </div>
                <div
                  class="small-Idiv"
                  @click="deleteData(scope.row)"
                  v-permit="'xj:add'"
                >
                  <div class="i-div">
                    <img src="@/common/images/icon/回收站.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">删除</span>
                </div>
                <div
                  class="small-Idiv"
                  @click="pushToSale(scope.row)"   
                  v-permit="'xj:move'"
                >
                  <div class="i-div">
                    <img src="@/common/images/icon/移交销售黄.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">移交销售</span>
                </div>

                <div class="small-Idiv" @click="editInquirySheet(scope.row)"
                v-permit="'xj:edit'">
                  <div class="i-div">
                    <img src="@/common/images/icon/编辑.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">编辑</span>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="AhandleSizeChange"
            @current-change="AhandleCurrentChange"
            :current-page="forms.current_page"
            :page-sizes="[5,10,30,50]"
            :page-size="forms.page_size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="forms.total_count"
          ></el-pagination>
        </div>
      </div>
      <div class="margin0" style="margin-top:20px">
        <div class="tabs-header">
          <ul class="clearfix">
            <li
              class="sale"
              @click="tabIndex(0)"
              :class="currentIndex===0 ? 'active' : ''"
              v-show="!this.closeNo"
            >商品明细</li>
            <li
              class="sale"
              @click="tabIndex(0)"
              :class="currentIndex===0 ? 'active' : ''"
              v-show="this.closeNo"
            >询价单【{{this.closeNo}}】的商品明细</li>
          </ul>
        </div>
        <div class="tabs-content">
          <component :is="mainIndex" :count="count" :page="page" :closeNo="closeNo"></component>
        </div>
      </div>

      <!-- 新增客户询价 -->
      <el-dialog :visible.sync="addVisible" width="70%" :before-close="addClosing">
        

        <div class="mail-fitter">
          <div class="goods-fitter" style="margin-bottom:20px">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">新增询价单</h4>
              </div>
            </el-form>
          </div>
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="110px" size="small">
            <div class="mail-wrapper">
              <div class="search-base">
                <div class="search-wrapper">
                  <h4 class="title1">客户信息</h4>
                </div>
                <el-row class="warp">
                  <div class="mbottom">
                    <div class="goods-fitter">
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="客户名称：" prop="customerName">
                            <el-input v-model="form.customerName" placeholder="请填写客户名称">
                              <el-button slot="append" @click="chooseCustomer()" size="mini">选择</el-button>
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="部门：" prop="department">
                            <el-input v-model="form.department" placeholder="请填写部门"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="联系人：" prop="contacts">
                            <el-input v-model="form.contacts" placeholder="请填写联系人"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="询价单号：" prop="inquirySheet">
                            <el-input
                              v-model="form.inquirySheet"
                              placeholder="保存后自动生成"
                              :disabled="true"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="手机号码：" prop="mobilePhone">
                            <el-input v-model="form.mobilePhone" placeholder="请填写手机号码"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="电话号码：" prop="phoneNumber">
                            <el-input v-model="form.phoneNumber" placeholder="请填写电话号码"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="邮箱：" prop="mail">
                            <el-input v-model="form.mail" placeholder="请填写邮箱"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="销售代表：" prop="salesRepresentatives">
                            <el-input v-model="form.salesRepresentatives" placeholder="销售2"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="平台名称：" prop="platformName">
                            <el-input v-model="form.platformName" placeholder="请填写平台名称"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="报价期限：" prop="quotationPeriod">
                            <el-date-picker
                              v-model="form.quotationPeriod"
                              valueFormat="yyyy-MM-dd HH:mm"
                              type="date"
                              style="width:100%"
                              placeholder="选择日期"
                              :picker-options="pickerOptions0"
                            ></el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="发票类型：" prop="invoiceType">
                            <el-select v-model="form.invoiceType" placeholder="请选择">
                              <el-option
                                v-for="item in options3"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="备注：">
                            <el-input v-model="form.remark"></el-input>
                            <!--  <el-date-picker
                              v-model="form.deliveryDate"
                              valueFormat='yyyy-MM-dd HH:mm:ss'
                              type="date"
                              style="width:100%"
                              placeholder="选择日期"
                            ></el-date-picker>-->
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-row>
              </div>
            </div>
            <div class="mcard1">
              <div class="mcard">
                <el-form label-width="100px" size="small">
                  <el-row class="operate mbottom">
                    <el-col :span="7">
                      <!-- <el-button type="primary">仅挑选</el-button> -->
                      <el-button type="primary" size="small" @click="innerVisible=true">添加商品</el-button>
                      <el-button type="primary" size="small" @click="deleteGoods">删除商品</el-button>
                    </el-col>
                  </el-row>
                  <el-table
                    :data="goodsData"
                    stripe
                    style="width: 100%"
                    border
                    ref="elTable1"
                    class="goods_index"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column type="selection" align="center" width="50"></el-table-column>
                    <el-table-column label="商品货号" align="center" width="200">
                      <template slot-scope="scope">
                        <div>{{scope.row.goodsSn}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="品名" align="center" width="200">
                      <template slot-scope="scope">
                        <div>{{scope.row.goodsName}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="品牌" align="center">
                      <template slot-scope="scope">
                        <div class="txt_left">{{scope.row.brandName}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="型号" align="center">
                      <template slot-scope="scope">
                        <div>{{scope.row.modelNumber}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="规格尺寸" align="center" width="150">
                      <template slot-scope="scope">
                        <div style="position:relative">
                          <!-- <el-button @click="down">向上</el-button> -->
                          <div style="overflow: auto;" :ref="'down'+scope.$index">
                            <div>{{scope.row.rows.goodsSpecValues}}</div>
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center">
                      <template slot-scope="scope">{{scope.row.unitName}}</template>
                    </el-table-column>
                    <el-table-column  align="center">
                      <template slot="header" >
                          <span class="txt_red">*</span>数量
                    </template>
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.num" size="small"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="税率" align="center" width="70">
                      <template slot-scope="scope">
                        <el-input
                          v-model="scope.row.rows.taxRate"
                          size="small"
                          v-if="form.invoiceType!=='0'"
                        ></el-input>
                        <el-input
                          v-model="scope.row.rows.taxRate"
                          size="small"
                          v-if="form.invoiceType==='0'"
                          :disabled="true"
                        ></el-input>
                      </template>
                    </el-table-column>
                     <el-table-column label="客户预算" align="center" width="100">
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
                    <el-table-column label="制作要求" align="center" width="200">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.request" size="small"
                         type="textarea"
                              :autosize="{ minRows: 1, maxRows: 3}"
                             resize=none></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="运输方式" align="center" width="200">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.transport" size="small"
                         type="textarea"
                              :autosize="{ minRows: 1, maxRows: 3}"
                             resize=none></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="配送地址" align="center" width="200">
                      <template slot-scope="scope">
                        <el-input v-model="scope.row.address" size="small"
                         type="textarea"
                              :autosize="{ minRows: 1, maxRows: 3}"
                             resize=none></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column  align="center" width="200">
                      <template slot="header" >
                            <i style="color:red;margin-right:3px;">*</i>交货日期
                       </template>
                      <template slot-scope="scope">
                        <el-date-picker
                          style="width:100%;"
                          v-model="scope.row.deliveryCycle"
                          valueFormat="yyyy-MM-dd HH:mm"
                          type="date"
                          placeholder="选择日期"
                          size="small"
                          :picker-options="pickerOptions0"
                        ></el-date-picker>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form>

                <!-- <div class="pagination">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="tableData.currentPage"
                    :page-sizes="tableData.sizes"
                    :page-size="tableData.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.total"
                  ></el-pagination>
                </div> -->
              </div>
            </div>
          </el-form>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="addClose" size="small">关 闭</el-button>
          <el-button type="primary" @click="addInquirys()" size="small">保存</el-button>
        </span>
      </el-dialog>
      <!-- 编辑客户询价 -->
      <el-dialog :visible.sync="editVisible" width="70%" :before-close="editClosing">
       

        <div class="mail-fitter">
          <div class="goods-fitter" style="margin-bottom:20px">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">编辑询价单</h4>
              </div>
            </el-form>
          </div>
          <el-form ref="infoForm" :model="editDatas" :rules="rules" label-width="110px" size="small">
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
                          <el-form-item label="询价单号：" prop="inquiryNo">
                            <span>{{this.toInquiryNo}}</span>
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
                            <el-input v-model="editDatas.saleUserName" placeholder="销售2"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="平台名称：" prop="projectName">
                            <el-input v-model="editDatas.projectName" placeholder="请填写平台名称"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="报价期限：" prop=".offerEndTime">
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
                        <el-col :span="6">
                          <el-form-item label="备注：" prop="remark">
                            <el-input v-model="editDatas.remark"></el-input>
                            <!-- <el-date-picker
                              v-model="editDatas.dealDate"
                              valueFormat='yyyy-MM-dd HH:mm:ss'
                              type="date"
                              style="width:100%"
                              placeholder="选择日期"
                            ></el-date-picker>-->
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-row>
              </div>
            </div>
            <div class="mcard1">
              <div class="mcard">
                <el-form label-width="100px" size="small">
                  <el-row class="operate mbottom">
                    <el-col :span="7">
                      <!-- <el-button type="primary">仅挑选</el-button> -->
                      <el-button type="primary" size="small" @click="innerVisible1=true">选择商品</el-button>
                      <el-button type="primary" size="small" @click="deleteGoods1">删除商品</el-button>
                    </el-col>
                  </el-row>
                </el-form>
                <el-table
                  :data="editDatas.goodsDetailEditVo"
                  stripe
                  style="width: 100%"
                  border
                  ref="elTable2"
                  class="goods_index"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" align="center" width="50"></el-table-column>
                  <el-table-column label="商品货号" align="center" width="200">
                    <template slot-scope="scope">
                      <div>{{scope.row.goodsSn}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="品名" align="center" width="200">
                    <template slot-scope="scope">
                      <div>{{scope.row.goodsName}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="品牌" align="center">
                    <template slot-scope="scope">
                      <div class="txt_left">{{scope.row.brandName}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="型号" align="center">
                    <template slot-scope="scope">
                      <div class="txt_left">{{scope.row.modelNumber}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="规格尺寸" align="center" width="150">
                    <template slot-scope="scope">
                      <div style="position:relative">
                        <!-- <el-button @click="down">向上</el-button> -->
                        <div style="overflow: auto;" :ref="'down'+scope.$index">
                          <div>{{scope.row.goodsSpecSize}}</div>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="单位" align="center">
                    <template slot-scope="scope">{{scope.row.goodsUnit}}</template>
                  </el-table-column>
                  <el-table-column  align="center">
                     <template slot="header" >
                          <span class="txt_red">*</span>数量
                    </template>
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.goodsCount" size="small"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="税率" align="center" width="70">
                    <template slot-scope="scope">
                      <el-input
                        v-model="scope.row.taxRate"
                        size="small"
                        v-if="editDatas.invoiceType!==0"
                      ></el-input>
                      <el-input
                        v-model="scope.row.taxRate"
                        size="small"
                        v-if="editDatas.invoiceType===0"
                        :disabled="true"
                      ></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column label="客户预算" align="center" width="100">
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
                  <el-table-column  align="center" width="200">
                    <template slot="header" >
                            <i style="color:red;margin-right:3px;">*</i>交货日期
                    </template>
                    <template slot-scope="scope">
                      <el-date-picker
                        style="width:100%;"
                        size="small"
                        v-model="scope.row.deliveryCycle"
                        valueFormat="yyyy-MM-dd HH:mm"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions0"
                      ></el-date-picker>
                    </template>
                  </el-table-column>
                </el-table>
                <!-- <div class="pagination">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="tableData.currentPage"
                    :page-sizes="tableData.sizes"
                    :page-size="tableData.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.total"
                  ></el-pagination>
                </div> -->
              </div>
            </div>
          </el-form>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="editClose()" size="small">关 闭</el-button>
          <el-button type="primary" @click="editInquirys()" size="small">保存</el-button>
        </span>
      </el-dialog>
      <!-- 移交销售弹窗 -->
      <el-dialog :visible.sync="saleVisible" width="30%">
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">移交销售员跟进</h4>
              </div>
            </el-form>
          </div>
        </div>
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form ref="infoForm" :model="form" :rules="rules" label-width="120px" size="small"> 
              <div class="search-wrapper">
                <div class="search-base">
                  <el-row>
                    <el-col :offset="4">
                      <el-form-item label="销售订单：">
                        <el-col :span="12">
                          <span>{{this.toInquiryNo}}</span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :offset="4">
                      <el-form-item label="移交销售员：">
                        <el-col :span="12">
                          <el-select
                            v-model="form.toSale"
                            placeholder="请选择"
                            style="width:100%"
                            @change="selectGet1"
                          >
                            <el-option
                              v-for="(item,index) in saleList"
                              :key="index"
                              :label="item.sysuserName"
                              :value="item.sysuserId"
                            ></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="saleVisible = false" size="small">关 闭</el-button>
          <el-button type="primary" @click="saveSale()" size="small">保存</el-button>
        </span>
      </el-dialog>

      <!-- 推送诶采购组询价 -->
      <el-dialog :visible.sync="pushVisible" width="30%">
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">推送给采购组询价</h4>
              </div>
            </el-form>
          </div>
        </div>
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form ref="infoForm" :model="form" :rules="rules" label-width="120px" size="small">
              <div class="search-wrapper">
                <div class="search-base">
                  <el-row>
                    <el-col :offset="4">
                      <el-form-item label="询价单：">
                        <el-col :span="12">
                          <span>{{this.toInquiryNo}}</span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :offset="4">
                      <el-form-item label="指定采购组：">
                        <el-col :span="12">
                          <el-select v-model="saleChoose" placeholder="请选择" @change="selectGet">
                            <el-option
                              v-for="(item,index) in saleGroup"
                              :key="index"
                              :label="item.organizeName"
                              :value="item.organizeId"
                            ></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <div class="pushTip">
                    <i class="star">*</i>
                    <span class="tipMessage">保存成功后，所指定采购组的成员才能看到此询价单并可以对此询价单的商品进行报价</span>
                  </div>
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="pushVisible = false" size="small">关 闭</el-button>
          <el-button type="primary" @click="toSaler()" size="small">保存</el-button>
        </span>
      </el-dialog>
      <!-- 关闭询价 -->
      <el-dialog :visible.sync="closeVisible" width="30%">
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">关闭询价</h4>
              </div>
            </el-form>
          </div>
        </div>
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form ref="infoForm" :model="form" :rules="rules" label-width="120px" size="small">
              <div class="search-wrapper">
                <div class="search-base">
                  <el-row>
                    <el-form-item label="询价单：">
                      <span>{{this.closeNo}}</span>
                    </el-form-item>
                  </el-row>
                  <el-row>
                    <el-form-item label="关闭原因：">
                      <el-input
                        v-model="form.closingreason"
                        placeholder="请填写"
                        style="width:100%"
                        type="textarea"
                        :autosize="{ minRows: 4, maxRows: 4}"
                      ></el-input>
                    </el-form-item>
                  </el-row>
                </div>
              </div>
            </el-form>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="closeVisible = false" size="small">关 闭</el-button>
          <el-button type="primary" @click="closeInquirys()" size="small">保存</el-button>
        </span>
      </el-dialog>

      <!-- 删除询价 -->
      <el-dialog :visible.sync="deleteVisible" width="20%" title="提示" style="top:20%">
        <div class="mail-fitter" style="background:#fff;padding:20px 0;">
          <div class="search-base">
            <div class="goods-fitter">
              <el-row>
                <div class="tip">
                  <img class="tipImg" src="@/common/images/组 180.png" alt />
                  <span>温馨提示：一经删除不可恢复记录！</span>
                  <br />
                  <span>你确定要删除所选内容吗？</span>
                </div>
              </el-row>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="danger"
            @click="deleteVisible = false"
            size="small"
            style="margin-right:33px;"
          >取 消</el-button>
          <el-button type="primary" @click="deleteInquirys()" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 新增客户询价添加商品弹窗 -->
        <el-dialog width="60%" :visible.sync="innerVisible" :modal="true" :append-to-body="false">
          <!-- 新增客户询价添加商品选择品牌弹窗 -->
          <!-- <el-dialog
            width="50%"
            title="选择品牌"
            :visible.sync="brandVisible"
            :modal="false"
            :append-to-body="false"
          >
            <div class="mail-fitter">
              <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px">
                <div class="mail-wrapper">
                  <div class="search-base">
                    <el-row class="warp">
                      <div class="mbottom">
                        <div class="goods-fitter">
                          <el-row>
                            <el-col :span="15" :offset="1">
                              <el-col :span="20">
                                <el-input v-model="form.inquirySheet" placeholder="请输入品牌"></el-input>
                              </el-col>
                              <el-button type="primary">查询</el-button>
                            </el-col>
                          </el-row>
                        </div>
                      </div>
                    </el-row>
                  </div>
                </div>
                <div class="mcard">
                  <el-form label-width="100px" size="small"></el-form>
                  <el-table :data="tableData" border style="width: 100%" stripe>
                    <el-table-column prop="name" label="编号" align="center"></el-table-column>
                  </el-table>
                  <div class="pagination">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="tableData.currentPage"
                      :page-sizes="tableData.sizes"
                      :page-size="tableData.size"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="tableData.total"
                    ></el-pagination>
                  </div>
                </div>
              </el-form>
            </div>

            <span slot="footer" class="dialog-footer">
              <el-button type="danger" @click="brandVisible=false" size="small">关 闭</el-button>
              <el-button type="primary" @click="brandVisible =false" size="small">保存</el-button>
            </span>
          </el-dialog> -->
          <div class="mail-fitter">
            <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
              <div class="mail-wrapper">
                <div class="search-base">
                  <el-row class="warp">
                    <div class="mbottom">
                      <div class="goods-fitter">
                        <h4 class="title1">商品信息</h4>
                        <el-row>
                          <el-col :span="8">
                            <el-form-item label="商品信息：" prop="brand">
                              <el-input v-model="formData.goodsName1" placeholder="请输入商品名称/型号/品牌"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="2" :offset="1">
                            <el-button type="primary"   @click="goodsSearch()" size="small">查询</el-button>
                          </el-col>
                          <el-col :span="6">
                              <el-button type="primary" size="small"  @click="jump">进入商品页面或编辑商品</el-button>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                  </el-row>
                </div>
              </div>
              <div class="mcard1">
                <div class="mcard">
                  <!-- 添加商品商品展示 -->
                  <el-table
                    @row-dblclick="addClick"
                    :data="tableData"
                    stripe
                    style="width: 100%"
                    border
                    ref="elTable"
                    class="goods_index"
                  >
                    <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
                    <el-table-column label="商品图片" align="center" width="120">
                      <template slot-scope="scope">
                        <div
                          class="image"
                          v-if="scope.row.skuList[scope.row.index].thumbnailImgUrl"
                        >
                          <img
                            :src="scope.row.skuList[scope.row.index].thumbnailImgUrl"
                            width="100"
                            height="100"
                            alt
                          />
                        </div>
                        <div v-if="!scope.row.skuList[scope.row.index].thumbnailImgUrl">暂无图片</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="商品信息" align="center" width="150">
                      <template slot-scope="scope">
                        <div style="height: 180px;overflow: auto;" >
                          <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
                          <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                          <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                          <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="规格尺寸" align="center" width="200">
                      <template slot-scope="scope">
                        <div style="position:relative">
                          <!-- <el-button @click="down">向上</el-button> -->
                          <div style="height: 180px;overflow: auto;" :ref="'down'+scope.$index">
                            <div
                              class="txt_left martop"
                              v-for="(item,index) in scope.row.skuList"
                              :key="index"
                            >
                              <div
                                class="txt_left imgitem"
                                @click="Clicktent(index,scope.row)"
                                :class="[index == scope.row.index?'leftbottom':'']"
                              >
                                <div class="more">{{item.goodsSpecValues}}</div>
                              </div>
                            </div>
                          </div>
                         
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="税率" align="center" >
                          <template slot-scope="scope">
                              {{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].taxRate}}%
                          </template>
                    </el-table-column>
                    <el-table-column label="商城价格" align="center" width="180">
                      <template slot-scope="scope">
                        <div style="height: 180px;overflow: auto;" >
                          <div
                            class="txt_left"
                          >商城价：{{scope.row.skuList[scope.row.index].costPrice != 0?scope.row.skuList[scope.row.index].goodsPrice:''}}</div>
                          <div
                            class="txt_left"
                          >京东价：{{scope.row.skuList[scope.row.index].costPrice != 0?scope.row.skuList[scope.row.index].jdPrice:''}}</div>
                         <div class="txt_left">
                            一件代发价：
                            <span
                              class="blue"
                              v-if="scope.row.skuList[scope.row.index].costPrice != 0"
                            >{{scope.row.skuList[scope.row.index].costPrice}}</span>
                            <span v-if="scope.row.skuList[scope.row.index].costPrice == 0">不支持一件代发</span>
                          </div>
                           <div class="txt_left">运费：{{scope.row.skuList[scope.row.index].carriagePrice}}</div>
                          <div
                            class="txt_left"
                          >对外ppt价格：{{scope.row.pptPrice}}</div>
                          <div
                            class="txt_left"
                          >对外最低价格:{{scope.row.minimumPrice}}</div>
                          <div
                            class="txt_left"
                          >对我司的特惠价:{{scope.row.preferentialPrice}}</div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="集采/批发价" align="center" width="150">
                      <template slot-scope="scope">
                        <div style="height: 180px;overflow: auto;" >
                          <div
                            class="txt_left"
                            v-for="(item,index) in scope.row.skuList[scope.row.index].volumeInfo"
                            :key="index"
                          >
                            <div class="txt_left">{{item.volumeCost}}</div>
                            <div class="txt_left">{{item.volumeNumber}}</div>
                            <div class="tex_left">{{item.volumeCarriage}}</div>
                          </div>
                          
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="pagination">
                    <el-pagination
                      @size-change="addHandleSizeChange"
                      @current-change="addHandleCurrentChange"
                      :current-page="formData.current_page"
                      :page-sizes="[2, 5, 10, 50]"
                      :page-size="formData.page_size"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="formData.total_count"
                    ></el-pagination>
                  </div>
                </div>
              </div>
              <div class="mcard1">
                <div class="mcard">
                  <!-- 删除展示的商品 -->
                  <el-table
                    @row-dblclick="deleteRow"
                    :data="selectData"
                    stripe
                    style="width: 100%"
                    border
                    ref="elTable"
                    class="goods_index"
                  >
                     <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
                    <el-table-column label="商品图片" align="center" width="120">
                      <template slot-scope="scope">
                        <div
                          class="image"
                          v-if="scope.row.skuList[scope.row.index].thumbnailImgUrl"
                        >
                          <img
                            :src="scope.row.skuList[scope.row.index].thumbnailImgUrl"
                            width="100"
                            height="100"
                            alt
                          />
                        </div>
                        <div v-if="!scope.row.skuList[scope.row.index].thumbnailImgUrl">暂无图片</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="商品信息" align="center" width="150">
                      <template slot-scope="scope">
                        <div style="height: 180px;overflow: auto;" >
                          <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
                          <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                          <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                          <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                        </div>
                      </template>
                    </el-table-column>
                   <el-table-column label="规格尺寸" align="center" width="200">
                      <template slot-scope="scope"> 
                            <div>{{scope.row.rows.goodsSpecValues}}</div>                   
                      </template>
                    </el-table-column>
                    <el-table-column label="税率" align="center" >
                          <template slot-scope="scope">
                              {{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].taxRate}}%
                          </template>
                    </el-table-column>
                   <el-table-column label="商城价格" align="center" width="180">
                      <template slot-scope="scope">
                        <div style="height: 180px;overflow: auto;" >
                          <div
                            class="txt_left"
                          >商城价：{{scope.row.skuList[scope.row.index].costPrice != 0?scope.row.skuList[scope.row.index].goodsPrice:''}}</div>
                          <div
                            class="txt_left"
                          >京东价：{{scope.row.skuList[scope.row.index].costPrice != 0?scope.row.skuList[scope.row.index].jdPrice:''}}</div>
                         <div class="txt_left">
                            一件代发价：
                            <span
                              class="blue"
                              v-if="scope.row.skuList[scope.row.index].costPrice != 0"
                            >{{scope.row.skuList[scope.row.index].costPrice}}</span>
                            <span v-if="scope.row.skuList[scope.row.index].costPrice == 0">不支持一件代发</span>
                          </div>
                           <div class="txt_left">运费：{{scope.row.skuList[scope.row.index].carriagePrice}}</div>
                          <div
                            class="txt_left"
                          >对外ppt价格：{{scope.row.pptPrice}}</div>
                          <div
                            class="txt_left"
                          >对外最低价格:{{scope.row.minimumPrice}}</div>
                          <div
                            class="txt_left"
                          >对我司的特惠价:{{scope.row.preferentialPrice}}</div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="集采/批发价" align="center" width="150">
                      <template slot-scope="scope">
                        <div style="height: 180px;overflow: auto;" >
                          <div
                            class="txt_left"
                            v-for="(item,index) in scope.row.skuList[scope.row.index].volumeInfo"
                            :key="index"
                          >
                            <div class="txt_left">{{item.volumeCost}}</div>
                            <div class="txt_left">{{item.volumeNumber}}</div>
                            <div class="tex_left">{{item.volumeCarriage}}</div>
                          </div>
                          
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-form>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="innerVisible =false" size="small">关 闭</el-button>
            <el-button type="primary" @click="saveGoods()" size="small">保存</el-button>
          </span>
        </el-dialog>
        <!-- 新增询价单客户选择弹窗 -->
        <el-dialog
          width="60%"
          :visible.sync="customerVisible"
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
                          <!-- <el-col :span="6">
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
                                <el-button type="primary" @click="customerSearch()">查询</el-button>
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
              <div class="mcard1">
                <div class="mcard">
                  <el-form label-width="100px" size="small"></el-form>
                  <el-table
                    :data="list"
                    border
                    style="width: 100%"
                    stripe
                    @row-dblclick="addCustomer"
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
            <el-button type="danger" @click="customerVisible =false" size="small">关 闭</el-button>
            <el-button type="primary" @click="customerVisible =false" size="small">保存</el-button>
          </span>
        </el-dialog>
         <!-- 编辑客户询价添加商品弹窗 -->
        <el-dialog width="60%" :visible.sync="innerVisible1" :modal="true" :append-to-body="false">
          <!-- 编辑客户询价添加商品选择品牌弹窗 -->
          <div class="mail-fitter">
            <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
              <div class="mail-wrapper">
                <div class="search-base">
                  <el-row class="warp">
                    <div class="mbottom">
                      <div class="goods-fitter">
                        <h4 class="title1">商品信息</h4>
                        <el-row>
                          <el-col :span="8">
                            <el-form-item label="商品信息：" prop="brand">
                              <el-input v-model="formData1.goodsName1" placeholder="请输入商品名称/型号/品牌"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="2" :offset="1">
                            <el-button type="primary"   @click="goodsSearch1()" size="small">查询</el-button>
                          </el-col>
                          <el-col :span="6">
                            <el-button type="primary" size="small" @click="jump">进入商品管理页面新增或编辑商品</el-button>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                  </el-row>
                </div>
              </div>
              <div class="mcard1">
                <div class="mcard">
                  <!-- 添加商品商品展示 -->
                  <el-table
                    @row-dblclick="addClick1"
                    :data="tableData1"
                    stripe
                    style="width: 100%"
                    border
                    ref="elTable"
                    class="goods_index"
                  >
                                <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
                    <el-table-column label="商品图片" align="center" width="120">
                      <template slot-scope="scope">
                        <div
                          class="image"
                          v-if="scope.row.skuList[scope.row.index].thumbnailImgUrl"
                        >
                          <img
                            :src="scope.row.skuList[scope.row.index].thumbnailImgUrl"
                            width="100"
                            height="100"
                            alt
                          />
                        </div>
                        <div v-if="!scope.row.skuList[scope.row.index].thumbnailImgUrl">暂无图片</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="商品信息" align="center" width="150">
                      <template slot-scope="scope">
                        <div style="height: 180px;overflow: auto;" >
                          <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
                          <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                          <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                          <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="规格尺寸" align="center" width="200">
                      <template slot-scope="scope">
                        <div style="position:relative">
                          <!-- <el-button @click="down">向上</el-button> -->
                          <div style="height: 180px;overflow: auto;" :ref="'down'+scope.$index">
                            <div
                              class="txt_left martop"
                              v-for="(item,index) in scope.row.skuList"
                              :key="index"
                            >
                              <div
                                class="txt_left imgitem"
                                @click="Clicktent(index,scope.row)"
                                :class="[index == scope.row.index?'leftbottom':'']"
                              >
                                <div class="more">{{item.goodsSpecValues}}</div>
                              </div>
                            </div>
                          </div>
                         
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="税率" align="center" >
                          <template slot-scope="scope">
                              {{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].taxRate}}%
                          </template>
                    </el-table-column>
                   <el-table-column label="商城价格" align="center" width="180">
                      <template slot-scope="scope">
                        <div style="height: 180px;overflow: auto;" >
                          <div
                            class="txt_left"
                          >商城价：{{scope.row.skuList[scope.row.index].costPrice != 0?scope.row.skuList[scope.row.index].goodsPrice:''}}</div>
                          <div
                            class="txt_left"
                          >京东价：{{scope.row.skuList[scope.row.index].costPrice != 0?scope.row.skuList[scope.row.index].jdPrice:''}}</div>
                         <div class="txt_left">
                            一件代发价：
                            <span
                              class="blue"
                              v-if="scope.row.skuList[scope.row.index].costPrice != 0"
                            >{{scope.row.skuList[scope.row.index].costPrice}}</span>
                            <span v-if="scope.row.skuList[scope.row.index].costPrice == 0">不支持一件代发</span>
                          </div>
                           <div class="txt_left">运费：{{scope.row.skuList[scope.row.index].carriagePrice}}</div>
                          <div
                            class="txt_left"
                          >对外ppt价格：{{scope.row.pptPrice}}</div>
                          <div
                            class="txt_left"
                          >对外最低价格:{{scope.row.minimumPrice}}</div>
                          <div
                            class="txt_left"
                          >对我司的特惠价:{{scope.row.preferentialPrice}}</div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="集采/批发价" align="center" width="150">
                      <template slot-scope="scope">
                        <div style="height: 180px;overflow: auto;" >
                          <div
                            class="txt_left"
                            v-for="(item,index) in scope.row.skuList[scope.row.index].volumeInfo"
                            :key="index"
                          >
                            <div class="txt_left">{{item.volumeCost}}</div>
                            <div class="txt_left">{{item.volumeNumber}}</div>
                            <div class="tex_left">{{item.volumeCarriage}}</div>
                          </div>
                          
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="pagination">
                    <el-pagination
                      @size-change="addHandleSizeChange1"
                      @current-change="addHandleCurrentChange1"
                      :current-page="formData1.current_page"
                      :page-sizes="[2, 5, 10, 50]"
                      :page-size="formData1.page_size"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="formData1.total_count"
                    ></el-pagination>
                  </div>
                </div>
              </div>
              <div class="mcard1">
                <div class="mcard">
                  <!-- 删除展示的商品 -->
                  <el-table
                    @row-dblclick="deleteRow1"
                    :data="selectData1"
                    stripe
                    style="width: 100%"
                    border
                    ref="elTable"
                    class="goods_index"
                  >
                      <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
                    <el-table-column label="商品图片" align="center" width="120">
                      <template slot-scope="scope">
                        <div
                          class="image"
                          v-if="scope.row.skuList[scope.row.index].thumbnailImgUrl"
                        >
                          <img
                            :src="scope.row.skuList[scope.row.index].thumbnailImgUrl"
                            width="100"
                            height="100"
                            alt
                          />
                        </div>
                        <div v-if="!scope.row.skuList[scope.row.index].thumbnailImgUrl">暂无图片</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="商品信息" align="center" width="150">
                      <template slot-scope="scope">
                        <div style="height: 180px;overflow: auto;" >
                          <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
                          <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                          <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                          <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                        </div>
                      </template>
                    </el-table-column>
                   <el-table-column label="规格尺寸" align="center" width="200">
                      <template slot-scope="scope"> 
                            <div>{{scope.row.rows.goodsSpecValues}}</div>                   
                      </template>
                    </el-table-column>
                    <el-table-column label="税率" align="center" >
                          <template slot-scope="scope">
                              {{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].taxRate}}%
                          </template>
                    </el-table-column>
                   <el-table-column label="商城价格" align="center" width="180">
                      <template slot-scope="scope">
                        <div style="height: 180px;overflow: auto;" >
                          <div
                            class="txt_left"
                          >商城价：{{scope.row.skuList[scope.row.index].costPrice != 0?scope.row.skuList[scope.row.index].goodsPrice:''}}</div>
                          <div
                            class="txt_left"
                          >京东价：{{scope.row.skuList[scope.row.index].costPrice != 0?scope.row.skuList[scope.row.index].jdPrice:''}}</div>
                         <div class="txt_left">
                            一件代发价：
                            <span
                              class="blue"
                              v-if="scope.row.skuList[scope.row.index].costPrice != 0"
                            >{{scope.row.skuList[scope.row.index].costPrice}}</span>
                            <span v-if="scope.row.skuList[scope.row.index].costPrice == 0">不支持一件代发</span>
                          </div>
                           <div class="txt_left">运费：{{scope.row.skuList[scope.row.index].carriagePrice}}</div>
                          <div
                            class="txt_left"
                          >对外ppt价格：{{scope.row.pptPrice}}</div>
                          <div
                            class="txt_left"
                          >对外最低价格:{{scope.row.minimumPrice}}</div>
                          <div
                            class="txt_left"
                          >对我司的特惠价:{{scope.row.preferentialPrice}}</div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="集采/批发价" align="center" width="150">
                      <template slot-scope="scope">
                        <div style="height: 180px;overflow: auto;" >
                          <div
                            class="txt_left"
                            v-for="(item,index) in scope.row.skuList[scope.row.index].volumeInfo"
                            :key="index"
                          >
                            <div class="txt_left">{{item.volumeCost}}</div>
                            <div class="txt_left">{{item.volumeNumber}}</div>
                            <div class="tex_left">{{item.volumeCarriage}}</div>
                          </div>
                          
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>

                  <div class="pagination">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="form.current_page"
                      :page-sizes="[10, 30, 50, 100]"
                      :page-size="form.page_size"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="form.total_count"
                    ></el-pagination>
                  </div>
                </div>
              </div>
            </el-form>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="innerVisible1 =false" size="small">关 闭</el-button>
            <el-button type="primary" @click="saveGoods1()" size="small">保存</el-button>
          </span>
        </el-dialog>
        <!-- 编辑询价单客户选择弹窗 -->
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
                                  v-model="customerDatas1.keywords"
                                  placeholder="请输入客户名称/联系人/手机号"
                                ></el-input>
                              </el-col>
                              <el-col :offset="1" :span="2">
                                <el-button type="primary" @click="customerSearch1">查询</el-button>
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
              <div class="mcard1">
                <div class="mcard">
                  <el-form label-width="100px" size="small"></el-form>
                  <el-table
                    :data="list1"
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
                      @size-change="customerhanHleSizeChange1"
                      @current-change="customerHandleCurrentChange1"
                      :current-page="customerDatas1.pageNum"
                      :page-sizes="[10, 30, 50, 100]"
                      :page-size="customerDatas1.pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="customerDatas1.total_count"
                    ></el-pagination>
                  </div>
                </div>
              </div>
            </el-form>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="customerVisible1 =false" size="small">关 闭</el-button>
            <el-button type="primary" @click="customerVisible1 =false" size="small">保存</el-button>
          </span>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  getGoods,
  changeState,
  deleteGoods,
  getScene,
  getErpGoods
} from "@/api/product/index";
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
  toSalesRepresentative
} from "@/api/sale/index";
import { getCategory, getStoreList } from "@/api/public";
import { getAllcustomer } from "@/api/customer";
import { throttleTipPop } from "@/utils/functions.js";
import Goods from "./goods";
export default {
  filters: {
    invoice: function(val) {
      switch (val) {
        case 0:
          return "无需发票";
          break;
        case 1:
          return "增值税专用发票";
          break;
        case 2:
          return "普通发票";
          break;

        default:
          return;
      }
    },
    
  },
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
      deleteVisible: false, //删除询价单弹窗
      pushVisible: false, //推送给采购员
      brandVisible: false, //新增询价单新增商品品牌弹窗
      innerVisible: false, //新增询价单新增商品弹窗
      addVisible: false, //新增询价单弹窗
      customerVisible: false, //新增询价单客户选择弹窗
      editVisible: false, //编辑询价单
      innerVisible1: false, //编辑询价单新增商品弹窗
      customerVisible1: false, //编辑询价单客户选择弹窗
      brandVisible1: false, //编辑询价单新增商品品牌弹窗\
      saleVisible: false, //移交销售弹窗
      closeVisible: false, //关闭询价
      currentIndex: 0,
      saleChoose: "", //采销选择的值
      mainIndex: "Goods",
      toInquiryId: "", //转交采销需要的ID
      toInquiryNo: "", //转交采销需要的单号
      organizeName: "", //所属组名称
      sysuserName: "", //销售名称
      timer:'',
      timer1:'',
      color: "",
      value1: "",
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
        },
      ],
      options3: [
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
        },
      ],
       options2: [
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
        },
      ],
      options1: [
        {
          value: 0,
          label: "未完成询价单"
        },
      /*   {
          value: 1,
          label: "往期询价单"
        }, */
        {
          value: -1,
          label: "已关闭询价单"
        }
      ],
      forms: {
        cutCardFlag:0,//切卡标志
        enquiryNumber: "", //询价单号,
        customerName: "", //客户
        invoiceType: "", //发票状态
        productSearch: "", //产品搜索
        creatTime: [], //新增时间
        type: 0, //状态
        startTime: "",
        endTime: "",
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
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
        invoiceType: 1, //发票类型
        platformName: "线下平台", //平台名称
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
      formData: {
        current_page: 1,
        page_size: 2,
        total_count: 0,
        goodsName1:'',
      },
      formData1: {
        current_page: 1,
        page_size: 2,
        total_count: 0,
        goodsName1:'',
      },
      formDatas: {
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
      writeData: {
        color: "",
        num: "",
        budget: "",
        request: "",
        transport: "",
        address: "",
        deliveryCycle: ""
      },
      customerDatas: {
        pageNum: 1,
        pageSize: 10,
        total_count: 0,
        keywords: ""
      },
      customerDatas1: {
        pageNum: 1,
        pageSize: 10,
        total_count: 0,
        keywords: ""
      },
      deleteId: "", //删除ID
      deleteNo: "",
      closeId: "", //关闭ID
      closeNo: "",
      getIndex: "",
      inquiryData: [],
      tableData: [],
      tableData1:[],
      selectData: [],
      selectData1: [],
      goodsData: [],
      saleGroup: [], //采销组下拉列表
      saleList: [], //销售员下拉列表
      editData: {
        customerName: "",
        customerContact: "",
        dealDate: "",
        inquiryNo: "",
        saleUserName: "",
        department: "",
        phone: "",
        tel: "",
        email: "",
        platformName: "",
        offerEndTime: "",
        dealDate: "",
        invoiceType: ""
      },
      editDatas: {},
      editGoodsData: [],
      list: [], //客户列表
      list1: [],//编辑客户列表
      customerData: [], //客户数据
      customerData1: [], //编辑客户数据
      index: "",
      elTable: [],
      count: "",
      page: "",
      rules: {
        contacts: [
          { required: true, message: "此项为必填项", trigger: ['blur', 'change'] }
        ],
        mobilePhone: [
          { required: true, validator: checkMobile, trigger: ['blur', 'change'] }
        ],
        phone:[
           { required: true, validator: checkMobile, trigger: ['blur', 'change'] }
        ],
        quotationPeriod: [
          { required: true, message: "此项为必填项", trigger: ['blur', 'change'] }
        ],
        deliveryDate: [
          { required: true, message: "此项为必填项", trigger: ['blur', 'change'] }
        ],
        mail:[{ required: false,validator: checkEmail, trigger: ['blur', 'change'] }
        ],
        email:[{ required: false,validator: checkEmail, trigger: ['blur', 'change'] }
        ],
        address: [{ required: true, message: "此项为必填项", trigger: ['blur', 'change'] }
        ],
        customerName: [
          { required: true, message: "此项为必填项", trigger: ['blur', 'change'] }
        ],
        platformName: [
          { required: true, message: "此项为必填项", trigger: ['blur', 'change'] }
        ],
        projectName:[
          { required: true, message: "此项为必填项", trigger: ['blur', 'change'] }
        ],
        department: [
          { required: true, message: "此项为必填项", trigger: ['blur', 'change'] }
        ],
        customerContact: [
          { required: true, message: "此项为必填项", trigger: ['blur', 'change'] }
        ],
        offerEndTime: [
          { required: true, message: "此项为必填项", trigger: ['blur', 'change'] }
        ],
         invoiceType:[
           { required: true, message: "此项为必选项", trigger: ['blur', 'change'] }
        ]
        /*  customerName:[{ required: true, message: "此项为必填项", trigger: "blur" }
                ],
                platformName:[{ required: true, message: "此项为必填项", trigger: "blur" }
                ],
                department:[{ required: true, message: "此项为必填项", trigger: "blur" }
                ], */
      }
    };
  },
  created() {
    this._getGoods();
    this._getInquiry();
    this.getName();
    this._getErpGoods1();
  },
  watch: {
    "forms.createTime": {
      handler(val, old) {
        if(val===null){
            this.forms.startTime = '';
        this.forms.endTime = '';
        }else{
            this.forms.startTime = val[0];
        this.forms.endTime = val[1];
        }
        

      },
      deep: true
    },
    'goodsData':{
      handler(val){      
        if(val){
          clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.getBudget(val);
        this.getBudgetAmount(val);
        this.compareSizes(val);
      },1500)
      
        }
      },deep:true,
    },
    'editDatas.goodsDetailEditVo':{
      handler(val){      
        if(val){
          
          clearTimeout(this.timer1);
      this.timer1 = setTimeout(() => {
        this.getBudget(val);
        this.getBudgetAmount(val);
        this.compareSizes(val);
      },1500)
      
        }
      },deep:true,
    },
  },
  computed: {},
  methods: {
    tabIndex(index) {
      this.currentIndex = index;
    },
    addClose(){
         this.$confirm('您确认要关闭吗？')
                    .then(_ => {
                this.addVisible = false;
            })
            .catch(_ => {});
    },
    addClosing(){
        this.$confirm('您确认要关闭吗？')
                    .then(_ => {
                this.addVisible = false;
            })
            .catch(_ => {});
    },
     editClose(){
         this.$confirm('您确认要关闭吗？')
                    .then(_ => {
                this.editVisible = false;
            })
            .catch(_ => {});
    },
    editClosing(){
        this.$confirm('您确认要关闭吗？')
                    .then(_ => {
                this.editVisible = false;
            })
            .catch(_ => {});
    },
    //监听
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
    getName(){
        var books=localStorage.getItem("user");//得到字符串
        var obj=JSON.parse(books);
        console.log(obj);
        this.form.salesRepresentatives = obj.data.sysuserName      
    },
    //搜索商品
    goodsSearch(){
      this._getGoods();
    },
     goodsSearch1(){
      this._getErpGoods1()
    },
    //编辑获取ERP商品
    _getErpGoods1(){
      getErpGoods(this.formData1).then(res => {
        this.tableData1 = res.data.pageList;

        this.tableData1.forEach(item => {
          item.top = 0;
        });
        this.formData1.total_count = res.data.count;
      });
    },
    //查询
    inSearch() {
      this.forms.pageIndex = 1;
      getInquiry(this.forms).then(res => {
        if (res.code === 200) { 
          this.inquiryData = res.data.pageList;
          this.forms.total_count = res.data.count;
          
        }
        this.resetData();
      });
    },
    resetData(){
        this.count = 0;
        this.page = [];
        this.closeNo = '';
        this.getIndex ='';
    },
    //删除询价单弹窗
    deleteData(row) {
      console.log(row);
      this.deleteVisible = true;
      this.deleteNo = row.inquiryNo;
      this.deleteId = row.inquiryId;
    },
     //删除询价单
    deleteInquirys() {
      deleteInquiry(this.deleteId).then(res => {
        if (res.code === 200) {
          throttleTipPop(this, "success", "删除成功", 2000);
          this.deleteVisible = false;
          this.resetData();
          this._getInquiry();
        } else {
          return false;
        }
      });
    },
    //新增询价单
    addInquirys() {
      var arrss = [];
      for (let i = 0; i < this.goodsData.length; i++) {
        let obj = {};
        obj.brandName = this.goodsData[i].brandName;
        obj.budgetAmount = this.goodsData[i].budgetAmount;
        obj.minCostBudgetAmount = this.goodsData[i].minCostBudgetAmount;
        obj.maxCostBudgetAmount = this.goodsData[i].maxCostBudgetAmount;
        obj.deliveryCycle = this.goodsData[i].deliveryCycle;
        obj.distAddress = this.goodsData[i].address;
        obj.goodsColor = this.goodsData[i].color;
        obj.goodsCount = this.goodsData[i].num;
        obj.goodsId = this.goodsData[i].goodsId;
        obj.goodsName = this.goodsData[i].goodsName;
        obj.goodsSkuId = this.goodsData[i].rows.skuId;
        obj.goodsSn = this.goodsData[i].goodsSn;
        obj.goodsSpecSize = this.goodsData[i].rows.goodsSpecValues;
        obj.goodsUnit = this.goodsData[i].unitName;
        obj.modelNumber = this.goodsData[i].modelNumber;
        obj.productRequire = this.goodsData[i].request;
        obj.goodsImgUrl = this.goodsData[i].rows.thumbnailImgUrl;
        /*   obj.sigdId = this.goodsData[i].rows.specValueIds */
        obj.transportMode = this.goodsData[i].transport;//交通方式
        obj.taxRate = this.goodsData[i].rows.taxRate;//税率
        obj.tmallPrice = this.goodsData[i].tmallPrice;//天猫价格
        obj.jdPrice = this.goodsData[i].jdPrice;//京东价格
        obj.marketPrice = this.goodsData[i].marketPrice;//商城价格
        obj.minVolumePrice = this.goodsData[i].minimumPrice;//对外最低价格
        arrss.push(obj);
      }
      this.form.arrs = arrss;

      if (
        !this.form.customerName ||
        !this.form.mobilePhone ||
        !this.form.platformName ||
        !this.form.contacts ||
        !this.form.quotationPeriod ||
        !this.form.department ||
        this.form.invoiceType===""
      ) {
        throttleTipPop(this, "warning", "请填写带*号的填项", 2000);
      } else {
        addInquiry(this.form).then(res => {
          if (res.code === 200) {
            console.log(res);
            this.$message({ message: "新添加询价单成功", type: "success" });
            this.addVisible = false;
            this.resetData();
            this._getInquiry();
          }
        });
      }
    },
   
    addHandleSizeChange(val) {
      this.formData.page_size = val;
      this._getGoods();
    },
    addHandleCurrentChange(val) {
      this.formData.current_page = val;
      this._getGoods();
    },
     addHandleSizeChange1(val) {
      this.formData1.page_size = val;
      this._getErpGoods1()
    },
    addHandleCurrentChange1(val) {
      this.formData1.current_page = val;
      this._getErpGoods1()
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    AhandleSizeChange(val) {
      this.forms.page_size = val;
      this.resetData();
      this._getInquiry();
    },
    AhandleCurrentChange(val) {
      this.forms.current_page = val;
      this.resetData();
      this._getInquiry();
    },
    //新增询价单
    addInquirySheet() {
      this.addVisible = true;
    },
    //编辑询价单
    editInquirySheet(row) {
      this.editVisible = true;
      this.toInquiryNo = row.inquiryNo;

      findInquiry(row.inquiryId).then(res => {
        /*          if(res.data.invoiceType===0){
                res.data.invoiceType = "不要发票"
              }else if(res.data.invoiceType===1){
                res.data.invoiceType = "普通发票"
              }else{
                res.data.invoiceType = "增值税专用发票"
              } */
        this.editDatas = res.data;
      });
     
    },
    editInquirys() {
      var arrss = [];
      for (let i = 0; i < this.editDatas.goodsDetailEditVo.length; i++) {
        let obj = {};
        obj.brandName = this.editDatas.goodsDetailEditVo[i].brandName;
        obj.budgetAmount = this.editDatas.goodsDetailEditVo[i].budgetAmount;
        obj.minCostBudgetAmount = this.editDatas.goodsDetailEditVo[i].minCostBudgetAmount;
        obj.maxCostBudgetAmount = this.editDatas.goodsDetailEditVo[i].maxCostBudgetAmount;
        obj.deliveryCycle = this.editDatas.goodsDetailEditVo[i].deliveryCycle;
        obj.distAddress = this.editDatas.goodsDetailEditVo[i].distAddress;
        obj.goodsColor = this.editDatas.goodsDetailEditVo[i].goodsColor;
        obj.goodsCount = this.editDatas.goodsDetailEditVo[i].goodsCount;
        obj.goodsId = this.editDatas.goodsDetailEditVo[i].goodsId;
        obj.goodsName = this.editDatas.goodsDetailEditVo[i].goodsName;
        obj.goodsSkuId = this.editDatas.goodsDetailEditVo[i].goodsSkuId;
        obj.goodsSn = this.editDatas.goodsDetailEditVo[i].goodsSn;
        obj.goodsSpecSize = this.editDatas.goodsDetailEditVo[i].goodsSpecSize;
        obj.goodsUnit = this.editDatas.goodsDetailEditVo[i].goodsUnit;
        obj.modelNumber = this.editDatas.goodsDetailEditVo[i].modelNumber;
        obj.productRequire = this.editDatas.goodsDetailEditVo[i].productRequire;
        obj.goodsImgUrl = this.editDatas.goodsDetailEditVo[i].goodsImgUrl;
          obj.sigdId = this.editDatas.goodsDetailEditVo[i].sigdId;
        obj.transportMode = this.editDatas.goodsDetailEditVo[i].transportMode;
        obj.taxRate = this.editDatas.goodsDetailEditVo[i].taxRate;
        obj.tmallPrice = this.editDatas.goodsDetailEditVo[i].tmallPrice;//天猫价格
        obj.jdPrice = this.editDatas.goodsDetailEditVo[i].jdPrice;//京东价格
        obj.marketPrice = this.editDatas.goodsDetailEditVo[i].marketPrice;//商城价格
        obj.minVolumePrice = this.editDatas.goodsDetailEditVo[i].minimumPrice;//对外最低价格
        arrss.push(obj);
        this.editDatas["arrss"] = arrss;
      }
      console.log(this.editDatas);
        if (
         !this.editDatas.customerName ||
        !this.editDatas.phone ||
        !this.editDatas.customerContact ||
        !this.editDatas.projectName ||
        !this.editDatas.offerEndTime||
        !this.editDatas.department ||
        this.editDatas.invoiceType===""
      ) {
        throttleTipPop(this, "warning", "请填写带*号的填项", 2000);
      }else{
         editInquiry(this.editDatas).then(res => {
        if (res.code === 200) {
          throttleTipPop(this, "success", "修改询价单成功", 2000);
          this.editVisible = false;
          this.resetData();
          this._getInquiry();
        }
      });
      }
     
    },
    //关闭询价单弹窗
    closeInquirySheet() {
      if (this.closeId !== "") {
        this.closeVisible = true;
      } else {
        throttleTipPop(this, "warning", "请选择要关闭的询价单", 2000);
      }
    },
    //关闭询价单
    closeInquirys() {
      let obj = {};
      obj.closeReason = this.form.closingreason;
      obj.inquiryId = this.closeId;
      closeInquiry(obj).then(res => {
        if (res.code === 200) {
          throttleTipPop(this, "success", "关闭询价单成功", 2000);
          this.closeVisible = false;
          this.resetData();
          this._getInquiry();
        }
      });
    },
    //查询询价单分页
    _getInquiry() {
      getInquiry(this.forms).then(res => {
        if (res.code === 200) {
          this.inquiryData = res.data.pageList;
          this.forms.total_count = res.data.count;
        }
      });
    },
    //查询
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
    Clicktent(val, data) {
      data.index = val;
      console.log(this.$refs.elTable);
      this.$set(this.$refs.elTable.data);
      this.$forceUpdate();
    },
    //选择客户
    chooseCustomer() {
      this.customerVisible = true;
      this._getAllcustomer();
    },
    chooseCustomer1() {
      this.customerVisible1 = true;
      this._getAllcustomer1();
    },
    //客户查询
    customerSearch() {
      this._getAllcustomer();
    },
    customerSearch1() {
      this._getAllcustomer1();
    },
    _getAllcustomer() {
      getAllcustomer(this.customerDatas).then(res => {
        this.list = res.data.list;

      });
    },
    _getAllcustomer1() {
      getAllcustomer(this.customerDatas1).then(res => {
        this.list1 = res.data.list;
        this.customerDatas1.total_count = res.data.total;
      });
    },
    //双击添加客户
    addCustomer(row) {
      var copy = JSON.parse(JSON.stringify(row));
      this.customerData.splice(0, 1, copy);
      console.log(this.customerData);
      this.form.customerName =
        this.customerData[0] && this.customerData[0].customerName;
      this.form.customerId =
        this.customerData[0] && this.customerData[0].customerId;
      this.form.contacts =
        this.customerData[0] && this.customerData[0].commonContactName;
      this.form.mobilePhone =
        this.customerData[0] && this.customerData[0].commonContactPhone;
      this.form.phoneNumber =
        this.customerData[0] && this.customerData[0].commonContactTel;
      this.form.address =
        this.customerData[0] && this.customerData[0].customerAddress;
      this.form.department =
        this.customerData[0] && this.customerData[0].commonContactDept;
      this.form.mail =
        this.customerData[0] && this.customerData[0].commonContactEmail;
      this.customerVisible = false;
    },
    addCustomer1(row) {
      var copy = JSON.parse(JSON.stringify(row));
      this.customerData1.splice(0, 1, copy);
      console.log(this.customerData1);
      this.editDatas.customerName =
        this.customerData1[0] && this.customerData1[0].customerName;
      this.editDatas.customerId =
        this.customerData1[0] && this.customerData1[0].customerId;
      this.editDatas.customerContact =
        this.customerData1[0] && this.customerData1[0].commonContactName;
      this.editDatas.phone =
        this.customerData1[0] && this.customerData1[0].commonContactPhone;
      this.editDatas.tel =
        this.customerData1[0] && this.customerData1[0].commonContactTel;
      this.editDatas.distAddress =
        this.customerData1[0] && this.customerData1[0].customerAddress;
      this.editDatas.department =
        this.customerData1[0] && this.customerData1[0].commonContactDept;
      this.editDatas.email =
        this.customerData1[0] && this.customerData1[0].commonContactEmail;
      this.customerVisible1 = false;
    },
    //双击添加商品
    addClick(row) {
      this.index = row.index;
      row["rows"] = row.skuList[this.index];
      row['tmallPrice'] = row.skuList[this.index].tmallPrice;
      row['jdPrice'] = row.skuList[this.index].jdPrice;
      row['marketPrice'] = row.skuList[this.index].marketPrice
      row['minVolumePrice'] = row.minimumPrice;
      //深度克隆
      let copy = JSON.parse(JSON.stringify(row));
      console.log(copy);
      
      if(this.selectData.length>=1){
            //遍历判断是否存在相同规格的商品在列表
            for(let i= 0 ;i<this.selectData.length;i++){
              if(this.selectData[i].rows.skuId == copy.rows.skuId){
                  throttleTipPop(this, "error", "已经存在相同规格的商品，不能重复添加！", 2000);
                  return false
              } 
        }
        this.selectData.push(copy);
      }else if(this.selectData.length<=0){
          this.selectData.push(copy);   
      } 
      let arr = this.selectData;
      arr.forEach(v => {
        v["color"] = "";
        v["num"] = "1";
        v["minCostBudgetAmount"] = "";
        v['maxCostBudgetAmount'] = '';
        v["budgetAmount"]= '';
        v["request"] = "";
        v["transport"] = "";
        v["address"] = "";
        v["deliveryCycle"] = "";
        
      });
      var copy1 = JSON.parse(JSON.stringify(arr));
      this.selectData = copy1;
      console.log(this.selectData);
    },
    addClick1(row) {
      this.index = row.index;
      row["goodsSpecSize"] = row.skuList[this.index].goodsSpecValues;
      row["goodsUnit"] = row.unitName;
      row["goodsSkuId"] = row.skuList[this.index].skuId;
      row["rows"] = row.skuList[this.index];
      row['tmallPrice'] = row.skuList[this.index].tmallPrice;
      row['jdPrice'] = row.skuList[this.index].jdPrice;
      row['marketPrice'] = row.skuList[this.index].marketPrice
      row['minVolumePrice'] = row.minimumPrice;
      row['taxRate'] = row.skuList[this.index].taxRate;
      row['goodsImgUrl'] = row.skuList[this.index].thumbnailImgUrl;
      //深度克隆
      let copy = JSON.parse(JSON.stringify(row));
      if(this.selectData1.length>=1){
            //遍历判断是否存在相同规格的商品在列表
            for(let i= 0 ;i<this.selectData1.length;i++){
              if(this.selectData1[i].goodsSkuId== copy.goodsSkuId){
                  throttleTipPop(this, "error", "已经存在相同规格的商品，不能重复添加！", 2000);
                  return false
              } 
        }
        this.selectData1.push(copy);
      }else if(this.selectData1.length<=0){
          this.selectData1.push(copy);   
      } 
      let arr = this.selectData1;
      arr.forEach(v => {
        v["goodsColor"] = "";
        v["goodsCount"] = "1";
        v["budgetAmount"] = "";
        v["minCostBudgetAmount"] = "";
        v['maxCostBudgetAmount'] = '';
        v["productRequire"] = "";
        v["distAddress"] = "";
        v["transportMode"] = "";
        v["deliveryCycle"] = "";
        v['sigdId'] = '';
      });
      var copy1 = JSON.parse(JSON.stringify(arr));
      this.selectData1 = copy1;
      console.log(this.selectData1);
    },
    //双击删除商品
    deleteRow(row) {
      for (var i = 0; i < this.selectData.length; i++) {
        if (this.selectData[i].rows.skuId == row.rows.skuId) {
          this.selectData.splice(i, 1);
          console.log(i);
        }
      }
    },
    deleteRow1(row) {
      for (var i = 0; i < this.selectData1.length; i++) {
        if (this.selectData1[i].goodsSkuId == row.goodsSkuId) {
          this.selectData1.splice(i, 1);
          console.log(i);
        }
      }
    },
    //保存商品选择
    saveGoods() {
       if(this.goodsData.length>=1){
            //遍历判断是否存在相同规格的商品在列表
            var arr =[]
            //如果等于长度就会多出一次循环，就会报错
            for(let i= 0 ;i<this.goodsData.length;i++){
              for(let j= 0 ;j<this.selectData.length;j++){
                if(this.goodsData[i].rows&&this.goodsData[i].rows.skuId == this.selectData[j].rows.skuId){
                    throttleTipPop(this, "error", "已经存在相同规格的商品，不能重复添加！", 2000);
                    return false
                }
              } 
        }
       arr= this.goodsData.concat(this.selectData);  
      }else if(this.goodsData.length<=0){
         arr= this.goodsData.concat(this.selectData);  
      } 
      this.selectData = [];
      this.innerVisible = false;

      var copy = JSON.parse(JSON.stringify(arr));

      this.goodsData = copy;
      console.log(this.goodsData);
    },
    saveGoods1() {
       if(this.editDatas.goodsDetailEditVo.length>=1){
            //遍历判断是否存在相同规格的商品在列表
            var arr =[]
            //如果等于长度就会多出一次循环，就会报错
            for(let i= 0 ;i<this.editDatas.goodsDetailEditVo.length;i++){
              for(let j= 0 ;j<this.selectData1.length;j++){
                if(this.editDatas.goodsDetailEditVo[i]&&this.editDatas.goodsDetailEditVo[i].goodsSkuId == this.selectData1[j].goodsSkuId){
                    throttleTipPop(this, "error", "已经存在相同规格的商品，不能重复添加！", 2000);
                    return false
                }
              } 
        }
       arr= this.editDatas.goodsDetailEditVo.concat(this.selectData1);  
      }else if(this.editDatas.goodsDetailEditVo.length<=0){
         arr= this.editDatas.goodsDetailEditVo.concat(this.selectData1);  
      } 
      this.innerVisible1 = false;
      this.selectData1 = [];

      var copy = JSON.parse(JSON.stringify(arr));

      this.editDatas.goodsDetailEditVo = copy;

      console.log(this.editDatas.goodsDetailEditVo);
    },

    selectedHighlight({ row, rowIndex }) {
      if (this.getIndex === rowIndex) {
        return {
          "background-color": "#e4ecfa"
        };
      }
    },

    tableRowClassName({ row, rowIndex }) {
      //把每一行的索引放进row
      row.index = rowIndex;
    },
    //双击选定
    AhandleSelectionChange(row) {
      this.getIndex = row.index;
      this.closeNo = row.inquiryNo;
      this.closeId = row.inquiryId;

      let obj ={};
      obj.pageIndex = 1;
      obj.pageSize = 10;
      obj.inquiryNo = row.inquiryNo
      getInGoods(obj).then(res => {
        this.count = res.data.count;
        this.page = res.data.pageList;
      });
    },
    handleSelectionChange(val) {
      this.elTable = val;
     /*  const arr = [];
      for (var i = 0; i < this.goodsData.length; i++) {
        if (
          this.goodsData[i].rows.skuId ===
          (this.elTable[0] && this.elTable[0].rows.skuId)
        ) {
          arr.push(i);
        }  
      } */
      
    },
    //选择删除
    deleteGoods() {
      var that = this
      // 拿到选中的数据；
      var val = this.elTable
      // 如果选中数据存在
      if (val) {
        // 将选中数据遍历
        val.forEach(function (item, index) {
          // 遍历源数据
          that.goodsData.forEach(function (itemI, indexI) {
            // 如果选中数据跟元数据某一条标识相等，删除对应的源数据
            if (item.rows.skuId === itemI.rows.skuId) {
              that.goodsData.splice(indexI, 1)
            }
          })
        })
        
      }
      // 清除选中状态
      this.$refs.elTable1.clearSelection()
      
      
    },
    //选择删除编辑中的商品
    deleteGoods1() {

      var that = this
      // 拿到选中的数据；
      var val = this.elTable
      // 如果选中数据存在
      if (val) {
        // 将选中数据遍历
        val.forEach(function (item, index) {
          // 遍历源数据
          that.editDatas.goodsDetailEditVo.forEach(function (itemI, indexI) {
            // 如果选中数据跟元数据某一条标识相等，删除对应的源数据
            if (item.goodsSkuId === itemI.goodsSkuId) {
              that.editDatas.goodsDetailEditVo.splice(indexI, 1)
            }
          })
        })
        
      }
      // 清除选中状态
      this.$refs.elTable2.clearSelection()
      
    },
    //移交采购窗口
    pushSale(row) {
      this.pushVisible = true;
      this.toInquiryNo = row.inquiryNo;
      this.toInquiryId = row.inquiryId;
      saleInquirys().then(res => {
        console.log(res);
        this.saleGroup = res.data.childNodes;
      });
    },
    //保存移交采购
    toSaler() {
      let obj = {};
      obj.groupId = this.saleChoose;
      obj.inquiryId = this.toInquiryId;
      obj.organizeName = this.organizeName;
      if(obj.groupId!==''&&obj.inquiryId!==''){
          toSaleInquirys(obj).then(res => {
            if (res.code === 200) {
              this._getInquiry();
              throttleTipPop(this, "success", "移交采购询价成功", 2000);
              this.pushVisible = false;
            }
          });
          }else{
            throttleTipPop(this, "error", "请选择采购组", 2000);
          }
      /* window.location.reload()  */
    },
    selectGet(vId) {
      //这个vId也就是value值
      let obj = {};
      obj = this.saleGroup.find(item => {
        //这里是上面遍历的数据源
        return item.organizeId === vId; //筛选出匹配数据
      });
      console.log(obj.organizeName);
      this.organizeName = obj.organizeName;
    },
    //移交销售窗口
    pushToSale(row) {
      this.saleVisible = true;
      this.toInquiryNo = row.inquiryNo;
      this.toInquiryId = row.inquiryId;

      let obj = {};
      obj.pageSize = 10;
      obj.pageNum = 1;
      toSaleUser(obj).then(res => {
        this.saleList = res.data.list;
      });
    },
    //移交销售员
    saveSale() {
      let obj = {};
      obj.sysuserName = this.sysuserName;
      obj.inquiryId = this.toInquiryId;
      obj.sysuserId = this.form.toSale;
        if(obj.sysuserName!==''&&obj.sysuserId!==''){
          toSalesRepresentative(obj).then(res => {
              if (res.code === 200) {
                throttleTipPop(this, "success", "移交销售员成功", 2000);
                this.saleVisible = false;
                this.resetData();
                this._getInquiry();
              }
            });
        }else{
          throttleTipPop(this, "error", "请选择销售员", 2000);
        }
    },
    //跳转
    jump(){
      let routeData = this.$router.resolve({
        name: "ProductList",
      });
      window.open(routeData.href, '_blank');
      
    },
    //跳到客户页面
    toCustomer(){
      let routeData = this.$router.resolve({
        name: "Data",
      });
      window.open(routeData.href, '_blank');
    },
    selectGet1(vId) {
      //这个vId也就是value值
      let obj = {};
      obj = this.saleList.find(item => {
        //这里是上面遍历的数据源
        return item.sysuserId === vId; //筛选出匹配数据
      });
      console.log(obj.sysuserId);
      this.sysuserName = obj.sysuserName;
    },
 
    customerhanHleSizeChange(val) {
      this.customerDatas.pageSize = val;
      this._getAllcustomer();
    },
    customerHandleCurrentChange(val) {
      this.customerDatas.pageNum = val;
      this._getAllcustomer();
    },
      customerhanHleSizeChange1(val) {
      this.customerDatas1.pageSize = val;
      this._getAllcustomer1();
    },
    customerHandleCurrentChange1(val) {
      this.customerDatas1.pageNum = val;
      this._getAllcustomer1();
    }
  },

  components: {
    Goods
  }
};
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
#inquirys {
  .el-dialog__body {
    padding: 0 !important;
    background: none !important;
  }
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
      max-width: 240px;
      margin-right: 5px;
    }
    .el-date-picker {
      max-width: 240px;
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
  .detail {
    font-size: 14px;
    color: #606266;
  }
  .i-div {
    cursor: pointer;
  }

  .line-div {
    overflow: hidden;
      .small-Idiv{
        width: 50%;
        padding-top: 10px;
        float: left;

      } 
  }
 
  .fuzhi {
    background: rgba(229, 162, 75, 1);
  }
  .huishouzhan {
    background: rgba(247, 108, 110, 1);
  }
  .el-select-width {
    max-width: 300px;
    margin-right: 5px;
  }
  .el-date-picker {
    max-width: 240px;
    margin-right: 5px;
  }
  .el-input-width {
    display: inline-block;
    max-width: 180px;
  }
  .el-select {
    width: 100% !important;
  }
  //自定义表格样式
  .martop {
    margin-top: 10px;
  }
  .imgitem {
    display: flex;
    align-items: center;
    img {
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }
  }

  .more {
    cursor: pointer;
  }
  .mores {
    padding-top: 110px;
    box-sizing: border-box;
  }
  .blue {
    color: #4a99fa !important;
    cursor: pointer;
  }
  .goods_num {
    color: #f66c6c !important;
    font-size: 16px;
    margin-right: 5px;
  }
  .leftbottom {
    color: #4a99fa;
    border-bottom: 1px dashed rgba(215, 220, 231, 1);
    padding-bottom: 8px;
  }
  
 
  .mcard1 {
    border: 1px solid #d7e0f1;
    margin-top: 20px;
  }
  .pushTip {
    padding-left: 98px;
    padding-right: 70px;
    .star {
      color: red;
    }
  }
  .txt_red {
    color: #f66c6c;
  }

  .el-input-group__append button.el-button {
    width: 50px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fff;
  }
  .tip {
    margin-top: -30px;
    text-align: center;
    line-height: 22px;
    .tipImg {
      position: relative;
      left: -16px;
      top: 28px;
    }
  
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
     /deep/ .el-dialog__headerbtn{
      top:10px;
    }
}
</style>
