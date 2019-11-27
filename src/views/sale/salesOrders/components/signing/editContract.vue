<template>
  <div id="editContract">
    <el-dialog width="72%" :visible.sync="editVisible" :before-close="createClosing">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">编辑销售合同</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form
            ref="infoForm"
            :model="detailData1"
            :rules="rules"
            label-width="150px"
            size="small"
          >
            <div class="search-wrapper">
              <div class="mbottom">
                <h4 class="title1">合同信息</h4>
              </div>
              <div class="search-base">
                <el-row>
                  <el-col :span="7">
                    <el-col>
                      <el-form-item label="合同类型：">
                        <el-col :span="19">
                          <span>销售订单合同</span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="合同编号：">
                      <el-col :span="21">{{detailData1.contractNo}}</el-col>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="关联业务单号：">
                      <el-col :span="21">{{detailData1.businessNo}}</el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="甲方：" prop="acompanyName">
                        <el-col :span="19">
                          <el-input v-model="detailData1.acompanyName">
                            <el-button slot="append" @click="partyChoose()" size="mini">选择</el-button>
                          </el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="乙方：">
                      <el-col :span="19">
                        <el-input v-model="detailData1.bcompanyName"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="联系人：" prop="acontact">
                        <el-col :span="19">
                          <el-input v-model="detailData1.acontact"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="联系人：">
                      <el-col :span="19">
                        <el-input v-model="detailData1.bcontact"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="联系电话：" prop="atel">
                        <el-col :span="19">
                          <el-input v-model="detailData1.atel"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="联系电话：">
                      <el-col :span="19">
                        <el-input v-model="detailData1.btel"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="传真：">
                        <el-col :span="19">
                          <el-input v-model="detailData1.afax"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="传真：">
                      <el-col :span="19">
                        <el-input v-model="detailData1.bfax"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="邮箱：">
                        <el-col :span="19">
                          <el-input v-model="detailData1.aemail"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="邮箱：">
                      <el-col :span="19">
                        <el-input v-model="detailData1.bemail"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="地址：" prop="aaddress">
                        <el-col :span="19">
                          <el-input v-model="detailData1.aaddress"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="地址：">
                      <el-col :span="19">
                        <el-input v-model="detailData1.baddress"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mail-fitter" style="margin-top:20px;margin-bottom:20px;">
        <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px">
          <div class="mail-wrapper">
            <h4 class="title1">产品清单</h4>
            <div class="search-base">
              <div class="mbottom">
                <div class="goods-fitter">
                  <div class="mcard" style="padding-bottom:0">
                    <el-table
                      :data="detailData1.goodsDetailListVo"
                      border
                      style="width: 100%"
                      stripe
                    >
                      <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                      <el-table-column prop="customerName" label="图样" align="center" width="100">
                        <template slot-scope="scope">
                          <img
                            :src="scope.row.goodsImgUrl"
                            class="showImg"
                            alt
                            v-if="scope.row.goodsImgUrl"
                          />
                          <img
                            src="@/common/images/缺省页.jpg"
                            class="showImg"
                            alt
                            v-if="!scope.row.goodsImgUrl"
                          />
                        </template>
                      </el-table-column>
                      <el-table-column prop="customerType" label="产品名称" align="center">
                        <template slot-scope="scope">{{scope.row.goodsName}}</template>
                      </el-table-column>
                      <el-table-column prop="commonContactName" label="型号" align="center">
                        <template slot-scope="scope">{{scope.row.goodsSn}}</template>
                      </el-table-column>
                      <el-table-column prop="commonContactDept" label="税率" align="center">
                        <template slot-scope="scope">{{scope.row.taxRate}}</template>
                      </el-table-column>
                      <el-table-column prop="commonContactDept" label="数量" align="center">
                        <template slot-scope="scope">{{scope.row.goodsCount}}</template>
                      </el-table-column>
                      <el-table-column prop="commonContactDept" label="不含税单价" align="center">
                        <template slot-scope="scope">{{scope.row.notTaxPrice}}</template>
                      </el-table-column>
                      <el-table-column prop="commonContactDept" label="税费" align="center">
                        <template slot-scope="scope">{{scope.row.tax}}</template>
                      </el-table-column>
                      <el-table-column label="含税单价" align="center">
                        <template slot-scope="scope">{{scope.row.goodsPrice}}</template>
                      </el-table-column>
                      <el-table-column prop="commonContactDept" label="总价" align="center">
                        <template slot-scope="scope">{{scope.row.totalPrice}}</template>
                      </el-table-column>
                      <el-table-column align="center" width="130">
                        <template slot="header" slot-scope="scope">
                          <el-dropdown trigger="click" @command="handleCommand" class="drop">
                            <span class="el-dropdown-link">
                              {{addressTitle}}
                              <i class="el-icon-arrow-down el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                              <el-dropdown-item
                                v-for="(item,index) in pay"
                                :key="index"
                                :command="item.command"
                              >{{item.value}}</el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>
                        </template>
                        <template slot-scope="scope">
                          <el-button type="primary" size="small" v-if="addIndex===1">上传</el-button>

                          <span v-if="addIndex===2">{{scope.row.deliveryAddress}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="设计稿" align="center" width="100">
                        <template slot-scope="scope">
                          <el-upload
                            size="small"
                            class="upload-demo"
                            :action="baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile'"
                            :on-success="handleAvatarSuccess"
                            :before-upload="beforeAvatarUpload"
                            :show-file-list="false"
                          >
                            <el-button size="small" type="primary" @click="upLoad(scope.$index)">上传</el-button>
                          </el-upload>

                          <span
                            class="blue"
                            v-show="scope.row.fileDesignDraftUrl"
                            @click="preview(scope.row)"
                          >查看</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="commonContactDept" label="交货日期" align="center">
                        <template slot-scope="scope">{{scope.row.deliveryCycle | dateTime}}</template>
                      </el-table-column>
                    </el-table>
                    <div class="total" style="margin-left:80%;margin-top:20px">
                      <el-form label-width="130px" size="small">
                        <el-form-item label="合计：">
                          <el-col :span="24">
                            <el-input v-model="total1"></el-input>
                          </el-col>
                        </el-form-item>
                      </el-form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <div class="goods-fitter">
        <el-form
          ref="infoForm"
          :model="detailData1"
          :rules="rules"
          label-width="120px"
          size="small"
        >
          <div class="search-wrapper">
            <div class="mbottom">
              <h4 class="title1">合同金额</h4>
            </div>
            <div class="search-base">
              <el-row>
                <el-col :span="12">
                  <el-col>
                    <el-form-item label="合同金额：">
                      <el-col :span="18">
                        <el-input v-model="detailData1.contractFactFee"></el-input>
                      </el-col>
                      <span style="margin-left:5px;">元</span>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="结算方式：" prop="settlementType">
                    <el-col :span="19">
                      <el-select
                        v-model="detailData1.settlementType"
                        placeholder="请选择"
                        style="width:100%"
                      >
                        <el-popover
                          placement="left"
                          title="分期付款"
                          width="300"
                          trigger="hover"
                          close-delay="0"
                          transition="linear"
                          content="合同生效后10日内，乙方即支付合同金额的10%即
                                            人民币壹佰圆圆整(小写：人民币【100.0000】元)
                                            作为预付款，剩余款项在甲方完成全部交货后支付"
                        >
                          <el-option slot="reference" label="第一种：分两期支付" :value="1"></el-option>
                        </el-popover>
                        <el-popover
                          placement="left"
                          title="一次性支付"
                          width="300"
                          trigger="hover"
                          close-delay="0"
                          transition="linear"
                          content="所有货物经乙方验收确认后，乙方30个工作日内 一
                                            次性结清甲方全部货款"
                        >
                          <el-option slot="reference" label="第二种：一次性支付" :value="2"></el-option>
                        </el-popover>
                      </el-select>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row>
                <el-col :span="12">
                  <el-col>
                    <el-form-item label="定金：" prop="deposit">
                      <el-col :span="18">
                        <el-input v-model="detailData1.deposit"></el-input>
                      </el-col>
                      <span style="margin-left:5px;">元</span>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="合同生效后：" prop="payLimitDay">
                    <el-col :span="16">
                      <el-input-number
                        v-model="detailData1.payLimitDay"
                        controls-position="right"
                        @change="handleChange"
                        :min="1"
                        :max="10"
                        style="width:100%"
                      ></el-input-number>
                    </el-col>
                    <span style="margin-left:5px;">日内支付</span>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-col>
                    <el-form-item label="收款账户：" prop="bankAccount">
                      <el-col :span="19">
                        <el-input v-model="detailData1.bankAccount">
                          <el-button slot="append" @click="accountChoose()" size="mini">选择</el-button>
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="户名：" prop="bankName">
                    <el-col :span="19">
                      <el-input v-model="detailData1.bankName"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <el-col>
                    <el-form-item label="开户行：" prop="bankOpeningName">
                      <el-col :span="19">
                        <el-input v-model="detailData1.bankOpeningName"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="纳税号：">
                    <el-col :span="19">
                      <el-input v-model="detailData1.taxNumber"></el-input>
                    </el-col>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="22">
                  <el-form-item label="发票项目内容：">
                    <el-input v-model="detailData1.invoiceContent"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="createClose()" size="small">关 闭</el-button>
        <el-button type="primary" @click="editSave()" size="small">保存</el-button>
      </span>
    </el-dialog>
    <!-- 选择签合同公司 -->
    <el-dialog width="50%" :visible.sync="partyVisible" :modal="true" :append-to-body="false">
      <div class="mail-fitter">
        <div class="goods-fitter" style="margin-bottom:20px">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">选择签合同的公司</h4>
            </div>
          </el-form>
        </div>
        <div class="goods-fitter">
          <div class="mcard" style="padding-bottom:0;border:1px solid #d7e0f1">
            <el-table
              :data="contractList"
              border
              style="width: 100%"
              stripe
              @row-dblclick="addCompany"
            >
              <el-table-column label="公司名称" align="center" width="240">
                <template slot-scope="scope">{{scope.row.sccCompanyName}}</template>
              </el-table-column>
              <el-table-column label="联系人" align="center">
                <template slot-scope="scope">{{scope.row.sccCompanyName}}</template>
              </el-table-column>
              <el-table-column label="联系电话" align="center">
                <template slot-scope="scope">{{scope.row.sccContacts}}</template>
              </el-table-column>
              <el-table-column label="传真" align="center">
                <template slot-scope="scope">{{scope.row.sccFax}}</template>
              </el-table-column>
              <el-table-column label="电子邮箱" align="center">
                <template slot-scope="scope">{{scope.row.sccEmail}}</template>
              </el-table-column>
              <el-table-column label="地址" align="center">
                <template slot-scope="scope">{{scope.row.sccAddress}}</template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                @size-change="contractHandleSizeChange"
                @current-change="contractHandleCurrentChange"
                :current-page="contractData.pageIndex"
                :page-sizes="[10, 30, 50, 100]"
                :page-size="contractData.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="contractData.count"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="partyVisible = false" size="small">关 闭</el-button>
        <el-button type="primary" @click="partyVisible =false" size="small">保存</el-button>
      </span>
    </el-dialog>
    <!-- 选择收款账户 -->
    <el-dialog width="50%" :visible.sync="accountVisible" :modal="true" :append-to-body="false">
      <div class="mail-fitter">
        <div class="goods-fitter" style="margin-bottom:20px">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">选择收款账户</h4>
            </div>
          </el-form>
        </div>
        <div class="goods-fitter">
          <div class="mcard" style="padding-bottom:0;border:1px solid #d7e0f1">
            <el-table
              :data="accountList"
              border
              style="width: 100%"
              stripe
              @row-dblclick="addAccount"
            >
              <el-table-column label="公司名称 " align="center">
                <template slot-scope="scope">{{scope.row.sccCompanyName}}</template>
              </el-table-column>
              <el-table-column label="开户银行 " align="center" width="150">
                <template slot-scope="scope">{{scope.row.bankName}}</template>
              </el-table-column>
              <el-table-column label="银行账号" align="center" width="210">
                <template slot-scope="scope">{{scope.row.bankAccount}}</template>
              </el-table-column>
              <el-table-column label="纳税人识别号" align="center">
                <template slot-scope="scope">{{scope.row.sccTaxNum}}</template>
              </el-table-column>
              <el-table-column label="注册地址" align="center" width="240">
                <template slot-scope="scope">{{scope.row.sccAddress}}</template>
              </el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                @size-change="accountHandleSizeChange"
                @current-change="accountHandleCurrentChange"
                :current-page="accountData.pageIndex"
                :page-sizes="[10, 30, 50, 100]"
                :page-size="accountData.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="accountData.count"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="accountVisible = false" size="small">关 闭</el-button>
        <el-button type="primary" @click="accountVisible =false" size="small">保存</el-button>
      </span>
    </el-dialog>
    <!-- 新增地址 -->
    <el-dialog width="50%" :visible.sync="addressVisible" append-to-body>
      <div class="mail-fitter">
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">地址选择</h4>
                <el-row>
                  <el-col :span="8">
                    <el-form-item label="单位名称：">
                      <el-input v-model="form.definition" placeholder="请输入单位名称"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="8">
                    <el-form-item label="收件人：">
                      <el-input v-model="form.addressee" placeholder="请输入收件人"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="2" :offset="1">
                    <el-button type="primary" size="small">查询</el-button>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </div>
        </div>
        <div class="goods-fitter">
          <div class="mcard" style="padding-bottom:0;border:1px solid #d7e0f1">
            <el-table :data="dataArr" border style="width: 100%" stripe>
              <el-table-column type="selection" width="55"></el-table-column>
              <el-table-column label="编号" align="center"></el-table-column>
              <el-table-column label="商机主题" align="center"></el-table-column>
              <el-table-column label="客户信息" align="center"></el-table-column>
              <el-table-column label="进行阶段" align="center"></el-table-column>
              <el-table-column label="下次联系时间" align="center"></el-table-column>
              <el-table-column label="客户需求描述" align="center"></el-table-column>
              <el-table-column label="预算总额" align="center"></el-table-column>
              <el-table-column label="竞争对手" align="center"></el-table-column>
            </el-table>
            <div class="pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="tableDatas.currentPage"
                :page-sizes="tableDatas.sizes"
                :page-size="tableDatas.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="tableDatas.total"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="addressVisible = false" size="small">关 闭</el-button>
        <el-button type="primary" @click="addressVisible =false" size="small">保存</el-button>
      </span>
    </el-dialog>
    <!-- 上传预览 -->
    <el-dialog :visible.sync="dialogVisible" :modal="true" :append-to-body="false">
      <img width="100%" :src="previewImg" alt />
      <span slot="footer" class="dialog-footer"></span>
    </el-dialog>
  </div>
</template>

<script>
import { getErpGoods } from "@/api/product/index";
import { getContract } from "@/api/setting/index";
import {
  getOrderGoods,
  editContract,
  uploadFileDesignDraftUrl
} from "@/api/sale/index";
import { throttleTipPop } from "@/utils/functions.js";
export default {
  data() {
    //提示日期
    var checkDay = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("此为必填项"));
      }
      if (!Number.isInteger(value)) {
        callback(new Error("请输入整数值"));
      }
    };
    return {
      previewImg: "", //预览文件，
      dialogVisible: false,
      addressTitle: "收货地址",
      addIndex: 2,
      detailData1: "",
      editVisible: false,
      accountVisible: false, //选择收款账户
      partyVisible: false, //选择甲方弹窗
      addressVisible: false, //添加地址弹窗
      dataArr: [],
      companyData: [], //新增公司
      list: "",
      contractList: [], //签约公司列表
      accountList: [], //账户列表
      accountLists: [], //新增账户
      proList: [], //产品清单
      orderId: "",
      pay: [
        { value: "多地址配送", command: 1 },
        { value: "收货地址", command: 2 }
      ],
      contractData: {
        bizType: 0,
        pageIndex: 1,
        pageSize: 10,
        count: 0
      },
      accountData: {
        bizType: 1,
        pageIndex: 1,
        pageSize: 10,
        count: 0
      },
      tableDatas: {
        currentPage: 1,
        sizes: [10, 20, 50, 100],
        size: 10,
        total: 0
      },
      form: {
        current_page: 0,
        page_size: 10,
        total_count: 0,
        contractNumber: "", //合同编号
        relevantBusiness: "", //关联业务单号
        partyA: "", //甲方
        partyB: "", //乙方
        partyAAddress: "", //甲方地址
        partyBAddress: "", //乙方地址
        partyAContacts: "", //甲方联系人
        partyBContacts: "", //乙方联系人
        partyANumber: "", //甲方联系电话
        partyBNumber: "", //乙方联系电话
        partyAFax: "", //甲方传真
        partyBFax: "", //乙方传真
        partyAMmail: "", //甲方邮箱
        partyBMmail: "", //乙方邮箱
        dateNum: "", //多少日内支付
        contractAmount: "", //合同金额
        settlement: "", //结算方式
        handsel: "", //定金
        paymentAccount: "", //收款账户
        accountName: "", //户名
        openingBank: "", //开户行
        taxNumber: "", //纳税号
        invoiceContent: "", //发票项目内容
        designs: "", //设计稿
        distributionAddress: "", //收货地址
        salesSheet: "", //询价单号
        customerName: "", //客户名称
        salesRepresentatives: "", //销售代表
        contacts: "", //联系人
        department: "", //部门
        phoneNumber: "", //电话号码
        mail: "", //邮箱
        mobilePhone: "", //手机号码
        invoiceType: "", //发票类型
        projectName: "", //项目名称
        address: "", //收货地址
        differentiation: "", //客户区分
        keywords: "", //关键词
        definition: "", //单位名称
        addressee: "", //收件人
        deposit: "", //支付定金
        invoiceType: "" //发票类型
      },
      formData: {
        current_page: 1,
        page_size: 2,
        total_count: 0
      },
      tableData: [],
      rules: {
        acompanyName: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],
        aaddress: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],
        acontact: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],
        atel: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],
        payLimitDay: [
          { validator: checkDay, required: true, trigger: ["blur", "change"] }
        ],
        bankAccount: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],
        bankOpeningName: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],
        bankName: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],
        settlementType: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],
        deposit: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  created() {
    this._getGoods();
  },
  props: ["editVisibles", "detailData", "closeId"],
  watch: {
    editVisibles(val) {
      this.editVisible = val;
    },
    detailData(val) {
      this.detailData1 = val;
    },
    closeId(val) {
      this.orderId = val;
    }
  },
  computed: {
    total1() {
      let totals = 0;
      let _this = this;
      if (
        _this.detailData1.goodsDetailListVo &&
        _this.detailData1.goodsDetailListVo.length > 0
      ) {
        for (var i = 0; i < _this.detailData1.goodsDetailListVo.length; i++) {
          if (!isNaN(_this.detailData1.goodsDetailListVo[i].totalPrice)) {
            totals += parseFloat(
              _this.detailData1.goodsDetailListVo[i].totalPrice
            );
          } else {
            totals = 0;
          }
        }
      }
      return totals;
    }
  },
  methods: {
    //多地址
    handleCommand(command) {
      if (command === 1) {
        this.addressTitle = "多地址配送";
        this.addIndex = 1;
      } else if (command === 2) {
        this.addressTitle = "收货地址";
        this.addIndex = 2;
      }
    },
    //关闭页面
    createClose() {
      this.$confirm("您确认要关闭吗？")
        .then(_ => {
          this.editVisible = false;
          this.$emit("createClose1", this.editVisible);
        })
        .catch(_ => {});
    },
    createClosing() {
      this.$confirm("您确认要关闭吗？")
        .then(_ => {
          this.editVisible = false;
          this.$emit("createClosing1", this.editVisible);
        })
        .catch(_ => {});
    },
    _getGoods() {
      getErpGoods(this.formData).then(res => {
        this.tableData = res.data.pageList;
        console.log(this.tableData);

        this.tableData.forEach(item => {
          item.top = 0;
        });
        this.formData.total_count = res.data.count;
      });
    },
    _getContract() {
      getContract(this.contractData).then(res => {
        this.contractList = res.data.pageList;
        this.contractData.count = res.data.count;
      });
    },
    _getAccount() {
      getContract(this.accountData).then(res => {
        this.accountList = res.data.pageList;
        this.accountData.count = res.data.count;
      });
    },
    //保存编辑
    editSave() {
      let obj = {};
      obj.acompanyName = this.detailData1.acompanyName;
      obj.acontact = this.detailData1.acontact;
      obj.aaddress = this.detailData1.aaddress;
      obj.afax = this.detailData1.afax;
      obj.atel = this.detailData1.atel;
      obj.bcontact = this.detailData1.bcontact;
      obj.baddress = this.detailData1.baddresse;
      obj.bfax = this.detailData1.bfax;
      obj.btel = this.detailData1.btel;
      obj.bankAccount = this.detailData1.bankAccount;
      obj.bankName = this.detailData1.bankName;
      obj.bankOpeningName = this.detailData1.bankOpeningName;
      obj.contractFactFee = this.detailData1.contractFactFee;
      obj.deposit = this.detailData1.deposit;
      obj.payLimitDay = this.detailData1.payLimitDay;
      obj.payType = this.detailData1.settlementType;
      obj.saleOrderNo = this.detailData1.businessNo;
      obj.invoiceContent = this.detailData1.invoiceContent;
      obj.taxNumber = this.detailData1.taxNumber;
      obj.orderId = this.orderId;
      obj.contractType = 1;

      if (
        !this.detailData1.acompanyName ||
        !this.detailData1.acontact ||
        !this.detailData1.atel ||
        !this.detailData1.aaddress ||
        !this.detailData1.payLimitDay ||
        !this.detailData1.bankAccount ||
        !this.detailData1.bankName ||
        !this.detailData1.bankOpeningName ||
        !this.detailData1.settlementType
      ) {
        throttleTipPop(this, "warning", "请填写带*的填项", 2000);
      } else {
        editContract(obj).then(res => {
          if (res.code === 200) {
            throttleTipPop(this, "success", "编辑销售合同成功", 2000);
            this.editVisible = false;
            this.$emit("editContract", this.editVisible);
          }
        });
      }
    },
    //签约公司弹窗
    partyChoose() {
      this.partyVisible = true;
      this._getContract();
    },
    //双击添加公司
    addCompany(row) {
      let copy = JSON.parse(JSON.stringify(row));
      this.companyData.splice(0, 1, copy);
      this.detailData1.acompanyName =
        this.companyData[0] && this.companyData[0].sccCompanyName;
      this.detailData1.aaddress =
        this.companyData[0] && this.companyData[0].sccAddress;
      this.detailData1.acontact =
        this.companyData[0] && this.companyData[0].sccContacts;
      this.detailData1.atel =
        this.companyData[0] && this.companyData[0].sccTelephone;
      this.detailData1.afax = this.companyData[0] && this.companyData[0].sccFax;
      this.partyVisible = false;
    },
    accountChoose() {
      this.accountVisible = true;
      this._getAccount();
    },
    //双击添加账户
    addAccount(row) {
      let copy = JSON.parse(JSON.stringify(row));
      this.accountLists.splice(0, 1, copy);
      this.detailData1.bankName =
        this.accountLists[0] && this.accountLists[0].sccCompanyName;
      this.detailData1.bankOpeningName =
        this.accountLists[0] && this.accountLists[0].bankName;
      this.detailData1.taxNumber =
        this.accountLists[0] && this.accountLists[0].sccTaxNum;
      this.detailData1.bankAccount =
        this.accountLists[0] && this.accountLists[0].bankAccount;
      this.accountVisible = false;
    },
    //获取上传那栏的下表
    upLoad(index) {
      this.upLoadIndex = index;
    },
    //上传成功
    handleAvatarSuccess(file) {
      this.detailData1.goodsDetailListVo[this.upLoadIndex].fileDesignDraftUrl =
        file.data.domain + file.data.filePath;

      let obj = {};
      obj.fileDesignDraftUrl = this.detailData1.goodsDetailListVo[
        this.upLoadIndex
      ].fileDesignDraftUrl;
      obj.sordId = this.detailData1.goodsDetailListVo[this.upLoadIndex].sordId;
      uploadFileDesignDraftUrl(obj).then(res => {
        if (res.code === 200) {
          this.$message.success("上传设计稿成功！");
        }
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/jpg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error("上传的文件为图片格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 5MB!");
      }
      return isJPG && isLt2M;
    },
    //预览设计稿
    preview(row) {
      this.previewImg = row.fileDesignDraftUrl;
      this.dialogVisible = true;
    },
    address() {},
    //签约公司换页
    contractHandleSizeChange(val) {
      this.contractData.pageSize = val;
      this._getContract();
    },
    contractHandleCurrentChange(val) {
      this.contractData.pageIndex = val;
      this._getContract();
    },
    //账户换页
    accountHandleCurrentChange(val) {
      this.accountData.pageIndex = val;
      this._getAccount();
    },
    accountHandleSizeChange(val) {
      this.accountData.pageSize = val;
      this._getAccount();
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleChange() {}
  }
};
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
#editContract {
  .search-wrapper {
    padding: 20px;
    padding-bottom: 10px;
    border: 1px solid rgb(215, 224, 241);
    background: #fff;
    .title {
      margin-left: -20px;
      font-size: 16px;
      color: 3333;
      padding-left: 10px;
      line-height: 1.4;
      border-left: 4px solid $themeColor;
      margin-bottom: 10px;
    }
    .title1 {
      margin-left: -20px;
      font-size: 16px;
      color: 3333;
      padding-left: 10px;
      line-height: 1.4;
      border-left: 4px solid $themeColor;
      margin-bottom: 10px;
    }
  }
  .mail-fitter {
    .mail-wrapper {
      padding: 20px;
      padding-bottom: 0;
      border: 1px solid rgb(215, 224, 241);
      background: #fff;
      .title1 {
        margin-left: -20px;
        font-size: 16px;
        font-weight: 400;
        color: 3333;
        padding-left: 10px;
        line-height: 1.4;
        border-left: 4px solid $themeColor;
        margin-bottom: 23px;
      }
    }
  }
  .box {
    margin-left: 12px;
    margin-top: 10px;
  }

  .el-input-group__append button.el-button {
    width: 50px;
    text-align: center;
    background: #fff;
  }
  .el-input-number.is-controls-right .el-input-number__decrease {
    background: #fff !important;
  }
  .el-input-number.is-controls-right .el-input-number__increase {
    background: #fff !important;
  }
  .showImg {
    width: 80px;
    height: 80px;
  }
}
</style>