<template>
  <div>
    <el-form :model="form" ref="form" :rules="rules" label-width="260px" size="small">
      <el-card class="mbottom" shadow="never">
        <div class="clearfix">
          <div class="fl">
            <el-form-item label="商品名称：" prop="goods_name">
              <el-input
                v-model="form.goods_name"
                placeholder="命名方式：品牌+名称+型号+规格"
                class="wh37 inline"
              ></el-input>
            </el-form-item>
          </div>
          <div class="fl">
            <el-form-item label-width="0" prop="goods_name_color">
              <el-color-picker v-model="form.goods_name_color" class="inline ml10"></el-color-picker>
            </el-form-item>
          </div>
          <div class="fl">
            <el-form-item label-width="0" prop="goods_name_style">
              <el-select v-model="form.goods_name_style" class="ml10 inline">
                <el-option label="字体样式" value></el-option>
                <el-option label="加粗" value="strong"></el-option>
                <el-option label="斜体" value="em"></el-option>
                <el-option label="下划线" value="u"></el-option>
                <el-option label="删除线" value="strike"></el-option>
              </el-select>
            </el-form-item>
          </div>
        </div>
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
          <div class="retip ">如果您不输入商品货号，系统将自动生成一个唯一的货号</div>
        </el-form-item>
        <el-form-item prop="model_number" label="型号：">
          <el-input v-model="form.model_number" class="wh37"></el-input>
        </el-form-item>
        <el-form-item prop="goods_weight" label="商品重量：">
          <el-input v-model="form.goods_weight" class="wh37">
            <span slot="append">千克</span>
          </el-input>
        </el-form-item>
        <el-form-item label="商品分类：" prop="cat_id">
          <el-cascader
            placeholder="请选择分类"
            :options="categoryList"
            filterable
            change-on-select
            clearable
            @change="handleSelectCategoryQuery"
          ></el-cascader>
          <div class="retip red  rdleft">注： 请填好务必填好贵司的商品分类, 比如保温杯就选择保温杯，养生壶就选择养生壶，如果品类没有的请告知我们采购员可以添加分类</div>
        </el-form-item>
        <!-- <el-form-item prop="tax" label="商品规格：">
          <div>
            <div>
              <el-select v-model="form.tax">
                <el-option label="0%" value="0"></el-option>
                <el-option label="6%" value="6"></el-option>
                <el-option label="10%" value="10"></el-option>
                <el-option label="13%" value="13"></el-option>
              </el-select>
            </div>

          </div>
          
        </el-form-item> -->
        <el-form-item prop="tax" label="税率：">
          <el-select v-model="form.tax">
            <el-option label="0%" value="0"></el-option>
            <el-option label="6%" value="6"></el-option>
            <el-option label="10%" value="10"></el-option>
            <el-option label="13%" value="13"></el-option>
          </el-select>
          <p class="retip red rdleft">注：请一定要填好税率，此税率将关系到后面的税费及货款结算，谢谢！</p>
        </el-form-item>
        <el-form-item label="拓展分类：" prop="cat_other">
          <el-button type="primary" @click="addOtherCat">添加</el-button>
          <el-cascader
            v-for="(item, index) in otherCat"
            :key="index"
            class="ml10"
            placeholder="请选择分类"
            :options="categoryList"
            filterable
            change-on-select
            clearable
            v-model="form.cat_other[item]"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="商品品牌：" prop="goods_branch">
          <el-select v-model="form.goods_branch" filterable placeholder="请选择商品品牌">
            <el-option
              v-for="item in branchList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-button type="primary" class="ml10" @click="showAddBranch">添加品牌</el-button>
          <span v-show="AddBranchFlag">
            <el-input
              v-model="addBranchName"
              class="inline ml10"
              style="width: 200px"
              placeholder="请输入品牌名称"
            ></el-input>
            <el-button type="primary" class="ml10" @click="handleAddBranch">确 定</el-button>
          </span>
        </el-form-item>
        <el-form-item prop="price" label="市场销售价：">
          <el-input type="number" v-model="form.price" class="wh37"></el-input>
          <el-button type="primary" class="ml10" @click="handleGetRound">取整数</el-button>
        </el-form-item>
        <el-form-item prop="tip_price" label="指导我司销售价：">
          <el-input type="number" v-model="form.tip_price" class="wh37"></el-input>
          <p class="retip red rdleft" style="left:395px">商品有特殊定价要求，请填写指导价，如没有可不用填，谢谢！</p>
        </el-form-item>
      </el-card>
      <el-card class="mbottom" shadow="never">
        <div class="clearfix">
          <el-form-item class="fl" prop="cost_price">
            <span slot="label">
              <span class="blod-lable">报价1：</span>
              一件代发单价（
              <span class="red">含税价</span>
              ）：
            </span>
            <el-input type="number" v-model="form.cost_price" class="wh37"></el-input>
          </el-form-item>
          <el-form-item class="fl ml10" prop="cost_price_type" label-width="0">
            <el-select v-model="form.cost_price_type" @change="unitprice">
              <el-option label="含税费含运费" value="0"></el-option>
              <el-option label="含税费不含运费" value="1"></el-option>
              <el-option label="不支持一件代发" value="2"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <el-form-item>
          <span slot="label" class="red">
            注：请务必按贵司的批发价格作为
            给到我司一件代发价的支持，价格
            高了将影响我司的平台竞争力，请
            务必支持，大家合作共赢，谢谢！
          </span>
          <div>
            <p class="retip red" style="width: 645px;">
              注：一件代发价是否是含全国一对一快递费价格，如是含快递费请在运费上默认0元；如果不含快递费，
              请在一代代发价上填写最低价，并在运费上填写全国一对一快递费用(全国快递大至平均价）请务必提供最低优惠价，谢谢！
            </p>
          </div>
        </el-form-item>
        <el-form-item prop="cost_company" label="一件代发快递公司：">
          <el-input v-model="form.cost_company" class="wh37"></el-input>
        </el-form-item>
        <el-form-item prop="freight" label="运费：" v-if="company_freight">
          <el-input v-model="form.freight" class="wh37"></el-input>
        </el-form-item>
        <el-form-item prop="jd_link" label="京东链接：">
          <el-input v-model="form.jd_link" class="wh37"></el-input>
          <p class="retip red">请复制粘贴京东链接，京东价格无须填写，会自动更新！</p>
        </el-form-item>
        <el-form-item prop="jd_price" label="京东价格：">
          <el-input v-model="form.jd_price" class="wh37" disabled></el-input>
        </el-form-item>
        <el-form-item prop="tm_link" label="天猫链接：">
          <el-input v-model="form.tm_link" class="wh37"></el-input>
          <p class="retip red">请复制粘贴天猫链接，天猫价格无须填写，会自动更新！</p>
        </el-form-item>
        <el-form-item prop="tm_price" label="天猫价格：">
          <el-input v-model="form.tm_price" class="wh37" disabled></el-input>
        </el-form-item>
      </el-card>
      <el-card class="mbottom" shadow="never">
        <el-form-item required>
          <span slot="label">
            <span>
              <span class="blod-lable">报价2：</span>
              集采批量价格：
            </span>
            <p class="red">
              注：请务必填写给予我司
              的最低最优惠的价格，
              以便我司在做客户活动项目
              推荐时有一定的竞争力，
              并将贵司给我司的优惠价格作为
              战略商品进行全方位的客户推荐，
              非常感谢！
            </p>
          </span>
          <div>
            <el-form-item
              prop="volume.0.number"
              class="fl"
              label="最低起订量1："
              label-width="116px"
              :rules="{ required: true, message: '请输入数量', trigger: 'blur' }"
            >
              <el-input type="number" :min="1" v-model="form.volume[0].number" class="wh085"></el-input>
            </el-form-item>
            <el-form-item
              prop="volume.0.price"
              class="fl ml10"
              label="单价1（含税）："
              :rules="{ required: true, message: '请输入单价', trigger: 'blur' }"
              label-width="128px"
            >
              <el-input type="number" :min="0" v-model="form.volume[0].price" class="wh085"></el-input>
            </el-form-item>
            <el-form-item class="fl ml10" label-width="0">
              <el-select v-model="form.volume[0].type" class="wh13">
                <el-option label="含税费含运费" value="1"></el-option>
                <el-option label="含税费不含运费" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              prop="volume.0.ppt_price"
              class="fl ml10"
              label="贵公司对外PPT价格："
              :rules="{ required: true, message: '请输入价格', trigger: 'blur' }"
              label-width="161px"
            >
              <el-input type="number" :min="0" v-model="form.volume[0].ppt_price" class="wh085"></el-input>
            </el-form-item>
            <el-form-item
              prop="volume.0.discount_price"
              class="fl ml10"
              label="贵公司对外最优惠价格："
              :rules="{ required: true, message: '请输入价格', trigger: 'blur' }"
              label-width="176px"
            >
              <el-input type="number" v-model="form.volume[0].discount_price" class="wh085"></el-input>
            </el-form-item>
            <div>
              <p class="retip volumetip red" style="width: 30%;margin-left: 43%;">请填写贵行对外的PPT价格及对外最优惠价格，以后我司在做项目推荐时,能更加精准的推荐贵司的商品，非常感谢！</p>
            </div>
            <!-- <el-col class="retip volumetip"></el-col> -->
          </div>
          <div>
            <el-form-item
              prop="volume.1.number"
              class="fl"
              label="订货数量2："
              label-width="113px"
              :rules="{ required: true, message: '请输入数量', trigger: 'blur' }"
            >
              <el-input type="number" :min="1" v-model="form.volume[1].number" class="wh085"></el-input>
            </el-form-item>
            <el-form-item
              prop="volume.1.price"
              class="fl ml10"
              label="单价2（含税）："
              :rules="{ required: true, message: '请输入单价', trigger: 'blur' }"
              label-width="128px"
            >
              <el-input type="number" :min="0" v-model="form.volume[1].price" class="wh085"></el-input>
            </el-form-item>
            <el-form-item class="fl ml10" label-width="0">
              <el-select v-model="form.volume[1].type" class="wh13">
                <el-option label="含税费含运费" value="1"></el-option>
                <el-option label="含税费不含运费" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              prop="volume.1.discount_price"
              class="fl ml10"
              label="合作支持项目特惠供货价(含税)："
              :rules="{ required: true, message: '请输入价格', trigger: 'blur' }"
              label-width="233px"
            >
              <el-input type="number" v-model="form.volume[1].discount_price" class="wh085"></el-input>
            </el-form-item>
            <div>
              <p class="retip volumetip red" style="width: 23%;margin-left: 43%;">注：此价格将作为我们公司主推商品主要作为项目推荐，招投标时使用，谢谢！</p>
            </div>
          </div>
          <div class="clearfix">
            <el-form-item prop="volume.2.number" class="fl" label="数量3：" label-width="113px">
              <el-input type="number" :min="1" v-model="form.volume[2].number" class="wh085"></el-input>
            </el-form-item>
            <el-form-item
              prop="volume.2.price"
              class="fl ml10"
              label="单价3（含税）："
              label-width="128px"
            >
              <el-input type="number" :min="0" v-model="form.volume[2].price" class="wh085"></el-input>
            </el-form-item>
            <el-form-item class="fl ml10" label-width="0">
              <el-select v-model="form.volume[2].type" class="wh13">
                <el-option label="含税费含运费" value="1"></el-option>
                <el-option label="含税费不含运费" value="2"></el-option>
              </el-select>
            </el-form-item>
          </div>
          <div>
            <el-form-item prop="volume.3.number" class="fl" label="数量4：" label-width="113px">
              <el-input type="number" :min="1" v-model="form.volume[3].number" class="wh085"></el-input>
            </el-form-item>
            <el-form-item
              prop="volume.3.price"
              class="fl ml10"
              label="单价4（含税）："
              label-width="128px"
            >
              <el-input type="number" :min="0" v-model="form.volume[3].price" class="wh085"></el-input>
            </el-form-item>
            <el-form-item class="fl ml10" label-width="0">
              <el-select v-model="form.volume[3].type" class="wh13">
                <el-option label="含税费含运费" value="1"></el-option>
                <el-option label="含税费不含运费" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-col class="retip volumetip">库存在商品为虚货或商品存在货品时为不可编辑状态，库存数值取决于其虚货数量或货品数量</el-col>
          </div>
        </el-form-item>
      </el-card>
      <el-card shadow="never">
        <el-form-item prop="inventory_number">
          <span slot="label">
            <el-tooltip
              class="item"
              effect="dark"
              content="库存在商品为虚货或商品存在货品时为不可编辑状态，库存数值取决于其虚货数量或货品数量"
              placement="top"
            >
              <i class="el-icon-question theme-color"></i>
            </el-tooltip>&nbsp;商品库存数量：
          </span>
          <el-input type="number" :min="0" v-model="form.inventory_number" class="wh37"></el-input>
          <el-col class="retip">库存在商品为虚货或商品存在货品时为不可编辑状态，库存数值取决于其虚货数量或货品数量</el-col>
        </el-form-item>
        <el-form-item prop="warn_number" label="库存警告数量：">
          <el-input type="number" :min="1" v-model="form.warn_number" class="wh37"></el-input>
        </el-form-item>
        <el-form-item prop="warn_number" label="上传商品首图：" class="upload-wrapper">
          <el-upload
            class="avatar-uploader"
            :action="action"
            :show-file-list="false"
            :on-success="handleImageSuccess"
            :before-upload="beforeImageUpload"
          >
            <img v-if="form.first_image_url" :src="form.first_image_url" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
         <el-form-item prop="first_image_link">
          <el-input  v-model="form.first_image_link" class="wh37" placeholder="商品图片外部URL"></el-input>
        </el-form-item>
      </el-card>
    </el-form>
  </div>
</template>

<script>
import { imageUploadUrl } from '@/api/config'
import { getCategory, getGoodsBranch, addBranch } from '@/api/public'

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
    return {
      action: imageUploadUrl,
      company_freight:false, //控制运费的显示隐藏
      form: {
        goods_name: '', // 商品名称
        goods_name_color: '#333', // 商品名称颜色
        goods_name_style: '', // 商品名称字体样式
        goods_sn: '', // 商品货号
        model_number: '', // 型号
        goods_weight: '', // 商品重量
        cat_id: '', // 商品分类
        tax: '', // 税率 0, 6, 10, 13
        cat_other: [], // 拓展分类: 数组形式如： [['141434'],['423432', '42423'],['42432', '424324', '424324324']]
        goods_branch: '', // 商品品牌id
        price: '', // 市场销售价
        tip_price: '', // 指导我司销售价
        cost_price: '', // 一件代发单价（含税价)
        cost_price_type: '0', // '1' 含税费含运费, '2' 含税费不含运费
        cost_company: '', // 一件代发快递公司
        freight:'', //运费
        jd_link: '', // 京东链接
        jd_price: '0', // 京东价格
        tm_link: '', // 天猫链接
        tm_price: '0', // 天猫价格
        volume: [ // 集采批量价格
          {
            number: '', // 最低起订量
            price: '', // 含税单价
            type: '1', // '1' 含税费含运费, '2' 含税费不含运费
            ppt_price: '', // 贵公司对外PPT价格
            discount_price: '' // 贵公司对外最优惠价格
          }, {
            number: '', // 最低起订量
            price: '', // 含税单价
            type: '1', // '1' 含税费含运费, '2' 含税费不含运费
            discount_price: '' // 合作支持项目特惠供货价(含税)
          }, {
            number: '', // 最低起订量
            price: '', // 含税单价
            type: '1' // '1' 含税费含运费, '2' 含税费不含运费
          }, {
            number: '', // 最低起订量
            price: '', // 含税单价
            type: '1' // '1' 含税费含运费, '2' 含税费不含运费
          }
        ],
        inventory_number: '', // 库存数量
        warn_number: '', // 库存警告数量
        first_image_url: '', // 首图网址
        first_image_id: '', // 首图id
        first_image_link: '' // 首图外部链接网址
      },
      rules: {
        goods_name: [{ required: true, message: '命名方式：品牌+名称+型号+规格', trigger: 'blur' }],
        model_number: [{ required: true, message: '请输入型号', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '请输入商品重量', trigger: 'blur' }],
        cat_id: [{ required: true, message: '请选择商品分类', trigger: 'change' }],
        goods_branch: [{ required: true, message: '请选择商品品牌', trigger: 'change' }],
        price: [{ required: true, message: '请填写市场销售价', trigger: 'blur' }],
        cost_price: [{ required: true, message: '请填写一件代发价格', trigger: 'blur' }],
        freight:[{ required: true, validator: validatefreight,  trigger: 'blur' }],
        cost_company:[{ required: true, validator: validatecost_company,  trigger: 'blur' }]
      },
      categoryList: [], // 分类
      otherCat: [0],
      branchList: [],
      AddBranchFlag: false,
      addBranchName: ''
    }
  },
  created () {
    this._getCategory()
    this._getGoodsBranch()
  },
  methods: {
    //一件代发单价下拉框选择 控制运费的显示隐藏
    unitprice(val){
      if(val != 1){
        this.company_freight = false
      }else{
        this.company_freight = true
      }
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
      this.form.first_image_url = res.data.file_url
      this.form.first_image_id = res.data.file_id
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
    }
  }
}
</script>

<style lang='scss' scoped>
@import "@/common/scss/variable.scss";
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
</style>

<style lang='scss'>
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
    width: 128px;
    height: 128px;
    line-height: 128px;
    text-align: center;
  }
  .avatar {
    width: 128px;
    height: 128px;
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
</style>
