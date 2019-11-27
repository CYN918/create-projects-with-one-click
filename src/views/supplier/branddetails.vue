<template>
  <div class="margin">
    <el-form ref="form" label-width="260px" size="small">
      <div class="mbottom">
        <div class="goods-fitter">
          <div class="search-wrapper1">
            <el-page-header @back="back" content="商品管理>商品审核>审核记录"></el-page-header>
          </div>
        </div>
      </div>
      <div class="tabs-content" >
        <div class>
          <div class="mbottom">
            <div class="goods-fitter">
              <el-form label-width="260px" size="small">
                <div class="search-wrapper">
                  <h4 class="title">
                    <!-- 审核类型：{{item.auditType | TypeName}} -->
                    <span>审核状态：{{dataobj.auditStatus == 0?'未审核 ':dataobj.auditStatus == 1?'审核通过':'审核不通过'}}</span>
                    <span>审核发起人：{{dataobj.createUserName}}</span>
                    <span>审核发起时间：{{dataobj.createTime}}</span>
                  </h4>
                  <br />
                  <div class="wrapper">
                    <ul class="list">
                      <li class="item" v-for="(data,index2) in dataobj.auditProcessList" :key="index2">
                        <div  :class="data.processStatus == 0?'label word Toaudit':data.processStatus == 1?'label word through':'label word nothrough'">
                          <i class="el-icon-circle-check"></i>
                          <span class="t2">{{data.processStatus == 0?'未审核 ':data.processStatus == 1?'审核通过':'审核不通过'}}</span>
                        </div>
                        <div class="word_line">
                          <span class="t1 tt">审核人：</span>
                          <span class="t1">{{data.auditUserName}}  ({{data.roleName}})</span>
                        </div>
                        <div class="word_line">
                          <span class="t1 tt">审核结果：</span>
                          <i  :class="data.processStatus == 0?'iconfont icon-daishenhe':data.processStatus == 1?'iconfont icon-shenhetongguo':'iconfont icon-shenheweitongguo'"></i>
                          <span class="t1 marleft">{{data.processStatus == 0?'未审核':data.processStatus == 1?'审核通过':'审核不通过'}}</span>
                        </div>
                        <div class="word_line">
                          <span class="t1 tt">审核权限：</span>
                          <span class="t1">{{data.auditPower == 0?'查阅 ':'决策'}}</span>
                        </div>
                        <div class="word_line">
                          <span class="t1 tt">审核时间：</span>
                          <span class="t1">
                            <i>
                              <img src="../../common/images/examine/icon_time.png" alt />
                            </i>
                            <span class="t1 marleft">{{data.createUserName}}</span>
                          </span>
                        </div>
                        <div class="word_line">
                          <span class="t1 tt">审核意见：</span>
                          <span class="t1">{{data.auditRemark}}</span>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { findinfobyid } from "@/api/product/index";

export default {
  data() {
    return {
      brandAuditId: "",
      dataobj: {}
    };
  },
  created() {
    if (this.$route.query.id) {
      this.brandAuditId = this.$route.query.id;
      this.findinfobyid();
    }
  },
  methods: {
    async findinfobyid(){
      const val = await findinfobyid(this.brandAuditId)
      this.dataobj = val.data;
    },
    // _getAllaudit() {
    //   let obj = {};
    //   obj.goodsId = this.goodsId;
    //   getAllaudit(obj).then(res => {
    //     this.data = res.data;
    //   });
    // },
    //返回
    back() {
      this.$router.go(-1);
    }
  },
  filters: {
    TypeName(val) {
      let arr = [
        { auditType: 1, name: "上架" },
        { auditType: 2, name: "下架" },
        { auditType: 3, name: "调价" },
        { auditType: 4, name: "信息变更" },
        { auditType: 5, name: "删除商品" },
        { auditType: 6, name: "京东改价" }
      ];
      for (var i = 0; i < arr.length; i++) {
        if (val == arr[i].auditType) {
          return arr[i].name;
        }
      }
    }
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
      span {
        margin-left: 50px;
        font-size: 16px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(60, 60, 60, 1);
      }
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
.search-wrapper1 {
  padding: 20px;
  border: 1px solid rgb(215, 224, 241);
  background: #fff;
  display: flex;
  align-items: center;
  .title1 {
    display: flex;
    margin-left: 20%;
  }
}
.imgbig {
  width: 100px;
  height: 100px;
}
.wrapper {
  margin-left: 22px;
}
.noDetails {
  text-align: center;
}
.list {
  display: flex;
  flex-wrap: wrap;
  position: relative;
  .word {
    .el-icon-circle-check {
      color: #fff;
      position: absolute;
      left: 16px;
      bottom: 16px;
    }
    .el-icon-circle-close {
      color: #fff;
      position: absolute;
      left: 16px;
      bottom: 16px;
    }
  }
}
.item {
  position: relative;
  padding: 50px 47px 0;
  box-sizing: border-box;
  margin-bottom: 50px;
  margin-right: 45px;
  width: 360px;
  height: 346px;
  background: rgba(247, 250, 255, 1);
  border: 1px solid rgba(234, 237, 244, 1);
  border-radius: 6px;
}
.label {
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-top: 40px solid #669eff;
  border-right: 40px solid #669eff;
  border-left: 40px solid transparent;
  border-bottom: 40px solid transparent;
  border-radius: 0 6px 0 0;
}
.label_1 {
  border-top: 40px solid #669eff;
  border-right: 40px solid #669eff;
}
.label_2 {
  border-top: 40px solid #ff6671;
  border-right: 40px solid #ff6671;
}
.label_3 {
  border-top: 40px solid #f1ad49;
  border-right: 40px solid #f1ad49;
}
.word_line {
  display: flex;
  align-items: baseline;
  margin-bottom: 20px;
  .el-icon-circle-check {
    color: #669eff;
  }
  .el-icon-circle-close {
    color: #ff6671;
  }
}
.tt {
  flex-shrink: 0;
  text-align: right;
  width: 72px;
  margin-right: 6px;
}
.t1 {
  display: inline-block;
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(96, 98, 102, 1);
  line-height: 2;
}
.t2 {
  position: absolute;
  top: -19px;
  right: -45px;
  display: inline-block;
  width: 70px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  font-size: 14px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  text-align: center;
  color: white;
}
.label_icon_wrap {
  position: absolute;
  top: -30px;
  right: -30px;
}
.avantar {
  display: inline-block;
  width: 16px;
  height: 18px;
  position: relative;
  top: 2px;
}

.label_icon_wrap {
  display: inline-block;
  width: 14px;
  height: 14px;
}
.marleft{
  margin-left: 5px
}
.icon-shenhetongguo{
  color:#669EFF
}
.icon-daishenhe{
  color: #F1AD49
}
.icon-shenheweitongguo{
  color: #FF6671
}
.Toaudit{
  border-top: 40px solid #F1AD49;
  border-right: 40px solid #F1AD49;
}
.through{
  border-top: 40px solid #669EFF;
  border-right: 40px solid #669EFF;
}
.nothrough{
  border-top: 40px solid #FF6671;
  border-right: 40px solid #FF6671;
}
</style>
