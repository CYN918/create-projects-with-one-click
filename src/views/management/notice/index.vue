<template>
  <div class="margin">
    <goods-fitter class="mbottom" :dataObj="form" @goodsFitter="handleGetGoodsList" @tabVender='handleGetGoodsList'></goods-fitter>
    <div class="mcard">
     <div class='mbottom'>
        <el-button
          type="primary"
          size="small"
          @click="dialogFormVisiblefunc(0,true)"
          style="margin-left:10px"
        >批量上架
        </el-button>
         <el-button
                 type="primary"
                 size="small"
                 @click="dialogFormVisiblefunc(2,true)"
                 style="margin-left:10px"
         >批量下架
         </el-button>
        <el-button
            type="primary"
            size="small"
            @click="dialogFormVisiblefunc(1,true)"
            style="margin-left:10px"
          >批量忽略
         </el-button>
    </div>

      <el-table :data="tableData" stripe style="width: 100%" ref="pushGoodsList" border   @selection-change="handleSelectionChange">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
        <el-table-column label="商品图片" align="center">
          <template slot-scope="scope">
            <div class="image" v-if="scope.row.goodsSKUList[scope.row.index || 0].thumbnailImgUrl">
              <img
                      :src="scope.row.goodsSKUList[scope.row.index || 0].thumbnailImgUrl"
                      width="100"
                      height="100"
                      alt
              />
            </div>
            <div v-if="!scope.row.goodsSKUList[scope.row.index || 0].thumbnailImgUrl">暂无图片</div>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" align="center">
          <template slot-scope="scope">
            <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
          </template>
        </el-table-column>
        <el-table-column label="规格尺寸" align="center">
          <template slot-scope="scope">
            <div style="height: 300px;overflow-y: auto;">
              <div class="txt_left martop" v-for="(item,index) in scope.row.goodsSKUList" :key="index">
                <div
                  class="txt_left imgitem"
                  @click="Clicktent(index,scope.row)"
                  :class="[index == (scope.row.index||0)?'leftbottom':'']"
                >
                   <img src="../../../common/images/商品规格(1).png" alt="" v-if="index == (scope.row.index||0)">
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
                      <div class="more txt_left">商城价格:{{scope.row.goodsSKUList[scope.row.index||0].goodsPrice}}元</div>
                      <div class="more txt_left">
                          vip价:{{scope.row.goodsSKUList[scope.row.index||0].goodsVipPrice?scope.row.goodsSKUList[scope.row.index||0].goodsVipPrice+'元':'暂无'}}
                      </div>
                      <div class="more txt_left">市场价:{{scope.row.goodsSKUList[scope.row.index||0].costPrice}}元</div>
                      <div class="more txt_left">税率：12%</div>
                      <!--<div class="more txt_left" v-if="notMasterSystem">-->
                      <!--供货价：{{scope.row.goodsSKUList[scope.row.index||0]?scope.row.goodsSKUList[scope.row.index||0].costPrice+'元':'不支持'}}-->
                      <!--</div>-->
                  </div>
                  <div>
                      <div class="txt_left">
                          运费：{{scope.row.goodsSKUList[scope.row.index||0].configureVo?scope.row.goodsSKUList[scope.row.index||0].configureVo.carriagePrice!=0?scope.row.goodsSKUList[scope.row.index||0].configureVo.carriagePrice:'含运费':'含运费'}}
                      </div>
                      <div class="more txt_left" v-if="notMasterSystem">
                          是否支持一件代发：{{collectingIndex==1?'不支持':'支持'}}
                      </div>
                  </div>
          </template>
          </el-table-column>
          <el-table-column label="库存（pcs）" align="center">
              <template slot-scope="scope">
                  <span class="goods_num">{{scope.row.goodsSKUList[scope.row.index||0].goodsNumber||0}}</span>
                  <div
                          class="txt_left"
                          style="margin-top: 40px;"
                  >库存预警：{{scope.row.goodsSKUList[scope.row.index||0].warnNumber}}
                  </div>
              </template>
          </el-table-column>

          <el-table-column label="商品来源" align="center">
          <template slot-scope="scope">
              {{['自营','京东','网易严选','苏宁'][status||0]}}
          </template>
        </el-table-column>
        <el-table-column label="推送日期" align="center" prop="pushTime">
        </el-table-column>
        <el-table-column label="操作" align="center" width="150" fixed="right">
          <template slot-scope="scope">
            <div>
              <div class="line-div small_top" @click="Stand(scope.row)"  >
                <div class="small-Idiv">
                        <div class="activity">
                                <img src="../../../common/images/goods/xiajiashangjia.png" alt class="div_img"/>
                        </div>
                        <span
                            style="word-break: keep-all;margin-left: 5px;left:10px"
                            class="spanclass"
                        >上架/下架</span>
                </div>
                  <el-switch
                        @change="handleisOnSale"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        :active-value="1"
                        :inactive-value="0"
                        :value="scope.row.isOnSale">
                  </el-switch>
             </div>
              <div class="line-div small_top" style="padding-bottom:0">
                <div class="small-Idiv" @click="goodsDetail(scope.row)"  >
                  <div class="i-div fuzhi">
                    <img src="../../../common/images/icon/货物列表.png" alt class="operation_img"/>
                  </div>
                  <span style="word-break: keep-all;margin-left: -6px;">商品详情</span>
                </div>
                <div class="small-Idiv"     @click="ignoreGoods(scope.row.id)"  >
                  <div class="i-div huishouzhan">
                    <img src="../../../common/images/icon/审核记录.png" alt class="operation_img" />
                  </div>
                  <span style="word-break: keep-all;margin-left: -6px;">忽略</span>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.pageNum"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="form.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
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
          </el-form-item> -->
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="deleteType = false" size="small">取 消</el-button>
          <el-button type="primary" @click="deleteTypefunc('',true)" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 移除 -->
      <!-- 批量操作弹窗 -->
      <el-dialog title="操作提示" :visible.sync="dialogFormVisible" width="40%">
        <div style='text-align: center;'>
            <img src="../../../common/images/提示.png" alt style='width:28px;margin-right:20px;vertical-align: middle;'/>
            {{ dialogContent }}
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false">关 闭</el-button>
          <el-button type="danger" @click="batchOperation">{{txet}}</el-button>
        </div>
      </el-dialog>
      <!-- 批量操作弹窗 -->
    </div>
     <!-- 商品详情 -->
    <el-dialog :title="titleDetails" :visible.sync="dialogDetailsVisible" width="50%">
      <el-row>
        <el-col :span="24"><div class="grid-content">商品名称：{{product.goodsName}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="12"><div class="grid-content">品牌：</div></el-col>
        <el-col :span="12"><div class="grid-content">型号：{{product.modelNumber||'暂无'}}</div></el-col>
      </el-row>
       <el-row>
        <el-col :span="12"><div class="grid-content">货号：</div></el-col>
        <el-col :span="12"><div class="grid-content" v-if="product.goodsSKUList&&product.goodsSKUList.length>0">规格尺寸：{{product.goodsSKUList[num].goodsName}}</div></el-col>
      </el-row>
       <el-row>
        <el-col :span="12"><div class="grid-content">VIP价：</div></el-col>
        <el-col :span="12"><div class="grid-content" v-if="product.goodsSKUList&&product.goodsSKUList.length>0">商城价：{{product.goodsSKUList[num].goodsPrice||''}}</div></el-col>
      </el-row>
       <el-row>
        <el-col :span="12"><div class="grid-content"  v-if="product.goodsSKUList&&product.goodsSKUList.length>0">市场价：{{product.goodsSKUList[num].costPrice||''}}</div></el-col>
        <el-col :span="12"><div class="grid-content">供货价：</div></el-col>
      </el-row>
       <el-row>
           <el-col :span="12">
               <div class="grid-content">税率：12%</div>
           </el-col>
        <el-col :span="12"><div class="grid-content">起订量：</div></el-col>
      </el-row>
       <el-row>
           <!--<el-col :span="12"><div class="grid-content">运费:{{product.goodsSKUList[num].configureVo?product.goodsSKUList[num].configureVo.carriagePrice!=0?product.goodsSKUList[num].configureVo.carriagePrice:'含运费':'含运费'}}</div></el-col>-->
        <el-col :span="12"><div class="grid-content">京东价：</div></el-col>
      </el-row>
       <el-row>
           <el-col :span="24">
               <div class="grid-content">商品来源：
                   {{['自营','京东','网易严选','苏宁'][status||0]}}
               </div>
           </el-col>
      </el-row>
      <!--<span slot="footer" class="dialog-footer">-->
        <!--<el-button type="danger" @click="dialogDetailsVisible = false" size="small">取 消</el-button>-->
        <!--<el-button type="primary" @click="sure" size="small">确 定</el-button>-->
      <!--</span>-->
    </el-dialog>
    <!-- 商品详情 -->
           <!-- 上架下架商品 -->
      <el-dialog :title="title" :visible.sync="dialogVisibleaa" width="30%">
        <div style='text-align: center;'>
          <img src="../../../common/images/提示.png" alt style='width:28px;margin-right:15px;vertical-align: middle;'/>
          你确定要{{title}}？
        </div>
        <span slot="footer" class="dialog-footer" style="margin-top:-5px">
          <el-button type="danger" @click="cancel" size="small">取 消</el-button>
          <el-button type="primary" @click="surea" size="small">确 定</el-button>
        </span>
      </el-dialog>

      <!--单个删除弹框-->
      <el-dialog 提示 :visible.sync="deledialogVisiblea" width="30%">
          <div style='text-align: center;'>
              <img src="../../../common/images/提示.png" alt style='width:28px;margin-right:15px;vertical-align: middle;'/>
              你确定要忽略此商品吗？
          </div>
          <span slot="footer" class="dialog-footer" style="margin-top:-5px">
          <el-button type="danger"@click="deledialogVisiblea=false" >取 消</el-button>
          <el-button type="primary" @click="delecofrim" size="small">确 定</el-button>
        </span>
      </el-dialog>

  </div>
</template>

<script>
// import GoodsFitter from '../goods/goodsFitter'
import GoodsFitter from './goodsFitter'
import {throttleTipPop} from '@/utils/throttle'
import {deleIgnoreGoods, updateGoodsListsale} from '@/api/product/index'
import {
  getGoodsList ,
  changeState,
  commodityNotice,
  switchUpDown
  } from '@/api/product/index'
export default {
  data () {
    return {
        isOnSale: 0,
        collectingIndex: '', //集采的价格暂无
      txet:'',
      num:0,
      totalCount:0,
      dialogFormVisible:false,    // 通用的弹框
      dialogDetailsVisible:false, // 商品详情
      deledialogVisiblea:false,  //单个忽略商品
      titleDetails:'商品详情',
      dialogContent:'',  // 通用弹框的提示内容
      shelves:false,  // 上架弹框底部按钮
      ignore:false,  // 忽略弹框底部按钮
      textareaValue:'',
      recycleBin:false,
      dialogVisibleaa:false,
      frametextarea:'',
      radio: '1',
      deleteType:false, //移除
      dialogVisible:false,//审核的弹窗
      goodsTypeId:'', //商品的id
      state:'2', //审核状态
      form: {
          goodsType: null, // 1，京东 2，网易 3，苏宁 4, 一件代发商品 5, 集采商品
          goodsName:'',
          pageNum:1,
          pageSize:10,
          isSubstituteSales:true,
      },
      dialog:{
        value1:'',
        value2:''
      },
      checkList1:[],
      checkList2:[],
      checkedAll:'',
      checked:'',
      scenario:false, //审核记录
      tableData:[],
      getSceneArr:[],
      title:'审核',
      audit:{
        pushStatus:0,
        auditStatus:1,
        goodsData:'', // 选择商品的data
        auditType:'', //审核类型
        auditId:'', //审核记录ID
        auditRemark:'', //审核说明
        operationId:'', //审核的业务id
        processId:'', //流程ID，主键
      },
      delete_remark:'', // 移除的理由
      multipleSelection:[], //选中的商品
      product:'',
      status:"" , //判断商品的来源
      pushNoticeId:'', // 商品的id
      putCode:'',
      data:''
    }
  },
    computed: {
        notMasterSystem() {
            return this.$routerInfo.platformType != 0;
        }
    },
  mounted(){
    this._getGoodsList()
  },
  methods: {
    //获取选中的商品
    handleSelectionChange(val){
      this.multipleSelection =val
    },

    //批量操作弹框
    dialogFormVisiblefunc(data, type) {
        this.data = data
      if( this.multipleSelection.length<=0){
          return throttleTipPop(this, 'info', '请选择商品')
      }
        if (data == 0) {
            this.dialogFormVisible = true
            this.dialogContent = "你确定要批量上架所选中的商品吗？"
            this.shelves = true
            this.ignore = false
            this.txet = '上架'
        }else if (data == 1) {
            this.dialogFormVisible = true
            this.dialogContent = "你确定要批量忽略所选中的商品吗？"
            this.shelves = false
            this.ignore = true
            this.txet = '忽略'
        } else if (data == 2) {
            this.dialogFormVisible = true
            this.dialogContent = "你确定要批量下架所选中的商品吗？"
            this.shelves = false
            this.ignore = true
            this.txet = '下架'
        }
    },
  //批量忽略
     async batchOperation(){
          let data = this.data
          let pushNoticeIds  = []
          this.dialogFormVisible = false
          this.multipleSelection.forEach(item=>{
              pushNoticeIds.push(item.id)
          })
          if(data == 1){
              const res = await deleIgnoreGoods(pushNoticeIds)
              if(res.code === 200 ){
                  this.$message({
                      type:'success',
                      message:'忽略成功'
                  })
                  this._getGoodsList()
              }
          }
         if (data == 0) {
             //批量上架
             const obj = {
                 pushNoticeIds: pushNoticeIds,
                 putCode: 1
             }
             const res = await updateGoodsListsale(obj)
             if (res.code === 200) {
                 this.$message({
                     type: 'success',
                     message: '上架成功'
                 })
                 this._getGoodsList()
             }
          }
         if (data == 2) {
             //批量下架
             const obj = {
                 pushNoticeIds: pushNoticeIds,
                 putCode: 0
             }
             const res = await updateGoodsListsale(obj)
             if (res.code === 200) {
                 this.$message({
                     type: 'success',
                     message: '下架成功'
                 })
                 this._getGoodsList()
             }

         }
      },
      //单个忽略商品
   ignoreGoods(val){
        this.deledialogVisiblea =true
        this.pushNoticeId = val
      },
      async delecofrim(){
          const res = await deleIgnoreGoods([this.pushNoticeId])
          if(res.code === 200 ){
                this.$message({
                    type:'success',
                    message:'忽略成功'
                })
              this._getGoodsList()
          }
          this.deledialogVisiblea =false
      },
    goodsDetail(data) {
        this.product = data
      this.dialogDetailsVisible = true
    },
    //审核记录
    scenariofc(id){
      this.$router.push({name:'ProductAuditdetails' , query:{id:id}})
    },
    handleisOnSale(val){
      this.isOnSale = val
    },
    //取消上下架
    cancel(){
      this.dialogVisibleaa =false
    },
    //上下架商品
    Stand(data){
      this.pushNoticeId = data.id
      this.goodsData = data
      this.dialogVisibleaa = true
      data.isOnSale == 1 ? this.title='下架商品' : this.title='上架商品'
    },
    //确定上下架
    surea() {
      const obj={
        pushNoticeId:this.pushNoticeId,
        putCode: this.isOnSale

      }
      switchUpDown(obj).then(res => {
        if (res.code == 200) {
          this.dialogVisibleaa = false;
          this.$message({
            message: res.message,
            type: "success"
          });
          this._getGoodsList()
        }
      });
    },

    //点击规格展示不同的内容
    Clicktent(val,data){
      this.num = val
      data.index = val;
      this.$set(this.$refs.pushGoodsList, "data", [...this.$refs.pushGoodsList.data])
    },
    async  _getGoodsList(){
      const res = await  commodityNotice(this.form)
      if(res.code === 200 ){
        var that =this
        that.tableData = res.data.content
        this.totalCount = res.data.totalElements
      }
    },

      handleGetGoodsList(data, val, index) {
          this.collectingIndex = index
      this.form = data;
      this.status = val
      this._getGoodsList()
    },
    handleSizeChange(val){
      this.form.pageSize = val
      this._getGoodsList()
    },
    handleCurrentChange(val){
      this.form.pageNum = val
      this._getGoodsList()
    }
  },
  filters:{
    TypeName(val){
      let arr = [
        {auditType:1,name:'上架'},
        {auditType:2,name:'下架'},
        {auditType:3,name:'调价'},
        {auditType:4,name:'信息变更'},
        {auditType:5,name:'删除商品'},
        {auditType:6,name:'京东改价'},
        ]
    for(var i = 0 ; i<arr.length; i++){
      if(val == arr[i].auditType){
        return arr[i].name
      }
    }
  }
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
</style>
