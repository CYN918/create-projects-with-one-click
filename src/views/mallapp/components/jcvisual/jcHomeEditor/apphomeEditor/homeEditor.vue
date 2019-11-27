<template>
    <div class="homeContainer">
        <div class="home">
            <appTemplate></appTemplate>
        </div>
        <Componet1 v-show="false"/>
        <Componet2 v-show="false"/>
        <Componet5 v-show="false"/>
        <componet4/>
    </div>
</template>
<script>
import  Componet5 from './componet5'
import  Componet1 from './componet1'
import  Componet2 from './componet2'
import  componet4 from './componet3'
import  appTemplate from './appTemplate'
   export default {
    components:{
        appTemplate,
        Componet5,
        Componet1,
        Componet2,
        componet4
    },
   }
</script>
<style lang="scss">
.homeContainer{
    display: flex;
    .home{
        border: 1px solid #ccc;
        width: 750px;
    }

}

</style>