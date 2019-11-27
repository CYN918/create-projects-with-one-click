<template>
  <div class="margin">
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="100px" size="small">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="商品分类：">
                      <div class="brandexamin">
                        <el-cascader
                            collapse-tags
                            :options="options"
                            @change="categoryfunc"
                            :show-all-levels="false"
                            :props="{ multiple: true, checkStrictly: true}"
                            clearable
                          ></el-cascader>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="审核状态：">
                      <el-col :span="23">
                        <el-select
                          class="el-select-width"
                          v-model="form.auditStatus"
                          placeholder="请选择"
                          clearable
                          size="medium"
                          @change="_getAllauditrecord(true)"
                        >
                          <el-option label="待审核" value="0"></el-option>
                          <el-option label="审核通过" value="1"></el-option>
                          <el-option label="审核未通过" value="2"></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="供应商名称：">
                      <el-col :span="23">
                        <el-input
                          v-model="form.supplierName"
                          size="medium"
                          clearable
                          placeholder="请输入供应商名称"
                        ></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="5">
                  <el-col>
                    <el-form-item label="采销名称：">
                      <el-col :span="23">
                        <el-input
                          v-model="form.sysUserName"
                          size="medium"
                          clearable
                          placeholder="请输入采销名称"
                        ></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="1" class="btn_right">
                  <el-button type="primary" size="small" @click="_getAllauditrecord(true)">查询</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mcard">
      <el-row class="operate mbottom">
        <el-col :span="21">
          <el-button type="primary" size="small" @click="brandApplyFunc" v-permit="'brand:apply'">品牌开通申请</el-button>
        </el-col>
        <el-col :span="3"></el-col>
      </el-row>
      <el-table :data="tableData" border style="width: 100%" stripe>
        <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
        <el-table-column prop="auditStatus" label="状态" align="center">
          <template
            slot-scope="scope"
          >{{scope.row.auditStatus == 0?'待审核':scope.row.auditStatus == 1?'审核通过':scope.row.auditStatus == 2?'审核未通过':''}}</template>
        </el-table-column>
        <el-table-column prop="supplierName" label="供应商信息" align="center" width="200">
          <template slot-scope="scope">
            <div class="txt_left">用户名：{{scope.row.supplierName}}</div>
            <div class="txt_left">账号：{{scope.row.sysuserName}}</div>
            <div class="txt_left">性质：{{scope.row.supplierNature}}</div>
            <div class="txt_left">管理员：{{scope.row.adminName}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="supplierCategory" label="入驻品牌" align="center">
          <template slot-scope="scope">
            <div class="txt_left">{{scope.row.brandName}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="supplierCategory" label="品类/采销" align="center">
          <template slot-scope="scope">
            <div
              v-for="item in scope.row.catSysuserNames"
              :key="item.catName"
            >{{item.catName}}/{{item.sysuserName}}</div>
          </template>
        </el-table-column>
        <!--<el-table-column  prop="supplierCategory"  label="一级品类" align="center"></el-table-column>
        <el-table-column  prop="supplierCategory"  label="二级品类" align="center"></el-table-column>
        <el-table-column  prop="supplierCategory"  label="三级品类" align="center"></el-table-column>-->
        <el-table-column label="注册证" align="center" width="140">
          <template slot-scope="scope">
            <img :src="scope.row.trademarkUrl" alt class="img_size" @click="open(scope.row.trademarkUrl,'注册证')"/>
            <span>{{scope.row.trademarkTimeStart.slice(0,10)}}至{{scope.row.trademarkTimeEnd.slice(0,10)}}</span>
            <div>
              <el-button type="primary" size="small" @click="open(scope.row.trademarkUrl,'注册证')">点击查看大图</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="品牌授权书" align="center" width="140">
          <template slot-scope="scope">
            <img :src="scope.row.brandAuthUrl" alt class="img_size" @click="open(scope.row.brandAuthUrl,'品牌授权书')"/>
            <span>{{scope.row.authTimeStart.slice(0,10)}}至{{scope.row.authTimeEnd.slice(0,10)}}</span>
            <div>
              <el-button type="primary" size="small" @click="open(scope.row.brandAuthUrl,'品牌授权书')">点击查看大图</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="一级授权链" align="center" width="140">
          <template slot-scope="scope">
            <img :src="scope.row.firstAuthChain" alt class="img_size" @click="open(scope.row.firstAuthChain,'一级授权链')"/>
            <span>{{scope.row.authChainTimeStart.slice(0,10)}}至{{scope.row.authChainTimeEnd.slice(0,10)}}</span>
            <div>
              <el-button type="primary" size="small" @click="open(scope.row.firstAuthChain,'一级授权链')">点击查看大图</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="二级授权链" align="center" width="140">
          <template slot-scope="scope">
            <div  v-if="scope.row.secondAuthChain">
              <img :src="scope.row.secondAuthChain" alt class="img_size"
                   @click="open(scope.row.secondAuthChain,'二级授权链')"/>
              <span>{{scope.row.authChainTimeStart.slice(0,10)}}至{{scope.row.authChainTimeEnd.slice(0,10)}}</span>
              <div>
                <el-button type="primary" size="small" @click="open(scope.row.secondAuthChain,'二级授权链')">点击查看大图
                </el-button>
              </div>
            </div>
            <div v-else>
              暂无
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="三级授权链" align="center" width="140">
          <template slot-scope="scope">
            <div  v-if="scope.row.thirdlyAuthChain">
              <img :src="scope.row.thirdlyAuthChain" alt class="img_size"
                   @click="open(scope.row.thirdlyAuthChain,'三级授权链')"/>
              <span>{{scope.row.authChainTimeStart.slice(0,10)}}至{{scope.row.authChainTimeEnd.slice(0,10)}}</span>
              <div>
                <el-button
                        type="primary"
                        size="small"
                        @click="open(scope.row.thirdlyAuthChain,'三级授权链')"
                >点击查看大图</el-button>
              </div>
            </div>
            <div v-else>
              暂无
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" fixed="right" width="150">
          <template slot-scope="scope">
            <div class="line-div">
              <div
                class="small-Idiv"
                @click="_throughSupplieraudit(scope.row)"
                v-if="scope.row.auditStatus==0"
                v-permit="'brand:check'"
              >
                <div class="i-div">
                  <img src="../../common/images/icon/审核.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">审核</span>
              </div>
              <div
                class="small-Idiv"
                @click="scenariofc(scope.row)"
                v-permit="'brand:details'"
              >
                <div class="i-div">
                  <img src="../../common/images/icon/查看详情.png" alt class="operation_img" />
                </div>
                <span style="word-break: keep-all;">详情</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="form.current_page"
          :page-sizes="[10, 30, 50, 100]"
          :page-size="form.page_size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="form.total_count"
        ></el-pagination>
      </div>
      <!-- 新增品牌 -->
      <el-dialog title="新增品牌" :visible.sync="addBrand" width="40%">
        <el-form :model="addBrangd" ref="submit" :rules="rules" label-width="100px">
          <el-form-item label="品牌名称：" prop="name">
            <el-input placeholder="请输入品牌名称" v-model="addBrangd.name"></el-input>
          </el-form-item>
          <el-form-item label="品牌网址：" prop>
            <el-input class v-model="addBrangd.url"></el-input>
          </el-form-item>
          <el-form-item prop="brandLogo" label="品牌LOGO:" class>
            <el-upload
              class="avatar-uploader"
              :action="action"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
            >
              <img v-if="addBrangd.logo" :src="addBrangd.logo " class="avatar imgbig" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="品牌banner：" prop="brandBanner">
            <el-upload
              class="avatar-uploader"
              :action="action"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
            >
              <img v-if="addBrangd.banner" :src="addBrangd.banner" class="avatar imgbig" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="品牌描述：" prop="brandDesc">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="addBrangd.textarea"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="addBrand = false" size="small">取 消</el-button>
          <el-button type="primary" @click="addBrandFunc('submit')" size="small">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 品牌开通申请 -->
      <div class="spicallist">
        <el-dialog title="品牌开通申请" :visible.sync="brandApply" width="60%" center>
          <div class="scssfiter">
            <el-form :model="brand" :rules="brandrules"  ref="brand" label-width="110px">
              <div class="mbottom">
                <div class="goods-fitter">
                  <div class="search-wrapper">
                    <el-row>
                      <el-col :span="8">
                        <el-form-item label="品牌：" prop="branId">
                          <el-select
                            v-model="brand.branId"
                            filterable
                            remote
                            :remote-method="remoteMethod"
                            clearable
                            placeholder="请选择品牌全名"
                            style="width:300px;height:35px;line-height:35px"
                          >
                            <el-option
                              v-for="item in brandArr"
                              :key="item.brandId"
                              :label="item.brandName"
                              :value="item.brandId"
                            ></el-option>
                          </el-select>
                          <div class="tishi">
                            <img src="../../common/images/提示@2x.png" alt class="opera_img" />
                            <span class="pinpai">品牌请通过模糊匹配，从下拉的预选单里选择</span>
                          </div>
                        </el-form-item>
                      </el-col>
                      <el-col :span="8">
                        <el-form-item  label="供应商：">
                          <el-select v-model="brand.supplierId" filterable placeholder="请选择">
                            <el-option
                              v-for="item in supplierArr"
                              :key="item.supplierId"
                              :label="item.supplierName"
                              :value="item.supplierId"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :span="2">
                        <el-form-item>
                          <el-button type="primary" size="small" @click="addBrandShow">新增品牌</el-button>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="10">
                        <el-form-item style="margin-top:25px">
                          <el-button type="primary" size="medium" @click="addNewcetogry">添加品牌入驻分类</el-button>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row v-for="(item,index) in classification" :key="index">
                      <el-col :span="10">
                        <div class="brandexamin1">
                          <el-form-item label="入驻分类：" style="line-height: 32px;">
                            <treeselect
                              style="width:300px"
                              :options="options"
                              placeholder="请选择商品分类"
                              v-model="item.carId"
                              :clearable="false"
                              @input="category($event,index)"
                            />
                          </el-form-item>
                        </div>
                      </el-col>
                      <el-col :span="10">
                        <el-form-item label="采销人员：">
                          <el-input v-model="item.userName" disabled placeholder="请选择商品分类"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </div>
              <div class="mbottom">
                <div class="goods-fitter">
                  <div class="search-wrapper">
                    <div class="tabs_div">
                      <span :class="tabsindex == 0?'check_index':''" @click="tabsindexchange(0)">品牌/商标</span>
                      <span :class="tabsindex == 1?'check_index':''" @click="tabsindexchange(1)">完整授权链</span>
                    </div>
                    <div class="mbottom" v-show="tabsindex == 0">
                      <div class="goods-fitter">
                        <div class="search-wrapper">
                          <el-row>
                            <el-col :span="10">
                              <el-form-item prop="brandImg" label="品牌授权书:" ref="brandImg">
                                <el-upload
                                  class="avatar-uploader"
                                  :action="action"
                                  :show-file-list="false"
                                  :on-success="brandUpload"
                                >
                                  <img v-if="brand.brandImg" :src="brand.brandImg" class="avatar" />
                                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                              </el-form-item>
                            </el-col>
                            <el-col :span="10">
                              <el-form-item label="商标注册证:" prop="trademark" ref="trademark">
                                <el-upload
                                  class="avatar-uploader"
                                  :action="action"
                                  :show-file-list="false"
                                  :on-success="trademarkUpload"
                                >
                                  <img v-if="brand.trademark" :src="brand.trademark" class="avatar" />
                                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="10">
                              <el-form-item label="授权书有效期:" prop="brandTime" ref="brandTime">
                                <el-date-picker
                                  style="width:250px"
                                  type="daterange"
                                  valueFormat="yyyy-MM-dd HH:mm:ss"
                                  v-model="brand.brandTime"
                                  format="yyyy-MM-dd"
                                  range-separator="-"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                ></el-date-picker>
                              </el-form-item>
                            </el-col>
                            <el-col :span="10">
                              <el-form-item label="商标有效期:" prop="trademarkTime"  ref="trademarkTime">
                                <el-date-picker
                                  style="width:250px"
                                  type="daterange"
                                  valueFormat="yyyy-MM-dd HH:mm:ss"
                                  v-model="brand.trademarkTime"
                                  range-separator="-"
                                  format="yyyy-MM-dd"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                ></el-date-picker>
                              </el-form-item>
                            </el-col>
                          </el-row>
                        </div>
                      </div>
                    </div>
                    <div class="mbottom" v-show="tabsindex == 1">
                      <div class="goods-fitter">
                        <div class="search-wrapper">
                          <el-row>
                            <el-col :span="7">
                              <el-form-item prop="chainOne" label="一级授权链:" ref="chainOne">
                                <el-upload
                                  class="avatar-uploader"
                                  :action="action"
                                  :show-file-list="false"
                                  :on-success="Authorization1"
                                >
                                  <img v-if="brand.chainOne" :src="brand.chainOne" class="avatar" />
                                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                              </el-form-item>
                            </el-col>
                            <el-col :span="7">
                              <el-form-item label="二级授权链:" prop>
                                <el-upload
                                  class="avatar-uploader"
                                  :action="action"
                                  :show-file-list="false"
                                  :on-success="Authorization2"
                                >
                                  <img v-if="brand.chainTwo" :src="brand.chainTwo" class="avatar" />
                                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                              </el-form-item>
                            </el-col>
                            <el-col :span="7">
                              <el-form-item label="三级授权链:" prop>
                                <el-upload
                                  class="avatar-uploader"
                                  :action="action"
                                  :show-file-list="false"
                                  :on-success="Authorization3"
                                >
                                  <img
                                    v-if="brand.chainThree"
                                    :src="brand.chainThree"
                                    class="avatar"
                                  />
                                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>
                              </el-form-item>
                            </el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="10">
                              <el-form-item label="授权链有效期:" prop="licenseTime" ref="licenseTime">
                                <el-date-picker
                                  style="width:250px"
                                  type="daterange"
                                  valueFormat="yyyy-MM-dd HH:mm:ss"
                                  format="yyyy-MM-dd"
                                  v-model="brand.licenseTime"
                                  range-separator="-"
                                  start-placeholder="开始日期"
                                  end-placeholder="结束日期"
                                ></el-date-picker>
                              </el-form-item>
                            </el-col>
                          </el-row>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </el-form>
            <div slot="footer" class="dialog-footer11" style="margin-top:-15px">
              <el-button type="danger" @click="brandApply = false" size="small">取 消</el-button>
              <el-button type="primary" @click="brandApplyAdd" size="small">确 定</el-button>
            </div>
          </div>
        </el-dialog>
      </div>
      <!-- 品牌开通申请 -->

      <!-- 操作按钮弹框 -->
      <el-dialog title="品牌审核" :visible.sync="dialogVisible" width="30%">
        <el-form :model="form" label-width="100px">
          <el-form-item label="审核状态:">
            <el-radio v-model="aduitObj.processStatus" label="1">通过</el-radio>
            <el-radio v-model="aduitObj.processStatus" label="2">不通过</el-radio>
          </el-form-item>
          <el-form-item label="原因:">
            <el-input
              type="textarea"
              v-model="aduitObj.auditRemark"
              :rows="2"
              placeholder="请输入审核原因"
            ></el-input>
          </el-form-item>
          <el-form-item label="提交审核：">
            <el-checkbox v-model="aduitObj.isLevel">总经理审核</el-checkbox>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="_throughSupplieraudit('',true)" size="small">确 定</el-button>
        </span>
      </el-dialog>

      <!-- 点击查看大图弹窗 -->
      <el-dialog :title="textName" :visible.sync="picture" width="40%">
        <span>
          <div style="width: 100%;height: 578px;overflow: auto;">
            <img :src="item" alt v-for="item in img" :key="item" class="big_img" />
          </div>
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="picture = false" size="small">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
// import the component
import Treeselect from "@riophae/vue-treeselect";
// import the styles
import "@riophae/vue-treeselect/dist/vue-treeselect.css";
import {
  getAllauditrecord,
  addNewBrand,
  queryBrandAudit,
  applyBrandAudit
} from "@/api/supplier/index";
import {
  getBrand,
  addBrand,
  getTreecatagory,
  getBygooidMsg
} from "@/api/product/index";
import { throttleTipPop } from '@/utils/throttle'
import { getInformation } from "@/api/supplier/index";

export default {
  data() {
    return {
      textName: "",
      supplierArr:[], // 供应商数组
      addBrangd: {
        //新增品牌数据
        name: "", //名称
        url: "", // 网址
        banner: "", // banner图
        logo: "", // logo
        textarea: "" // 描述
      },
      brand: {
        branId: "", //品牌id
        brandImg: "", // 品牌授权书图片
        trademark: "", //商标图片
        brandTime: "", //品牌授权书有效期
        trademarkTime: "", //商标有效期
        chainOne: "", // 一级授权链
        chainTwo: "", // 二级授权链
        chainThree: "", // 三级授权链
        licenseTime: "" // 授权链有效期
      },
      rules: {
        name: [{ required: true, message: "请输入品牌名称", trigger: "blur" }],
        trademarkTime: [
          // { type: 'date', required: true, message: '请选择商品有效期', trigger: 'change' }
        ]
      },
      brandrules: {
        branId: [{ required: true, message: "请选择品牌", trigger: "change" }],
        brandImg: [
          { required: true, message: "请上传品牌授权书图片", trigger: "change" }
        ],
        trademark: [
          { required: true, message: "请上传商标图片", trigger: "change" }
        ],
        brandTime: [
          {
            required: true,
            message: "请选择品牌授权书有效期",
            trigger: "change"
          }
        ],
        trademarkTime: [
          {
            required: true,
            message: "请选择商标有效期",
            trigger: "change"
          }
        ],
        chainOne: [
          { required: true, message: "请上传一级授权链", trigger: "change" }
        ],
        licenseTime: [
          {
            required: true,
            message: "请选择授权链有效期",
            trigger: "change"
          }
        ],
      },
      action: "",
      value: "",
      checked: "",
      arrcatId:[],
      brandArr: [], // 品牌数组
      aduitObj: {
        brandAuditId: "", // 品牌开通审核的id
        auditId: "", // 审核记录ID
        operationId: "", // 审核的业务id
        processId: "", //流程ID，主键
        isLevel: "", // 上级领导审核
        processStatus: "1", // 审核状态
        auditRemark: "" //审核理由
      },
      form: {
        current_page: 1,
        page_size: 10,
        total_count: 0,
        auditStatus: "", // 审核状态
        sysUserName: "", //采销名称
        catId: null, //分类id
        supplierName: "", //供应商名称
        supplierId: "",
        reason: "",
        Status: "1",
        radio: 1,
        auditId: "",
        user: "" //分配的采购员
      },
      userOptions: [],
      classification: [
        {
          carId: null, //分类id
          AdoptpinArr: [], //采销人员数组
          userName: "", //采销人员
          sysuserId: "" //采销人员id
        }
      ], //分类展示对应数组
      options: [], //分类绑定的数组
      state: "2", //审核状态
      addBrand: false, //新增品牌
      brandApply: false, //品牌开通申请
      blacklistState: false, //黑名单
      dialogVisible: false, //操作弹窗
      picture: false, //查看大图弹窗
      placeholder: "请输入审核通过理由",
      tableData: [],
      img: [],
      tabsindex: 0
    };
  },
  mounted() {
    this.startLoading() //加载中loading
    this._getAllauditrecord();
    this._getBrand();
    this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
    this._getTreecatagory();
    this.getInformation()
  },
  methods: {
    tabsindexchange(val){
      this.tabsindex = val
      if(val === 0){
        this.$refs.chainOne.clearValidate();
        this.$refs.licenseTime.clearValidate();
      }else{
        this.$refs.brandImg.clearValidate();
        this.$refs.trademark.clearValidate();
        this.$refs.brandTime.clearValidate();
        this.$refs.trademarkTime.clearValidate();
      }
    },
    async getInformation(){
      const { data } = await getInformation()
      this.supplierArr = data.list;
    },
    scenariofc(data) {
      this.$router.push({
        name: "branddetails",
        query: { id: data.brandAuditId }
      });
    },
    // 新增品牌开通申请
    brandApplyAdd() {
      this.$refs.brand.validate((valid) => {
        if (valid) {
          const arr = [];
          this.classification.forEach(item => {
            if(item.sysuserId != ''){
              arr.push({
              catId: item.carId,
              sysuserId: item.sysuserId
            });
            }
          });
          addNewBrand(this.brand, arr).then(res => {
            if (res.code == 200) {
              this.$message({
                message: res.message,
                type: "success"
              });
              this._getAllauditrecord();
              this.brandApply = false;
            }
          });
        } else {
          throttleTipPop(this,'error','请填写完成信息')
          return false;
        }
      });
    },
    // 选择完商品分类后，显示对应的采销人员
    category(val, index) {
      getBygooidMsg(val).then(res => {
        this.classification[index].userName = res.data.userName;
        this.classification[index].sysuserId = res.data.sysuserId;
      });
    },
    //品牌开通分类树形下拉
    _getTreecatagory() {
      let obj = {};
      obj.type = "SELECT";
      obj.id = 0;
      getTreecatagory().then(res => {
        this.transleteData(res.data, this.options);
        this.IterationDelateMenuChildren(this.options);
      });
    },
    //添加新分类
    addNewcetogry() {
      this.classification.push({
        carId: null, //分类id
        AdoptpinArr: [], //采销人员数组
        userName: "", //采销人员
        sysuserId: "" //采销人员id
      });
    },
    // 品牌开通申请按钮
    brandApplyFunc() {
      this.classification = [
        {
          carId: null, //分类id
          AdoptpinArr: [], //采销人员数组
          userName: "", //采销人员
          sysuserId: "" //采销人员id
        }
      ];
      this.brandApply = true;
    },
    //新增品牌按钮
    addBrandShow() {
      this.addBrand = true;
      this.addBrangd.name = "";
      this.addBrangd.url = "";
      this.addBrangd.banner = "";
      this.addBrangd.logo = "";
      this.addBrangd.textarea = "";
    },
    // 添加品牌确定按钮
    addBrandFunc(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          addBrand(this.addBrangd).then(res => {
            if (res.code == 200) {
              this.$message({
                message: res.message,
                type: "success"
              });
              this._getBrand();
              this.addBrand = false;
            }
          });
        } else {
          return false;
        }
      });
    },
    transleteData(data, arr) {
      data.forEach(item => {
        const msg = {
          id: item.catId,
          label: item.catName,
          value: item.catId,
          children: item.children ? [] : null,
          isLeaf: item.children ? false : true
        };
        if (item.children && item.children.length > 0) {
          this.transleteData(item.children, msg.children);
        }
        arr.push(msg);
      });
      return arr;
    },
    IterationDelateMenuChildren(arr) {
      if (arr.length) {
        for (let i in arr) {
          if (arr[i].children.length) {
            this.IterationDelateMenuChildren(arr[i].children);
          } else {
            delete arr[i].children;
          }
        }
      }
      return arr;
    },
    //查询列表
    _getAllauditrecord() {
      getAllauditrecord(this.form,this.arrcatId).then(res => {
        this.tableData = res.data.pageList;
        this.form.total_count = res.data.count;
        this.endLoading() //取消加载中loading
      });
    },
    // 品牌下拉
    _getBrand() {
      let obj = {};
      obj.pageIndex = 1;
      obj.pageSize = 50;
      getBrand(obj).then(res => {
        this.brandArr = res.data.pageList;
      });
    },
    remoteMethod(val) {
      if (val) {
        let obj = {};
        obj.pageIndex = 1;
        obj.pageSize = 0;
        obj.keyWord = val;
        getBrand(obj).then(res => {
          this.brandArr = res.data.pageList;
        });
      } else {
        let obj = {};
        obj.pageIndex = 1;
        obj.pageSize = 50;
        getBrand(obj).then(res => {
          this.brandArr = res.data.pageList;
        });
      }
    },
    add() {
      this.$router.push({ name: "SupplierAddfiles3" });
    },
    detail(id, state) {
      this.$router.push({
        name: "SupplierAdddetail",
        query: { id: id, state: state }
      });
    },
    editor(id, state) {
      this.$router.push({
        name: "SupplierAddfiles3",
        query: { id: id, state: state }
      });
    },
    //黑名单
    blacklist(id) {
      this.blacklistState = true;
      this.supplierId = id;
      this.reason = "";
      this.title = "黑名单";
      this.placeholder = "请输入处理原因";
      this.state = 1;
    },
    //点击打开图片
    open(url, name) {
      this.img = [];
      this.picture = true;
      this.img.push(url);
      this.textName = name
    },
    //取消删除
    cancel() {
      this.form.supplierId = "";
      this.form.reason = "";
      this.form.radio = 1;
      this.dialogVisible = false;
    },
    //确定按钮
    sureDelete() {
      if (this.form.radio !== 3) {
        throughSupplieraudit(this.form, this.form.radio).then(res => {
          if (res.code == 200) {
            bindSupplieruser(this.form.user, this.form.supplierId).then(
              res => {}
            );
            this._getAllauditrecord();
            this.form.supplierId = "";
            this.form.reason = "";
            this.form.radio = 1;
            this.dialogVisible = false;
            this.$message({
              message: res.message,
              type: "success"
            });
          } else {
            this.$message(res.message);
          }
        });
      } else {
        deleteantarky(this.form).then(res => {
          if (res.code == 200) {
            this.dialogVisible = false;
            this._getAllauditrecord();
            this.form.supplierId = "";
            this.form.reason = "";
          }
          this.$message(res.message);
        });
      }
    },
    handleSizeChange(val) {
      this.form.page_size = val;
      this._getAllauditrecord();
    },
    handleCurrentChange(val) {
      this.form.current_page = val;
      this._getAllauditrecord();
    },
    choose(val) {
      if (val == 1) {
        this.placeholder = "请输入审核通过理由";
      } else if (val == 2) {
        this.placeholder = "请输入审核不通过理由";
      }
      this.form.radio = val;
    },
    handleAvatarSuccess(res) {
      this.addBrangd.logo = res.data.domain + res.data.filePath;
    },
    handleAvatarSuccess1(res) {
      this.addBrangd.banner = res.data.domain + res.data.filePath;
    },
    //品牌授权书上传
    brandUpload(res) {
      this.$refs.brandImg.clearValidate();
      this.brand.brandImg = res.data.domain + res.data.filePath;
    },
    //商标上传
    trademarkUpload(res) {
      this.$refs.trademark.clearValidate();
      this.brand.trademark = res.data.domain + res.data.filePath;
    },
    //一级授权链
    Authorization1(res) {
      this.$refs.chainOne.clearValidate();
      this.brand.chainOne = res.data.domain + res.data.filePath;
    },
    //二级授权链
    Authorization2(res) {
      this.brand.chainTwo = res.data.domain + res.data.filePath;
    },
    Authorization3(res) {
      this.brand.chainThree = res.data.domain + res.data.filePath;
    },
    //三级授权链
    //数据转化为树形结构
    transleteData(data, arr) {
      data.forEach(item => {
        const msg = {
          id: item.catId,
          label: item.catName,
          value: item.catId,
          children: item.children ? [] : null,
          isLeaf: item.children ? false : true
        };
        if (item.children && item.children.length > 0) {
          this.transleteData(item.children, msg.children);
        }
        arr.push(msg);
      });
      return arr;
    },
    //删除多余children数组
    IterationDelateMenuChildren(arr) {
      if (arr.length) {
        for (let i in arr) {
          if (arr[i].children.length) {
            this.IterationDelateMenuChildren(arr[i].children);
          } else {
            delete arr[i].children;
          }
        }
      }
    },
    handleAvatarSuccess2() {},
    handleClick() {},
    _throughSupplieraudit(data, type) {
      if (data) {
        this.aduitObj.brandAuditId = data.brandAuditId;
        queryBrandAudit(data.brandAuditId).then(res => {
          if (res.code == 200) {
            this.dialogVisible = true;
            this.aduitObj.auditId = res.data.auditId;
            this.aduitObj.operationId = res.data.operationId;
            this.aduitObj.processId = res.data.processId;
          }
        });
      }
      if (type) {
        let obj = {};
        obj.auditId = this.aduitObj.brandAuditId;
        obj.operationId = this.aduitObj.operationId;
        obj.processId = this.aduitObj.processId;
        obj.isLevel = this.aduitObj.isLevel ? 1 : "";
        obj.processStatus = this.aduitObj.processStatus;
        obj.auditRemark = this.aduitObj.auditRemark;
        applyBrandAudit(obj).then(res => {
          if (res.code == 200) {
            this.$message({
              message: res.message,
              type: "success"
            });
            this.dialogVisible = false;
            this._getAllauditrecord();
          }
        });
      }
    },
    categoryfunc(val) {
      const arr = []
      for(let i=0;i<val.length;i++){
        val[i].forEach(item => {
          arr.push(item)
        })
      }
      this.arrcatId = arr
      this._getAllauditrecord(true)
    },
  },
  components: {
    Treeselect
  }
};
</script>

<style lang="scss" scoped>
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
    padding-bottom: 0px;
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
    max-width: 240px;
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
  .btn-toggle {
    margin-left: 10px;
    font-size: 14px;
    color: $themeColor;
    cursor: pointer;
  }
}
.goods-list-wrapper {
  margin-top: 20px;
}
.el-transfer-panel__header {
  background: $themeColor;
  color: #fff;
}
.item {
  line-height: 1.5;
  padding: 8px 10px;
  cursor: pointer;
  &:hover {
    color: $themeColor;
  }
  &.active {
    background: #c6e2ff;
    color: #fff;
  }
}
.image {
  cursor: pointer;
}
.item-name {
  cursor: pointer;
  &:hover {
    color: $themeColor;
  }
}
.el-icon-arrow-right {
  margin: 0 20px;
}
.store {
  width: 310px;
}
.red {
  color: $themeSubColor;
}
.transfer-wrapper {
  text-align: center;
}
.panel-wrapper {
  text-align: left;
  margin: 0;
  padding: 6px 0;
  list-style: none;
  height: 246px;
  overflow: auto;
  box-sizing: border-box;
}
.dialog-footer {
  margin-top: 20px;
  text-align: right;
}
.detail {
  font-size: 14px;
  color: #606266;
}

.small-Idiv {
  width: 32px;
  span {
    margin-top: 3px;
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
  justify-content: space-around;
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
.img_size {
  width: 118px;
  height: 170px;
}
.small_top {
  margin-top: 10px;
}
.distribution {
  display: flex;
  align-items: center;
  position: relative;
  top: -12px;
}
.big_img {
  width: 100%;
  height: 546px;
}
.tishi {
  margin-top: 8px;
  position: absolute;
  width: 300%;
}
.pinpai {
  margin-left: 5px;
}
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
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.el-upload--picture-card {
  font-size: 28px;
  color: #8c939d;
  width: 148px;
  height: 148px;
  line-height: 148px;
  text-align: center;
}
.opera_img {
  position: relative;
  top: 4px;
  margin-top: 8px;
}
.dialog-footer11 {
  text-align: center;
  padding: 20px 0;
}
.scssfiter {
  background: #ebf4fe;
}
.imgbig {
  width: 148px;
  height: 148px;
}
.el-upload {
  height: 148px;
}
.tabs_div span {
  width: 148px;
  height: 53px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.tabs_div {
  display: flex;
}
.check_index {
  border: 1px solid rgba(215, 224, 241, 1);
  border-bottom: none;
  position: relative;
  top: 1px;
  background: white;
}
.avatar {
  width: 148px;
  height: 148px;
}
.el-input--small .el-input__inner {
  height: 36px;
  line-height: 36px;
}

/deep/ .el-dialog--center .el-dialog__body {
  padding: 0;
}

</style>
