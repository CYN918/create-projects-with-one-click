<template>
  <div class="margin">
    <div class="mcard"  style="padding:0">
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="goback" content="商品详情"></el-page-header>
            <!-- <h4 class="title">添加商品</h4>
            <el-button  @click="goback" type="primary" size="small" class="comeBack" >返回</el-button> -->
          </div>
        </div>
      </div>
      </div>
        <div class="margin" style="margin-right:0">
            <div class="msetting-account-wrapper" style="margin-left: -20px;">
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
                  <account-general v-show="currentIndex===0" :valueObj='brandObj' :res="data" ref="genaral"></account-general>
                  <account-desecribe v-show="currentIndex===1" ref="information"></account-desecribe>
                  <account-datalise v-show="currentIndex===2" ref="attribute" :res="data"></account-datalise>
                  <!-- <account-picture v-show="currentIndex===3"  ref="picture"></account-picture> -->
                  <account-record v-show="currentIndex===4" ></account-record>
              </div>
            </div>
        </div>
        <div style="margin-top: 20px; text-align: center;">
          <el-button type="primary"  @click="goback" size="small">返回</el-button>
        </div>
  </div>
</template>

<script>
    import AccountGeneral from './general'
    import AccountDesecribe from './desecribe'
    import AccountDatalise from './datalise'
    import AccountPicture from './picture'
    import AccountRecord from './record'

    import {addProduct, editorProduct, getIdgoods} from '@/api/product/index'

    export default {
  name: 'ProductAdd',
  data () {
    return {
        title_text:'添加商品',
        data:{},
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
        brandObj:{}, //品牌对象
      propList: []
    }
  },
   methods: {
     resert(){
       this.$refs.genaral.$refs.form.resetFields()
       if(this.addGoodsForm.id){
         this.$refs.genaral.form.cat_id =  this.data.data.goods.catId
          this.$refs.genaral.specifications.forEach(item => {
            item.content = []
          })
       }
       this.$refs.genaral.form.tableData = []
        this.$refs.genaral.form.gift.forEach(data => {
          data.Giftmodel = []
        })
        this.$refs.genaral.form.first_image_url = []
        this.$refs.information.addGoodsForm.info = ''
        this.$refs.attribute.form.value = ''
     },
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
      let dataArr =  this.$refs.attribute.dataArr
      let goodsTypeId = this.$refs.attribute.form.value
      let goodsAttributes = {}
      let attrArr = []
      goodsAttributes.goodsTypeId = goodsTypeId
      if(dataArr.length){
        dataArr.forEach(item => {
          attrArr.push({
            attrId: item.attrId,
				    attrValue:item.value
          })
        })
      }
      goodsAttributes.goodsAttributeValues = attrArr
      console.log(goodsAttributes)
      let sceneArr = this.$refs.genaral.form.gift
      let sceneIdArr = []
      sceneArr.forEach(item => {
        item.Giftmodel.forEach(data => {
          sceneIdArr.push(data)
        })
      })
      data.genaralForm.sceneIds = sceneIdArr//管理场景ID
      let table = this.$refs.genaral.form.tableData
      let skus = []
      table.forEach(item => {
        skus.push({
          skuId:item.skuId || '', //skuId
          guidancePrice:item.guidancePrice, // 销售价
          warnNumber:item.warn_number, // 预警库存
          specValueId:item.specValueId.split(','), // skuID
          goodsNumber:item.inventory_number, // 库存
          marketPrice:item.tip_price, //市场价
          carriagePrice: item.freight?item.freight:0, //运费
          isSubstituteSales:item.isSubstituteSales, // 是否支持一件代发
          costPrice:item.cost_price, // 一件代发价
          goodsThumbnailImgUrl:item.goodsThumbnailImgUrl, // 上传的图片路径
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
      if(this.addGoodsForm.id){
        editorProduct(data,skus,1,this.addGoodsForm.id,goodsAttributes).then(res => {
          if(res.code == 200){
            this.$notify({
              title: '成功',
              message: '修改商品成功',
              type: 'success'
            })
            this.$router.push({  name: 'ProductList'})
          }
        })
      }else{
        addProduct(data,skus,1,goodsAttributes).then(res => {
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
    }
  },
  created () {
    if(this.$route.query.goodsId){
      this.title_text = '编辑商品'
      this.addGoodsForm.id = this.$route.query.goodsId
      getIdgoods(this.addGoodsForm.id).then(res => {
        this.$refs.information.addGoodsForm.info = res.data.goods.goodsDesc  // 商品详情
        this.data = res
      })
    }
  },
  mounted (){

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

<style lang="scss" scoped>
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
