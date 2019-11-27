<template>
  <div class="margin">
    <goods-fitter class="mbottom" :dataObj="form" @goodsFitter="handleGetGoodsList"></goods-fitter>
    <div class="mcard">
      <div style="margin-bottom: 20px">
        <template>
          <el-table
                  v-if="agencyProduct&&agencyProduct.length>0"
                  :data="agencyProduct"
                  border
                >
            <!--经销商-->
            <el-table-column
                    v-if="routerInfo==0"
                    align="center"
                    prop="secondParty"
                    label='经销商名称'
            >
            </el-table-column>
            <el-table-column
                    v-if="routerInfo==0"
                    align="center"
                    prop="adminName"
                    label="联系人"
                   >
            </el-table-column>
            <el-table-column
                    v-if="routerInfo==0"
                    align="center"
                    prop="secondPartyTelephone"
                    label="手机号码">
            </el-table-column>
            <el-table-column
                    v-if="routerInfo==0"
                    align="center"
                    prop="address"
                    label="京东分成比例">
              <template slot-scope="scope">
                {{scope.row.jdFirst?scope.row.jdFirst:0}}:{{scope.row.jdFirstPoint?scope.row.jdFirstPoint:0}}
              </template>
            </el-table-column>
            <el-table-column
                    v-if="routerInfo==0"
                    align="center"
                    prop="address"
                    label="自营分成比例">
              <template slot-scope="scope">
                {{scope.row.proprietaryFirst}}:{{scope.row.proprietarySecond}}
              </template>
            </el-table-column>
            <!--项目-->
            <el-table-column
                    v-if="routerInfo==1"
                    align="center"
                    prop="projectName"
                    label='项目名称'
            >
            </el-table-column>
            <el-table-column
                    v-if="routerInfo==1"
                    align="center"
                    label='客户名称'
            >
              <template slot-scope="scope">
                {{scope.row.customer?scope.row.customer.customerName:''}}
              </template>
            </el-table-column>
            <el-table-column
                    v-if="routerInfo==1"
                    align="center"
                    label='货币单位'
            >
                <template slot-scope="scope">
                <span>
                  {{currencyUnit}}
                </span>
                </template>
            </el-table-column>
            <el-table-column
                    v-if="routerInfo==1"
                    align="center"
                    label='兑换比例'
            >
              <template slot-scope="scope">
                1:{{scope.row.exchangeRate}}
              </template>
            </el-table-column>
            <el-table-column
                    v-if="routerInfo==1"
                    align="center"
                    prop="telNumber"
                    label='客服电话'
            >
            </el-table-column>
            <el-table-column
                    v-if="routerInfo==1"
                    align="center"
                    prop="address"
                    label='地址'
            >
            </el-table-column>
          </el-table>
        </template>
      </div>
      <el-button type="primary"
                 size="small "
                 :loading="loading"
                 style="margin-bottom: 10px"
                 @click="pushgoodsaudit"
      >批量审核
      </el-button>
      <el-button type="primary"
                 :loading="loading1"
                 size="small "
                 style="margin-bottom: 10px"
                 @click="publishNow">立即发布
      </el-button>
      <el-table
              :data="tableData"
              stripe style="width: 100%"
              @selection-change="handleSelectionChange"
              border ref="pushGoodsList">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
        <el-table-column label="经销商名称" align="center" width="100" v-if="routerInfo==0">
          <template slot-scope="scope">
            {{scope.row.formData.agencyName||scope.row.formData.agencyName||''}}
          </template>
        </el-table-column>
        <el-table-column label="客户名称" align="center" width="100" v-if="routerInfo==1">
          <template slot-scope="scope">
            {{scope.row.formData?scope.row.formData.customerName:'暂无'}}
          </template>
        </el-table-column>
        <el-table-column label="平台名称" align="center" width="100" v-if="routerInfo==1">
          <template slot-scope="scope">
            {{scope.row.formData?scope.row.formData.projectName:'暂无'}}
          </template>
        </el-table-column>
        <el-table-column label="商品图片" align="center">
            <template slot-scope="scope">
              <div class="image" v-if="scope.row.formData.pushGoodsSKUList[scope.row.index || 0].thumbnailImgUrl">
                <img
                      :src="scope.row.formData.pushGoodsSKUList[scope.row.index || 0].thumbnailImgUrl"
                      width="100"
                      height="100"
                      alt
                />
              </div>
              <div v-if="!scope.row.formData.pushGoodsSKUList[scope.row.index || 0].thumbnailImgUrl">暂无图片</div>
            </template>
        </el-table-column>
        <el-table-column label="商品信息" align="center">
          <template slot-scope="scope">
            <div class="txt_left" style="font-size:15px">{{scope.row.formData.goodsName}}</div>
            <div class="txt_left">货号：{{scope.row.formData.goodsSn}}</div>
            <div class="txt_left">型号：{{scope.row.formData.modelNumber}}</div>
          </template>
        </el-table-column>
        <el-table-column label="商品规格" align="center" prop="oldPrice">
          <template slot-scope="scope">
            <div style="height: 300px;overflow-y: auto;">
              <div class="txt_left martop" v-for="(item,index) in scope.row.formData.pushGoodsSKUList" :key="index">
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
              <div>
                <div class="more txt_left">
                  商城价格:{{scope.row.formData&&scope.row.formData.pushGoodsSKUList[scope.row.index||0].goodsPrice?scope.row.formData.pushGoodsSKUList[scope.row.index||0].goodsPrice:'暂无'}}元
                </div>
                <div class="more txt_left">
                  市场价:{{scope.row.formData&&scope.row.formData.pushGoodsSKUList[scope.row.index||0].costPrice?scope.row.formData.pushGoodsSKUList[scope.row.index||0].costPrice:'暂无'}}元
                </div>
                <div class="txt_left">
                  运费：{{scope.row.formData&&scope.row.formData.pushGoodsSKUList[scope.row.index||0].configureVo?scope.row.formData.pushGoodsSKUList[scope.row.index||0].configureVo.carriagePrice!=0?scope.row.formData.pushGoodsSKUList[scope.row.index||0].configureVo.carriagePrice:'含运费':'含运费'}}
                </div>
                <div class="more txt_left">税率：12%</div>
              </div>
              <div class="more txt_left">
                商城调价:{{scope.row.formData&&scope.row.formData.pushGoodsSKUList[scope.row.index||0].goodsAdjustPrice?scope.row.formData.pushGoodsSKUList[scope.row.index||0].goodsAdjustPrice+'元':'未调整'}}
              </div>
              <div class="more txt_left">
                vip调价:{{scope.row.formData&&scope.row.formData.pushGoodsSKUList[scope.row.index||0].vipGoodsAdjustPrice?scope.row.formData.pushGoodsSKUList[scope.row.index||0].vipGoodsAdjustPrice+'元':'未调整'}}
              </div>
              <div v-if="!notMasterSystem">
                <div class="txt_left">
                  京东价：{{scope.row.formData&&scope.row.formData.pushGoodsSKUList[scope.row.index||0].configureVo?scope.row.formData.pushGoodsSKUList[scope.row.index||0].configureVo.jdPrice
                  !=0?scope.row.formData.pushGoodsSKUList[scope.row.index||0].configureVo.jdPrice:'暂无':'暂无'}}
                </div>
                <div class="txt_left">
                  天猫价格：{{scope.row.formData&&scope.row.formData.pushGoodsSKUList[scope.row.index||0].configureVo?scope.row.formData.pushGoodsSKUList[scope.row.index||0].configureVo.tmallPrice?scope.row.formData.pushGoodsSKUList[scope.row.index||0].configureVo.tmallPrice:'暂无':'暂无'}}
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="利润统计" align="center">
          <template slot-scope="scope">
            <div style="height: 300px;overflow-y: auto;" class="more txt_left">
              <div style="text-align: left" class="more txt_left">毛利润:8.8</div>
              <div style="text-align: left" class="more txt_left">毛利润率:44%</div>
              <div style="text-align: left" class="more txt_left">税率：1.13</div>
              <div style="text-align: left" class="more txt_left">税后毛利：7.67</div>
              <div style="text-align: left" class="more txt_left">税后毛利率：39%</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="集采" align="center">
          <template slot-scope="scope">
            <div v-if="notMasterSystem" class="more txt_left">
              <div class="more txt_left">
                批发价：{{scope.row.formData.pushGoodsSKUList[scope.row.index||0].volumePrices?scope.row.formData.pushGoodsSKUList[scope.row.index||0].volumePrices[0].volumeCost:'暂无'}}
              </div>
              <div class="more txt_left">
                起订量：{{scope.row.formData.pushGoodsSKUList[scope.row.index||0].volumePrices?scope.row.formData.pushGoodsSKUList[scope.row.index||0].volumePrices[0].volumeNumber:'暂无'}}
              </div>
              <div class="more txt_left">
                运费：
                {{
                scope.row.formData.pushGoodsSKUList[scope.row.index||0].volumePrices?
                scope.row.formData.pushGoodsSKUList[scope.row.index||0].volumePrices[0].volumeCarriage:'暂无'
                }}
              </div>
            </div>
            <div v-if="!notMasterSystem">
              <div v-for="(items,index) in scope.row.formData.pushGoodsSKUList[scope.row.index||0].volumePrices">
                  <div class="more txt_left"> 起订量{{index+1}}：{{items.volumeNumber}}</div>
                  <div class="more txt_left"> 批发价{{index+1}}：{{items.volumeCost}}</div>
                  <div class="more txt_left"> 运费{{index+1}}：{{items.volumeCarriage}}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="库存(pcs)" align="center">
          <template slot-scope="scope">
            <span class="goods_num">{{scope.row.formData.pushGoodsSKUList[scope.row.index||0].goodsNumber}}</span>
            <div
                    class="txt_left"
                    style="margin-top: 40px;"
            >库存预警：{{scope.row.formData.pushGoodsSKUList[scope.row.index||0].warnNumber}}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="商品来源" align="center">
          <template slot-scope="scope">
            {{['本地上传','接口对接','平台推送','京东采集','阿里集采','京东导入','天猫/淘宝采集','苏宁导入','网易严选导入'][scope.row.formData.sourceType||0]}}
          </template>
        </el-table-column>
        <el-table-column label="新增日期" align="center">
          <template slot-scope="scope">
            {{scope.row.formData.operatorTime}}
          </template>
        </el-table-column>
         <el-table-column label="进度表" align="center" width="200">
          <template slot-scope="scope">
            <div class="txt_left" v-for="item in scope.row.auditTasks" style="text-align: center">
              {{item.userName}}:{{item.taskResult==0?'待审核':''||item.taskResult==1?'已通过':''||item.taskResult==2?'未通过':''}}
            </div>
            <div @click="schedule(scope.row)" class="el-button el-button--primary el-button--small schedule">
              进度表
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
            <template slot-scope="scope">
               <div class="line-div small_top">
                    <div class="small-Idiv" @click="detail(scope.row.currentTaskId,scope.row)" >
                      <div class="i-div">
                        <img src="../../../common/images/icon/审核.png" alt class="operation_img" />
                      </div>
                      <span style="word-break: keep-all;margin-left: 3px;">审批</span>
                    </div>
                </div>
            </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="formList.pageNum"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="formList.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="formList.total"
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
            {{dialogContent}}
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 批量操作弹窗 -->
    </div>
    <!-- 审核 -->
    <el-dialog :title="title" :visible.sync="dialogVisible" width="30%">
      <el-form ref="form" :model="form" label-width="120px" size="small">
        <el-form-item label="审核类型:">
          <span>{{reviewDetails.changeRemark}}</span>
        </el-form-item>
        <el-form-item label="审核意见:">
          <el-radio v-model="radio" label="1">通过</el-radio>
          <el-radio v-model="radio" label="2">不通过</el-radio>
        </el-form-item>
        <el-form-item label="审核原因：">
          <el-input type="textarea" v-model="desc"></el-input>
        </el-form-item>
        <!--<el-form-item label="上级领导审核:" >
          <el-select v-model="form.people" placeholder="请选择">
            <el-option label="销售总监" value="0"></el-option>
            <el-option label="销售大佬" value="1"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="cansel" size="small">取 消</el-button>
        <el-button type="primary" @click="sure" size="small">确 定</el-button>
      </span>
    </el-dialog>

    <!--查看进度条-->
    <el-dialog
            title="进度表："
            :visible.sync="approvalsShow"
            width="40%"
    >
      <div class="div_big">
        <div class="big_div" v-for="(item,index) in auditTasks" :key="index">
          <div class="big_ball">
            <div class="ball">{{index+1}}</div>
          </div>
          <div class="bor_left">
            <div class="wihte_div"></div>
            <div :class="item.taskResult==0?'blur_div white_color':'blur_div'"></div>
            <div>
              <span>
              <span>{{index==0?'提交':'审核'}}</span>
                <span style="margin: 0 10px">部门：{{item.organizeName}}</span>
                <span style="margin: 0 10px">提交人：{{item.userName}}</span>
                <span style="margin: 0 10px">职位：{{item.roleName}} </span>
              </span>
              <span>
                <!--<el-button type="primary" size="mini" v-if="item.taskResult==0" style="position: absolute;margin-left: 15px;right: 0;margin-top: 10px">加急处理</el-button>-->
              </span>
            </div>
            <div class='div_time' v-if="item.createTime">{{item.createTime}}</div>
            <div style="margin-top: 10px">
              <span class="medium_span">审批结果:{{item.taskResult==0?'待审核':''||item.taskResult==1?'同意':''||item.taskResult==2?'不同意':''}}</span>
              <div style="margin-top:20px "  class="cai_span">
                  原因:{{item.taskComment?item.taskComment:'暂无'}}
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="approvalsShow=false" size="small">关 闭</el-button>
      </span>
    </el-dialog>

    <!--批量审核弹框-->
    <el-dialog :title="title" :visible.sync="dialogVisibleList" width="30%">
      <el-form ref="form" :model="form" label-width="120px" size="small">
        <el-form-item label="审核类型:">
          <span>商品推送审核</span>
        </el-form-item>
        <el-form-item label="审核意见:">
          <el-radio v-model="radio" label="1">通过</el-radio>
          <el-radio v-model="radio" label="2">不通过</el-radio>
        </el-form-item>
        <el-form-item label="审核原因：">
          <el-input type="textarea" v-model="desc"></el-input>
        </el-form-item>
        <!--<el-form-item label="上级领导审核:" >
          <el-select v-model="form.people" placeholder="请选择">
            <el-option label="销售总监" value="0"></el-option>
            <el-option label="销售大佬" value="1"></el-option>
          </el-select>
        </el-form-item>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="canselList" size="small">取 消</el-button>
        <el-button type="primary" @click="sureList" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import GoodsFitter from '../goods/goodsFitter'
import GoodsFitter from './goodsFitter'
import {throttleTipPop} from '@/utils/throttle'
import { queryProductReview ,
  associatedValues  ,
  deleteGoods ,
  findSceneBygoods ,
  changeState,
  ConfirmState ,
  getScene,
  auditRecords ,
  Areview ,
  deleteAudit,
  editReview,
  pushgoodsaudit,
  contractInformation,
    productDlivery,
    dictionaryTree   //字典树查询
} from '@/api/product/index'
import axios from 'axios'
import  Schedule from './schedule'
export default {
  data () {
    return {
        currencyUnit: '', //货币单位
      loading: false,  //批量审核
      loading1: false,  //立即发布
      dialogVisibleList:false,
      reviewDetails:"",
      num:'',
      auditId:'', //当前的id
      approvalsShow: false, // 审批流程弹窗
      auditTasks:'', //进度表数据
      desc:'', //审核原因
      formList:'',   //显示分页的数量
      isShowSchedule:false, //进度条
      dialogFormVisible:false,
      dialogDetailsVisible:false,
      titleDetails:'商品详情',
      dialogContent:'',
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
        createTimeEnd:'',
        createTimeStart:'',
        goodsName:'',
        pageNum: 1,
        pageSize: 10,
        pushStatus:'',
        projectId:'',
        agencyId:'',
      },
      dialog:{
        value1:'',
        value2:'',
        goodsName:'',
        pageNum:1,
        pageSize:10,
        pushStatus:'',
      },
      multipleSelection:[] ,
      checkList1:[],
      checkList2:[],
      checkedAll:'',
      checked:'',
      scenario:false, //审核记录
      tableData:[],
      getSceneArr:[],
      title:'审核',
      audit:{
        goodsData:'', // 选择商品的data
        auditType:'', //审核类型
        auditId:'', //审核记录ID
        auditRemark:'', //审核说明
        operationId:'', //审核的业务id
        processId:'', //流程ID，主键
      },
      delete_remark:'', // 移除的理由
      routerInfo:'',
      agencyProduct:'',
      publish: false
    }
  },
  computed: {
    notMasterSystem() {
      return this.$routerInfo.platformType != 0;
    }
  },
  created(){
    this.routerInfo = this.$routerInfo.platformType
  },
  mounted(){
    this._getGoodsList()
    // this._getScene();
  },
  methods: {
    //立即发布
    publishNow() {
      if (this.multipleSelection.length == 0) {
        return throttleTipPop(this, 'info', '请选择商品')
      }
      this.publish = true
      this.dialogVisibleList = true
    },
    //选择商品
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },

    //批量审核
    pushgoodsaudit(){
      if(this.multipleSelection.length==0){
        return throttleTipPop(this, 'info', '请选择商品')
      }
      this.publish = false
      // this.multipleSelection.forEach(item => {
      //   item.formData.pushGoodsSKUList.forEach(items => {
      //     items.volumePrices.forEach(itemList => {
      //       if (itemList.volumePrice < items.costPrice) {
      //         flag = true
      //       }
      //     })
      //   })
      // })
      // if (flag) {
      //   this.$confirm('您所选商品中，有异常价格的商品, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(async () => {
      //     this.dialogVisibleList = true
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '取消推送'
      //     });
      //   });
      // } else {
      //   this.dialogVisibleList = true
      // }
      this.dialogVisibleList = true
    },
    //批量审核确认
    async sureList(){
      this.dialogVisibleList = false
      let res
      const taskIds= []
      let pushIds = []
      this.multipleSelection.forEach(item=>{
        taskIds.push(item.currentTaskId)
        pushIds.push(item.formData.pushId)
      })
      const obj = {
        taskIds:taskIds.join(','),
        auditStatus:this.radio,
        verifyRemark:this.desc,
      }
      if (this.publish) {
        this.loading1 = true
        res = await pushgoodsaudit(obj)
        if (res.code === 200) {
          const result = await productDlivery(pushIds)
          if (result.code === 200) {
            this._getGoodsList()
            this.loading1 = false
            this.$message({
              message: '发布成功',
              type: 'success'
            });
          }
        }
      } else {
        this.loading = true
        res = await pushgoodsaudit(obj)
      if(res.code === 200 ) {
        this.loading = false
        this.$message({
          message: '审核成功',
          type: 'success'
        });
        this._getGoodsList()
      }
      }
      this.desc = ''
    },


    //批量审核取消
    canselList(){
      this.dialogVisibleList = false
    },
    //查看进度表
    schedule(val){
      this.approvalsShow = true
      this.auditTasks = val.auditTasks
    },
    //编辑
    editor(data) {
      if(data.isOnSale == 1 || data.reviewStatus == 0){
        let txt = ''
        data.isOnSale == 1?txt = '商品正在商场销售，先下架商品':''
        data.reviewStatus == 0?txt = '商品正在审核中':''
        throttleTipPop(this,'error',txt)
      }else{
         this.$router.push({ name: "Productaudit", query: { id: data.goodsId } });
      }
    },
    //审核弹框
    detail(val,val1){
      let flag = false
      val1.formData.pushGoodsSKUList.forEach(item => {
        item.volumePrices.forEach(items => {
          if (items.volumePrice < item.costPrice) {
            flag = true
          }
        })
      })
      // if (flag) {
      //   this.$confirm('此商品价格异常, 是否继续?', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(async () => {
      //     this.dialogVisible = true
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '取消推送'
      //     });
      //   });
      // } else {
      //   this.dialogVisible = true
      // }
      this.dialogVisible = true
      this.auditId = val
      this.reviewDetails = val1

    },

    //点击规格展示不同的内容
    Clicktent(val,data){
      this.num = val
      data.index = val;
      this.$set(this.$refs.pushGoodsList, "data", [...this.$refs.pushGoodsList.data])
    },

    //审核记录
    scenariofc(id){
      this.$router.push({name:'ProductAuditdetails' , query:{id:id}})
    },
    //上下架商品
    Stand(data){
      this.goodsData = data
      this.dialogVisibleaa = true
      data.isOnSale == 1 ? this.title='下架商品' : this.title='上架商品'
    },

    // 审核确定
    sure(){
      const obj={
        auditStatus:this.radio,
        taskId:this.auditId,
        verifyRemark:this.desc,
      }
      this.dialogVisible = false
      editReview(obj).then(res => {
        if(res.code == 200){
          this.dialogVisible = false
          this.$message({
            message: '审核成功',
            type: 'success'
          });
          this._getGoodsList()
          this.desc=''
        }
      })
    },
    //取消
    cansel(){
      this.dialogVisible = false
      this.desc=''
    },
    //编辑
    handleClick(){
      this.$router.push({name:'ProductAdd11'})
    },
    //审核
    attribute(id){
      this.dialogDetailsVisible = true
    //   this.goodsTypeId = id
    //   this.state = '2'
    //   let obj = {}
    //   obj.goodsId = id
    //   obj.code = 1
    //   auditRecords(obj).then(res => {
    //     if(res.code == 200){
    //       this.dialogVisible = true
    //       this.audit.auditType = res.data[0].auditType // 审核类型
    //       this.audit.auditId = res.data[0].auditId //审核记录ID
    //       this.audit.auditRemark = res.data[0].processList[0].auditRemark //审核说明
    //       this.audit.operationId = res.data[0].processList[0].operationId //审核的业务id
    //       this.audit.processId = res.data[0].processList[0].processId //流程ID，主键
    //     }
    //   })
    },
    //提交审核
    Confirm(){
      ConfirmState(this.state,this.goodsTypeId).then(res => {
        if(res.code == 200){
          this.$message({
          message:'审核成功',
          type: 'success'
        });
          this._getGoodsList()
          this.dialogVisible = false
        }
      })
    },
    _getGoodsList(){
      queryProductReview(this.form).then(res => {
        var that =this
        that.tableData = res.data.list
        this.formList = res.data
      })
    },

    async handleGetGoodsList(data,agencyProduct) {
        const name = '货币单位'
      this.form = data;
      this._getGoodsList()
        if (agencyProduct.currencyUnit) {
            const res = await dictionaryTree(name)
            if (res.code === 200) {
                res.data.forEach(item => {
                    if (item.dictionaryId == agencyProduct.currencyUnit) {
                        this.currencyUnit = item.dictionaryName
                    }
                })
            }
        }
      if (agencyProduct !== '') {
        this.agencyProduct = [agencyProduct]
      }
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
    GoodsFitter,
    Schedule
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
.schedule{
  margin-top: 20px;
  width: 80px;
  text-align: center;

}
.big_ball {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f0f3fa;
  line-height: 32px;
  text-align: center;
  z-index: 10;
  .ball {
    width: 22px;
    height: 22px;
    background: rgba(64, 158, 255, 1);
    border-radius: 50%;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 22px;
    text-align: center;
    z-index: 10;
    margin: 0 auto;
    margin-top: 5px;
  }
}

.big_div {
  display: flex;
  position: relative;
}
.cai_span {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #3C3C3C;
}
.shen_state {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(64, 158, 255, 1);
  position: relative;
  top: 5px;
}
.div_time {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(201, 201, 201, 1);
  margin-top: 5px;
}
.bor_left {
  padding-left: 34px;
  min-height: 175px;
  border-radius: 2px;
  position: relative;
  left: -18px;
  top: 1px;
}
.div_big {
  padding-left: 59px;
}
.shenwei_state {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #fe1b1b;
  position: relative;
  top: 5px;
}
.medium_span{
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  position: relative;
  top: 5px;
}
// .div_big .big_div:last-of-type .bor_left {
//   border: none;
// }
.red{
  color: red;
}
.wihte_div{
  position: absolute;
  width:14px;
  background:rgba(240,243,250,1);
  height: 100%;
  left: -5px;
}
.blur_div{
  position: absolute;
  left: -1px;
  height: 100%;
  width: 6px;
  background: #409eff;
}
.div_big .big_div:last-child .bor_left .wihte_div{
  display: none;
}
.div_big .big_div:last-child .bor_left .blur_div{
  display: none;
}
.div_big .big_div:last-child .bor_left{
  min-height: 80px;
}
.white_color{
  background: rgba(240,243,250,1);
}
.div_time {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(201, 201, 201, 1);
  margin-top: 5px;
}

.activit {
  background: red;
  color: white;
  font-weight: 800;
  text-align: center;
}
</style>
