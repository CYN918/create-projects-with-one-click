<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <div class="search-wrapper1">
          <el-page-header @back="back" :content="content"></el-page-header>
          <!-- <el-button @click="back" type="primary" size="small" icon="el-icon-back">返回</el-button>
          <h4 class="title1">新增账户类型<span v-if="state==2">编辑</span></h4>-->
        </div>
      </div>
    </div>
    <div class="goodsShow">
      <h2>{{input}}</h2>
      <div class="goodsList">
        <div class="goodsList-show">
            <ul class="goodsList-show-top">
              <div class="goodsList-banner">
                <img :src="bannerUrl"/>
              </div>
              <li class="active" v-for="item in myArray">
                  <img :src="item.thumbnailImgUrl"/>
                  <p class="goods-title" style="overflow: hidden;">{{item.goodsName}}</p>
                  <p class="goods-price"><span>￥{{item.goodsPrice}}</span><img src="../../../../common/images/shopping.png"/></p>
              </li>

            </ul>
        </div>
      </div>
    </div>


    <h4 class="title">创建商品专题</h4>
    <div class="createGoods">
        <div class="createGoodsDiv" style="margin-top: 30px;height: 60px;">
          <img src="../../../../common/images/gestures.png"/>
          <span style="margin-left: 25px;">拖动进行排序</span>
        </div>
        <div class="createGoodsDiv" style="height: 60px;">
          <label style="line-height: 38px;">专题名称:</label>
          <el-input v-model="input" placeholder="请输入内容" maxlength="10"></el-input>
        </div>
        <div class="createGoodsDiv" style="height: 60px;">
          <label style="line-height: 38px;">排序:</label>
          <el-select v-model="sortOrder" placeholder="请选择">
            <el-option
              v-for="item in sortOrders"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="createGoodsDiv" style="height: 120px;">
          <label>专题描述:</label>
          <el-input type="textarea" v-model="specialDesc"></el-input>
        </div>
        <div class="createGoodsDiv" style="height: 120px;">
          <label>专题图片(可选):</label>
          <div class="uploadImgWrap" style="float: left;">
              <div
                  style="display: inline-block; margin-right: 20px; border-radius:4px;float: left;">
                <i class="img_wrap"><img style="width: 200px; height: 84px" :src="bannerUrl" alt=""></i>
              </div>
              <div style="display: inline-block;float: left;">
                <label for="uploadPic"
                      style="margin-bottom:30px;display: inline-block;cursor: pointer; height:32px;line-height: 32px;padding: 0 14px;background:rgba(76,134,244,1);color: #fff;border-radius:3px;">
                  <input ref="file_input1" type="file" @change="uploadPic(1)" accept="image/jpeg, image/png"
                        id="uploadPic" style="position: absolute;display:none;">
                  <span v-if="!bannerUrl">上传图片</span>
                  <span v-else>重新上传</span>
                </label>
                <p style="color: #606266;font-size: 12px; line-height: 2">1、支持JPG、PNG格式的图片，图片不能大于2M。</p>
              </div>
            </div>
        </div>
        <div class="createGoodsDiv" style="height: 40px;line-height: 40px;">
          <label>是否需要登录:</label>
          <el-radio-group v-model="resource">
            <el-radio :label="false">不需要</el-radio>
            <el-radio :label="true">需要</el-radio>
          </el-radio-group>
        </div>
        <div class="createGoodsDiv" style="height: 60px;line-height: 60px;">
          <label>已选择<i style="font-style: normal;color: red;">{{number}}</i>件商品</label>
          <el-button type="primary" @click="choose">挑选商品</el-button>
          <el-select v-model="value" placeholder="请选择" @change="changeSorting(value)">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <!--选择商品展示框-->
        <div class="createGoods-show">
          <draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false" class="createGoods-show-list">
              <li v-for="(element,index) in myArray" :key="element.id">


                  <img :src="element.thumbnailImgUrl" style="width: 85px;height:85px;border: 1px solid #d7e0f1;float:left;"/>
                  <div style="float:left;margin-left:22px;">
                    <p class="goods-title" style="margin-top: 10px;color:#606266;width: 240px;overflow: hidden;height: 36px;">{{element.goodsName}}</p>
                    <p class="goods-price" style="margin-top: 10px;color:#a9a9a9;">商城价:{{element.goodsPrice}}元</p>
                    <p class="goods-price" style="color:#a9a9a9;">活动价:{{element.goodsPrice}}元</p>
                  </div>


                  <div style="float:right;margin: 25px 15px 0px 0px;" @click="deleteDiv(index,myArray,element)">
                  <img src="../../../../common/images/detel.png"/>
                  </div>

              </li>
            </draggable>

        </div>
        <div style="text-align: center;margin-bottom: 50px;">
          <el-button type="danger">取消</el-button>
          <el-button type="primary" @click="sureCreate">保存编辑</el-button>
        </div>
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="80%"
      :before-close="handleClose">
    <goods-fitter class="mbottom" @tabVender='handleGetGoodsList' :dataObj="form" @goodsFitter="handleGetGoodsList"></goods-fitter>
    <div class="mcard">
      <el-table
        :data="tableData"
        stripe
        style="width: 100%"
        border
        ref="elTable"
        class="goods_index"
        @selection-change="handlepushList"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
        <el-table-column label="商品图片" align="center" width="120">
            <template slot-scope="scope">
                <div class="image" v-if="scope.row.skuInfo[scope.row.index].thumbnailImgUrl">

                    <img
                        @click="oepngoods(scope.row)"
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
            </template>
        </el-table-column>
        <el-table-column label="价格信息" align="center" width="150">
            <template slot-scope="scope">
                <div
                    class="txt_left"
                >商城价：{{scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice !=
                    0?scope.row.skuInfo[scope.row.index].priceInfo.goodsPrice:'暂无'}}
                </div>
                <div
                    class="txt_left"
                >市场价：{{scope.row.skuInfo[scope.row.index].priceInfo.marketPrice !=
                    0?scope.row.skuInfo[scope.row.index].priceInfo.marketPrice:'暂无'}}
                </div>
                <div
                    class="txt_left"
                >税率：{{scope.row.skuInfo[scope.row.index].priceInfo.taxRate !=
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
                <div
                    class="txt_left"
                >运费：{{scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice !=0?scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice:scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice== ''?'含运费':'含运费'}}
                </div>
                <div
                    class="txt_left"
                >京东价：{{scope.row.skuInfo[scope.row.index].priceInfo.jdPrice !=
                    0?scope.row.skuInfo[scope.row.index].priceInfo.jdPrice:'暂无'}}
                </div>
                <div
                    class="txt_left"
                >市场价对比京东折扣率：{{scope.row.skuInfo[scope.row.index].priceInfo.costJdRatio !=
                    0?scope.row.skuInfo[scope.row.index].priceInfo.costJdRatio:'暂无'}}
                </div>
                <div
                    class="txt_left"
                >商城价对比京东折扣率：{{scope.row.skuInfo[scope.row.index].priceInfo.shopJdRatio !=
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
        <el-table-column label="商品规格" align="center" width="200">
            <template slot-scope="scope">
                <div style="position:relative">
                    <!-- <el-button @click="down">向上</el-button> -->
                    <div style="height: 300px;overflow: auto;" :ref="'down'+scope.$index">
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
                    <!-- <el-button @click="down(scope.row,scope.$index)">向下</el-button> -->
                </div>
            </template>
        </el-table-column>
        <el-table-column label="利润统计" align="center" width="140">
            <template slot-scope="scope">
                <div class="txt_left">毛利润：{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfit}}</div>
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
                <div class="txt_left">企业所得税：{{scope.row.skuInfo[scope.row.index].financeInfo.incomeTax}}</div>
                <div class="txt_left">纯利润：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfit}}</div>
                <div
                    class="txt_left"
                >纯利率：{{scope.row.skuInfo[scope.row.index].financeInfo.netProfitMargin*100}}%
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
        <el-table-column label="供应商" align="center" width="150">
            <template slot-scope="scope">
                <div
                    class="txt_left"
                    style="font-size:15px"
                >{{scope.row.skuInfo[scope.row.index].suppliersName}}
                </div>
                <div class="txt_left">联系人：{{scope.row.skuInfo[scope.row.index].contactName}}</div>
                <div class="txt_left">联系人电话：{{scope.row.skuInfo[scope.row.index].contactTelephone}}</div>
                <div class="txt_left">QQ：{{scope.row.skuInfo[scope.row.index].contactQq}}</div>
                <div class="txt_left">管理员：{{scope.row.adminName}}</div>
                <div class="txt_left">管理员手机/邮箱：{{scope.row.adminPhone+'/'+scope.row.adminPhone}}</div>
            </template>
        </el-table-column>
        <el-table-column label="来源/状态" align="center" width="200">
            <template slot-scope="scope">
                <div class="txt_left">来源：{{scope.row.goodsType}}</div>
                <div class="txt_left">排序：{{scope.row.sortOrder}}</div>
                <div class="txt_left">更新：{{scope.row.updateTime}}</div>
                <div class="txt_left">状态：{{scope.row.reviewStatus == 0?'未审核':scope.row.reviewStatus ==
                    1?'审核不通过':'审核通过'}}
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
    <div>
      <span style="margin-right: 15px;">已选择<i style="font-style: normal;color: red;">{{number1}}</i>件商品</span>
      <el-button type="primary" @click="confirm">确定挑选</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
    </div>
    </el-dialog>


  </div>
</template>

<script>
import draggable from 'vuedraggable';
import GoodsFitter from "../../../product/goods/goodsFitter";
import {uploadFile } from '@/api/activity/index'
import {
  getGoods,
  changeState,
  deleteGoods,
  getScene,
  associatedValues,
  bulkChanges,
  addGoodsProject,
  findProjectDetail,
  findSpecialGoods,
  updateSpecialGoods,
  batchUpdateSpecialGoods,
  newSpecialGoods,
  deleteSpecialGoods
} from "@/api/product/index";
import axios from "axios";
import { throws } from "assert";
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      content: '编辑商品专题',
      frametextarea: "", //上下架理由
      textareaValue: "", //回收站理由
      form: {
        third_party: '4', // 1，京东 2，网易 3，苏宁 4, 一件代发商品 5, 集采商品
        search_type: '1', // 关键字类型
        keyword: '', // 关键字
        isReal:'', //是否是实物。1，是；0，否
        grossProfitMarginStart:'',//税前毛利润率起始
        grossProfitMarginEnd:'', // 税前毛利润率结束
        grossProfitMarginTaxStart:'', //税后毛利润率起始
        grossProfitMarginTaxEnd:'', //税后毛利润率结束
        netProfitMarginStart:'', //税后纯利润率起始
        netProfitMarginEnd:'', //税后纯利润率结束
        distrProfitMarginStart:'', //分销利润率起始
        distrProfitMarginEnd:'', //分销利润率结束
        costPriceStart:'', //商品成本价起始
        costPriceEnd:'', //商品成本价结束
        costPriceJdRatioStart:'', //一件代发价对比京东/天猫折扣率开始
        costPriceJdRatioEnd:'', //一件代发价对比京东/天猫折扣率结束
        shopJdRatioStart:'', //商城价对比京东价折扣率开始
        shopJdRatioEnd:'', //商城价对比京东价折扣率结束
        volumeJdRatioStart:'', //批发价1对比京东/天猫折扣率开始
        volumeJdRatioEnd:'', //批发价1对比京东/天猫折扣率结束
        volumeShopRatioStart:'', //批发价1对比商城利润率开始
        volumeShopRatioEnd:'', //批发价1对比商城利润率结束
        sysUserId:'', //采购员id
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
      dialog: {
        value1: "",
        value2: ""
      },
      options: [],
      checkArr:[], // 选中的保存
      checkList1: '',
      checkList2: [],
      checkedAll: "",
      title: "", //上下架提示
      goodsData: "", // 选择商品的data
      getSceneArr: [], //场景定制数组
      goods: [
        { name: "精品",value:0,show:false},
        { name: "新品",value:1,show:false},
        { name: "热销",value:2,show:false},
        { name: "取消精品",value:3,show:false},
        { name: "取消新品",value:4,show:false},
        { name: "取消热销",value:5,show:false}
      ],
      checked: "",
      scenario: false, //场景定制弹框
      dialogFormVisible: false, //批量操作弹窗
      recycleBin: false, //回收站
      tableData: [],
      dialogVisible: false, // 上下架提示
      textarea: "", //回收站原因
      createUserId: "", // 使用人id
      dialogVisible: false,
      options: [{
        value: '1',
        label: '按商城价从大到小'
      }, {
        value: '2',
        label: '按商城价从小到大'
      }],
      sortOrders: [{
        value: '1',
        label: '1'
      }, {
        value: '2',
        label: '2'
      }, {
        value: '3',
        label: '3'
      }, {
        value: '4',
        label: '4'
      }, {
        value: '5',
        label: '5'
      }, {
        value: '6',
        label: '6'
      }, {
        value: '7',
        label: '7'
      }],
      value: '',
      input: '',
      resource: '',
      myArray: [],
      bannerUrl: '',
      number: '0',
      number1: '0',
      id: this.$route.query.id,
      sortOrder: '',
      specialDesc: '',
      chooseNewArr: [],//挑选新的商品存储数据
    };
  },
  methods: {
    //排序
    changeSorting(value){
      if(value == 1){
        console.log(1)
        this.myArray.sort(function(a,b){
          return b.goodsPrice - a.goodsPrice
        })
        console.log(this.myArray)
      }else{
        console.log(2)
        this.myArray.sort(function(a,b){
          return a.goodsPrice - b.goodsPrice
        })
        console.log(this.myArray)
      }
    },
    //获取详情
    findProjectDetail(){
       findProjectDetail(this.id).then(res => {
         if(res.code == 200){
            this.input = res.data.specialTitle;
            this.resource = res.data.needLogin;
            this.sortOrder = res.data.sortOrder;
            this.bannerUrl = res.data.specialImgs;
            this.specialDesc = res.data.specialDesc;
            console.log(this.bannerUrl)
         }
       })
    },
    //获取关联商品
    findSpecialGoods(){
      let obj = {
        pageNum: 1,
        pageSize: 1000,
        specialId: this.id
      }
      findSpecialGoods(obj).then(res => {
        if(res.code == 200){
           this.myArray = res.data.list;
           this.number = res.data.list.length;
        }else{
          this.$message({
            message: res.message,
            type: 'warning'
          });
        }
      })
    },
    // 返回
    back() {
      this.$router.go(-1);
    },
    //删除
    deleteDiv(index,element,row){
      // console.log(row)
      // console.log(element)
      deleteSpecialGoods(row.sgId).then(res => {
        if(res.code == 200){
          element.splice(index, 1);
          this.number = element.length;
        }
      })

    },
    //确定创建
    sureCreate(){
      console.log(this.myArray)
      let arr = [];
      const obj = {
        specialId: this.id,
        specialTitle: this.input,
        specialImgs: this.bannerUrl,
        needLogin: this.resource,
        sortOrder: this.sortOrder,
        specialDesc: this.specialDesc,
        specialStatus: 0
      }
      this.myArray.forEach((item) => {
        arr.push(item.sgId)
        return arr
      })
      console.log(obj)
      updateSpecialGoods(obj).then(res => {
        if(res.code == 200){
          // this.$message({
          //   message: res.message,
          //   type: 'success'
          // });
          // this.findProjectDetail();
          batchUpdateSpecialGoods(arr).then(res => {
            if(res.code == 200){
              this.$message({
                message: res.message,
                type: 'success'
              });
              this.findProjectDetail();
            }
          })
        }
      })

    },
    uploadPic(index){
      const files = this.$refs[`file_input${index}`].files[0];
      const type = files.type
      const size = files.size
      const mazSize = 2 * 1024 * 1024
      if (type !== 'image/png' && type !== 'image/jpeg') {
        this.$message({
          message: '文件格式不正确',
          type: 'warning'
        });
        return
      }
      if (size > mazSize) {
        this.$message({
          message: '文件大小不得超过2M',
          type: 'warning'
        });
        return
      }
      var formData = new FormData();
      formData.append('file', files);
      uploadFile(formData).then(res => {
        if(res.code == 200){
           this.bannerUrl = res.data.domain + '' + res.data.filePath;
           console.log(this.bannerUrl)
        }
      })
      this.$refs[`file_input${index}`].value = ''
    },
    //弹窗是否关闭
     handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
      },
    //跳转C端
    oepngoods(val){
      window.open(val.shopUrl+'?goodsId='+val.goodsId,'_blank')
    },
    // 全选所有页
    checkedAllfunc(val){
      this.tableData.forEach(item => {
        this.$refs.elTable.toggleRowSelection(item,true);
      })
    },
    choose(){
      this.dialogVisible = true;
        this.number1 = this.chooseNewArr.length;
    },
    //单选
    // choose(selection,row){
    //   this.deletechecked(row)
    //   this.checkedAll = false
    // },
    //多选
    // chooseAll(selection){
    //   this.checkedAll = false
    //   if(selection.length){
    //     selection.forEach(data => {
    //       this.checkArr.push(data.goodsId);
    //     })
    //   }else{
    //     this.tableData.forEach(item => {
    //       this.deletechecked(item)
    //     })
    //   }
    // },
    handlepushList(row){
      this.chooseNewArr = row;
      this.number1 = row.length;
    },
    //取消按钮
    cancel(){
      this.dialogVisible = false;
    },
    //确认按钮
    confirm(){
      if(this.chooseNewArr.length == 0){
        this.$message({
          message: '请选择商品',
          type: 'warning'
        });
        return false
      }
      let arr = [];
      this.chooseNewArr.forEach((item) => {
        let obj = {
          specialId: this.id,
          goodsId: item.goodsId,
          sortOrder: item.sortOrder
        }
        arr.push(obj)
        return arr
      })
      newSpecialGoods(arr).then(res => {
        if(res.code == 200){
           this.dialogVisible = false;
           this.findProjectDetail();
           this.findSpecialGoods();
        }
      })
    },
    // 删除记忆选择的数据
    deletechecked(data){
     let index =  this.checkArr.indexOf(data.goodsId)
     if(index != -1){
       this.checkArr.splice(index,1)
     }else{
       this.checkArr.push(data.goodsId)
     }
    },
    // 默认选中
    checkedfunc(arr){
      let check  = this.checkArr
      let that = this
      for(var i=0;i<check.length;i++){
        for(var j=0;j<arr.length;j++){
          if(check[i] == arr[j].goodsId){
            this.$refs.elTable.toggleRowSelection(this.tableData[j],true);
          }
        }
      }
    },
    //去重
    heavy(data){
      let arr = data
      let result = []
      for(var k=0;k<arr.length;k++){
        for(var j=k+1;j<arr.length;j++)
            if (arr[k].goodsId == arr[j].goodsId) {
            //如果第一个等于第二个，splice方法删除第二个
            arr.splice(j,1);
            j--;
            }
        }
    },
    // 批量操作
    dialogFormVisiblefunc(data,type){
      if(data){
        this.dialogFormVisible = true
      }
      if(type){
        if(this.checkArr.length){
          let str = ''
        this.checkArr.forEach(item =>{
          str += item+','
        })
        let obj = {}
        obj.goodsId = str.substring(0,str.length-1)
        obj.isOnSale = this.checkList1
        obj.applyReason = '批量操作引起的审核'

            let isBest = ''
        let isHot = ''
        let isNew = ''
        this.checkList2.forEach(item => {
          if(item == 0){
            isBest = 1
          }
          if(item == 1){
            isNew = 1
          }
          if(item == 2){
            isHot = 1
          }
          if(item == 3){
            isBest = 0
          }
          if(item == 4){
            isNew = 0
          }if(item == 5){
            isHot = 0
          }
        })
        obj.isBest = isBest
        obj.isNew = isNew
        obj.isHot = isHot
        if(this.checkList1 == ''){
          bulkChanges(obj).then(res => {
            if(res.code == 200){
              this.dialogFormVisible = false
              this.$message({
                message: res.message,
                type: 'success'
              });
            }
          })
        }else{
          changeState(obj).then(res => {
            if(res.code == 200){
              bulkChanges(obj).then(res => {
                if(res.code == 200){
                  this.dialogFormVisible = false
                  this.$message({
                    message: res.message,
                    type: 'success'
                  });
                }
              })
            }
          })
        }
        }else{
          this.$message.error('请先选择商品');
        }
      }
      this.checkList1 = ''
    },
    // 提交绑定的场景
    submitScenario(id, type) {
      if (id) {
        this.scenario = true;
        this.goodsData = id;
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
        let obj = {}
        let newArr = []
        obj.goodsId = this.goodsData
        arr.forEach(item => {
          item.Giftmodel.forEach(data =>{
            newArr.push(data)
          })
        })
        let str = ''
        newArr.forEach(data => {
          str += data+','
        })
        obj.sceneIds = str.slice(0,str.length-1)
        associatedValues(obj).then(res => {
          if(res.code == 200 ){
            this.scenario = false;
            this.$message({
              message: res.message,
              type: 'success'
            });
          }
      })
      }
    },
    down(data, index) {
      data.top -= 150;
      let a = "down" + index;
      this.$nextTick(() => {
        this.$refs.a.style.top = data.top + "px";
      });
    },
    //商品详情
    goodsDetail() {
      this.$router.push({ name: "GoodsDetail" });
    },
    //点击规格展示不同的内容
    Clicktent(val, data) {
      data.index = val;
      this.$set(this.$refs.elTable.data);
      this.$forceUpdate();
    },
    //上下架商品
    Stand(data) {
      this.goodsData = data;
      this.dialogVisible = true;
      data.isOnSale == 1
        ? (this.title = "下架商品")
        : (this.title = "上架商品");
    },
    operating(val){
      this.goods.forEach(data => {
        data.show = false
      })
      val.forEach(item => {
        if(item >= 3 ){
          this.goods[item-3].show = true
        }else{
          this.goods[item+3].show = true
        }
      })
    },
    //确定上下架
    sure() {
      changeState(this.goodsData, this.frametextarea).then(res => {
        if (res.code == 200) {
          this.dialogVisible = false;
          this.$message({
            message: res.message,
            type: "success"
          });
          // this._getGoods()
        }
      });
    },
    //商品添入回收站
    recycleBinfunc(data) {
      if(data.isOnSale == 1){
        this.$message.error('商品正在商场销售，先下架商品');
      }else{
         this.goodsData = data.goodsId;
         this.recycleBin = true;
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
          this._getGoods();
        }
      });
    },
    //编辑
    editor(data) {
      if(data.isOnSale == 1 || data.reviewStatus == 0){
        let txt = ''
        data.isOnSale = 1
        txt = '商品正在商场销售，先下架商品'
        data.reviewStatus == 0
        txt = '商品正在审核中'
        this.$message.error(txt);
      }else{
         this.$router.push({ name: "ProductAdd", query: { id: data.goodsId } });
      }
    },
    //查询
    _getGoods() {
      getGoods(this.form).then(res => {
        this.tableData = res.data.pageList;
        this.tableData.forEach(item => {
          item.top = 0;
        });
        this.form.total_count = res.data.count;
        if(this.checkedAll){
          this.$nextTick(()=>{
            this.checkedAllfunc(this.tableData)
          })
        }else{
          this.$nextTick(()=>{
            this.checkedfunc(this.tableData)
          })
        }
      });
    },
    handleGetGoodsList(data) {
      this.form = data;
      this._getGoods()
    },
    handleSizeChange(val) {
      this.form.page_size = val;
      this._getGoods();
    },
    handleCurrentChange(val) {
      this.form.current_page = val;
      this._getGoods();
    },
    //获取场景定制
    _getScene() {
      getScene().then(res => {
        res.data.forEach(item => {
          item.Giftmodel = [];
          this.getSceneArr.push(item);
        });
      });
    }
  },
  mounted() {
    this.findProjectDetail();
    this.findSpecialGoods();
    this._getGoods();
    this.createUserId = JSON.parse(
      localStorage.getItem("user")
    ).correlativeUserId;
    this._getScene();
  },
  components: {
    GoodsFitter,
    draggable
  }
};
</script>
<style scoped>
.goods-fitter .search-wrapper1{
    padding: 20px;
    border: 1px solid #d7e0f1;
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
}
.createGoodsDiv >>> .el-input{
   width: 207px;
   float: left;
}
.createGoodsDiv >>> .el-button{
  float: left;
  margin: 10px 15px 0px 0px;
}
.createGoodsDiv >>> .el-select,.createGoodsDiv >>> .el-textarea{
  width: 201px;
  float: left;
}
</style>
<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
.goodsShow{
  width: 100%;
  min-height: 1100px;
  background: #fff;
  border: 1px solid #d7e0f1;
  overflow: hidden;
}
.createGoods{
  width: 100%;
  min-height: 880px;
  background: #fff;
  border: 1px solid #d7e0f1;
  margin-top: 30px;
}
.createGoodsDiv,.createGoods-show{
  width: 95%;
  margin: 0 auto;
}
.createGoods-show{
  padding-left: 210px;
  min-height: 730px;
  overflow: hidden;
}
.createGoods-show-list > li{
  width: 405px;
  height: 100px;
  float: left;
  margin-top: 25px;
  position: relative;
}
.createGoodsDiv > label{
  width: 150px;
  float: left;
  text-align: right;
  margin-right: 20px;
}
.goodsShow > h2{
  width: 20%;
  height: 71px;
  line-height: 71px;
  background: #f34779;
  color: #fff;
  border-top-right-radius: 35px;
  border-bottom-right-radius: 35px;
  margin: 40px 0px 0px 47px;
  font-size: 24px;
  padding-left: 40px;
  letter-spacing: 2px;
}
.goodsList{
  width: 95.2%;
  min-height: 720px;
  margin: 0 auto;
  margin-top: 30px;
}
.goodsList-banner{
  width: 679px;
  height: 310px;
  float: left;
  margin-left: 2px;
  margin-top: 2px;
  // border-right: 1px solid #d7e0f1;

}
.goodsList-banner > img{
  width: 673px;
  height: 302px;
}
.goodsList-show .goodsList-show-top{
  float: left;
  margin-left: 8px;
  margin-bottom: 50px;
}
.active{
  border-right: 1px solid #d7e0f1;
}
.goodsList-show .goodsList-show-bottom{
  float: left;
  border-top: 1px solid #d7e0f1;
}
.goodsList-show > ul > li,.goodsList-show-bottom > ul > li{
  width: 225px;
  height: 310px;
  float: left;
  position: relative;
  border: 1px solid #d7e0f1;
  margin-top: 2px;
  margin-left: 2px;
}
.goodsList-show-top > li > img,.goodsList-show-bottom > li{
  width: 115px;
  height: 172px;
  margin: 25px auto;
  display: block;
}
.goods-detail > img{
  width: 115px;
  height: 172px;
  margin: 25px auto;
  display: block;
}
.goodsList-show-top .goods-title,.goodsList-show-bottom .goods-title{
  text-align: center;
  height: 30px;
  line-height: 30px;
  width: 204px;
  margin: 0 auto;
}
.goodsList-show-top .goods-price,.goodsList-show-bottom .goods-price{
  height: 40px;
  line-height: 40px;
}
.goodsList-show-top .goods-price > span,.goodsList-show-bottom .goods-price > span{
  float: left;
  margin-left: 14px;
  color: #ec423b;
  font-size: 26px;
}
.goodsList-show-top .goods-price > img,.goodsList-show-bottom .goods-price > img{
  float: right;
  margin-right: 18px;
  margin-top: 4px;
}
.title {
    font-size: 16px;
    font-weight: 400;
    color: #333;
    padding-left: 10px;
    line-height: 1.4;
    border-left: 4px solid #4C86F4;
    margin-top: 30px;
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
  width: 100%;
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
.blue {
  color: #4a99fa;
  cursor: pointer;
}
.scenario {
  padding-bottom: 20px;
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
.el-checkbox:last-of-type {
  margin-right: 0;
  margin-top: 10px;
}
</style>
