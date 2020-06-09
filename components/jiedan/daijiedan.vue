<template>

	<view class="xiabian">
		<block v-for="(tab,index) in tabBars" :key="index">
			<view class="liebiao">
				<view class="fromDataTitleClass">
					订单id:{{tab.id}} 采购详情
				</view>
				<!--商品详情-->
				<view v-for="(itshang , index1) in  tab.commoditySnapshot" :key="index1" v-if="index1<3">
					<view class="oxiangqing">
						<view>{{itshang.serviceType}}</view>
						<view> 采购数量:{{itshang.number}}</view>
						<view>{{itshang.specifiName}}</view>
						<view v-if="itshang.specifi_cations !==undefined &&  itshang.specifi_cations !=='--'">包装规格:{{itshang.specifi_cations}}</view>
						<view v-if=" itshang.remarks!== null && itshang.remarks!== undefined && itshang.remarks!=='' ">备注:{{itshang.remarks}}</view>
						<view v-if=" index1===2 " class="gengduo">更多采购请去报价页查看...</view>
					</view>
				</view>

				<view class="shangjia">
					其他信息
				</view>
				<view class="qitaxinxi">
					<view>
						送货地址：{{tab.addressDetailed}}
					</view>
					<view>
						备注信息：
						<text v-if="tab.remarks===null || tab.remarks===undefined || tab.remarks===''"> --</text>
						<text v-if="tab.remarks!==null"> {{tab.remarks}}</text>
					</view>
					<view>
						送货时间：{{tab.giveTakeTime}}
					</view>
					<view>
						发布时间：{{tab.createTime}}
					</view>
					<view>
						报价截止时间：{{tab.guanShanTime}}
					</view>
				</view>

				<view class="xuaznebutton" @click="qubaojia(tab)">
					<view class="juzhong">去报价</view>
				</view>


			</view>
		</block>

	</view>
</template>

<script>
	export default {
		props: {
			tabBars: Array,
		},
		methods: {
			qubaojia(tab) {
				let url = '../jiedanbaojia/jiedanbaojia?item=' + encodeURIComponent(JSON.stringify(tab));
				uni.navigateTo({
					url: url
				})
			},
		}
	}
</script>

<style>
	.liebiao {
		padding: 0 0 5upx 0;
	}

	.shangjia {


		font-size: 33upx;
		line-height: 35upx;
		color: #000000;
		padding: 5upx 0 5upx 0;
	}

	.qitaxinxi view {
		color: #6F6B6E;
		padding: 2upx 0 2upx 20upx;
		font-size: 30upx;
		line-height: 33upx;
	}

	.gengduo {
		color: #FCC1C3;
	}

	/* 去报价按钮 */
	.xuaznebutton {
		color: #FFFFFF;
		border-radius: 10upx;
		background: #FCC1C3;
	}

	.juzhong {
		padding: 1upx 10upx 1upx 10upx;
		text-align: center;
		font-size: 28upx;
	}

	.xiabian {
		padding: 0 0 120upx 0;
	}
</style>
