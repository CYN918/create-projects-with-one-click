<template>
  <div class="createOrder">
    <el-dialog :visible.sync="editVisible" width="70%" :before-close="createClosing">
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
                          <span>{{this.inquiryNo1}}</span>
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
                          <el-input v-model="editDatas.saleUserName"></el-input>
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
                <el-table-column label="数量" align="center">
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
                    <el-input
                      v-model="scope.row.productRequire"
                      size="small"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 3}"
                      resize="none"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="运输方式" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.transportMode"
                      size="small"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 3}"
                      resize="none"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column label="配送地址" align="center" width="200">
                  <template slot-scope="scope">
                    <el-input
                      v-model="scope.row.distAddress"
                      size="small"
                      type="textarea"
                      :autosize="{ minRows: 1, maxRows: 3}"
                      resize="none"
                    ></el-input>
                  </template>
                </el-table-column>
                <el-table-column align="center" width="200">
                  <template slot="header">
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
              <!--  <div class="pagination">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="tableData.currentPage"
                    :page-sizes="tableData.sizes"
                    :page-size="tableData.size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.total"
                  ></el-pagination>
              </div>-->
            </div>
          </div>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="createClose" size="small">关 闭</el-button>
        <el-button type="primary" @click="editInquirys()" size="small">保存</el-button>
      </span>
    </el-dialog>
    <!-- 编辑客户询价添加商品弹窗 -->
    <el-dialog width="60%" :visible.sync="innerVisible1" :modal="true" :append-to-body="false">
      <!-- 编辑客户询价添加商品选择品牌弹窗 -->
      <!-- <el-dialog
            width="50%"
            title="选择品牌"
            :visible.sync="brandVisible1"
            :modal="false"
            :append-to-body="false"
          >
            <div class="mail-fitter">
              <el-form ref="infoForm" :model="form"  label-width="100px">
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
              <el-button type="danger" @click="brandVisible1 =false" size="small">关 闭</el-button>
              <el-button type="primary" @click="brandVisible1 =false" size="small">保存</el-button>
            </span>
      </el-dialog>-->
      <div class="mail-fitter">
        <el-form ref="infoForm" :model="form" label-width="100px" size="small">
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
                        <el-button type="primary" size="small" @click="jump">进入商品页面或编辑商品</el-button>
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
              >
                <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
                <el-table-column label="商品图片" align="center" width="120">
                  <template slot-scope="scope">
                    <div class="image" v-if="scope.row.skuList[scope.row.index].thumbnailImgUrl">
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
                    <div style="height: 180px;overflow: auto;">
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
                <el-table-column label="税率" align="center">
                  <template
                    slot-scope="scope"
                  >{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].taxRate}}%</template>
                </el-table-column>
                <el-table-column label="商城价格" align="center" width="180">
                  <template slot-scope="scope">
                    <div style="height: 180px;overflow: auto;">
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
                      <div class="txt_left">对外ppt价格：{{scope.row.pptPrice}}</div>
                      <div class="txt_left">对外最低价格:{{scope.row.minimumPrice}}</div>
                      <div class="txt_left">对我司的特惠价:{{scope.row.preferentialPrice}}</div>
                    </div>
                  </template>
                </el-table-column>

                <el-table-column label="集采/批发价" align="center" width="150">
                  <template slot-scope="scope">
                    <div style="height: 180px;overflow: auto;">
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
                    <div class="image" v-if="scope.row.skuList[scope.row.index].thumbnailImgUrl">
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
                    <div style="height: 180px;overflow: auto;">
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
                <el-table-column label="税率" align="center">
                  <template
                    slot-scope="scope"
                  >{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].taxRate}}%</template>
                </el-table-column>
                <el-table-column label="商城价格" align="center" width="180">
                  <template slot-scope="scope">
                    <div style="height: 180px;overflow: auto;">
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
                      <div class="txt_left">对外ppt价格：{{scope.row.pptPrice}}</div>
                      <div class="txt_left">对外最低价格:{{scope.row.minimumPrice}}</div>
                      <div class="txt_left">对我司的特惠价:{{scope.row.preferentialPrice}}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="集采/批发价" align="center" width="150">
                  <template slot-scope="scope">
                    <div style="height: 180px;overflow: auto;">
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
    <el-dialog width="60%" :visible.sync="customerVisible1" :modal="true" :append-to-body="false">
      <div class="mail-fitter">
        <el-form ref="infoForm" :model="form" label-width="100px" size="small">
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
                      </el-col>-->
                      <el-col :span="10">
                        <el-form-item label="关键词:" prop="keywords">
                          <el-col :span="16">
                            <el-input
                              v-model="customerDatas.keywords"
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
              <el-table :data="list" border style="width: 100%" stripe @row-dblclick="addCustomer1">
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
                  @size-change="customerhandleSizeChange"
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
  editInquiry
} from "@/api/sale/index";
import { deleteGoods, getErpGoods } from "@/api/product/index";
import { getAllcustomer } from "@/api/customer";
import { throttleTipPop } from "@/utils/functions.js";
export default {
  data() {
    //校验手机号码
    var checkMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号码不能为空"));
      }
      if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("请输入正确的手机号码"));
      } else {
        callback();
      }
    };
    //校验邮箱号码
    var checkEmail = (rule, value, callback) => {
      if (/(^[_\W])|([_\W]$)/.test(value)) {
        return callback(new Error("邮箱不能以特殊字符开头或结尾!"));
      }

      if (
        !/^([-_a-zA-Z0-9\u4e00-\u9fa5\.])+@([-_a-zA-Z0-9])+(\.[a-zA-Z]{2,5}){1,3}$/.test(
          value
        )
      ) {
        callback(new Error("请输入正确的邮箱号码"));
      } else {
        callback();
      }
    };
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
      brandVisible1: false, //编辑询价单新增商品品牌弹窗\
      toInquiryId: "", //转交采销需要的ID
      toInquiryNo: "", //转交采销需要的单号
      orderNumber: "", //销售单号
      deposit: "", //定金
      inquiryNo1: "", //询价单号
      timer1: "", //计时器
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
        offerPhone: "", //报价联系电话
        offerEmail: "" //报价邮箱
      },
      formData: {
        current_page: 1,
        page_size: 2,
        total_count: 0,
        goodsName1: "" //
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
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],
        offerEndTime: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          {
            required: true,
            validator: checkMobile,
            trigger: ["blur", "change"]
          }
        ],
        email: [
          {
            required: false,
            validator: checkEmail,
            trigger: ["blur", "change"]
          }
        ],
        customerName: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],
        projectName: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],
        department: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],
        offerDepartment: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],
        offerContact: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],
        offerPhone: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],
        dealDate: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],
        invoiceType: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  props: ["editVisibles", "editDatasA", "inquiryNo"],
  created() {
    this._getGoods();
  },
  watch: {
    editVisibles(val) {
      this.editVisible = val;
    },
    editDatasA(val) {
      this.editDatas = val;
    },
    inquiryNo(val) {
      this.inquiryNo1 = val;
    },
    "editDatas.goodsDetailEditVo": {
      handler(val) {
        if(val){
            clearTimeout(this.timer1);
            this.timer1 = setTimeout(() => {
              this.getBudget(val);
              this.getBudgetAmount(val);
              this.compareSizes(val);
            },1500)
        }
      },
      deep: true
    }
  },
  methods: {
    // 监听客户预算，和成本预算
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
    //关闭页面
    createClose() {
      this.$confirm("您确认要关闭吗？")
        .then(_ => {
          this.editVisible = false;
          this.$emit("createClose1", this.editVisible);
        })
        .catch(_ => {});
    },
    createClosing() {
      this.$confirm("您确认要关闭吗？")
        .then(_ => {
          this.editVisible = false;
          this.$emit("createClosing1", this.editVisible);
        })
        .catch(_ => {});
    },
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
    //搜索商品
    goodsSearch() {
      this._getGoods();
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
    //编辑询价单
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
        obj.taxRate = this.editDatas.goodsDetailEditVo[i].taxRate;
        obj.transportMode = this.editDatas.goodsDetailEditVo[i].transportMode;
        obj.invoiceTaxRate = this.editDatas.goodsDetailEditVo[i].invoiceTaxRate;
        obj.tmallPrice = this.editDatas.goodsDetailEditVo[i].tmallPrice; //天猫价格
        obj.jdPrice = this.editDatas.goodsDetailEditVo[i].jdPrice; //京东价格
        obj.marketPrice = this.editDatas.goodsDetailEditVo[i].marketPrice; //商城价格
        obj.minVolumePrice = this.editDatas.goodsDetailEditVo[i].minimumPrice; //对外最低价格

        arrss.push(obj);
        this.editDatas["arrss"] = arrss;
      }
      console.log(this.editDatas);
      if (
        !this.editDatas.customerName ||
        !this.editDatas.phone ||
        !this.editDatas.customerContact ||
        !this.editDatas.projectName ||
        !this.editDatas.offerEndTime ||
        !this.editDatas.department ||
        this.editDatas.invoiceType === ""
      ) {
        throttleTipPop(this, "warning", "请填写带*号的填项", 2000);
      } else {
        editInquiry(this.editDatas).then(res => {
          if (res.code === 200) {
            throttleTipPop(this, "success", "修改询价单成功", 2000);
            this.editVisible = false;
            this.$emit("editInquiry1", this.editVisible);
          }
        });
      }
    },

    //双击添加商品
    addClick1(row) {
      this.index = row.index;
      row["goodsSpecSize"] = row.skuList[this.index].goodsSpecValues;
      row["goodsUnit"] = row.unitName;
      row["goodsSkuId"] = row.skuList[this.index].skuId;
      row["rows"] = row.skuList[this.index];
      row["tmallPrice"] = row.skuList[this.index].tmallPrice;
      row["jdPrice"] = row.skuList[this.index].jdPrice;
      row["marketPrice"] = row.skuList[this.index].marketPrice;
      row["minVolumePrice"] = row.minimumPrice;
      row["goodsImgUrl"] = row.skuList[this.index].thumbnailImgUrl;
      //深度克隆
      //深度克隆
      let copy = JSON.parse(JSON.stringify(row));
      if (this.selectData1.length >= 1) {
        //遍历判断是否存在相同规格的商品在列表
        for (let i = 0; i < this.selectData1.length; i++) {
          if (this.selectData1[i].goodsSkuId == copy.goodsSkuId) {
            throttleTipPop(
              this,
              "error",
              "已经存在相同规格的商品，不能重复添加！",
              2000
            );
            return false;
          }
        }
        this.selectData1.push(copy);
      } else if (this.selectData1.length <= 0) {
        this.selectData1.push(copy);
      }
      let arr = this.selectData1;
      arr.forEach(v => {
        v["goodsColor"] = "";
        v["goodsCount"] = "1";
        v["budgetAmount"] = "";
        v["productRequire"] = "";
        v["distAddress"] = "";
        v["transportMode"] = "";
        v["deliveryCycle"] = "";
        v["sigId"] = "";
      });
      var copy1 = JSON.parse(JSON.stringify(arr));
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
    //双击添加客户
    addCustomer1(row) {
      var copy = JSON.parse(JSON.stringify(row));
      this.customerData.splice(0, 1, copy);
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
      if (this.editDatas.goodsDetailEditVo.length >= 1) {
        //遍历判断是否存在相同规格的商品在列表
        var arr = [];
        //如果等于长度就会多出一次循环，就会报错
        for (let i = 0; i < this.editDatas.goodsDetailEditVo.length; i++) {
          for (let j = 0; j < this.selectData1.length; j++) {
            if (
              this.editDatas.goodsDetailEditVo[i] &&
              this.editDatas.goodsDetailEditVo[i].goodsSkuId ==
                this.selectData1[j].goodsSkuId
            ) {
              throttleTipPop(
                this,
                "error",
                "已经存在相同规格的商品，不能重复添加！",
                2000
              );
              return false;
            }
          }
        }
        arr = this.editDatas.goodsDetailEditVo.concat(this.selectData1);
      } else if (this.editDatas.goodsDetailEditVo.length <= 0) {
        arr = this.editDatas.goodsDetailEditVo.concat(this.selectData1);
      }
      this.innerVisible1 = false;
      this.selectData1 = [];

      var copy1 = JSON.parse(JSON.stringify(arr));

      this.editDatas.goodsDetailEditVo = copy1;

      console.log(this.editDatas.goodsDetailEditVo);
    },
    //跳转
    jump() {
      let routeData = this.$router.resolve({
        name: "ProductList"
      });
      window.open(routeData.href, "_blank");
    },
    //跳到客户页面
    toCustomer() {
      let routeData = this.$router.resolve({
        name: "Data"
      });
      window.open(routeData.href, "_blank");
    },
    //选择删除编辑中的商品
    deleteGoods1() {
      var that = this;
      // 拿到选中的数据；
      var val = this.elTable;
      // 如果选中数据存在
      if (val) {
        // 将选中数据遍历
        val.forEach(function(item, index) {
          // 遍历源数据
          that.editDatas.goodsDetailEditVo.forEach(function(itemI, indexI) {
            // 如果选中数据跟元数据某一条标识相等，删除对应的源数据
            if (item.goodsSkuId === itemI.goodsSkuId) {
              that.editDatas.goodsDetailEditVo.splice(indexI, 1);
            }
          });
        });
        // 清除选中状态
      this.$refs.elTable1.clearSelection()
      }
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
    customerhandleSizeChange(val) {
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

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.createOffer {
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
  width: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
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
/deep/ .el-dialog__headerbtn {
  top: 10px;
}
</style>