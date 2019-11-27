<template>
		<div class="margin">
			<div class="headerContainer">
					<div class="marginheader">
						<img src="@/common/images/application/jd1.png" alt="">
						<div class="marginheaderLeft">
							<p class="text">天津开发区岳泰经贸发展有限公司</p>
							<div class="renzheng">
								<span>已认证</span>
								<img src="@/common/images/application/jd1.png" alt="">
							</div>
						</div>
					</div>
				</div>
			<div class="marginConten">
				<div class="marginContenWrap" v-for="item in serviceList.list">
					<div class="marginContenT">
						<img :src=item.logo alt="">
						<div class="marginContenTright">
							<span>{{item.applyName}}</span>
							<span :title="item.introduction">{{item.introduction}}</span>
						</div>
					</div>
					<div class="marginContenB">
						<span class="canBeCreated">可创建: 0</span>
						<span class="created">已创建:25</span>
						<span class="iconfont icon-bofang" @click="gotoApplication"></span>
					</div>
				</div>
			</div>
		</div>
</template>
<script>
	import {getServiceList} from "@/api/service";
	export default {
		data(){
			return{
				serviceList:[]
			}
		},
		methods:{
			gotoApplication(){
				this.$router.push('/application/index')
			}
		},
		async created(){
			const data = {
				pageNum:1,
				pageSize:6
			}
			const res = await getServiceList(data)
			if(res.code=== 200) {
				this.serviceList = res.data
			}

		}
	}
</script>
<style lang="scss" scoped>
.margin{
	width: 100%;
	.headerContainer{
		background: white;
		width: 100%;
		height: 100px;
		overflow: hidden;
		.marginheader{
			height: 60px;
			width: 100%;
			margin-top: 15px;
			margin-left: 20px;
			display: flex;
			img{
				width: 50px;
				height: 50px;
				border-radius: 50%;
			}
			.marginheaderLeft{
				margin-left: 20px;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				.text{
					font-size: 20px;
					font-weight: bold;
				}
				.renzheng{
					display: flex;
					span{
						display: inline-block;
						width: 60px;
						height: 25px;
						font-size: 14px;
						text-align: center;
						line-height: 25px;
						color: white;
						display: flex;
						background: #FF9146;
						border-radius: 4px;
						flex-direction: column;
					}
					img{
						width: 100px;
						height: 25px;
						margin-left: 22px;
					}
				}
			}
		}
	}
	.marginConten{
		width: 100%;
		margin-top: 20px;
		.marginContenWrap{
			float: left;
			width:325px ;
			margin-right: 30px;
			box-sizing: border-box;
			padding: 10px;
			background: white;
			margin-bottom: 30px;
			.marginContenT{
				width: 100%;
				display: flex;;
				img{
					width: 100px;
					height: 80px;
				}
				.marginContenTright{
					margin-left: 20px;
					height: 80px;
					display: flex;
					flex-direction: column;
					justify-content: space-around;
					span{
						&:nth-child(1){
							font-size: 18px;
							font-weight: 500;
						}
						&:nth-child(2){
							text-overflow: ellipsis;
							overflow: hidden;
							display: -webkit-box;
							-webkit-box-orient: vertical;
						  　-webkit-line-clamp: 3;
							display: inline-block;
							width: 185px;
							height: 39px;
							font-size: 12px;
							color: #3C3D2D;
						}
					}
				}

			}
			.marginContenB{
				margin-top: 25px;
				font-size: 18px;
				font-weight: 600;
				display: flex;
				justify-content: space-around;
				img{
					width: 20px;
					height: 20px;
				}
				.icon-bofang{
					font-size: 20px;
					color:#4E81EF ;
					cursor: pointer;
				}
			}
		}

	}
}
</style>
