<template>
    <div class="wrap">
       <!-- <div class="headerContainer"> -->
       <!-- </div> -->
        <!-- <p class="text">以上为网页头部区域</p> -->
        <!-- <div class="center"> -->
            <draggable  @update="datadragEnd" v-model="newArr"   group="people" scroll="true" @scrollFn="handleScroll" @start="drag=true" @end="drag=false">
                <div v-for="(element,index) in newArr" :key="index">
                    <component :is="element[0].componentCode" @delete="deleteComponent" :newArr="element"/>
                </div>
            </draggable>
            <!-- <ProductList/>
            <SpikeActivity/> -->
            <!-- <PreemptivePurchase/> -->
            <!-- <button @click="block">看看参数</button> -->
            <!-- <SpecialArea/>
            <DiscountArea/> -->
        <!-- </div> -->
        <p class="text">以下为网页底部区域</p>
        <!-- <Footer/> -->
        <!-- <draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
            <div v-for="element in myArray" :key="element.id">{{element.name}}</div>
        </draggable> -->
    </div>
</template>
<script>

import {getHomeDetails,updateList  } from '@/api/mallapp/homeEditor'
import draggable from 'vuedraggable'
import big_top_nav  from './moduleList/headerNav'
import big_header  from './moduleList/headerSearch'
import big_banner from './moduleList/banner'
import top_categories from './moduleList/productList'
import show_spike  from './moduleList/spikeActivity'
import  good_goods_snapped_up   from './moduleList/fightingDoods'
import weekly_selection  from './moduleList/areatmplate'
import special_area  from './moduleList/specialArea'
import discount_area  from './moduleList/discountArea'
import big_footer  from './moduleList/footer'
import  holiday_area  from './moduleList/holidayArea'
import  fight_group from './moduleList/fighting.vue'
import birthday_area from './moduleList/birthdayArea'
export default {
    data(){
        return {
            areatmplate:[],
            myArray:[
                {name:big_top_nav},
                {name:big_header},
                {name:big_banner},
                {name:top_categories},
                {name:show_spike},
                {name:good_goods_snapped_up},
                {name:weekly_selection},
                {name:special_area},
                {name:discount_area},
                {name:big_footer}
            ],
            homeEidtList:[],
            newArr:[],
            newArrCopy:[]
        }
    },
     async  created() {
        this.getHomeList()
    },
    methods: {
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
                console.log(this.newArr)
            }
            this.$store.commit('SET_HOME',this.homeEidtList)
        },

        //获取数组移动之后的结构
        datadragEnd(){
            this.newArr.forEach((item,index)=>{
                item.forEach(items=>{
                    items.sortOrder = index
                })
            })
        },
        handleScroll(event){
            console.log(event)
        },
        // this.$bus.on('deleteComponent',componentId)
        deleteComponent(componentId){
            this.newArr.forEach((item,index)=>{
                item.forEach(items=>{
                    if(componentId==items.componentId){
                      items.componentStatus = 2
                    }
                })
            })
        },

        //保存
        async saveHome(){
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

            //    还原
            reduction(){
                this.$nextTick(() => {
                    this.newArr=[...this.newArrCopy]
                })
            }
        },
    components:{
        big_top_nav,
        big_header,
        big_banner,
        top_categories,
        show_spike,
        good_goods_snapped_up,
        weekly_selection,
        special_area,
        discount_area,
        big_footer,
        holiday_area,
        fight_group,
        birthday_area,
        draggable,
    },
}
</script>
<style lang="scss" scoped>
.text{
    margin-bottom: 20px;
    font-size:12px;
    font-family:Microsoft YaHei;
    font-weight:400;
    color:rgba(60,60,60,1);
    text-align: center;
}
.center{
    width: 1200px;
    margin: 24px auto;
    .area{
        display: flex;
        justify-content: center;
    }
}
</style>
