<template>
  <div class="archives">
    <el-form
            label-width="135px"
            size="small"
            :model="personalForm"
            ref="personalForm"
            :rules="personalRules"
    >
      <div class="margin archives">
        <div class="mbottom">
          <div class="goods-fitter">
            <div class="search-wrapper1">
              <el-page-header @back="back" :content="text"></el-page-header>
            </div>
          </div>
        </div>
        <div class="mbottom">
          <div class="goods-fitter">
            <div class="search-wrapper">
              <h4 class="title">供应商信息</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="22">
                    <el-col :span="6">
                      <el-form-item label="供应商名称：" prop="supplierName">
                        <el-input
                                v-model="personalForm.supplierName"
                                placeholder="请填写供应商名称"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="公司性质：" prop="supplierNature">
                        <el-select
                                v-model="personalForm.supplierNature"
                                placeholder="请选择公司性质"
                                style="max-width:200px"
                        >
                          <el-option
                                  v-for="item in company_options"
                                  :key="item.dictionaryName"
                                  :label="item.dictionaryName"
                                  :value="item.dictionaryName"
                          ></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="公司地址：" prop="address">
                        <el-input
                                v-model="personalForm.address"
                                placeholder="请填写公司地址"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="公司网址：" prop="compony_url">
                        <el-input
                                v-model="personalForm.compony_url"
                                placeholder="请填写公司网址"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row v-if="!supplierId ">
                  <el-col :span="22">
                    <el-col :span="6">
                      <el-form-item label="登录账号：" prop="account">
                        <el-input
                                v-model="personalForm.account"
                                style="max-width:200px"
                                auto-complete="new-password"
                                placeholder="请填写登录账号"
                                :disabled="supplierId !==''"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="密码：" prop="pass">
                        <el-input
                                v-model="personalForm.pass"
                                style="max-width:200px"
                                auto-complete="new-password"
                                placeholder="请填写密码" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');" onblur="this.setAttribute('readonly',true);"
                                type="password"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="确认密码：" prop="checkPass">
                        <el-input
                                v-model="personalForm.checkPass"
                                style="max-width:200px"
                                placeholder="请再次输入密码" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');" onblur="this.setAttribute('readonly',true);"
                                type="password"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="22">
                    <el-col :span="6">
                      <el-form-item label="代理品牌：" prop="agency_branch">
                        <el-input
                                v-model="personalForm.agency_branch"
                                style="max-width:200px"
                                placeholder="请填写代理品牌"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="主营商品：" prop="main_product">
                        <el-input
                                v-model="personalForm.main_product"
                                style="max-width:200px"
                                placeholder="请填写主营商品"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="自营商品：" prop="selfProduct">
                        <el-input
                                v-model="personalForm.selfProduct"
                                style="max-width:200px"
                                placeholder="请填写自营商品"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="一件代发：" prop="wholesale">
                        <el-select v-model="personalForm.wholesale" style="max-width:200px">
                          <el-option label="是" value="1"></el-option>
                          <el-option label="否" value="2"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>

                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="22">
                    <el-col :span="6">
                      <el-form-item label="税率：" prop="taxRate">
                        <el-select v-model="personalForm.taxRate" style="max-width:200px">
                          <el-option label="0%" value="0"></el-option>
                          <el-option label="3%" value="3"></el-option>
                          <el-option label="5%" value="5"></el-option>
                          <el-option label="7%" value="7"></el-option>
                          <el-option label="9%" value="9"></el-option>
                          <el-option label="13%" value="13"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="API对接：" prop="api">
                        <el-select v-model="personalForm.api" style="max-width:200px">
                          <el-option label="否" value="0"></el-option>
                          <el-option label="是" value="1"></el-option>
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10"  class="multiselect">
                      <el-form-item label="入驻品类：" prop="category">
                        <treeselect
                                :multiple="true"
                                :flat="true"
                                :limit="3"
                                :default-expand-level="1"
                                v-model="personalForm.supplier_name"
                                style="width: 95%;height:36px;"
                                :options="categoryList"
                                placeholder="请选择商品分类"
                                :clearable="false"
                        />
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="22"></el-col>
                </el-row>
                <el-row>
                  <el-col :span="22">
                    <el-form-item label="备注：" prop="remark">
                      <el-input
                              v-model="personalForm.remark"
                              style="width:100%"
                              placeholder="请输入备注"
                      ></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="margin archives">
        <div class="mbottom">
          <div class="goods-fitter">
            <div class="search-wrapper">
              <h4 class="title">联系人信息</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="22">
                    <el-col :span="6">
                      <el-form-item label="联系人：" prop="contactName">
                        <el-input
                                v-model="personalForm.contactName"
                                placeholder="请填写联系人名称"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="部门：" prop="department">
                        <el-input
                                v-model="personalForm.department"
                                placeholder="请填写部门名称"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="手机号码：" prop="mobile">
                        <el-input
                                v-model="personalForm.mobile"
                                placeholder="请填写手机号码"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="QQ：" prop="qq">
                        <el-input
                                type="number"
                                v-model="personalForm.qq"
                                placeholder="请填写QQ号码"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="22">
                    <el-col :span="6">
                      <el-form-item label="固定电话：" prop="phone">
                        <el-input
                                type="number"
                                v-model="personalForm.phone"
                                placeholder="请填写固定电话"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="邮箱：" prop="email">
                        <el-input
                                v-model="personalForm.email"
                                placeholder="请填写邮箱"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="出生日期：" prop="birthday">
                        <el-date-picker
                                v-model="personalForm.born"
                                valueFormat="yyyy-MM-dd HH:mm:ss"
                                type="date"
                                :picker-options="pickerOptions0"
                                placeholder="选择日期"
                        ></el-date-picker>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="微信号：" prop="weixin">
                        <el-input
                                v-model="personalForm.weixin"
                                placeholder="请填写微信号"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="margin archives">
        <div class="mbottom">
          <div class="goods-fitter">
            <div class="search-wrapper">
              <h4 class="title">订单处理人信息</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="22">
                    <el-col :span="6">
                      <el-form-item label="订单处理人姓名：" prop="order_name" label-width="135px">
                        <el-input
                                v-model="personalForm.order_name"
                                placeholder="请填写订单处理人姓名"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="订单处理人手机：" prop="order_mobile" label-width="135px">
                        <el-input
                                v-model="personalForm.order_mobile"
                                placeholder="请填写订单处理人手机"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="订单处理人邮箱：" prop="order_email" label-width="135px">
                        <el-input
                                v-model="personalForm.order_email"
                                placeholder="请填写订单处理人邮箱"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="订单处理人微信：" prop="order_wx" label-width="135px">
                        <el-input
                                v-model="personalForm.order_wx"
                                placeholder="请填写订单处理人微信"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="margin archives">
        <div class="mbottom">
          <div class="goods-fitter">
            <div class="search-wrapper">
              <h4 class="title">订单售后信息</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="22">
                    <el-col :span="6">
                      <el-form-item label="售后处理人姓名：" prop="consignee" label-width="135px">
                        <el-input
                                v-model="personalForm.consignee"
                                placeholder="请填写售后处理人姓名"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="售后处理人手机：" prop="telephone" label-width="135px">
                        <el-input
                                v-model="personalForm.telephone"
                                placeholder="请填写订单处理人手机"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item
                              label="售后处理人邮箱："
                              prop="supplierReturn_email"
                              label-width="135px"
                      >
                        <el-input
                                v-model="personalForm.supplierReturn_email"
                                placeholder="请填写售后处理人邮箱"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="售后处理人微信：" prop="wechat" label-width="135px">
                        <el-input
                                v-model="personalForm.wechat"
                                placeholder="请填写售后处理人微信"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="22">
                    <el-col :span="9">
                      <el-form-item label="退货地址：" prop="returnaddress" label-width="135px">
                        <el-col :span="8">
                          <el-form-item prop="province">
                            <el-select
                                    v-model="personalForm.province"
                                    clearable
                                    @change="provincefunc"
                                    placeholder="请选择省"
                                    style="max-width:120px"
                            >
                              <el-option
                                      v-for="item in addressArr"
                                      :key="item.regionId"
                                      :label="item.regionLongname"
                                      :value="item.regionId"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="city">
                            <el-select
                                    @change="cityfunc"
                                    v-model="personalForm.city"
                                    clearable
                                    placeholder="请选择市"
                                    style="max-width:120px"
                            >
                              <el-option
                                      v-for="item in cityArr"
                                      :key="item.regionId"
                                      :label="item.regionLongname"
                                      :value="item.regionId"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                        <el-col :span="8">
                          <el-form-item prop="district">
                            <el-select
                                    v-model="personalForm.district"
                                    placeholder="请选择区"
                                    style="max-width:120px"
                            >
                              <el-option
                                      v-for="item in districtArr"
                                      :key="item.regionId"
                                      :label="item.regionLongname"
                                      :value="item.regionId"
                              ></el-option>
                            </el-select>
                          </el-form-item>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="10">
                      <el-form-item label="详细地址：" prop="addressmore" label-width="135px">
                        <el-input v-model="personalForm.addressmore" placeholder="请填写详细地址"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="margin archives">
        <div class="mbottom">
          <div class="goods-fitter">
            <div class="search-wrapper">
              <h4 class="title">总经理信息</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="22">
                    <el-col :span="6">
                      <el-form-item label="总经理：" prop="generalManagerName">
                        <el-input
                                v-model="personalForm.generalManagerName"
                                placeholder="请输入总经理姓名"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="手机号码：" prop="generalManagerPhone">
                        <el-input
                                v-model="personalForm.generalManagerPhone"
                                placeholder="请输入手机号码"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="公司电话：" prop="supplierPhone">
                        <el-input
                                type="number"
                                v-model="personalForm.supplierPhone"
                                placeholder="请输入公司电话"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="传真号码：" prop="fax">
                        <el-input
                                v-model="personalForm.fax"
                                placeholder="请输入传真号码"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="22">
                    <el-col :span="6">
                      <el-form-item label="微信号：" prop="generalManagerWechat">
                        <el-input
                                v-model="personalForm.generalManagerWechat"
                                placeholder="请输入微信号"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="邮箱：" prop="generalManagerEmail">
                        <el-input
                                v-model="personalForm.generalManagerEmail"
                                placeholder="请输入邮箱"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="直线电话：" prop="name">
                        <el-input
                                type="number"
                                v-model="personalForm.generalManagerFixedPhone"
                                placeholder="请输入直线电话"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="margin archives">
        <div class="mbottom">
          <div class="goods-fitter">
            <div class="search-wrapper">
              <h4 class="title">财务信息</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="22">
                    <el-col :span="6">
                      <el-form-item label="开户行：" prop="bankName">
                        <el-input
                                v-model="personalForm.bankName"
                                placeholder="请输入开户行"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="开户账号：" prop="bankAccount">
                        <el-input
                                type="number"
                                v-model="personalForm.bankAccount"
                                placeholder="请输入开户账号"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="公司名称：" prop="bankCompany">
                        <el-input
                                v-model="personalForm.bankCompany"
                                placeholder="请输入公司名称"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="注册地址：" prop="registeredAddress">
                        <el-input
                                v-model="personalForm.registeredAddress"
                                placeholder="请输入注册地址"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="22">
                    <el-col :span="6">
                      <el-form-item label="纳税人识别号：" prop="taxNumber">
                        <el-input
                                v-model="personalForm.taxNumber"
                                placeholder="请输入纳税人识别号"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col :span="6">
                      <el-form-item label="注册电话：" prop="registeredPhone">
                        <el-input
                                type="number"
                                v-model="personalForm.registeredPhone"
                                placeholder="请输入注册电话"
                                style="max-width:200px"
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="6" class="way">
                    <el-form-item label="结算方式：" prop="settleType">
                      <el-select
                              v-model="personalForm.settleType"
                              clearable
                              placeholder="请选择结算方式"
                              @change="settleType"
                              style="max-width:200px"
                      >
                        <el-option label="一件代发 月结" value="0"></el-option>
                        <el-option label="集采/批发 预付定金" value="1"></el-option>
                        <el-option label="一件代发 白条" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <span
                            class="settleType_span"
                            v-if="personalForm.settleType === '0'"
                    >(每个月五号前核对上个月的销售订单，10日前收到发票并付款！)</span>
                    <div class="loan load_yuan" v-if="personalForm.settleType === '2'">
                      <el-radio-group v-model="personalForm.ious" class="loan" @change="Theradio">
                        <el-radio :label="3000">1.货款到3000元后付款</el-radio>
                        <el-radio :label="5000">2.货款到5000元后付款</el-radio>
                        <el-radio :label="10000">3.货款到10000元后付款</el-radio>
                        <el-radio :label="1">4.自选金额</el-radio>
                      </el-radio-group>
                      <el-col :span="3">
                        <el-input
                                v-model="personalForm.ious_input"
                                clearable
                                :readonly="personalForm.ious_readolay"
                        ></el-input>
                      </el-col>
                      <span>元</span>
                    </div>
                    <span
                            class="settleType_span"
                            v-if="personalForm.settleType === '1'"
                    >(预付20%定金,乙方开具发票,交货时经验收合格后即付清余款)</span>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="margin archives">
        <div class="mbottom">
          <div class="goods-fitter">
            <div class="search-wrapper">
              <h4 class="title">资质证件</h4>
              <div class="search-base">
                <el-row>
                  <el-col :span="10">
                    <el-form-item label="营业执照：" prop="name">
                      <el-upload
                              class="avatar-uploader"
                              :action="action"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess"
                      >
                        <img
                                v-if="personalForm.BL_image_url"
                                :src="personalForm.BL_image_url"
                                class="avatar"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="一般纳税人资格证：" prop="name" label-width="150px">
                      <el-upload
                              class="avatar-uploader"
                              :action="action"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess1"
                      >
                        <img
                                v-if="personalForm.taxpayerQualification"
                                :src="personalForm.taxpayerQualification"
                                class="avatar"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="row_top business">
                  <el-form-item label="营业执照有效期：" prop="name">
                    <el-date-picker
                            v-model="personalForm.brand_time"
                            type="daterange"
                            range-separator="至"
                            start-placeholder="开始日期"
                            unlink-panels
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            :default-time="['00:00:00', '23:59:59']"
                            end-placeholder="结束日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-row>
              </div>
              <div class="line_div"></div>
              <div class="search-base business">
                <el-row>
                  <el-col :span="7">
                    <el-form-item label="法人身份证扫描件正反面：" prop="name">
                      <el-upload
                              class="avatar-uploader"
                              :action="action"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess2"
                      >
                        <img
                                v-if="personalForm.idCardFront"
                                :src="personalForm.idCardFront"
                                class="avatar"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="品牌授权书：" prop="name" label-width="150px">
                      <el-upload
                              class="avatar-uploader"
                              :action="action"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess3"
                      >
                        <img
                                v-if="personalForm.brandAuthUrl"
                                :src="personalForm.brandAuthUrl"
                                class="avatar"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="商标注册证：" prop="name" label-width="150px">
                      <el-upload
                              class="avatar-uploader"
                              :action="action"
                              :show-file-list="false"
                              :on-success="handleAvatarSuccess4"
                      >
                        <img
                                v-if="personalForm.trademarkUrl"
                                :src="personalForm.trademarkUrl"
                                class="avatar1"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon1"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="row_top">
                  <el-col :span="10">
                    <el-form-item label="授权书有效期：" prop="name">
                      <el-date-picker
                              v-model="personalForm.authorization"
                              format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              type="daterange"
                              range-separator="至"
                              start-placeholder="开始日期"
                              unlink-panels
                              end-placeholder="结束日期"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                    <el-form-item label="商标有效期：" prop="name">
                      <el-date-picker
                              v-model="personalForm.trademarkTime"
                              format="yyyy-MM-dd"
                              value-format="yyyy-MM-dd HH:mm:ss"
                              type="daterange"
                              range-separator="至"
                              start-placeholder="开始日期"
                              unlink-panels
                              end-placeholder="结束日期"
                              :default-time="['00:00:00', '23:59:59']"
                      ></el-date-picker>
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
              <div class="line_div"></div>

              <div class="search-base business">
                <el-row>
                  <el-col :span="5">
                    <el-form-item label="一级授权链：" prop="name">
                      <el-upload
                              class="avatar-uploader"
                              :action="action"
                              :show-file-list="false"
                              :on-success="handleauthorSuccess1"
                      >
                        <img
                                v-if="personalForm.authorizationChain1"
                                :src="personalForm.authorizationChain1"
                                class="avatar1"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon1"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="二级授权链：" prop="name">
                      <el-upload
                              class="avatar-uploader"
                              :action="action"
                              :show-file-list="false"
                              :on-success="handleauthorSuccess2"
                      >
                        <img
                                v-if="personalForm.authorizationChain2"
                                :src="personalForm.authorizationChain2"
                                class="avatar1"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon1"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="三级授权链：" prop="name">
                      <el-upload
                              class="avatar-uploader"
                              :action="action"
                              :show-file-list="false"
                              :on-success="handleauthorSuccess3"
                      >
                        <img
                                v-if="personalForm.authorizationChain3"
                                :src="personalForm.authorizationChain3"
                                class="avatar1"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon1"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="四级授权链：" prop="name">
                      <el-upload
                              class="avatar-uploader"
                              :action="action"
                              :show-file-list="false"
                              :on-success="handleauthorSuccess4"
                      >
                        <img
                                v-if="personalForm.authorizationChain4"
                                :src="personalForm.authorizationChain4"
                                class="avatar1"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon1"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="5">
                    <el-form-item label="五级授权链：" prop="name">
                      <el-upload
                              class="avatar-uploader"
                              :action="action"
                              :show-file-list="false"
                              :on-success="handleauthorSuccess5"
                      >
                        <img
                                v-if="personalForm.authorizationChain5"
                                :src="personalForm.authorizationChain5"
                                class="avatar1"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon1"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="六级授权链：" prop="name">
                      <el-upload
                              class="avatar-uploader"
                              :action="action"
                              :show-file-list="false"
                              :on-success="handleauthorSuccess6"
                      >
                        <img
                                v-if="personalForm.authorizationChain6"
                                :src="personalForm.authorizationChain6"
                                class="avatar1"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon1"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="七级授权链：" prop="name">
                      <el-upload
                              class="avatar-uploader"
                              :action="action"
                              :show-file-list="false"
                              :on-success="handleauthorSuccess7"
                      >
                        <img
                                v-if="personalForm.authorizationChain7"
                                :src="personalForm.authorizationChain7"
                                class="avatar1"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon1"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item label="八级授权链：" prop="name">
                      <el-upload
                              class="avatar-uploader"
                              :action="action"
                              :show-file-list="false"
                              :on-success="handleauthorSuccess8"
                      >
                        <img
                                v-if="personalForm.authorizationChain8"
                                :src="personalForm.authorizationChain8"
                                class="avatar1"
                        />
                        <i v-else class="el-icon-plus avatar-uploader-icon1"></i>
                      </el-upload>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row class="row_top">
                  <el-form-item label="授权链有效期：" prop="name">
                    <el-date-picker
                            v-model="personalForm.authChainTime"
                            type="daterange"
                            format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            range-separator="至"
                            :default-time="['00:00:00', '23:59:59']"
                            start-placeholder="开始日期"
                            unlink-panels
                            end-placeholder="结束日期"
                    ></el-date-picker>
                  </el-form-item>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-form>
    <div style="text-align:center">
      <el-button type="danger" size="small" @click="back">取消</el-button>
      <el-button type="primary" size="small" @click="confirm">确认</el-button>
    </div>
  </div>
</template>

<script>
  // import the component
  import Treeselect from "@riophae/vue-treeselect";
  // import the styles
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";
  import {
    getSupplierarchives,
    getStoreList,
    supplierApplyPost,
    getNature,
    repeat,
    repeatAcount,
    supplierApplyEdior,
    supplierApplyPostByid
  } from "@/api/supplier/index";
  import { throttleTipPop } from "@/utils/throttle";
  import { getprovince, getcity } from "@/api/customer/index";
  import { getTreecatagory, getBuyer } from "@/api/product/index";
  import encryption from "@/common/js/encryption";
  export default {
    data() {
      var validateaccount = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入账号"));
        } else {
          if (this.personalForm.account !== "") {
            if (value.length < 4 || value.length > 20) {
              return callback(new Error("长度在4-20位"));
            }
            const reg = /^[\u4E00-\u9FA5\uf900-\ufa2d\w\-]{4,20}$/;
            console.log(reg.test(value));
            if (!reg.test(value)) {
              return callback(new Error("不能有空格，特殊字符"));
            }
            if (this.supplierId) {
              callback();
            } else {
              repeatAcount(this.personalForm.account).then(res => {
                if (res.code === 200) {
                  callback();
                } else {
                  callback(new Error("该账号已存在"));
                }
              });
            }
          }
        }
      };
      var checkSupplierName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error("请填写"));
        } else {
          if (value.length < 4 || value.length > 20) {
            return callback(new Error("长度在4-20位"));
          }
          const reg = /^[\u4E00-\u9FA5\uf900-\ufa2d\w\-]{4,20}$/;
          if (reg.test(value)) {
            if (
                    this.personalForm.oldSupplierName == this.personalForm.supplierName
            ) {
              callback();
            } else {
              repeat(value).then(res => {
                if (res.code === 200) {
                  callback();
                } else {
                  callback(new Error("该名称已存在"));
                }
              });
            }
          } else {
            return callback(new Error("不能有空格，特殊字符"));
          }
        }
      };
      var companyaccount = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入公司名称"));
        } else {
          if (this.personalForm.company_name !== "") {
            if (this.supplierId) {
              callback();
            } else {
              repeat(this.personalForm.company_name).then(res => {
                if (res.code === 200) {
                  callback();
                } else {
                  callback(new Error("该公司已存在"));
                }
              });
            }
          }
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入密码"));
        } else {
          if (this.personalForm.checkPass !== "") {
            this.$refs.personalForm.validateField("checkPass");
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else if (value !== this.personalForm.pass) {
          callback(new Error("两次输入密码不一致!"));
        } else {
          callback();
        }
      };
      var settle = (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请再次输入密码"));
        } else {
          callback();
        }
      };
      var checkPhone = (rule, value, callback) => {
        if (value === "") {
          return callback(new Error("请输入手机号码"));
        } else {
          const reg = /^1[3|4|5|6|7|8|9]\d{9}$/
          if (reg.test(value)) {
            callback();
          } else {
            return callback(new Error("请输入正确的手机号"));
          }
        }
      };
      return {
        pickerOptions0: {
          disabledDate(time) {
            return time.getTime() > Date.now() - 8.64e6;
          }
        },
        // props: {
        //   lazy: true,
        //   lazyLoad(node, resolve) {
        //     console.log(node);
        //     if (node.value && node.level <= 2) {

        //     }
        //   }
        // },
        adminArr: [],
        cityArr: [],
        districtArr: [],
        categoryList: [], // 分类
        returnaddress: [],
        count: 1,
        addressArr: [],
        text: "供应商档案>新增",
        categoryArr: [], //品类名称数组
        company_options: [], //公司性质
        action: "", //图片上传地址
        supplierId: "", //供应商id
        personalForm: {
          oldSupplierName: "", //供应商名称
          supplierName: "", //供应商名称
          supplierNature: "", //公司性质
          address: "", //公司地址
          compony_url: "", //公司网址
          account: "", // 账号
          pass: "", // 密码
          checkPass: "", // 确认密码
          agency_branch: "", // 代理品牌
          main_product: "", //主营商品
          selfProduct: "", // 自营品牌
          wholesale: "1", // 支持一件代发: '1' 是 ， ‘2’ 否
          taxRate: "13%", //税率
          api: "0", //api对接  0  否  1 是
          category: "", //入驻品类
          supplier_name: [], //品类名称
          remark: "", //备注
          contactName: "", //联系人
          department: "", //部门
          mobile: "", // 手机
          qq: "", // QQ号
          phone: "", // 固定电话
          email: "", //邮箱
          weixin: "", //微信号
          born: "", //出生日期
          order_name: "", // 订单处理人姓名
          order_mobile: "", // 订单处理人手机
          order_email: "", // 订单处理人邮箱
          order_wx: "", //订单处理人微信
          generalManagerName: "", //总经理
          generalManagerPhone: "", //总经理手机号码
          supplierPhone: "", //公司电话
          fax: "", //传真号码
          generalManagerWechat: "", //总经理微信号
          generalManagerEmail: "", //总经理邮箱
          generalManagerFixedPhone: "", //总经理直线电话
          bankName: "", //开户行
          bankAccount: "", //开户账号
          bankCompany: "", //开户名称
          taxNumber: "", //纳税人识别号
          registeredAddress: "", //注册地址
          registeredPhone: "", //注册电话
          settleType: "0", //结算方式
          ious: "", //京东白条额度
          ious_input: "", //京东白条额度自输入
          ious_readolay: false,
          wx: "",
          BL_image_url: "", // 营业执照图片地址
          BL_image_id: "", // 营业执照图片id
          brand_time: [], // 营业执照有效期
          taxpayerQualification: "", //一般纳税人资格证
          idCardFront: "", //法人身份证
          brandAuthUrl: "", //品牌授权书
          trademarkUrl: "", //商标注册证
          authorization: [], //授权书有效期
          trademarkTime: [], //商标有效期
          authorizationChain1: "", //一级授权链
          authorizationChain2: "", //二级授权链
          authorizationChain3: "", //三级授权链
          authorizationChain4: "", //四级授权链
          authorizationChain5: "", //五级授权链
          authorizationChain6: "", //六级授权链
          authorizationChain7: "", //七级授权链
          authorizationChain8: "", //八级授权链
          authChainTime: [], //授权链有效期

          adminId: "", // 采销员ID

          //售后信息
          consignee: "", // 售后人姓名
          telephone: "", // 售后人电话
          supplierReturn_email: "", // 售后人邮箱
          wechat: "", // 售后微信
          addressmore: "", //售后详细地址
          adminId: "", // 采销员ID
          city: "",
          province: "",
          district: ""
        },
        personalRules: {
          supplierName: [
            { required: true, validator: checkSupplierName, trigger: "blur" }
          ],
          supplierNature: [
            { required: true, message: "请填写公司性质", trigger: "change" }
          ],
          address: [
            { required: true, message: "请填写公司地址", trigger: "blur" }
          ],
          compony_url: [
            { required: true, message: "请填写公司网址", trigger: "blur" }
          ],
          account: [
            { required: true, validator: validateaccount, trigger: "blur" }
          ],
          pass: [
            { required: true, validator: validatePass, trigger: "blur" },
            {
              min: 5,
              max: 16,
              message: "密码长度在 5 到 16 个字符",
              trigger: "blur"
            }
          ],
          checkPass: [
            { required: true, validator: validatePass2, trigger: "blur" }
          ],
          mobile: [{ required: true, validator: checkPhone, trigger: "blur" }],

          qq: [{ required: true, message: "请填写QQ号码", trigger: "blur" }],
          wholesale: [
            { required: true, message: "请选择是否支持一件代发", trigger: "blur" }
          ],
          taxRate: [{ required: true, message: "请选择税率", trigger: "blur" }],
          category: [
            { required: false, message: "请选择入驻品类", trigger: "blur" }
          ], //入驻品类
          api: [{ required: true, message: "请填写api对接", trigger: "blur" }], // api对接
          agency_branch: [
            { required: true, message: "请填写代理品牌", trigger: "blur" }
          ], // 代理品牌
          bankCompany: [
            { required: true, message: "请填写公司名称", trigger: "blur" }
          ],
          main_product: [
            { required: true, message: "请填写主营产品", trigger: "blur" }
          ], // 主营产品
          supplier_name: [
            { required: true, message: "请选择入驻品类", trigger: "blur" }
          ], // 品类名称
          contactName: [
            { required: true, message: "请输入联系人姓名", trigger: "blur" }
          ],
          department: [
            { required: true, message: "请输入部门名称", trigger: "blur" }
          ],
          qq: [{ required: true, message: "请填写QQ号", trigger: "blur" }],
          company_name: [
            { required: true, validator: companyaccount, trigger: "blur" }
          ],
          addressmore: [
            { required: true, message: "请填写详细地址", trigger: "blur" }
          ],
          address: [
            { required: true, message: "请填写公司地址", trigger: "blur" }
          ],
          branch: [
            { required: true, message: "请填写自营品牌", trigger: "blur" }
          ], // 自营品牌
          phone: [
            { required: true, message: "请填写固定电话", trigger: "blur" },
          ],
          generalManagerName: [
            { required: true, message: "请填写总经理姓名", trigger: "blur" }
          ], //总经理姓名
          supplierPhone: [
            { required: true, message: "请填写公司电话", trigger: "blur" }
          ], //公司电话
          generalManagerPhone: [
            { required: true, validator: checkPhone, trigger: "blur" }
          ], //总经理手机号码
          bankName: [
            { required: true, message: "请填写开户行", trigger: "blur" }
          ], //开户行
          bankAccount: [
            { required: true, message: "请填写开户账号", trigger: "blur" }
          ], //开户账号
          registeredAddress: [
            { required: true, message: "请填写注册地址", trigger: "blur" }
          ], //注册地址
          identify: [
            { required: true, message: "请填写纳税人识别号", trigger: "blur" }
          ], //纳税人识别号
          registeredPhone: [
            { required: true, message: "请填写注册电话", trigger: "blur" }
          ], //注册电话
          generalManagerEmail: [
            { required: false, message: "请填写邮箱", trigger: "blur" },
            {
              type: "email",
              message: "请填写正确的邮箱地址",
              trigger: ["blur", "change"]
            }
          ],
          province: [{ required: true, message: "请选择省", trigger: "change" }],
          city: [{ required: true, message: "请选择市", trigger: "change" }],
          district: [{ required: true, message: "请选择区", trigger: "change" }],
          adminId: [
            { required: true, message: "请选择采销员", trigger: "change" }
          ],
          settleType: [{ required: true, validator: settle, trigger: "change" }], //结算方式
          email: [
            { required: true, message: "请填写邮箱", trigger: "blur" },
            {
              type: "email",
              message: "请填写正确的邮箱地址",
              trigger: ["blur", "change"]
            }
          ],
          BL_image_id: [
            { required: true, message: "请上传营业执照", trigger: "blur" }
          ],
          brand_time: [
            { required: true, message: "请填写营业执照有效期", trigger: "blur" }
          ],
          order_name: [
            { required: true, message: "请填写订单处理人姓名", trigger: "blur" }
          ],
          order_mobile: [
            { required: true, validator: checkPhone, trigger: "blur" }
          ],
          consignee: [
            { required: true, message: "请填写售后处理人姓名", trigger: "blur" }
          ],
          telephone: [{ required: true, validator: checkPhone, trigger: "blur" }],
          supplierReturn_email: [
            { required: true, message: "请填写售后处理人邮箱", trigger: "blur" },
            {
              type: "email",
              message: "请填写正确的邮箱地址",
              trigger: ["blur", "change"]
            }
          ],
          order_email: [
            { required: true, message: "请填写订单处理人邮箱", trigger: "blur" },
            {
              type: "email",
              message: "请填写正确的邮箱地址",
              trigger: ["blur", "change"]
            }
          ]
        },
        options: [
          { value: "家居日用", label: "家居日用" },
          { value: "礼品箱包", label: "礼品箱包" },
          { value: "美妆个护", label: "美妆个护" },
          { value: "食品酒水", label: "食品酒水" },
          { value: "母婴玩具", label: "母婴玩具" },
          { value: "家用电器", label: "家用电器" },
          { value: "汽车用品", label: "汽车用品" },
          { value: "数据3C", label: "数据3C" },
          { value: "户外运动", label: "户外运动" },
          { value: "钟表首饰", label: "钟表首饰" },
          { value: "电脑办公", label: "电脑办公" },
          { value: "促销品", label: "促销品" }
        ],
        settlement: [{ value: "0", label: "是" }, { value: "1", label: "否" }],
        tableData: []
      };
    },
    created() {
      this.action = this.baseUrl1 + "/api/open/b/b2b2c/fileservice/uploadFile?";
      this._getNature();
      this._getprovince();
      this._getCatagory();
      this._getBuyer();
      if (this.$route.query.id) {
        this.text = "供应商档案>编辑";
        this.supplierId = this.$route.query.id;
        supplierApplyPostByid(this.supplierId).then(res => {
          console.log(res);
          let personalForm = this.personalForm;
          personalForm.oldSupplierName = res.data.supplierName;
          personalForm.supplierName = res.data.supplierName; //供应商名称
          personalForm.supplierNature = res.data.supplierNature; //公司性质
          personalForm.address = res.data.supplierAddress; //公司地址
          personalForm.compony_url = res.data.supplierUrl; //公司网址
          personalForm.account =
                  (res.data.sysuser && res.data.sysuser.sysuserAccount) || ""; //账号
          personalForm.selfProduct = res.data.selfProduct; //自营品牌
          personalForm.agency_branch = res.data.agentBrand; //代理品牌
          personalForm.main_product = res.data.mainProduct; //主营商品
          personalForm.wholesale = res.data.isWholesale == false ? "2" : "1"; //主营商品
          personalForm.taxRate = res.data.extend.taxRate + "%"; //税率
          personalForm.api = res.data.isApi == false ? "0" : "1"; //api对接
          if(res.data.supplierCategory){
            personalForm.supplier_name = res.data.supplierCategory.split(';'); //品类名称
          }
          personalForm.adminId = res.data.adminId; //采销员
          personalForm.consignee =
                  (res.data.supplierReturn && res.data.supplierReturn.consignee) || ""; //售后人姓名
          personalForm.telephone =
                  (res.data.supplierReturn && res.data.supplierReturn.telephone) || ""; //售后人电话
          personalForm.supplierReturn_email =
                  (res.data.supplierReturn && res.data.supplierReturn.email) || ""; //售后人邮箱
          personalForm.wechat =
                  (res.data.supplierReturn && res.data.supplierReturn.wechat) || ""; //售后微信
          personalForm.province =
                  (res.data.supplierReturn && res.data.supplierReturn.province) || "";
          this.provincefunc(personalForm.province);
          personalForm.city = (res.data.supplierReturn && res.data.supplierReturn.city) || "";
          this.cityfunc(personalForm.city);
          personalForm.district = (res.data.supplierReturn && res.data.supplierReturn.district) || "";
          //personalForm.returnaddress = res.data.supplierReturn.email; //退货地址
          personalForm.addressmore = ((res.data.supplierReturn && res.data.supplierReturn.address) || "") ;//售后微信
          //consignee: "", //
          // : "", //
          // : "", //
          // returnaddress: [], //
          // : "", //售后详细地址
          personalForm.remark = res.data.remark; //备注
          personalForm.contactName = res.data.contacts[0].name; //联系人姓名
          personalForm.department = res.data.contacts[0].department; //部门
          personalForm.mobile = res.data.contacts[0].telephone; //手机
          personalForm.qq = res.data.contacts[0].qq; //QQ号
          personalForm.phone = res.data.contacts[0].fixedPhone; //固定电话
          personalForm.email = res.data.contacts[0].email; //邮箱
          personalForm.weixin = res.data.contacts[0].wechat; //微信号
          personalForm.born = res.data.contacts[0].birthday; //出生日期
          personalForm.order_name = res.data.contacts[1].name; //订单处理人姓名
          personalForm.order_mobile = res.data.contacts[1].telephone; //订单处理人手机
          personalForm.order_email = res.data.contacts[1].email; //订单处理人邮箱
          personalForm.order_wx = res.data.contacts[1].wechat; //订单处理人微信
          personalForm.generalManagerName = res.data.contacts[2].name; //总经理
          personalForm.generalManagerPhone = res.data.contacts[2].telephone; //总经理手机号码
          personalForm.supplierPhone = res.data.supplierPhone; //公司电话
          personalForm.identify = res.data.extend.identify; //纳税人识别号
          personalForm.fax = res.data.extend.fax; //传真号码
          personalForm.generalManagerWechat = res.data.contacts[2].wechat; //总经理微信号
          personalForm.generalManagerEmail = res.data.contacts[2].email; //总经理邮箱
          personalForm.generalManagerFixedPhone = res.data.contacts[2].fixedPhone; //总经理直线电话 fixedPhone
          personalForm.bankName = res.data.extend.bankName; //开户行
          personalForm.bankAccount = res.data.extend.bankAccount; //开户账号
          personalForm.bankCompany = res.data.extend.bankCompany; //开户名称
          personalForm.taxNumber = res.data.extend.taxNumber; //纳税人识别号
          personalForm.registeredAddress = res.data.extend.registeredAddress; //注册地址
          personalForm.registeredPhone = res.data.extend.registeredPhone; //注册电话
          personalForm.settleType = JSON.stringify(res.data.settleType); //结算方式
          if (
                  res.data.creditLimit !== 3000 &&
                  res.data.creditLimit !== 5000 &&
                  res.data.creditLimit !== 10000
          ) {
            personalForm.ious_input = res.data.creditLimit; //白条操作
            personalForm.ious = 1;
            personalForm.ious_readolay = false;
          } else {
            personalForm.ious = res.data.creditLimit;
            personalForm.ious_readolay = true;
          }
          personalForm.BL_image_url = res.data.extend.businessLicense; //营业执照图片地址
          personalForm.brand_time.push(res.data.extend.licenseTimeStart); //营业执照开始有效期
          personalForm.brand_time.push(res.data.extend.licenseTimeEnd); //营业执照结束有效期
          personalForm.taxpayerQualification =
                  res.data.extend.taxpayerQualification; //一般纳税人资格证
          personalForm.idCardFront = res.data.extend.idCardFront; //法人身份证
          personalForm.brandAuthUrl = res.data.extend.brandAuthUrl; //品牌授权书
          personalForm.trademarkUrl = res.data.extend.trademarkUrl; //商标注册证
          personalForm.authorization.push(res.data.extend.authorizationTimeStart); //授权书开始有效期
          personalForm.authorization.push(res.data.extend.authorizationTimeEnd); //授权书结束有效期
          personalForm.trademarkTime.push(res.data.extend.trademarkTimeStart); //营业执照开始有效期
          personalForm.trademarkTime.push(res.data.extend.trademarkTimeEnd); //营业执照结束有效期
          personalForm.authChainTime.push(res.data.extend.authChainTimeStart); //授权链开始有效期
          personalForm.authChainTime.push(res.data.extend.authChainTimeEnd); //授权链结束有效期
          personalForm.authorizationChain1 = res.data.extend.authorizationChain.split(
                  "<:>"
          )[0]
                  ? res.data.extend.authorizationChain.split("<:>")[0]
                  : ""; //一级授权链
          personalForm.authorizationChain2 = res.data.extend.authorizationChain.split(
                  "<:>"
          )[1]
                  ? res.data.extend.authorizationChain.split("<:>")[1]
                  : ""; //二级授权链
          personalForm.authorizationChain3 = res.data.extend.authorizationChain.split(
                  "<:>"
          )[2]
                  ? res.data.extend.authorizationChain.split("<:>")[2]
                  : ""; //三级授权链
          personalForm.authorizationChain4 = res.data.extend.authorizationChain.split(
                  "<:>"
          )[3]
                  ? res.data.extend.authorizationChain.split("<:>")[3]
                  : ""; //四级授权链
          personalForm.authorizationChain5 = res.data.extend.authorizationChain.split(
                  "<:>"
          )[4]
                  ? res.data.extend.authorizationChain.split("<:>")[4]
                  : ""; //五级授权链
          personalForm.authorizationChain6 = res.data.extend.authorizationChain.split(
                  "<:>"
          )[5]
                  ? res.data.extend.authorizationChain.split("<:>")[5]
                  : ""; //六级授权链
          personalForm.authorizationChain7 = res.data.extend.authorizationChain.split(
                  "<:>"
          )[6]
                  ? res.data.extend.authorizationChain.split("<:>")[6]
                  : ""; //七级授权链
          personalForm.authorizationChain8 = res.data.extend.authorizationChain.split(
                  "<:>"
          )[7]
                  ? res.data.extend.authorizationChain.split("<:>")[7]
                  : ""; //八级授权链

          //this.personalForm = personalForm;
        });
      }
    },
    computed: {},
    methods: {
      //选择省份触发
      provincefunc(val) {
        this.cityArr = [];
        this.districtArr = [];
        this.personalForm.city = "";
        this.personalForm.district = "";
        if(val=='')return;
        getcity(val).then(res => {
          this.cityArr = res.data.list;
        });
      },
      //选择市触发
      cityfunc(val) {
        this.districtArr = [];
        this.personalForm.district = "";
        if(val=='')return;
        getcity(val).then(res => {
          this.districtArr = res.data.list;
        });
      },
      //获取采销员
      _getBuyer() {
        let obj = {};
        obj.currentPage = 1;
        obj.size = 0;
        getBuyer(obj).then(res => {
          this.adminArr = res.data.list;
        });
      },
      //获取商品分类
      _getCatagory() {
        let obj = {};
        obj.type = "SELECT";
        obj.id = 0;
        getTreecatagory(obj).then(res => {
          res.data.forEach((item)=>{
            if(item.children){
              item.children.forEach((it)=>{
                it.children=null;
              })
            }
          })
          this.transleteData(res.data, this.categoryList);
          this.IterationDelateMenuChildren(this.categoryList);
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
      //获取公司性质
      _getNature() {
        getNature().then(res => {
          this.company_options = res.data;
        });
      },
      //结算方式选择
      settleType(val) {
        this.personalForm.settleType = val;
      },
      Theradio(val) {
        if (val != 1) {
          this.personalForm.ious_readolay = true;
          this.personalForm.ious_input = "";
        } else {
          this.personalForm.ious_readolay = false;
        }
      },
      //营业执照
      handleAvatarSuccess(res, file) {
        this.personalForm.BL_image_url = res.data.domain + res.data.filePath;
      },
      //一般纳税人资格证：
      handleAvatarSuccess1(res, file) {
        this.personalForm.taxpayerQualification =
                res.data.domain + res.data.filePath;
      },
      //法人身份证扫描件正反面：
      handleAvatarSuccess2(res, file) {
        this.personalForm.idCardFront = res.data.domain + res.data.filePath;
      },
      //品牌授权书：：
      handleAvatarSuccess3(res, file) {
        this.personalForm.brandAuthUrl = res.data.domain + res.data.filePath;
      },
      //商标注册证：
      handleAvatarSuccess4(res, file) {
        this.personalForm.trademarkUrl = res.data.domain + res.data.filePath;
      },
      //一级授权链
      handleauthorSuccess1(res, file) {
        this.personalForm.authorizationChain1 =
                res.data.domain + res.data.filePath;
      },
      //二级授权链
      handleauthorSuccess2(res, file) {
        this.personalForm.authorizationChain2 =
                res.data.domain + res.data.filePath;
      },
      //三级授权链
      handleauthorSuccess3(res, file) {
        this.personalForm.authorizationChain3 =
                res.data.domain + res.data.filePath;
      },
      //四级授权链
      handleauthorSuccess4(res, file) {
        this.personalForm.authorizationChain4 =
                res.data.domain + res.data.filePath;
      },
      //五级授权链
      handleauthorSuccess5(res, file) {
        this.personalForm.authorizationChain5 =
                res.data.domain + res.data.filePath;
      },
      //六级授权链
      handleauthorSuccess6(res, file) {
        this.personalForm.authorizationChain6 =
                res.data.domain + res.data.filePath;
      },
      //七级授权链
      handleauthorSuccess7(res, file) {
        this.personalForm.authorizationChain7 =
                res.data.domain + res.data.filePath;
      },
      //八级授权链
      handleauthorSuccess8(res, file) {
        this.personalForm.authorizationChain8 =
                res.data.domain + res.data.filePath;
      },
      //确认
      confirm() {
        this.$refs.personalForm.validate(valid => {
          if (valid) {
            this._supplierApplyPost();
          } else {
            throttleTipPop(this, "error", "请填写完整信息");
            return false;
          }
        });
      },
      _supplierApplyPost() {
        //得到所有授权链
        let arr = [];
        arr.push(this.personalForm.authorizationChain1);
        arr.push(this.personalForm.authorizationChain2);
        arr.push(this.personalForm.authorizationChain3);
        arr.push(this.personalForm.authorizationChain4);
        arr.push(this.personalForm.authorizationChain5);
        arr.push(this.personalForm.authorizationChain6);
        arr.push(this.personalForm.authorizationChain7);
        arr.push(this.personalForm.authorizationChain8);
        //let arr = Object.keys(this.personalForm).filter(itme=>(itme.includes('authorizationChain')));
        let data = {};
        data.personalForm = this.personalForm;
        data.personalForm.supplierReturn = {};
        data.personalForm.supplierReturn.consignee = this.personalForm.consignee;
        data.personalForm.supplierReturn.telephone = this.personalForm.telephone;
        data.personalForm.supplierReturn.email = this.personalForm.supplierReturn_email;
        data.personalForm.supplierReturn.wechat = this.personalForm.wechat;
        data.personalForm.supplierReturn.province = this.personalForm.province;
        data.personalForm.supplierReturn.city = this.personalForm.city;
        data.personalForm.supplierReturn.district = this.personalForm.district;
        data.personalForm.supplierReturn.address = this.personalForm.addressmore;
        console.log(data);
        if (this.supplierId) {
          supplierApplyEdior(data, arr, this.supplierId).then(res => {
            if (res.code == 200) {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.$router.push({ name: "MyFiles" });
            } else {
              // this.$message.error(res.message);
            }
          });
        } else {
          let saveData = JSON.parse(JSON.stringify(data));
          saveData.personalForm.pass = encryption.encrypt(
                  data.personalForm.pass,
                  "_fuyuanai@Maige_"
          );
          saveData.personalForm.checkPass = encryption.encrypt(
                  data.personalForm.checkPass,
                  "_fuyuanai@Maige_"
          );
          supplierApplyPost(saveData, arr).then(res => {
            if (res.code == 200) {
              this.$message({
                message: res.message,
                type: "success"
              });
              this.$router.push({ name: "MyFiles" });
            } else {
              this.$message.error(res.message);
            }
          });
        }
      },
      back() {
        this.$router.go(-1);
      },
      //获取省
      _getprovince() {
        getprovince().then(res => {
          this.addressArr = res.data.list;
        });
      },
      beforeAvatarUpload(file) {
        // const isJPG = file.type === 'image/jpeg';
        // const isLt2M = file.size / 1024 / 1024 < 2;
        // if (!isJPG) {
        //   this.$message.error('上传头像图片只能是 JPG 格式!');
        // }
        // if (!isLt2M) {
        //   this.$message.error('上传头像图片大小不能超过 2MB!');
        // }
        // return isJPG && isLt2M;
      }
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
    margin-left: 11px;
  }
  .yonghu {
    background: rgba(229, 162, 75, 1);
  }
  .gongneng {
    background: rgba(103, 194, 49, 1);
  }
  .iconfont {
    color: white;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 280px;
    height: 180px;
    line-height: 180px;
    text-align: center;
  }
  .avatar-uploader-icon1 {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 180px;
    line-height: 180px;
    text-align: center;
  }
  .el-upload--picture-card {
    font-size: 28px;
    color: #8c939d;
    width: 280px;
    height: 180px;
    line-height: 180px;
    text-align: center;
  }
  .row_top {
    margin-top: 30px;
  }
  .line_div {
    width: 95%;
    margin-left: 2.5%;
    height: 1px;
    border: 1px dashed rgba(178, 214, 253, 1);
    margin: 20px 0;
  }
  .settleType_span {
    color: red;
    font-size: 14px;
    line-height: 32px;
  }
  .way {
    display: flex;
    line-height: 28px;
  }
  .loan {
    display: flex;
    align-items: center;
    font-size: 14px;
    line-height: 38px;
  }
  .avatar1 {
    width: 150px;
    height: 180px;
  }
  .avatar {
    width: 280px;
    height: 180px;
  }
  /deep/ .multiselect .el-form-item--small .el-form-item__content{
    line-height: 14px;
  }
  /deep/ .vue-treeselect__multi-value-item{
    padding: 4px 0;
  }
</style>
