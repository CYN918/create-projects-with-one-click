<template>
    <div>
        <el-dialog :visible.sync="goVisible" width="40%"   :before-close="createClosing">
        <div class="mbottom">
          <div class="goods-fitter">
            <el-form label-width="100px" size="small">
              <div class="search-wrapper">
                <h4 class="title">进度表</h4>
              </div>
            </el-form>
          </div>
        </div>
        <div class="mail-fitter" style="border: 1px solid rgb(215, 224, 241);padding:20px;padding-left:50px;position:relative;">   
                
                        <div class="block">
                            <ul class="title">
                                <li>
                                     
                                    <div class="one">
                                        <div class="inOne">
                                            1                                       
                                        </div>
                                       
                                    </div>
                    
                                </li>
                            <div  v-for="(item,index) in auditList" :key="index"
                            v-show="auditList.length!==0">
                                <li class="father">
                                      <el-form ref="infoForm"  label-width="60px" size="small">  
                                        <div class="title">
                                            <span class="message1" v-show="item.permission===1">提交：</span>
                                            <span class="message1" v-show="item.permission!==1">审核：</span>
                                             <span class="message2">部门：{{item.organizeName}}</span> 
                                             <span class="message2" v-show="item.permission===1">提交人：{{item.userName}}</span>
                                             <span class="message2" v-show="item.permission!==1">审核人：{{item.userName}}</span>  
                                             <span class="message2">职位：{{item.position}}</span>
                                        </div>
                                          <div class="rightInner">
                                        
                                        <div class="time" :class="item.end===0?'active':''">
                                            <p class="timeColor">{{item.submitTime}}</p>
                                            <p class="timeFont" :class="item.result=='审批不通过'?'showColor':''"  v-show="item.permission!==1"> 审批结果：{{item.result}}      
                                                
                                                <el-button size="small" type="danger" style="float:right;" @click="urgent(index)" class="run" :class="showIndex===index?'showActive':''">加急处理</el-button>
                                            </p>
                                            <p style="margin-bottom:5px;" v-show="item.permission===1"> {{item.result}}</p>
                                            <div style="overflow:hidden;">
                                                <div class="reason" :class="item.result=='审批不通过'?'reasonShow':''">
                                                    原因：
                                                </div>
                                                <div class="content">
                                                        <el-input 
                                                        type="textarea"
                                                        v-model="item.comment"
                                                        :autosize="{ minRows: 4, maxRows: 4}"
                                                        placeholder="请输入内容"
                                                        readonly
                                                        resize="none"
                                                        ></el-input> 
                                                </div>
                                            </div>
                                            <div style="height:1px;"> 
                                            
                                            </div>

                                        </div>
                                     
                                          </div>
                                      </el-form>
                                    
                                   
                                </li>
                                 <li>
                                     
                                    <div class="two">
                                        <div class="inOne">
                                            {{index+2}}                                     
                                        </div>
                                       
                                    </div>
                    
                                </li>
                            </div>
                            <div v-show="auditList.length===0" class="noMessage">
                                    暂无审核信息
                            </div>                    
                            </ul>
                      </div>
              
                        

                   
                 
           
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="createClose()" size="small">关 闭</el-button>
        </span>
      </el-dialog>
    </div>    
</template>

<script>
import {allPlanUrgent} from "@/api/purchase/index"
import { throttleTipPop } from "@/utils/functions.js";
export default {
    data(){
        return{
            showIndex:'',
            goVisible:false,
            auditList :[],//审核数据
            orderId1:'',
            no:'',
           form:[

           ],
        }

    },

    props:['goVisibles','auditData','orderId',"billNo"],
    watch:{
        goVisibles(val){
            this.goVisible = val
        },
        auditData(val){
            let copy = JSON.parse(JSON.stringify(val));
            this.auditList = copy;
      
        },
        orderId(val){
            this.orderId1 = val;
        },
        billNo(val){
            this.no =val;
        },
        "auditList":{
            handler(val){
                 this.showIndex = val.map(o=>o.end).indexOf(0);
            }
        }
    },
    methods:{

            createClose() {
                this.goVisible = false;
                this.$emit("createCloseG", this.goVisible);
                },
            createClosing() {
                this.goVisible = false;
                this.$emit("createClosingG", this.goVisible);
                },
            //加急处理
            urgent(index){
                let obj ={};
                obj.type = 6;
                obj.userId =  this.auditList[index].userId;
                obj.no= this.no;
                allPlanUrgent(obj).then(res=>{
                    if(res.code===200){
                        throttleTipPop(this, "success","操作成功！", 2000);
                    }
                })
            }
            
    }
}
</script>

<style lang="scss" scoped>
@import "@/common/scss/variable.scss";
    .search-wrapper {
        padding: 20px;
        padding-bottom: 10px;
        border: 1px solid rgb(215, 224, 241);
        background: #fff;
        .title {
          margin-left: -20px;
          font-size: 16px;
          color: 3333;
          padding-left: 10px;
          line-height: 1.4;
          border-left: 4px solid $themeColor;
          margin-bottom: 10px;
        }
        .title1 {
          margin-left: -20px;
          font-size: 16px;
          color: 3333;
          padding-left: 10px;
          line-height: 1.4;
          border-left: 4px solid $themeColor;
          margin-bottom: 10px;
        }
      }
    .block{
        .title{
            li{
                display: block;
            }
            .one{
                display:inline-block;
                width:30px;
                height: 30px;
                background: #F0F3FA;
                border-radius: 50%;
                position: relative;
                top:-1px;
                
                .inOne{
                    margin: 0 auto;
                    margin-top:6px;
                    line-height: 18px;
                    width:18px;
                    height: 18px;
                    background: #5494F6;
                    border-radius: 50%;
                    text-align: center;
                    z-index: 99;
                    color: #fff;
                   
                }
            }
             .two{
                display:inline-block;
                width:30px;
                height: 30px;
                background: #F0F3FA;
                border-radius: 50%;
                position: relative;
                z-index: 0;
                margin-top:-10px;
                .inOne{
                    margin: 0 auto;
                    margin-top:6px;
                    line-height: 18px;
                    width:18px;
                    height: 18px;
                    background: #5494F6;
                    border-radius: 50%;
                    text-align: center;
                    z-index: 99;
                    color: #fff;
                   
                }
            }
            .father{
                height:auto; 
                position: relative;
                
                   
                }
                .title{
                    position: absolute;
                    left: 40px;
                    top:-24px;
                    .message1{
                           width: 60px;
                            display: inline-block;
                            padding-bottom: 10px;
                            position: relative;
                            top: -3px;
                    }
                    .message2{
                        width: 158px;
                        display: inline-block;
                        overflow: hidden;/*超出部分隐藏*/
                        white-space: nowrap;/*不换行*/
                        text-overflow:ellipsis;/*超出部分文字以...显示*/
                        margin-right: 10px;
                        
                    }
                } 
            }
      
        }
    
        .rightInner{
            display: inline-block;
            margin-left:9px;
            border-left: 12px solid #F0F3FA;
            padding:0 20px;
            margin-top:-2px;
            width: 100%;
            .time{
                border-left: 6px solid #5494F6;
                margin-left: -29px;
                padding: 0 20px;
                min-height: 130px;
            }
            .active{
                border-left: 0;
                margin-left: -29px;
                padding: 0 20px;
                min-height: 130px;
            }
        }
        .timeFont{
            margin-bottom:5px;
            overflow:hidden;
        }
        .showColor{
            color:crimson;
        }
        .timeColor{
            font-size:12px;
            font-family:Microsoft YaHei;
            font-weight:400;
            line-height:17px;
            color:rgba(220,223,230,1);
            margin-bottom: 5px;
        }
        .noMessage{
            position: absolute;
                    left: 90px;
                    top: 26px
        }
        .mail-fitter{
            background: #fff;
        }
        .reason{
            float: left;
            margin-top: 7px;
            margin-right: 4px;
        }
        .reasonShow{
            color:crimson
        }
        .content{
            width: 80%;
            float: left;   
        }
        .run{
            display: none;
        }
        .showActive{
            display: block;
        }
</style>