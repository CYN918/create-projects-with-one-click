<template>
  <div class="margin">
      <div class="mcard mbottom">
        <div class="title">充值管理</div>
        <div>
        <el-form label-width="120px" size="small">
            <el-row>
             <el-col :span="6">
                  <el-col>
                   <el-form-item label="支付方式：">
                      <el-select v-model="payType" clearable placeholder="请选择支付方式">
                        <el-option label="微信支付" value="wxpay_native"></el-option>
                        <el-option label="支付宝" value="alipay_qr"></el-option>
                        <el-option label="网上银行" value="e-bank"></el-option>
                        <el-option label="公司转账" value="bank_transfer"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-col>
                 <el-col :span="6">
                  <el-col>
                   <el-form-item label="支付状态：">
                      <el-select v-model="payStatus" clearable placeholder="请选择支付状态">
                        <el-option label="待支付" value="0"></el-option>
                        <el-option label="支付中" value="1"></el-option>
                        <el-option label="支付成功" value="2"></el-option>
                        <el-option label="支付失败" value="3"></el-option>
                        <el-option label="取消支付" value="4"></el-option>
                        <el-option label="支付超时" value="5"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-col>
                 <el-col :span="6">
                  <el-col>
                   <el-form-item label="核对状态：">
                      <el-select v-model="checkStatus" clearable placeholder="请选择核对状态">
                        <el-option label="待核对" value="0"></el-option>
                        <el-option label="通过" value="1"></el-option>
                        <el-option label="不通过" value="2"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-col>
                 <el-col :span="6">
                  <el-col>
                   <el-form-item label="申请状态：">
                      <el-select v-model="grantStatus" clearable placeholder="请选择申请状态">
                        <el-option label="待申请" value="0"></el-option>
                        <el-option label="审核中" value="1"></el-option>
                        <el-option label="审核不通过" value="2"></el-option>
                        <el-option label="待发放/审核通过" value="3"></el-option>
                        <el-option label="已发放" value="4"></el-option>
                        <el-option label="发放失败" value="5"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-col>
            </el-row>
            <el-row>       
                <el-col :span="6">
                  <el-col>
                    <el-form-item label="订单号：">
                      <el-col :span="23">
                        <el-input  v-model="paymentOrderNo" placeholder="请输入订单号">
                        </el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-col>
                <el-col :span="10" style="width: auto !important;">
                      <el-form-item label="支付时间：">
                        <el-col>
                          <el-date-picker
                            @change="handlecreateTime"
                            type=daterange
                            valueFormat='yyyy-MM-dd HH:mm:ss'
                            v-model="createTime"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                          </el-date-picker>
                        </el-col>
                      </el-form-item>
                  </el-col>
                <el-col :span="2" style='text-align: center;'>
                        <el-button type="primary" size="small" @click="handelSearchGoods">搜索</el-button>
                </el-col>
                <el-col :span="1" style='text-align: center;'>
                        <el-button type="primary" size="small" @click="reset">重置</el-button>
                </el-col>
              </el-row>
           </el-form>
        </div>  
      </div>
    
      <div class="mcard">
        <el-table :data="noticeList" stripe  border>
          <el-table-column  type="index" align="center" width="50"></el-table-column>
          <el-table-column label="服务商"  align="center" prop="">
             <template slot-scope="scope">
                 <div v-if="merchantName ==0">{{scope.row.agencyName}}</div>
                 <div v-else-if="merchantName ==1">{{scope.row.customerName}}</div>
             </template>
          </el-table-column>
          <el-table-column label="充值人"  align="center" prop="userName"></el-table-column>
          <el-table-column label="联系电话"  align="center" prop="telephone"></el-table-column>
          <el-table-column label="充值金额"  align="center" prop="rechargeAmount"></el-table-column>
          <el-table-column label="支付方式"  align="center" prop="payType">
              <template slot-scope="scope">
                <div v-if="scope.row.payType == 'wxpay_native'">微信扫码支付</div>
                <div v-else-if="scope.row.payType == 'alipay_qr'">支付宝扫码支付</div>
                <div v-else-if="scope.row.payType == 'e-bank'">网银支付</div>
                <div v-else-if="scope.row.payType == 'bank_transfer'">公司转账</div>
            </template>
          </el-table-column>
          <el-table-column label="付款公司"  align="center" prop="bankName"></el-table-column>
          <el-table-column label="付款开户行"  align="center" prop="bankType"></el-table-column>
          <el-table-column  label="付款账号"  align="center"  prop="bankAccount"></el-table-column>
          <el-table-column label="支付状态" align="center" prop="payStatus">
              <template slot-scope="scope">
                <div v-if="scope.row.payStatus == '0'">待支付</div>
                <div v-else-if="scope.row.payStatus == '1'">支付中</div>
                <div v-else-if="scope.row.payStatus == '2'">支付成功</div>
                <div v-else-if="scope.row.payStatus == '3'">支付失败</div>
                <div v-else-if="scope.row.payStatus == '4'">取消支付</div>
                <div v-else-if="scope.row.payStatus == '5'">支付超时</div>
            </template>
          </el-table-column>
          <el-table-column label="支付时间"  align="center" prop="payTime"></el-table-column>
          <el-table-column label="支付单号"  align="center" prop="paymentOrderNo"></el-table-column>
          <el-table-column label="支付票据" align="center" prop="paymentBill" width="200px;">
              <template slot-scope="scope">
                  <div v-if="scope.row.paymentBill">
                     <img  :src="scope.row.paymentBill" @click="scalePic(scope.row.paymentBill)" style="max-width:180px;cursor: pointer;"/>
                  </div>
                  <div v-else >暂无图片</div>
                </template>
          </el-table-column>
          <el-table-column label="收款公司"  align="center" prop="payeeBankName"></el-table-column>
          <el-table-column label="开户行"  align="center" prop="payeeBankType"></el-table-column>
          <el-table-column label="收款账号"  align="center" prop="payeeBankAccount"></el-table-column>
          <el-table-column label="收款金额"  align="center" prop="checkAmount"></el-table-column>
          <el-table-column label="核对状态" align="center" prop="checkStatus">
              <template slot-scope="scope">
              <div v-if="scope.row.checkStatus == '0'">待核对</div>
              <div v-else-if="scope.row.checkStatus == '1'">通过</div>
              <div v-else-if="scope.row.checkStatus == '2'">不通过</div>
            </template>
          </el-table-column>
          <el-table-column label="发放状态" align="center" prop="grantStatus">
              <template slot-scope="scope">
              <div v-if="scope.row.grantStatus == '0'">待申请</div>
              <div v-else-if="scope.row.grantStatus == '1'">审核中</div>
              <div v-else-if="scope.row.grantStatus == '2'">审核不通过</div>
              <div v-else-if="scope.row.grantStatus == '3'">待发放/审核通过</div>
              <div v-else-if="scope.row.grantStatus == '4'">已发放</div>
              <div v-else-if="scope.row.grantStatus == '5'">发放失败</div>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="left" fixed="right" width="180" prop="id">
              <template slot-scope="scope">
                <div class="line-div lines_div">
                  <div class="small-Idiv" @click="openDetails(scope.row.id)" v-permit="'view:topUp'">
                    <div class="i-div">
                      <img src="../../../common/images/icon/查看详情.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">详情</span>
                  </div>
                  <div v-show="scope.row.checkStatus == '0'" class="small-Idiv" @click="uploadBill(scope.row.id)" v-permit="'topUp:upLoad'">
                    <div class="i-div">
                      <img src="../../../common/images/icon/上传.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">上传票据</span>
                  </div>
                  <div v-show="scope.row.checkStatus == '0'" class="small-Idiv" @click="checkTopup(scope.row.id,scope.row.rechargeAmount)" v-permit="'check:recharge'">
                    <div class="i-div">
                      <img src="../../../common/images/icon/确认退款.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">核对充值</span>
                  </div>
                  <div v-show="scope.row.grantStatus == '0' && scope.row.checkStatus == '1'" class="small-Idiv" @click="linesApply(scope.row.id,scope.row.rechargeAmount,scope.row)" v-permit="'apply:limit'">
                    <div class="i-div">
                      <img src="../../../common/images/icon/指派采购员.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">额度申请</span>
                  </div>
                   <div v-show="scope.row.payStatus == '0'" class="small-Idiv" @click="toPaycher(scope.row.paymentOrderNo,scope.row.rechargeAmount,scope.row.payType)" v-permit="'to:pay'">
                    <div class="i-div">
                      <img src="../../../common/images/icon/指派采购员.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">去支付</span>
                  </div>
                </div>
              </template>
           </el-table-column>
          <!--
            <el-table-column label="标题内容" prop="content">
              <template slot-scope="scope">
                <i class="el-icon-bell" v-show="scope.row.status === '1'"></i>
                <span :class="scope.row.status === '2' ? 'readed': ''">{{scope.row.content}}</span>
              </template>
            </el-table-column>
            <el-table-column label="提交时间" width="200" align="center" prop="time"></el-table-column>
            <el-table-column label="类型" width="100" align="center" prop="type"></el-table-column>
          -->
        </el-table>
        <el-row class="bottom">
          <el-col :span="18" class="right">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pagination.current_page"
              :page-size="pagination.page_size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pagination.total_count"
            ></el-pagination>
          </el-col>
        </el-row>
      </div>

        <!-- 充值到账核对 -->
        <el-dialog
          title="充值到账核对"
          :visible.sync="dialogVisible"
          width="80%"
          :close-on-click-modal="false"
          :before-close="handleClose"
          class="collate"
        >
         <div class="bill">
            <p class="top-up-bill">充值到账核对信息</p>
             <el-table :data="noticeListH" stripe  border>
              <el-table-column  type="index" align="center" width="50"></el-table-column>
              <el-table-column label="服务商"  align="center" prop="">
                <template slot-scope="scope">
                 <div v-if="merchantName ==0">{{scope.row.agencyName}}</div>
                 <div v-else-if="merchantName ==1">{{scope.row.customerName}}</div>
                </template>
              </el-table-column>
              <el-table-column label="充值人"  align="center" prop="userName">
                <!-- <template slot-scope="scope">
                  <div v-if="scope.row.messageCategory == '0'">系统消息</div>
                  <div v-else-if="scope.row.messageCategory == '1'">供应商</div>
                  <div v-if="scope.row.messageCategory == '2'">客户</div>
                  <div v-else-if="scope.row.messageCategory == '3'">其他</div>
                </template> -->
              </el-table-column>
              <el-table-column label="联系电话"  align="center" prop="telephone"></el-table-column>
              <el-table-column label="充值金额"  align="center" prop="rechargeAmount"></el-table-column>
              <el-table-column label="支付方式"  align="center" prop="payType">
                  <template slot-scope="scope">
                    <div v-if="scope.row.payType == 'wxpay_native'">微信扫码支付</div>
                    <div v-else-if="scope.row.payType == 'alipay_qr'">支付宝扫码支付</div>
                    <div v-else-if="scope.row.payType == 'e-bank'">网银支付</div>
                    <div v-else-if="scope.row.payType == 'bank_transfer'">公司转账</div>
                </template>
              </el-table-column>
              <el-table-column label="付款公司"  align="center" prop="bankName"></el-table-column>
              <el-table-column label="付款开户行"  align="center" prop="bankType"></el-table-column>
              <el-table-column  label="付款账号"  align="center"  prop="bankAccount"></el-table-column>
              <el-table-column label="支付状态" align="center" prop="payStatus">
                  <template slot-scope="scope">
                    <div v-if="scope.row.payStatus == '0'">待支付</div>
                    <div v-else-if="scope.row.payStatus == '1'">支付中</div>
                    <div v-else-if="scope.row.payStatus == '2'">支付成功</div>
                    <div v-else-if="scope.row.payStatus == '3'">支付失败</div>
                    <div v-else-if="scope.row.payStatus == '4'">取消支付</div>
                    <div v-else-if="scope.row.payStatus == '5'">支付超时</div>
                </template>
              </el-table-column>
              <el-table-column label="支付时间"  align="center" prop="payTime"></el-table-column>
              <el-table-column label="支付单号"  align="center" prop="paymentOrderNo"></el-table-column>
              <el-table-column label="支付票据" align="center" prop="paymentBill" width="200px;">
                <template slot-scope="scope">
                      <div v-if="scope.row.paymentBill">
                        <img  :src="scope.row.paymentBill" style="max-width:180px;"/>
                      </div>
                      <div v-else >暂无图片</div>
                    </template>
              </el-table-column>
              <el-table-column label="收款公司"  align="center" prop="payeeBankName"></el-table-column>
              <el-table-column label="开户行"  align="center" prop="payeeBankType"></el-table-column>
              <el-table-column label="收款账号"  align="center" prop="payeeBankAccount"></el-table-column>
              <el-table-column label="收款金额"  align="center" prop="checkAmount"></el-table-column>
              <el-table-column label="核对状态" align="center" prop="checkStatus">
                  <template slot-scope="scope">
                    <div v-if="scope.row.checkStatus == '0'">待核对</div>
                    <div v-else-if="scope.row.checkStatus == '1'">通过</div>
                    <div v-else-if="scope.row.checkStatus == '2'">不通过</div>
                  </template>
                </el-table-column>
                <el-table-column label="发放状态" align="center" prop="grantStatus">
                  <template slot-scope="scope">
                    <div v-if="scope.row.grantStatus == '0'">待申请</div>
                    <div v-else-if="scope.row.grantStatus == '1'">审核中</div>
                    <div v-else-if="scope.row.grantStatus == '2'">审核不通过</div>
                    <div v-else-if="scope.row.grantStatus == '3'">待发放/审核通过</div>
                    <div v-else-if="scope.row.grantStatus == '4'">已发放</div>
                    <div v-else-if="scope.row.grantStatus == '5'">发放失败</div>
                  </template>
                </el-table-column>
            </el-table>
         </div>   
          <div class="bill">
            <p class="top-up-bill">充值到账核对</p>
          
            <div>
              <el-form ref="form" :model="form" label-width="80px" style="margin-top: 20px;">
              <el-form-item label="核对结果:">
                <template>
                <!--  <el-radio label="0" v-model="form.resource">待核对</el-radio> -->
                  <el-radio label="1" v-model="form.resource">通过</el-radio>
                  <el-radio label="2" v-model="form.resource">不通过</el-radio>
                </template>
              </el-form-item>
              <el-form-item label="核对金额:">
                <el-input type="number"  v-model="form.amount" style="resize:none;width:40%;" ></el-input>  元
              </el-form-item>
              <el-form-item label="核对说明:">
                <el-input type="textarea" v-model="form.desc" style="resize:none;"></el-input>
              </el-form-item>
              </el-form>
            </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="handleClose">取 消</el-button>
            <el-button type="primary" @click="handleSave">确 定</el-button>
          </span>
        </el-dialog>



      <!-- 额度发放申请表 -->
      <el-dialog
        title="额度发放申请表"
        :visible.sync="linesVisible"
        width="80%"
        :close-on-click-modal="false"
        :before-close="handleLinesClose"
        class="collate"
        >
        <div class="bill">
          <p class="top-up-bill">额度发放申请表</p>
          <el-table :data="noticeListF" stripe  border>
            <el-table-column  type="index" align="center" width="50"></el-table-column>
            <el-table-column label="服务商"  align="center" prop="">
              <template slot-scope="scope">
                 <div v-if="merchantName ==0">{{scope.row.agencyName}}</div>
                 <div v-else-if="merchantName ==1">{{scope.row.customerName}}</div>
              </template>
            </el-table-column>
            <el-table-column label="充值人"  align="center" prop="userName">
              <!-- <template slot-scope="scope">
                <div v-if="scope.row.messageCategory == '0'">系统消息</div>
                <div v-else-if="scope.row.messageCategory == '1'">供应商</div>
                <div v-if="scope.row.messageCategory == '2'">客户</div>
                <div v-else-if="scope.row.messageCategory == '3'">其他</div>
              </template> -->
            </el-table-column>
            <el-table-column label="联系电话"  align="center" prop="telephone"></el-table-column>
            <el-table-column label="充值金额"  align="center" prop="rechargeAmount"></el-table-column>
            <el-table-column label="支付方式"  align="center" prop="payType">
                <template slot-scope="scope">
                  <div v-if="scope.row.payType == 'wxpay_native'">微信扫码支付</div>
                  <div v-else-if="scope.row.payType == 'alipay_qr'">支付宝扫码支付</div>
                  <div v-else-if="scope.row.payType == 'e-bank'">网银支付</div>
                  <div v-else-if="scope.row.payType == 'bank_transfer'">公司转账</div>
              </template>
            </el-table-column>
            <el-table-column label="付款公司"  align="center" prop="bankName"></el-table-column>
            <el-table-column label="付款开户行"  align="center" prop="bankType"></el-table-column>
            <el-table-column  label="付款账号"  align="center"  prop="bankAccount"></el-table-column>
            <el-table-column label="支付状态" align="center" prop="payStatus">
               <template slot-scope="scope">
                <div v-if="scope.row.payStatus == '0'">待支付</div>
                <div v-else-if="scope.row.payStatus == '1'">支付中</div>
                <div v-else-if="scope.row.payStatus == '2'">支付成功</div>
                <div v-else-if="scope.row.payStatus == '3'">支付失败</div>
                <div v-else-if="scope.row.payStatus == '4'">取消支付</div>
                <div v-else-if="scope.row.payStatus == '5'">支付超时</div>
              </template>
            </el-table-column>
            <el-table-column label="支付时间"  align="center" prop="payTime"></el-table-column>
            <el-table-column label="支付单号"  align="center" prop="paymentOrderNo"></el-table-column>
            <el-table-column label="支付票据" align="center" prop="paymentBill" width="200px;">
                <template slot-scope="scope">
                  <div v-if="scope.row.paymentBill">
                     <img  :src="scope.row.paymentBill" style="max-width:180px;"/>
                  </div>
                  <div v-else >暂无图片</div>
                </template>
            </el-table-column>
            <el-table-column label="收款公司"  align="center" prop="payeeBankName"></el-table-column>
            <el-table-column label="开户行"  align="center" prop="payeeBankType"></el-table-column>
            <el-table-column label="收款账号"  align="center" prop="payeeBankAccount"></el-table-column>
            <el-table-column label="收款金额"  align="center" prop="checkAmount"></el-table-column>
            <el-table-column label="核对状态" align="center" prop="checkStatus">
               <template slot-scope="scope">
                <div v-if="scope.row.checkStatus == '0'">待核对</div>
                <div v-else-if="scope.row.checkStatus == '1'">通过</div>
                <div v-else-if="scope.row.checkStatus == '2'">不通过</div>
              </template>
            </el-table-column>
            <el-table-column label="发放状态" align="center" prop="grantStatus">
               <template slot-scope="scope">
                <div v-if="scope.row.grantStatus == '0'">待申请</div>
                <div v-else-if="scope.row.grantStatus == '1'">审核中</div>
                <div v-else-if="scope.row.grantStatus == '2'">审核不通过</div>
                <div v-else-if="scope.row.grantStatus == '3'">待发放/审核通过</div>
                <div v-else-if="scope.row.grantStatus == '4'">已发放</div>
                <div v-else-if="scope.row.grantStatus == '5'">发放失败</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="bill">
          <p class="top-up-bill">申请信息</p>
          <div class="apply-top-up">
            <div class="lf">
               <ul>
                  <li><span class="top-up-left">本次充值金额</span><span class="top-up-right">{{ formF.amount }}(元)</span></li>
                  <li><span class="top-up-left">授权额度</span><span class="top-up-right">20000(元)</span></li>
                  <li><span class="top-up-left">余额</span><span class="top-up-right">20000(元)</span></li>
                </ul>
                <ul>
                  <li><span class="top-up-left">合计充值金额</span><span class="top-up-right">20000(元)</span></li>
                  <li><span class="top-up-left">已使用金额</span><span class="top-up-right">20000(元)</span></li>
                  <li><span class="top-up-left">本次申请发放金额</span><span class="top-up-right"><input type="number" v-model="formF.amount" placeholder="请输入"/>(元)</span></li>
                </ul>
            </div> 
        
            <div class="rt">
              <div class="instructions">申请说明</div>
              <textarea type="textarea" class='textarea' v-model="formF.instruct" placeholder="请输入"></textarea>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleLinesClose" size="small">取 消</el-button>
          <el-button type="primary" @click="handleLinesSave" size="small">提交</el-button>
        </span>
      </el-dialog>
   
         <!--上传票据弹框-->
        <el-dialog
          title="上传票据"
          :visible.sync="importDialog"
          width="40%"
          :close-on-click-modal="false"
        >
          <el-form :model="formP"  ref="formName" label-width="100px" >
            <el-form-item label="票据图片：" prop="activityTypeImgUrl">
              <div class="uploadImgWrap">
                <div v-if="formP.activityTypeImgUrl"
                    style="display: inline-block;width: 90%; margin-right: 20px; border-radius:4px">
                  <i class="img_wrap"><img style="width: 100%; height: 100%" :src="formP.activityTypeImgUrl" alt=""></i>
                </div>
                <div style="display: inline-block;" v-if="!editable">
                  <label for="uploadPic"
                        style="margin-bottom:30px;display: inline-block;cursor: pointer; height:32px;line-height: 32px;padding: 0 14px;background:rgba(76,134,244,1);color: #fff;border-radius:3px;">
                    <input ref="file_input1" type="file" @change="uploadPic(1)" accept="image/jpeg, image/png"
                          id="uploadPic" style="position: absolute; top: -10000px">
                    <span v-if="!formP.activityTypeImgUrl">上传图片</span>
                    <span v-else>重新上传</span>
                  </label>
                  <!-- <p style="color: #606266;font-size: 12px; line-height: 2">1、图片尺寸建议：710px*300px</p> -->
                  <p style="color: #606266;font-size: 12px; line-height: 2">1、支持JPG、PNG格式的图片，图片不能大于2M。</p>
                </div>
              </div>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="importDialog = false" size="small">取 消</el-button>
            <el-button type="primary" @click="confirmCreateNewType" size="small">确 定</el-button>
          </span>
        </el-dialog>

         <!-- 支付方式 -->
			<el-dialog title="支付方式" :visible.sync="dialogTypeVisible" width="70%"  :before-close="payClose"  :close-on-click-modal="false">
				<el-form ref="form"  label-width="120px" size="small">
					<div class="titleT">
						<h4 class="title">{{ payTypeTit }}</h4>
					</div>
					<el-row v-show=" payflag ">
						<el-col :span="12" style="margin-left: 30px;font-size: 16px;margin-bottom: 20px;">
						     提交订单成功，请尽快付款！订单号: {{ orderNo }}
						</el-col>
						<el-col :span="10" style="text-align: right;font-size: 16px;">
								应付金额<span class="red_word" style="color:red;font-weight:bold;"> {{recharge}} </span>元
						</el-col>
			    	</el-row>
					<el-row v-show=" payflag ">
						<el-col :span="24" style="margin-left: 30px;font-size: 13px;">
							<el-col :span="12">
								距离二维码过期时间还剩: <span style="color:red;font-weight:bold;"> {{payMinutes}} </span></span>分<span class="time"> <span style="color:red;font-weight:bold;">{{paySeconds}}</span>  </span>秒 ,过期后请手动刷新二维码，重新获取二维码
							</el-col>
							
						</el-col>
			    	</el-row>
			    	<el-row v-show=" payflag " style="margin: 20px auto;width: 60%;">
						<el-col :span="24">
							<div :span="12" style="width:50%;float: left;">
								<div style="display: inline-block;position: relative;width: 100%;">
                                	<img :src="imgUrl" alt="" style="border: 1px solid #666;border-radius: 4px;width: 100%;">
										<div class="refresh" v-show="refresh" @click="refreshQ">
                                         	<img src="../../../common/images/paytype/refresh.png"   alt class=""  style="width: 100px;"/>
							         	</div>
								</div>
							    <div class="miao">
	                                <img src="../../../common/images/paytype/瞄准.png"   alt class=""  style=""/>
									<p>{{ textCon  }}</p>
								</div>
							</div>
							<el-col :span="12" v-show="treasure">
						        <div class="home">
									<img src="../../../common/images/paytype/alipay_scan.png"   alt class="home_i"  style=""/>
									<img src="../../../common/images/paytype/alipay_home.png"   alt class=""  style="width: 92%;padding-left: 10%;"/>
								</div>
					    	</el-col>
					      	<el-col :span="12" v-show="weixin">
						        <div class="home">
									<img src="../../../common/images/paytype/wechatpay_scan.png"   alt class="home_i"  style=""/>
									<img src="../../../common/images/paytype/wechatpay_home.png"   alt class=""  style="width: 92%;padding-left: 10%;"/>
								</div>
					    	</el-col>
						</el-col>
					</el-row>
					<el-row v-show=" payflagS ">
             	<el-col :span="24" style="text-align: center;">
                      <el-col :span="24" style="padding: 40px;">
                            <el-col :span="12" class="text_r">
                                  <img src="../../../common/images/paytype/成功 @2x.png"   alt class=""  style=""/>        
							               </el-col>
								            	<el-col :span="12" class="text_l">
                                          <h3 style="font-size: 24px;color:#4A99FA;">支付成功！</h3>
                              <div style="padding: 20px 0;">
                                <p>付款成功,请查询订单！</p>
                              </div>
                                      <el-button type="success"  @click="queryOrder" style="background:#4C86F4;">查询订单</el-button>
                              </el-col>
							          </el-col>
					   	</el-col>
					</el-row>
					<el-row v-show=" payflagF ">
             <el-col :span="24" style="text-align: center;">
                                <el-col :span="24" style="padding: 40px;">
                                    <el-col :span="12" class="text_r">
                                         <img src="../../../common/images/paytype/支付失败@2x.png"   alt class=""  style="width: 220px;"/>        
							        </el-col>
									<el-col :span="12" class="text_l" style="padding-top: 40px;">
                                          <h3 style="font-size: 24px;color:#FF3535;">支付失败！</h3>
										  <div style="padding: 20px 0;">
											  <p>支付失败，请重新支付</p>
										  </div>
						                  <el-button type="success"  @click="againOrder" style="background:#4C86F4;">重新支付</el-button>
						 	        </el-col>
						    	</el-col>
						</el-col>
					</el-row>
				</el-form>
				<span slot="footer" class="dialog-footer">
				<el-button type="danger" @click="payClose" size="small">关 闭</el-button>
				<!-- <el-button type="primary" @click="paySave" size="small">确 定</el-button> -->
				</span>
			</el-dialog>

        <!--票据图片放大-->
      <el-dialog
        title="票据图片"
        :visible.sync="imgDialog"
        width="40%"
        :close-on-click-modal="false"
      >
        <el-row>
          <el-col :span="24">
            <div class="grid-content bg-purple-dark" style="text-align: center;">
                <img :src="imgsrc" style="width: 80%;" /> 
            </div>
          </el-col>
        </el-row>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="imgDialog = false" size="small">关 闭</el-button>
        </span>
      </el-dialog>

  </div>
</template>

<script>
import {  advancePayment, checkTopup , handleSave ,handleLinesSave , toPay , uploadingBill , paymentorderCon ,payStatusTop , getMerchantName} from '@/api/creditmanage/index'
import { addActivityType,  deleteActivityType,  reqActivityList,  updateActivityType,  uploadFile } from '@/api/activity/index'
	let BASE_URL = ''
	if (process.env.NODE_ENV === 'development') {
	BASE_URL = 'http://www.maige.com'
	} else {
	BASE_URL = `http://${location.hostname}`
	}

  var  timer
  
export default {
  name: 'Notice',
  data () {
    return {
      imgDialog:false,
      imgsrc:'',
      merchantName:'',  // 服务商
      dialogapprovalVisible: false,    // 支付弹框
      dialogTypeVisible:false,
      importDialog :false,  // 上传票据模态框
      uploadUrl: '',
      fileList: [],
      imageUrl: '',
      dialogVisible:false, //  核对重置弹框
      form: {             //核对弹框数据
        resource: '1',
        amount: '',
        desc: '',
      },
      id: '',
      formF:{         //额度申请数据          
        instruct :'',
        amount: ''
      },
      formP: {
        activityTypeImgUrl: '',
        activityTypeName: '',
        iconUrl: '',
        remark: '',
        sortOrder: '',
        isCustomerCreate: 1,
        activityTypeId: null,
      },
      editable: false, // 是否可编辑
      linesVisible:false,  //额度申请弹框
      descTitle: '',  
      payType: '', // 支付方式
      payStatus: '', // 支付状态
      checkStatus: '' ,
      grantStatus : '',
      paymentOrderNo :'',  //订单号
      createTime: '',   // 支付时间
      noticeList: [],   // 表格数据
      noticeListH: [],  // 充值到账核对弹框表格数据
      noticeListF: [],  // 额度发放弹框表格数据
      pagination: {
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
      selectNotice: [],
      path:'',
       payTypeTit:'',
				 payflag : true,
				 payflagS:false,
				 payflagF:false,
				 bizScene : '',   // 业务场景
				 codeImgUrl : '',
				 codeUrl : '',
				 expireTime : '',
				 payType1 : '',
				 sign : '',
				 orderNo:'',
				 now : 0 , 
				 expireTime1: 0,
				 payMinutes: "",
				 paySeconds: "",
				 timer: '',
				 refresh:false,
				 treasure: true,
				 weixin:false,
         textCon:'请使用支付宝扫一扫扫描二维码支付 ',
         amountj:'',    // 预存金额  
         organizeName :'',
				 sysuserType : '',
         imgUrl:'',
         recharge:'',
         radio: 1,
         linesTable:[],
    }
  },
  created () {
    this.getMerchantName()
    this.advancePayment()
  },
  methods: {
    advancePayment() {
      let data = {}
      data.pageNum = Number(this.pagination.current_page)
      data.pageSize = Number(this.pagination.page_size)
      data.payType = this.payType
      data.payStatus = this.payStatus
      data.checkStatus = this.checkStatus
      data.grantStatus = this.grantStatus
      data.paymentOrderNo = this.paymentOrderNo
      data.startTime = this.createTime[0]
      data.endTime = this.createTime[1]
      advancePayment(data).then(res => {
        var that =this
        that.noticeList = res.data.list
        this.pagination.total_count = res.data.total
      })
    },
    getMerchantName(){
       getMerchantName().then( res =>{
          this.merchantName = res.data.platformType 
       })
    },
    //筛选已读或未读
    filterTag(value, row) { 
      return row.tag === value;
    },
    // 跳转详情页面
    openDetails(id) {   
       this.$router.push({ name: "topUpDetails" , query: {id: id}});
    },
    handlecreateTime() {

    },
    // 搜索
    handelSearchGoods(){
      this.pagination.current_page = 1  
      this.advancePayment()
    },
    // 重置
    reset () {
      this.pagination.current_page = 1
      this.pagination.page_size = 10
      this.payType = ''
      this.payStatus = ''
      this.createTime = ''
      this.checkStatus = ''
      this.grantStatus = ''
      this.paymentOrderNo = ''
      this.advancePayment()
    },
    handleSizeChange (val) {
      this.pagination.page_size = val
      this.advancePayment()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this.advancePayment()
    },
     //核对充值
    checkTopup(id,rechargeAmount){
       this.id =  id
       this.form.amount = rechargeAmount
       this.dialogVisible = true;
       this.form.resource = '1' 
       this.form.desc = ''        
       var data = {
         id: id
       }
       checkTopup(data).then(res=>{
         var data = []
          data[0] = res.data
          this.noticeListH = data
       })
    },
    // 取消核对
    handleClose() {
        if( this.form.amount || this.form.desc ){
          this.$confirm('是否取消充值到账核对?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
              this.dialogVisible = false
          }).catch(() => {
                    
          });
        }else{
            this.dialogVisible = false
        }

    },
    // 确认核对
    handleSave() {
      var data = {}
      data.checkStatus = this.form.resource 
      data.checkAmount = this.form.amount 
      data.checkInstruction = this.form.desc 
      data.id = this.id
      
      if ( !this.form.amount  ) {
        this.$message({
          message: '核对金额不能为空，请输入',
          type: 'warning'
        })
        return
      }

      this.$confirm('您确定该充值款项确实已经到账了吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
           handleSave(data).then(res=>{
            if(res.code == 200 ) {
                this.$message({
                  type: 'success',
                  message: res.message
                }); 
                this.dialogVisible = false
                this.advancePayment()
            }         
          })

      }).catch(() => {
                   
      }); 
    },
    //额度申请
    linesApply(id,rechargeAmount,linesTable){
      this.linesTable = linesTable
      console.log(this.linesTable)
       this.formF.amount = rechargeAmount
       this.id = id
       this.linesVisible = true
       this.formF.instruct = ""       
       var data = {}
       data.id = id
       checkTopup(data).then(res=>{
         var data = []
         data[0] = res.data
         this.noticeListF = data
       })
    },
    // 取消申请
    handleLinesClose() {
       if( this.formF.instruct || this.formF.amount ){
         this.$confirm('是否取消额度申请?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
             this.linesVisible = false
        }).catch(() => {
                  
        });

       }else{
          this.linesVisible = false
       }
    },
    // 确认申请
    handleLinesSave() {
      var data = {}
      data.applyInstruction =  this.formF.instruct
      data.applyAmount =  Number(this.formF.amount)
      data.id = this.id
      data.accountId = this.linesTable.accountId
      data.accountName = this.linesTable.accountName
      data.adminUserId = this.linesTable.adminUserId
      data.balanceAmount = this.linesTable.balanceAmount

      if( this.merchantName == 0  ){
          data.merchantName = this.linesTable.agencyName
          data.merchantType = 1
      }else if(  this.merchantName == 1 ){
         data.merchantName = this.linesTable.customerName
         data.merchantType = 2
      }
      
      data.payStatus = this.linesTable.payStatus
      data.paymentOrderNo = this.linesTable.paymentOrderNo

      if( !this.formF.amount ){
          this.$message({
              type: 'error',
              message: "本次申请发放金额不能为空，请输入"
          }); 
          return
        }

       this.$confirm('是否确定额度申请?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        handleLinesSave(data).then(res=>{
          if( res.code == 200 ) {
              this.$message({
                type: 'success',
                message: res.message
              }); 
              this.linesVisible = false
              this.advancePayment()
              // 跳转到额度审核页面
              this.$router.push({name:"creditAudit"})
          }         
        })
          
      }).catch(() => {
                   
      }); 

    },
    uploadBill (id){
         this.id = id
         this.importDialog = true
         this.formP.activityTypeImgUrl =""
    },
    //上传票据
    submitUpload () {
      this.$refs.upload.submit()
    },
    // 上传图片
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
      const path = await this.uploadFile(files)
      if (index === 1) {
        this.formP.activityTypeImgUrl = path
      } else if (index === 2) {
        this.form.iconUrl = path
      }
      this.$refs[`file_input${index}`].value = '' // 清空上传的文件
    },
    // 上传文件
    async uploadFile(file) {
      const formData = new FormData()
      let path = ''
      formData.append('file', file)
      const res = await uploadFile(formData)
      if (res.code === 200) {
        path = res.data.domain + res.data.filePath
        this.path = path
      }
      return path
    },
    // 确定新建类型
    confirmCreateNewType() {
    // if (this.flag === 0 || this.flag === 1) {
      this.$refs['formName'].validate((valid) => {
        if (valid) {
          var data = {}
          data.id= this.id
          data.paymentBill = this.path
          uploadingBill(data).then( res=>{
             console.log(res)
             this.importDialog = false
             this.advancePayment()
          })
          // if (this.flag === 0 ) {
          //   this.addActivityType()
          // } else {
          //   this.updataActivityType()
          // }
         
        } else {
          return false;
        }
      });
      //  } else {
        //   this.dialogVisible = false
        // }

      },
      // 查询订单
     	queryOrder(){
           this.advancePayment()
           this.dialogTypeVisible = false
      },
      againOrder() {
           this.dialogTypeVisible = false
			},
      // 去支付
      toPaycher(orderNo , rechargeAmount ,payType){
        this.refresh = false
        var data = {
          orderNo : orderNo
        }
        this.orderNo =  orderNo
        this.recharge = rechargeAmount
        if( payType == 'wxpay_native' ){
            this.radio = 2
            this.payTypeTit = "支付宝支付"
        }else if( payType == 'alipay_qr' ){
            this.radio = 1
            this.payTypeTit = "微信支付"
        }

        this.payflag = true
        this.payflagS = false
        this.payflagF = false
        this.payMinutes = 0
        this.paySeconds = 0
					paymentorderCon(data).then(res=>{
						if( res.code == 200 ) {
							this.imgUrl = BASE_URL + '/api/open/b/b2b2c/projectservice/paymentorder/qr_code.json?codeUrl='+ res.data.codeUrl
							this.dialogTypeVisible = true

							this.bizScene =  res.data.bizScene
							this.codeImgUrl =  res.data.codeImgUrl
							this.codeUrl =  res.data.codeUrl
							this.expireTime =  res.data.refreshEndTime
							this.payType1 =  res.data.payType
							this.sign =  res.data.sign
							this.orderNo =  res.data.orderNo
							
							this.now = Math.floor(res.count / 1000)
							this.expireTime1 = Date.parse(new Date(res.data.refreshEndTime)) / 1000
							this.countDown(this.expireTime1)

							// this.payStatus()
							timer = setInterval(this.payStatusTop, 3000)
						}         
					})

      },
      	 // 二维码过期倒计时
			async countDown(expireTime1) {
		   	let restTime = expireTime1 - this.now
        this.timer = setInterval(() => {
          restTime -= 1
          if (restTime >= 0) {
          this.payMinutes = Math.floor(restTime / 60);
          if (this.payMinutes < 10) {
            this.payMinutes = '0' + this.payMinutes
            console.log( this.payMinutes )
          }
          this.paySeconds = Math.floor(restTime % 60);
          if (this.paySeconds < 10) {
            this.paySeconds = '0' + this.paySeconds
            console.log( this.paySeconds )
          }
          } else {
              clearInterval(this.timer);
            //this.$emit('stopQueryOrder')
              this.refresh = true
              clearInterval(timer);
          }
        }, 1000);
      },
      refreshQ () {
				var data = {
			    	orderNo: this.orderNo
        }
        this.toPaycher( this.orderNo , this.recharge )
        this.refresh = false
       	clearInterval(this.timer);
		  	clearInterval(timer);
			},
      payClose () {
	           this.$confirm('是否关闭?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
					}).then(() => {
						this.dialogTypeVisible = false
						clearInterval(timer);
						clearInterval(this.timer);
					}).catch(() => {
						
				});
			},
			// paySave () {
	    //        this.$confirm('是否关闭?', '提示', {
			// 		confirmButtonText: '确定',
			// 		cancelButtonText: '取消',
			// 		type: 'warning'
			// 		}).then(() => {
			// 			this.dialogTypeVisible = false
						
			// 		}).catch(() => {
						
			// 	});
			// },
			payStatusTop() {
				var data ={}
				data.bizScene =  this.bizScene 
				data.codeImgUrl =  this.codeImgUrl 
				data.codeUrl =  this.codeUrl 
				data.expireTime = this.expireTime
				data.payType =  this.payType1
				data.sign =  this.sign 
				data.orderNo = this.orderNo
           payStatusTop(data).then(res =>{
				   if( res.code == 200){
					   // 支付成功
					   if ( res.data ==2  ) {
                  this.payflag = false
						     clearInterval(timer);
					       this.payflagS = true
					       this.payflagF = false
						   return
					   }else if( res.data !=2  ) {
						  // 支付失败
						   this.payflagS = false
						   this.payflagF = true
						   clearInterval(timer);
						  return
					   }
                       
				   }else{
						//   clearInterval(timer);
						if( this.dialogTypeVisible ){
							// this.payStatus()
                           
						}else{
							clearInterval(timer);
					    clearInterval(this.timer);
						}
					    
				   }
			   }).catch((data) => {
				    return false;
				});     
      },
    // 放大票据图片
     scalePic(imgsrc){
       console.log(imgsrc)   
       this.imgDialog = true
       this.imgsrc = imgsrc
    },
  },
  filters:{
     filterA(val) {
    //    let str = val
    //    str = str.replace(/<[^<>]+>/g,'')
    //    return str 
     }
  },
  watch: {
     radio (val){
			   if ( val == 1 ) {
           this.radio = 1+''
				   this.payType1 = 'alipay_qr'
				   this.payTypeTit = "支付宝支付"
				    this.treasure = true
				   this.weixin = false
				   this.textCon = '请使用支付宝扫一扫扫描二维码支付 '
			   }else  if( val == 2 ){
                   this.radio = 2+''
				   this.payType1 = 'wxpay_native'
				   this.payTypeTit = "微信支付"
				   this.treasure = false
				   this.weixin = true
				   this.textCon = '请使用微信扫一扫扫描二维码支付 '
			   }else  if( val == 3 ){
                   this.radio = 3+''
				   this.payType1 = 'wxpay_native1'
				   this.payTypeTit = "在线支付"
			   }else  if( val == 4 ){
                   this.radio = 4+''
				   this.payType1 = 'wxpay_native2'
				   this.payTypeTit = "公司转账"
			   }
			},
  }
}
</script>

<style  scoped>
   .margin >>>.el-dialog__header{
     text-align:center;
    }
    .el-textarea__inner{
      resize: none;
    }
    .collate >>> .el-dialog__body{
      padding: 0;
      background: #ebf4fe !important;
    }
</style>
<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
    .bill{
        padding: 5px 20px 20px;
        margin-bottom: 20px;
        background: #fff;  
    }
    .text_r{
			text-align: right;
			padding-right:20px;
		}
		.text_l{
			text-align: left;
			padding-left:20px;
			padding-top: 10px;
		}
    .refresh{
			display: inline-block;
			position: absolute;
			top: 50%;
			right: 50%;
			margin-top: -50px;
			margin-right: -50px;
		}
    .title {
      margin-left: -20px;
      font-size: 16px;
      font-weight: 400;
      color: 3333;
      padding-left: 10px;
      line-height: 1.4;
      border-left: 4px solid #4C86F4;
      margin-bottom: 10px;
   }
		.home{
			text-align: right;
            position: relative;
		}
		.home_i{
			width: 120px;
			position: absolute;
			top: 30%;
			left: 10%;
		}
		.miao{
			display: flex;
			background: #409eff;
			padding: 20px;
			margin-top: 10px;
		}
		.miao img{
			width: 20%;
            margin-right: 20px;
		}
		.miao p{
			color:#fff;
			line-height: 25px;
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
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
.top-up-bill {
    border-left: 4px solid #4a99fa;
    padding-left: 5px;
    font-weight: bold;
    margin: 10px 0;
    font-size: 15px;
}
.top-up-title{
  text-align: center;
  font-size: 24px;
  margin: 15px 0px 15px 0px;
}
.apply-top-up > ul > li{
  width: 346px;
  height: 50px;
  line-height: 50px;
  float: left;
}
.apply-top-up .lf{
  float: left;
  width: 80%;
}

.top-up-left{
  width: 120px;
  display: block;
  text-align: center;
  background: #f5f8fc;
  float: left;
}
.top-up-right{
  width: 226px;
  float: left;
  display: block;
  text-align: center;
}
.apply-top-up{
  height: 102px;
  border: 1px solid #d6deef;
  margin-top: 20px;
}
.apply-top-up  ul{
  width: 100%;
  float: left;
}
.apply-top-up  ul li{
    height: 50px;
    display: inline-block;
    width: 33.3333%;
    text-align: center;
}
.apply-top-up  ul li span.top-up-left{
  display: inline-block;
    width: 60%;
    line-height: 50px;
}
.apply-top-up  ul li span.top-up-right{
display: inline-block;
    width: 40%;
    line-height: 50px;
}
.apply-top-up .rt{
  float: left;
    width: 20%;
    height: 100px;
}
.apply-top-up div.instructions{
    display: inline-block;
    padding: 0 11px;
    box-sizing: border-box;
    background: #f5f8fc;
    text-align: center;
    line-height: 25px;
    width: 20%;
}
.apply-top-up  div{
  width: 360px;
  height: 100px;
  float: left;
}
.apply-top-up > div > label{
  width: 50px;
  height: 100px;
  background: #f5f8fc;
  writing-mode:tb-rl;
  padding-right: 17px;
  text-align: center;
  float: left;
}
.apply-top-up  .el-textarea{
  float: left;
   width: 88% !important;
   height: 100px;
}
.top-up-right input{
  width: 60%;
  height: 40px;
  border: 1px solid #409EFF;
  border-radius: 3px;
  padding-left: 5px;
}
.textarea{
    width:  80%;
    height: 100%;
    resize: none;
    border: 1px solid #409EFF;
    border-radius: 3px;
}
.apply-top-up  .el-textarea__inner{
  width: 350px;
  height: 100px;
  border: none;
  height: 100% !important;
  width: 88% !important;
  height: 100px !important;
}
.lines_div{
  display: block;
}
.lines_div .small-Idiv{
  display: inline-block;
  width: 50%;
  text-align: center;
}
.el-icon-message , .el-icon-paperclip{
  font-size:18px;
  cursor: pointer;
  margin: 0 5px;
} 
.header {
  margin: 20px;
}
.el-icon-bell {
  color: $themeColor;
  margin-right: 10px;
}
.readed {
  color: #aaa;
}
.bottom {
  margin: 20px 0;
  .right {
    text-align: right;
  }
}
 .upload-wrapper {
      width: 80%;
      padding: 40px 20px;
      margin-bottom: 20px;
      background: #EDF0F5;
    }
</style>
