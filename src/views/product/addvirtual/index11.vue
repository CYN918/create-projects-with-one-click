<template>
  <div class="margin">
    <div class="mcard">
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <h4 class="title">添加商品</h4>
            <el-button  @click="goback" type="primary" size="small" class="comeBack" >商品列表</el-button>
          </div>
        </div>
      </div>
      </div>
      <el-tabs type="card" v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="通用信息">
          <general ref="genaral"></general>
        </el-tab-pane>
        <el-tab-pane label="详细描述">
          <el-input type="hidden" v-model="addGoodsForm.info"></el-input>
          <quill-editor v-model="addGoodsForm.info" ref="myQuillEditor"></quill-editor>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <el-card shadow="never">
            <el-form :model="addGoodsForm" label-width="260px" size="small">
              <el-form-item prop>
                <span slot="label">
                  <el-tooltip effect="dark" content="请选择商品的所属类型，进而完善此商品的属性" placement="top">
                    <i class="el-icon-question theme-color"></i>
                  </el-tooltip>&nbsp;商品类型：
                </span>
                <el-select class="wh37" placeholder="请选择商品类型" v-model="addGoodsForm.prop_id" filterable>
                  <el-option
                    v-for="item in propList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="商品相册">
          <picture-page ref="picture"></picture-page>
        </el-tab-pane>
        <el-tab-pane label="日志记录">日志记录</el-tab-pane>
      </el-tabs>
      <div style="margin-top: 20px; text-align: center;">
        <el-button type="primary" size="meduim" @click="handleSubmit">确定</el-button>
        <el-button type="primary" size="meduim" >重置</el-button>
      </div>
    
  </div>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import { getGoodsProp } from '@/api/public'
import General from './general'
import PicturePage from './picture'
import { addProduct ,getIdgoods} from '@/api/product/index'
export default {
  name: 'ProductAdd',
  data () {
    return {
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
            // this.$refs.genaral.form.cat_other =  res.data.goods.catIds // 拓展分类
            this.$refs.genaral.form.goods_branch =  res.data.goods.brandId // 商品品牌id
            this.$refs.genaral.form.price =  res.data.goods.marketPrice // 市场销售价
            this.$refs.genaral.form.tip_price =  res.data.goods.guidancePrice // 指导我司销售价
            this.$refs.genaral.form.cost_price =  res.data.goods.costPrice // 一件代发单价（含税价)
            this.$refs.genaral.form.cost_company =  res.data.goods.logisticsCompany // 一件代发快递公司
            this.$refs.genaral.form.cost_price_type =  res.data.goods.logisticsCompany // 是否一件代发	1，是； 0，否
            this.$refs.genaral.form.freight =  res.data.goods.carriagePrice // 是否一件代发	1，是； 0，否
            this.$refs.genaral.form.jd_link =  res.data.goods.jdGoodsUrl // 京东链接
            this.$refs.genaral.form.jd_price =  res.data.goods.jdPrice // 京东价格
            this.$refs.genaral.form.tm_link =  res.data.goods.jdGoodsUrl // 天猫链接
            this.$refs.genaral.form.tm_price =  res.data.goods.jdPrice // 天猫价格
            this.$refs.genaral.form.inventory_number =  res.data.goods.goodsNumber // 库存数量
            this.$refs.genaral.form.warn_number =  res.data.goods.warnNumber // 库存警告数量
            this.$refs.genaral.form.first_image_url =  res.data.goods.goodOriginalImgUrl // 首图网址
          })
      }
  },
  methods: {
    goback(){
      this.$router.go(-1)
    },
    handleClick (tab, event) {
      console.log(typeof this.activeName)
    },
    handleSubmit () {
      this.$refs.genaral.$refs.form.validate((valid, item) => {
        this._addProduct()
        if (!valid) {
          this.activeName = '0'
          this.$notify.error({
            title: '错误提示：',
            message: item[Object.keys(item)[0]][0].message
          })
        } else {
          // this._addProduct()
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
      data.imageList = this.$refs.picture.form
      console.log(data)
      addProduct(data).then(res => {
        if(res.code == 200){
          this.$notify({
            title: '成功',
            message: '商品添加成功',
            type: 'success'
          })
          $router.push({  name: 'ProductList'}) 
        }
      })
    }
  },
  components: {
    General,
    quillEditor,
    PicturePage
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
