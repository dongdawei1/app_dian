<template>

	<view class="xiabian">

		<view>采购id: {{item.id}}</view>
		<view>送货地址: {{item.addressDetailed}}(商家选择后可见地址详情)</view>
		<view>发布时间: {{item.createTime}}</view>
		<view>收货时间: {{item.giveTakeTime}}</view>
		<view>报价结束时间: {{item.guanShanTime}}</view>
		<view>备注信息:
			<text v-if="item.remarks===null || item.remarks===undefined || item.remarks===''"> --</text>
			<text v-if="item.remarks!==null"> {{item.remarks}}</text>
		</view>
		<view class="juzhong">商品详情</view>
		<!--商品详情-->
		<view v-for="(itshang , index1) in  item.commoditySnapshot" :key="index1">
			<view class="xiangqing">
				<text>{{itshang.serviceType}}</text>
				<text> 采购数量:{{itshang.number}} ({{itshang.specifiName}})</text>
				<text v-if="itshang.specifi_cations !==undefined &&  itshang.specifi_cations !=='--'">包装规格:{{itshang.specifi_cations}}</text>
				<text v-if=" itshang.remarks!== null && itshang.remarks!== undefined && itshang.remarks!=='' ">备注:{{itshang.remarks}}</text>
				<text v-if=" itshang.remarks=== null || itshang.remarks=== undefined || itshang.remarks==='' ">备注:---</text>
			</view>
		</view>
		<view class="beizhu">注：报价后不能修改，报价成功后扣除报价金额的20%的质保金；
			抢单成功，送货后无纠纷24小时内退还，抢单失败后5分钟内退还。</view>
		<view class="list">

			<view class="list-call">
				<image class="img" src="/static/biaoge/fufei.png"></image>
				<input class="biaoti" v-model="ruleForm.commodityZongJiage" type="number" placeholder="报价金额(整数元)" />
			</view>
		</view>
		<view class="button-sp-area  tijiao">
			<button type="warn" size="mini" @click="baojia(item.id)" :loading="loading">提交报价</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				item: '',
				ruleForm: {
					id: '',
					commodityZongJiage: ''
				},
				loading: false
			}
		},
		onLoad(option) {
			this.item = JSON.parse(decodeURIComponent(option.item));
		},

		methods: {
			baojia(id) {
				if (this.ruleForm.commodityZongJiage === '') {
					uni.showToast({
						title: "金额不能为空",
						icon: "none"
					})
					return false;
				}

				let commodityZongJiage = parseInt(this.ruleForm.commodityZongJiage);
				if (!Number.isInteger(commodityZongJiage)) {
					uni.showToast({
						title: "金额只能是数字",
						icon: "none"
					})
					return false;
				}
				if (commodityZongJiage <= 0 || commodityZongJiage > 5000) {
					uni.showToast({
						title: "金额只能在1-5000之间",
						icon: "none"
					})
					return false;
				}
				this.loading = true;

				this.ruleForm.id = id;
				//baojia
				this.$http.post(this.$urlconfig.createjiedan, this.ruleForm, {}).then(data => {
					this.loading = false;
					console.log(data)
					//{status: 1, msg: "不能重复报价", data: null, success: false}
					if (data.status === 0) {
						uni.showModal({
							title: '报价成功',
							content: '请等待商户选择，可在已报价订单中查询，'
							+'冻结金额'+data.data.dongjieAmount+'(元)，'
							+'剩余金额'+data.data.shengyuAmount+'(元)',
							success: function(res) {
								// if (res.confirm) {
								//             console.log('用户点击确定');
								//         } else if (res.cancel) {
								//             console.log('用户点击取消');
								//         }
								//返回接单页
								uni.navigateBack({
									delta:1
								});
							}
						});
					} else {
						uni.showToast({
							title: data.msg,
							icon: "none"
						})
					}

				});





			}
		}
	}
</script>

<style>
	.xiabian {
		padding: 20upx 30upx 60upx 30upx;
	}

	.xiabian view {
		font-size: 36upx;
		line-height: 44upx;
	}

	.juzhong {
		padding: 10upx 10upx 10upx 10upx;
		text-align: center;
	}

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


	/* 输入框 */
	.list {
		display: flex;
		flex-direction: column;
		padding-top: 50upx;
		padding-left: 70upx;
		padding-right: 70upx;
	}

	.list-call {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		height: 110upx;
		color: #333333;
		border-bottom: 1upx solid rgba(230, 230, 230, 1);
	}

	.list-call .img {
		width: 50upx;
		height: 50upx;
	}

	.list-call .biaoti {
		flex: 1;
		text-align: left;
		font-size: 32upx;
		line-height: 100upx;
		margin-left: 16upx;
	}

	.tijiao {
		text-align: center;
		padding: 30upx 20upx 30upx 20upx;
	}

	.beizhu {
		padding: 30upx 0 0 0;
		font-size: 34upx;
		line-height: 40upx;
		color: #dd0000;
	}
</style>
