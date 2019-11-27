
<template>
  <div class="record-wrapper">
    <el-form :model="formRecord" :inline="true">
     <el-form-item label="活动时间：">
        <el-col :span="10">
          <el-date-picker type="date" placeholder="开始时间" v-model="formRecord.create_time_start"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">至</el-col>
        <el-col :span="10" >
          <el-date-picker  type="date" placeholder="结束时间" v-model="formRecord.create_time_end"></el-date-picker>
      </el-col>
      </el-form-item>
      <el-form-item label="改价进度："  class="title">
        <el-select v-model="formRecord.status" placeholder="请选择" class="width">
          <el-option label="全部" value=""></el-option>
          <el-option label="已完成" value="1"></el-option>
          <el-option label="改价中" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="recordList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="sku"
        label="操作时间"/>
      <el-table-column
        prop="sku"
        label="操作类型"/>
      <el-table-column
        prop="sku"
        label="操作商品数"/>
      <el-table-column
        prop="sku"
        label="成功数"/>
      <el-table-column
        prop="sku"
        label="失败数"/>
      <el-table-column
        prop="sku"
        label="预计耗时"/>
      <el-table-column
        prop="sku"
        label="操作人"/>
       <el-table-column
        prop="sku"
        label="进度"/>
       <el-table-column
        prop="sku"
        label="操作"/>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'MgoodsRecord',
  data () {
    return {
      formRecord: {
        create_time_start: '', // 改价开始时间
        create_time_end: '', // 改价结束
        status: '' // 改价进度  ""空为全部， 1 已完成，2 改价中
      },
      recordList: []
    }
  },
  methods: {
    onSubmit () {
      console.log(this.formRecord)
    }
  }
}
</script>

<style lang="scss" scoped>
.record-wrapper {
  padding: 20px;
  margin: 20px;
  border: 1px solid #d7e0f1;
  background: #fff;
  .title {
    margin-left: 20px;
  }
  .width {
    width: 180px;
  }
  .line {
    margin-left: 20px;
    text-align: center;
  }
}
</style>
=======
<template>
  <div class="record-wrapper">
    <el-form :model="formRecord" :inline="true">
     <el-form-item label="活动时间：">
        <el-col :span="10">
          <el-date-picker type="date" placeholder="开始时间" v-model="formRecord.create_time_start"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">至</el-col>
        <el-col :span="10" >
          <el-date-picker  type="date" placeholder="结束时间" v-model="formRecord.create_time_end"></el-date-picker>
      </el-col>
      </el-form-item>
      <el-form-item label="改价进度："  class="title">
        <el-select v-model="formRecord.status" placeholder="请选择" class="width">
          <el-option label="全部" value=""></el-option>
          <el-option label="已完成" value="1"></el-option>
          <el-option label="改价中" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="recordList"
      stripe
      style="width: 100%">
      <el-table-column
        prop="sku"
        label="操作时间"/>
      <el-table-column
        prop="sku"
        label="操作类型"/>
      <el-table-column
        prop="sku"
        label="操作商品数"/>
      <el-table-column
        prop="sku"
        label="成功数"/>
      <el-table-column
        prop="sku"
        label="失败数"/>
      <el-table-column
        prop="sku"
        label="预计耗时"/>
      <el-table-column
        prop="sku"
        label="操作人"/>
       <el-table-column
        prop="sku"
        label="进度"/>
       <el-table-column
        prop="sku"
        label="操作"/>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'MgoodsRecord',
  data () {
    return {
      formRecord: {
        create_time_start: '', // 改价开始时间
        create_time_end: '', // 改价结束
        status: '' // 改价进度  ""空为全部， 1 已完成，2 改价中
      },
      recordList: []
    }
  },
  methods: {
    onSubmit () {
      console.log(this.formRecord)
    }
  }
}
</script>

<style lang="scss" scoped>
.record-wrapper {
  padding: 20px;
  margin: 20px;
  border: 1px solid #d7e0f1;
  background: #fff;
  .title {
    margin-left: 20px;
  }
  .width {
    width: 180px;
  }
  .line {
    margin-left: 20px;
    text-align: center;
  }
}
</style>
>>>>>>> 1f410d9b0440346605f1942c2c8cfcc548000a88
