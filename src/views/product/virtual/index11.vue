<template>
  <div class="margin">
    <goods-fitter class="mbottom" @tabVender="handleGetGoodsList" @goodsFitter="handleGetGoodsList"></goods-fitter>
    <div class="mcard">
      <div class="mbottom">
        <el-checkbox v-model="checked">全选本页</el-checkbox>
        <el-checkbox v-model="checked">全选所有页</el-checkbox>
        <el-button type="primary" size="small">批量操作</el-button>
        <el-button type="primary" size="small"  @click="$router.push({  name: 'ProductAddvirtual'}) ">添加虚拟商品</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%" border  stripe >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="编号" width="55" align="center"></el-table-column>
        <el-table-column label="商品图片" align="center" width="120">
          <template slot-scope="scope">
            <div class="image">
              <img :src="scope.row.goods_url" width="100" height="100" alt />
            </div>
          </template>
        </el-table-column>
        <el-table-column label="来源/状态" align='center' >
          <template slot-scope="scope">
            {{scope.row.name}}
            <!-- <p>图片： {{scope.row.image_info}}</p>
            <p>来源： {{scope.row.image_source}}</p>
            <p>类型: {{scope.row.sale_type_name}}</p>
            <p>京东价: {{scope.row.jd_sync_type_name}}</p>
            <p>排序： {{scope.row.goods_index}}</p>
            <p>更新时间: {{scope.row.update_time}}</p> -->
          </template>
        </el-table-column>
        <el-table-column label="商品信息" align='center'>
          <template slot-scope="scope">
            {{scope.row.name}}
            <!-- <p style="font-weight: 700">{{scope.row.goods_name}}</p>
            <p>货号： {{scope.row.goods_sn}}</p>
            <p>型号: {{scope.row.model_number}}</p>
            <p>品牌: {{scope.row.goods_branch_name}}</p>
            <p>库存： {{scope.row.inventory_number}}</p>
            <p>库存预警: {{scope.row.warn_number}}</p>
            <el-button type="text" :size="small">一件比价</el-button> -->
          </template>
        </el-table-column>
        <el-table-column label="价格信息" align='center'>
          <template slot-scope="scope">
            {{scope.row.name}}
            <!-- <p>税率:{{scope.row.tax}}%</p>
            <p>一件代发价: {{scope.row.cost_price}}</p>
            <p>运费: {{scope.row.freight_price}}</p>
            <p>京东价: {{scope.row.jd_price}}</p>
            <p>商城价： {{scope.row.store_price}}</p>
            <p>市场价: {{scope.row.price}}</p>
            <p>成本对比京东/天猫折扣率: {{scope.row.cost_discount_rate}}</p>
            <p>商城价对比京东/天猫折扣率：: {{scope.row.store_discount_rate}}</p> -->
          </template>
        </el-table-column>
        <el-table-column label="集采/批发价" align='center'>
          <template slot-scope="scope">
            {{scope.row.name}}
            <!-- <p>起订量1：{{scope.row.volume[0].number}}</p>
            <p>批发价1：{{scope.row.volume[0].price}}</p>
            <p>起订量2：{{scope.row.volume[1].number}}</p>
            <p>批发价2：{{scope.row.volume[1].price}}</p>
            <p>对外PPT价格：{{scope.row.volume[0].ppt_price}}</p>
            <p>对外最低报价：{{scope.row.volume[0].discount_price}}</p>
            <p>给我司的特惠价：{{scope.row.volume[1].discount_price}}</p> -->
          </template>
        </el-table-column>
        <el-table-column label="利润统计" align='center'>
          <template slot-scope="scope">
            {{scope.row.name}}
            <!-- <p>毛利润：{{scope.row.gross_profit}}</p>
            <p>毛利润率：{{scope.row.gross_profit_margin}}%</p>
            <p>税费：{{scope.row.taxes}}</p>
            <p>税后毛利：{{scope.row.taxes_gross_profit}}</p>
            <p>税后毛利率：{{scope.row.taxes_gross_profit_margin}}%</p>
            <p>所得税：{{scope.row.income_tax}}</p>
            <p>纯利润：{{scope.row.pure_profit}}</p>
            <p>纯利润率：{{scope.row.pure_profit_margin}}%</p>
            <p>优惠价后的利润率：{{scope.row.sale_profit_margin}}%</p> -->
          </template>
        </el-table-column>
        <el-table-column label="库存" align='center'>
          <template slot-scope="scope">
            {{scope.row.name}}
            <!-- <p>分销价：{{scope.row.distr_price}}</p>
            <p>分销利润：{{scope.row.distr_profit}}%</p>
            <p>分销利润率：{{scope.row.distr_profit_margin}}%</p>
            <p>分销后纯利润：{{scope.row.distr_after_profit}}</p>
            <p>分销后纯利润率：{{scope.row.distr_after_profit_margin}}%</p> -->
          </template>
        </el-table-column>
        <el-table-column label="供应商" align='center'>
          <template slot-scope="scope">
            {{scope.row.name}}
            <!-- <p style="font-weight: 700">{{scope.row.supplier_company_name}}</p>
            <p>联系人：{{scope.row.supplier_phone}}</p>
            <p>联系人电话：{{scope.row.supplier_phone}}</p>
            <p>QQ：{{scope.row.supplier_qq}}</p>
            <p>管理员：{{scope.row.supplier_manage_name}}</p>
            <p>管理员手机/邮箱：{{scope.row.supplier_manage_phone}}/{{scope.row.supplier_manage_email}}</p> -->
          </template>
        </el-table-column>

        <el-table-column label="活动" align='center' width="120"  fixed='right'>
          <template slot-scope="scope">
            <div class="line-div">
              <div class="small-Idiv">
                <div class="activity">
                  <img src="../../../common/images/goods/xiajiashangjia.png" alt="" class="div_img">
                </div>
                <span  style="word-break:keep-all;margin-left: -2px;width: 81px;right: 46px;"  class="spanclass">下架/上架</span>
              </div>
              <el-switch  v-model="scope.row.isOnSale"  :active-value="1" :inactive-value="0" active-color="#8CC5FF"></el-switch>
            </div>
            <div class="line-div line-top" style="padding-left: 3px;">
              <div class="small-Idiv">
                <div class="activity">
                  <img src="../../../common/images/goods/yijiandaifa.png" alt="" class="div_img">
                </div>
                <span  style="word-break: keep-all;margin-left: 3px;left:10px" class="spanclass">一件代发</span>
              </div>
              <el-switch v-model="scope.row.isSubstituteSales"  :active-value="1" :inactive-value="0" active-color="#8CC5FF"></el-switch>
            </div>
            <div class="line-div line-top" style="">
              <div class="small-Idiv scenario_div"  @click="scenario = true">
                <div class="">
                  <img src="../../../common/images/gongneng.png" alt="" class="div_img">
                </div>
                <span  style="word-break: keep-all;margin-left: -2px;margin-left: 5px;">场景定制</span>
                 <!-- <span class="model">*</span> -->
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center"  fixed="right">
          <template slot-scope="scope">
             <div class="line-div small_top">
              <div class="small-Idiv">
                <div class="i-div">
                  <img src="../../../common/images/icon/编辑.png" alt="" class="operation_img">
                </div>
                <span>编辑</span>
              </div>
              <div class="small-Idiv">
                <div class="i-div huishouzhan">
                  <img src="../../../common/images/icon/回收站.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;margin-left: -2px;">回收站</span>
              </div>
            </div>
            <div class="line-div small_top" style="justify-content: end;margin-left: 18px;">
              <div class="small-Idiv">
                <div class="i-div fuzhi">
                  <img src="../../../common/images/icon/货物列表.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;margin-left: -3px;">商品详情</span>
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
      <!-- 场景定制弹窗 -->
      <el-dialog title="场景定制" :visible.sync="scenario"  width="40%">
    <div class="mbottom">
      <div class="goods-fitter">
        <div class="search-wrapper">
            <h4 class="title">送礼场景<span  style="font-size:14px">（每款商品最多可选择2个场景）</span></h4><br/>
        <el-form :model="form"  label-width="60px">
          <el-row >
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked0">员工福利</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked1">商务馈赠</el-checkbox>
              </el-col>
            </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked2">会议礼品</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px">
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
            <h4 class="title">节日类别</h4><br/>
         <el-form :model="form"  label-width="60px">
          <el-row >
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked13">春节</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked14">元旦</el-checkbox>
              </el-col>
            </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked15">元宵节</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px">
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
            <h4 class="title">送礼对象</h4><br/>
         <el-form :model="form"  label-width="60px">
          <el-row >
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked21">高级客户</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked22">公司员工</el-checkbox>
              </el-col>
            </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked23">领导上司</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px">
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
            <h4 class="title">为你推荐</h4><br/>
         <el-form :model="form"  label-width="60px">
          <el-row >
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked29">特色产品</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked30">每日推荐</el-checkbox>
              </el-col>
            </el-col>
            <el-col :span="6" style="line-height:40px">
                <el-checkbox v-model="checked31">物美价廉</el-checkbox>
            </el-col>
            <el-col :span="6" style="line-height:40px">
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
        <div slot="footer" class="dialog-footer">
          <el-button type="danger" @click="scenario = false" size="small">取 消</el-button>
          <el-button type="primary" @click="scenario = false" size="small">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 场景定制弹窗 -->
    </div>
  </div>
</template>

<script>
import GoodsFitter from '../goods/goodsFitter'
import { getGoodsList } from '@/api/product/index'
import axios from 'axios'
export default {
  name: 'ProductList',
  data () {
    return {
      scenario:false, //场景定制弹框
      form: {
        current_page:1,
        page_size:10,
        total_count:0,
      },
      tableData:[
          {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
    }
  },
  methods: {
    getTableData () {
      // this.tableSubmitData.form = this.form
      // return getGoodsList(this.tableSubmitData)
    },
    handleGetGoodsList (data) {
      // this.form = data
      // this._getTableData()
    }
  },
  components: {
    GoodsFitter
  }
}
</script>

<style lang='scss' scoped>
.image {
  width: 100px;
  height: 100px;
  font-size: 0;
}
.small-Idiv{
  width: 32px;
  span{
    margin-top: 3px;
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
.fuzhi{
  background:rgba(229,162,75,1);
}
 .huishouzhan{
   background:rgba(247,108,110,1);
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
  .small_top{
    margin-top: 10px;
    margin-left:15px;
    margin-right:15px
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
</style>
