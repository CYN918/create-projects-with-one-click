<comment>
    #好货抢先购&折扣专区
</comment>
<template>
    <div class="area">
        <div style="width: 1220px">
            <div v-for="(element,index) in newArr" class="areatmplateContaier">
                <component :is="element.componentCode" class="areatmplate" :newArr = 'newArr[index]' :activity="activity"/>
            </div>
        </div>
    </div>
</template>

<script>
    import fight_group  from './fighting'
    import good_goods_snapped_up from './preemptivePurchase'
    export default {
        props:['newArr','activity'],
        data(){
            return {
                myArray:[
                    {
                        name:'fight_group',
                        id:1,
                    },
                    {
                        name:'good_goods_snapped_up',
                        id:2,
                    }
                ]
            }
        },
        components:{
            fight_group,
            good_goods_snapped_up,
        }
    }
</script>

<style lang="scss" scoped>
    .area{
        width: 1200px;
        margin: 24px auto;
        overflow: hidden;
    }

    .areatmplate{
        float: left;
        width: 49%;
    }
</style>
