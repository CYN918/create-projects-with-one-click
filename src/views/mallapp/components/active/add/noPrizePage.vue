<template>
  <div class="content-box">
    <div class="title-box">
      很遗憾, 您没有能够中奖
      <br>(听说下次中奖的几率会更大)
    </div>
    <img src="@/common/images/mall/noprize.png">
    <div class="btn-box">再来一次</div>
    <div class="btn-box">立即兑奖</div>
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
  padding: 10px;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  color: #a6a6a6;
  .title-box {
    margin-top: 20px;
    margin-bottom: 20px;
    text-align: center;
  }
  img {
    width: 200px;
    height: 200px;
    cursor: pointer;
    margin-bottom: 50px;
  }
  .btn-box {
    width: 300px;
    height: 36px;
    line-height: 36px;
    text-align: center;
    background-color: #ff758f;
    margin-bottom: 10px;
    border-radius: 6px;
    font-size: 14px;
    color: #f5f5f5;
    cursor: pointer;
  }
}
</style>
