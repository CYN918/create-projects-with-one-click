<template>
	<div class="margin">
		<div class="mbottom">
				<div class="goods-fitter">
						<div class="logoHeader">
								<img :src="headImgUrl||'http://img.fyuanai.com/test/2019-10-30/735059c4fcee4611951f881585e9320d-zzzzzzzzz.jpg'" alt="">
								<div class="logoRight">
										<p class="company">{{userName}}</p>
										<p>
											<span class="verified">已认证</span>
											<span v-if="show1" @click="toLevelDetail(1)" class="topPic"><img class="start" src="../../../common/images/service/small.png" /> 员福会员<span>></span></span>
											<span v-if="show2" @click="toLevelDetail(2)" class="topPic topPic1"><img class="start" src="../../../common/images/service/start.png" /> 铜福会员<span>></span></span>
											<span v-if="show3" @click="toLevelDetail(3)" class="topPic topPic2"><img class="start" src="../../../common/images/service/start.png" /> 银福会员<span>></span></span>
											<span v-if="show4" @click="toLevelDetail(4)" class="topPic topPic3"><img class="start" src="../../../common/images/service/start.png" /> 金福会员<span>></span></span>
										</p>
								</div>
						</div>
				</div>
		</div>
		<div class="cardContainer">
				<p class="myServer">
						<span>我的服务</span>
				</p>
				<div class="serverList">
						<div class="serverItme" v-for="(item,index) in list">
								<img :src=item.logo alt="">
								<p class="shangcheng">{{item.applyName}}</p>
								<div class="mallList">
										<p>
												<span>{{'已搭建'+item.applyName}}</span>
												<span>{{item.createPermission.createdNumber}}个</span>
										</p>
										<p>
												<span>{{'可搭建'+item.applyName}}</span>
												<span>{{item.createPermission.canCreatedNumber}}个</span>
										</p>
								</div>
								<!--                    <span :class="arr[index]==0?'activt btn':'btn'"  @click="projectList(index)">创建{{arrList[index]}}</span>-->
								<span v-if="item.createPermission.create" class="btn" @click="projectList(index)">创建{{item.applyName}}</span>
								<span v-else class="active btn" @click="updateService(index)">去升级</span>
						</div>
				</div>
		</div>
	</div>
</template>

<script>
    import {getMyServiceList , getGradePurchase , getMyGradeInfo} from "@/api/service";
    export default {
        data() {
            return {
                arrList: ['积分商城', '员工福利', '企业集采', '平台对接', '礼品卡册', 'ERP系统', '分销商城'],
                arr: [2, 2, 0, 6, 0, 3, 6],
                arrListAll: [
                    {
                        name: '已搭建积分商城',
                        name1: "可搭建积分商城"
                    },
                    {
                        name: '已搭员工福利系统',
                        name1: "可搭员工福利系统"
                    },
                    {
                        name: '已搭建企业集采系统',
                        name1: "可搭建企业集采系统"
                    },
                    {
                        name: '已搭建积平台对接系统',
                        name1: "可搭建积分商城"
                    }, {
                        name: '已搭建礼品卡册系统',
                        name1: "可搭建礼品卡册系统"
                    },
                    {
                        name: '已搭建ERP管理系统',
                        name1: "可搭建ERP管理系统"
                    },
                    {
                        name: '已搭建分销商城',
                        name1: "可搭建分销商城"
                    },

                ],
                arrImg: [
                    {src: require("@/common/images/service/serve1.png")},
                    {src: require("@/common/images/service/serve2.png")},
                    {src: require("@/common/images/service/serve3.png")},
                    {src: require("@/common/images/service/serve4.png")},
                    {src: require("@/common/images/service/serve5.png")},
                    {src: require("@/common/images/service/serve6.png")},
                    {src: require("@/common/images/service/serve7.png")},
                ],
                num: 3,
                userName: '',
                userImg: '',
                agencyId:'',
				userImg: '',    
				agencyId:'',
				list: null,
				show1:false,
				show2:false,
				show3:false,
				show4:false,

                list: null,
                gradeInfo: {},
            }
        },
        created() {
			this.getmyserviceList()
			
			this._getMyGradeInfo();
            const res = JSON.parse(localStorage.getItem('user'))
            this.userName = res.data.sysuserName
			this.headImgUrl = res.data.headImgUrl
			this.agencyId = res.data.sysuserId
			// 获取等级
			this.getAgency()
        },
        methods: {
            //获取我的服务数据
            getmyserviceList() {
                getMyServiceList().then(res => {
                    if (res.code == 200) {
                        this.list = res.data
                    }
                })
			},
			// 获取用户等级
			getAgency(){
                getGradePurchase().then( ).then( res =>{
					if( res.data !== null ){
                       	if( res.data.gradeNo == 1 ){
						this.show1 = true
						this.show2 = false
						this.show3 = false
						this.show4 = false
						}else if( res.data.gradeNo == 3 ){
							this.show1 = false
							this.show2 = true
							this.show3 = false
							this.show4 = false
						}else if( res.data.gradeNo == 3 ){
							this.show1 = false
							this.show2 = false
							this.show3 = true
							this.show4 = false
						}else if( res.data.gradeNo == 4 ){
							this.show1 = false
							this.show2 = false
							this.show3 = false
							this.show4 = true
						}
					}
				})
			},
			//跳转等级详情
			toLevelDetail(index){
				this.$router.push({ name: 'leveldetail',query:{gradeNo:index}})
			},
            //获取我的等级数据
			_getMyGradeInfo() {
				getMyGradeInfo().then(res => {
                    if (res.code == 200) {
                        this.gradeInfo = res.data;
                        if(!this.gradeInfo){
                        	this.gradeInfo={};
						}
                    }
                })
            },
            //跳到项目列表
            projectList(index) {
                this.$router.push({
                    path: '/application/index',
                    query: {num: index}
                })
            },
            //升级
            updateService(index) {
                this.$router.push({
                    path: 'myservice/myserviceServiceGrade',
                    query: {num: index}
                })
            }
        }
    };
</script>

<style lang="scss" scoped>
		@import "@/common/scss/variable.scss";

		.goods-fitter {
				background: white;
				box-sizing: border-box;
				padding: 37px 0 37px 57px;

				.logoHeader {
						display: flex;

						img {
								width: 80px;
								height: 80px;
								margin-right: 27px;
						}

						.logoRight {
								display: flex;
								flex-direction: column;
								justify-content: space-around;

								.company {
										font-size: 20px;
										font-family: Microsoft YaHei;
										font-weight: bold;
										color: rgba(60, 60, 60, 1);
								}

								.verified {
										display: inline-block;
										width: 70px;
										height: 32px;
										text-align: center;
										line-height: 32px;
										background: rgba(255, 145, 70, 1);
										font-size: 14px;
										font-family: Microsoft YaHei;
										font-weight: 400;
										color: rgba(255, 255, 255, 1);
										margin-right: 20px;
										border-radius: 3px;
								}

						}
				}
		}

		.cardContainer {
				padding-top: 11px;
				background: white;

				.myServer {
						span {
								border-left: 4px solid rgba(74, 153, 250, 1);
								padding-left: 18px;
								font-size: 16px;
								font-family: Microsoft YaHei;
								font-weight: 400;
								color: rgba(51, 51, 51, 1);
						}
				}

				.serverList {
						overflow: hidden;
						margin-top: 30px;
						padding: 15px 49px;

						.serverItme {
								float: left;
								margin-right: 64px;
								margin-bottom: 39px;
								padding: 19px 16px;
								width: 307px;
								border-radius: 8px;
								border: 1px solid rgba(76, 134, 244, 1);

								img {
										width: 276px;
										height: 137px;
								}

								.shangcheng {
										text-align: center;
										font-size: 15px;
										font-family: Microsoft YaHei;
										font-weight: 400;
										color: rgba(69, 69, 69, 1);
										border-bottom: 1px solid rgba(216, 235, 254, 1);
										padding-bottom: 10px;
								}

								.mallList {
										padding: 18px 0;
										font-size: 13px;
										font-family: Microsoft YaHei;
										font-weight: 400;
										color: rgba(102, 102, 102, 1);
										line-height: 26px;

										p {
												display: flex;
												justify-content: space-between;
										}
								}

								.btn {
										cursor: pointer;
										display: inline-block;
										text-align: center;
										line-height: 32px;
										width: 276px;
										height: 32px;
										background: rgba(76, 134, 244, 1);
										font-size: 16px;
										font-family: Microsoft YaHei;
										font-weight: 400;
										color: rgba(255, 255, 255, 1);

										&.active {
												background: rgb(240, 175, 48)
										}
								}

						}
				}

		}
    	.topPic{
			display: inline-block;
			width: 111px;
            height: 32px;
			background-size: 100% 100%;
            line-height: 32px;
		   	background: url('../../../common/images/service/service4.png');
            color: #fff;
			background-repeat: no-repeat;
			vertical-align: top;
			font-size: 14px;
			cursor: pointer;
			margin-right: 20px;
			.start{
			width: 10px !important;
			margin:0 0 0 12px  !important;
			height: auto !important;
			}
			span{
				padding-left: 10px;
			}
		}
		.topPic1{
        	background: url('../../../common/images/service/service1.png');
			background-repeat: no-repeat;
		}
		.topPic2{
	    	background: url('../../../common/images/service/service2.png');
			background-repeat: no-repeat;
		}
		.topPic3{
		 	background: url('../../../common/images/service/service3.png');
		    background-repeat: no-repeat;
		}

</style>
