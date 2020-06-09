<template>

	<view class="xiabian">
		<view class="juzhong"> 报价中、报价失败已退款的订单</view>
		<block v-for="(tab,index) in tabBars" :key="index">
			<view class="liebiao">
				<view class="fromDataTitleClass">
					订单id:{{tab.id}} 采购详情
				</view>

				<view v-if="tab.orderStatus===11 || tab.orderStatus===18 || tab.orderStatus===12">
					<!--商品详情-->
					<view v-for="(itshang , index1) in  tab.commoditySnapshot" :key="index1">
						<view class="oxiangqing">
							<view>{{itshang.serviceType}}</view>
							<view> 采购数量:{{itshang.number}}</view>
							<view>{{itshang.specifiName}}</view>
							<view v-if="itshang.specifi_cations !==undefined &&  itshang.specifi_cations !=='--'">包装规格:{{itshang.specifi_cations}}</view>
							<view v-if=" itshang.remarks!== null && itshang.remarks!== undefined && itshang.remarks!=='' ">备注:{{itshang.remarks}}</view>
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
							选择截止时间：{{tab.guanShanTime}}
						</view>
						<view>
							冻结金额(四舍五入)：{{tab.commodityZongJiage}}(元)
						</view>
						<view v-if="tab.orderStatus===11 || tab.orderStatus===18">
							<text class="xuanze" >
								订单状态：待发布商户选择供货商
							</text>
						</view>
						<view v-if="tab.orderStatus===12">
							<text  class="yufuzhong">
								订单状态：待发布商户支付预付金
							</text>
						</view>
					</view>
				</view>
				<view v-if="tab.orderStatus===3">
					<view class="qitaxinxi">
						<view>
							解冻金额(四舍五入)：{{tab.commodityZongJiage}}
						</view>
						<view>
							<text class="shibai">
								订单状态：接单失败
							</text>
						</view>
					</view>
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
		methods: {}
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
		padding: 2upx 0 20upx 20upx;
		font-size: 30upx;
		line-height: 33upx;
	}


	.xiabian {
		padding: 0 0 80upx 0;
	}

	.juzhong {
		padding: 20upx 10upx 20upx 10upx;
		text-align: center;
		font-size: 34upx;
	}

	.yufuzhong {
		color: #3fbf00;
	}

	.shibai {
		color: #c600c6;
	}

	.xuanze {
		color: #c70000;
	}
</style>
