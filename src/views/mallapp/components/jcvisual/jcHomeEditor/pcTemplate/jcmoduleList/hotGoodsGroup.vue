<comment>
		#热爆商品&拼团
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
    import hot_goods from './hotGoodsGroup/hotGoods'
    import spell_group from './hotGoodsGroup/spellGroup'

    export default {
        props: ['newArr', 'activity'],
        components: {hot_goods, spell_group,},
        data() {
            return {
                myArray: [
                    {
                        name: 'hot_goods',
                        id: 1,
                    },
                    {
                        name: 'spell_group',
                        id: 2,
                    }
                ],

            }
        },
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
