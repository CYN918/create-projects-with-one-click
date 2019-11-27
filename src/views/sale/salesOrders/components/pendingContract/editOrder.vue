<template>
  <div class="editOrder">
      <el-dialog :visible.sync="editVisible" width="70%" :before-close="createClosing">
        

        <div class="mail-fitter">
          <div class="goods-fitter" style="margin-bottom:20px">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">编辑销售订单</h4>
              </div>
            </el-form>
          </div>
          
          <el-form ref="infoForm" :model="editDatas" :rules="rules" label-width="100px" size="small">
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
                          <el-form-item label="部 门：" prop="department">
                            <el-input v-model="editDatas.department" placeholder="请填写部门"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="联 系 人：" prop="customerContact">
                            <el-input v-model="editDatas.customerContact" placeholder="请填写联系人"></el-input>
                          </el-form-item>
                        </el-col>

                        <el-col :span="6">
                          <el-form-item label="销售单号：" prop="inquiryNo">
                            <el-input v-model="editDatas.saleOrderNo" :disabled="true" placeholder="保存后自动生成"></el-input>
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
                          <el-form-item label="邮 箱：" prop="email">
                            <el-input v-model="editDatas.email" placeholder="请填写邮箱"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="6">
                          <el-form-item label="销售代表：" prop="saleUserName">
                            <el-input v-model="form.salesRepresentatives" placeholder="请填写销售代表"></el-input>
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
                           <el-form-item label="支付定金：" prop="deposit">
                             <el-input v-model="editDatas.depositAmount" placeholder="请填写支付定金"></el-input>
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
                    :data="editDatas.goodsDetailParam"
                    stripe
                    style="width: 100%"
                    border
                    ref="elTable1"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column type="selection" align="center"></el-table-column>
                    <el-table-column type="index" label="编号" align="center" width="55" fixed="left"></el-table-column>
                    <el-table-column label="商品信息" align="center" width="250" fixed="left">
                      <template slot-scope="scope">
                          <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                          <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                          <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                          <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                          <div class="txt_left">SKU：{{scope.row.goodsSkuId}}</div>
                      </template>
                    </el-table-column>
                   <el-table-column label="规格尺寸" align="center" width="150">
                      <template slot-scope="scope"> 
                            <div>{{scope.row.goodsSpecSize}}</div>                   
                      </template>
                    </el-table-column>
                    <el-table-column label="税率" align="center" width="70">
                          <template slot-scope="scope">
                          <el-input
                            v-model="scope.row.taxRate"
                            size="mini"
                            v-if="editDatas.invoiceType!==0"
                          ></el-input>
                          <el-input
                            v-model="scope.row.taxRate"
                            size="mini"
                            v-if="editDatas.invoiceType===0"
                            :disabled="true"
                          ></el-input>
                        </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center" >
                      <template slot-scope="scope"> 
                              {{scope.row.goodsUnit}}                
                      </template>
                    </el-table-column>
                    <el-table-column label="数量" align="center" width="100">
                      <template slot-scope="scope">    
                            <el-input  v-model="scope.row.goodsCount" size="small"></el-input>              
                      </template>
                    </el-table-column>
                    <el-table-column label="不含税单价" align="center" width="100">
                          <template slot-scope="scope">    
                                <el-input  v-model="scope.row.notTaxPrice" size="small" readonly></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column label="税费" align="center" width="100">
                          <template slot-scope="scope">    
                               <el-input  v-model="scope.row.tax" size="small" readonly></el-input>       
                          </template>
                        </el-table-column>
                        <el-table-column align="center" width="100">
                            <template slot="header">
                              <i style="color:red;margin-right:3px;">*</i>含税单价
                          </template>
                          <template slot-scope="scope">    
                            <el-input  v-model="scope.row.goodsPrice" size="small"></el-input>              
                      </template>
                      </el-table-column>
                    <el-table-column label="合计" align="center" width="120">
                      <template slot-scope="scope"> 
                            <el-input v-model="scope.row.totalPrice" size="small"></el-input>                      
                      </template>
                    </el-table-column>
                    <el-table-column label="制作要求" align="center" width="200">
                      <template slot-scope="scope"> 
                            <el-input v-model="scope.row.productionRequire" size="small"
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
                             <el-input v-model="scope.row.deliveryAddress" size="small"
                              type="textarea"
                              :autosize="{ minRows: 1, maxRows: 3}"
                             resize=none></el-input>     
                                
                      </template>
                    </el-table-column>
                     <el-table-column  align="center" width="200">
                        <template slot="header" slot-scope="scope">
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
                              :picker-options="pickerOptions0"
                              >
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
              </div>
            </div>
          </el-form>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="createClose" size="small">关 闭</el-button>
          <el-button type="primary" @click="editOrder()" size="small">保存</el-button>
        </span>
      </el-dialog>
      <!-- 编辑客户询价添加商品弹窗 -->
        <el-dialog width="60%" :visible.sync="innerVisible1" :modal="true" :append-to-body="false">
          <!-- 编辑客户询价添加商品选择品牌弹窗 -->
        
          <div class="mail-fitter">
            <el-form ref="infoForm" :model="form" :rules="rules" label-width="110px" size="small">
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
                            <el-button type="primary" size="small" @click="goodsSearch()">查询</el-button>
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
                              <div>{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].taxRate}}%</div>
                          
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
                           <div class="txt_left">运费：</div>
                          <div
                            class="txt_left"
                          >对外ppt价格：</div>
                          <div
                            class="txt_left"
                          >对外最低价格:</div>
                          <div
                            class="txt_left"
                          >对我司的特惠价:</div>
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
                            <div class="tex_left">运费</div>
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
                           <div class="txt_left">运费：</div>
                          <div
                            class="txt_left"
                          >对外ppt价格：</div>
                          <div
                            class="txt_left"
                          >对外最低价格:</div>
                          <div
                            class="txt_left"
                          >对我司的特惠价:</div>
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
                            <div class="tex_left">运费</div>
                          </div>
                          
                        </div>
                      </template>
                    </el-table-column>
                    
                  </el-table>

                 <!--  <div class="pagination">
                    <el-pagination
                      @size-change="handleSizeChange"
                      @current-change="handleCurrentChange"
                      :current-page="form.current_page"
                      :page-sizes="[10, 30, 50, 100]"
                      :page-size="form.page_size"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="form.total_count"
                    ></el-pagination>
                  </div> -->
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
                                  v-model="customerDatas.keywords"
                                  placeholder="请输入客户名称/联系人/手机号"
                                ></el-input>
                              </el-col>
                              <el-col :span="2" :offset="1">
                                <el-button type="primary" size="small" @click="customerSearch1">查询</el-button>
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
            <el-button type="primary" @click="customerVisible1 =false" size="small">保存</el-button>
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
  editOrders
} from "@/api/sale/index";
import { deleteGoods, getErpGoods } from "@/api/product/index";

import { getAllcustomer } from "@/api/customer";
import { throttleTipPop } from "@/utils/functions.js";
export default {
  data() {
    return {
      pickerOptions0: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      previewImg:'',
      dialogVisible:false,
      editVisible: false, //编辑询价单
      innerVisible1: false, //编辑询价单新增商品弹窗
      customerVisible1: false, //编辑询价单客户选择弹窗
      brandVisible1: false, //编辑询价单新增商品品牌弹窗\
       toInquiryId: "", //转交采销需要的ID
      toInquiryNo: "", //转交采销需要的单号
      orderNumber:'',//销售单号
      deposit:'',//定金
      saleName:"",//销售代表
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
        tableData: [],
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
      customerDatas: {
        pageNum: 1,
        pageSize: 10,
        total_count: 0,
        keywords: ""
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
      inquiryId: [],
      inquiryData: [],
      tableData: [],
      selectData: [],
      selectData1: [],
      goodsData: [],
      customerData: [],
      list: [], //客户列表
      editDatas: {},
      editDatas1: [],
      elTable: [],
      rules: {
        customerContact: [
          { required: true, message: "此项为必填项", trigger: "blur" }
        ],
        offerEndTime: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        phone: [{ required: true, message: "此项为必填项", trigger: ["blur","change"] }],
        customerName: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        projectName: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        department: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        offerDepartment: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        offerContact: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        offerPhone: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        dealDate: [{ required: true, message: "此项为必填项", trigger: ["blur","change"] }]
      }
    };
  },
  props: ["editVisibles","orderDatas","salesRepresentatives"],
  created() {
    this._getGoods()
    this.getName()
  },
   computed: {
    total1(){
      let totals = 0
      let _this = this
      if(_this.editDatas.goodsDetailParam&&_this.editDatas.goodsDetailParam.length>0){
          for(var i = 0;i<_this.editDatas.goodsDetailParam.length;i++){
            if(!isNaN(_this.editDatas.goodsDetailParam[i].totalPrice)){
              totals+=parseFloat(_this.editDatas.goodsDetailParam[i].totalPrice)
            }else{
              totals = 0
            }
      }       
      }
        return totals
    }
  },
  watch: {
    editVisibles(val) {
      this.editVisible = val;
    },
    orderDatas(val){
      this.editDatas  = val
      
    },
    salesRepresentatives(val){
      this.saleName = val
    },
    //监听数组中值变化
    "editDatas.goodsDetailParam":{
      handler(newVal, oldVal) {
      if(newVal){
        for(let i=0;i<newVal.length;i++){
          if(Number(newVal[i].goodsCount)>=0&&Number(newVal[i].goodsPrice)>=0){
            newVal[i].totalPrice = (Number(newVal[i].goodsCount)*Number(newVal[i].goodsPrice)).toFixed(2); 
            
            newVal[i].tax = (newVal[i].goodsPrice/(1+(newVal[i].taxRate/100)) * (newVal[i].taxRate/100)).toFixed(2);
            newVal[i].notTaxPrice = (newVal[i].goodsPrice/(1+(newVal[i].taxRate/100))).toFixed(2);
          } 
       
        }
      }
    },
    deep: true
    }

  },
  methods: {
    //_编辑生成报价单
    _findInquiry() {},
    //获取登录信息中的销售代表
    getName(){
        var books=localStorage.getItem("user");//得到字符串
        var obj=JSON.parse(books);
        console.log(obj);  
        this.form.salesRepresentatives=  obj.data.sysuserName;
        
    },
    //关闭页面
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
    //搜索商品
    goodsSearch(){
      this._getGoods()
    },
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
    editOrder(){

      for(let i =0;i<this.editDatas.goodsDetailParam.length;i++){
          this.editDatas.goodsDetailParam[i].productRequire = this.editDatas.goodsDetailParam[i].productionRequire
      }
      
    
      
          if(
            !this.editDatas.customerName ||
            !this.editDatas.phone ||
            !this.editDatas.projectName ||
            !this.editDatas.department ||
            !this.editDatas.customerContact  ||
            !this.editDatas.invoiceType
          ) {
            throttleTipPop(this, "warning", "请填写带*号的选项", 2000);
          }else{
              editOrders(this.editDatas).then(res=>{
            
            if (res.code === 200) {
              throttleTipPop(this, "success", "修改销售订单成功", 2000);

              this.editVisible = false;
              this.$emit('editOrder1',this.editVisible)

            }
          })
          }
       
    },
    //编辑询价单
     editInquirys() {
     
    },
 
     //双击添加商品
   addClick1(row) {
      this.index = row.index;
      row["goodsSpecSize"] = row.skuList[this.index].goodsSpecValues;
      row["goodsUnit"] = row.unitName;
      row["goodsSkuId"] = row.skuList[this.index].skuId;
      row["rows"] = row.skuList[this.index];
      row['goodsPrice'] = row.skuList[this.index].goodsPrice;
      row['notTaxPrice']=row.skuList[this.index].notTaxPrice;
      row['tax'] = row.skuList[this.index].taxation;
      row['taxRate'] = row.skuList[this.index].taxRate;
      //深度克隆
      let copy = JSON.parse(JSON.stringify(row));
      if(this.selectData1.length>=1){
            //遍历判断是否存在相同规格的商品在列表
            for(let i= 0 ;i<this.selectData1.length;i++){
              if(this.selectData1[i].goodsSkuId == copy.goodsSkuId){
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
        v["sordId"]='';
        v["orderId"]=this.editDatas.orderId
        v["goodsDesc"]='';
        v['goodsSn']=row.goodsSn
        v['goodsImgUrl']=row.skuList[this.index].goodsImgUrl
        v['goodsSpecSize']=row.skuList[this.index].goodsSpecValues

       

        v["totalPrice"]='';
        v["material"]='';
        v['technology']=''
        v['productUrl']=''
        v['remark']=''
        v['saleOrderNo']=this.editDatas.saleOrderNo
        ;
        v['totalAmount']='';
        v['goodsSampleNumber']='';
        v['goodsSampleTime']='';
        v["goodsId"]=row.goodsId;
        v["goodsCount"] = "1";
        v["productionRequire"] = "";
        v["deliveryAddres"] = "";
        v["transportMode"] = "";
        v["deliveryCycle"] = "";
        v['goodsImgUrl']=row.skuList[this.index].thumbnailImgUrl;
        v['fileDesignDraftUrl'] = '';
     
      });
      let copy1 = JSON.parse(JSON.stringify(arr));
      this.selectData1 = copy1;
      console.log(this.selectData1);
      
    },
    //双击删除商品
    deleteRow1(row) {
      for (var i = 0; i < this.selectData1.length; i++) {
        if (this.selectData1[i].goodsSkuId == row.goodsSkuId) {
          this.selectData1.splice(i, 1);
          console.log(i);
        }
      }
    },
    //选择规格
     Clicktent(val, data) {
      data.index = val;
      console.log(this.$refs.elTable);
      this.$set(this.$refs.elTable.data);
      this.$forceUpdate();
    },
    editOreder(){

    },
    //双击添加客户
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
      this.editDatas.distAddress =
        this.customerData[0] && this.customerData[0].customerAddress;
      this.editDatas.department =
        this.customerData[0] && this.customerData[0].commonContactDept;
      this.editDatas.email =
        this.customerData[0] && this.customerData[0].commonContactEmail;
      this.customerVisible1 = false;
    },
    //保存商品
    saveGoods1() {
      if(this.editDatas.goodsDetailParam.length>=1){
            //遍历判断是否存在相同规格的商品在列表
            var arr =[]
            //如果等于长度就会多出一次循环，就会报错
            for(let i= 0 ;i<this.editDatas.goodsDetailParam.length;i++){
              for(let j= 0 ;j<this.selectData1.length;j++){
                if(this.editDatas.goodsDetailParam[i]&&this.editDatas.goodsDetailParam[i].goodsSkuId == this.selectData1[j].goodsSkuId){
                    throttleTipPop(this, "error", "已经存在相同规格的商品，不能重复添加！", 2000);
                    return false
                }
              } 
        }
       arr= this.editDatas.goodsDetailParam.concat(this.selectData1);  
      }else if(this.editDatas.goodsDetailParam.length<=0){
         arr= this.editDatas.goodsDetailParam.concat(this.selectData1);  
      } 
      this.innerVisible1 = false;
      this.selectData1 = [];

      var copy = JSON.parse(JSON.stringify(arr));

      this.editDatas.goodsDetailParam = copy;

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
          that.editDatas.goodsDetailParam.forEach(function (itemI, indexI) {
            // 如果选中数据跟元数据某一条标识相等，删除对应的源数据
            if (item.goodsSkuId === itemI.goodsSkuId) {
              that.editDatas.goodsDetailParam.splice(indexI, 1)
            }
          })
        })
        
      }
      // 清除选中状态
      this.$refs.elTable1.clearSelection()
       
    
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
            this.$message.success('上传设计稿成功！')
            this.editDatas.goodsDetailParam[this.upLoadIndex].fileDesignDraftUrl = file.data.domain + file.data.filePath; 
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
    chooseCustomer1() {
      this.customerVisible1 = true;
      this._getAllcustomer();
    },
     customerSearch1() {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.editOrder {
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
}
.el-input-group__append button.el-button {
  width:50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
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
      top:10px;
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
  .blue{
        cursor: pointer;
        color: #4A99FA;
      }
</style>