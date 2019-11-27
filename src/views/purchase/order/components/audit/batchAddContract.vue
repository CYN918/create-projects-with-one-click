<template>
    <div id="purchaseAddContract">
        <el-dialog width="72%" :visible.sync="batchVisible" :before-close="createClosing">
        <!-- 选择签合同公司 -->
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">批量生成采购合同</h4>
              </div>
            </el-form>
          </div>
        </div>
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form ref="infoForm" :model="proList" :rules="rules" label-width="120px" size="small">
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
                            <span>采购订单合同</span>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="合同编号：">
                        <el-col :span="21">
                          <span v-show="!proList.contractNo">保存后自动生成</span>
                          <span v-show="proList.contractNo">{{proList.contractNo}}</span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                    <el-col :span="7">
                      <el-form-item label="关联业务单号：">
                        <el-col :span="21">
                          <span>{{proList.businessNo}}</span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="甲方：" prop="acompanyName">
                          <el-col :span="19">
                            <el-input v-model="proList.acompanyName">
                              <el-button slot="append" @click="partyChoose()" size="mini">选择</el-button>
                            </el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="乙方：">
                        <el-col :span="19">
                          <el-input v-model="proList.bcompanyName"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>

                  
                  <el-row>
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="联系人：" prop="acontact">
                          <el-col :span="19">
                            <el-input v-model="proList.acontact"></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="联系人：">
                        <el-col :span="19">
                          <el-input v-model="proList.bcontact"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="联系电话：" prop="atel">
                          <el-col :span="19">
                            <el-input v-model="proList.atel"></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="联系电话：">
                        <el-col :span="19">
                          <el-input v-model="proList.btel"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="传真：">
                          <el-col :span="19">
                            <el-input v-model="proList.afax"></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="传真：">
                        <el-col :span="19">
                          <el-input v-model="proList.bfax"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="邮箱：" prop="aemail">
                          <el-col :span="19">
                            <el-input v-model="proList.aemail"></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="邮箱：">
                        <el-col :span="19">
                          <el-input v-model="proList.bemail"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row>
                    <el-col :span="12">
                      <el-col>
                        <el-form-item label="地址：" prop="aaddress">
                          <el-col :span="19">
                            <el-input v-model="proList.aaddress"></el-input>
                          </el-col>
                        </el-form-item>
                      </el-col>
                    </el-col>
                    <el-col :span="12">
                      <el-form-item label="地址：">
                        <el-col :span="19">
                          <el-input v-model="proList.baddress"></el-input>
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
            <el-form ref="infoForm" :model="proList" :rules="rules" label-width="100px">
              <div class="mail-wrapper">
                <h4 class="title1">产品清单</h4>
                <div class="search-base">
                  <div class="mbottom">
                    <div class="goods-fitter">
                      <div class="mcard" style="padding-bottom:0">
                        <el-table :data="proList.details" border style="width: 100%" stripe>
                          <el-table-column type="index" label="序号" align="center" width="50"></el-table-column>
                          <el-table-column prop="customerName" label="图样" align="center" width="100">
                                  <template slot-scope="scope">
                                        <img  :src="scope.row.goodsImgUrl" class="showImg" alt="" v-if="scope.row.goodsImgUrl"/>
                                        <img  src="@/common/images/缺省页.jpg" class="showImg" alt="" v-if="!scope.row.goodsImgUrl"/>
                                  </template>
                          </el-table-column>
                          <el-table-column prop="customerType" label="产品名称" align="center">
                                   <template slot-scope="scope">
                                        {{scope.row.goodsName}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactName" label="型号" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.modelNumber}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="税率" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.taxRate}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="数量" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.purchaseQuantity}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="不含税单价" align="center">
                                    <template slot-scope="scope">
                                       {{scope.row.notaxCostPrice}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="税费" align="center">
                                    <template slot-scope="scope">
                                       {{scope.row.taxation}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="含税单价" align="center">
                                    <template slot-scope="scope">
                                        {{scope.row.goodsPrice}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="总价" align="center">
                                <template slot-scope="scope">
                                        {{scope.row.totalPrice}}
                                  </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="定制要求" align="center">
                                    <template slot-scope="scope">
                                       {{scope.row.productRequire}}
                                  </template>
                          </el-table-column>
                          <el-table-column label="设计稿" align="center"  width="100">
                                <template slot-scope="scope">
                                      <!-- {{scope.row.fileDesignDraftUrl}} -->

                                     <!--  <el-button v-show="scope.row.fileDesignDraftUrl" type="primary" size="small">上传</el-button> -->
                                      <el-upload
                                        size="small"
                                        class="upload-demo"
                                        :action="baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile'"
                                        :on-success="handleSuccess"
                                        :before-upload="beforeAvatarUpload1"
                                        :show-file-list="false">
                                        <el-button size="small" type="primary" @click="upLoad(scope.row,scope.$index)">上传</el-button>
                                      </el-upload>
                                     
                                      <span class="blue" v-show="scope.row.fileDesignDraftUrl" @click="preview(scope.row)">查看</span>
                                    
                                </template>
                          </el-table-column>
                          <el-table-column prop="commonContactDept" label="交货日期" align="center">
                                  <template slot-scope="scope">
                                        {{scope.row.distributionTime}}
                                  </template>
                          </el-table-column>
                            <el-table-column  align="center"  width="130">
                                  <template slot="header" slot-scope="scope">
                                       <el-dropdown trigger="click" @command="handleCommand" class="drop">
                                        <span class="el-dropdown-link">
                                          {{addressTitle}}<i class="el-icon-arrow-down el-icon--right"></i>
                                        </span>
                                        <el-dropdown-menu slot="dropdown">
                                          <el-dropdown-item
                                          v-for="(item,index) in pay" :key="index"
                                          :command="item.command">
                                          {{item.value}}
                                          </el-dropdown-item>

                                        </el-dropdown-menu>
                                       </el-dropdown>
                                  </template>
                                  <template slot-scope="scope">
                                      <el-button type="primary" size="small" v-if="addIndex===1">上传</el-button>
                                      
                                      <span v-if="addIndex===2">{{scope.row.address}}</span>

                                  </template>

                          </el-table-column>
                        </el-table>
                        <div class="total" style="margin-left:80%;margin-top:20px">
                        <el-form label-width="130px" size="small">
                            <el-form-item label="合计：">
                              <el-col :span="24">
                                <el-input  v-model="total1"></el-input>
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
          <el-form ref="infoForm" :model="proList" :rules="rules" label-width="120px" size="small">
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
                          <el-input v-model="proList.contractFactFee"></el-input>
                        </el-col>
                        <span style="margin-left:5px;">元</span> 
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="结算方式：" prop="settlementType">
                      <el-col :span="19">
                              
                           <el-select  v-model="proList.settlementType" placeholder="请选择" style="width:100%">
                            
                                <el-popover
                                    placement="left"
                                    title="分期付款"
                                    width="300"
                                    trigger="hover"
                                    close-delay="0"
                                    transition="linear"
                                    content="合同生效后10日内，乙方即支付合同金额的10%即
                                            人民币壹佰圆圆整(小写：人民币【100.0000】元)
                                            作为预付款，剩余款项在甲方完成全部交货后支付">       
                                  
                                <el-option slot="reference" label="第一种：分两期支付" :value=1></el-option>
                                </el-popover>
                                <el-popover
                                    placement="left"
                                    title="一次性支付"
                                    width="300"
                                    trigger="hover"
                                    close-delay="0"
                                    transition="linear"
                                    content="所有货物经乙方验收确认后，乙方30个工作日内 一
                                            次性结清甲方全部货款">       
                                  
                                <el-option slot="reference" label="第二种：一次性支付" :value=2></el-option>
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
                          <el-input v-model="proList.deposit"></el-input>
                        </el-col>
                        <span style="margin-left:5px;">元</span> 
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="合同生效后：" prop="payLimitDay">
                      <el-col :span="16">
                        <el-input-number
                          v-model="proList.payLimitDay"
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
                          <el-input v-model="proList.bankAccount">
                            <el-button slot="append" @click="accountChoose()" size="mini">选择</el-button>
                          </el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="户名：" prop="bankName">
                      <el-col :span="19">
                        <el-input v-model="proList.bankName"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="开户行：" prop="bankOpeningName">
                        <el-col :span="19">
                          <el-input v-model="proList.bankOpeningName"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="纳税识别号：">
                      <el-col :span="19">
                        <el-input v-model="proList.taxNumber"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                  <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="回票日期：" prop="ticketDate">
                        <el-col :span="19">
                          <el-date-picker
                          type="date"
                          valueFormat="yyyy-MM-dd HH:mm:ss"
                          v-model="proList.ticketDate"
                          style="width:100%;"
                           ></el-date-picker>
                        </el-col>
                      </el-form-item>
                    </el-col>               
                  </el-col>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="收货日期：" prop="deliveryDate">
                        <el-col :span="19">
                          <el-date-picker
                          type="date"
                          valueFormat="yyyy-MM-dd HH:mm:ss"
                          v-model="proList.deliveryDate"
                          style="width:100%;"
                           ></el-date-picker>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
              </el-row>
              <el-row>
                   <el-col :span="24">
                    <el-form-item label="设计稿：">
                      <el-col :span="17" >
                          <el-input v-model="fileUrl" readonly=""></el-input>
                        </el-col>
                      <el-col :span="1" :offset="1">
                      <el-upload
                        class="upload-demo"
                        :action="baseUrl1+'/api/open/b/b2b2c/fileservice/uploadFile'"
                        :show-file-list="false"
                        ref="avatar1"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload">
                         <el-button size="small" type="primary" >上传</el-button>
                      </el-upload>
                      </el-col>
                      <el-col :span="3" :offset="1">
                            <el-button type="primary" size="small" @click="downLoad()">下载</el-button>
                      </el-col>

                    </el-form-item>
                  </el-col>
                </el-row>
                
              </div>
            </div>
          </el-form>

       
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="createClose()" size="small">关 闭</el-button>
          <el-button type="primary" @click="createSave()" size="small">保存</el-button>
        </span>
      </el-dialog>
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
                <el-table :data="contractList" border style="width: 100%" stripe  @row-dblclick="addCompany">
                  <el-table-column label="公司名称" align="center" width="240">
                        <template slot-scope="scope">
                              {{scope.row.sccCompanyName}}
                        </template>
                  </el-table-column>
                  <el-table-column label="联系人" align="center">
                        <template slot-scope="scope">
                              {{scope.row.sccCompanyName}}
                        </template>
                  </el-table-column>
                  <el-table-column label="联系电话" align="center">
                          <template slot-scope="scope">
                              {{scope.row.sccContacts}}
                        </template>
                  </el-table-column>
                  <el-table-column label="传真" align="center">
                          <template slot-scope="scope">
                              {{scope.row.sccFax}}
                        </template>
                  </el-table-column>
                  <el-table-column label="电子邮箱" align="center">
                          <template slot-scope="scope">
                              {{scope.row.sccEmail}}
                        </template>
                  </el-table-column>
                  <el-table-column label="地址" align="center">
                          <template slot-scope="scope">
                              {{scope.row.sccAddress}}
                        </template>
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
                <el-table :data="accountList" border style="width: 100%" stripe @row-dblclick="addAccount">
                  <el-table-column label="公司名称 " align="center">
                             <template slot-scope="scope">
                                  {{scope.row.sccCompanyName}}
                              </template>
                  </el-table-column>
                  <el-table-column label="开户银行 " align="center" width="150">
                            <template slot-scope="scope">
                                  {{scope.row.bankName}}
                            </template>
                  </el-table-column>
                  <el-table-column label="银行账号" align="center" width="210">
                            <template slot-scope="scope">
                                  {{scope.row.bankAccount}}
                            </template>
                  </el-table-column>
                  <el-table-column label="纳税人识别号" align="center">
                            <template slot-scope="scope">
                                  {{scope.row.sccTaxNum}}
                            </template>
                  </el-table-column>
                  <el-table-column label="注册地址" align="center" width="240">
                            <template slot-scope="scope">
                                  {{scope.row.sccAddress}}
                            </template>
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
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
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
                                        <img width="100%" :src="previewImg" alt="">
                                        <span slot="footer" class="dialog-footer"></span>
        </el-dialog>
    </div>
</template>

<script>
import { getCategory, getStoreList } from '@/api/public'
import { getErpGoods } from "@/api/product/index";
import {getContract} from "@/api/setting/index"
import {getOrderGoods,createContract,upLoadDesign} from "@/api/sale/index"
import {createPurchaseContract,saveBatchContract} from "@/api/purchase/index"
import { throttleTipPop } from "@/utils/functions.js";
export default {
    data(){
        //提示日期
        var checkDay = (rule, value, callback) => {
          if (!value) {
            return callback(new Error("此为必填项"));
          }
          if (!Number.isInteger(value)) {
            callback(new Error("请输入整数值"));
          }
        };
        return{
             pickerOptions0: {
              disabledDate(time) {
                return time.getTime() < Date.now() - 8.64e7;
              }
            }, 
            fileUrl:'',//展示的文件路径
            fileList: [],//上传列表
            proList:{},//产品清单
            upLoadIndex:'',//上传那行表格的下标
            previewImg: '',
            addressTitle:'收货地址',
            addIndex:2,
            batchVisible:false,
             accountVisible: false, //选择收款账户
            partyVisible: false, //选择甲方弹窗
            addressVisible:false,//添加地址弹窗
            dataArr: [],
            companyData:[],//新增公司
            list:'',
            contractList:[],//签约公司列表
            accountList:[],//账户列表
            accountLists:[],//新增账户
            gdId:'',//商品ID
            purchaseOrderIds:[],//采购ID数组
            dialogVisible: false,
            contractData:{
              bizType:0,
              pageIndex:1,
              pageSize:10,
              count:0,
            },
            accountData:{
              bizType:1,
              pageIndex:1,
              pageSize:10,
              count:0,
            },
             tableDatas: {
                currentPage: 1,
                sizes: [10, 20, 50, 100],
                size: 10,
                total: 0
                },
             pay:[
               {value:"多地址配送",command:1},
               {value:"收货地址",command:2}
             ],
             form: {
                current_page: 0,
                page_size: 10,
                total_count: 0,
                contractNumber: "", //合同编号
                relevantBusiness: "", //关联业务单号
                orderId:'',//订单Id
                orderNo:'',//订单单号
                partyA: "", //甲方
                partyB: "", //乙方
                partyAId:'',//甲方ID
                partyAAddress: "", //甲方地址
                partyBAddress: "", //乙方地址
                partyAContacts: "", //甲方联系人
                partyBContacts: "", //乙方联系人
                partyANumber: "", //甲方联系电话
                partyBNumber: "", //乙方联系电话
                partyAFax: "", //甲方传真
                partyBFax: "", //乙方传真
                partyAMail: "", //甲方邮箱
                partyBMail: "", //乙方邮箱
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
                keywords: "" ,//关键词
                definition:'',//单位名称
                addressee:'',//收件人
                deposit:'',//支付定金
                invoiceType:'',//发票类型
            },
            formData: {
                current_page: 1,
                page_size: 2,
                total_count: 0
            },
            tableData: [],
                    rules: {
                acompanyName: [{ required: true, message: "此项为必选项", trigger: ["blur","change"] }],
                aaddress: [
                { required: true, message: "此项为必选项", trigger: ["blur","change"] }
                ],
                acontact: [
                { required: true, message: "此项为必选项", trigger: ["blur","change"] }
                ],
                atel: [
                { required: true, message: "此项为必选项", trigger: ["blur","change"] }
                ],
                payLimitDay: [
                  { validator: checkDay, required: true, trigger: ["blur", "change"] }
                ],
                bankAccount: [
                { required: true, message: "此项为必选项", trigger: ["blur","change"] }
                ],
                bankName: [
                { required: true, message: "此项为必选项", trigger: ["blur","change"] }
                ],
                bankOpeningName: [
                { required: true, message: "此项为必选项", trigger: ["blur","change"] }
                ],
                 ticketDate: [
                { required: true, message: "此项为必选项", trigger: ["blur","change"] }
                ],
                deposit: [
                { required: true, message: "此项为必选项", trigger: ["blur","change"] }
                ],
                settlementType: [
                  {
                    required: true,
                    message: "此项为必选项",
                    trigger: ["blur", "change"]
                  }
                ],
            }
        }
    },
  
    props:["batchVisibles","batchData",'purchaseArr'],
    watch: {
    batchVisibles(val) {
      this.batchVisible = val;
        },
    
    batchData(val){
      this.proList = val;
      
    },

    },
  computed: {
      total1(){
      let totals = 0
      let _this = this
      if(_this.proList.details&&_this.proList.details.length>0){
          for(var i = 0;i<_this.proList.details.length;i++){
            if(!isNaN(_this.proList.details[i].totalPrice)){
              totals+=parseFloat(_this.proList.details[i].totalPrice)
            }else{
              totals = 0
            }
      }
        
      }
        return totals
      
    }
  },
   created() {
   },

    methods:{
      handleCommand(command){
            if(command===1){
              this.addressTitle = "多地址配送";
              this.addIndex = 1
            }else if(command===2){
              this.addressTitle = "收货地址";
              this.addIndex = 2
            }
          
      },
    //关闭页面
     createClose() {
      
       this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                      this.batchVisible= false;
                      this.$emit("createCloseB", this.batchVisible);
                      this.fileList = [];
                })
                .catch(_ => {});
    },
    createClosing() {
      
      this.$confirm('您确认要关闭吗？')
                        .then(_ => {
                      this.batchVisible = false;
                      this.fileList = [];
                      this.$emit("createClosingB", this.batchVisible);
                })
                .catch(_ => {});
    },
    _getGoods() {
      getErpGoods(this.formData).then(res => {
        this.tableData = res.data.pageList;
        this.tableData.forEach(item => {
          item.top = 0;
        });
        this.formData.total_count = res.data.count;
      });
    },
    _getContract(){
       getContract(this.contractData).then(res=>{
            this.contractList = res.data.pageList;
            this.contractData.count = res.data.count;
      })
    },
    _getAccount(){
      getContract(this.accountData).then(res=>{
            this.accountList = res.data.pageList;
            this.accountData.count = res.data.count;
      })
    },
    //签约公司弹窗
    partyChoose() {
      this.partyVisible = true;
      this._getContract();
    },
    //双击添加公司
    addCompany(row){
        let copy = JSON.parse(JSON.stringify(row));
        this.companyData.splice(0, 1, copy);
        this.proList.acompanyName = this.companyData[0]&&this.companyData[0].sccCompanyName;
        this.proList.aaddress =this.companyData[0]&&this.companyData[0].sccAddress;
        this.proList.aemail = this.companyData[0]&&this.companyData[0].sccEmail;
        this.proList.acontact = this.companyData[0]&&this.companyData[0].sccContacts;
        this.proList.atel = this.companyData[0]&&this.companyData[0].sccTelephone;
        this.proList. afax = this.companyData[0]&&this.companyData[0].sccFax;
      /*   this.proList.partyAId = this.companyData[0]&&this.companyData[0].sccId; */
        this.partyVisible = false;
    },
    accountChoose() {
      this.accountVisible = true;
      this._getAccount()
    },
    //双击添加账户
    addAccount(row){
        let copy = JSON.parse(JSON.stringify(row));
        this.accountLists.splice(0, 1, copy);
        this.proList.bankName = this.accountLists[0]&&this.accountLists[0].sccCompanyName;
        this.proList.bankOpeningName =  this.accountLists[0]&&this.accountLists[0].bankName;
        this.proList.taxNumber = this.accountLists[0]&&this.accountLists[0].sccTaxNum;
        this.proList.bankAccount= this.accountLists[0]&&this.accountLists[0].bankAccount;
        this.accountVisible = false;
    },
    //保存生成合同 
    createSave(){
        this.proList.payType = this.proList.settlementType;
        this.proList.purchaseOrderIds = this.purchaseArr;
        console.log(this.purchaseArr);
        
        if(!this.proList.acompanyName||
        !this.proList.aaddress||
        !this.proList.acontact||
        !this.proList.atel|
        !this.proList.bankOpeningName||
        !this.proList.payLimitDay||
        !this.proList.bankAccount||
        !this.proList.bankName){
              throttleTipPop(this, "warning", "请填写带*号的选项", 2000);
        }else{       
          
          saveBatchContract(this.proList).then(res=>{
            if(res.code===200){
              if(!this.proList.contractId){
                  throttleTipPop(this, "success", "批量生成采购合同成功", 2000);
                  this.batchVisible = false;
                  this.$emit('saveContractB',this.batchVisible)
                }else{
                  throttleTipPop(this, "success", "批量修改采购合同成功", 2000);
                  this.batchVisible = false;
                  this.$emit('saveContractB',this.batchVisible)
                }
              }
            })
        }
    },    
    //签约公司换页
    contractHandleSizeChange(val){
      this.contractData.pageSize = val;
      this._getContract();
    },
    contractHandleCurrentChange(val) {
      this.contractData.pageIndex = val;
      this._getContract();
    },
    //账户换页
    accountHandleCurrentChange(val){
      this.accountData.pageIndex =val;
      this._getAccount()
    },
    accountHandleSizeChange(val){
      this.accountData.pageSize = val;
      this._getAccount()
    },
    upLoad(row,index){
      this.gdId = row.gdId; 
      this.upLoadIndex = index;
    },
      handleSuccess(file){
        
        this.proList.details[this.upLoadIndex].fileDesignDraftUrl = file.data.domain + file.data.filePath;
        let obj = {};
        obj.designDraftUrl = this.proList.details[this.upLoadIndex].fileDesignDraftUrl;
        obj.gdId = this.gdId;
         //调用上传设计稿接口
        upLoadDesign(obj).then(res=>{
            if(res.code===200){
                this.$message.success('上传设计稿成功！')
            }
              
        })
        
      },
       beforeAvatarUpload1(file) {
        const isJPG = file.type === 'image/jpeg'||'image/jpg'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传的文件为图片格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPG && isLt2M;
      },
      //预览设计稿
      preview(row){
          this.previewImg = row.fileDesignDraftUrl;
          this.dialogVisible = true;
      },
       handleAvatarSuccess(file) {     
         
         this.$message.success('上传设计稿成功！')
        this.fileUrl = file.data.domain + file.data.filePath;
      },

      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'||'image/jpg'||'image/png';
        const isLt2M = file.size / 1024 / 1024 < 5;

        if (!isJPG) {
          this.$message.error('上传的文件为图片格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 5MB!');
        }
        return isJPG && isLt2M;
      },
      downLoad(){
         if(!this.fileUrl){
               throttleTipPop(this, "warning", "暂无上传设计稿信息", 2000);
          }else{
               window.open(this.fileUrl,"_blank");
          }
           
            
      },
    address(){

    },
    handleSizeChange() {},
    handleCurrentChange() {},
    handleChange() {}
    }
}
</script>

<style lang="scss">
@import "@/common/scss/variable.scss";
#purchaseAddContract{
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
     .box{
      margin-left: 12px;
      margin-top:10px;
    }

    .el-input-group__append button.el-button {
      width:50px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
    }
    .el-input-number.is-controls-right .el-input-number__decrease {
      background: #fff !important;
    }
    .el-input-number.is-controls-right .el-input-number__increase {
      background: #fff !important;
    }
    .showImg{
      width: 80px;
      height:80px;
    }
    /deep/ .el-dialog__headerbtn{
      top:10px !important;
    }
    .drop{
      cursor: pointer;
    }
    .blue{
        cursor: pointer;
        color: #4A99FA;
      }
      //上传样式
   .upload-demo{
      .el-upload{
          border: 0 !important;
      }
    }
    .avatar-uploader{
      border: 0;
      background:#4C86F4;
      color: #fff;
      text-align: center;
      border-radius: 3px;
      font-size:12px;
      position: relative;
      top: 1px;
      width: 56px;
      /deep/ .el-upload{
          border: 0 !important;
      }
    }
    //
}
</style>