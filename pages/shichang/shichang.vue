<template>
	<view>
		<LotusLoading :lotusLoadingData="lotusLoadingData"></LotusLoading>

		<swiper-tab-head :tabBars="tabBars" :tabIndex="tabIndex" @tabtap="tabtap"></swiper-tab-head>
		<view class="uni-tab-bar">
			<swiper class="swiper-box kong" :style="{ height: swiperheight + 'px' }" :current="tabIndex" @change="tabChange">
				<!--是否开启接单     -->

				<view class="anniu" v-if="tabIndex === 0">
					<view class="you">
						<text v-if="iskaiqi">接单开启中</text>
						<text v-if="!iskaiqi">未开启接单</text>
					</view>
					<view class="zuo" @click="jiedan()">
						<text v-if="iskaiqi">点击关闭接单</text>
						<text v-if="!iskaiqi">点击开启接单</text>
					</view>
				</view>

				<swiper-item v-for="(items, index) in newslist" :key="index">
					<scroll-view scroll-y class="list">
						<template v-if="items.list.length > 0">
							<daijiedan v-if="index === 0" :tabBars="items.list"></daijiedan>
							<baojiazhong v-if="index === 1" :tabBars="items.list"></baojiazhong>
							<jinqidingdan v-if="index === 2" v-on:getbaojiaL="getbaojiaL" :tabBars="items.list"></jinqidingdan>
						</template>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import swiperTabHead from '../../components/index/swiper-tab-head.vue';
import LotusLoading from '../../components/Winglau14-lotusLoading/Winglau14-LotusLoading.vue';
import indexjs from '../../common/indexjs/indexjs.js';
export default {
	components: {
		swiperTabHead,
		LotusLoading
	},
	data() {
		return {
			swiperheight: 500,
			tabIndex: 0,

			role: '',
			releaseType: '',
			isbut: false,
			tabBars: [],
			newslist: [],
			//加载中组件数据
			lotusLoadingData: {
				isShow: false //设置显示加载中组件true显示false隐藏
			}
		};
	},
	onLoad(e) {
		//页面加载
		uni.getSystemInfo({
			//高度适配
			success: res => {
				let height = res.windowHeight - uni.upx2px(100);
				this.swiperheight = height;
			}
		});
		this.role = e.role;
		this.releaseType = Number(e.releaseType);
		this.__init();
		 
	},
	//页面每次出现都检查是否开启接到哪如果开启刷新订单
	onShow() {},
	// 监听搜索框点击事件
	onNavigationBarSearchInputClicked() {},
	// 监听原生标题导航按钮点击事件
	onNavigationBarButtonTap(e) {},
	methods: {
		__init() {
			if (this.tabBars.length === 0 || this.newslist.length === 0) {
				let resule = indexjs.quanbudingdao();
				this.tabBars = resule.tabBars;
				this.newslist = resule.newslist;
			}
			console.log(this.releaseType);
			for (let a = 0; a < this.tabBars.length; a++) {
				console.log(this.tabBars[a].releaseType);
				if (this.tabBars[a].releaseType === this.releaseType) {
					this.tabIndex = a;
					this.getnews(this.tabIndex);
					break;
				}
			}
		},

		//刷新列表
		getnews(index) {
			this.lotusLoadingData.isShow = true;
			let releaseType = this.newslist[index].releaseType;
			let list = this.newslist[index].list.length;
			if (releaseType !== 30 && releaseType !== 31 && releaseType !== 35) {
			}
			let param = {
				releaseType
			};
			for (let a = 0; a < 1000; a++) {
			//	console.log(a)
			}
			
			this.lotusLoadingData.isShow = false;
		},

		// tabbar点击事件
		tabtap(index) {
			this.tabIndex = index;
			
			//this.getnews(this.tabIndex); 点击时会触发滑动
		},
		// 滑动事件
		tabChange(e) {
			this.tabIndex = e.detail.current;
			this.getnews(this.tabIndex);
		}
	}
};
</script>

<style>
.kong {
	padding: 0 30upx 0 30upx;
}
</style>
