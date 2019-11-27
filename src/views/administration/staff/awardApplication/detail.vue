<template>
  <div class="gathering">
    <el-dialog width="50%" :visible.sync="detailVisible" :before-close="createClosing">
      <div class="mbottom">
        <div class="goods-fitter">
          <el-form label-width="100px" size="small">
            <div class="search-wrapper">
              <h4 class="title">奖金申请-详情</h4>
            </div>
          </el-form>
        </div>
      </div>
      <div class="mcard0">
        <div class="mcard">
            <div class="messageTitle">
                <div style="float:right;margin-right:33px;">
                    <el-button size="small" type="primary">打印</el-button>
                </div>
            </div>
          <div class="familyMessage">
            <div class="messageContent">
              <div class="number">
                <span>编号</span>
              </div>
              <div class="numberMessage">
                <el-input v-model="form.message"></el-input>
              </div>
              <div class="applyDate">
                <span>申请日期</span>
              </div>
              <div class="applyDateMessage">
                <el-date-picker
                style="width:100%;"
                v-model="form.value1"
                type="date"
                placeholder="选择日期">
                </el-date-picker>
              </div>
            </div>
            <div class="messageContent">
              <div class="apllyPeople">
                <span>申请人</span>
              </div>
              <div class="apllyPeopleMessage">
                <el-input v-model="form.message"></el-input>
              </div>
              <div class="department">
                <span>部门</span>
              </div>
              <div class="departmentMessage">
                <el-input v-model="form.message"></el-input>
              </div>
              <div class="awardPeople">
                <span>奖励人</span>
              </div>
              <div class="awardPeopleMessage">
                <el-input v-model="form.message"></el-input>
              </div>
            </div>
            <div class="messageContent">
              <div class="awardEvent">
                <span>奖励事由</span>
              </div>
              <div class="awardEventMessage">
                <el-input v-model="form.message"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4}"
                resize="none"
                placeholder="请输入内容"></el-input>
              </div>
            </div>
            <div class="messageContent">
              <div class="awardEvent">
                <span style="line-heght:20px;">奖励方式(非金额)</span>
              </div>
              <div class="awardEventMessage">
                <el-input v-model="form.message"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4}"
                resize="none"></el-input>
              </div>
            </div>
            <div class="messageContent">
              <div class="awardType">
                <span>奖励方式(金额)</span>
              </div>
              <div class="awardTypeMessage">
                <el-input v-model="form.message"
                style="width:14%;"></el-input>
                <span>元</span>
              </div>
            </div>
            <div class="messageContent">
              <div class="leader">
                <span>部门领导</span>
              </div>
              <div class="leaderMessage">
                <el-input v-model="form.message"></el-input>
              </div>
              <div class="leader">
                <span>人事部</span>
              </div>
              <div class="leaderMessage">
                <el-input v-model="form.message"></el-input>
              </div>
              <div class="leader">
                <span>总经理</span>
              </div>
              <div class="leaderMessage">
                <el-input v-model="form.message"></el-input>
              </div>
              <div class="leader">
                <span>董事长</span>
              </div>
              <div class="leaderMessage">
                <el-input v-model="form.message"></el-input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="danger" @click="createClose()" size="small">关 闭</el-button>
        <el-button type="primary" @click="createSave()" size="small">提 交</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { savePayment } from "@/api/sale/index";
import { throttleTipPop } from "@/utils/functions.js";
export default {
  data() {
    return {
      dialogImageUrl: "",
      dialogVisible: false,
      imgArr: [],
      detailVisible: false,
      form: {
        payAcountno: "", //资金账户\
        payAcountId: "", //资金账户ID
        payType: "", //收款类型
        payTime: "", //收款时间
        payAmount: "", //收款金额
        payAbstract: "", //摘要
        payVoucher: "",
        saleOrderNo: ""
      },
      radio: "", //互斥单选框
      radio2: "",
      value: "",
      options: [
        { value: 0, label: "预收定金" },
        { value: 1, label: "尾款" },
        { value: 2, label: "贷款" }
      ],
      options2: [
        { value: 1, label: "百事达" },
        { value: 2, label: "华美贵" },
        { value: 3, label: "天翼" },
        { value: 4, label: "华通" }
      ],
      rules: {
        payAcountId: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ],
        payTime: [
          {
            required: true,
            message: "此项为必填项",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  props: ["detailVisibles", "saveNo", "payData"],
  watch: {
    detailVisibles(val) {
      this.detailVisible = val;
    },
    saveNo(val) {
      this.form.saleOrderNo = val;
    }
  },
  methods: {
    createClose() {
      this.$confirm("您确认要关闭吗？")
        .then(_ => {
          this.detailVisible = false;
          this.$emit("createCloseD", this.detailVisible);
        })
        .catch(_ => {});
    },
    createClosing() {
      this.$confirm("您确认要关闭吗？")
        .then(_ => {
          this.detailVisible = false;
          this.$emit("createClosingD", this.detailVisible);
        })
        .catch(_ => {});
    },
    createSave() {},

    //新增收款
    createSave() {
      savePayment(this.form).then(res => {
        if (res.code === 200) {
          throttleTipPop(this, "success", "新增收款成功！", 2000);
          this.detailVisible = false;
          this.$emit("detailAwardApplication1", this.detailVisible);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
/deep/ .el-input .el-input__inner {
  font-size: 14px;
  border: 0 !important;
  
}
/deep/ .el-textarea__inner {
    border: 0 !important;
  
}
/deep/ .el-textarea {
    height: 98% !important; 
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
.familyMessage {
  width: 92%;
  margin: 0 auto;

  .number {
    width: 15%;
    display: inline-block;
    background: rgba(245, 248, 252, 1);
    border: 1px solid rgba(214, 222, 239, 1);

    height: 45px;
    line-height: 45px;
    text-align: center;
  }
  .numberMessage {
    width: 35%;
    display: inline-block;
    border: 1px solid rgba(214, 222, 239, 1);

    border-left: 0;
    height: 45px;
    line-height: 45px;
    text-align: center;
  }
  .applyDate {
    width: 15%;
    display: inline-block;
    background: rgba(245, 248, 252, 1);
    border: 1px solid rgba(214, 222, 239, 1);

    border-left: 0;
    height: 45px;
    line-height: 45px;
    text-align: center;
  }
  .applyDateMessage {
    width: 35%;
    display: inline-block;
    border: 1px solid rgba(214, 222, 239, 1);

    border-left: 0;
    height: 45px;
    line-height: 45px;
    text-align: center;
  }
  .apllyPeople{
    width: 15%;
    display: inline-block;
    background: rgba(245, 248, 252, 1);
    border: 1px solid rgba(214, 222, 239, 1);
    border-top: 0;
    height: 45px;
    line-height: 45px;
    text-align: center;
  }
  .apllyPeopleMessage {
    width: 18.3%;
    display: inline-block;
    border: 1px solid rgba(214, 222, 239, 1);
    border-top: 0;
    border-left: 0;
    height: 45px;
    line-height: 45px;
    text-align: center;
  }
  .department{
    width: 15%;
    display: inline-block;
    background: rgba(245, 248, 252, 1);
    border: 1px solid rgba(214, 222, 239, 1);
    border-top: 0;
    border-left: 0;
    height: 45px;
    line-height: 45px;
    text-align: center;
  }
  .departmentMessage {
    width: 18.3%;
    display: inline-block;
    border: 1px solid rgba(214, 222, 239, 1);
    border-top: 0;
    border-left: 0;
    height: 45px;
    line-height: 45px;
    text-align: center;
  }
  .awardPeople{
    width: 15%;
    display: inline-block;
    background: rgba(245, 248, 252, 1);
    border: 1px solid rgba(214, 222, 239, 1);
    border-top: 0;
    border-left: 0;
    height: 45px;
    line-height: 45px;
    text-align: center;
  }
  .awardPeopleMessage {
    width: 18.4%;
    display: inline-block;
    border: 1px solid rgba(214, 222, 239, 1);
    border-top: 0;
    border-left: 0;
    height: 45px;
    line-height: 45px;
    text-align: center;
  }
  .awardEvent{
    width: 15%;
    display: inline-block;
    background: rgba(245, 248, 252, 1);
    border: 1px solid rgba(214, 222, 239, 1);
    border-top: 0;
    height: 100px;
    float: left;
    padding: 32px 20px;
    text-align: center;
  }
  .awardEventMessage {
    width: 85%;
    display: inline-block;
    border: 1px solid rgba(214, 222, 239, 1);
    border-top: 0;
    border-left: 0;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .awardType{
    width: 15%;
    display: inline-block;
    background: rgba(245, 248, 252, 1);
    border: 1px solid rgba(214, 222, 239, 1);
    border-top: 0;
    height: 45px;
    float: left;
    padding: 5px 20px;
    text-align: center;
  }
  .awardTypeMessage {
    width: 85%;
    display: inline-block;
    border: 1px solid rgba(214, 222, 239, 1);
    border-top: 0;
    border-left: 0;
    height: 45px;
    line-height: 45px;
  }
    .leader{
    width: 12%;
    display: inline-block;
    background: rgba(245, 248, 252, 1);
    border: 1px solid rgba(214, 222, 239, 1);
    border-top: 0;
    border-left: 0;
    height: 45px;
    line-height: 45px;
    text-align: center;
  }
  .leader:nth-of-type(1){
      width: 15%;
  }
  .leader:nth-of-type(1){
      border: 1px solid rgba(214, 222, 239, 1);
      border-top: 0;
  }
  .leaderMessage {
    width: 12.25%;
    display: inline-block;
    border: 1px solid rgba(214, 222, 239, 1);
    border-top: 0;
    border-left: 0;
    height: 45px;
    line-height: 45px;
    text-align: center;
  }

}
.messageTitle{
    overflow: hidden;
    margin-bottom: 15px;
    
}
.mcard0 {
  border: 1px solid #d7e0f1;
  margin-top: 20px;
}
/deep/ .el-dialog__headerbtn {
  top: 10px;
}
</style>