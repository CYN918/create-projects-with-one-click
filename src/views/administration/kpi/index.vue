<template>
    <div>
        <table align="center" cellspacing='0'>
            <tr>
                <th>评论项目</th>
                <th>权重</th>
                <th  colspan="4">具体内容</th>
                <th>个人自评</th>
                <th>主核考人</th>
                <th>再上一级核考人</th>
            </tr>
            <tr>
                <td rowspan="9" valign="middle">工作业绩</td>
                <td rowspan="9" valign="middle">30</td>
                <td colspan="4" valign="middle" class="matters">一、KPI指数（量化指标,如有）</td>
                <td rowspan="9"></td>
                <td rowspan="9"></td>
                <td rowspan="9"></td>
            </tr>
            <tr>
                <td>考核内容</td>
                <td>单价</td>
                <td>单价</td>
            </tr>
            <tr>
                <td>苹果</td>
                <td>3公斤</td>
                <td>5元/公斤</td>
                <td>15元</td>
            </tr>
            <tr>
                <td>香蕉</td>
                <td>2公斤</td>
                <td>6元/公斤</td>
                <td>12元</td>
            </tr>
            <tr>
                <td>香蕉</td>
                <td>2公斤</td>
                <td>6元/公斤</td>
                <td>12元</td>
            </tr>
            <tr>
                <td>香蕉</td>
                <td>2公斤</td>
                <td>6元/公斤</td>
                <td>12元</td>
            </tr>
            <tr>
                <td>香蕉</td>
                <td>2公斤</td>
                <td>6元/公斤</td>
                <td>12元</td>
            </tr>
            <tr>
                <td>香蕉</td>
                <td>2公斤</td>
                <td>6元/公斤</td>
                <td>12元</td>
            </tr>
            <tr>
                <td>香蕉</td>
                <td>2公斤</td>
                <td>6元/公斤</td>
                <td>12元</td>
            </tr>
            <tr>
                <td colspan="3" class="bor-bottom">总价</td>
                <td  class="bor-bottom">27元</td>
            </tr>
        </table>
    </div>
</template>
<script>
export default{
    data(){
        return{

        }
    },
    methods:{
    },
    created(){
        
    }
}
</script>
<style lang='scss' scoped>
*{
    margin: 0;
    padding: 0;
}
table{
    width: 100%;
    border-right: 1px solid red;
    tr{
        vertical-align: middle !important;
        text-align: center;
    }
    th{
        height: 48px;
        padding: 12px 0;
        border: 1px solid red;
        text-align: center;
        vertical-align: middle !important;
        border-bottom: none;
        border-right: none;
        color: #3C9DF5;
        font-weight: bold;
    }
    td{
        height: 48px;
        padding: 12px 0;
        border: 1px solid red;
        text-align: center;
        vertical-align: middle !important;
        border-bottom: none;
        border-right: none;
    }
    .bor-bottom{
        border-bottom: 1px solid red;
    }
    .bor-right{
        border-bottom: 1px solid red;
    }
    .matters{
        text-align: left;
        padding-left: 12px;
    }
}
</style>