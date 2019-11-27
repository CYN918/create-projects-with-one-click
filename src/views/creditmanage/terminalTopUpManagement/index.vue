<template>
  <div class="margin">
      <div class="mcard mbottom">
        <div class="title">充值管理</div>
        <div>
        <el-form label-width="120px" size="small">
            <el-row>
             <el-col :span="6">
                  <el-col>
                   <el-form-item label="支付方式">
                      <el-select v-model="payType" placeholder="请选择支付方式">
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
                   <el-form-item label="支付状态">
                      <el-select v-model="payStatus" placeholder="请选择支付状态">
                        <el-option label="待支付" value="0"></el-option>
                        <el-option label="支付中" value="1"></el-option>
                        <el-option label="支付成功" value="2"></el-option>
                        <el-option label="支付失败" value="3"></el-option>
                        <el-option label="取消" value="4"></el-option>
                        <el-option label="支付超时" value="5"></el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-col>
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
          <el-table-column label="服务商"  align="center" prop=""></el-table-column>
          <el-table-column label="充值人"  align="center" prop="">
            <template slot-scope="scope">
              <div v-if="scope.row.messageCategory == '0'">系统消息</div>
              <div v-else-if="scope.row.messageCategory == '1'">供应商</div>
              <div v-if="scope.row.messageCategory == '2'">客户</div>
              <div v-else-if="scope.row.messageCategory == '3'">其他</div>
            </template>
          </el-table-column>
          <el-table-column label="联系电话"  align="center" prop="">
            <template slot-scope="scope">
              <div v-if=" 0 <= scope.row.businessType  &&  scope.row.businessType  <= 99">系统消息</div>
              <div v-else-if=" 100 <= scope.row.businessType &&  scope.row.businessType <= 199">供应商</div>
              <div v-else-if=" 200 <= scope.row.businessType &&  scope.row.businessType <= 299">客户</div>
              <div v-else-if=" 300 <= scope.row.businessType &&  scope.row.businessType <= 399">用户</div>
              <div v-else-if=" 400 <= scope.row.businessType &&  scope.row.businessType <= 499">商品</div>
              <div v-else-if=" 500 <= scope.row.businessType &&  scope.row.businessType <= 599">订单</div>
              <div v-else-if=" 600 <= scope.row.businessType &&  scope.row.businessType <= 699">售后</div>
            </template>
          </el-table-column>
          <el-table-column label="充值金额"  align="center" prop="rechargeAmount"></el-table-column>
          <el-table-column label="支付方式"  align="center" prop="payType">
              <template slot-scope="scope">
                <div v-if="scope.row.payType == 'wxpay_native'">微信扫码支付</div>
                <div v-else-if="scope.row.payType == 'alipay_qr'">支付宝扫码支付</div>
                <div v-else-if="scope.row.payType == 'e-bank'">网银支付</div>
                <div v-else-if="scope.row.payType == 'bank_transfer'">公司转账、银行间转账</div>
            </template>
          </el-table-column>
          <el-table-column label="付款开户行"  align="center" prop="bankType"></el-table-column>
          <el-table-column  label="支付账号"  align="center"  prop="bankAccount"></el-table-column>
          <el-table-column label="状态" align="center" prop="status">
              <template slot-scope="scope">
                <div v-if="scope.row.status == '0'">正常</div>
                <div v-else-if="scope.row.status == '1'">已删除</div>
            </template>
          </el-table-column>
          <el-table-column label="支付时间"  align="center" prop="payTime"></el-table-column>
          <el-table-column label="支付单号"  align="center" prop="paymentOrderNo"></el-table-column>
          <el-table-column label="支付票据" align="center" prop="paymentBill"></el-table-column>
          <el-table-column label="收款公司"  align="center" prop="payeeBankName"></el-table-column>
          <el-table-column label="开户行"  align="center" prop="payeeBankType"></el-table-column>
          <el-table-column label="收款账号"  align="center" prop="payeeBankAccount"></el-table-column>
          <el-table-column label="收款金额"  align="center" prop=""></el-table-column>
          <el-table-column label="本次发放额度金额"  align="center" prop=""></el-table-column>
          <el-table-column label="操作" align="center" fixed="right" width="250" prop="id">
              <template slot-scope="scope">
                <div class="line-div">
                  <div class="small-Idiv" @click="openDetails(scope.row.id)">
                    <div class="i-div">
                      <img src="../../../common/images/icon/查看详情.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">详情</span>
                  </div>
                  <div class="small-Idiv" @click="checkTopup(scope.row.id)">
                    <div class="i-div">
                      <img src="../../../common/images/icon/确认退款.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">核对充值</span>
                  </div>
                  <div class="small-Idiv" @click="linesApply(scope.row.id)">
                    <div class="i-div">
                      <img src="../../../common/images/icon/指派采购员.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">额度申请</span>
                  </div>
                  <div class="small-Idiv" @click="topUpLoad(scope.row.id)">
                    <div class="i-div">
                      <img src="../../../common/images/icon/上传.png" alt class="operation_img" />
                    </div>
                    <span style="word-break: keep-all;margin-left: 3px;">上传票据</span>
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
      :before-close="handleClose">
      <div class="bill">
        <p class="top-up-bill">充值到账核对</p>
        <el-table :data="noticeList" stripe  border>
          <el-table-column  type="index" align="center" width="50"></el-table-column>
          <el-table-column label="服务商"  align="center" prop=""></el-table-column>
          <el-table-column label="充值人"  align="center" prop="">
            <template slot-scope="scope">
              <div v-if="scope.row.messageCategory == '0'">系统消息</div>
              <div v-else-if="scope.row.messageCategory == '1'">供应商</div>
              <div v-if="scope.row.messageCategory == '2'">客户</div>
              <div v-else-if="scope.row.messageCategory == '3'">其他</div>
            </template>
          </el-table-column>
          <el-table-column label="联系电话"  align="center" prop="">
            <template slot-scope="scope">
              <div v-if=" 0 <= scope.row.businessType  &&  scope.row.businessType  <= 99">系统消息</div>
              <div v-else-if=" 100 <= scope.row.businessType &&  scope.row.businessType <= 199">供应商</div>
              <div v-else-if=" 200 <= scope.row.businessType &&  scope.row.businessType <= 299">客户</div>
              <div v-else-if=" 300 <= scope.row.businessType &&  scope.row.businessType <= 399">用户</div>
              <div v-else-if=" 400 <= scope.row.businessType &&  scope.row.businessType <= 499">商品</div>
              <div v-else-if=" 500 <= scope.row.businessType &&  scope.row.businessType <= 599">订单</div>
              <div v-else-if=" 600 <= scope.row.businessType &&  scope.row.businessType <= 699">售后</div>
            </template>
          </el-table-column>
          <el-table-column label="充值金额"  align="center" prop="rechargeAmount"></el-table-column>
          <el-table-column label="支付方式"  align="center" prop="payType">
              <template slot-scope="scope">
                <div v-if="scope.row.payType == 'wxpay_native'">微信扫码支付</div>
                <div v-else-if="scope.row.payType == 'alipay_qr'">支付宝扫码支付</div>
                <div v-else-if="scope.row.payType == 'e-bank'">网银支付</div>
                <div v-else-if="scope.row.payType == 'bank_transfer'">公司转账、银行间转账</div>
            </template>
          </el-table-column>
          <el-table-column label="付款开户行"  align="center" prop="bankType"></el-table-column>
          <el-table-column  label="支付账号"  align="center"  prop="bankAccount"></el-table-column>
          <el-table-column label="状态" align="center" prop="status">
              <template slot-scope="scope">
                <div v-if="scope.row.status == '0'">正常</div>
                <div v-else-if="scope.row.status == '1'">已删除</div>
            </template>
          </el-table-column>
          <el-table-column label="支付时间"  align="center" prop="payTime"></el-table-column>
          <el-table-column label="支付单号"  align="center" prop="paymentOrderNo"></el-table-column>
          <el-table-column label="支付票据" align="center" prop="paymentBill"></el-table-column>
          <el-table-column label="收款公司"  align="center" prop="payeeBankName"></el-table-column>
          <el-table-column label="开户行"  align="center" prop="payeeBankType"></el-table-column>
          <el-table-column label="收款账号"  align="center" prop="payeeBankAccount"></el-table-column>
          <el-table-column label="收款金额"  align="center" prop=""></el-table-column>
          <el-table-column label="本次发放额度金额"  align="center" prop=""></el-table-column>
        </el-table>
        <div>
          <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="核对结果">
            <el-radio-group v-model="form.resource">
              <el-radio label="通过"></el-radio>
              <el-radio label="不通过"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="核对金额">
            <el-input type="textarea" v-model="form.amount"></el-input>
          </el-form-item>
          <el-form-item label="核对说明">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>


    <!-- 额度发放申请表 -->
    <el-dialog
      title="额度发放申请表"
      :visible.sync="linesVisible"
      width="80%"
      :before-close="linesHandleClose">
      <div class="bill">
        <p class="top-up-bill">额度发放申请表</p>
        <el-table :data="noticeList" stripe  border>
          <el-table-column  type="index" align="center" width="50"></el-table-column>
          <el-table-column label="服务商"  align="center" prop=""></el-table-column>
          <el-table-column label="充值人"  align="center" prop="">
            <template slot-scope="scope">
              <div v-if="scope.row.messageCategory == '0'">系统消息</div>
              <div v-else-if="scope.row.messageCategory == '1'">供应商</div>
              <div v-if="scope.row.messageCategory == '2'">客户</div>
              <div v-else-if="scope.row.messageCategory == '3'">其他</div>
            </template>
          </el-table-column>
          <el-table-column label="联系电话"  align="center" prop="">
            <template slot-scope="scope">
              <div v-if=" 0 <= scope.row.businessType  &&  scope.row.businessType  <= 99">系统消息</div>
              <div v-else-if=" 100 <= scope.row.businessType &&  scope.row.businessType <= 199">供应商</div>
              <div v-else-if=" 200 <= scope.row.businessType &&  scope.row.businessType <= 299">客户</div>
              <div v-else-if=" 300 <= scope.row.businessType &&  scope.row.businessType <= 399">用户</div>
              <div v-else-if=" 400 <= scope.row.businessType &&  scope.row.businessType <= 499">商品</div>
              <div v-else-if=" 500 <= scope.row.businessType &&  scope.row.businessType <= 599">订单</div>
              <div v-else-if=" 600 <= scope.row.businessType &&  scope.row.businessType <= 699">售后</div>
            </template>
          </el-table-column>
          <el-table-column label="充值金额"  align="center" prop="rechargeAmount"></el-table-column>
          <el-table-column label="支付方式"  align="center" prop="payType">
              <template slot-scope="scope">
                <div v-if="scope.row.payType == 'wxpay_native'">微信扫码支付</div>
                <div v-else-if="scope.row.payType == 'alipay_qr'">支付宝扫码支付</div>
                <div v-else-if="scope.row.payType == 'e-bank'">网银支付</div>
                <div v-else-if="scope.row.payType == 'bank_transfer'">公司转账、银行间转账</div>
            </template>
          </el-table-column>
          <el-table-column label="付款开户行"  align="center" prop="bankType"></el-table-column>
          <el-table-column  label="支付账号"  align="center"  prop="bankAccount"></el-table-column>
          <el-table-column label="状态" align="center" prop="status">
              <template slot-scope="scope">
                <div v-if="scope.row.status == '0'">正常</div>
                <div v-else-if="scope.row.status == '1'">已删除</div>
            </template>
          </el-table-column>
          <el-table-column label="支付时间"  align="center" prop="payTime"></el-table-column>
          <el-table-column label="支付单号"  align="center" prop="paymentOrderNo"></el-table-column>
          <el-table-column label="支付票据" align="center" prop="paymentBill"></el-table-column>
          <el-table-column label="收款公司"  align="center" prop="payeeBankName"></el-table-column>
          <el-table-column label="开户行"  align="center" prop="payeeBankType"></el-table-column>
          <el-table-column label="收款账号"  align="center" prop="payeeBankAccount"></el-table-column>
          <el-table-column label="收款金额"  align="center" prop=""></el-table-column>
          <el-table-column label="本次发放额度金额"  align="center" prop=""></el-table-column>
        </el-table>
        <p class="top-up-bill">申请信息</p>
        <div class="apply-top-up">
          <ul>
            <li><span class="top-up-left">本次充值金额</span><span class="top-up-right">20000(元)</span></li>
            <li><span class="top-up-left">授权额度</span><span class="top-up-right">20000(元)</span></li>
            <li><span class="top-up-left">余额</span><span class="top-up-right">20000(元)</span></li>
            <li><span class="top-up-left">合计充值金额</span><span class="top-up-right">20000(元)</span></li>
            <li><span class="top-up-left">已使用金额</span><span class="top-up-right">20000(元)</span></li>
            <li><span class="top-up-left">本次申请发放金额</span><span class="top-up-right">20000(元)</span></li>
          </ul>
          <div>
            <label>申请说明</label>
            <el-input type="textarea" v-model="descTitle"></el-input>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="linesVisible = false">取 消</el-button>
        <el-button type="primary" @click="linesVisible = false">提交</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script>
import {  getMyPrepaidList } from '@/api/creditmanage/index'
export default {
  name: 'Notice',
  data () {
    return {
      payType: '', // 支付方式
      payStatus: '', // 支付状态
      paymentOrderNo :'',  // 充值订单号
      createTime: '',
      noticeList: [],
      pagination: {
        current_page: 1,
        page_size: 10,
        total_count: 0
      },
      selectNotice: [],
      dialogVisible: false,
      linesVisible: false,
      form: {
        resource: '',
        amount: '',
        desc: '',
      },
      descTitle: '',
    }
  },
  created () {
    this.getMyPrepaidList()
  },
  methods: {
    getMyPrepaidList() {
      let data = {}
      data.pageNum = this.pagination.current_page
      data.pageSize = this.pagination.page_size
      data.payType = this.payType
      data.payStatus = this.payStatus
     // data.paymentOrderNo = this.paymentOrderNo
      data.startTime = this.createTime[0]
      data.endTime = this.createTime[1]
      getMyPrepaidList(data).then(res => {
        console.log(res)
        var that =this
        that.noticeList = res.data.list
        this.pagination.total_count = res.data.total
      })
    },
    //筛选已读或未读
    filterTag(value, row) {
      console.log(value,row)  
      return row.tag === value;
    },
    // 跳转详情页面
    openDetails(id) {   
        this.$router.push({ name: "messageDetails" , query: {id: id}});
    },
    //核对充值
    checkTopup(id){
       this.dialogVisible = true;
    },
    //关闭核对充值
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //额度申请
    linesApply(id){
       this.linesVisible = true;
    },
    //额度申请关闭
    linesHandleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //上传票据
    topUpLoad(id){
       this.$router.push({ name: "topUpLoad" , query: {id: id}});
    },
    handlecreateTime() {

    },
    // 搜索
    handelSearchGoods(){
      this.pagination.current_page = 1  
      this.getMyPrepaidList()
    },
    handleSizeChange (val) {
      this.pagination.page_size = val
      this.getMyPrepaidList()
    },
    handleCurrentChange (val) {
      this.pagination.current_page = val
      this.getMyPrepaidList()
    },
    reset(){

    }
   
  },
  filters:{
     filterA(val) {
    //    let str = val
    //    str = str.replace(/<[^<>]+>/g,'')
    //    return str 
     }
  },
  watch: {
  }
}
</script>
<style scoped>
.goods-fitter .search-wrapper{
    padding: 20px;
    border: 1px solid #d7e0f1;
    background: #fff;
}
.goods-fitter .search-wrapper .title {
    margin-left: -20px;
    font-size: 16px;
    font-weight: 400;
    color: 3333;
    padding-left: 10px;
    line-height: 1.4;
    border-left: 4px solid #4C86F4;
    margin-bottom: 10px;
}
.block{
  float: left;
}
.teshuStyle{
  margin-left: 25px;
}
.block >>> .el-input{
  width: 200px;
}
.demonstration{
  margin-right: 15px;
  color: #606266;
}
.margin >>> .cell{
  text-align: center;
}
.top-up-bill{
  border-left: 4px solid #4a99fa;
  padding-left: 5px;
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
.apply-top-up > ul{
  width: 1038px;
  float: left;
}
.apply-top-up > div{
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
.apply-top-up >>> .el-textarea{
  float: left;
  width: 310px;
  height: 100px;
}
.apply-top-up >>> .el-textarea__inner{
  width: 350px;
  height: 100px;
  border: none;
}
 .margin >>>.el-dialog__header{
     text-align:center;
    }
</style>
<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.line-div{
  display: flex;
  -ms-flex-pack: distribute;
  justify-content: space-around;
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
</style>
