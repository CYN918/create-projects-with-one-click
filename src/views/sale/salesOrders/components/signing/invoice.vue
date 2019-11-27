 <template>
 <div>
  <el-dialog width="60%" :visible.sync="contractVisible"
 :before-close="closing">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">申请开发票</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="120px">
            <div class="search-wrapper">
              <div class="mbottom">
                <h4 class="title1">发票信息</h4>
              </div>
              <div class="search-base">
                <el-row>
                  <el-col :span="7">
                    <el-col>
                      <el-form-item label="客户名称：">
                        <el-col :span="23">
                          <span>深圳市迈戈实业有限公司</span>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="7">
                    <el-form-item label="关联业务单号：">
                      <el-col :span="23">
                        <span>VT201908260002</span>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="单位名称：" prop="companyName">
                        <el-col :span="23">
                          <el-input v-model="form.companyName">
                           
                          </el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="发票类型：">
                      <el-col :span="23">
                        <el-select v-model="form.invoiceType">
                          <el-option value="1" label="增值税发票"></el-option>
                           <el-option value="2" label="普通发票"></el-option>
                        </el-select>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="纳税人识别号：" prop="idNumber">
                        <el-col :span="23">
                          <el-input v-model="form.idNumber"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="发票金额：">
                      <el-col :span="23">
                        <el-input v-model="form.invoiceAmount"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="注册地址：" prop="reAddress">
                        <el-col :span="23">
                          <el-input v-model="form.reAddress"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="联系人：">
                      <el-col :span="23">
                        <el-input v-model="form.contacts"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="注册电话：">
                        <el-col :span="23">
                          <el-input v-model="form.rePhone"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="发票内容：">
                      <el-col :span="23">
                        <el-input v-model="form.invoiceContent"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="开户银行：" prop="openingBank">
                        <el-col :span="23">
                          <el-input v-model="form.openingBank"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="银行账号：" prop="bankAccount">
                      <el-col :span="23">
                        <el-input v-model="form.bankAmount"></el-input>
                      </el-col>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="12">
                    <el-col>
                      <el-form-item label="预计开票日期：">
                        <el-col :span="23">
                          <el-input v-model="form.eiDate"></el-input>
                        </el-col>
                      </el-form-item>
                    </el-col>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="备注：">
                      <el-col :span="23">
                        <el-input v-model="form.remark"></el-input>
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
        <el-form ref="infoForm" :model="form" :rules="rules" label-width="120px">
          <div class="search-wrapper">
            <div class="mbottom">
              <h4 class="title1">开票要求</h4>
            </div>
                <div class="search-base">
                  <el-form-item label="开票要求：" >
                      <el-input
                        type="textarea"
                        :autosize="{ minRows: 5, maxRows: 5}"
                        placeholder="请输入内容"
                        v-model="form.invoiceRequire">
                      </el-input>
                  </el-form-item>
                </div>
          </div>
        </el-form>

        <div class="mail-fitter" style="margin-top:20px">
          <el-form ref="infoForm" :model="form" :rules="rules" label-width="100px">
            <div class="mail-wrapper">
              <h4 class="title1">商品清单</h4>
              <div class="search-base">
                <div class="mbottom">
                  <div class="goods-fitter">
                    <div class="mcard" style="padding-bottom:0">
                      <el-table :data="tableData" border style="width: 100%" stripe>
                        <el-table-column prop="customerSn" label="序号" align="center" width="50"></el-table-column>
                        <el-table-column prop="customerName" label="名称" align="center"></el-table-column>
                        <el-table-column prop="customerType" label="型号" align="center"></el-table-column>
                        <el-table-column prop="commonContactName" label="订货数量" align="center"></el-table-column>
                        <el-table-column prop="commonContactDept" label="结算价" align="center"></el-table-column>
                        <el-table-column prop="commonContactDept" label="合计" align="center"></el-table-column>
                        <el-table-column prop="commonContactDept" label="已开票数量" align="center"></el-table-column>
                        <el-table-column prop="commonContactDept" label="已开票金额" align="center"></el-table-column>
                        <el-table-column label="本次开票数量" align="center"  width="100">
                          
                        </el-table-column>
                        <el-table-column label="本次开票金额" align="center"  width="100">
                          
                        </el-table-column>
                      </el-table>
                      <div class="pagination">
                        <el-pagination
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :current-page="tableData.currentPage"
                          :page-sizes="tableData.sizes"
                          :page-size="tableData.size"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="tableData.total"
                        ></el-pagination>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="invoiceclose" size="small">关 闭</el-button>
        <el-button type="primary" @click="invoiceSave" size="small">保存</el-button>
      </span>
    </el-dialog>
 </div>
</template>

<script>
export default {
    data(){
      return{
        contractVisible:false,
        form:{
          customerName:'',//客户名称
          bdNumber:'',//业务单号
          companyName:'',//单位名称
          invoiceType:'',//发票类型
          idNumber:'',//纳税人识别号
          invoiceAmount:'',//发票金额
          reAddress:'',//注册地址
          contacts:'',//联系人
          rePhone:'',//注册电话
          invoiceContent:'',//发票内容
          openingBank:'',//开户行
          bankAccount:'',//银行账户
          eiDate:'',//预计开票时期
          remark:'',//备注
          invoiceRequire:'',//开票要求
        },
        tableData:[],
        rules:{
        companyName: [
            {required: true, message: '此项为必选项', trigger: 'blur'}
          ],
         idNumber: [
            {required: true, message: '此项为必选项', trigger: 'blur'}
          ],
         reAddress: [
            {required: true, message: '此项为必选项', trigger: 'blur'}
          ],
         openingBank: [
            {required: true, message: '此项为必选项', trigger: 'blur'}
          ],
         bankAccount: [
            {required: true, message: '此项为必选项', trigger: 'blur'}
          ],
        }
      }
    },
    props:['con'],
    watch:{
        con(val){
     
            this.contractVisible = val
          }

    },
    methods:{
      invoiceclose(){
        this.contractVisible =false
        this.$emit('close',this.contractVisible)
      },
      closing(){
        this.contractVisible =false
        this.$emit('beClose',this.contractVisible)
      },
      invoiceSave(){
       
        
      },
        handleSizeChange(){

      },
      handleCurrentChange(){

      },
      handleSelectionChange(){
        
      },
      handleChange(){

      }
    }
}
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
      font-size: 14px;
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
//
.line-div {
  display: flex;
  justify-content: space-around;
  margin-left: 8px;
}
.line {
  display: flex;
  justify-content: flex-start;
}
.small_top {
  margin-top: 10px;
}

.i-div {
  cursor: pointer;
}
.margin1 {
  padding-left: 40px;
  padding-top: 20px;
  box-sizing: border-box;
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
</style>
