<template>
    <div class="projectList">
        <div>
            <div class="search">
                <el-form label-width="100px">
                    <el-form-item label="项目名称：">
                        <el-input
                                placeholder="请输入项目名称"
                                v-model="project">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <el-button type="primary" size="small " style="margin-left: 50px">查询</el-button>
        </div>
        <div>
            <el-table
                    border
                    :data="projectArr"
                    stripe
                    style="width: 100%">
                <el-table-column
                        align="center"
                        prop="customerName"
                        label="客户名称"
                        width="180">
                    <template slot-scope="scope">
                        <span v-if="scope.row.customerName">{{customerName}}</span>
                        <span v-else>暂无</span>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="projectName"
                        label="项目名称"
                        width="180">
                </el-table-column>
                <el-table-column
                        align="center"
                        label="项目类型">
                    <template slot-scope="scope">
                        <div>
                            {{ ['积分商城','员工福利','企业集采','平台对接','礼品卡册','分销商城'][scope.row.applyId-1||0]}}
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="introduction"
                        label="项目介绍">
                </el-table-column>
                <el-table-column
                        prop="projectHost"
                        align="center"
                        label="项目链接">
                    <template slot-scope="scope">
                        <a @click="managementProject(scope.row)">{{"http://"+scope.row.projectHost}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="address"
                        label="销售额">
                    <template slot-scope="scope">
                        200.00
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="已支付金额">
                    <template slot-scope="scope">
                        100.00
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="余额">
                    <template slot-scope="scope">
                        100.00
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="已开票">
                    <template slot-scope="scope">
                        100.00
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="address"
                        label="未开票">
                    <template slot-scope="scope">
                        100.00
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        label="销售员">
                    <template slot-scope="scope">
                        王二麻
                    </template>
                </el-table-column>
                <el-table-column
                        align="center"
                        prop="address"
                        label="状态">
                    <template slot-scope="scope">
                        {{['初始化','停运','上线'][scope.row.projectStatus||0]}}
                    </template>
                </el-table-column>
                <el-table-column
                        width="150"
                        align="center"
                        label="操作">
                    <template slot-scope="scope">
                        <div style="display: flex;justify-content: space-around;width: 100%">
                            <div>
                                <div class="layout">
                                    <a :href="'http://'+scope.row.projectHost" target="_blank">
                                        <img src="@/common/images/application/商城.png" alt="">
                                    </a>
                                    <span>商城</span>
                                </div>
                                <div class="layout" v-if="scope.row.projectQrcode">
                                    <a :href="'http://'+scope.row.projectQrcode">
                                        <img src="@/common/images/application/分享.png" alt="">
                                    </a>
                                    <span>分享</span>
                                </div>
                            </div>
                            <div>
                                <div class="layout">
                                    <img src="@/common/images/application/编辑.png" alt="" style="margin-bottom: 8px">
                                    <span v-if="scope.row.projectStatus == 0"
                                          @click="onProjectStatus(scope.row.projectId, 0,scope.row)">初始化项目</span>
                                    <span v-else @click="managementProject(scope.row)">管理项目</span>
                                </div>
                                <div class="layout"
                                     @click="onProjectStatus(scope.row.projectId, scope.row.projectStatus,scope.row)">
                                    <template v-if="scope.row.projectStatus == 1">
                                        <img src="@/common/images/application/停运.png" style="margin-bottom: 8px" alt/>
                                        <span class="div-i">停运</span>
                                    </template>
                                    <template v-else-if="scope.row.projectStatus == 2">
                                        <img src="@/common/images/application/上线.png" style="margin-bottom: 8px" alt/>
                                        <span class="div-i">上线</span>
                                    </template>
                                    <template v-else-if="scope.row.projectStatus == 0">
                                        <img src="@/common/images/application/上线.png" style="margin-bottom: 8px" alt/>
                                        <span class="div-i">初始化</span>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
    import {
        editProjectStatus,
        generatecustomertoken
    } from "@/api/application/index";
    export default {
        props: ["projectArr"],
        data() {
            return {
                project: '',
                data: ''
            }
        },
        methods: {
            //停运
            async onProjectStatus(id, status, val) {
                let tip, title, projectStatus;
                switch (status) {
                    case 0:
                        title = "初始化项目";
                        tip = "初始化项目需要您几分钟时间。这个时间内系统将为您创建数据库及初始化数据。完成后系统会发送信息通知您，请稍后";
                        projectStatus = 1;
                        break;
                    case 1:
                        title = "下线项目";
                        tip = "该操作将会下线您的项目， 是否确定操作";
                        projectStatus = 2;
                        break;
                    case 2:
                        title = "上线项目";
                        tip = "该操作将会上线您的项目， 是否确定操作";
                        projectStatus = 1;
                        break;
                    default:
                        return;
                }

                await this.$confirm(tip, title, {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                });
                val.loading = true
                setTimeout(() => {
                    val.loading = false
                }, 60000)
                await editProjectStatus(id, projectStatus);
                this.$message({
                    type: "success",
                    message: "操作成功!"
                });
            },
            //项目管理
            async managementProject(val) {
                this.data = await generatecustomertoken(val.projectId)
                window.open(`http://${this.data.domainName}/admin/?token=${this.data.token}`, '_black')
                // this.$router.push({ name: "Mallapp" });
            },
        }
    }
</script>
<style lang="scss" scoped>
    .search {
        display: inline-block;
    }

    .projectList {
        width: 100%;

        .layout {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            img {
                width: 32px;
                height: 32px;
            }
        }
    }
</style>
