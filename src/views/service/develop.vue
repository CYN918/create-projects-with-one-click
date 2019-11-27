<template>
  <div class="margin mcard">
    <el-table :data="list" stripe>
      <el-table-column prop="name" label="项目名称" width="300" align="center"/>
      <el-table-column prop="day" label="开发人日" width="100" align="center"/>
      <el-table-column prop="price" label="人/日单价" width="100" align="center"/>
      <el-table-column prop="amount" label="开发费用" width="100" align="center"/>
      <el-table-column prop="pay" label="需支付费用" width="100" align="center"/>
      <el-table-column prop="start_time" label="项目开始时间"/>
      <el-table-column prop="end_time" label="项目结束时间"/>
      <el-table-column prop="pay_time" label="支付时间"/><el-table-column prop="status" label="状态" width="60"/>
      <el-table-column label="操作" align="center"  fixed="right">
          <template slot-scope="scope">
            <div class="line-div">
              <div class="small-Idiv">
                <div class="i-div fuzhi">
                  <i class="iconfont icon-fuzhi"></i>
                </div>
                <span>支付</span>
              </div>
            </div>
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Develop',
  data () {
    return {
      list: [{
        id: 123,
        name: '兴业银行-新增审批人额度可延续至下月使用',
        day: 3,
        price: 1400.00,
        amount: 4320.00,
        pay: 4320.00,
        start_time: '2000-11-27 19:14:47',
        end_time: '2000-11-27 19:14:47',
        pay_time: '2000-11-27 19:14:47',
        status: '已支付'
      }, {
        id: 123,
        name: '兴业银行-新增审批人额度可延续至下月使用',
        day: 3,
        price: 1400.00,
        amount: 4320.00,
        pay: 4320.00,
        start_time: '2000-11-27 19:14:47',
        end_time: '2000-11-27 19:14:47',
        pay_time: '2000-11-27 19:14:47',
        status: '已支付'
      }, {
        id: 123,
        name: '兴业银行-新增审批人额度可延续至下月使用',
        day: 3,
        price: 1400.00,
        amount: 4320.00,
        pay: 4320.00,
        start_time: '2000-11-27 19:14:47',
        end_time: '2000-11-27 19:14:47',
        pay_time: '2000-11-27 19:14:47',
        status: '已支付'
      }, {
        id: 123,
        name: '兴业银行-新增审批人额度可延续至下月使用',
        day: 3,
        price: 1400.00,
        amount: 4320.00,
        pay: 4320.00,
        start_time: '2000-11-27 19:14:47',
        end_time: '2000-11-27 19:14:47',
        pay_time: '2000-11-27 19:14:47',
        status: '已支付'
      }, {
        id: 123,
        name: '兴业银行-新增审批人额度可延续至下月使用',
        day: 3,
        price: 1400.00,
        amount: 4320.00,
        pay: 4320.00,
        start_time: '2000-11-27 19:14:47',
        end_time: '2000-11-27 19:14:47',
        pay_time: '2000-11-27 19:14:47',
        status: '已支付'
      }]
    }
  }
}
</script>

<style lang="scss" scoped>
.i-div{
  cursor: pointer;
  width:32px;
  height:32px;
  border-radius:6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.line-div{
    display: flex;
    justify-content: space-around;

}
.fuzhi{
  background:rgba(229,162,75,1);
}
 .huishouzhan{
   background:rgba(247,108,110,1);
 }
</style>
