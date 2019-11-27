<template>
  <div class="margin">
    <div class="mcard"  style="padding:0">
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <h4 class="title">添加商品</h4>
            <el-button  @click="goback" type="primary" size="small" class="comeBack" >返回</el-button>
          </div>
        </div>
      </div>
      </div>
        <div class="margin">
            <div class="msetting-account-wrapper" style="margin-left: -40px;">
              <div class="tabs-header">
                  <ul class="clearfix">
                  <li @click="tabIndex(0)" :class="currentIndex===0 ? 'active' : ''">通用信息</li>
                  <li @click="tabIndex(1)" :class="currentIndex===1 ? 'active' : ''">商品详情</li>
                  <li @click="tabIndex(2)" :class="currentIndex===2? 'active' : ''">商品属性</li>
                  <!-- <li @click="tabIndex(3)" :class="currentIndex===3 ? 'active' : ''">商品相册</li> -->
                  <li @click="tabIndex(4)" :class="currentIndex===4? 'active' : ''">日志记录</li>
                  </ul>
              </div>
              <div class="tabs-content">
                  <account-general v-show="currentIndex===0" ref="genaral"></account-general>
                  <account-desecribe v-show="currentIndex===1" ref="information"></account-desecribe>
                  <account-datalise v-show="currentIndex===2" ></account-datalise>
                  <!-- <account-picture v-show="currentIndex===3"  ref="picture"></account-picture> -->
                  <account-record v-show="currentIndex===4" ></account-record>
              </div>
            </div>
        </div>
        <div style="margin-top: 20px; text-align: center;">
          <el-button type="primary" size="meduim" @click="handleSubmit">确定</el-button>
          <el-button type="primary" size="meduim" >重置</el-button>
        </div>
  </div>
</template>

<script>
import AccountGeneral from './general'
import AccountDesecribe from './desecribe'
import AccountDatalise from './datalise'
import AccountPicture from './picture'
import AccountRecord from './record'

import { getGoodsProp } from '@/api/public'

import { addProduct ,getIdgoods} from '@/api/product/index'
export default {
  name: 'ProductAdd',
  data () {
    return {
        currentIndex: 0,
        storeManagerId: '0',
        roleList: [],
        rolePaginationTotalCount: 0,
        activeName: '0',
        addGoodsForm: {
        info: '', // 详细描述
        prop_id: '', // 商品类型(属性)
        id:'', //商品id
      },
      propList: []
    }
  },
  created () {
    // this._getGoodsProp()
  },
  mounted(){
    if(this.$route.params.id){
          this.addGoodsForm.id = this.$route.params.id
          getIdgoods(this.addGoodsForm.id).then(res => {
            // console.log(JSON.stringify(res.data.goods.goodsNameStyle.split('+')[0]) )
            let color = res.data.goods.goodsNameStyle.split('+')[0]
            let style = res.data.goods.goodsNameStyle.split('+')[1]
            this.$refs.genaral.form.goods_name =  res.data.goods.goodsName // 商品名称
            this.$refs.genaral.form.goods_name_color =  color // 商品名称颜色
            this.$refs.genaral.form.goods_name_style =  style // 商品名称字体样式
            this.$refs.genaral.form.goods_sn =  res.data.goods.goodsSn // 商品货号
            this.$refs.genaral.form.model_number =  res.data.goods.modelNumber // 型号
            this.$refs.genaral.form.goods_weight =  res.data.goods.goodsWeight // 商品重量
            this.$refs.genaral.form.cat_id =  res.data.goods.catId // 商品分类
            this.$refs.genaral.form.tax =  res.data.goods.taxRate // 税率
            this.$refs.genaral.form.supplier =  res.data.goods.supplierId // 供应商ID
            
            res.data.goods.supplierId
            // this.$refs.genaral.form.goods_branch =  res.data.goods.brandId // 商品品牌id
            // this.$refs.genaral.form.price =  res.data.goods.marketPrice // 市场销售价
            // this.$refs.genaral.form.tip_price =  res.data.goods.guidancePrice // 指导我司销售价
            // this.$refs.genaral.form.cost_price =  res.data.goods.costPrice // 一件代发单价（含税价)
            // this.$refs.genaral.form.cost_company =  res.data.goods.logisticsCompany // 一件代发快递公司
            // this.$refs.genaral.form.cost_price_type =  res.data.goods.logisticsCompany // 是否一件代发	1，是； 0，否
            // this.$refs.genaral.form.freight =  res.data.goods.carriagePrice // 是否一件代发	1，是； 0，否
            // this.$refs.genaral.form.jd_link =  res.data.goods.jdGoodsUrl // 京东链接
            // this.$refs.genaral.form.jd_price =  res.data.goods.jdPrice // 京东价格
            // this.$refs.genaral.form.tm_link =  res.data.goods.jdGoodsUrl // 天猫链接
            // this.$refs.genaral.form.tm_price =  res.data.goods.jdPrice // 天猫价格
            // this.$refs.genaral.form.inventory_number =  res.data.goods.goodsNumber // 库存数量
            // this.$refs.genaral.form.warn_number =  res.data.goods.warnNumber // 库存警告数量
            // this.$refs.genaral.form.first_image_url =  res.data.goods.goodOriginalImgUrl // 首图网址
          })
      }
  },
  methods: {
     tabIndex (index) {
      this.currentIndex = index
    },
    torecord (id) {
      this.currentIndex = 3
      this.storeManagerId = id
    },
    toLog (id) {
      this.currentIndex = 2
      this.storeManagerId = id
    },
    toRole () {
      this.currentIndex = 1
    },
    initPoleList (data) {
      this._getRoleList(data.page, data.size)
    },
    _getRoleList (page, size) {
      let data = {}
      data.current_page = page
      data.page_size = size
    },
      handleSizeChange(){

      },
      handleCurrentChange(){

      },
    goback(){
      this.$router.go(-1)
    },
    handleClick (tab, event) {
      console.log(typeof this.activeName)
    },
    handleSubmit () {
      this.$refs.genaral.$refs.form.validate((valid, item) => {
        // this._addProduct()
        if (!valid) {
          this.activeName = '0'
          this.$notify.error({
            title: '错误提示：',
            message: item[Object.keys(item)[0]][0].message
          })
        } else {
          this._addProduct()
        }
      })
    },
    _getGoodsProp () {
      // getGoodsProp().then(res => {
      //   this.propList = res.data
      // })
    },
    _addProduct () {
      let data = Object.assign({}, this.addGoodsForm)
      data.genaralForm = this.$refs.genaral.form
      data.information = this.$refs.information.addGoodsForm
      console.log(data)
      let sceneArr = this.$refs.genaral.form.gift
      let sceneIdArr = []
      sceneArr.forEach(item => {
        item.Giftmodel.forEach(data => {
          sceneIdArr.push(data)
        })
      })
      let table = this.$refs.genaral.form.tableData
      let skus = []
      table.forEach(item => {
        skus.push({
          guidancePrice:item.guidancePrice, // 销售价
          warnNumber:item.warn_number, // 预警库存
          specValueId:item.specValueId.split(','), // skuID
          goodsNumber:item.inventory_number, // 库存
          marketPrice:item.tip_price, //市场价
          carriagePrice: item.freight?item.freight:0, //运费
          isSubstituteSales:item.isSubstituteSales, // 是否支持一件代发
          costPrice:item.cost_price, // 一件代发价
          goodsThumbnailImgUrl:item.goodsThumbnailImgUrl, // 上传的图片路径
          sceneIds:sceneIdArr, //管理场景ID
          volumePrices:[
            {
              volumeNumber:parseInt(item.volumeNumber1),
              volumeCost: parseInt(item.volumeCost1),
              volumeCarriage:parseInt(item.volumeCarriage1),
            },
            {
              volumeNumber:parseInt(item.volumeNumber2),
              volumeCost:parseInt(item.volumeCost2) ,
              volumeCarriage: parseInt(item.volumeCarriage2)
            },
          ], //集采批发价设置
        })
      })
      table.forEach(item => {
        skus.forEach(data => {
          if(item.volumeNumber3){
            data.volumePrices.push({
              volumeNumber:parseInt(item.volumeNumber3) ,
              volumeCost:parseInt(item.volumeCost3) ,
              volumeCarriage:parseInt(item.volumeCarriage3) 
            })
          }
          if(item.volumeNumber4){
            data.volumePrices.push({
              volumeNumber:parseInt(item.volumeNumber4) ,
              volumeCost:parseInt(item.volumeCost4) ,
              volumeCarriage:parseInt(item.volumeCarriage4) 
            })
          }
        })
      })
      console.log(data)
      addProduct(data,skus,1).then(res => {
        if(res.code == 200){
          this.$notify({
            title: '成功',
            message: '商品添加成功',
            type: 'success'
          })
          this.$router.push({  name: 'ProductList'}) 
        }
      })
    }
  },
  components: {
    AccountGeneral,
    AccountDesecribe,
    AccountDatalise,
    AccountPicture,
    AccountRecord,
  }
}
</script>

<style lang="scss">
.bigdiv{
  height: 135px;
  background: white;
  display: flex;
  align-items: center;
  .add_img{
    width: 61px;
    height: 61px;
    margin-left: 60px;
  }
  span{
    width:1329px;
    height:39px;
    font-size:14px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(255,91,91,1);
    line-height:24px;
    margin-left: 29px;
  }
}
.search-wrapper1{
    padding: 20px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    display:flex;
    align-items:center;
  }
  .comeBack{
    position:absolute;
    right:50px;
  }
</style>
