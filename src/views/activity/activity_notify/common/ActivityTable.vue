<template>
    <div>
        <slot></slot>
        <el-table
            :data="tableData"
            stripe
            style="width: 100%"
            border
            ref="elTable"
            class="goods_index">
            <el-table-column type="index" label="序号" align="center" width="55">
                <template slot-scope="scope">
                    <span>{{scope.$index}}</span>
                </template>
            </el-table-column>
            <el-table-column label="活动起止时间" align="center" width="120">
                <template slot-scope="scope">
                    <p>{{scope.row.startTime}}</p>
                    <p>{{scope.row.entTime}}</p>
                </template>
            </el-table-column>
            <el-table-column label="活动编码" align="center" width="150">
                <template slot-scope="scope">
                    <span>{{scope.row.activityId}}</span>
                </template>
            </el-table-column>
            <el-table-column label="活动主题" align="center" width="150">
                <template slot-scope="scope">
                    <span>{{scope.row.activityTopic}}</span>
                </template>
            </el-table-column>
            <el-table-column label="活动类型" align="center" width="150">
                <template slot-scope="scope">
                    <span>{{scope.row.activityTypeName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="活动内容" align="center" width="200">
                <template slot-scope="scope">
                    <span>{{scope.row.content}}</span>
                </template>
            </el-table-column>
            <el-table-column label="活动链接" align="center" width="140">
                <template slot-scope="scope">
                    <span>{{scope.row.link}}</span>
                </template>
            </el-table-column>
            <el-table-column label="活动状态" align="center" width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.status}}</span>
                </template>
            </el-table-column>
            <el-table-column label="客户平台数量" align="center" width="150">
                <template slot-scope="scope">
                    <span>{{scope.row.status}}</span>
                </template>
            </el-table-column>
            <el-table-column label="成交订单数量" align="center" width="150">
                <template slot-scope="scope">
                    <span>{{scope.row.status}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="150" fixed="right">
                <template slot-scope="scope">
                    <div class="line-div small_top" @click="Stand(scope.row)">
                        <div class="small-Idiv">
                            <div class="activity">
                                <img src="../../../../common/images/goods/xiajiashangjia.png" alt class="div_img" />
                            </div>
                            <span
                                style="word-break: keep-all;margin-left: 5px;left:10px"
                                class="spanclass"
                            >下架/上架</span>
                        </div>
                        <el-switch
                            v-model="scope.row.isOnSale"
                            :active-value="1"
                            disabled
                            :inactive-value="0"
                            active-color="#8CC5FF"
                        ></el-switch>
                    </div>
                    <div class="line-div small_top">
                        <div class="small-Idiv">
                            <div class="activity">
                                <img src="../../../../common/images/goods/yijiandaifa.png" alt class="div_img" />
                            </div>
                            <span style="word-break: keep-all;margin-left: 5px;left:10px" class="spanclass">一件代发</span>
                        </div>
                        <el-switch
                            v-model="scope.row.skuInfo[scope.row.index].priceInfo.isSubstituteSales"
                            disabled
                            :active-value="1"
                            :inactive-value="0"
                            active-color="#8CC5FF"
                        ></el-switch>
                    </div>
                    <div class="line-div small_top" style="padding-bottom: 0">
                        <div class="small-Idiv" @click="editor(scope.row)">
                            <div class="i-div">
                                <img src="../../../../common/images/icon/编辑.png" alt class="operation_img" />
                            </div>
                            <span>编辑</span>
                        </div>
                        <div class="small-Idiv" @click="submitScenario(scope.row)">
                            <div class="i-div huishouzhan">
                                <img src="../../../../common/images/icon/场景定制.png" alt class="operation_img" />
                            </div>
                            <span style="word-break: keep-all;margin-left: -6px;">场景定制</span>
                        </div>
                    </div>
                    <div class="line-div small_top" style>
                        <div class="small-Idiv" @click="goodsDetail(scope.row)">
                            <div class="i-div fuzhi">
                                <img src="../../../../common/images/icon/货物列表.png" alt class="operation_img" />
                            </div>
                            <span style="word-break: keep-all;margin-left: -6px;">商品详情</span>
                        </div>
                        <div class="small-Idiv" @click="recycleBinfunc(scope.row)">
                            <div class="i-div huishouzhan">
                                <img src="../../../../common/images/icon/回收站.png" alt class="operation_img" />
                            </div>
                            <span style="word-break: keep-all;margin-left: -2px;">回收站</span>
                        </div>
                    </div>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination" style="margin-top: 27px;text-align: right;">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="form.current_page"
                :page-sizes="[10, 30, 50, 100]"
                :page-size="form.page_size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    name: "ActivityTable",
    data() {
      return {
          total: 0, // 展示总数
          tableData: [], // 表格数据
          form: { // 查询变量
              page_size: 10, // 当前页展示数量
              current_page: 1, // 当前页
          }
      }
    },
    methods: {
        // 页面每页展示数量变化
        handleSizeChange() {

        },
        // 页码发生变化
        handleCurrentChange() {

        },
    },
}
</script>

<style scoped>

</style>
