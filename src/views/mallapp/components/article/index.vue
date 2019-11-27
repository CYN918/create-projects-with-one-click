<template>
    <div class="preview">
        <!--<ul class="previewList">-->
            <!--<li v-for="(item,index) in previewArr" :key="index" @click="tabList(componentArr[index],index)" :class="{'active':index==num}">-->
                <!--{{item}}-->
            <!--</li>-->
            <!--<div>-->
            <!--</div>-->
        <!--</ul>-->
        <!--<div class="component">-->
            <!--<component :is="currentView"></component>-->
        <!--</div>-->
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
    </div>
</template>
<script>
    import adList from './adList/index'
    import adPlacement from './adPlacement/index'
    import articleClassification from './articleClassification/index'
    import articlManagement from './articlManagement/index'
    export default {
        components:{
            adList,
            adPlacement,
            articleClassification,
            articlManagement,
        },
        data() {
            return {
                currentView:adList,
                componentArr:['adList','adPlacement','articleClassification','articlManagement'],
                previewArr:['广告列表','广告分类','文章分类','文章列表',],
                num:0,
            }
        },
        methods:{
            tabList(item,index){
                this.num = index
                this.currentView = item
            }
        }
    }
</script>
<style lang="scss">
    .preview{
        display: flex;
        width: 110px;
        background: white;
        height: 100%;
        .previewList{
            width: 100%;
            li{
                margin: 10px auto;
                width: 90px;
                height: 40px;
                text-align: center;
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
        .component{
            margin-left: 39px;
            margin-top: 39px;
        }

    }
</style>