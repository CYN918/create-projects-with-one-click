<template>
    <div class="margin">
        <div class="mbottom">
            <div class="goods-fitter">
                <el-form label-width="260px" size="small">
                    <div class="search-wrapper">
                        <h4 class="title">操作指引</h4>
                        <div class="introduce">1、可输入多个商品ID号进行采集，以半角逗号或者回车分隔（如：18736939637,15646098607,24298040344）</div>
                        <div class="introduce">2、可输入多个商品的链接，回车分隔或连续输入都可以</div>
                        <div class="introduce">3、商品ID是天猫/淘宝商品链接里https://item.jd.com/11320871935.htm的一串数字</div>
                    </div>
                </el-form>
            </div>
        </div>
        <div class="mbottom">
            <div class="goods-fitter">
                <el-form ref="form" :model="form" label-width="260px" size="small">
                    <div class="search-wrapper">
                        <h4 class="title">采集步骤</h4><br/>
                        <el-form-item label="批量商品ID:">
                            <el-input type="textarea" :rows="4" v-model="form.productUrl" style='width:600px'
                                      placeholder="请输入ID"></el-input>
                            <span class="gaunjianzi">（输入多个ID，用半角逗号或回车隔开，或多个商品链接）</span>
                        </el-form-item>
                        <el-form-item label="采集评论:">
                            <el-checkbox v-model="checked">采集（评论为10~50的随机数）</el-checkbox>
                        </el-form-item>
                        <el-form-item label="产品分类:">
                            <treeselect
                                style="width:300px"
                                :disabled="disabledshow"
                                :options="categoryList"
                                :disable-branch-nodes="true"
                                placeholder="请选择商品分类"
                                v-model="form.cat_id"
                                :clearable="false"
                                @select="handleSelect($event)"
                            />
                            <!--<el-input v-model="form.name" style='width:400px' placeholder="请输入商品类别"></el-input>-->
                            <!--<el-button type="primary" size="small" class="btn">搜索</el-button>-->
                        </el-form-item>
                        <el-form-item label="属性类型:">
                            <el-select v-model="form.id" filterable placeholder="请选择属性类型"
                                       @change="handleChange($event)">
                                <el-option v-for="(item,index) in typeList" :key="index" :label="item.name"
                                           :value="item.id"
                                >
                                </el-option>
                            </el-select>
                            <!--<el-input v-model="form.name" style='width:400px' placeholder="请输入属性类型"></el-input>-->
                            <!--<el-button type="primary" size="small" class="btn">搜索</el-button>-->
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" size="small" @click="postData"
                                       v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="采集中,请稍后~">立刻采集
                            </el-button>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    /*getTreecatagory, getType 树形分类,属性类型两个接口没有*/
    import {taobaoDataCollect,getTreecatagory, getType} from '@/api/product/index'
    import Treeselect from "@riophae/vue-treeselect";
    // import the styles
    import "@riophae/vue-treeselect/dist/vue-treeselect.css";

    export default {
        components: {
            Treeselect
        },
        data() {
            return {
                form: {
                    cat_id: null, // 商品分类id
                    id: "", //属性id
                    productUrl: ''//链接
                },
                checked: '',
                disabledshow: false, //是否禁用分类
                categoryList: [], // 分类
                typeList: [], // 分类
                list: [],
                newlist: [],
                fullscreenLoading: false
            }
        },
        created() {
            this._getCatagory();
            this._getType()
        },
        computed: {},
        methods: {
            handleSelect(event) {
                this.form.cat_id = event.id
                console.log(222, event)//id
                this.list.forEach((item1, index1) => {
                    item1.children.forEach((item2, index2) => {
                        item2.children.forEach((item3, index3) => {
                            if (item3.catId == event.id) {
                                this.newlist = [item1.catId, item2.catId, item3.catId]
                            }
                        })
                    })
                })
            },
            //获取商品分类
            _getCatagory() {
                // let obj = {};
                // obj.type = "SELECT";
                // obj.parentId = 0;
                getTreecatagory().then(res => {
                    console.log(444, res.data)
                    this.list = JSON.parse(JSON.stringify(res.data))
                    console.log(this.list)
                    this.transleteData(res.data, this.categoryList);
                    this.IterationDelateMenuChildren(this.categoryList);

                });
            },
            transleteData(data, arr) {
                data.forEach(item => {
                    // if(!item.parentId){
                    //     item.parentId = 0
                    //     item.parentName = '所有部门'
                    // }
                    const msg = {
                        id: item.catId,
                        label: item.catName,
                        value: item.catId,
                        children: item.children ? [] : null,
                        isLeaf: item.children ? false : true
                    };
                    if (item.children && item.children.length > 0) {
                        this.transleteData(item.children, msg.children);
                    }
                    arr.push(msg);
                });
                return arr;
            },
            IterationDelateMenuChildren(arr) {
                if (arr.length) {
                    for (let i in arr) {
                        if (arr[i].children.length) {
                            this.IterationDelateMenuChildren(arr[i].children);
                        } else {
                            delete arr[i].children;
                        }
                    }
                }
                return arr;
            },

            _getType() {
                let obj = {}
                obj.pageIndex = 1
                obj.pageSize = 10000

                getType(obj).then(res => {
                    console.log(555, res.data)
                    if (res.code === 200) {
                        res.data.pageList.forEach(item => {
                            this.typeList.push({"id": item.goodsTypeId, "name": item.typeName});
                        });
                    }
                });
            },
            handleChange(event) {
                console.log(999, event, this.form.id)
            },
            //采集提交
            postData() {
                this.fullscreenLoading = true;
                let obj = {}
                // this.form.cat_id =this.newlist.join(',')
                console.log(777, this.form.goods)
                //12313↵↵123↵2354
                var demo = this.form.productUrl.replace(/(\n){1,}/g, ",");
                console.log(3333, demo)
                // obj = Object.assign({}, this.form)
                obj.cat_id = this.newlist.join(',')
                obj.id = this.form.id
                obj.productUrl = demo
                try {
                    taobaoDataCollect(obj).then(res => {
                        if (res.code == 200) {
                            this.fullscreenLoading = false;
                            this.form.productUrl=''
                            this.$message.success(res.message)
                        }else {
                            this.fullscreenLoading = false;
                        }
                    }).catch(error=>{
                        this.fullscreenLoading = false;
                        // this.$message.error(error)
                    })
                } catch (e) {
                    this.fullscreenLoading = false;
                    // this.$message.error(e)
                    // this.$message.error("采集失败")
                }
            }

        },
        watch: {
            res(res) {
                this.disabledshow = true;
                let color = res.data.goods.goodsNameStyle.split("+")[0];
                let style = res.data.goods.goodsNameStyle.split("+")[1];
                this.form.goods_name = res.data.goods.goodsName; // 商品名称
                this.form.goods_name_color = color; // 商品名称颜色
                this.form.goods_name_style = style; // 商品名称字体样式
                this.form.dis = true; // 控制树形的选择
                this.form.goods_sn = res.data.goods.goodsSn; // 商品货号
                this.form.goods_branch = res.data.goods.brandId; // 商品品牌
                this.colorshow = true;
                this.form.model_number = res.data.goods.modelNumber; // 型号
                this.form.goods_weight = res.data.goods.goodsWeight; // 商品重量
                this.form.cat_id = res.data.goods.catId; // 商品分类
                this.form.tax = res.data.goods.taxRate; // 税率
                this.form.supplier = res.data.goods.supplierId; // 供应商ID
                let arrA = [];
                arrA = this.form.gift;
                for (var q = 0; q < arrA.length; q++) {
                    console.log(arrA[q]);
                    for (var w = 0; w < arrA[q].children.length; w++) {
                        console.log(arrA[q].children[w].sceneId);
                    }
                }

                this.form.gift.forEach(item => {
                    console.log(item);
                    item.children.forEach(data => {
                        res.data.goods.sceneIds.forEach(data2 => {
                            if (data.sceneId == data2) {
                                item.Giftmodel.push(data2);
                            }
                        });
                    });
                });
                this.form.gift = arrA; // 供应商ID
                this.form.domains[0].ppt_price = res.data.goods.pptPrice; // PPT价格
                this.form.domains[0].discount_price = res.data.goods.preferentialPrice; // 最低价
                this.form.domains[0].guidancePrice = res.data.goods.minimumPrice; // 最低价
                this.form.domains[0].jd_link = res.data.goods.jdGoodsUrl; // 京东链接
                this.form.domains[0].jd_price = res.data.goods.jdPrice; // 京东价格
                this.form.domains[0].tmailGoodsUrl = res.data.goods.tm_link; // 天猫链接
                this.form.domains[0].tmallPrice = res.data.goods.tm_price; // 天猫价格
                let aaArr = [];
                if (res.data.gallery.galleryes != null) {
                    res.data.gallery.galleryes.forEach(item => {
                        // 相册
                        aaArr.push({
                            imgId: item.imgId,
                            url: item.imgUrl,
                            imgDesc: item.imgDesc
                        });
                    });
                }
                this.imgArr = JSON.parse(JSON.stringify(aaArr));
                this.form.first_image_url = JSON.parse(JSON.stringify(aaArr));
                let arr = [];
                if (res.data.goods.skus != null) {
                    res.data.goods.skus.forEach(item => {
                        var count = 0;
                        let str = "";
                        let idstr = "";

                        item.specList.forEach((dataValue, indexnum) => {
                            if (indexnum < item.specList.length - 1) {
                                str += dataValue.specValue + "-";
                                idstr += dataValue.specValueId + ",";
                            } else {
                                str += dataValue.specValue;
                                idstr += dataValue.specValueId;
                            }
                            let valueArr = [];

                            arr.push({
                                options: [],
                                specName: dataValue.specName,
                                specId: dataValue.specId,
                                show: false,
                                content: valueArr,
                                tent: "",
                                val: "", //选中后对应的id
                                state: true // 判断是否第一次选中
                            });

                            valueArr.push({
                                specValue: dataValue.specValue,
                                specValueId: dataValue.specValueId
                            });
                        });
                        this.form.tableData.push({
                            specValue: str,
                            specValueId: idstr,
                            tip_price: item.marketPrice, //市场价
                            cost_price: item.costPrice, //一件代发价
                            freight: "", //运费
                            skuId: item.skuId, //skuId
                            isSubstituteSales: item.isSubstituteSales, //是否支持一件代发
                            goodsThumbnailImgUrl: item.goodsThumbnailImgUrl, // 上传的图片路径
                            guidancePrice: item.guidancePrice, //指导销售价
                            inventory_number: item.goodsNumber, //库存
                            warn_number: item.warnNumber, //库存预警
                            volumeNumber1: item.volumePrices[0].volumeNumber, //起订量1
                            volumeCost1: item.volumePrices[0].volumeCost, //集采批发价1
                            volumeCarriage1: item.volumePrices[0].volumeCarriage, //运费1
                            volumeNumber2: item.volumePrices[1].volumeNumber, //起订量2
                            volumeCost2: item.volumePrices[1].volumeCost, //集采批发价2
                            volumeCarriage2: item.volumePrices[1].volumeCarriage, //运费2
                            volumeNumber3:
                                item.volumePrices[2] == undefined
                                    ? ""
                                    : item.volumePrices[2].volumeNumber, //起订量3
                            volumeCost3:
                                item.volumePrices[2] == undefined
                                    ? ""
                                    : item.volumePrices[2].volumeCost, //集采批发价3
                            volumeCarriage3:
                                item.volumePrices[2] == undefined
                                    ? ""
                                    : item.volumePrices[2].volumeCarriage, //运费3
                            volumeNumber4:
                                item.volumePrices[3] == undefined
                                    ? ""
                                    : item.volumePrices[3].volumeNumber, //起订量4
                            volumeCost4:
                                item.volumePrices[3] == undefined
                                    ? ""
                                    : item.volumePrices[3].volumeCost, //集采批发价4
                            volumeCarriage4:
                                item.volumePrices[3] == undefined
                                    ? ""
                                    : item.volumePrices[3].volumeCarriage, //运费4
                            state: 1 // 控制运费一键代发
                        });

                        item.specList.forEach((dataValue, indexnum) => {
                            if (dataValue.specName == "颜色") {
                                item.specList.splice(indexnum, 1);
                                item.specList.unshift(dataValue);
                            }
                        });

                        //先加入content中
                        for (var k = 0; k < arr.length; k++) {
                            for (var j = k + 1; j < arr.length; j++) {
                                if (arr[k].specId == arr[j].specId) {
                                    //如果第一个等于第二个，splice方法删除第二个
                                    arr[k].content.forEach(item => {
                                        arr[j].content.forEach(data => {
                                            if (item.specValueId != data.specValueId) {
                                                arr[k].content.push(data);
                                            }
                                        });
                                    });
                                    // arr.splice(j,1);
                                    // j--;
                                }
                            }
                        }
                        // 去除相同的数据
                        for (var h = 0; h < arr.length; h++) {
                            for (var l = h + 1; l < arr.length; l++) {
                                if (arr[h].specId == arr[l].specId) {
                                    //如果第一个等于第二个，splice方法删除第二个
                                    arr.splice(l, 1);
                                    l--;
                                }
                            }
                        }
                        // 去除content中相同的数据

                        for (var u = 0; u < arr.length; u++) {
                            let arrArr = arr[u].content;
                            for (var p = 0; p < arrArr.length; p++) {
                                for (var o = p + 1; o < arrArr.length; o++) {
                                    if (arrArr[p].specValueId == arrArr[o].specValueId) {
                                        //如果第一个等于第二个，splice方法删除第二个
                                        arrArr.splice(o, 1);
                                        o--;
                                    }
                                }
                            }
                        }
                        this.form.arrbig = arr;
                    });
                }
            }
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
        }

        .el-select-width {
            max-width: 130px;
            margin-right: 5px;
        }

        .el-input-width {
            display: inline-block;
            max-width: 180px;
        }

        .btn-toggle {
            margin-left: 10px;
            font-size: 14px;
            color: $themeColor;
            cursor: pointer;
        }
    }

    .goods-list-wrapper {
        margin-top: 20px;
    }

    .el-transfer-panel__header {
        background: $themeColor;
        color: #fff;
    }

    .item {
        line-height: 1.5;
        padding: 8px 10px;
        cursor: pointer;

        &:hover {
            color: $themeColor;
        }

        &.active {
            background: #c6e2ff;
            color: #fff;
        }
    }

    .image {
        cursor: pointer;
    }

    .item-name {
        cursor: pointer;

        &:hover {
            color: $themeColor;
        }
    }

    .el-icon-arrow-right {
        margin: 0 20px;
    }

    .store {
        width: 310px;
    }

    .red {
        color: $themeSubColor;
    }

    .transfer-wrapper {
        text-align: center;
    }

    .panel-wrapper {
        text-align: left;
        margin: 0;
        padding: 6px 0;
        list-style: none;
        height: 246px;
        overflow: auto;
        box-sizing: border-box;
    }

    .dialog-footer {
        margin-top: 20px;
        text-align: right;
    }

    .btn {
        margin-left: 20px
    }

    .caiji {
        color: red
    }

    .gaunjianzi {
        margin-left: 20px;
        color: red
    }

    .danwei {
        margin-left: 10px;
    }

    .introduce {
        color: #97999F;
        font-size: 100%;
        line-height: 25px;

    }

    /deep/ .el-select > .el-input {
        width: 300px;
    }
</style>
