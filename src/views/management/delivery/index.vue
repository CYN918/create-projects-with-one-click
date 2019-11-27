<template>
  <div class="margin margin1">
    <goods-fitter
      class="mbottom"
      @goodsFitter="handleGetGoodsList"
      @tabVender="handleGetGoodsList"
    ></goods-fitter>
    <div class="mcard">
      <div class="mbottom">
        <el-button type="primary" size="small" @click="chooseGoods" style="margin-left:10px" >选择商品</el-button>
        <el-button type="primary" size="small" @click="pushList" style="margin-left:10px" >批量推送</el-button>
        <el-button type="primary" size="small" @click="deleProductList" style="margin-left:10px" >批量删除商品</el-button>
        <el-button type="primary" size="small" @click="batchModifyMall" style="margin-left:10px" v-if="notMasterSystem">批量修改商城价</el-button>
        <el-button type="primary" size="small" @click="batchModifyMallVip" style="margin-left:10px" v-if="notMasterSystem">批量修改项目VIP价</el-button>
        <el-button type="primary" size="small" @click="toDiscount" style="margin-left:10px" v-if="notMasterSystem">设置商品分类折扣</el-button>
      </div>
      <el-table
              :data="productPushList"
              stripe style="width: 100%" border
              @selection-change="handlepushList"
              ref="pushGoodsList"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="white"
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
                  <div class="more" v-for="items in JSON.parse(item.specs)">
                    {{items.specName}}:{{items.specValue}}
                  </div>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="价格信息" align="center">
          <template slot-scope="scope">
            <div>
              <div>
                <div class="more txt_left">
                  商城价格:{{collectingIndex==1?(scope.row.pushGoodsSKUList[scope.row.index||0].volumePrices?scope.row.pushGoodsSKUList[scope.row.index||0].volumePrices[0].volumePrice
                  :'暂无'):scope.row.pushGoodsSKUList[scope.row.index||0].goodsPrice}}元
                </div>
                <div class="more txt_left">市场价:{{scope.row.pushGoodsSKUList[scope.row.index||0].costPrice}}元</div>
                <div class="txt_left">
                  运费：{{scope.row.pushGoodsSKUList[scope.row.index||0].configureVo?scope.row.pushGoodsSKUList[scope.row.index||0].configureVo.carriagePrice!=0?scope.row.pushGoodsSKUList[scope.row.index||0].configureVo.carriagePrice:'含运费':'含运费'}}
                </div>
                <div class="more txt_left">税率：12%</div>
              </div>
              <div class="more txt_left">
                商城调价:{{scope.row.pushGoodsSKUList[scope.row.index||0].goodsAdjustPrice?scope.row.pushGoodsSKUList[scope.row.index||0].goodsAdjustPrice+'元':'未调整'}}
              </div>
              <div class="more txt_left">
                vip调价:{{scope.row.pushGoodsSKUList[scope.row.index||0].vipGoodsAdjustPrice?scope.row.pushGoodsSKUList[scope.row.index||0].vipGoodsAdjustPrice+'元':'未调整'}}
              </div>
              <div v-if="!notMasterSystem">
                <div class="txt_left">
                  京东价：{{scope.row.pushGoodsSKUList[scope.row.index||0].configureVo?scope.row.pushGoodsSKUList[scope.row.index||0].configureVo.jdPrice
                  !=0?scope.row.pushGoodsSKUList[scope.row.index||0].configureVo.jdPrice:'暂无':'暂无'}}
                </div>
                <div class="txt_left">
                  天猫价格：{{scope.row.pushGoodsSKUList[scope.row.index||0].configureVo?scope.row.pushGoodsSKUList[scope.row.index||0].configureVo.tmallPrice?scope.row.pushGoodsSKUList[scope.row.index||0].configureVo.tmallPrice:'暂无':'暂无'}}
                </div>
              </div>
            </div>
           </template>
        </el-table-column>
        <el-table-column label="利润统计" align="center">
          <template slot-scope="scope">
            <div class="more txt_left"> 毛利润：8.8</div>
            <div class="more txt_left">毛利润率：44%</div>
            <div class="more txt_left">税费： 1.13</div>
            <div class="more txt_left">税后毛利：7.67</div>
            <div class="more txt_left">税后毛利率：39%</div>
          </template>
        </el-table-column>
        <el-table-column label="集采" align="center">
          <template slot-scope="scope">
            <div v-if="notMasterSystem" class="more txt_left">
              <div class="more txt_left">
                批发价：{{scope.row.pushGoodsSKUList[scope.row.index||0].volumePrices?scope.row.pushGoodsSKUList[scope.row.index||0].volumePrices[0].volumeCost:'暂无'}}
              </div>
              <div class="more txt_left">
                起订量：{{scope.row.pushGoodsSKUList[scope.row.index||0].volumePrices?scope.row.pushGoodsSKUList[scope.row.index||0].volumePrices[0].volumeNumber:'暂无'}}
              </div>
              <div class="more txt_left">
                运费：
                {{
                scope.row.pushGoodsSKUList[scope.row.index||0].volumePrices?
                scope.row.pushGoodsSKUList[scope.row.index||0].volumePrices[0].volumeCarriage:'暂无'
                }}
              </div>
            </div>
            <div v-if="!notMasterSystem">
              <div v-for="(items,index) in scope.row.pushGoodsSKUList[scope.row.index||0].volumePrices">
                  <div class="more txt_left"> 起订量{{index+1}}：{{items.volumeNumber}}</div>
                  <div class="more txt_left"> 批发价{{index+1}}：{{items.volumeCost}}</div>
                  <div class="more txt_left"> 运费{{index+1}}：{{items.volumeCarriage}}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="库存（pcs）" align="center">
          <template slot-scope="scope">
            <span class="goods_num">{{scope.row.pushGoodsSKUList[scope.row.index||0].goodsNumber||0}}</span>
            <div
                    class="txt_left"
                    style="margin-top: 40px;"
            >库存预警：{{scope.row.pushGoodsSKUList[scope.row.index||0].warnNumber}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="新增日期" align="center" prop="operatorTime"></el-table-column>
        <el-table-column label="商品来源" align="center">
          <template slot-scope="scope">
            {{['本地上传','接口对接','平台推送','京东采集','阿里集采','京东导入','天猫/淘宝采集','苏宁导入','网易严选导入'][scope.row.sourceType||0]}}
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
          你确定要把所选的商品加入到{{!notMasterSystem?'经销商':' 项目'}}吗
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmation">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 加入项目弹框 -->
    </div>

    <!--全部推送-->
    <el-dialog title="操作提示" :visible.sync="allPushDialogFormVisible" width="20%">
      <div style="text-align: center;">
        <img
                src="../../../common/images/提示.png"
                alt
                style="width:28px;margin-right:15px;vertical-align: middle;"
        />
        你确定把商品全部推送到{{!notMasterSystem?'经销商':' 项目'}}吗
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="allPushDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="allPushConfirmation">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 选择商品 -->
    <el-dialog
            :visible.sync="dialogGoodsVisible"
            width="80%"
            :title="commoditySource"
    >
      <!--<div class="mbottom">-->
        <!--<div class="goods-fitter">-->
            <!--<div class="search-wrapper">-->
              <!--<h4 class="title">选择商品</h4>-->
            <!--</div>-->
        <!--</div>-->
      <!--</div>-->
      <div
              v-loading="loading1"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="white"
      >
        <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small" :model="form">
            <div class="search-wrapper">
              <h4 class="title"> {{!notMasterSystem?'选择经销商':'选择列表'}}</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="8">
                    <el-col :span="24">
                        <el-col>
                          <el-form-item label="经销商名称:" v-if="!notMasterSystem">
                            <el-col :span="23" >
                              <el-select  @change="handeleChange" v-model="form.projectId" placeholder="请选择经销商">
                                <el-option
                                        v-for="(item,index) in options"
                                        :key="index"
                                        :label="item.agencyName"
                                        :value="item.agencyName">
                                </el-option>
                              </el-select>
                            </el-col>
                          </el-form-item>
                          <el-form-item label="项目名称:" v-else>
                            <el-col :span="23">
                              <el-select @change="handeleChange1" v-model="form.projectId" placeholder="请选择项目">
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
                  <el-col :span="1" class="btn_right" v-if="false">
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
              <div>
                <h4 class="title">选择商品</h4>
              </div>
              <div class="search-base" style="position: relative;left: -20px;">
                <div style="margin-left: 26px">
                  <el-row>
                    <el-col :span="6">
                      <el-row>
                        <el-col :span="6">
                          <el-checkbox v-model="primaryClassification" @change="handleOne">一级分类：</el-checkbox>
                        </el-col>
                        <el-form-item>
                          <el-col :span="16">
                            <el-select
                                    v-model="carId1"
                                    placeholder="请选择一级分类"
                                    @change="carIdFunc($event,1)"
                            >
                              <el-option
                                      v-for="(item,index) in carArr1"
                                      :key="index"
                                      :label="item.barName"
                                      :value="item.catId"
                              ></el-option>
                            </el-select>
                          </el-col>
                        </el-form-item>
                      </el-row>
                    </el-col>
                    <el-col :span="6">
                      <el-col>
                        <el-row>
                          <el-col :span="6">
                            <el-checkbox v-model="secondaryClassification" @change="handleTwo">二级分类：</el-checkbox>
                          </el-col>
                          <el-form-item>
                            <el-col :span="16">
                              <el-select
                                      v-model="carId2"
                                      placeholder="请选择二级分类"
                                      @change="carIdFunc($event,2)"
                              >
                                <el-option
                                        v-for="(item,index) in carArr2"
                                        :key="index"
                                        :label="item.barName"
                                        :value="item.catId"
                                ></el-option>
                              </el-select>
                            </el-col>
                          </el-form-item>
                        </el-row>
                      </el-col>
                    </el-col>
                    <el-col :span="6">
                      <el-col>
                        <el-row>
                          <el-col :span="6">
                            <el-checkbox v-model="threeLevelClassification" @change="handleThree">三级分类：</el-checkbox>
                          </el-col>
                          <el-form-item>
                            <el-col :span="16">
                              <el-select
                                      v-model="carId3"
                                      placeholder="请选择三级分类"
                                      @change="carIdFunc($event,3)"
                              >
                                <el-option
                                        v-for="(item,index) in carArr3"
                                        :key="index"
                                        :label="item.barName"
                                        :value="item.catId"
                                ></el-option>
                              </el-select>
                            </el-col>
                          </el-form-item>
                        </el-row>
                      </el-col>
                    </el-col>
                  </el-row>
                </div>
                <el-row>
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
                    <el-col
                            class="btn_right"
                            style="display: inline-block;width: auto !important;margin-bottom: 19px;"
                    >
                      <el-button type="primary" size="small" @click="searchCommodity">查询</el-button>
                    </el-col>
                  </el-col>
                  <el-col :span="6" v-if="false">
                    <el-col>
                      <el-form-item label="商品类型：">
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
              <!--加入列表-->
              <div style="margin-bottom: 20px">
                <el-row>
                  <el-col
                          class="btn_right"
                          style="margin-left: 15px;display: inline-block;width: auto !important;"
                  >
                    <el-button type="primary" size="small" @click="addItem">加入列表</el-button>
                  </el-col>
                  <el-col
                          class="btn_right"
                          style="margin-left: 15px;display: inline-block;width: auto !important;"
                  >
                    <el-button type="primary" size="small" @click="addAllList">全部推送</el-button>
                  </el-col>
                  <el-col
                          class="btn_right"
                          style="margin-left: 15px;display: inline-block;width: auto !important;"
                  >
                    <el-button type="primary" size="small" @click="classifiedPush">分类推送</el-button>
                  </el-col>
                </el-row>
              </div>
              <div>
                <el-table
                        :data="tableData"
                        stripe
                        style="width: 100%"
                        border
                        ref="elTable"
                        @select="choose"
                        @select-all="chooseAll"
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
                      <!-- 平台展示信息 -->
                      <div v-if="scope.row.sourceTypeId == 2">
                        <div class="txt_left">
                          商城价：{{scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice !=
                          0?scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice:'暂无'}}
                        </div>
                        <div class="txt_left">
                          市场价：
                          <span
                                  class="blue"
                                  v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0"
                          >{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice}}</span>
                          <span v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice == 0">不支持一件代发</span>
                        </div>
                        <div class="txt_left">
                          税率：{{scope.row.skuInfo[scope.row.index].priceInfo.taxRate !=
                          0?scope.row.skuInfo[scope.row.index].priceInfo.taxRate+'%':'暂无'}}
                        </div>
                      </div>
                      <!-- 非平台商品信息 -->
                      <div v-else>
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
                          <span v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice == 0">不支持一件代发</span>
                        </div>
                        <div class="txt_left">
                          运费：{{scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice
                          !=0?scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice:scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice==
                          ''?'含运费':'含运费'}}
                        </div>
                        <div class="txt_left">
                          {{scope.row.sourceTypeId | source}}：{{scope.row.skuInfo[scope.row.index].priceInfo.thirdPrice
                          !=
                          0?scope.row.skuInfo[scope.row.index].priceInfo.thirdPrice:'暂无'}}
                        </div>
                        <div class="txt_left">
                          市场价对比京东折扣率：{{scope.row.skuInfo[scope.row.index].priceInfo.costJdRatio !=
                          0?scope.row.skuInfo[scope.row.index].priceInfo.costJdRatio:'暂无'}}
                        </div>
                        <div class="txt_left">
                          商城价对比京东折扣率：{{scope.row.skuInfo[scope.row.index].priceInfo.shopJdRatio !=
                          0?scope.row.skuInfo[scope.row.index].priceInfo.shopJdRatio:'暂无'}}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="集采" align="center" width="150">
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

                      <div v-if="!notMasterSystem">
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
                     </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="一件代发利润统计" align="center" width="140">
                    <template slot-scope="scope">
                      <!-- 平台展示信息 -->
                      <div v-if="scope.row.sourceTypeId == 2">
                        <div
                                class="txt_left"
                        >分销价：{{scope.row.skuInfo[scope.row.index].financeInfo.distrPrice?scope.row.skuInfo[scope.row.index].financeInfo.distrPrice:'暂无'}}</div>
                        <div
                                class="txt_left"
                        >分销利润：{{scope.row.skuInfo[scope.row.index].financeInfo.distrProfit?scope.row.skuInfo[scope.row.index].financeInfo.distrProfit:'暂无'}}</div>
                        <div
                                class="txt_left"
                        >分销利润率：{{scope.row.skuInfo[scope.row.index].financeInfo.distrProfitMargin*100}}%
                        </div>
                      </div>
                      <div v-else>
                        <div
                                class="txt_left"
                        >毛利润：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfit}}
                        </div>
                        <div
                                class="txt_left"
                        >毛利润率：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMargin*100}}%
                        </div>
                        <div class="txt_left">税费：{{scope.row.skuInfo[scope.row.index].financeInfo.taxation}}</div>
                        <div
                                class="txt_left"
                        >税后毛利：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitTax}}
                        </div>
                        <div
                                class="txt_left"
                        >税后毛利率：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMarginTax*100}}%
                        </div>
                        <div
                                class="txt_left"
                        >企业所得税：{{scope.row.skuInfo[scope.row.index].financeInfo.incomeTax}}
                        </div>
                        <div class="txt_left">纯利润：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfit}}</div>
                        <div
                                class="txt_left"
                        >纯利率：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfitMargin*100}}%
                        </div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="集采利润统计" align="center" width="120" v-if="!notMasterSystem">
                    <template slot-scope="scope">
                      <div
                              class="txt_left"
                              v-for="(item,index) in scope.row.skuInfo[scope.row.index].volumeInfo.volumePrices"
                              :key="index"
                      >
                        <div class="txt_left">{{item.volumeGrossProfit}}</div>
                        <div class="txt_left">{{item.volumeGrossProfitMargin}}</div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="库存(PCS)" align="center" width="120">
                    <template slot-scope="scope">
                      <span class="goods_num">{{scope.row.skuInfo[scope.row.index].goodsNumber}}</span>
                      <div
                              class="txt_left"
                              style="margin-top: 40px;"
                      >库存预警：{{scope.row.skuInfo[scope.row.index].warnNumber}}
                      </div>
                    </template>
                  </el-table-column>
                  <!--<el-table-column label="商品分类" align="center" prop="goodsType"></el-table-column>-->
                  <el-table-column label="商品来源" align="center" prop="sourceType">
                  </el-table-column>
                </el-table>
              </div>
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
          </el-form>
        </div>
      </div>
      </div>
    </el-dialog>

    <!--推送弹框-->
    <el-dialog  :visible.sync="pushDialogVisible" width="80%">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="150px" size="small">
            <div class="search-wrapper">
              <h4 class="title">选择商品确定</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mbottom"
      >
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">{{notMasterSystem?'已选项目':'已选经销商'}}</h4>
              <!--经销商-->
              <div v-if="!notMasterSystem">
                <el-row>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">经销商名称：{{cooperationAgreement.secondParty}}</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple-light">联系人：{{cooperationAgreement.adminName}}</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple"></div>
                    手机号码：{{cooperationAgreement.secondPartyTelephone}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                      京东分成比例：{{cooperationAgreement.jdFirst}}:{{cooperationAgreement.jdFirstPoint}}
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple-light">
                      自营分成比例：{{cooperationAgreement.proprietaryFirst}}:{{cooperationAgreement.proprietarySecond}}
                    </div>
                  </el-col>
                </el-row>
              </div>
              <!--项目-->
              <div v-if="notMasterSystem">
                <el-row>
                  <el-col :span="8">
                    <div class="grid-content bg-purple">项目名称：{{projectInformation.projectName}}</div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple-light" v-if="projectInformation.customer">
                      客户名称：{{projectInformation.customer.customerName}}
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple"></div>
                    兑换比例：1:{{projectInformation.exchangeRate}}
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="8">
                    <div class="grid-content bg-purple" v-if="notMasterSystem">
                      货币单位：{{currencyUnit}}
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple " v-if="notMasterSystem">客服电话：{{projectInformation.telNumber}}
                    </div>
                  </el-col>
                  <el-col :span="8">
                    <div class="grid-content bg-purple" v-if="notMasterSystem">地址：{{projectInformation.address}}</div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mbottom"
      >
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
                                    v-for="(item,index) in carArr1"
                                    :key="index"
                                    :label="item.barName"
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
                                    v-for="(item,index) in carArr2"
                                    :key="index"
                                    :label="item.barName"
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
                                    v-for="(item,index) in carArr3"
                                    :key="index"
                                    :label="item.barName"
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
                          v-if="notMasterSystem"
                  >

                    <el-button type="primary" size="small" @click="mallPrice()" >批量修改商城价</el-button>
                  </el-col>
                  <el-col
                          class="btn_right"
                          style="margin-left: 15px;display: inline-block;width: auto !important;"
                          v-if="notMasterSystem"
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
                          :data="selectGoodPage"
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
                      <span
                              class="blue"
                              v-if="scope.row.skuInfo[scope.row.index].priceInfo.costPrice != 0"
                      >{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice}}</span>
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
                          {{scope.row.skuInfo[0].priceInfo | editAdjustPrice("adjustPrice")}}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="项目VIP价" align="center" prop="goodsPrice">
                      <template slot-scope="scope">
                        <div>
                          {{scope.row.skuInfo[0].priceInfo | editAdjustPrice("vipAdjustPrice")}}
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="利润统计" align="center" width="140">
                      <template slot-scope="scope">
                        <!-- 平台展示信息 -->
                        <div v-if="scope.row.sourceTypeId == 2">
                          <div
                                  class="txt_left"
                          >
                            分销价：{{scope.row.skuInfo[scope.row.index].financeInfo.distrPrice?scope.row.skuInfo[scope.row.index].financeInfo.distrPrice:'暂无'}}
                          </div>
                          <div
                                  class="txt_left"
                          >
                            分销利润：{{scope.row.skuInfo[scope.row.index].financeInfo.distrProfit?scope.row.skuInfo[scope.row.index].financeInfo.distrProfit:'暂无'}}
                          </div>
                          <div
                                  class="txt_left"
                          >分销利润率：{{scope.row.skuInfo[scope.row.index].financeInfo.distrProfitMargin*100}}%
                          </div>
                        </div>
                        <!-- 非平台展示信息 -->
                        <div v-else>
                          <div
                                  class="txt_left"
                          >毛利润：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfit}}
                          </div>
                          <div
                                  class="txt_left"
                          >毛利润率：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMargin*100}}%
                          </div>
                          <div class="txt_left">税费：{{scope.row.skuInfo[scope.row.index].financeInfo.taxation}}</div>
                          <div
                                  class="txt_left"
                          >税后毛利：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitTax}}
                          </div>
                          <div
                                  class="txt_left"
                          >税后毛利率：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMarginTax*100}}%
                          </div>
                          <div
                                  class="txt_left"
                          >企业所得税：{{scope.row.skuInfo[scope.row.index].financeInfo.incomeTax}}
                          </div>
                          <div class="txt_left">纯利润：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfit}}</div>
                          <div
                                  class="txt_left"
                          >纯利率：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfitMargin*100}}%
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="库存(PCS)" align="center" width="120">
                      <template slot-scope="scope">
                        <span class="goods_num">{{scope.row.skuInfo[scope.row.index].goodsNumber}}</span>
                        <div
                                class="txt_left"
                                style="margin-top: 40px;"
                        >库存预警：{{scope.row.skuInfo[scope.row.index].warnNumber}}
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                <div class="pagination" style="text-align: right; margin-top: 20px;">
                  <el-pagination
                          @size-change="pushGoods.pageNum = $event"
                          @current-change="homehandleCurrentChange"
                          :page-sizes="[10, 30, 50, 100]"
                          :page-size="pushGoods.pageNum"
                          layout="total,sizes, prev, pager, next,jumper"
                          :total="homepaginationPage.length"
                  ></el-pagination>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="goodsSave" size="small"
                   :loading="loading2"
        >保 存</el-button>
        <el-button type="danger" @click="goodsDelivery" size="small"
                   :loading="loading2"
        >推 送</el-button>
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
    <el-dialog :visible.sync="dialogMallVisible" width="50%" class="mallDialog  mallDialog1">
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
            <el-radio-group @change="handleTransfer" v-model="adjustPrice.ratioAdjustMethod">
              <el-radio :label="0">上调</el-radio>
              <el-radio  :label="1">下调</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="调价比例：">
            <el-input v-model="adjustPrice.ratioAdjustValue" style="width:50%;"></el-input>%
          </el-form-item>
          <el-form-item label="增减调价：">
            <el-select
              placeholder="请选择调价方式"
              v-model="adjustPrice.fluctuateAdjustMethod"
              @change="handleIncrease"
              style="width: 30%!important;margin-right: 10px;"
            >
              <!--<el-option :label="0">+</el-option>-->
              <!--<el-option :label="1">-</el-option>-->
              <el-option label="+" :value="0"></el-option>
              <el-option label="-" :value="1"></el-option>
            </el-select>
            <el-input v-model="adjustPrice.fluctuateAdjustValue" style="width:30%;"></el-input>元
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
    <el-dialog :visible.sync="dialogvipVisible" width="50%" class="mallDialog mallDialog1">
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
            <el-radio-group v-model="vipAdjustPrice.ratioAdjustMethod">
              <el-radio :label="0">上调</el-radio>
              <el-radio :label="1">下调</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="调价比例：">
            <el-input  style="width:50%;" v-model="vipAdjustPrice.ratioAdjustValue"></el-input>%
          </el-form-item>
          <el-form-item label="增减调价：">
            <el-select
              placeholder="请选择活动区域"
              style="width: 30%!important;margin-right: 10px;"
              v-model="vipAdjustPrice.fluctuateAdjustMethod"
            >
              <el-option label="+" :value="0"></el-option>
              <el-option label="-" :value="1"></el-option>
            </el-select>
            <el-input  style="width:30%;" v-model="vipAdjustPrice.fluctuateAdjustValue"></el-input>元
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
import {throttleTipPop} from '@/utils/throttle'
import {
  getAddGoodsList,
  getProject,
  productPush,
  changeState,
  saveProduct,
  auditRecord,
  deleteProductList,
  getDealer,
  saveDealer ,    //推送项目
  modifyPriceAdjustment,   //批量修改价格
  contractInformation, //获取进销商的合同信息
  projectfindinfobyid, //获取项目的详细信息
  navigationbartree,   //获取树形导航
  dictionaryTree,  //字典树查询
  pushAllGoodsbyAgency,  //保存全部推送(经销商)
  pushAllGoodsByProject //保存全部推送(项目)
} from "@/api/product/index";
export default {
  data() {
    return {
      currencyUnit: '',//货币单位
      getCargoUnit: '',
      primaryClassification: false,  //一级分类
      secondaryClassification: false,  //二级分类
      threeLevelClassification: false, //三级分类
      allPushDialogFormVisible: false,  //全部推送弹框
      commoditySource: '一件代发商品',
      projectInformation: '',
      cooperationAgreement: '', //经销商的合作协议
      homepaginationPage: [],
      homemadeIndex: 0,  //自制分页的小标
      homepagination: [], //切割后分页的数组
      collectingIndex:'',  //判断是不是集采进入    2是集采
      isVipPrice:false,
      agencyId:'',
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
      loading2: false,
      adjustPrice: {    //普通价格得修改
        ratioAdjustValue: 0,   //百分比
        fluctuateAdjustValue: 0,     //加减
        ratioAdjustMethod: 0,   //百分比
        fluctuateAdjustMethod: 0   //加减
      },
    vipAdjustPrice:{   //修改vip价
        ratioAdjustValue:0,   //百分比num
        fluctuateAdjustValue: 0,    //加减num
        ratioAdjustMethod:0,   //百分比
        fluctuateAdjustMethod: 0   //加减
      },
      commoditysource: [
        {
          name: "本地上传",
          id: 0
        },
        {
          name: "接口对接",
          id: 1
        },
        {
          name: "平台推送",
          id: 2
        },
        {
          name: "京东采集",
          id: 3
        },
        {
          name: "阿里采集",
          id: 4
        },
        {
          name: "京东导入",
          id: 5
        },
        {
          name: "天猫/淘宝采集",
          id: 6
        },
        {
          name: "苏宁导入",
          id: 7
        },
        {
          name: "网易严选导入",
          id: 8
        },
      ],
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
      push: false,
      goodsTypeId: "", //商品的id
      state: "2", //审核状态
      form1: {
        sourceType: "",
        keyword: "", // 关键字
        catId: ""
      },
      form: {
        isSubstituteSales:1, //是否支持一件代发  默认条第一个一件代发
        sourceType:null, //  0 0自营  1京东 2网易 3苏宁
        keyword: "", // 关键字
        barId: "",
        current_page: 1,
        page_size: 10,
      },
      pushForm:{
        agencyId:"",
        goodsType: null, // 1，京东 2，网易 3，苏宁 0, 一件代发商品 0, 集采商品
        goodsName:'',
        operatorTimeEnd:'',
        operatorTimeStart:'',
        pageNum:1,
        pageSize:10,
        projectId:'',
        pushStatus:'',
        isSubstituteSales:true,
      },
      dialog: {
        value1: "",
        value2: ""
      },
      options: [], //项目
      checkList1: [],
      checkList2: [],
      checked: "",
      tableData: [],
      tableDataPagination:{},
      title: "审核",
      audit: {
        goodsData: "", // 选择商品的data
        auditType: "", //审核类型
        auditId: "", //审核记录ID
        auditRemark: "", //审核说明
        operationId: "", //审核的业务id
        processId: "" //流程ID，主键
      },
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
      whether:false,
      whetherVip:false,
      productId: [],  // 修改商城价格的 选择的商品id
      pushGoods: {
        index: 1,
        pageNum: 10
      }
    };
  },
  computed: {
    notMasterSystem() {
      return this.$routerInfo.platformType != 0;
    },
    selectGoodPage() {
      let start = (this.pushGoods.index - 1) * this.pushGoods.pageNum;
      let end = this.pushGoods.index * this.pushGoods.pageNum;
      return this.homepaginationPage.slice(start, end);
    },

  },
  watch: {
    pushDialogVisible(val) {
      if (!val) {
        this.homepaginationPage = []
        this.checkArr = []
      }
    },
    dialogGoodsVisible(val) {
      if (!val) {
        this.checkArr = [];
        this.carId1 = ''
        this.carId2 = ''
        this.carId3 = ''
        this.form.barId = ''
        this.form.page_size = 10,
                this.form.current_page = 1
      }
    },
    //一级分类
    primaryClassification(val) {
      if (this.form.barId == '') return this.$message('请选择分类')
      if (val) {
        this.barId = this.carId1
        this.secondaryClassification = false  //二级分类
        this.threeLevelClassification = false //三级分类
      }
    },
    //二级分类
    secondaryClassification(val) {
      if (val) {
        this.barId = this.carId2
        this.primaryClassification = false  //一级分类
        this.threeLevelClassification = false//三级分类
      }
    },
    //三级分类
    threeLevelClassification(val) {
      if (val) {
        this.barId = this.carId3
        this.primaryClassification = false  //一级分类
        this.secondaryClassification = false//三级分类
      }
    },
  },
  mounted() {
    this.productPush(this.pushForm);
  },
  //三级联动
  async created() {
    this._getCatagory2();
    this.dictionaryTree()
  },
  filters: {

    editAdjustPrice(priceInfo, type){
      const editAdjustPrice = (priceInfo, type) => {
        let price = null;
        const goodsPrice = type === "adjustPrice" ? priceInfo.goodsPrice : editAdjustPrice(priceInfo, "adjustPrice");
        if (priceInfo[type] && priceInfo[type].ratioAdjustValue) {
          price = priceInfo[type].ratioAdjustMethod == 0
                  ? goodsPrice *  (1 + priceInfo[type].ratioAdjustValue / 100)
                  : goodsPrice * (1 - priceInfo[type].ratioAdjustValue / 100)
          price = priceInfo[type].ratioAdjustMethod == 0
                  ? price + Number.parseFloat(priceInfo[type].fluctuateAdjustValue)
                  : price - Number.parseFloat(priceInfo[type].fluctuateAdjustValue);
        }
        return price == null ? type === "adjustPrice"? "暂无" : goodsPrice : price;
      };
      return editAdjustPrice(priceInfo, type);
    },
  },
  methods: {
    //分类选择
    handleOne() {
      if (!this.carId1) {
        this.primaryClassification = false
        return throttleTipPop(this, 'info', '请选择分类')
      }
    },
    handleTwo() {
      if (!this.carId2) {
        this.secondaryClassification = false
        return throttleTipPop(this, 'info', '请选择分类')
      }
    },
    handleThree() {
      if (!this.carId3) {
        this.threeLevelClassification = false
        return throttleTipPop(this, 'info', '请选择分类')
      }
    },
    //分类推送
    classifiedPush() {
      if (this.selectedItem == "") {
        if (!this.notMasterSystem) {
          return throttleTipPop(this, 'info', '请选择经销商');
        } else {
          return throttleTipPop(this, 'info', '请选择项目')
        }
      } else if (this.form.barId == '') {
        return throttleTipPop(this, 'info', '请选择分类')
      }
      this.allPushDialogFormVisible = true
    },
    //查询字典货单单位
    async dictionaryTree() {
      const name = '货币单位'
      const res = await dictionaryTree(name)
      if (res.code === 200) {
        this.getCargoUnit = res.data
      }
    },

    //普通调价
    batchModifyMall(){
      this.whether = true
      if (this.pushIdList.length <= 0) return throttleTipPop(this, 'info', '请选择商品')
      this.dialogMallVisible = true;
    },
    //vip调价
    batchModifyMallVip(){
      this.whetherVip = true
      let detection=false
       this.pushIdList.forEach(item=>{
         item.pushGoodsSKUList.forEach(items=>{
           if(items.goodsAdjustPrice){
              detection = true
           }
         })
       })
      if (this.pushIdList.length <= 0){
        return throttleTipPop(this, 'info', '请选择编辑的商品')
      }else if(!detection){
        return throttleTipPop(this, 'info', '请先修改项目商城价')
      }else{
        this.dialogvipVisible = true
      }
    },
    //选择商品批量推送
    handlepushList(val){
      this.pushIdList = val
      this.productId = this.pushIdList.map(item=>{
        return item.pushId
      })
    },
  //批量删除
    deleProductList(){
      if (this.pushIdList.length <= 0) return throttleTipPop(this, 'info', '请选择删除的商品');
      let pushIds=[]
      const cancelReason=''
      this.pushIdList.forEach(item=>{
        pushIds.push(item.pushId)
      })
      this.$confirm('确认删除该商品, 是否继续?', '提示', {
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
      if (this.pushIdList.length <= 0) return throttleTipPop(this, 'info', '请选择推送得商品');
      let  arrList=[]
      let flag = false
      let obj
      this.pushIdList.forEach(item=>{
          arrList.push(item.pushId)
        // item.pushGoodsSKUList.forEach(items => {
        //     items.volumePrices.forEach(itemList => {
        //         if (itemList.volumePrice < items.costPrice) {
        //             flag = true
        //         }
        //     })
        // })
      })

      if (!this.notMasterSystem) {
        obj = {
          agencyId: this.selectedItem.agencyId,
          pushIds: arrList
        }
      } else {
        obj = {
          projectId: this.selectedItem.projectId,
          pushIds: arrList
        }
      }
      this.cofrimPush(obj)
      // if (flag) {
      //   this.$confirm('您所选商品中，有异常价格的商品, 是否继续?', '提示', {
      //         confirmButtonText: '确定',
      //         cancelButtonText: '取消',
      //         type: 'warning'
      //     }).then(async () => {
      //         this.cofrimPush(obj)
      //     }).catch(() => {
      //         this.$message({
      //             type: 'info',
      //             message: '取消推送'
      //         });
      //     });
      // } else {
      //   this.cofrimPush(obj)
      // }
    },
    //确认加入列表
      cofrimPush(obj) {
          this.$confirm('确认推送商品, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(async () => {
              const res = await auditRecord(obj)
              if (res.code === 200) {
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
    async allEdit() {
      //后台改价
      if(this.whether){
        this.adjustPrice.ratioAdjustValue =  this.adjustPrice.ratioAdjustValue/100
        const obj={
          adjustPrice:this.adjustPrice,
          pushIds:this.productId
        }
      const res = await modifyPriceAdjustment(obj)
        if(res.code === 200 ){
          this.$message({
            type:'success',
            message:'修改成功'
          })
          this.productPush(this.pushForm)
        }else{
          this.$message({
            type:'error',
            message:'修改失败'
          })
        }
      }else{   //前端改价
        this.multipleSelection.forEach(item => {
          this.homepaginationPage.forEach((e, i) => {
            if (item.goodsId == e.goodsId) {
              item.skuInfo.forEach(items => {
                items.priceInfo.adjustPrice= {...this.adjustPrice};
              });
            }
          });
        });
      }
      setTimeout(()=>{
        this.adjustPrice={
          ratioAdjustValue:0,   //百分比num
          fluctuateAdjustValue: 0,    //加减num
          ratioAdjustMethod:0,   //百分比
          fluctuateAdjustMethod: 0   //加减
        }
      })
      this.homepaginationPage = [...this.homepaginationPage];
      this.dialogMallVisible = false;
    },
    //批量修改VIP价格
    async allEditVip(){
      if(this.whetherVip){
        this.vipAdjustPrice.ratioAdjustValue =  this.vipAdjustPrice.ratioAdjustValue/100
        const obj={
          vipAdjustPrice:this.vipAdjustPrice,
          pushIds:this.productId
        }
        const res = await modifyPriceAdjustment(obj)
        if(res.code === 200 ){
          this.$message({
            type:'success',
            message:'修改成功'
          })
          this.productPush(this.pushForm)
        }else{
          this.$message({
            type:'error',
            message:'修改失败'
          })
        }
      }else{
        this.multipleSelection.forEach(item => {
          this.homepaginationPage.forEach((e, i) => {
            if (item.goodsId == e.goodsId) {
              item.skuInfo.forEach(items => {
                if(items.priceInfo.adjustPrice){
                  items.priceInfo.vipAdjustPrice = {...this.vipAdjustPrice};
                }
              });
            }
          });
        });
      }

      setTimeout(()=>{
        this.vipAdjustPrice={
          ratioAdjustValue:0,   //百分比num
          fluctuateAdjustValue: 0,    //加减num
          ratioAdjustMethod:0,   //百分比
          fluctuateAdjustMethod: 0   //加减
        }
      })
      this.homepaginationPage = [...this.homepaginationPage];
      this.dialogvipVisible = false
    },
    //增减调价
    handleIncrease() {},
    //调价商城
    handleTransfer() {},
    // 设置商品分类折扣
    toDiscount(){
       this.$router.push({name:"goods_discount"})
    },
    //确定弹框的删除   //批量删除
    deleProduct() {
      if (this.multipleSelection.length <= 0)
        return throttleTipPop(this, 'info', '请选择删处的商品');
      this.multipleSelection.forEach(item => {
        this.homepaginationPage.forEach((e, i) => {
          if (item.goodsId == e.goodsId) {
            this.homepaginationPage.splice(i, 1);
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
      this.form.isSubstituteSales =null
      this._getGoodsList(this.form);
    },
    //推送的弹框查询
    pushSearch() {
      if (this.form1.keyword == '' || this.form.barId == '') {
        this.homepaginationPage = this.selectGoodsClone
      }
      let selectGood=[]
      this.selectGoodsClone.filter(item => {
        if (item.goodsName.indexOf(this.form1.keyword) !=-1) {
          selectGood.push(item)
        } else if (item.catId.indexOf(this.form.barId) != -1) {
          console.log(item)
          selectGood.push(item)
        }
        this.homepaginationPage = selectGood
      });
    },

    //选择经销商
    async handeleChange(val) {
        this.selectedItem = this.options.find(item => {
          if (item.agencyName == val) {
            return item
          }
        })
        const res = await contractInformation(val)
        if (res.code === 200) {
          this.cooperationAgreement = res.data
        }
    },
    //选择的项目
    async handeleChange1(val) {
      this.selectedItem = this.options.find(item => {
        if (item.projectId == val) {
          return item
        }
      });
      //获取货币单位
      const res = await projectfindinfobyid(val)
      if (res.code === 200) {
        this.projectInformation = res.data
        this.getCargoUnit.forEach(item => {
          if (item.dictionaryId == this.projectInformation.currencyUnit) {
            this.currencyUnit = item.dictionaryName
          }
        })
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
      this.loading1 = true
      this.form.page_size = val;
      this._getGoodsList();
    },
    handleCurrentChange(val) {
      this.loading1 = true
      this.form.current_page = val;
      this._getGoodsList();
    },


    //获取分类
    carIdFunc(val, index) {
      this.form.barId = val;
      if (index == 1) {
        this.carArr3 = [];
        this.carArr2 = [];
        this.carId2 = ''
        this.carId3 = ''
        this.carArr1.forEach(item => {
          if (item.catId == val) {
            this.carArr2 = item.children
          }
        })
      }
      if (index == 2) {
        this.carId3 = ''
        this.carArr3 = [];
        this.carArr2.forEach(item => {
          if (item.catId == val) {
            this.carArr3 = item.children
          }
        })
      }
    },
    async _getCatagory2() {
      const res = await navigationbartree(1)
      if (res.code === 200) {
        this.carArr1 = res.data
      }
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
    //全部推送
    async addAllList() {
      if (this.selectedItem == "") {
        if (!this.notMasterSystem) {
          return throttleTipPop(this, 'info', '请选择经销商');
        } else {
          return throttleTipPop(this, 'info', '请选择项目');
        }
      } else if (!this.tableData) {
        return throttleTipPop(this, 'info', '暂无商品');
      }
      this.allPushDialogFormVisible = true;
    },
    //全部推送确认
    async allPushConfirmation() {
      const barIds = [this.barId]
      if (!this.notMasterSystem) {   // 全部推送经销商
        const obj = {
          agencyId: this.selectedItem.agencyId,
          barIds: barIds
        }
        const res = await pushAllGoodsbyAgency(obj)
        if (res.code === 200) {
          this.dialogGoodsVisible = false
          this.$message({
            type: 'success',
            message: '推送成功'
          })
        }
      } else {                //全部推送项目
        const obj = {
          projectId: this.selectedItem.projectId,
          barIds: barIds
        }
        const res = await pushAllGoodsByProject(obj)
        if (res.code === 200) {
          this.dialogGoodsVisible = false
          this.$message({
            type: 'success',
            message: '推送成功'
          })
        }
      }
      this.allPushDialogFormVisible = false;
    },

    // 加入项目
    addItem() {
      if (this.selectedItem == "") {
        if(this.searchMain){
          return throttleTipPop(this, 'info', '请选择经销商');
        }else{
          return throttleTipPop(this, 'info', '请选择项目');
        }
      } else if (this.checkArr.length <= 0) {
        return throttleTipPop(this, 'info', '请选择商品');
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
       const routerInfo = this.$routerInfo.platformType
        let res
        if(routerInfo===0){
          this.searchMain = true
          res = await getDealer(pageSize)
        }else if(routerInfo===1){
          this.searchMain = false
          res = await getProject(pageSize)
        }
        if (res.code === 200) {
          this.options = res.data.list;
        }
    },

    // 选择商品确认（加入项目确定）
    confirmation() {
      this.tableData.forEach(item => {
        this.$refs.elTable.toggleRowSelection(item, false)
      })
      this.dialogFormVisible = false;
      this.pushDialogVisible = true;
      let selectGoods = [];
      //批量推送
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
      this.homepaginationPage = [...selectGoods]
      this.selectGoodsClone = JSON.parse(JSON.stringify(selectGoods))
    },
    //自制分页的切换
    homehandleCurrentChange(val) {
      this.pushGoods.index = val
    },
    //保存推送公共函数
  async saervePushCommon(){
    this.loading2 = true
    this.dialogSaveVisible =false;
    this.dialogDeliveryVisible = false;
      let goods = [];
      let goodsSkuIds=[];
      let productInfo={};
    let selectGoods = JSON.parse(JSON.stringify(this.homepaginationPage));
      selectGoods.forEach((item,index)=>{
        let goodsId;
        let adjustPrice;
        let vipAdjustPrice
        item.skuInfo.forEach(items=>{
          if(items.priceInfo.adjustPrice&&items.priceInfo.adjustPrice.ratioAdjustValue){
            items.priceInfo.adjustPrice.ratioAdjustValue = Number.parseFloat(items.priceInfo.adjustPrice.ratioAdjustValue)/100
          }
          if(items.priceInfo.vipAdjustPrice&&items.priceInfo.vipAdjustPrice.ratioAdjustValue){
            items.priceInfo.vipAdjustPrice.ratioAdjustValue = Number.parseFloat(items.priceInfo.vipAdjustPrice.ratioAdjustValue)/100
          }
           adjustPrice = items.priceInfo.adjustPrice
           vipAdjustPrice = items.priceInfo.vipAdjustPrice
        })
        goodsId=item.goodsId;
        goodsSkuIds=item.skuInfo[0].skuId;
        productInfo={
          adjustPrice,
          vipAdjustPrice,
          goods: [{
            goodsId,
            goodsSkuIds: [goodsSkuIds]
          }]
        };
        goods.push(productInfo);
      });
      this.goodsList = {
        adjustParams: goods,
        createAudit:this.createAudit,
        agencyId: this.selectedItem.agencyId, //经销商id
        customerId:this.selectedItem.customerId, //客户id
        projectId: this.selectedItem.projectId,//项目id
        agencyName:this.selectedItem.agencyName,
        projectName:this.selectedItem.projectName
      };
      let res
    if (!this.notMasterSystem) {
         res = await saveProduct(this.goodsList ); // 进销商
      }else{
         res = await saveDealer(this.goodsList );   //项目
      }
        if(!this.createAudit){
          if(res.code === 200 ){
            this.loading2 = false
            this.pushDialogVisible = false;
            this.dialogFormVisible = false;
            this.dialogGoodsVisible = false;
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
            this.loading2 = false
            this.pushDialogVisible = false;
            this.dialogFormVisible = false;
            this.dialogGoodsVisible = false;
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
     showr(){
      this.createAudit = false
      this.saervePushCommon()
    },
    // 推送弹框
    goodsDelivery() {
      if (this.homepaginationPage.length <= 0) {
        return this.$message('请选择商品')
      }
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
        this.whether = false
        this.dialogMallVisible = true;
    },
    // 批量修改VIP价
    vipPrice() {
      this.isVipPrice = true
      this.whetherVip = false
      let detection=false
      this.homepaginationPage.filter(item => {
          item.skuInfo.forEach(items=>{
            if(items.priceInfo.adjustPrice){
              detection = true
            }
          })
      });
    if (this.multipleSelection.length <= 0){
        return this.$message("请选择编辑的商品");
    }else if(!detection){
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
      getAddGoodsList(this.form).then(res => {
        this.loading1 = false
        var that = this;
        that.tableData = res.data.pageList;
        that.tableDataPagination.count = res.data.count ? res.data.count : 0;
        that.tableDataPagination.pageIndex = res.data.page ? res.data.page.pageIndex : 0;
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

    handleGetGoodsList(data, val, isSubstituteSales, sourceType, isReal, collectingIndex, name) {
      this.commoditySource = name
      this.pushForm = data
      this.sourceType = data.goodsType
      this.status = val
      this.form.isSubstituteSales =isSubstituteSales
      this.form.sourceType = sourceType
      this.form.isReal = isReal
      this.productPush(data);
      this.collectingIndex = collectingIndex
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
<style scoped>
   .margin1 >>> .el-dialog__body {
    padding: 0 !important;
    background: none !important;
  }
</style>

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

.txt_left {
  text-align: left;
}

.activit {
  background: red;
  color: white;
  font-weight: 800;
    text-align: center;
}

/deep/ .el-form-item__content {
  margin-left: 0px;
}
</style>
