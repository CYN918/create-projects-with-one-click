<template>
  <div id="pendingContract2">
    <div class="margin0">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">库间调拨</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="5">
                    <el-form-item label="状态：" prop="invoiceType">
                      <el-col :span="21">
                        <el-select
                          v-model="tableDatas.status"
                          placeholder="必填项"
                          style="width:100%;"
                        >
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="调出仓库：" prop="invoiceType">
                      <el-col :span="21">
                        <el-select
                          v-model="tableDatas.fromWarehouseId"
                          placeholder="必填项"
                          style="width:100%;"
                        >
                          <el-option
                            v-for="(item,index) in fromData"
                            :key="index"
                            :label="item.name"
                            :value="item.warehouseId"
                          ></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="调入仓库：" prop="invoiceType">
                      <el-col :span="21">
                        <el-select
                          v-model="tableDatas.toWarehouseId"
                          placeholder="必填项"
                          style="width:100%;"
                        >
                          <el-option
                            v-for="(item,index) in toData"
                            :key="index"
                            :label="item.name"
                            :value="item.warehouseId"
                          ></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="调拨单号：">
                      <el-col :span="21">
                        <el-input v-model="tableDatas.transferBillNo" placeholder="请输入调拨单号"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2">
                    <el-button type="primary" size="small" @click="searchOrder()">查询</el-button>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="业务日期：">
                      <el-date-picker
                        v-model="tableDatas.businessDate"
                        valueFormat="yyyy-MM-dd HH:mm:ss"
                        type="daterange"
                        range-separator="-"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                      ></el-date-picker>
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
            <el-button type="primary" size="small" @click="addStock()" v-permit="'transfer:save'">新增</el-button>
            <el-button type="primary" size="small" @click="addPDF" v-permit="'transfer:pdf'">单据生成PDF</el-button>
          </el-row>
        </div>

        <el-table
          :data="orderData"
          border
          @selection-change="handleSelectionChange"
          stripe
          :row-class-name="tableRowClassName"
          :row-style="selectedHighlight"
          @row-dblclick="AhandleSelectionChange"
        >
          <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
          <el-table-column label="状态" prop="name" align="center" width="150">
            <template slot-scope="scope">
              <div v-html="scope.row.billStatus"></div>
            </template>
          </el-table-column>
          <el-table-column label="调拨单号" prop="name" align="center" width="230">
            <template slot-scope="scope">{{scope.row.transferBillNo}}</template>
          </el-table-column>
          <el-table-column label="业务日期" prop="name" align="center" width="200">
            <template slot-scope="scope">{{scope.row.bizDate}}</template>
          </el-table-column>
          <el-table-column label="调出仓库" prop="name" align="center">
            <template slot-scope="scope">{{scope.row.fromWarehouse}}</template>
          </el-table-column>
          <el-table-column label="调入仓库" prop="name" align="center">
            <template slot-scope="scope">{{scope.row.toWarehouse}}</template>
          </el-table-column>
          <el-table-column label="制单人" prop="name" align="center">
            <template slot-scope="scope">{{scope.row.inputUserName}}</template>
          </el-table-column>
          <el-table-column label="制单时间" prop="name" align="center" width="162">
            <template slot-scope="scope">{{scope.row.createTime}}</template>
          </el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="150">
            <template slot-scope="scope">
              <div class="line-div">
                <div
                  class="small-Idiv"
                  @click="submitOrder(scope.row)"
                  v-permit="'transfer:save_push'"
                >
                  <div class="i-div">
                    <img src="@/common/images/icon/提交调拨单.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">提交调拨单</span>
                </div>
                <div class="small-Idiv" @click="detail(scope.row)" v-permit="'transfer:detail'">
                  <div class="i-div">
                    <img src="@/common/images/icon/查看详情.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">详情</span>
                </div>

                <div
                  class="small-Idiv"
                  @click="editOrder(scope.row)"
                  v-show="form.auditStatus!=1"
                  v-permit="'transfer:update'"
                >
                  <div class="i-div">
                    <img src="@/common/images/icon/编辑.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">编辑</span>
                </div>
                <div class="small-Idiv" @click="deleteData(scope.row)" v-permit="'transfer:delete'">
                  <div class="i-div">
                    <img src="@/common/images/icon/回收站.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">删除</span>
                </div>
                <div
                  class="small-Idiv"
                  @click="submitAudit(scope.row)"
                  style="margin-left:0px;"
                  v-permit="'transfer:audit'"
                >
                  <div class="i-div">
                    <img src="@/common/images/icon/提交调拨单.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;">审核调拨单</span>
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
              v-show="!this.showNo"
            >商品明细</li>
            <li
              class="sale"
              @click="tabIndex(0)"
              :class="currentIndex===0 ? 'active' : ''"
              v-show="this.showNo"
            >调拨单【{{this.showNo}}】的商品明细</li>
          </ul>
        </div>
        <div class="tabs-content">
          <component :is="mainIndex" :count="count" :page="page" :showNo="showNo" showId="showId"></component>
        </div>
      </div>

      <!-- 新增销售订单 -->
      <el-dialog :visible.sync="addVisible" width="70%" :before-close="addClose">
        <div class="goods-fitter" style="margin-bottom:20px">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">新增调拨单</h4>
            </div>
          </el-form>
        </div>
        <div class="mail-fitter">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="110px" size="small">
            <div class="mail-wrapper">
              <div class="search-base">
                <h4 class="title1">调拨明细</h4>
                <div class="mbottom">
                  <div class="goods-fitter">
                    <el-row>
                      <el-col :span="7">
                        <el-form-item label="调拨单号：" prop="customerName">
                          <el-input placeholder="保存后自动生成" readonly></el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :span="7" :offset="1">
                        <el-form-item label="部 门：" prop="father">
                          <treeselect
                            style="width:100%;"
                            :options="options1"
                            search-nested
                            placeholder="请选择部门"
                            v-model="ruleForm.organizeId"
                          />
                        </el-form-item>
                      </el-col>
                      <el-col :span="7">
                        <el-form-item label=" 调拨人员：" prop="transportMode">
                          <el-input v-model="form.bizUserName" v-if="userList.length<1" readonly></el-input>
                          <el-select
                            v-model="form.bizUserId"
                            placeholder="请选择"
                            v-if="userList.length>=1"
                            style="width:100%"
                            @change="chooseWarehousingUser"
                          >
                            <el-option
                              v-for="(item,index) in userList"
                              :key="index"
                              :label="item.sysuserName"
                              :value="item.sysuserId"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="7">
                        <el-form-item label="调拨日期：">
                          <el-date-picker
                            style="width:100%;"
                            v-model="form.bizDate"
                            valueFormat="yyyy-MM-dd HH:mm:ss"
                            type="date"
                            :picker-options="pickerOptions0"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="7" :offset="1">
                        <el-form-item label="调入仓库：" prop="invoiceType">
                          <el-select
                            v-model="form.toWarehouseId"
                            placeholder="必填项"
                            style="width:100%;"
                          >
                            <el-option
                              v-for="(item,index) in toData"
                              :key="index"
                              :label="item.name"
                              :value="item.warehouseId"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="7">
                        <el-form-item label="调出仓库：" prop="invoiceType">
                          <el-select
                            v-model="form.fromWarehouseId"
                            placeholder="必填项"
                            style="width:100%;"
                          >
                            <el-option
                              v-for="(item,index) in fromData"
                              :key="index"
                              :label="item.name"
                              :value="item.warehouseId"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
            </div>
            <div class="mcard1">
              <div class="mcard">
                <div class="search-wrapper">
                  <h4 class="title">商品清单</h4>
                </div>
                <el-form label-width="100px" size="small">
                  <el-row class="operate mbottom">
                    <el-col :span="7">
                      <!-- <el-button type="primary">仅挑选</el-button> -->
                      <el-button type="primary" size="small" @click="addGoods()">选择商品</el-button>
                      <el-button type="primary" size="small" @click="deleteGoods">删除商品</el-button>
                    </el-col>
                  </el-row>
                  <el-table
                    class="elTable"
                    :data="goodsData"
                    stripe
                    style="width: 100%"
                    border
                    ref="elTables"
                    @selection-change="handleSelectionChange"
                  >
                    <el-table-column type="selection" align="center"></el-table-column>
                    <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
                    <el-table-column label="图样" align="center" width="110">
                      <template slot-scope="scope">
                        <img
                          :src="scope.row.goodsImgUrl"
                          class="showImg"
                          alt
                          v-if="scope.row.goodsImgUrl"
                        />
                        <img
                          src="@/common/images/缺省页.jpg"
                          class="showImg"
                          alt
                          v-if="!scope.row.goodsImgUrl"
                        />
                      </template>
                    </el-table-column>
                    <el-table-column label="商品信息" align="center" width="230">
                      <template slot-scope="scope">
                        <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                        <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                        <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                        <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                        <div class="txt_left">SKU：{{scope.row.skuId}}</div>
                      </template>
                    </el-table-column>

                    <el-table-column label="规格尺寸" align="center" width="150">
                      <template slot-scope="scope">
                        <div>{{scope.row.specSize}}</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="单位" align="center">
                      <template slot-scope="scope">{{scope.row.unit}}</template>
                    </el-table-column>
                    <el-table-column label="库存数量" align="center">
                      <template slot-scope="scope">{{scope.row.balanceCount}}</template>
                    </el-table-column>
                    <el-table-column label="调拨数量" align="center">
                      <template slot-scope="scope">
                        <el-input v-model.number="scope.row.goodsCount" size="small"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column label="单价" align="center">
                      <template slot-scope="scope">{{scope.row.balancePrice}}</template>
                    </el-table-column>
                    <el-table-column label="合计" align="center">
                      <template slot-scope="scope">{{scope.row.balanceTotalPrice}}</template>
                    </el-table-column>
                    <el-table-column label="调拨原因" align="center" width="200">
                      <template slot-scope="scope">
                        <el-input
                          resize="none"
                          type="textarea"
                          size="small"
                          :autosize="{ minRows: 1, maxRows: 5}"
                          placeholder="请输入内容"
                          v-model="scope.row.reason"
                        ></el-input>
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
          <el-button type="danger" @click="_addClose()" size="small">关 闭</el-button>
          <el-button type="primary" @click="_addOrder()" size="small">保存</el-button>
        </span>
      </el-dialog>
      <!-- 新增客户询价添加商品弹窗 -->
      <el-dialog width="68%" :visible.sync="innerVisible" :modal="true" :append-to-body="false">
        <!-- 新增客户询价添加商品选择品牌弹窗 -->

        <div class="mail-fitter">
          <el-form ref="infoForm" :model="form" label-width="100px" size="small">
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
                            <el-input v-model="formData.goodsInfo" placeholder="请输入商品名称/型号/品牌"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="2" :offset="1">
                          <el-button type="primary" size="small" @click="goodsSearch()">查询</el-button>
                        </el-col>
                        <!--   <el-col :span="6">
                            <el-button type="primary" size="small">进入商品管理页面新增或编辑商品</el-button>
                        </el-col>-->
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
                  :data="tableData"
                  stripe
                  style="width: 100%"
                  border
                  ref="elTable"
                  class="goods_index"
                  @selection-change="addSelectionChange"
                >
                  <el-table-column type="selection" align="center"></el-table-column>
                  <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
                  <el-table-column label="图样" align="center" width="120">
                    <template slot-scope="scope">
                      <img
                        :src="scope.row.goodsImgUrl"
                        class="showImg"
                        alt
                        v-if="scope.row.goodsImgUrl"
                      />
                      <img
                        src="@/common/images/缺省页.jpg"
                        class="showImg"
                        alt
                        v-if="!scope.row.goodsImgUrl"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column label="商品信息" align="center" width="300">
                    <template slot-scope="scope">
                      <div>
                        <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                        <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                        <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                        <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                        <div class="txt_left">SKU：{{scope.row.skuId}}</div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="规格尺寸" align="center" width="200">
                    <template slot-scope="scope">
                      <div v-html="scope.row.specSize"></div>
                    </template>
                  </el-table-column>
                  <el-table-column label="单位" align="center">
                    <template slot-scope="scope">{{scope.row.unit}}</template>
                  </el-table-column>
                  <el-table-column label="仓库" align="center">
                    <template slot-scope="scope">{{scope.row.warehouseName}}</template>
                  </el-table-column>
                  <el-table-column label="库存数量" align="center">
                    <template slot-scope="scope">{{scope.row.balanceCount}}</template>
                  </el-table-column>
                  <el-table-column label="单价" align="center">
                    <template slot-scope="scope">{{scope.row.balancePrice}}</template>
                  </el-table-column>
                  <el-table-column label="合计" align="center">
                    <template slot-scope="scope">{{scope.row.balanceTotalPrice}}</template>
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
          </el-form>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="innerVisible =false" size="small">关 闭</el-button>
          <el-button type="primary" @click="saveGoods1()" size="small">保存</el-button>
        </span>
      </el-dialog>
      <!-- 提交调拨单 -->
      <el-dialog width="50%" :visible.sync="auditVisible" :before-close="auditClosing">
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">提交调拨单</h4>
              </div>
            </el-form>
          </div>
        </div>
        <div class="mcard0">
          <div class="mcard">
            <div>
              <el-form ref="infoForm" :model="form" :rules="rules" label-width="125px" size="small">
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="调拨单号：">
                      <span>{{pushData.transferBillNo}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="部门：">
                      <span>{{pushData.departmentName}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="职位：">
                      <span>{{pushData.position}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="提交人：">
                      <span>{{pushData.applyUserName}}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="审批事项：">
                      <span>{{pushData.approvalMatters}}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="23">
                    <el-form-item label="提交理由：">
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 3, maxRows: 4}"
                        placeholder="请填写提交理由"
                        v-model="form.reason"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
        <div class="mcard0">
          <div class="mcard">
            <div>
              <el-form ref="infoForm" :model="form" :rules="rules" label-width="60px" size="small">
                <div class="apply">
                  <div class="applyLeft">提 交 给：</div>
                  <div class="applyRight">
                    <el-row v-for="(item,index) in pushData.audits" :key="index">
                      <el-col :span="8">
                        <el-form-item label="部门：">
                          <el-col :span="20">
                            <el-input v-model="item[0]" readonly></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="姓名：">
                          <el-col :span="20">
                            <el-input v-model="item[1]" readonly></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item label="职位：">
                          <el-col :span="20">
                            <el-input v-model="item[2]" readonly></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <!-- <div class="applyMessage">
                            <span class="ms">部门：<i>总经办</i></span>
                            <span class="ms">姓名：<i>刘总</i></span>
                            <span class="ms">职位：<i>总经理</i></span>
                    </div>-->
                  </div>
                </div>
              </el-form>
              <el-form ref="infoForm" :model="form" :rules="rules" label-width="125px" size="small">
                <el-row>
                  <el-col :span="23">
                    <el-form-item label="截止日期：" prop="limitTime">
                      <el-date-picker
                        v-model="form.limitTime"
                        type="date"
                        placeholder="选择日期"
                        valueFormat="yyyy-MM-dd HH:mm:ss"
                        style="width:100%;"
                        :picker-options="pickerOptions0"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="auditClose" size="small">关 闭</el-button>
          <el-button type="primary" @click="pushAuditSave()" size="small">提交</el-button>
        </span>
      </el-dialog>
      <!-- 删除销售订单 -->
      <el-dialog :visible.sync="deleteVisible" width="20%" title="提示" style="top:20%">
        <div class="mail-fitter" style="padding:20px 0;background:#fff;">
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
          <el-button type="danger" @click="deleteVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteOrder()" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!--删除商品弹框  -->
      <el-dialog :visible.sync="deleteVisible1" width="20%" title="提示" style="top:20%">
        <div class="mail-fitter" style="padding:20px 0;background:#fff;">
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
          <el-button type="danger" @click="deleteVisible1 = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteGoods1()" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 编辑合同 -->
      <EditOrder
        @createCloseE="createClose3"
        @createClosingE="createClosing3"
        @editOrder1="editOrder2"
        :ruleForm="ruleForm"
        :options1="options1"
        :editVisibles="editVisibles"
        :orderDatas="orderDatas"
        :fromData="fromData"
        :toData="toData"
        :sendId="sendId"
      ></EditOrder>
      <!-- 查看合同 -->
      <OrderDetail
        @createCloseD="createClose4"
        @createClosingD="createClosing4"
        :detailVisibles="detailVisibles"
        :orderDatas="orderDatas"
        :fromData="fromData"
        :toData="toData"
      ></OrderDetail>
      <!-- 提交审批 -->
      <AuditContract
        :submitVisibles="submitVisibles"
        :orderDatas="orderDatas"
        :fromData="fromData"
        :toData="toData"
        :sendId="sendId"
        :personData="personData"
        @createCloseAu="createClose7"
        @createClosingAu="createClosing7"
        @signContract="signContract1"
      ></AuditContract>
    </div>
  </div>
</template>

<script>
import { getCategory, getStoreList } from "@/api/public";
import { getAllcustomer } from "@/api/customer";
import { findOrders, downPDF } from "@/api/sale/index";
import {
  getTransferList,
  getTransferGoodsList,
  getStockGoodsList,
  getStorage,
  addStock,
  getStockDetail,
  deleteStockDetail,
  stockAudit,
  pushAudit,
  stockAuditPerson
} from "@/api/storage/index";
import { throttleTipPop } from "@/utils/functions.js";
import { getAllMenu, findByPage } from "@/api/creditmanage/index";
import { getAllOrganizational } from "@/api/permissions/index";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import AccountOrder from "./oreder";
import EditOrder from "./editOrder";
import OrderDetail from "./orderDetail";
import TimeLine from "./timeLine";
import AuditContract from "./auditContract";
export default {
  data() {
    return {
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        }
      },
      deIndex: "",
      dataArr: [],
      salesUser: "",
      mainIndex: "AccountOrder",
      currentIndex: 0,
      contractVisibles: false, //生成合同弹窗
      brandVisible: false, //新增询价单新增商品品牌弹窗
      innerVisible: false, //新增询价单新增商品弹窗
      addVisible: false, //新增询价单弹窗
      customerVisible: false, //新增询价单客户选择弹窗
      editVisibles: false, //编辑销售订单
      deleteVisible: false, //删除销售订单
      deleteVisible1: false, //删除弹框
      detailVisibles: false, //查看询价单
      auditVisible: false, //提交挑拨单弹窗
      submitVisibles: false, //提交审批
      pushData: "", //挑拨单数据
      orderDatas: [], //根据ID获得的销售订单详细
      orderData: [], //销售订单分页数据
      personData: [], //审批页面中推送审核人信息复制
      page: [], //商品明细分页
      count: [], //商品明细总数
      sendId: [],
      getIndex: "",
      closeId: "", //关闭ID
      showId: "",
      closeNo: "",
      deleteId: "",
      salesRepresentatives: "",
      showNo: "", //展示商品列表需要的编号
      /* total:'',//总合计 */
      customerData: [],
      productList: [], //产品清单
      orderPage: "",
      fromData: "", //调出仓库下拉列表
      toData: "", //调入仓库下拉列表
      userList: [],
      //组织架构
      ruleForm: {
        organizeName: "",
        description: "",
        parentId: null,
        organizeId: null
      },
      options1: [],
      // /
      form: {
        bizDate: "", //调拨日期
        bizUserId: "", //调拨员ID
        fromWarehouseId: "", //出库的仓库ID
        toWarehouseId: "", //入库的仓库ID
        arrs: "",
        reason: "", //审核理由
        limitTime: "", //截止时间
        bizUserName: "" //调拨人员
      },
      goodsList: {
        pageIndex: 1,
        pageSize: 10,
        count: 0
      },
      options: [
        {
          value: "all",
          label: "全部"
        },
        {
          value: 0,
          label: "待调拨"
        },
        {
          value: 1,
          label: "已调拨"
        }
      ],
      options1: [],
      options2: [],
      formData: {
        current_page: 1,
        page_size: 2,
        total_count: 0,
        goodsInfo: ""
      },
      selectData: [],
      goodsData: [],
      list: [], //客户列表
      elTable: [],
      tableData: [],
      tableDatas: {
        pageIndex: 1,
        sizes: [10, 20, 50, 100],
        pageSize: 10,
        total: 0,
        fromWarehouseId: "", //调出仓库
        status: "", //状态
        toWarehouseId: "", //调入仓库
        transferBillNo: "", //调拨单号
        businessDate: "", //业务日期
        endTime: "",
        startTime: ""
      },
      rules: {
        partyAAddress: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],
        partyAAddress: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],
        limitTime: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  created() {
    this.getName();
    this._getStorage();
    this._getTransferList();
  },
  watch: {
    goodsData: {
      handler(val) {
        console.log(val);

        if (val.length > 0) {
          for (let i = 0; i < val.length; i++) {
            if (val[i].goodsCount > val[i].balanceCount) {
              throttleTipPop(
                this,
                "error",
                "调拨数量不能大于实际库存数量",
                2000
              );
              val[i].goodsCount = val[i].balanceCount;
            }
          }
        }
      },
      deep: true
    },
    "tableDatas.businessDate": {
      handler(val, old) {
        if (val === null) {
          this.tableDatas.startTime = "";
          this.tableDatas.endTime = "";
        } else {
          this.tableDatas.startTime = val[0];
          this.tableDatas.endTime = val[1];
        }
      },
      deep: true
    },
    //监听组织架构
    "ruleForm.organizeId": {
      handler(val) {
        this.userList = [];
        this.form.bizUserName = "";
        this.form.bizUserId = "";
        if (val) {
          let data = {};
          data.organizeId = val;
          findByPage(data).then(res => {
            this.userList = res.data;
          });
        }
      },
      deep: true
    }
  },
  computed: {
    total1() {
      let totals = 0;
      let _this = this;
      if (_this.goodsData.length > 0) {
        for (var i = 0; i < _this.goodsData.length; i++) {
          if (!isNaN(_this.goodsData[i].balanceTotalPrice)) {
            totals += parseFloat(_this.goodsData[i].balanceTotalPrice);
          } else {
            totals = 0;
          }
        }
      }
      return totals;
    }
  },

  methods: {
    tabIndex(index) {
      this.currentIndex = index;
      switch (index) {
        case 0:
          this.mainIndex = "AccountOrder";
          break;

        default:
          return;
      }
    },
    //搜索
    searchOrder() {
      this.tableDatas.pageIndex = 1;
      this._getTransferList();
      this.resetData();
    },
    //重置数据
    resetData() {
      this.page = [];
      this.count = 0;
      this.closeNo = "";
      this.getIndex = "";
    },
    //获取库间调拨列表分页
    _getTransferList() {
      getTransferList(this.tableDatas).then(res => {
        if (res.data) {
          this.orderData = res.data.pageList;
          this.tableDatas.total = res.data.count;
        } else {
          this.orderData = "";
          this.tableDatas.total = 0;
        }
      });
    },
    _getStorage() {
      getStorage().then(res => {
        this.fromData = res.data;
        this.toData = res.data;
      });
    },
    //获取登录信息中的销售代表
    getName() {
      var books = localStorage.getItem("user"); //得到字符串
      var obj = JSON.parse(books);
      console.log(obj);
      this.form.salesRepresentatives = obj.data.sysuserName;
    },
    //子组件传来的值
    createClose2: function(data) {
      this.contractVisibles = data;
    },
    createClosing2: function(data) {
      this.contractVisibles = data;
    },
    saveContract1(data) {
      this.contractVisibles = data;
      this._getTransferList();
      this.resetData();
    },
    //包门口从吉利蛋
    createClose3: function(data) {
      this.editVisibles = data;
      this.ruleForm = {};
      this.options1 = [];
    },
    createClosing3: function(data) {
      this.editVisibles = data;
      this.ruleForm = {};
      this.options1 = [];
    },
    editOrder2: function(data) {
      this.editVisibles = data;
      this.ruleForm = {};
      this.options1 = [];
      this._getTransferList();
      this.resetData();
    },
    createClose4: function(data) {
      this.detailVisibles = data;
    },
    createClosing4: function(data) {
      this.detailVisibles = data;
    },
    //提交审批
    createClose7(data) {
      this.submitVisibles = false;
    },
    createClosing7: function(data) {
      this.submitVisibles = data;
    },

    signContract1(data) {
      this.submitVisibles = data;
      this._getTransferList();
      this.resetData();
    },
    //关闭新增弹窗
    addClose() {
      this.$confirm("您确认要关闭吗？")
        .then(_ => {
          this.addVisible = false;
          this.ruleForm = {};
          this.options1 = [];
        })
        .catch(_ => {});
    },
    //关闭新增弹窗前
    _addClose() {
      this.$confirm("您确认要关闭吗？")
        .then(_ => {
          this.addVisible = false;
          this.ruleForm = {};
          this.options1 = [];
        })
        .catch(_ => {});
    },
    //关闭提交审批
    auditClose() {
      this.$confirm("您确认要关闭吗？")
        .then(_ => {
          this.auditVisible = false;
        })
        .catch(_ => {});
    },

    auditClosing() {
      this.$confirm("您确认要关闭吗？")
        .then(_ => {
          this.auditVisible = false;
        })
        .catch(_ => {});
    },
    goodsSearch() {
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
    //调拨单审核弹框
    submitAudit(row) {
      this.sendId = row.transferBillId;
      getStorage().then(res => {
        this.fromData = res.data;
        this.toData = res.data;
      });
      getStockDetail(row.transferBillId).then(res => {
        this.orderDatas = res.data;
      });
      stockAuditPerson(row.transferBillId).then(res => {
        if (res.code === 200) {
          this.personData = res.data;
          this.submitVisibles = true;
        }
      });
    },
    //获取商品
    _getGoods() {
      getStockGoodsList(this.formData).then(res => {
        this.tableData = res.data.pageList;
        console.log(this.tableData);

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
      this.showNo = row.transferBillNo;
      this.showId = row.transferBillId;

      let obj = {};
      obj.pageIndex = this.goodsList.pageIndex;
      obj.pageSize = this.goodsList.pageSize;
      obj.transferBillId = row.transferBillId;
      getTransferGoodsList(obj).then(res => {
        this.count = res.data.count;
        this.page = res.data.pageList;
      });
    },
    //新增调拨弹窗
    addStock() {
      this.addVisible = true;
      getStorage().then(res => {
        this.fromData = res.data;
        this.toData = res.data;
      });
      getAllOrganizational().then(res => {
        let arr = [];
        arr.push(res.data);
        this.transleteData(arr, this.options1);
        this.IterationDelateMenuChildren(this.options1);
      });
    },
    transleteData(data, arr) {
      data.forEach(item => {
        if (!item.parentId) {
          item.parentId = 0;
          item.parentName = "所有部门";
        }
        const msg = {
          id: item.organizeId,
          label: item.organizeName,
          value: item.organizeId,
          children: item.childNodes ? [] : null,
          isLeaf: item.childNodes ? false : true
        };
        if (item.childNodes && item.childNodes.length > 0) {
          this.transleteData(item.childNodes, msg.children);
        }
        arr.push(msg);
      });
      return arr;
    },
    IterationDelateMenuChildren(arr) {
      if (arr.length) {
        for (let i in arr) {
          if (arr[i].children.length) {
            this.IterationDelateMenuChildren(arr[i].children);
          } else {
            delete arr[i].children;
          }
        }
      }
      return arr;
    },
    //筛选出下拉表的label值
    chooseWarehousingUser(data) {
      let obj = {};
      obj = this.userList.find(item => {
        return item.sysuserId === data;
      });
      this.form.bizUserName = obj.sysuserName;
    },
    //新增调拨单
    _addOrder() {
      this.form.arrs = this.goodsData;
      addStock(this.form).then(res => {
        if (res.code === 200) {
          this.$message({ message: "新添调拨单成功", type: "success" });
          this.addVisible = false;
          this.ruleForm = {};
          this.options1 = [];
          this._getTransferList();
          this.resetData();
        }
      });
    },

    address() {
      this.addressVisible = true;
    },
    Clicktent(val, data) {
      data.index = val;
      console.log(this.$refs.elTable);
      this.$set(this.$refs.elTable.data);
      this.$forceUpdate();
    },
    //添加商品
    addSelectionChange(row) {
      this.selectData = row;
      let arr = this.selectData;
      arr.forEach(v => {
        v["goodsCount"] = "0";
        v["reason"] = "";
      });
      let copy1 = JSON.parse(JSON.stringify(arr));
      this.selectData = copy1;
    },
    //保存商品选择
    saveGoods1() {
      if (this.goodsData.length >= 1) {
        //遍历判断是否存在相同规格的商品在列表
        var arr = [];
        //如果等于长度就会多出一次循环，就会报错
        for (let i = 0; i < this.goodsData.length; i++) {
          for (let j = 0; j < this.selectData.length; j++) {
            if (this.goodsData[i].skuId == this.selectData[j].skuId) {
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
        arr = this.goodsData.concat(this.selectData);
      } else if (this.goodsData.length <= 0) {
        arr = this.goodsData.concat(this.selectData);
      }
      this.goodsData = arr;

      this.selectData = [];
      this.innerVisible = false;
    },

    //添加商品弹窗
    addGoods() {
      this._getGoods();
      this.innerVisible = true;
    },

    handleSelectionChange(val) {
      if (val[0]) {
        if (val.length > 1) {
          this.$refs.elTables.clearSelection();
          this.$refs.elTables.toggleRowSelection(val.pop());
        } else {
        }
        if (val.length == 1 && this.deIndex === "") {
          val.forEach((val, index) => {
            this.goodsData.forEach((v, i) => {
              // id 是每一行的数据id
              if (val.skuId == v.skuId) {
                this.deIndex = i;
                console.log(this.deIndex);
              }
            });
          });
        }
      } else if (!val[0]) {
        this.deIndex = "";
      }
    },
    //选择删除
    deleteGoods() {
      if (this.deIndex === "") {
        throttleTipPop(this, "warning", "请选择要删除的选项", 2000);
      } else {
        this.deleteVisible1 = true;
      }
    },
    deleteGoods1() {
      if (this.deIndex !== "") {
        this.goodsData.splice(this.deIndex, 1);
        throttleTipPop(this, "success", "删除操作成功", 2000);
        this.deIndex = "";
        this.$refs.elTables.clearSelection();
        this.deleteVisible1 = false;
      } else {
        return false;
      }
    },
    //删除销售订单弹窗
    deleteData(row) {
      this.deleteVisible = true;
      this.deleteId = row.transferBillId;
    },
    //删除销售订单
    deleteOrder() {
      deleteStockDetail(this.deleteId).then(res => {
        if (res.code === 200) {
          throttleTipPop(this, "success", "删除成功", 2000);
          this.deleteVisible = false;
          this._getTransferList();
        }
      });
    },
    //查看详情
    detail(row) {
      getStorage().then(res => {
        this.fromData = res.data;
        this.toData = res.data;
      });
      getStockDetail(row.transferBillId).then(res => {
        this.orderDatas = res.data;
      });
      this.detailVisibles = true;
    },
    //增加PDF
    addPDF() {
      if (this.showId === "") {
        throttleTipPop(this, "warning", "请选择要生成PDF的单据", 2000);
      } else {
        this.$router.push({
          name: "CreatePdf",
          query: { id: this.showId }
        });
      }
    },
    //提交挑拨单
    submitOrder(row) {
      stockAudit(row.transferBillId).then(res => {
        if (res.code === 200) {
          for (let i = 0; i < res.data.audits.length; i++) {
            res.data.audits[i] = res.data.audits[i].split("|");
          }
          this.pushData = res.data;
          this.auditVisible = true;
        }
      });
    },
    //提交推送审核
    pushAuditSave() {
      let obj = {};
      obj.orderId = this.pushData.transferBillId;
      obj.reason = this.form.reason;
      obj.limitTime = this.form.limitTime;
      pushAudit(obj).then(res => {
        if (res.code === 200) {
          throttleTipPop(this, "success", "提交调拨单成功", 2000);
          this.auditVisible = false;
          this._getTransferList();
        }
      });
    },
    //编辑弹窗
    editOrder(row) {
      this.sendId = row.transferBillId;
      getStorage().then(res => {
        this.fromData = res.data;
        this.toData = res.data;
      });
      getStockDetail(row.transferBillId).then(res => {
        this.orderDatas = res.data;
      });
      getAllOrganizational().then(res => {
        let arr = [];
        arr.push(res.data);
        this.transleteData(arr, this.options1);
        this.IterationDelateMenuChildren(this.options1);
      });
      this.editVisibles = true;
    },
    partyChoose() {
      this.partyVisible = true;
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    getHandleSizeChange(val) {
      this.tableDatas.pageSize = val;
      this.resetData();
      this._getTransferList();
    },
    getHandleCurrentChange(val) {
      this.tableDatas.pageIndex = val;
      this.resetData();
      this._getTransferList();
    },
    handleChange() {}
  },
  components: {
    AccountOrder,
    EditOrder,
    OrderDetail,
    TimeLine,
    AuditContract,
    Treeselect
  }
};
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
#pendingContract2 {
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
    .small-Idiv {
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
  .box {
    margin-left: 12px;
    margin-top: 10px;
  }

  .el-input-group__append button.el-button {
    width: 50px;
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
  .imgitem {
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
    width: 12px; // 横向滚动条
    height: 12px; // 纵向滚动条 必写
  }
  // 滚动条的滑块
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background: #ddd;
    border-radius: 6px;
  }
  /deep/ .el-dialog__headerbtn {
    top: 10px;
  }
  .showImg {
    width: 90px;
    height: 90px;
  }
  .apply {
    .applyLeft {
      float: left;
      margin-left: 19px;
      margin-right: 12px;
      line-height: 30px;
    }
    .applyRight {
      display: inline-block;
      width: 81%;
      .applyMessage {
        width: 100%;
        height: 30px;
        border: 1px solid #dcdfe6;
        line-height: 30px;
        border-radius: 4px;
        margin-bottom: 20px;
        .ms {
          margin-left: 16px;
          width: 110px;
          display: inline-block;
          i {
            font-style: normal;
          }
        }
      }
    }
  }
  .mcard0 {
    border: 1px solid #d7e0f1;
    margin-top: 20px;
  }
  /deep/ .elTable {
    thead {
      .el-table-column--selection {
        .cell {
          display: none;
        }
      }
    }
  }
}
</style>
