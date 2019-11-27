<template>
  <div id="pendingContract">
    <div class="margin0">
      
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">待生成合同</h4>
                <div class="search-base">
                  <el-row>
                   <el-col :span="5" >
                        <el-form-item label="平台名称：">
                                <el-col :span="21">
                                    <el-input v-model="tableDatas.projectName" placeholder="请输入平台名称"></el-input>
                                </el-col>
                            </el-form-item>
                    </el-col>
                    <el-col :span="5" >
                        <el-form-item label="销售单号：">
                                <el-col :span="21">
                                    <el-input v-model="tableDatas.saleOrderNo" placeholder="请输入销售单号"></el-input>
                                </el-col>
                            </el-form-item>
                    </el-col>
                    <el-col :span="5" >
                        <el-form-item label="客户：">
                                <el-col :span="21">
                                    <el-input v-model="tableDatas.customerName" placeholder="请输入客户名称/联系人/电话"></el-input>
                                </el-col>
                            </el-form-item>
                    </el-col>
                    <el-col :span="5" >
                        <el-form-item label="商品搜索：">
                                <el-col :span="21">
                                    <el-input v-model="tableDatas.goodsName" placeholder="请输入商品信息/编码"></el-input>
                                </el-col>
                            </el-form-item>
                    </el-col>
                    <el-col :span="2" >
                          <el-button type="primary" size="small" @click='searchOrder()' >查询</el-button>
 
                    </el-col>
                  </el-row>
                  <el-row>
               <el-col :span="5" >
                        <el-form-item label="报价单号：">
                                <el-col :span="21">
                                    <el-input v-model="tableDatas.offerNo" placeholder="请输入报价单号"></el-input>
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
          <div class="mbottom">
            <el-row>
              <el-button type="primary" size="small" @click="addVisible=true" v-permit="'SaleOrder:add'">新增</el-button>
              <el-button type="primary" size="small" @click="addPDF" v-permit="'SaleOrder:genBillPdf'">单据生成PDF</el-button>
            </el-row>
          </div>
          
          <el-table :data="orderData" border 
          @selection-change="handleSelectionChange" 
          :row-class-name="tableRowClassName"
          :row-style="selectedHighlight"
          @row-dblclick="AhandleSelectionChange"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="white">
          
            <el-table-column label="序号" type="index" align="center"  width="50"></el-table-column>
            <el-table-column label="客户信息" prop="name" align="center"  width="300">
                      <template slot-scope="scope">
                        <div class="txt_left" >名称：{{scope.row.customerName}}</div>
                        <div class="txt_left">部门：{{scope.row.department}}</div>
                        <div class="txt_left">联系人：{{scope.row.customerContact}}</div>
                        <div class="txt_left">联系电话：{{scope.row.tel}}</div>
                        <div class="txt_left">手机：{{scope.row.phone}}</div>
                      </template>
            </el-table-column>
            <el-table-column label="销售订单信息" prop="name" align="center"  width="300">
                      <template slot-scope="scope">
                        <div class="txt_left" >
                                销售单号：{{scope.row.saleOrderNo}}
                            </div>
                        <div class="txt_left" >
                                报价单号：{{scope.row.offerNo}}
                            </div>
                        <div class="txt_left">
                              经销商：{{scope.row.agencyName}}
                            </div>
                        <div class="txt_left">
                            平台名称：{{scope.row.projectName}}
                            </div>
                        <div class="txt_left">
                          创建时间：{{scope.row.createTime}}   
                            </div>
                        <div class="txt_left">
                          销售员：{{scope.row.bizUserName}}
                            </div>
                      </template>
            </el-table-column>
            <el-table-column label="订单金额" prop="name" align="center">
                   <template slot-scope="scope">
                    {{scope.row.orderTotalAmount}}
                   </template>
            </el-table-column>
            <el-table-column label="发票类型" prop="name" align="center">
                   <template slot-scope="scope">
                    {{scope.row.invoiceType}}
                   </template>
            </el-table-column>
            <el-table-column label="进度表" prop="name" align="center">
                    <template slot-scope="scope">
                      <div v-html="scope.row.billStatus"></div>
                    </template>
            </el-table-column>
            
            <el-table-column label="操作" align="center" fixed="right" width="150">
              <template slot-scope="scope">
                <div class="line-div">
                  <div class="small-Idiv" @click="detail(scope.row)">
                    <div class="i-div">
                      <img src="@/common/images/icon/查看详情.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;">详情</span>
                  </div>
                  <div
                    class="small-Idiv"
                    @click="generate(scope.row)"
                    v-permit="'SaleOrder:genSaleContract'"
                  >
                    <div class="i-div">
                      <img src="@/common/images/icon/状态栏.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;">生成合同</span>
                  </div>
                  <div
                    class="small-Idiv"
                    @click="editOrder(scope.row)"
                    v-show="form.auditStatus!=1"
                     v-permit="'SaleOrder:edit'"
                  >
                    <div class="i-div">
                      <img src="@/common/images/icon/编辑.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;">编辑</span>
                  </div>
                  <div
                    class="small-Idiv"
                    @click="deleteData(scope.row)"
                     v-permit="'SaleOrder:delete'"
                  >
                    <div class="i-div">
                      <img src="@/common/images/icon/回收站.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;">删除</span>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination">
            <el-pagination
              @size-change="getHandleSizeChange"
              @current-change="getHandleCurrentChange"
              :current-page="tableDatas.pageIndex"
              :page-sizes="[5,10,30,50]"
              :page-size="tableDatas.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableDatas.total"
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
            >销售订单【{{this.closeNo}}】的商品明细</li>
          </ul>
        </div>
        <div class="tabs-content">
          <component :is="mainIndex" :count="count" :page="page" :closeNo="closeNo"></component>
        </div>
      </div>
      <!-- 新增合同 -->
      <AddContract 
      :contractVisibles="contractVisibles" 
      :orderPage="orderPage"
      :productList="productList"  
      @createClose1="createClose2"
        @createClosing1="createClosing2"
        @saveContract="saveContract1"></AddContract>
        <!-- 编辑合同 -->
        <EditOrder
         @createCloseE="createClose3"
        @createClosingE="createClosing3"
        @editOrder1="editOrder2"
        :editVisibles="editVisibles"
        :orderDatas="orderDatas"
      ></EditOrder>
      <!-- 查看合同 -->
      <OrderDetail
       @createCloseD="createClose4"
        @createClosingD="createClosing4"
        :detailVisibles="detailVisibles"
        :orderDatas="orderDatas"
      ></OrderDetail>
      <!-- 新增销售订单 -->
      <el-dialog :visible.sync="addVisible" width="70%" :before-close="addClosing">
      

        <div class="goods-fitter" style="margin-bottom:20px">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">新增销售订单</h4>
            </div>
          </el-form>
        </div>
        <div class="mail-fitter">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="110px" size="small">
            <div class="mail-wrapper">
              <div class="search-base">
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
                          <el-form-item label=" 部门：" prop="department">
                            <el-input v-model="form.department" placeholder="请填写部门"></el-input>
                          </el-form-item>
                        </el-col>
                         <el-col :span="6">
                          <el-form-item label="联系人：" prop="contacts">
                            <el-input v-model="form.contacts" placeholder="请填写联系人"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label=" 销售单号：" prop="salesSheet">
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
                          <el-form-item label=" 手机号码：" prop="mobilePhone">
                            <el-input v-model="form.mobilePhone" placeholder="请填写手机号码"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label=" 电话号码：" prop="phoneNumber">
                            <el-input v-model="form.phoneNumber" placeholder="请填写电话号码"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="邮箱：" prop="mail">
                            <el-input v-model="form.mail" placeholder="请填写邮箱"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label=" 销售代表：" prop="salesRepresentatives">
                            <el-input v-model="form.salesRepresentatives" placeholder="请填写销售代表"></el-input>
                          </el-form-item>
                        </el-col>                         
                      </el-row>
                      <el-row>
                        <el-col :span="6">
                          <el-form-item label="平台名称：" prop="projectName">
                            <el-input v-model="form.projectName"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="支付定金：" prop="deposit">
                            <el-input v-model="form.deposit">
                            </el-input>
                          </el-form-item>
                        </el-col>
                         <el-col :span="6">
                          <el-form-item label="发票类型：" prop="invoiceType">
                            <el-select v-model="form.invoiceType" placeholder="必填项">
                              <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"
                              ></el-option>
                            </el-select>
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
                    @selection-change="handleSelectionChange"
                   
                  >
                    <el-table-column type="selection" align="center"></el-table-column>
                    <el-table-column type="index" label="编号" align="center" width="55"  fixed="left"></el-table-column>
                    <el-table-column label="商品信息" align="center" width="250" fixed="left">
                      <template slot-scope="scope">
                          <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                          <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                          <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                          <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                          <div class="txt_left">SKU：{{scope.row.rows.skuId}}</div>
                      </template>
                    </el-table-column>
                   <el-table-column label="规格尺寸" align="center" width="150">
                      <template slot-scope="scope"> 
                            <div>{{scope.row.rows.goodsSpecValues}}</div>                   
                      </template>
                    </el-table-column>
                    <el-table-column label="税率" align="center" width="70">
                         <!--  <template.vue slot-scope="scope">
                              <el-input v-model="scope.row.skuList[scope.row.index].taxRate" size="small"></el-input>
                          </template.vue> -->
                          <template slot-scope="scope">
                              <el-input
                            v-model="scope.row.rows.taxRate"
                            size="mini"
                            v-if="form.invoiceType!==0"
                          ></el-input>
                          <el-input
                            v-model="scope.row.rows.taxRate"
                            size="mini"
                            v-if="form.invoiceType===0"
                            :disabled="true"
                          ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center" >
                      <template slot-scope="scope"> 
                              {{scope.row.unitName}}                
                      </template>
                    </el-table-column>
                     <el-table-column label="数量" align="center" width="100">
                      <template slot-scope="scope">    
                            <el-input v-model="scope.row.num" size="small"></el-input>              
                      </template>
                    </el-table-column>
                   
                     <el-table-column label="不含税单价" align="center" width="100">
                      <template slot-scope="scope">    
                              <el-input v-model="scope.row.notTaxPrice" size="small" readonly></el-input>      
                      </template>
                    </el-table-column>
                     <el-table-column label="税费" align="center" width="100">
                      <template slot-scope="scope">    
                            <el-input v-model="scope.row.tax" size="small" readonly></el-input>             
                      </template>
                    </el-table-column>
                     <el-table-column  align="center" width="110">
                       <template slot="header" slot-scope="scope">
                            <i style="color:red;margin-right:3px;">*</i>含税单价
                       </template>
                      <template slot-scope="scope">    
                            <el-input v-model="scope.row.goodsPrice" size="small"></el-input>              
                      </template>
                    </el-table-column>
                    <el-table-column label="合计" align="center" width="120">
                      <template slot-scope="scope"> 
                            <el-input v-model="scope.row.total" size="small"></el-input>                      
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
                              size="small"
                              v-model="scope.row.deliveryCycle"
                              valueFormat='yyyy-MM-dd HH:mm:ss'
                              type="date"
                              placeholder="选择日期"
                              style="width:90%"
                              :picker-options="pickerOptions0">
                            </el-date-picker>                          
                      </template>
                    </el-table-column>
                    <el-table-column label="设计稿" align="center" width="200">
                         <template slot-scope="scope">                                  
                                <el-upload
                                    size="small"
                                    class="upload-demo"
                                    :action="baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile'"
                                    :on-success="handleAvatarSuccess"
                                    :before-upload="beforeAvatarUpload"
                                    :show-file-list="false">
                                <el-button size="small" type="primary" @click="upLoad(scope.$index)">上传</el-button>
                                </el-upload>
                                     
                                <span class="blue" v-show="scope.row.fileDesignDraftUrl" @click="preview(scope.row)">查看</span>
                        </template>
                    </el-table-column>
                    
                    
                  </el-table>
                  <div class="total" style="margin-left:80%;margin-top:20px">
                    <el-form label-width="130px" size="small">
                        <el-form-item label="总合计：">
                          <el-col :span="24">
                            <el-input v-model="total1"></el-input>
                          </el-col>
                        </el-form-item>
                    
                  </el-form>
                  </div>
                </el-form>

              </div>
            </div>
          </el-form>
        </div>

        
        <span slot="footer">
          <el-button type="danger" @click="addClose()" size="small">关 闭</el-button>
          <el-button type="primary" @click="_addOrder()" size="small">保存</el-button>
        </span>
      </el-dialog>
        <!-- 新增客户询价添加商品弹窗 -->
        <el-dialog width="60%" :visible.sync="innerVisible" :modal="true" :append-to-body="false">
          <!-- 新增客户询价添加商品选择品牌弹窗 -->

          <div class="mail-fitter">
            <el-form ref="infoForm" :model="form"  label-width="100px" size="small">
              <div class="mail-wrapper">
                <div class="search-base">
                  <el-row class="warp">
                    <div class="mbottom">
                      <div class="goods-fitter">
                        <h4 class="title1">商品信息</h4> 
                      </div>
                      <div class="goods-fitter">
                        <el-row>
                          <el-col :span="8">
                            <el-form-item label="商品信息：" prop="brand">
                              <el-input v-model="formData.goodsName1" placeholder="请输入商品名称/型号/品牌"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="2" :offset="1">
                            <el-button type="primary"  size="small" @click="goodsSearch()">查询</el-button>
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
                    @row-dblclick="addClick"
                    :data="tableData"
                    stripe
                    style="width: 100%"
                    border
                    ref="elTable"
                    class="goods_index"
                    element-loading-text="拼命加载中"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="white"
                  >
                    <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
                    <el-table-column label="商品图片" align="center" width="120">
                      <template slot-scope="scope">
                        <div
                          class="image"
                          v-if="scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].thumbnailImgUrl"
                        >
                          <img
                            :src="scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].thumbnailImgUrl"
                            width="100"
                            height="100"
                            alt
                          />
                        </div>
                        <div v-if="!scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].thumbnailImgUrl">暂无图片</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="商品信息" align="center" width="150">
                      <template slot-scope="scope">
                        <div style="height: 180px;overflow: auto;" >
                          <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
                          <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                          <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                          <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                          <div class="txt_left">SKU：{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].skuId}}</div>
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
                            alt=""
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
                          <div class="txt_left">SKU：{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].skuId}}</div>
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
        <el-dialog width="60%"  :visible.sync="customerVisible"  :modal="true" :append-to-body="false">
          <div class="mail-fitter">
            <el-form ref="infoForm" :model="form"  label-width="100px" size="small">
              <div class="mail-wrapper">
                <div class="search-base">
                  <el-row class="warp">
                    <div class="mbottom">
                      <div class="goods-fitter">
                          <div class="mbottom">
                            <h4 class="title1">选择客户</h4>
                          </div>
                      </div>
                    </div>
                      <div class="goods-fitter">
                        <el-row>
                        
                          <el-col :span="10">
                            <el-form-item label="关键词:" prop="keywords">
                              <el-col :span="18">
                                <el-input v-model="form.keywords" placeholder="请输入客户名称/联系人/手机号"></el-input>
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
                   
                  </el-row>
                </div>
              </div>
              <div class="mcard1">
                <div class="mcard">
                  <el-form label-width="100px" size="small"></el-form>
                  <el-table :data="list" border style="width: 100%" stripe @row-dblclick="addCustomer">
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
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="listData.pageNum"
                      :page-sizes="[10,20,30,50]"
                      :page-size="listData.pageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="listData.count"
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
       <!-- 删除销售订单 -->
      <el-dialog :visible.sync="deleteVisible" width="20%" title="提示" style="top:20%">
        <div class="mail-fitter" style="padding:20px 0;background:#fff;">
            <div class="search-base">
                  <div class="goods-fitter">
                    <el-row>
                        <div class="tip">
                          <img class="tipImg" src="@/common/images/组 180.png" alt=""/>
                            <span>温馨提示：一经删除不可恢复记录！</span><br/>
                            <span>你确定要删除所选内容吗？</span>
                        </div>

                    </el-row>
                  </div>  
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="deleteVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteOrder()" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 上传预览 -->
       <el-dialog :visible.sync="dialogVisible" :modal="true" :append-to-body="false">
                                        <img width="100%" :src="previewImg" alt="">
                                        <span slot="footer" class="dialog-footer"></span>
        </el-dialog>
    </div>
  </div>
</template>

<script>
import { getCategory, getStoreList } from "@/api/public";
import { getErpGoods } from "@/api/product/index";
import { getAllcustomer } from "@/api/customer";
import {addOrder,getOrder, getOrderGoods,findContract,deleteOrders,findOrders,downPDF} from '@/api/sale/index'
import { throttleTipPop } from "@/utils/functions.js";
import AccountOrder from './oreder'
import AddContract from './addContract'
import EditOrder from './editOrder'
import OrderDetail from './orderDetail'
export default {
  data() {
    return {
      pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      deIndex:'',
      previewImg:'',//
      upLoadIndex:'',//上传需要的下标
      dialogVisible:false,
      dataArr: [],
      salesUser:'',
      mainIndex:'AccountOrder',
      currentIndex:0,
      contractVisibles: false, //生成合同弹窗
      brandVisible: false, //新增询价单新增商品品牌弹窗
      innerVisible: false, //新增询价单新增商品弹窗
      addVisible: false, //新增询价单弹窗
      customerVisible: false, //新增询价单客户选择弹窗
      editVisibles:false,//编辑销售订单
      deleteVisible:false, //删除销售订单
      detailVisibles:false,//查看询价单
      orderDatas:[],//根据ID获得的销售订单详细
      orderData:[],//销售订单分页数据
      page:[],//商品明细分页
      count:[],//商品明细总数
      getIndex:'',
      closeId: "", //关闭ID
      closeNo: "",
      deleteId:'',
      listData:{
        pageNum: 1,
        pageSize: 10,
        count: 0,
        keywords: "" ,//关键词
      },
      salesRepresentatives:'',
      /* total:'',//总合计 */
      customerData: [],
      productList:[],//产品清单
      orderPage:'',
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
        customerId:'',//客户ID
        salesRepresentatives: "", //销售代表
        contacts: "", //联系人
        department: "", //部门
        phoneNumber: "", //电话号码
        mail: "", //邮箱
        mobilePhone: "", //手机号码
        invoiceType: "", //发票类型
        projectName: "线下项目", //项目名称
        address: "", //收货地址
        differentiation: "", //客户区分
        keywords: "" ,//关键词
        definition:'',//单位名称
        addressee:'',//收件人
        deposit:'',//支付定金
        invoiceType:2,//发票类型
        
        arrss:[],
    
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
        },
      ],
      options1:[
           {
          value: 0,
          label: "已收款"
        },
        {
          value: 1,
          label: "待收款"
        },
        {
          value: 2,
          label: "全部"
        }
      ],
      options2:[
           {
          value: 0,
          label: "已开票"
        },
        {
          value: 1,
          label: "待开票"
        },
        {
          value: 2,
          label: "不要发票"
        },
        {
          value: 3,
          label: "全部"
        }
      ],
      options3:[
           {
          value: 0,
          label: "已发货"
        },
        {
          value: 1,
          label: "未发货"
        },
        {
          value: 2,
          label: "全部"
        }
      ],
      formData: {
        current_page: 1,
        page_size: 2,
        total_count: 0,
        goodsName1:'',
      },

      selectData: [],
      goodsData: [],
      list: [], //客户列表
      elTable:[],
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ],
      tableDatas: {
        pageIndex: 1,
        sizes: [10, 20, 50, 100],
        pageSize: 10,
        total: 0,
        payStatus:'',//收款类型
        invoiceStatus:'',//发票状态
        deliveryStatus:'',//发货状态
        goodsName:'',//产品名字
        saleOrderNo:'',//销售单号
        customerName:'',//客户名称
        projectName:'',//平台名称
        offerNo:'',//报价单号
        cutCardFlag:0,//切卡标识
      },
      rules: {
        partyA: [{ required: true, message: "此项为必填项", trigger: ["blur","change"] }],
        partyAAddress: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        partyAContacts: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        partyANumber: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        dateNum: [{ required: true, message: "此项为必填项", trigger: ["blur","change"] }],
        paymentAccount: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        accountName: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        openingBank: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        customerName: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        customerName: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        contacts: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        mobilePhone: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        projectName: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        customerName: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        invoiceType:[
           { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ]
      }
    };
  },
  created() {
    this._getGoods();
    this.getName();
    this._getOrder();
  },
  computed: {
    total1(){
      let totals = 0
      let _this = this
      if(_this.goodsData.length>0){
          for(var i = 0;i<_this.goodsData.length;i++){
            if(_this.goodsData[i].total){
              totals+=parseFloat(_this.goodsData[i].total)
            }else{
              totals = 0
            }
      }
        
      }
        return totals
      
    }
  },
  watch:{
    
    //监听数组中值变化
    goodsData:{
      handler(newVal, oldVal) {
      if(newVal){
        for(let i=0;i<newVal.length;i++){

          
          
          if(Number(newVal[i].num)>=0&&Number(newVal[i].goodsPrice)>=0){
            newVal[i].total = (Number(newVal[i].num)*Number(newVal[i].goodsPrice)).toFixed(2); 
            
            newVal[i].tax = (newVal[i].goodsPrice/(1+(newVal[i].rows.taxRate/100)) * (newVal[i].rows.taxRate/100)).toFixed(2);
            newVal[i].notTaxPrice = (newVal[i].goodsPrice/(1+(newVal[i].rows.taxRate/100))).toFixed(2);
          }   
     

        }
      }
    },
    deep: true
    }
  },
  methods: {
     tabIndex (index) {
      this.currentIndex = index
      switch (index) {
        case 0:
          this.mainIndex = "AccountOrder";
          break;

        
        default: 
            return
      }
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
    //搜索
    searchOrder(){
        this.tableDatas.pageIndex = 1;
        this._getOrder();
        this.resetData();
    },
    //重置
    resetData(){
      this.page = [];
      this.count = 0;
      this.closeNo='';
      this.getIndex="";
    },
    //获取销售订单分页
    _getOrder(){
      getOrder(this.tableDatas).then(res=>{
        if(res.data){
            this.orderData = res.data.pageList           
            this.tableDatas.total = res.data.count
        }else{
          this.orderData = '';
          this.tableDatas.total =0;
        }
      })
    },
    //获取登录信息中的销售代表
    getName(){
        var books=localStorage.getItem("user");//得到字符串
        var obj=JSON.parse(books);
        console.log(obj);
        this.form.salesRepresentatives = obj.data.sysuserName;   
    },
    //生成合同
    createClose2: function(data) {
      this.contractVisibles = data;
    },
    createClosing2: function(data) {
      this.contractVisibles = data;
    },
    saveContract1(data){
      this._getOrder();
      this.resetData();
      this.contractVisibles = data;
    },
    //编辑销售订单
     createClose3: function(data) {
      this.editVisibles = data;
    },
    createClosing3: function(data) {
      this.editVisibles = data;
    },
    editOrder2:function(data){
      this.editVisibles =data;
      this._getOrder();
      this.resetData();
    },
     createClose4: function(data) {
      this.detailVisibles = data;
    },
    createClosing4: function(data) {
      this.detailVisibles = data;
    },

    goodsSearch(){
      this.formData.current_page = 1;
      this._getGoods();
    },
    //换页
    addHandleSizeChange(val) {
      this.formData.page_size = val;
      this._getGoods();
    },
    //换页
    addHandleCurrentChange(val) {
      this.formData.current_page = val;
      this._getGoods();
    },
    //获取商品
    _getGoods() {
      getErpGoods(this.formData).then(res => {
        this.tableData = res.data.pageList;

        this.tableData.forEach(item => {
          item.top = 0;
        });
        this.formData.total_count = res.data.count;

      });
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
      this.closeId = row.orderId;
      this.closeNo = row.saleOrderNo
      
        let obj = {};
        obj.pageIndex = 1;
        obj.pageSize = 10;
        obj.saleOrderNo = row.saleOrderNo;
       getOrderGoods(obj).then(res => {
        this.count = res.data.count;
        this.page = res.data.pageList;
      });
    },
    //新增询价单
    _addOrder() {
      var arrss = [];
      for (let i = 0; i < this.goodsData.length; i++) {
        let obj = {};
        obj.brandName = this.goodsData[i].brandName;
        obj.goodsCount = this.goodsData[i].num
        obj.budgetAmount = this.goodsData[i].budget;
        obj.deliveryCycle = this.goodsData[i].deliveryCycle;
        obj.distAddress = this.goodsData[i].address;
        obj.deliveryAddress =this.goodsData[i].address;
        obj.goodsId = this.goodsData[i].goodsId;
        obj.goodsName = this.goodsData[i].goodsName;
        obj.goodsSkuId = this.goodsData[i].rows.skuId;
        obj.goodsSn = this.goodsData[i].goodsSn;
        obj.goodsSpecSize = this.goodsData[i].rows.goodsSpecValues;
        obj.goodsUnit = this.goodsData[i].unitName;
        obj.modelNumber = this.goodsData[i].modelNumber;
        obj.goodsImgUrl = this.goodsData[i].rows.thumbnailImgUrl;
        obj.taxRate = this.goodsData[i].rows.taxRate;
        obj.productRequire = this.goodsData[i].request;
        obj.totalPrice = this.goodsData[i].total;
        obj.transportMode = this.goodsData[i].transport;
        obj.goodsPrice = this.goodsData[i].goodsPrice;
        obj.notTaxPrice = this.goodsData[i].notTaxPrice;
        obj.tax = this.goodsData[i].tax;
        obj.fileDesignDraftUrl = this.goodsData[i].fileDesignDraftUrl;
        arrss.push(obj);
      }
      this.form.arrs = arrss;
   
   if(
        !this.form.customerName ||
        !this.form.mobilePhone ||
        !this.form.projectName ||
        !this.form.contacts   ||
        !this.form.invoiceType
      ) {
       
                throttleTipPop(this, "warning", "请填写带*号的选项", 2000);
             
     
        
      } else {
        addOrder(this.form).then(res => {
          if (res.code === 200) {
            this.$message({ message: "新添销售订单成功", type: "success" });
            this.addVisible = false;
             this._getOrder();
             this.resetData();
          }
        });
      }

    
    },
    chooseCustomer() {
      this.customerVisible = true;
      this._getAllcustomer();
    },
    _getAllcustomer() {
      getAllcustomer(this.listData).then(res => {
        this.list = res.data.list;
        this.listData.count = res.data.total;
      });
    },
    address(){
      this.addressVisible = true;
    },
    Clicktent(val, data) {
      data.index = val;
      this.$set(this.$refs.elTable.data);
      this.$forceUpdate();
    },
    //选择客户
    chooseCustomer() {
      this.customerVisible = true;
      this._getAllcustomer();
    },
    //客户查询
    customerSearch() {
      this._getAllcustomer();
    },
 
    //双击添加客户
    addCustomer(row) {
      this.customerData.splice(0, 1, row);
     
      this.form.customerName =
        this.customerData[0] && this.customerData[0].customerName;
      this.form.customerId  =
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
        
        (this.form.customerId);
      this.customerVisible = false;
    },

    //双击添加商品
    addClick(row) {
      this.index = row.index;
      row["rows"] = row.skuList[this.index];
      row['goodsPrice'] = row.skuList[this.index].goodsPrice;
      row['notTaxPrice']=row.skuList[this.index].notTaxPrice;
      row['tax'] = row.skuList[this.index].taxation
      //深度克隆
      let copy = JSON.parse(JSON.stringify(row));
      if(this.selectData.length>=1){
            //遍历判断是否存在相同规格的商品在列表
            for(let i= 0 ;i<this.selectData.length;i++){
              if(this.selectData[i].rows.skuId == copy.rows.skuId&&this.selectData[i].goodsId == copy.goodsId){
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
     /*    v["goodsPrice"] ='0';
         v['notTaxPrice']='0';
        v['tax']='0'; */
        v["num"] = "1";
        v["total"] = "";
        v["request"] = "";
        v["transport"] = "";
        v["address"] = "";
        v["deliveryCycle"] = "";
        v["design"] = "";
        v['fileDesignDraftUrl'] = '';

      });
      let copy1 = JSON.parse(JSON.stringify(arr));
      this.selectData = copy1;

    },
    //双击删除商品
    deleteRow(row) {
      for (var i = 0; i < this.selectData.length; i++) {
        if (this.selectData[i].rows.skuId == row.rows.skuId) {
          this.selectData.splice(i, 1);
        }
      }
    },
    //保存商品选择
    saveGoods() {
       if(this.goodsData.length>=1){
            console.log(this.selectData);
            //遍历判断是否存在相同规格的商品在列表
            var arr =[]
            //如果等于长度就会多出一次循环，就会报错
            for(let i= 0 ;i<this.goodsData.length;i++){
              for(let j= 0 ;j<this.selectData.length;j++){
                if(this.goodsData[i].rows.skuId == this.selectData[j].rows.skuId){
                    throttleTipPop(this, "error", "已经存在相同规格的商品，不能重复添加！", 2000);
                    return false
                }
              } 
        }
       arr= this.goodsData.concat(this.selectData);  
      }else if(this.goodsData.length<=0){
         arr= this.goodsData.concat(this.selectData);  
      } 
      this.goodsData = arr;

      this.selectData = [];
      this.innerVisible = false;
    },
    handleSelectionChange(val) {
      this.elTable = val;
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
    //删除销售订单弹窗
    deleteData(row) {
      this.deleteVisible = true;
      this.deleteId = row.orderId;
    },
    //删除销售订单
    deleteOrder() {
      deleteOrders(this.deleteId).then(res => {
        if (res.code === 200) {
          throttleTipPop(this, "success", "删除成功", 2000);
          this.deleteVisible = false;
          this._getOrder();
          this.resetData();
        }
      })
    
    },
    //查看详情
    detail(row){
      findOrders(row.orderId).then(res=>{
        this.orderDatas = res.data
      })
      this.detailVisibles = true
    },
    //增加PDF
    addPDF(){
        if(!this.closeId){
          throttleTipPop(this, "warning", "请选择要生成PDF的单据", 2000);
        }else{
         this.$router.push({name:'CreatePDF',query:{id:this.closeId}})
   
        }
    },
    //删除弹框
    deleteOpen(){
        this.deleteVisible = true
    },
    //编辑弹窗
    editOrder(row){
      findOrders(row.orderId).then(res=>{
        this.orderDatas = res.data
      })
      this.editVisibles =true;
    },
    //生成合同
    generate(row) {
      
      this.orderPage = row
      findContract(row.orderId).then(res=>{
        
        this.productList = res.data
      })
      
      this.contractVisibles = true;
    },
    //跳到客户页面
    toCustomer(){
      let routeData = this.$router.resolve({
        name: "Data",
      });
      window.open(routeData.href, '_blank');
    },
    //跳转
    jump(){
      let routeData = this.$router.resolve({
        name: "ProductList",
      });
      window.open(routeData.href, '_blank');
      
    },
    //获取上传那栏的下表
    upLoad(index){     
      this.upLoadIndex = index;
    },
     //上传成功
    handleAvatarSuccess(file) {    
            this.$message.success('上传设计稿成功！'); 
            this.goodsData[this.upLoadIndex].fileDesignDraftUrl = file.data.domain + file.data.filePath; 
              
      },
     beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'||'image/jpg'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传的文件为图片格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPG && isLt2M;
      },
     //预览设计稿
    preview(row){
          this.previewImg = row.fileDesignDraftUrl;
          this.dialogVisible = true;
    },
    partyChoose() {
      this.partyVisible = true;
    },
    customerChoose() {
      this.accountVisible = true;
    },
    handleSizeChange(val) {
        this.listData.pageSize = val;
        this._getAllcustomer()
    },
    handleCurrentChange(val) {
        this.listData.pageNum = val;
        this._getAllcustomer()
    },
     getHandleSizeChange(val) {
       this.tableDatas.pageSize =val;
        this.resetData();
       this._getOrder();
     },
    getHandleCurrentChange(val) {
      this.tableDatas.pageIndex = val;
       this.resetData();
      this._getOrder()
    },
    handleChange() {}
  },
  components: {
    AccountOrder,
    AddContract,
    EditOrder,
    OrderDetail
  }
};
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
  #pendingContract{
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
       overflow: hidden;
      .small-Idiv{
        width: 50%;
        padding-top: 10px;
        float: left;

      } 
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
    .imgitem{
      cursor: pointer;
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
    .tip{
    margin-top:-30px;
    text-align: center;
    line-height: 22px;
    .tipImg{
      position: relative;
      left: -16px;
      top:28px;
    }                     
}
    /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 12px; // 横向滚动条
    height: 12px; // 纵向滚动条 必写
  }
  // 滚动条的滑块
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
     background: #ddd;
    border-radius: 5px;
    
  }
  /deep/ .el-dialog__headerbtn{
      top:10px !important;
    }
    //上传样式
    /deep/.upload-demo{
      /deep/ .el-upload{
          border: 0 !important;
      }
    }
  .blue{
        cursor: pointer;
        color: #4A99FA;
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
      /deep/ .el-upload{
          border: 0 !important;
      }
    }
    //
  }
</style>
