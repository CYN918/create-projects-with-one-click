<template>
  <div id="toInvioce">
    <el-dialog width="73%" :visible.sync="editVisible" :before-close="createClosing">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">编辑开票</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form ref="infoForm" :model="pageData" :rules="rules" label-width="120px" size="small">
            <div class="search-wrapper">
              <div class="mbottom">
                <h4 class="title1">开票信息</h4>
              </div>
              <div class="search-base">
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="发票类型：" prop="invoiceType">
                        <el-col :span="19">
                          <el-select v-model="pageData.invoiceType" placeholder="请选择"
                          style="width:100%;">
                          <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="发票抬头：" prop="invoicePayable">
                      <el-col :span="19">
                        <el-select v-model="pageData.invoicePayable" placeholder="请选择"
                        style="width:100%;">
                          <el-option
                              v-for="item in options1"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>

                </el-row>
                <div class="tips">
                    我公司依法开具发票，如你购买的商品按税法规定属于不得从增值税销项税额中抵扣的项目
                    <br />（如集体福利或个人消费等），请选择普通发票
                  </div>

                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="单位名称：" prop="targetName">
                        <el-col :span="19">
                          <el-input v-model="pageData.targetName" placeholder="请输入单位名称"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="纳税人识别号：" prop="taxNumber">
                      <el-col :span="19">
                        <el-input v-model="pageData.taxNumber" placeholder="或统一社会信用代码"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="开户银行：" prop="vatBankName">
                        <el-col :span="19">
                          <el-input v-model="pageData.vatBankName"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="银行账户：" prop="vatBankAccount">
                      <el-col :span="19">
                        <el-input v-model="pageData.vatBankAccount"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="注册电话：" prop="vatPhone">
                        <el-col :span="19">
                          <el-input v-model="pageData.vatPhone"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="注册地址：" prop="vatAddress">
                      <el-col :span="19">
                        <el-input v-model="pageData.vatAddress"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                  <el-row>
                    <el-col>
                      <el-form-item label="开票内容：" prop="invoiceContent">
                        <el-col :span="22">
                          <el-input v-model="pageData.invoiceContent"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <div class="goods-fitter">
        <el-form ref="infoForm" :model="form" :rules="rules" label-width="120px" size="small">
          <div class="search-wrapper">
            <div class="mbottom">
              <h4 class="title1">发票详情</h4>
            </div>
            <div class="search-base">
              <div class="inner">
                <div class="invoice_title">
                  <i class="star">*</i>
                  <span>开票内容：</span>
                </div>
                <div class="btn" @click="btn1" :class="this.orderIndex===1?'active':''">
                  订单详细
                  <div class="delta" v-if="this.orderIndex===1">
                    <i class="el-icon-check"></i>
                  </div>
                </div>
                <div class="btn" @click="btn2" :class="this.orderIndex===2?'active':''">
                  开票明细
                  <div class="delta" v-if="this.orderIndex===2">
                    <i class="el-icon-check"></i>
                  </div>
                </div>
              </div>
              <div class="goods-fitter" v-if="this.orderIndex===1">
                <div class="mcard" style="padding-bottom:0">
                  <el-table :data="pageData.goodsDetailList1" border style="width: 100%" stripe>
                    <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>
                    <el-table-column
                      prop="name"
                      label="销售单号"
                      align="center"
                      width="120"
                    >
                      <template slot-scope="scope">
                          {{scope.row.saleOrderNo}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactName" label="商品名称" align="center" width="180">
                        <template slot-scope="scope">
                          {{scope.row.goodsName}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="规格型号" align="center">
                          <template slot-scope="scope">
                          {{scope.row.goodsSpecSize}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="单位" align="center"  width="100">
                        <template slot-scope="scope">
                          {{scope.row.goodsUnit}}
                      </template>
                    </el-table-column>

                    <el-table-column prop="commonContactDept" label="数量" align="center"  width="100">
                      <template slot-scope="scope">
                          {{scope.row.goodsCount}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="不含税单价" align="center"  width="100">
                      <template slot-scope="scope">
                          {{scope.row.notTaxPrice}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="含税单价" align="center"  width="100">
                        <template slot-scope="scope">
                          {{scope.row.goodsPrice}}
                      </template>
                    </el-table-column>
                   <!--  <el-table-column prop="commonContactDept" label="不含税金额" align="center"  width="100">
                        <template slot-scope="scope">
                          无
                      </template>
                    </el-table-column> -->
                    <el-table-column prop="commonContactDept" label="税率" align="center" width="100">
                        <template slot-scope="scope">
                          {{scope.row.taxRate}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="税额" align="center"  width="100">
                        <template slot-scope="scope">
                          {{scope.row.tax}}
                      </template>
                    </el-table-column>
                    <el-table-column label="含税合计" align="center">
                      <template slot-scope="scope">
                          {{scope.row.totalAmount}}
                      </template>
                    </el-table-column>
                    <el-table-column label="操作" align="center" width="100">
                      <template slot-scope="scope">
                        <div class="txt_blue">
                          <span class="operate" @click="add1(scope.row,scope.$index)">添加</span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- <div class="total" style="margin-left:80%;margin-top:20px">
                    <el-form label-width="130px" size="small">
                      <el-form-item label="总合计：">
                        <el-col :span="24">
                             <el-input v-model="total1"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-form>
                  </div> -->
                </div>
              </div>
              <div class="goods-fitter" v-if="this.orderIndex===2">
                <div class="mcard" style="padding-bottom:0">
                  <el-table :data="pageData.goodsDetailList2" border style="width: 100%" stripe>
                    <el-table-column label="序号" type="index" align="center" width="50"></el-table-column>

                    <el-table-column prop="commonContactName" label="商品名称" align="center" width="180">
                        <template slot-scope="scope">
                         <div v-if="showIndex!==scope.$index"> {{scope.row.goodsName}}</div>
                            <el-input
                                    type="textarea"
                                    :autosize="{ minRows: 1, maxRows: 5}"
                                    placeholder="请输入内容"
                                    v-if="showIndex===scope.$index"
                                    v-model="scope.row.goodsName"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="规格型号" align="center">
                          <template slot-scope="scope">
                          {{scope.row.goodsSpecSize}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="单位" align="center"  width="100">
                        <template slot-scope="scope">
                          {{scope.row.goodsUnit}}
                      </template>
                    </el-table-column>

                    <el-table-column prop="commonContactDept" label="数量" align="center" width="100">
                      <template slot-scope="scope">
                         <div v-if="showIndex!==scope.$index"> {{scope.row.goodsCount}}</div>
                         <el-input v-if="showIndex===scope.$index" v-model="scope.row.goodsCount"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="不含税单价" align="center" width="100">
                      <template slot-scope="scope">
                          {{scope.row.notTaxPrice}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="含税单价" align="center" width="100">
                        <template slot-scope="scope">
                          {{scope.row.goodsPrice}}
                      </template>
                    </el-table-column>
                  <!--   <el-table-column prop="commonContactDept" label="不含税金额" align="center" width="100">
                        <template slot-scope="scope">
                          无
                      </template>
                    </el-table-column> -->
                    <el-table-column prop="commonContactDept" label="税率" align="center" width="100">
                        <template slot-scope="scope">
                          {{scope.row.taxRate}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="税额" align="center"  width="100">
                        <template slot-scope="scope">
                          {{scope.row.tax}}
                      </template>
                    </el-table-column>
                    <el-table-column label="含税合计" align="center">
                      <template slot-scope="scope">
                          {{scope.row.totalAmount}}
                      </template>
                    </el-table-column>

                    <el-table-column label="操作" align="center" width="130" >
                      <template slot-scope="scope">
                        <div class="txt_blue">
                          <span class="operate" @click="edit(scope.row,scope.$index)">编辑</span>
                          <span class="operate" @click="delete1(scope.row,scope.$index)">删除</span>
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="total" style="margin-left:80%;margin-top:20px">
                    <el-form label-width="130px" size="small">
                      <el-form-item label="开票合计：">
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
        </el-form>

        <div class="mail-fitter" style="margin-top:20px">
          <el-form ref="infoForm" :model="pageData" :rules="rules" label-width="120px" size="small">
            <div class="search-wrapper">
              <div class="mbottom">
                <h4 class="title1">发票信息</h4>
              </div>
              <div class="search-base">
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="销售单号：">
                        <el-col :span="19">
                         {{pageData.saleOrderNo}}
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="客 户：">
                      <el-col :span="19">
                          {{pageData.customerName}}
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="公司抬头：" prop="supplierName">
                        <el-col :span="19">
                          <el-input v-model="pageData.openCompanyName"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="开票公司：" prop="openInvoiceCompany">
                      <el-col :span="19">
                          <el-select v-model="pageData.openInvoiceCompany" placeholder="请选择" style="width:100%"
                          @change="choose">
                           <el-option
                                  v-for="(item,index) in companyList"
                                  :key="index"
                                  :label="item.sccCompanyName"
                                  :value="index">
                                </el-option>

                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="纳税人识别号：" prop="openTaxNumber">
                        <el-col :span="19">
                          <el-input v-model="pageData.openTaxNumber">
                          </el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="开 户 行：" prop="openBankName">
                      <el-col :span="19">
                        <el-input v-model="pageData.openBankName"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="银行账号：" prop="openBankAccount">
                        <el-col :span="19">
                          <el-input v-model="pageData.openBankAccount"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="注册电话：" prop="customerReTel">
                      <el-col :span="19">
                        <el-input v-model="pageData.openPhone"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="开票状态：" prop="openStatus">
                       <el-col :span="19">
                          <el-select v-model="pageData.openStatus" placeholder="请选择" style="width:100%">
                              <el-option
                                  v-for="(item,index) in options2"
                                  :key="index"
                                  :label="item.name"
                                  :value="item.value">
                                </el-option>
                        </el-select>
                      </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="开票日期：" prop="openInvoiceDate">
                        <el-col :span="19">
                            <el-date-picker
                              v-model="pageData.openInvoiceDate"
                              type="date"
                              placeholder="选择日期"
                              valueFormat='yyyy-MM-dd'
                              style="width:100%"
                              :picker-options="pickerOptions0">
                            </el-date-picker>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
               <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="发票张数：" prop="openInvoiceNum">
                        <el-col :span="19">
                          <el-input
                            v-model.number="pageData.openInvoiceNum">
                          </el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="合计金额：" prop="invoiceNumber">
                        <el-col :span="19">
                          <el-input
                            oninput ="value=value.replace(/[^0-9.]/g,'')" v-model="pageData.invoiceAmount" readonly>
                          </el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>

                </el-row>
                   <el-row v-for="(item,index) in pageData.invoiceExtendDetailParamList" :key="index">
                    <el-col :span="6">
                      <el-col>
                        <el-form-item label="发票编号：" prop="invoiceNumber">
                            <el-col :span="22">
                              <el-input
                               v-model.number="item.invoiceNo">
                              </el-input>
                            </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                      <el-col :span="8">
                         <el-col :span="16">
                             <el-form-item label="发票金额：" prop="invoiceNumber">
                              <el-input
                               oninput ="value=value.replace(/[^0-9.]/g,'')" v-model="item.invoiceAmount">
                              </el-input>
                        </el-form-item>
                          </el-col>

                       <el-col :span="3" :offset="1">
                          <div class="add">
                            <i class="iconfont icon-add"></i> <span  @click="add(index)">添加</span>
                          </div>
                       </el-col>
                          <el-col :span="3" :offset="1">
                        <div class="deleteA" v-if="index!==0">
                          <i class="iconfont icon-del"></i> <span  @click="deleteA(index)" >删除</span>
                        </div>
                      </el-col>
                    </el-col>
                    <el-col :span="10">
                      <el-upload
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        class="upload-demo"
                        :action="baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile'">
                        <el-button size="small" type="primary" @click="getIndex(index)">点击上传</el-button>
                      </el-upload>

                          <el-button size="small" type="primary" style="margin:0 10px;">发票凭证</el-button>

                        
                        <el-button size="small" type="primary" style="margin-right:10px;" @click="preview(index)">查看</el-button>
                        
                        <div class="uploadImg">
                            <span>导入</span>
                            <input type="file" @change="picUpload($event)" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" />
                        </div>

                          <el-button size="small" type="primary"  v-if="index===0" @click="downloadInvoiceEx">下载导入发票模板</el-button>
                    </el-col>
                  </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-col>
                      <el-form-item label="备注：" prop="remark">
                        <el-col :span="22">
                          <el-input
                            type="textarea"
                            :autosize="{ minRows: 5, maxRows: 5}"
                            placeholder="请输入内容"
                            v-model="pageData.openRemark">
                          </el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div>
        <div class="mail-fitter" style="margin-top:20px">
          <el-form ref="infoForm" :model="pageData.addressInfoVo" :rules="rules" label-width="120px" size="small">
            <div class="search-wrapper">
              <div class="mbottom">
                <h4 class="title1">收票人信息</h4>
              </div>
              <div class="search-base">
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="收票人姓名：" prop="userName">
                        <el-col :span="19">
                          <el-input v-model="pageData.addressInfoVo.userName"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="收票人手机：" prop="userPhone">
                      <el-col :span="19">
                          <el-input v-model="pageData.addressInfoVo.userPhone"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-col>
                      <el-form-item label="所在地区：" prop="provinceId">
                          <el-col :span="4">
                             <el-select v-model="pageData.addressInfoVo.provinceId" placeholder="请选择省"
                             @change="chooseProvince" filterable>
                                <el-option
                                  v-for="item in province"
                                  :key="item.regionId"
                                  :label="item.regionName"
                                  :value="item.regionId">
                                </el-option>
                              </el-select>
                          </el-col>
                          <el-col :span="4" :offset="1" prop="cityId">
                              <el-select v-model="pageData.addressInfoVo.cityId" placeholder="请选择市"
                                         @change="chooseCity" filterable>
                                <el-option
                                  v-for="item in city"
                                  :key="item.regionId"
                                  :label="item.regionName"
                                  :value="item.regionId">
                                </el-option>
                              </el-select>
                          </el-col>
                          <el-col :span="4" :offset="1" prop="areaId">
                              <el-select v-model="pageData.addressInfoVo.areaId" placeholder="请选择区"
                              @change="chooseArea" filterable>
                                <el-option
                                  v-for="item in area"
                                  :key="item.regionId"
                                  :label="item.regionName"
                                  :value="item.regionId">
                                </el-option>
                              </el-select>
                          </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row>
                    <el-form-item label="详细地址：" prop="address">
                          <el-col :span="22">
                          <el-input
                            type="textarea"
                            :autosize="{ minRows: 4, maxRows: 4}"
                            placeholder="详细地址，街道，门牌号等"
                            v-model="pageData.addressInfoVo.address">
                          </el-input>
                        </el-col>
                    </el-form-item>
                </el-row>
              <div class="inner1">
                <div class="invoice_title1">

                  <span>发票须知：</span>
                </div>
                <div class="invoice_content">
                    <span>1.因发货仓库所在地货权归属政策原因，订单可能为您拆分开具多张发票</span><br/>
                    <span>2.单笔订单只支持开具一种类型的发票</span><br/>
                    <span>3. 开票金额为用户实际支付的金额</span>
                </div>
              </div>
              </div>
            </div>
          </el-form>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="createClose()" size="small">关 闭</el-button>
        <el-button type="primary" @click="apply()" size="small">确 定</el-button>
      </span>
    </el-dialog>
      <!-- 上传预览 -->
       <el-dialog :visible.sync="dialogVisible" :modal="true" :append-to-body="false">
                                        <img width="100%" :src="dialogImageUrl" v-if="showSwitch===0" alt="">
                                       <!--  <p v-if="showSwitch===0">{{dialogImageUrl}}</p> -->
                                       <p v-if="showSwitch===1">请点击下面链接查看或下载附件</p>
                                        <p class="pushNew" v-if="showSwitch===1" @click="pushNew()">{{dialogImageUrl}}</p>
                                        <span slot="footer" class="dialog-footer"></span>
        </el-dialog>
  </div>
</template>

<script>
import { getErpGoods } from "@/api/product/index";
import {findLocation,editApplyInvioce,uploadingInvoice,downloadInvoice} from '@/api/sale/index';
import request from '@/utils/request'
import { throttleTipPop } from "@/utils/functions.js";
export default {
  data() {
    return {
      pickerOptions0: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
            },
      imgArr:[],
      dialogImageUrl: '',
      dialogVisible: false,
      editVisible: false,
      accountVisible: false, //选择收款账户
      partyVisible: false, //选择甲方弹窗
      addressVisible: false, //添加地址弹窗
      showIndex:'',
      companyList:[],//开票公司数据
      dataArr: [],
      orderIndex: 1,
       pageData:{
        addressInfoVo:{
        }
      },//展示数据
       province:[],//省
      city:[],//市
      area:[],//区
      upIndex:'',//上传下标
      fileUrl:'',
      showSwitch:'',//切换开关
      tableDatas: {
        currentPage: 1,
        sizes: [10, 20, 50, 100],
        size: 10,
        total: 0
      },
        options: [{
          value: 1,
          label: '增值税专用发票'
        }, {
          value: 2,
          label: '普通发票'
        },],
         options1: [{
          value: 0,
          label: '个人'
        }, {
          value: 1,
          label: '单位'
        },],
        options2:[{
             value: 0,
          name: '未开票'
        }, {
          value: 1,
          name: '已开票'

        }],
      form: {
        current_page: 0,
        page_size: 10,
        total_count: 0,
        invoiceType:'',//发票类型
        invoicePayable:'',//发票抬头
        targetName:'',//单位名称
        taxNumber:'',//纳税识别号
        vatBankName:'',//开户行
        vatBankAccount:'',//银行账户
        vatPhone:'',//注册电话
        vatAddress:'',//注册地址
        openInvoiceCompany:'',//开票公司
        num:1,//发票张数
       /*  supplierName:'',//供应商名称
        invoiceDate:'',//开票日期
        customerTaxNumber:'',//客户纳税识别号
        customerOpenBank:'',//客户开户行
        customerReTel:'',//客户注册电话
        invoiceStatus:'',//开票状态
        invoiceVoucher:'',//发票凭证
        invoiceNumber:'',//发票编号 */
        remark:'',//备注
        receiveName:'',//收票人姓名
        receiveTelephone:'',//收票人电话
        receiveProvince:'',//所在省
        receiveCity:'',//收票人所在市
        receiveArea:'',//收票人所在区
        receiveTown:'',//详细地址

        imgUrl:'',//上传凭证地址
      },
      tableData: [
        {
          date: "2016-05-02",
          name: "张小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        }
      ],
      formData: {
        current_page: 1,
        page_size: 2,
        total_count: 0
      },
      rules: {
        invoiceType: [{ required: true, message: "此项为必选项", trigger: ["blur","change"] }],
        invoicePayable: [
          { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ],
        targetName: [
          { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ],
        vatBankName: [
          { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ],
       taxNumber: [{ required: true, message: "此项为必选项", trigger: ["blur","change"] }],
       vatBankAccount: [
          { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ],
       vatPhone: [
          { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ],
        vatAddress: [
          { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ],
        content: [
          { required: true, message: "此项为必选项", trigger: ["blur","change"] }
        ],
        userName: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        userPhone: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        provinceId: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        cityId: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        areaId: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        address: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        openInvoiceDate:[
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        openInvoiceNum:[
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
       
        openStatus:[
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        openInvoiceCompany:[
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
      }
    };
  },
  created() {},
  props: ["editVisibles","invoiceData","firstLevel",'companyData',"cityData","areaData"],
  watch: {
    editVisibles(val) {
      this.editVisible = val;

    },
    invoiceData(val){
      this.pageData = val;
    },
    firstLevel(val){
      this.province = val ;
    },
    cityData(val){
      this.city = val ;
    },
    areaData(val){
      this.area = val ;
    },
    companyData(val){
      this.companyList =val;
    },
    //监听数组中值变化
    'pageData.goodsDetailList2':{
      handler(newVal, oldVal) {
        for(let i=0;i<newVal.length;i++){
          if(Number(newVal[i].goodsCount)>=0&&Number(newVal[i].goodsPrice)>=0){
              newVal[i].totalAmount = Number(newVal[i].goodsCount) * Number(newVal[i].goodsPrice)
          }
        }
    },
    deep: true
    }
  },
   computed: {
      total1(){
      let totals = 0
      let _this = this
      if(_this.pageData.goodsDetailList2&&_this.pageData.goodsDetailList2.length>0){
          for(var i = 0;i<_this.pageData.goodsDetailList2.length;i++){
            if(!isNaN(_this.pageData.goodsDetailList2[i].totalAmount)){
              _this.pageData.goodsDetailList2[i].totalPrice = _this.pageData.goodsDetailList2[i].totalAmount;
              totals+=parseFloat(_this.pageData.goodsDetailList2[i].totalAmount)
            }else{
              totals = 0
              
            }
      }

      }
      this.pageData.invoiceAmount = totals;
        return totals

      }
  },
  methods: {
    //关闭页面
    createClose() {
      
      this.$confirm('您确认要关闭吗？')
                    .then(_ => {
                this.showIndex = '';
                this.editVisible = false;
                this.$emit("createCloseD", this.editVisible);
            })
            .catch(_ => {});
    },
    createClosing() {
      
      this.$confirm('您确认要关闭吗？')
                    .then(_ => {
                this.showIndex = '';
                this.editVisible = false;
                this.$emit("createClosingD", this.editVisible);
            })
            .catch(_ => {});
    },
    btn1() {
      this.orderIndex = 1;
    },
    btn2() {
      this.orderIndex = 2;
    },
    //编辑发票
    apply(){
      /* this.pageData.invoiceAmount = this.total1; */
      this.pageData.expectedDealDate = this.pageData.openInvoiceDate;
      this.pageData.openInvoiceUrl = this.form.imgUrl;
      this.pageData.remark = this.pageData.openRemark;
      this.pageData.opFlag = 0;
         if(!this.pageData.invoiceType||
          !this.pageData.invoicePayable||
          !this.pageData.targetName||
          !this.pageData.taxNumber||
          !this.pageData.vatBankName||
          !this.pageData.vatBankAccount||
          !this.pageData.vatPhone||
          !this.pageData.vatAddress||

             !this.pageData.addressInfoVo.userName||
          !this.pageData.addressInfoVo.userPhone||
          !this.pageData.addressInfoVo.provinceId||
          !this.pageData.addressInfoVo.cityId||
          !this.pageData.addressInfoVo.areaId||
          !this.pageData.addressInfoVo.address){
             throttleTipPop(this, "warning", "请填写带*的填项", 2000);
        }else{
          editApplyInvioce(this.pageData).then(res=>{
                if(res.code===200){
                  throttleTipPop(this, "success", "编辑发票成功", 2000);
                  this.editVisible =false;
                  this.$emit("editInvioce1",this.editVisible)
                }
          })
        }
    },
    //添加
    add1(row){
      let arr =[];
        if(this.pageData.goodsDetailList2.length>0){
            for (let i = 0; i < this.pageData.goodsDetailList2.length; i++) {
            if(this.pageData.goodsDetailList2[i].goodsSkuId===row.goodsSkuId){

                throttleTipPop(this, "error", "开票明细已经存在相同的订单", 2000);
                return false;
            }
        }
         this.pageData.goodsDetailList2.push(row)
      }else{
          this.pageData.goodsDetailList2.push(row)
      }
    },
    delete1(row, index) {
      this.showIndex = '';
      this.pageData.goodsDetailList2.splice(index,1);
    },
    //编辑
    edit(row,index){
          this.showIndex = index;
    },
    //导入发票
    picUpload(e){
          var files = e.target.files
          const file = event.target.files[0]
          var formFile = new FormData(); 
          formFile.append("multipartFile", file); //加入文件对象
          var data = formFile;
          if(data){
            uploadingInvoice(data).then(res=>{
              for(let i =0;i<res.data.length;i++){
                    res.data[i].fileInvoiceUrl = "";
              }
              this.pageData.invoiceExtendDetailParamList = res.data;
              
            })
          }
    },
    //下载模板
    downloadInvoiceEx(){
            let type = JSON.parse(localStorage.getItem("user")).data.sysuserType;
            const key  = "sale_invoice_template";
            request({
                  url: '/api/open/b/b2b2c/erpservice/sale_invoice/download.json',
                  method: 'post',
                  responseType: 'blob',
                  data:key
                }).then(res => {
                  var reader = new FileReader();
                  reader.readAsDataURL(res);   // 转换为base64，可以直接放入a标签href
                  reader.onload = function (e) {
                    var a = document.createElement('a');
                    a.download = '发票模板.xlsx';
                    a.href = e.target.result;
                    document.body.appendChild(a);    // 修复firefox中无法触发click
                    a.click();
                    a.remove();
                  }
					}) 
    },
    
      //选择省
    chooseProvince(data) {
      let obj = {};
      obj = this.province.find((item)=>{
        return item.regionId === data;
      });
      this.pageData.addressInfoVo.provinceName = obj.regionLongname;

      findLocation(data).then(res=>{
        this.pageData.addressInfoVo.cityId = '';
        this.pageData.addressInfoVo.areaId = '';
          this.city = res.data.list
      })
    },
    //选择市
    chooseCity(data){
      let obj = {};
      obj = this.city.find((item)=>{
        return item.regionId === data;
      });

      this.pageData.addressInfoVo.cityName = obj.regionLongname;
      findLocation(data).then(res=>{
        this.pageData.addressInfoVo.areaId = '';
        this.area = res.data.list;
      })
    },
    //选择区
    chooseArea(data){
      let obj = {};
      obj = this.area.find((item)=>{
        return item.regionId === data;
      });

      this.pageData.addressInfoVo.areaName = obj.regionLongname;
    },
     //获得下标
      getIndex(index){
          this.upIndex = index;

      },
      //上传成功
        handleAvatarSuccess(file) {
          this.$message.success('上传发票凭证成功！')
            this.pageData.invoiceExtendDetailParamList[this.upIndex].fileInvoiceUrl = file.data.domain + file.data.filePath;
      },
      //预览
        preview(index){
          console.log(index);
        if(this.pageData.invoiceExtendDetailParamList[index].fileInvoiceUrl===null){
          this.dialogImageUrl = '';
        }else{
          this.dialogImageUrl = this.pageData.invoiceExtendDetailParamList[index].fileInvoiceUrl;
        }


            if (this.dialogImageUrl !== '') {
          if(this.dialogImageUrl.indexOf(".jpg") !== -1
              || this.dialogImageUrl.indexOf("shouji.png") !== -1
          ||this.dialogImageUrl.indexOf(".jpeg") !== -1){
              this.showSwitch =0;

          }else{
              this.showSwitch =1;
          }
              this.dialogVisible = true;
        }else{
           throttleTipPop(this, "error", "请先上传发票凭证！", 2000);
        }
      },
      beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
          this.$message.error('上传文件不能超过 2MB!');
        }
        return isLt2M;
      },
      //跳到新页面
      pushNew(){
          window.open(this.dialogImageUrl, "_blank");
      },
      //添加行
      add(index){

          if(this.pageData.invoiceExtendDetailParamList[index].invoiceNo===''||!/^[0-9]*$/.test(this.pageData.invoiceExtendDetailParamList[index].invoiceNo)||!/^([1-9][0-9]*)+(.[0-9]{1,2})?$/.test(this.pageData.invoiceExtendDetailParamList[index].invoiceAmount)){
              throttleTipPop(this, "error", "发票编号或发票金额不为数字时，不可添加!", 2000);
              return false;
       }else{
           this.pageData.invoiceExtendDetailParamList.push({invoiceNo:'',invoiceDetailId:'',invoiceAmount:'',fileInvoiceUrl:''});
            this.pageData.invoiceExtendDetailParamList[index+1].invoiceNo = Number(this.pageData.invoiceExtendDetailParamList[index].invoiceNo)+1
            this.pageData.invoiceExtendDetailParamList[index+1].invoiceAmount = this.pageData.invoiceExtendDetailParamList[index].invoiceAmount;

          }

      },
      //删除行
      deleteA(index){
          this.pageData.invoiceExtendDetailParamList.splice(index,1);
      },

      choose(id){
          this.pageData.openInvoiceCompanyId = this.companyList[id].sccId;  //开票公司ID
          this.pageData.openInvoiceCompany = this.companyList[id].sccCompanyName; //开票公司
          this.pageData.openCompanyName = this.companyList[id].sccInvoiceRise; //抬头公司
          this.pageData.openTaxNumber = this.companyList[id].sccTaxNum; //识别号
          this.pageData.openPhone = this.companyList[id].sccTelephone;   //注册电话
          this.pageData.openBankName = this.companyList[id].bankName; //开户行
          this.pageData.openBankAccount = this.companyList[id].bankAccount; //银行账号

      },
    address() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    handleChange() {},


  }
};
</script>

<style lang="scss" >
@import "@/common/scss/variable.scss";
#toInvioce {
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
  .tips {
    position: relative;
    left: 120px;
    top: -3px;
    margin-bottom: 10px;
    color: #999999;
  }
  .search-base {
    .inner {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .btn {
        border: 1px solid #d7e0f1;
        width: 94px;
        height: 32px;
        text-align: center;
        border-radius: 4px;
        line-height: 32px;
        cursor: pointer;
        margin-left: 10px;
        margin-right: 20px;
        position: relative;
        overflow: hidden;
        .delta {
          position: absolute;
          right: 0;
          top: 8px;
          width: 0;
          height: 0;
          border: 11px solid transparent;
          border-bottom-color: #4a99fa;
          border-right-color: #4a99fa;
          border-radius: 0 0 1px 0;
          .el-icon-check {
            position: absolute;
            top: -3px;
            left: -3px;
            color: #fff;
          }
        }
      }
      .active {
        border: 1px solid #4a99fa;
      }
      .invoice_title {
        width: 120px;
        text-align: right;
        box-sizing: border-box;
        padding-right: 12px;
        .star {
          margin-right: 5px;
          color: red;
        }
      }
    }
  }
  .txt_blue {
    color: #4a99fa;
    text-align: center;
    .operate {
      cursor: pointer;
    }
    .operate:nth-of-type(1) {
      margin-right: 24px;
      cursor: pointer;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 24px;
    color: #8c939d;
    padding: 20px 50px;
    width: 370px;
    height: 117px;
    line-height: 117px;
    text-align: center;
    font-style: normal;
  }
  .avatar {
    width: 370px;
    height: 117px;
    display: block;
  }
  .el-input--small .el-input__inner {
    height: 32px !important;
    line-height: 32px !important;
  }
  .inner1{
      color:#999;
      display: flex;
      margin-bottom: 10px;
    .invoice_title1{
      margin-left:36px;
      margin-right:14px;

    }
    .invoice_content{
        line-height: 24px;
        margin-top: -4px;
    }
  }
  /deep/ .el-dialog__headerbtn{
      top:10px;
    }
  /deep/ .el-upload{
        border-radius: 6px;
  }
  /deep/ .el-upload-list--picture .el-upload-list__item {
          float: left;
          width: 48%;
          margin-right: 10px;
  }
  .upType{
    width:92px;
    height: 92px;
    border-radius: 6px;
    display: inline-block;
    line-height: 92px;
    text-align: center;
  }
   .pushNew{
    cursor: pointer;
    text-decoration:underline;
    color: #4c86f4;
  }
  .uploadImg {
    width: 60px;
    height: 32px;
    position: relative;
    display: inline-block;
    background: #4c86f4;
    color: #fff;
    line-height: 40px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
    margin-right: 10px;
    line-height: 32px;
    span{
      
      cursor: pointer;
    }
    input {
      width: 100%;
      height: 100%;
      z-index: 1;
      opacity: 0;
      position: absolute;
      cursor: pointer;
      left: 0;
      top:0;
    }
  }
}
</style>
