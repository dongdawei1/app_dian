<template>
	<view class="box">
		<block v-for="(item,index) in tabBars" :key="index">
			<view class="biaoti">
				<image :src="item.liioc"></image>
				<text> {{item.name}}</text>
				<!--这有一条线-->
			</view>
			<view class="liebiao">
				<block v-for="(item1,index1) in item.list" :key="index1">
					<view class="liell" v-if="item1.releaseType!==35 " @click="tiaozhuan(item1.releaseType)">
						<image :src="item1.lsioc"></image>
						<text> {{item1.name}}</text>
					</view>
					<view class="liell" v-if="item1.releaseType===35 &&(role===1 || role===4 || role===13) " @click="tiaozhuan(item1.releaseType)">
						<image :src="item1.lsioc"></image>
						<text> {{item1.name}}</text>
					</view>
				</block>
			</view>
		</block>

	</view>
</template>

<script>
	
	import indexjs from '../../common/indexjs/indexjs.js';
	export default {

		data() {
			return {
				isAuthentication: '',
				role: '',
				tabBars: []

			}
		},
		
		onLoad() { //页面加载
			this.__init();
		},
		//页面每次出现都检查是否开启接到哪如果开启刷新订单
		onShow() {
		},
		methods: {
			__init() {
				this.role = uni.getStorageSync("dian_role");
				this.isAuthentication = this.$user.isAuthentication;
				if (this.tabBars.length === 0 ) {
					let resule = indexjs.getquanbuliebiao();
					this.tabBars = resule;
				}
			},
			async tiaozhuan(releaseType) {
				if (this.isAuthentication !== 2) {
					let uuidform = {
						uuid: this.$http.getUuid()
					};
					let [err, res] = await this.$http.getV2(this.$urlconfig.logGetUesr, uuidform, {});
					if (!this.$user.eck(err)) {
						return false;
					}
					if (res.data.status === 0) {
						if (this.$user.isAuthentication !== res.data.data.isAuthentication) {
							this.$user.upUserAu(res.data.data.isAuthentication);
							this.isAuthentication = res.data.data.isAuthentication;
						}
						if (this.$user.role !== res.data.data.role) {
							this.$user.uprule(res.data.data.role);
							this.role = res.data.data.role;
						}
					}
					if (this.isAuthentication !== 2) {
						uni.showToast({
							title: '实名完成后才能查看信息',
							icon: "none"
						});
						return false;
					}
				}
				//其他全部信息
				uni.navigateTo({
					url: '../../pages/shichang/shichang?releaseType=' + releaseType + '&role=' + this.role
				});
			}
		}
	}
</script>

<style>
	.box {
		padding: 40upx 0 50upx 30upx;

	}

	.biaoti {
		display: flex;
		/*水平*/
		border-bottom: 1upx solid #EEEEEE;

	}

	.biaoti image {
		padding: 15upx 0 0 0;
		width: 20upx;
		height: 35upx;
	}

	.biaoti text {
		font-size: 35upx;
		padding: 0 0 15upx 15upx;
	}

	.liebiao {
		padding: 30upx 0 40upx 22upx;
		display: flex;
		flex-wrap: wrap;
	}

	.liell {
		display: flex;
		flex-direction: column;
		/*元素上下排列*/
		width: 155upx;
		height: 155upx;

	}

	.liell image {
		margin: 0 auto;
		/*圖片居中*/
		width: 60upx;
		height: 60upx;
	}

	.liell text {
		text-align: center;
		/*文字居中*/
		font-size: 30upx;
		color: #4b4f51;
	}
</style>
