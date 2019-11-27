<template>
		<div class="preview">
				<!--<ul class="previewList">-->
				<!--<li @click="isShowSidebar"><span>展开侧边栏</span></li>-->
				<!--</ul>-->
				<div class="baseModule">
						<div class="baseModuleCenter">
								<div class="baseModuleContainer">
										<div class="set">
												<img src="@/common/images/homeEitd/shezhi.png" alt="">
												<span>基础模块</span>
										</div>
										<div class="baseModuleList">
												<draggable
														v-model="filterComponents"
														group="people"
														class="dragArea"
														:options='{sort: false,pull:"clone"}'
														@start="drag=true"
														@end="handleUpdate"
														:move="handlemove"
												>
														<div class="baseModuleListLeft" v-for="(item,index) in filterComponents" :key="index">
																<div v-for="children in item">
																		<div class="commoneContainer">
																				<!--<img :src=imgList[index].img alt="">-->
																				<span>{{children.componentName}}</span>
																		</div>
																</div>
														</div>
												</draggable>
										</div>
								</div>
						</div>
				</div>
				<div class="tabNavContainer">
						<div class="prompt">
								<div class="promptLeft">
										<img src="@/common/images/homeEitd/xiaoshou.png" alt="">
										<span>选择所需模块，并拖动至相应位置</span>
								</div>
								<div class="promptRight">
										<div class="previews" @click="gohtml">
												<img src="@/common/images/homeEitd/yulan.png" alt="">
												<span>进入商城</span>
										</div>
										<div class="cancel">
												<div @click="reduction">
														<img src="@/common/images/homeEitd/quxiao.png" alt="">
														<span>还原</span>
												</div>
										</div>
										<span class="confrim" @click="saveGroup">保存</span>
								</div>
						</div>
						<div class="component">
								<draggable @update="datadragEnd" v-model="newArr" ref="newArrList" group="people" @start="drag=true"
													 @end="drag=false">
										<div v-for="(element,index) in newArr" :key="index">
												<component :is="element[0].componentCode" @delete="deleteComponent" :newArr="element"
																	 :activity="activityList"/>
										</div>
								</draggable>
						</div>
				</div>
		</div>
</template>
<script>
    import {getHomeDetails2, updateList, getActivity} from '@/api/mallapp/homeEditor'
    // import HomeEditor from './pcTemplate/index.vue'
    import draggable from 'vuedraggable'

    import top_categories from './pcTemplate/moduleList/productList'//热门分类

    import weekly_selection from './pcTemplate/moduleList/areatmplate'//每周精选
    import holiday_area from './pcTemplate/moduleList/areatmplate'//节日专区
    import birthday_area from './pcTemplate/moduleList/areatmplate'//生日专区

    import big_top_nav from './pcTemplate/moduleList/headerNav' //顶部导航栏
    import big_header from './pcTemplate/moduleList/headerSearch'//顶部logo&搜索
    import big_banner from './pcTemplate/moduleList/banner'//上面轮播
    import show_spike from './pcTemplate/moduleList/spikeActivity'//秒杀活动
    import fight_group from './pcTemplate/moduleList/fightingDoods'//折扣专区
    import good_goods_snapped_up from './pcTemplate/moduleList/fightingDoods'//好货抢先购

    import week_selection from './pcTemplate/jcmoduleList/weekSelection'//集采周周精选

    import hot_goods from './pcTemplate/jcmoduleList/hotGoodsGroup'//热爆商品
    import spell_group from './pcTemplate/jcmoduleList/hotGoodsGroup'//拼团

    import commodityProject1 from './pcTemplate/jcmoduleList/commodityProject'//商品专题1
    import commodityProject2 from './pcTemplate/jcmoduleList/commodityProject'//商品专题2
    import special_area from './pcTemplate/moduleList/specialArea'//特惠专区
    import discount_area from './pcTemplate/moduleList/discountArea'//砍价专区
    import Brand_Flash_Sales from './pcTemplate/jcmoduleList/BrandFlashSales'//品牌闪购专区
    import big_footer from './pcTemplate/moduleList/footer'//底部导航


    export default {
        components: {
            // HomeEditor,
            big_top_nav,
            big_header,
            big_banner,
            top_categories,
            show_spike,
            good_goods_snapped_up,
            weekly_selection,
            holiday_area,
            birthday_area,
            special_area,
            discount_area,
            big_footer,
            fight_group,

            hot_goods,
            spell_group,

            commodityProject1,
            commodityProject2,

            week_selection,//周周精选
            Brand_Flash_Sales,//品牌闪购

            draggable,
        },
        data() {
            return {
                imgList: [
                    {
                        img: require("@/common/images/homeEitd/qianbi.png"),
                        name: '首页头部',
                        componentName: "big_top_nav"
                    },
                    {
                        img: require("@/common/images/homeEitd/zhekou.png"),
                        name: '轮播图片',
                        componentName: 'big_banner'
                    },
                    {
                        img: require("@/common/images/homeEitd/banner.png"),
                        name: '搜索栏',
                        componentName: 'big_header'
                    },
                    {
                        img: require("@/common/images/homeEitd/fenlei.png"),
                        name: '热门分类',
                        componentName: 'top_categories'
                    },
                    {
                        img: require("@/common/images/homeEitd/miaosha.png"),
                        name: '限时秒杀',
                        componentName: 'show_spike'
                    },
                    {
                        img: require("@/common/images/homeEitd/good.png"),
                        name: '好货抢购',
                        componentName: 'good_goods_snapped_up'
                    },
                    {
                        img: require("@/common/images/homeEitd/cart.png"),
                        name: '拼团',
                        componentName: 'fight_group'
                    },
                    {
                        img: require("@/common/images/homeEitd/brerthday.png"),
                        name: '生日专区',
                        componentName: 'birthday_area'
                    },
                    {
                        img: require("@/common/images/homeEitd/jieri.png"),
                        name: '节日专区',
                        componentName: 'birthday_area'
                    },
                    {
                        img: require("@/common/images/homeEitd/dibu.png"),
                        name: '首页底部',
                        componentName: 'big_footer'
                    },

                ],
                homeEidtList: [],
                newArr: [],
                newArrCopy: [],
                filterComponents: [],
                componentId: '',
                component: '',
                componentStatus: '',
                notArr: [],
                arrList: [],
                activityList: [],

                componentArr: [
                    //头部nav
                    {
                        "componentId": "226664060005912576",
                        "pageId": "226664059531956224",
                        "componentCode": "big_top_nav",
                        "componentName": "顶部",
                        "sortOrder": 0,
                        "componentStatus": 0,
                        "remark": "",
                        "componentContents": [
                            {
                                "contentId": "226664060253376512",
                                "componentId": "226664060005912576",
                                "picture": "1 ",
                                "title": "福原爱",
                                "type": 4,
                                "content": '{"color":"rgba(237,236,236,1)","tableData":[{"categoryName":"办公用品","classifiedLink":"","sortOrder":"1","imgUrl":"http://img.fyuanai.com/test/2019-11-20/f68b0ea7e3874f66b0296fc730b23e5c-bangong@2x.png"},{"categoryName":"企业集采","classifiedLink":"","sortOrder":"2","imgUrl":"http://img.fyuanai.com/test/2019-11-20/dd3e1bff9ffb404c8479e9e1e2c752ce-qiye@2x.png"},{"categoryName":"京东商城","classifiedLink":"","sortOrder":"3","imgUrl":"http://img.fyuanai.com/test/2019-11-20/63c7e686ab054984803044c65b4bfbef-jingdong@2x.png"},{"categoryName":"苏宁易购","classifiedLink":"","sortOrder":"4","imgUrl":"http://img.fyuanai.com/test/2019-11-20/888f51db30d644bca157719ec8399b30-suning@2x.png"},{"categoryName":"网易严选","classifiedLink":"","sortOrder":"5","imgUrl":"http://img.fyuanai.com/test/2019-11-20/6f5c1cfc223b4c14aa7708dd397f3850-yanxuan 65@2x.png"},{"categoryName":"关于我们","classifiedLink":"http://www.maige.com/navigation_page.html?index=2#/AboutUs","sortOrder":"6","imgUrl":"http://img.fyuanai.com/test/2019-11-21/4701851d74914b42833b019655fe356e-好货抢先购.png"}]}',
                                "sortOrder": 0,
                                "contentStatus": 0,
                                "remark": "remark"
                            }]
                    },
                    //头部搜索
                    {
                        "componentId": "226664060765081600",
                        "pageId": "226664059531956224",
                        "componentCode": "big_header",
                        "componentName": "搜索",
                        "sortOrder": 1,
                        "componentStatus": 0,
                        "remark": "",
                        "componentContents": [
                            {
                                "contentId": "226664061339701248",
                                "componentId": "226664060765081600",
                                "picture": "1 ",
                                "title": "企业集采",
                                "type": 4,
                                "content": '{"telephone":"400-108-8710","color":"#F7FAFF","logoImg":"http://img.fyuanai.com/test/2019-11-20/16f990a32097426e80ddcb65692d68b8-福员爱.png","tableData":[{"categoryName":"小家具","classifiedLink":"","sort":""},{"categoryName":"皮具","classifiedLink":"","sort":""},{"categoryName":"智能手表","classifiedLink":"","sort":""},{"categoryName":"智能手环","classifiedLink":"","sort":""},{"categoryName":"电脑","classifiedLink":"","sort":""}],"sourceList":[{"sourceName":"首页","sourceLink":"http://www.jianshu.com","sortOrder":"1"},{"sourceName":"员工福利","sourceLink":"http://www.baidu.com","sortOrder":"2"},{"sourceName":"办公用品","sourceLink":"http://www.baidu.com","sortOrder":"2"},{"sourceName":"劳工用品","sourceLink":"http://www.baidu.com","sortOrder":"2"}]}',
                                "sortOrder": 0,
                                "contentStatus": 0,
                                "remark": "remark"
                            }]
                    },
                    //轮播
                    {
                        "componentId": "226664061981429760",
                        "pageId": "226664059531956224",
                        "componentCode": "big_banner",
                        "componentName": "轮播",
                        "sortOrder": 2,
                        "componentStatus": 0,
                        "remark": "",
                        "componentContents": [
                            {
                                "contentId": "226664062597992448",
                                "componentId": "226664061981429760",
                                "picture": "1 ",
                                "title": " ",
                                "type": 4,
                                "content": '[{"picUrl":"http://img.fyuanai.com/test/2019-11-12/ac2b9aa4dd18449c8266259f6e956a48-f06011eb0eda402d81deceb39f2a30d0-1559513896758792067.png","linkUrl":"","linkType":0,"sortOrder":"5"},{"picUrl":"http://img.fyuanai.com/test/2019-11-12/0d5808eccfc14b90bc86ba4381542d13-8df707237e2c4137a797874c4a59d0d1-download.png","linkUrl":"","linkType":0,"sortOrder":"4"},{"picUrl":"http://img.fyuanai.com/test/2019-11-12/b4f08ba78d3c489cb55fc2f886f42bc4-9a7c070fab58458d96ac28de9c84f6fa-1560546988990934515.png","linkUrl":"","linkType":0,"sortOrder":"3"},{"picUrl":"http://img.fyuanai.com/test/2019-11-12/d6dfcf7c33fa462b874e23554174366d-bannertu.png","linkUrl":"","linkType":0,"sortOrder":"2"},{"picUrl":"http://img.fyuanai.com/test/2019-11-12/2fee6328add44f8398ac33f115c6d7d9-6b1b99c0cb58429a9603f0ec83950aca-banner.png","linkUrl":"","linkType":0,"sortOrder":"1"}]',
                                "sortOrder": 0,
                                "contentStatus": 0,
                                "remark": "remark"
                            }]
                    },
                    //好货抢购
                    {
                        "componentId": "226664067278835712",
                        "pageId": "226664059531956224",
                        "componentCode": "good_goods_snapped_up",
                        "componentName": "好货抢购",
                        "sortOrder": 3,
                        "componentStatus": 0,
                        "remark": "",
                        "componentContents": [
                            {
                                "contentId": "226664067605991424",
                                "componentId": "226664067278835712",
                                "picture": "http://img.fyuanai.com/test/2019-11-11/880a1d70cd1f4cde9d8e49d3d89564cb-zuo.png",
                                "title": "好货抢先购",
                                "type": 0,
                                "content": '{"bgcolor":"","zoneLink":"","activityGoods":[{"activityGoodsId":"218503207402344448","activityId":"217057488531361792","projectId":null,"agencyId":null,"goodsId":"217258761885061120","goodsSn":"ECS217258761885061120","goodsName":"小米中性笔签字笔巨能写 小米巨能写中性笔10支装 黑色","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656891799539778","brandId":680,"supplierId":"214364206474989568","goodsTypeId":260,"pptPrice":14.9,"minimumPrice":14.9,"preferentialPrice":14.9,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/67912/16/7138/75962/5d524b5cE11ec5c64/66c37078f784d89e.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/67912/16/7138/75962/5d524b5cE11ec5c64/66c37078f784d89e.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:41:43","updateTime":"2019-10-20 10:41:43","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":13.9,"ustomaryPrice":13.9,"goodsNumber":100,"enableQuantity":100,"skuId":"217258761968947207","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/67912/16/7138/75962/5d524b5cE11ec5c64/66c37078f784d89e.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217258761968947207","goodsExamineStatus":2,"fyuanaiPrice":13.9,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218502366662496275","activityId":"217057488531361792","projectId":null,"agencyId":null,"goodsId":"217258761247526913","goodsSn":"ECS217258761247526913","goodsName":"广博(GuangBo)60支装0.5mm子弹头中性笔/签字笔/水笔 黑色ZX9533D","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656891799539778","brandId":342,"supplierId":"214364206474989568","goodsTypeId":260,"pptPrice":39,"minimumPrice":39,"preferentialPrice":39,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t2191/106/758428704/155166/53db653a/5628a8c0N9050da8a.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t2191/106/758428704/155166/53db653a/5628a8c0N9050da8a.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:41:43","updateTime":"2019-10-20 10:41:43","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":35,"ustomaryPrice":38,"goodsNumber":100,"enableQuantity":100,"skuId":"217258761323024384","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t2191/106/758428704/155166/53db653a/5628a8c0N9050da8a.jpg","festivalGoodType":null,"rebate":8,"activityGoodsTypeId":null,"defaultSkuId":"217258761323024384","goodsExamineStatus":2,"fyuanaiPrice":35,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218502366662496265","activityId":"217057488531361792","projectId":null,"agencyId":null,"goodsId":"217258760534495233","goodsSn":"ECS217258760534495233","goodsName":"得力(deli)0.5mm黑色直液式走珠签字笔学生考试中性笔 12支/盒S656","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656891799539778","brandId":344,"supplierId":"214364206474989568","goodsTypeId":260,"pptPrice":13.9,"minimumPrice":13.9,"preferentialPrice":13.9,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/42484/19/4706/222789/5cde14f3E09476664/d41edd492ad4f6d3.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/42484/19/4706/222789/5cde14f3E09476664/d41edd492ad4f6d3.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:41:43","updateTime":"2019-10-20 10:41:43","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":11.9,"ustomaryPrice":12.9,"goodsNumber":100,"enableQuantity":100,"skuId":"217258760626769920","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/42484/19/4706/222789/5cde14f3E09476664/d41edd492ad4f6d3.jpg","festivalGoodType":null,"rebate":8,"activityGoodsTypeId":null,"defaultSkuId":"217258760626769920","goodsExamineStatus":2,"fyuanaiPrice":11.9,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218502366662496256","activityId":"217057488531361792","projectId":null,"agencyId":null,"goodsId":"217258761377550337","goodsSn":"ECS217258761377550337","goodsName":"得力(deli)0.5mm全针管黑色中性笔水笔签字笔 40支/桶33107","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656891799539778","brandId":344,"supplierId":"214364206474989568","goodsTypeId":260,"pptPrice":23.9,"minimumPrice":23.9,"preferentialPrice":23.9,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t17068/288/351441282/243705/1b1ef8e9/5a6e87f0N95014df7.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t17068/288/351441282/243705/1b1ef8e9/5a6e87f0N95014df7.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:41:43","updateTime":"2019-10-20 10:41:43","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":21.9,"ustomaryPrice":22.9,"goodsNumber":100,"enableQuantity":100,"skuId":"217258761453047813","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t17068/288/351441282/243705/1b1ef8e9/5a6e87f0N95014df7.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217258761453047813","goodsExamineStatus":2,"fyuanaiPrice":21.9,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218501928441614346","activityId":"217057488531361792","projectId":null,"agencyId":null,"goodsId":"217258075759841281","goodsSn":"ECS217258075759841281","goodsName":"火光（huoguang）C112通用型腊基碳带小管芯碳带全树脂 标签打印色带110mm*70m 混合基碳带（30卷/盒）","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656894249013621","brandId":"217258075696926720","supplierId":"214364206474989568","goodsTypeId":253,"pptPrice":435,"minimumPrice":435,"preferentialPrice":435,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/73371/7/6977/201828/5d50d76fE63aef010/aba70609d86eace0.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/73371/7/6977/201828/5d50d76fE63aef010/aba70609d86eace0.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:39:00","updateTime":"2019-10-20 10:39:00","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":419,"ustomaryPrice":434,"goodsNumber":100,"enableQuantity":100,"skuId":"217258075835338752","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/73371/7/6977/201828/5d50d76fE63aef010/aba70609d86eace0.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217258075835338752","goodsExamineStatus":2,"fyuanaiPrice":419,"activityGoodsGalleryReturns":null}]}',
                                "sortOrder": 0,
                                "contentStatus": 0,
                                "remark": "remark"
                            }
                        ]
                    },
                    //折扣专区
                    {
                        "componentId": "226664065961824256",
                        "pageId": "226664059531956224",
                        "componentCode": "fight_group",
                        "componentName": "折扣专区",
                        "sortOrder": 3,
                        "componentStatus": 0,
                        "remark": "",
                        "componentContents": [
                            {
                                "contentId": "226664066830045184",
                                "componentId": "226664065961824256",
                                "picture": "http://img.fyuanai.com/test/2019-11-11/66d7ea6172c1473fa8193eefebe7d51b-zuo.png",
                                "title": "折扣专区",
                                "type": 0,
                                "content": '{"bgcolor":"#FF9561","zoneLink":"","activityGoods":[{"activityGoodsId":"218501928441614346","activityId":"217057488531361792","projectId":null,"agencyId":null,"goodsId":"217258075759841281","goodsSn":"ECS217258075759841281","goodsName":"火光（huoguang）C112通用型腊基碳带小管芯碳带全树脂 标签打印色带110mm*70m 混合基碳带（30卷/盒）","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656894249013621","brandId":"217258075696926720","supplierId":"214364206474989568","goodsTypeId":253,"pptPrice":435,"minimumPrice":435,"preferentialPrice":435,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/73371/7/6977/201828/5d50d76fE63aef010/aba70609d86eace0.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/73371/7/6977/201828/5d50d76fE63aef010/aba70609d86eace0.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:39:00","updateTime":"2019-10-20 10:39:00","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":419,"ustomaryPrice":434,"goodsNumber":100,"enableQuantity":100,"skuId":"217258075835338752","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/73371/7/6977/201828/5d50d76fE63aef010/aba70609d86eace0.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217258075835338752","goodsExamineStatus":2,"fyuanaiPrice":419,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218501928441614336","activityId":"217057488531361792","projectId":null,"agencyId":null,"goodsId":"217258075915030529","goodsSn":"ECS217258075915030529","goodsName":"hiti CS-200e/色带 证卡打印机 原装彩色带YMCKO 呈妍全格半格单色色带 企业政采专用色带（全格400面/卷）","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656894249013621","brandId":"217258075873087488","supplierId":"214364206474989568","goodsTypeId":253,"pptPrice":539,"minimumPrice":539,"preferentialPrice":539,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t10783/152/2148825857/438906/34b1864c/59f03bb4Ncc730bb5.png","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t10783/152/2148825857/438906/34b1864c/59f03bb4Ncc730bb5.png","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:39:00","updateTime":"2019-10-20 10:39:00","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":489,"ustomaryPrice":538,"goodsNumber":100,"enableQuantity":100,"skuId":"217258075998916608","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t10783/152/2148825857/438906/34b1864c/59f03bb4Ncc730bb5.png","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217258075998916608","goodsExamineStatus":2,"fyuanaiPrice":489,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218503207402344448","activityId":"217057488531361792","projectId":null,"agencyId":null,"goodsId":"217258761885061120","goodsSn":"ECS217258761885061120","goodsName":"小米中性笔签字笔巨能写 小米巨能写中性笔10支装 黑色","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656891799539778","brandId":680,"supplierId":"214364206474989568","goodsTypeId":260,"pptPrice":14.9,"minimumPrice":14.9,"preferentialPrice":14.9,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/67912/16/7138/75962/5d524b5cE11ec5c64/66c37078f784d89e.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/67912/16/7138/75962/5d524b5cE11ec5c64/66c37078f784d89e.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:41:43","updateTime":"2019-10-20 10:41:43","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":13.9,"ustomaryPrice":13.9,"goodsNumber":100,"enableQuantity":100,"skuId":"217258761968947207","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/67912/16/7138/75962/5d524b5cE11ec5c64/66c37078f784d89e.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217258761968947207","goodsExamineStatus":2,"fyuanaiPrice":13.9,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218502366662496275","activityId":"217057488531361792","projectId":null,"agencyId":null,"goodsId":"217258761247526913","goodsSn":"ECS217258761247526913","goodsName":"广博(GuangBo)60支装0.5mm子弹头中性笔/签字笔/水笔 黑色ZX9533D","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656891799539778","brandId":342,"supplierId":"214364206474989568","goodsTypeId":260,"pptPrice":39,"minimumPrice":39,"preferentialPrice":39,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t2191/106/758428704/155166/53db653a/5628a8c0N9050da8a.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t2191/106/758428704/155166/53db653a/5628a8c0N9050da8a.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:41:43","updateTime":"2019-10-20 10:41:43","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":35,"ustomaryPrice":38,"goodsNumber":100,"enableQuantity":100,"skuId":"217258761323024384","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t2191/106/758428704/155166/53db653a/5628a8c0N9050da8a.jpg","festivalGoodType":null,"rebate":8,"activityGoodsTypeId":null,"defaultSkuId":"217258761323024384","goodsExamineStatus":2,"fyuanaiPrice":35,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218502366662496265","activityId":"217057488531361792","projectId":null,"agencyId":null,"goodsId":"217258760534495233","goodsSn":"ECS217258760534495233","goodsName":"得力(deli)0.5mm黑色直液式走珠签字笔学生考试中性笔 12支/盒S656","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656891799539778","brandId":344,"supplierId":"214364206474989568","goodsTypeId":260,"pptPrice":13.9,"minimumPrice":13.9,"preferentialPrice":13.9,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/42484/19/4706/222789/5cde14f3E09476664/d41edd492ad4f6d3.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/42484/19/4706/222789/5cde14f3E09476664/d41edd492ad4f6d3.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:41:43","updateTime":"2019-10-20 10:41:43","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":11.9,"ustomaryPrice":12.9,"goodsNumber":100,"enableQuantity":100,"skuId":"217258760626769920","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/42484/19/4706/222789/5cde14f3E09476664/d41edd492ad4f6d3.jpg","festivalGoodType":null,"rebate":8,"activityGoodsTypeId":null,"defaultSkuId":"217258760626769920","goodsExamineStatus":2,"fyuanaiPrice":11.9,"activityGoodsGalleryReturns":null}]}',
                                "sortOrder": 0,
                                "contentStatus": 0,
                                "remark": "remark"
                            }
                        ]
                    },

                    //周周精选
                    {
                        "componentId": "226664071498305536",
                        "pageId": "226664059531956224",
                        "componentCode": "week_selection",
                        "componentName": "周周精选",
                        "sortOrder": 4,
                        "componentStatus": 0,
                        "remark": "",
                        "componentContents": [
                            {
                                "contentId": "226664071624134656",
                                "componentId": "226664071498305536",
                                "picture": "http://img.fyuanai.com/test/2019-11-12/ca49a983fe134f4a8939dbf0133ff320-sale-more.png",
                                "title": "周周精选",
                                "type": 4,
                                "content": '{"bgcolor":"#FF5A81","zoneLink":"","advertisingSlogan":"","activityGoods":[{"activityGoodsId":"218504435255480329","activityId":"215057461051133952","projectId":null,"agencyId":null,"goodsId":"217259430364844033","goodsSn":"ECS217259430364844033","goodsName":"AOC 23.8英寸 AH-IPS硬屏 1.5mm窄边框 低蓝光爱眼不闪屏 电脑显示器（HDMI版) I2490VXH/BS","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656884514033878","brandId":528,"supplierId":"214364206474989568","goodsTypeId":1328,"pptPrice":749,"minimumPrice":749,"preferentialPrice":749,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t19843/6/2160171365/339844/53c5fa21/5b32fb3bN09ca4fbc.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t19843/6/2160171365/339844/53c5fa21/5b32fb3bN09ca4fbc.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:44:22","updateTime":"2019-10-20 10:44:22","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":698,"ustomaryPrice":748,"goodsNumber":100,"enableQuantity":100,"skuId":"217259430440341511","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t19843/6/2160171365/339844/53c5fa21/5b32fb3bN09ca4fbc.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217259430440341511","goodsExamineStatus":2,"fyuanaiPrice":698,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218504435251286030","activityId":"215057461051133952","projectId":null,"agencyId":null,"goodsId":"217259430851383296","goodsSn":"ECS217259430851383296","goodsName":"三星（SAMSUNG）27英寸曲面 可壁挂 HDMI接口 节能爱眼认证 FreeSync技术 电脑显示器（C27F390FHC）","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656884514033878","brandId":404,"supplierId":"214364206474989568","goodsTypeId":1328,"pptPrice":999,"minimumPrice":999,"preferentialPrice":999,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/69371/18/12439/194637/5d9e9bb1E76f68e3c/7afc2773bd4a1edd.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/69371/18/12439/194637/5d9e9bb1E76f68e3c/7afc2773bd4a1edd.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:44:23","updateTime":"2019-10-20 10:44:23","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":928,"ustomaryPrice":998,"goodsNumber":100,"enableQuantity":100,"skuId":"217259430926880768","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/69371/18/12439/194637/5d9e9bb1E76f68e3c/7afc2773bd4a1edd.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217259430926880768","goodsExamineStatus":2,"fyuanaiPrice":928,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218504435251286016","activityId":"215057461051133952","projectId":null,"agencyId":null,"goodsId":"217259430201266177","goodsSn":"ECS217259430201266177","goodsName":"HKC 23.6英寸 VA面板 白色 纤薄微边框 办公壁挂家用 1080p 宽屏 壁挂 滤蓝光不闪屏 电脑液晶显示器 H240W","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656884514033878","brandId":531,"supplierId":"214364206474989568","goodsTypeId":1328,"pptPrice":599,"minimumPrice":599,"preferentialPrice":599,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t17122/235/2549823387/481384/8efe1e93/5b029cc8N58f93270.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t17122/235/2549823387/481384/8efe1e93/5b029cc8N58f93270.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:44:22","updateTime":"2019-10-20 10:44:22","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":536,"ustomaryPrice":598,"goodsNumber":100,"enableQuantity":100,"skuId":"217259430276763648","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t17122/235/2549823387/481384/8efe1e93/5b029cc8N58f93270.jpg","festivalGoodType":null,"rebate":8,"activityGoodsTypeId":null,"defaultSkuId":"217259430276763648","goodsExamineStatus":2,"fyuanaiPrice":536,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218505029483499533","activityId":"215057461051133952","projectId":null,"agencyId":null,"goodsId":"217259431178539009","goodsSn":"ECS217259431178539009","goodsName":"戴尔（DELL） U2417H 23.8英寸四边微边框旋转升降IPS屏 出厂色彩校准 99%sRGB 个人商务 电脑显示器自营","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656884514033878","brandId":485,"supplierId":"214364206474989568","goodsTypeId":1328,"pptPrice":1369,"minimumPrice":1369,"preferentialPrice":1369,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t19465/355/1589199191/309972/37772b63/5ad06fc6N291eab65.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t19465/355/1589199191/309972/37772b63/5ad06fc6N291eab65.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:44:23","updateTime":"2019-10-20 10:44:23","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":1269,"ustomaryPrice":1368,"goodsNumber":100,"enableQuantity":100,"skuId":"217259431258230784","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t19465/355/1589199191/309972/37772b63/5ad06fc6N291eab65.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217259431258230784","goodsExamineStatus":2,"fyuanaiPrice":1269,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218505029483499520","activityId":"215057461051133952","projectId":null,"agencyId":null,"goodsId":"217259431354699777","goodsSn":"ECS217259431354699777","goodsName":"三星（SAMSUNG）23.8英寸 爱眼不闪屏滤蓝光 可壁挂 FreeSync 液晶电脑显示器 S24R352FHC（HDMI接口）","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656884514033878","brandId":404,"supplierId":"214364206474989568","goodsTypeId":1328,"pptPrice":799,"minimumPrice":799,"preferentialPrice":799,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/47817/28/8450/393626/5d5df56aEad69d907/0812f5575a9ddfe2.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/47817/28/8450/393626/5d5df56aEad69d907/0812f5575a9ddfe2.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:44:23","updateTime":"2019-10-20 10:44:23","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":699,"ustomaryPrice":798,"goodsNumber":100,"enableQuantity":100,"skuId":"217259431442780160","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/47817/28/8450/393626/5d5df56aEad69d907/0812f5575a9ddfe2.jpg","festivalGoodType":null,"rebate":8,"activityGoodsTypeId":null,"defaultSkuId":"217259431442780160","goodsExamineStatus":2,"fyuanaiPrice":699,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218505029479305216","activityId":"215057461051133952","projectId":null,"agencyId":null,"goodsId":"217259430520033280","goodsSn":"ECS217259430520033280","goodsName":"AOC U2790PQU 27英寸 4K高清 IPS广视角 微框 99% sRGB 商用办公节能 低蓝光不闪旋转升降PS4液晶显示器","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656884514033878","brandId":528,"supplierId":"214364206474989568","goodsTypeId":1328,"pptPrice":1899,"minimumPrice":1899,"preferentialPrice":1899,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/6134/10/4000/295624/5bd7c650Eee34681d/e2a45eba33b7ee39.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/6134/10/4000/295624/5bd7c650Eee34681d/e2a45eba33b7ee39.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:44:23","updateTime":"2019-10-20 10:44:23","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":1799,"ustomaryPrice":1898,"goodsNumber":100,"enableQuantity":100,"skuId":"217259430599725056","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/6134/10/4000/295624/5bd7c650Eee34681d/e2a45eba33b7ee39.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217259430599725056","goodsExamineStatus":2,"fyuanaiPrice":1799,"activityGoodsGalleryReturns":null}]}',
                                "sortOrder": 0,
                                "contentStatus": 0,
                                "remark": "remark"
                            }
                        ]
                    },

                    //热门分类
                    /*{
                        "componentId": "226664063923392512",
                        "pageId": "226664059531956224",
                        "componentCode": "top_categories",
                        "componentName": "热门分类",
                        "sortOrder": 3,
                        "componentStatus": 0,
                        "remark": "",
                        "componentContents": [
                            {
                                "contentId": "226664064309268480",
                                "componentId": "226664063923392512",
                                "picture": "1 ",
                                "title": "title",
                                "type": 4,
                                "content": '{"tableData":[{"imgUrl":"http://img.fyuanai.com/test/2019-11-12/96355077ed6646628db819ba0a26e2f4-jydq.png","imgLink":""},{"imgUrl":"http://img.fyuanai.com/test/2019-11-12/0d4399f4200a43be9c34329c37635bc0-sjsm.png","imgLink":""},{"imgUrl":"http://img.fyuanai.com/test/2019-11-12/41bd85d201844c2d82972e3812d55108-xmfs.png","imgLink":""},{"imgUrl":"http://img.fyuanai.com/test/2019-11-12/6e9de78bdca54ef792035f39a8dbdeb3-gthz.png","imgLink":""},{"imgUrl":"http://img.fyuanai.com/test/2019-11-12/76adfa11505d405d86d80f8f503bf3cc-pjxb.png","imgLink":""},{"imgUrl":"http://img.fyuanai.com/test/2019-11-12/8d876aa8b93144b286e717621c7784d3-bgyp.png","imgLink":""}]}',
                                "sortOrder": 0,
                                "contentStatus": 0,
                                "remark": "remark"
                            }]
                    },*/
                    //限时秒杀
                    {
                        "componentId": "226664064732893184",
                        "pageId": "226664059531956224",
                        "componentCode": "show_spike",
                        "componentName": "限时秒杀",
                        "sortOrder": 5,
                        "componentStatus": 0,
                        "remark": "",
                        "componentContents": [
                            {
                                "contentId": "226664065122963456",
                                "componentId": "226664064732893184",
                                "picture": "1 ",
                                "title": "秒杀",
                                "type": 4,
                                "content": '{"urlLink":"","title":"秋季精品","bgcolor":"#EF4F4F","createTime":"2019 - 11 - 1912: 00:00","endTime":"2019 - 12 - 1700:00:00","activityGoods":[{"activityGoodsId":"217072455729025024","activityId":"214698685399830528","projectId":null,"agencyId":null,"goodsId":"217070603159474176","goodsSn":"ECS217070603159474176","goodsName":"尚都比拉（Sentubila）2019新款拼接透视网纱灯笼袖T恤长袖通勤上衣193T0722999白色M","goodsNameStyle":"","modelNumber":"尚都比拉（Sentubila）","goodsWeight":0.25,"goodsBrief":"简短描述","catId":"212593206611680862","brandId":"217069540259926016","supplierId":"214364206474989568","goodsTypeId":770,"pptPrice":125,"minimumPrice":142,"preferentialPrice":142,"goodOriginalImgUrl":"","goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/11760/24/2831/139168/5c1864feE60d147a4/4ee1899484e3b69d.jpg","goodsThumbnailImgUrl":"","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-19 22:14:03","updateTime":"2019-10-19 22:19:20","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":136,"ustomaryPrice":141,"goodsNumber":10,"enableQuantity":10,"skuId":"217070603297886213","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/11760/24/2831/139168/5c1864feE60d147a4/4ee1899484e3b69d.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217070603297886213","goodsExamineStatus":2,"fyuanaiPrice":136,"activityGoodsGalleryReturns":null},{"activityGoodsId":"217053827126267945","activityId":"214698685399830528","projectId":null,"agencyId":null,"goodsId":"216645418233106432","goodsSn":"ECS216645418233106432","goodsName":"苏宁极物 斜口小密封罐","goodsNameStyle":"undefined","modelNumber":"SXCJ-4","goodsWeight":1.352,"goodsBrief":"简短描述","catId":"213625867258040320","brandId":16737,"supplierId":39,"goodsTypeId":49,"pptPrice":87,"minimumPrice":129,"preferentialPrice":129,"goodOriginalImgUrl":"","goodsCloneImgUrl":"http://imgservice4.suning.cn/uimg1/b2c/image/wJFXXehQVed1rAzL55W81Q.jpg_400w_400h_4e","goodsThumbnailImgUrl":"","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-18 18:04:31","updateTime":"2019-10-19 09:44:33","giveIntegral":null,"rankIntegral":null,"sourceType":3,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":3,"isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":119,"ustomaryPrice":232.2,"goodsNumber":10,"enableQuantity":10,"skuId":"216645418371518464","skuImg":"http://imgservice4.suning.cn/uimg1/b2c/image/wJFXXehQVed1rAzL55W81Q.jpg_400w_400h_4e","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"216645418371518464","goodsExamineStatus":2,"fyuanaiPrice":119,"activityGoodsGalleryReturns":null},{"activityGoodsId":"217053827126267924","activityId":"214698685399830528","projectId":null,"agencyId":null,"goodsId":"216643200566169600","goodsSn":"ECS216643200566169600","goodsName":"苏宁极物 磨砂六格收纳盒","goodsNameStyle":"","modelNumber":"000","goodsWeight":0.13,"goodsBrief":"简短描述","catId":"213625883255115776","brandId":16737,"supplierId":39,"goodsTypeId":1879,"pptPrice":20,"minimumPrice":39,"preferentialPrice":39,"goodOriginalImgUrl":"","goodsCloneImgUrl":"http://imgservice5.suning.cn/uimg1/b2c/image/gBEQ3HPz7mywcHePg-t8wQ.jpg_400w_400h_4e","goodsThumbnailImgUrl":"","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-18 17:55:42","updateTime":"2019-10-18 18:04:48","giveIntegral":null,"rankIntegral":null,"sourceType":3,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":3,"isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":35,"ustomaryPrice":70.2,"goodsNumber":10,"enableQuantity":10,"skuId":"216643200691998720","skuImg":"http://imgservice5.suning.cn/uimg1/b2c/image/gBEQ3HPz7mywcHePg-t8wQ.jpg_400w_400h_4e","festivalGoodType":null,"rebate":8,"activityGoodsTypeId":null,"defaultSkuId":"216643200691998720","goodsExamineStatus":2,"fyuanaiPrice":35,"activityGoodsGalleryReturns":null},{"activityGoodsId":"217053827126267916","activityId":"214698685399830528","projectId":null,"agencyId":null,"goodsId":"216643603588452352","goodsSn":"ECS216643603588452352","goodsName":"松下（Panasonic）CF-54 笔记本电脑酷睿i5半坚固型三防商务办公便携笔记本手提电脑防水防尘防震","goodsNameStyle":"undefined","modelNumber":"1111","goodsWeight":3.5,"goodsBrief":"简短描述","catId":"212593206481654831","brandId":81,"supplierId":39,"goodsTypeId":1314,"pptPrice":21238,"minimumPrice":23999,"preferentialPrice":23999,"goodOriginalImgUrl":"","goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/45959/39/2562/100636/5d059af7E6a30c904/2341a67e898f99b6.jpg","goodsThumbnailImgUrl":"","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-18 17:57:18","updateTime":"2019-10-19 09:05:17","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":3,"isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":18999,"ustomaryPrice":36000,"goodsNumber":10,"enableQuantity":10,"skuId":"216643603747835904","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/45959/39/2562/100636/5d059af7E6a30c904/2341a67e898f99b6.jpg","festivalGoodType":null,"rebate":7,"activityGoodsTypeId":null,"defaultSkuId":"216643603747835904","goodsExamineStatus":2,"fyuanaiPrice":18999,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218500676450258953","activityId":"214698685399830528","projectId":null,"agencyId":null,"goodsId":"217258076120551425","goodsSn":"ECS217258076120551425","goodsName":"火光（huoguang）C110混合基树脂碳带 标签条码色带 通用型大管芯 混合基碳带 110mm*300m","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656894249013621","brandId":"217258075696926720","supplierId":"214364206474989568","goodsTypeId":253,"pptPrice":60,"minimumPrice":60,"preferentialPrice":60,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/42561/27/11525/213342/5d50d76fEeccf20be/b5739093a6249cb8.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/42561/27/11525/213342/5d50d76fEeccf20be/b5739093a6249cb8.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:39:00","updateTime":"2019-10-20 10:39:00","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":52,"ustomaryPrice":59,"goodsNumber":100,"enableQuantity":100,"skuId":"217258076200243206","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/42561/27/11525/213342/5d50d76fEeccf20be/b5739093a6249cb8.jpg","festivalGoodType":null,"rebate":8,"activityGoodsTypeId":null,"defaultSkuId":"217258076200243206","goodsExamineStatus":2,"fyuanaiPrice":52,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218500676450258944","activityId":"214698685399830528","projectId":null,"agencyId":null,"goodsId":"217258074933563392","goodsSn":"ECS217258074933563392","goodsName":"OKI 6100F 打印机原装色带架 （适用7150F/6100F+/760F/6300F/6300FC）","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656894249013621","brandId":389,"supplierId":"214364206474989568","goodsTypeId":253,"pptPrice":59,"minimumPrice":59,"preferentialPrice":59,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1228/252/263300596/49457/fc1fc3dd/55110b6aN6572b05b.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1228/252/263300596/49457/fc1fc3dd/55110b6aN6572b05b.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:38:59","updateTime":"2019-10-20 10:38:59","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":46,"ustomaryPrice":58,"goodsNumber":100,"enableQuantity":100,"skuId":"217258075000672256","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1228/252/263300596/49457/fc1fc3dd/55110b6aN6572b05b.jpg","festivalGoodType":null,"rebate":7,"activityGoodsTypeId":null,"defaultSkuId":"217258075000672256","goodsExamineStatus":2,"fyuanaiPrice":46,"activityGoodsGalleryReturns":null},{"activityGoodsId":"217075408401600540","activityId":"214698685399830528","projectId":null,"agencyId":null,"goodsId":"217073554376626176","goodsSn":"ECS217073554376626176","goodsName":"卡婷念奴娇唇釉.C01念辰砂 4.2g","goodsNameStyle":"","modelNumber":"1","goodsWeight":0.04,"goodsBrief":"简短描述","catId":"213625828674637824","brandId":"217073553420324864","supplierId":"214364206474989568","goodsTypeId":1881,"pptPrice":34,"minimumPrice":139,"preferentialPrice":139,"goodOriginalImgUrl":"","goodsCloneImgUrl":"http://imgservice4.suning.cn/uimg1/b2c/image/Xx9uCe7C0FtFrYZ4xgzDCg.jpg_400w_400h_4e","goodsThumbnailImgUrl":"","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-19 22:25:46","updateTime":"2019-10-19 22:26:45","giveIntegral":null,"rankIntegral":null,"sourceType":3,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":126,"ustomaryPrice":138,"goodsNumber":10,"enableQuantity":10,"skuId":"217073554456317952","skuImg":"http://imgservice4.suning.cn/uimg1/b2c/image/Xx9uCe7C0FtFrYZ4xgzDCg.jpg_400w_400h_4e","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217073554456317952","goodsExamineStatus":2,"fyuanaiPrice":126,"activityGoodsGalleryReturns":null},{"activityGoodsId":"217075408401600524","activityId":"214698685399830528","projectId":null,"agencyId":null,"goodsId":"217073553604874240","goodsSn":"ECS217073553604874240","goodsName":"卡婷松间渡九色眼影.C03秋月 14.4g","goodsNameStyle":"","modelNumber":"1","goodsWeight":0.09,"goodsBrief":"简短描述","catId":"213625828674637824","brandId":"217073553420324864","supplierId":"214364206474989568","goodsTypeId":1881,"pptPrice":43,"minimumPrice":149,"preferentialPrice":149,"goodOriginalImgUrl":"","goodsCloneImgUrl":"http://imgservice2.suning.cn/uimg1/b2c/image/EHXFddKN3GOCCcJhDRReMw.jpg_400w_400h_4e","goodsThumbnailImgUrl":"","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-19 22:25:46","updateTime":"2019-10-19 22:29:18","giveIntegral":null,"rankIntegral":null,"sourceType":3,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":136,"ustomaryPrice":148,"goodsNumber":10,"enableQuantity":10,"skuId":"217073553688760320","skuImg":"http://imgservice2.suning.cn/uimg1/b2c/image/EHXFddKN3GOCCcJhDRReMw.jpg_400w_400h_4e","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217073553688760320","goodsExamineStatus":2,"fyuanaiPrice":136,"activityGoodsGalleryReturns":null},{"activityGoodsId":"217075408401600512","activityId":"214698685399830528","projectId":null,"agencyId":null,"goodsId":"216605405176926208","goodsSn":"ECS216605405176926208","goodsName":"Yessing男式方形撞色LogoT恤","goodsNameStyle":"","modelNumber":"ECS216605405176926208","goodsWeight":0.2,"goodsBrief":"简短描述","catId":"213627681340657664","brandId":229,"supplierId":"214364206474989568","goodsTypeId":"216605263258456064","pptPrice":67,"minimumPrice":79,"preferentialPrice":79,"goodOriginalImgUrl":"","goodsCloneImgUrl":"https://yanxuan-item.nosdn.127.net/b5a9d3944ce751138096a6c2db496196.jpg","goodsThumbnailImgUrl":"","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-18 15:25:31","updateTime":"2019-10-19 22:29:10","giveIntegral":null,"rankIntegral":null,"sourceType":2,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":68,"ustomaryPrice":78,"goodsNumber":10,"enableQuantity":10,"skuId":"216605405227257856","skuImg":"https://yanxuan-item.nosdn.127.net/9e2d282262ddd53a1f1df9c46cf37555.jpg","festivalGoodType":null,"rebate":8,"activityGoodsTypeId":null,"defaultSkuId":"216605405227257856","goodsExamineStatus":2,"fyuanaiPrice":68,"activityGoodsGalleryReturns":null}]}',
                                "sortOrder": 0,
                                "contentStatus": 0,
                                "remark": "remark"
                            }]
                    },

                    //热爆商品
                    {
                        "componentId": "226664071762546688",
                        "pageId": "226664059531956224",
                        "componentCode": "hot_goods",
                        "componentName": "热爆商品",
                        "sortOrder": 6,
                        "componentStatus": 0,
                        "remark": "",
                        "componentContents": [
                            {
                                "contentId": "226664072219725824",
                                "componentId": "226664071762546688",
                                "picture": "http://img.fyuanai.com/test/2019-11-11/7c804579276c4aa3a33cb024c69d26f0-prefer-more.png",
                                "title": "热爆商品",
                                "type": 4,
                                "content": '{"bgcolor":"#ff4f7b","zoneLink":"","advertisingSlogan":"","activityGoods":[' +
																		'{"gradeImgURL":"https://misc.360buyimg.com/channel/enterprise2018/1.0.0/css/i/the_first.png","activityGoodsId":"218501336394633216","activityId":"214435814979932160","projectId":null,"agencyId":null,"goodsId":"217260157015429120","goodsSn":"ECS217260157015429120","goodsName":"小米路由器4A 无线双频 四天线稳定穿墙 防蹭网 双频合一 稳定高速 家用路由器 智能APP远程控制","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656888095969715","brandId":680,"supplierId":"214364206474989568","goodsTypeId":226,"pptPrice":99,"minimumPrice":99,"preferentialPrice":99,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/62807/18/7972/126887/5d5fc979E132b248a/f478a156e8301a9a.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/62807/18/7972/126887/5d5fc979E132b248a/f478a156e8301a9a.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:47:16","updateTime":"2019-10-20 10:47:16","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":90,"ustomaryPrice":98,"goodsNumber":10,"enableQuantity":10,"skuId":"217260157145452550","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/62807/18/7972/126887/5d5fc979E132b248a/f478a156e8301a9a.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217260157145452550","goodsExamineStatus":2,"fyuanaiPrice":90,"activityGoodsGalleryReturns":null},' +
																		'{"gradeImgURL":"https://misc.360buyimg.com/channel/enterprise2018/1.0.0/css/i/second.png","activityGoodsId":"218501336394633226","activityId":"214435814979932160","projectId":null,"agencyId":null,"goodsId":"217260156608581632","goodsSn":"ECS217260156608581632","goodsName":"TP-LINK双千兆路由器 TL-WDR8690 2600M智能无线 5G双频 千兆端口 高速路由 大户型穿墙 内配千兆网线","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656888095969715","brandId":431,"supplierId":"214364206474989568","goodsTypeId":226,"pptPrice":289,"minimumPrice":289,"preferentialPrice":289,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/37673/28/9336/185335/5ccfceaeEc0aba7e3/c72c6fbcd1c0168f.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/37673/28/9336/185335/5ccfceaeEc0aba7e3/c72c6fbcd1c0168f.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:47:16","updateTime":"2019-10-20 10:47:16","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":269,"ustomaryPrice":288,"goodsNumber":10,"enableQuantity":9,"skuId":"217260156726022151","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/37673/28/9336/185335/5ccfceaeEc0aba7e3/c72c6fbcd1c0168f.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217260156726022151","goodsExamineStatus":2,"fyuanaiPrice":269,"activityGoodsGalleryReturns":null},' +
																		'{"gradeImgURL":"https://misc.360buyimg.com/channel/enterprise2018/1.0.0/css/i/third.png","activityGoodsId":"217077023288332300","activityId":"214435814979932160","projectId":null,"agencyId":null,"goodsId":"216605263254261760","goodsSn":"ECS216605263254261760","goodsName":"Yessing男女同款马卡龙多色卫衣","goodsNameStyle":"","modelNumber":"ECS216605263254261760","goodsWeight":0.43,"goodsBrief":"简短描述","catId":"213627681340657664","brandId":229,"supplierId":"214364206474989568","goodsTypeId":"216605263258456064","pptPrice":194,"minimumPrice":229,"preferentialPrice":229,"goodOriginalImgUrl":"","goodsCloneImgUrl":"https://yanxuan-item.nosdn.127.net/210b3bd811fc6f9482c3a21a54b32bdb.jpg","goodsThumbnailImgUrl":"","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-18 15:24:57","updateTime":"2019-10-19 22:29:58","giveIntegral":null,"rankIntegral":null,"sourceType":2,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":189,"ustomaryPrice":228,"goodsNumber":10,"enableQuantity":10,"skuId":"216605263317176320","skuImg":"https://yanxuan-item.nosdn.127.net/a5f78bb3158c2bf8d9c8661f288113ef.png","festivalGoodType":null,"rebate":8,"activityGoodsTypeId":null,"defaultSkuId":"216605263317176320","goodsExamineStatus":2,"fyuanaiPrice":189,"activityGoodsGalleryReturns":null},' +
																		'{"gradeImgURL":"https://misc.360buyimg.com/channel/enterprise2018/1.0.0/css/i/fourth.png","activityGoodsId":"217077023292526602","activityId":"214435814979932160","projectId":null,"agencyId":null,"goodsId":"217075108332703744","goodsSn":"ECS217075108332703744","goodsName":"苏宁极物 马卡龙彩色四季防滑拖鞋男款 浅灰 285MM（适合42-43码）","goodsNameStyle":"","modelNumber":"lt1","goodsWeight":0.257,"goodsBrief":"简短描述","catId":"213625838271205376","brandId":16737,"supplierId":"214364206474989568","goodsTypeId":274,"pptPrice":11,"minimumPrice":19,"preferentialPrice":19,"goodOriginalImgUrl":"","goodsCloneImgUrl":"http://imgservice5.suning.cn/uimg1/b2c/image/GpSFE-mSNpzSmG8NCrCkhw.jpg_400w_400h_4e","goodsThumbnailImgUrl":"","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-19 22:31:57","updateTime":"2019-10-19 22:32:59","giveIntegral":null,"rankIntegral":null,"sourceType":3,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":15,"ustomaryPrice":18,"goodsNumber":10,"enableQuantity":10,"skuId":"217075108412395520","skuImg":"http://imgservice5.suning.cn/uimg1/b2c/image/GpSFE-mSNpzSmG8NCrCkhw.jpg_400w_400h_4e","festivalGoodType":null,"rebate":7,"activityGoodsTypeId":null,"defaultSkuId":"217075108412395520","goodsExamineStatus":2,"fyuanaiPrice":15,"activityGoodsGalleryReturns":null},' +
																		'{"gradeImgURL":"https://misc.360buyimg.com/channel/enterprise2018/1.0.0/css/i/five.png","activityGoodsId":"218501138645782528","activityId":"214435814979932160","projectId":null,"agencyId":null,"goodsId":"217262293992345601","goodsSn":"ECS217262293992345601","goodsName":"BOB修容棒双头两用高光修容棒笔（立体V脸鼻影侧影卧蚕初学者底妆） 2#棕咖色+送微距遮瑕膏","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656931901280702","brandId":"217262293937819648","supplierId":"214364206474989568","goodsTypeId":1406,"pptPrice":35,"minimumPrice":35,"preferentialPrice":35,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t25705/106/457148146/85394/e755f127/5b704b76N457b887e.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t25705/106/457148146/85394/e755f127/5b704b76N457b887e.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:55:45","updateTime":"2019-10-20 10:55:45","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":30,"ustomaryPrice":34,"goodsNumber":10,"enableQuantity":10,"skuId":"217262294084620293","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t25705/106/457148146/85394/e755f127/5b704b76N457b887e.jpg","festivalGoodType":null,"rebate":8,"activityGoodsTypeId":null,"defaultSkuId":"217262294084620293","goodsExamineStatus":2,"fyuanaiPrice":30,"activityGoodsGalleryReturns":null}]}',
                                "sortOrder": 0,
                                "contentStatus": 0,
                                "remark": null
                            },
                        ]
                    },
                    //拼团
                    {
                        "componentId": "226664065961824256",
                        "pageId": "226664059531956224",
                        "componentCode": "spell_group",
                        "componentName": "拼团",
                        "sortOrder": 6,
                        "componentStatus": 0,
                        "remark": "",
                        "componentContents": [
                            {
                                "contentId": "226664066830045184",
                                "componentId": "226664065961824256",
                                "picture": "http://img.fyuanai.com/test/2019-11-11/66d7ea6172c1473fa8193eefebe7d51b-zuo.png",
                                "title": "拼团",
                                "type": 0,
                                "content": '{"bgcolor":"#4b87f4","zoneLink":"","activityGoods":[{"activityGoodsId":"218501928441614346","activityId":"217057488531361792","projectId":null,"agencyId":null,"goodsId":"217258075759841281","goodsSn":"ECS217258075759841281","goodsName":"火光（huoguang）C112通用型腊基碳带小管芯碳带全树脂 标签打印色带110mm*70m 混合基碳带（30卷/盒）","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656894249013621","brandId":"217258075696926720","supplierId":"214364206474989568","goodsTypeId":253,"pptPrice":435,"minimumPrice":435,"preferentialPrice":435,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/73371/7/6977/201828/5d50d76fE63aef010/aba70609d86eace0.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/73371/7/6977/201828/5d50d76fE63aef010/aba70609d86eace0.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:39:00","updateTime":"2019-10-20 10:39:00","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":419,"ustomaryPrice":434,"goodsNumber":100,"enableQuantity":100,"skuId":"217258075835338752","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/73371/7/6977/201828/5d50d76fE63aef010/aba70609d86eace0.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217258075835338752","goodsExamineStatus":2,"fyuanaiPrice":419,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218501928441614336","activityId":"217057488531361792","projectId":null,"agencyId":null,"goodsId":"217258075915030529","goodsSn":"ECS217258075915030529","goodsName":"hiti CS-200e/色带 证卡打印机 原装彩色带YMCKO 呈妍全格半格单色色带 企业政采专用色带（全格400面/卷）","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656894249013621","brandId":"217258075873087488","supplierId":"214364206474989568","goodsTypeId":253,"pptPrice":539,"minimumPrice":539,"preferentialPrice":539,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t10783/152/2148825857/438906/34b1864c/59f03bb4Ncc730bb5.png","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t10783/152/2148825857/438906/34b1864c/59f03bb4Ncc730bb5.png","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:39:00","updateTime":"2019-10-20 10:39:00","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":489,"ustomaryPrice":538,"goodsNumber":100,"enableQuantity":100,"skuId":"217258075998916608","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t10783/152/2148825857/438906/34b1864c/59f03bb4Ncc730bb5.png","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217258075998916608","goodsExamineStatus":2,"fyuanaiPrice":489,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218503207402344448","activityId":"217057488531361792","projectId":null,"agencyId":null,"goodsId":"217258761885061120","goodsSn":"ECS217258761885061120","goodsName":"小米中性笔签字笔巨能写 小米巨能写中性笔10支装 黑色","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656891799539778","brandId":680,"supplierId":"214364206474989568","goodsTypeId":260,"pptPrice":14.9,"minimumPrice":14.9,"preferentialPrice":14.9,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/67912/16/7138/75962/5d524b5cE11ec5c64/66c37078f784d89e.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/67912/16/7138/75962/5d524b5cE11ec5c64/66c37078f784d89e.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:41:43","updateTime":"2019-10-20 10:41:43","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":13.9,"ustomaryPrice":13.9,"goodsNumber":100,"enableQuantity":100,"skuId":"217258761968947207","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/67912/16/7138/75962/5d524b5cE11ec5c64/66c37078f784d89e.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217258761968947207","goodsExamineStatus":2,"fyuanaiPrice":13.9,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218502366662496275","activityId":"217057488531361792","projectId":null,"agencyId":null,"goodsId":"217258761247526913","goodsSn":"ECS217258761247526913","goodsName":"广博(GuangBo)60支装0.5mm子弹头中性笔/签字笔/水笔 黑色ZX9533D","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656891799539778","brandId":342,"supplierId":"214364206474989568","goodsTypeId":260,"pptPrice":39,"minimumPrice":39,"preferentialPrice":39,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t2191/106/758428704/155166/53db653a/5628a8c0N9050da8a.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t2191/106/758428704/155166/53db653a/5628a8c0N9050da8a.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:41:43","updateTime":"2019-10-20 10:41:43","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":35,"ustomaryPrice":38,"goodsNumber":100,"enableQuantity":100,"skuId":"217258761323024384","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t2191/106/758428704/155166/53db653a/5628a8c0N9050da8a.jpg","festivalGoodType":null,"rebate":8,"activityGoodsTypeId":null,"defaultSkuId":"217258761323024384","goodsExamineStatus":2,"fyuanaiPrice":35,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218502366662496265","activityId":"217057488531361792","projectId":null,"agencyId":null,"goodsId":"217258760534495233","goodsSn":"ECS217258760534495233","goodsName":"得力(deli)0.5mm黑色直液式走珠签字笔学生考试中性笔 12支/盒S656","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656891799539778","brandId":344,"supplierId":"214364206474989568","goodsTypeId":260,"pptPrice":13.9,"minimumPrice":13.9,"preferentialPrice":13.9,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/42484/19/4706/222789/5cde14f3E09476664/d41edd492ad4f6d3.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/42484/19/4706/222789/5cde14f3E09476664/d41edd492ad4f6d3.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:41:43","updateTime":"2019-10-20 10:41:43","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":11.9,"ustomaryPrice":12.9,"goodsNumber":100,"enableQuantity":100,"skuId":"217258760626769920","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/42484/19/4706/222789/5cde14f3E09476664/d41edd492ad4f6d3.jpg","festivalGoodType":null,"rebate":8,"activityGoodsTypeId":null,"defaultSkuId":"217258760626769920","goodsExamineStatus":2,"fyuanaiPrice":11.9,"activityGoodsGalleryReturns":null}]}',
                                "sortOrder": 0,
                                "contentStatus": 0,
                                "remark": "remark"
                            }
                        ]
                    },

                    //节日专区
                    /* {
												 "componentId": "226664069166272512",
												 "pageId": "226664059531956224",
												 "componentCode": "holiday_area",
												 "componentName": "节日专区",
												 "sortOrder": 6,
												 "componentStatus": 0,
												 "remark": "",
												 "componentContents": [
														 {
																 "contentId": "226664069833166848",
																 "componentId": "226664069166272512",
																 "picture": "http://img.fyuanai.com/test/2019-11-12/00250f0463dd44758ccfe987bc925f15-6fefcaf98d11470e9a0aba34145de926-haohuo2.png",
																 "title": "节日专区",
																 "type": 4,
																 "content": '{"zoneLink":"http://www.juejin.com","activityGoods":[{"activityGoodsId":"220690521398448141","activityId":"214458872348282880","projectId":null,"agencyId":null,"goodsId":"217260156071710721","goodsSn":"ECS217260156071710721","goodsName":"华为 WS5200 四核版 凌霄四核CPU 5G双频双千兆智能路由器 无线家用穿墙 四信号放大器 高速路由 IPv6","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656888095969715","brandId":429,"supplierId":"214364206474989568","goodsTypeId":226,"pptPrice":249,"minimumPrice":249,"preferentialPrice":249,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/71745/3/526/151122/5cebaeabE361acc61/ab7aa65938523ca3.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/71745/3/526/151122/5cebaeabE361acc61/ab7aa65938523ca3.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:47:16","updateTime":"2019-10-20 10:47:16","giveIntegral":null,"rankIntegral":null,"sourceType":3,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":10,"ustomaryPrice":248,"goodsNumber":10,"enableQuantity":10,"skuId":"217260156197539840","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/71745/3/526/151122/5cebaeabE361acc61/ab7aa65938523ca3.jpg","festivalGoodType":null,"rebate":1,"activityGoodsTypeId":null,"defaultSkuId":"217260156197539840","goodsExamineStatus":2,"fyuanaiPrice":10,"activityGoodsGalleryReturns":null},{"activityGoodsId":"220690335276208161","activityId":"214458872348282880","projectId":null,"agencyId":null,"goodsId":"217265714413703168","goodsSn":"ECS217265714413703168","goodsName":"宝宝好婴儿推车轻便折叠婴儿车推车可坐躺儿童伞车宝宝手推车A1蓝色","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212657020333985877","brandId":"217265714388537344","supplierId":"214364206474989568","goodsTypeId":578,"pptPrice":199,"minimumPrice":199,"preferentialPrice":199,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t17044/212/2272281450/64441/2a5b717b/5af11076Nfba08e5b.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t17044/212/2272281450/64441/2a5b717b/5af11076Nfba08e5b.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 11:09:21","updateTime":"2019-10-20 11:09:21","giveIntegral":null,"rankIntegral":null,"sourceType":3,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":10,"ustomaryPrice":198,"goodsNumber":10,"enableQuantity":10,"skuId":"217265714514366464","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t17044/212/2272281450/64441/2a5b717b/5af11076Nfba08e5b.jpg","festivalGoodType":null,"rebate":1,"activityGoodsTypeId":null,"defaultSkuId":"217265714514366464","goodsExamineStatus":2,"fyuanaiPrice":10,"activityGoodsGalleryReturns":null},{"activityGoodsId":"220690521402642433","activityId":"214458872348282880","projectId":null,"agencyId":null,"goodsId":"217261143457009665","goodsSn":"ECS217261143457009665","goodsName":"圣罗兰（YSL）莹亮纯魅唇膏12#（圆管口红）4.5g 斩男色","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656932220047727","brandId":"217261143335374848","supplierId":"214364206474989568","goodsTypeId":1408,"pptPrice":313,"minimumPrice":313,"preferentialPrice":313,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t5752/134/8869787029/133064/ae12ebe8/59800d5fNde1e51b3.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t5752/134/8869787029/133064/ae12ebe8/59800d5fNde1e51b3.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:51:11","updateTime":"2019-10-20 10:51:11","giveIntegral":null,"rankIntegral":null,"sourceType":3,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":10,"ustomaryPrice":312,"goodsNumber":10,"enableQuantity":10,"skuId":"217261143545090048","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t5752/134/8869787029/133064/ae12ebe8/59800d5fNde1e51b3.jpg","festivalGoodType":null,"rebate":1,"activityGoodsTypeId":null,"defaultSkuId":"217261143545090048","goodsExamineStatus":2,"fyuanaiPrice":10,"activityGoodsGalleryReturns":null},{"activityGoodsId":"220690521398448130","activityId":"214458872348282880","projectId":null,"agencyId":null,"goodsId":"217260156608581632","goodsSn":"ECS217260156608581632","goodsName":"TP-LINK双千兆路由器 TL-WDR8690 2600M智能无线 5G双频 千兆端口 高速路由 大户型穿墙 内配千兆网线","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656888095969715","brandId":431,"supplierId":"214364206474989568","goodsTypeId":226,"pptPrice":289,"minimumPrice":289,"preferentialPrice":289,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/37673/28/9336/185335/5ccfceaeEc0aba7e3/c72c6fbcd1c0168f.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/37673/28/9336/185335/5ccfceaeEc0aba7e3/c72c6fbcd1c0168f.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:47:16","updateTime":"2019-10-20 10:47:16","giveIntegral":null,"rankIntegral":null,"sourceType":3,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":188,"ustomaryPrice":288,"goodsNumber":10,"enableQuantity":10,"skuId":"217260156726022151","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/37673/28/9336/185335/5ccfceaeEc0aba7e3/c72c6fbcd1c0168f.jpg","festivalGoodType":null,"rebate":1,"activityGoodsTypeId":null,"defaultSkuId":"217260156726022151","goodsExamineStatus":2,"fyuanaiPrice":188,"activityGoodsGalleryReturns":null},{"activityGoodsId":"220690335276208147","activityId":"214458872348282880","projectId":null,"agencyId":null,"goodsId":"217265714258513921","goodsSn":"ECS217265714258513921","goodsName":"TEKNUM 婴儿推车高景观 可坐可躺避震折叠双向BB宝宝轻便手童车 白色车架（皮革白色棚）【京东仓发货】","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212657020333985877","brandId":"217265714203987968","supplierId":"214364206474989568","goodsTypeId":578,"pptPrice":649,"minimumPrice":649,"preferentialPrice":649,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/88783/20/273/247775/5daaa0c6Eafcdfc0e/d3efd3779f4d6c34.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/88783/20/273/247775/5daaa0c6Eafcdfc0e/d3efd3779f4d6c34.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 11:09:21","updateTime":"2019-10-20 11:09:21","giveIntegral":null,"rankIntegral":null,"sourceType":5,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":10,"ustomaryPrice":648,"goodsNumber":10,"enableQuantity":10,"skuId":"217265714363371520","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/88783/20/273/247775/5daaa0c6Eafcdfc0e/d3efd3779f4d6c34.jpg","festivalGoodType":null,"rebate":1,"activityGoodsTypeId":null,"defaultSkuId":"217265714363371520","goodsExamineStatus":2,"fyuanaiPrice":10,"activityGoodsGalleryReturns":null},{"activityGoodsId":"220690521394253824","activityId":"214458872348282880","projectId":null,"agencyId":null,"goodsId":"217260156818296833","goodsSn":"ECS217260156818296833","goodsName":"荣耀路由Pro2 凌霄四核CPU 5G双频双千兆智能高速路由器 四信号大功率放大器 云存储 无线家用穿墙 IPv6","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656888095969715","brandId":429,"supplierId":"214364206474989568","goodsTypeId":226,"pptPrice":299,"minimumPrice":299,"preferentialPrice":299,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/44228/11/13532/140341/5d6ce65fE4766ed9a/fb3a352e17b22823.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/44228/11/13532/140341/5d6ce65fE4766ed9a/fb3a352e17b22823.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:47:16","updateTime":"2019-10-20 10:47:16","giveIntegral":null,"rankIntegral":null,"sourceType":3,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":10,"ustomaryPrice":298,"goodsNumber":10,"enableQuantity":10,"skuId":"217260156948320256","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/44228/11/13532/140341/5d6ce65fE4766ed9a/fb3a352e17b22823.jpg","festivalGoodType":null,"rebate":1,"activityGoodsTypeId":null,"defaultSkuId":"217260156948320256","goodsExamineStatus":2,"fyuanaiPrice":10,"activityGoodsGalleryReturns":null},{"activityGoodsId":"220690335276208137","activityId":"214458872348282880","projectId":null,"agencyId":null,"goodsId":"217265714610835457","goodsSn":"ECS217265714610835457","goodsName":"亿宝莱（yibaolai）婴儿推车可坐可躺轻便折叠透气双向避震宝宝儿童便捷婴儿车高景观伞车 790卡其色+【防风脚套】","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212657020333985877","brandId":"217265714539532288","supplierId":"214364206474989568","goodsTypeId":578,"pptPrice":268,"minimumPrice":268,"preferentialPrice":268,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t4369/305/2622590760/287150/44c5b5c0/58d38e99N187c18a5.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t4369/305/2622590760/287150/44c5b5c0/58d38e99N187c18a5.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 11:09:21","updateTime":"2019-10-20 11:09:21","giveIntegral":null,"rankIntegral":null,"sourceType":3,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":10,"ustomaryPrice":267,"goodsNumber":10,"enableQuantity":10,"skuId":"217265714719887366","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t4369/305/2622590760/287150/44c5b5c0/58d38e99N187c18a5.jpg","festivalGoodType":null,"rebate":1,"activityGoodsTypeId":null,"defaultSkuId":"217265714719887366","goodsExamineStatus":2,"fyuanaiPrice":10,"activityGoodsGalleryReturns":null},{"activityGoodsId":"220690458660048896","activityId":"214458872348282880","projectId":null,"agencyId":null,"goodsId":"217261144304259072","goodsSn":"ECS217261144304259072","goodsName":"迪奥（Dior）烈艳蓝金唇膏520# 3.5g 玫瑰红(口红 缎光 滋润保湿 长效持妆 玫红色 斩男色 告白色 粉红色)","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656932220047727","brandId":1715,"supplierId":"214364206474989568","goodsTypeId":1408,"pptPrice":305.55,"minimumPrice":305.55,"preferentialPrice":305.55,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/83249/13/5043/110357/5d317db3Eacf992dc/6e3785daee2db60c.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/83249/13/5043/110357/5d317db3Eacf992dc/6e3785daee2db60c.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:51:11","updateTime":"2019-10-20 10:51:11","giveIntegral":null,"rankIntegral":null,"sourceType":3,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":10,"ustomaryPrice":304.55,"goodsNumber":10,"enableQuantity":10,"skuId":"217261144388145152","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/83249/13/5043/110357/5d317db3Eacf992dc/6e3785daee2db60c.jpg","festivalGoodType":null,"rebate":1,"activityGoodsTypeId":null,"defaultSkuId":"217261144388145152","goodsExamineStatus":2,"fyuanaiPrice":10,"activityGoodsGalleryReturns":null},{"activityGoodsId":"220690335276208128","activityId":"214458872348282880","projectId":null,"agencyId":null,"goodsId":"217265713780363265","goodsSn":"ECS217265713780363265","goodsName":"gb好孩子 婴儿推车 新生儿 宝宝 手推车 伞车 高景观 可坐可平躺 双向推行 避震折叠 轻便 浅灰 GB101-Q320GG","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212657020333985877","brandId":1813,"supplierId":"214364206474989568","goodsTypeId":578,"pptPrice":958,"minimumPrice":958,"preferentialPrice":958,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/33038/40/296/202707/5c9dbc08Ea5d960ec/f17a7a1e05604dc4.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/33038/40/296/202707/5c9dbc08Ea5d960ec/f17a7a1e05604dc4.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 11:09:21","updateTime":"2019-10-20 11:09:21","giveIntegral":null,"rankIntegral":null,"sourceType":3,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":10,"ustomaryPrice":957,"goodsNumber":10,"enableQuantity":10,"skuId":"217265713897803781","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/33038/40/296/202707/5c9dbc08Ea5d960ec/f17a7a1e05604dc4.jpg","festivalGoodType":null,"rebate":1,"activityGoodsTypeId":null,"defaultSkuId":"217265713897803781","goodsExamineStatus":2,"fyuanaiPrice":10,"activityGoodsGalleryReturns":null},{"activityGoodsId":"220690458655854615","activityId":"214458872348282880","projectId":null,"agencyId":null,"goodsId":"217261142865612801","goodsSn":"ECS217261142865612801","goodsName":"迪奥（Dior）烈艳蓝金唇膏滋润999# 3.5g 经典正红色 (口红 保湿滋润 气质显白 不挑皮) （新老包装随机）","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656932220047727","brandId":1715,"supplierId":"214364206474989568","goodsTypeId":1408,"pptPrice":305.55,"minimumPrice":305.55,"preferentialPrice":305.55,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/70586/25/4164/110874/5d2490d4Ee896a871/88b8eddaa8892f43.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/70586/25/4164/110874/5d2490d4Ee896a871/88b8eddaa8892f43.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:51:11","updateTime":"2019-10-20 10:51:11","giveIntegral":null,"rankIntegral":null,"sourceType":3,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":10,"ustomaryPrice":304.55,"goodsNumber":10,"enableQuantity":10,"skuId":"217261142945304583","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/70586/25/4164/110874/5d2490d4Ee896a871/88b8eddaa8892f43.jpg","festivalGoodType":null,"rebate":1,"activityGoodsTypeId":null,"defaultSkuId":"217261142945304583","goodsExamineStatus":2,"fyuanaiPrice":10,"activityGoodsGalleryReturns":null}]}',
																 "sortOrder": 0,
																 "contentStatus": 0,
																 "remark": "remark"
														 }
												 ]
										 },*/

                    //商品专题1
                    {
                        "componentId": "226664071762546688",
                        "pageId": "226664059531956224",
                        "componentCode": "commodityProject1",
                        "componentName": "最新商品专题",
                        "sortOrder": 7,
                        "componentStatus": 0,
                        "remark": "",
                        "componentContents": [
                            {
                                "contentId": "226664072219725824",
                                "componentId": "226664071762546688",
                                "picture": "https://img10.360buyimg.com/cms/jfs/t1/70519/31/14752/29962/5dc290bcEfd33a8a5/d30564759d8e989d.jpg.webp",
                                "title": "最新商品专题",
                                "specialDesc": "电脑数码企业采购",
                                "type": 4,
                                "content": '{"bgcolor":"","zoneLink":"","advertisingSlogan":"","activityGoods":[{"activityGoodsId":"218501336394633216","activityId":"214435814979932160","projectId":null,"agencyId":null,"goodsId":"217260157015429120","goodsSn":"ECS217260157015429120","goodsName":"小米路由器4A 无线双频 四天线稳定穿墙 防蹭网 双频合一 稳定高速 家用路由器 智能APP远程控制","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656888095969715","brandId":680,"supplierId":"214364206474989568","goodsTypeId":226,"pptPrice":99,"minimumPrice":99,"preferentialPrice":99,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/62807/18/7972/126887/5d5fc979E132b248a/f478a156e8301a9a.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/62807/18/7972/126887/5d5fc979E132b248a/f478a156e8301a9a.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:47:16","updateTime":"2019-10-20 10:47:16","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":90,"ustomaryPrice":98,"goodsNumber":10,"enableQuantity":10,"skuId":"217260157145452550","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/62807/18/7972/126887/5d5fc979E132b248a/f478a156e8301a9a.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217260157145452550","goodsExamineStatus":2,"fyuanaiPrice":90,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218501336394633226","activityId":"214435814979932160","projectId":null,"agencyId":null,"goodsId":"217260156608581632","goodsSn":"ECS217260156608581632","goodsName":"TP-LINK双千兆路由器 TL-WDR8690 2600M智能无线 5G双频 千兆端口 高速路由 大户型穿墙 内配千兆网线","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656888095969715","brandId":431,"supplierId":"214364206474989568","goodsTypeId":226,"pptPrice":289,"minimumPrice":289,"preferentialPrice":289,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/37673/28/9336/185335/5ccfceaeEc0aba7e3/c72c6fbcd1c0168f.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/37673/28/9336/185335/5ccfceaeEc0aba7e3/c72c6fbcd1c0168f.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:47:16","updateTime":"2019-10-20 10:47:16","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":269,"ustomaryPrice":288,"goodsNumber":10,"enableQuantity":9,"skuId":"217260156726022151","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/37673/28/9336/185335/5ccfceaeEc0aba7e3/c72c6fbcd1c0168f.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217260156726022151","goodsExamineStatus":2,"fyuanaiPrice":269,"activityGoodsGalleryReturns":null},{"activityGoodsId":"217077023288332300","activityId":"214435814979932160","projectId":null,"agencyId":null,"goodsId":"216605263254261760","goodsSn":"ECS216605263254261760","goodsName":"Yessing男女同款马卡龙多色卫衣","goodsNameStyle":"","modelNumber":"ECS216605263254261760","goodsWeight":0.43,"goodsBrief":"简短描述","catId":"213627681340657664","brandId":229,"supplierId":"214364206474989568","goodsTypeId":"216605263258456064","pptPrice":194,"minimumPrice":229,"preferentialPrice":229,"goodOriginalImgUrl":"","goodsCloneImgUrl":"https://yanxuan-item.nosdn.127.net/210b3bd811fc6f9482c3a21a54b32bdb.jpg","goodsThumbnailImgUrl":"","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-18 15:24:57","updateTime":"2019-10-19 22:29:58","giveIntegral":null,"rankIntegral":null,"sourceType":2,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":189,"ustomaryPrice":228,"goodsNumber":10,"enableQuantity":10,"skuId":"216605263317176320","skuImg":"https://yanxuan-item.nosdn.127.net/a5f78bb3158c2bf8d9c8661f288113ef.png","festivalGoodType":null,"rebate":8,"activityGoodsTypeId":null,"defaultSkuId":"216605263317176320","goodsExamineStatus":2,"fyuanaiPrice":189,"activityGoodsGalleryReturns":null},{"activityGoodsId":"217077023292526602","activityId":"214435814979932160","projectId":null,"agencyId":null,"goodsId":"217075108332703744","goodsSn":"ECS217075108332703744","goodsName":"苏宁极物 马卡龙彩色四季防滑拖鞋男款 浅灰 285MM（适合42-43码）","goodsNameStyle":"","modelNumber":"lt1","goodsWeight":0.257,"goodsBrief":"简短描述","catId":"213625838271205376","brandId":16737,"supplierId":"214364206474989568","goodsTypeId":274,"pptPrice":11,"minimumPrice":19,"preferentialPrice":19,"goodOriginalImgUrl":"","goodsCloneImgUrl":"http://imgservice5.suning.cn/uimg1/b2c/image/GpSFE-mSNpzSmG8NCrCkhw.jpg_400w_400h_4e","goodsThumbnailImgUrl":"","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-19 22:31:57","updateTime":"2019-10-19 22:32:59","giveIntegral":null,"rankIntegral":null,"sourceType":3,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":15,"ustomaryPrice":18,"goodsNumber":10,"enableQuantity":10,"skuId":"217075108412395520","skuImg":"http://imgservice5.suning.cn/uimg1/b2c/image/GpSFE-mSNpzSmG8NCrCkhw.jpg_400w_400h_4e","festivalGoodType":null,"rebate":7,"activityGoodsTypeId":null,"defaultSkuId":"217075108412395520","goodsExamineStatus":2,"fyuanaiPrice":15,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218501138645782528","activityId":"214435814979932160","projectId":null,"agencyId":null,"goodsId":"217262293992345601","goodsSn":"ECS217262293992345601","goodsName":"BOB修容棒双头两用高光修容棒笔（立体V脸鼻影侧影卧蚕初学者底妆） 2#棕咖色+送微距遮瑕膏","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656931901280702","brandId":"217262293937819648","supplierId":"214364206474989568","goodsTypeId":1406,"pptPrice":35,"minimumPrice":35,"preferentialPrice":35,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t25705/106/457148146/85394/e755f127/5b704b76N457b887e.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t25705/106/457148146/85394/e755f127/5b704b76N457b887e.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:55:45","updateTime":"2019-10-20 10:55:45","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":30,"ustomaryPrice":34,"goodsNumber":10,"enableQuantity":10,"skuId":"217262294084620293","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t25705/106/457148146/85394/e755f127/5b704b76N457b887e.jpg","festivalGoodType":null,"rebate":8,"activityGoodsTypeId":null,"defaultSkuId":"217262294084620293","goodsExamineStatus":2,"fyuanaiPrice":30,"activityGoodsGalleryReturns":null}]}',
                                "sortOrder": 0,
                                "contentStatus": 0,
                                "remark": null
                            }
                        ]
                    },
										//商品专题2
                    {
                        "componentId": "226664071762546688",
                        "pageId": "226664059531956224",
                        "componentCode": "commodityProject2",
                        "componentName": "本周精选",
                        "sortOrder": 7,
                        "componentStatus": 0,
                        "remark": "",
                        "componentContents": [
                            {
                                "contentId": "226664072219725824",
                                "componentId": "226664071762546688",
                                "picture": "https://img11.360buyimg.com/cms/jfs/t1/54513/8/15043/26775/5dc11f69E19f15933/adc44120a3e58dd6.jpg.webp",
                                "title": "本周精选",
                                "specialDesc": "企采电器优惠采购",
                                "type": 4,
                                "content": '{"bgcolor":"","zoneLink":"","advertisingSlogan":"","activityGoods":[{"activityGoodsId":"218501336394633216","activityId":"214435814979932160","projectId":null,"agencyId":null,"goodsId":"217260157015429120","goodsSn":"ECS217260157015429120","goodsName":"小米路由器4A 无线双频 四天线稳定穿墙 防蹭网 双频合一 稳定高速 家用路由器 智能APP远程控制","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656888095969715","brandId":680,"supplierId":"214364206474989568","goodsTypeId":226,"pptPrice":99,"minimumPrice":99,"preferentialPrice":99,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/62807/18/7972/126887/5d5fc979E132b248a/f478a156e8301a9a.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/62807/18/7972/126887/5d5fc979E132b248a/f478a156e8301a9a.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:47:16","updateTime":"2019-10-20 10:47:16","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":90,"ustomaryPrice":98,"goodsNumber":10,"enableQuantity":10,"skuId":"217260157145452550","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/62807/18/7972/126887/5d5fc979E132b248a/f478a156e8301a9a.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217260157145452550","goodsExamineStatus":2,"fyuanaiPrice":90,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218501336394633226","activityId":"214435814979932160","projectId":null,"agencyId":null,"goodsId":"217260156608581632","goodsSn":"ECS217260156608581632","goodsName":"TP-LINK双千兆路由器 TL-WDR8690 2600M智能无线 5G双频 千兆端口 高速路由 大户型穿墙 内配千兆网线","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656888095969715","brandId":431,"supplierId":"214364206474989568","goodsTypeId":226,"pptPrice":289,"minimumPrice":289,"preferentialPrice":289,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/37673/28/9336/185335/5ccfceaeEc0aba7e3/c72c6fbcd1c0168f.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/37673/28/9336/185335/5ccfceaeEc0aba7e3/c72c6fbcd1c0168f.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:47:16","updateTime":"2019-10-20 10:47:16","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":269,"ustomaryPrice":288,"goodsNumber":10,"enableQuantity":9,"skuId":"217260156726022151","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/37673/28/9336/185335/5ccfceaeEc0aba7e3/c72c6fbcd1c0168f.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217260156726022151","goodsExamineStatus":2,"fyuanaiPrice":269,"activityGoodsGalleryReturns":null},{"activityGoodsId":"217077023288332300","activityId":"214435814979932160","projectId":null,"agencyId":null,"goodsId":"216605263254261760","goodsSn":"ECS216605263254261760","goodsName":"Yessing男女同款马卡龙多色卫衣","goodsNameStyle":"","modelNumber":"ECS216605263254261760","goodsWeight":0.43,"goodsBrief":"简短描述","catId":"213627681340657664","brandId":229,"supplierId":"214364206474989568","goodsTypeId":"216605263258456064","pptPrice":194,"minimumPrice":229,"preferentialPrice":229,"goodOriginalImgUrl":"","goodsCloneImgUrl":"https://yanxuan-item.nosdn.127.net/210b3bd811fc6f9482c3a21a54b32bdb.jpg","goodsThumbnailImgUrl":"","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-18 15:24:57","updateTime":"2019-10-19 22:29:58","giveIntegral":null,"rankIntegral":null,"sourceType":2,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":189,"ustomaryPrice":228,"goodsNumber":10,"enableQuantity":10,"skuId":"216605263317176320","skuImg":"https://yanxuan-item.nosdn.127.net/a5f78bb3158c2bf8d9c8661f288113ef.png","festivalGoodType":null,"rebate":8,"activityGoodsTypeId":null,"defaultSkuId":"216605263317176320","goodsExamineStatus":2,"fyuanaiPrice":189,"activityGoodsGalleryReturns":null},{"activityGoodsId":"217077023292526602","activityId":"214435814979932160","projectId":null,"agencyId":null,"goodsId":"217075108332703744","goodsSn":"ECS217075108332703744","goodsName":"苏宁极物 马卡龙彩色四季防滑拖鞋男款 浅灰 285MM（适合42-43码）","goodsNameStyle":"","modelNumber":"lt1","goodsWeight":0.257,"goodsBrief":"简短描述","catId":"213625838271205376","brandId":16737,"supplierId":"214364206474989568","goodsTypeId":274,"pptPrice":11,"minimumPrice":19,"preferentialPrice":19,"goodOriginalImgUrl":"","goodsCloneImgUrl":"http://imgservice5.suning.cn/uimg1/b2c/image/GpSFE-mSNpzSmG8NCrCkhw.jpg_400w_400h_4e","goodsThumbnailImgUrl":"","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-19 22:31:57","updateTime":"2019-10-19 22:32:59","giveIntegral":null,"rankIntegral":null,"sourceType":3,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":15,"ustomaryPrice":18,"goodsNumber":10,"enableQuantity":10,"skuId":"217075108412395520","skuImg":"http://imgservice5.suning.cn/uimg1/b2c/image/GpSFE-mSNpzSmG8NCrCkhw.jpg_400w_400h_4e","festivalGoodType":null,"rebate":7,"activityGoodsTypeId":null,"defaultSkuId":"217075108412395520","goodsExamineStatus":2,"fyuanaiPrice":15,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218501138645782528","activityId":"214435814979932160","projectId":null,"agencyId":null,"goodsId":"217262293992345601","goodsSn":"ECS217262293992345601","goodsName":"BOB修容棒双头两用高光修容棒笔（立体V脸鼻影侧影卧蚕初学者底妆） 2#棕咖色+送微距遮瑕膏","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656931901280702","brandId":"217262293937819648","supplierId":"214364206474989568","goodsTypeId":1406,"pptPrice":35,"minimumPrice":35,"preferentialPrice":35,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t25705/106/457148146/85394/e755f127/5b704b76N457b887e.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t25705/106/457148146/85394/e755f127/5b704b76N457b887e.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:55:45","updateTime":"2019-10-20 10:55:45","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":30,"ustomaryPrice":34,"goodsNumber":10,"enableQuantity":10,"skuId":"217262294084620293","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t25705/106/457148146/85394/e755f127/5b704b76N457b887e.jpg","festivalGoodType":null,"rebate":8,"activityGoodsTypeId":null,"defaultSkuId":"217262294084620293","goodsExamineStatus":2,"fyuanaiPrice":30,"activityGoodsGalleryReturns":null}]}',
                                "sortOrder": 0,
                                "contentStatus": 0,
                                "remark": null
                            }
                        ]
                    },

                    //特惠专区
                    {
                        "componentId": "226664071762546688",
                        "pageId": "226664059531956224",
                        "componentCode": "special_area",
                        "componentName": "特惠专区",
                        "sortOrder": 8,
                        "componentStatus": 0,
                        "remark": "",
                        "componentContents": [
                            {
                                "contentId": "226664072219725824",
                                "componentId": "226664071762546688",
                                "picture": "http://img.fyuanai.com/test/2019-11-11/7c804579276c4aa3a33cb024c69d26f0-prefer-more.png",
                                "title": "特惠专区",
                                "type": 4,
                                "content": '{"bgcolor":"","zoneLink":"","advertisingSlogan":"","activityGoods":[{"activityGoodsId":"218501336394633216","activityId":"214435814979932160","projectId":null,"agencyId":null,"goodsId":"217260157015429120","goodsSn":"ECS217260157015429120","goodsName":"小米路由器4A 无线双频 四天线稳定穿墙 防蹭网 双频合一 稳定高速 家用路由器 智能APP远程控制","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656888095969715","brandId":680,"supplierId":"214364206474989568","goodsTypeId":226,"pptPrice":99,"minimumPrice":99,"preferentialPrice":99,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/62807/18/7972/126887/5d5fc979E132b248a/f478a156e8301a9a.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/62807/18/7972/126887/5d5fc979E132b248a/f478a156e8301a9a.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:47:16","updateTime":"2019-10-20 10:47:16","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":90,"ustomaryPrice":98,"goodsNumber":10,"enableQuantity":10,"skuId":"217260157145452550","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/62807/18/7972/126887/5d5fc979E132b248a/f478a156e8301a9a.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217260157145452550","goodsExamineStatus":2,"fyuanaiPrice":90,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218501336394633226","activityId":"214435814979932160","projectId":null,"agencyId":null,"goodsId":"217260156608581632","goodsSn":"ECS217260156608581632","goodsName":"TP-LINK双千兆路由器 TL-WDR8690 2600M智能无线 5G双频 千兆端口 高速路由 大户型穿墙 内配千兆网线","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656888095969715","brandId":431,"supplierId":"214364206474989568","goodsTypeId":226,"pptPrice":289,"minimumPrice":289,"preferentialPrice":289,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/37673/28/9336/185335/5ccfceaeEc0aba7e3/c72c6fbcd1c0168f.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/37673/28/9336/185335/5ccfceaeEc0aba7e3/c72c6fbcd1c0168f.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:47:16","updateTime":"2019-10-20 10:47:16","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":269,"ustomaryPrice":288,"goodsNumber":10,"enableQuantity":9,"skuId":"217260156726022151","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/37673/28/9336/185335/5ccfceaeEc0aba7e3/c72c6fbcd1c0168f.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217260156726022151","goodsExamineStatus":2,"fyuanaiPrice":269,"activityGoodsGalleryReturns":null},{"activityGoodsId":"217077023288332300","activityId":"214435814979932160","projectId":null,"agencyId":null,"goodsId":"216605263254261760","goodsSn":"ECS216605263254261760","goodsName":"Yessing男女同款马卡龙多色卫衣","goodsNameStyle":"","modelNumber":"ECS216605263254261760","goodsWeight":0.43,"goodsBrief":"简短描述","catId":"213627681340657664","brandId":229,"supplierId":"214364206474989568","goodsTypeId":"216605263258456064","pptPrice":194,"minimumPrice":229,"preferentialPrice":229,"goodOriginalImgUrl":"","goodsCloneImgUrl":"https://yanxuan-item.nosdn.127.net/210b3bd811fc6f9482c3a21a54b32bdb.jpg","goodsThumbnailImgUrl":"","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-18 15:24:57","updateTime":"2019-10-19 22:29:58","giveIntegral":null,"rankIntegral":null,"sourceType":2,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":189,"ustomaryPrice":228,"goodsNumber":10,"enableQuantity":10,"skuId":"216605263317176320","skuImg":"https://yanxuan-item.nosdn.127.net/a5f78bb3158c2bf8d9c8661f288113ef.png","festivalGoodType":null,"rebate":8,"activityGoodsTypeId":null,"defaultSkuId":"216605263317176320","goodsExamineStatus":2,"fyuanaiPrice":189,"activityGoodsGalleryReturns":null},{"activityGoodsId":"217077023292526602","activityId":"214435814979932160","projectId":null,"agencyId":null,"goodsId":"217075108332703744","goodsSn":"ECS217075108332703744","goodsName":"苏宁极物 马卡龙彩色四季防滑拖鞋男款 浅灰 285MM（适合42-43码）","goodsNameStyle":"","modelNumber":"lt1","goodsWeight":0.257,"goodsBrief":"简短描述","catId":"213625838271205376","brandId":16737,"supplierId":"214364206474989568","goodsTypeId":274,"pptPrice":11,"minimumPrice":19,"preferentialPrice":19,"goodOriginalImgUrl":"","goodsCloneImgUrl":"http://imgservice5.suning.cn/uimg1/b2c/image/GpSFE-mSNpzSmG8NCrCkhw.jpg_400w_400h_4e","goodsThumbnailImgUrl":"","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-19 22:31:57","updateTime":"2019-10-19 22:32:59","giveIntegral":null,"rankIntegral":null,"sourceType":3,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":15,"ustomaryPrice":18,"goodsNumber":10,"enableQuantity":10,"skuId":"217075108412395520","skuImg":"http://imgservice5.suning.cn/uimg1/b2c/image/GpSFE-mSNpzSmG8NCrCkhw.jpg_400w_400h_4e","festivalGoodType":null,"rebate":7,"activityGoodsTypeId":null,"defaultSkuId":"217075108412395520","goodsExamineStatus":2,"fyuanaiPrice":15,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218501138645782528","activityId":"214435814979932160","projectId":null,"agencyId":null,"goodsId":"217262293992345601","goodsSn":"ECS217262293992345601","goodsName":"BOB修容棒双头两用高光修容棒笔（立体V脸鼻影侧影卧蚕初学者底妆） 2#棕咖色+送微距遮瑕膏","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656931901280702","brandId":"217262293937819648","supplierId":"214364206474989568","goodsTypeId":1406,"pptPrice":35,"minimumPrice":35,"preferentialPrice":35,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t25705/106/457148146/85394/e755f127/5b704b76N457b887e.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t25705/106/457148146/85394/e755f127/5b704b76N457b887e.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:55:45","updateTime":"2019-10-20 10:55:45","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":30,"ustomaryPrice":34,"goodsNumber":10,"enableQuantity":10,"skuId":"217262294084620293","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t25705/106/457148146/85394/e755f127/5b704b76N457b887e.jpg","festivalGoodType":null,"rebate":8,"activityGoodsTypeId":null,"defaultSkuId":"217262294084620293","goodsExamineStatus":2,"fyuanaiPrice":30,"activityGoodsGalleryReturns":null}]}',
                                "sortOrder": 0,
                                "contentStatus": 0,
                                "remark": null
                            }
                        ]
                    },

                    //砍价专区
                    {
                        "componentId": "226664071498305536",
                        "pageId": "226664059531956224",
                        "componentCode": "discount_area",
                        "componentName": "砍价专区",
                        "sortOrder": 9,
                        "componentStatus": 0,
                        "remark": "",
                        "componentContents": [
                            {
                                "contentId": "226664071624134656",
                                "componentId": "226664071498305536",
                                "picture": "http://img.fyuanai.com/test/2019-11-12/ca49a983fe134f4a8939dbf0133ff320-sale-more.png",
                                "title": "砍价专区",
                                "type": 4,
                                "content": '{"bgcolor":"#FF5A81","zoneLink":"","advertisingSlogan":"","activityGoods":[{"activityGoodsId":"218504435255480329","activityId":"215057461051133952","projectId":null,"agencyId":null,"goodsId":"217259430364844033","goodsSn":"ECS217259430364844033","goodsName":"AOC 23.8英寸 AH-IPS硬屏 1.5mm窄边框 低蓝光爱眼不闪屏 电脑显示器（HDMI版) I2490VXH/BS","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656884514033878","brandId":528,"supplierId":"214364206474989568","goodsTypeId":1328,"pptPrice":749,"minimumPrice":749,"preferentialPrice":749,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t19843/6/2160171365/339844/53c5fa21/5b32fb3bN09ca4fbc.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t19843/6/2160171365/339844/53c5fa21/5b32fb3bN09ca4fbc.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:44:22","updateTime":"2019-10-20 10:44:22","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":698,"ustomaryPrice":748,"goodsNumber":100,"enableQuantity":100,"skuId":"217259430440341511","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t19843/6/2160171365/339844/53c5fa21/5b32fb3bN09ca4fbc.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217259430440341511","goodsExamineStatus":2,"fyuanaiPrice":698,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218504435251286030","activityId":"215057461051133952","projectId":null,"agencyId":null,"goodsId":"217259430851383296","goodsSn":"ECS217259430851383296","goodsName":"三星（SAMSUNG）27英寸曲面 可壁挂 HDMI接口 节能爱眼认证 FreeSync技术 电脑显示器（C27F390FHC）","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656884514033878","brandId":404,"supplierId":"214364206474989568","goodsTypeId":1328,"pptPrice":999,"minimumPrice":999,"preferentialPrice":999,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/69371/18/12439/194637/5d9e9bb1E76f68e3c/7afc2773bd4a1edd.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/69371/18/12439/194637/5d9e9bb1E76f68e3c/7afc2773bd4a1edd.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:44:23","updateTime":"2019-10-20 10:44:23","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":928,"ustomaryPrice":998,"goodsNumber":100,"enableQuantity":100,"skuId":"217259430926880768","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/69371/18/12439/194637/5d9e9bb1E76f68e3c/7afc2773bd4a1edd.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217259430926880768","goodsExamineStatus":2,"fyuanaiPrice":928,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218504435251286016","activityId":"215057461051133952","projectId":null,"agencyId":null,"goodsId":"217259430201266177","goodsSn":"ECS217259430201266177","goodsName":"HKC 23.6英寸 VA面板 白色 纤薄微边框 办公壁挂家用 1080p 宽屏 壁挂 滤蓝光不闪屏 电脑液晶显示器 H240W","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656884514033878","brandId":531,"supplierId":"214364206474989568","goodsTypeId":1328,"pptPrice":599,"minimumPrice":599,"preferentialPrice":599,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t17122/235/2549823387/481384/8efe1e93/5b029cc8N58f93270.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t17122/235/2549823387/481384/8efe1e93/5b029cc8N58f93270.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:44:22","updateTime":"2019-10-20 10:44:22","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":536,"ustomaryPrice":598,"goodsNumber":100,"enableQuantity":100,"skuId":"217259430276763648","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t17122/235/2549823387/481384/8efe1e93/5b029cc8N58f93270.jpg","festivalGoodType":null,"rebate":8,"activityGoodsTypeId":null,"defaultSkuId":"217259430276763648","goodsExamineStatus":2,"fyuanaiPrice":536,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218505029483499533","activityId":"215057461051133952","projectId":null,"agencyId":null,"goodsId":"217259431178539009","goodsSn":"ECS217259431178539009","goodsName":"戴尔（DELL） U2417H 23.8英寸四边微边框旋转升降IPS屏 出厂色彩校准 99%sRGB 个人商务 电脑显示器自营","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656884514033878","brandId":485,"supplierId":"214364206474989568","goodsTypeId":1328,"pptPrice":1369,"minimumPrice":1369,"preferentialPrice":1369,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t19465/355/1589199191/309972/37772b63/5ad06fc6N291eab65.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t19465/355/1589199191/309972/37772b63/5ad06fc6N291eab65.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:44:23","updateTime":"2019-10-20 10:44:23","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":1269,"ustomaryPrice":1368,"goodsNumber":100,"enableQuantity":100,"skuId":"217259431258230784","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t19465/355/1589199191/309972/37772b63/5ad06fc6N291eab65.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217259431258230784","goodsExamineStatus":2,"fyuanaiPrice":1269,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218505029483499520","activityId":"215057461051133952","projectId":null,"agencyId":null,"goodsId":"217259431354699777","goodsSn":"ECS217259431354699777","goodsName":"三星（SAMSUNG）23.8英寸 爱眼不闪屏滤蓝光 可壁挂 FreeSync 液晶电脑显示器 S24R352FHC（HDMI接口）","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656884514033878","brandId":404,"supplierId":"214364206474989568","goodsTypeId":1328,"pptPrice":799,"minimumPrice":799,"preferentialPrice":799,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/47817/28/8450/393626/5d5df56aEad69d907/0812f5575a9ddfe2.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/47817/28/8450/393626/5d5df56aEad69d907/0812f5575a9ddfe2.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:44:23","updateTime":"2019-10-20 10:44:23","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":699,"ustomaryPrice":798,"goodsNumber":100,"enableQuantity":100,"skuId":"217259431442780160","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/47817/28/8450/393626/5d5df56aEad69d907/0812f5575a9ddfe2.jpg","festivalGoodType":null,"rebate":8,"activityGoodsTypeId":null,"defaultSkuId":"217259431442780160","goodsExamineStatus":2,"fyuanaiPrice":699,"activityGoodsGalleryReturns":null},{"activityGoodsId":"218505029479305216","activityId":"215057461051133952","projectId":null,"agencyId":null,"goodsId":"217259430520033280","goodsSn":"ECS217259430520033280","goodsName":"AOC U2790PQU 27英寸 4K高清 IPS广视角 微框 99% sRGB 商用办公节能 低蓝光不闪旋转升降PS4液晶显示器","goodsNameStyle":"+","modelNumber":"","goodsWeight":0,"goodsBrief":"","catId":"212656884514033878","brandId":528,"supplierId":"214364206474989568","goodsTypeId":1328,"pptPrice":1899,"minimumPrice":1899,"preferentialPrice":1899,"goodOriginalImgUrl":null,"goodsCloneImgUrl":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/6134/10/4000/295624/5bd7c650Eee34681d/e2a45eba33b7ee39.jpg","goodsThumbnailImgUrl":"http://img13.360buyimg.com/n4/jfs/t1/6134/10/4000/295624/5bd7c650Eee34681d/e2a45eba33b7ee39.jpg","isReal":1,"isOnSale":1,"isAloneSale":null,"isDelete":0,"createTime":"2019-10-20 10:44:23","updateTime":"2019-10-20 10:44:23","giveIntegral":null,"rankIntegral":null,"sourceType":1,"reviewStatus":2,"isAbnormal":null,"extensionCode":null,"sortOrder":null,"adminId":"214364922438488065","isHaveSpec":1,"isBest":0,"isNew":0,"isHot":0,"goodsDesc":null,"salePrice":1799,"ustomaryPrice":1898,"goodsNumber":100,"enableQuantity":100,"skuId":"217259430599725056","skuImg":"http://img13.360buyimg.com/n1/s800x800_jfs/t1/6134/10/4000/295624/5bd7c650Eee34681d/e2a45eba33b7ee39.jpg","festivalGoodType":null,"rebate":9,"activityGoodsTypeId":null,"defaultSkuId":"217259430599725056","goodsExamineStatus":2,"fyuanaiPrice":1799,"activityGoodsGalleryReturns":null}]}',
                                "sortOrder": 0,
                                "contentStatus": 0,
                                "remark": "remark"
                            }
                        ]
                    },
                    //底部
                    {
                        "componentId": "226664072748208128",
                        "pageId": "226664059531956224",
                        "componentCode": "big_footer",
                        "componentName": "底部",
                        "sortOrder": 10,
                        "componentStatus": 0,
                        "remark": "",
                        "componentContents": [
                            {
                                "contentId": "226664072924368896",
                                "componentId": "226664072748208128",
                                "picture": " ",
                                "title": " ",
                                "type": 4,
                                "content": '{"QRcodeS":[{"imgUrl":"http://img.fyuanai.com/test/2019-11-12/10605ab6106b45838067414599d67d7d-QR_official-account.jpg","imgLink":"博士鹰微信公众号"},{"imgUrl":"http://img.fyuanai.com/test/2019-11-11/43cd2b1a1ddf4aeca812bf286eb36385-QR_app.jpg","imgLink":"下载APP"}],"articleManagement":{"copyright":"@Copyright 2018供应链管理平台 专利申请 版权所有丨 粤ICP备17053705号-3","bgcolor":"","relatedProducts":"","relatedDownload":[{"download":"","relatedLink":"","relatedProducts":"员工福利系统|"},{"download":"","relatedLink":"","relatedProducts":"积分兑换商城|"},{"download":"","relatedLink":"","relatedProducts":"企业集采系统"}],"download":"供应商管理系统-APP下载"}}',
                                "sortOrder": 0,
                                "contentStatus": 0,
                                "remark": "remark"
                            }
                        ]
                    }
                ]
            }
        },
        async created() {
            await this.getNewArr()

            // await this.getHomeList()
            this.filterComponent()
            const res = await getActivity()
            if (res.code === 200) {
                this.activityList = res.data
            }
        }
        ,
        watch: {
            newArr(val) {
                console.log(val)
            },
        },
        methods: {
            //处理
           async getNewArr() {
                const projectId = '2087441284866120'
                const res = await getHomeDetails2(projectId)
               if (res.code === 200) {
                   this.homeEidtList = res.data.components
                   let newArr = [];
                   this.homeEidtList.forEach((value, index, array) => {
                       if(newArr.length==0){
                           newArr.push([value]);
                       } else if(value.sortOrder==newArr[newArr.length-1][0].sortOrder){
                           newArr[newArr.length-1].push(value);
                       } else {
                           newArr.push([value]);
                       }
                   })
                   this.newArr = newArr
                   this.newArrCopy=[...this.newArr]
                   console.log(this.newArr)
               }
               this.$store.commit('SET_HOME',this.homeEidtList)


                // this.homeEidtList = this.componentArr
                // let newArr = [];
                // this.homeEidtList.forEach((value, index, array) => {
                //     if (newArr.length == 0) {
                //         newArr.push([value]);
                //     } else if (value.sortOrder == newArr[newArr.length - 1][0].sortOrder) {
                //         newArr[newArr.length - 1].push(value);
                //     } else {
                //         newArr.push([value]);
                //     }
                // })
                // this.newArr = newArr
                // this.newArrCopy = [...this.newArr]
                // this.newArr.forEach((item, index) => {
                //     item.forEach(items => {
                //         if (items.componentStatus === 2) {
                //             this.notArr.push(item)
                //             this.$nextTick(() => {
                //                 this.newArr.splice(index, 1)
                //             })
                //         }
                //     })
                // })
            },


            //添加之后重新排序  进行筛选
            handleUpdate() {
                this.datadragEnd()
            },
            //移动出后删除
            handlemove(evt) {
                const componentId = evt.draggedContext.element[0].componentId
                this.notArr.forEach((item, index) => {
                    item.forEach((items) => {
                        if (componentId === items.componentId) {
                            this.notArr.splice(index, 1)
                        }
                    })
                })
            },
            // 筛选已有的组件
            filterComponent() {
                this.filterComponents = JSON.parse(JSON.stringify(this.notArr))
                this.filterComponents.forEach(item => {
                    item.forEach((items) => {
                        items.componentStatus = 0
                    })
                })
            },
            //筛选
            async getHomeList() {
                const projectId = '220988752988737536'
                const res = await getHomeDetails2(projectId)
                if (res.code === 200) {
                    this.homeEidtList = res.data.components
                    let newArr = [];
                    this.homeEidtList.forEach((value, index, array) => {
                        if (newArr.length == 0) {
                            newArr.push([value]);
                        } else if (value.sortOrder == newArr[newArr.length - 1][0].sortOrder) {
                            newArr[newArr.length - 1].push(value);
                        } else {
                            newArr.push([value]);
                        }
                    })
                    this.newArr = newArr
                    this.newArrCopy = [...this.newArr]
                    this.newArr.forEach((item, index) => {
                        item.forEach(items => {
                            if (items.componentStatus === 2) {
                                this.notArr.push(item)
                                this.$nextTick(() => {
                                    this.newArr.splice(index, 1)
                                })
                            }
                        })
                    })
                }
            },

            //获取数组移动之后的结构
            datadragEnd() {
                this.newArr.forEach((item, index) => {
                    item.forEach(items => {
                        items.sortOrder = index
                    })
                })
            },
            deleteComponent(componentId) {
                this.newArr.forEach((item, index) => {
                    item.forEach((items, indexs) => {
                        if (componentId == items.componentId) {
                            this.newArr.splice(index, 1)
                            items.componentStatus = 2
                            this.notArr.push(item);
                        }
                    })
                })

                setTimeout(() => {
                    this.filterComponent()
                })
            }
            ,
            //保存
            async saveGroup() {
                let num = 99999
                this.notArr.forEach(item => {
                    item.forEach(items => {
                        items.sortOrder = num
                    })
                })
                this.newArr = this.newArr.concat(this.notArr)
                let pageComponentModifyParamList = []
                this.newArr.forEach(item => {
                    item.forEach(items => {
                        const obj = {
                            componentId: items.componentId,
                            sortOrder: items.sortOrder,
                            componentStatus: items.componentStatus,
                            remark: '',
                        }
                        pageComponentModifyParamList.push(obj)
                    })
                })
                const res = await updateList(pageComponentModifyParamList)
                if (res.code === 200) {
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    })
                    this.getHomeList()
                }
            }
            ,

            //点击还原
            reduction() {
                this.$nextTick(() => {
                    this.newArr = [...this.newArrCopy]
                })
            },
            gohtml() {
                let BASE_URL = ''
                if (process.env.NODE_ENV === 'development') {
                    // BASE_URL = `http://www.maige.com`
                    BASE_URL = `http://jc.test.fyuanai.com`
                } else if (location.hostname == 'bg.test.fyuanai.com') {
                    BASE_URL = `http://jc.test.fyuanai.com`
                } else {
                    BASE_URL = `http://${location.hostname}`
                }
                window.open(BASE_URL, '_blank')
            }
        }
    }
</script>
<style lang="scss" scoped>
		.preview {
				display: flex;
				width: 100%;

				.previewList {
						li {
								margin: 10px 0;
								width: 90px;
								height: 40px;
								text-align: left;
								line-height: 40px;
								font-size: 13px;
								font-family: Microsoft YaHei;
								font-weight: 400;
								color: rgba(60, 60, 60, 1);
								cursor: default;

								&.active {
										background: #4C86F4;
										color: white;
								}
						}
				}

				.baseModule {
						background: rgba(255, 255, 255, 1);
						box-shadow: 0px 2px 6px 0px rgba(0, 5, 14, 0.1);
						width: 180px;

						.baseModuleCenter {
								width: 161px;
								margin: 0 auto;
								position: fixed;
								z-index: 888,
						}
				}

				.tabNavContainer {
						width: 100%;

						.tabNavWrap {
								margin: 28px auto;
								width: 1001px;
								overflow: hidden;

								.tabNav {
										width: 1002px;
										height: 40px;
										border: 1px solid rgba(76, 134, 244, 1);
										border-radius: 4px;

										.moudelList {
												cursor: pointer;
												border-right: 1px solid rgba(76, 134, 244, 1);
												float: left;
												width: 200px;
												height: 40px;
												text-align: center;
												line-height: 40px;
												font-size: 16px;
												font-family: Microsoft YaHei;
												font-weight: 400;
												color: rgba(76, 134, 244, 1);

												&.activet {
														background: rgba(76, 134, 244, 1);
														color: rgba(255, 255, 255, 1);
												}
										}
								}
						}

						.prompt {
								display: flex;
								justify-content: space-between;
								margin: 30px auto;
								width: 1594px;
								height: 66px;
								line-height: 66px;
								background: rgba(255, 255, 255, 1);
								border: 1px solid rgba(214, 222, 239, 1);
								font-size: 14px;
								font-family: Microsoft YaHei;
								font-weight: 400;
								color: rgba(76, 134, 244, 1);

								.promptLeft {
										margin-left: 21px;

										img {
												margin-right: 10px;
												width: 16px;
												height: 20px;
										}
								}

								.promptRight {
										width: 355px;
										display: flex;
										justify-content: space-around;

										.previews, .cancel {
												cursor: pointer;

												img {
														cursor: pointer;
														margin-right: 10px;
												}
										}

										.cancel {
												div {
														display: inline;
														padding: 0 20px;
														border-left: 1px solid rgba(220, 223, 230, 1);
														border-right: 1px solid rgba(220, 223, 230, 1)
												}
										}

										.confrim {
												margin-top: 17px;
												cursor: pointer;
												width: 68px;
												height: 32px;
												text-align: center;
												line-height: 32px;
												background: rgba(76, 134, 244, 1);
												border-radius: 3px;
												font-size: 12px;
												font-family: Microsoft YaHei;
												font-weight: 400;
												color: rgba(255, 255, 255, 1);
										}
								}
						}
				}
		}

		.baseModuleContainer {
				margin-top: 14px;
				width: 100%;
				font-size: 14px;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: rgba(96, 98, 102, 1);

				.set {
						display: flex;
						justify-content: center;
						align-items: center;
						width: 161px;
						height: 48px;
						background: rgba(240, 243, 250, 1);

						img {
								background: white;
								margin-right: 10px;
								width: 15px;
								height: 15px;
								background: white;
								cursor: default;
						}
				}

				.baseModuleList {
						display: flex;
						justify-content: space-around;
						flex-wrap: wrap;
						width: 100%;

						.baseModuleListLeft {
								cursor: move;
								margin: 7px 0;
								width: 65px;
								height: 70px;
								background: rgba(247, 250, 255, 1);
								border: 1px solid rgba(227, 232, 243, 1);
								display: flex;
								justify-content: space-around;
								align-items: center;
								flex-direction: column;

								img {
										cursor: pointer;
										width: 24px;
										height: 24px;
								}
						}
				}
		}

		.dragArea {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
		}

		.commoneContainer {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;

				img {
						margin-bottom: 6px;
				}
		}
</style>

