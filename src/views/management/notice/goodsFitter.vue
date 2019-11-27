<template>
    <div class="goods-fitter">
        <el-form label-width="120px" size="small">
            <div class="vender">
                <ul class="clearfix">
                    <li
                            v-for="(item,index) in venderList"
                            @click="tabVender(item.value,index)"
                            :class="index === num? 'active' : ''"
                            :key="index"
                    >
                        <i class="image">
                            <img :src="require(`@/common/images/${item.image}`)" alt="item.name"/>
                        </i>
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="search-wrapper">
                <h4 class="title">搜索条件</h4>
                <div class="search-main">
                    <el-row>
                        <el-col :span="7">
                            <el-form-item label="商品名称：">
                                <el-col :span="23">
                                    <el-input v-model="form.goodsName" placeholder="请输入商品名称">
                                    </el-input>
                                </el-col>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-col>
                                <el-form-item label="品牌：">
                                    <el-col :span="23">
                                        <el-input v-model="form.goodsBrand" placeholder="请输入品牌名称">
                                        </el-input>
                                    </el-col>
                                </el-form-item>
                            </el-col>
                        </el-col>

                        <el-col :span="2" style='text-align: center;'>
                            <el-button type="primary" size="small" @click="handelSearchGoods">搜索</el-button>
                            <!--<el-button type="primary" size="small" @click="handelResetCondition">导出</el-button>
                            <el-button type="primary" size="small" @click="handelResetCondition">切换模态试图</el-button>
                            <span class="btn-toggle" @click="toggleSearch">{{toggleSearchText}}</span>-->
                        </el-col>
                    </el-row>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
    import {
        getBuyer,
    } from "@/api/product/index";

    export default {
        props: ['dataObj'],
        data() {
            return {
                num:0,
                value: '',
                venderList: [
                    {
                        name: '一件代发商品',
                        image: 'yjdf.png',
                        value: '0'
                    },
                    {
                        name: '集采商品',
                        image: 'jc.png',
                        value: '0'
                    },
                    {
                        name: '京东商品',
                        image: 'jd.png',
                        value: '1'
                    }, {
                        name: '苏宁商品',
                        image: 'sn.png',
                        value: '3'
                    }, {
                        name: '网易严选商品',
                        image: 'yx.png',
                        value: '2'
                    },{
                        name: '虚拟商品',
                        image: 'xngoods.png',
                    }
                    ],
                options: [], //采购员
                form: {
                    goodsType: null, // 1，京东 2，网易 3，苏宁 4, 一件代发商品 5, 集采商品
                    goodsName:'',
                    pageNum:1,
                    pageSize:10,
                    isSubstituteSales:true,
                    isReal:null,
                    goodsBrand: '',
                },
                initForm: {},
                searchMain: false
            }
        },

        methods: {
            tabVender(val,index) {
                if(index==1){
                    this.form.isSubstituteSales = false
                }else if(index==0){
                    this.form.isSubstituteSales = true
                }else{
                    this.form.isSubstituteSales = null
                }
                if(val==0){
                    this.form.goodsType = null
                }else{
                    this.form.goodsType = val
                }
                if(index===5){
                    this.form.isReal = 0
                }else{
                    this.form.isReal = null
                }
                this.num = index
                this.$emit('tabVender', this.form, val, index)
            },
            handelSearchGoods() {
                this.$emit('goodsFitter', this.form)
            },
        }
    }
</script>

<style lang="scss" scoped>
    @import "@/common/scss/variable.scss";

    .goods-fitter {
        .vender {
            ul {
                li {
                    float: left;
                    height: 41px;
                    padding: 0 10px;
                    line-height: 41px;
                    text-align: center;
                    border: 1px solid transparent;
                    font-size: 16px;
                    color: #333;
                    cursor: pointer;

                    &.active {
                        border: 1px solid #d7e0f1;
                        border-bottom: 0;
                        background-color: #fff;
                        position: relative;
                        position: relative;

                        &:after {
                            position: absolute;
                            content: "";
                            left: 0;
                            bottom: -1px;
                            height: 1px;
                            width: 100%;
                            background: #fff;
                        }
                    }

                    .image {
                        display: inline-block;
                        width: 30px;
                        margin-right: 10px;
                        font-size: 0;
                        line-height: 40px;
                        vertical-align: top;

                        img {
                            width: 100%;
                            vertical-align: middle;
                        }
                    }
                }
            }
        }

        .search-wrapper {
            padding: 20px;
            border: 1px solid rgb(215, 224, 241);
            background: #fff;

            .title {
                margin-left: -20px;
                font-size: 16px;
                font-weight: 400;
                color: 3333;
                padding-left: 10px;
                line-height: 1.4;
                border-left: 4px solid $themeColor;
                margin-bottom: 10px;
            }

            .search-main {
            }

            .search-base {
            }
        }

        .text-space {
            text-align: center;
            color: #606266;
            font-size: 12px;
            margin-right: 11px;
            margin-left: 11px;
        }

        .el-select{
            display: inline-block;
            width: 100%;
        }
        .el-select-width {
            max-width: 240px;
            margin-right: 5px;
        }

        .el-input-width {
            display: inline-block;
            max-width: 140px;
        }

        .btn-toggle {
            margin-left: 10px;
            font-size: 14px;
            color: $themeColor;
            cursor: pointer;
        }
    }
</style>
