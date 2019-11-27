<template>
  <div class="margin" >
    <goods-fitter class="mbottom" @tabVender="handleGetGoodsList" @goodsFitter="handleGetGoodsList"></goods-fitter>
    <div class="mcard">
      <div class="mbottom">
        <el-checkbox v-model="checked">全选本页</el-checkbox>
        <el-checkbox v-model="checkedAll">全选所有页</el-checkbox>
        <el-button type="primary" size="small" @click="dialogFormVisible = true" style="margin-left:15px">批量操作</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%" border   >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
        <el-table-column label="商品图片" align="center" width="120">
          <template slot-scope="scope">
            <div class="image">
              <img :src="scope.row.goodOriginalImgUrl" width="100" height="100" alt />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品信息" align='center' width="150">
          <template slot-scope="scope">
            <div  class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
            <div class="txt_left">{{scope.row.goodsSn}}</div>
            <div class="txt_left">{{scope.row.modelNumber}}</div>
            <div class="txt_left">{{scope.row.brandName}}</div>
            <div class="txt_left">{{scope.row.gatherIn}}</div>
          </template>
        </el-table-column>
        <el-table-column label="价格信息" align='center' width="150">
          <template slot-scope="scope">
            <div class="txt_left">{{scope.row.taxRate}}</div>
            <div class="txt_left">{{scope.row.costPrice}}</div>
            <div class="txt_left">{{scope.row.carriagePrice}}</div>
            <div class="txt_left">{{scope.row.jdPrice}}</div>
            <div class="txt_left">{{scope.row.shopPrice}}</div>
            <div class="txt_left">{{scope.row.price}}</div>
            <div class="txt_left">{{scope.row.costJdRatio}}</div>
            <div class="txt_left">{{scope.row.shopJdRatio}}</div>
          </template>
        </el-table-column>
        <el-table-column label="集采/批发价" align='center' width="150">
          <template slot-scope="scope">
            <div class="txt_left" v-for="item in scope.row.volumePrices" :key="item">
              <div class="txt_left">{{item.volumeCost}}</div>
              <div class="txt_left">{{item.volumeNumber}}</div>
            </div>
            <div class="txt_left">{{scope.row.pptPrice}}</div>
            <div class="txt_left">{{scope.row.minimumPrice}}</div>
            <div class="txt_left">{{scope.row.preferentialPrice}}</div>
          </template>
        </el-table-column>
        <el-table-column label="商品规格" align='center' width="130">
          <template slot-scope="scope">
            <div class="txt_left" v-for="item in scope.row.goodsSpecValues" :key="item">
              <div class="txt_left">{{item}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="利润统计" align='center' width="140">
          <template slot-scope="scope">
            <div class="txt_left">{{scope.row.grossProfit}}</div>
            <div class="txt_left">{{scope.row.grossProfitMargin}}</div>
            <div class="txt_left">{{scope.row.taxation}}</div>
            <div class="txt_left">{{scope.row.grossProfitTax}}</div>
            <div class="txt_left">{{scope.row.grossProfitMarginTax}}</div>
            <div class="txt_left">{{scope.row.incomeTax}}</div>
            <div class="txt_left">{{scope.row.netProfit}}</div>
            <div class="txt_left">{{scope.row.netProfitMargin}}</div>
          </template>
        </el-table-column>
        <el-table-column label="库存(PCS)" align='center' width="120">
          <template slot-scope="scope">
            <span class="goods_num">{{scope.row.goodsNumber}}</span>
            <div class="txt_left" style="margin-top: 40px;">库存预警：{{scope.row.warnNumber}}</div>
          </template>
        </el-table-column>
        <el-table-column label="供应商" align='center' width="150">
          <template slot-scope="scope">
            <div class="txt_left"  style="font-size:15px">{{scope.row.suppliersName}}</div>
            <div class="txt_left" >{{scope.row.contactName}}</div>
            <div class="txt_left">{{scope.row.contactTelephone}}</div>
            <div class="txt_left">{{scope.row.contactQq}}</div>
            <div class="txt_left">{{scope.row.adminName}}</div>
            <div class="txt_left">{{scope.row.adminPhoneAndEmail}}</div>
          </template>
        </el-table-column>
        <el-table-column label="来源/状态" align='center' width="200">
          <template slot-scope="scope">
            <div class="txt_left">{{scope.row.imgInfo}}</div>
            <div class="txt_left">{{scope.row.sourceType}}</div>
            <div class="txt_left">{{scope.row.synJdPrice}}</div>
            <div class="txt_left">{{scope.row.sortOrder}} </div>
            <div class="txt_left">{{scope.row.updateTime}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作"  align='center'  width="150" fixed='right'>
          <template slot-scope="scope">
          <div class="line-div small_top">
              <div class="small-Idiv">
                <div class="activity">
                  <img src="../../common/images/goods/xiajiashangjia.png" alt="" class="div_img">
                </div>
                <span  style="word-break: keep-all;margin-left: 5px;left:10px"  class="spanclass">下架/上架</span>
              </div>
              <el-switch  v-model="scope.row.isOnSale"  :active-value="1" :inactive-value="0" active-color="#8CC5FF"></el-switch>
            </div>
            <div class="line-div small_top" >
              <div class="small-Idiv">
                <div class="activity">
                  <img src="../../common/images/goods/yijiandaifa.png" alt="" class="div_img">
                </div>
                <span  style="word-break: keep-all;margin-left: 5px;left:10px" class="spanclass">一件代发</span>
              </div>
              <el-switch v-model="scope.row.isSubstituteSales"  :active-value="1" :inactive-value="0" active-color="#8CC5FF"></el-switch>
            </div>
            <div class="line-div small_top" style="padding-bottom: 0">
              <div class="small-Idiv" @click="attribute(scope.row.goodsTypeId)">
                  <div class="i-div fuzhi" >
                    <img src="../../common/images/icon/审核.png" alt="" class="operation_img">
                  </div>
                  <span style="word-break: keep-all;">审核</span>
                </div>
                <div class="small-Idiv"  @click="handleClick">
                  <div class="i-div">
                    <img src="../../common/images/icon/编辑.png" alt="" class="operation_img">
                  </div>
                  <span>编辑</span>
                </div>
            </div>
            <div class="line-div small_top" style="">
              <div class="small-Idiv"  @click="deleteType = true">
                  <div class="i-div huishouzhan">
                    <img src="../../common/images/icon/回收站.png" alt="" class="operation_img">
                  </div>
                  <span>移除</span>
                </div>
              <div class="small-Idiv" @click="scenario = true">
                <div class="i-div huishouzhan">
                  <img src="../../common/images/icon/场景定制.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;margin-left: -6px;">场景定制</span>
              </div>
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
            :total="form.total_count">
            </el-pagination>
      </div>
      <el-dialog
      title="审核"
      :visible.sync="dialogVisible"
      width="30%"
      >
      <el-form :model="form"  label-width="100px">
        <el-form-item label="审核状态:">
            <el-radio v-model="state" label="2">通过</el-radio>
            <el-radio v-model="state" label="1">不通过</el-radio>
        </el-form-item>
        <el-form-item label="原因:">
            <el-input type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="Confirm" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 移除 -->
      <el-dialog
      title="移除"
      :visible.sync="deleteType"
      width="30%"
      >
      <el-form :model="form"  label-width="100px">
        <el-form-item label="移除原因:">
            <el-input type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="上级领导审核:">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="销售总监" value="0"></el-option>
              <el-option label="采购经理" value="1"></el-option>
            </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="deleteType = false" size="small">取 消</el-button>
        <el-button type="primary" @click="deleteType = false" size="small">确 定</el-button>
      </span>
    </el-dialog>
      <!-- 移除 -->
      <!-- 批量操作弹窗 -->
      <el-dialog title="批量操作" :visible.sync="dialogFormVisible"  width="40%">
        <el-form :model="form"  label-width="150px">
          <el-form-item label="商品操作：" >
            <el-checkbox-group v-model="checkList1">
              <el-checkbox label="上架"></el-checkbox>
              <el-checkbox label="下架"></el-checkbox>
              <el-checkbox label="本地化"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="商品操作：" >
            <el-checkbox-group v-model="checkList2">
              <el-checkbox :label="item.name" v-for="item in goods" :key="item.name"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="转移分类：" >
            <el-select v-model="form.region" placeholder="请选择" class="el-select-width">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转移扩展分类：" >
            <el-select v-model="form.region" placeholder="请选择" class="el-select-width">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转移供应商：" >
            <el-select v-model="form.region" placeholder="请选择" class="el-select-width">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="转移品牌：" >
            <el-select v-model="form.region" placeholder="请选择" class="el-select-width">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="设置分组：" >
            <el-select v-model="form.region" placeholder="请选择" class="el-select-width">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="dialogFormVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false" size="small">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 批量操作弹窗 -->

      <!-- 场景定制弹窗 -->
      <div class="spicallist">
      <el-dialog title="场景定制" :visible.sync="scenario"  width="40%">
      <div class="scssfiter">  
    <div class="mbottom">
      <div class="goods-fitter">
        <div class="search-wrapper">
            <h4 class="title">送礼场景<span  style="font-size:14px">（每款商品请选择2个场景）</span></h4><br/>
        <el-form :model="form"  label-width="60px">
          <el-row >
            <el-col :span="6" style="line-height:40px;margin-top:-18px">
                <el-checkbox v-model="checked0">员工福利</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px;margin-top:-18px">
                <el-checkbox v-model="checked1">商务馈赠</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px;margin-top:-18px">
                <el-checkbox v-model="checked2">会议礼品</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px;margin-top:-18px">
                <el-checkbox v-model="checked3">生日礼物</el-checkbox>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked4">积分兑换</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked5">企业年会</el-checkbox>
              </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked6">感恩答谢</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked7">开业庆典</el-checkbox>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked8">促销活动</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked9">银行卡礼</el-checkbox>
              </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked11">随手礼</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked12">基金定投</el-checkbox>
            </el-col>
        </el-row>
        </el-form>
        </div>
      </div>
    </div>
    <div class="mbottom">
      <div class="goods-fitter">
        <div class="search-wrapper">
            <h4 class="title">节日类别 <span  style="font-size:14px">（每款商品请选择2个场景）</span></h4><br/>
         <el-form :model="form"  label-width="60px">
          <el-row >
            <el-col :span="6" style="line-height:40px;margin-top:-18px">
                <el-checkbox v-model="checked13">春节</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px;margin-top:-18px">
                <el-checkbox v-model="checked14">元旦</el-checkbox>
              </el-col>
            <el-col :span="6" style="line-height:40px;margin-top:-18px">
                <el-checkbox v-model="checked15">元宵节</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px;margin-top:-18px">
                <el-checkbox v-model="checked16">妇女节</el-checkbox>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked17">劳动节</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked18">儿童节</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked19">教师节</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked20">中秋节</el-checkbox>
            </el-col>
        </el-row>
        </el-form>
        </div>
      </div>
    </div>
    <div class="mbottom">
      <div class="goods-fitter">
        <div class="search-wrapper">
            <h4 class="title">送礼对象<span  style="font-size:14px">（每款商品请选择2个场景）</span></h4><br/>
         <el-form :model="form"  label-width="60px">
          <el-row >
            <el-col :span="6" style="line-height:40px;margin-top:-18px">
                <el-checkbox v-model="checked21">高级客户</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px;margin-top:-18px">
                <el-checkbox v-model="checked22">公司员工</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px;margin-top:-18px">
                <el-checkbox v-model="checked23">领导上司</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px;margin-top:-18px">
                <el-checkbox v-model="checked24">同行馈赠</el-checkbox>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked25">贵人导师</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked26">财务人员</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked27">男女朋友</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked28">结婚生子</el-checkbox>
            </el-col>
        </el-row>
        </el-form>
        </div>
      </div>
    </div>
    <div class="mbottom">
      <div class="goods-fitter">
        <div class="search-wrapper">
            <h4 class="title">为你推荐 <span  style="font-size:14px">（每款商品请选择1个场景）</span></h4><br/>
         <el-form :model="form"  label-width="60px">
          <el-row >
            <el-col :span="6" style="line-height:40px;margin-top:-18px">
                <el-checkbox v-model="checked29">特色产品</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px;margin-top:-18px">
                <el-checkbox v-model="checked30">每日推荐</el-checkbox>
              </el-col>
            <el-col :span="6" style="line-height:40px;margin-top:-18px">
                <el-checkbox v-model="checked31">物美价廉</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px;margin-top:-18px">
                <el-checkbox v-model="checked32">时尚新潮</el-checkbox>
            </el-col>
        </el-row>
        <el-row >
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked33">数码潮流</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px">
              <el-checkbox v-model="checked34">高端产品</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked35">实用主义</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked36">定制商品</el-checkbox>
            </el-col>
        </el-row>
        </el-form>
        </div>
      </div>
    </div>
        <div slot="footer" class="dialog-footer" style="margin-top:-5px">
          <el-button type="danger" @click="scenario = false" size="small">取 消</el-button>
          <el-button type="primary" @click="scenario = false" size="small">确 定</el-button>
        </div>
        </div>
      </el-dialog>
      </div>
      <!-- 场景定制弹窗 -->
    </div>
  </div>
</template>

<script>
import GoodsFitter from './goodsFitter'
import { getGoodsList } from '@/api/product/index'
import axios from 'axios'
export default {
  data () {
    return {
      checked0:'',
      checked1:'',
      checked2:'',
      checked3:'',
      checked4:'',
      checked5:'',
      checked6:'',
      checked7:'',
      checked8:'',
      checked9:'',
      checked10:'',
      checked11:'',
      checked12:'',
      checked13:'',
      checked14:'',
      checked15:'',
      checked16:'',
      checked17:'',
      checked18:'',
      checked19:'',
      checked20:'',
      checked21:'',
      checked22:'',
      checked23:'',
      checked24:'',
      checked25:'',
      checked26:'',
      checked27:'',
      checked28:'',
      checked29:'',
      checked30:'',
      checked31:'',
      checked32:'',
      checked33:'',
      checked34:'',
      checked35:'',
      checked36:'',
      form: {
        current_page:1,
        page_size:10,
        total_count:0,
      },
      dialog:{
        value1:'',
        value2:''
      },
      options: [
        {
          value: '0',
          label: '员工福利'
        }, {
          value: '1',
          label: '商务礼品'
        }, {
          value: '2',
          label: '洽谈会议'
        }, {
          value: '3',
          label: '生日聚会'
        }, {
          value: '4',
          label: '企业年会'
        },
        {
          value: '5',
          label: '感恩答谢'
        }, {
          value: '6',
          label: '开业庆典'
        }, {
          value: '7',
          label: '办公用品'
        }, {
          value: '8',
          label: '促销活动'
        }, {
          value: '9',
          label: '银行卡礼'
        },{
          value: '10',
          label: '随手礼'
        },{
          value: '11',
          label: '基金定投'
        }
        ],
      checkList1:[],
      checkList2:[],
      checkedAll:'',
      goods:[
        {name:'精品'},
        {name:'新品'},
        {name:'热销'},
        {name:'取消精品'},
        {name:'取消新品'},
        {name:'取消热销'},
      ],
      checked:'',
      scenario:false, //场景定制弹框
      dialogFormVisible:false, //批量操作弹窗
      tableData:[],
      deleteType:false, //移除
      dialogVisible:false,//审核的弹窗
      goodsTypeId:'', //商品的id
      state:'2', //审核状态
    }
  },
  mounted(){
    this._getGoodsList()
  },
  methods: {
    //编辑
    handleClick(){
      this.$router.push({name:'SupplierProductAdd11'})
    },
    //审核
    attribute(id){
      this.state = '2'
      this.dialogVisible = true
      this.goodsTypeId = id
    },
    _getGoodsList(){
      getGoodsList(this.form).then(res => {
        this.tableData = res.data.pageList
        this.form.total_count = res.data.page.total
      })
    },
    getTableData () {
    },
    handleGetGoodsList (data) {
      this.form = data
    },
    handleSizeChange(val){

    },
    handleCurrentChange(val){

    },
    Confirm(){

    },
  },
  components: {
    GoodsFitter
  }
}
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
    padding-left:20px;
    padding-top:5px;
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
.iconfont{
  font-size: 15px;
  color: white;

}
.gongneng{
  cursor: pointer;
  max-width: 96px;
  height: 32px;
  background:rgba(74,153,250,1);
  border-radius:16px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-size: 12px;
  font-family:MicrosoftYaHei;
  font-weight:400;
  color:rgba(255,255,255,1);
  span{
    margin-left: 5px;
  }
}
.small-Idiv{
  width: 32px;
  cursor: pointer;
  span{
    font-size:12px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(72,73,77,1);
  }
}
.i-div{
  cursor: pointer;
  width:32px;
  height:32px;
  border-radius:6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line-div{
    display: flex;
    justify-content: space-between;
    align-items: center;
}

 .el-select-width {
    max-width: 300px;
    margin-right: 5px;
  }
   .el-date-picker{
    max-width: 240px;
    margin-right: 5px;
  }
  .el-input-width {
    display: inline-block;
    max-width: 180px;
  }
  .el-select{
    width: 100% !important;
  }
  .spanclass{
    position: absolute;
  }
  .line-top{
    margin-top: 30px
  }
  .div_img{
    width: 28px;
    height: 28px;
  }
  .activity{
    cursor: pointer;
    width: 32px;
    height: 32px;
  }
  .small_top{
    margin-top: 10px;
    margin-left:15px;
    margin-right:15px;
    padding-bottom:18px
  }
  .model{
    color: #F66C6C !important;
  }
  .goods_num{
    color: #F66C6C !important;
    font-size: 16px;
    margin-right: 5px;
  }
  .scenario_div{
    display: flex;
    width: 96px;
    height: 32px;
    background: rgba(74,153,250,1);
    border-radius: 16px;
    justify-content: center;
    line-height: 25px;
    img{
      width: 12px;
      height: 12px;
      margin-top: 10px;
    }
    span{
      font-size:12px;
      font-family:MicrosoftYaHei;
      font-weight:400;
      color:rgba(255,255,255,1);
    }
  }
  .scssfiter{
    
    background: #ebf4fe;
    
  }
</style>
