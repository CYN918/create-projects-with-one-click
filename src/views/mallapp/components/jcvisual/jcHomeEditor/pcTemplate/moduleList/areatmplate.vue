<template>
  <div class="area">
    <div style="width: 1220px">
        <div v-for="(element,index) in newArr"  class="areatmplateContaier">
            <component :is="element.componentCode" class="areatmplate" :newArr="newArr[index]" :activity="activity"/>
        </div>
    </div>
  </div>
</template>

<script>
import weekly_selection  from './weeklySelection'
import birthday_area  from './birthdayArea'
import holiday_area  from './holidayArea'
export default {
    props:['newArr','activity'],
    data(){
        return {
            myArray:[
                {
                    name:'weekly_selection',
                    id:1,
                },
                {
                    name:'birthday_area',
                    id:2,
                },
                {
                    name:'holiday_area',
                    id:3,
                }
            ],
            copyMyArray:[],
            newArrs:[]
        }
    },
    created(){
       this.copyMyArray = [...this.myArray]
        this.newArrs = this.newArr[6]
    },
    methods:{
        reduction(){
            this.myArray = [...this.copyMyArray]
        }
    },
    components:{
        weekly_selection,
        birthday_area,
        holiday_area,
    },

}
</script>

<style lang="scss" scoped>
.area{
    border: 1px solid white;
    width: 1200px;
    margin: 24px auto;
    overflow: hidden;
    }

.areatmplate{
    width: 33%;
    float: left;
}

</style>
