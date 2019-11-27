<template>
  <div class="margin dealerlist">
    <el-form ref="form" :model="form" label-width="150px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" :content="content"></el-page-header>
          </div>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <h4 class="title">活动信息</h4>
            <el-row>
              <el-col :span="16">
                <el-form-item label="活动主题：" required>
                  <el-input v-model="form.activityTopic" clearable placeholder="请输入活动主题"></el-input>
                </el-form-item>
              </el-col>
              <p v-show="tip1" style="position: absolute;font-size: 12px;color: red;left: 150px;bottom: 0px;">请输入活动主题</p>
            </el-row>
            <el-row>
              <el-col :span="14">
                <el-form-item label="活动类型：" required>
                  <el-select @change="handleSelectChange" v-model="form.activityTypeId" placeholder="请选择">
                    <el-option
                      v-for="item in activityGoodsType"
                      :label="item.activityTypeName"
                      :value="item.activityTypeId">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <p v-show="tip2" style="position: absolute;font-size: 12px;color: red;left: 150px;bottom: 0px;">请选择活动类型</p>
            </el-row>
            <el-row>
              <el-col :span="14">
                <el-form-item label="自行挑选：">
                  <el-radio v-model="form.isSelfSelect" :label="1">是</el-radio>
                  <el-radio v-model="form.isSelfSelect" :label="0">否</el-radio>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="活动时间：" required>
                  <el-date-picker
                    :editable="false"
                    style="display: inline-block"
                    v-model="form.startTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="date"
                    placeholder="开始时间"
                    :picker-options="pickerOptions0">
                  </el-date-picker>
                  <span style="font-size: 14px;color: #606266;margin: 0 6px">-</span>
                  <el-date-picker
                    :editable="false"
                    style="display: inline-block"
                    v-model="form.entTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="date"
                    placeholder="结束时间"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <p v-show="tip3" style="position: absolute;font-size: 12px;color: red;left: 150px;bottom: 0px;">请选择活动时间</p>
            </el-row>
            <el-row v-show="form.isSelfSelect === 0">
              <el-col :span="16">
                <el-form-item label="商家推荐：" required>
                  <el-date-picker
                    :editable="false"
                    style="display: inline-block"
                    v-model="form.recommendStartTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="date"
                    placeholder="开始时间"
                    :picker-options="pickerOptions2">
                  </el-date-picker>
                  <span style="font-size: 14px;color: #606266;margin: 0 6px">-</span>
                  <el-date-picker
                    :editable="false"
                    style="display: inline-block"
                    v-model="form.recommendEndTime"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    type="date"
                    placeholder="截至时间"
                    :picker-options="pickerOptions3">
                  </el-date-picker>
                  <p style="font-size: 12px; color: #999;line-height: 1.2;position: relative;top: 2px;"><i style="margin-right: 4px" class="el-icon-warning-outline"></i>商品推荐结束时间不得超过活动开始时间</p>
                </el-form-item>
              </el-col>
              <p v-show="tip4" style="position: absolute;font-size: 12px;color: red;left: 150px;bottom: 0px;">请选择商品推荐时间</p>
            </el-row>
            <el-row>
              <el-col :span="14">
                <el-form-item label="排序：">
                  <el-select v-model="form.sortOrder" placeholder="请选择">
                    <el-option
                      v-for="item in 100"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="isAssemble">
              <el-col :span="16">
                <el-form-item label="拼团人数：" required>
                  <el-select v-model="form.groupMember" placeholder="请选择">
                    <el-option
                      v-for="item in 20"
                      :key="item"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <p v-show="tip5" style="position: absolute;font-size: 12px;color: red;left: 150px;bottom: 0px;">请选择拼团人数</p>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="活动内容：" required>
                  <el-input v-model="form.content" clearable placeholder="请输入活动内容"></el-input>
                </el-form-item>
              </el-col>
              <p v-show="tip6" style="position: absolute;font-size: 12px;color: red;left: 150px;bottom: 0px;">请输入活动内容</p>
            </el-row>
            <el-row>
              <el-col :span="16">
                <el-form-item label="关键字：" required>
                  <el-input v-model="form.keyWord" clearable placeholder="请输入关键字"></el-input>
                </el-form-item>
              </el-col>
              <p v-show="tip7" style="position: absolute;font-size: 12px;color: red;left: 150px;bottom: 0px;">请输入关键字</p>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="首页广告位展示图：" required>
                  <div class="uploadImgWrap">
                    <div v-if="home_banner" style="display: inline-block; ">
                      <i class="img_wrap"><img :src="home_banner" alt=""></i>
                    </div>
                    <div style="display: inline-block; margin-left:20px;">
                      <label for="uploadPic0"
                             style="margin-bottom:20px;display: inline-block;cursor: pointer; height:32px;line-height: 32px;padding: 0 14px;background:rgba(76,134,244,1);color: #fff;border-radius:3px;">
                        <input ref="file_input0" type="file" @change="uploadPic(0)" accept="image/jpeg, image/png"
                               id="uploadPic0" style="position: absolute; top: -10000px">
                        <span v-if="!home_banner">上传图片</span>
                        <span v-else="">重新上传</span>
                      </label>
                      <p style="color: #606266;font-size: 12px; line-height: 2">1、图片尺寸建议：710px*300px</p>
                      <p style="color: #606266;font-size: 12px; line-height: 2">2、支持JPG、PNG格式的图片，图片不能大于2M。</p>
                    </div>
                  </div>
                </el-form-item>
              </el-col>
              <p v-show="tip8" style="position: absolute;font-size: 12px;color: red;left: 150px;bottom: 0px;">请上传首页广告位展示图</p>
            </el-row>
            <el-row>
              <el-col>
                <el-form-item label="活动首页海报：" required>
                  <div class="uploadImgWrap">
                    <ul>
                      <li class="img_wrap" style="position: relative; margin-right: 6px;margin-bottom: 6px" v-for="(item, index) in imgUrls">
                        <div class="mask" @click="deletePhoto(index)"><i class="el-icon-delete"></i></div>
                        <img :src="item" alt="">
                      </li>
                      <li style="display: inline-block; margin-left:20px;">
                        <label for="uploadPic1"
                               style="margin-bottom:20px;display: inline-block;cursor: pointer; height:32px;line-height: 32px;padding: 0 14px;background:rgba(76,134,244,1);color: #fff;border-radius:3px;">
                          <input ref="file_input1" type="file" @change="uploadPic(1)" accept="image/jpeg, image/png"
                                 id="uploadPic1" style="position: absolute; top: -10000px">
                          上传图片
                        </label>
                        <p style="color: #606266;font-size: 12px; line-height: 2">1、图片尺寸建议：710px*300px</p>
                        <p style="color: #606266;font-size: 12px; line-height: 2">2、支持JPG、PNG格式的图片，图片不能大于2M。</p>
                      </li>
                    </ul>
                  </div>
                </el-form-item>
              </el-col>
              <p v-show="tip9" style="position: absolute;font-size: 12px;color: red;left: 150px;bottom: 0px;">请上传活动首页海报</p>
            </el-row>
            <el-row id="addClassify" v-if="needAddProClassify">
              <el-col>
                <el-form-item label="活动商品分类：" required>
                  <div style="display: inline-block;margin-left: 20px">
                    <el-button class="add_btn" type="primary" size="small" @click="dialogVisible = true">
                      <img style="margin-right: 6px" src="@/common/images/activity/icon_add_classify.png" alt="">添加商品分类
                    </el-button>
                  </div>
                  <ul class="clearfix classifyList">
                    <li class="classifyItem" v-for="(item, index) in productClassify">
                      {{item.goodsTypeName}}
                      <div class="deleteClassify" @click="deleteClassify(index)"><i class="el-icon-close"></i></div>
                    </li>
                  </ul>
                </el-form-item>
              </el-col>
              <p v-show="tip10" style="position: absolute;font-size: 12px;color: red;left: 150px;bottom: 0px;">请添加商品分类</p>
            </el-row>
          </div>
        </div>
      </div>
      <el-tabs type="border-card">
        <el-tab-pane>
          <span slot="label" style="font-size: 16px; color: #333">推荐商品</span>
          <NewActivityTable>
            <div style="margin-bottom: 20px">
              <el-button class="add_btn" type="primary" size="small" @click="showRecommendProPopup" style="margin-right: 20px">
                <img style="margin-right: 6px" src="@/common/images/activity/icon_recommend_product.png" alt="">推荐商品
              </el-button>
              <el-select v-if="needAddProClassify" v-model="activityGoodsTypeId" placeholder="请选择商品分类" style="height: 36px">
                <el-option
                  v-for="(item, index) in productClassify"
                  :key="index"
                  :label="item.goodsTypeName"
                  :value="index">
                </el-option>
              </el-select>
            </div>
          </NewActivityTable>
          <div style="text-align: center; margin-top: 44px">
            <el-button class="add_btn" type="primary" size="small" @click="confirmAddToActivity">确定</el-button>
            <el-button class="add_btn" type="primary" size="small" @click="back">返回</el-button>
          </div>
        </el-tab-pane>
        <!--<el-tab-pane>
          <span slot="label" style="font-size: 16px; color: #333">本次参加活动商品</span>
          <NewActivityTable2 :activityId="activityId"></NewActivityTable2>
        </el-tab-pane>-->
      </el-tabs>
    </el-form>
    <!--添加商品-->
    <AddNewPro></AddNewPro>
    <!--添加商品-->

    <!--添加商品分类-->
    <el-dialog
      id="newClassify"
      title="新建活动商品分类"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <el-form :model="form1" :rules="rules" ref="form1" label-width="100px">
        <el-form-item label="商品分类：" prop="goodsTypeName">
          <el-input v-model="form1.goodsTypeName" clearable placeholder="请输入商品分类"></el-input>
        </el-form-item>
        <el-form-item label="副标题：" prop="goodsTypeSubtitle">
          <el-input v-model="form1.goodsTypeSubtitle" clearable placeholder="请输入副标题"></el-input>
        </el-form-item>
        <el-form-item label="活动介绍：" prop="goodsTypeImgDesc">
          <el-input
            width="80%"
            type="textarea"
            :rows="8"
            placeholder="请输入活动介绍内容"
            v-model="form1.goodsTypeImgDesc">
          </el-input>
        </el-form-item>
        <el-form-item label="活动排序：" prop="sortOrder">
          <el-select min="0" v-model="form1.sortOrder" placeholder="请选择" id="order">
            <el-option
              v-for="item in 100"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动海报：" ref="classifyBanner">
          <div class="uploadImgWrap">
            <div v-if="classifyBannerUrl" class="img_wrap" style="margin-right: 20px;">
              <img style="width: 100%; height: 100%" :src="classifyBannerUrl" alt="">
            </div>
            <div style="display: inline-block;">
              <label for="uploadPic"
                     style="margin-bottom:20px;display: inline-block;cursor: pointer; height:32px;line-height: 32px;padding: 0 14px;background:rgba(76,134,244,1);color: #fff;border-radius:3px;">
                <input ref="file_input2" type="file" @change="uploadPic(2)" accept="image/jpeg, image/png"
                       id="uploadPic" style="position: absolute; top: -10000px">
                <span v-if="!classifyBannerUrl">上传图片</span>
                <span v-else>重新上传</span>
              </label>
              <p style="color: #606266;font-size: 12px; line-height: 2">1、图片尺寸建议：710px*300px</p>
              <p style="color: #606266;font-size: 12px; line-height: 2">2、支持JPG、PNG格式的图片，图片不能大于2M。</p>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="cancelProClassify" size="small">取 消</el-button>
        <el-button type="primary" @click="confirmCreateNewType" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <!--添加商品分类-->
  </div>
</template>

<script>
    import {mapState} from 'vuex'
    import PubSub from 'pubsub-js'
    import {SHOW_ADD_PRO_DIALOG_1} from '@/utils/pubsubEvent'
    import {throttleTipPop} from '@/utils/throttle'
    import {addActivityPro, addNewActivity, deleteFile, reqActivityList, uploadFile} from '@/api/activity/index'
    import NewActivityTable from './common/NewActivityTable'
    import NewActivityTable2 from './common/NewActivityTable2'
    import AddNewPro from './popup/AddNewPro'

    export default {
    name: "addNewActivity",
    data() {
      return {
        tip1: false,
        tip2: false,
        tip3: false,
        tip4: false,
        tip5: false,
        tip6: false,
        tip7: false,
        tip8: false,
        tip9: false,
        tip10: false,
        activityId: '', // 本次活动的id
        pickerOptions0: {
          disabledDate: (time) => {
            if (this.form.isSelfSelect === 1) {
              return time.getTime() <= Date.now() - 8.64e7;
            } else if (this.form.isSelfSelect === 0) {
              return time.getTime() < Date.now();
            }
          }
        },
        pickerOptions1: {
          disabledDate: (time) => {
            if (this.form.startTime != null) {
              return time.getTime() < new Date(this.form.startTime).getTime()
            } else {
              return true
            }
          }
        },
        pickerOptions2: {
          disabledDate: (time) => {
            return time.getTime() <= Date.now() - 3600000 * 24
          }
        },
        pickerOptions3: {
          disabledDate: (time) => {
            if (this.form.recommendStartTime != null && this.form.startTime != null ) {
              return time.getTime() <= new Date(this.form.recommendStartTime).getTime() || time.getTime() >= new Date(this.form.startTime).getTime()
            } else {
              return true
            }
          }
        },
        isAssemble: false, // 拼团
        needAddProClassify: false, // 是否需要添加商品分类
        activityGoodsTypeId: '', //活动商品分类ID
        productClassify: [], // 商品分类
        imgFile0: '', // 首页广告位展示图文件
        imgFiles: [], // 活动首页海报上传多个文件
        home_banner: '', // 首页展示banner图
        imgUrls: [], // 活动详情页banner轮播
        classifyBannerUrl: '', // 分类海报
        dialogVisible: false, // 选择商品分类
        sortOrders: [{ // 排序
          sortOrder: 0,
          sortOrderId: 0,
        }],
        activityGoodsType: [], // 活动类型
        content: '新增活动',
        form: { // 新增活动参数
          activityTopic: '', // 活动类型主题
          activitySubtitle: '', // 副标题
          activityTypeId: '', // 活动类型Id
          activityTypeNum: '', // 活动类型编号
          startTime: null, // 开始时间
          entTime: null, // 结束时间
          recommendStartTime: null, // 商品推荐开始时间
          recommendEndTime: null, // 商品推荐结束时间
          sortOrder: '', // 排序
          content: '', // 活动内容
          keyWord: '', // 关键字
          homePageImgUrl: '', // 活动首页配图
          galleryList: [], // 活动banner图
          activityGoodsTypeList: [], // 活动商品分类
          isSelfSelect: 0,
        },
        form1: { // 新建活动商品分类参数
          goodsTypeName: '', // 商品分类
          goodsTypeSubtitle: '', // 副标题
          goodsTypeImgDesc: '', // 活动介绍
          sortOrder: '', // 活动排序
          goodsTypeImgUrl: '', // 活动海报
        },
        rules: { // 添加商品分类参数检验
          goodsTypeName: [
            {required: true, message: '请输入商品分类名称', trigger: 'blur'},
            {min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
          ],
          goodsTypeSubtitle: [
            {required: true, message: '请输入副标题', trigger: 'blur'}
          ],
          goodsTypeImgDesc: [
            {max: 200, message: '活动介绍不得超过200字', trigger: 'change'}
          ],
          sortOrder: [
            {type: 'number', required: true, message: '请选择活动排序', trigger: 'change'}
          ],
        }
      }
    },
    computed: {
      ...mapState({selectedPro: state => state.activity.selectedPro})
    },
    watch: {
      'imgUrls.length': {
        handler(val) {
          if (val > 5) {
            throttleTipPop(this, 'error', '最多添加5张海报图')
            this.imgUrls.pop(this.imgUrls.length - 1)
          }
          this.tip9 = val < 1;
        }
      },
      activityGoodsTypeId(val) {
        this.$store.commit('handleActivityGoodsTypePro', val)
      },
      'form.activityTypeId'(val) {
        this.activityGoodsType.forEach((item) => {
          if (item.activityTypeId === val) {
            this.form.activityTypeNum = item.activityTypeNum
          }
        })
        this.tip2 = !val;
      },
      'form.activityTypeNum'(val) {
        this.needAddProClassify = val === 3 || val === 4 || val === 5 || val === 8 || val === 9;
        if (val === 7) {
          this.isAssemble = true
        } else {
          this.isAssemble = false
        }
      },
      'form.activityTopic'(val) {
        this.tip1 = !val.replace(/^\s+|\s+$/, '');
      },
      'form.startTime'(val) {
        this.tip3 = !val || !this.form.entTime;
      },
      'form.entTime'(val) {
        this.tip3 = !val || !this.form.startTime;
      },
      'form.recommendStartTime'(val) {
        this.tip4 = !val || !this.form.recommendEndTime;
      },
      'form.recommendEndTime'(val) {
        this.tip4 = !val || !this.form.recommendStartTime;
      },
      'form.groupMember'(val) {
        this.tip5 = this.isAssemble && !val;
      },
      'form.content'(val) {
        this.tip6 = !val.replace(/^\s+|\s+$/, '');
      },
      'form.keyWord'(val) {
        this.tip7 = !val.replace(/^\s+|\s+$/, '');
      },
      'home_banner'(val) {
        this.tip8 = !val;
      },
      'productClassify.length'(val) {
        this.tip10 = this.needAddProClassify && val < 1;
      },
    },
    mounted() {
      this.getActivityList() // 获取活动列表
    },
    methods: {
      // 取消商品分类
      cancelProClassify() {
        this.form1 = { // 新建活动商品分类参数
          goodsTypeName: '', // 商品分类
          goodsTypeSubtitle: '', // 副标题
          goodsTypeImgDesc: '', // 活动介绍
          sortOrder: '', // 活动排序
          goodsTypeImgUrl: '', // 活动海报
        },
        this.dialogVisible = false
      },
      // 活动类型发生变化时将所选的商品清空
      handleSelectChange() {
        this.$store.commit('initialState')
      },
      // 删除活动首页海报
      deletePhoto(index) {
        this.imgUrls.splice(index, 1)
      },
      // 获取活动列表
      async getActivityList() {
        const res = await reqActivityList()
        if (res.code === 200) {
          this.activityGoodsType = res.data.list
        }
        this.form.activityTypeId = this.$route.query.activityTypeId
        this.form.activityTypeNum = this.$route.query.activityTypeNum
      },
      // 确定添加商品至活动
      async confirmAddToActivity() {
        let cannotpass = false
        if(!this.form.activityTopic.replace(/^\s+|\s+$/, '')) {
          cannotpass = true
          this.tip1 = true
        }
        if(!this.form.activityTypeId) {
          cannotpass = true
          this.tip2 = true
        }
        if(!this.form.startTime || !this.form.entTime) {
          cannotpass = true
          this.tip3 = true
        }
        if(this.form.isSelfSelect === 0 && (!this.form.recommendStartTime || !this.form.recommendEndTime)) {
          cannotpass = true
          this.tip4 = true
        }
        if(this.isAssemble && !this.form.groupMember) {
          cannotpass = true
          this.tip5 = true
        }
        if(!this.form.content.replace(/^\s+|\s+$/, '')) {
          cannotpass = true
          this.tip6 = true
        }
        if(!this.form.keyWord.replace(/^\s+|\s+$/, '')) {
          cannotpass = true
          this.tip7 = true
        }
        if(!this.home_banner) {
          cannotpass = true
          this.tip8 = true
        }
        if(this.imgUrls.length < 1) {
          cannotpass = true
          this.tip9 = true
        }
        if(this.needAddProClassify && this.productClassify.length < 1) {
          cannotpass = true
          this.tip10 = true
        }
        if (cannotpass) {
          throttleTipPop(this, 'error', '缺少必填信息，请补充完整信息')
          return
        }

        let activityGoodsTypeIds = []
        const arr = [] // 传入商品的参数
        if (this.activityId === '') {
          // 1. 调用保存活动的接口，获取活动商品类型Id
          this.form.activityGoodsTypeList = this.productClassify
          const res = await addNewActivity(this.form)
          if (res.code === 200) {
            activityGoodsTypeIds = res.data.activityGoodsTypeId || []
            this.activityId = res.data.activityId
          }
        }
        // 2. 调用新增活动商品接口， 传入活动商品
        this.selectedPro.forEach((item) => {
          const obj = {}
          obj.activityGoodsTypeId = activityGoodsTypeIds[item.activityGoodsTypeId] || null
          obj.activityId = this.activityId
          obj.goodsId = item.goodsId
          if(activityGoodsTypeIds.length > 0) { // 如果有商品分类
            obj.activityGoodsTypeId = activityGoodsTypeIds[this.activityGoodsTypeId]
          }
          obj.skuParamList = []
          item.skuInfo.forEach((item2) => {
            const obj2 = {}
            obj2.skuId = item2.skuId
            obj2.activityGoodsNumber = item2.userSerInfo.activityGoodsNumber
            obj2.distributorActivityPrice = item2.userSerInfo.distributorActivityPrice
            obj2.fyuanaiActivityPrice = item2.userSerInfo.fyuanaiActivityPrice
            obj2.platformActivityPrice = item2.userSerInfo.platformActivityPrice
            obj2.supplierActivityPrice = item2.userSerInfo.supplierActivityPrice
            obj.skuParamList.push(obj2)
          })
          arr.push(obj)
        })
        const res2 = await addActivityPro(arr)
        if(res2.code === 200) {
          throttleTipPop(this, 'success', '创建活动成功')
          this.back()
        }
      },
      // 删除添加的商品分类
      deleteClassify(index) {
        this.productClassify.splice(index, 1)
        if (this.productClassify.length === 0) {
          this.activityGoodsTypeId = ''
        } else {
          this.activityGoodsTypeId = 0
        }
      },
      // 确定添加商品分类
      confirmCreateNewType() {
        this.$refs['form1'].validate((valid) => {
          if (valid) {
            let duplicatedName = false
            this.productClassify.forEach((item) => {
              if (this.form1.goodsTypeName === item.goodsTypeName) {
                duplicatedName = true
                return
              }
            })
            if (duplicatedName) {
              throttleTipPop(this, 'error', '已存在该商品分类')
              return
            }
            const obj = this.form1
            this.productClassify.push(obj)
            this.activityGoodsTypeId = 0
            this.dialogVisible = false
            this.form1 = {}
            this.classifyBannerUrl = ''
          } else {
            return false;
          }
        })
      },
      // 显示推荐商品弹窗
      showRecommendProPopup() {
        if (this.needAddProClassify && this.productClassify.length === 0) {
          throttleTipPop(this, 'error', '请先添加商品分类')
          return
        }
        if(this.productClassify.length > 0 && this.activityGoodsTypeId === '') {
          throttleTipPop(this, 'error', '请先选择商品分类')
          return
        }
        PubSub.publish(SHOW_ADD_PRO_DIALOG_1, this.activityGoodsTypeId)
      },
      // 上传图片至服务器
      async uploadFileToService(files) {
        let path = ''
        const formData = new FormData()
        formData.append('file', files)
        const res = await uploadFile(formData)
        if (res.code === 200) {
          path = res.data.domain + res.data.filePath
        }
        return path
      },
      // 从服务器删除图片
      async deleteFileFromService() {
        const res = await deleteFile()
      },
      // 上传图片(前端展示)
      async uploadPic(index) {
        const files = this.$refs[`file_input${index}`].files[0]
        const type = files.type
        const size = files.size
        const mazSize = 2 * 1024 * 1024
        if (type !== 'image/png' && type !== 'image/jpeg') {
          throttleTipPop(this, 'error', '文件格式不正确')
          return
        }
        if (size > mazSize) {
          throttleTipPop(this, 'error', '文件大小不得超过2M')
          return
        }
        const path = await this.uploadFileToService(files)
        const reader = new FileReader()
        reader.onload = (e) => {
          if (index === 0) {
            this.form.homePageImgUrl = path
            this.home_banner = e.target.result
          } else if (index === 1) {
            const obj = {}
            obj.imgOriginalUrl = path
            obj.imgUrl = path
            obj.thumbnailUrl = path
            this.form.galleryList.push(obj)
            this.imgUrls.push(e.target.result)
          } else if (index === 2) {
            this.form1.goodsTypeImgUrl = path
            // this.$refs.classifyBanner.clearValidate()
            this.classifyBannerUrl = e.target.result
          }
        }
        reader.readAsDataURL(files)
        this.$refs[`file_input${index}`].value = '' // 清空上传的文件
      },
      // 返回
      back() {
        this.$router.push({
          name: 'activityList',
          params: {'activityTypeId': this.$route.query.activityTypeId}
        })
        this.$store.commit('initialState')
      },
    },
    components: {
      NewActivityTable,
      NewActivityTable2,
      AddNewPro,
    },
  }
</script>

<style lang="scss" scoped>
  @import "@/common/scss/variable.scss";
  .img_wrap:hover > .mask {
    display: block;
  }
  .mask {
    display: none;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    text-align: center;
    line-height: 180px;
    color: #fff;
    font-size: 30px;
    i {
      cursor: pointer;
    }
  }
  #addClassify {
    /deep/ .el-form-item__content {
      margin-left: 60px !important;
    }
  }

  .classifyList {
    display: inline-block;

    .classifyItem {
      float: left;
      position: relative;
      width: 93px;
      height: 32px;
      line-height: 32px;
      background: rgba(241, 248, 255, 1);
      border-radius: 4px;
      font-size: 12px;
      color: rgba(76, 134, 244, 1);
      text-align: center;
      margin-left: 24px;

      .deleteClassify {
        position: absolute;
        right: 0;
        bottom: 0;
        width: 0;
        height: 0;
        border-right: 11px solid #4A99FA;
        border-bottom: 11px solid #4A99FA;
        border-top: 11px solid transparent;
        border-left: 11px solid transparent;
        border-radius: 0 0 4px 0;
        cursor: pointer;
        color: #fff;

        .el-icon-close {
          position: relative;
          top: -11px;
          right: 2px;
          color: #fff;
        }
      }
    }
  }

  #newClassify {
    /deep/ .el-textarea__inner, /deep/ .el-input, /deep/ .el-select {
      width: 80%;
    }
  }

  /* 活动列表*/
  /deep/ .el-tabs--border-card {
    box-shadow: none;
    border: none;
  }

  /deep/ .el-tabs__content {
    border: 1px solid #D6DEEF;
    margin-top: -2px;
  }

  /deep/ .el-tabs__item {
    height: 58px;
    line-height: 58px;
    color: #333;
    padding: 0 26px;
  }

  /deep/ .el-tabs__nav-wrap {
    background: #f7faff;
  }

  /deep/ .is-active {
    border-top: 1px solid #DCDFE6 !important;
    margin-left: 0 !important;
    margin-top: 0 !important;
  }

  /* 活动列表*/

  /deep/ .el-page-header__content {
    font-size: 16px;
    color: #3C3C3C;
  }

  ul, li, div, img {
    vertical-align: middle;
  }

  .img_wrap {
    display: inline-block;
    width: 364px;
    height: 180px;
    border: 1px solid #ececec;

    img {
      width: 100%;
      height: 100%;
    }
  }

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

    .search-wrapper1 {
      padding: 20px;
      border: 1px solid rgb(215, 224, 241);
      background: #fff;
      display: flex;
      align-items: center;

      .title1 {
        display: flex;
        margin-left: 40%;
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
</style>
