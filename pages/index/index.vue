<template>
	<view>

		<!--首页-->
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<block v-for="(item,index) in topic.swiper" :key="index">
				<swiper-item>
					<image :src="item.url" mode="scaleToFill" lazy-load @click="tiaozhuan(item.paths)"></image>
				</swiper-item>
			</block>
		</swiper>
		<!--根据role显示button-->
		<view class="daohaoClass">
			<block v-for="(item,index) in daohao" :key="index">
				<view class="daohaoitem" :class="[ index===0?'a':'b' ]" @click="tiaozhuan(item.paths)">
					<view class="shang">
						<image :src="item.ioc" mode="aspectFit"></image>
					</view>
					<view> {{item.name}}</view>
				</view>
			</block>

		</view>
		<!--未实名的根据实名状态显示文案-->
		<view>
			<view v-if="shenpizhong">审批中</view>
			<view v-if="weishenqing">未实名</view>
			<view v-if="shibai">实名实名</view>

			<!--有无订单显示的文案-->
			<view v-if="(role===2 || role===1) && chenggong">
				<PurchaseConductOrder :item="ordls" :voSocketPay="voSocketPay" v-if="isPuCoOrder" v-on:getordlist="getordlist" >
				</PurchaseConductOrder>
				<view v-if="!isPuCoOrder"> 没有订单给点啥文案</view>
			</view>
		</view>


	</view>
</template>

<script>
	import indexjs from "../../common/indexjs/indexjs.js";
	import PurchaseConductOrder from "../../components/comindord/PurchaseConductOrder.vue";


	var _self;
	export default {
		components: {
			PurchaseConductOrder

		},
		data() {
			return {

				myInterval: null, //订单状态轮询
				voSocketPay: false,
				isPuCoOrder: false,
				ordls: {},
				role: '',

				isAuthentication: '',
				shenpizhong: false,
				weishenqing: false,
				chenggong: false,
				shibai: false,

				daohao: [],
				topic: {
					swiper: []
				}
			};
		},
		onLoad() { //页面加载
			_self = this;
			this.__init();

		},
		onShow() { //监听页面显示。页面每次出现在屏幕上都触发,页面显示
			//this.isrole();
			if (!this.chenggong) {
				this.getguerinif();
			}
			if ((this.role === 1 || this.role === 2) && _self.chenggong === true) {
				this.getordlist();
			}

		},
		methods: {
			// 初始化数据
			__init() {
				this.getSwiper();
				this.isrole();
				this.isshiming(this.$user.isAuthentication);
			},
			//TODO跳转未完成
			tiaozhuan(row) {

				if (!_self.chenggong) {
					uni.showToast({
						title: '实名完成后才能查看信息',
						icon: "none"
					});
				}
				if (row === null || row === '') {
					return false;
				}
				// uni.navigateTo({
				// 	url: row
				// });

			},


			// 获取广告
			getSwiper() {
				let uuidform = {
					permissionid: 0,
					bunnerType: 1
				};
				this.$http.get(this.$urlconfig.getbuuer, uuidform, {}).then(data => {
					if (data.status === 0) {
						let arr = [];
						if (data.data !== null) {
							for (let i = 0; i < data.data.length; i++) {
								arr.push({
									id: data.data[i].id,
									url: JSON.parse(data.data[i].imgUrl)[0].pictureUrl,
									paths: data.data[i].url
								})
							}
							this.topic.swiper = arr;
						}
					} else {
						uni.showToast({
							title: data.msg,
							icon: "none"
						});
					}
				});
			},
			//判断角色
			isrole() {
				if (this.role !== '' || this.daohao.size === undefined || this.daohao.size === 0) {
					let res = indexjs.getdaohao();
					this.daohao = res.daohao
					this.role = res.role


				}
			},
			//判断实名
			isshiming(isAuthentication) {
				//1 审批中 ，2通过，3审核不通过，4未申请

				if (isAuthentication === 1) {
					_self.shenpizhong = true;
					_self.chenggong = false;
					_self.shibai = false;
					_self.weishenqing = false
				} else if (isAuthentication === 2) {
					_self.chenggong = true;
					_self.shenpizhong = false;
					_self.shibai = false;
					_self.weishenqing = false;
				} else if (isAuthentication === 3) {
					_self.shibai = true;
					_self.chenggong = false;
					_self.shenpizhong = false;
					_self.weishenqing = false;
				} else if (isAuthentication === 4) {
					_self.weishenqing = true;
					_self.shibai = false;
					_self.chenggong = false;
					_self.shenpizhong = false;
				}

			},


			//获取实名状态
			async getguerinif() {
				let uuidform = {
					uuid: this.$http.getUuid()
				};
				let [err, res] = await this.$http.getV2(this.$urlconfig.logGetUesr, uuidform, {});
				if (!this.$user.eck(err)) {
					return;
				}
				if (res.data.status === 0) {
					if (this.$user.isAuthentication !== res.data.data.isAuthentication) {
						this.isshiming(res.data.data.isAuthentication);
						this.$user.upUserAu(res.data.data.isAuthentication);
					}
					if (this.$user.role !== res.data.data.role) {
						this.$user.uprule(res.data.data.role);
					}
				}
			},
			getordlist() {
				let uuidform = {
					uuid: this.$http.getUuid()
				};
				//查询有没有近3天订单
				this.$http.get(this.$urlconfig.getordls, uuidform, {}).then(data => {
					if (data.status === 0) {
						if (data.data !== null) {
							// 商品转list
							for (let i = 0; i < data.data.listPurchaseSeeOrderVo.length; i++) {
								let commoditySnapshot = JSON.parse(data.data.listPurchaseSeeOrderVo[i].voOrder.commoditySnapshot);
								data.data.listPurchaseSeeOrderVo[i].voOrder.commoditySnapshot = commoditySnapshot;
							}
							this.ordls = data.data;
							this.isPuCoOrder = true;
							if (this.ordls.voSocket === 0) {
								this.initList(1);
							} else {
								//查询有没有待支付订单
								this.$http.get(this.$urlconfig.getpayos, uuidform, {}).then(data => {
									if (data.status === 0) {
										if (data.data === 'YES') {
											this.voSocketPay = true;
											this.initList(0.3);
										} else {
											this.voSocketPay = false;
											this.beforeDestroyPay();
										}
									} else {
										uni.showToast({
											title: data.msg,
											icon: "none"
										});
									}
								});

							}


						} else {
							uni.showToast({
								title: '近期没有订单给个默认文案',
								icon: "none"
							});
						}
					} else {
						uni.showToast({
							title: data.msg,
							icon: "none"
						});
					}
				});
			},
			//订单状态轮询开始
			initList(num) {
				if (num === null || num === '' || num === undefined) {
					num = 2;
				}
				this.beforeDestroy();
				this.myInterval = setInterval(() => {
					setTimeout(() => {
						this.getordlist() //调用接口的方法
					}, 1)
				}, num * 1000 * 60);
			},

			//订单状态轮询关闭
			beforeDestroy() {
				clearInterval(this.myInterval);
			},
		}

	}
</script>

<style>
	/**轮播开始*/
	/* .topic-swiper {
		padding: 0 20upx 20upx 20upx;
	} */

	.topic-swiper image {
		width: 100%;

		/* border-radius: 10upx; */

	}



	/**轮播结束*/
	/*按钮*/
	.daohaoClass {
		display: flex;
		justify-content: space-around;
		/*上边是按钮 布局设置  */
		margin: 10upx 0 0 0;
		/* margin : 5upx 0 0 0; */
		/* padding: 0 10upx 0 0 0; */
	}


	.daohaoitem {
		font-size: 30upx;
		padding: 16upx 10upx 16upx 10upx;
		/* margin: 0 10upx 0 0; */
		/* font-weight: bold; 加粗不生效 */
		border-radius: 8upx;
	}

	.shang {
		text-align: center;
		/*ioc水平居中*/
	}

	.shang image {
		width: 120upx;
		height: 120upx;
	}

	.a {
		color: #FD7B6A;
	}

	.b {
		color: #323232;
	}
</style>
