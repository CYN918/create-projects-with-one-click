<template>
  <div class="margin">
    <goods-fitter class="mbottom" @tabVender="handleGetGoodsList" @goodsFitter="handleGetGoodsList"></goods-fitter>
    <div class="mcard">
      <div class="mbottom">
        <el-checkbox v-model="checked">全选所有页</el-checkbox>
        <el-button type="primary" size="small" style="margin-left:10px">批量操作</el-button>
      </div>
      <el-table :data="tableData" stripe style="width: 100%" border   >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
        <el-table-column label="商品图片" align="center" width="120">
          <template slot-scope="scope">
            <div class="image">
              <img :src="scope.row.skuInfo[scope.row.index].thumbnailImgUrl" width="100" height="100" alt />
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
            <div class="txt_left">{{scope.row.skuInfo[scope.row.index].priceInfo.taxRate}}</div>
            <div class="txt_left">{{scope.row.skuInfo[scope.row.index].priceInfo.costPrice}}</div>
            <div class="txt_left">{{scope.row.skuInfo[scope.row.index].priceInfo.carriagePrice}}</div>
            <div class="txt_left">{{scope.row.skuInfo[scope.row.index].priceInfo.jdPrice}}</div>
            <div class="txt_left">{{scope.row.skuInfo[scope.row.index].priceInfo.shopPrice}}</div>
            <div class="txt_left">{{scope.row.skuInfo[scope.row.index].priceInfo.price}}</div>
            <div class="txt_left">{{scope.row.skuInfo[scope.row.index].priceInfo.costJdRatio}}</div>
            <div class="txt_left">{{scope.row.skuInfo[scope.row.index].priceInfo.shopJdRatio}}</div>
          </template>
        </el-table-column>
        <el-table-column label="集采/批发价" align='center' width="150">
          <template slot-scope="scope">
            <div class="txt_left" v-for="item in scope.row.skuInfo[scope.row.index].volumeInfo.volumePrices" :key="item">
              <div class="txt_left">{{item.volumeCost}}</div>
              <div class="txt_left">{{item.volumeNumber}}</div>
            </div>
            <div class="txt_left">{{scope.row.skuInfo[scope.row.index].volumeInfo.pptPrice}}</div>
            <div class="txt_left">{{scope.row.skuInfo[scope.row.index].volumeInfo.minimumPrice}}</div>
            <div class="txt_left">{{scope.row.skuInfo[scope.row.index].volumeInfo.preferentialPrice}}</div>
          </template>
        </el-table-column>
        <el-table-column label="商品规格" align='center' width="130">
          <template slot-scope="scope">
            <div class="txt_left martop" v-for="(item,index) in scope.row.skuInfo" :key="index">
              <div class="txt_left imgitem" @click="Clicktent(index,scope.row)" :class="[index == scope.row.index?'leftbottom':'']">
                  <!-- <img src="../../../common/images/商品规格(1)shouji.png" alt="" v-if="index == scope.row.index">  -->
                <div class="more">{{item.goodsSpecValues}}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="利润统计" align='center' width="140">
          <template slot-scope="scope">
           <div class="txt_left">{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfit}}</div>
            <div class="txt_left">{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMargin}}</div>
            <div class="txt_left">{{scope.row.skuInfo[scope.row.index].financeInfo.taxation}}</div>
            <div class="txt_left">{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitTax}}</div>
            <div class="txt_left">{{scope.row.skuInfo[scope.row.index].financeInfo.grossProfitMarginTax}}</div>
            <div class="txt_left">{{scope.row.skuInfo[scope.row.index].financeInfo.incomeTax}}</div>
            <div class="txt_left">{{scope.row.skuInfo[scope.row.index].financeInfo.netProfit}}</div>
            <div class="txt_left">{{scope.row.skuInfo[scope.row.index].financeInfo.netProfitMargin}}</div>
          </template>
        </el-table-column>
        <el-table-column label="库存(PCS)" align='center' width="120">
          <template slot-scope="scope">
          <span class="goods_num">{{scope.row.skuInfo[scope.row.index].goodsNumber}}</span>
            <div class="txt_left" style="margin-top: 40px;">库存预警：{{scope.row.skuInfo[scope.row.index].warnNumber}}</div>
          </template>
        </el-table-column>
        <el-table-column label="供应商" align='center' width="150">
          <template slot-scope="scope">
            <div class="txt_left"  style="font-size:15px">{{scope.row.skuInfo[scope.row.index].suppliersName}}</div>
            <div class="txt_left" >{{scope.row.skuInfo[scope.row.index].contactName}}</div>
            <div class="txt_left">{{scope.row.skuInfo[scope.row.index].contactTelephone}}</div>
            <div class="txt_left">{{scope.row.skuInfo[scope.row.index].contactQq}}</div>
            <div class="txt_left">{{scope.row.adminName}}</div>
            <div class="txt_left">{{scope.row.adminPhoneAndEmail}}</div>
          </template>
        </el-table-column>
        <el-table-column label="来源/状态" align='center'>
          <template slot-scope="scope">
            <div class="txt_left">{{scope.row.imgInfo}}</div>
            <div class="txt_left">{{scope.row.sourceType}}</div>
            <div class="txt_left">{{scope.row.synJdPrice}}</div>
            <div class="txt_left">{{scope.row.sortOrder}} </div>
            <div class="txt_left">{{scope.row.updateTime}}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center"  fixed="right" width="150">
          <template slot-scope="scope">
            <div class="line-div">
              <div class="small-Idiv" @click="reductionfunc(scope.row)">
                <div class="i-div shenpi">
                  <img src="../../../common/images/icon/还原.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;margin-left: 1px;">还原</span>
              </div>
              <div class="small-Idiv" @click="daleteForever = true">
                <div class="i-div huishouzhan">
                  <img src="../../../common/images/icon/回收站.png" alt="" class="operation_img">
                </div>
                <span style="word-break: keep-all;margin-left: 3px;">删除</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="form.currentPage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="form.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="form.total">
        </el-pagination>
      </div>
      <el-dialog
        title="还原"
        :visible.sync="reduction"
        width="30%"
        >
        <el-form :model="form"  label-width="100px">
        <el-form-item label="还原原因:">
            <el-input type="textarea" v-model="form.textarea"></el-input>
        </el-form-item>
        <el-form-item label="上级领导审核:">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="销售总监" value="0"></el-option>
              <el-option label="采购经理" value="1"></el-option>
            </el-select>
        </el-form-item>
      </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="reduction = false" size="small">取 消</el-button>
          <el-button type="primary" @click="reductionfunc('',true)" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="删除"
        :visible.sync="daleteForever"
        width="30%"
        >
        <el-form :model="form"  label-width="100px">
        <el-form-item label="删除理由:">
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
          <el-button type="danger" @click="daleteForever = false" size="small">取 消</el-button>
          <el-button type="primary" @click="daleteForever = false" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import GoodsFitter from '../goods/goodsFitter'
import { getRecycled , putReduction} from '@/api/product/index'
import axios from 'axios'
export default {
  data () {
    return {
      checked:false, // 全选所有页
      reduction: false,//还原
      daleteForever:false, //删除
      goodsId:'', // 商品id
      form:{
        currentPage:1,
        size:10,
        total:0,
        textarea:'', // 还原原因
      },
      tableData:[],
    }
  },
  methods: {
    //点击规格展示不同的内容
    Clicktent(val,data){
      data.index = val
      console.log(this.$refs.elTable)
      this.$set(this.$refs.elTable.data)
      this.$forceUpdate();
    },
    // 还原
    reductionfunc(data,type){
      this.form.textarea = ''
      if(data){
        this.goodsId = data.goodsId
        this.reduction = true
      }
      if(type){
        let obj = {}
          obj.goodsId = this.goodsId
        putReduction(obj).then(res => {
          if(res.code == 200){
            this.$message({
              showClose: true,
              message: '还原成功',
              type: 'success'
            });
            this.reduction = false
            this._getRecycled()
          }
        })
      }
    },
    _getRecycled(){
      getRecycled(this.form).then(res =>{
          this.tableData = res.data.pageList
        this.form.total = res.data.count
      })
    },
    handleSizeChange(val){
        this.form.size = val;
        this._getRecycled()
    },
    handleCurrentChange(val){
        this.form.currentPage = val;
        this._getRecycled()
    },
    handleGetGoodsList(){

    }
  },
  components: {
    GoodsFitter
  },
  created(){
    this._getRecycled()
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
    justify-content: space-around;

}
  .leftbottom{
    color: #4a99fa;
    border-bottom:1px dashed rgba(215,220,231,1);
    padding-bottom: 8px;
  }
  .more{
    cursor:pointer;
  }
  .imgitem{
    display: flex;
    align-items: center;
    img{
      width: 24px;
      height: 24px;
      margin-right: 10px;
    }
  }
  .martop{
    margin-top: 10px;
  }
</style>
