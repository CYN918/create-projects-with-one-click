<template>
    <div class="preview">
        <!--<ul class="previewList">-->
        <!--<li @click="isShowSidebar"><span>展开侧边栏</span></li>-->
        <!--</ul>-->
        <div class="baseModule">
            <div class="baseModuleCenter">
                <div class="baseModuleContainer">
                    <div class="set">
                        <img src="@/common/images/homeEitd/shezhi.png" alt="" >
                        <span>基础模块</span>
                    </div>
                    <div class="baseModuleList">
                        <draggable
                                v-model="filterComponents"
                                group="people"
                                class="dragArea"
                                :options='{sort: false,pull:"clone"}'
                                @start="drag=true"
                                @end="handleUpdate"
                                :move="handlemove"
                        >
                            <div class="baseModuleListLeft" v-for="(item,index) in filterComponents" :key="index">
                                <div v-for="children in item">
                                    <div class="commoneContainer">
                                        <!--<img :src=imgList[index].img alt="">-->
                                        <span>{{children.componentName}}</span>
                                    </div>
                                </div>
                            </div>
                        </draggable>
                    </div>
                </div>
            </div>
        </div>
        <div class="tabNavContainer">
            <div class="prompt">
                <div class="promptLeft">
                    <img src="@/common/images/homeEitd/xiaoshou.png" alt="">
                    <span>选择所需模块，并拖动至相应位置</span>
                </div>
                <div class="promptRight">
                    <div class="previews" @click="gohtml">
                        <img src="@/common/images/homeEitd/yulan.png" alt="">
                        <span>进入商城</span>
                    </div>
                    <div class="cancel">
                        <div @click="reduction">
                            <img src="@/common/images/homeEitd/quxiao.png" alt="">
                            <span>还原</span>
                        </div>
                    </div>
                    <span class="confrim" @click="saveGroup">保存</span>
                </div>
            </div>
            <div class="component">
                <draggable   @update="datadragEnd"  v-model="newArr" ref="newArrList"  group="people"   @start="drag=true" @end="drag=false">
                    <div v-for="(element,index) in newArr" :key="index">
                        <component :is="element[0].componentCode" @delete="deleteComponent" :newArr="element" :activity="activityList"/>
                    </div>
                </draggable>
            </div>
        </div>
    </div>
</template>
<script>
    import {getHomeDetails,updateList ,getActivity } from '@/api/mallapp/homeEditor'
    // import HomeEditor from './pcTemplate/index.vue'
    import draggable from 'vuedraggable'
    import big_top_nav  from './pcTemplate//moduleList/headerNav'
    import big_header  from './pcTemplate/moduleList/headerSearch'
    import big_banner from './pcTemplate/moduleList/banner'
    import top_categories from './pcTemplate/moduleList/productList'
    import show_spike  from './pcTemplate/moduleList/spikeActivity'
    import  fight_group   from './pcTemplate/moduleList/fightingDoods'
    import  good_goods_snapped_up   from './pcTemplate/moduleList/fightingDoods'
    import weekly_selection  from './pcTemplate/moduleList/areatmplate'
    import holiday_area  from './pcTemplate/moduleList/areatmplate'
    import special_area  from './pcTemplate/moduleList/specialArea'
    import discount_area  from './pcTemplate/moduleList/discountArea'
    import big_footer  from './pcTemplate/moduleList/footer'
    import birthday_area from './pcTemplate/moduleList/areatmplate'
    export default {
        components:{
            // HomeEditor,
            big_top_nav,
            birthday_area,
            weekly_selection,
            big_header,
            big_banner,
            top_categories,
            show_spike,
            good_goods_snapped_up,
            holiday_area,
            special_area,
            discount_area,
            big_footer,
            fight_group,
            birthday_area,
            draggable,
        },
        data() {
            return {
                imgList:[
                    {
                        img:require("@/common/images/homeEitd/qianbi.png"),
                        name:'首页头部',
                        componentName:"big_top_nav"
                    },
                    {
                        img:require("@/common/images/homeEitd/zhekou.png"),
                        name:'轮播图片',
                        componentName:'big_banner'
                    },
                    {
                        img:require("@/common/images/homeEitd/banner.png"),
                        name:'搜索栏',
                        componentName:'big_header'
                    },
                    {
                        img:require("@/common/images/homeEitd/fenlei.png"),
                        name:'热门分类',
                        componentName:'top_categories'
                    },
                    {
                        img:require("@/common/images/homeEitd/miaosha.png" ),
                        name:'限时秒杀',
                        componentName:'show_spike'
                    },
                    {
                        img:require("@/common/images/homeEitd/good.png"),
                        name:'好货抢购',
                        componentName:'good_goods_snapped_up'
                    },
                    {
                        img:require("@/common/images/homeEitd/cart.png"),
                        name:'拼团',
                        componentName:'fight_group'
                    },
                    {
                        img:require("@/common/images/homeEitd/brerthday.png"),
                        name:'生日专区',
                        componentName:'birthday_area'
                    },
                    {
                        img:require("@/common/images/homeEitd/jieri.png"),
                        name:'节日专区',
                        componentName:'birthday_area'
                    },
                    {
                        img:require("@/common/images/homeEitd/dibu.png"),
                        name:'首页底部',
                        componentName:'big_footer'
                    },

                ],
                homeEidtList:[],
                newArr:[],
                newArrCopy:[],
                filterComponents:[],
                componentId:'',
                component:'',
                componentStatus:'',
                notArr:[],
                arrList:[],
                activityList:[],
            }
        },
        async created() {
            await this.getHomeList()
            this.filterComponent()
            const res = await getActivity()
            if(res.code === 200 ){
                this.activityList = res.data
            }
        },
        methods:{
            //添加之后重新排序  进行筛选
            handleUpdate(){
                this.datadragEnd()
            },
            //移动出后删除
            handlemove(evt){
               const  componentId = evt.draggedContext.element[0].componentId
                this.notArr.forEach((item,index)=>{
                    item.forEach((items)=>{
                        if(componentId ===items.componentId) {
                            this.notArr.splice(index, 1)
                        }
                    })
                })
            },
            // 筛选已有的组件
            filterComponent(){
              this.filterComponents =JSON.parse(JSON.stringify(this.notArr))
              this.filterComponents.forEach(item=>{
                  item.forEach((items)=>{
                      items.componentStatus = 0
                  })
              })
            },
            //筛选
            async getHomeList(){
                const projectId = '220988752988737536'
                const res = await getHomeDetails(projectId)
                if (res.code === 200) {
                    this.homeEidtList = res.data.components
                    let newArr = [];
                    this.homeEidtList.forEach((value, index, array) => {
                        if(newArr.length==0){
                            newArr.push([value]);
                        } else if(value.sortOrder==newArr[newArr.length-1][0].sortOrder){
                            newArr[newArr.length-1].push(value);
                        } else {
                            newArr.push([value]);
                        }
                    })
                    this.newArr = newArr
                    this.newArrCopy=[...this.newArr]
                    this.newArr.forEach((item,index)=>{
                       item.forEach(items=>{
                           if(items.componentStatus===2){
                               this.notArr.push(item)
                               this.$nextTick(()=>{
                                   this.newArr.splice(index,1)
                               })
                           }
                       })
                    })
                }
            },

            //获取数组移动之后的结构
            datadragEnd(){
                this.newArr.forEach((item,index)=>{
                    item.forEach(items=>{
                        items.sortOrder = index
                    })
                })
            },

            deleteComponent(componentId){
                this.newArr.forEach((item,index)=>{
                    item.forEach((items,indexs)=>{
                        if(componentId==items.componentId){
                            this.newArr.splice(index,1)
                            items.componentStatus = 2
                            this.notArr.push(item);
                            this.notArr.forEach(newArritem=>{
                                newArritem.forEach(childrenItem=> {
                                   childrenItem.sortOrder = -childrenItem.sortOrder
                                })
                            })
                       }
                    })
                })
                setTimeout(()=>{
                    this.filterComponent()
                })
            },
            //保存
            async saveGroup(){
                if (this.notArr.length > 0) {
                    this.notArr.forEach(item => {
                        item.forEach(items => {
                            items.componentStatus = 2
                            console.log(items)
                        })
                    })
                }
                this.newArr = this.newArr.concat(this.notArr || [])
                let pageComponentModifyParamList=[]
                this.newArr.forEach(item=>{
                        item.forEach(items=>{
                        const obj = {
                            componentId:items.componentId,
                            sortOrder:items.sortOrder,
                            componentStatus:items.componentStatus,
                            remark:'',
                        }
                        pageComponentModifyParamList.push(obj)
                    })
                })
                const res = await updateList(pageComponentModifyParamList)
                if(res.code === 200 ){
                    this.$message({
                        type:'success',
                        message:'修改成功'
                    })
                    this.getHomeList()
                }
            },

            //点击还原
            reduction(){
                this.$nextTick(()=>{
                   this.newArr =[...this.newArrCopy]
                })
            },
            gohtml(){
                let BASE_URL = ''
                if (process.env.NODE_ENV === 'development') {
                    BASE_URL = `http://www.maige.com`
                }else if(location.hostname == 'bg.test.fyuanai.com'){
                    BASE_URL = `http://c.test.fyuanai.com`
                } else {
                    BASE_URL = `http://${location.hostname}`
                }
                window.open(BASE_URL,'_blank')
            }
        }
    }
</script>
<style lang="scss" scoped>
    .preview{
        display: flex;
        width: 100%;
        .previewList{
            li{
                margin: 10px 0;
                width: 90px;
                height: 40px;
                text-align: left;
                line-height: 40px;
                font-size:13px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(60,60,60,1);
                cursor: default;
                &.active{
                    background:#4C86F4 ;
                    color: white;
                }
            }
        }
        .baseModule{
            background:rgba(255,255,255,1);
            box-shadow:0px 2px 6px 0px rgba(0,5,14,0.1);
            width: 180px;
            .baseModuleCenter{
                width: 161px;
                margin: 0 auto;
                position: fixed;
                z-index: 888,
            }
        }
        .tabNavContainer{
            width: 100%;
            .tabNavWrap{
                margin: 28px auto;
                width:1001px;
                overflow: hidden;
                .tabNav{
                    width:1002px;
                    height:40px;
                    border:1px solid rgba(76,134,244,1);
                    border-radius:4px;
                    .moudelList{
                        cursor: pointer;
                        border-right: 1px solid rgba(76,134,244,1);
                        float: left;
                        width: 200px;
                        height: 40px;
                        text-align: center;
                        line-height: 40px;
                        font-size:16px;
                        font-family:Microsoft YaHei;
                        font-weight:400;
                        color:rgba(76,134,244,1);
                        &.activet{
                            background:rgba(76, 134, 244, 1) ;
                            color:rgba(255,255,255,1);
                        }
                    }
                }
            }
            .prompt{
                display: flex;
                justify-content: space-between;
                margin: 30px auto;
                width:1594px;
                height:66px;
                line-height: 66px;
                background:rgba(255,255,255,1);
                border:1px solid rgba(214,222,239,1);
                font-size:14px;
                font-family:Microsoft YaHei;
                font-weight:400;
                color:rgba(76,134,244,1);
                .promptLeft{
                    margin-left: 21px;
                    img{
                        margin-right: 10px;
                        width: 16px;
                        height: 20px;
                    }
                }
                .promptRight{
                    width: 355px;
                    display: flex;
                    justify-content: space-around;
                    .previews,.cancel{
                        cursor: pointer;
                        img{
                            cursor: pointer;
                            margin-right: 10px;
                        }
                    }
                    .cancel{
                        div{
                            display: inline;
                            padding: 0 20px;
                            border-left: 1px solid rgba(220, 223, 230, 1);
                            border-right: 1px solid rgba(220, 223, 230, 1)
                        }
                    }
                    .confrim{
                        margin-top: 17px;
                        cursor: pointer;
                        width:68px;
                        height:32px;
                        text-align: center;
                        line-height: 32px;
                        background:rgba(76,134,244,1);
                        border-radius:3px;
                        font-size:12px;
                        font-family:Microsoft YaHei;
                        font-weight:400;
                        color:rgba(255,255,255,1);
                    }
                }
            }
        }
    }
    .baseModuleContainer{
        margin-top: 14px;
        width: 100%;
        font-size:14px;
        font-family:Microsoft YaHei;
        font-weight:400;
        color:rgba(96,98,102,1);
        .set{
            display: flex;
            justify-content: center;
            align-items: center;
            width:161px;
            height:48px;
            background:rgba(240,243,250,1);
            img{
                background: white;
                margin-right: 10px;
                width:15px;
                height:15px;
                background: white;
                cursor: default;
            }
        }
        .baseModuleList{
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            width: 100%;
            .baseModuleListLeft{
                cursor: move;
                margin: 7px 0;
                width:65px;
                height:70px;
                background:rgba(247,250,255,1);
                border:1px solid rgba(227,232,243,1);
                display: flex;
                justify-content: space-around;
                align-items: center;
                flex-direction: column;
                img{
                    cursor: pointer;
                    width: 24px;
                    height: 24px;
                }
            }
        }
    }
    .dragArea{
        display: flex;
        flex-wrap:wrap;
        justify-content:space-around;
    }
.commoneContainer{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img{
        margin-bottom: 6px;
    }
}
</style>

