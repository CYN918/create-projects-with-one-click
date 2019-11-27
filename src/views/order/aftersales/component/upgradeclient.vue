<template>
  <div class="img_sizeload">
    <!-- 升级客诉 -->
    <el-dialog :visible.sync="dialogVisible" width="1200px" :before-close="handleClose">
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
                          <el-input v-model="ruleForm.customerName" size="small" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="平台名称：" prop="platform">
                          <el-input v-model="ruleForm.projectName" size="small" disabled></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="服务商：" prop="providers">
                          <el-input v-model="ruleForm.agencyName" size="small" disabled></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="销售员：" prop="salesman">
                          <el-input v-model="ruleForm.salesMan" size="small" disabled></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="订单号：" prop="saleSn">
                          <el-input
                            disabled
                            v-model="ruleForm.saleSn"
                            size="small"
                            placeholder="请输入订单号，调出对应信息~"
                          ></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="购买账号：" prop="userAccount">
                          <el-input v-model="ruleForm.userAccount" size="small" disabled></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="客诉联系人：" prop="applierName">
                          <el-input v-model="ruleForm.applierName" size="small" :disabled="!appshow"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="联系电话：" prop="applierPhone">
                          <el-input
                            :disabled="!appshow"
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
                            <el-form-item prop="province" ref="province">
                              <el-select
                                size="small"
                                v-model="ruleForm.province"
                                :disabled="!appshow"
                                clearable
                                @change="provincefunc"
                                placeholder="请选择省"
                                style="max-width:120px"
                              >
                                <el-option
                                  v-for="item in addressArr"
                                  :key="item.regionId"
                                  :label="item.regionName"
                                  :value="item.regionId"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item prop="city"  ref="city">
                              <el-select
                                size="small"
                                :disabled="!appshow"
                                @change="cityfunc"
                                v-model="ruleForm.city"
                                clearable
                                placeholder="请选择市"
                                style="max-width:120px"
                              >
                                <el-option
                                  v-for="item in cityArr"
                                  :key="item.regionId"
                                  :label="item.regionName"
                                  :value="item.regionId"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item prop="district"  ref="district">
                              <el-select
                                size="small"
                                :disabled="!appshow"
                                v-model="ruleForm.district"
                                placeholder="请选择区"
                                @change="districtfunc"
                                style="max-width:120px"
                              >
                                <el-option
                                  v-for="item in districtArr"
                                  :key="item.regionId"
                                  :label="item.regionName"
                                  :value="item.regionId"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="6">
                            <el-form-item prop="town"  ref="town">
                              <el-select
                                size="small"
                                v-model="ruleForm.town"
                                :disabled="!appshow"
                                placeholder="请选择街道"
                                style="max-width:120px"
                                @change="townfunc"
                              >
                                <el-option
                                  v-for="item in townIdArr"
                                  :key="item.regionId"
                                  :label="item.regionName"
                                  :value="item.regionId"
                                ></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="街 道：" prop="town">
                          <el-input
                            v-model="ruleForm.applierAddress"
                            :disabled="!appshow"
                            size="small"
                          ></el-input>
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
          </div>
          <div class="mcard sales_div top_nono">
            <div class="content_color">
              <div class="goods-fitter">
                <div class="search-wrapper1">
                  <div class="table_div">
                    <el-table :data="ruleForm.afterSaleGoodsVos" stripe border style="width: 100%">
                      <el-table-column width="60" align="center" type="selection"></el-table-column>
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
                      <el-table-column align="center" prop="complainQuantity" label="数量" width="70"></el-table-column>
                      <el-table-column align="center" prop="specialPrice" label="结算价" width="70"></el-table-column>
                      <el-table-column align="center" prop="totalAmount" label="合计" width="80"></el-table-column>
                      <el-table-column align="center" prop="address" label="物流信息" width="150">
                        <template slot-scope="scope">
                          <div class="tent_left">快递公司：{{scope.row.shippingId}}</div>
                          <div class="tent_left">快递单号：{{scope.row.logisticsNo}}</div>
                          <div class="tent_left">地址：{{scope.row.supplierAddress}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column align="center" prop="address" label="操作">
                        <template slot-scope="scope">
                          <el-select
                            v-model="scope.row.returnType"
                            placeholder="请选择"
                            style="width:100%"
                            size="small"
                            disabled
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
                        <el-form-item label="商品名称：">
                          <el-input v-model="CommodityArr[checknum].goodsName" disabled size="small"></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="12">
                        <el-form-item label="本次客诉数量：" prop="complainQuantity">
                          <el-input v-model="CommodityArr[checknum].complainQuantity" disabled size="small"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="售后要求：" prop="returnType">
                          <el-select
                            v-model="CommodityArr[checknum].returnType"
                            disabled
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
                        <el-form-item label="SKU：">
                          <el-input v-model="CommodityArr[checknum].goodsAttr" disabled size="small"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12">
                        <el-form-item label="处理截止时间：">
                          <el-date-picker
                            size="medium"
                            disabled
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
                            disabled
                          >
                            <el-option label="客户" value="1"></el-option>
                            <el-option label="经销商" value="2"></el-option>
                            <el-option label="供应商" value="3"></el-option>
                            <el-option label="销售" value="4"></el-option>
                            <el-option label="客服" value="5"></el-option>
                            <el-option label="采购" value="6"></el-option>
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
                              disabled
                              size="small"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="处理要求：">
                            <el-select
                              v-model="CommodityArr[checknum].customerRequire"
                              disabled
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
                              disabled
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
                            <el-input v-model="CommodityArr[checknum].logisticPrice" disabled size="small"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="维修费用：">
                            <el-input v-model="CommodityArr[checknum].maintenance" disabled size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="处理要求：">
                            <el-select
                              v-model="CommodityArr[checknum].customerRequire"
                              disabled
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
                              disabled
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
                              disabled
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
                            <el-input v-model="ruleForm.mailItems" disabled size="small"></el-input>
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
                            <el-input v-model="ruleForm.replacementValue" disabled size="small"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="售后理由：">
                            <el-select
                              v-model="CommodityArr[checknum].afterReason"
                              placeholder="请选择"
                              style="width:100%"
                              disabled
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
                              disabled
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
                            <el-input v-model="ruleForm.mailItems" disabled size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="补寄商品价值：">
                            <el-input v-model="ruleForm.replacementValue" disabled size="small"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="售后理由：">
                            <el-select
                              v-model="CommodityArr[checknum].afterReason"
                              placeholder="请选择"
                              disabled
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
                              disabled
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
                            <el-input v-model="CommodityArr[checknum].goodsNameReturn" disabled size="small"></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="快递费用：">
                            <el-input v-model="CommodityArr[checknum].logisticPrice" disabled size="small"></el-input>
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
                                disabled
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
                            <el-input v-model="CommodityArr[checknum].openingBrank" disabled size="small"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="收款人姓名：">
                            <el-input v-model="CommodityArr[checknum].payee" size="small" disabled></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="金额：">
                            <el-input
                              @change="costfunc"
                              v-model="CommodityArr[checknum].compensateAmount"
                              disabled
                              size="small"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="账户：">
                            <el-input v-model="CommodityArr[checknum].brankAccount" disabled size="small"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="售后理由：">
                            <el-select
                              v-model="CommodityArr[checknum].afterReason"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                              disabled
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
                            disabled
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

          <div v-if="!appshow">
            <div class="sales_div number_of">
              <span
                @click="val = index2"
                v-for="(item,index2) in newArr"
                :key="index2"
                :class="index2===val?'checked_span':''"
              >升级客诉</span>
              <div class="mcard border_btom">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="故障描述：" prop="describe">
                      <el-input
                        v-model="newArr[0].questionDesc"
                        type="textarea"
                        size="small"
                        :rows="3"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-form-item label="上传附件：" prop="submitter">
                    <el-upload
                      accept=".jpg,.png,.gif,.JPG,.JPEG,.PBG,.GIF,"
                      :action="action"
                      list-type="picture-card"
                      :file-list="picUrls"
                      :on-success="uploadattachment"
                    >
                      <i class="el-icon-plus"></i>
                    </el-upload>
                    <el-dialog :visible.sync="dialogVisiblea" size="tiny">
                      <img width="100%" :src="dialogImageUrl" alt />
                    </el-dialog>
                  </el-form-item>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="推送处理人：" prop="pushAdopt">
                      <el-input
                        v-model="newArr[0].pusher"
                        size="small"
                        placeholder="采销 XXX"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="供应商：" prop="supplierName">
                      <el-input
                        v-model="newArr[0].supplierName"
                        size="small"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="推送提醒：" prop="remind">
                      <el-input
                        v-model="newArr[0].remind"
                        size="small"
                        placeholder="服务商："
                        readonly
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="客户平台：" prop="clientPlatform">
                      <el-input
                        v-model="newArr[0].clientPlatform"
                        size="small"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="客服人员：" prop="customerService">
                      <el-input
                        v-model="newArr[0].waiter"
                        size="small"
                        readonly
                        placeholder="黄某某："
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="客诉提交人员：" prop="submitter">
                      <el-input
                        v-model="newArr[0].creater"
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
          <div v-else>
            <div class="sales_div number_of">
              <span
                v-for="(item,index) in appArr"
                :key="index"  :class="applynum == index?'checked_span':''"
                @click="applynum = index"
              >{{'第'+(index+1)+'客诉'}}</span>
            </div>
            <div class="mcard border_btom" v-if="appArr.length">
              <div class v-if="appArr[applynum].upgradeStatus == 2">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="故障描述：" prop="describe">
                      <el-input
                        v-model="appArr[applynum].upgradeReason"
                        type="textarea"
                        size="small"
                        :rows="3"
                        :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="推送处理人：" prop="pushAdopt">
                      <el-input
                        v-model="ruleForm.afterSaleComplainVo[val].pusher"
                        size="small"
                        placeholder="采销 XXX"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="供应商：" prop="supplierName">
                      <el-input
                        v-model="ruleForm.afterSaleComplainVo[val].supplierName"
                        size="small"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="推送提醒：" prop="remind">
                      <el-input
                        v-model="ruleForm.afterSaleComplainVo[val].remind"
                        size="small"
                        placeholder="服务商："
                        readonly
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="客户平台：" prop="clientPlatform">
                      <el-input
                        v-model="ruleForm.afterSaleComplainVo[val].clientPlatform"
                        size="small"
                        readonly
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="客服人员：" prop="customerService">
                      <el-input
                        v-model="ruleForm.afterSaleComplainVo[val].waiter"
                        size="small"
                        readonly
                        placeholder="黄某某："
                      ></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="客诉提交人员：" prop="submitter">
                      <el-input
                        v-model="ruleForm.afterSaleComplainVo[val].creater"
                        size="small"
                        readonly
                        placeholder="黄某某："
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div class="content_color" v-if="appArr[applynum].upgradeStatus != 2">
                <div class="goods-fitter">
                  <div class="search-wrapper1">
                    <div class="row_div">
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="商品名称：" prop="goodsName">
                            <el-input
                              v-model="appArr[applynum].goodsName"
                              size="small"
                              disabled
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="本次客诉数量：" prop="complainQuantity">
                            <el-input
                              v-model="appArr[applynum].complainQuantity"
                              size="small"
                              :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="售后要求：" prop="returnType">
                            <el-select
                              v-model="appArr[applynum].returnType"
                              placeholder="请选择"
                              style="width:100%"
                              size="small"
                              :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
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
                          <el-form-item label="SKU：">
                            <el-input
                              v-model="appArr[applynum].goodsAttr"
                              size="small"
                              disabled
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="处理截止时间：">
                            <el-date-picker
                              size="medium"
                              v-model="appArr[applynum].deadlineTime"
                              type="date"
                              valueFormat="yyyy-MM-dd HH:mm:ss"
                              placeholder="选择日期"
                              :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                            ></el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <!-- 退货/换货/退款　 -->
                      <div
                        class="mar_top"
                        v-if="appArr[applynum].returnType == 1 || appArr[applynum].returnType== 3"
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
                          <el-col :span="12">
                            <el-form-item label="责任人：">
                              <el-select
                                v-model="ruleForm.responsible"
                                placeholder="请选择"
                                style="width:100%"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                              >
                                <el-option label="客户" value="1"></el-option>
                                <el-option label="经销商" value="2"></el-option>
                                <el-option label="供应商" value="3"></el-option>
                                <el-option label="销售" value="4"></el-option>
                                <el-option label="客服" value="5"></el-option>
                                <el-option label="采购" value="6"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <!-- <el-col :span="12">
                          <el-form-item label="快递费用：" prop="courierFees">
                            <el-input v-model="ruleForm.courierFees" size="small"></el-input>
                          </el-form-item>
                          </el-col>-->
                        </el-row>
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="退款金额：">
                              <el-input v-model="appArr[applynum].compensateAmount" size="small"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="处理要求：">
                              <el-select
                                v-model="appArr[applynum].customerRequire"
                                placeholder="请选择"
                                style="width:100%"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
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
                        </el-row>
                        <!-- <el-row v-if="ruleForm.checkAfterStatus === 1 && (CommodityArr[checknum].returnType == 0 || CommodityArr[checknum].returnType == 1 || CommodityArr[checknum].returnType == 2)">
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
                      <el-row  v-if="ruleForm.checkAfterStatus === 1 && (CommodityArr[checknum].returnType == 0 || CommodityArr[checknum].returnType == 1 || CommodityArr[checknum].returnType == 2)">
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
                      <div class="mar_top" v-if="appArr[applynum].returnType== 2">
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
                            <el-form-item label="责任人：">
                              <el-select
                                v-model="appArr[applynum].personLiable"
                                placeholder="请选择"
                                style="width:100%"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                              >
                                <el-option label="客户" value="1"></el-option>
                                <el-option label="经销商" value="2"></el-option>
                                <el-option label="供应商" value="3"></el-option>
                                <el-option label="销售" value="4"></el-option>
                                <el-option label="客服" value="5"></el-option>
                                <el-option label="采购" value="6"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="快递费用：">
                              <el-input
                                v-model="appArr[applynum].logisticPrice"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="处理要求：">
                              <el-select
                                v-model="appArr[applynum].customerRequire"
                                placeholder="请选择"
                                style="width:100%"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
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
                            <el-form-item label="维修费用：">
                              <el-input
                                v-model="appArr[applynum].maintenance"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>
                      <!-- 破损补寄 -->
                      <div class="mar_top" v-if="appArr[applynum].returnType== 4">
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="责任人：">
                              <el-select
                                v-model="appArr[applynum].personLiable"
                                placeholder="请选择"
                                style="width:100%"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                              >
                                <el-option label="客户" value="1"></el-option>
                                <el-option label="经销商" value="2"></el-option>
                                <el-option label="供应商" value="3"></el-option>
                                <el-option label="销售" value="4"></el-option>
                                <el-option label="客服" value="5"></el-option>
                                <el-option label="采购" value="6"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="处理要求：">
                              <el-select
                                v-model="appArr[applynum].customerRequire"
                                placeholder="请选择"
                                style="width:100%"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
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
                            <el-form-item label="补寄商品：">
                              <el-input
                                v-model="ruleForm.mailItems"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="补寄商品价值：">
                              <el-input
                                v-model="ruleForm.replacementValue"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>
                      <!-- 丢件补寄 -->
                      <div class="mar_top" v-if="appArr[applynum].returnType== 5">
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="责任人：">
                              <el-select
                                v-model="appArr[applynum].personLiable"
                                placeholder="请选择"
                                style="width:100%"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                              >
                                <el-option label="客户" value="1"></el-option>
                                <el-option label="经销商" value="2"></el-option>
                                <el-option label="供应商" value="3"></el-option>
                                <el-option label="销售" value="4"></el-option>
                                <el-option label="客服" value="5"></el-option>
                                <el-option label="采购" value="6"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="处理要求：">
                              <el-select
                                v-model="appArr[applynum].customerRequire"
                                placeholder="请选择"
                                style="width:100%"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
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
                        </el-row>
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="补寄商品：">
                              <el-input
                                v-model="ruleForm.mailItems"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="补寄商品价值：">
                              <el-input
                                v-model="ruleForm.replacementValue"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>
                      <!-- 配件补寄 -->
                      <div class="mar_top" v-if="appArr[applynum].returnType== 6">
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="责任人：">
                              <el-select
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                                v-model="appArr[applynum].personLiable"
                                placeholder="请选择"
                                style="width:100%"
                                size="small"
                              >
                                <el-option label="客户" value="1"></el-option>
                                <el-option label="经销商" value="2"></el-option>
                                <el-option label="供应商" value="3"></el-option>
                                <el-option label="销售" value="4"></el-option>
                                <el-option label="客服" value="5"></el-option>
                                <el-option label="采购" value="6"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="处理要求：">
                              <el-select
                                v-model="appArr[applynum].customerRequire"
                                placeholder="请选择"
                                style="width:100%"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
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
                        </el-row>
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="配件名称：">
                              <el-input
                                v-model="appArr[applynum].goodsNameReturn"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="快递费用：">
                              <el-input
                                v-model="appArr[applynum].logisticPrice"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>
                      <!-- 补偿费用 -->
                      <div class="mar_top" v-if="appArr[applynum].returnType== 7">
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="责任人：">
                              <el-select
                                v-model="appArr[applynum].personLiable"
                                placeholder="请选择"
                                style="width:100%"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                              >
                                <el-option label="客户" value="1"></el-option>
                                <el-option label="经销商" value="2"></el-option>
                                <el-option label="供应商" value="3"></el-option>
                                <el-option label="销售" value="4"></el-option>
                                <el-option label="客服" value="5"></el-option>
                                <el-option label="采购" value="6"></el-option>
                              </el-select>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="开户行：">
                              <el-input
                                v-model="appArr[applynum].openingBrank"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="收款人姓名：">
                              <el-input
                                v-model="appArr[applynum].payee"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="12">
                            <el-form-item label="金额：">
                              <el-input
                                v-model="appArr[applynum].compensateAmount"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                        <el-row>
                          <el-col :span="12">
                            <el-form-item label="账户：">
                              <el-input
                                v-model="appArr[applynum].brankAccount"
                                size="small"
                                :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                              ></el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </div>
                      <el-row>
                        <el-col :span="24">
                          <el-form-item label="故障描述：" prop="describe">
                            <el-input
                              :disabled="appArr[applynum].upgradeStatus == 1 || appArr[applynum].upgradeStatus == 2"
                              v-model="appArr[applynum].questionDesc"
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
                            <el-input
                              v-model="ruleForm.pusher"
                              size="small"
                              placeholder="采销 XXX"
                              disabled
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="供应商：" prop="supplierName">
                            <el-input v-model="ruleForm.supplierName" size="small" disabled></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="推送提醒：" prop="remind">
                            <el-input
                              v-model="ruleForm.remind"
                              size="small"
                              placeholder="服务商："
                              disabled
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="客户平台：" prop="clientPlatform">
                            <el-input v-model="ruleForm.clientPlatform" size="small" disabled></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12">
                          <el-form-item label="客服人员：" prop="customerService">
                            <el-input
                              v-model="ruleForm.waiter"
                              size="small"
                              placeholder="黄某某："
                              disabled
                            ></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="12">
                          <el-form-item label="客诉提交人员：" prop="submitter">
                            <el-input
                              v-model="ruleForm.creater"
                              size="small"
                              placeholder="黄某某："
                              disabled
                            ></el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-row v-if="applynum==(appArr.length-1)">
                        <el-form-item label="上传附件：" prop="submitter">
                          <el-upload
                            accept=".jpg,.png,.gif,.JPG,.JPEG,.PBG,.GIF,"
                            :action="action"
                            list-type="picture-card"
                            :file-list="picUrls"
                            :on-success="uploadattachment"
                          >
                            <i class="el-icon-plus"></i>
                          </el-upload>
                          <el-dialog :visible.sync="dialogVisiblea" size="tiny">
                            <img width="100%" :src="dialogImageUrl" alt />
                          </el-dialog>
                        </el-form-item>
                      </el-row>
                    </div>
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
  </div>
</template>

<script>
import { getprovince, getcity } from "@/api/customer/index";
import { throttleTipPop } from "@/utils/throttle";
import {
  findorderdetail,
  saveaftersaleb,
  aftersaleetail,
  updateaftersaleb,
  findpusher,
  againaftersaleb,
  userreceiveb
} from "@/api/order/index";
import { parse } from "path";
export default {
  props: {
    upgradeclientshow: {},
    upgradedata: {},
    viewstate: { type: Boolean }
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
    var deadlineTimer = (rule, value, callback) => {
      callback();
    };
    var returnGoods1 = (rule, value, callback) => {
      callback();
    };
    var provinceyz = (rule, value, callback) => {
      if(value == ''){
        if(!this.view){
          callback();
        }else{
          callback();
        }
      }else{
        callback();
      }
    }
    var cityyz = (rule, value, callback) => {
      if(value == ''){
        if(!this.view){
          callback();
        }else{
          callback();
        }
      }else{
        callback();
      }
    }
    var districtyz = (rule, value, callback) => {
      if(value == ''){
        if(!this.view){
          callback();
        }else{
          callback();
        }
      }else{
        callback();
      }
    }
    var townyz = (rule, value, callback) => {
      if(value == ''){
        if(!this.view){
          callback();
        }else{
          callback();
        }
      }else{
        callback();
      }
    }
    return {
      pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6
          }
        },  
      picUrls: [],
      showstate:true, //判断是否通过验证
      eldiog: {
        describetent: "", //描述内容
        afternumber: "", // 售后数量
        Faulttent: "", //故障描述
        thumbnailImgUrl: [] // 上传图片
      },
      newArr:[{questionDesc:''}],
      dialogImageUrl: "",
      dialogVisiblea: false,
      val: 0,
      checknum: 0,
      staging: "",
      datatable: {},
      tableData: [], //商品列表
      imageUrl: "",
      centerDialogVisible: false, //操作弹窗
      appshow: false, // 底部控制
      action: "",
      dialogVisible: false,
      showhidden: false,
      show: true, // 控制是否退货的禁用,
      addressArr: [], //省级下拉
      cityArr: [],
      districtArr: [],
      CommodityArr: [],
      townIdArr: [],
      appArr: [],
      applynum: 0,
      afterSaleComplainParam: [{}],
      ruleForm: {
        afterSaleComplainVo: [{}]
      },
      rules: {
        userAccount: [
          { required: true, message: "请填写购买账号", trigger: "blur" }
        ],
        Shippingaddress: [
          { required: true, validator: validateaddress, trigger: "change" }
        ],
        province: [
          { required: true,validator: provinceyz,  trigger: "change" }
        ],
        city: [{ required: true, validator: cityyz, trigger: "change" }],
        district: [
          { required: true, validator: districtyz, trigger: "change" }
        ],
        town: [{ required: true, validator: townyz, trigger: "change" }],
        orderSn: [{ required: true, validator: orderSna, trigger: "blur" }],
        skuId: [{ required: true, message: "请填写SKU", trigger: "blur" }],
        salesman: [
          { required: false, message: "请填写销售员", trigger: "blur" }
        ],
        applierName: [
          { required: true, message: "请填写客诉联系人", trigger: "blur" }
        ],
        complainQuantity:[
          { required: true, validator: returnGoods1, trigger: "blur" }
        ],
        returnType:[
          { required: true, validator: returnGoods1, trigger: "blur" }
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
        bank: [{ required: true, message: "请填写开户行", trigger: "blur" }],
        namePayee: [
          { required: true, message: "请填写收款人姓名", trigger: "blur" }
        ],
        amount: [{ required: true, message: "请填写金额", trigger: "blur" }],
        account: [{ required: true, message: "请填写账户", trigger: "blur" }],
        describe: [{ required: true, validator: describe, trigger: "blur" }],
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
        { name: "配件补寄", value: 5 },
        { name: "补偿费用", value: 6 }
      ],
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
      // 售后数组
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
    // 上传图片
    uploadattachment(res, file) {
      this.picUrls.push({
        url: res.data.domain + res.data.filePath,
        uid: file.uid
      });
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
    afterdescribing(data) {
      this.staging = data;
      this.centerDialogVisible = true;
      this.showstate = true
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
        console.log(res.data.list);
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
          let imgarr = [];
          this.showstate = true
          if (this.appshow) {
            const applyobj = Object.assign(
              this.ruleForm,
              this.appArr[this.appArr.length - 1]
            );
            this.picUrls.forEach(item => {
              imgarr.push(item.url);
            });
            applyobj.skuId = this.ruleForm.afterSaleGoodsVos[0].skuId
            applyobj.goodsAttr = this.ruleForm.afterSaleGoodsVos[0].goodsAttr
            applyobj.brandName = this.ruleForm.afterSaleGoodsVos[0].brandName
            applyobj.goodsId = this.ruleForm.afterSaleGoodsVos[0].goodsId
            applyobj.picUrls = imgarr;
            applyobj.shippingPicUrls = [];
            applyobj.applierPhone = this.ruleForm.applierPhone
            console.log(applyobj)
            if(applyobj.returnType === null || applyobj.returnType === ''){
              this.showstate = false
              throttleTipPop(this,'error','请选择商品'+this.appArr.length+'售后要求')
            }
            if(applyobj.complainQuantity === null || applyobj.complainQuantity === ''){
              this.showstate = false
              throttleTipPop(this,'error','请选择商品'+this.appArr.length+'客诉数量')
            }
            if(applyobj.questionDesc === null || applyobj.questionDesc === ''){
              this.showstate = false
              throttleTipPop(this,'error','请选择商品'+this.appArr.length+'客诉描述')
            }
            if(this.showstate){
             var data = await userreceiveb(applyobj)
            }
          } else {
            const applyobj = Object.assign(
              this.ruleForm.afterSaleGoodsVos[0],
              this.ruleForm.afterSaleComplainVo[this.val]
            );
            this.picUrls.forEach(item => {
              imgarr.push(item.url);
            });
            applyobj.picUrls = imgarr;
            const obja = Object.assign(applyobj,this.newArr[0])
            obja.picUrls = imgarr;
            applyobj.complainId = this.upgradedata.complainId
            var data = await againaftersaleb(applyobj);
          }
          if (data.code == 200) {
            this.$message({
              message: data.message,
              type: "success"
            });
            this.$parent.aftersalepageb();
            this.$emit("closeupgrade", false);
          }
        } else {
          throttleTipPop(this,'error',item[Object.keys(item)[0]][0].message)
          return false;
        }
      });
    },
    handleClose() {
      this.$refs.ruleForm.clearValidate();
      this.$emit("closeupgrade", false);
      this.picUrls = [];
      this.CommodityArr = []
    },
    handleAvatarSuccess(res, file) {
      this.eldiog.thumbnailImgUrl.push(res.data.domain + res.data.filePath);
    }
  },
  created() {
    this._getprovince();
    this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
  },
  mounted() {},
  watch: {
    upgradeclientshow(val) {
      this.dialogVisible = val;
    },
    viewstate(val) {
      this.appshow = val;
    },
    async upgradedata(val) {
      // val.apply ? (this.appshow = val.apply) : this.appshow = false;
      let { data } = await aftersaleetail(val.afterId);
      data.supplierName = data.afterSaleGoodsVos[0].supplierName;
      // this.provincefunc(data.provinceId);
      // this.cityfunc(data.cityId);
      // this.districtfunc(data.districtId);
      // this.townfunc(data.townId);
      this.CommodityArr.push(
        JSON.parse(JSON.stringify(data.afterSaleComplainVo[0]))
      );
      this.appArr = JSON.parse(JSON.stringify(data.afterSaleComplainVo));
      this.newArr = JSON.parse(JSON.stringify(data.afterSaleComplainVo)).slice(0,1)
      this.newArr[0].questionDesc = ''
      this.appArr.forEach(item => {
        item.upgradeStatus = 1
      })
      this.appArr.push({
        agencyStatus: "",
        applyTime: "",
        brankAccount: "",
        compensateAmount: "",
        complainId: "",
        complainTimes: "",
        createTime: "",
        createrId: "",
        customerRequire: "",
        deadlineTime: "",
        goodsName: data.afterSaleGoodsVos[0].goodsName,
        thumbnailImgUrl: data.afterSaleGoodsVos[0].thumbnailImgUrl,
        goodsAttr: data.afterSaleGoodsVos[0].goodsAttr,
        logisticAmountType: "",
        logisticNo: "",
        openingBrank: "",
        orderSn: "",
        parentId: "",
        payee: "",
        personLiable: "",
        picUrls: "",
        questionDesc: "",
        receiveShippingTime: "",
        returnGoods: "",
        returnLogisticAmount: "",
        returnLogisticNo: "",
        returnPackageDesc: "",
        returnShipping: "",
        returnShippingId: "",
        returnShippingTime: "",
        returnType: "",
        shippingId: "",
        shippingName: "",
        shippingPicUrls: "",
        sourceType: "",
        supplierStatus: "",
        updateTime: "",
        upgradeReason: "",
        waiterId: "",
        upgradeStatus: 4
      });
      data.afterSaleComplainVo.forEach((item, index) => {
        if (index == 0) {
          item.questionDesc = "";
        }
        data.afterSaleGoodsVos.forEach(val => {
          if (item.complainId === val.complainId) {
            val.returnType = item.returnType;
            item.goodsName = val.goodsName;
            item.goodsAttr = val.goodsAttr;
            item.complainQuantity = val.complainQuantity;
          }
        });
      });
      console.log(data)
      this.ruleForm = data;
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
  margin-top: 32px;
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
/deep/ .el-upload--picture-card {
  width: 78px;
  height: 78px;
  line-height: 78px;
}
/deep/ .el-dialog__body{
  background: none;
  padding: 10px 20px;
}
</style>