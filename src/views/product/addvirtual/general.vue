<template>
  <div class="margin addshop">
    <el-form :model="form" ref="form" :rules="rules" label-width="150px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <el-form-item label="商品名称：" prop="goods_name">
              <el-input
                v-model="form.goods_name"
                placeholder="命名方式：品牌+名称+型号+规格"
                class="wh37 inline"
              ></el-input>
              <span>
              <el-color-picker v-model="form.goods_name_color" class="inline ml10"></el-color-picker>
              </span>
              <span label-width="0" prop="goods_name_style">
              <el-select v-model="form.goods_name_style" class="ml10 inline">
                <el-option label="字体样式" value></el-option>
                <el-option label="加粗" value="strong"></el-option>
                <el-option label="斜体" value="em"></el-option>
                <el-option label="下划线" value="u"></el-option>
                <el-option label="删除线" value="strike"></el-option>
              </el-select>
              </span>
            </el-form-item>
        <el-form-item prop="goods_sn">
          <span slot="label">
            <el-tooltip
              class="item"
              effect="dark"
              content="如果您不输入商品货号，系统将自动生成一个唯一的货号。"
              placement="top"
            >
              <i class="el-icon-question theme-color"></i>
            </el-tooltip>&nbsp;商品货号：
          </span>
          <el-input v-model="form.goods_sn" class="wh37" placeholder="自动生成货号"></el-input>
          <span class="tishi">如果您不输入商品货号，系统将自动生成一个唯一的货号.</span>
        </el-form-item>
        <el-form-item label="商品品牌：" prop="goods_branch">
          <el-select v-model="form.goods_branch" filterable placeholder="请选择商品品牌">
            <el-option
              v-for="item in branchList"
              :key="item.brandId"
              :label="item.brandName"
              :value="item.brandId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="model_number" label="型号：">
          <el-input v-model="form.model_number" class="wh37"></el-input>
        </el-form-item>
        <el-form-item prop="tax" label="税率：">
          <el-select v-model="form.tax">
            <el-option label="0%" value="0"></el-option>
            <el-option label="6%" value="6"></el-option>
            <el-option label="10%" value="10"></el-option>
            <el-option label="13%" value="13"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="goods_weight" label="商品重量：">
          <el-input v-model="form.goods_weight" class="wh37">
            <span slot="append">千克</span>
          </el-input>
        </el-form-item>
        <el-form-item prop="supplier" label="供应商：">
          <el-select v-model="form.supplier" placeholder="请选择">
            <el-option
              v-for="item in supplierArr"
              :key="item.supplierId"
              :label="item.supplierName"
              :value="item.supplierId">
            </el-option>
          </el-select>
          <span class="tishi">（自动调用供应商）</span>
        </el-form-item>
      </div>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter addImg">
          <div class="search-wrapper">
            <el-form-item label="商品分类：" prop="cat_id">
              <div  class="addbcd">
                <treeselect
                  style="width:300px"
                  :options="categoryList"
                  placeholder='请选择商品分类'
                  v-model="form.cat_id"
                  :disable-branch-nodes="true"
                  :clearable='false'
                  @input="category"
                  />
                  <span class="tishi">请选择三级分类</span>
              </div>
              </el-form-item>
          <el-form-item prop="specificat" label="商品规格：">
               <div v-for="(item,index) in specifications" :key="item.specId">
                 {{item.specName}}
                <div class="interbank">
                    <div v-for="(itemtent,index) in item.content" :key="index">
                      <span class="model" >{{itemtent.specValue}}
                        <span class="delete-specif" @click="deleitem(itemtent,item)">
                          <span class="error">×</span>
                        </span>
                      </span>
                    </div>
                    <el-button  class="button-new-tag" size="small" type="primary" v-if="!item.show"  @click="showInput(item,index)">添加</el-button>
                    <el-select v-if="item.show" v-model='item.tent' @change="specificationsfunc($event,item)">
                        <el-option
                            v-for="item1 in item.options"
                            :key="item1.specValueId"
                            :label="item1.specValue"
                            :value="item1.specValueId"
                            :disabled="item1.disabled"
                            >
                        </el-option>
                    </el-select> 
                    <el-button  class="button-new-tag" size="small" type="primary" v-if="item.show" @click="choice(item)">确定</el-button>
                    <el-button  class="button-new-tag" size="small" type="primary" v-if="item.show" @click='cancal(item)'>取消</el-button>
                  </div>
              </div>
          </el-form-item>
          <el-form-item prop="pricetable" label="价格列表：" class="reference" >  
            <el-table   :data="form.tableData"  border style="width: 100%" stripe class="tableBox" >
              <el-table-column  prop="color"  label="颜色" align="center"  width="80">
                <template slot-scope="scope">
                  {{scope.row.color?scope.row.color:scope.row.specValue | fordata}}
                </template>
              </el-table-column>
              <el-table-column  prop="specValue"  label="图片" align="center" width="80">
                <template slot-scope="scope">
                  <el-upload
                    class="avatar-uploader"
                    :action="action"
                    :show-file-list="false"
                    :on-success="(response, file)=>handleAvatarSuccess(response, file , scope.row)"
                    >
                    <img v-if="scope.row.goodsThumbnailImgUrl" :src="scope.row.goodsThumbnailImgUrl" class="avatar1">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </template>
              </el-table-column>
              <el-table-column  prop="specValue"  label="商品规格" align="center" width="200"></el-table-column>
              <el-table-column  prop="cost_price"  label="一件代发价" align="center" width="80">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableData.'+scope.$index+'.cost_price'" :rules="{ required: true, message: '必填', trigger: 'blur' }" v-if='scope.row.state == 1 || scope.row.state == 2'>
                    <el-input v-model="scope.row.cost_price" placeholder="请输入"></el-input>
                  </el-form-item>
                  <div v-if='scope.row.state == 3'> - </div>
                </template>
              </el-table-column>
              <el-table-column  prop="name"  align="center" width="110">
                <template slot="header" slot-scope="scope">
                  <el-dropdown  trigger="click">
                    <span class="el-dropdown-link">
                      {{tilte}} 
                      <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                      <img src="../../../common/images/sanjiao.png" alt="" style="width:10px;height:6px;">
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item @click.native='freightFunc(1)'>含税含运费</el-dropdown-item>
                      <el-dropdown-item @click.native='freightFunc(2)'>含税不含运费</el-dropdown-item>
                      <el-dropdown-item @click.native='freightFunc(3)'>不支持一件代发</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
                <template slot-scope="scope">
                  <div v-if="scope.row.state == 1">含税含运费</div>
                  <div v-if="scope.row.state == 2"> 
                    <el-form-item :prop="'tableData.'+scope.$index+'.freight'" :rules="{ required: true, message: '必填', trigger: 'blur' }">
                      <el-input v-model="scope.row.freight" placeholder="请输入"></el-input>
                    </el-form-item>
                  </div>
                  <div v-if="scope.row.state == 3"> - </div>
                </template>
            </el-table-column>
              <el-table-column  prop="tip_price"  label="市场价" align="center" width="80">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableData.'+scope.$index+'.tip_price'" :rules="{ required: true, message: '必填', trigger: 'blur' }">
                    <el-input v-model="scope.row.tip_price" placeholder="请输入"></el-input>
                  </el-form-item>
               </template>
              </el-table-column>
              <el-table-column  prop="name"  label="指导销售价" align="center" width="80">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableData.'+scope.$index+'.guidancePrice'" :rules="{ required: true, message: '必填', trigger: 'blur' }">
                    <el-input  placeholder="请输入" v-model="scope.row.guidancePrice"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column  prop="inventory_number"  label="库存" align="center" width="80">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableData.'+scope.$index+'.inventory_number'" :rules="{ required: true, message: '必填', trigger: 'blur' }">
                    <el-input v-model="scope.row.inventory_number" placeholder="请输入"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column  prop="warn_number"  label="库存预警" align="center" width="80">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableData.'+scope.$index+'.warn_number'" :rules="{ required: true, message: '必填', trigger: 'blur' }">
                    <el-input v-model="scope.row.warn_number" placeholder="请输入"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column  prop="volumeNumber1"  label="起订量1" align="center" width="80">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableData.'+scope.$index+'.volumeNumber1'" :rules="{ required: true, message: '必填', trigger: 'blur' }">
                    <el-input v-model="scope.row.volumeNumber1" placeholder="请输入"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column  prop="volumeCost1"  label="集采批发价1" align="center" width="80">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableData.'+scope.$index+'.volumeCost1'" :rules="{ required: true, message: '必填', trigger: 'blur' }">
                    <el-input v-model="scope.row.volumeCost1" placeholder="请输入"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column  prop="volumeCarriage1"  label="运费1" align="center" width="80">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableData.'+scope.$index+'.volumeCarriage1'" :rules="{ required: true, message: '必填', trigger: 'blur' }">
                    <el-input v-model="scope.row.volumeCarriage1" placeholder="请输入"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column  prop="volumeNumber2"  label="起订量2" align="center" width="80">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableData.'+scope.$index+'.volumeNumber2'" :rules="{ required: true, message: '必填', trigger: 'blur' }">
                    <el-input v-model="scope.row.volumeNumber2" placeholder="请输入"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column  prop="volumeCost2"  label="集采批发价2" align="center" width="80">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableData.'+scope.$index+'.volumeCost2'" :rules="{ required: true, message: '必填', trigger: 'blur' }">
                    <el-input v-model="scope.row.volumeCost2" placeholder="请输入"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column  prop="volumeCarriage2"  label="运费2" align="center" width="80">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableData.'+scope.$index+'.volumeCarriage2'" :rules="{ required: true, message: '必填', trigger: 'blur' }">
                    <el-input v-model="scope.row.volumeCarriage2" placeholder="请输入"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column  prop="volumeNumber3"  label="起订量3" align="center" width="80">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.volumeNumber3" placeholder="请输入"></el-input>
                </template>
              </el-table-column>
              <el-table-column  prop="volumeCost3"  label="集采批发价3" align="center" width="80">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.volumeCost3" placeholder="请输入"></el-input>
                </template>
              </el-table-column>
              <el-table-column  prop="volumeCarriage3"  label="运费3" align="center" width="80">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableData.'+scope.$index+'.volumeCarriage3'" >
                    <el-input v-model="scope.row.volumeCarriage3" placeholder="请输入"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column  prop="volumeNumber4"  label="起订量4" align="center" width="80">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.volumeNumber4" placeholder="请输入"></el-input>
                </template>
              </el-table-column>
              <el-table-column  prop="volumeCost4"  label="集采批发价4" align="center" width="80">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.volumeCost4" placeholder="请输入"></el-input>
                </template>
              </el-table-column>
              <el-table-column  prop="volumeCarriage4"  label="运费4" align="center" width="80">
                <template slot-scope="scope">
                  <el-form-item :prop="'tableData.'+scope.$index+'.volumeCarriage4'" >
                    <el-input v-model="scope.row.volumeCarriage4" placeholder="请输入"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item prop="offer" label="参考报价："  class="reference"> 
             <!-- <el-form :model="fromData" ref="from"> -->
                <el-table :data="form.domains" border>
                  <el-table-column label="对外PPT价格" align="center">
                    <template slot-scope="scope">
                      <el-form-item :prop="'domains.'+scope.$index+'.ppt_price'" :rules="{ required: true, message: '请填写对外PPT价格', trigger: 'blur' }">
                        <el-input v-model="scope.row.ppt_price" placeholder="请输入对外PPT价格"></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column  prop="ppt"  label="贵公司对外最低报价" align="center">
                    <template slot-scope="scope">
                      <el-form-item :prop="'domains.'+scope.$index+'.discount_price'" :rules="{ required: true, message: '请填写贵公司对外最低报价', trigger: 'blur' }">
                        <el-input v-model="scope.row.discount_price"  placeholder="请输入贵公司对外最低报价"></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <!-- domains:[{ppt_price:'',discount_price:'',guidancePrice:''}], -->
                  <el-table-column  prop="ppt"  label="给我公司项目最低价" align="center">
                    <template slot-scope="scope">
                      <el-form-item :prop="'domains.'+scope.$index+'.guidancePrice'" :rules="{ required: true, message: '请填写给我公司项目最低价', trigger: 'blur' }">
                        <el-input v-model="scope.row.guidancePrice"  placeholder="请输入给我公司项目最低价"></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column  prop="ppt"  label="京东链接" align="center" >
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.jd_link" placeholder="请输入京东链接" @blur="jd_method"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column  prop="ppt"  label="京东价" align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.jd_price" disabled></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column  prop="ppt"  label="天猫/淘宝链接" align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.tm_link" placeholder="请输入天猫/淘宝链接" @blur="tm_method"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column  prop="ppt"  label="天猫/淘宝价" align="center">
                    <template slot-scope="scope">
                      <el-input v-model="scope.row.tm_price" disabled></el-input>
                    </template>
                  </el-table-column>
                </el-table>
          </el-form-item> 
        </div>
      </div>
    </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
        <el-form-item prop="scenario" label="定制场景："> 
          <el-form-item :prop="'offer'+index" v-for="(item,index) in form.gift" :key='index'>  
            <el-row style="display:flex">
                <div class="scenario">
                  <div>{{item.typeName}}：</div>
                  <div class="number">{{index == form.gift.length-1?'(任选一个场景)':'(任选两个场景)'}}</div>
                </div>
              <el-col :span="24" class="bumber_col">
                <el-checkbox-group 
                  v-model="item.Giftmodel"
                  :max="index == form.gift.length-1?1:2"> 
                  <el-checkbox v-for="data in item.children" :label="data.sceneId" :key="data.sceneId">{{data.sceneName}}</el-checkbox>
                </el-checkbox-group>
              </el-col>
            </el-row>
          </el-form-item>
        </el-form-item>
        <el-form-item prop="first_image_id" label="上传商品图片：" class="upload-wrapper">
          <el-input  v-model="form.first_image_link" class="wh37" placeholder="商品图片URL" style="margin-bottom:15px"></el-input>
          <el-upload
            :action="action"
            list-type="picture-card"
            :on-success="handleImageSuccess"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="form.first_image_url" alt="">
          </el-dialog>
        </el-form-item>
        </div>
      </div>
    </div>
    </el-form>
  </div>
</template>

<script>
import { imageUploadUrl } from '@/api/config'
import { getCategory, getGoodsBranch, addBranch } from '@/api/public'
import { getInformation} from '@/api/supplier/index'
import { getScene} from '@/api/product/index'
import { getTreecatagory , getBrand ,getUrlgoods , getIdgoodspec, getSpecification} from '@/api/product/index'
// import the component
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  data () {
    var validatefreight = (rule,value,callback) =>{
      if(value === '' && this.company_freight == true){
        callback(new Error('请输入运费'))
      } else {
        callback()
      }
    }
    var validatecost_company = (rule,value,callback) =>{
      if(value === '' && this.company_freight == true){
        callback(new Error('请输入一件代发快递公司'))
      } else {
        callback()
      }
    }
    var validate0 = (rule,value,callback) =>{
      if(this.form.volume[0].volumeCarriage == '' && this.form.volume[0].type==2){
        callback(new Error('请输入运费'))
      } else {
        callback()
      }
    }
    var validate1 = (rule,value,callback) =>{
      if(this.form.volume[1].volumeCarriage == '' && this.form.volume[1].type==2){
        callback(new Error('请输入运费'))
      } else {
        callback()
      }
    }
    var validate2 = (rule,value,callback) =>{
      if(this.form.volume[2].volumeCarriage == '' && this.form.volume[2].type==2){
        callback(new Error('请输入运费'))
      } else {
        callback()
      }
    }
    var validate3 = (rule,value,callback) =>{
      if(this.form.volume[3].volumeCarriage == '' && this.form.volume[3].type==2){
        callback(new Error('请输入运费'))
      } else {
        callback()
      }
    }
    var scenario = (rule,value,callback) =>{
        callback()
    }
    var offer0 = (rule,value,callback) =>{
      if(this.form.gift[0].Giftmodel.length == 2){
        callback()
      }else{
        callback(new Error('请选择两个送礼场景'))
      }
    }
    var offer1 = (rule,value,callback) =>{
      if(this.form.gift[1].Giftmodel.length == 2){
        callback()
      }else{
        callback(new Error('请选择两个送礼场景'))
      }
    }
    var offer2 = (rule,value,callback) =>{
      if(this.form.gift[2].Giftmodel.length == 2){
        callback()
      }else{
        callback(new Error('请选择两个送礼场景'))
      }
    }
    var offer3 = (rule,value,callback) =>{
      if(this.form.gift[3].Giftmodel.length == 1){
        callback()
      }else{
        callback(new Error('请选择一个送礼场景'))
      }
    }
    var pricetable = (rule,value,callback) =>{
        callback()
    }
    var shop = (rule,value,callback) =>{
      callback()
    }
    
    return {
      colorshow:false, //判断选中的是否为颜色
      supplierArr:[], //供应商档案的数组
      checked:'',
      tilte:'含税含运费',
      num:1, //操作类型
      shopid:'190148733470908441',//场景id 固定
      specValue:[
        {
          specValueId:''
        },
        {
          specValueId:''
        },
        {
          specValueId:''
        },
      ],
       specifications:[
            ],
      value: '',
      action: '',
      company_freight:false, //控制运费的显示隐藏
      form: {
        gift:[], // 请求的礼品数据
        domains:[
          {
          ppt_price:'',
          discount_price:'',
          guidancePrice:'',
          jd_link: '', // 京东链接
          jd_price: '0', // 京东价格
          tm_link: '', // 天猫链接
          tm_price: '0', // 天猫价格
          }],
          tableData: [],
        tableArr:[{
          date: '',
          name: '',
          phone: '',
          address: ''
        }],
        goods_name: '', // 商品名称
        goods_name_color: '#333', // 商品名称颜色
        goods_name_style: '', // 商品名称字体样式
        goods_sn: '', // 商品货号
        model_number: '', // 型号
        goods_weight: '', // 商品重量
        supplier:'', // 供应商
        cat_id: null, // 商品分类
        specifications:'', //商品规格数组
        specificat:'', //商品规格
        tax: '13', // 税率 0, 6, 10, 13
        cat_other: [], // 拓展分类: 数组形式如： [['141434'],['423432', '42423'],['42432', '424324', '424324324']]
        goods_branch: '', // 商品品牌id
        price: '', // 市场销售价
        tip_price: '', // 指导我司销售价
        cost_price: '', // 一件代发单价（含税价)
        cost_price_type: '1', // '1' 含税费含运费, '2' 含税费不含运费
        cost_company: '', // 一件代发快递公司
        freight:'', //运费
        jd_link: '', // 京东链接
        jd_price: '0', // 京东价格
        tm_link: '', // 天猫链接
        tm_price: '0', // 天猫价格
        id:'', //商品id
        inventory_number: '', // 库存数量
        warn_number: '', // 库存警告数量
        first_image_url: [], // 首图网址
        first_image_urlsmall: '', //商品缩略图
        first_image_id: '', // 首图id
        first_image_link: '', // 首图外部链接网址
        first_image_smalllink: '' // 首图外部链接网址
      },
      rules: {
        goods_name: [{ required: true, message: '命名方式：品牌+名称+型号+规格', trigger: 'blur' }],
        model_number: [{ required: true, message: '请输入型号', trigger: 'blur' }],
        supplier: [{ required: true, message: '选择供应商', trigger: 'change' }],
        specificat: [{ required: true, validator: shop, trigger: 'change' }],
        goods_weight: [{ required: true, message: '请输入商品重量', trigger: 'blur' }],
        specValue:[{ required: true, message: '请选择商品规格', trigger: 'blur' }],
        cat_id: [{ required: true, message: '请选择商品分类', trigger: 'change' }],
        goods_branch: [{ required: true, message: '请选择商品品牌', trigger: 'change' }],
        price: [{ required: true, message: '请填写市场销售价', trigger: 'blur' }],
        cost_price: [{ required: true, message: '请填写一件代发价格', trigger: 'blur' }],
        tax: [{ required: true, message: '请选择税率', trigger: 'change' }],
        freight:[{ required: true, validator: validatefreight,  trigger: 'blur' }],
        cost_company:[{ required: true, validator: validatecost_company,  trigger: 'blur' }],
        scenario:[{ required: true,validator: scenario  }], //场景定制
        offer0:[{ type: 'array', required: true,validator: offer0, trigger: 'change' }], //选择场景1
        offer1:[{ type: 'array', required: true,validator: offer1, trigger: 'change' }], //选择场景2
        offer2:[{ type: 'array', required: true,validator: offer2, trigger: 'change' }], //选择场景3
        offer3:[{ type: 'array', required: true,validator: offer3, trigger: 'change' }], //选择场景4
        pricetable:[{ required: true,validator: pricetable  }], //参考报价
        volume0_value:[{ required: true, validator: validate0,  trigger: 'blur' }],
        volume1_value:[{ required: true, validator: validate1,  trigger: 'blur' }],
        volume2_value:[{ required: true, validator: validate2,  trigger: 'blur' }],
        volume3_value:[{ required: true, validator: validate3,  trigger: 'blur' }],
      },
      categoryList: [], // 分类
      otherCat: [0],
      branchList: [],
      AddBranchFlag: false,
      addBranchName: '',
      val:'', //规格下拉数值
    }
  },
  created () {
    this._getCategory()
    this._getGoodsBranch()
    this._getCatagory()
    this._getBrand()
    this._getInformation() //拿取供应商
    this.action = this.baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile?'
    this._getScene()
  },
  filters:{
    //处理文字
      fordata(val){
        return val.substring(0,2) 
      },
  },
  methods: {
    freightFunc(val){
      this.form.tableData.forEach(item => {
        item.state = val
      })
      if(val == 1){
        this.tilte='含税含运费'
      }else if(val ==2 ){
        this.tilte='含税不含运费'
      }else{
        this.tilte='不支持一件代发'
      }
      this.num = val
    },
    _getScene(){
      getScene().then(res => {
        res.data.forEach(item => {
          item.Giftmodel = []
          this.form.gift.push(item)
        })
      })
    },
    //规格删除
    deleitem(val,data){
      let num;
      data.content.forEach((item,index) => {
        if(val.specValueId == item.specValueId){
          num = index
        }
      })
      data.content.splice(num,1)
      this.addSpecification()
      if(data.specName == '颜色' && data.content.length ==0){
        this.form.tableData = []
        this.specifications.forEach(item => {
          item.content = []
        })
      }
    },
    //规格下拉框选择
    specificationsfunc(val,data){
      data.val = val
    },
    //下拉点击取消
    cancal(data){
      data.show = false
    },
    _getInformation(){
      getInformation().then(res => {
        this.supplierArr = res.data.list
      })
    },
    //下拉点击确定
    choice(data){
      let obj = {};
        if(data.specName == '颜色'){
          this.colorshow = true
        }
        if(this.colorshow){
          this.specificat =''
          if(data.val != ''){
            obj = data.options.find((item)=>{
              return item.specValueId === data.val;//筛选出匹配数据
            });
            data.val = '';
            data.tent = '';
            data.content.push(obj)
            data.state = false
            let arrBig = data.content
            if(data.content.length >= 2){
              for(var k=0;k<arrBig.length;k++){
                for(var j=k+1;j<arrBig.length;j++)
                    if(arrBig[k].specValueId==arrBig[j].specValueId){ 
                    //如果第一个等于第二个，splice方法删除第二个
                    arrBig.splice(j,1);
                    j--;
                    }
                }
            data.content = arrBig
            }
            data.show = false 
            this.addSpecification()
          }
        }else{
          this.$notify({
              title: '提示',
              message: '请先选择颜色',
              type: 'warning'
            });
        }
        
    },
    //标签移除
        handleClose(tag,data) {
            data.splice(data.indexOf(tag), 1)
            this.addSpecification()
        },
        //添加显示下拉框
        showInput(data) {
          getSpecification(data.specId).then(res => {
            data.options = res.data
            data.show = true
          })
            // data.inputVisible = true
        },
        handleInputConfirm(val,data) {
            data.dynamicTags.push(val)
            data.inputVisible = false
            data.value = ''
            this.addSpecification()
        },
        cancel(data){
            data.inputVisible = false;
        },
        //点击分类带出对应的商品规格
        category(val){
          this.specifications = []
          getIdgoodspec(val).then(res => {
            res.data.forEach((item,index) =>{
              if(item.specName == '颜色'){
                res.data.splice(index,1)
                res.data.unshift(item)
              }
            })
            res.data.forEach((item,index) => {
              console.log(res.data)
              this.specifications.push({
                options:[],
                specName:item.specName,
                specId:item.specId,
                show:false,
                content:[],
                tent:'',
                val:'', //选中后对应的id
                state:true, // 判断是否第一次选中
              }) 
            })
          })
        },
        //添加规格
        addSpecification(){
              let arr = this.specifications
              let newArr = []
              arr.forEach(item => {
                if(item.content.length){
                  newArr.push(item.content)
                }
              })
              if(newArr.length>=2){
                this.calcArr(newArr)
                this.form.tableData = newArr[0]
              }else{
                this.form.tableData = []
                newArr[0].forEach(item => {
                  this.form.tableData.push({
                    specValue:item.specValue,
                    specValueId:item.specValueId,
                    cost_price:'', //一件代发价
                    freight:'', //运费
                    isSubstituteSales:1, //是否支持一件代发
                    goodsThumbnailImgUrl:'', // 上传的图片路径
                    guidancePrice:'',//指导销售价
                    inventory_number:'',//库存
                    warn_number:'',//库存预警
                    volumeNumber1:'',//起订量1
                    volumeCost1:'',//集采批发价1
                    volumeCarriage1:'', //运费1
                    volumeNumber2:'',//起订量2
                    volumeCost2:'',//集采批发价2
                    volumeCarriage2:'', //运费2
                    volumeNumber3:'',//起订量3
                    volumeCost3:'',//集采批发价3
                    volumeCarriage3:'', //运费3
                    volumeNumber4:'',//起订量4
                    volumeCost4:'',//集采批发价4
                    volumeCarriage4:'', //运费4
                    state:this.num, // 控制运费一键代发
                  })
                })
              }
        },
        //递归数组拼接
        calcArr(arr) {
        let arr1 = arr.shift()
        let arr2 = arr.shift()
        let arr3 = []
          console.log(arr1,arr2,arr)
        for(let i = 0; i < arr1.length; i++) {
          for(let j = 0; j <arr2.length; j++) {
            arr3.push({
              specValue:arr1[i].specValue+'-'+arr2[j].specValue,
              specValueId:arr1[i].specValueId+','+arr2[j].specValueId,
              color:arr1[i].specValue,
              id:arr1[i].specValueId,
              cost_price:'', //一件代发价
              freight:'', //运费
              isSubstituteSales:1, //是否支持一件代发
              goodsThumbnailImgUrl:'', // 上传的图片路径
              guidancePrice:'',//指导销售价
              inventory_number:'',//库存
              warn_number:'',//库存预警
              volumeNumber1:'',//起订量1
              volumeCost1:'',//集采批发价1
              volumeCarriage1:'', //运费1
              volumeNumber2:'',//起订量2
              volumeCost2:'',//集采批发价2
              volumeCarriage2:'', //运费2
              volumeNumber3:'',//起订量3
              volumeCost3:'',//集采批发价3
              volumeCarriage3:'', //运费3
              volumeNumber4:'',//起订量4
              volumeCost4:'',//集采批发价4
              volumeCarriage4:'', //运费4
              state:this.num, // 控制运费一键代发
            })
          }
        } 
        arr.unshift(arr3)
        if(arr.length >= 2) {
          this.calcArr(arr)
        }
        console.log(arr)
        return arr
      },
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (columnIndex === 0) {
          if (rowIndex % this.segmentation === 0) {
            return {
              rowspan: this.segmentation,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
        },
    //获取京东价格
    jd_method(){
      if(this.form.domains[0].jd_link != ''){
        getUrlgoods(this.form.domains[0].jd_link,1).then(res => {
          if(res.code == 200){
          }
      })
      }
    },
    //获取天猫价格
    tm_method(){
      if(this.form.domains[0].tm_link){
        getUrlgoods(this.form.domains[0].tm_link,2).then(res => {
          if(res.code == 200){
          }
        })
      }
    },
    //一件代发单价下拉框选择 控制运费的显示隐藏
    unitprice(val){
      if(val != 0){
        this.company_freight = false
      }else{
        this.company_freight = true
      }
    },
    //获取商品分类
    _getCatagory(){
      let obj = {}
      obj.type = 'SELECT'
      obj.id = 0
      console.log(obj)
      getTreecatagory(obj).then(res =>{
        this.transleteData(res.data,this.categoryList)
        this.IterationDelateMenuChildren(this.categoryList)
      })
    },
    transleteData(data, arr) {
            data.forEach( (item) => {
                // if(!item.parentId){
                //     item.parentId = 0
                //     item.parentName = '所有部门'
                // }
                const msg = {
                    id: item.catId,
                    label: item.catName,
                    value: item.catId,
                    children: item.children ? [] : null,
                    isLeaf: item.children ? false : true
                };
                if (item.children && item.children.length > 0 ) {
                    this.transleteData(item.children, msg.children);
                }
                arr.push(msg);
            });
            return arr;
        },
        IterationDelateMenuChildren(arr){
        if (arr.length) {
            for (let i in arr) {
                if (arr[i].children.length) {
                    this.IterationDelateMenuChildren(arr[i].children)
                } else {
                    delete arr[i].children;
                }
            }
        }
        return arr
        },
    //获取商品品牌
    _getBrand(){
      let obj = {}
      obj.keyWord =''
      obj.pageIndex = 1
      obj.pageSize = 15
      getBrand(obj).then(res => {
        this.branchList = res.data.pageList
      })
    },
    handleSelectCategoryQuery (val) {
      this.form.cat_id = val[val.length - 1]
    },
    addOtherCat () {
      this.otherCat.push(this.otherCat.length)
    },
    showAddBranch () {
      this.AddBranchFlag = !this.AddBranchFlag
    },
    handleAddBranch () {
      if (!this.addBranchName) {
        this.$message({
          type: 'warning',
          message: '请填写品牌名称'
        })
        return
      }
      addBranch(this.addBranchName).then(() => {
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      })
    },
    handleGetRound () {
      this.form.price = parseInt(this.form.price, 10)
    },
    beforeImageUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt50KB = file.size / 1024 / 1024 < 2
      if (!(isJPG || isPNG)) {
        this.$message.error('上传图片只能是JPG或者PNG格式!')
      }
      if (!isLt50KB) {
        this.$message.error('上传图片大小不能超过 2M!')
      }
      return isLt50KB && (isJPG || isPNG)
    },
    handleImageSuccess (res, file) {
      this.form.first_image_url.push(
        {
        imgUrl:res.data.domain+res.data.filePath,
        imgDesc:''
        })
      this.form.first_image_id = res.data.domain
    },
    handleAvatarSuccess(res,file,data){
      data.goodsThumbnailImgUrl = res.data.domain + res.data.filePath
    },
    handleImageSuccessmall (res, file) {
      this.form.first_image_urlsmall = res.data.domain+res.data.filePath
    },
    _getCategory () {
      // getCategory().then(res => {
      //   this.categoryList = res.data
      // })
    },
    _getGoodsBranch () {
      // getGoodsBranch().then(res => {
      //   this.branchList = res.data
      // })
    },
    handleRemove(){

    }
  },
  components: {
      Treeselect
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
    padding: 20px;
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
.wh37 {
  width: 370px;
}
.wh13 {
  width: 130px;
}
.wh085 {
  width: 85px;
}
.ml10 {
  margin-left: 10px;
}
.inline {
  vertical-align: top;
}
.fl {
  float: left;
}
.theme-color {
  color: $themeColor;
}
.retip {
  font-size: 14px;
  color: #999;
  line-height: 1.4;
  margin-top: 10px;
}
.red {
  color: $themeSubColor;
}
.blod-lable {
  font-weight: 700;
  color: #888;
}
.volumetip {
  margin: 0 0 18px 0;
}
.tishi{
  margin-left:20px;
  color:#D9D9D9
}

</style>

<style lang='scss' scoped>
.upload-wrapper {
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
  .avatar1 {
    width: 50px !important;
    height: 50px !important;
    display: block;
  }
  .dis_flex{
    display: flex;
  }
}
.rdleft{
    position: absolute;
    left: 238px;
    top: -2px;
  }
.tableBox{
  th{
    padding:0 !important;
    height:20px;
    line-height:20px;
  }
}
.scenario{
  width: 100px;
  height: 100px;
  background:rgba(247,250,255,1);
  border:1px solid rgba(215,224,241,1);
  text-align: center;
  div:first-child{
    font-size:14px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(136,136,136,1);
    margin-top: 15px;
  }
  .number{
    font-size:12px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(187,186,186,1);
  }
}
.square{
  margin-top: 29px;
}
.bumber_col{
    background:rgba(255,255,255,1);
    border:1px solid rgba(215,224,241,1);
    display: flex;
    align-items: center;
    padding-left: 20px;
    border-left: none;
}
.interbank{
  display: flex;
  .model{
    height: 32px;
    padding: 0 18px;
    background:rgba(241,248,255,1);
    border-radius:4px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 8px;
    font-size:14px;
    font-family:MicrosoftYaHei;
    font-weight:400;
    color:rgba(107,108,112,1);
    border-radius:4px;
    position: relative;
  }
}
.delete-specif{
    width: 0;
    height: 0;
    display: inline-block;
    border: 11px solid;
    border-color: transparent #4a99fa #4a99fa transparent;
    position: absolute;
    right: 0;
    bottom: 0;
    cursor: default;
    .error{
      width: 7px;
      height: 7px;
      position: absolute;
      right: -7px;
      bottom: 5px;
      color: white;
    }
}
.addbcd{
  display: flex
}
</style>
