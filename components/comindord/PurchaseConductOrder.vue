<template>
	<view>
		<view v-if="item.voSocket === 0" class="jinggao">
			有进行中订单,数据每分钟刷新一次
		</view>
		<view v-if="voSocketPay" class="jinggao">
			有未支付的订单,请及时处理,超时将关单！
		</view>

		<view v-for="(it,index) in item.listPurchaseSeeOrderVo" :key="index">
			<view class="xia">
				<view>
					<view class="ords">订单id : {{it.voOrder.id}}</view>
					<view class="ords">预估价格 : {{it.voOrder.commodityJiage}}(元)</view>
					<view class="ords">发布时间 : {{it.voOrder.createTime}}</view>
					<view class="ords">收货时间 : {{it.voOrder.giveTakeTime}}</view>
					<view class="ords">订单状态 : {{it.orderStatuName}}</view>
					<view class="ords">处理截止时间 :
						<text v-if="it.orderStatu11 || it.orderStatu18  || it.orderStatu12">{{it.voOrder.confirmTime}}</text>
						<text v-if="!it.orderStatu11 && !it.orderStatu18  && !it.orderStatu12">--</text>
					</view>

					<view class="caozuoClass">
						<view class="buttonClass" @click="operationRow(it,3)" v-if="it.orderStatu11 || it.orderStatu18 || it.orderStatu12 ">关单
						</view>
						<view class="buttonClass" @click="payOrder(it.voOrder.id)" v-if="it.orderStatu12 ">微信支付定金
						</view>
						<view class="buttonClass" @click="operationRow(it,11)" v-if="it.orderStatu3  || it.orderStatu17||  it.orderStatu20||it.orderStatu19">再次开启发布
						</view>
						<view class="buttonClass" @click="operationRow(it,5)" v-if="it.orderStatu16">确认收货
						</view>
						<view class="buttonClass" @click="operationRow(it,6)" v-if="it.orderStatu5">去评价
						</view>
						<view class="buttonhui" v-if="it.orderStatu4">送货中
						</view>
						<view class="buttonhui" v-if="it.orderStatu6">已完成
						</view>
						<view class="buttonhui" v-if="it.orderStatu13">待销售商支付保证金

						</view>
					</view>
				</view>



				<!--有报价后显示-->
				<view class="zhifuxiangq">
					<view v-if="it.orderStatu4 ||
					                             it.orderStatu5 ||it.orderStatu6 ||
					                             it.orderStatu13 ||it.orderStatu16 ||it.orderStatu11">
						<view class="fromDataTitleClass">支付信息</view>
						<view class="zxiangqing">
							<view>订单总金额:{{it.voOrder.commodityZongJiage}}(元)</view>
							<view v-if="it.orderStatu4 ||it.orderStatu16">已支付金额:{{it.voOrder.guaranteeMoney}}(元)</view>
							<view v-if="it.orderStatu4 ||it.orderStatu16">待支付金额:{{it.voOrder.balanceMoney}}(元)</view>
						</view>

						<view class="fromDataTitleClass">
							商品信息
						</view>
						<!--商品详情-->
						<view v-for="(itshang , index1) in  it.voOrder.commoditySnapshot" :key="index1">
							<view class="oxiangqing">
								<view>{{itshang.serviceType}}</view>
								<view> 采购数量:{{itshang.number}}</view>
								<view>{{itshang.specifiName}}</view>
								<view v-if="itshang.specifi_cations !==undefined &&  itshang.specifi_cations !=='--'">包装规格:{{itshang.specifi_cations}}</view>
								<view v-if=" itshang.remarks!== null && itshang.remarks!== undefined && itshang.remarks!=='' ">备注:{{itshang.remarks}}</view>
							</view>
						</view>

					</view>
					<!-- <view class="xuaznebutton" v-if="it.orderStatu11 || it.orderStatu18 " @click="choice(itbao,it, 13)">选择此家 </view> -->
				</view>
				<view class="jiedanyonghu">
					<view class="fromDataTitleClass">
						供货商信息
					</view>
				</view>

				<view v-for="(itbao , index11) in  it.listOrderCommonOfferEvaluateVo" :key="index11">
					<view class="baojiazhe">
						<view class="shanghubiao">
							<view>报价:{{itbao.orderCommonOffer.commodityZongJiage}}(元) </view>
						</view>
						<view>商户名:{{itbao.orderCommonOffer.saleCompanyName}} </view>
						<view>联系人:{{itbao.orderCommonOffer.consigneeName}}</view>
						<view>联系方式:{{itbao.orderCommonOffer.contact}}</view>
						<view> 商户地址:{{itbao.orderCommonOffer.saleUserAddressDetailed}} </view>
						<view class="shanghupingjia">
							<view> 商户评价 </view>
						</view>
					</view>
					<view class="pingjia">
						<view class="pingjiano">
							<view>品质高:{{itbao.evaluate.zhilianghao}}人次</view>
							<view>品质中:{{itbao.evaluate.zhiliangyiban}}人次</view>
							<view>品质差:{{itbao.evaluate.zhiliangcha}}人次</view>
						</view>
						<view class="pingjiano">
							<view>价格低:{{itbao.evaluate.jiagegao}}人次</view>
							<view>价格中:{{itbao.evaluate.jiagezhong}}人次</view>
							<view>价格高:{{itbao.evaluate.jiagegao}}人次</view>
						</view>
						<view>
							<view class="xuaznebutton"  v-if="it.orderStatu11 || it.orderStatu18 " @click="choice(it,itbao, 12)">选择此家
							</view>
						</view>
					</view>
					<!-- <view class="xuaznebutton" v-if="it.orderStatu11 || it.orderStatu18 " @click="choice(itbao,it, 13)">选择此家 </view> -->
				</view>


			</view>
		</view>
	</view>


</template>


<script>
	export default {
		props: {
			item: Object,
			voSocketPay: Boolean
		},
		data() {
			return {

				tableData: [],
				centerDialogVisible: false, //二维码弹窗
				fullscreenLoading: false,
				//order:'',
				myInterval: null, //订单状态轮询
				myIntervalPay: null, //支付结果轮询
				voSocket: false,

				isLunxun: false,
				codes: ''
			}
		},

		methods: {


			checke_isButtenz() {
				this.$emit("getordlist")
			},

			//支付
			payOrder(id) {
				if (this.fullscreenLoading) {
					uni.showModal({
						title: '提示',
						content: '订单生成中请稍后',
					});
					this.fullscreenLoading = false;
					return false;
				}
				let order = {
					id: id
				}
				this.fullscreenLoading = true;
				this.$http.get(this.$urlconfig.getnpayos, order, {}).then(data => {
					this.fullscreenLoading = false;
					if (data.status === 0) {

					} else {
						uni.showToast({
							title: data.msg,
							icon: "none"
						});
					}
				});
			},

			//操作
			operationRow(scope, type) {
				if (this.fullscreenLoading) {
					uni.showModal({
						title: '提示',
						content: '上一个操作还没有响应，请稍后再试',
					});
					this.fullscreenLoading = false;
					return false;
				}
				this.fullscreenLoading = true;
				let order = {
					id: scope.voOrder.id,
					type: type
				};
				//操作
				this.$http.post(this.$urlconfig.getoscaozuo, order, {}).then(data => {
					this.fullscreenLoading = false;
					if (data.status === 0) {
						uni.showToast({
							title: '操作成功',
							icon: "none"
						});
						this.checke_isButtenz();
					} else {
						uni.showToast({
							title: data.msg,
							icon: "none"
						});
					}
				});

				//11--》3关单  或者 13 抢单确认-->12 支付按键-->支付成功变成4 （送货者操作4 变成16） --> 16 确认

				// -->状态==5  （去评价）   status==3|| 17   传给后端 11再次开启
			},

			//选择此家
			choice(props, scope, type) {
				if (this.fullscreenLoading) {
					uni.showToast({
						title: '操作中请稍后',
						icon: "none"
					});
				}
				this.fullscreenLoading = true;
				let order = {};
				order.id = props.voOrder.id;
				order.type = type;
				order.orderCommonOfferId = scope.orderCommonOffer.id;
				order.commodityZongJiage = scope.orderCommonOffer.commodityZongJiage;
				//查询有没有待支付订单
				this.$http.post(this.$urlconfig.getoscaozuo, order, {}).then(data => {
					this.fullscreenLoading = false;
					if (data.status === 0) {
						uni.showToast({
							title: '操作成功',
							icon: "none"
						});
						console.log('调用刷新')
						this.checke_isButtenz();
					} else {
						uni.showToast({
							title: data.msg,
							icon: "none"
						});
					}
				});
			},
		}
	}
</script>
<style>
	.xia {
		/*底部边框，样式，颜色*/
		border-top-width: thin;
		border-top-style: double;
		border-top-color: #c6c2c0;
		padding: 10upx 0 0 0;

	}

	.ords {
		padding: 0 20upx 0 20upx;
		font-size: 35upx;
		line-height: 45upx;
	}

	/*商品详情*/
	.zhifuxiangq {
		/* margin: 50upx 50upx 50upx  50upx ; */
		padding: 30upx 60upx 0 60upx;
		color: #918D90;
	}

	

	/* 供货商详情 */
	.jiedanyonghu {
		padding: 10upx 60upx 10upx 60upx;
		color: #918D90;
	}



	.zxiangqing view {
		padding: 3upx 10upx 3upx 20upx;
		font-size: 32upx;
		line-height: 34upx;

	}

	.juzhong {
		text-align: center;
		font-size: 32upx;
		line-height: 34upx;
	}

	.pingjia {
		display: flex;
		justify-content: space-around;
		padding: 3upx 0 30upx 0;
	}

	.pingjiano {}

	.pingjiano view {
		font-size: 30upx;
		line-height: 32upx;
		color: #918D90;

	}

	.baojiazhe {
		padding: 0 10upx 3upx 50upx;

	}

	.baojiazhe view {
		font-size: 30upx;
		line-height: 34upx;
		color: #918D90;
	}

	.shanghubiao {
		display: flex;
		/*布局使元素居左*/
		font-size: 30upx;
		line-height: 34upx;
	}

	.shanghubiao view {
		padding: 3upx 30upx 3upx 30upx;
		text-align: center;
		border-style: solid;
		border-width: 3upx;
		color: #F9B3CE;
		/* 圆角 */
		border-radius: 30upx;
	}

	.shanghupingjia {
		display: flex;
		/*布局使元素居左*/
		font-size: 30upx;
		line-height: 34upx;
	}

	.shanghupingjia view {
		padding: 3upx 30upx 3upx 30upx;
		text-align: center;
		border-style: solid;
		border-width: 3upx;
		color: #86B2CB;
		/* 圆角 */
		border-radius: 30upx;
	}

	.xuaznebutton {
		font-size: 30upx;
		padding: 1upx 10upx 1upx 10upx;
		/* margin: 0 10upx 0 0; */
		color: #FFFFFF;
		/* 圆角 */
		border-radius: 10upx;
		background: #FCC1C3;
	}
</style>
