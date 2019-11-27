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
                  <account-general v-show="currentIndex===0" :valueObj='brandObj' ref="genaral"></account-general>
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

import { addProduct ,getIdgoods , editorProduct} from '@/api/product/index'
import { setTimeout } from 'timers';
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
        brandObj:{}, //品牌对象
      propList: []
    }
  },
  mounted () {
    // this._getGoodsProp()
  },
  created (){
    if(this.$route.query.id){
          this.addGoodsForm.id = this.$route.query.id
          getIdgoods(this.addGoodsForm.id).then(res => {
            // console.log(JSON.stringify(res.data.goods.goodsNameStyle.split('+')[0]) )
            let color = res.data.goods.goodsNameStyle.split('+')[0]
            let style = res.data.goods.goodsNameStyle.split('+')[1]
            this.$refs.genaral.form.goods_name =  res.data.goods.goodsName // 商品名称
            this.$refs.genaral.form.goods_name_color =  color // 商品名称颜色
            this.$refs.genaral.form.goods_name_style =  style // 商品名称字体样式
            this.$refs.genaral.form.dis = true // 控制树形的选择
            this.$refs.genaral.form.goods_sn =  res.data.goods.goodsSn // 商品货号
            this.$refs.genaral.form.goods_branch = res.data.goods.brandId // 商品品牌
            this.brandObj.brandId = res.data.goods.brandId
            this.brandObj.brandName = res.data.goods.brandName
            this.$refs.genaral.form.model_number =  res.data.goods.modelNumber // 型号
            this.$refs.genaral.form.goods_weight =  res.data.goods.goodsWeight // 商品重量
            this.$refs.genaral.form.cat_id =  res.data.goods.catId // 商品分类
            this.$refs.genaral.form.tax =  res.data.goods.taxRate // 税率
            this.$refs.genaral.form.supplier =  res.data.goods.supplierId // 供应商ID
            this.$refs.genaral.form.domains[0].ppt_price =  res.data.goods.pptPrice // PPT价格
            this.$refs.genaral.form.domains[0].discount_price =  res.data.goods.preferentialPrice // 最低价
            this.$refs.genaral.form.domains[0].guidancePrice =  res.data.goods.minimumPrice // 最低价
            this.$refs.genaral.form.domains[0].jd_link =  res.data.goods.jdGoodsUrl // 京东链接
            this.$refs.genaral.form.domains[0].jd_price =  res.data.goods.jdPrice // 京东价格
            this.$refs.genaral.form.domains[0].tmailGoodsUrl =  res.data.goods.tm_link // 天猫链接
            this.$refs.genaral.form.domains[0].tmallPrice =  res.data.goods.tm_price // 天猫价格
            res.data.gallery.galleryes.forEach(item => {     // 相册
              this.$refs.genaral.form.first_image_url.push({
                name:item.imgId,
                url:item.imgUrl
              })
            })
            let arr =[]
            res.data.goods.skus.forEach(item => {
              var count = 0;
              let str = '';
              let idstr = ''

              item.specList.forEach((dataValue,indexnum) => {
                if(indexnum < item.specList.length-1){
                  str += dataValue.specValue+'-'
                  idstr += dataValue.specValueId+','
                }else{
                  str += dataValue.specValue
                  idstr += dataValue.specValueId
                }
                let valueArr = []
                
                arr.push({
                  options:[],
                  specName:dataValue.specName,
                  specId:dataValue.specId,
                  show:false,
                  content:valueArr,
                  tent:'',
                  val:'', //选中后对应的id
                  state:true, // 判断是否第一次选中
                })

                valueArr.push({
                  specValue:dataValue.specValue,
                  specValueId:dataValue.specValueId,
                })
              })

              this.$refs.genaral.form.tableData.push({
                specValue:str,
                specValueId:idstr,
                tip_price:item.marketPrice, //市场价
                cost_price:item.costPrice, //一件代发价
                freight:'', //运费
                skuId:item.skuId, //skuId
                isSubstituteSales:item.isSubstituteSales, //是否支持一件代发
                goodsThumbnailImgUrl:item.goodsThumbnailImgUrl, // 上传的图片路径
                guidancePrice:item.guidancePrice,//指导销售价
                inventory_number:item.goodsNumber,//库存
                warn_number:item.warnNumber,//库存预警
                volumeNumber1:item.volumePrices[0].volumeNumber,//起订量1
                volumeCost1:item.volumePrices[0].volumeCost,//集采批发价1
                volumeCarriage1:item.volumePrices[0].volumeCarriage, //运费1
                volumeNumber2:item.volumePrices[1].volumeNumber,//起订量2
                volumeCost2:item.volumePrices[1].volumeCost,//集采批发价2
                volumeCarriage2:item.volumePrices[1].volumeCarriage, //运费2
                state:1, // 控制运费一键代发
              })
              item.volumePrices.forEach(res => {
                count++
              })
              if(count == 2){
                this.$refs.genaral.form.tableData.forEach(itemtwo => {
                  itemtwo.volumeNumber3 = ''
                  itemtwo.volumeCost3 = ''
                  itemtwo.volumeCarriage3 = ''
                  itemtwo.volumeNumber4 = ''
                  itemtwo.volumeCost4 = ''
                  itemtwo.volumeCarriage4 = ''
                })
              }else if(count == 3){
                this.$refs.genaral.form.tableData.forEach(itemtwo => {
                  itemtwo.volumeNumber3 = item.volumePrices[2].volumeNumber
                  itemtwo.volumeCost3 = item.volumePrices[2].volumeCost
                  itemtwo.volumeCarriage3 = item.volumePrices[2].volumeCarriage
                  itemtwo.volumeNumber4 = ''
                  itemtwo.volumeCost4 = ''
                  itemtwo.volumeCarriage4 = ''
                })
              }else if(count == 4){
                this.$refs.genaral.form.tableData.forEach(itemtwo => {
                  itemtwo.volumeNumber3 = item.volumePrices[2].volumeNumber
                  itemtwo.volumeCost3 = item.volumePrices[2].volumeCost
                  itemtwo.volumeCarriage3 = item.volumePrices[2].volumeCarriage
                  itemtwo.volumeNumber4 = item.volumePrices[3].volumeNumber
                  itemtwo.volumeCost4 = item.volumePrices[3].volumeCost
                  itemtwo.volumeCarriage4 = item.volumePrices[3].volumeCarriage
                })
              }

              item.specList.forEach((dataValue,indexnum) => {
                if(dataValue.specName == '颜色'){
                  item.specList.splice(indexnum,1)
                  item.specList.unshift(dataValue)
                }
              })
              
              //先加入content中
              for(var k=0;k<arr.length;k++){
                for(var j=k+1;j<arr.length;j++){
                    if(arr[k].specId==arr[j].specId){ 
                    //如果第一个等于第二个，splice方法删除第二个
                    arr[k].content.forEach(item => {
                      arr[j].content.forEach(data => {
                        if(item.specValueId != data.specValueId){
                          arr[k].content.push(data)
                        }
                      })
                    })
                      // arr.splice(j,1);
                      // j--;
                    }
                }
                }
                // 去除相同的数据
                for(var h=0;h<arr.length;h++){
                  for(var l=h+1;l<arr.length;l++){
                      if(arr[h].specId==arr[l].specId){ 
                      //如果第一个等于第二个，splice方法删除第二个
                        arr.splice(l,1);
                        l--;
                      }
                  }
                }
                // 去除content中相同的数据

                for(var u=0;u<arr.length;u++){
                  let arrArr = arr[u].content
                  for(var p=0;p<arrArr.length;p++){
                    for(var o=p+1;o<arrArr.length;o++){
                        if(arrArr[p].specValueId==arrArr[o].specValueId){ 
                        //如果第一个等于第二个，splice方法删除第二个
                          arrArr.splice(o,1);
                          o--;
                        }
                    }
                  }
                }
              this.$refs.genaral.form.arrbig = arr
          

              
            })
            var that =this
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
      data.genaralForm.sceneIds = sceneIdArr//管理场景ID
      let table = this.$refs.genaral.form.tableData
      let skus = []
      table.forEach(item => {
        skus.push({
          skuId:item.skuId || '', //skuId
          guidancePrice:item.guidancePrice, // 销售价
          warnNumber:item.warn_number, // 预警库存
          specValueId:(typeof item.specValueId === 'object')?item.specValueId:item.specValueId.split(','), // skuID
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
            {
              volumeNumber:parseInt(item.volumeNumber3)?parseInt(item.volumeNumber3):"",
              volumeCost:parseInt(item.volumeCost3)?parseInt(item.volumeCost3):'' ,
              volumeCarriage: parseInt(item.volumeCarriage3)?parseInt(item.volumeCarriage3):''
            },
            {
              volumeNumber:parseInt(item.volumeNumber4)?parseInt(item.volumeNumber4):'',
              volumeCost:parseInt(item.volumeCost4)?parseInt(item.volumeCost4):'',
              volumeCarriage: parseInt(item.volumeCarriage4)?parseInt(item.volumeCarriage4):''
            },
          ], //集采批发价设置
        })
      })
      if(this.addGoodsForm.id){
        editorProduct(data,skus,1,this.addGoodsForm.id).then(res => {
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
