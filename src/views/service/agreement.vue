<template>
  <div class="margin mcard">
    <el-table :data="list" stripe>
      <el-table-column prop="id" label="订单号"/>
      <el-table-column prop="name" label="产品金额"/>
      <el-table-column prop="amount" label="实付金额"/>
      <el-table-column prop="validity_start_time" label="有效期起始"/>
      <el-table-column prop="validity_end_time" label="有效期结束"/>
      <el-table-column prop="status" label="状态" width="100"/>
      <el-table-column label="操作" align="center"  fixed="right">
          <template slot-scope="scope">
            <div class="line-div">
              <div class="small-Idiv">
                <div class="i-div fuzhi">
                  <i class="iconfont icon-fuzhi"></i>
                </div>
                <span>下载</span>
              </div>
            </div>
          </template>
        </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'Agreement',
  data () {
    return {
      list: [{
        id: 123,
        name: '博士鹰服务商',
        amount: 88000.00,
        pay: 0.00,
        validity_start_time: '2000-11-27 19:14:47',
        validity_end_time: '2000-11-27 19:14:47',
        status: '正常'
      }, {
        id: 123,
        name: '博士鹰服务商',
        amount: 88000.00,
        pay: 0.00,
        validity_start_time: '2000-11-27 19:14:47',
        validity_end_time: '2000-11-27 19:14:47',
        status: '正常'
      }, {
        id: 123,
        name: '博士鹰服务商',
        amount: 88000.00,
        pay: 0.00,
        validity_start_time: '2000-11-27 19:14:47',
        validity_end_time: '2000-11-27 19:14:47',
        status: '正常'
      }, {
        id: 123,
        name: '博士鹰服务商',
        amount: 88000.00,
        pay: 0.00,
        validity_start_time: '2000-11-27 19:14:47',
        validity_end_time: '2000-11-27 19:14:47',
        status: '正常'
      }, {
        id: 123,
        name: '博士鹰服务商',
        amount: 88000.00,
        pay: 0.00,
        validity_start_time: '2000-11-27 19:14:47',
        validity_end_time: '2000-11-27 19:14:47',
        status: '正常'
      }, {
        id: 123,
        name: '博士鹰服务商',
        amount: 88000.00,
        pay: 0.00,
        validity_start_time: '2000-11-27 19:14:47',
        validity_end_time: '2000-11-27 19:14:47',
        status: '正常'
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
</style>
