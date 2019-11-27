<template>
  <div>
    <!-- 申请退款单 -->
    <el-dialog
      title="申请退款单"
      :visible.sync="dialogVisible"
      width="800px"
      :before-close="handleClose"
    >
      <div>
        <div class="mcard sales_div">
          <div>
            <div class="goods-fitter">
              <div class="search-wrapper1">
                <h4 class="title">原路退款</h4>
              </div>
            </div>
          </div>
        </div>
        <el-form
          label-width="120px"
          class="demo-ruleForm"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
        >
          <el-row>
            <el-col :span="12">
              <el-form-item prop="" label="退款单号：">{{ruleForm.refundSn}}</el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="" label="支付方式：">{{ruleForm.payName}}</el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="refundType" label="退款方式：">
                  <el-select placeholder="请选择" size="medium" v-model="ruleForm.refundType" style="width:100%">
                    <el-option
                      v-for="item in refundwayArr"
                      :key="item.value"
                      :label="item.name"
                      :value="item.value"
                      :disabled="item.disabled"
                    ></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item prop="refundAmount" label="退款金额：">
                  <el-input v-model="ruleForm.refundAmount" placeholder="请输入内容" size="medium" type="number"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-row>
          <div class="mcard sales_div">
            <div>
              <div class="goods-fitter">
                <div class="search-wrapper1">
                  <h4 class="title">财务支付</h4>
                </div>
              </div>
            </div>
          </div>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="compensateType" label="退款方式：">
                <el-select placeholder="请选择" size="medium" v-model="ruleForm.compensateType" @change="arefund" clearable  style="width:100%">
                  <el-option
                    v-for="item in refundway"
                    :key="item.value"
                    :label="item.name"
                    :value="item.value"
                    :disabled="item.disabled"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="openingBank" label="退款开户行：" v-if="ruleForm.compensateType == 2 || ruleForm.compensateType == ''">
                <el-input v-model="ruleForm.openingBank" placeholder="请输入内容" size="medium"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="refundAccount" label="账号：">
                <el-input v-model="ruleForm.refundAccount" placeholder="请输入内容" size="medium"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="compensateAmount" label="退款金额：">
                <el-input v-model="ruleForm.compensateAmount" placeholder="请输入内容" size="medium" type="number"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="handleClose" size="small">取 消</el-button>
        <el-button type="primary" @click="submit" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { applyreturn } from "@/api/order";
import { throttleTipPop } from "@/utils/throttle";
export default {
  props: {
    refundshow: {
      type: Boolean
    },
    refunddata: {
      type: Object
    }
  },
  data() {
    return {
      dialogVisible: false,
      ruleForm: {
        refundAccount:'', //账号
        openingBank:'', //开户行
        refundAmount:'', //退款金额
        refundType:'', //原路退款方式
        compensateType:'', //财务支付退款方式
        compensateAmount:'', //转账退款金额
      },
      rules: {
        payName: [
          { required: true, message: "请选择支付方式", trigger: "blur" }
        ],
        refundType: [
          { required: true, message: "请选择退款方式", trigger: "change" }
        ],
        compensateType: [
          { required: false, message: "请选择退款方式", trigger: "change" }
        ],
        openingBank: [
          { required: false, message: "请输入退款开户行", trigger: "blur" }
        ],
        refundAccount: [
          { required: false, message: "请输入账号", trigger: "blur" }
        ],
        refundAmount:[
          { required: true, message: "请输入金额", trigger: "blur" }
        ],
        compensateAmount:[
          { required: false, message: "请输入金额", trigger: "blur" }
        ]
      },
      payArr: [
        { name: "积分兑换" },
        { name: "专属费用" },
        { name: "微信支付" },
        { name: "银行卡支付" }
      ],
      refundwayArr: [
        { name: "系统原路退款", value: 0 },
        // { name: "微信支付", value: 1 },
        // { name: "银行转账", value: 2 }
      ],
      refundway:[
        { name: "微信支付", value: 1 },
        { name: "银行转账", value: 2 }
      ]
    };
  },
  methods: {
    submit() {
      this.$refs.ruleForm.validate(async valid => {
        if (valid) {
          let obj = Object.assign(this.refunddata,this.ruleForm)
          if(obj.refundType == 0 && (obj.refundAmount <= obj.totalAmount ) && obj.refundAmount >0){
            console.log(obj)
            const data = await applyreturn(obj);
            if (data.code == 200) {
              this.$message({
                message: data.message,
                type: "success"
              });
              this.$emit("closerefund", false);
              this.$parent.aftersalepageb();
            }
          }else if(obj.refundAmount == 0){
            throttleTipPop(this,'error','退款金额不能为0')
          } else{
            throttleTipPop(this,'error','退款金额不能大于订单总金额')
          }
        } else {
          return false;
        }
      });
    },
    handleClose() {
      this.$refs.ruleForm.resetFields()
      this.$emit("closerefund", false);
    },
    arefund(val){
      switch(val){
        case '' :
          this.rules.openingBank[0].required = false
          this.rules.refundAccount[0].required = false
          this.rules.compensateAmount[0].required = false
          break;
        case 1 :
          this.rules.refundAccount[0].required = true
          this.rules.compensateAmount[0].required = true
          break;
        case 2 :
          this.rules.openingBank[0].required = true
          this.rules.refundAccount[0].required = true
          this.rules.compensateAmount[0].required = true
          break;
      }
    }
  },
  watch: {
    refundshow(val) {
      this.dialogVisible = val;
    },
    refunddata(val){
      this.ruleForm = Object.assign(this.ruleForm,val)
      console.log(this.ruleForm)
    }
  }
};
</script>
<style  lang="scss" scoped>
.ball {
  width: 19px;
  height: 19px;
  background: rgba(64, 158, 255, 1);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  line-height: 24px;
  z-index: 10;
}
.big_div {
  display: flex;
}
.cai_span {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);
}
.shen_state {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(64, 158, 255, 1);
}
.div_time {
  font-size: 12px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(201, 201, 201, 1);
  margin-top: 5px;
}
.bor_left {
  border-left: 4px solid #409eff;
  padding-left: 34px;
  min-height: 115px;
  border-radius: 2px;
  position: relative;
  left: -12px;
}
.left_none {
  border-left: 4px solid #f7faff;
}
div[state="4"] {
  border-left: none;
}
.div_big {
  padding-left: 59px;
}
.shenwei_state {
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #fe1b1b;
}
.timeline_div {
  padding-left: 59px;
}
.sales_div{
  padding: 0px; 
  background:none;
}
</style>