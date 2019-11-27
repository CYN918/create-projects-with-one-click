<template>
   <div v-if="newArr[0].componentStatus==0">
       <div>
           <div class="limit-area center" :style="{background:form.bgcolor}" v-if="isshow" @mouseenter="isShowBtn=true"  @mouseleave="isShowBtn=false">
               <ul class="clearfix">
                   <li class="limit-item time-wrapper" :style="{background:form.bgcolor}">
                       <p class="top-tit">{{advertisingSlogan}}</p>
                       <p class="sub-tit" style="width:170px">{{form.title}}</p>
                       <p class="line"></p>
                       <div class="time-tit">
                           <img src="@/common/images/homeEitd/icon-timer.png" alt="">
                           <span>距结束仅剩</span>
                       </div>
                       <div class="timer">
                           <span class="timer-item">{{h||'00'}}</span>
                           <span class="spice">:</span>
                           <span class="timer-item">{{m||'00'}}</span>
                           <span class="spice">:</span>
                           <span class="timer-item">{{s||'00'}}</span>
                       </div>
                   </li>
                   <li class="limit-item" v-for="(item,index) in activityHomepageGoodsReturns" :key="index">
                       <div class="image">
                           <img :src=item.skuImg alt="">
                       </div>
                       <p class="name">{{item.goodsName}}</p>
                       <p class="progress">
                           <i :style="`width:${(item.goodsNumber-item.enableQuantity)/item.goodsNumber.toFixed(2)*100}%`"></i>
                       </p>
                       <p class="price">
                           <span class="new-price">商城价￥{{item.salePrice}}</span>
                           <span class="old-price">￥{{item.ustomaryPrice}}</span>
                       </p>
                   </li>
               </ul>
               <p class="setting" v-show="isShowBtn">
                   <span class="edit" @click="splikeEdit">编辑</span>
                   <span class="delete" @click="delehandele">删除</span>
               </p>
           </div>

           <!--弹窗-->
           <el-dialog
                   title="秒杀专区编辑"
                   :visible.sync="dialogVisible"
                   width="957px"
           >
               <div class="basicContainer">
                   <p class="basicText">基础信息</p>
                   <div class="basicInformation">
                       <el-form ref="form" :model="form" label-width="80px">
                           <el-row :gutter="72">
                               <el-col :span="10">
                                   <el-form-item label="活动名称:">
                                       <el-input v-model="advertisingSlogan"></el-input>
                                   </el-form-item>
                               </el-col>
                               <el-col :span="10">
                                   <el-form-item label="活动链接:">
                                       <el-input v-model="form.urlLink"></el-input>
                                   </el-form-item>
                               </el-col>
                           </el-row>
                           <el-row>
                               <el-col :span="10">
                                   <el-form-item label="广告标语:">
                                       <el-input v-model="form.title"></el-input>
                                   </el-form-item>
                               </el-col>
                           </el-row>
                           <el-row>
                               <el-col :span="10">
                                   <el-form-item label="主调色:">
                                       <el-color-picker
                                               v-model="form.bgcolor"
                                                size="small"
                                               popper-class="选择背景色"
                                       ></el-color-picker>
                                   </el-form-item>
                               </el-col>
                               <el-col :span="10">
                              <span class="bgk">
                                  主题色为活动界面的背景。
                              </span>
                               </el-col>
                           </el-row>
                           <div v-if="false">
                               <el-row>
                                   <div class="block">
                                       <el-form-item label="活动时间:">
                                           <el-date-picker
                                                   v-model="activityTime"
                                                   type="datetimerange"
                                                   start-placeholder="开始日期"
                                                   end-placeholder="结束日期"
                                                   @change="handleTime"
                                                   :default-time="['12:00:00']">
                                           </el-date-picker>
                                       </el-form-item>
                                   </div>
                               </el-row>
                           </div>
                       </el-form>
                   </div>
               </div>
               <div slot="footer" class="homeClassification">
                   <p class="basicText"><span>首页分类</span></p>
                   <div class="zhuanti">
                       <div style="margin:20px 0" v-if="false">
                           <span>商品专题:</span>
                           <!--<el-select class="inp" v-model="value" placeholder="请选择">-->
                               <!--<el-option>-->
                               <!--</el-option>-->
                           <!--</el-select>-->
                           <el-button type="primary">关联商品专题</el-button>
                       </div>
                       <div>
                           <el-table
                                   @selection-change = hanldeSelection
                                   :data="tableData.pageList"
                                   style="width: 100%"
                                   border
                           >
                               <el-table-column
                                       type="selection"
                                       width="50">
                               </el-table-column>
                               <el-table-column
                                       align="center"
                                       type="index"
                                       label="编号"
                                       width="50">
                               </el-table-column>
                               <el-table-column
                                       align="center"
                                       prop="name"
                                       label="商品图片"
                                       width="180">
                                   <template slot-scope="scope">
                                       <img :src=scope.row.skuImg alt="" width="100px" height="100px">
                                   </template>
                               </el-table-column>
                               <el-table-column
                                   align="center"
                                   prop="goodsName"
                                   label="商品信息">
                               </el-table-column>
                               <el-table-column
                                       align="center"
                                       label="价格信息">
                                   <template slot-scope="scope">
                                       <p> 原价:{{scope.row.ustomaryPrice}}</p>
                                       <p> 商城价:{{scope.row.salePrice}}</p>
                                   </template>
                               </el-table-column>
                               <el-table-column
                                       align="center"
                                       prop="goodsNumber"
                                       label="库存">
                               </el-table-column>
                           </el-table>
                       </div>
                       <div style="text-align: right;margin-top: 20px" v-if="tableData">
                           <el-pagination
                                   @size-change="handleSizeChange"
                                   @current-change="handleCurrentChange"
                                   :page-size="tableData.page.pageSize"
                                   layout="total, sizes, prev, pager, next, jumper"
                                   :total="tableData.count">
                           </el-pagination>
                       </div>
                   </div>
               </div>
               <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="handleConfrim">确 定</el-button>
          </span>
           </el-dialog>
       </div>
   </div>
</template>
<script>
    import { updateComponent ,getactivityGoods} from  '@/api/mallapp/homeEditor'
export default {
    props:['newArr','activity'],
    data(){
        return{
            isShowBtn:false,
            isshow:true,
            tableData:'',
            value:'',
            dialogVisible:false,
            advertisingSlogan:'', //活动名称
            form:{
                urlLink:'',
                title:'',
                bgcolor:'',
                createTime:'',
                endTime:'',
            },
            activityTime:'',
            activityProduct:{
                 activityId:'',
                 pageIndex: 1,
                 pageSize: 10
             },
            activityGoods:[], //选中的商品
            componentId:'',
            contentId:'',
            activityHomepageGoodsReturns:[],
            h:'',
            m:'',
            s:'',
            flag:false
        }
    },

    watch:{
         activity(val){
            val.forEach(item=>{
                if(item.activityTypeNum===1){
                    this.form.endTime = item.entTime
                    this.activityProduct.activityId = item.activityId
                    this.getactivityGoods()
                }
            })
        },
    },

    async mounted(){
         this.componentId = this.newArr[0].componentId
         await this.getActivity()
        const endTime=this.form.endTime
        this.time = setInterval(()=>{
            if(this.flag == true){
                this.advertisingSlogan = '活动已停止'
                clearInterval(this.time)
            }
            this.timeDown(endTime)
        },1000)
    },

    methods:{
        getActivity(){
            let content =this.newArr[0].componentContents
            if(content.length==0){
                content.push({
                    componentId:this.componentId,
                    content:'[]',
                    type:4,
                    sortOrder:0,
                    contentStatus:0,
                    picture:'1 ',
                    title:' ',
                })
            }
            let contentArr
            this.advertisingSlogan = content[0].title
            contentArr =JSON.parse(content[0].content)
            this.activityHomepageGoodsReturns = contentArr.activityGoods
            this.form={
                urlLink:contentArr.urlLink,
                title:contentArr.title,
                bgcolor:contentArr.bgcolor,
                createTime:contentArr.createTime,
                endTime:contentArr.endTime
            }
        },
       // 获取商品信息
       async getactivityGoods(){
            const res = await getactivityGoods(this.activityProduct)
            if(res.code === 200 ){
                this.tableData = res.data
            }
        },

        //倒计时
        timeDown (data) {
            const endTime = new Date(data)
            const startTime = new Date();
            let leftTime = parseInt((endTime.getTime()-startTime.getTime())/1000)
            let h = this.formate(parseInt(leftTime/(60*60)%24))
            let m = this.formate(parseInt(leftTime/60%60))
            let s = this.formate(parseInt(leftTime%60))
            if(leftTime <= 0){
                this.flag = true
            }
            this.h=h
            this.m=m
            this.s=s
        },
        formate (time) {
            if(time>=10){
                return time
            }else{
                return `0${time}`
            }
        },

        //获取商品
        hanldeSelection(val){
           this.activityGoods = val
        },

        //取消商品
        canceldialogVisible(){
            this.dialogVisible = false
        },
        //获取时间
        handleTime(val){
            this.timers = val
            let createTime = new Date(val[0])
            let endTime = new Date(val[1])
            this.form.createTime =this.formatDate(createTime)
            this.form.endTime =this.formatDate(endTime)
        },
        formatTen(num) {
            return num > 9 ? (num + "") : ("0" + num);
        },
        formatDate(dateTime) {
            let date = new Date(dateTime)
            const year = date.getFullYear();
            const month = date.getMonth() + 1;
            const day = date.getDate();
            const hour = date.getHours();
            const minute = date.getMinutes();
            const second = date.getSeconds();
            return year + "-" + this.formatTen(month) + "-" + this.formatTen(day)+ " " +this.formatTen(hour)+ ":" +this.formatTen(minute)+ ":" +this.formatTen(second);
        },

    //删除
        delehandele(){
            const componentId = this.newArr[0].componentId
            this.$confirm('此结构被删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.isshow = false
                this.$emit('delete',componentId)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },
        //确认
        async handleConfrim(){
            let contentId
            if(this.newArr[0].componentContents.length>0){
                contentId  =this.newArr[0].componentContents[0].contentId
            }else{
                contentId = null
            }
            const spikeactivity={
                urlLink:this.form.urlLink,
                title:this.form.title,
                bgcolor:this.form.bgcolor,
                createTime:this.form.createTime,
                endTime:this.form.endTime,
                activityGoods:this.activityGoods
            }
            this.dialogVisible = false
            const obj={
                contentId:contentId,
                componentId:this.componentId,
                content:JSON.stringify(spikeactivity),
                type:4,
                sortOrder:0,
                contentStatus:0,
                picture:'1 ',
                title:this.advertisingSlogan,
            }
            const res = await updateComponent(obj)
            if(res.code=== 200 ){
                this.$message({
                    type:'success',
                    message:'编辑成功'
                })
            }else{
                this.$message({
                    type:'info',
                    message:'编辑失败'
                })
            }
        },
        handleSizeChange(val){
            this.activityProduct.pageSize = val
            this.getactivityGoods()
        },
        handleCurrentChange(val){
            this.activityProduct.pageIndex = val
            this.getactivityGoods()
        },
        splikeEdit(){
            this.dialogVisible = true
        }
    }
}
</script>
<style lang="scss" scoped>
    .homeClassification{
        background: white;
        padding: 24px 0;
        margin-top: 18px;
        margin-bottom: 15px;
    }
    .limit-area {
        position: relative;
        padding: 12px;
        margin-bottom: 30px;
        border-radius: 8px;
        background: #ef4f4f;
    }
    .limit-area ul {
        padding-bottom: 20px;
        background: #fff;
    }
    .limit-area .limit-item {
        float: left;
        width: 235px;
        height: 262px;
        padding: 20px 38px 0;
        box-sizing: border-box;
        background: #fff;
    }
    .limit-area .limit-item .image {
        position: relative;
        margin-bottom: 10px;
    }
    .limit-area .limit-item .image::after {
        display: block;
        content: '';
        width: 100%;
        padding-top: 100%;
    }
    .limit-area .limit-item .image img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
    }
    .limit-area .limit-item .name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 15px;
        text-align: center;
    }
    .limit-area .limit-item .name:hover {
        color: #b62323;
    }
    .limit-area .limit-item .progress {
        height: 7px;
        margin-bottom: 15px;
        border-radius: 3px;
        background: #e8e8e8;
    }
    .limit-area .limit-item .progress i {
        display: block;
        height: 100%;
        background: #ed4f48;
        border-radius: 3px;
    }

    .limit-area .limit-item .price {
        text-align: center;
        font-size: 14px;
    }
    .limit-area .limit-item .price .new-price {
        color: #b62323;
        margin-right: 10px;
    }
    .limit-area .limit-item .price .old-price{
        text-decoration:line-through;
    }
    .limit-area .limit-item.time-wrapper {
        background: #ef4f4f;
        color: #fff;
    }
    .limit-area .limit-item.time-wrapper .top-tit {
        margin-bottom: 10px;
        font-size: 30px;
        font-weight: 700;
    }
    .limit-area .limit-item.time-wrapper .sub-tit {
        margin-bottom: 10px;
        font-size: 18px;
    }
    .limit-area .limit-item.time-wrapper .line {
        width: 35px;
        height: 4px;
        background: #fff;
    }
    .limit-area .limit-item.time-wrapper .time-tit {
        margin-top: 40px;
        margin-bottom: 20px;
        font-size: 20px;
    }
    .limit-area .limit-item.time-wrapper .time-tit img {
        width: 22px;
        height: 22px;
        margin-right:10px ;
        vertical-align: top;
    }
    .limit-area .limit-item.time-wrapper .time-tit span {
        line-height: 22px;
    }
    .limit-area .limit-item.time-wrapper .timer .timer-item {
        display: inline-block;
        width: 42px;
        height: 42px;
        border-radius: 5px;
        background: #333;
        font-size: 26px;
        font-weight: 700;
        text-align: center;
        line-height: 42px;
    }
    .limit-area .limit-item.time-wrapper .timer .spice {
        font-size: 26px;
        font-weight: 700;
        text-align: center;
        line-height: 42px;
    }
    .setting{
        position: absolute;
        left: 0;
        top: 0;
        span{
            cursor: pointer;
            display: inline-block;
            width:56px;
            height:32px;
            line-height: 32px;
            text-align: center;
            background:rgba(76,134,244,1);
            border-radius:3px;
            font-size:12px;
            font-family:Microsoft YaHei;
            font-weight:400;
            color:rgba(255,255,255,1);
        }
        .edit{
            margin-right: 14px;
        }
    }
/deep/.el-dialog__body{
    padding-left: 0;
}
/deep/ .el-dialog__footer{
    padding: 10px 0 20px;
}
.center{
    width: 1200px;
    margin: 24px auto;
    .area{
        display: flex;
        justify-content: center;
    }
}
.basicContainer {
    .basicText {
        padding-left: 18px;
        border-left: 4px solid #5494F6;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 20px;
    }
    .basicInformation {
        padding-left: 22px;
        .bgk {
            margin-top: 12px;
            display: inline-block;
            margin-left: -45px;
            font-size: 12px;
            font-family: Microsoft YaHei;
            font-weight: 400;
            color: rgba(196, 198, 204, 1);
        }
    }
}
.homeClassification{
    .basicText{
        text-align: left;
        padding-left: 18px;
        border-left: 4px solid #5494F6;
        font-size: 14px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
        margin-bottom: 20px;
    }
    .zhuanti{
        text-align: left;
        margin-left: 21px;
    }
    .inp{
        margin: 0 20px;
    }
}
</style>
