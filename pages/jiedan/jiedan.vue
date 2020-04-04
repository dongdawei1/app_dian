<template>
	<view>
		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap">
		</swiper-tab-head>
		<swiper class="swiper-box kong" :style="{height:swiperheight+'px'}" :current="tabIndex" @change="tabChange">
         <!--是否开启接单-->
	 
      			<view class="anniu" v-if="tabIndex===0" >
      				<view class="you">
						<text  v-if="iskaiqi"> 接单开启中</text>
						<text  v-if="!iskaiqi">未开启接单</text>
					</view>
					<view  class="zuo"   @click="jiedan()">
						<text  v-if="iskaiqi"> 点击关闭接单</text>
						<text  v-if="!iskaiqi">点击开启接单</text>
					</view>
      			</view>
			
			<swiper-item v-for="(items,index) in newslist" :key="index">
				<scroll-view scroll-y class="list">
					<template v-if="items.list.length>0">
					<daijiedan v-if="index===0"  :tabBars="items.list"></daijiedan>
					
					</template>
				</scroll-view>
			</swiper-item>

		</swiper>

	</view>
</template>

<script>
	import swiperTabHead from "../../components/index/swiper-tab-head.vue";
	import daijiedan from "../../components/index/daijiedan.vue";
	export default {
		components: {
			swiperTabHead,
daijiedan,
		},
		data() {
			return {
				swiperheight: 500,
				tabIndex: 0,
				iskaiqi:false,
				tabBars: [{
						name: "待报价订单",
						id: "daibaojia"
					},
					{
						name: "已报价订单",
						id: "yibaojia"
					},
					{
						name: "待送货订单",
						id: "daisong"
					}
				],
				newslist: [{
					list: []
				}, {
					list: [{
							name: "待报价订单",
							id: "daibaojia"
						},
						{
							name: "已报价订单",
							id: "yibaojia"
						},
						{
							name: "待送货订单",
							id: "daisong"
						}
					]
				}, {
					list: [{
							name: "待报价订单",
							id: "daibaojia"
						},
						{
							name: "已报价订单",
							id: "yibaojia"
						},
						{
							name: "待送货订单",
							id: "daisong"
						}
					]
				}],

			}
		},
		onLoad() { //页面加载
			uni.getSystemInfo({ //高度适配
				success: (res) => {
					let height = res.windowHeight - uni.upx2px(100)
					this.swiperheight = height;
				}
			});
			this.__init();

			uni.$on('getjinxin',(data)=>{
				let list=[];
				list[0]=data;
				for(let a=0;a<this.newslist[0].list.length;a++){
					list[a+1]=this.newslist[0].list[a];
				}				
				this.newslist[0].list=list;
			})
		
		
		
		},

		// 监听搜索框点击事件
		onNavigationBarSearchInputClicked() {

		},
		// 监听原生标题导航按钮点击事件
		onNavigationBarButtonTap(e) {

		},
		methods: {
			__init() {
			},
			
			jiedan(){
				if(!this.iskaiqi){
					this.$chat.Open();
					//再去调用接口
					this.getjinxinL()
				}else{
					this.$chat.Close();
				}
				this.iskaiqi=!this.iskaiqi;
			},
		
			// tabbar点击事件
			tabtap(index) {
				this.tabIndex = index;
			},
			// 滑动事件
			tabChange(e) {
				this.tabIndex = e.detail.current;
			},
			//获取待报价订单
			getjinxinL() {
				let uuidform = {
					uuid: this.$http.getUuid(),
					releaseType: 4
				};
				//查询有没有近3天订单
				this.$http.get(this.$urlconfig.getdaibaojia, uuidform, {}).then(data => {
					console.log(data);
					if (data.status === 0) {
						if (data.data !== null) {
							let list=data.data;
							
							
							for(let a=0;a<list.length;a++){
								list[a].commoditySnapshot = JSON.parse(list[a].commoditySnapshot);
							}
							this.newslist[0].list=list;
							console.log(this.newslist)
						}
					}
				});
			},

		},


	}
</script>

<style>
.anniu{
    display: flex;
    justify-content: space-between;
	padding:10upx  70upx 10upx 70upx;	
}
.anniu view{
	
	border-radius: 10upx;
	color: #ffffff;
}
.you{
	padding:20upx  30upx 20upx 30upx;
	background: #9f9f9f;
}
.zuo{
	padding:20upx  100upx 20upx 100upx;
	background: #FCC1C3;
}
.kong{
	padding:0 30upx 0 30upx;
}
</style>
