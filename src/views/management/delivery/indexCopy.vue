<template>
  <div class="margin">
    <goods-fitter
      class="mbottom"
      @goodsFitter="handleGetGoodsList"
      @tabVender="handleGetGoodsList"
    ></goods-fitter>
    <div class="mcard">
      <div class="mbottom">
        <el-button type="primary" size="small" @click="chooseGoods" style="margin-left:10px">选择商品</el-button>
        <el-button type="primary" size="small" @click="pushList" style="margin-left:10px">批量推送</el-button>
        <el-button type="primary" size="small" @click="deleProductList" style="margin-left:10px">批量删除商品</el-button>
        <el-button type="primary" size="small" @click style="margin-left:10px">批量修改商城价</el-button>
        <el-button type="primary" size="small" @click style="margin-left:10px">批量修改项目VIP价</el-button>
        <el-button type="primary" size="small" @click="toDiscount" style="margin-left:10px">设置商品分类折扣</el-button>
      </div>

      <el-table
            :data="productPushList"
            stripe style="width: 100%" border
            @selection-change="handlepushList"
            ref="pushGoodsList"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
        <el-table-column label="推送状态" align="center">
          <template slot-scope="scope">
            {{ ["未推送", "已推送", "已删除"][scope.row.pushStatus || 0] }}
          </template>
        </el-table-column>
        <el-table-column label="商品图片" align="center">
          <template slot-scope="scope">
            <div class="image" v-if="scope.row.pushGoodsSKUList[scope.row.index || 0].thumbnailImgUrl">
              <img
                  :src="scope.row.pushGoodsSKUList[scope.row.index || 0].thumbnailImgUrl"
                  width="100"
                  height="100"
                  alt
              />
            </div>
            <div v-if="!scope.row.pushGoodsSKUList[scope.row.index || 0].thumbnailImgUrl">暂无图片</div>
          </template>
        </el-table-column>
        <el-table-column label="商品信息" align="center">
          <template slot-scope="scope">
            <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
            <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
            <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
            <div class="txt_left">品牌：{{scope.row.brandName}}</div>
            <div class="txt_left">来源：{{scope.row.gatherIn}}</div>
          </template>
        </el-table-column>
        <el-table-column label="商品规格" align="center">
          <template slot-scope="scope">
            <div style="height: 300px;overflow-y: auto;">
              <div
                    class="txt_left martop"
                    v-for="(item,index) in scope.row.pushGoodsSKUList"
                    :key="index"
              >
                <div
                      class="txt_left imgitem"
                      @click="Clicktentone(index,scope.row)"
                      :class="[index == (scope.row.index || 0) ?'leftbottom':'']"
                >
                  <img
                        src="../../../common/images/商品规格(1).png"
                        alt
                        v-if="index == (scope.row.index || 0)"
                  />
                  <div class="more">{{item.goodsName}}</div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="价格信息" align="center">
          <template slot-scope="scope">
            <div style="height: 300px;overflow-y: auto;">
                <div class="more">商品价格:{{scope.row.pushGoodsSKUList[scope.row.index||0].goodsPrice}}</div>
               <div class="more">市场价:{{scope.row.pushGoodsSKUList[scope.row.index||0].costPrice}}</div>
              </div>
           </template>
        </el-table-column>
        <el-table-column label="利润统计" align="center">
          <template slot-scope="scope"></template>
        </el-table-column>
        <el-table-column label="库存（pcs）" align="center">
          <template slot-scope="scope">
              {{scope.row.pushGoodsSKUList[scope.row.index||0].enableQuantity||0}}件
          </template>
        </el-table-column>
        <el-table-column label="新增日期" align="center" prop="operatorTime"></el-table-column>
        <el-table-column label="商品来源" align="center">
          <template>
            {{['自营','京东','网易','苏宁'][status]}}
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange1"
          @current-change="handleCurrentChange1"
          :current-page="pushProducPagination.number"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="pushProducPagination.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="pushProducPagination.totalPages"
        ></el-pagination>
      </div>
      <!-- 加入项目弹框 -->
      <el-dialog title="操作提示" :visible.sync="dialogFormVisible" width="20%">
        <div style="text-align: center;">
          <img
            src="../../../common/images/提示.png"
            alt
            style="width:28px;margin-right:15px;vertical-align: middle;"
          />
          你确定要把所选的商品加入到{{searchMain?'经销商':' 项目'}}吗
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmation">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 加入项目弹框 -->
    </div>

    <!-- 选择商品 -->
    <el-dialog :visible.sync="dialogGoodsVisible" width="80%">
      <div class="mbottom">
        <div class="goods-fitter">
            <div class="search-wrapper">
              <h4 class="title">选择商品</h4>
            </div>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small" :model="form">
            <div class="search-wrapper">
              <h4 class="title"> {{searchMain?'选择经销商':'选择列表'}}</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="8">
                    <el-col :span="24">
                        <el-col>
                          <el-form-item label="经销商名称:" v-if="searchMain">
                            <el-col :span="23" >
                              <el-select  @change="handeleChange" v-model="form.projectId" placeholder="请选择经销商">
                                <el-option
                                        v-for="(item,index) in options"
                                        :key="index"
                                        :label="item.agencyName"
                                        :value="item.agencyId">
                                </el-option>
                              </el-select>
                            </el-col>
                          </el-form-item>
                          <el-form-item label="项目名称:" v-else>
                            <el-col :span="23">
                              <el-select  @change="handeleChange" v-model="form.projectId" placeholder="请选择项目">
                                <el-option
                                        v-for="(item,index) in options"
                                        :key="index"
                                        :label="item.projectName"
                                        :value="item.projectId">
                                </el-option>
                              </el-select>
                            </el-col>
                          </el-form-item>
                        </el-col>
                    </el-col>
                  </el-col>
                  <el-col :span="1" class="btn_right">
                    <el-button type="primary" size="small" @click>确定</el-button>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small" :model="form">
            <div class="search-wrapper">
              <h4 class="title">选择商品</h4>
              <div class="search-base" style="position: relative;left: -20px;">
                <el-row>
                  <el-col :span="6">
                    <el-col>
                      <el-form-item label="一级分类：">
                        <el-col>
                          <el-select
                            v-model="carId1"
                            placeholder="请选择一级分类"
                            @change="carIdFunc($event,1)"
                          >
                            <el-option
                              v-for="item in carArr1"
                              :key="item.catId"
                              :label="item.catName"
                              :value="item.catId"
                            ></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-col>
                      <el-form-item label="二级分类：">
                        <el-col>
                          <el-select
                            v-model="carId2"
                            placeholder="请选择二级分类"
                            @change="carIdFunc($event,2)"
                          >
                            <el-option
                              v-for="item in carArr2"
                              :key="item.catId"
                              :label="item.catName"
                              :value="item.catId"
                            ></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-col>
                      <el-form-item label="三级分类：">
                        <el-col>
                          <el-select
                                  v-model="carId3"
                                  placeholder="请选择三级分类"
                                  @change="carIdFunc($event,3)"
                          >
                            <el-option
                                    v-for="item in carArr3"
                                    :key="item.catId"
                                    :label="item.catName"
                                    :value="item.catId"
                            ></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-col
                      class="btn_right"
                      style="display: inline-block;width: auto !important;margin-bottom: 19px;"
                    >
                      <el-button type="primary" size="small" @click="searchCommodity">查询</el-button>
                    </el-col>
                    <el-col
                      class="btn_right"
                      style="margin-left: 15px;display: inline-block;width: auto !important;"
                    >
                      <el-button type="primary" size="small" @click="addItem">加入列表</el-button>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-col>
                      <el-form-item label="商品信息: ">
                        <el-col>
                          <el-input v-model="form.keyword" placeholder="请输入商品信息"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-col>
                      <el-form-item label="商品来源：">
                        <el-col>
                          <el-select v-model="form.sourceType" placeholder="请选择商品来源" @change="handlechange">
                            <el-option
                              v-for="(item,index) in commoditysource"
                              :key="index"
                              :label="item.name"
                              :value="item.id"
                            ></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
              </div>
              <div style="margin: 0 20px 20px 0;">
                <el-table
                  :data="tableData"
                  stripe
                  style="width: 100%"
                  border
                  ref="elTable"
                  @select="choose"
                  @select-all="chooseAll"
                  v-loading="loading1"
                  element-loading-text="拼命加载中"
                  element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.8)"
                >
                  <el-table-column type="selection" align="center"></el-table-column>
                  <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
                  <el-table-column label="图样" align="center">
                    <template slot-scope="scope">
                      <div class="image" v-if="scope.row.skuInfo[scope.row.index].thumbnailImgUrl">
                        <img
                          :src="scope.row.skuInfo[scope.row.index].thumbnailImgUrl"
                          width="100"
                          height="100"
                          alt
                        />
                      </div>
                      <div v-if="!scope.row.skuInfo[scope.row.index].thumbnailImgUrl">暂无图片</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="商品信息" align="center">
                    <template slot-scope="scope">
                      <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
                      <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                      <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                      <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="规格尺寸" align="center">
                    <template slot-scope="scope">
                      <div style="height: 300px;overflow-y: auto;">
                        <div
                          class="txt_left martop"
                          v-for="(item,index) in scope.row.skuInfo"
                          :key="index"
                        >
                          <div
                            class="txt_left imgitem"
                            @click="Clicktent(index,scope.row)"
                            :class="[index == scope.row.index?'leftbottom':'']"
                          >
                            <img
                              src="../../../common/images/商品规格(1).png"
                              alt
                              v-if="index == scope.row.index"
                            />
                            <div class="more">{{item.goodsSpecValues}}</div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="价格信息" align="center" width="150">
                    <template slot-scope="scope">
                      <div class="txt_left">
                        商城价：{{scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice !=
                        0?scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice:'暂无'}}
                      </div>
                      <div class="txt_left">
                        市场价：{{scope.row.skuInfo[scope.row.index].priceInfo.marketPrice !=
                        0?scope.row.skuInfo[scope.row.index].priceInfo.marketPrice:'暂无'}}
                      </div>
                      <div class="txt_left">
                        税率：{{scope.row.skuInfo[scope.row.index].priceInfo.taxRate !=
                        0?scope.row.skuInfo[scope.row.index].priceInfo.taxRate+'%':'暂无'}}
                      </div>
                      <div class="txt_left">
                        一件代发价：
                        <span
                          class="blue"
                          v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0"
                        >{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice}}</span>
                        <span
                          v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice == 0"
                        >不支持一件代发</span>
                      </div>
                      <div class="txt_left">
                        运费：{{scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice !=
                        0?scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice:scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice
                        == ''?'含运费':'含运费'}}
                      </div>
                      <div class="txt_left">
                        京东价：{{scope.row.skuInfo[scope.row.index].priceInfo.jdPrice !=
                        0?scope.row.skuInfo[scope.row.index].priceInfo.jdPrice:'暂无'}}
                      </div>
                      <div class="txt_left">
                        市场价对比京东折扣率：{{scope.row.skuInfo[scope.row.index].priceInfo.costJdRatio !=
                        0?scope.row.skuInfo[scope.row.index].priceInfo.costJdRatio:'暂无'}}
                      </div>
                      <div class="txt_left">
                        商城价对比京东折扣率：{{scope.row.skuInfo[scope.row.index].priceInfo.shopJdRatio !=
                        0?scope.row.skuInfo[scope.row.index].priceInfo.shopJdRatio:'暂无'}}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="集采/批发价" align="center" width="150">
                    <template slot-scope="scope">
                      <div
                              class="txt_left"
                              v-for="(item,index) in scope.row.skuInfo[scope.row.index].volumeInfo.volumePrices"
                              :key="index"
                      >
                        <div class="txt_left">{{item.volumeNumber}}</div>
                        <div class="txt_left">{{item.volumeCost}}</div>
                        <div class="txt_left">{{item.volumeCarriage}}</div>
                      </div>
                      <div class="txt_left">
                        对外PPT价格：
                        <span class="blue">{{scope.row.skuInfo[scope.row.index].volumeInfo.pptPrice}}</span>
                      </div>
                      <div class="txt_left">
                        对外最低报价：
                        <span class="blue">{{scope.row.skuInfo[scope.row.index].volumeInfo.minimumPrice}}</span>
                      </div>
                      <div class="txt_left">
                        给我司的特惠价：
                        <span
                                class="blue">{{scope.row.skuInfo[scope.row.index].volumeInfo.preferentialPrice}}</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="利润统计" align="center" width="140">
                    <template slot-scope="scope">
                      <div
                        class="txt_left"
                      >毛利润：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfit}}</div>
                      <div
                        class="txt_left"
                      >毛利润率：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMargin*100}}%</div>
                      <div
                        class="txt_left"
                      >税费：{{scope.row.skuInfo[scope.row.index].financeInfo.taxation}}</div>
                      <div
                        class="txt_left"
                      >税后毛利：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitTax}}</div>
                      <div
                        class="txt_left"
                      >税后毛利率：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMarginTax*100}}%</div>
                      <div
                        class="txt_left"
                      >企业所得税：{{scope.row.skuInfo[scope.row.index].financeInfo.incomeTax}}</div>
                      <div
                        class="txt_left"
                      >纯利润：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfit}}</div>
                      <div
                        class="txt_left"
                      >纯利率：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfitMargin*100}}%</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="商品分类" align="center"></el-table-column>
                  <el-table-column label="商品来源" align="center" prop="goodsType">
                    <template>
                      {{['自营','京东','网易','苏宁'][status]}}
                    </template>
                  </el-table-column>
                </el-table>
                <div class="pagination" style="text-align: right; margin-top: 20px;">
                  <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="tableDataPagination.pageIndex"
                    :page-sizes="[10, 30, 50, 100]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableDataPagination.count"
                  ></el-pagination>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </el-dialog>

    <!--推送弹框-->
    <el-dialog title="提示" :visible.sync="pushDialogVisible" width="80%">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="150px" size="small">
            <div class="search-wrapper">
              <h4 class="title">选择商品确定</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">{{searchMain?'已选经销商':'已选项目'}}</h4>
              <div class>
                <el-row>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">{{searchMain?'经销商':'项目'}}名称：{{selectedItem.projectName||selectedItem.agencyName}}</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple-light" v-if="!searchMain">客户名称：{{selectedItem.projectName}}</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple"></div>
                    客服电话：{{selectedItem.telNumber||selectedItem.commonContactPhone}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <div class="grid-content bg-purple" v-if="!searchMain">货币单位：{{selectedItem.currencyUnit}}</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple-light">兑换比例：{{selectedItem.exchangeRate||selectedItem.divideRatio+'%'}}</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple" v-if="!searchMain">地址：{{selectedItem.address}}</div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small" :model="form1">
            <div class="search-wrapper">
              <h4 class="title">已选商品</h4>
              <div class="search-base" style="position: relative;left: -20px;">
                <el-row>
                  <el-col :span="6">
                    <el-col>
                      <el-form-item label="一级分类：">
                        <el-col>
                          <el-select
                                  v-model="carId1"
                                  placeholder="请选择一级分类"
                                  @change="carIdFunc($event,1)"
                          >
                            <el-option
                                    v-for="item in carArr1"
                                    :key="item.catId"
                                    :label="item.catName"
                                    :value="item.catId"
                            ></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-col>
                      <el-form-item label="二级分类：">
                        <el-col>
                          <el-select
                                  v-model="carId2"
                                  placeholder="请选择二级分类"
                                  @change="carIdFunc($event,2)"
                          >
                            <el-option
                                    v-for="item in carArr2"
                                    :key="item.catId"
                                    :label="item.catName"
                                    :value="item.catId"
                            ></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-col>
                      <el-form-item label="三级分类：">
                        <el-col>
                          <el-select
                                  v-model="carArr3"
                                  placeholder="请选择三级分类"
                                  @change="carIdFunc($event,3)"
                          >
                            <el-option
                                    v-for="item in carArr3"
                                    :key="item.catId"
                                    :label="item.catName"
                                    :value="item.catId"
                            ></el-option>
                          </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="6">
                    <el-col>
                      <el-form-item label="商品信息: ">
                        <el-col>
                          <el-input v-model="form1.keyword" placeholder="请输入商品信息"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                <el-col :span="16">
                  <el-col
                    class="btn_right"
                    style="display: inline-block;width: auto !important;margin-bottom: 18px;"
                  >
                    <el-button type="primary" size="small" @click="pushSearch">查询</el-button>
                  </el-col>
                  <el-col
                    class="btn_right"
                    style="margin-left: 15px;display: inline-block;width: auto !important;"
                  >
                    <el-button type="primary" size="small" @click="mallPrice()">批量修改商城价</el-button>
                  </el-col>
                  <el-col
                    class="btn_right"
                    style="margin-left: 15px;display: inline-block;width: auto !important;"
                  >
                    <el-button type="primary" size="small" @click="vipPrice()">批量修改项目VIP价</el-button>
                  </el-col>
                  <el-col
                    class="btn_right"
                    style="margin-left: 15px;display: inline-block;width: auto !important;"
                  >
                    <el-button type="primary" size="small" @click="deleProduct">删除商品</el-button>
                  </el-col>
                </el-col>
              </div>
              <div style="margin: 0 20px 20px 0;">
                <el-table
                  :data="selectGoods"
                  stripe
                  style="width: 100%"
                  border
                  ref="multipleTable"
                  @selection-change="handleSelectionChange"
                >
                  <el-table-column type="selection" align="center"></el-table-column>
                  <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
                  <el-table-column label="图样" align="center">
                    <template slot-scope="scope">
                      <div class="image" v-if="scope.row.skuInfo[scope.row.index].thumbnailImgUrl">
                        <img
                          :src="scope.row.skuInfo[scope.row.index].thumbnailImgUrl"
                          width="100"
                          height="100"
                          alt
                        />
                      </div>
                      <div v-if="!scope.row.skuInfo[scope.row.index].thumbnailImgUrl">暂无图片</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="商品信息" align="center">
                    <template slot-scope="scope">
                      <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
                      <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                      <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                      <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                      <div class="txt_left">来源：{{scope.row.gatherIn}}</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="规格尺寸" align="center">
                    <template slot-scope="scope">
                      <div style="height: 300px;overflow-y: auto;">
                        <div
                          class="txt_left martop"
                          v-for="(item,index) in scope.row.skuInfo"
                          :key="index"
                        >
                          <div
                            class="txt_left imgitem"
                            @click="Clicktent(index,scope.row)"
                            :class="[index == scope.row.index?'leftbottom':'']"
                          >
                            <img
                              src="../../../common/images/商品规格(1).png"
                              alt
                              v-if="index == scope.row.index"
                            />
                            <div class="more">{{item.goodsSpecValues}}</div>
                          </div>
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="成本价" align="center">
                    <template slot-scope="scope">
                      <div
                        class="txt_left"
                      >毛利润：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfit}}</div>
                      <div
                        class="txt_left"
                      >毛利润率：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMargin*100}}%</div>
                      <div
                        class="txt_left"
                      >税费：{{scope.row.skuInfo[scope.row.index].financeInfo.taxation}}</div>
                      <div
                        class="txt_left"
                      >税后毛利：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitTax}}</div>
                      <div
                        class="txt_left"
                      >税后毛利率：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMarginTax*100}}%</div>
                      <div
                        class="txt_left"
                      >企业所得税：{{scope.row.skuInfo[scope.row.index].financeInfo.incomeTax}}</div>
                      <div
                        class="txt_left"
                      >纯利润：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfit}}</div>
                      <div
                        class="txt_left"
                      >纯利率：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfitMargin*100}}%</div>
                    </template>
                  </el-table-column>
                  <el-table-column label="商城原价" align="center">
                    <template slot-scope="scope">
                      <div>
                        {{scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice !=
                        0?scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice:'暂无'}}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="项目商城价" align="center" prop="costPrice">
                    <template slot-scope="scope">
                      <div>
                        {{scope.row.skuInfo[0].priceInfo.ratioAdjustMethod ?scope.row.skuInfo[0].priceInfo.ratioAdjustMethod:'未设置'}}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="项目VIP价" align="center" prop="goodsPrice">
                    <template slot-scope="scope">
                      <div>
                        {{scope.row.skuInfo[0].priceInfo.fluctuateAdjustMethod ?scope.row.skuInfo[0].priceInfo.fluctuateAdjustMethod:'未设置'}}
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="利润统计" align="center" width="140">
                    <template slot-scope="scope">
                      <div
                        class="txt_left"
                      >毛利润：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfit}}</div>
                      <div
                        class="txt_left"
                      >毛利润率：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMargin*100}}%</div>
                      <div
                        class="txt_left"
                      >税费：{{scope.row.skuInfo[scope.row.index].financeInfo.taxation}}</div>
                      <div
                        class="txt_left"
                      >税后毛利：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitTax}}</div>
                      <div
                        class="txt_left"
                      >税后毛利率：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMarginTax*100}}%</div>
                      <div
                        class="txt_left"
                      >企业所得税：{{scope.row.skuInfo[scope.row.index].financeInfo.incomeTax}}</div>
                      <div
                        class="txt_left"
                      >纯利润：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfit}}</div>
                      <div
                        class="txt_left"
                      >纯利率：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfitMargin*100}}%</div>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="pagination" style="text-align: right; margin-top: 20px;">
                  <el-pagination
                    @size-change="handleSizeChange2"
                    @current-change="handleCurrentChange2"
                    :page-sizes="[10, 30, 50, 100]"
                    layout="total, prev, pager, next, jumper"
                    :total="checkArr.length"
                  >></el-pagination>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goodsSave" size="small">保 存</el-button>
        <el-button type="danger" @click="goodsDelivery" size="small">推 送</el-button>
      </span>
    </el-dialog>

    <!-- 选择商品 -->
    <!-- 保存弹框 -->
    <el-dialog title="操作提示" :visible.sync="dialogSaveVisible" width="20%">
      <div style="text-align: center;">
        <img
          src="../../../common/images/提示.png"
          alt
          style="width:28px;margin-right:15px;vertical-align: middle;"
        />
        你确定要保存这些商品给所选项目吗？
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogSaveVisible = false">取 消</el-button>
        <el-button type="primary" @click="showr">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 保存弹框 -->
    <!-- 推送弹框 -->
    <el-dialog title="操作提示" :visible.sync="dialogDeliveryVisible" width="20%">
      <div style="text-align: center;">
        <img
          src="../../../common/images/提示.png"
          alt
          style="width:28px;margin-right:15px;vertical-align: middle;"
        />
        你确定要推送这些商品给所选项目吗？
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogDeliveryVisible = false">取 消</el-button>
        <el-button type="primary" @click="determine">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 推送弹框 -->
    <!-- 修改商城价弹框 -->
    <el-dialog :visible.sync="dialogMallVisible" width="50%" class="mallDialog">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="150px" size="small">
            <div class="search-wrapper">
              <h4 class="title">批量修改商城价</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div style>
        <el-form :model="adjustPrice" label-width="120px">
          <el-form-item label="调商城价：">
            <el-radio-group @change="handleTransfer" v-model="adjustPrice.radio">
              <el-radio :label="0">上调</el-radio>
              <el-radio  :label="1">下调</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="调价比例：">
            <el-input v-model="adjustPrice.percentage" style="width:50%;"></el-input>%
          </el-form-item>
          <el-form-item label="增减调价：">
            <el-select
              placeholder="请选择调价方式"
              v-model="adjustPrice.increase"
              @change="handleIncrease"
              style="width: 30%!important;margin-right: 10px;"
            >
              <!--<el-option :label="0">+</el-option>-->
              <!--<el-option :label="1">-</el-option>-->
              <el-option label="+" :value="0"></el-option>
              <el-option label="-" :value="1"></el-option>
            </el-select>
            <el-input v-model="adjustPrice.price" style="width:30%;"></el-input>元
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogMallVisible = false">取 消</el-button>
        <el-button type="primary" @click="allEdit">修 改</el-button>
      </div>
    </el-dialog>
    <!-- 修改商城价弹框 -->
    <!-- 修改VIP价弹框 -->
    <el-dialog :visible.sync="dialogvipVisible" width="50%" class="mallDialog">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="150px" size="small">
            <div class="search-wrapper">
              <h4 class="title">批量修改项目VIP</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div style>
        <el-form ref="form"  label-width="120px"  :model="vipAdjustPrice">
          <el-form-item label="调VIP价：">
            <el-radio-group v-model="vipAdjustPrice.radioVip">
              <el-radio :label="0">上调</el-radio>
              <el-radio :label="1">下调</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="调价比例：">
            <el-input  style="width:50%;" v-model="vipAdjustPrice.percentageVip"></el-input>%
          </el-form-item>
          <el-form-item label="增减调价：">
            <el-select
              placeholder="请选择活动区域"
              style="width: 30%!important;margin-right: 10px;"
              v-model="vipAdjustPrice.increaseVip"
            >
              <el-option label="+" :value="0"></el-option>
              <el-option label="-" :value="1"></el-option>
            </el-select>
            <el-input  style="width:30%;" v-model="vipAdjustPrice.priceVip"></el-input>元
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogvipVisible = false">取 消</el-button>
        <el-button type="primary" @click="allEditVip">修 改</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
// import GoodsFitter from '../goods/goodsFitter'
import GoodsFitter from "./goodsFitter";
import {
  getAddGoodsList,
  getProject,
  getCatagory1,
  productPush,
  changeState,
  getScene,
  deleteAudit,
  saveProduct,
  pushProduct,
  auditRecord,
  deleteProductList,
  getDealer,
  saveDealer     //推送项目
} from "@/api/product/index";
export default {
  data() {
    return {
      goodsList:{
        adjustParams:[],
        createAudit:'',
        agencyId:'',
        customerId:'',
        projectId:"",
      },
      commodity:'',
      status:0,
      loading:true,
      loading1:true,
      adjustPrice: {    //普通价格得修改
        percentage: 0,   //百分比
        price: 0,     //加减
        radio: 0,   //百分比
        increase: 0   //加减
      },
      vipAdjustPrice:{   //修改vip价
        percentageVip:0,   //百分比num
        priceVip: 0,    //加减num
        radioVip:0,   //百分比
        increaseVip: 0   //加减
      },
      commoditysource: [
        {
          name: "自营",
          id: 0
        },
        {
          name: "京东",
          id: 1
        },
        {
          name: "网易",
          id: 2
        },
        {
          name: "苏宁",
          id: 3
        }
      ],
     adjustPrice:{      //修改得商城价
        ratioAdjustMethod: "",
      },
     vipAdjustPrice:{       //修改vip价
      fluctuateAdjustMethod: '',
    },
      pushDialogVisible: false, //确认商品的弹框
      carArr1: [], //一级分类
      carArr2: [], //二级分类
      carArr3: [], //三级分类
      carId1: "", //一级分类id
      carId2: "", //二级分类id
      carId3: "", //三级分类id
      pushProducPagination:{},
      productPushList: [], //已推送的商品
      dialogFormVisible: false, // 加入项目弹框
      dialogGoodsVisible: false, // 选择商品弹框
      dialogSaveVisible: false, // 保存弹框
      dialogDeliveryVisible: false, //推送弹框
      dialogMallVisible: false, // 修改商城价弹框
      dialogvipVisible: false, // 修改VIP价弹框
      notJoin: true,
      join: false,
      search_box: false,
      search_add: false,
      push: false,
      bottomBtn: false,
      textareaValue: "",
      recycleBin: false,
      dialogVisibleaa: false,
      frametextarea: "",
      deleteType: false, //移除
      dialogVisible: false, //审核的弹窗
      goodsTypeId: "", //商品的id
      state: "2", //审核状态
      form1: {
        sourceType: "",
        keyword: "", // 关键字
        catId: ""
      },
      form: {
        isSubstituteSales:true, //是否支持一件代发
        value: "",
        sourceType:0, //  0 0自营  1京东 2网易 3苏宁
        keyword: "", // 关键字
        isReal: 1, //是否是实物。1，是；0，否
        catId: "",
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
      pushForm:{
        sourceType: 0, // 1，京东 2，网易 3，苏宁 4, 一件代发商品 5, 集采商品
        goodsName:'',
        operatorTimeEnd:'',
        operatorTimeStart:'',
        pageNum:1,
        pageSize:10,
        projectId:'',
        pushStatus:'',
        isSubstituteSales:true
      },
      dialog: {
        value1: "",
        value2: ""
      },
      options: [], //项目
      checkList1: [],
      checkList2: [],
      goods: [
        { name: "精品" },
        { name: "新品" },
        { name: "热销" },
        { name: "取消精品" },
        { name: "取消新品" },
        { name: "取消热销" }
      ],
      checked: "",
      scenario: false, //审核记录
      tableData: [],
      tableDataPagination:{},
      getSceneArr: [],
      title: "审核",
      audit: {
        goodsData: "", // 选择商品的data
        auditType: "", //审核类型
        auditId: "", //审核记录ID
        auditRemark: "", //审核说明
        operationId: "", //审核的业务id
        processId: "" //流程ID，主键
      },
      delete_remark: "", // 移除的理由
      selectedData: [],
      checkedAll: "",
      checkArr: [], // 选中的保存
      selectGoods: [], //自制的分页
      index: 0, //分页的下标
      selectedItem: "", //选者的项目
      multipleSelection: [], //选中的商品 数组 对其编辑删除
      createAudit:null,  //true 推送审核  false  保存
      pushIdList:[],   //推送审核 商品
      selectGoodsClone:[],
      searchMain:'',
    };
  },
  watch: {
    pushDialogVisible() {
      if (!this.pushDialogVisible) {
        this.checkArr = [];
      }
    },
  },
  mounted() {
    this.productPush(this.pushForm);
  },
  //三级联动
  async created() {
    this._getCatagory2(1, 0);
  },
  methods: {
    //选择商品批量推送
    handlepushList(val){
      this.pushIdList = val
    },

  //批量删除
    deleProductList(){
      if(this.pushIdList.length<=0) return this.$message("请选择删除的商品")
      let pushIds=[]
      const cancelReason=''
      this.pushIdList.forEach(item=>{
        pushIds.push(item.pushId)
      })
      this.$confirm('确认删除该商品？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const res = await  deleteProductList(pushIds,cancelReason)
        if(res.code === 200 ){
          this.productPush(this.pushForm);
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '删除失败'
        });
      });
    },
  //批量推送
    pushList(){
      if(this.pushIdList.length<=0) return this.$message("请选择推送审核的商品")
      let arrList=[]
      this.pushIdList.forEach(item=>{
        arrList.push(item.pushId)
      })
      const obj={
        agencyId:'',
        pushIds:arrList
      }
      this.$confirm('确认推送商品？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
      const res = await auditRecord(obj)
        if(res.code === 200 ){
          this.productPush(this.pushForm);
          this.$message({
            type: 'success',
            message: '推送成功!'
          });
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消推送'
        });
      });
    },
    //批量修改商城价格
    allEdit() {
      this.multipleSelection.forEach(item => {
        this.selectGoods.forEach((e, i) => {
          if (item.goodsId == e.goodsId) {
            item.skuInfo.forEach(items => {
              if(this.adjustPrice.radio==0&&this.adjustPrice.increase==0){
                items.priceInfo.ratioAdjustMethod = (JSON.parse(items.priceInfo.goodsPrice*(this.adjustPrice.percentage/100+1)))+JSON.parse(this.adjustPrice.price)
              }else if(this.adjustPrice.radio==0&&this.adjustPrice.increase==1){
                items.priceInfo.ratioAdjustMethod =JSON.parse(items.priceInfo.goodsPrice*(1+this.adjustPrice.percentage/100)) - JSON.parse(this.adjustPrice.price)
              }else if(this.adjustPrice.radio==1&&this.adjustPrice.increase==0){
                items.priceInfo.ratioAdjustMethod =JSON.parse(items.priceInfo.goodsPrice*(1-this.adjustPrice.percentage/100))  +JSON.parse(this.adjustPrice.price)
              }else if(this.adjustPrice.radio==1&&this.adjustPrice.increase==1) {
                items.priceInfo.ratioAdjustMethod = JSON.parse(items.priceInfo.goodsPrice * (1 - this.adjustPrice.percentage / 100)) - JSON.parse(this.adjustPrice.price)
              }
              this.goodsList.adjustParams.push(this.adjustPrice)
              console.log(this.adjustPrice)
              // this.goodsList={
              //   adjustParams:[{
              //     adjustPrice:this.adjustPrice
              //   }]
              // }
             setTimeout(()=>{
               this.adjustPrice={
                 percentage:0,
                 price: 0,
                 radio: 0,
                 increase: 0
               }
             })
            });
          }
        });
      });
      this.selectGoods = [...this.selectGoods];
      this.dialogMallVisible = false;
    },
    //批量修改VIP价格
    allEditVip(){
      this.multipleSelection.forEach(item => {
        this.selectGoods.forEach((e, i) => {
          if (item.goodsId == e.goodsId) {
            item.skuInfo.forEach(items => {
                if(this.vipAdjustPrice.radioVip==0&&this.vipAdjustPrice.increaseVip==0&&items.priceInfo.ratioAdjustMethod){
                  items.priceInfo.fluctuateAdjustMethod = (JSON.parse( items.priceInfo.goodsPrice*(this.vipAdjustPrice.percentageVip/100+1)))+JSON.parse(this.vipAdjustPrice.priceVip)
                }else if(this.vipAdjustPrice.radioVip==0&&this.vipAdjustPrice.increaseVip==1&&items.priceInfo.ratioAdjustMethod){
                  items.priceInfo.fluctuateAdjustMethod =JSON.parse(items.priceInfo.goodsPrice*(1+this.vipAdjustPrice.percentageVip/100)) - JSON.parse(this.vipAdjustPrice.priceVip)
                }else if(this.vipAdjustPrice.radioVip==1&&this.vipAdjustPrice.increaseVip==0&&items.priceInfo.ratioAdjustMethod){
                  items.priceInfo.fluctuateAdjustMethod =JSON.parse(items.priceInfo.goodsPrice*(1-this.vipAdjustPrice.percentageVip/100))  +JSON.parse(this.vipAdjustPrice.priceVip)
                }else if(this.vipAdjustPrice.radioVip==1&&this.vipAdjustPrice.increaseVip==1&&items.priceInfo.ratioAdjustMethod) {
                  items.priceInfo.fluctuateAdjustMethod = JSON.parse(items.priceInfo.goodsPrice * (1 - this.vipAdjustPrice.percentageVip / 100)) - JSON.parse(this.vipAdjustPrice.priceVip)
              }
              this.goodsList.adjustParams.push(this.vipAdjustPrice)
              setTimeout(()=>{
                this.vipAdjustPrice={
                  percentageVip:0,
                  priceVip: 0,
                  radioVip: 0,
                  increaseVip: 0
                }
              })
            });
          }
        });
      });
      this.selectGoods = [...this.selectGoods];
      this.dialogvipVisible = false
    },
    //增减调价
    handleIncrease() {},
    //调价商城
    handleTransfer() {},
    // 设置商品分类折扣
    toDiscount(){
       this.$router.push({name:"discount"})
    },
    //确定弹框的删除   //批量删除
    deleProduct() {
      if (this.multipleSelection.length <= 0)
        return this.$message("请选择删处的商品");
      this.multipleSelection.forEach(item => {
        this.selectGoods.forEach((e, i) => {
          if (item.goodsId == e.goodsId) {
            this.selectGoods.splice(i, 1);
          }
        });
      });
      this.$refs.multipleTable.clearSelection();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //查询商品来源
    handlechange(val){
      this.commodity =val
    },

    //选择商品弹框的查询
    searchCommodity() {
      this.status =this.commodity
      this._getGoodsList(this.form);
    },
    //推送的弹框查询
    pushSearch() {
      if(this.form1.keyword==''||this.form1.catId==''){
        this.selectGoods = this.selectGoodsClone
      }
      let selectGood=[]
      this.selectGoodsClone.filter(item => {
        if (item.goodsName.indexOf(this.form1.keyword) !=-1) {
          selectGood.push(item)
        }
        this.selectGoods = selectGood
      });
    },

    //选者的项目或经销商
    handeleChange(val) {
      console.log(val)
      if(this.searchMain){
        this.selectedItem = this.options.find(item => {
          return item.agencyId == val;
        })
      }else{
        this.selectedItem = this.options.find(item => {
          return item.projectId == val;
        });
      }
    },
    //单选
    choose(selection, row) {
      this.deletechecked(row);
      this.checkedAll = false;
    },
    //多选
    chooseAll(selection) {
      this.checkedAll = false;
      if (selection.length) {
        selection.forEach(data => {
          this.checkArr.push(data);
        });
      } else {
        this.tableData.forEach(item => {
          this.deletechecked(item);
        });
      }
    },

    // 删除记忆选择的数据
    deletechecked(data) {
      let index = this.checkArr.indexOf(data);
      if (index != -1) {
        this.checkArr.splice(index, 1);
      } else {
        this.checkArr.push(data);
      }
    },

    // 默认选中
    checkedfunc(arr) {
      let check = this.checkArr;
      let that = this;
      for (var i = 0; i < check.length; i++) {
        for (var j = 0; j < arr.length; j++) {
          if (check[i].goodsId == arr[j].goodsId) {
            this.$refs.elTable.toggleRowSelection(this.tableData[j], true);
          }
        }
      }
    },

    // 选者商品弹窗的分页
    handleSizeChange(val) {
      this.form.page_size = val;
      this._getGoodsList();
    },
    handleCurrentChange(val) {
      this.form.current_page = val;
      this._getGoodsList();
    },

    //推送商品弹窗的分页
    handleSizeChange2(val) {},
    //切换下一页
    handleCurrentChange2(val) {
      this.index = val;
    },
    //获取分类
    carIdFunc(val, index) {
      this.form.catId = val;
      this.form1.catId= val
      this.tableData.catId = val;
      if (index == 1) {
        this.carArr2 = [];
        this.carArr3 = [];
        this.carId2 = "";
        this.carId3 = "";
      }
      if (index == 2) {
        this.carArr3 = [];
        this.carId3 = "";
      }
      this._getCatagory2(val, index);
    },
    _getCatagory2(data, index) {
      console.log()
      let obj = {};
      obj.parentId = data;
      obj.pageIndex = 1;
      obj.pageSize = 0;
      getCatagory1(obj).then(res => {
        if (index == 0) {
          this.carArr1 = res.data.pageList;
        }
        if (index == 1) {
          this.carArr2 = res.data.pageList;
        }
        if (index == 2) {
          this.carArr3 = res.data.pageList;
        }
      });
    },

    //获取已推送的商品
    async productPush(obj) {
      const res = await productPush(obj);
      if (res.code === 200) {
        this.loading=false
        this.productPushList = res.data.content;
        this.pushProducPagination.totalPages = res.data.totalElements;
        this.pushProducPagination.size = res.data.size;
        this.pushProducPagination.number = res.data.number;
      }
    },

    // 加入项目
    addItem() {
      if (this.selectedItem == "") {
        if(this.searchMain){
          this.$message("请选择经销商");
        }else{
          this.$message("请选择项目");
        }
        return false;
      } else if (this.checkArr.length <= 0) {
        this.$message("请选择商品");
        return false;
      }
      this.dialogFormVisible = true;
    },

    //选择商品
    chooseGoods() {
      this._getGoodsList();
      //获取项目
      this.project();
      //this.$router.push({ name: "GoodsDetail" ,query: { id: data.goodsId } });
      this.dialogGoodsVisible = true;
    },
    //获取项目和进销商
    async project(){
        const pageSize = 0
        let res
        if(JSON.parse(localStorage.getItem('user')).data.sysuserAccount=='admin'){
          this.searchMain = true
          res = await getDealer(pageSize)
        }else{
          this.searchMain = false
          res = await getProject(pageSize)
        }
        if (res.code === 200) {
          this.options = res.data.list;
        }
    },

    // 选择商品确认（加入项目确定）
    confirmation() {
      this.$refs.elTable.clearSelection(); //加入项目清空已选中的
      this.dialogFormVisible = false;
      this.pushDialogVisible = true;
      let selectGoods = [];
      for (var goods of this.checkArr) {
        if (goods.skuInfo && goods.skuInfo.length > 1) {
          selectGoods = selectGoods.concat(goods.skuInfo.map(item => {
            const skuInfo = [item];
            return { 
              ...goods,
              skuInfo: skuInfo
            };
          }));
        } else {
          selectGoods.push(goods);
        }
      }
      this.selectGoods = selectGoods;
      this.selectGoodsClone = JSON.parse(JSON.stringify(selectGoods))
    },

    //保存推送公共函数
  async saervePushCommon(){
    this.dialogSaveVisible =false;
    this.dialogDeliveryVisible = false;
    this.dialogGoodsVisible = false;
    this.dialogFormVisible = false
      let goods = [];
      let goodsSkuIds=[];
      let productInfo={};
      this.selectGoods.forEach((item,index)=>{
        let goodsId;
        item.skuInfo.forEach(items=>{
          this.adjustPrice.ratioAdjustMethod = items.priceInfo.ratioAdjustMethod   //项目商城价格
          this.vipAdjustPrice.fluctuateAdjustMethod =items.priceInfo.fluctuateAdjustMethod  //vip价格
        })
        goodsId=item.goodsId;
        goodsSkuIds=item.skuInfo[0].skuId;
        productInfo={
          goodsId,
          goodsSkuIds:[goodsSkuIds]
        };
        goods.push(productInfo);
      });
      this.goodsList = {
        adjustParams: [{
          goods,
        }],
        createAudit:this.createAudit,
        agencyId: this.selectedItem.agencyId, //经销商id
        customerId:this.selectedItem.customerId, //客户id
        projectId: this.selectedItem.projectId//项目id
      };
      let res
      if(this.searchMain){
         res = await saveProduct(this.goodsList ); // 进销商
      }else{
         res = await saveDealer(this.goodsList );   //项目
      }
        if(!this.createAudit){
          if(res.code === 200 ){
            this.productPush(this.pushForm);
              this.$message({
                type:'success',
                message:'保存成功'
              })
            }else{
              this.$message({
                type:'info',
                message:'保存失败'
              })
          }
        }else{
          if(res.code === 200 ){
            this.productPush(this.pushForm);
              this.$message({
                type:'success',
                message:'推送成功'
              })
            }else{
              this.$message({
                type:'info',
                message:'推送失败'
              })
          }
        }
    },

    // 保存弹框
    async goodsSave() {
      this.dialogSaveVisible = true;
    },
    //确认保存推送得商品
    async showr(){
      this.createAudit = false
      this.saervePushCommon(1)
    },
    // 推送弹框
    goodsDelivery() {
      this.dialogDeliveryVisible = true;
    },
    // 推送确定
    determine() {
      this.createAudit = true
      this.saervePushCommon();
    },
    // 批量修改商城价
    mallPrice() {
      if (this.multipleSelection.length <= 0)
        return this.$message("请选择编辑的商品");
        this.dialogMallVisible = true;
    },
    // 批量修改VIP价
    vipPrice() {
      let detection
      detection =  this.selectGoods.filter(item=>{
           return  item.skuInfo.some(items=>{
              return  items.priceInfo.ratioAdjustMethod
        })
      })
    if (this.multipleSelection.length <= 0){
        return this.$message("请选择编辑的商品");
    }else if(detection.length<=0){
      this.$message("请先修改项目商城价")
    }else{
      this.dialogvipVisible = true
    }
    },
    //点击规格展示不同的内容
    Clicktent(val, data) {
      data.index = val;
      this.$set(this.$refs.elTable.data);
    },
    //切换不同的内容
    Clicktentone(val, data) {
        data.index = val;
        this.$set(this.$refs.pushGoodsList, "data", [...this.$refs.pushGoodsList.data]);
    },
    _getGoodsList() {
      console.log(this.form)
      getAddGoodsList(this.form).then(res => {
        this.loading1 = false
        var that = this;
        that.tableData = res.data.pageList;
        that.tableDataPagination.count = res.data.page.pageCount;
        that.tableDataPagination.pageSize = res.data.page.pageSize;
        that.tableDataPagination.pageIndex = res.data.page.pageIndex;
        if (this.checkedAll) {
          this.$nextTick(() => {
            this.checkedAllfunc(this.tableData);
          });
        } else {
          this.$nextTick(() => {
            this.checkedfunc(this.tableData);
          });
        }
      });
    },

    handleGetGoodsList(data,val) {
      this.pushForm = data
      this.status = val
      this.form.sourceType = data.sourceType
      this.productPush(data);
      // this._getGoodsList()
    },
    handleSizeChange1(val) {
      this.pushForm.pageSize = val
      this.productPush(this.pushForm);
    },

    handleCurrentChange1(val) {
      this.pushForm.pageNum = val
      this.productPush(this.pushForm);
    }
  },
  components: {
    GoodsFitter
  }
};
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
.mallDialog .el-dialog {
  background: #ebf4fe !important;
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
    padding-left: 20px;
    padding-top: 5px;
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
.image {
  width: 100px;
  height: 100px;
  font-size: 0;
}
.iconfont {
  font-size: 15px;
  color: white;
}
.gongneng {
  cursor: pointer;
  max-width: 96px;
  height: 32px;
  background: rgba(74, 153, 250, 1);
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  span {
    margin-left: 5px;
  }
}
.small-Idiv {
  width: 32px;
  cursor: pointer;
  span {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(72, 73, 77, 1);
  }
}
.i-div {
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
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
.spanclass {
  position: absolute;
}
.line-top {
  margin-top: 30px;
}
.div_img {
  width: 28px;
  height: 28px;
}
.activity {
  cursor: pointer;
  width: 32px;
  height: 32px;
}
.small_top {
  margin-top: 10px;
  margin-left: 15px;
  margin-right: 15px;
  padding-bottom: 18px;
}
.model {
  color: #f66c6c !important;
}
.goods_num {
  color: #f66c6c !important;
  font-size: 16px;
  margin-right: 5px;
}
.scenario_div {
  display: flex;
  width: 96px;
  height: 32px;
  background: rgba(74, 153, 250, 1);
  border-radius: 16px;
  justify-content: center;
  line-height: 25px;
  img {
    width: 12px;
    height: 12px;
    margin-top: 10px;
  }
  span {
    font-size: 12px;
    font-family: MicrosoftYaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
.leftbottom {
  color: #4a99fa;
  border-bottom: 1px dashed rgba(215, 220, 231, 1);
  padding-bottom: 8px;
}
.more {
  cursor: pointer;
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
.martop {
  margin-top: 10px;
}
.scssfiter {
  background: #ebf4fe;
}
.sceneName {
  width: 100px;
}
.scene_div {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  top: -21px;
}
.el-checkbox {
  margin-right: 0;
  margin-top: 10px;
}
.scenario {
  padding-bottom: 20px;
}
.grid-content {
  line-height: 40px;
}
.el-form-item--small .el-form-item__label {
  width: 60px;
}
</style>
