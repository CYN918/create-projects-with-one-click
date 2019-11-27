<template>
  <div class="margin">
    <goods-fitter
      class="mbottom"
      :dataObj="form"
      @goodsFitter="handleGetGoodsList"
      @tabVender="handleGetGoodsList"
    ></goods-fitter>
    <div class="mcard" style="border: 1px solid #d7e0f1;">
      <!-- <div class="mbottom">
							<el-checkbox v-model="checked">全选本页</el-checkbox>
							<el-checkbox v-model="checkedAll">全选所有页</el-checkbox>
							<el-button
								type="primary"
								size="small"
								@click="dialogFormVisible = true"
								style="margin-left:10px"
							>批量操作</el-button>
      </div>-->
      <div class="mbottom">
        <el-button
          type="primary"
          size="small"
          @click="addTo"
          v-permit="'Add:goods'"
          v-if="form.third_party == 4 || form.third_party == 5||form.third_party == 6"
        >添加商品</el-button>
      </div>
      <el-table
        :data="tableData"
        ref="elTable"
        stripe
        style="width: 100%"
        border
        @select="choose"
        @select-all="chooseAll"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
        <el-table-column label="商品图片" align="center" width="120">
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
        <el-table-column label="商品信息" align="center" width="150">
          <template slot-scope="scope">
            <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
            <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
            <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
            <div class="txt_left">品牌：{{scope.row.brandName}}</div>
            <div class="txt_left">上传方式：{{scope.row.sourceType}}</div>
            <div class="txt_left" v-if="scope.row.auditType">审核类型：<span style="color:#f66c6c">{{scope.row.auditType}}</span> </div>
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
                {{scope.row.sourceTypeId | source}}：{{scope.row.skuInfo[scope.row.index].priceInfo.thirdPrice !=
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
              <div class="txt_left">{{item.volumeCost}}</div>
              <div class="txt_left">{{item.volumeNumber}}</div>
              <div class="txt_left">{{item.volumeCarriage}}</div>
            </div>
            <div class="txt_left">
              对外PPT价格：
              <span class="blue">{{scope.row.skuInfo[scope.row.index].volumeInfo.pptPrice}}</span>
            </div>
            <div class="txt_left">
              对外最低报价：
              <span
                class="blue"
              >{{scope.row.skuInfo[scope.row.index].volumeInfo.minimumPrice}}</span>
            </div>
            <div class="txt_left">
              给我司的特惠价：
              <span
                class="blue"
              >{{scope.row.skuInfo[scope.row.index].volumeInfo.preferentialPrice}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品规格" align="center" width="200">
          <template slot-scope="scope">
            <div style="height: 300px;overflow-y: auto;">
              <div class="txt_left martop" v-for="(item,index) in scope.row.skuInfo" :key="index">
                <div
                  class="txt_left imgitem"
                  @click="Clicktent(index,scope.row)"
                  :class="[index == scope.row.index?'leftbottom':'']"
                >
                    <!-- <img src="../../../common/images/商品规格(1)shouji.png" alt="" v-if="index == scope.row.index">  -->
                  <div class="more">{{item.goodsSpecValues}}</div>
                </div>
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
              >分销利润率：{{scope.row.skuInfo[scope.row.index].financeInfo.distrProfitMargin}}%</div>
            </div>
            <!-- 非平台展示信息 -->
            <div v-else>
              <div
                class="txt_left"
              >毛利润：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfit}}</div>
              <div
                class="txt_left"
              >毛利润率：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMargin}}%</div>
              <div class="txt_left">税费：{{scope.row.skuInfo[scope.row.index].financeInfo.taxation}}</div>
              <div
                class="txt_left"
              >税后毛利：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitTax}}</div>
              <div
                class="txt_left"
              >税后毛利率：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMarginTax*100}}%</div>
              <div
                class="txt_left"
              >企业所得税：{{scope.row.skuInfo[scope.row.index].financeInfo.incomeTax}}</div>
              <div class="txt_left">纯利润：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfit}}</div>
              <div
                class="txt_left"
              >纯利率：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfitMargin*100}}%</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="集采利润统计" align="center" width="120">
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
            >库存预警：{{scope.row.skuInfo[scope.row.index].warnNumber}}</div>
          </template>
        </el-table-column>
        <el-table-column label="供应商" align="center" width="150">
          <template slot-scope="scope">
            <!-- 平台展示信息 -->
            <div v-if="scope.row.sourceTypeId == 2">
              <div class="txt_left">深圳市迈戈实业有限公司</div>
            </div>
            <!-- 非平台展示信息 -->
            <div v-else>
              <div
                class="txt_left"
                style="font-size:15px"
              >{{scope.row.skuInfo[scope.row.index].suppliersName}}</div>
              <div class="txt_left">联系人：{{scope.row.skuInfo[scope.row.index].contactName}}</div>
              <div class="txt_left">联系人电话：{{scope.row.skuInfo[scope.row.index].contactTelephone}}</div>
              <div class="txt_left">QQ：{{scope.row.skuInfo[scope.row.index].contactQq}}</div>
              <div class="txt_left">管理员：{{scope.row.adminName}}</div>
              <div class="txt_left">管理员手机/邮箱：{{scope.row.adminPhone+'/'+scope.row.adminEmail}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="类型/状态" align="center" width="200">
          <template slot-scope="scope">
            <div class="txt_left">类型：{{scope.row.goodsType}}</div>
            <div class="txt_left">排序：{{scope.row.sortOrder}}</div>
            <div class="txt_left">更新：{{scope.row.updateTime}}</div>
            <div class="txt_left">
              状态：{{scope.row.reviewStatus == 0?'未审核 ':scope.row.reviewStatus ==
              1?'审核不通过':'审核通过'}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" fixed="right">
          <template slot-scope="scope">
            <div v-if="scope.row.reviewStatus == 0">
              <div class="line-div small_top">
                <div class="small-Idiv">
                  <div class="activity">
                    <img src="../../../common/images/goods/yijiandaifa.png" alt class="div_img" />
                  </div>
                  <span
                    style="word-break: keep-all;margin-left: 5px;left:10px"
                    class="spanclass"
                  >一件代发</span>
                </div>
                <el-switch
                  v-model="scope.row.skuInfo[scope.row.index].priceInfo.isSubstituteSales"
                  disabled
                  :active-value="1"
                  :inactive-value="0"
                  active-color="#8CC5FF"
                ></el-switch>
              </div>
                <div class="small-Idiv" @click="attribute(scope.row.goodsId)" v-permit="'goods:audited'">
                  <div class="i-div fuzhi">
                    <img src="../../../common/images/icon/审核.png" alt class="operation_img" />
                  </div>
                  <span>审核</span>
                </div>
                <div class="small-Idiv" @click="scenariofc(scope.row.goodsId)">
                  <div class="i-div huishouzhan">
                    <img src="../../../common/images/icon/审核记录.png" alt class="operation_img" />
                  </div>
                  <span>审核记录</span>
                </div>
            </div>
            <div v-if="scope.row.reviewStatus == 1 || scope.row.reviewStatus == 2">
              <div class="line-div small_top" @click="Stand(scope.row)"  v-permit="'goods:upper'">
                <div class="small-Idiv">
                  <div class="activity">
                    <img src="../../../common/images/goods/xiajiashangjia.png" alt class="div_img" />
                  </div>
                  <span
                    style="word-break: keep-all;margin-left: 19px;left:10px"
                    class="spanclass"
                  >上架</span>
                </div>
                <el-switch
                  v-model="scope.row.isOnSale"
                  :active-value="1"
                  disabled
                  :inactive-value="0"
                  active-color="#8CC5FF"
                ></el-switch>
              </div>
              <!-- <div class="line-div small_top">
                <div class="small-Idiv">
                  <div class="activity">
                    <img src="../../../common/images/goods/yijiandaifa.png" alt class="div_img" />
                  </div>
                  <span
                    style="word-break: keep-all;margin-left: 5px;left:10px"
                    class="spanclass"
                  >一件代发</span>
                </div>
                <el-switch
                  v-model="scope.row.skuInfo[scope.row.index].priceInfo.isSubstituteSales"
                  disabled
                  :active-value="1"
                  :inactive-value="0"
                  active-color="#8CC5FF"
                ></el-switch>
              </div> -->
                <div class="small-Idiv" @click="editor(scope.row)"  v-permit="'goods:edit'">
                  <div class="i-div">
                    <img src="../../../common/images/icon/编辑.png" alt class="operation_img" />
                  </div>
                  <span>编辑</span>
                </div>
                <div class="small-Idiv" @click="submitScenario(scope.row)" >
                  <div class="i-div huishouzhan">
                    <img src="../../../common/images/icon/场景定制.png" alt class="operation_img" />
                  </div>
                  <span>场景定制</span>
                </div>
                <div class="small-Idiv" @click="goodsDetail(scope.row)">
                  <div class="i-div fuzhi">
                    <img src="../../../common/images/icon/货物列表.png" alt class="operation_img" />
                  </div>
                  <span>商品详情</span>
                </div>
                <div class="small-Idiv" @click="recycleBinfunc(scope.row)"   v-permit="'goods:recovery'">
                  <div class="i-div huishouzhan">
                    <img src="../../../common/images/icon/回收站.png" alt class="operation_img" />
                  </div>
                  <span>回收站</span>
                </div>
              </div>
            <!-- <div class="line-div small_top" style>
													<div class="small-Idiv" @click="deleteTypefunc(scope.row.goodsId)">
														<div class="i-div huishouzhan">
															<img src="../../../common/images/icon/回收站.png" alt class="operation_img" />
														</div>
														<span>移除</span>
													</div>
            </div>-->
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
      <!-- 移除 -->
      <el-dialog title="移除" :visible.sync="deleteType" width="30%">
        <el-form :model="form" label-width="100px">
          <el-form-item label="移除原因:">
            <el-input type="textarea" v-model="delete_remark"></el-input>
          </el-form-item>
          <!-- <el-form-item label="上级领导审核:">
											<el-select v-model="form.region" placeholder="请选择">
												<el-option label="销售总监" value="0"></el-option>
												<el-option label="采购经理" value="1"></el-option>
											</el-select>
          </el-form-item>-->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="deleteType = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteTypefunc('',true)" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 移除 -->
      <!-- 批量操作弹窗 -->
      <el-dialog title="批量操作" :visible.sync="dialogFormVisible" width="40%">
        <el-form :model="form" label-width="150px">
          <el-form-item label="商品操作：">
            <el-checkbox-group v-model="checkList1">
              <el-checkbox label="上架"></el-checkbox>
              <el-checkbox label="下架"></el-checkbox>
              <el-checkbox label="本地化"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="商品操作：">
            <el-checkbox-group v-model="checkList2">
              <el-checkbox :label="item.name" v-for="item in goods" :key="item.name"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="转移分类：">
            <el-select v-model="form.region" placeholder="请选择" class="el-select-width">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转移扩展分类：">
            <el-select v-model="form.region" placeholder="请选择" class="el-select-width">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转移供应商：">
            <el-select v-model="form.region" placeholder="请选择" class="el-select-width">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转移品牌：">
            <el-select v-model="form.region" placeholder="请选择" class="el-select-width">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设置分组：">
            <el-select v-model="form.region" placeholder="请选择" class="el-select-width">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 批量操作弹窗 -->
    </div>

    <!-- 审核 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="120px" size="small">
        <el-form-item label="审核类型:">
          <span>{{audit.auditType | TypeName}}</span>
        </el-form-item>
        <el-form-item label="审核意见:">
          <el-radio v-model="radio" label="1">通过</el-radio>
          <el-radio v-model="radio" label="2">不通过</el-radio>
        </el-form-item>
        <el-form-item label="审核原因：">
          <el-input type="textarea" v-model="desc"></el-input>
        </el-form-item>
        <!--<el-form-item label="上级领导审核:" >
									<el-select v-model="form.people" placeholder="请选择">
										<el-option label="销售总监" value="0"></el-option>
										<el-option label="销售大佬" value="1"></el-option>
									</el-select>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="sure" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 回收站 -->
    <el-dialog title="回收站" :visible.sync="recycleBin" width="30%">
      <el-form :model="form" label-width="100px">
        <el-form-item label="回收原因:">
          <el-input type="textarea" v-model="textareaValue"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="recycleBin = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteRecycleBin" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 场景定制弹窗 -->
    <div class="spicallist">
      <el-dialog title="场景定制" :visible.sync="scenario" width="40%">
        <div class="scssfiter">
          <div class="mbottom" v-for="(item,index) in getSceneArr" :key="index">
            <div class="goods-fitter">
              <div class="search-wrapper">
                <h4 class="title">
                  {{item.typeName}}
                  <span
                    style="font-size:14px"
                  >{{index == getSceneArr.length-1?'（请选择1个场景）':'（请选择2个场景）'}}</span>
                </h4>
                <br />
                <div class="scene_div">
                  <div
                    :span="6"
                    v-for="(data,index2) in item.children"
                    :key="index2"
                    class="sceneName"
                  >
                    <el-checkbox-group
                      v-model="item.Giftmodel"
                      :max="index == getSceneArr.length-1?1:2"
                    >
                      <el-checkbox :label="data.sceneId" :key="data.sceneId">{{data.sceneName}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer scenario">
            <el-button type="danger" @click="scenario = false" size="small">取 消</el-button>
            <el-button type="primary" @click="submitScenario('',true)" size="small">确 定</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
    <!-- 上架下架商品 -->
    <el-dialog :title="title" :visible.sync="dialogVisibleaa" width="30%">
      <span>
        <el-input type="textarea" :rows="3" placeholder="请输入理由" v-model="frametextarea"></el-input>
      </span>
      <span slot="footer" class="dialog-footer" style="margin-top:-5px">
        <el-button type="danger" @click="dialogVisibleaa = false" size="small">取 消</el-button>
        <el-button type="primary" @click="surea" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import GoodsFitter from '../goods/goodsFitter'
import GoodsFitter from "./goodsFitter";
import {
  getGoodsList,
  associatedValues,
  deleteGoods,
  findSceneBygoods,
  changeState,
  ConfirmState,
  getScene,
  auditRecords,
  Areview,
  deleteAudit
} from "@/api/product/index";
import axios from "axios";

export default {
  data() {
    return {
      textareaValue: "",
      recycleBin: false,
      dialogVisibleaa: false,
      frametextarea: "",
      radio: "1",
      deleteType: false, //移除
      dialogVisible: false, //审核的弹窗
      goodsTypeId: "", //商品的id
      state: "2", //审核状态
      desc: "",
      form: {
        third_party: "4", // 1，京东 2，网易 3，苏宁 4, 一件代发商品 5, 集采商品
        search_type: "1", // 关键字类型
        keyword: "", // 关键字
        isReal: 1, //是否是实物。1，是；0，否
        grossProfitMarginStart: "", //税前毛利润率起始
        grossProfitMarginEnd: "", // 税前毛利润率结束
        grossProfitMarginTaxStart: "", //税后毛利润率起始
        grossProfitMarginTaxEnd: "", //税后毛利润率结束
        netProfitMarginStart: "", //税后纯利润率起始
        netProfitMarginEnd: "", //税后纯利润率结束
        distrProfitMarginStart: "", //分销利润率起始
        distrProfitMarginEnd: "", //分销利润率结束
        costPriceStart: "", //商品成本价起始
        costPriceEnd: "", //商品成本价结束
        costPriceJdRatioStart: "", //一件代发价对比京东/天猫折扣率开始
        costPriceJdRatioEnd: "", //一件代发价对比京东/天猫折扣率结束
        shopJdRatioStart: "", //商城价对比京东价折扣率开始
        shopJdRatioEnd: "", //商城价对比京东价折扣率结束
        volumeJdRatioStart: "", //批发价1对比京东/天猫折扣率开始
        volumeJdRatioEnd: "", //批发价1对比京东/天猫折扣率结束
        volumeShopRatioStart: "", //批发价1对比商城利润率开始
        volumeShopRatioEnd: "", //批发价1对比商城利润率结束
        sysUserId: "", //采购员id
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
      dialog: {
        value1: "",
        value2: ""
      },
      options: [
        {
          value: "0",
          label: "员工福利"
        },
        {
          value: "1",
          label: "商务礼品"
        },
        {
          value: "2",
          label: "洽谈会议"
        },
        {
          value: "3",
          label: "生日聚会"
        },
        {
          value: "4",
          label: "企业年会"
        },
        {
          value: "5",
          label: "感恩答谢"
        },
        {
          value: "6",
          label: "开业庆典"
        },
        {
          value: "7",
          label: "办公用品"
        },
        {
          value: "8",
          label: "促销活动"
        },
        {
          value: "9",
          label: "银行卡礼"
        },
        {
          value: "10",
          label: "随手礼"
        },
        {
          value: "11",
          label: "基金定投"
        }
      ],
      checkList1: [],
      checkList2: [],
      checkArr: [],
      checkedAll: "",
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
      dialogFormVisible: false, //批量操作弹窗
      tableData: [],
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
      delete_remark: "" // 移除的理由
    };
  },
  mounted() {
    this.startLoading()
    this._getGoodsList();
    this._getScene();
  },
  methods: {
    addTo() {
      this.$router.push({
        name: "ProductaduitAdd",
        query: { isReal: this.form.isReal }
      });
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
          this.checkArr.push(data.goodsId);
        });
      } else {
        this.tableData.forEach(item => {
          this.deletechecked(item);
        });
      }
    },
    // 删除记忆选择的数据
    deletechecked(data) {
      let index = this.checkArr.indexOf(data.goodsId);
      if (index != -1) {
        this.checkArr.splice(index, 1);
      } else {
        this.checkArr.push(data.goodsId);
      }
    },
    // 默认选中
    checkedfunc(arr) {
      let check = this.checkArr;
      let that = this;
      for (var i = 0; i < check.length; i++) {
        for (var j = 0; j < arr.length; j++) {
          if (check[i] == arr[j].goodsId) {
            this.$refs.elTable.toggleRowSelection(this.tableData[j], true);
          }
        }
      }
    },
    isSysuser() {
      let user = window.localStorage.getItem("user");
      user = JSON.parse(user);
      if (user.data.sysuserType == 0) {
        return true;
      }
      return false;
    },
    //编辑
    editor(data) {
      if (data.isOnSale == 1 || data.reviewStatus == 0) {
        let txt = "";
        data.isOnSale == 1 ? (txt = "商品正在商场销售，先下架商品") : "";
        data.reviewStatus == 0 ? (txt = "商品正在审核中") : "";
        throttleTipPop(this, "error", txt);
      } else {
        this.$router.push({
          name: "Productaudit",
          query: { id: data.goodsId, isReal: this.form.isReal }
        });
      }
    },
    // 提交绑定的场景
    submitScenario(data, type) {
      if (data) {
        this.scenario = true;
        this.goodsData = data.goodsId;
        this.getSceneArr.forEach(item1 => {
          item1.Giftmodel = [];
        });
        findSceneBygoods(data.goodsId).then(res => {
          this.getSceneArr.forEach(data1 => {
            data1.children.forEach(data2 => {
              res.data.forEach(data3 => {
                if (data2.sceneId == data3.sceneId) {
                  data1.Giftmodel.push(data3.sceneId);
                }
              });
            });
          });
        });
      }
      if (type) {
        let arr = this.getSceneArr;
        for (var i = 0; i < arr.length; i++) {
          if (i == arr.length - 1) {
            if (arr[i].Giftmodel.length < 1) {
              this.$notify.error({
                title: "错误",
                message: "请选择一个" + arr[i].typeName
              });
              return;
            }
          } else {
            if (arr[i].Giftmodel.length < 2) {
              this.$notify.error({
                title: "错误",
                message: "请选择两个" + arr[i].typeName
              });
              return;
            }
          }
        }
        let obj = {};
        let newArr = [];
        obj.goodsId = this.goodsData;
        arr.forEach(item => {
          item.Giftmodel.forEach(data => {
            newArr.push(data);
          });
        });
        let str = "";
        newArr.forEach(data => {
          str += data + ",";
        });
        obj.sceneIds = str.slice(0, str.length - 1);
        associatedValues(obj).then(res => {
          if (res.code == 200) {
            this.scenario = false;
            this.$message({
              message: res.message,
              type: "success"
            });
          }
        });
      }
    },
    //确认加入回收站
    deleteRecycleBin() {
      deleteGoods(this.goodsData, this.textareaValue, 1).then(res => {
        if (res.code == 200) {
          this.recycleBin = false;
          this.$message({
            message: res.message,
            type: "success"
          });
          this._getGoodsList();
        }
      });
    },
    //获取场景定制
    _getScene() {
      getScene().then(res => {
        res.data.forEach(item => {
          item.Giftmodel = [];
          this.getSceneArr.push(item);
        });
      });
    },
    //商品详情
    goodsDetail(data) {
      this.$router.push({ name: "GoodsDetail", query: { id: data.goodsId } });
    },
    //商品添入回收站
    recycleBinfunc(data) {
      if (data.isOnSale == 1) {
        this.$message.error("商品正在商场销售，先下架商品");
      } else {
        this.goodsData = data.goodsId;
        this.recycleBin = true;
      }
    },
    //移除
    deleteTypefunc(val, type) {
      if (val) {
        this.goodsTypeId = val;
        this.deleteType = true;
      }
      if (type) {
        let obj = {};
        obj.goodsId = this.goodsTypeId;
        obj.remark = this.delete_remark;
        deleteAudit(obj).then(res => {
          if (res.code == 200) {
            this.deleteType = false;
            this.$message({
              message: res.message,
              type: "success"
            });
          }
        });
      }
    },
    //审核记录
    scenariofc(id) {
      this.$router.push({ name: "ProductAuditdetails", query: { id: id } });
    },
    //上下架商品
    Stand(data) {
      this.goodsData = data;
      this.dialogVisibleaa = true;
      data.isOnSale == 1
        ? (this.title = "下架商品")
        : (this.title = "上架商品");
    },
    //确定上下架
    surea() {
      changeState(this.goodsData, this.frametextarea).then(res => {
        if (res.code == 200) {
          this.dialogVisibleaa = false;
          this.$message({
            message: res.message,
            type: "success"
          });
          this._getGoodsList();
        }
      });
    },
    // 审核确定
    sure() {
      Areview(this.audit, this.radio, this.desc).then(res => {
        if (res.code == 200) {
          this.dialogVisible = false;
          this.$message({
            message: res.message,
            type: "success"
          });
          this._getGoodsList();
        }
      });
    },
    //编辑
    handleClick() {
      this.$router.push({ name: "ProductAdd11" });
    },
    //审核
    attribute(id) {
      this.goodsTypeId = id;
      this.state = "2";
      let obj = {};
      obj.goodsId = id;
      obj.code = 1;
      auditRecords(obj).then(res => {
        if (res.code == 200) {
          this.dialogVisible = true;
          this.audit.auditType = res.data[0].auditType; // 审核类型
          this.audit.auditId = res.data[0].auditId; //审核记录ID
          this.audit.auditRemark = res.data[0].processList[0].auditRemark; //审核说明
          this.audit.operationId = res.data[0].processList[0].operationId; //审核的业务id
          this.audit.processId = res.data[0].processList[0].processId; //流程ID，主键
        }
      });
    },
    //提交审核
    Confirm() {
      ConfirmState(this.state, this.goodsTypeId).then(res => {
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: "success"
          });
          this._getGoodsList();
          this.dialogVisible = false;
        }
      });
    },
    //点击规格展示不同的内容
    Clicktent(val, data) {
      data.index = val;
      this.$set(this.$refs.elTable.data);
      this.$forceUpdate();
    },
    _getGoodsList() {
      if (this.form.third_party == 6) {
        let obj = JSON.parse(JSON.stringify(this.form));
        obj.third_party = null;
        console.log(111, obj);
        getGoodsList(obj).then(res => {
          this.tableData = res.data.pageList;
          this.tableData.map(v => {
            this.$set(v, "showItem", true);
            return v;
          });
          this.tableData.forEach(item => {
            item.top = 0;
          });
          this.form.total_count = res.data.count;
          if (this.checkedAll) {
            this.$nextTick(() => {
              this.checkedAllfunc(this.tableData);
              this.endLoading()
            });
          } else {
            this.$nextTick(() => {
              this.checkedfunc(this.tableData);
              this.endLoading()
            });
          }
        });
      } else {
        getGoodsList(this.form).then(res => {
          this.tableData = res.data.pageList;
          this.tableData.map(v => {
            this.$set(v, "showItem", true);
            return v;
          });
          this.tableData.forEach(item => {
            item.top = 0;
          });
          this.form.total_count = res.data.count;
          if (this.checkedAll) {
            this.$nextTick(() => {
              this.checkedAllfunc(this.tableData);
              this.endLoading()
            });
          } else {
            this.$nextTick(() => {
              this.checkedfunc(this.tableData);
              this.endLoading()
            });
          }
        });
        
      }
    },
    getTableData() {},
    handleGetGoodsList(data) {
      this.form = data;
      this._getGoodsList();
    },
    handleSizeChange(val) {
      this.form.page_size = val;
      this._getGoodsList();
    },
    handleCurrentChange(val) {
      this.form.current_page = val;
      this._getGoodsList();
    }
  },
  filters: {
    TypeName(val) {
      let arr = [
        { auditType: 1, name: "上架" },
        { auditType: 2, name: "下架" },
        { auditType: 3, name: "调价" },
        { auditType: 4, name: "信息变更" },
        { auditType: 5, name: "商品移入回收站" },
        { auditType: 6, name: "京东改价" },
        { auditType: 7, name: "删除商品" }
      ];
      for (var i = 0; i < arr.length; i++) {
        if (val == arr[i].auditType) {
          return arr[i].name;
        }
      }
    },
    source(val){
      switch(val){
        case 0:
          return '京东/天猫价'
          break;
        case 1:
          return '京东价'
          break;
        case 2:
          return '平台推送'
          break;
        case 3:
          return '京东价'
          break;
        case 4:
          return '天猫/阿里采集'
          break;
        case 5:
          return '京东价'
          break;
        case 6:
          return '天猫/阿里采集'
          break;
        case 7:
          return '苏宁价'
          break;
        case 8:
          return '网易价'
          break;
      }
    }
  },
  components: {
    GoodsFitter
  }
};
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";

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
  height: 32px;
  border-radius: 6px;
}

.line-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.blue {
  color: #4a99fa;
  cursor: pointer;
}
.small-Idiv {
  float: left;
  width: 45%;
  padding-top: 10px;
}
.small-Idiv:nth-of-type(odd) {
  margin-left: 4%;
}
</style>
