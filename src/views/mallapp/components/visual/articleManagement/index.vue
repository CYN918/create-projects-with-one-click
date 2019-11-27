<template>
    <div class="articleManagement">
        <div class="heade">
            <p class="searchs">搜索条件</p>
            <div class="searchContainer">
                <span class="Keyword">关键字:</span>
                <input type="text"  v-model="text" class="ipt" placeholder="请输入关键字内容">
                <span class="search">查询</span>
                <span class="recharge">充值</span>
            </div>
        </div>
        <div class="tabelContainer">
           <p class="etid">
               <span class="add">新增文章</span>
               <span class="dele">删除</span>
           </p>
            <div class="tabel">
                <el-table
                    :data="tableData"
                    border
                    style="width: 100%">
                    <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="date"
                        label="文章标题"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="name"
                        label="链接"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="address"
                        label="创建时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="address"
                        label="最后更新时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        prop="address"
                        label="操作">
                        <template>
                            <div class="set">
                                <p>
                                    <!--<img src="@/common/images/application/etdit.png" alt="">-->
                                    <span class="etid">编辑</span>
                                </p>
                                <p>
                                    <!--<img src="@/common/images/application/dele.png" alt="">-->
                                    <span class="dele">删除</span>
                                </p>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
// import { articleList } from '@/api/mallapp/interface/index1.vue'
export default {
    data(){
        return{
            text:'',
            tableData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1517 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1519 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1516 弄'
            }]
        }
    },
    methods:{

    },
    created(){

    }
}
</script>
<style lang="scss">
.articleManagement{
    background:RGBA(238, 238, 238, 1) ;
    width: 1595px;
    overflow: hidden;
    .heade{
        padding-top: 26px;
        width: 100%;
        height:155px ;
        background: white;
        .searchs{
            font-size:16px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(51,51,51,1);
            border-left: 4px solid rgba(74,153,250,1);
            padding-left: 18px;
        }
        .searchContainer{
            margin-top: 37px;
            margin-left: 49px;
            .Keyword{
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(96,98,102,1);
            }
            .ipt{
                margin-left: 30px;
                width: 196px;
                border: 1px solid rgba(214, 222, 239, 1);
                box-sizing: border-box;
                padding: 10px 0px 10px 20px;
                height: 32px;
            }
            .search,.recharge{
                cursor: default;
                display: inline-block;
                color: white;
                width:56px;
                text-align: center;
                line-height: 32px;
                height:32px;
                background:rgba(74,153,250,1);
                border-radius:3px;
                font-size:12px;
                font-family:Microsoft YaHei;
                font-weight:400;
            }
            .recharge{
                cursor: pointer;
                margin-left: 20px;
            }
            .search{
                cursor: pointer;
                margin-left: 58px;
            }
        }
    }
    .tabelContainer{
        margin-top: 20px;
        width: 100%;
        background: white;
        overflow: hidden;
        .etid{
            margin-top: 23px;
            font-size:14px;
            font-family:Microsoft YaHei;
            font-weight:400;
            .add{
                margin-left: 21px;
                cursor: pointer;
                display: inline-block;
                width: 96px;
                height: 40px;
                text-align: center;
                line-height:40px ;
                color: white;
                background: rgba(74, 153, 250, 1);
                border-radius:4px;
            }
            .dele{
                cursor: pointer;
                display: inline-block;
                margin-left: 20px;
                width: 70px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                background: rgba(74, 153, 250, 1);
                color: white;
                border-radius:4px;
            }
        }
        .tabel{
            width: 1554px;
            margin:18px auto;
            .set{
                justify-content: center;
                align-items: center;
                display: flex;
                p{
                    display: flex;
                    img{
                        cursor: pointer;
                        vertical-align: middle;
                        width: 34px;
                        height: 34px;
                    }
                    span{
                        margin-top: 6px;
                        margin-left: 18px;
                        vertical-align: middle;
                        font-size:14px;
                        font-family:Microsoft YaHei;
                        font-weight:400;
                        color:rgba(96,98,102,1);
                    }
                    &:nth-child(1){
                        margin-right: 100px;
                    }
                }
            }
        }
    }
}
</style>