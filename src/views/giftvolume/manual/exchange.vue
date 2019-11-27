<template>
  <div class="margin dealerlist">
    <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper">
            <el-page-header @back="back" content="礼品册管理 > 兑换管理"></el-page-header>
          </div>
        </div>
    </div>
    <div class="mbottom">
      <div class="goods-fitter">
        <el-form label-width="140px" size="small" :model="form">
          <div class="search-wrapper">
            <h4 class="title">搜索条件</h4>
            <div class="search-base">
              <el-row>
                <el-col :span="5">
                  <el-form-item label="册号：">
                    <el-input v-model="form.topicName" placeholder="请输入册号"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="卡册名称：">
                    <el-input v-model="form.cardCopies" placeholder="请输入卡册名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="6">
                  <el-form-item label="客户/经销商名称：">
                    <el-input v-model="form.customerName" placeholder="请输入客户/经销商名称"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="5">
                  <el-form-item label="状态：">
                  <el-select v-model="form.state" placeholder="请选择">
                    <el-option
                      v-for="item in form.options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="1" class="btn_right">
                  <el-button type="primary" size="small" @click='reqBookList(true)'>查询</el-button>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-form>
      </div>
    </div>
    <div class="mbottom" style="background: #ffff;">
      <div class="goods-fitter">
        <div class="search-wrapper">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column  type="index" align="center" label="序号" width="75"></el-table-column>
          <el-table-column prop="customer" align="center" label="客户名称"></el-table-column>
          <el-table-column prop="dealers" align="center" label="经销商"></el-table-column>
          <el-table-column prop="copies" align="center" label="册号"></el-table-column>
          <el-table-column prop="secret" align="center" label="册密"></el-table-column>
          <el-table-column prop="card" align="center" label="卡册名称"></el-table-column>
          <el-table-column prop="gear" align="center" label="卡册档位"></el-table-column>
          <el-table-column prop="amount" align="center" label="结算金额"></el-table-column>
          <el-table-column align="center" label="订单明细">
            <template slot-scope="scope">
              <el-button type="primary" size="small" @click="handeleDelete(scope.row.id)">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="commodity" align="center" label="商品名称"></el-table-column>
          <el-table-column prop="man" align="center" label="兑换人"></el-table-column>
          <el-table-column prop="phone" align="center" label="手机号"></el-table-column>
          <el-table-column prop="address" align="center" label="地址"></el-table-column>
          <el-table-column prop="state" align="center" label="状态"></el-table-column>
        </el-table>
        <div class="pagination" style="margin-top: 15px;text-align: right;">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="form.currentPage"
              :page-sizes="form.sizes"
              :page-size="form.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="form.total">
              </el-pagination>
        </div>
        </div>
      </div>
    </div>

    <!--查看订单-->
    <el-dialog
      title="对公转账"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <div class="margin dealerlist">
        <div class="mbottom">
            <div class="goods-fitter">
              <el-form label-width="100px" size="small" >
                <div class="search-wrapper">
                  <h4 class="title">收款方信息</h4>
                  <div class="search-base">
                    <el-form-item label="公司名称：">
                        <span>深圳市迈戈实业有限公司</span>
                      </el-form-item>
                      <el-form-item label="开户行:">
                        <span>平安银行岗厦支行</span>
                      </el-form-item>
                      <el-form-item label="收款账户:">
                        <span>11006119953901</span>
                      </el-form-item>
                      <el-form-item label="收款行号：">
                          <span>307584008361</span>
                      </el-form-item>
                  </div>
                </div>   
              </el-form>
            </div>
        </div>
        <div class="mbottom" style="background: #ffff;">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small" :model="roleFrom">
                <div class="search-wrapper">
                  <h4 class="title">付款方信息</h4>
                  <div class="search-base">
                    <el-form-item label="付款日期：">
                        <span>2019-8-19 17:38</span>
                      </el-form-item>
                      <el-form-item label="公司名称:">
                        <el-input v-model="roleFrom.companyName" placeholder="请输入公司名称"></el-input>
                      </el-form-item>
                      <el-form-item label="开户行:">
                        <el-input v-model="roleFrom.account" placeholder="请输入开户行"></el-input>
                      </el-form-item>
                      <el-form-item label="付款账户：">
                          <el-input v-model="roleFrom.payment" placeholder="请输入付款账户"></el-input>
                      </el-form-item>
                      <el-form-item label="付款金额：">
                          <el-input v-model="roleFrom.paymentAmount" placeholder="请输入付款金额"></el-input>
                      </el-form-item>
                      <el-form-item label="上传付款单复印件：">
                          <el-upload
                            action="https://jsonplaceholder.typicode.com/posts/"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview"
                            :on-remove="handleRemove">
                            <i class="el-icon-plus"></i>
                          </el-upload>
                          <el-dialog :visible.sync="dialogVisibleUpload">
                            <img width="100%" :src="dialogImageUrl" alt="">
                          </el-dialog>
                      </el-form-item>
                  </div>
                </div>                
              </el-form>
          </div>
        </div>
          
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="sureAdd">确 定</el-button>
      </span>
    </el-dialog>
      
  </div>
</template>

<script>
import { 
  detailSms,
} from "@/api/customer/index";
export default {
  data() {
    return {
      form: {
        currentPage:1,
        sizes:[10, 20, 50, 100],
        size:10,
        total:0,
        topicName: '',
        cardCopies: '',
        customerName: '',
        options: [{
          value: '0',
          label: '全部'
        },{
          value: '1',
          label: '已兑换'
        }, {
          value: '2',
          label: '未兑换'
        }, {
          value: '3',
          label: '已成功兑换'
        }, {
          value: '4',
          label: '兑换失败'
        }],
        state: '',
      },
      roleFrom: {
        companyName: '',
        account: '',
        payment: '',
        paymentAmount: '',
      },
      dialogVisible: false,
      dialogImageUrl: '',
      dialogVisibleUpload: false,
      tableData: [{
          id: '1',
          customer: '深圳科技有限公司',
          dealers: '深圳科技有限公司',
          copies: '1026655133',
          secret: '1026655133',
          card: '双十一礼品卡',
          gear: '168',
          amount: '16008',
          commodity: '',
          man: '王庆',
          phone: '1524853658',
          address: '上海市普陀区金沙江路 1518 弄',
          state: '已兑换'
        }, {
          id: '2',
          customer: '深圳科技有限公司',
          dealers: '深圳科技有限公司',
          copies: '1026655133',
          secret: '1026655133',
          card: '双十一礼品卡',
          gear: '168',
          amount: '16008',
          commodity: '',
          man: '王庆',
          phone: '1524853658',
          address: '上海市普陀区金沙江路 1518 弄',
          state: '已兑换'
        }, {
          id: '3',
          customer: '深圳科技有限公司',
          dealers: '深圳科技有限公司',
          copies: '1026655133',
          secret: '1026655133',
          card: '双十一礼品卡',
          gear: '168',
          amount: '16008',
          commodity: '',
          man: '王庆',
          phone: '1524853658',
          address: '上海市普陀区金沙江路 1518 弄',
          state: '已兑换'
        }, {
          id: '4',
          customer: '深圳科技有限公司',
          dealers: '深圳科技有限公司',
          copies: '1026655133',
          secret: '1026655133',
          card: '双十一礼品卡',
          gear: '168',
          amount: '16008',
          commodity: '',
          man: '王庆',
          phone: '1524853658',
          address: '上海市普陀区金沙江路 1518 弄',
          state: '已兑换'
        }, {
          id: '5',
          customer: '深圳科技有限公司',
          dealers: '深圳科技有限公司',
          copies: '1026655133',
          secret: '1026655133',
          card: '双十一礼品卡',
          gear: '168',
          amount: '16008',
          commodity: '',
          man: '王庆',
          phone: '1524853658',
          address: '上海市普陀区金沙江路 1518 弄',
          state: '已兑换'
        },{
          id: '6',
          customer: '深圳科技有限公司',
          dealers: '深圳科技有限公司',
          copies: '1026655133',
          secret: '1026655133',
          card: '双十一礼品卡',
          gear: '168',
          amount: '16008',
          commodity: '',
          man: '王庆',
          phone: '1524853658',
          address: '上海市普陀区金沙江路 1518 弄',
          state: '已兑换'
        },{
          id: '7',
          customer: '深圳科技有限公司',
          dealers: '深圳科技有限公司',
          copies: '1026655133',
          secret: '1026655133',
          card: '双十一礼品卡',
          gear: '168',
          amount: '16008',
          commodity: '',
          man: '王庆',
          phone: '1524853658',
          address: '上海市普陀区金沙江路 1518 弄',
          state: '已兑换'
        },{
          id: '8',
          customer: '深圳科技有限公司',
          dealers: '深圳科技有限公司',
          copies: '1026655133',
          secret: '1026655133',
          card: '双十一礼品卡',
          gear: '168',
          amount: '16008',
          commodity: '',
          man: '王庆',
          phone: '1524853658',
          address: '上海市普陀区金沙江路 1518 弄',
          state: '已兑换'
        }]
      
    };
  },
  created() {
    
  },
  computed: {},
  methods: {
    back() {
      this.$router.go(-1);
    },
    //查询
    reqBookList(){

    },
    //分页
    handleSizeChange(val){
      console.log(val)
      this.form.size = val;
    },
    //分页
    handleCurrentChange(val){
      console.log(val)
      this.form.currentPage = val;
          
    },
    //弹窗开启
    handeleDelete(id){
      console.log(id)
      this.dialogVisible = true;
    },
    //弹窗关闭
    sureAdd(){
      this.dialogVisible = false;
    },
    //弹窗点击关闭
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //文件上传
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //文件上传
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisibleUpload = true;
    }
    
  },
  components: {

  }
};
</script>

<style scoped>
.search-base >>> .el-col-10{
  width: 60%;
}
.search-wrapper1 >>> .el-page-header{
    float: left;
}
.search-wrapper1 >>> .el-breadcrumb{
    padding-top: 4px;
}
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
.lines-details > ul > li{
    display: inline-block;
    margin-left: 15%;
    margin-top: 15px;
}
.lines-details > ul > li > label > i{
    font-style: normal;
    color: red;
    position: relative;
    top: 5px;
}
.search-wrapper {
    padding: 20px;
    border: 1px solid #d7e0f1;
    background: #fff;
}
</style>