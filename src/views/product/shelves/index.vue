<template>
  <div class="margin">
    <goods-fitter class="mbottom" @tabVender="handleGetGoodsList" @goodsFitter="handleGetGoodsList"></goods-fitter>
    <div class="mcard">
      <div class="mbottom">
        <el-checkbox v-model="checked">全选本页</el-checkbox>
        <el-checkbox v-model="checkedAll">全选所有页</el-checkbox>
        <el-button type="primary" size="small" @click="dialogFormVisible = true">批量操作</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%" border   >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
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


        <el-table-column label="活动" align='center' width="200"  fixed="right">
          <template slot-scope="scope">
            <div class="line-div">
              <div class="small-Idiv">
                <div class="activity">
                  <img src="../../../common/images/goods/yijiandaifa.png" alt="" class="div_img">
                </div>
                <span  style="word-break: keep-all;margin-left: -2px;left:10px" class="spanclass">一件代发</span>
              </div>
              <el-switch v-model="value1" active-color="#13ce66"></el-switch>
              <div class="small-Idiv">
                <div class="activity">
                  <img src="../../../common/images/goods/xiajiashangjia.png" alt="" class="div_img">
                </div>
                <span  style="word-break:keep-all;margin-left: -2px;display: inline-flex;width: 55px;right: 46px;"  class="spanclass">上架/下架</span>
              </div>
              <el-switch v-model="value2" active-color="#13ce66"></el-switch>
            </div>
            <div class="line-div line-top">
              <div class="small-Idiv">
                <div class="activity">
                  <img src="../../../common/images/goods/miansha.png" alt="" class="div_img">
                </div>
                <span  style="word-break: keep-all;margin-left: -2px;left: 22px;" class="spanclass">秒杀</span>
              </div>
              <el-switch v-model="value3" active-color="#13ce66"></el-switch>
              <div class="small-Idiv">
                <div class="activity">
                  <img src="../../../common/images/goods/zhouzhoujingxuan.png" alt="" class="div_img">
                </div>
                <span  style="word-break:keep-all;margin-left: -2px;right: 51px;"  class="spanclass">周周精选</span>
              </div>
              <el-switch v-model="value4" active-color="#13ce66"></el-switch>
            </div>
            <div class="line-div line-top">
              <div class="small-Idiv">
                <div class="activity">
                  <img src="../../../common/images/goods/haohuo.png" alt="" class="div_img">
                </div>
                <span  style="word-break: keep-all;margin-left: -2px;left: 7px;" class="spanclass">好货抢鲜购</span>
              </div>
              <el-switch v-model="value5" active-color="#13ce66"></el-switch>
              <div class="small-Idiv">
                <div class="activity">
                  <img src="../../../common/images/goods/pingtuan.png" alt="" class="div_img">
                </div>
                <span  style="word-break:keep-all;margin-left: -2px; right: 65px;"  class="spanclass">拼团</span>
              </div>
              <el-switch v-model="value6" active-color="#13ce66"></el-switch>
            </div>
            <div class="line-div line-top">
              <div class="small-Idiv">
                <div class="activity">
                  <img src="../../../common/images/goods/shequ.png" alt="" class="div_img">
                </div>
                <span  style="word-break: keep-all;margin-left: -2px;left: 10px;" class="spanclass">社区团购</span>
              </div>
              <el-switch v-model="value7" active-color="#13ce66"></el-switch>
              <div class="small-Idiv">
                <div class="activity">
                  <img src="../../../common/images/goods/huiyuanri.png" alt="" class="div_img">
                </div>
                <span  style="word-break:keep-all;margin-left: -2px;    right: 60px;"  class="spanclass">会员日</span>
              </div>
              <el-switch v-model="value8"  active-color="#13ce66"></el-switch>
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
        <el-table-column label="操作" align="center"  fixed="right" width="150">
          <template slot-scope="scope">
            <div class="line-div">
              <div class="small-Idiv">
                <div class="i-div huishouzhan">
                  <img src="../../../common/images/icon/回收站.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;">回收站</span>
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
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 批量操作弹窗 -->

      <!-- 场景定制弹窗 -->
      <el-dialog title="场景定制" :visible.sync="scenario"  width="60%">
        <el-row style="font-size:16px;margin-bottom: 15px;">选择场景：<span  style="font-size:14px">（每款商品最多可选择三个场景,每个场景可以选择三个类目）</span></el-row>
        <el-form :model="form"  label-width="60px">
          <el-row v-for="item in custom" :key="item.checkedname">
            <el-col :span="12">
              <el-col :span="5" style="line-height:40px">
                <el-checkbox v-model="checked">{{item.checkedname}}</el-checkbox>
              </el-col>
              <el-col :span="19">
                <el-form-item label="类目：" >
                  <el-select v-model="dialog.value1" multiple placeholder="请选择" class="el-select-width">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-col>
            <el-col :span="12">
              <el-col :span="5" style="line-height:40px">
                <el-checkbox v-model="checked">{{item.peoplename}}</el-checkbox>
              </el-col>
              <el-col :span="19">
                <el-form-item label="类目：" >
                  <el-select v-model="dialog.value2" multiple placeholder="请选择" class="el-select-width">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-col>
        </el-row>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="scenario = false">取 消</el-button>
          <el-button type="primary" @click="scenario = false">确 定</el-button>
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
  data () {
    return {
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
        custom:[
          {checkedname:'中秋节福利',peoplename:'员工福利'},
          {checkedname:'中秋节福利',peoplename:'员工福利'},
          {checkedname:'中秋节福利',peoplename:'员工福利'},
          {checkedname:'中秋节福利',peoplename:'员工福利'},
          {checkedname:'中秋节福利',peoplename:'员工福利'},
          {checkedname:'中秋节福利',peoplename:'员工福利'},
          {checkedname:'中秋节福利',peoplename:'员工福利'},
          {checkedname:'中秋节福利',peoplename:'员工福利'},
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
      this.tableSubmitData.form = this.form
      return getGoodsList(this.tableSubmitData)
    },
    handleGetGoodsList (data) {
      this.form = data
      this._getTableData()
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
    justify-content: space-around;
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
