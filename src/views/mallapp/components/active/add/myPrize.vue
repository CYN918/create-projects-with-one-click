<template>
  <div class="content-box">
    <div class="title-box">
      <div class="title-div left-div">活动说明</div>
      <div class="title-div right-div">我的奖品</div>
    </div>
    <div class="body-box">
      <div class="cfg-my-prize">
        <span class="title-span">中奖奖品: 5000积分</span>
        <br>
        <span class="title-span">中奖时间: 2018.07.16 12:34:09</span>
        <i class="el-icon-arrow-right symbol-sapn"></i>
        <br>
        <span class="title-span">中奖情况: 已领奖</span>
        <br>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss' scoped>
.content-box {
  width: 330px;
  height: 549px;
  background-color: #fff;
  border-radius: 10px;
  margin-top: 15px;
  .title-box {
    height: 35px;
    display: flex;
    text-align: center;
    width: 100%;
    .title-div {
      width: 50%;
      height: 35px;
      line-height: 35px;
      text-align: center;
      font-size: 14px;
      cursor: pointer;
    }
    .left-div {
      border-top-left-radius: 10px;
      background-color: #f5f5f5;
      color: #3c3c3c;
    }
    .right-div {
      border-top-right-radius: 10px;
      background-color: #fff;
      color: #4386f4;
    }
  }
  .body-box {
    height: 514px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    padding: 10px;
    .cfg-my-prize {
      background-color: #f5f5f5;
      padding: 5px;
      border-radius: 6px;
      position: relative;
      .title-span {
        font-size: 12px;
        color: #a6a6a6;
        display: inline-block;
        margin-bottom: 5px;
      }
      .symbol-sapn {
        color: #a6a6a6;
        position: absolute;
        right: 10px;
      }
    }
  }
}
</style>
