<template>
	<view>
		<view v-if="item.voSocket === 0" class="jinggao">
			有进行中订单,数据每分钟刷新一次
		</view>
		<view v-if="voSocketPay" class="jinggao">
			有未支付的订单,请及时处理,超时将关单！
		</view>

		<block v-for="(it,index) in item.listPurchaseSeeOrderVo" :key="index">
			<view class="xia">
				<view>
					<view class="ords">订单id : {{it.voOrder.id}}</view>
					<view class="ords">预估价格 : {{it.voOrder.commodityJiage}}(元)</view>
					<view class="ords">发布时间 : {{it.voOrder.createTime}}</view>
					<view class="ords">收货时间 : {{it.voOrder.giveTakeTime}}</view>
					<view class="ords">订单状态 : {{it.orderStatuName}}</view>


					<view>
						<view v-if="it.orderStatu11">
							<MvCountDown v-on:endCallback="checke_isButtenz" :startTime="new Date().getTime()" :endTime="headercell(it)"
							 :endText="'报价结束'" :nameText="'报价剩余:'" :dayTxt="'天'" :hourTxt="'小时'" :minutesTxt="'分'" :secondsTxt="'秒'"
							 :isStart="it.orderStatu11"></MvCountDown>
						</view>


						<view v-if="it.orderStatu18">
							<MvCountDown v-on:endCallback="operationRow(it,18)" :startTime="new Date().getTime()" :endTime="headercel8(it)"
							 :endText="'超时未选择商家-关单'" :nameText="'选择商家剩余:'" :dayTxt="'天'" :hourTxt="'小时'" :minutesTxt="'分'" :secondsTxt="'秒'"
							 :isStart="it.orderStatu18"></MvCountDown>
						</view>
						<view v-if="it.orderStatu13">
							<MvCountDown15 :startTime="new Date().getTime()" :endTime="headercel3(it,15)" :endText="'超时未支付质保金-关单'" :nameText="'付质保金剩余:'"
							 :dayTxt="'天'" :hourTxt="'小时'" :minutesTxt="'分'" :secondsTxt="'秒'" :isStart="it.orderStatu13"></MvCountDown15>
						</view>
						<view v-if="it.orderStatu12">
							<MvCountDown12 v-on:endCallback="operationRow(it,19)" :startTime="new Date().getTime()" :endTime="headercel3(it,15)"
							 :endText="'超时未支付定金-关单'" :nameText="'付定金剩余:'" :dayTxt="'天'" :hourTxt="'小时'" :minutesTxt="'分'" :secondsTxt="'秒'"
							 :isStart="it.orderStatu12"></MvCountDown12>
						</view>
						<view class="ords" v-if="!it.orderStatu11 && !it.orderStatu18 && !it.orderStatu13 && !it.orderStatu12">剩余处理时间 ：--</view>

					</view>


					<view class="caozuoClass">
						<view class="buttonClass" @click="operationRow(it,3)" v-if="it.orderStatu11 || it.orderStatu18 || it.orderStatu12 || it.orderStatu21">关单
						</view>
						<!-- <el-button @click="payOrder(it.voOrder.id)" button type="primary" plain="true" v-if="it.orderStatu12 || it.orderStatu21"
						 :loading="fullscreenLoading">定金二维码(微信扫码)
							</button> -->
						<view class="buttonClass" @click="operationRow(it,11)" v-if="it.orderStatu3 ">再次开启发布
						</view>
						<view class="buttonClass" @click="operationRow(it,11)" v-if=" it.orderStatu17">无销售商报价重新发布
						</view>
						<view class="buttonClass" @click="operationRow(it,11)" v-if="it.orderStatu20">
							未支付质保金重新发布
						</view>
						<view class="buttonClass" @click="operationRow(it,11)" v-if=" it.orderStatu19">未支付定金重新发布
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
			</view>


			<!--有报价后显示-->
			<view class="zhifuxiangq">
				<view v-if="it.orderStatu4 ||
				                             it.orderStatu5 ||it.orderStatu6 ||
				                             it.orderStatu13 ||it.orderStatu16">
					<view class="fromDataTitleClass">支付信息</view>
					<view class="zxiangqing">
						<view>订单总金额:{{it.voOrder.commodityZongJiage}}(元)</view>
						<view v-if="it.orderStatu4 ||it.orderStatu13 ||it.orderStatu16">已支付金额:{{it.voOrder.guaranteeMoney}}(元)</view>
						<view v-if="it.orderStatu4 ||it.orderStatu13 ||it.orderStatu16">待支付金额:{{it.voOrder.balanceMoney}}(元)</view>
					</view>
				</view>
				<view class="fromDataTitleClass">
					商品信息
				</view>
				<block v-for="(itshang , index) in  it.voOrder.commoditySnapshot" :key="index">
					<view class="oxiangqing">
						<view>{{itshang.serviceType}}</view>
						<view> 采购数量:{{itshang.number}}</view>
						<view>{{itshang.specifiName}}</view>
						<view v-if="itshang.specifi_cations !==undefined &&  itshang.specifi_cations !=='--'">包装规格:{{itshang.specifi_cations}}</view>
						<view v-if=" itshang.remarks!== null && itshang.remarks!== undefined && itshang.remarks!=='' ">备注:{{itshang.remarks}}</view>
					</view>
				</block>

				<view class="fromDataTitleClass">
					供货商信息
				</view>
				<view class="juzhong" v-if="it.listOrderCommonOfferEvaluateVo.length===0">暂无报价者</view>
				<block v-for="(itbao , index) in  it.listOrderCommonOfferEvaluateVo" :key="index" v-if="it.listOrderCommonOfferEvaluateVo.length > 0">
					<view class="zxiangqing">
						<view class="shanghubiao">
							<view>报价:{{itbao.orderCommonOffer.commodityZongJiage}}(元) </view>
						</view>
						<view>商户名:{{itbao.orderCommonOffer.saleCompanyName}} </view>
						<view v-if="it.orderStatu4 || it.orderStatu12 || it.orderStatu13 || it.orderStatu16">
							联系人:{{itbao.orderCommonOffer.consigneeName}}
						</view>
						<view v-if="it.orderStatu4 || it.orderStatu12 || it.orderStatu13 || it.orderStatu16">
							联系方式:{{itbao.orderCommonOffer.contact}}
						</view>
						<view> 商户地址:{{itbao.orderCommonOffer.saleUserAddressDetailed}} </view>
						<view class="shanghubiao">
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
						<view >
							<!-- v-if="it.orderStatu11 || it.orderStatu18 " @click="choice(itbao,it, 13)" -->
							<view class="xuaznebutton">选择此家 </view>
						</view>
					</view>

				</block>
			</view>
		</block>
	</view>


</template>


<script>
	import MvCountDown12 from '../comjishi/jishi12.vue';
	import MvCountDown15 from '../comjishi/jishi15.vue';
	import MvCountDown from '../comjishi/jishi30.vue';


	export default {
		props: {
			item: Object,
			voSocketPay: Boolean
		},
		components: {
			MvCountDown,
			MvCountDown12,
			MvCountDown15

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

			//操作相关
			operationRow(row, type) {
				console.log(row)
			},
			//倒计时相关开始
			headercell(row) {
				if (row.orderStatu11 === true) {
					//获取创建时间
					let newDateGetTime = new Date().getTime();
					let date2 = new Date(row.voOrder.createTime);
					//获取时间差 毫秒，getTime()获取毫秒值
					let second = newDateGetTime - date2.getTime();
					if (second < 1800000) {
						return newDateGetTime + 1800000 - second;
					} else {
						return 0;
					}
				}
			},
			//超过30分钟有报价，给15分钟buffer
			headercel8(row) {
				if (row.orderStatu18 === true) {
					//获取创建时间
					let newDateGetTime = new Date().getTime();
					let date2 = new Date(row.voOrder.createTime);
					//获取时间差 毫秒，getTime()获取毫秒值
					let second = newDateGetTime - date2.getTime();
					if (second > 1800000 && second <= 45 * 60 * 1000) {
						return newDateGetTime + 45 * 60 * 1000 - second;
					} else {
						return 0;
					}
				}
			},
			//待销售支付定金15分钟
			headercel3(row, num) {
				if (row.orderStatu13 === true || row.orderStatu12 === true) {
					//获取创建时间
					let newDateGetTime = new Date().getTime();
					let date2 = new Date(row.voOrder.updateTime);
					//获取时间差 毫秒，getTime()获取毫秒值
					let second = newDateGetTime - date2.getTime();
					if (second < num * 60 * 1000) {
						return newDateGetTime + num * 60 * 1000 - second;
					} else {
						return 0;
					}
				}
			},


			countDownS(x) {
				// 开始倒计时回调
				// console.log(x)
			},
			countDownE() {
				// 结束倒计时回调
				this.checke_isButtenz();
			}
			//倒计时相关结束

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
		padding: 30upx 60upx 40upx 60upx;
		color: #918D90;
	}

	.fromDataTitleClass {
		border-top-width: thin;
		border-top-style: double;
		border-top-color: #E7E3E6;

		font-size: 33upx;
		line-height: 35upx;
		color: #6F6B6E;
		padding: 5upx 0 5upx 0;
	}

	.oxiangqing {
		display: inline;
		padding: 0 30upx 0 0;

	}

	.oxiangqing view {
		padding: 3upx 10upx 3upx 20upx;
		font-size: 32upx;
		line-height: 34upx;
		background: #F4FBFD;
		display: inline;
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
	}

	.pingjiano view {
		font-size: 30upx;
		line-height: 32upx;
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
