<template>
  <div class="img_sizeload">
    <!-- 申请售后 -->
    <el-dialog title :visible.sync="dialogVisible" width="1200px" :before-close="handleClose" class="big_dialog">
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="150px"
          class="demo-ruleForm"
        >
          <div class="mcard sales_div">
            <div>
              <div class="goods-fitter">
                <div class="search-wrapper1">
                  <h4 class="title">售后申请</h4>
                </div>
              </div>
            </div>
          </div>
          <div class="mcard sales_div">
            <div class="content_color">
              <div class="goods-fitter">
                <div class="search-wrapper1">
                  <h4 class="title">客户信息</h4>
                  <div class="row_div">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="客户名称：" prop="customerName">
                          <el-input v-model="ruleForm.customerName" size="small" readonly></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="平台名称：" prop="platform">
                          <el-input v-model="ruleForm.projectName" size="small" readonly></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="服务商：" prop="providers">
                          <el-input v-model="ruleForm.agencyName" size="small" readonly></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="销售员：" prop="salesman">
                          <el-input v-model="ruleForm.salesMan" size="small" readonly></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="订单号：" prop="orderSn">
                          <el-input
                            v-model="ruleForm.orderSn"
                            size="small"
                            placeholder="请输入订单号，调出对应信息~"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="购买账号：" prop="userAccount">
                          <el-input v-model="ruleForm.userAccount" size="small"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="客诉联系人：" prop="applierName">
                          <el-input v-model="ruleForm.applierName" size="small"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="联系电话：" prop="applierPhone">
                          <el-input
                            @focus="shopfunc"
                            auto-complete="new-password"
                            v-model="ruleForm.applierPhone"
                            size="small"
                            placeholder="请输入手机号码及联系电话，调出客诉订单~"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <div class="hidden_div" v-show="showhidden">
                      <div class="triangle">
                        <img src="@/common/images/order/triangle.png" alt />
                      </div>
                      <el-table
                        :data="tableData"
                        stripe
                        border
                        style="width: 100%"
                        @cell-click="clicktd"
                      >
                        <el-table-column align="center" prop="goodsName" label="产品名称"></el-table-column>
                        <el-table-column align="center" prop="brandName" label="品牌"></el-table-column>
                        <el-table-column align="center" prop="modelNumber" label="型号"></el-table-column>
                        <el-table-column align="center" prop="quantity" label="数量"></el-table-column>
                        <el-table-column align="center" prop="purchaseTime" label="购买时间"></el-table-column>
                        <el-table-column align="center" prop="orderSn" label="订单号"></el-table-column>
                      </el-table>
                    </div>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="收货地址：" prop="Shippingaddress">
                          <el-col :span="6">
                            <el-form-item prop="provinceId">
                              <el-select
                                size="small"
                                v-model="ruleForm.province"
                                @change="provincefunc"
                                placeholder="请选择省"
                                style="max-width:120px"
                              >
                                <el-option
                                  v-for="item in addressArr"
                                  :key="item.regionName"
                                  :label="item.regionName"
                                  :value="item.regionName"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item prop="cityId">
                              <el-select
                                size="small"
                                @change="cityfunc"
                                v-model="ruleForm.city"
                                placeholder="请选择市"
                                style="max-width:120px"
                              >
                                <el-option
                                  v-for="item in cityArr"
                                  :key="item.regionName"
                                  :label="item.regionName"
                                  :value="item.regionName"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item prop="districtId">
                              <el-select
                                size="small"
                                v-model="ruleForm.district"
                                placeholder="请选择区"
                                @change="districtfunc"
                                style="max-width:120px"
                              >
                                <el-option
                                  v-for="item in districtArr"
                                  :key="item.regionName"
                                  :label="item.regionName"
                                  :value="item.regionName"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item prop="townId">
                              <el-select
                                size="small"
                                v-model="ruleForm.town"
                                placeholder="请选择街道"
                                style="max-width:120px"
                                @change="townfunc"
                              >
                                <el-option
                                  v-for="item in townIdArr"
                                  :key="item.regionName"
                                  :label="item.regionName"
                                  :value="item.regionName"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="街 道：" prop="town">
                          <el-input v-model="ruleForm.applierAddress" size="small"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="sales_div number_of">
            <span class="checked_span checked_shop">商品列表</span>
            <el-button type="primary" size="small" class="batch_btn" @click="batch">批量操作</el-button>
          </div>
          <div class="mcard sales_div top_nono">
            <div class="content_color">
              <div class="goods-fitter">
                <div class="search-wrapper1">
                  <div class="table_div">
                    <el-table
                      :data="ruleForm.afterSaleGoodsVos"
                      stripe
                      border
                      style="width: 100%"
                      @select="checkdata"
                      @select-all="checkdata"
                    >
                      <el-table-column
                        prop="date"
                        label="选择"
                        align="center"
                        width="60"
                        type="selection"
                      ></el-table-column>
                      <el-table-column prop="name" label="图样" align="center" width="150">
                        <template slot-scope="scope">
                          <img :src="scope.row.thumbnailImgUrl" alt class="imgsize" />
                        </template>
                      </el-table-column>
                      <el-table-column align="center" prop="address" label="商品信息" width="220">
                        <template slot-scope="scope">
                          <div class="tent_left">产品名称：{{scope.row.goodsName}}</div>
                          <div class="tent_left">货号：{{scope.row.goodsSn}}</div>
                          <div class="tent_left">型号：{{scope.row.modelNumber}}</div>
                          <div class="tent_left">SKU：{{scope.row.skuId}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" prop="goodsAttr" label="规格尺寸" width="140"></el-table-column>
                      <el-table-column align="center" prop="saleQuantity" label="数量" width="70"></el-table-column>
                      <el-table-column align="center" prop="specialPrice" label="结算价" width="70"></el-table-column>
                      <el-table-column align="center" prop="totalAmount" label="合计" width="80"></el-table-column>
                      <el-table-column align="center" prop="address" label="物流信息" width="150">
                        <template slot-scope="scope">
                          <div class="tent_left">快递公司：{{scope.row.shippingId}}</div>
                          <div class="tent_left">快递单号：{{scope.row.logisticsNo}}</div>
                          <div class="tent_left">地址：</div>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" prop="address" label="操作">
                        <template slot-scope="scope">
                          <el-select
                            v-model="scope.row.returnType"
                            placeholder="请选择"
                            style="width:100%"
                            size="small"
                            @change="afterdescribing(scope.row)"
                          >
                            <el-option
                              v-for="item in requirementsArr"
                              :key="item.value"
                              :label="item.name"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="sales_div number_of">
              <span
                @click="checknum = index"
                v-for="(item,index) in CommodityArr"
                :key="index"
                :class="index===checknum?'checked_span':''"
              >商品{{index+1}}</span>
            </div>
          </div>
          <div class="mcard border_btom" v-if="CommodityArr.length">
            <div class="content_color">
              <div class="goods-fitter">
                <div class="search-wrapper1">
                  <div class="row_div">
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="商品名称：" prop="goodsName">
                          <el-input v-model="CommodityArr[checknum].goodsName" disabled size="small"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="本次客诉数量：" prop="complainQuantity">
                          <el-input v-model="CommodityArr[checknum].complainQuantity" size="small"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="售后要求：" prop="returnType">
                          <el-select
                            v-model="CommodityArr[checknum].returnType"
                            placeholder="请选择"
                            style="width:100%"
                            size="small"
                            @change="afterfunc"
                          >
                            <el-option
                              v-for="item in requirementsArr"
                              :key="item.value"
                              :label="item.name"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="SKU：" prop="goodsAttr">
                          <el-input v-model="CommodityArr[checknum].goodsAttr" disabled size="small"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="处理截止时间：">
                          <el-date-picker
                            size="medium"
                            :picker-options="pickerOptions0"
                            v-model="CommodityArr[checknum].deadlineTime"
                            type="date"
                            valueFormat="yyyy-MM-dd HH:mm:ss"
                            placeholder="选择日期"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="责任人：">
                          <el-select
                            v-model="ruleForm.responsible"
                            placeholder="请选择"
                            style="width:100%"
                            size="small"
                          >
                            <el-option label="快递公司" value="1"></el-option>
                            <el-option label="客户收件人" value="2"></el-option>
                            <el-option label="供应商" value="3"></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- 退货/换货/退款　 -->
                    <div
                      class="mar_top"
                      v-if="CommodityArr[checknum].returnType == 0 || CommodityArr[checknum].returnType== 2"
                    >
                      <!-- <el-row>
                        <el-col :span="12">
                          <el-form-item label="退货物流公司：" prop="logisticsCompany">
                            <el-select
                              v-model="ruleForm.logisticsCompany"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option label="是" value="1"></el-option>
                              <el-option label="否" value="2"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="退货物流单号：" prop="logisticSingle">
                            <el-input v-model="ruleForm.logisticSingle" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>-->
                      <el-row>
                        <el-col :span="12" v-if="CommodityArr[checknum].returnType != 2">
                          <el-form-item label="退款金额：">
                            <el-input
                              v-model="CommodityArr[checknum].compensateAmount"
                              size="small"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="处理要求：">
                            <el-select
                              v-model="CommodityArr[checknum].customerRequire"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option
                                v-for="item in processingArr"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="售后理由：">
                            <el-select
                              v-model="CommodityArr[checknum].afterReason"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option
                                v-for="item in dealreason"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <!-- <el-row>
                        <el-col :span="12">
                          <el-form-item
                            label="供应商联系人："
                            prop="describe"
                          >
                            <el-input v-model="ruleForm.compensateAmount" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="供应商联系电话：" prop="describe">
                            <el-input v-model="CommodityArr[checknum].supplierPhone" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item
                            label="供应商退货地址："
                            prop="describe"
                          >
                            <el-input v-model="CommodityArr[checknum].supplierReAddress" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>-->
                    </div>
                    <!-- 维修 -->
                    <div class="mar_top" v-if="CommodityArr[checknum].returnType== 1">
                      <!-- <el-row>
                        <el-col :span="12">
                          <el-form-item label="退货物流公司：" prop="logisticsCompany">
                            <el-select
                              v-model="ruleForm.logisticsCompany"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option label="是" value="1"></el-option>
                              <el-option label="否" value="2"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="退货物流单号：" prop="logisticSingle">
                            <el-input v-model="ruleForm.logisticSingle" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>-->
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="快递费用：">
                            <el-input v-model="CommodityArr[checknum].logisticPrice" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="维修费用：">
                            <el-input v-model="CommodityArr[checknum].maintenance" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="处理要求：">
                            <el-select
                              v-model="CommodityArr[checknum].customerRequire"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option
                                v-for="item in processingArr"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="售后理由：">
                            <el-select
                              v-model="CommodityArr[checknum].afterReason"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option
                                v-for="item in dealreason"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <!-- 破损补寄 -->
                    <div class="mar_top" v-if="CommodityArr[checknum].returnType== 3">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="处理要求：">
                            <el-select
                              v-model="CommodityArr[checknum].customerRequire"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option
                                v-for="item in processingArr"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="补寄商品：">
                            <el-input v-model="ruleForm.mailItems" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <!-- <el-row>
                        <el-col :span="12">
                          <el-form-item label="退货物流公司：" prop="logisticsCompany">
                            <el-select
                              v-model="ruleForm.logisticsCompany"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option label="是" value="1"></el-option>
                              <el-option label="否" value="2"></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="退货物流单号：" prop="logisticSingle">
                            <el-input v-model="ruleForm.logisticSingle" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>-->
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="补寄商品价值：">
                            <el-input v-model="ruleForm.replacementValue" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="售后理由：">
                            <el-select
                              v-model="CommodityArr[checknum].afterReason"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option
                                v-for="item in dealreason"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <!-- 丢件补寄 -->
                    <div class="mar_top" v-if="CommodityArr[checknum].returnType== 4">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="处理要求：">
                            <el-select
                              v-model="CommodityArr[checknum].customerRequire"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option
                                v-for="item in processingArr"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="补寄商品：">
                            <el-input v-model="ruleForm.mailItems" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="补寄商品价值：">
                            <el-input v-model="ruleForm.replacementValue" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="售后理由：">
                            <el-select
                              v-model="CommodityArr[checknum].afterReason"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option
                                v-for="item in dealreason"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <!-- 配件补寄 -->
                    <div class="mar_top" v-if="CommodityArr[checknum].returnType== 5">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="处理要求：">
                            <el-select
                              v-model="CommodityArr[checknum].customerRequire"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option
                                v-for="item in processingArr"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="配件名称：">
                            <el-input v-model="CommodityArr[checknum].goodsNameReturn" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="快递费用：">
                            <el-input v-model="CommodityArr[checknum].logisticPrice" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="售后理由：">
                            <el-select
                              v-model="CommodityArr[checknum].afterReason"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option
                                v-for="item in dealreason"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <!-- 补偿费用 -->
                    <div class="mar_top" v-if="CommodityArr[checknum].returnType== 6">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="开户行：">
                            <el-input v-model="CommodityArr[checknum].openingBrank" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="收款人姓名：">
                            <el-input v-model="CommodityArr[checknum].payee" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="金额：">
                            <el-input
                              @change="costfunc"
                              v-model="CommodityArr[checknum].compensateAmount"
                              size="small"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="账户：">
                            <el-input v-model="CommodityArr[checknum].brankAccount" size="small"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="售后理由：">
                            <el-select
                              v-model="CommodityArr[checknum].afterReason"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                            >
                              <el-option
                                v-for="item in dealreason"
                                :key="item.name"
                                :label="item.name"
                                :value="item.name"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                    <el-row>
                      <el-col :span="24">
                        <el-form-item label="故障描述：" prop="describe">
                          <el-input
                            v-model="CommodityArr[checknum].questionDesc"
                            type="textarea"
                            size="small"
                            :rows="3"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="推送处理人：" prop="pushAdopt">
                          <el-input v-model="ruleForm.pusher" readonly size="small"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="供应商：" prop="supplierName">
                          <el-input v-model="ruleForm.supplierName" readonly size="small"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="推送提醒：" prop="remind">
                          <el-input
                            v-model="ruleForm.agencyName"
                            size="small"
                            readonly
                            placeholder="服务商："
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="客户平台：" prop="projectName">
                          <el-input v-model="ruleForm.projectName" size="small" readonly></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="客服人员：" prop="customerService">
                          <el-input
                            v-model="ruleForm.waiter"
                            size="small"
                            readonly
                            placeholder="黄某某："
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="客诉提交人员：" prop="submitter">
                          <el-input
                            v-model="ruleForm.creater"
                            size="small"
                            readonly
                            placeholder="黄某某："
                          ></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handleClose" size="small">取 消</el-button>
        <el-button type="primary" @click="handleClosetrue" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 申请售后 -->

    <div class="afteroperation">
      <el-dialog
        title="售后描述"
        :visible.sync="centerDialogVisible"
        width="600px"
        :before-close="canceldescribe"
      >
        <div class="describe_yzsh">
          <el-form :model="eldiog" ref="describe" label-width="100px">
            <el-form-item label="售后要求：" prop="returnType"   v-if="!selectionArr.length">
              <el-select
              @change="seleType"
                v-model="staging.returnType"
                placeholder="请选择"
                style="width:100%"
                size="small"
                :disabled="!selectionArr.length"
              >
                <el-option
                  v-for="item in requirementsArr"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="售后要求：" prop="returnType" ref="returnType2" 
            :rules="[
                  { required: true, message: '售后数量不能为空', trigger: 'change'},
                ]" v-if="selectionArr.length">
              <el-select
              @change="seleType"
                v-model="eldiog.returnType"
                placeholder="请选择"
                style="width:100%"
                size="small"
                :disabled="!selectionArr.length"
              >
                <el-option
                  v-for="item in requirementsArr"
                  :key="item.value"
                  :label="item.name"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="!selectionArr.length"
              label="售后数量："
              prop="afternumber"
              :rules="[
                  { required: true, message: '售后数量不能为空', trigger: 'blur'},
                ]"
            >
              <el-input v-model="eldiog.afternumber"></el-input>
            </el-form-item>
            <el-form-item
              label="故障描述："
              prop="Faulttent"
              :rules="[
                  { required: true, message: '故障描述不能为空', trigger: 'blur'},
                ]"
            >
              <el-input v-model="eldiog.Faulttent" type="textarea"></el-input>
            </el-form-item>
            <el-form-item label="上传图片：">
              <el-upload
                :limit="10"
                accept=".jpg,.png,.gif,.JPG,.JPEG,.PBG,.GIF,"
                :action="action"
                list-type="picture-card"
                :on-success="handleAvatarSuccess"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisiblea">
                <img width="100%" :src="eldiog.thumbnailImgUrl" alt class="img_sizeload" />
              </el-dialog>
            </el-form-item>
          </el-form>
          <div class="el_tip" v-if="selectionArr.length">提示：默认所勾选商品的所有数量申请此售后；如需不同的售后服务或者想申请的只是该商品的部分数量，请不要使用批量操作！</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="canceldescribe" size="small">取 消</el-button>
          <el-button type="primary" @click="determine" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { getprovince, getcity } from "@/api/customer/index";
import { throttleTipPop } from "@/utils/throttle";
import {
  findorderdetail,
  findorderlist,
  saveaftersaleb,
  findpusher
} from "@/api/order/index";
export default {
  props: {
    dialog: {},
    passdata: {}
  },
  data() {
    var validateaddress = (rule, value, callback) => {
      callback();
    };
    var applierPhone = (rule, value, callback) => {
      if (value != "") {
        // this.showhidden = false;
        callback();
      } else {
        // this.showhidden = false;
        return callback(new Error("请输入电话号码"));
      }
    };
    var orderSna = (rule, value, callback) => {
      if (this.ruleForm.orderSn != "") {
        callback();
      } else {
        return callback(new Error("请输入订单号"));
      }
    };
    var describe = (rule, value, callback) => {
      callback();
    };
    var describe1 = (rule, value, callback) => {
      console.log(value);
      // callback();
    };
    var deadlineTimer = (rule, value, callback) => {
      callback();
    };
    var returnGoods1 = (rule, value, callback) => {
      callback();
    };
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        }
      },
      eldiog: {
        describetent: "", //描述内容
        afternumber: "", // 售后数量
        Faulttent: "", //故障描述
        thumbnailImgUrl: [], // 上传图片
        picUrls: [],
        returnType:''
      },
      showstate:true, //判断是否通过验证
      checknum: 0,
      staging: {},
      datatable: {},
      tableData: [], //商品列表
      imageUrl: "",
      dialogVisiblea: false,
      centerDialogVisible: false, //操作弹窗
      action: "",
      dialogVisible: false,
      showhidden: false,
      show: true, // 控制是否退货的禁用,
      addressArr: [], //省级下拉
      selectionArr: [], // 批量操作
      cityArr: [],
      districtArr: [],
      CommodityArr: [],
      townIdArr: [],
      afterSaleComplainParam: [{}],
      ruleForm: {
        orderSn: "",
        customerName: "", //客户名称
        platform: "", //平台名称
        providers: "", //服务商
        salesman: "", //销售员
        cityId: "", // 市
        province: "",
        cityName: "",
        district: "",
        townName: "",
        provinceId: "", //省
        districtId: "", // 区
        townId: "", // 街道
        product: "", //产品名称
        buyTime: "", //购买时间
        orderNumber: "", //订单号
        brandName: "", // 品牌名称
        productModel: "", // 产品型号
        SKU: "", // SKU
        ProductItemno: "", // 产品货号
        payment: "", // 支付方式
        warrantyLogo: "", // 保修标识
        purchaseQuantity: "", // 购买数量
        deliveredQuantity: "", // 已发货数量
        complaints: "", // 已客诉数量
        complaintsNow: "", // 本次客诉数量
        settlementPrice: "", // 商城结算价
        goodsValue: "", // 客诉商品价值
        distributionPrice: "", // 分销结算价
        distributionValue: "", // 客诉商品分销价值
        adoptPin: "", // 采销
        supplierName: "", // 供应商名称
        orderHandler: "", // 订单处理人
        supplierPhone: "", // 联系电话
        supplierAdress: "", // 地址
        supplierEmail: "", // 邮箱
        supplierCompany: "", // 发货快递公司
        courierFees: "", // 快递费
        courierNumber: "", // 快递单号
        supplyPrice: "", // 供货价（成本价）
        totalAmount: "", // 客诉合计金额
        requirements: 1, // 售后要求
        starTime: "", // 提出时间
        returnGoods: "1", //退货
        endTime: "", //处理截止时间
        responsible: "", //责任人
        logisticSingle: "", //退货物流单号
        bank: "", // 开户行
        namePayee: "", //收款人姓名
        amount: "", //金额
        account: "", // 账户
        describe: "", // 故障描述
        pushAdopt: "采销：XXX", //客诉推送人采销
        pushFinancial: "财务：XXX", //客诉推送人财务
        kssupplierName: "", //客诉供应商名称
        remind: "服务商：", //推送提醒
        clientPlatform: "", //客户平台
        customerService: "", //客服人员
        submitter: "", //客诉提交人员
        creater: "",
        kscourierFees: "", //客诉快递费
        logisticsCompany: "", //客诉物流公司
        commodityName: "", //换货商品名称
        processing: "", //处理要求
        mallPrice: "", //商城价
        maintenance: "", //维修费用
        accessoriesName: "", //配件名称
        mailItems: "", //补寄商品
        replacementValue: "" ///补寄商品价值
      },
      rules: {
        userAccount: [
          { required: true, message: "请填写购买账号", trigger: "blur" }
        ],
        returnType:[
          { required: true, validator: returnGoods1, trigger: "blur" }
        ],
        Shippingaddress: [
          { required: true, validator: validateaddress, trigger: "change" }
        ],
        provinceId: [
          { required: true, message: "请选择省", trigger: "change" }
        ],
        cityId: [{ required: true, message: "请选择市", trigger: "change" }],
        districtId: [
          { required: true, message: "请选择区", trigger: "change" }
        ],
        townId: [{ required: true, message: "请选择街道", trigger: "change" }],
        orderSn: [{ required: true, validator: orderSna, trigger: "blur" }],
        skuId: [{ required: true, message: "请填写SKU", trigger: "blur" }],
        salesman: [
          { required: false, message: "请填写销售员", trigger: "blur" }
        ],
        applierName: [
          { required: true, message: "请填写客诉联系人", trigger: "blur" }
        ],
        applierPhone: [
          { required: true, validator: applierPhone, trigger: "blur" }
        ],
        town: [{ required: true, message: "请填写联系地址", trigger: "blur" }],
        productName: [
          { required: true, message: "请填写产品名称", trigger: "blur" }
        ],
        complaintsNow: [
          { required: true, message: "请填写本次客诉数量", trigger: "blur" }
        ],
        returnGoods: [
          { required: true, validator: returnGoods1, trigger: "change" }
        ],
        deadlineTime: [
          { required: true, validator: deadlineTimer, trigger: "blur" }
        ],
        responsible: [
          { required: true, message: "请填写责任人", trigger: "blur" }
        ],
        bank: [{ required: true, message: "请填写开户行", trigger: "blur" }],
        namePayee: [
          { required: true, message: "请填写收款人姓名", trigger: "blur" }
        ],
        amount: [{ required: true, message: "请填写金额", trigger: "blur" }],
        account: [{ required: true, message: "请填写账户", trigger: "blur" }],
        describe: [{ required: true, validator: describe, trigger: "blur" }],
        describe1: [{ required: true, validator: describe1, trigger: "blur" }],
        requirements: [
          { required: true, message: "请选择售货要求", trigger: "change" }
        ],
        courierFees: [
          { required: true, message: "请填写快递费用", trigger: "blur" }
        ],
        logisticSingle: [
          { required: true, message: "请填写物流单号", trigger: "blur" }
        ],
        kscourierFees: [
          { required: true, message: "请填写快递费", trigger: "blur" }
        ],
        logisticsCompany: [
          { required: true, message: "请选择物流公司", trigger: "change" }
        ],
        commodityName: [
          { required: true, message: "请选择商品名称", trigger: "change" }
        ],
        processing: [
          { required: true, message: "请选择处理要求", trigger: "change" }
        ],
        mallPrice: [
          { required: true, message: "请填写商城价", trigger: "blur" }
        ],
        maintenance: [
          { required: true, message: "请填写维修费用", trigger: "blur" }
        ],
        accessoriesName: [
          { required: true, message: "请填写配件名称", trigger: "blur" }
        ]
      },
      requirementsArr: [
        { name: "退货/退款", value: 0 },
        { name: "维修", value: 1 },
        { name: "退货/换货", value: 2 },
        { name: "破损补寄", value: 3 },
        { name: "丢件补寄", value: 4 },
        { name: "补寄配件", value: 5 },
        { name: "补偿费用", value: 6 }
      ], // 售后数组
      dealreason:[
        {name:"7天无理由退换货"},
        {name:"退运费"},
        {name:"商品成分描述不符"},
        {name:"生产日期/保质期与商品描述不符"},
        {name:"图片/产地/批号/规格等描述不符"},
        {name:"无法溶解/结块/有异物"},
        {name:"商品变质/发霉/有异物"},
        {name:"少件(含 缺少配件)"},
        {name:"收到商品时有破损/污渍/变形"},
        {name:"假冒品牌"},
        {name:"未按约定时间发货"},
        {name:"发票问题"},
        {name:"卖家发错货"},
        {name:"预约不到/卖家不给兑换"},
      ],
      processingArr: [
        {
          name: "仓库先收到退回商品马上补寄",
          value: "仓库先收到退回商品马上补寄"
        },
        {
          name: "先快递一个新的给客户,再继续根据退货",
          value: "先快递一个新的给客户,再继续根据退货"
        },
        {
          name: "仓库收到退件退给供应商补寄到仓库后再补寄给客户",
          value: "仓库收到退件退给供应商补寄到仓库后再补寄给客户"
        },
        {
          name: "直接退回供应商并扣除商品货款",
          value: "直接退回供应商并扣除商品货款"
        },
        {
          name: "直接退给供应商后由供应商补寄",
          value: "直接退给供应商后由供应商补寄"
        },
        {
          name: "让供应商先补寄后,再退回不良商品",
          value: "让供应商先补寄后,再退回不良商品"
        },
        { name: "申请财务付款", value: "申请财务付款" }
      ] //处理要求数组
    };
  },
  methods: {
    checkdata(selection, row) {
      this.selectionArr = selection;
    },
    batch() {
      if(this.selectionArr.length){
        this.centerDialogVisible = true;
      }else{
        throttleTipPop(this,'error','请选择对应商品')
      }
    },
    async clicktd(row, column, cell, event) {
      this.datatable.orderSn = row.orderSn;
      let { data } = await findorderdetail(row.orderSn);
      this.$nextTick(() => {
        this.ruleForm.afterSaleGoodsVos = data.afterSaleGoodsVos;
        this.ruleForm.orderSn = row.orderSn;
        this.showhidden = false;
      });
    },
    canceldescribe() {
      this.centerDialogVisible = false;
      this.$refs.describe.clearValidate();
    },
    async costfunc(val) {
      const obj = {
        orderSn: this.ruleForm.orderSn,
        returnType: this.ruleForm.afterSaleGoodsVos[this.checknum].returnType,
        skuId: this.ruleForm.afterSaleGoodsVos[this.checknum].skuId,
        amount: this.CommodityArr[this.checknum].compensateAmount
      };
      let data = await findpusher(obj);
      this.ruleForm.pusher = data.data;
      setTimeout(() => {
        this.ruleForm.pusher = data.data;
      }, 50);
    },
    determine() {
      this.$refs.describe.validate(async valid => {
        if (valid) {
          // 获取推送人
            const val = {
              orderSn: this.ruleForm.orderSn,
              returnType: this.ruleForm.afterSaleGoodsVos[this.checknum].returnType?this.ruleForm.afterSaleGoodsVos[this.checknum].returnType:this.staging.returnType,
              skuId: this.ruleForm.afterSaleGoodsVos[this.checknum].skuId?this.ruleForm.afterSaleGoodsVos[this.checknum].skuId:this.ruleForm.afterSaleGoodsVos[0].skuId,
              amount: this.ruleForm.afterSaleGoodsVos[this.checknum].compensateAmount?this.ruleForm.afterSaleGoodsVos[this.checknum].compensateAmount:this.ruleForm.afterSaleGoodsVos[0].compensateAmount,
            };
            let data = await findpusher(val);
            this.ruleForm.pusher = data.data;
            const obj = JSON.parse(JSON.stringify(this.staging));
            obj.complainQuantity = this.eldiog.afternumber;
            obj.pusher = this.ruleForm.pusher; //推送处理人
            obj.waiter = this.ruleForm.waiter; // 客服人员
            obj.creater = this.ruleForm.waiter; // 客诉提交人员
            obj.questionDesc = this.eldiog.Faulttent;
            obj.picUrls = this.eldiog.picUrls;
            obj.logisticPrice = "";
            obj.personLiable = "";
            obj.customerRequire = "";
            obj.maintenance = "";
            obj.supplierPhone = "";
            obj.supplierReAddress = "";
            if(!this.selectionArr.length){
              if (this.CommodityArr.length) {
                  this.CommodityArr.forEach((item, index) => {
                    if (item.skuId === obj.skuId) {
                      this.CommodityArr[index] = obj;
                    } else {
                      this.CommodityArr.push(obj);
                    }
                  });
                } else {
                  this.CommodityArr.push(obj);
              }
            }else{
              obj.afterSaleParam = this.ruleForm;
              obj.afterSaleComplainParam = this.ruleForm.afterSaleGoodsVos;
              obj.afterSaleComplainParam.forEach(val => {
                val.returnType = this.eldiog.returnType
              })
              const data = await saveaftersaleb(obj);
              if(data.code == 200){
                this.$message({
                  message: data.message,
                  type: "success"
                });
                this.centerDialogVisible = false;
                this.$emit("closediv", false);
                this.$parent.aftersalepageb()
              }
            }
            this.eldiog.afternumber = "";
            this.eldiog.Faulttent = "";
        } else {
          return false;
        }
      });
      this.centerDialogVisible = false;
    },
    afterdescribing(data) {
      this.staging = data;
      this.centerDialogVisible = true;
      this.showstate = true
    },
    seleType(){
      // this.$refs.returnType2.clearValidate();
    },
    async shopfunc() {
      if (this.ruleForm.applierPhone) {
        let obj = {
          receivePhone: this.ruleForm.applierPhone
        };
        const { data } = await findorderlist(obj);
        this.tableData = data;
      } else {
        this.tableData = [];
      }
      this.showhidden = true;
    },
    //选择省份触发
    provincefunc(val) {
      this.cityArr = [];
      this.districtArr = [];
      this.townIdArr = [];
      this.ruleForm.cityId = "";
      this.ruleForm.districtId = "";
      this.ruleForm.townId = "";
      getcity(val).then(res => {
        this.cityArr = res.data.list;
        this.addressArr.forEach(item => {
          if (item.regionId == val) {
            this.ruleForm.province = item.regionName;
          }
        });
      });
    },
    //选择市触发
    cityfunc(val) {
      this.districtArr = [];
      this.townIdArr = [];
      this.ruleForm.districtId = "";
      this.ruleForm.townId = "";
      getcity(val).then(res => {
        this.districtArr = res.data.list;
        this.cityArr.forEach(item => {
          if (item.regionId == val) {
            this.ruleForm.city = item.regionName;
          }
        });
      });
    },
    //选择区触发
    districtfunc(val) {
      this.townIdArr = [];
      this.ruleForm.townId = "";
      getcity(val).then(res => {
        this.townIdArr = res.data.list;
        this.districtArr.forEach(item => {
          if (item.regionId == val) {
            this.ruleForm.district = item.regionName;
          }
        });
      });
    },
    townfunc(val) {
      this.townIdArr.forEach(item => {
        if (item.regionId == val) {
          this.ruleForm.town = item.regionName;
        }
      });
    },
    //获取省
    _getprovince() {
      getprovince().then(res => {
        this.addressArr = res.data.list;
      });
    },
    // 售后要求选择
    afterfunc(val) {
      this.ruleForm.afterSaleGoodsVos[
        this.checknum
      ].returnType = this.CommodityArr[this.checknum].returnType;
    },
    handleClosetrue() {
      this.$refs.ruleForm.validate(async (valid,item) => {
        if (valid) {
          let obj = {};
          this.showstate = true
          obj.afterSaleParam = this.ruleForm;
          obj.afterSaleComplainParam = this.CommodityArr;
          const arr  = obj.afterSaleComplainParam
          for(let i=0;i<arr.length;i++){
            if(arr[i].returnType === null || arr[i].returnType === ''){
              this.showstate = false
              throttleTipPop(this,'error','请选择商品'+(i+1)+'售后要求')
              return false
            }else if(arr[i].complainQuantity === null || arr[i].complainQuantity === ''){
              this.showstate = false
              throttleTipPop(this,'error','请输入商品'+(i+1)+'客诉数量')
              return false
            }else if(arr[i].questionDesc === null || arr[i].questionDesc === ''){
              this.showstate = false
              throttleTipPop(this,'error','请输入商品'+(i+1)+'客诉描述')
              return false
            }
          }
          if(this.showstate){
              const data = await saveaftersaleb(obj);
              if (data.code == 200) {
                this.$message({
                  message: data.message,
                  type: "success"
                });
                this.showstate = true
                this.CommodityArr = [];
                this.$emit("closediv", false);
                this.$parent._getAllorder()
              }
            }
          
        } else {
          throttleTipPop(this,'error',item[Object.keys(item)[0]][0].message)
          return false;
        }
      });
    },
    handleClose() {
      this.$refs.ruleForm.clearValidate();
      this.$emit("closediv", false);
    },
    handleAvatarSuccess(res, file) {
      this.eldiog.picUrls.push(res.data.domain + res.data.filePath);
    }
  },
  created() {
    this._getprovince();
    this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
  },
  mounted() {},
  watch: {
    dialog(val) {
      this.dialogVisible = val;
    },
    async passdata(val) {
      if(val.orderSn){
        let { data } = await findorderdetail(val.orderSn);
        data.orderSn = val.orderSn;
        const obj = JSON.parse(localStorage.getItem("user"));
        data.creater = obj.data.sysuserName;
        data.pusher = "";
        data.supplierName = data.afterSaleGoodsVos[0].supplierName
        this.ruleForm = data;
      }
    },
    "ruleForm.applierPhone": {
      handler: function(val) {
        if (val) {
          let obj = {
            receivePhone: val
          };
          findorderlist(obj).then(res => {
            this.tableData = res.data;
          });
        } else {
          this.tableData = [];
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.sales_div {
  padding: 0px;
  height: 53px;
  margin-top: 30px;
  height: 100%;
  padding: 16px 0;
  border: 1px solid rgba(215, 224, 241, 1);
  position: relative;
}
.sales_div:first-child {
  margin-top: 0;
}
.mcard .title {
  margin-left: 0;
}
.content_color {
  background: white;
}
.row_div {
  padding-right: 30px;
}
.mcard .title {
  margin-bottom: 0;
}
.row_div .el-row:first-child {
  margin-top: 25px;
}
.number_of {
  border: none;
  position: relative;
  padding-bottom: 0;
}
.number_of span {
  display: inline-block;
  width: 119px;
  height: 39px;
  text-align: center;
  line-height: 39px;
}
.border_btom {
  border: 1px solid rgba(215, 224, 241, 1);
}
.checked_span {
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(215, 224, 241, 1);
  border-bottom: none;
  position: relative;
  top: 2px;
}
.top_btn {
  position: absolute;
  right: 0;
  width: 80px;
  height: 32px;
  border-radius: 5px;
  top: 16px;
  text-align: center;
}
.mar_top {
  margin-top: -25px;
}
.table_div {
  padding: 20px;
}
.top_nono {
  margin-top: 0px;
}
.checked_shop {
  top: -6px;
  float: left;
  z-index: 1;
}
.batch_btn {
  position: relative;
  top: -4px;
  left: 9px;
}
.hidden_div {
  padding: 19px;
  position: absolute;
  width: 900px;
  right: 60px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(215, 224, 241, 1);
  box-shadow: 0px 0px 6px 0px rgba(76, 134, 244, 0.18);
  border-radius: 4px;
  z-index: 10;
  .triangle {
    position: absolute;
    right: 200px;
    top: -11px;
  }
}
.imgsize {
  width: 95px;
  height: 95px;
}
.tent_left {
  text-align: left;
  padding-left: 5px;
}
.el_tip {
  font-size: 14px;
  color: #ababab;
  line-height: 20px;
  margin-bottom: 20px;
}
.img_sizeload {
  width: 80px;
  height: 80px;
}
/deep/ .big_dialog .el-dialog__body{
  background:none
}
</style>