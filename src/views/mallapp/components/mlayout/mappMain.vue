<template>
  <div class="main-container">
    <!-- or name="fade" -->
    <!-- <router-view :key="key"></router-view> -->
    <!-- <keep-alive
      :exclude="['MorderDetail', 'MorderExport', 'MuserDetail', 'MuserList', 'TicketAdd', 'Ticket',
      'ticketSetRules', 'TicketLog', 'ScoreLogDetial', 'ScoreDistribute', 'AddDistribute', 'DistributeLog',
      'Coupon', 'CouponAdd', 'SetCuopon', 'couponSuccess', 'CouponLog', 'couponLinkReceive', 'CouponLinkEdit',
      'CouponCodeDetail', 'QuotaLog', 'TurnplateAdd', 'ActiveTurnplate', 'ActiveRedeemPool', 'ActivePoolDetail',
      'ActiveWinnerList', 'ActiveWinnerDetail']"
    > -->
      <router-view/>
    <!-- </keep-alive> -->
  </div>
</template>
<script>
export default {
  name: 'MappMain',
}
</script>
<style lang="scss" scoped>
</style>
