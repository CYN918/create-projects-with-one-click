<template>
    <div id="addPurchasing">
      <el-dialog width="72%" :visible.sync="changeVisible" :before-close="createClosing">
            
       
            <div class="mbottom">
            <div class="goods-fitter">
                <el-form label-width="100px" size="small">
                <div class="search-wrapper">
                    <h4 class="title">变更商品</h4>
                </div>
                </el-form>
            </div>
            </div>
            <div class="mbottom">
            <div class="goods-fitter">
                <el-form ref="infoForm" :model="form" :rules="rules" label-width="140px" size="small">
                <div class="search-wrapper">
                    <div class="mbottom">
                    <h4 class="title1">客户信息</h4>
                    </div>
                    <div class="search-base">
                    <el-row>
                        <el-col :span="12">
                        <el-col>
                            <el-form-item label="销售单号：">
                            <el-col :span="19">
                                <span>{{changeList.saleOrderNo}} </span>
                            </el-col>
                            </el-form-item>
                        </el-col>
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="平台名称： ">
                            <el-col :span="19">
                                <span>{{changeList.projectName}} </span>
                            </el-col>
                        </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                        <el-col>
                            <el-form-item label="客户名称：" prop="customerName">
                            <el-col :span="19">
                                <el-input v-model="changeList.customerName" readonly></el-input>
                            </el-col>
                            </el-form-item>
                        </el-col>
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="联系人：" prop="customerContacts">
                            <el-col :span="19">
                                <el-input v-model="changeList.customerContact" readonly></el-input>
                            </el-col>
                        </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                        <el-col>
                            <el-form-item label="手机号码：" prop="mobilePhone ">
                            <el-col :span="19">
                                <el-input v-model="changeList.phone" readonly></el-input>
                            </el-col>
                            </el-form-item>
                        </el-col>
                        </el-col>
                        <el-col :span="12">
                        <el-form-item label="电话号码：">
                            <el-col :span="19">
                            <el-input v-model="changeList.tel" readonly></el-input>
                            </el-col>
                        </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="邮箱：">
                                <el-col :span="19">
                                <el-input v-model="changeList.email" readonly></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="地址：">
                                <el-col :span="19">
                                <el-input v-model="form.address" readonly></el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>        
                    </el-row>
                    </div>
                </div>
                </el-form>
            </div>
            </div>
            <div class="goods-fitter">
            <div class="mail-fitter" style="margin-top:20px">
                <el-form ref="infoForm" :model="changeList" :rules="rules" label-width="100px" size="small">
                <div class="mail-wrapper">
                    <h4 class="title1">原订单商品明细 </h4>
                    <div class="search-base">
                    <div class="mbottom">
                        <div class="goods-fitter">
                        <div class="mcard" style="padding-bottom:0">
                            <el-table :data="changeList.oldGoodsDetailParam" border style="width: 100%" stripe>
                            <el-table-column  label="序号" type="index" align="center" width="50"></el-table-column>
                            <el-table-column prop="customerType" label="商品信息" align="center" width="200">
                                    <template slot-scope="scope">
                                        <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                                        <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                                        <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                                        <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                                        <div class="txt_left">SKU：{{scope.row.goodsSkuId}}</div>
                                    </template>
                            </el-table-column>
                            <el-table-column prop="commonContactName" label="规格尺寸" align="center">
                                      <template slot-scope="scope">      
                                            {{scope.row.goodsSpecSize}}
                                      </template>
                            </el-table-column>
                            <el-table-column label="单位" align="center">
                                <template slot-scope="scope">
                                          {{scope.row.goodsUnit}}  
                                </template>
                            </el-table-column>
                            <el-table-column label="数量" align="center">
                                <template slot-scope="scope">
                                          {{scope.row.goodsCount}}
                                </template>
                            </el-table-column>
                            <el-table-column label="不含税单价" align="center" >
                                  <template slot-scope="scope">    
                                          {{scope.row.notTaxPrice}}     
                                  </template>
                                </el-table-column>
                                <el-table-column label="税费" align="center">
                                  <template slot-scope="scope">    
                                         {{scope.row.tax}}              
                                  </template>
                                </el-table-column>
                                <el-table-column label="含税单价" align="center">
                                  <template slot-scope="scope">
                                          {{scope.row.goodsPrice}}
                                  </template>
                            </el-table-column>
                            <el-table-column label="合计" align="center">
                                  <template slot-scope="scope">
                                          {{scope.row.totalPrice}}
                                  </template>
                            </el-table-column>
                            </el-table>
                            <el-row style="margin-top:10px;">
                                <el-col :span="5" :offset="19">
                                    <el-form-item label="订单合计：">
                                            <el-input size="small" v-model="total1"></el-input>    
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
            <div class="mail-fitter" style="margin-top:20px">
                <el-form ref="infoForm" :model="form" :rules="rules" label-width="150px" size="small">
                <div class="mail-wrapper">
                    <h4 class="title1" style="margin-bottom:0;">产品清单</h4>
                    <div class="search-base"> 
                    <div class="mbottom">
                        <div class="goods-fitter">
                        <div class="mcard" style="padding-bottom:0">
                            <el-row class="operate mbottom">
                                <el-col :span="19">
                                    <!-- <el-button type="primary">仅挑选</el-button> -->
                                    <el-button type="primary" size="small" @click="addGoods()">加入新商品</el-button>
                                </el-col>
                                <el-col :span="3"></el-col>
                            </el-row>
                            <el-table :data="changeList.newGoodsDetailParam" border style="width: 100%" stripe>
                            <el-table-column  label="序号" type="index" align="center" width="50"></el-table-column>
                            <el-table-column prop="customerType" label="商品信息" align="center" width="230">
                                    <template slot-scope="scope">
                                        <div class="txt_left">商品名称：{{scope.row.goodsName}}</div>
                                        <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                                        <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                                        <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                                        <div class="txt_left">SKU：{{scope.row.goodsSkuId}}</div>
                                    </template>
                            </el-table-column>
                            <el-table-column prop="commonContactName" label="规格尺寸" align="center">
                                      <template slot-scope="scope">
                                            {{scope.row.goodsSpecSize}}
                                      </template>
                            </el-table-column>
                            <el-table-column prop="commonContactDept" label="原合同数量" align="center">
                                      <template slot-scope="scope">
                                            {{scope.row.originalOrderedGoodsCount}}
                                      </template>
                            </el-table-column>
                            <el-table-column prop="commonContactDept" label="原合同单价" align="center">
                                        <template slot-scope="scope">
                                            {{scope.row.originalOrderedGoodsPrice}}
                                      </template>
                            </el-table-column>
                            <el-table-column prop="commonContactDept" label="原合同合计" align="center">
                                        <template slot-scope="scope">
                                            {{scope.row.originalOrderedTotalPrice}}
                                      </template>
                            </el-table-column>
                            <el-table-column prop="commonContactDept" label="已定货数量" align="center">
                                        <template slot-scope="scope">
                                            {{scope.row.orderedGoodsCount}}
                                      </template>
                            </el-table-column>
                            <el-table-column prop="commonContactDept" label="变更后数量" align="center">
                                         <template slot-scope="scope">
                                            <el-input size="small" v-model="scope.row.goodsCount"></el-input>
                                         </template>
                            </el-table-column>
                            <el-table-column label="变更后单价" align="center">
                                <template slot-scope="scope">
                                        <el-input size="small" v-model="scope.row.goodsPrice"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="变更后合计" align="center"  width="90">
                                <template slot-scope="scope">
                                        <el-input size="small" v-model="scope.row.totalPrice"></el-input>

                                </template>
                            </el-table-column>
                            <el-table-column prop="commonContactDept" label="制作要求" align="center">
                                    <template slot-scope="scope">
                                        <el-input size="small" v-model="scope.row.productionRequire"></el-input>
                                    </template>
                            </el-table-column>
                            </el-table>
                             <el-row style="margin-top:10px;">
                                <el-col :span="5" :offset="19">
                                    <el-form-item label="变更后的订单合计：">
                                            <el-input size="small" v-model="total2"></el-input>    
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
            </div>
            <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="createClose()" size="small">关 闭</el-button>
            <el-button type="primary" @click="saveChange()" size="small">保存</el-button>
            </span>
        </el-dialog>
         <!-- 新增客户询价添加商品弹窗 -->
        <el-dialog width="60%" :visible.sync="innerVisible" :modal="true" :append-to-body="false">
          <!-- 新增客户询价添加商品选择品牌弹窗 -->

          <div class="mail-fitter">
            <el-form ref="infoForm" :model="form"  label-width="100px" size="small">
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
                              <el-input v-model="formData.goodsName1" placeholder="请输入商品名称/型号/品牌"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="2" :offset="1">
                            <el-button type="primary"  size="small" @click="goodsSearch()">查询</el-button>
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
                    @row-dblclick="addClick"
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
                        <div
                          class="image"
                          v-if="scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].thumbnailImgUrl"
                        >
                          <img
                            :src="scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].thumbnailImgUrl"
                            width="100"
                            height="100"
                            alt
                          />
                        </div>
                        <div v-if="!scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].thumbnailImgUrl">暂无图片</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="商品信息" align="center" width="150">
                      <template slot-scope="scope">
                        <div style="height: 180px;overflow: auto;" >
                          <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
                          <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                          <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                          <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                          <div class="txt_left">SKU：{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].skuId}}</div>
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
                            <div class="txt_left">运费：{{scope.row.skuList[scope.row.index].carriagePrice}}</div>
                            <div
                              class="txt_left"
                            >对外ppt价格：{{scope.row.pptPrice}}</div>
                            <div
                              class="txt_left"
                            >对外最低价格:{{scope.row.minimumPrice}}</div>
                            <div
                              class="txt_left"
                            >对我司的特惠价:{{scope.row.preferentialPrice}}</div>
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
                    <el-table-column label="商品信息" align="center" width="150">
                      <template slot-scope="scope">
                        <div style="height: 180px;overflow: auto;" >
                          <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
                          <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                          <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                          <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                          <div class="txt_left">SKU：{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].skuId}}</div>
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
                            <div class="txt_left">运费：{{scope.row.skuList[scope.row.index].carriagePrice}}</div>
                            <div
                              class="txt_left"
                            >对外ppt价格：{{scope.row.pptPrice}}</div>
                            <div
                              class="txt_left"
                            >对外最低价格:{{scope.row.minimumPrice}}</div>
                            <div
                              class="txt_left"
                            >对我司的特惠价:{{scope.row.preferentialPrice}}</div>
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
                            <div class="tex_left">{{item.volumeCarriage}}</div>
                          </div>
                          
                        </div>
                      </template>
                    
                    
                  </el-table-column>
                    
                  </el-table>
                </div>
              </div>
            </el-form>
          </div>

          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="innerVisible =false" size="small">关 闭</el-button>
            <el-button type="primary" @click="saveGoods()" size="small">保存</el-button>
          </span>
        </el-dialog>
        </div>
</template>

<script>
import { getErpGoods } from "@/api/product/index";
import { throttleTipPop } from "@/utils/functions.js";
import {saveChangeGoodsOrder} from "@/api/sale/index"
export default {
    data(){
        return{
            innerVisible:false,
            changeVisible:false,
            changeList:{},
            selectData:[],
            goodsData:[],
            dataArr: [],
            elTable:[],
             tableDatas: {
                currentPage: 1,
                sizes: [10, 20, 50, 100],
                size: 10,
                total: 0
                },
             form: {
                current_page: 0,
                page_size: 10,
                total_count: 0,
                contractNumber: "", //合同编号
                relevantBusiness: "", //关联业务单号
                customerName:'',//客户
                saleUser:'',//销售员
                projectName: "", //项目名称
                mobilePhone:'',//手机
                phone:'',//电话号码
                email:'',//邮箱
                address:'',//地址
            },
            formData: {
                current_page: 1,
                page_size: 2,
                total_count: 0
            },
            tableData:[
                  {
                  date: '2016-05-02',
                  name: '张小虎',
                  address: '上海市普陀区金沙江路 1518 弄'
                }, {
                  date: '2016-05-04',
                  name: '王小虎',
                  address: '上海市普陀区金沙江路 1517 弄'
                }, 
                
              ],
                    rules: {
                partyA: [{ required: true, message: "此项为必填项", trigger:["blur","change"] }],
                partyAAddress: [
                { required: true, message: "此项为必填项", trigger:["blur","change"] }
                ],
                partyAContacts: [
                { required: true, message: "此项为必填项", trigger:["blur","change"] }
                ],
                deliveryDate:[
                  { required: true, message: "此项为必填项", trigger:["blur","change"] } 
                ],
                orderAmount:[
                  { required: true, message: "此项为必填项", trigger:["blur","change"] } 
                ]
            }
        }
    },
     created() {

  },
    props:["changeVisibles","changeData"],
    watch: {
    changeVisibles(val) {
        this.changeVisible = val;
        },
    changeData(val){
        this.changeList =val;
      },
    //监听数组中值变化
    'changeList.newGoodsDetailParam':{
      handler(newVal, oldVal) {
      if(newVal){
        for(let i=0;i<newVal.length;i++){
          if(Number(newVal[i].goodsCount)>=0&&Number(newVal[i].goodsPrice)>=0){
            newVal[i].totalPrice = Number(newVal[i].goodsCount)*Number(newVal[i].goodsPrice)        
                  } 
                }
            }
          },
          deep: true
          }
    },
    computed: {
    total1(){
      let totals = 0
      let _this = this
      if(_this.changeList.oldGoodsDetailParam&&_this.changeList.oldGoodsDetailParam.length>0){
          for(var i = 0;i<_this.changeList.oldGoodsDetailParam.length;i++){
            if(!isNaN(_this.changeList.oldGoodsDetailParam[i].totalPrice)){
              totals+=parseFloat(_this.changeList.oldGoodsDetailParam[i].totalPrice)
            }else{
              totals = 0
            }
      }      
      }
        return totals 
    },
    total2(){
      let totals = 0
      let _this = this
      if(_this.changeList.newGoodsDetailParam&&_this.changeList.newGoodsDetailParam.length>0){
          for(var i = 0;i<_this.changeList.newGoodsDetailParam.length;i++){
            if(_this.changeList.newGoodsDetailParam[i].totalPrice){
              totals+=parseFloat(_this.changeList.newGoodsDetailParam[i].totalPrice)
            }else{
              totals = 0
            }
      }      
      }
        return totals 
    }
  },
    methods:{
    //获取商品
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
    //关闭页面
     createClose() {
      
      this.$confirm('您确认要关闭吗？')
                    .then(_ => {
                this.changeVisible= false;
                this.$emit("createCloseC", this.changeVisible);
            })
            .catch(_ => {});
      
    },
    createClosing() {
      
       this.$confirm('您确认要关闭吗？')
                    .then(_ => {
                this.changeVisible = false;
                this.$emit("createClosingC", this.changeVisible);
            })
            .catch(_ => {});
    },
    address(){

    },
    Clicktent(val, data) {
      data.index = val;
      console.log(this.$refs.elTable);
      this.$set(this.$refs.elTable.data);
      this.$forceUpdate();
    },
   //双击添加商品
    addClick(row) {
      this.index = row.index;
      row["rows"] = row.skuList[this.index];
      row['goodsSpecSize'] = row.skuList[this.index].goodsSpecValues;
      row['goodsSkuId'] = row.skuList[this.index].skuId;
      row['originalOrderedGoodsPrice'] = row.skuList[this.index].goodsPrice
      row['taxRate'] = row.skuList[this.index].taxRate;
      row['tax'] = row.skuList[this.index].taxation;
      row['goodsImgUrl'] = row.skuList[this.index].thumbnailImgUrl;
      row['goodUnit'] = row.unitName;
      row['notTaxPrice'] = row.skuList[this.index].notTaxPrice;
      //深度克隆
      let copy = JSON.parse(JSON.stringify(row));
      if(this.selectData.length>=1){
            //遍历判断是否存在相同规格的商品在列表
            for(let i= 0 ;i<this.selectData.length;i++){
              if(this.selectData[i].rows.skuId == copy.rows.skuId&&this.selectData[i].goodsId == copy.goodsId){
                  throttleTipPop(this, "error", "已经存在相同规格的商品，不能重复添加！", 2000);
                  return false
              } 
        }
        this.selectData.push(copy);
      }else if(this.selectData.length<=0){
          this.selectData.push(copy);   
      } 
      let arr = this.selectData;
      arr.forEach(v => {
        v["originalOrderedGoodsCount"] ='0'; //原合同销售数量/销售数量
        v['originalOrderedTotalPrice'] = '0';//原合同合计/合计
        v['goodsPrice'] = '0';//变更后的销售单价/含税单价
        v['totalPrice'] = '0';//变更后的合计
        v['goodsCount'] = '0';//变更后的销售数量
        v['productionRequire'] = '';//制作要求
        v['orderedGoodsCount'] = '0';//已定货数量
        });
      let copy1 = JSON.parse(JSON.stringify(arr));
      this.selectData = copy1;
      console.log(this.selectData);
      
    },
    //双击删除商品
    deleteRow(row) {
      for (var i = 0; i < this.selectData.length; i++) {
        if (this.selectData[i].rows.skuId == row.rows.skuId) {
          this.selectData.splice(i, 1);
          console.log(i);
        }
      }
    },
    //保存商品选择
    saveGoods() {
       if(this.changeList.newGoodsDetailParam.length>=1){
            console.log(this.selectData);
            //遍历判断是否存在相同规格的商品在列表
            var arr =[]
            //如果等于长度就会多出一次循环，就会报错
            for(let i= 0 ;i<this.changeList.newGoodsDetailParam.length;i++){
              for(let j= 0 ;j<this.selectData.length;j++){
                if(this.changeList.newGoodsDetailParam[i].goodsSkuId == this.selectData[j].goodsSkuId){
                    throttleTipPop(this, "error", "已经存在相同规格的商品，不能重复添加！", 2000);
                    return false
                }
              } 
        }
       arr= this.changeList.newGoodsDetailParam.concat(this.selectData);  
      }else if(this.changeList.newGoodsDetailParam.length<=0){
         arr= this.changeList.newGoodsDetailParam.concat(this.selectData);  
      } 
      this.changeList.newGoodsDetailParam = arr;
      console.log(this.changeList.newGoodsDetailParam);
      
      this.selectData = [];
      this.innerVisible = false;
    },
    /* //选择删除
    deleteGoods() {
      for (var i = 0; i < this.changeList.newGoodsDetailParam.length; i++) {
        if (
          this.changeList.newGoodsDetailParam[i].rows.skuId ===
          (this.elTable[i] && this.elTable[i].rows.skuId)
        ) {
          this.changeList.newGoodsDetailParam.splice(i, 1);
          console.log(i);
        }
      }
    }, */
    //提交变更商品
    saveChange(){
      console.log(1);
      let obj = {};
      obj.orderId = this.changeList.orderId;
      obj.goodsDetailParam = this.changeList.newGoodsDetailParam;
      saveChangeGoodsOrder(obj).then(res=>{
        if (res.code===200){
          throttleTipPop(this, "success", "变更商品成功！", 2000);
          this.changeVisible = false;
          this.$emit('saveChangeGoods1',this.changeVisible)
        }
        
      })
    },
    //跳转
    jump(){
      let routeData = this.$router.resolve({
        name: "ProductList",
      });
      window.open(routeData.href, '_blank');
      
    },
    addGoods(){
        this.innerVisible=true;
        this._getGoods()
    },
    handleSelectionChange(val) {
      this.elTable = val;
      console.log(this.elTable);
    },
    //选择删除
    deleteGoods() {
      for (var i = 0; i < this.goodsData.length; i++) {
        if (
          this.goodsData[i].rows.skuId ===
          (this.elTable[i] && this.elTable[i].rows.skuId)
        ) {
          this.goodsData.splice(i, 1);
          console.log(i);
        }
      }
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
    handleSizeChange() {},
    handleCurrentChange() {},
    handleChange() {}
    }
}
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
 #addPurchasing{
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
     .box{
      margin-left: 12px;
      margin-top:10px;
    }

    .el-input-group__append button.el-button {
      width:50px;
      text-align: center;

      background: #fff;
    }
    .el-input-number.is-controls-right .el-input-number__decrease {
      background: #fff !important;
    }
    .el-input-number.is-controls-right .el-input-number__increase {
      background: #fff !important;
    }
    .imgitem{
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
    .tip{
    margin-top:-30px;
    text-align: center;
    line-height: 22px;
    .tipImg{
      position: relative;
      left: -16px;
      top:28px;
    }                     
}
 }
</style>