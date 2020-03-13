<template>
	<view>
		<view v-if="item.voSocket === 0" class="voSocketClass">
			有进行中订单,数据每2分钟刷新一次
		</view>
		<view v-if="voSocketPay" class="voSocketClass">
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

					剩余处理时间 : {{it.orderStatuName}}


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
						<view class="buttonClass"  v-if="it.orderStatu4" >送货中
						</view>
						<view class="buttonClass"  v-if="it.orderStatu6" >已完成
						</view>
						<view class="buttonClass"  v-if="it.orderStatu13" >待销售商支付保证金
						</view>
					</view>
					<!--有报价订单-->
					<block v-for="(itno,index) in it.listOrderCommonOfferEvaluateVo" :key="index">
						{{itno.evaluate}}
						{{itno.orderCommonOffer}}
					</block>
				</view>
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
				this.checke_isButten();
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

	.demo-table-expand label {
		width: 90px;
		color: #99a9bf;
	}


	.fromDataClass {
		border: 1px solid #E7E3E6;
		padding: 5px 0px 10px 10px;
		color: #918D90;
	}

	.fromDataTitleClass {
		font-size: 16px;
		color: #6F6B6E;
	}

	.pingjiaClass {
		font-size: 10px;
	}

	.forFromData {
		background: #F4FBFD;
		display: inline
	}

	.voSocketClass {
		padding: 3px 45px 10px 0px;
		color: #6F6B6E;
		font-size: 18px;
		float: right
	}

	.orderStatuNameClass {
		color: #FC1A40;
	}



	.dialogClass {
		text-align: center
	}
</style>
