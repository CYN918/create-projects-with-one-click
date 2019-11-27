<template>
  <div id="pucharseSign">
  <div class="margin0">
     <div class="mbottom" style="border: 1px solid rgb(215, 224, 241);">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">签定合同</h4>
            <div class="search-base">
              <el-row>
               <el-col :span="5">
                   <el-form-item label="平台名称：">
                     <el-col :span="21">
                            <el-input v-model="tableDatas.customerPlatform" placeholder="请输入平台名称"></el-input>
                        </el-col>
                    </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="客户名称：">
                            <el-col :span="21">
                              <el-input v-model="tableDatas.customerName" placeholder="请输入客户名称/姓名/电话"></el-input>
                            </el-col>
                        </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="供应商：">
                            <el-col :span="21">
                                <el-input placeholder="请输入供应商/姓名/电话" v-model="tableDatas.supplierInfo"></el-input>
                            </el-col>
                        </el-form-item>
                </el-col>
                <el-col :span="5">
                    <el-form-item label="单号：">
                            <el-col :span="21">
                              <el-input v-model="tableDatas.orderNo" placeholder="请输入销售或采购单号"></el-input>
                            </el-col>
                        </el-form-item>
                </el-col>
                <el-col :span="2" >
                          <el-button type="primary" size="small" @click='search()' >查询</el-button>
 
                    </el-col>
               
              </el-row>
               <el-row>
                 <el-col :span="5">
                   <el-col :span="22">
                    <el-form-item label="合同状态：">
                      <el-select v-model="tableDatas.status" placeholder="请选择" style="width:100%">
                            <el-option
                              v-for="item in options1"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                    </el-form-item>
                   </el-col>
                 </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="交货日期：">
                        <el-col :span="23">
                            <el-date-picker
                            type=daterange
                            valueFormat='yyyy-MM-dd HH:mm:ss'
                            v-model="tableDatas.deliveryDate"
                            range-separator="-"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
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
    <div class="mcard" style="border:1px solid #d7e0f1">
   
      <el-table :data="orderData" border 
          @selection-change="handleSelectionChange" 
          
          :row-class-name="tableRowClassName"
          :row-style="selectedHighlight"
          @row-dblclick="AhandleSelectionChange">
          
           <el-table-column label="序号" type="index" align="center"  width="50"></el-table-column>
            <el-table-column label="合同状态" prop="name" align="center"  width="102">
                      <template slot-scope="scope">
                        <div v-html="scope.row.contractStatus"></div>    
                      </template>
            </el-table-column>
             <el-table-column label="采购订单信息" prop="name" align="center"  width="220">
                      <template slot-scope="scope">
                        <div :class="scope.row.batchInfo.length>2?'wrapper1':''" v-if="showIndex1===1">
                            <div v-for="(item,index) in scope.row.batchInfo" :key="index"
                            :class="scope.row.batchInfo.length<=1?'':'boxImg'">
                                  <div class="txt_left">采购单号：{{item.purchaseOrderNo}}</div>
                                  <div class="txt_left">采购交货日期：{{item.distributionTime | date}}</div>
                                  <div class="txt_left">创建时间：{{item.purchaseCreateTime}}</div>
                                  <div class="txt_left">采销员：{{item.userName}}</div>
                                  <div class="txt_left">签约公司：{{item.company}}</div>
                            </div>
                            <div class="down" @click="downOn" v-if="scope.row.batchInfo.length>2">
                                  <span>共有{{scope.row.batchInfo.length}}条数据,点击展开</span>
                                  <i class="el-icon-arrow-down" >
                                </i></div>
                          </div>
                          <div class="upBox" v-if="showIndex1===0" style="padding-bottom:20px;box-sizing:border-box;">
                            <div  v-for="(item,index) in scope.row.batchInfo" :key="index"
                            :class="scope.row.batchInfo.length<=1?'':'boxImg'">
                                  <div class="txt_left">采购单号：{{item.purchaseOrderNo}}</div>
                                  <div class="txt_left">采购交货日期：{{item.distributionTime | date}}</div>
                                  <div class="txt_left">创建时间：{{item.purchaseCreateTime}}</div>
                                  <div class="txt_left">采销员：{{item.userName}}</div>
                                  <div class="txt_left">签约公司：{{item.company}}</div>
                            </div>
                           <div class="down" @click="downOff1" v-if="scope.row.batchInfo.length>2"><i class="el-icon-arrow-up" ></i></div>
                          </div>
                      </template>
            </el-table-column>
            <el-table-column label="销售订单信息" prop="name" align="center"  width="210">
                      <template slot-scope="scope">
                   
                        <div :class="scope.row.batchInfo.length>2?'wrapper2':''" v-if="showIndex1===1">
                          <div  v-for="(item,index) in scope.row.batchInfo" :key="index"
                          :class="scope.row.batchInfo.length<=1?'':'boxImg1'">
                            <div class="txt_left">销售单号：{{item.saleOrderNo}}</div>
                            <div class="txt_left">客户名称：{{item.customer}}</div>
                            <div class="txt_left">经销商：{{item.agentName}}</div>
                            <div class="txt_left">平台名称：{{item.projectName}}</div>
                            <div class="txt_left">创建时间：{{item.saleCreateTime}}</div>
                            <div class="txt_left">销售员：{{item.saleUserName}}</div>
                          </div>
                          <div class="down" @click="downOn1" v-if="scope.row.batchInfo.length>2"><i class="el-icon-arrow-down" ></i></div>
                         </div>
                         <div class="upBox1" v-if="showIndex1===0" style="padding-bottom:20px;box-sizing:border-box;">
                          <div   v-for="(item,index) in scope.row.batchInfo" :key="index"
                          :class="scope.row.batchInfo.length<=1?'':'boxImg1'">
                            <div class="txt_left">销售单号：{{item.saleOrderNo}}</div>
                            <div class="txt_left">客户名称：{{item.customer}}</div>
                            <div class="txt_left">经销商：{{item.agentName}}</div>
                            <div class="txt_left">平台名称：{{item.projectName}}</div>
                            <div class="txt_left">创建时间：{{item.saleCreateTime}}</div>
                            <div class="txt_left">销售员：{{item.saleUserName}}</div>
                          </div>
                          <div class="down" @click="downOff1" v-if="scope.row.batchInfo.length>2"><i class="el-icon-arrow-up" ></i></div>
                         </div>
                      </template>
            </el-table-column>
            <el-table-column label="供应商信息" prop="name" align="center"  width="150">
                      <template slot-scope="scope">
                        <div class="txt_left" >
                                供应商名称：{{scope.row.supplierName}}
                            </div>
                        <div class="txt_left">
                              联系人：{{scope.row.supplierContact}}
                            </div>
                        <div class="txt_left">
                            联系电话：{{scope.row.supplierTel}}
                            </div>
                        <div class="txt_left">
                          手机号码： {{scope.row.phone}}
                            </div>
                        <div class="txt_left">
                          邮箱：{{scope.row.supplierEmail}}
                            </div>
                      </template>
            </el-table-column>

            <el-table-column label="本次采购金额" prop="name" align="center">
                   <template slot-scope="scope">
         
                        <div :class="scope.row.batchInfo.length>2?'wrapper3':''" v-if="showIndex1===1">
                            <div v-for="(item,index) in scope.row.batchInfo" :key="index"
                            :class="scope.row.batchInfo.length<=1?'':'boxImg2'">
                                  <div class="txt_left"> 采购金额：</div>
                                  <div class="txt_left">  {{item.purchaseTotalPrice}}</div>
                                  <div class="txt_left"> 已付款金额：</div>
                                    <div class="txt_left"> {{item.receivedAmount}} </div>
                                    <div class="txt_left"> 未付款金额：</div>
                                    <div class="txt_left">  {{item.unpaidAmount}}</div>
                            </div>
                            <div class="down" @click="downOn" v-if="scope.row.batchInfo.length>2">
                                  <i class="el-icon-arrow-down" >
                                </i></div>
                          </div>
                          <div class="upBox" v-if="showIndex1===0" style="padding-bottom:20px;box-sizing:border-box;">
                            <div  v-for="(item,index) in scope.row.batchInfo" :key="index"
                            :class="scope.row.batchInfo.length<=1?'':'boxImg2'">
                                  <div class="txt_left"> 采购金额：</div>
                                  <div class="txt_left">  {{item.purchaseTotalPrice}}</div>
                                  <div class="txt_left"> 已付款金额：</div>
                                    <div class="txt_left"> {{item.receivedAmount}} </div>
                                    <div class="txt_left"> 未付款金额：</div>
                                    <div class="txt_left">  {{item.unpaidAmount}}</div>
                            </div>
                           <div class="down" @click="downOff1" v-if="scope.row.batchInfo.length>2"><i class="el-icon-arrow-up" ></i></div>
                          </div> 
                   </template>
            </el-table-column>
            <el-table-column label="合同号" prop="name" align="center">
                   <template slot-scope="scope">
                    {{scope.row.contractNo}}
                   </template>
            </el-table-column>
            <el-table-column label="合计金额" prop="name" align="center">
                   <template slot-scope="scope">
                    {{scope.row.totalPrice}}
                   </template>
            </el-table-column>
            <el-table-column label="交货日期" prop="name" align="center">
                   <template slot-scope="scope">
                    {{scope.row.distributionTime |date}}
                   </template>
            </el-table-column>
            <el-table-column label="进度表" prop="name" align="center">
                    <template slot-scope="scope">    
                      <div class="txt_left" v-if="scope.row.status===6">取消审批进度：</div>
                      <div class="txt_left" v-if="scope.row.status!==6">合同审批进度：</div>
                      <div class="txt_left" v-for="(item,index) in scope.row.audits" :key="index">{{item}}</div>
                      <el-button size="small" type="primary" @click="Audit(scope.row,scope.$index)">查看进度表</el-button>
                    </template>
            </el-table-column>
        <el-table-column label="操作" align="center"  fixed="right"  width="150">
          <template slot-scope="scope">
            <div class="line1">
              <div class="small-Idiv"  @click="Signature(scope.row)" 
              v-permit="'pu:contract_sign'"
              v-show="scope.row.status===0||scope.row.status===2||scope.row.status===5">
                <div class="i-div">
                  <img src="@/common/images/icon/合同签定.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;">合同签订</span>
              </div>
              <div class="small-Idiv"  @click="SignAudit(scope.row)"
              v-show="scope.row.status===1||scope.row.status===3" 
              v-permit="'pu:contract_sign_approval'">
                <div class="i-div">
                  <img src="@/common/images/icon/合同签定.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;">合同审批</span>
              </div>
              <div class="small-Idiv" @click="cancelSign(scope.row)"
              v-show="scope.row.status!==3&&scope.row.status!==6" 
              v-permit="'pu:contract_cancel'">
                <div class="i-div">
                  <img src="@/common/images/icon/取消订单.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;" >取消订单</span>
              </div>
              <div class="small-Idiv" @click="detailContract1(scope.row)"
              v-permit="'pu:contract_sign_detail'">
                <div class="i-div">
                  <img src="@/common/images/icon/查看详情.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;" >详情</span>
              </div>

              <div class="small-Idiv" @click="removeSign(scope.row)"
              v-show="scope.row.status===6" 
              v-permit="'pu:contract_sign_cancel'">
                <div class="i-div">
                  <img src="@/common/images/icon/取消订单.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;" >取消审批</span>
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
              :total="tableDatas.count"
            ></el-pagination>
      </div>
    </div>
    <!-- 推送审核 -->
     <div class="margin0" style="margin-top:20px">

      <div class="tabs-header">
        <ul class="clearfix">
            <li
              class="sale"
              @click="tabIndex(0)"
              :class="currentIndex===0 ? 'active' : ''"
              v-show="!this.showNo"
            >商品明细</li>
            <li
              class="sale"
              @click="tabIndex(0)"
              :class="currentIndex===0 ? 'active' : ''"
              v-show="this.showNo"
            >采购订单【{{this.showNo}}】的商品明细</li>
          </ul>
        </div>
        <div class="tabs-content">
          <component :is="mainIndex" :count="count" :page="page" :closeId="closeId"></component>
        </div>
  </div>
  <!-- //签订合同 -->
  <el-dialog width="75%" :visible.sync="auditVisible" :before-close="auditClose">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">合同签订</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mcard0">
        <div class="mcard">
            <h4 class="title">合同信息</h4>

          <el-form ref="infoForm" :model="form" :rules="rules" label-width="95px"  size="small">
            <el-row>
              <el-col :span=8>
                <el-form-item label="合同类型 ：">                       
                              <span>销售订单合同</span>                        
                </el-form-item>
              </el-col>
              <el-col :span=8>  
                <el-form-item label="合同编号：" >                       
                                <span>{{initData.contractNo}}</span>                    
                </el-form-item> 
              </el-col>
              <el-col :span=8>  
                <el-form-item label="采购单号：" >                       
                                <span>{{initData.purchaseOrderNo}}</span>                    
                </el-form-item> 
              </el-col>
          </el-row>
           <el-row>
              <el-col :span=8>
                <el-form-item label="提 交 人 ：">                       
                              <span>{{initData.applyUserName}}</span>                        
                </el-form-item>
              </el-col>
              <el-col :span=8>  
                <el-form-item label="部 门：" >                       
                                <span>{{initData.departmentName}}</span>                    
                </el-form-item> 
              </el-col>
              <el-col :span=8>  
                <el-form-item label="职位：">                       
                                <span>{{initData.position}}</span>                    
                </el-form-item> 
              </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
                  <el-form-item label="签订状态：" prop="sigingType">                       
                          <el-col :span="20">
                                  <el-select
                                v-model="form.sigingType"
                                style="width:100%;"
                                >
                                <el-option
                                v-for="item in options2"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select> 
                          </el-col>               
                </el-form-item> 
              </el-col>
              <el-col :span="12">
                <el-form-item label="签订日期：" prop="sigingTime">                       
                    <el-col :span="20">
                         <el-date-picker
                            v-model="form.sigingTime"
                            type="date"
                            valueFormat='yyyy-MM-dd HH:mm:ss'
                            placeholder="选择日期"
                            style="width:100%"
                            :picker-options="pickerOptions0">
                          </el-date-picker>  
                    </el-col>                        
                </el-form-item>
              </el-col>
              
          </el-row>
          <el-row>
            <el-col :span="23">
                <el-form-item label="提交说明：" prop="signRemark">
                    <el-input  v-model="form.signRemark">
                
                    </el-input>
                  </el-form-item>
            </el-col>
          <!--   <el-col :span="23">
                <el-form-item label="备注：" prop="remark" v-if="form.sigingType===2">
                  <el-input  v-model="form.signRemark">
                    
                  </el-input>
                </el-form-item>
            </el-col> -->
          </el-row>
               
          </el-form>
       
        </div>
      </div>
       <div class="mail-fitter" style="margin-top:20px;margin-bottom:20px;">
            <el-form ref="infoForm"  label-width="100px">
              <div class="mail-wrapper" style="padding-bottom: 10px;">
                <h4 class="title1">商品清单</h4>
                <div class="search-base">
                  <div class="mbottom">
                    <div class="tabs-header">
                        <ul class="clearfix">  
                            <li class ="link" @click="tabIndex0(0)"  :class="currentIndex0===0 ? 'active' : ''">合同商品清单</li>
                            <li class ="link" @click="tabIndex0(1)"  :class="currentIndex0===1 ? 'active' : ''">订单商品清单</li>
                        </ul>
                      </div>
                    <div class="goods-fitter" style="border:1px solid #d7e0f1;" v-show="comIndex===0">
                       
                      <div class="mcard" style="padding-bottom:0">
                        <el-table :data="scGoodsData" border style="width: 100%" >
                          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                          <el-table-column prop="customerName" label="图样" align="center" width="100">
                                  <template slot-scope="scope">
                                         <img  :src="scope.row.goodsImgUrl" class="showImg" alt="" v-if="scope.row.goodsImgUrl"/>
                                        <img  src="@/common/images/缺省页.jpg" class="showImg" alt="" v-if="!scope.row.goodsImgUrl"/> 
                                  </template>
                          </el-table-column>
                          <el-table-column prop="customerType" label="产品名称" align="center" width="160">
                                   <template slot-scope="scope">
                                       <div class="txt_left"> 商品名称：{{scope.row.goodsName}} </div>
                                        <div class="txt_left"> 货号：{{scope.row.goodsSn}} </div>
                                        <div class="txt_left">品牌：{{scope.row.brandName}} </div>
                                        <div class="txt_left"> 型号：{{scope.row.modelNumber}} </div>
                                        <div class="txt_left"> SKU：{{scope.row.skuId}} </div>
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactName" label="规格尺寸" align="center" width="80">
                                    <template slot-scope="scope">
                                        {{scope.row.specSize}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="税率" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.taxRate}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="数量" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.purchaseQuantity}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="不含税单价" align="center">
                                    <template slot-scope="scope">
                                       {{scope.row.notaxCostPrice}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="税费" align="center">
                                    <template slot-scope="scope">
                                       {{scope.row.taxation}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="含税价" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.goodsPrice}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="合计" align="center">
                                    <template slot-scope="scope">
                                      {{scope.row.totalPrice}}
                                  </template>
                          </el-table-column>
                             <el-table-column  align="center"  width="120">
                                  <template slot="header" slot-scope="scope">
                                       <el-dropdown trigger="click" @command="handleCommand" class="drop">
                                        <span class="el-dropdown-link">
                                          {{addressTitle}}<i class="el-icon-arrow-down el-icon--right"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                          <el-dropdown-item
                                          v-for="(item,index) in pay" :key="index"
                                          :command="item.command">
                                          {{item.value}}
                                          </el-dropdown-item>

                                        </el-dropdown-menu>
                                       </el-dropdown>
                                  </template>
                                  <template slot-scope="scope">
                                      <el-button type="primary" size="small" v-if="addIndex===1">上传</el-button>
                                      
                                      <span v-if="addIndex===2">{{scope.row.address}}</span>

                                  </template>

                          </el-table-column>
                          <el-table-column label="设计稿" align="center"  width="100">
                                <template slot-scope="scope">
                                      <!-- {{scope.row.fileDesignDraftUrl}} -->

                                     <!--  <el-button v-show="scope.row.fileDesignDraftUrl" type="primary" size="small">上传</el-button> -->
                                      <el-upload
                                        size="small"
                                        class="upload-demo"
                                        v-show="!scope.row.fileDesignDraftUrl"
                                        :action="baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile'"
                                        :before-remove="beforeRemove1"
                                        multiple
                                        :limit="1"
                                        :on-success="handleSuccess1"
                                        :on-exceed="handleExceed1"
                                        :file-list="fileList">
                                        <el-button size="small" type="primary" @click="upLoad(scope.$index)">上传</el-button>
                                      </el-upload>
                                     
                                      <span class="blue" v-show="scope.row.fileDesignDraftUrl" @click="preview(scope.row)">查看</span>
                                    
                                </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="交货日期" align="center">
                                  <template slot-scope="scope">
                                        {{scope.row.distributionTime}}
                                  </template>
                          </el-table-column>
                           <el-table-column prop="commonContactDept" label="采购单号" align="center">
                                  <template slot-scope="scope">
                                        {{scope.row.purchaseOrderNo}}
                                  </template>
                          </el-table-column>
                         
                        </el-table>
                        <div class="total" style="margin-left:80%;margin-top:20px">
                        <el-form label-width="130px" size="small">
                            <el-form-item label="合计：">
                              <el-col :span="24">
                                 <el-input  v-model="total1"></el-input>
                              </el-col>
                            </el-form-item>
                        
                      </el-form>
                      </div>
                
                      </div>
                    </div>
                    <div class="goods-fitter" style="border:1px solid #d7e0f1;" v-show="comIndex===1">
                       
                      <div class="mcard" style="padding-bottom:0">
                        <el-table :data="poGoodsData" border style="width: 100%" >
                          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                          <el-table-column prop="customerName" label="图样" align="center" width="100">
                                  <template slot-scope="scope">
                                         <img  :src="scope.row.goodsImgUrl" class="showImg" alt="" v-if="scope.row.goodsImgUrl"/>
                                        <img  src="@/common/images/缺省页.jpg" class="showImg" alt="" v-if="!scope.row.goodsImgUrl"/> 
                                  </template>
                          </el-table-column>
                          <el-table-column prop="customerType" label="客户订单信息" align="center" width="150">
                                   <template slot-scope="scope">
                                       <div class="txt_left"> 销售单号：{{scope.row.saleOrderNo}} </div>
                                       <div class="txt_left"> 客户名称:{{scope.row.customerName}} </div>
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactName" label="采购单号" align="center" width="132">
                                    <template slot-scope="scope">
                                        {{scope.row.purchaseOrderNo}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="customerType" label="商品信息" align="center" width="150">
                                   <template slot-scope="scope">
                                       <div class="txt_left"> 商品名称：{{scope.row.goodsName}} </div>
                                       <div class="txt_left"> 货号{{scope.row.goodsSn}} </div>
                                       <div class="txt_left"> 品牌：{{scope.row.brandName}} </div>
                                       <div class="txt_left"> 型号：{{scope.row.modelNumber}} </div>
                                       <div class="txt_left"> SKU：{{scope.row.skuId}} </div>
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="税率" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.taxRate}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="数量" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.purchaseQuantity}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="不含税单价" align="center">
                                    <template slot-scope="scope">
                                       {{scope.row.notaxCostPrice}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="税费" align="center">
                                    <template slot-scope="scope">
                                       {{scope.row.taxation}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="含税单价" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.goodsPrice}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="合计" align="center">
                                <template slot-scope="scope">
                                        {{scope.row.totalPrice}}
                                  </template>
                          </el-table-column>
                      
                        </el-table>
                        <div class="total" style="margin-left:80%;margin-top:20px">
                        <el-form label-width="130px" size="small">
                            <el-form-item label="合计：">
                              <el-col :span="24">
                                <el-input  v-model="total2"></el-input>
                              </el-col>
                            </el-form-item>
                        
                      </el-form>
                      </div>
                
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-form>
     </div>
      <div class="mcard0">
        <div class="mcard">
            <h4 class="title">上传合同扫描件</h4>

          <el-form ref="infoForm" :model="form" :rules="rules" label-width="95px">
               <el-upload
                        :action="baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile'"
                        list-type="picture-card"
                        :on-preview="handlePictureCardPreview"
                        :on-remove="handleRemove"
                        :on-success="handleSuccess">
                        <i class="el-icon-plus"></i>
                </el-upload>
                      <el-dialog :visible.sync="dialogVisible" append-to-body>
                        <img width="100%" :src="dialogImageUrl" alt="">
                        <span slot="footer" class="dialog-footer"></span>
                      </el-dialog>                     
                    <div class="tips">
                          <span>说明：进行此操作前，如此销售单价格和客户信息有变动需提交修改好。</span><br/>
                           <span>选择签订成功，必须上传签订好的合同扫描件.后面合同审核和收款要用到。</span><br/>
                      
                    </div>
          </el-form>
          
        </div>       
      </div>
       <!-- <div class="mcard0">
            <div class="mcard"> 
                <h4 class="title">审批信息</h4>
                <el-row>
                  <el-button class="audit" type="primary" size="small">查看审批进度</el-button>
                </el-row>
                <div class="auditHeader">
                    <span class="gray">审批意见</span>
                    <div class="choose">
                      <el-radio v-model="radio" label="1">备选项</el-radio>
                      <el-radio v-model="radio" label="2">备选项</el-radio>
                    </div>
                    <span class="gray">审批人</span>
                    <span class="white">XXX</span>
                    <span class="gray">部门 </span>
                    <span class="white">XXX</span>
                    <span class="gray">职位 </span>
                    <span class="white">XXX</span>
                </div>
                <div class="auditContent">
                    <span class="gray">意见说明</span>
                    <div class="content">

                    </div>
                </div>
            </div>
        </div> -->
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="auditClosing()" size="small">关 闭</el-button>
        <el-button type="primary" @click="auditSave" size="small">提交审批</el-button>
      </span>
  </el-dialog>
  
  <!--  取消合同审批 -->
   <el-dialog width="72%" :visible.sync="cancelVisible" :before-close="cancelClose">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">取消订单</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mcard0">
        <div class="mcard">
            <h4 class="title">合同信息</h4>

          <el-form ref="infoForm" :model="cancelData" :rules="rules" label-width="140px"  size="small">
            <el-row>
              <el-col :span=8>
                <el-form-item label="合同类型 ：">                       
                              <span>采购订单合同</span>                        
                </el-form-item>
              </el-col>
              <el-col :span=8>  
                <el-form-item label="合同编号：" >                       
                                <span>{{cancelData.contractNo}}</span>                    
                </el-form-item> 
              </el-col>
              <el-col :span=8>  
                <el-form-item label="采购单号：" >                       
                                <span>{{cancelData.purchaseOrderNo}}</span>                    
                </el-form-item> 
              </el-col>
          </el-row>
           <el-row>
              <el-col :span=8>
                <el-form-item label="提 交 人 ：">                       
                              <span>{{cancelData.applyUserName}}</span>                        
                </el-form-item>
              </el-col>
              <el-col :span=8>  
                <el-form-item label="部 门：" >                       
                                <span>{{cancelData.departmentName}}</span>                    
                </el-form-item> 
              </el-col>
              <el-col :span=8>  
                <el-form-item label="职位：" >                       
                                <span>{{cancelData.position}}</span>                    
                </el-form-item> 
              </el-col>
          </el-row>
          <el-row>
              <el-col :span=8>
                <el-form-item label="取 消 人 ：">                       
                              <span>{{cancelData.cancelUserName}}</span>                        
                </el-form-item>
              </el-col>
              <el-col :span=8>  
                <el-form-item label="部 门：" >                       
                                <span>{{cancelData.cancelDepartmentName}}</span>                    
                </el-form-item> 
              </el-col>
              <el-col :span=8>  
                <el-form-item label="职位：" >                       
                                <span>{{cancelData.cancelPosition}}</span>                    
                </el-form-item> 
              </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
                  <el-form-item label="订单状态：" prop="cacelType">                       
                         <el-col :span="20">
                                  <el-input
                                v-model="form.cacelType">
                                  </el-input>  
                        </el-col>              
                </el-form-item> 
              </el-col>
              <el-col :span="12">
                <el-form-item label="取消日期：" prop="cancelTime">                       
                    <el-col :span="20">
                         <el-date-picker
                            v-model="cancelData.cancelTime"
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
                  <el-form-item label="已付供应商定金：" prop="depositStatus">                       
                          <el-col :span="20">
                                  <el-select
                                v-model="cancelData.depositStatus"
                                style="width:100%">
                                <el-option
                                v-for="item in options3"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                              </el-option>
                            </el-select>  
                          </el-col>              
                </el-form-item> 
              </el-col>
             <!--  <el-col :span="12">
                <el-form-item label="取消日期：" prop="cancelTime">                       
                    <el-col :span="20">
                         <el-input v-model="form.amount"></el-input>
                    </el-col>                        
                </el-form-item>
              </el-col>
               -->
          </el-row>
          <el-row>
            <el-col :span="23">
                <el-form-item label="取消说明：" prop="cancelReson">
                    <el-input  
                    type="textarea"
                    :rows="3"
                    placeholder="请输入内容"
                     v-model="cancelData.cancelReson">

                    </el-input>
                  </el-form-item>
            </el-col>
          <!--   <el-col :span="23">
                <el-form-item label="备注：" prop="remark" v-if="form.sigingType===2">
                  <el-input  v-model="form.signRemark">
                    
                  </el-input>
                </el-form-item>
            </el-col> -->
          </el-row>
               
          </el-form>
       
        </div>
      </div>
      <div class="mail-fitter" style="margin-top:20px;margin-bottom:20px;">
            <el-form ref="infoForm"  label-width="100px">
              <div class="mail-wrapper" style="padding-bottom: 10px;">
                <h4 class="title1">商品清单</h4>
                <div class="search-base">
                  <div class="mbottom">
                    <div class="tabs-header">
                        <ul class="clearfix">  
                            <li class ="link" @click="tabIndex0(0)"  :class="currentIndex0===0 ? 'active' : ''">合同商品清单</li>
                            <li class ="link" @click="tabIndex0(1)"  :class="currentIndex0===1 ? 'active' : ''">订单商品清单</li>
                        </ul>
                      </div>
                    <div class="goods-fitter" style="border:1px solid #d7e0f1;" v-show="comIndex===0">
                       
                      <div class="mcard" style="padding-bottom:0">
                        <el-table :data="scGoodsData" border style="width: 100%" >
                          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                          <el-table-column prop="customerName" label="图样" align="center" width="100">
                                  <template slot-scope="scope">
                                        <img  :src="scope.row.goodsImgUrl" class="showImg" alt="" v-if="scope.row.goodsImgUrl"/>
                                        <img  src="@/common/images/缺省页.jpg" class="showImg" alt="" v-if="!scope.row.goodsImgUrl"/> 
                                  </template>
                          </el-table-column>
                          <el-table-column prop="customerType" label="产品名称" align="center" width="160">
                                   <template slot-scope="scope">
                                       <div class="txt_left"> 商品名称：{{scope.row.goodsName}} </div>
                                        <div class="txt_left"> 货号：{{scope.row.goodsSn}} </div>
                                        <div class="txt_left">品牌：{{scope.row.brandName}} </div>
                                        <div class="txt_left"> 型号：{{scope.row.modelNumber}} </div>
                                        <div class="txt_left"> SKU：{{scope.row.skuId}} </div>
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactName" label="规格尺寸" align="center" width="80">
                                    <template slot-scope="scope">
                                        {{scope.row.specSize}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="税率" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.taxRate}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="数量" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.purchaseQuantity}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="不含税单价" align="center">
                                    <template slot-scope="scope">
                                       {{scope.row.notaxCostPrice}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="税费" align="center">
                                    <template slot-scope="scope">
                                       {{scope.row.taxation}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="含税价" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.goodsPrice}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="合计" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.totalPrice}}
                                  </template>
                          </el-table-column>
                             <el-table-column  align="center"  width="120">
                                  <template slot="header" slot-scope="scope">
                                       <el-dropdown trigger="click" @command="handleCommand" class="drop">
                                        <span class="el-dropdown-link">
                                          {{addressTitle}}<i class="el-icon-arrow-down el-icon--right"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                          <el-dropdown-item
                                          v-for="(item,index) in pay" :key="index"
                                          :command="item.command">
                                          {{item.value}}
                                          </el-dropdown-item>

                                        </el-dropdown-menu>
                                       </el-dropdown>
                                  </template>
                                  <template slot-scope="scope">
                                      <el-button type="primary" size="small" v-if="addIndex===1">上传</el-button>
                                      
                                      <span v-if="addIndex===2">{{scope.row.address}}</span>

                                  </template>

                          </el-table-column>
                          <el-table-column label="设计稿" align="center"  width="100">
                                <template slot-scope="scope">
                                      <!-- {{scope.row.fileDesignDraftUrl}} -->

                                     <!--  <el-button v-show="scope.row.fileDesignDraftUrl" type="primary" size="small">上传</el-button> -->
                                      <el-upload
                                        size="small"
                                        class="upload-demo"
                                        v-show="!scope.row.fileDesignDraftUrl"
                                        :action="baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile'"
                                        :before-remove="beforeRemove1"
                                        multiple
                                        :limit="1"
                                        :on-success="handleSuccess1"
                                        :on-exceed="handleExceed1"
                                        :file-list="fileList">
                                        <el-button size="small" type="primary" @click="upLoad(scope.$index)">上传</el-button>
                                      </el-upload>
                                     
                                      <span class="blue" v-show="scope.row.fileDesignDraftUrl" @click="preview(scope.row)">查看</span>
                                    
                                </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="交货日期" align="center">
                                  <template slot-scope="scope">
                                        {{scope.row.distributionTime}}
                                  </template>
                          </el-table-column>
                           <el-table-column prop="commonContactDept" label="采购单号" align="center">
                                  <template slot-scope="scope">
                                        {{scope.row.purchaseOrderNo}}
                                  </template>
                          </el-table-column>
                         
                        </el-table>
                        <div class="total" style="margin-left:80%;margin-top:20px">
                        <el-form label-width="130px" size="small">
                            <el-form-item label="合计：">
                              <el-col :span="24">
                             <!--     <el-input  v-model="total1"></el-input> -->
                              </el-col>
                            </el-form-item>
                        
                      </el-form>
                      </div>
                
                      </div>
                    </div>
                    <div class="goods-fitter" style="border:1px solid #d7e0f1;" v-show="comIndex===1">
                       
                      <div class="mcard" style="padding-bottom:0">
                        <el-table :data="poGoodsData" border style="width: 100%" >
                          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                          <el-table-column prop="customerName" label="图样" align="center" width="100">
                                  <template slot-scope="scope">
                                         <img  :src="scope.row.goodsImgUrl" class="showImg" alt="" v-if="scope.row.goodsImgUrl"/>
                                        <img  src="@/common/images/缺省页.jpg" class="showImg" alt="" v-if="!scope.row.goodsImgUrl"/> 
                                  </template>
                          </el-table-column>
                          <el-table-column prop="customerType" label="客户订单信息" align="center" width="150">
                                   <template slot-scope="scope">
                                       <div class="txt_left"> 销售单号：{{scope.row.saleOrderNo}} </div>
                                       <div class="txt_left"> 客户名称:{{scope.row.customerName}} </div>
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactName" label="采购单号" align="center" width="132">
                                    <template slot-scope="scope">
                                        {{scope.row.purchaseOrderNo}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="customerType" label="商品信息" align="center" width="150">
                                   <template slot-scope="scope">
                                       <div class="txt_left"> 商品名称：{{scope.row.goodsName}} </div>
                                       <div class="txt_left"> 货号{{scope.row.goodsSn}} </div>
                                       <div class="txt_left"> 品牌：{{scope.row.brandName}} </div>
                                       <div class="txt_left"> 型号：{{scope.row.modelNumber}} </div>
                                       <div class="txt_left"> SKU：{{scope.row.skuId}} </div>
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="税率" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.taxRate}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="数量" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.purchaseQuantity}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="不含税单价" align="center">
                                    <template slot-scope="scope">
                                       {{scope.row.notaxCostPrice}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="税费" align="center">
                                    <template slot-scope="scope">
                                       {{scope.row.taxation}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="含税单价" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.goodsPrice}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="合计" align="center">
                                <template slot-scope="scope">
                                        {{scope.row.totalPrice}}
                                  </template>
                          </el-table-column>
                      
                        </el-table>
                        <div class="total" style="margin-left:80%;margin-top:20px">
                        <el-form label-width="130px" size="small">
                            <el-form-item label="合计：">
                              <el-col :span="24">
                                <el-input  v-model="total2"></el-input>
                              </el-col>
                            </el-form-item>
                        
                      </el-form>
                      </div>
                
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-form>
     </div>
      <div class="mcard0">
        <div class="mcard" style="overflow:hidden;">
            <h4 class="title">合同扫描件</h4>
              <div class="imgBox" v-if="cancelData.contractFile" @mouseenter="enterIn" @mouseleave="mouseOut">
                                    <img :src="cancelData.contractFile" alt=""/>
                                    <div class="blackBox" :class="showIndex===1?'show':''">
                                      <i class="el-icon-zoom-in" @click="pictureCardPreview"></i>
                                    </div>
              </div>
              <span v-if="!cancelData.contractFile">暂无合同扫描件</span>                 
              <div class="inTips">
                          <span>说明：进行此操作前，如此销售单价格和客户信息有变动需提交修改好。</span><br/>
                           <span>选择签订成功，必须上传签订好的合同扫描件.后面合同审核和收款要用到。</span><br/>
                      
              </div>
    
          
        </div>       
      </div>
      <!-- <div class="mcard0">
            <div class="mcard"> 
                <h4 class="title">审批信息</h4>
                <el-row>
                  <el-button class="audit" type="primary" size="small" @click="Audit">查看审批进度</el-button>
                </el-row>
             <div class="auditBody">
                <div class="auditHeader1">
                    <span class="gray">推送状态</span>
                    <div class="choose">
                      <span style="width:148px;display:inline-block;text-align:center;">无</span>
                    </div>
                    <span class="gray">提交人</span>
                    <span class="white" v-if="auditPushData.userName">{{auditPushData.userName}}</span>
                    <span class="white" v-if="!auditPushData.userName">无</span>
                    <span class="gray">部门 </span>
                    <span class="white" v-if="auditPushData.organizeName">{{auditPushData.organizeName}}</span>
                    <span class="white" v-if="!auditPushData.organizeName">无</span>
                    <span class="gray">职位 </span>
                    <span class="white" v-if="auditPushData.position">{{auditPushData.position}}</span>
                    <span class="white" v-if="!auditPushData.position">无</span>
                </div>
                <div class="auditContent1">
                    <span class="gray">推送说明</span>
                    <div class="content">
                          {{auditPushData.comment}}
                    </div>
                </div>
             </div>
             <div class="auditBody" style="position:relative;top:-1px;">
                <div class="auditHeader1" style="margin-top:0;">
                    <span class="gray">审批意见</span>
                    <div class="choose">
                      <el-radio v-model="form.auditStatus" label="1">同意</el-radio>
                      <el-radio v-model="form.auditStatus" label="2">不同意</el-radio>
                    </div>
                    <span class="gray">审批人</span>
                    <span class="white" v-if="userData1[0]">{{userData1[0]}}</span>
                    <span class="white" v-if="!userData1[0]">无</span>
                    <span class="gray">部门 </span>
                    <span class="white" v-if="userData1[1]">{{userData1[1]}}</span>
                    <span class="white" v-if="!userData1[1]">无</span>
                    <span class="gray">职位 </span>
                    <span class="white" v-if="userData1[2]">{{userData1[2]}}</span>
                    <span class="white" v-if="!userData1[2]">无</span>
                </div>
                <div class="auditContent1">
                    <span class="gray">意见说明</span>
                    <div class="content">
                        <textarea class="reasonArea" cols="155" rows="4"
                        v-model="form.opinions">

                        </textarea>
                    </div>
                </div>
               </div>
            </div>  
      </div> -->
      
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="cancelClosing()" size="small">关 闭</el-button>
          <el-button type="primary" @click="cancelAudit" size="small">提交审批</el-button>
        </span>
  </el-dialog>
   <!-- 上传预览 -->
       <el-dialog :visible.sync="dialogVisible1" :modal="true" :append-to-body="false">
                                        <img width="100%" :src="previewImg" alt="">
                                        <span slot="footer" class="dialog-footer"></span>
        </el-dialog>
    <!-- 取消扫面件预览 -->
       <el-dialog :visible.sync="dialogVisible2" :modal="true" :append-to-body="false">
                                        <img width="100%" :src="previewImg1" alt="">
                                        <span slot="footer" class="dialog-footer"></span>
        </el-dialog>
  
    <DetailContract 
      :detailData="detailData"
      :detailVisibles="detailVisibles"   
      @createClose3="createClose4"
        @createClosing3="createClosing4"></DetailContract> 
    <!-- 审批 -->
    <ContractAudit
      :approvalVisibles="approvalVisibles"
      :showId="showId"
      :scGoodsData="scGoodsData"
      :poGoodsData="poGoodsData"
      :initDataA="initDataA"
      :userData="userData"
      :personData="personData"
        @createCloseA="createClose2"
        @createClosingA="createClosing2"
        @signContract="signContract2">

    </ContractAudit>
    <!-- 进度表 -->
       <TimeLine
        :auditData="auditData"
        :goVisibles="goVisibles"  
        :Type="Type"
        :contractNo="contractNo" 
          @createCloseG="createClose5"
            @createClosingG="createClosing5">
        </TimeLine> 
      <!-- 合同取消审批 -->
      <ContractRomove
       :removeVisibles="removeVisibles"
      :showId="showId"
      :scGoodsData="scGoodsData"
      :poGoodsData="poGoodsData"
      :auditPushData="auditPushData"
      :userData1="userData1"
      :cancelData1="cancelData1"
      @createCloseR="createClose6"
        @createClosingR="createClosing6"
        @romoveContract="romoveContract6">


      </ContractRomove>
  </div>
  </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'
import { throttleTipPop } from "@/utils/functions.js";
import {getPurchaseContract,
initSignContract,
findPoGoods,
initContractData,
findScGoods,
savePurchaseAudit,
purchaseContractDetail,
findSignContract,
findSignUser,
findSignAuditData,
findContractPlan,
findCancelContract,
findCancelUser,
findCancelAudit,
CancelContractAudit,
getCancelContractInfo,
getCancelContractPlan,
ContractGoodsList,
findBatchContract} from '@/api/purchase/index'
import AccountOrder from './order'
import DetailContract from './detailContract'
import ContractAudit from './contractAudit'
import ContractRomove from './contractCancel'
import TimeLine from './timeLine'
export default {
  filters: {
    date: function(val) {
        let str = '';
        let  skr = '';
        if(val){
          str=val.slice(0 ,10)
          skr = str.replace('-','年')
          skr = skr.replace('-','月')
          skr = skr.concat("日")
        }
        return skr
    }
    },
  data () {
    return {
      pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        srcList: [
          'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
          'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg'
        ], 
      fileList:[],
      deletePath:[],//删除路径
      imgArr:[],//上传数组
      mainIndex:'AccountOrder',
      addressTitle:'收货地址',
      addIndex:2,
      comIndex:0,      
      currentIndex0: 0,
      currentIndex:0,
      contractNo:'',
      showIndex:'',
      showIndex1:1,
      Type:'',
      scGoodsData:[],//合同商品清单
      poGoodsData:[],//订单商品清单
      userData:'',//当前人信息
      userData1:'',//取消当前人信息
      personData:'',//审核人信息
      goVisibles:false,//进度表弹框
      auditData:{},//进度表数据
      dataArr:[],
      radio:'',
      contractId:'',//合同ID
      showId:'',//展示合同ID
      initData:'',//合同签定审批初始化数据
      cancelData:'',//取消合同初始化数据
      cancelData1:'',//取消合同审批初始化数据
      initDataA:'',
      auditPushData:'',//取消审核推送审核
      approvalVisibles:false,//审批弹框
      auditVisible:false,//推送审核弹窗
      auditVisible1:false,//审核弹窗
      cancelVisible:false,//取消订单
      removeVisibles:false,//取消订单审批
      dialogImageUrl: '',
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2:false,
      previewImg:'',//查看设计稿
      previewImg1:'',//
      disabled: false,
      editVisibles:false,//编辑合同
      detailVisibles:false,//查看合同
      orderDatas:[],//根据ID获得的销售订单详细
      orderData:[],//销售订单分页数据
      page:[],//商品明细分页
      page1:[],
      count:[],//商品明细总数
      getIndex:'',
      closeId: "", //关闭ID
      closeNo: "",
      showNo:'',//展示商品明细需要的编号
      deleteId:'',
      detailData:'', 
      form: {
        allType:0,//搜索审核状态
        current_page:0,
        page_size:10,
        total_count:0,
        to:0,//推送给
        endTime:'',//截止日期
        auditType:0,//审核状态
        signRemark:'',//备注
        orderNumber:'',//销售单号
        customerName:'',//客户名称
        sigingType:1,//签定状态
        sigingTime:'',//签定日期
        imgUrl:[],//上传图片路径

        cacelType:"签定成功",//取消订单状态
        depositStatus:'',//定金状态
        auditStatus:'',
        opinions:'',
      },
      goodsData:{
        pageIndex:1,
        pageSize:10,
        count:0
      },
      pay:[
               {value:"多地址配送",command:1},
               {value:"收货地址",command:2}
             ],
      tableDatas: {
                pageIndex:1,
                sizes:[10, 20, 50, 100],
                pageSize:10,
                count:0,
                customerName:'',//客户名称
                customerPlatform:'',//客户平台
                startTime:'',
                endTime:'',
                orderNo:'',//单号
                status:'',//合同状态
                supplierInfo:'',//供应商
                deliveryDate:'',//
            },
       options1: [
        {
          value: 0,
          label: "待签订"
        },
        {
          value: 1,
          label: "已签定"
        },
        {
          value: 2,
          label: "已取消"
        }
      ],
       options2: [
        {
          value: 1,
          label: "签订成功"
        },
        {
          value: 2,
          label: "签订失败"
        },
      ],
      options3:[
        {
          value: 0,
          label: "未付"
        },
        {
          value: 1,
          label: "已付"
        },
      ],
      tableData:[
          {
          date: '2016-05-02',
          name: '张小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        },
        
      ],
      rules:{
        
        sigingType:[
           {required: true, message: '此项为必填项',trigger: 'blur'}
        ],
        sigingTime:[
          {required: true, message: '此为必填项',trigger: ['blur','change']}
        ],
        signRemark:[
          {required: true, message: '此为必填项',trigger: ['blur','change']}
        ],
        cancelTime:[
          {required: true, message: '此为必填项',trigger: ['blur','change']}
        ],
        cancelReson:[
          {required: true, message: '此为必填项',trigger: ['blur','change']}
        ],
      }
    }
  },
  created () {
    this._getPurchaseContract();
  },
  watch:{
     "tableDatas.deliveryDate": {
      handler(val, old) {
        if(val===null){
            this.tableDatas.startTime = '';
        this.tableDatas.endTime = '';
        }else{
            this.tableDatas.startTime = val[0];
        this.tableDatas.endTime = val[1];
        }
      },
      deep: true
    },
    'form.auditStatus':{
            handler(val){         
            if(val==='1'){
                this.form.opinions ="审核通过"
            }else if(val==='2'){
                this.form.opinions ="审核不通过"
            }
            }
            ,deep:true
        },
    "scGoodsData":{
          handler(val){
            if(val&&val.length>0){
              for(let i=0;i<val.length;i++){
                val[i].totalPrice = val[i].purchaseQuantity *val[i].goodsPrice;
              }
            }
          },deep:true
    } 
  },
  computed: {
     total2(){
      let totals = 0
      let _this = this
      if(_this.poGoodsData&&_this.poGoodsData.length>0){
          for(var i = 0;i<_this.poGoodsData.length;i++){
            if(!isNaN(_this.poGoodsData[i].totalPrice)){
              totals+=parseFloat(_this.poGoodsData[i].totalPrice)
            }else{
              totals = 0
            }
      }
        
      }
        return totals
      
     },
      total1(){
      let totals = 0
      let _this = this
      if(_this.scGoodsData&&_this.scGoodsData.length>0){
          for(var i = 0;i<_this.scGoodsData.length;i++){
            if(!isNaN(_this.scGoodsData[i].totalPrice)){
              totals+=parseFloat(_this.scGoodsData[i].totalPrice)
            }else{
              totals = 0
            }
      }
        
      }
        return totals
      
     },
     
  },
  methods: {
    //签定合同关闭
    auditClose(){
        
        this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                      this.auditVisible= false;
                })
                .catch(_ => {});
    },
    auditClosing(){
        this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                      this.auditVisible= false;
                })
                .catch(_ => {});
    },
    cancelClose(){
        this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                      this.cancelVisible= false;
                })
                .catch(_ => {});
    },
    cancelClosing(){
      this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                      this.cancelVisible= false;
                })
                .catch(_ => {});
    },
    //子组件传值
    createClose4: function(data) {
      this.detailVisibles = data;
    },
    createClosing4: function(data) {
      this.detailVisibles = data;
    },
    //审批
    createClose2(data){
      this.approvalVisibles = data;
    },
    createClosing2(data){
      this.approvalVisibles = data;
    },
    signContract2(data){
      this.approvalVisibles =data;
      this._getPurchaseContract();
      this.resetData();
    },
    //时间线
    createClose5: function(data) {
      this.goVisibles = data;
    },
    createClosing5: function(data) {
      this.goVisibles = data;
    },
    //取消合同审批
    //时间线
    createClose6: function(data) {
      this.removeVisibles = data;
    },
    createClosing6: function(data) {
      this.removeVisibles = data;
    },
    romoveContract6(data){
      this.removeVisibles = data;
      this._getPurchaseContract();
                this.resetData();
    },
    tabIndex0 (index) {
      this.currentIndex0 =index
      switch(index) {
        case 0:
          this.comIndex = 0
          break;
        case 1:
          this.comIndex = 1
          break;
        default: 
            return
      }
    },
    

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
    search(){
      this.tableDatas.pageIndex =1;
      this._getPurchaseContract();
      this.resetData();
    },
    //重置数据
    resetData(){
      this.getIndex= '';
      this.showNo = '';
      this.page = [];
      this.count = 0;
    },
    //获取签定合同分页
    _getPurchaseContract(){
      getPurchaseContract(this.tableDatas).then(res=>{
            this.orderData = res.data.pageList
            this.tableDatas.count = res.data.count
      })
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
      this.closeId = row.contractId;
      this.showNo = row.purchaseOrderNo
      
      let obj = {};
      obj.pageIndex = this.goodsData.pageIndex;
      obj.pageSize = this.goodsData.pageSize;
      obj.contractId = row.contractId;
       ContractGoodsList(obj).then(res => {
        this.page = res.data.pageList;
        this.count = res.data.count;
      });
    },
    //签订合同
     Signature(row){
       this.contractId = row.contractId;
       this.purchaseOrderNo = row.purchaseOrderNo;
      
      findScGoods(this.contractId).then(res=>{
          if(res.code===200){
            this.scGoodsData = res.data;
          }
      })
      findPoGoods(this.contractId).then(res=>{
          if(res.code===200){
            this.poGoodsData = res.data;
            
          }
      })
       initSignContract(this.contractId).then(res=>{
          if(res.code===200){
             this.initData = res.data;
             this.auditVisible = true;
         }
      })
      
      },
    //合同审批
    SignAudit(row){
        this.showId = row.contractId;
       this.purchaseOrderNo = row.purchaseOrderNo;
      
      findScGoods(row.contractId).then(res=>{
          if(res.code===200){
            this.scGoodsData = res.data;
          }
      })
      findPoGoods(row.contractId).then(res=>{
          if(res.code===200){
            this.poGoodsData = res.data;
            
          }
      })
      findSignUser(row.contractId).then(res=>{
          if(res.code===200){
              this.userData =  res.data.split('|')
            }
      })
      findSignAuditData(row.contractId).then(res=>{
           if(res.code===200){
                this.personData = res.data;
            }
        })
       findSignContract(row.contractId).then(res=>{
          if(res.code===200){
             this.initDataA = res.data;
             this.approvalVisibles = true;         
         }
        
      })
      
       

    },
    //取消合同
    cancelSign(row){
        this.showId = row.contractId;
       this.purchaseOrderNo = row.purchaseOrderNo;
       findCancelContract(row.contractId).then(res=>{
           if(res.code===200){
              this.cancelData = res.data;
              this.cancelVisible = true; 
           }
                           
        })
        findScGoods(row.contractId).then(res=>{
          if(res.code===200){
            this.scGoodsData = res.data;
          }
        })
        findPoGoods(row.contractId).then(res=>{
            if(res.code===200){
              this.poGoodsData = res.data;
              
            }
        })
       /*  findCancelUser(row.contractId).then(res=>{
            if(res.code===200){
              this.userData1 =  res.data.split('|')
            }
        })
        findCancelAudit(row.contractId).then(res=>{
          if(res.code===200){
             this.auditPushData = res.data;
             this.cancelVisible = true;       
         }
         }) */
      
    },
    //取消合同
    cancelAudit(){

      let obj = {};
      obj.contractId = this.showId;
      obj.cancelTime = this.cancelData.cancelTime;
      obj.cancelReason = this.cancelData.cancelReson;
      if(!this.cancelData.cancelTime ||
      !this.cancelData.cancelReson){
           throttleTipPop(this, "warning", "请填写带*的填项", 2000);
      }else{
          CancelContractAudit(obj).then(res=>{
            if(res.code===200){
                throttleTipPop(this, "success", "提交取消订单审核成功", 2000);
                this._getPurchaseContract();
                this.resetData();
                this.cancelVisible = false;
            }
          })
      }
    },
    //取消合同审批
    removeSign(row){
          this.showId = row.contractId;
       this.purchaseOrderNo = row.purchaseOrderNo;
       getCancelContractInfo(row.contractId).then(res=>{
          this.cancelData1 = res.data;
        })
        findScGoods(row.contractId).then(res=>{
          if(res.code===200){
            this.scGoodsData = res.data;
          }
      })
      findPoGoods(row.contractId).then(res=>{
          if(res.code===200){
            this.poGoodsData = res.data;
            
          }
      })
        findCancelUser(row.contractId).then(res=>{
            if(res.code===200){
              this.userData1 =  res.data.split('|')
            }
        })
        findCancelAudit(row.contractId).then(res=>{
            if(res.code===200){
              this.auditPushData = res.data;
              this.removeVisibles = true;       
          }
         })
    },
    auditSave(){
     let obj ={};
        obj.contractId = this.contractId;
        obj.status = this.form.sigingType;
        obj.signTime = this.form.sigingTime;
        obj.reason = this.form.signRemark;
        obj.contractFile = this.form.imgUrl;
        savePurchaseAudit(obj).then(res=>{
              if(res.code===200){
                    throttleTipPop(this, "success", "签定合同成功", 2000);
                    this.auditVisible = false;
                    this._getPurchaseContract();
                    this.resetData();
              }
        })
    },
    //进度表
     Audit(row,indx){
      if(row.status===6){
        this.Type = 3;
        this.contractNo = row.contractNo;
       getCancelContractPlan(row.contractId).then(res=>{
          if(res.code===200){ 
            for(let i=0;i<res.data.length;i++){
                res.data[i].end = res.data[i].result;
                
                if(res.data[i].permission===1){
                      if(res.data[i].result===0){
                        res.data[i].result="待推送审批"
                      }else{
                        res.data[i].result="已推送审批"
                      }
                  }else if(res.data[i].permission!==1){   
                      if(res.data[i].result===0){
                        res.data[i].result="待审批"
                      }else if(res.data[i].result===1){
                        res.data[i].result="审批通过"
                      }else{
                        res.data[i].result="审批不通过"
                      }
                  }   
            }
            this.auditData = res.data;
            this.goVisibles = true;
              }
            })

      }else{
          this.Type = 2;
          this.contractNo = row.contractNo;
         findContractPlan(row.contractId).then(res=>{
          if(res.code===200){ 
            for(let i=0;i<res.data.length;i++){
                res.data[i].end = res.data[i].result;
                
                if(res.data[i].permission===1){
                      if(res.data[i].result===0){
                        res.data[i].result="待推送审批"
                      }else{
                        res.data[i].result="已推送审批"
                      }
                  }else if(res.data[i].permission!==1){   
                      if(res.data[i].result===0){
                        res.data[i].result="待审批"
                      }else if(res.data[i].result===1){
                        res.data[i].result="审批通过"
                      }else{
                        res.data[i].result="审批不通过"
                      }
                  }   
            }
            this.auditData = res.data;
            this.goVisibles = true;
              }
            })
      }
    },
     //合同详情
    detailContract1(row){
      
      findBatchContract(row.contractNo).then(res=>{
         if(res.code===200){
             this.detailData = res.data;
             this.detailVisibles = true;
         }
      })  
    },
      //删除订单
      deleteAuditView(){
        this.deleteVisible =true;
      },
     //上传成功
       handleSuccess(data) {    
        let path = data.data.domain+data.data.filePath
        var arrs = []
        this.imgArr.push(path);
        arrs = this.imgArr;
        console.log(arrs);
        
        var strs = new Array(); //定义一数组
        strs = arrs.join('##');
        console.log(strs);
        this.form.imgUrl = strs;
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
              console.log(this.deletePath);
         let arr=[];
         arr = this.form.imgUrl.split('##');
         const index = arr.findIndex(item=> item===this.deletePath);
         console.log(index);        
         arr.splice(index,1);
         this.form.imgUrl = arr;
          console.log(this.form.imgUrl);
         this.form.imgUrl = this.form.imgUrl.join('##');
      },

       upLoad(index){
     
      this.upLoadIndex = index;
    },
      handleExceed1(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove1(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      handleSuccess1(file){
        this.proList.details[this.upLoadIndex].fileDesignDraftUrl = file.data.domain + file.data.filePath;
        
      },
      //多地址切换
       handleCommand(command){
            if(command===1){
              this.addressTitle = "多地址配送";
              this.addIndex = 1
            }else if(command===2){
              this.addressTitle = "收货地址";
              this.addIndex = 2
            }
          
      },
      //预览设计稿
      preview(row){
          this.previewImg = row.fileDesignDraftUrl;
          this.dialogVisible1 = true;
      }, 
      //预览取消合同扫面件
      pictureCardPreview(){
        this.dialogVisible2 = true;
        this.previewImg1 = this.cancelData.contractFile;
      },  
       //鼠标划入
      enterIn(){
        this.showIndex = 1;
      },
      //鼠标画出
      mouseOut(){
        this.showIndex = 0;
      },
       //展开
    downOn(){
        this.showIndex1 = 0;
    },
     downOn1(){
        this.showIndex1 = 0;
    },
    downOff(){
      this.showIndex1 =1;
    },
    downOff1(){
      this.showIndex1 =1;
    },
      //主页换页
       getHandleSizeChange(val) {
       this.tableDatas.pageSize =val;
       this.resetData();
       this._getPurchaseContract();
     },
    getHandleCurrentChange(val) {
      this.tableDatas.pageIndex = val;
      this.resetData();
      this._getPurchaseContract();
    },
     

      handleSizeChange(){

      },
      handleCurrentChange(){

      },
      handleSelectionChange(){
        
      },
      handleChange(){

      }
  },
  components: {
    AccountOrder,
    DetailContract,
    ContractAudit,
    ContractRomove,
    TimeLine
  }
}
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
#pucharseSign{
    
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
            border:0;
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
  .mail-fitter {
        .mail-wrapper {
          padding: 20px;
          padding-bottom: 0;
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
  .line1{
      overflow: hidden;
      .small-Idiv{
        width: 50%;
        padding-top: 10px;
        float: left;

      }


  }
 
  .small_top{
      margin-left:7px;
    }

  .i-div {
    cursor: pointer;
  }
  .margin1{
    padding-left:40px;
    padding-top:20px;
    box-sizing: border-box;

  }
  .order{
    color:#4A99FA;
  }
  .mcard0 {
      border:0;
      margin-top: 20px;
    }
  .tips{
    position: relative;
      top: 6px;
      left: 0px;
      font-size: 11px;
      color:#909399;
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
  .audit{
    float: right;
  }

  .demoImg{
    width:148px;
    height: 148px;
    cursor: pointer;
      border-radius: 5px;
      border: 1px solid #ccc;
  }
  .showImg{
    width:80px;
    height: 80px;
  }
      /deep/ .el-dialog__headerbtn{
            top:10px;
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
        /deep/ .el-upload{
            border: 0 !important;
        }
      }
      //
      .blue{
        cursor: pointer;
        color: #4C86F4;
  }   
    .imgBox{
        width: 148px;
        height: 148px;
        border-radius: 6px;
        float: left;
        margin-right: 10px;
        position: relative;
        margin-bottom: 20px;
        img{
          width: 100%;
          height: 100%;
          border-radius: 6px;
          
        }
        .blackBox{
          transition: all 0.6 0 ease-in !important;
          width: 148px;
          height: 148px;
          background: rgba(0,0,0,0.5);
          border-radius: 6px;
          text-align: center;
          position: absolute;
          top:0;
          display: none;
          i{
            font-size: 20px;
            color: #fff;
            line-height: 148px;
            cursor: pointer;
          }
        }
        .show{
          animation: show .3s;
          display: block;
        }
      }
      .inTips {
      position: relative;
      top: 152px;
      left: -157px;
      font-size: 11px;
      color: #909399;
  }
  .auditHeader1{
      margin-top:20px;
    .gray{
      display: inline-block;
      width:130px;
      height: 48px;
      border: 1px solid #D6DEEF;
      box-sizing: border-box;
      color: #909399;
      text-align: center;
      line-height: 48px;
      background: #F5F8FC;
    }
    .choose{
      display: inline-block;
      border: 1px solid #D6DEEF;
      border-right: 0;
      border-left: 0;
      padding: 0 40px;
      height: 48px;
      color: #909399;
      line-height: 48px;
      .el-radio {
      color: #909399;
      cursor: pointer;
      }
    }
    .white{
      display: inline-block;
      border: 1px solid #D6DEEF;
      border-right: 0;
      border-left: 0;
      width: 166px;
      height: 48px;
      color: #909399;
      text-align: center;
      line-height: 48px;
    }

    .white:nth-of-type(7){
      border-right: 1px solid #D6DEEF;
    }
  }
  .auditContent1{
    .gray{
      display: inline-block;
      width:130px;
      height: 96px;
      line-height: 97px;
      border: 1px solid #D6DEEF;
      border-top: 0;
      color: #909399;
      text-align: center;
      background: #F5F8FC;
      box-sizing: border-box;
      float: left;
    }
    .content{
        border: 1px solid #D6DEEF;
        border-left: 0;
        border-top: 0;
        width: 1116px;
        height: 96px;
        display: inline-block;
      .reasonArea{
            border: 0;
            resize:none;
            outline:none;
            line-height: 20px;
            letter-spacing: 1px;
        }
      .reasonArea:focus{
            border: 0;
        }
    }
    
  }
  .boxImg{
        border-bottom: 1px solid #EBEEF5;
        padding:10px 10px;
        position: relative;
        width: 220px;
        left: -10px;
        height:200px;
        overflow-y: auto;
    }
    .boxImg:nth-of-type(1){
      padding-top:0;
    }
    .boxImg:nth-last-of-type(1){
      border-bottom: 0;
      padding-bottom: 0;
      height: 190px;
    }

    .boxImg1{
      border-bottom: 1px solid #EBEEF5;
        padding:10px 10px;
        position: relative;
        min-width: 210px;
        left: -10px;
        height:200px;
        overflow-y: auto;
        
    }
    .boxImg1:nth-of-type(1){
      padding-top:0;
    }
    .boxImg1:nth-last-of-type(1){
      border-bottom: 0;
      padding-bottom: 0;
      height: 190px;
    }
    .boxImg2{
      border-bottom: 1px solid #EBEEF5;
        padding:10px 10px;
        position: relative;
        width: 140px;
        left: -10px;
        height:200px;
        overflow-y: auto;
        
    }
    .boxImg2:nth-of-type(1){
      padding-top:0;
    }
    .boxImg2:nth-last-of-type(1){
      border-bottom: 0;
      padding-bottom: 0;
      height: 190px;
    }
    .wrapper1{
      max-height:420px;
      position: relative;
      .down{
        position: absolute;
          width: 113%;
          height: 22px;
          border-top: 1px solid #EBEEF5;
          background: #EBEEF5;
          left: -10px;
          bottom: 0;
          cursor: pointer;
      }
    }
    .upBox{
        position: relative;
        .down{
          position: absolute;
          width: 113%;
          height: 22px;
          border-top: 1px solid #EBEEF5;
          background: #EBEEF5;
          left: -10px;
          bottom: 0;
          cursor: pointer;
      }
    }
    .upBox1{
        position: relative;
          .down{
        position: absolute;
          width: 113%;
          height: 22px;
          border-top: 1px solid #EBEEF5;
          background: #EBEEF5;
          left: -10px;
          bottom: 0;
          cursor: pointer;
      }
    }
    .wrapper2{
      max-height:420px;
      position: relative;
      .down{
      position: absolute;
        width: 113%;
        height: 22px;
        border-top: 1px solid #EBEEF5;
        background: #EBEEF5;
        left: -10px;
        bottom: 0;
        cursor: pointer;
    }
    }
    .wrapper3{
      max-height:420px;
      position: relative;
      .down{
      position: absolute;
        width: 117%;
        height: 22px;
        border-top: 1px solid #EBEEF5;
        background: #EBEEF5;
        left: -10px;
        bottom: 0;
        cursor: pointer;
    }
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
  }
 
</style>