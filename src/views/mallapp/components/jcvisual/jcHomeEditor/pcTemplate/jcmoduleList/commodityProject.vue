<comment>
		#商品专题
</comment>
<template>
		<div class="area">
				<div style="width: 1220px">
						<div v-for="(element,index) in newArr" class="areatmplateContaier">
								<component :is="element.componentCode" class="areatemplate" :newArr='newArr[index]'
													 :activity="activity"/>
						</div>
				</div>
		</div>
</template>

<script>
    import commodityProject1 from './commodityProject/commodityProject1'
    import commodityProject2 from './commodityProject/commodityProject2'

    export default {
        props: ['newArr', 'activity'],
        data() {
            return {}
        },
        components:{
            commodityProject1,
            commodityProject2,
        }
    }
</script>

<style lang="scss" scoped>
		.area {
				width: 1200px;
				margin: 24px auto;
				overflow: hidden;
		}

		.areatemplate {
				float: left;
				width: 49%;
		}
</style>
