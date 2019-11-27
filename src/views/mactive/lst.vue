<template>
		<el-container class="dx_oiu_err">
		<el-aside>
			<navbar type="2"></navbar>
		</el-aside>
		<el-main class="make_ticket_steps">


            	<el-row :gutter="20">
				<el-col :span="8">
					<section class="steps_outside_box">
						<el-row>
							<el-col :span="14">
								<section class="sd_left font-16">
									<span class="ddf_num">1 <span>/</span></span> 设定活动日期
								</section>

							</el-col>
							<el-col :span="10">

							</el-col>
						</el-row>

						<p class="fz12 mt10">
							1、点击创建活动<br>
2、设定活动开始日期和结束日期
						</p>
					</section>

				</el-col>
				<el-col :span="8">
					<section class="steps_outside_box">
						<el-row>
							<el-col :span="14">
								<section class="sd_left font-16">
									<span class="ddf_num">2 <span>/</span></span> 商品、活动价设定
								</section>

							</el-col>
							<el-col :span="10">

							</el-col>
						</el-row>

						<p class="fz12 mt10">
							从站点商品中选择参加活动的商品对每个商品设定限时活动价格
						</p>
					</section>
				</el-col>
				<el-col :span="8">
					<section class="steps_outside_box">
						<el-row>
							<el-col :span="14">
								<section class="sd_left font-16">
									<span class="ddf_num">3 <span>/</span></span> 完成
								</section>

							</el-col>
							<el-col :span="10">

							</el-col>
						</el-row>

						<p class="fz12 mt10">
							用户在商城即可以以活动价购买商品
						</p>
					</section>
				</el-col>
			</el-row>


            <section class="ibox-content mt20">
                <el-table class="mt20" :data="tableData" style="width: 100%" highlight-current-row>
                					<el-table-column  type="index" label="序号" ></el-table-column>

                    <el-table-column prop="activity_name" label="活动名称" ></el-table-column>
                    <el-table-column prop="starting_time" label="开始时间" ></el-table-column>
                    <el-table-column prop="end_time" label="结束时间" ></el-table-column>
                    <el-table-column prop="active_link" label="活动链接" ></el-table-column>
                    <el-table-column prop="included_numbe" label="包含商品数" ></el-table-column>
                    	<el-table-column prop="state" label="状态" ></el-table-column>
                    <el-table-column label="操作">
                						<template slot-scope="scope">
                							<el-button type="text" size="small" >编辑</el-button>

                						</template>
                                    </el-table-column>
                    </el-table>

            </section>


    </el-main>
    </el-container>
</template>
<script>
import navbar from './components/navbar'
export default {
  data () {
    return {
      tableData: [
        {
          activity_name: '超级大转盘', // 活动名称
          starting_time: '2019-03-08 20:04:06', // 开始时间
          end_time: '2019-03-08 20:04:06', // 结束时间
          active_link: 'http://duxinggj.com', // 活动链接
          included_numbe: '8', // 包含商品数
          state: '进行中'
        }
      ]
    }
  },
  components: {
    navbar
  },
  methods: {
  },
  mounted () {

  }
}

</script>
<style lang="scss" scoped>
    // @import '../plugIn/static/style.scss';

</style>
