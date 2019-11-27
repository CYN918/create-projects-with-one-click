<template>
  <div class="margin">
    <el-row :gutter="40">
      <el-col :span="12">
        <div class="mcard">
          <div class="title">账户余额</div>
          <div class="mcard-content">
            <div class="price">¥1567484.02</div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="mcard">
          <div class="title">现金账户余额</div>
          <div class="mcard-content">
            <div class="price">0</div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'Mfinance'
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
.mcard-content {
  margin-top: 20px;
  .price {
    font-size: 36px;
    color: $themeSubColor;
  }
}
</style>
