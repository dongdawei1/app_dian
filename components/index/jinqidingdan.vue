<template>

	<view class="xiabian">
		<view class="juzhong"> 四天内已送货、送货中、待收货的订单</view>
		<block v-for="(tab,index) in tabBars" :key="index">
			<view class="liebiao">
				<view class="fromDataTitleClass">
					订单id:{{tab.id}} 采购详情
				</view>
				<!--商品详情-->
				<view v-for="(itshang , index1) in  tab.commoditySnapshot" :key="index1">
					<view class="xiangqing">
						<text>{{itshang.serviceType}}</text>
						<text> 采购数量:{{itshang.number}}</text>
						<text>{{itshang.specifiName}}</text>
						<text v-if="itshang.specifi_cations !==undefined &&  itshang.specifi_cations !=='--'">包装规格:{{itshang.specifi_cations}}</text>
						<text v-if=" itshang.remarks!== null && itshang.remarks!== undefined && itshang.remarks!=='' ">备注:{{itshang.remarks}}</text>
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
						店名：{{tab.guanShanReason}}
					</view>

					<view>
						联系人：{{tab.paymentTime}}
					</view>
					<view>
						联系方式：{{tab.guanShanTime}}
					</view>

					<view>
						备注信息：
						<text v-if="tab.remarks===null || tab.remarks===undefined || tab.remarks===''"> --</text>
						<text v-if="tab.remarks!==null"> {{tab.remarks}}</text>
					</view>
					<view>
						到货时间：{{tab.giveTakeTime}}
					</view>
					<view>
						已支付金额：{{tab.guaranteeMoney}}(元)
					</view>
					<view>
						待收金额：{{tab.balanceMoney}}(元)
					</view>
					<view>
						订单状态：
						<text v-if="tab.orderStatus===5" class="daipingjia"> 待评价</text>
						<text v-if="tab.orderStatus===16" class="daishouhuo">待确认收货(收货方确认后才能离开)</text>
					</view>

				</view>
				<view class="button-sp-area  tijiao" v-if="tab.orderStatus===4">
					<button type="warn" size="mini" @click="tijiao(tab.id)" :loading="loading">请求收货</button>
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
		data() {
			return {
				loading: false
			}
		},
		methods: {
			tijiao(id) {
				// id,orderStatus  16  releaseType 4  shouhuo
				//(long id, long saleUserId, int orderStatus  16, int releaseType 4);
				let uuidform = {
					uuid: this.$http.getUuid(),
					id: id,
					orderStatus: 16,
					releaseType: 4
				};
				this.loading = true;
				this.$http.get(this.$urlconfig.shouhuo, uuidform, {}).then(data => {
					this.loading = false;
					//{status: 1, msg: "不能重复报价", data: null, success: false}
					if (data.status === 0) {
						uni.showToast({
							title: data.data,
							icon: "none"
						});
						this.$emit("getbaojiaL");
					} else {
						uni.showToast({
							title: data.msg,
							icon: "none"
						});
					}
				});

			}
		}
	}
</script>

<style>
	.xiangqing {
		/* display: inline; */
		padding: 0 30upx 0 0;

	}

	.xiangqing text {
		padding: 3upx 10upx 3upx 20upx;
		font-size: 34upx;
		line-height: 40upx;
		/* display: inline; */
	}

	.liebiao {
		padding: 0 0 5upx 0;
	}

	.shangjia {


		font-size: 33upx;
		line-height: 35upx;
		color: #000000;
		padding: 5upx 0 5upx 0;
	}

	.daipingjia {
		color: #3fbf00;
	}

	.daishouhuo {
		color: #f00000;
	}


	.qitaxinxi view {
		color: #6F6B6E;
		padding: 3upx 0 3upx 20upx;
		font-size: 32upx;
		line-height: 34upx;
	}


	.xiabian {
		padding: 0 0 80upx 0;
	}

	.juzhong {
		padding: 20upx 10upx 20upx 10upx;
		text-align: center;
		font-size: 34upx;
	}

	.tijiao {
		text-align: center;
		padding: 5upx 20upx 5upx 20upx;
	}
</style>
