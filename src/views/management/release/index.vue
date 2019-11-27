<template>
  <div class="margin margin1">
    <goods-fitter class="mbottom"  @goodsFitter="handleGetGoodsList" @tabVender='handleGetGoodsList'></goods-fitter>
    <div class="mcard">
     <div class='mbottom'>
         <el-button
                 type="primary"
                 size="small"
                 @click="publishAll"
                 style="margin-left:10px"
         >全部发布
         </el-button>
        <el-button
            type="primary"
            size="small"
            @click="batchRelease"
            style="margin-left:10px"

        >批量发布
        </el-button>
        <el-button
            type="primary"
            size="small"
            @click="batchDelete"
            style="margin-left:10px"

          >批量删除
         </el-button>
         <el-button
                 type="primary"
                 size="small"
                 @click="pushing"
                 style="margin-left:10px"
         >推送中商品
         </el-button>
    </div>
        <el-table
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.8)"
                :data="tableData"
                stripe
                style="width: 100%"
                border
                ref="pushGoodsList"
                @select="choose"
                @select-all="chooseAll"
        >
            <el-table-column type="selection" align="center"></el-table-column>
            <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
            <el-table-column label="推送状态" align="center">
                <template slot-scope="scope">
           <span style="color: red;">
               <span v-if="scope.row.pushStatus==0">
                   未推送
               </span>
               <span v-if="scope.row.pushStatus==1">
                   已推送
               </span>
               <span v-if="scope.row.pushStatus==2">
                   已删除
               </span>
                <span v-if="scope.row.pushStatus==10">
                   推送中
               </span>
               <span v-if="scope.row.pushStatus==11">
                   推送错误
               </span>
           </span>
                </template>
            </el-table-column>
            <el-table-column label="删除原因" align="center">
                <template slot-scope="scope">
                    {{scope.row.cancelReason||'暂无'}}
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
                            <div class="more txt_left">
                                市场价:{{scope.row.pushGoodsSKUList[scope.row.index||0].costPrice}}元
                            </div>
                            <div class="txt_left">
                                运费：{{scope.row.pushGoodsSKUList[scope.row.index||0].configureVo?scope.row.pushGoodsSKUList[scope.row.index||0].configureVo.carriagePrice!=0?scope.row.pushGoodsSKUList[scope.row.index||0].configureVo.carriagePrice:'含运费':'含运费'}}
                            </div>
                            <div class="more txt_left">税率：12%</div>
                            <div class="more txt_left">
                                商城调价:{{scope.row.pushGoodsSKUList[scope.row.index||0].goodsAdjustPrice?scope.row.pushGoodsSKUList[scope.row.index||0].goodsAdjustPrice+'元':'未调整'}}
                            </div>
                            <div class="more txt_left">
                                vip调价:{{scope.row.pushGoodsSKUList[scope.row.index||0].vipGoodsAdjustPrice?scope.row.pushGoodsSKUList[scope.row.index||0].vipGoodsAdjustPrice+'元':'未调整'}}
                            </div>
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
                    <div class="txt_left">毛利润：8.8</div>
                    <div class="txt_left">毛利润率：44%</div>
                    <div class="txt_left">税率：1.13</div>
                    <div class="txt_left">税后毛利：7.67</div>
                    <div class="txt_left">税后毛利率：39%</div>
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
                        <div v-for="(items,index) in  scope.row.pushGoodsSKUList[scope.row.index||0].volumePrices">
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
         <el-table-column label="新增日期" align="center" prop="operatorTime">
         </el-table-column>
            <el-table-column label="商品来源" align="center">
                <template slot-scope="scope">
                    {{['本地上传','接口对接','平台推送','京东采集','阿里集采','京东导入','天猫/淘宝采集','苏宁导入','网易严选导入'][scope.row.sourceType||0]}}
                </template>
            </el-table-column>
            <!--<el-table-column label="取消原因" align="center">-->
            <!--<div>取消原因</div>-->
            <!--</el-table-column>-->
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
    </div>
     <!-- 商品详情 -->
      <el-dialog :title="commoditySource" :visible.sync="dialogGoodsVisible" width="80%">
          <div class="mbottom">
              <div class="goods-fitter">
                  <el-form label-width="150px" size="small" :model="form">
                      <div class="search-wrapper">
                          <h4 class="title">删除商品</h4>
                      </div>
                  </el-form>
              </div>
          </div>
          <div class="mbottom">
              <div class="goods-fitter">
                  <el-form label-width="100px" size="small" :model="form">
                      <div class="search-wrapper" v-if="false">
                          <h4 class="title">{{ chooseProducts0 }}</h4>
                          <div class="">
                              <el-row>
                                  <el-col :span="8">
                                      <div class="grid-content bg-purple">商家名称：</div>
                                  </el-col>
                                  <el-col :span="8">
                                      <div class="grid-content bg-purple-light">客户名称：</div>
                                  </el-col>
                                  <el-col :span="8">
                                      <div class="grid-content bg-purple"></div>
                                      客服电话：
                                  </el-col>
                              </el-row>
                              <el-row>
                                  <el-col :span="8">
                                      <div class="grid-content bg-purple">货币单位：</div>
                                  </el-col>
                                  <el-col :span="8">
                                      <div class="grid-content bg-purple-light">兑换比例：</div>
                                  </el-col>
                                  <el-col :span="8">
                                      <div class="grid-content bg-purple">地址：</div>
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
                          <!--<h4 class="title">{{ chooseProducts1 }}</h4>-->
                          <div class="search-base" style='position: relative;left: -20px;'>
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
                                                          placeholder="请选择二级分类"
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
                                      <el-col class="btn_right"
                                              style="display: inline-block;width: auto !important;margin-bottom: 19px;">
                                          <el-button type="primary" size="small" @click='serch'>查询</el-button>
                                      </el-col>
                                  </el-col>
                                  <el-col :span="6">
                                      <el-col>
                                          <el-form-item label="商品信息: ">
                                              <el-col>
                                                  <el-input v-model="value" placeholder="请输入商品名称"></el-input>
                                              </el-col>
                                          </el-form-item>
                                      </el-col>
                                  </el-col>
                              </el-row>
                          </div>
                          <div style="margin: 0 20px 20px 0">
                              <el-table
                                      :data="selectGoodPage"
                                      height="800"
                                      stripe
                                      style="width: 100%"
                                      border
                                      ref="elTable"
                              >
                                  <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
                                  <el-table-column label="图样" align="center">
                                      <template slot-scope="scope">
                                          <div class="image"
                                               v-if="scope.row.pushGoodsSKUList[scope.row.index || 0].thumbnailImgUrl">
                                              <img
                                                      :src="scope.row.pushGoodsSKUList[scope.row.index || 0].thumbnailImgUrl"
                                                      width="100"
                                                      height="100"
                                                      alt
                                              />
                                          </div>
                                          <div v-if="!scope.row.pushGoodsSKUList[scope.row.index || 0].thumbnailImgUrl">
                                              暂无图片
                                          </div>
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
                                                      :key="item.skuId"
                                              >
                                                  <div
                                                          class="txt_left imgitem"
                                                          @click="ClicktentTwo(index,scope.row)"
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
                                  <el-table-column label="一件代发价" align="center">
                                      <div>20</div>
                                  </el-table-column>
                                  <el-table-column label="集采价" align="center">
                                      <template slot-scope="scope">
                                          <div class="more txt_left">
                                              商城价：{{scope.row.pushGoodsSKUList[0].volumePrices?scope.row.pushGoodsSKUList[0].volumePrices[0].volumePrice:'暂无'}}
                                          </div>
                                          <div class="more txt_left">
                                              批发价：{{scope.row.pushGoodsSKUList[0].volumePrices?scope.row.pushGoodsSKUList[0].volumePrices[0].volumeCost:'暂无'}}
                                          </div>
                                          <div class="more txt_left">
                                              起订量：{{scope.row.pushGoodsSKUList[0].volumePrices?scope.row.pushGoodsSKUList[0].volumePrices[0].volumeNumber:'暂无'}}
                                          </div>
                                      </template>
                                  </el-table-column>
                                  <el-table-column label="商城价" align="center">
                                      <template slot-scope="scope">
                                          {{scope.row.pushGoodsSKUList[scope.row.index||0].goodsPrice}}元
                                      </template>
                                  </el-table-column>
                                  <el-table-column label="项目商城价" align="center">
                                      <template slot-scope="scope"
                                                v-if="scope.row.pushGoodsSKUList[scope.row.index||0].goodsAdjustPrice">
                                          {{scope.row.pushGoodsSKUList[scope.row.index||0].goodsAdjustPrice}}元
                                      </template>
                                  </el-table-column>
                                  <el-table-column label="项目VIP价" align="center">
                                      <template slot-scope="scope">
                                          <div v-if="scope.row.pushGoodsSKUList[scope.row.index||0].vipGoodsAdjustPrice">
                                              {{scope.row.pushGoodsSKUList[scope.row.index||0].vipGoodsAdjustPrice}}元
                                          </div>
                                      </template>
                                  </el-table-column>
                                  <el-table-column label="利润统计" align="center" prop="">
                                      <template slot-scope="scope">
                                          <div class="txt_left">毛利润：8.8</div>
                                          <div class="txt_left">毛利润率：44%</div>
                                          <div class="txt_left">税率：1.13</div>
                                          <div class="txt_left">税后毛利：7.67</div>
                                          <div class="txt_left">税后毛利率：39%</div>
                                      </template>
                                  </el-table-column>
                                  <el-table-column label="商品分类" align="center" prop="operatorTime">
                                  </el-table-column>
                              </el-table>
                              <div class="pagination" style='text-align: right; margin-top: 20px;'>
                                  <el-pagination
                                          @size-change="pushGoods.pageNum = $event"
                                          @current-change="handleCurrentChange"
                                          :page-sizes="[10, 30, 50, 100]"
                                          :page-size="pushGoods.pageNum"
                                          layout="total,sizes, prev, pager, next, jumper"
                                          :total="checkArr.length"
                                  ></el-pagination>
                              </div>
                          </div>
                      </div>
                  </el-form>
              </div>
          </div>
          <div class="mbottom" v-show="bottomBtn">
              <div class="goods-fitter">
                  <el-form label-width="150px" size="small" :model="form">
                      <div class="search-wrapper">
                          <h4 class="title">删除理由</h4>
                          <template>
                              <div class="tableB">
                                  <el-row>
                                      <el-col :span="3">
                                          <div class="grid-content bg-purple">删除日期</div>
                                      </el-col>
                                      <el-col :span="3">
                                          <div class="grid-content bg-purple">{{year}}年{{month}}月{{day}}日</div>
                                      </el-col>
                                      <el-col :span="3">
                                          <div class="grid-content bg-purple">删除人</div>
                                      </el-col>
                                      <el-col :span="3">
                                          <div class="grid-content bg-purple">{{user.data.sysuserName}}</div>
                                      </el-col>
                                      <el-col :span="3">
                                          <div class="grid-content bg-purple">部门</div>
                                      </el-col>
                                      <el-col :span="3">
                                          <div class="grid-content bg-purple">{{user.data.organizeName}}</div>
                                      </el-col>
                                      <el-col :span="3">
                                          <div class="grid-content bg-purple">职位</div>
                                      </el-col>
                                      <el-col :span="3">
                                          <div class="grid-content bg-purple">{{user.data.position}}</div>
                                      </el-col>
                                  </el-row>
                                  <el-row>
                                      <el-col :span="3">
                                          <div class="grid-content bg-purple" style="height:80px;line-height:80px;">
                                              删除理由
                                          </div>
                                      </el-col>
                                      <el-col :span="21">
                                          <div class="grid-content" style="text-align:left;height:80px;padding: 5px;">
                                              <input type="textarea " v-model="cancelReason"
                                                     style="width: 100%;height: 100%">
                                          </div>
                                      </el-col>
                                  </el-row>
                              </div>
                          </template>
                      </div>
                  </el-form>
              </div>
          </div>
          <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogGoodsVisible = false" size="small" >关 闭</el-button>
        <el-button type="danger" @click="deleProductList" size="small" v-show="bottomBtn">删 除</el-button>
      </span>
      </el-dialog>
     <!-- 商品详情 -->
    <!-- 批量发布 -->
     <el-dialog title="操作提示" :visible.sync="dialogbatchReleaseVisible" width="20%">
        <div style='text-align: center;'>
            <img src="../../../common/images/提示.png" alt style='width:28px;margin-right:15px;vertical-align: middle;'/>
            你确定要批量发布这些商品给所选项目吗？
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="dialogbatchReleaseVisible = false">取 消</el-button>
          <el-button type="primary" @click="confrimDelivery">确 定</el-button>
        </div>
      </el-dialog>
    <!-- 批量发布 -->

  </div>
</template>

<script>
// import GoodsFitter from '../goods/goodsFitter'
import GoodsFitter from './goodsFitter'
import {throttleTipPop} from '@/utils/throttle'
import {
    getAddGoodsList
    ,productPush  ,
    deleteGoods ,
    findSceneBygoods ,
    changeState,
    ConfirmState ,
    getScene,
    auditRecords ,
    Areview ,
    deleteAudit,
    deleteProductList,
    getCatagory1,
    productDlivery,
    publishAll,
    navigationbartree,   //获取树形导航
} from '@/api/product/index'
export default {
  data () {
    return {
        loading: false,
        commoditySource: '一件代发商品',
        collectingIndex: '', //判断是不是集采
      status:'',
      carArr1: [], //一级分类
      carArr2: [], //二级分类
      carArr3: [], //三级分类
      carId1: "", //一级分类id
      carId2: "", //二级分类id
      carId3: "", //三级分类id
      pushProducPagination:{},
      dialogGoodsVisible:false, // 商品详情弹框
      dialogbatchReleaseVisible:false,  // 批量发布弹框
      chooseProducts:'',
      chooseProducts0:'',
      chooseProducts1:'',
      bottomBtn:false,
      value:'',
      textareaValue:'',
      recycleBin:false,
      dialogVisibleaa:false,
      frametextarea:'',
      radio: '1',
      deleteType:false, //移除
      dialogVisible:false,//审核的弹窗
      goodsTypeId:'', //商品的id
      form: {      //自定义
          projectId: "",
          sourceType: "", // 关键字类型
          keyword: "", // 关键字
          catId: "",
          current_page: 1,
          page_size: 10,
          total_count: 0
      },
    pushForm:{
        pushStatus: null,
        auditStatus:1,
        goodsType: 0, // 1，京东 2，网易 3，苏宁 4, 一件代发商品 5, 集采商品
        goodsName:'',
        operatorTimeEnd:'',
        operatorTimeStart:'',
        pageNum:1,
        pageSize:10,
        projectId:'',
        isSubstituteSales: true,
    },
      dialog:{
        value1:'',
        value2:''
      },
      options: [],
      checkList1:[],
      checkList2:[],
      checkedAll:'',
      checkArr:[],
        checkArrCopy: [],
      goods:[
        {name:'精品'},
        {name:'新品'},
        {name:'热销'},
        {name:'取消精品'},
        {name:'取消新品'},
        {name:'取消热销'},
      ],
      checked:'',
      scenario:false, //审核记录
      tableData:[],
      getSceneArr:[],
      title:'审核',
      audit:{
        goodsData:'', // 选择商品的data
        auditType:'', //审核类型
        auditId:'', //审核记录ID
        auditRemark:'', //审核说明
        operationId:'', //审核的业务id
        processId:'', //流程ID，主键
      },
        cancelReason:'', // 移除的理由
        year:'',
        month:'',
        day:'',
        user:'',
        paginationSize:'',
        paginationNum:'',
        paginationTotal:'',
        multipleSelection:[],
        homepagination: [],
        homepaginationSize: '',
        pushGoods: {
            index: 1,
            pageNum: 10
        }
    }
  },
    watch:{
        dialogGoodsVisible(val,oldval){
            if(val!=oldval){
            this.paginationTotal = this.checkArr.length
        }},
        commoditySource() {
            this.checkArr = []
        },
    },
    computed: {
        notMasterSystem() {
            return this.$routerInfo.platformType != 0;
        },
        selectGoodPage() {
            let start = (this.pushGoods.index - 1) * this.pushGoods.pageNum;
            let end = this.pushGoods.index * this.pushGoods.pageNum;
            return this.checkArr.slice(start, end);
        }

    },
    watch: {
        dialogGoodsVisible(val) {
            if (!val) {
                this.tableData.forEach(item => {
                    this.$refs.pushGoodsList.toggleRowSelection(item, false)
                })
                this.checkArr = []
            }
        }
    },
  mounted(){
      let now = new Date();
      this.year = now.getFullYear(); //得到年份
      this.month = now.getMonth()+1;//得到月份
      this.day = now.getDate();//得到日期
      this._getGoodsList(this.pushForm)
  },
    created(){
     // 三级联动
        this._getCatagory2();
     this.getUser()
    },
  methods: {
      //推送中商品
      pushing() {
          this.pushForm.pushStatus = 10
          this._getGoodsList(this.pushForm);
      },
      //查询
      serch() {
          if (this.value == '') {
              this.checkArr = this.checkArrCopy
          }
          let selectGood = []
          this.checkArr.filter(item => {
              if (item.goodsName.indexOf(this.value) != -1) {
                  selectGood.push(item)
              }
              this.checkArr = selectGood
          });
      },
      //全部发布
      publishAll(){
          if (this.tableData.length <= 0) return throttleTipPop(this, 'info', '暂无商品')
          let flag = false
          // this.tableData.forEach(item => {
          //     item.pushGoodsSKUList.forEach(items => {
          //         if (items.volumePrices) {
          //             items.volumePrices.forEach(itemList => {
          //                 if (itemList.volumePrice < items.costPrice) {
          //                     flag = true
          //                 }
          //             })
          //         }
          //     })
          // })
          this.allPushList()
      },

      //    全部发布函数
      allPushList() {
          this.$confirm('确认发布全部商品吗, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(() => {
              this.loading = true
              publishAll().then(() => {
                  this.loading = false
                  this._getGoodsList(this.pushForm)
                  this.$message({
                      type: 'success',
                      message: '发布成功!'
                  });
              })
          }).catch(() => {
              this.$message({
                  type: 'info',
                  message: '已取消删除'
              });
          });
      },
  //弹框删除
      deleProductList(){
          let pushIds=[]
          this.checkArr.forEach(item=>{
              pushIds.push(item.pushId)
          })
          this.$confirm('确认删除该商品, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
          }).then(async() => {
              const res = await  deleteProductList(pushIds,this.cancelReason)
              if(res.code === 200 ){
                  this._getGoodsList();
                  this.dialogGoodsVisible = false
                  this.checkArr=[]
                  this.$message({
                      type: 'success',
                      message: '删除成功!'
                  });
              }
          })
      },
      //获取当前登录人的信息
      getUser(){
          this.user =JSON.parse(localStorage.getItem('user'))
      },

    // 批量发布
    batchRelease() {
        let flag = false
        if (this.checkArr.length <= 0) {
            return throttleTipPop(this, 'info', '请选择商品')
      }
        this.checkArr.forEach(item => {
            item.pushGoodsSKUList.forEach(items => {
                if (items.volumePrices) {
                    items.volumePrices.forEach(itemList => {
                        if (itemList.volumePrice < items.costPrice) {
                            flag = true
                        }
                    })
                }
            })
        })
        this.dialogbatchReleaseVisible = true
        // setTimeout(() => {
        //     if (flag) {
        //         this.$confirm('您所选商品中，有异常价格的商品, 是否继续?', '提示', {
        //             confirmButtonText: '确定',
        //             cancelButtonText: '取消',
        //             type: 'warning'
        //         }).then(() => {
        //             this.dialogbatchReleaseVisible = true
        //         }).catch(() => {
        //             this.$message({
        //                 type: 'info',
        //                 message: '取消推送'
        //             });
        //         });
        //     } else {
        //         this.dialogbatchReleaseVisible = true
        //     }
        // })

    },
      //确认发布
      async confrimDelivery(){
          this.dialogbatchReleaseVisible = false
          this.loading = true
        let pushIds= []
        this.checkArr.forEach(item=>{
            pushIds.push(item.pushId)
        })
       const res = await productDlivery(pushIds)
          if(res.code === 200 ){
              this.loading = false
              this._getGoodsList(this.pushForm)
              this.$message({
                  type:'success',
                  message:'发布成功'
              })
          }
      },
     //商品详情
    releaseDetails() {
      if(this.checkArr.length<=0) return this.$message("请选择商品")
      //this.$router.push({ name: "GoodsDetail" ,query: { id: data.goodsId } });
       this.dialogGoodsVisible = true
       this.chooseProducts = '取消商品详情'
       this.chooseProducts0 = '项目信息'
       this.chooseProducts1 = '已选商品'
       this.bottomBtn = false
    },
    // 批量删除
    batchDelete() {
        if (this.checkArr.length <= 0) return throttleTipPop(this, 'info', '请选择删除的商品')
       this.dialogGoodsVisible = true
       this.chooseProducts = '取消商品'
       this.chooseProducts0 = '项目信息'
       this.chooseProducts1 = '已选商品'
       this.bottomBtn = true
        this.checkArrCopy = JSON.parse(JSON.stringify(this.checkArr))
    },

    //点击规格展示不同的内容
    Clicktent(val,data){
      data.index = val
      console.log(this.$refs.elTable)
      this.$set(this.$refs.elTable.data)
      this.$forceUpdate();
    },
      //切换不同的内容
  Clicktentone(val, data) {
      data.index = val;
      this.$set(this.$refs.pushGoodsList, "data", [...this.$refs.pushGoodsList.data]);
  },
  ClicktentTwo(val, data) {
      data.index = val;
      this.$set(this.$refs.elTable, "data", [...this.$refs.elTable.data]);
  },
    //  获取商品
    _getGoodsList(obj){
      productPush(obj).then(res => {
        var that =this
        that.tableData = res.data.content
        this.pushProducPagination.totalPages = res.data.totalElements;
        this.pushProducPagination.size = res.data.size;
        this.pushProducPagination.number = res.data.number;
          this.$nextTick(() => {
              this.checkedfunc(this.tableData);
          });
      })
    },

      //获取分类
      carIdFunc(val, index) {
          this.form.catId = val;
          this.tableData.catId = val;
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
              console.log(val)
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

      handleSizeChange1(val) {
        this.pushForm.pageSize = val
       this._getGoodsList(this.pushForm);
      },
      handleCurrentChange1(val){
          this.pushForm.pageNum = val
          this._getGoodsList(this.pushForm);
    },

      //删除弹窗分页
      handleCurrentChange(val) {
          this.pushGoods.index = val
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
          for (var i = 0; i < check.length; i++) {
              for (var j = 0; j < arr.length; j++) {
                  if (check[i].goodsId === arr[j].goodsId && check[i].operatorTime === arr[j].operatorTime) {
                      this.$refs.pushGoodsList.toggleRowSelection(this.tableData[j], true);
                  }
              }
          }
      },
      //所搜的内容
      handleGetGoodsList(data, val, index, name) {
          this.commoditySource = name
          this.status = val
          this.pushForm = data
          this.collectingIndex = index
          this._getGoodsList(data);
     },
  },

  components: {
    GoodsFitter
  }
}
</script>
<style scoped>
   .margin1 >>> .el-dialog__body {
    padding: 0 !important;
    background: none !important;
  }
</style>
<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
.mallDialog .el-dialog{
  background: #ebf4fe !important;
}
.tableB{
  margin-bottom:20px;
  position: relative;
  left: -10px;
}
.tableB .grid-content{
   border-right: 1px solid #EBEEF5;
   text-align: center;
   border-bottom: 1px solid #EBEEF5;
}
.tableB>div:nth-child(1){
   border-top: 1px solid #EBEEF5;
   border-left: 1px solid #EBEEF5;
}
.tableB>div:nth-child(2){
   border-left: 1px solid #EBEEF5;
}
.tableB .bg-purple{
   background: #f7faff !important;
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
.grid-content{
  line-height: 40px;
}
 .el-form-item--small .el-form-item__label {
    width: 60px;
}
.toggleColor{
    color: red
}
.toggleGreen{
    color:rgb(103,194,58);
}

.activit {
    background: red;
    color: white;
    font-weight: 800;
    text-align: center;
}
</style>
