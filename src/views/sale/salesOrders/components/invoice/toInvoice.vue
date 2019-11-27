<template>
  <div id="toInvioce">
    <el-dialog width="73%" :visible.sync="addVisible" :before-close="createClosing">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">申请开票</h4>
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
                          {{scope.row.totalPrice}}
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
                          :autosize="{ minRows: 1, maxRows: 3}"
                          placeholder="请输入内容"
                         v-if="showIndex===scope.$index" 
                         v-model="scope.row.goodsName">
                          
                         </el-input>
                           <el-button  v-if="showIndex===scope.$index"  @click="chooseGoods(scope.$index)" size="mini">选择</el-button>
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="规格型号" align="center">
                          <template slot-scope="scope">
                          <div v-if="showIndex!==scope.$index">  {{scope.row.goodsSpecSize}}</div>
                          <el-input 
                          type="textarea"
                          :autosize="{ minRows: 1, maxRows: 3}"
                          placeholder="请输入内容"
                         v-if="showIndex===scope.$index" 
                         v-model="scope.row.goodsSpecSize">
                          
                         </el-input>
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
                         <el-input size="small" v-if="showIndex===scope.$index" v-model="scope.row.goodsCount"></el-input>
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="不含税单价" align="center" width="100">
                      <template slot-scope="scope">
                          {{scope.row.notTaxPrice}}
                      </template>
                    </el-table-column>
                    <el-table-column prop="commonContactDept" label="含税单价" align="center" width="100">
                        <template slot-scope="scope">
                         <div v-if="showIndex!==scope.$index">  {{scope.row.goodsPrice}}</div>
                          <el-input size="small" v-if="showIndex===scope.$index" v-model="scope.row.goodsPrice"></el-input>
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
                          {{scope.row.totalPrice}}
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
                      <el-form-item label="总合计：">
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

        <!-- <div class="mail-fitter" style="margin-top:20px">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="120px" size="small">
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
                          VT201908260004
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="客 户：">
                      <el-col :span="19">
                          平安银行股份有限公司
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="供应商名称：" prop="supplierName">
                        <el-col :span="19">
                          <el-input v-model="form.supplierName"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="开票公司：" prop="invoiceCompany">
                      <el-col :span="19">
                          <el-select v-model="form.invoiceCompany" placeholder="请选择" style="width:100%">
                          <el-option label="深圳市迈戈实业有限公司" value=1></el-option>
                          <el-option label="第二种：全额支付" value=2></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="纳税人识别号：" prop="customerTaxNumber">
                        <el-col :span="19">
                          <el-input v-model="form.customerTaxNumber">
                          </el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="开 户 行：" prop="customerOpenBank">
                      <el-col :span="19">
                        <el-input v-model="form.customerOpenBank"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="银行账号：" prop="customerBankAccount">
                        <el-col :span="19">
                          <el-input v-model="form.customerBankAccount"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="注册电话：" prop="customerReTel">
                      <el-col :span="19">
                        <el-input v-model="form.customerReTel"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="开票状态：" prop="invoiceStatus">
                       <el-col :span="19">
                          <el-select v-model="form.invoiceStatus" placeholder="请选择" style="width:100%">
                          <el-option label="深圳市迈戈实业有限公司" value=1></el-option>
                          <el-option label="第二种：全额支付" value=2></el-option>
                        </el-select>
                      </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="开票日期：" prop="invoiceDate">
                        <el-col :span="19">
                            <el-date-picker
                              v-model="form.invoiceDate"
                              type="date"
                              placeholder="选择日期"
                              valueFormat='yyyy-MM-dd HH:mm:ss'
                              style="width:100%">
                            </el-date-picker>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="19">
                    <el-col>
                      <el-form-item label="发票编号：" prop="invoiceNumber">
                          <el-input
                            v-model="form.invoiceNumber">
                          </el-input>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
                  <el-row>
                  <el-col :span="24">
                    <el-form-item label="发票凭证：" prop="invoiceVoucher">
                      <el-col :span="19">
                       <el-upload
                          action="https://jsonplaceholder.typicode.com/posts/"
                          list-type="picture-card"
                          :on-preview="handlePictureCardPreview"
                          :on-remove="handleRemove">
                          <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog :visible.sync="dialogVisible" :modal="false" :append-to-body="false">
                          <img width="100%" :src="dialogImageUrl" alt="">
                          <span slot="footer.vue" class="dialog-footer.vue">
                            
                          </span>
                      </el-dialog>

                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="24">
                    <el-col>
                      <el-form-item label="备注：" prop="remark">
                        <el-col :span="19">
                          <el-input
                            type="textarea"
                            :autosize="{ minRows: 5, maxRows: 5}"
                            placeholder="请输入内容"
                            v-model="form.remark">
                          </el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-form>
        </div> -->
        <div class="mail-fitter" style="margin-top:20px">
          <el-form ref="infoForm" :model="addressInfoVo" :rules="rules" label-width="120px" size="small">
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
                          <el-input v-model="addressInfoVo.userName"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="收票人手机：" prop="userPhone">
                      <el-col :span="19">
                          <el-input v-model="addressInfoVo.userPhone"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-col>
                      <el-form-item label="所在地区：" prop="provinceId">
                          <el-col :span="4">  
                             <el-select v-model="addressInfoVo.provinceId" placeholder="请选择省"
                             @change="chooseProvince" filterable>
                                <el-option
                                  v-for="(item,index) in province"
                                  :key="index"
                                  :label="item.regionName"
                                  :value="item.regionId">
                                </el-option>
                              </el-select>
                          </el-col>
                          <el-col :span="4" :offset="1" prop="cityId">
                              <el-select v-model="addressInfoVo.cityId" placeholder="请选择市" 
                              @change="chooseCity" filterable>
                                <el-option
                                  v-for="(item,index) in city"
                                  :key="index"
                                  :label="item.regionName"
                                  :value="item.regionId">
                                </el-option>
                              </el-select>
                          </el-col>
                          <el-col :span="4" :offset="1" prop="areaId">
                              <el-select v-model="addressInfoVo.areaId" placeholder="请选择区"
                              @change="chooseArea" filterable>
                                <el-option
                                  v-for="(item,index) in area"
                                  :key="index"
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
                            v-model="addressInfoVo.address">
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
          <el-dialog width="60%" :visible.sync="innerVisible1" :modal="true" :append-to-body="false">
          <!-- 编辑客户询价添加商品选择品牌弹窗 -->
        
          <div class="mail-fitter">
            <el-form ref="infoForm" :model="form" :rules="rules" label-width="110px" size="small">
              <div class="mail-wrapper">
                <div class="search-base">
                  <el-row class="warp">
                    <div class="mbottom">
                      <div class="goods-fitter">
                        <h4 class="title1">商品信息</h4>
                       <el-row>
                          <el-col :span="8">
                            <el-form-item label="商品信息：" prop="brand">
                              <el-input v-model="formData.goodsName1" placeholder="请输入商品名称/型号/品牌"></el-input>
                            </el-form-item>
                          </el-col>
                          <el-col :span="2" :offset="1">
                            <el-button type="primary" size="small" @click="goodsSearch()">查询</el-button>
                          </el-col>
                          <el-col :span="6">
                            <el-button type="primary" size="small"  @click="jump">进入商品管理页面新增或编辑商品</el-button>
                          </el-col>
                        </el-row>
                      </div>
                    </div>
                  </el-row>
                </div>
              </div>
              <div class="mcard1">
                <div class="mcard">
                  <!-- 添加商品商品展示 -->
                  <el-table
                    @row-dblclick="addClick1"
                    :data="tableData"
                    stripe
                    style="width: 100%"
                    border
                    ref="elTable"
                    class="goods_index"
                  >
                    <el-table-column type="index" label="编号" align="center" width="55"></el-table-column>
                    <el-table-column label="商品图片" align="center" width="120">
                      <template slot-scope="scope">
                        <div
                          class="image"
                          v-if="scope.row.skuList[scope.row.index].thumbnailImgUrl"
                        >
                          <img
                            :src="scope.row.skuList[scope.row.index].thumbnailImgUrl"
                            width="100"
                            height="100"
                            alt
                          />
                        </div>
                        <div v-if="!scope.row.skuList[scope.row.index].thumbnailImgUrl">暂无图片</div>
                      </template>
                    </el-table-column>
                    <el-table-column label="商品信息" align="center" width="150">
                      <template slot-scope="scope">
                        <div style="height: 180px;overflow: auto;" >
                          <div class="txt_left" style="font-size:15px">{{scope.row.goodsName}}</div>
                          <div class="txt_left">货号：{{scope.row.goodsSn}}</div>
                          <div class="txt_left">型号：{{scope.row.modelNumber}}</div>
                          <div class="txt_left">品牌：{{scope.row.brandName}}</div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="规格尺寸" align="center" width="200">
                      <template slot-scope="scope">
                        <div style="position:relative">
                          <!-- <el-button @click="down">向上</el-button> -->
                          <div style="height: 180px;overflow: auto;" :ref="'down'+scope.$index">
                            <div
                              class="txt_left martop"
                              v-for="(item,index) in scope.row.skuList"
                              :key="index"
                            >
                              <div
                                class="txt_left imgitem"
                                @click="Clicktent(index,scope.row)"
                                :class="[index == scope.row.index?'leftbottom':'']"
                              >
                                <div class="more">{{item.goodsSpecValues}}</div>
                              </div>
                            </div>
                          </div>
                         
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="税率" align="center" >
                          <template slot-scope="scope">
                              <div>{{scope.row.skuList[scope.row.index]&&scope.row.skuList[scope.row.index].taxRate}}%</div>
                          
                          </template>
                    </el-table-column>
                    <el-table-column label="商城价格" align="center" width="180">
                      <template slot-scope="scope">
                        <div style="height: 180px;overflow: auto;" >
                          <div
                            class="txt_left"
                          >商城价：{{scope.row.skuList[scope.row.index].costPrice != 0?scope.row.skuList[scope.row.index].goodsPrice:''}}</div>
                          <div
                            class="txt_left"
                          >京东价：{{scope.row.skuList[scope.row.index].costPrice != 0?scope.row.skuList[scope.row.index].jdPrice:''}}</div>
                         <div class="txt_left">
                            一件代发价：
                            <span
                              class="blue"
                              v-if="scope.row.skuList[scope.row.index].costPrice != 0"
                            >{{scope.row.skuList[scope.row.index].costPrice}}</span>
                            <span v-if="scope.row.skuList[scope.row.index].costPrice == 0">不支持一件代发</span>
                          </div>
                           <div class="txt_left">运费：</div>
                          <div
                            class="txt_left"
                          >对外ppt价格：</div>
                          <div
                            class="txt_left"
                          >对外最低价格:</div>
                          <div
                            class="txt_left"
                          >对我司的特惠价:</div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="集采/批发价" align="center" width="150">
                      <template slot-scope="scope">
                        <div style="height: 180px;overflow: auto;" >
                          <div
                            class="txt_left"
                            v-for="(item,index) in scope.row.skuList[scope.row.index].volumeInfo"
                            :key="index"
                          >
                            <div class="txt_left">{{item.volumeCost}}</div>
                            <div class="txt_left">{{item.volumeNumber}}</div>
                            <div class="tex_left">运费</div>
                          </div>
                          
                        </div>
                      </template>
                    </el-table-column>
                    

                    
                  </el-table>
                  <div class="pagination">
                    <el-pagination
                      @size-change="addHandleSizeChange"
                      @current-change="addHandleCurrentChange"
                      :current-page="formData.current_page"
                      :page-sizes="[2, 5, 10, 50]"
                      :page-size="formData.page_size"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="formData.total_count"
                    ></el-pagination>
                  </div>
                </div>
              </div>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">

          </span>
        </el-dialog>
  </div>
</template>

<script>
import { getErpGoods } from "@/api/product/index";
import {findLocation,applyInvioce} from '@/api/sale/index';
import { throttleTipPop } from "@/utils/functions.js";
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      addVisible: false,
      accountVisible: false, //选择收款账户
      partyVisible: false, //选择甲方弹窗
      addressVisible: false, //添加地址弹窗
     innerVisible1:false,//编辑商品弹框
      goodsIndex:'',//需要编辑的商品的下标
      showIndex:'',
      dataArr: [],
      orderIndex: 1,
      pageData:'',//展示数据
      province:[],//省
      city:[],//市
      area:[],//区
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
      addressInfoVo:{
        address:'',//详细地址
        areaId:'',//区
        cityId:'',//市
        provinceId:'',//省
        userName:'',//收票人
        userPhone:'',//收票人手机


      },//收票人信息
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
      },
      formData: {
        current_page: 1,
        page_size: 2,
        total_count: 0,
        goodsName1:'',
      },
      tableData: [

      ],
      rules: {
        invoiceType: [{ required: true, message: "此项为必填项", trigger: ["blur","change"] }],
        invoicePayable: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        targetName: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        vatBankName: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
       taxNumber: [{ required: true, message: "此项为必填项", trigger: ["blur","change"] }],
       vatBankAccount: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
       vatPhone: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        vatAddress: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
        ],
        content: [
          { required: true, message: "此项为必填项", trigger: ["blur","change"] }
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
        ]
      }
    };
  },
  created() {},
  props: ["addVisibles","invoiceData","firstLevel"],
  watch: {
    addVisibles(val) {
      this.addVisible = val;
    },
    invoiceData(val){
      this.pageData = val;
      console.log(val);
      
    },
    firstLevel(val){
      this.province = val ;
    },
   /*  'pageData.goodsDetailList2':{
      handler(val){
        setTimeout(function(){
          for(let i =0;i<val.length;i++){
            var nameKey = val[i].goodsName;
            getErpGoods(this.formData).then(res => {
                  console.log(res);
                  
            });
          }
      
        })
      },deep:true
    } */
     //监听数组中值变化
    'pageData.goodsDetailList2':{
      handler(newVal, oldVal) {
        for(let i=0;i<newVal.length;i++){
          if(Number(newVal[i].goodsCount)>=0&&Number(newVal[i].goodsPrice)>=0){
            newVal[i].totalAmount = Number(newVal[i].goodsCount)*Number(newVal[i].goodsPrice)        
          }   
        }
      },
      deep: true
    },
  },
   computed: {
      total1(){
      let totals = 0
      let _this = this
      if(_this.pageData.goodsDetailList2&&_this.pageData.goodsDetailList2.length>0){
          for(var i = 0;i<_this.pageData.goodsDetailList2.length;i++){
            if(!isNaN(_this.pageData.goodsDetailList2[i].totalAmount)){
              totals+=parseFloat(_this.pageData.goodsDetailList2[i].totalAmount)
            }else{
              totals = 0
            }
      }
        
      }
        return totals
      
    }
  },
  methods: {
    //关闭页面
    createClose() {
      this.$confirm('您确认要关闭吗？')
                    .then(_ => {
                this.showIndex = '';
                this.addVisible = false;
                this.$emit("createClose3", this.addVisible);
            })
            .catch(_ => {});
    },
    createClosing() {
      
      this.$confirm('您确认要关闭吗？')
                    .then(_ => {
                this.showIndex = '';
                this.addVisible = false;
                this.$emit("createClosing3", this.addVisible);
            })
            .catch(_ => {});
    },
      btn1() {
      this.orderIndex = 1;
    },
    btn2() {
      this.orderIndex = 2;
    },
    //获取ERP商品
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
    //申请发票
    apply(){
      this.pageData.addressInfoVo = this.addressInfoVo;
      this.pageData.invoiceAmount = this.total1;
        if(!this.pageData.invoiceType||
          !this.pageData.invoicePayable||
          !this.pageData.targetName||
          !this.pageData.taxNumber||
          !this.pageData.vatBankName||
          !this.pageData.vatBankAccount||
          !this.pageData.vatPhone||
          !this.pageData.vatAddress||
          
          !this.addressInfoVo.userName||
          !this.addressInfoVo.userPhone||
          !this.addressInfoVo.provinceId||
          !this.addressInfoVo.cityId||
          !this.addressInfoVo.areaId||
          !this.addressInfoVo.address){
                 throttleTipPop(this, "warning", "请填写带*的填项", 2000);  
        }else{
             applyInvioce(this.pageData).then(res=>{
                if(res.code===200){
                  throttleTipPop(this, "success", "申请发票成功", 2000);
                  this.addVisible =false;
                  this.$emit("applyInvioce1",this.addVisible)
                }
          })
        }
         
    },
    //添加
    add1(row){
      let arr =[];
        if(this.pageData.goodsDetailList2.length>0){
          for(let i=0;i<this.pageData.goodsDetailList2.length;i++){ 
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
    //选择省
    chooseProvince(data){  
      let obj = {};
      obj = this.province.find((item)=>{
        return item.regionId === data;
      });
      this.addressInfoVo.provinceName = obj.regionLongname;

      findLocation(data).then(res=>{
        this.addressInfoVo.cityId = '';
        this.addressInfoVo.areaId = '';
        this.city = res.data.list    
      })
    },
    //选择市
    chooseCity(data){
      let obj = {};
      obj = this.city.find((item)=>{
        return item.regionId === data;
      });

      this.addressInfoVo.cityName = obj.regionLongname;
      findLocation(data).then(res=>{
        this.addressInfoVo.areaId = '';
        this.area = res.data.list
      })
    },
    chooseArea(data){
      let obj = {};
      obj = this.area.find((item)=>{
        return item.regionId === data;
      });

      this.addressInfoVo.areaName = obj.regionLongname;
    },
     //跳转
    jump(){
      let routeData = this.$router.resolve({
        name: "ProductList",
      });
      window.open(routeData.href, '_blank');
      
    },
    //打开商品弹框
    chooseGoods(index){
      this.goodsIndex = index;
      
      this._getGoods();
      this.innerVisible1 = true;
    },
    //选择规格
     Clicktent(val, data) {
      data.index = val;
      console.log(this.$refs.elTable);
      this.$set(this.$refs.elTable.data);
      this.$forceUpdate();
    },
    //选择商品
    addClick1(row){
      console.log(row); 
      
      row["goodsSpecSize"] = row.skuList[row.index].goodsSpecValues;
      row["goodsSkuId"] = row.skuList[row.index].skuId;

      this.pageData.goodsDetailList2[this.goodsIndex].goodsName = row.goodsName;
      this.pageData.goodsDetailList2[this.goodsIndex].goodsSkuId = row.goodsSkuId;
      this.pageData.goodsDetailList2[this.goodsIndex].goodsSpecSize = row.goodsSpecSize;
      this.pageData.goodsDetailList2[this.goodsIndex].goodsId = row.goodsId;

      this.innerVisible1 = false;

    },
    address() {},
    //商品换页
      addHandleSizeChange(val) {
      this.formData.page_size = val;
      this._getGoods();
    },
    //商品换页
    addHandleCurrentChange(val) {
      this.formData.current_page = val;
      this._getGoods();
    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleChange() {},
  
    
  }
};
</script>

<style lang="scss" >
@import "@/common/scss/variable.scss";
#toInvioce {
  .el-dialog__body {
    padding: 0 !important;
    background: none !important;
  }
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
     .imgitem{
      cursor: pointer;
    }
    .leftbottom {
        color: #4a99fa;
        border-bottom: 1px dashed rgba(215, 220, 231, 1);
        padding-bottom: 8px;
      }
    .mcard1{
      border: 1px solid #d9d9d9;
      margin-top:20px;
    }
}
</style>