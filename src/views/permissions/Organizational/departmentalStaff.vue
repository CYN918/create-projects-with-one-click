<template>
    <div class="departmentalStaff">
       <div class="header">
           <p class="goback" @click="$router.go(-1)">
               <i class="el-icon-back"></i>
               <span>返回</span>
           </p>
           <p class="text">组织架构</p>
       </div>
        <div class="tableContainer">
            <div class="btn">
                <span>订单明细</span>
                <span>开票明细</span>
                <span>应收账款</span>
                <span>费用额度</span>
                <span>核对账单</span>
            </div>
            <div class="table">
                <el-table
                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            align="center"
                            type="selection"
                            width="55"/>
                    <el-table-column
                            align="center"
                            type="index"
                            label="序号"
                            width="50"/>
                    <el-table-column
                            label="总公司"
                            align="center"
                          >
                        <template slot-scope="scope">
                            {{userList}}
                        </template>
                    </el-table-column>
                    <!--<el-table-column-->
                            <!--prop="date2"-->
                            <!--label="二级公司"-->
                            <!--align="center"-->
                            <!--&gt;-->
                    <!--</el-table-column>-->
                    <!--<el-table-column-->
                            <!--align="center"-->
                            <!--prop="date3"-->
                            <!--label="三级公司">-->
                    <!--</el-table-column>-->
                    <el-table-column
                            align="center"
                            label="本单位名称">
                   <template slot-scope="scope">

                    </template>
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="organizeName"
                            label="部门">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="date6"
                            label="部门领导">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="employeeSn"
                            label="工号">
                    </el-table-column>
                    <el-table-column
                            align="center"
                            prop="realName"
                            label="姓名">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="telephone"
                        label="联系电话">
                </el-table-column>
                    <el-table-column
                            align="center"
                            prop="email"
                            label="邮箱">
                    </el-table-column>
                </el-table>
                <div class="pagination">
                    <el-pagination
                            :current-page="form.current_page"
                            :page-sizes="[10, 30, 50, 100]"
                            :page-size="form.pageSize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="form.total_count"
                            @current-change="$event => {form.current_page = $event; loadUserPage();}"
                    ></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { getUserPage } from "@/api/permissions/index";
export default {
    data(){
        return{
            tableData: [{
                date1: '深圳市迈戈实业有限公司',
                date2: '深圳市科技有限公司',
                date3: '深圳市科技有限公司',
                date4: '深圳市科技有限公司',
                date5: '技术部',
                date6: '黄总',
                date7: '107285245',
                date8: '黄上文',
                date9: '15571352252',
                date10: '15571352252@163.com',
            },
                {
                    date1: '深圳市迈戈实业有限公司',
                    date2: '深圳市科技有限公司',
                    date3: '深圳市科技有限公司',
                    date4: '深圳市科技有限公司',
                    date5: '采购部',
                    date6: '邱总',
                    date7: '10724245',
                    date8: '邱峰',
                    date9: '18934649931',
                    date10: '18934649931@163.com',
                },
                {
                    date1: '深圳市迈戈实业有限公司',
                    date2: '深圳市科技有限公司',
                    date3: '深圳市科技有限公司',
                    date4: '深圳市科技有限公司',
                    date5: '人事部',
                    date6: '徐总',
                    date7: '10535681',
                    date8: '徐杨莉',
                    date9: '15708319538',
                    date10: '15708319538@163.com',
                },],
            form: {
                current_page: 1,
                total_count: 0,
                pageSize: 10,
                childIds: []
            },
            dialogVisible: false, //弹框按钮
            desc: "", //删除原因
            radio2: 3, //批量操作的的单选按钮
            value: false, //开关
            tableData: [],
            userList:''
        }
    },
    methods: {
        //批量操作
        batchOperation() {
            this.dialogVisible = true;
        },
        //开关
        handleChange(val) {

        },
        // 获取所有用户
        async loadUserPage() {
            var form = {};
            form.pageNum = this.form.current_page;
            form.pageSize = this.form.pageSize;
            form.organizeIds = (this.form.childIds||[]).join(',');
            await getUserPage(form).then(res => {
                this.tableData = res.data.list;
                this.form.total_count = res.data.total;
            });
        },
    },
    mounted() {
        this.userList = this.$route.query.userList
        this.form.childIds = (this.$route.query.childIds || "").split(",");
        this.loadUserPage();
    }

}
</script>
<style lang="scss" scoped>
.departmentalStaff{
    width:1612px;
    margin:30px auto ;
    .header{
        height: 94px;
        padding: 31px 0 31px 20px;
        border: 1px solid rgb(215, 224, 241);
        background: #fff;
        border:1px solid rgba(234,237,244,1);
        box-sizing: border-box;
        .goback{
            float: left;
            cursor: default;
            width:68px;
            background:rgba(76,134,244,1);
            border-radius:3px;
            padding: 7px 0 7px 11px;
            box-sizing: border-box;
            font-size:12px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(255,255,255,1)
        }
        .text{
            margin-top: 9px;
            margin-left: 43px;
            float: left;
        }
    }
    .tableContainer{
        margin-top: 25px;
        width: 100%;
        background: white;
        overflow: hidden;
        .btn{
            margin-top: 20px;
            span{
                margin-left: 20px;
                cursor: pointer;
                display: inline-block;
                width:80px;
                height:32px;
                text-align: center;
                line-height: 32px;
                background:rgba(76,134,244,1);
                font-size:12px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(255,255,255,1);
            }
        }
        .table{
            margin-top: 30px;
        }
    }
}
.pagination{
    text-align: right;
    margin-top: 30px;
}
</style>
