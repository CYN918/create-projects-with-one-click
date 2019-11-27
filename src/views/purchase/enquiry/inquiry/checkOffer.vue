<template>
  <div id="Offer">
    <el-dialog :visible.sync="detailVisible" width="70%" :before-close="createClosing">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">查看报价</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mail-fitter" style="margin-top:20px">
        <div class="mail-wrapper">
          <h4 class="title1">客户商品</h4>
          <div class="search-base">
              <div class="mbottom">
                <div class="goods-fitter">
                  <div class="mcard" style="padding-bottom:0;">
                    <div class="goodsHeader">
                      <span class="serial">序号</span>
                      <span class="serial" style="display:inline-block;width:9.8%;text-align:center;">图样</span>
                      <span class="serial" style="display:inline-block;width:14.7%;text-align:center;">商品名称</span>
                      <span class="serial" style="display:inline-block;width:11.1%;text-align:center;">品牌</span>
                      <span class="serial" style="display:inline-block;width:11.2%;text-align:center;">型号</span>
                      <span class="serial" style="display:inline-block;width:11.2%;text-align:center;">货号</span>
                      <span class="serial" style="display:inline-block;width:11.7%;text-align:center;">规格尺寸</span>
                      <span class="serial" style="display:inline-block;width:12.1%;text-align:center;">数量</span>
                      <span class="serial" style="display:inline-block;width:14.1%;text-align:center;border-right:1px solid #EBEEF5">制作要求</span>
                    </div>
                    <div class="goodsContent">
                      <div class="content" style="text-align:center;line-height:120px;">1</div>
                      <div class="content" style="width:9.8%;text-align:center;height:120px;padding:10px 0">
                        <img class="goodsImg" :src="goodsList.goodsImgUrl" alt />
                      </div>
                      <div
                        class="content"
                        style="line-height:120px;
                              width:14.7%;text-align:center;"
                            
                      >
                        <span
                          style="display: inline-block;vertical-align: middle;line-height: 20px;"
                        >{{goodsList.goodsName}}</span>
                      </div>
                      <div
                        class="content"
                        style="line-height:120px;
                              width:11.1%;text-align:center;"
                            
                      >
                        <span
                          style="display: inline-block;vertical-align: middle;line-height: 20px;"
                        >{{goodsList.brandName}}</span>
                      </div>
                      <div
                        class="content"
                        style="line-height:120px;
                              width:11.2%;text-align:center;"
                      >
                        <span
                          style="display: inline-block;vertical-align: middle;line-height: 20px;"
                        >{{goodsList.modelNumber}}</span>
                      </div>
                      <div
                        class="content"
                        style="line-height:120px;
                              width:11.2%;text-align:center;"
                      >
                        <span
                          style="display: inline-block;vertical-align: middle;line-height: 20px;"
                        >{{goodsList.goodsSn}}</span>
                      </div>

                      <div
                        class="content"
                        style="line-height:120px;
                              width:11.7%;text-align:center;"
                      >
                        <span
                          style="display: inline-block;vertical-align: middle;line-height: 20px;"
                        >{{goodsList.specSize}}</span>
                      </div>
                      <div
                        class="content"
                        style="line-height:120px;
                            width:12.1%;text-align:center;"
                      >
                        <span
                          style="display: inline-block;vertical-align: middle;line-height: 20px;"
                        >{{goodsList.goodsQuantity}}</span>
                      </div>
                      <div
                        class="content"
                        style="line-height:120px;
                              width:14.1%;text-align:center;border-right:1px solid #EBEEF5"
                      >
                        <span
                          style="display: inline-block;vertical-align: middle;line-height: 20px;"
                        >{{goodsList.productRequire}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>
      <div class="mail-fitter" style="margin-top:20px">
        <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
          <div class="mail-wrapper">
            <h4 class="title1">对应商品</h4>
            <el-row style="margin-left:21px;">
              <el-button type="primary" size="small" @click="addSupplier1()">添加供应商</el-button>
     <!--          <el-button type="primary" size="small" @click="deleteGoods1()">删除供应商</el-button> -->
            </el-row>
            <div class="search-base">
              <div class="mbottom">
                <div class="goods-fitter">
                  <div class="mcard" style="padding-bottom:0">
                    <el-table :data="goodsList.quotes" border style="width: 100%" stripe @selection-change="AhandleSelectionChange">
                      <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                      <el-table-column
                        prop="commonContactName"
                        label="图样"
                        align="center"
                        width="120"
                      >
                        <template slot-scope="scope">
                           <img  :src="scope.row.goodsImgUrl" class="goodsImg" alt="" v-if="scope.row.goodsImgUrl"/>
                          <img  src="@/common/images/缺省页.jpg" class="goodsImg" alt="" v-if="!scope.row.goodsImgUrl"/>
                        </template>
                      </el-table-column>

                      <el-table-column
                        prop="commonContactName"
                        label="性质"
                        align="center"
                        width="80"
                      >
                        <template slot-scope="scope">
                            {{scope.row.companyType}}

                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="commonContactDept"
                        label="供应商名称"
                        align="center"
                        width="100"
                      >
                        <template slot-scope="scope">
                            {{scope.row.supplierName}}

                        </template>
                      </el-table-column>
                      <el-table-column prop="customerType" label="商品信息" align="center" width="180">
                        <template slot-scope="scope">
                          <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                          <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                          <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                          <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                          <div class="txt_left">SKU：{{scope.row.skuId}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="commonContactDept"
                        label="规格尺寸"
                        align="center"
                        width="120"
                      >
                        <template slot-scope="scope">
                        {{scope.row.specSize}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="commonContactDept"
                        label="记录查询"
                        align="center"
                        width="100"
                      >
                        <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="historyOffer(scope.row)">历史报价</el-button>
                            <div class="downButton">
                              <el-button type="primary" size="small" @click="historySale(scope.row)">历史采购</el-button>
                            </div>
                          </template>
                      </el-table-column>
                      <el-table-column
                        prop="commonContactDept"
                        label="税率"
                        align="center"
                        width="80"
                      >
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.taxRate"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="采购数量" align="center" width="80">
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.purchaseQuantity"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="含税成本价" align="center" width="105">
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.taxCostPrice"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="不含税成本价" align="center" width="105">
                        <template slot-scope="scope">
                          <el-input size="small"  v-model="scope.row.notaxCostPrice" readonly></el-input>
                        </template>
                      </el-table-column>                    
                      <el-table-column label="运费" align="center" width="90">
                        <template slot-scope="scope">
                          <el-input size="small"  v-model="scope.row.carriagePrice"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="合计" align="center" width="105">
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.totalPrice" readonly></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="交货日期" align="center" width="160">
                        <template slot-scope="scope">
                              <el-date-picker
                              style="width:100%;"
                              v-model="scope.row.deliveryTime"
                              type="date"
                              size="small"
                              placeholder="选择日期"
                              valueFormat='yyyy-MM-dd HH:mm:ss' 
                              :picker-options="pickerOptions0">
                              
                            </el-date-picker>
                        </template>
                      </el-table-column>
                      <el-table-column label="推荐供应商" align="center" width="100">
                        <template slot-scope="scope">
                          <el-select v-model="scope.row.recommendStatus" placeholder="请选择" size="small">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column label="建议售价" align="center" width="80">
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.suggestedPrice"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="commonContactDept"
                        label="制作要求"
                        align="center"
                        width="150"
                      >
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.productRequire"
                          type="textarea"
                              :autosize="{ minRows: 1, maxRows: 3}"
                             resize=none></el-input>
                        </template>
                      </el-table-column>
                    </el-table>

                   <!--  <div class="pagination">
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="tableDatas.currentPage"
                        :page-sizes="[10,20,50,100]"
                        :page-size="tableDatas.size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="tableDatas.total"
                      ></el-pagination>
                    </div> -->
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="mail-fitter" style="margin-top:20px">
        <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
          <div class="mail-wrapper">
            <h4 class="title1">同类商品</h4>
            <el-row style="margin-left:21px;">
              <el-button type="primary" size="small" @click="addSupplier()">添加供应商</el-button>
         <!--      <el-button type="primary" size="small" @click="deleteGoods2()">删除供应商</el-button> -->
            </el-row>
            <div class="search-base">
              <div class="mbottom">
                <div class="goods-fitter">
                  <div class="mcard" style="padding-bottom:0">
                    <el-table :data="goodsList.similarQuotes" border style="width: 100%" stripe 
                    @selection-change="BhandleSelectionChange">
                      <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                      <el-table-column
                        prop="commonContactName"
                        label="图样"
                        align="center"
                        width="120"
                      >
                        <template slot-scope="scope">
                          <img  :src="scope.row.goodsImgUrl" class="goodsImg" alt="" v-if="scope.row.goodsImgUrl"/>
                          <img  src="@/common/images/缺省页.jpg" class="goodsImg" alt="" v-if="!scope.row.goodsImgUrl"/>
                        </template>
                      </el-table-column>

                      <el-table-column
                        prop="commonContactName"
                        label="性质"
                        align="center"
                        width="80"
                      >
                        <template slot-scope="scope">
                            {{scope.row.companyType}}

                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="commonContactDept"
                        label="供应商名称"
                        align="center"
                        width="100"
                      >
                        <template slot-scope="scope">
                            {{scope.row.supplierName}}

                        </template>
                      </el-table-column>
                      <el-table-column prop="customerType" label="商品信息" align="center" width="180">
                        <template slot-scope="scope">
                          <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                          <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                          <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                          <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                          <div class="txt_left">SKU：{{scope.row.skuId}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="commonContactDept"
                        label="规格尺寸"
                        align="center"
                        width="120"
                      >
                        <template slot-scope="scope">
                        {{scope.row.specSize}}
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="commonContactDept"
                        label="记录查询"
                        align="center"
                        width="100"
                      >
                        <template slot-scope="scope">
                          <el-button type="primary" size="small" @click="historyOffer(scope.row)">历史报价</el-button>
                          <div class="downButton">
                            <el-button type="primary" size="small" @click="historySale(scope.row)">历史采购</el-button>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="commonContactDept"
                        label="税率"
                        align="center"
                        width="80"
                      >
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.taxRate"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="采购数量" align="center" width="80">
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.purchaseQuantity"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="含税成本价" align="center" width="105">
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.taxCostPrice"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="不含税成本价" align="center" width="105">
                        <template slot-scope="scope">
                          <el-input size="small"  v-model="scope.row.notaxCostPrice" readonly></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="运费" align="center" width="90">
                        <template slot-scope="scope">
                          <el-input size="small"  v-model="scope.row.carriagePrice"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="合计" align="center" width="105">
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.totalPrice" readonly></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column label="交货日期" align="center" width="160">
                        <template slot-scope="scope">
                              <el-date-picker
                              style="width:100%;"
                              v-model="scope.row.deliveryTime"
                              size="small"
                              type="date"
                              placeholder="选择日期"
                              valueFormat='yyyy-MM-dd HH:mm:ss' 
                              :picker-options="pickerOptions0">
                            </el-date-picker>
                        </template>
                      </el-table-column>
                      <el-table-column label="推荐供应商" align="center" width="100">
                        <template slot-scope="scope">
                          <el-select v-model="scope.row.recommendStatus" placeholder="请选择" size="small">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </template>
                      </el-table-column>
                      <el-table-column label="建议售价" align="center" width="80">
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.suggestedPrice"></el-input>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="commonContactDept"
                        label="制作要求"
                        align="center"
                        width="150"
                      >
                        <template slot-scope="scope">
                          <el-input size="small" v-model="scope.row.productRequire"
                          type="textarea"
                              :autosize="{ minRows: 1, maxRows: 3}"
                             resize=none></el-input>
                        </template>
                      </el-table-column>
                    </el-table>

                   <!--  <div class="pagination">
                      <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="tableDatas.currentPage"
                        :page-sizes="[10,20,50,100]"
                        :page-size="tableDatas.size"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="tableDatas.total"
                      ></el-pagination>
                    </div> -->
                  </div>
                </div>
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

    <!--  //查看历史报价 -->
    <el-dialog :visible.sync="historyVisible" width="60%" :modal="true" :append-to-body="false">
      <div class="mail-fitter" style="margin-top:20px">
        <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
          <div class="mail-wrapper">
            <h4 class="title1">{{historyTitle}}</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品名称：">
                    <span style="line-heihgt:24px;">{{this.rowData.goodsName}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="品 牌：">
                    <span>{{this.rowData.brandName}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="型 号：">
                    <span>{{this.rowData.modelNumber}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="货 号：">
                    <span>{{this.rowData.goodsSn}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="S K U：">
                    <span>{{this.rowData.skuId}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
      <div class="mail-fitter" style="margin-top:20px">
        <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
          <div class="mail-wrapper">
            <div class="search-base">
              <div class="mbottom">
                <div class="goods-fitter">
                  <div class="mcard" style="padding-bottom:0">
                    <el-table :data="offerList" border style="width: 100%" stripe>
                      <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                      <el-table-column
                        prop="commonContactName"
                        label="图样"
                        align="center"
                        width="125"
                      >
                        <template slot-scope="scope">
                             <img  :src="scope.row.goodsImgUrl" class="goodsImg" alt="" v-if="scope.row.goodsImgUrl"/>
                          <img  src="@/common/images/缺省页.jpg" class="goodsImg" alt="" v-if="!scope.row.goodsImgUrl"/>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="commonContactDept"
                        label="供应商名称"
                        align="center"
                        width="185"
                      >
                        <template slot-scope="scope">
                            {{scope.row.supplierName}}
                        </template>
                      </el-table-column>
                      <el-table-column prop="customerType" label="商品信息" align="center" width="215">
                        <template slot-scope="scope">
                          <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                          <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                          <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                          <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                          <div class="txt_left">SKU：{{scope.row.skuId}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="commonContactDept"
                        label="报价时间"
                        align="center"
                      >
                        <template slot-scope="scope">
                            {{scope.row.quoteTime}}
                        </template>
                      </el-table-column>
                      <el-table-column prop="commonContactDept" label="销售数量" align="center">
                        <template slot-scope="scope">
                              {{scope.row.goodsCount}}
                        </template>
                      </el-table-column>
                      <el-table-column label="含税成本价" align="center">
                        <template slot-scope="scope">
                          {{scope.row.taxCostPrice}}
                        </template>
                      </el-table-column>
                    </el-table>

                    <div class="pagination">
                      <el-pagination
                        @size-change="OhandleSizeChange"
                        @current-change="OhandleCurrentChange"
                        :current-page="historyData.pageIndex"
                        :page-sizes="[10,20,50,100]"
                        :page-size="historyData.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="historyData.count"
                      ></el-pagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="historyVisible=false" size="small">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 查看历史采购 -->
    <el-dialog :visible.sync="saleVisible" width="60%" :modal="true" :append-to-body="false">
      <div class="mail-fitter" style="margin-top:20px">
        <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
          <div class="mail-wrapper">
            <h4 class="title1">{{historyTitle}}</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="12">
                  <el-form-item label="商品名称：">
                    <span style="line-heihgt:24px;">{{this.rowData.goodsName}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="品 牌：">
                    <span>{{this.rowData.brandName}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="型 号：">
                    <span>{{this.rowData.modelNumber}}</span>
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="货 号：">
                    <span>{{this.rowData.goodsSn}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-form-item label="S K U：">
                    <span>{{this.rowData.skuId}}</span>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
      <div class="mail-fitter" style="margin-top:20px">
        <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
          <div class="mail-wrapper">
            <div class="search-base">
              <div class="mbottom">
                <div class="goods-fitter">
                  <div class="mcard" style="padding-bottom:0">
                    <el-table :data="purchaseList" border style="width: 100%" stripe>
                      <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                      <el-table-column
                        prop="commonContactName"
                        label="图样"
                        align="center"
                        width="125"
                      >
                        <template slot-scope="scope">
                             <img  :src="scope.row.goodsImgUrl" class="Img" alt="" v-if="scope.row.goodsImgUrl"/>
                            <img  src="@/common/images/缺省页.jpg" class="Img" alt="" v-if="!scope.row.goodsImgUrl"/>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="commonContactDept"
                        label="供应商名称"
                        align="center"
                        width="185"
                      >
                        <template slot-scope="scope">
                            {{scope.row.supplierName}}
                        </template>
                      </el-table-column>
                      <el-table-column prop="customerType" label="商品信息" align="center" width="215">
                        <template slot-scope="scope">
                          <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                          <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                          <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                          <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                          <div class="txt_left">SKU：{{scope.row.skuId}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column
                        prop="commonContactDept"
                        label="报价时间"
                        align="center"
                      >
                        <template slot-scope="scope">
                            {{scope.row.createTime}}
                        </template>
                      </el-table-column>
                      <el-table-column prop="commonContactDept" label="采购数量" align="center">
                        <template slot-scope="scope">
                              {{scope.row.purchasedQuantity}}
                        </template>
                      </el-table-column>
                      <el-table-column label="含税成本价" align="center">
                        <template slot-scope="scope">
                          {{scope.row.goodsPrice}}
                        </template>
                      </el-table-column>
                    </el-table>

                    <div class="pagination">
                      <el-pagination
                        @size-change="PhandleSizeChange"
                        @current-change="PhandleCurrentChange"
                        :current-page="historyData1.pageIndex"
                        :page-sizes="[10,20,50,100]"
                        :page-size="historyData1.pageSize"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="historyData1.count"
                      ></el-pagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="saleVisible=false" size="small">关 闭</el-button>
      </span>
    </el-dialog>
    <!-- 添加供应商 -->
    <el-dialog :visible.sync="chooseVisible" width="70%" :modal="true" :append-to-body="false">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">添加供应商报价</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mail-fitter" style="margin-top:20px">
        <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
          <div class="mail-wrapper">
            <h4 class="title1">客户商品</h4>
            <div class="search-base">
              <div class="mbottom">
                <div class="goods-fitter">
                  <div class="mcard" style="padding-bottom:0;">
                    <div class="goodsHeader">
                      <span class="serial">序号</span>
                      <span class="serial" style="padding:0 45px;">图样</span>
                      <span class="serial" style="padding:0 60px">商品名称</span>
                      <span class="serial" style="padding:0 53px">品牌</span>
                      <span class="serial" style="padding:0 53px">型号</span>
                      <span class="serial" style="padding:0 53px">货号</span>
                      <span class="serial" style="padding:0 42px;">规格尺寸</span>
                      <span class="serial" style="padding:0 53px">数量</span>
                      <span
                        class="serial"
                        style="padding:0 42px;border-right:1px solid #EBEEF5"
                      >制作要求</span>
                    </div>
                    <div class="goodsContent">
                      <div class="content" style="text-align:center;line-height:120px;">1</div>
                      <div class="content" style="width:119px;height:120px;padding:10px 0 0 10px;">
                        <img class="goodsImg" :src="goodsList.goodsImgUrl" alt />
                      </div>
                      <div
                        class="content"
                        style="line-height:120px;
                              width:177px;
                              padding:0 10px;"
                      >
                        <span
                          style="display: inline-block;vertical-align: middle;line-height: 20px;"
                        >{{goodsList.goodsName}}</span>
                      </div>
                      <div
                        class="content"
                        style="line-height:120px;
                              width:135px;
                              padding:0 10px;"
                      >
                        <span
                          style="display: inline-block;vertical-align: middle;line-height: 20px;"
                        >{{goodsList.brandName}}</span>
                      </div>
                      <div
                        class="content"
                        style="line-height:120px;
                              width:135px;
                              padding:0 10px;"
                      >
                        <span
                          style="display: inline-block;vertical-align: middle;line-height: 20px;"
                        >{{goodsList.modelNumber}}</span>
                      </div>
                      <div
                        class="content"
                        style="line-height:120px;
                              width:135px;
                              padding:0 10px;"
                      >
                        <span
                          style="display: inline-block;vertical-align: middle;line-height: 20px;"
                        >{{goodsList.goodsSn}}</span>
                      </div>

                      <div
                        class="content"
                        style="line-height:120px;
                              width:141px;
                              padding:0 10px;"
                      >
                        <span
                          style="display: inline-block;vertical-align: middle;line-height: 20px;"
                        >{{goodsList.specSize}}</span>
                      </div>
                      <div
                        class="content"
                        style="line-height:120px;
                            width:135px;
                            padding:0 10px;"
                      >
                        <span
                          style="display: inline-block;vertical-align: middle;line-height: 20px;"
                        >{{goodsList.goodsQuantity}}</span>
                      </div>
                      <div
                        class="content"
                        style="line-height:120px;
                              width:142px;
                              padding:0 10px;
                              border-right: 1px solid #ebeef5;"
                      >
                        <span
                          style="display: inline-block;vertical-align: middle;line-height: 20px;"
                        >{{goodsList.productRequire}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="mail-fitter" style="margin-top:20px">
        <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
          <div class="mail-wrapper">
            <h4 class="title1">选择供应商</h4>
                <div>
                          <el-col :span="8">
                            <el-form-item label="商品信息：" prop="brand">
                              <el-input v-model="formData.goodsName1" placeholder="请输入商品名称/型号/品牌"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="2" :offset="1">
                            <el-button type="primary"  size="small" @click="goodsSearch()">查询</el-button>
                          </el-col>
                       
                </div>
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
                <el-table-column label="商品信息" align="center" width="240">
                  <template slot-scope="scope">
                    <div style="height: 180px;overflow: auto;">
                      <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
                      <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                      <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                      <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                      <div
                        class="txt_left"
                      >SKU：{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].skuId}}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="规格尺寸" align="center" width="160">
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
                <el-table-column label="供应商" align="center" width="148">
                  <template
                    slot-scope="scope"
                  >
                      <div class="txt_left">名称：{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].suppliersName}}</div>
                      <div class="txt_left">性质：{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].supplierNature}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="税率" align="center">
                  <template
                    slot-scope="scope"
                  >{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].taxRate}}%</template>
                </el-table-column>
                <el-table-column label="商城价格" align="center" width="160">
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
                      <div class="txt_left">对外最低价格：{{scope.row.minimumPrice}}</div>
                      <div class="txt_left">对我司的特惠价：{{scope.row.preferentialPrice}}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="集采/批发价" align="center" width="160">
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
        </el-form>
      </div>
      <div class="mail-fitter" style="margin-top:20px">
        <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
          <div class="mail-wrapper">
            <div class="search-base">
              <div class="mbottom">
                <div class="goods-fitter">
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
                      <el-table-column label="商品信息" align="center" width="240">
                        <template slot-scope="scope">
                          <div style="height: 180px;overflow: auto;">
                            <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
                            <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                            <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                            <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                            <div
                              class="txt_left"
                            >SKU：{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].skuId}}</div>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="规格尺寸" align="center" width="160">
                        <template slot-scope="scope">
                          <div>{{scope.row.rows.goodsSpecValues}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="供应商" align="center" width="148">
                        <template
                          slot-scope="scope"
                        >
                            <div class="txt_left">名称：{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].suppliersName}}</div>
                            <div class="txt_left">性质：{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].supplierNature}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="税率" align="center">
                        <template
                          slot-scope="scope"
                        >{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].taxRate}}%</template>
                      </el-table-column>
                      <el-table-column label="商城价格" align="center" width="160">
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
                                <div class="txt_left">对外最低价格：{{scope.row.minimumPrice}}</div>
                                <div class="txt_left">对我司的特惠价：{{scope.row.preferentialPrice}}</div>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="集采/批发价" align="center" width="160">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="chooseVisible=false" size="small">关 闭</el-button>
        <el-button type="primary" @click="chooseSupplier()" size="small">保存</el-button>
      </span>
    </el-dialog>
    <!-- 添加供应商1 -->
    <el-dialog :visible.sync="chooseVisible1" width="70%" :modal="true" :append-to-body="false">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">添加供应商报价</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mail-fitter" style="margin-top:20px">
        <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
          <div class="mail-wrapper">
            <h4 class="title1">客户商品</h4>
            <div class="search-base">
              <div class="mbottom">
                <div class="goods-fitter">
                  <div class="mcard" style="padding-bottom:0;">
                    <div class="goodsHeader">
                      <span class="serial">序号</span>
                      <span class="serial" style="padding:0 45px;">图样</span>
                      <span class="serial" style="padding:0 60px">商品名称</span>
                      <span class="serial" style="padding:0 53px">品牌</span>
                      <span class="serial" style="padding:0 53px">型号</span>
                      <span class="serial" style="padding:0 53px">货号</span>
                      <span class="serial" style="padding:0 42px;">规格尺寸</span>
                      <span class="serial" style="padding:0 53px">数量</span>
                      <span
                        class="serial"
                        style="padding:0 42px;border-right:1px solid #EBEEF5"
                      >制作要求</span>
                    </div>
                    <div class="goodsContent">
                      <div class="content" style="text-align:center;line-height:120px;">1</div>
                      <div class="content" style="width:119px;height:120px;padding:10px 0 0 10px;">
                        <img class="goodsImg" :src="goodsList.goodsImgUrl" alt />
                      </div>
                      <div
                        class="content"
                        style="line-height:120px;
                              width:177px;
                              padding:0 10px;"
                      >
                        <span
                          style="display: inline-block;vertical-align: middle;line-height: 20px;"
                        >{{goodsList.goodsName}}</span>
                      </div>
                      <div
                        class="content"
                        style="line-height:120px;
                              width:135px;
                              padding:0 10px;"
                      >
                        <span
                          style="display: inline-block;vertical-align: middle;line-height: 20px;"
                        >{{goodsList.brandName}}</span>
                      </div>
                      <div
                        class="content"
                        style="line-height:120px;
                              width:135px;
                              padding:0 10px;"
                      >
                        <span
                          style="display: inline-block;vertical-align: middle;line-height: 20px;"
                        >{{goodsList.modelNumber}}</span>
                      </div>
                      <div
                        class="content"
                        style="line-height:120px;
                              width:135px;
                              padding:0 10px;"
                      >
                        <span
                          style="display: inline-block;vertical-align: middle;line-height: 20px;"
                        >{{goodsList.goodsSn}}</span>
                      </div>

                      <div
                        class="content"
                        style="line-height:120px;
                              width:141px;
                              padding:0 10px;"
                      >
                        <span
                          style="display: inline-block;vertical-align: middle;line-height: 20px;"
                        >{{goodsList.specSize}}</span>
                      </div>
                      <div
                        class="content"
                        style="line-height:120px;
                            width:135px;
                            padding:0 10px;"
                      >
                        <span
                          style="display: inline-block;vertical-align: middle;line-height: 20px;"
                        >{{goodsList.goodsQuantity}}</span>
                      </div>
                      <div
                        class="content"
                        style="line-height:120px;
                              width:142px;
                              padding:0 10px;
                              border-right: 1px solid #ebeef5;"
                      >
                        <span
                          style="display: inline-block;vertical-align: middle;line-height: 20px;"
                        >{{goodsList.productRequire}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="mail-fitter" style="margin-top:20px">
        <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
          <div class="mail-wrapper">
            <h4 class="title1">选择供应商</h4>
               <!--  <div>
                          <el-col :span="8">
                            <el-form-item label="商品信息：" prop="brand">
                              <el-input v-model="formData1.goodsName1" placeholder="请输入商品名称/型号/品牌"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="2" :offset="1">
                            <el-button type="primary"  size="small" @click="goodsSearch1()">查询</el-button>
                          </el-col>
                       
                </div> -->
                 <div>
                
                        <el-button type="primary" size="small" style="margin-left:20px;" @click="jump">进入商品页面或编辑商品</el-button>
               
                </div>
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
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="white"
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
                <el-table-column label="商品信息" align="center" width="240">
                  <template slot-scope="scope">
                    <div style="height: 180px;overflow: auto;">
                      <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
                      <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                      <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                      <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                      <div
                        class="txt_left"
                      >SKU：{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].skuId}}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="规格尺寸" align="center" width="160">
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
                <el-table-column label="供应商" align="center" width="148">
                  <template
                    slot-scope="scope"
                  >
                      <div class="txt_left">名称：{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].suppliersName}}</div>
                      <div class="txt_left">性质：{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].supplierNature}}</div>
                  </template>
                </el-table-column>
                <el-table-column label="税率" align="center">
                  <template
                    slot-scope="scope"
                  >{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].taxRate}}%</template>
                </el-table-column>
                <el-table-column label="商城价格" align="center" width="160">
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
                      <div class="txt_left">对外最低价格：{{scope.row.minimumPrice}}</div>
                      <div class="txt_left">对我司的特惠价：{{scope.row.preferentialPrice}}</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="集采/批发价" align="center" width="160">
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
                  @size-change="addHandleSizeChange2"
                  @current-change="addHandleCurrentChange2"
                  :current-page="formData1.current_page"
                  :page-sizes="[2, 5, 10, 50]"
                  :page-size="formData1.page_size"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="formData1.total_count"
                ></el-pagination>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="mail-fitter" style="margin-top:20px">
        <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px" size="small">
          <div class="mail-wrapper">
            <div class="search-base">
              <div class="mbottom">
                <div class="goods-fitter">
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
                      <el-table-column label="商品信息" align="center" width="240">
                        <template slot-scope="scope">
                          <div style="height: 180px;overflow: auto;">
                            <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
                            <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                            <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                            <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                            <div
                              class="txt_left"
                            >SKU：{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].skuId}}</div>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="规格尺寸" align="center" width="160">
                        <template slot-scope="scope">
                          <div>{{scope.row.rows.goodsSpecValues}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="供应商" align="center" width="148">
                        <template
                          slot-scope="scope"
                        >
                            <div class="txt_left">名称：{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].suppliersName}}</div>
                            <div class="txt_left">性质：{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].supplierNature}}</div>
                        </template>
                      </el-table-column>
                      <el-table-column label="税率" align="center">
                        <template
                          slot-scope="scope"
                        >{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].taxRate}}%</template>
                      </el-table-column>
                      <el-table-column label="商城价格" align="center" width="160">
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
                                <div class="txt_left">对外最低价格：{{scope.row.minimumPrice}}</div>
                                <div class="txt_left">对我司的特惠价：{{scope.row.preferentialPrice}}</div>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="集采/批发价" align="center" width="160">
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="chooseVisible1=false" size="small">关 闭</el-button>
        <el-button type="primary" @click="chooseSupplier1()" size="small">保存</el-button>
      </span>
    </el-dialog>
    
  </div>
</template>

<script>
import { throttleTipPop } from "@/utils/functions.js";
import { getErpGoods } from "@/api/product/index";
import {purchaseHistory,offerHistory,saveInquiry} from '@/api/purchase/index'

export default {
  data() {
    return {
       pickerOptions0: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
            },
      detailVisible: false,
      historyVisible: false, //推送报价历史
      saleVisible: false, //推送采销历史
      chooseVisible: false, //选择供应商
      chooseVisible1: false, //选择供应商1
      deleteVisible:false,//删除供应商
      offerList:[],//历史报价
      purchaseList:[],//历史采购
      rowData:'',//获取列表数据
      deIndex:'',//删除对应商品的下表
      deIndex1:'',//删除同类商品的下标
      goodsList: "",
      historyTitle: "",
      form: {},
      value: "",
      tableDatas: [],
      tableData: [],//添加对应商品的列表
      tableData1: [],//添加同类商品的列表
      offerData: {},
      formData: {
        current_page: 1,
        page_size: 2,
        total_count: 0,
        goodsName1: "" //
      },
      formData1: {
        current_page: 1,
        page_size: 2,
        total_count: 0,
        goodsName1: "" //
      },
      historyData:{
          pageSize:2,
          pageIndex:1,
          count:0
      },
      historyData1:{
          pageSize:2,
          pageIndex:1,
          count:0
      },
      customerDatas: {
        pageNum: 1,
        pageSize: 10,
        total_count: 0,
        keywords: ""
      },
      goodsDatas: {
        current_page:0,
        page_size: 2,
        conut: 0,
      },
      options: [
        {
          value: 0,
          label: "无"
        },
        {
          value: 1,
          label: "有"
        }
      ],
      inquiryId: [],
      inquiryData: [],
      selectData: [],
      selectData1: [],
      goodsData: [],
      customerData: [],
      list: [], //客户列表
      editDatas: {},
      elTable: [],
      rules: {
        customerContact: [
          { required: true, message: "此项为必填项", trigger:["blur","change"]}
        ],
        offerEndTime: [
          { required: true, message: "此项为必填项", trigger:["blur","change"]}
        ],
        phone: [{ required: true, message: "此项为必填项", trigger:["blur","change"]}],
        customerName: [
          { required: true, message: "此项为必填项", trigger:["blur","change"]}
        ],
        projectName: [
          { required: true, message: "此项为必填项", trigger:["blur","change"]}
        ],
        department: [
          { required: true, message: "此项为必填项", trigger:["blur","change"]}
        ],
        offerDepartment: [
          { required: true, message: "此项为必填项", trigger:["blur","change"]}
        ],
        offerContact: [
          { required: true, message: "此项为必填项", trigger:["blur","change"]}
        ],
        offerPhone: [
          { required: true, message: "此项为必填项", trigger:["blur","change"]}
        ],
        dealDate: [{ required: true, message: "此项为必填项", trigger:["blur","change"]}]
      }
    };
  },
  props: ["detailVisibles", "goodsPage"],
  created() {},
  watch: {
    detailVisibles(val) {
      this.detailVisible = val;
    },
    goodsPage(val) {
      this.goodsList = val;
    },
     
    //监听数组中值变化
    "goodsList.quotes":{
      handler(newVal, oldVal) {
      if(newVal){
        for(let i=0;i<newVal.length;i++){
          if(Number(newVal[i].purchaseQuantity)>=0&&Number(newVal[i].taxCostPrice)>=0){
            newVal[i].totalPrice = Number(newVal[i].purchaseQuantity)*Number(newVal[i].taxCostPrice) + Number(newVal[i].carriagePrice)      
          }
          //计算不含税价
          if(Number(newVal[i].taxRate)>=0&&Number(newVal[i].taxCostPrice>=0)){
              newVal[i].notaxCostPrice = Number(newVal[i].taxCostPrice)/(1+Number(newVal[i].taxRate)/100)   
          }
        }
      }
    },
    deep: true
    },
    "goodsList.similarQuotes":{
      handler(newVal, oldVal) {
      if(newVal){
        for(let i=0;i<newVal.length;i++){
          if(Number(newVal[i].purchaseQuantity)>=0&&Number(newVal[i].taxCostPrice)>=0){
            newVal[i].totalPrice = Number(newVal[i].purchaseQuantity)*Number(newVal[i].taxCostPrice)  + Number(newVal[i].carriagePrice)              
          }   
          //计算不含税价
          if(Number(newVal[i].taxRate)>=0&&Number(newVal[i].taxCostPrice>=0)){
              newVal[i].notaxCostPrice = Number(newVal[i].taxCostPrice)/(1+Number(newVal[i].taxRate)/100)   
          }  
        }
      }
    },
    deep: true
    }
  },
  methods: {
    //关闭页面
    createClose() {
     
       this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                    this.detailVisible = false;
                    this.$emit("createCloseC", this.detailVisible);
                })
                .catch(_ => {});
    },
    createClosing() {
      
      this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                    this.detailVisible = false;
                    this.$emit("createClosingC", this.detailVisible);
                })
                .catch(_ => {});
    },
    //供应商报价保存
    editInquirys() {
      this.goodsList.sigdId = this.goodsList.gdId;
      saveInquiry(this.goodsList).then(res=>{
        if(res.code===200){
            throttleTipPop(this, "success", "供应商报价修改成功", 2000);   
                      
             this.detailVisible = false;
            this.$emit("editInquiryC", this.detailVisible);
        }
      })
     
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
    //添加供应商
    addSupplier() {
      this.chooseVisible = true;
       this._getGoods();
    
    },
     //双击添加商品
    addClick(row) {
      this.index = row.index;
      row["rows"] = row.skuList[this.index];
      row['skuId'] = row.skuList[this.index].skuId;
      //深度克隆
      let copy = JSON.parse(JSON.stringify(row));
      if(this.selectData.length>=1){
            console.log(this.selectData);
            //遍历判断是否存在相同规格的商品在列表
            for(let i= 0 ;i<this.selectData.length;i++){
              if(this.selectData[i].skuId == copy.skuId&&this.selectData[i].goodsId == copy.goodsId){
                  throttleTipPop(this, "error", "已经存在相同规格的商品，不能重复添加！", 2000);
                  return false
              } 
        }
        this.selectData.push(copy);
      }else if(this.selectData.length<=0){
          this.selectData.push(copy);   
      } 
      let arr = this.selectData;
        for(let a=0;a<this.selectData.length;a++){
        arr[a].goodsImgUrl= arr[a].rows.thumbnailImgUrl;
        arr[a].supplierName= arr[a].rows.suppliersName;
        arr[a].companyType= arr[a].rows.supplierNature;
        arr[a].specSize = arr[a].rows.goodsSpecValues;
/*         arr[a].goodsQuantity = ''; */
        arr[a].carriagePrice='0';
        arr[a].recommendStatus = '';
        arr[a].taxRate= arr[a].rows.taxRate||0;
        arr[a].purchaseQuantity='0';
        arr[a].taxCostPrice='0';
        arr[a].notaxCostPrice='0';
        arr[a].totalPrice='0';
        arr[a].deliveryTime='';
        arr[a].suggestedPrice='';
        arr[a].productRequire='';
        arr[a].supplierId=arr[a].rows.supplierId;
    }
      let copy1 = JSON.parse(JSON.stringify(arr));
      this.selectData = copy1;
      console.log(this.selectData);
      
    },
    //双击删除商品
    deleteRow(row) {
      for (var i = 0; i < this.selectData.length; i++) {
        if (this.selectData[i].skuId == row.skuId) {
          this.selectData.splice(i, 1);
          console.log(i);
        }
      }
    },
    
    //保存商品选择
    chooseSupplier() {
      var arr = this.goodsList.similarQuotes.concat(this.selectData);
 
       if(this.goodsList.similarQuotes.length>=1){
            console.log(this.selectData);
            //遍历判断是否存在相同规格的商品在列表
            var arr =[]
            //如果等于长度就会多出一次循环，就会报错
            for(let i= 0 ;i<this.goodsList.similarQuotes.length;i++){
              for(let j= 0 ;j<this.selectData.length;j++){
                if(this.goodsList.similarQuotes[i].skuId == this.selectData[j].skuId){
                    throttleTipPop(this, "error", "已经存在相同规格的商品，不能重复添加！", 2000);
                    return false
                }
              } 
        }
       arr= this.goodsList.similarQuotes.concat(this.selectData);  
      }else if(this.goodsList.similarQuotes.length<=0){
         arr= this.goodsList.similarQuotes.concat(this.selectData);  
      } 
      this.goodsList.similarQuotes = arr;

      this.selectData = [];
      this.chooseVisible = false;
    },
    
    //获取当前index
     BhandleSelectionChange(val) {
      val.forEach((val, index) => {
　　　　　　this.goodsList.similarQuotes.forEach((v, i) => {
　　　　　　　// id 是每一行的数据id
            if(val.skuId == v.skuId){
              console.log(i);
              this.deIndex = i
            }
          })
        }) 
    },
   /*   //选择删除
    deleteGoods2() {
          this.goodsList.similarQuotes.splice(this.deIndex, 1);
    
    }, */
    //搜索商品
    goodsSearch(){
      this.formData.current_page = 1;
      this._getGoods();
    },
    goodsSearch1(){
      this.formData1.current_page = 1;
      getErpGoods(this.formData1).then(res => {
        this.tableData1 = res.data.pageList;
        this.formData1.total_count = res.data.count;

      });
    },
    //添加供应商1
    addSupplier1() {
      this.chooseVisible1 = true;
        let obj ={}
        obj.nameKey = this.goodsList.goodsName;
        obj.current_page = this.formData1.current_page;
        obj.page_size = this.formData1.page_size;
       getErpGoods(obj).then(res => {
        this.tableData1 = res.data.pageList;
        this.formData1.total_count = res.data.count;

      });
    },
      //双击添加商品
    addClick1(row) {
      this.index = row.index;
      row["rows"] = row.skuList[this.index];
      row['skuId'] = row.skuList[this.index].skuId;
      //深度克隆
      let copy = JSON.parse(JSON.stringify(row));
      if(this.selectData1.length>=1){
            //遍历判断是否存在相同规格的商品在列表
            for(let i= 0 ;i<this.selectData1.length;i++){
              if(this.selectData1[i].skuId == copy.skuId&&this.selectData1[i].goodsId == copy.goodsId){
                  throttleTipPop(this, "error", "已经存在相同规格的商品，不能重复添加！", 2000);
                  return false
              } 
        }
        this.selectData1.push(copy);
      }else if(this.selectData.length<=0){
          this.selectData1.push(copy);   
      } 
      let arr = this.selectData1;
        for(let a=0;a<this.selectData1.length;a++){
        arr[a].goodsImgUrl= arr[a].rows.thumbnailImgUrl;
        arr[a].supplierName= arr[a].rows.suppliersName;
        arr[a].companyType= arr[a].rows.supplierNature;
        arr[a].specSize = arr[a].rows.goodsSpecValues;
/*         arr[a].goodsQuantity = ''; */
         arr[a].carriagePrice='0';
        arr[a].recommendStatus = '';
        arr[a].taxRate= arr[a].rows.taxRate||0;
        arr[a].purchaseQuantity='0';
        arr[a].taxCostPrice='0';
        arr[a].notaxCostPrice='0';
        arr[a].totalPrice='0';
        arr[a].deliveryTime='';
        arr[a].suggestedPrice='';
        arr[a].productRequire='';
        arr[a].supplierId=arr[a].rows.supplierId;
    }
      let copy1 = JSON.parse(JSON.stringify(arr));
      this.selectData1 = copy1;
      
    },
    //双击删除商品
    deleteRow1(row) {
      for (var i = 0; i < this.selectData1.length; i++) {
        if (this.selectData1[i].skuId == row.rows.skuId) {
          this.selectData1.splice(i, 1);
        }
      }
    },
    
    //保存商品选择
    chooseSupplier1() {
      var arr = this.goodsList.quotes.concat(this.selectData1);
 
       if(this.goodsList.quotes.length>=1){
            console.log(this.selectData1);
            //遍历判断是否存在相同规格的商品在列表
            var arr =[]
            //如果等于长度就会多出一次循环，就会报错
            for(let i= 0 ;i<this.goodsList.quotes.length;i++){
              for(let j= 0 ;j<this.selectData1.length;j++){
                if(this.goodsList.quotes[i].skuId == this.selectData1[j].skuId){
                    throttleTipPop(this, "error", "已经存在相同规格的商品，不能重复添加！", 2000);
                    return false
                }
              } 
        }
       arr= this.goodsList.quotes.concat(this.selectData1);  
      }else if(this.goodsList.quotes.length<=0){
         arr= this.goodsList.quotes.concat(this.selectData1);  
      } 
      this.goodsList.quotes = arr;
      console.log(this.goodsPage.quotes);
      

      this.selectData1 = [];
      this.chooseVisible1 = false;
    },
    
    //获取当前index
     AhandleSelectionChange(val) {
      val.forEach((val, index) => {
　　　　　　this.goodsList.quotes.forEach((v, i) => {
　　　　　　　// id 是每一行的数据id
            if(val.skuId == v.skuId){
              console.log(i);
              this.deIndex1 = i
            }
          })
        }) 
    },
    /*  //选择删除
    deleteGoods1() {
          this.goodsList.quotes.splice(this.deIndex1, 1);
    
    }, */
    _offerHistory(){
       let obj={}
      obj.pageSize = this.historyData.pageSize;
      obj.pageIndex = this.historyData.pageIndex;
      obj.goodsId = this.rowData.goodsId;
      obj.supplierId =  this.rowData.supplierId;
      obj.skuId = this.rowData.skuId;
       offerHistory(obj).then(res=>{
          this.offerList =  res.data.pageList;
          this.historyData.count =  res.data.count;       
      })
    },
    //历史报价
    historyOffer(row) {
      this.rowData = row;
      this.historyTitle = "历史报价记录";
      this._offerHistory();
      this.historyVisible = true;
    },
    _purchaseHistory(){
         let obj={}
      obj.pageSize = this.historyData1.pageSize;
      obj.pageIndex = this.historyData1.pageIndex;
      obj.goodsId =  this.rowData.goodsId;
      obj.supplierId =  this.rowData.supplierId;
      obj.skuId = this.rowData.skuId;
       purchaseHistory(obj).then(res=>{
          this.purchaseList =  res.data.pageList;
          this.historyData1.count =  res.data.count; 
        
      })
    },
    //历史采购
    historySale(row) {
      this.rowData = row;
      this.historyTitle = "历史采购记录";
      this._purchaseHistory();
      this.saleVisible = true;
      
    },
    //跳转
     jump(){
      let routeData = this.$router.resolve({
        name: "ProductList",
      });
      window.open(routeData.href, '_blank');
      
    },
    Clicktent(val, data) {
      data.index = val;
      console.log(this.$refs.elTable);
      this.$set(this.$refs.elTable.data);
      this.$forceUpdate();
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
     //换页
    addHandleSizeChange2(val) {
      this.formData1.page_size = val;
        let obj ={}
        obj.nameKey = this.goodsList.goodsName;
        obj.current_page = this.formData1.current_page;
        obj.page_size = this.formData1.page_size;
       getErpGoods(obj).then(res => {
        this.tableData1 = res.data.pageList;
        this.formData1.total_count = res.data.count;

      });
    },
    //换页
    addHandleCurrentChange2(val) {
      this.formData1.current_page = val;
        let obj ={}
        obj.nameKey = this.goodsList.goodsName;
        obj.current_page = this.formData1.current_page;
        obj.page_size = this.formData1.page_size;
       getErpGoods(obj).then(res => {
        this.tableData1 = res.data.pageList;
        this.formData1.total_count = res.data.count;

      });
    },
     OhandleCurrentChange(val) {
        this.historyData.pageIndex = val;
        this._offerHistory(); 
     },
    OhandleSizeChange(val) {
        this.historyData.pageSize = val;
        this._offerHistory(); 
    },
      PhandleCurrentChange(val) {
       this.historyData1.pageIndex = val;
        this._purchaseHistory(); 
     },
    PhandleSizeChange(val) {
         this.historyData1.pageSize = val;
        this._purchaseHistory(); 
    },
    handleSelectionChange() {},
    handleCurrentChange() {},
    handleSizeChange() {}
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
#Offer {
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
        margin-bottom: 10px;
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
  .downButton {
    margin-top: 10px;
  }
  .goodsImg {
    width: 100px;
    height: 100px;
  }
  .goodsHeader {
    .serial {
      padding: 0 10px;
      line-height: 48px;
      border: 1px solid #ebeef5;
      border-right: 0;
      background: #f7faff;
      display: inline-block;
      height: 48px;
    }
  }
  .goodsContent {
    overflow: hidden;

    .content {
      width: 49px;
      border-left: 1px solid #ebeef5;
      border-bottom: 1px solid #ebeef5;
      display: inline-block;
      float: left;
      height: 120px;
    }
  }
  .mcard1 {
    border: 1px solid #d7e0f1;
    margin-top: 20px;
  }
  .imgitem{
      cursor: pointer;
    }
    .leftbottom {
        color: #4a99fa;
        border-bottom: 1px dashed rgba(215, 220, 231, 1);
        padding-bottom: 8px;
      }
      /deep/ .el-dialog__headerbtn{
      top:10px;
    }
    .Img{
      width:100px;
      height:100px;
    }
    // 滚动条的宽度
  /deep/ .el-table__body-wrapper::-webkit-scrollbar {
    width: 12px; // 横向滚动条
    height: 12px; // 纵向滚动条 必写
  }
  // 滚动条的滑块
  /deep/ .el-table__body-wrapper::-webkit-scrollbar-thumb {
    background-color: #ddd;
    border-radius: 5px;
  }
}
</style>